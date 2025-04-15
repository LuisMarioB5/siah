import { Module } from '@nestjs/common';
import { AsignacionCatalogoController } from './asignacion-catalogo.controller';
import { AsignacionCatalogoService } from './asignacion-catalogo.service';
import { PrismaService } from 'src/prisma/primsa.service';

@Module({
  providers: [AsignacionCatalogoService, PrismaService],
  controllers: [AsignacionCatalogoController],
})
export class AsignacionCatalogoModule {}
