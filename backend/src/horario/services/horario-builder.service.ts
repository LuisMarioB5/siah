import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/primsa.service';
import { BloqueDto } from '../dto/bloque.dto';
import { aula, bloque, dia_semana, docente, horario_generado, materia } from '@prisma/client';
import { CriteriosEvaluadorService } from './criterios-evaluador.service';
import { AulaCriteria, DocenteCriteria } from '../dto/criterios.dto';

@Injectable()
export class HorarioBuilderService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly evaluador: CriteriosEvaluadorService
  ) {}

  async obtenerOCrearBloques(bloquesDto: BloqueDto[]): Promise<bloque[]> {
    const bloques = [];

    for (const dto of bloquesDto) {
      let bloque = await this.prisma.bloque.findFirst({
        where: {
          tipo: dto.tipo,
          hora_inicio: new Date(dto.hora_inicio),
          hora_fin: new Date(dto.hora_fin),
        },
      });
      
      if (!bloque) {
        bloque = await this.prisma.bloque.create({
          data: {
            tipo: dto.tipo,
            hora_inicio: new Date(dto.hora_inicio),
            hora_fin: new Date(dto.hora_fin),
            observacion: dto.observacion,
          },
        });
      }

      bloques.push(bloque);
    }

    return bloques;
  }

  async obtenerOCrearHorarios(anioEscolarId: number, dias: dia_semana[]): Promise<horario_generado[]> {
    const horarios = [];

    for (const dia of dias) {
      await this.prisma.horario_generado.updateMany({
        where: {
          fk_id_anio_escolar: anioEscolarId,
          dia
        },
        data: {
          esta_activo: false
        }
      })

      let horario = await this.prisma.horario_generado.findFirst({
        where: {
          fk_id_anio_escolar: anioEscolarId,
          dia,
        },
      });

      if (!horario) {
        horario = await this.prisma.horario_generado.create({
          data: {
            fk_id_anio_escolar: anioEscolarId,
            dia,
            esta_activo: true
          },
        });
      }

      await this.prisma.horario_generado.update({
        where: {
          pk_id: horario.pk_id
        },
        data: {
          esta_activo: true
        }
      })
      
      horarios.push(horario);
    }

    return horarios;
  }

  async seleccionarDocente(materiaId: number, criterios: DocenteCriteria, horarioId: number, bloqueId: number): Promise<docente> {
      const docentesRaw = await this.prisma.docente_materia.findMany({
        where: {
          fk_id_materia: materiaId
        }
      });

      let mejor: { docenteId: number, puntaje: number, detalle: any } = null;
    
      for (const docente of docentesRaw) {
        // Verificar si el docente ya está asignado en el horario y bloque específico
        const yaAsignado = await this.prisma.asignacion.findFirst({
          where: {
            fk_id_docente: docente.fk_id_docente,
            fk_id_horario: horarioId,
            fk_id_bloque: bloqueId,
            esta_activo: true
          }
        });
    
        if (yaAsignado) {
          // Si ya está asignado, continuar con el siguiente docente
          continue;
        }
    
        const resultado = await this.evaluador.evaluarDocente(docente.fk_id_docente, materiaId, criterios, horarioId);

        if (resultado && (!mejor || resultado.puntaje > mejor.puntaje)) {
          mejor = {
            docenteId: docente.fk_id_docente,
            puntaje: resultado.puntaje,
            detalle: resultado.detalle
          };
        }
      }
    
      const mejorDocente = await this.prisma.docente.findFirst({
        where: {
          pk_id: mejor?.docenteId
        }
      })
      
      return mejorDocente ?? null;
  }

  async seleccionarAula(materia: materia, criterios: AulaCriteria, horario: horario_generado, bloque: bloque): Promise<aula> {
    const condiciones: any = {};

    // Filtrar por laboratorios si la materia lo requiere
    if (materia.requiere_lab) {
      condiciones.tiene_lab = true;
    }
  
    // Filtrar por aulas con PC si la materia lo requiere
    if (materia.requiere_pc) {
      condiciones.tiene_pc = true;
    }
  
    const aulas = await this.prisma.aula.findMany({
      where: condiciones, 
    });
    
    let mejor: { aula: aula, puntaje: number, detalle: any } = null;
  
    for (const aula of aulas) {
      // Verificar si el aula ya está asignada en el horario y bloque específico
      const yaAsignada = await this.prisma.asignacion.findFirst({
        where: {
          fk_id_aula: aula.pk_id,
          fk_id_horario: horario.pk_id,
          fk_id_bloque: bloque.pk_id,
          esta_activo: true
        }
      });
  
      if (yaAsignada) {
        // Si ya está asignada, continuar con la siguiente aula
        continue;
      }
  
      const resultado = this.evaluador.evaluarAula(aula, criterios);
      if(!resultado) return null;
      
      if (!mejor || resultado.puntaje > mejor.puntaje) {
        mejor = {
          aula,
          puntaje: resultado.puntaje,
          detalle: resultado.detalle
        };
      }
    }
  
    return mejor?.aula ?? null;
  }  
}
