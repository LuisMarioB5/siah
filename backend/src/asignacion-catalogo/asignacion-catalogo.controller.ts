import { Controller, Get } from '@nestjs/common';
import { AsignacionCatalogoService } from './asignacion-catalogo.service';

@Controller('asignacion/catalogo')
export class AsignacionCatalogoController {
  constructor(private readonly catalogoService: AsignacionCatalogoService) {}

  @Get('materias')
  public async getMaterias() {
    return await this.catalogoService.getMaterias();
  }

  @Get('docentes')
  public async getDocentes() {
    return await this.catalogoService.getDocentes();
  }

  @Get('aulas')
  public async getAulas() {
    return await this.catalogoService.getAulas();
  }

  @Get('anios-escolares')
  public async getAniosEscolares() {
    return await this.catalogoService.getAniosEscolares();
  }

  @Get('cursos')
  public async getCursos() {
    return await this.catalogoService.getCursos();
  }
}
