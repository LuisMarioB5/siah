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
exports.CriteriosEvaluadorService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const primsa_service_1 = require("../../prisma/primsa.service");
let CriteriosEvaluadorService = class CriteriosEvaluadorService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async evaluarDocente(docenteId, materiaId, criterios, horarioId) {
        const docente = await this.prisma.docente.findUnique({
            where: {
                pk_id: docenteId,
            }
        });
        if (!docente) {
            console.warn(`Docente con ID ${docenteId} no encontrado`);
            return null;
        }
        const detalle = {};
        let total = 0;
        const antiguedad = Math.max(0, Math.floor((new Date().getTime() - new Date(docente.fecha_ingreso).getTime()) /
            (1000 * 60 * 60 * 24 * 365)));
        const antiguedadPts = antiguedad * criterios.antiguedad;
        detalle.antiguedad = antiguedadPts;
        total += antiguedadPts;
        const asignacionesDocente = await this.prisma.asignacion.findMany({
            where: {
                fk_id_docente: docente.pk_id,
                fk_id_horario: horarioId
            },
            select: { fk_id_bloque: true }
        });
        const asignacionesOcupadas = asignacionesDocente.length;
        const asignacionesTotales = await this.prisma.asignacion.count();
        const disponibilidadNormalizada = 1 - (asignacionesOcupadas / asignacionesTotales);
        const disponibilidadPts = disponibilidadNormalizada * criterios.disponibilidad * 10;
        detalle.disponibilidad = disponibilidadPts;
        total += disponibilidadPts;
        const rel = await this.prisma.docente_materia.findFirst({
            where: {
                fk_id_docente: docente.pk_id,
                fk_id_materia: materiaId
            }
        });
        if (!rel) {
            detalle.experiencia = 0;
            detalle.especialidad = 0;
        }
        else {
            const experiencia = rel.experiencia_anios;
            const experienciaPts = experiencia * criterios.experiencia;
            detalle.experiencia = experienciaPts;
            total += experienciaPts;
            const especialidad = rel.tiene_especialidad ? 1 : 0;
            const especialidadPts = especialidad * criterios.especialidad;
            detalle.especialidad = especialidadPts;
            total += especialidadPts;
        }
        return { puntaje: total, detalle };
    }
    evaluarAula(aula, criterios) {
        const detalle = {};
        let total = 0;
        const capacidadPts = aula.capacidad * criterios.capacidad;
        detalle.capacidad = capacidadPts;
        total += capacidadPts;
        const esEquipado = aula.tipo === client_1.tipo_aula.laboratorio || aula.tipo === client_1.tipo_aula.taller;
        const equipamientoPts = (esEquipado ? 1 : 0) * criterios.equipamiento;
        detalle.equipamiento = equipamientoPts;
        total += equipamientoPts;
        const ubicacionPts = (300 - aula.posicion) * criterios.ubicacion;
        detalle.ubicacion = ubicacionPts;
        total += ubicacionPts;
        return { puntaje: total, detalle };
    }
};
exports.CriteriosEvaluadorService = CriteriosEvaluadorService;
exports.CriteriosEvaluadorService = CriteriosEvaluadorService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [primsa_service_1.PrismaService])
], CriteriosEvaluadorService);
//# sourceMappingURL=criterios-evaluador.service.js.map