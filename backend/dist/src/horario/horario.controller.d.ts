import { GenerarHorarioDto } from './dto/generar-horario.dto';
import { HorarioService } from './horario.service';
export declare class HorarioController {
    private readonly horarioService;
    constructor(horarioService: HorarioService);
    generarHorario(dto: GenerarHorarioDto): Promise<GenerarHorarioDto>;
}
