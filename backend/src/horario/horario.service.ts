import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/primsa.service';
import { GenerarHorarioDto } from './dto/generar-horario.dto';
import { BloqueDto } from './dto/bloque.dto';
import {
  dia_semana,
  tipo_bloque,
  tipo_aula,
  horario_generado,
  asignacion,
  docente_materia,
  curso_materia,
  materia as MateriaModel,
  docente as DocenteModel,
  aula as AulaModel
} from '@prisma/client';
import { CriteriaDto } from './dto/criterios.dto';

export { BloqueDto }; 

@Injectable()
export class HorarioService {
  constructor(private readonly prisma: PrismaService) {}

  async generarHorario(dto: GenerarHorarioDto) {
    const resultados: {
      cursoId: number;
      horarios: { dia: dia_semana; asignaciones: asignacion[] }[];
    }[] = [];

    for (const cursoId of dto.cursoIds) {
      const porCurso: {
        dia: dia_semana;
        asignaciones: asignacion[];
      }[] = [];

      for (const dia of dto.dias) {
        // 1) Obtener o crear el horario del día
        const horario = await this._getOrCreateHorario(dto.anioEscolarId, dia);

        // 2) Marcarlo como activo
        await this._markHorarioActivo(horario.pk_id);

        const asignacionesDelDia: asignacion[] = [];

        for (const bloqueDto of dto.bloques) {
          const bloque = await this._getOrCreateBloque(bloqueDto);

          if (bloque.tipo === tipo_bloque.clase) {
            // Desactivar previas
            await this._deactivateExisting(cursoId, bloque.pk_id, horario.pk_id);

            // 3) Materia al azar
            const materia = await this._pickRandomMateria(cursoId);
            if (!materia) continue;

            // 4) Docente por scoring
            const docente = await this._pickBestDocente(
              materia.pk_id,
              bloque.pk_id,
              dto.criterios
            );
            if (!docente) continue;

            // 5) Aula por scoring
            const aula = await this._pickBestAula(
              materia.pk_id,
              bloque.pk_id,
              dto.criterios
            );
            if (!aula) continue;

            // 6) Crear asignación
            const asign = await this.prisma.asignacion.create({
              data: {
                fk_id_bloque: bloque.pk_id,
                fk_id_curso: cursoId,
                fk_id_docente: docente.pk_id,
                fk_id_aula: aula.pk_id,
                fk_id_materia: materia.pk_id,
                fk_id_horario: horario.pk_id,
                justificacion: 'Asignado de forma inteligente'
              }
            });
            asignacionesDelDia.push(asign);
          } else {
            // receso o almuerzo
            const reserv = await this.prisma.asignacion.create({
              data: {
                fk_id_bloque: bloque.pk_id,
                fk_id_horario: horario.pk_id,
                justificacion: `Reservado para ${bloque.tipo}`
              }
            });
            asignacionesDelDia.push(reserv);
          }
        }

        porCurso.push({ dia, asignaciones: asignacionesDelDia });
      }

      resultados.push({ cursoId, horarios: porCurso });
    }

    return { mensaje: 'Horario generado', resultados };
  }

  // ————— Helpers single‑responsibility —————

  private async _getOrCreateHorario(
    anioId: number,
    dia: dia_semana
  ): Promise<horario_generado> {
    return (
      (await this.prisma.horario_generado.findFirst({
        where: { fk_id_anio_escolar: anioId, dia }
      })) ??
      (await this.prisma.horario_generado.create({
        data: { fk_id_anio_escolar: anioId, dia }
      }))
    );
  }

  private async _markHorarioActivo(pk: number) {
    await this.prisma.horario_generado.update({
      where: { pk_id: pk },
      data: { esta_activo: true }
    });
  }

