import { GenerarHorarioDto } from './dto/generar-horario.dto';
import { PrismaService } from 'src/prisma/primsa.service';
export declare class HorarioService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    generarHorario(dto: GenerarHorarioDto): Promise<{
        mensaje: string;
        horarios: {
            pk_id: number;
            fk_id_periodo: number;
            dia: import(".prisma/client").$Enums.dia_semana;
            esta_activo: boolean;
        }[];
    }>;
    private obtenerOCrearHorario;
    private obtenerOCrearBloque;
}
