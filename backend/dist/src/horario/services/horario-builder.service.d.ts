import { PrismaService } from 'src/prisma/primsa.service';
import { BloqueDto } from '../dto/bloque.dto';
import { aula, bloque, dia_semana, docente, horario_generado, materia } from '@prisma/client';
import { CriteriosEvaluadorService } from './criterios-evaluador.service';
import { AulaCriteria, DocenteCriteria } from '../dto/criterios.dto';
export declare class HorarioBuilderService {
    private readonly prisma;
    private readonly evaluador;
    constructor(prisma: PrismaService, evaluador: CriteriosEvaluadorService);
    obtenerOCrearBloques(bloquesDto: BloqueDto[]): Promise<bloque[]>;
    obtenerOCrearHorarios(anioEscolarId: number, dias: dia_semana[]): Promise<horario_generado[]>;
    seleccionarDocente(materiaId: number, criterios: DocenteCriteria, horarioId: number, bloqueId: number): Promise<{
        datos: docente;
        puntaje: number;
    }>;
    seleccionarAula(materia: materia, criterios: AulaCriteria, horario: horario_generado, bloque: bloque): Promise<aula>;
}
