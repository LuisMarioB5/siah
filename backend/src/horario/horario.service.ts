import { Injectable } from '@nestjs/common';
import { BloqueDto, GenerarHorarioDto } from './dto/generar-horario.dto';
import { PrismaService } from 'src/prisma/primsa.service';
import { aula, tipo_aula, tipo_bloque } from '@prisma/client';

@Injectable()
export class HorarioService {
    constructor(private readonly prisma: PrismaService) {}

    async generarHorario(dto: GenerarHorarioDto) {
        // // 1. Revisar el periodo del horario
        // const anioEscolar = await this.prisma.anio_escolar.findUnique({
        //   where: { pk_id: dto.anioEscolarId },
        // });
        // if (!anioEscolar) {
        //   throw new Error('Se necesita un año escolar para vincular al horario.');
        // }
      
        // // 2. Verificar que haya al menos un bloque
        // if (!dto.bloques.length) {
        //   throw new Error('Debe proveerse al menos un bloque en el horario.');
        // }
      
        // // 3. Verificar que haya al menos un bloque de tipo clase
        // const contieneBloqueClase = dto.bloques.some(b => b.tipo === tipo_bloque.clase);
        // if (!contieneBloqueClase) {
        //   throw new Error('Debe haber al menos un bloque de tipo "clase".');
        // }
      
        // // 4. Consultar materias
        // const materias = await this.prisma.materia.findMany({
        //   where: { pk_id: { in: dto.materiasIds } },
        // });
        // if (!materias.length) {
        //   throw new Error('No hay materias disponibles.');
        // }
      
        // // 5. Consultar docentes
        // const docentes = await this.prisma.docente.findMany({
        //   where: { pk_id: { in: dto.docentesIds } },
        // });
        // if (!docentes.length) {
        //   throw new Error('No hay docentes disponibles.');
        // }
      
        // // 6. Consultar aulas
        // const aulas = await this.prisma.aula.findMany({
        //   where: { pk_id: { in: dto.aulasIds } },
        // });
        // if (!aulas.length) {
        //   throw new Error('No hay aulas disponibles.');
        // }
      
        // // 7. Crear horario
        // const horario = [];
        // let indiceBloque = 0;
        // let indiceMateria = 0;
      
        // for (const dia of dto.dias) {
        //   const asignaciones = [];
      
        //   for (const bloqueDto of dto.bloques) {
        //     // Obtener o crear el bloque (puedes reutilizar el método que hicimos antes)
        //     const bloque = await this.obtenerOBloquearBloque(bloqueDto);
      
        //     if (bloque.tipo === tipo_bloque.clase) {
        //       const materia = materias[indiceMateria % materias.length];
        //       const docente = docentes[indiceMateria % docentes.length];
      
        //       // Seleccionar aula compatible
        //       let aula: aula | undefined;
        //       if (materia.require_lab) {
        //         aula = aulas.find(a => a.tipo === tipo_aula.laboratorio);
        //       } else {
        //         aula = aulas.find(a => a.tipo !== tipo_aula.laboratorio);
        //       }
      
        //       if (!aula) {
        //         continue;
        //       }
      
        //       asignaciones.push({
        //         aulaId: aula.pk_id,
        //         materiaId: materia.pk_id,
        //         docenteId: docente.pk_id,
        //         bloqueId: bloque.pk_id,
        //       });
      
        //       indiceMateria++;
        //     } else {
        //       // No es clase, igual se agrega el bloque para reflejar receso o almuerzo
        //       asignaciones.push({
        //         bloqueId: bloque.pk_id,
        //       });
        //     }
      
        //     indiceBloque++;
        //   }
      
        //   horario.push({
        //     dia_semana: dia,
        //     asignaciones,
        //     anioEscolar,
        //   });
        // }
      
        // return horario;

        return dto;
      }
      

    private async obtenerOBloquearBloque(dto: BloqueDto) {
        const bloqueExistente = await this.prisma.bloque.findFirst({
        where: {
            tipo: dto.tipo,
            hora_inicio: dto.hora_inicio,
            hora_fin: dto.hora_fin,
          },
        });

        if (bloqueExistente) {
          return bloqueExistente; // Reutiliza el existente
        }

        // Si no existe, lo creamos
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
