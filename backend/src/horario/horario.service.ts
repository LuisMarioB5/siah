import { Injectable } from '@nestjs/common';
import { BloqueDto, GenerarHorarioDto } from './dto/generar-horario.dto';
import { PrismaService } from 'src/prisma/primsa.service';
import { dia_semana, horario_generado, tipo_bloque } from '@prisma/client';

@Injectable()
export class HorarioService {
  constructor(private readonly prisma: PrismaService) {}

  async generarHorario(dto: GenerarHorarioDto) {
    const horarios: horario_generado[] = [];

    for(const dia of dto.dias) {    
      const horario_generado = await this.obtenerOCrearHorario(dto.anioEscolarId, dia);
      horario_generado.esta_activo = true;
      horarios.push(horario_generado);

      for(const bloqueDTO of dto.bloques) {
        const bloque = await this.obtenerOCrearBloque(bloqueDTO);

        if(bloque.tipo === tipo_bloque.clase) {
          for(const cursoId of dto.cursoIds) {
            const curso = await this.prisma.curso.findUnique({
              where: {
                pk_id: cursoId,
              }
            });
            
            await this.prisma.asignacion.updateMany({
              where: {
                fk_id_bloque: bloque.pk_id,
                fk_id_curso: curso.pk_id
              },
              data: {
                esta_activo: false
              }
            });
            
            // TODO: Desde aqui hay que modificar y aplicar lo 'inteligente'
            const materiaRelacionada = await this.prisma.curso_materia.findFirst({
              where: { fk_id_curso: cursoId },
              include: { materia: true }
            });
            
            const docentesRelacionados = await this.prisma.docente_materia.findMany({
              where: { fk_id_materia: materiaRelacionada?.fk_id_materia }
            });
            
            const docenteAsignado = docentesRelacionados[0];
            
            const aula = await this.prisma.aula.findFirst();
            // TODO: Hasta aqui se debe de modificar y aplicar lo 'inteligente'
            
            await this.prisma.asignacion.create({
              data: {
                fk_id_aula: aula.pk_id,
                fk_id_bloque: bloque.pk_id,
                fk_id_curso: curso.pk_id,
                fk_id_docente: docenteAsignado.pk_id,
                fk_id_horario: horario_generado.pk_id,
                fk_id_materia: materiaRelacionada.pk_id,
                justificacion: 'Asignado automáticamente según disponibilidad'
              }
            })
          }
        } else {
          // Receso o almuerzo
          await this.prisma.asignacion.create({
            data: {
              fk_id_bloque: bloque.pk_id,
              fk_id_horario: horario_generado.pk_id,
              justificacion: 'Bloque reservado para ' + bloque.tipo
            }
          })
        }
      }
    }
    
    return { mensaje: 'Horario generado', horarios };
  }
    
  private async obtenerOCrearHorario(periodoId: number, dia: dia_semana) {
    const horarioExistente = await this.prisma.horario_generado.findFirst({
      where: {
        fk_id_periodo: periodoId,
        dia,
      },
    });
  
    if (horarioExistente) return horarioExistente;
  
    return await this.prisma.horario_generado.create({
      data: {
        fk_id_periodo: periodoId,
        dia,
      },
    });
  }
  
      
  private async obtenerOCrearBloque(dto: BloqueDto) {
    const bloqueExistente = await this.prisma.bloque.findFirst({
      where: {
        tipo: dto.tipo,
        hora_inicio: dto.hora_inicio,
        hora_fin: dto.hora_fin,
      },
    });

    if (bloqueExistente) return bloqueExistente; 

    return this.prisma.bloque.create({
      data: {
        tipo: dto.tipo,
        hora_inicio: dto.hora_inicio,
        hora_fin: dto.hora_fin,
        observacion: dto.observacion,
      },
    });
  } 
}
