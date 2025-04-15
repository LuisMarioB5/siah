import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/primsa.service';

@Injectable()
export class AsignacionCatalogoService {
  constructor(private readonly prisma: PrismaService) {}

  public async getMaterias() {
    return await this.prisma.materia.findMany();
  }

  public async getDocentes() {
    return await this.prisma.docente.findMany({
      include: {
        persona: true,
      },
    });
  }

  public async getAulas() {
    return await this.prisma.aula.findMany();
  }

  public async getAniosEscolares() {
    const now = new Date();
    return await this.prisma.anio_escolar.findMany({
      where: { fecha_fin: { gte: now } },
      orderBy: { fecha_inicio: 'desc' },
    });
  }

  public async getCursos() {
    return await this.prisma.curso.findMany();
  }
}