  private async _getOrCreateBloque(dto: BloqueDto) {
    return (
      (await this.prisma.bloque.findFirst({
        where: {
          tipo: dto.tipo,
          hora_inicio: new Date(dto.hora_inicio),
          hora_fin: new Date(dto.hora_fin)
        }
      })) ??
      this.prisma.bloque.create({
        data: {
          tipo: dto.tipo,
          hora_inicio: new Date(dto.hora_inicio),
          hora_fin: new Date(dto.hora_fin),
          observacion: dto.observacion
        }
      })
    );
  }

  private async _deactivateExisting(
    cursoId: number,
    bloqueId: number,
    horarioId: number
  ) {
    await this.prisma.asignacion.updateMany({
      where: {
        fk_id_curso: cursoId,
        fk_id_bloque: bloqueId,
        fk_id_horario: horarioId,
        esta_activo: true
      },
      data: { esta_activo: false }
    });
  }

  private async _pickRandomMateria(cursoId: number) {
    const rels = await this.prisma.curso_materia.findMany({
      where: { fk_id_curso: cursoId }
    });
    if (!rels.length) return null;
    const sel = rels[Math.floor(Math.random() * rels.length)];
    return this.prisma.materia.findUnique({ where: { pk_id: sel.fk_id_materia } });
  }

  private async _pickBestDocente(
    materiaId: number,
    bloqueId: number,
    w: typeof CriteriaDto.prototype
  ): Promise<DocenteModel | null> {
    const rels: docente_materia[] = await this.prisma.docente_materia.findMany({
      where: { fk_id_materia: materiaId }
    });

    let best: { docente: DocenteModel; score: number } | null = null;
    for (const { fk_id_docente, fk_id_materia } of rels) {
      // no esté ocup…
      const ocup = await this.prisma.asignacion.findFirst({
        where: {
          fk_id_docente,
          fk_id_bloque: bloqueId,
          esta_activo: true
        }
      });
      if (ocup) continue;

      // métricas
      const doc = await this.prisma.docente.findUnique({
        where: { pk_id: fk_id_docente },
        include: { persona: true }
      });
      if (!doc) continue;

      const antiguedad =
        (new Date().getFullYear() - doc.fecha_ingreso.getFullYear());
      const experiencia = await this.prisma.asignacion.count({
        where: { fk_id_docente, fk_id_materia: materiaId }
      });
      const especialidad = await this.prisma.docente_materia.findFirst({
        where: {
          fk_id_docente,
          fk_id_materia
        }
      }).then(r => r?.especialidadScore ?? 0);

      const score =
        antiguedad * w.antiguedadWeight +
        doc.horas_max_semana.toNumber() * w.disponibilidadWeight +
        experiencia * w.experienciaWeight +
        especialidad * w.especialidadWeight;

      if (!best || score > best.score) best = { docente: doc, score };
    }
    return best?.docente ?? null;
  }

  private async _pickBestAula(
    materiaId: number,
    bloqueId: number,
    w: typeof CriteriaDto.prototype
  ): Promise<AulaModel | null> {
    const mat = await this.prisma.materia.findUnique({
      where: { pk_id: materiaId }
    });
    if (!mat) return null;

    const cand = await this.prisma.aula.findMany({
      where: {
        tipo: mat.require_lab ? tipo_aula.laboratorio : undefined
      }
    });

    let best: { aula: AulaModel; score: number } | null = null;
    for (const aula of cand) {
      const ocup = await this.prisma.asignacion.findFirst({
        where: {
          fk_id_aula: aula.pk_id,
          fk_id_bloque: bloqueId,
          esta_activo: true
        }
      });
      if (ocup) continue;

      // métricas
      const capacidad = aula.capacidad;
      const equipamiento = aula.equipamientoScore ?? 0;
      const ubicacion = aula.ubicacionScore ?? 0;

      const score =
        capacidad * w.capacidadWeight +
        equipamiento * w.equipamientoWeight +
        ubicacion * w.ubicacionWeight;

      if (!best || score > best.score) best = { aula, score };
    }
    return best?.aula ?? null;
  }
}
