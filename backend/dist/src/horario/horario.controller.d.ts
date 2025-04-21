import { GenerarHorarioDto } from './dto/generar-horario.dto';
import { HorarioService } from './horario.service';
export declare class HorarioController {
    private readonly horarioService;
    constructor(horarioService: HorarioService);
    generarHorario(dto: GenerarHorarioDto): Promise<{
        mensaje: string;
        resultados: {
            cursoId: number;
            horarios: {
                dia: import(".prisma/client").dia_semana;
                asignaciones: import(".prisma/client").asignacion[];
            }[];
        }[];
    }>;
}
