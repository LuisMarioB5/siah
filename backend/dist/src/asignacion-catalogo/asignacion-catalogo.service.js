"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsignacionCatalogoService = void 0;
const common_1 = require("@nestjs/common");
const primsa_service_1 = require("../prisma/primsa.service");
let AsignacionCatalogoService = class AsignacionCatalogoService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getMaterias() {
        return await this.prisma.materia.findMany();
    }
    async getDocentes() {
        return await this.prisma.docente.findMany({
            include: {
                persona: true,
            },
        });
    }
    async getAulas() {
        return await this.prisma.aula.findMany();
    }
    async getAniosEscolares() {
        const now = new Date();
        return await this.prisma.anio_escolar.findMany({
            where: { fecha_fin: { gte: now } },
            orderBy: { fecha_inicio: 'desc' },
        });
    }
    async getCursos() {
        return await this.prisma.curso.findMany();
    }
};
exports.AsignacionCatalogoService = AsignacionCatalogoService;
exports.AsignacionCatalogoService = AsignacionCatalogoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [primsa_service_1.PrismaService])
], AsignacionCatalogoService);
//# sourceMappingURL=asignacion-catalogo.service.js.map