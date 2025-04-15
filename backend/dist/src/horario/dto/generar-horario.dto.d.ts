import { tipo_bloque, dia_semana } from '@prisma/client';
export declare class BloqueDto {
    tipo: tipo_bloque;
    hora_inicio: Date;
    hora_fin: Date;
    observacion: string;
}
export declare class GenerarHorarioDto {
    anioEscolarId: number;
    cursoId: number;
    materiasIds: number[];
    docentesIds: number[];
    dias: dia_semana[];
    aulasIds: number[];
    bloques: BloqueDto[];
}
