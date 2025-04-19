import { GenerarHorarioDto } from './dto/generar-horario.dto';
import { HorarioService } from './horario.service';
export declare class HorarioController {
    private readonly horarioService;
    constructor(horarioService: HorarioService);
    generarHorario(dto: GenerarHorarioDto): Promise<{
        mensaje: string;
        horarios: {
            pk_id: number;
            fk_id_periodo: number;
            dia: import(".prisma/client").$Enums.dia_semana;
            esta_activo: boolean;
        }[];
    }>;
}
