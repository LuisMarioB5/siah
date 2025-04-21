import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/primsa.service';
import { GenerarHorarioDto } from './dto/generar-horario.dto';
import { HorarioBuilderService } from './services/horario-builder.service';
import { CriteriosEvaluadorService } from './services/criterios-evaluador.service';
import { AulaCriteria, DocenteCriteria } from './dto/criterios.dto';
import { bloque, horario_generado, tipo_bloque } from '@prisma/client';

@Injectable()
export class HorarioService {
  constructor(
    private prisma: PrismaService,
    private evaluador: CriteriosEvaluadorService,
    private builder: HorarioBuilderService,
  ) {}

  async generarHorario(dto: GenerarHorarioDto) {
    const bloques = await this.builder.obtenerOCrearBloques(dto.bloques);
    const horarios = await this.builder.obtenerOCrearHorarios(dto.anioEscolarId, dto.dias);
    const resultado: any[] = [];
    const advertencias: any[] = [];
    
    
    for (const cursoId of dto.cursoIds) {
      const asignacionesCurso: any[] = [];

      const cursoMaterias = await this.prisma.curso_materia.findMany({
        where: { fk_id_curso: cursoId },
        include: { materia: true },
      });
  
      const conteoMaterias = new Map<number, number>();
  
      for (const dia of dto.dias) {
        const horario = horarios.find(h => h.dia === dia);
        const bloqueDatas: any[] = [];

        for (const bloque of bloques) {
          await this.prisma.asignacion.updateMany({
            where: {
              fk_id_horario: horario.pk_id,
              fk_id_curso: cursoId,
              fk_id_bloque: bloque.pk_id,
              esta_activo: true
            },
            data: {
              esta_activo: false
            }
          })

          if(bloque.tipo === tipo_bloque.clase) {
              // Elegir materia menos repetida
              const materia = cursoMaterias
                .map(cm => cm.materia)
                .sort((a, b) => (conteoMaterias.get(a.pk_id) || 0) - (conteoMaterias.get(b.pk_id) || 0))[0];
              const docente = await this.builder.seleccionarDocente(materia.pk_id, dto.criterios.docente, horario.pk_id, bloque.pk_id);
              const aula = await this.builder.seleccionarAula(materia, dto.criterios.aula, horario, bloque);
      
              if (!docente || !aula) {
                advertencias.push({
                  cursoId,
                  dias: {
                    dia,
                    data: {
                      tipo: 'recursos',
                      bloqueId: bloque.pk_id,
                      motivo: !docente ? 'Sin docente disponible' : 'Sin aula disponible'
                    }
                  }
                });

                continue;
              };
      
              // Verificar conflictos
              const conflicto = await this.prisma.asignacion.findFirst({
                where: {
                  fk_id_bloque: bloque.pk_id,
                  fk_id_horario: horario.pk_id,
                  esta_activo: true,
                  OR: [
                    { fk_id_docente: docente.pk_id },
                    { fk_id_aula: aula.pk_id },
                    { fk_id_curso: cursoId }
                  ]
                }
              });
      
              if (conflicto) {
                advertencias.push({
                  conflicto: {
                    tipo: 'choque',
                    motivo: 'Conflicto al tratar de realizar una asignacion'
                  }
                });

                continue;
              };
    
              const docenteEval = await this.evaluador.evaluarDocente(docente.pk_id, materia.pk_id, dto.criterios.docente, horario.pk_id);
              const aulaEval = this.evaluador.evaluarAula(aula, dto.criterios.aula);
              
              await this.prisma.asignacion.create({
                data: {
                  fk_id_bloque: bloque.pk_id,
                  fk_id_horario: horario.pk_id,
                  fk_id_aula: aula.pk_id,
                  fk_id_curso: cursoId,
                  fk_id_docente: docente.pk_id,
                  fk_id_materia: materia.pk_id,
                  esta_activo: true,
                  justificacion: 'Generado automáticamente',
                  puntuacion_total: docenteEval.puntaje + aulaEval.puntaje,
                  puntuacion_detalle: JSON.stringify({
                    docente: docenteEval.detalle,
                    aula: aulaEval.detalle
                  }),
                }
              });
      
              conteoMaterias.set(materia.pk_id, (conteoMaterias.get(materia.pk_id) || 0) + 1);
      
              bloqueDatas.push({
                bloque,
                docente,
                aula,
                materia
              });
          } else {
            await this.prisma.asignacion.create({
              data: {
                fk_id_bloque: bloque.pk_id,
                fk_id_horario: horario.pk_id,
                esta_activo: true,
                justificacion: `Reservado para ${bloque.tipo}`,
              }
            });
    
            bloqueDatas.push({
              bloque,
            });
          }
        }

        asignacionesCurso.push({
          dia,
          data: bloqueDatas
        })
      }

      resultado.push({
        cursoId,
        asignaciones: asignacionesCurso
      });
    }

    return {
      mensaje: 'Horario generado exitosamente',
      resultado,
      advertencias,
    };
  }
}
