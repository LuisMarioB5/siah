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
exports.HorarioBuilderService = void 0;
const common_1 = require("@nestjs/common");
const primsa_service_1 = require("../../prisma/primsa.service");
const criterios_evaluador_service_1 = require("./criterios-evaluador.service");
let HorarioBuilderService = class HorarioBuilderService {
    constructor(prisma, evaluador) {
        this.prisma = prisma;
        this.evaluador = evaluador;
    }
    async obtenerOCrearBloques(bloquesDto) {
        const bloques = [];
        for (const dto of bloquesDto) {
            let bloque = await this.prisma.bloque.findFirst({
                where: {
                    tipo: dto.tipo,
                    hora_inicio: new Date(dto.hora_inicio),
                    hora_fin: new Date(dto.hora_fin),
                },
            });
            if (!bloque) {
                bloque = await this.prisma.bloque.create({
                    data: {
                        tipo: dto.tipo,
                        hora_inicio: new Date(dto.hora_inicio),
                        hora_fin: new Date(dto.hora_fin),
                        observacion: dto.observacion,
                    },
                });
            }
            bloques.push(bloque);
        }
        return bloques;
    }
    async obtenerOCrearHorarios(anioEscolarId, dias) {
        const horarios = [];
        for (const dia of dias) {
            await this.prisma.horario_generado.updateMany({
                where: {
                    fk_id_anio_escolar: anioEscolarId,
                    dia
                },
                data: {
                    esta_activo: false
                }
            });
            let horario = await this.prisma.horario_generado.findFirst({
                where: {
                    fk_id_anio_escolar: anioEscolarId,
                    dia,
                },
            });
            if (!horario) {
                horario = await this.prisma.horario_generado.create({
                    data: {
                        fk_id_anio_escolar: anioEscolarId,
                        dia,
                        esta_activo: true
                    },
                });
            }
            await this.prisma.horario_generado.update({
                where: {
                    pk_id: horario.pk_id
                },
                data: {
                    esta_activo: true
                }
            });
            horarios.push(horario);
        }
        return horarios;
    }
    async seleccionarDocente(materiaId, criterios, horarioId, bloqueId) {
        const docentesRaw = await this.prisma.docente_materia.findMany({
            where: {
                fk_id_materia: materiaId
            },
        });
        let mejor = null;
        for (const docente of docentesRaw) {
            const yaAsignado = await this.prisma.asignacion.findFirst({
                where: {
                    fk_id_docente: docente.fk_id_docente,
                    fk_id_horario: horarioId,
                    fk_id_bloque: bloqueId,
                    esta_activo: true
                }
            });
            if (yaAsignado) {
                continue;
            }
            const resultado = await this.evaluador.evaluarDocente(docente.fk_id_docente, materiaId, criterios, horarioId);
            if (resultado && (!mejor || resultado.puntaje > mejor.puntaje)) {
                mejor = {
                    docenteId: docente.fk_id_docente,
                    puntaje: resultado.puntaje,
                    detalle: resultado.detalle
                };
            }
        }
        const mejorDocente = await this.prisma.docente.findFirst({
            where: {
                pk_id: mejor?.docenteId
            }, include: {
                persona: true
            }
        });
        return mejorDocente ?? null;
    }
    async seleccionarAula(materia, criterios, horario, bloque) {
        const condiciones = {};
        if (materia.requiere_lab) {
            condiciones.tiene_lab = true;
        }
        if (materia.requiere_pc) {
            condiciones.tiene_pc = true;
        }
        const aulas = await this.prisma.aula.findMany({
            where: condiciones,
        });
        let mejor = null;
        for (const aula of aulas) {
            const yaAsignada = await this.prisma.asignacion.findFirst({
                where: {
                    fk_id_aula: aula.pk_id,
                    fk_id_horario: horario.pk_id,
                    fk_id_bloque: bloque.pk_id,
                    esta_activo: true
                }
            });
            if (yaAsignada) {
                continue;
            }
            const resultado = this.evaluador.evaluarAula(aula, criterios);
            if (!resultado)
                return null;
            if (!mejor || resultado.puntaje > mejor.puntaje) {
                mejor = {
                    aula,
                    puntaje: resultado.puntaje,
                    detalle: resultado.detalle
                };
            }
        }
        return mejor?.aula ?? null;
    }
};
exports.HorarioBuilderService = HorarioBuilderService;
exports.HorarioBuilderService = HorarioBuilderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [primsa_service_1.PrismaService,
        criterios_evaluador_service_1.CriteriosEvaluadorService])
], HorarioBuilderService);
//# sourceMappingURL=horario-builder.service.js.map