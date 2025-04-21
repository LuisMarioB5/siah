import { PrismaService } from 'src/prisma/primsa.service';
import { GenerarHorarioDto } from './dto/generar-horario.dto';
import { BloqueDto } from './dto/bloque.dto';
import { dia_semana, asignacion } from '@prisma/client';
export { BloqueDto };
export declare class HorarioService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    generarHorario(dto: GenerarHorarioDto): Promise<{
        mensaje: string;
        resultados: {
            cursoId: number;
            horarios: {
                dia: dia_semana;
                asignaciones: asignacion[];
            }[];
        }[];
    }>;
    private _getOrCreateHorario;
    private _markHorarioActivo;
    private _getOrCreateBloque;
    private _deactivateExisting;
    private _pickRandomMateria;
    private _pickBestDocente;
    private _pickBestAula;
}
