import { GenerarHorarioDto } from './dto/generar-horario.dto';
import { PrismaService } from 'src/prisma/primsa.service';
export declare class HorarioService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    generarHorario(dto: GenerarHorarioDto): Promise<GenerarHorarioDto>;
    private obtenerOBloquearBloque;
}
