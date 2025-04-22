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
exports.HorarioService = void 0;
const common_1 = require("@nestjs/common");
const primsa_service_1 = require("../prisma/primsa.service");
const horario_builder_service_1 = require("./services/horario-builder.service");
const criterios_evaluador_service_1 = require("./services/criterios-evaluador.service");
const client_1 = require("@prisma/client");
let HorarioService = class HorarioService {
    constructor(prisma, evaluador, builder) {
        this.prisma = prisma;
        this.evaluador = evaluador;
        this.builder = builder;
    }
    async generarHorario(dto) {
        const bloques = await this.builder.obtenerOCrearBloques(dto.bloques);
        const horarios = await this.builder.obtenerOCrearHorarios(dto.anioEscolarId, dto.dias);
        const resultado = [];
        for (const cursoId of dto.cursoIds) {
            const asignacionesCurso = [];
            const cursoMaterias = await this.prisma.curso_materia.findMany({
                where: { fk_id_curso: cursoId },
                include: { materia: true },
            });
            for (const dia of dto.dias) {
                const horario = horarios.find(h => h.dia === dia);
                const bloqueDatas = [];
                for (const bloque of bloques) {
                    await this.prisma.asignacion.updateMany({
                        where: {
                            fk_id_horario: horario.pk_id,
                            fk_id_curso: cursoId,
                            fk_id_bloque: bloque.pk_id,
                            esta_activo: true
                        },
                        data: {
                            esta_activo: false
                        }
                    });
                    if (bloque.tipo === client_1.tipo_bloque.clase) {
                        const materias = cursoMaterias.map(cm => cm.materia);
                        const materia = materias[Math.floor(Math.random() * materias.length)];
                        const docente = await this.builder.seleccionarDocente(materia.pk_id, dto.criterios.docente, horario.pk_id, bloque.pk_id);
                        const aula = await this.builder.seleccionarAula(materia, dto.criterios.aula, horario, bloque);
                        if (!aula) {
                            bloqueDatas.push({
                                bloque,
                                tipo: 'recursos',
                                motivo: 'Sin aula disponible'
                            });
                            continue;
                        }
                        ;
                        const conflicto = await this.prisma.asignacion.findFirst({
                            where: {
                                fk_id_bloque: bloque.pk_id,
                                fk_id_horario: horario.pk_id,
                                esta_activo: true,
                                OR: [
                                    { fk_id_docente: docente.pk_id },
                                    { fk_id_aula: aula.pk_id },
                                    { fk_id_curso: cursoId }
                                ]
                            }
                        });
                        if (conflicto) {
                            bloqueDatas.push({
                                bloque,
                                tipo: 'recursos',
                                motivo: 'Sin docente disponible'
                            });
                            continue;
                        }
                        ;
                        const docenteEval = await this.evaluador.evaluarDocente(docente.pk_id, materia.pk_id, dto.criterios.docente, horario.pk_id);
                        const aulaEval = this.evaluador.evaluarAula(aula, dto.criterios.aula);
                        await this.prisma.asignacion.create({
                            data: {
                                fk_id_bloque: bloque.pk_id,
                                fk_id_horario: horario.pk_id,
                                fk_id_aula: aula.pk_id,
                                fk_id_curso: cursoId,
                                fk_id_docente: docente.pk_id,
                                fk_id_materia: materia.pk_id,
                                esta_activo: true,
                                justificacion: 'Generado automáticamente',
                                puntuacion_total: docenteEval.puntaje + aulaEval.puntaje,
                                puntuacion_detalle: JSON.stringify({
                                    docente: docenteEval.detalle,
                                    aula: aulaEval.detalle
                                }),
                            }
                        });
                        bloqueDatas.push({
                            bloque,
                            docente,
                            aula,
                            materia
                        });
                    }
                    else {
                        await this.prisma.asignacion.create({
                            data: {
                                fk_id_bloque: bloque.pk_id,
                                fk_id_horario: horario.pk_id,
                                esta_activo: true,
                                justificacion: `Reservado para ${bloque.tipo}`,
                            }
                        });
                        bloqueDatas.push({
                            bloque,
                        });
                    }
                }
                asignacionesCurso.push({
                    dia,
                    data: bloqueDatas
                });
            }
            const curso = await this.prisma.curso.findFirst({
                where: {
                    pk_id: cursoId
                }
            });
            resultado.push({
                curso,
                asignaciones: asignacionesCurso
            });
        }
        return {
            mensaje: 'Horario generado exitosamente',
            resultado,
        };
    }
};
exports.HorarioService = HorarioService;
exports.HorarioService = HorarioService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [primsa_service_1.PrismaService,
        criterios_evaluador_service_1.CriteriosEvaluadorService,
        horario_builder_service_1.HorarioBuilderService])
], HorarioService);
//# sourceMappingURL=horario.service.js.map