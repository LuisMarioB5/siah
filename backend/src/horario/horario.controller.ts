import { Body, Controller, Post } from '@nestjs/common';
import { GenerarHorarioDto } from './dto/generar-horario.dto';
import { HorarioService } from './horario.service';

@Controller('horario')
export class HorarioController {
  constructor(private readonly horarioService: HorarioService) {}

  @Post('generar')
  async generarHorario(@Body() dto: GenerarHorarioDto) {
    return await this.horarioService.generarHorario(dto);
  }
}
