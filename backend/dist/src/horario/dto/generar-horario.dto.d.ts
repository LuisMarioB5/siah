import { tipo_bloque, dia_semana } from '@prisma/client';
export declare class BloqueDto {
    tipo: tipo_bloque;
    hora_inicio: string;
    hora_fin: string;
    observacion: string;
}
export declare class GenerarHorarioDto {
    anioEscolarId: number;
    cursoIds: number[];
    dias: dia_semana[];
    bloques: BloqueDto[];
}
