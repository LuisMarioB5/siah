import { Injectable } from '@nestjs/common';
import { docente, aula, docente_materia, tipo_aula } from '@prisma/client';
import { AulaCriteria, CriteriaDto, DocenteCriteria } from '../dto/criterios.dto';
import { PrismaService } from 'src/prisma/primsa.service';

@Injectable()
export class CriteriosEvaluadorService {
  constructor(
    private readonly prisma: PrismaService
  ) {}
  async evaluarDocente(
    docenteId: number,
    materiaId: number,
    criterios: DocenteCriteria,
    horarioId: number
  ): Promise<{ puntaje: number; detalle: Record<string, number> }> {
    const docente = await this.prisma.docente.findUnique({
      where: {
        pk_id: docenteId,
      }
    })

    if (!docente) {
      console.warn(`Docente con ID ${docenteId} no encontrado`);
      return null;
    }    
    
    const detalle: Record<string, number> = {};
    let total = 0;

    // Antigüedad (años desde ingreso)
    const antiguedad = Math.max(0, Math.floor(
      (new Date().getTime() - new Date(docente.fecha_ingreso).getTime()) /
      (1000 * 60 * 60 * 24 * 365)
    ));
    const antiguedadPts = antiguedad * criterios.antiguedad;
    detalle.antiguedad = antiguedadPts;
    total += antiguedadPts;

    // Consultar cuántos bloques ya tiene ocupados ese docente en este horario
    const asignacionesDocente = await this.prisma.asignacion.findMany({
      where: {
        fk_id_docente: docente.pk_id,
        fk_id_horario: horarioId
      },
      select: { fk_id_bloque: true }
    });
    
    const asignacionesOcupadas = asignacionesDocente.length;
    const asignacionesTotales = await this.prisma.asignacion.count();
    const disponibilidadNormalizada = 1 - (asignacionesOcupadas / asignacionesTotales);
    const disponibilidadPts = disponibilidadNormalizada * criterios.disponibilidad * 10;
    
    detalle.disponibilidad = disponibilidadPts;
    total += disponibilidadPts;

    // Experiencia (según campo en la relación docente_materia)
    const rel = await this.prisma.docente_materia.findFirst({
      where: {
        fk_id_docente: docente.pk_id,
        fk_id_materia: materiaId
      }
    })
    
    if (!rel) {
      detalle.experiencia = 0;
      detalle.especialidad = 0;
    } else {
      const experiencia = rel.experiencia_anios
      const experienciaPts = experiencia * criterios.experiencia;
      detalle.experiencia = experienciaPts;
      total += experienciaPts;
    
      const especialidad = rel.tiene_especialidad ? 1 : 0;
      const especialidadPts = especialidad * criterios.especialidad;
      detalle.especialidad = especialidadPts;
      total += especialidadPts;
    }
    
    return { puntaje: total, detalle };
  }

  evaluarAula(aula: aula, criterios: AulaCriteria): { puntaje: number; detalle: Record<string, number> } {
    const detalle: Record<string, number> = {};
    let total = 0;

    // Capacidad
    const capacidadPts = aula.capacidad * criterios.capacidad;
    detalle.capacidad = capacidadPts;
    total += capacidadPts;

    // Equipamiento (simplificado: tipo laboratorio => mejor)
    const esEquipado = aula.tipo === tipo_aula.laboratorio || aula.tipo === tipo_aula.taller;
    const equipamientoPts = (esEquipado ? 1 : 0) * criterios.equipamiento;
    detalle.equipamiento = equipamientoPts;
    total += equipamientoPts;

    // Ubicación (simplificado: mientras menor sea el número de posicion, mejor)
    const ubicacionPts = (300 - aula.posicion) * criterios.ubicacion;
    detalle.ubicacion = ubicacionPts;
    total += ubicacionPts;

    return { puntaje: total, detalle };
  }
}
