import { Module } from '@nestjs/common';
import { HorarioService } from './horario.service';
import { HorarioController } from './horario.controller';
import { PrismaService } from 'src/prisma/primsa.service';
import { CriteriosEvaluadorService } from './services/criterios-evaluador.service';
import { HorarioBuilderService } from './services/horario-builder.service';

@Module({
  providers: [HorarioService, PrismaService, CriteriosEvaluadorService, HorarioBuilderService],
  controllers: [HorarioController]
})
export class HorarioModule {}
