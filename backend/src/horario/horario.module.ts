import { Module } from '@nestjs/common';
import { HorarioService } from './horario.service';
import { HorarioController } from './horario.controller';
import { PrismaService } from 'src/prisma/primsa.service';

@Module({
  providers: [HorarioService, PrismaService],
  controllers: [HorarioController]
})
export class HorarioModule {}
