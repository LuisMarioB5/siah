import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HorarioModule } from './horario/horario.module';
import { AsignacionCatalogoModule } from './asignacion-catalogo/asignacion-catalogo.module';

@Module({
  imports: [HorarioModule, AsignacionCatalogoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
