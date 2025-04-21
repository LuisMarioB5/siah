import { PrismaService } from 'src/prisma/primsa.service';
import { GenerarHorarioDto } from './dto/generar-horario.dto';
import { HorarioBuilderService } from './services/horario-builder.service';
import { CriteriosEvaluadorService } from './services/criterios-evaluador.service';
export declare class HorarioService {
    private prisma;
    private evaluador;
    private builder;
    constructor(prisma: PrismaService, evaluador: CriteriosEvaluadorService, builder: HorarioBuilderService);
    generarHorario(dto: GenerarHorarioDto): Promise<{
        mensaje: string;
        resultado: any[];
        advertencias: any[];
    }>;
}
