import { aula } from '@prisma/client';
import { AulaCriteria, DocenteCriteria } from '../dto/criterios.dto';
import { PrismaService } from 'src/prisma/primsa.service';
export declare class CriteriosEvaluadorService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    evaluarDocente(docenteId: number, materiaId: number, criterios: DocenteCriteria, horarioId: number): Promise<{
        puntaje: number;
        detalle: Record<string, number>;
    }>;
    evaluarAula(aula: aula, criterios: AulaCriteria): {
        puntaje: number;
        detalle: Record<string, number>;
    };
}
