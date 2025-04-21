import { BloqueDto } from './bloque.dto';
import { CriteriaDto } from './criterios.dto';
import { dia_semana } from '@prisma/client';
export declare class GenerarHorarioDto {
    anioEscolarId: number;
    cursoIds: number[];
    dias: dia_semana[];
    bloques: BloqueDto[];
    criterios: CriteriaDto;
}
