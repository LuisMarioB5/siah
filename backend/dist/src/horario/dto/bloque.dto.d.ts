import { tipo_bloque } from '@prisma/client';
export declare class BloqueDto {
    tipo: tipo_bloque;
    hora_inicio: string;
    hora_fin: string;
    observacion?: string;
}
