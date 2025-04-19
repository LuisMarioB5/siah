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
const client_1 = require("@prisma/client");
let HorarioService = class HorarioService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async generarHorario(dto) {
        const horarios = [];
        for (const dia of dto.dias) {
            const horario_generado = await this.obtenerOCrearHorario(dto.anioEscolarId, dia);
            horario_generado.esta_activo = true;
            horarios.push(horario_generado);
            for (const bloqueDTO of dto.bloques) {
                const bloque = await this.obtenerOCrearBloque(bloqueDTO);
                if (bloque.tipo === client_1.tipo_bloque.clase) {
                    for (const cursoId of dto.cursoIds) {
                        const curso = await this.prisma.curso.findUnique({
                            where: {
                                pk_id: cursoId,
                            }
                        });
                        console.log({
                            bloqueId: bloque.pk_id,
                            cursoId: curso.pk_id
                        });
                        const existentes = await this.prisma.asignacion.findMany({
                            where: {
                                fk_id_bloque: bloque.pk_id,
                                fk_id_curso: curso.pk_id
                            }
                        });
                        console.log('Asignaciones a desactivar:', existentes.length);
                        await this.prisma.asignacion.updateMany({
                            where: {
                                fk_id_bloque: bloque.pk_id,
                                fk_id_curso: curso.pk_id
                            },
                            data: {
                                esta_activo: false
                            }
                        });
                        const materiaRelacionada = await this.prisma.curso_materia.findFirst({
                            where: { fk_id_curso: cursoId },
                            include: { materia: true }
                        });
                        const docentesRelacionados = await this.prisma.docente_materia.findMany({
                            where: { fk_id_materia: materiaRelacionada?.fk_id_materia }
                        });
                        const docenteAsignado = docentesRelacionados[0];
                        const aula = await this.prisma.aula.findFirst();
                        await this.prisma.asignacion.create({
                            data: {
                                fk_id_aula: aula.pk_id,
                                fk_id_bloque: bloque.pk_id,
                                fk_id_curso: curso.pk_id,
                                fk_id_docente: docenteAsignado.pk_id,
                                fk_id_horario: horario_generado.pk_id,
                                fk_id_materia: materiaRelacionada.pk_id,
                                justificacion: 'Asignado automáticamente según disponibilidad'
                            }
                        });
                    }
                }
                else {
                    await this.prisma.asignacion.create({
                        data: {
                            fk_id_bloque: bloque.pk_id,
                            fk_id_horario: horario_generado.pk_id,
                            justificacion: 'Bloque reservado para ' + bloque.tipo
                        }
                    });
                }
            }
        }
        return { mensaje: 'Horario generado', horarios };
    }
    async obtenerOCrearHorario(periodoId, dia) {
        const horarioExistente = await this.prisma.horario_generado.findFirst({
            where: {
                fk_id_periodo: periodoId,
                dia,
            },
        });
        if (horarioExistente)
            return horarioExistente;
        return await this.prisma.horario_generado.create({
            data: {
                fk_id_periodo: periodoId,
                dia,
            },
        });
    }
    async obtenerOCrearBloque(dto) {
        const bloqueExistente = await this.prisma.bloque.findFirst({
            where: {
                tipo: dto.tipo,
                hora_inicio: dto.hora_inicio,
                hora_fin: dto.hora_fin,
            },
        });
        if (bloqueExistente)
            return bloqueExistente;
        return this.prisma.bloque.create({
            data: {
                tipo: dto.tipo,
                hora_inicio: dto.hora_inicio,
                hora_fin: dto.hora_fin,
                observacion: dto.observacion,
            },
        });
    }
};
exports.HorarioService = HorarioService;
exports.HorarioService = HorarioService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [primsa_service_1.PrismaService])
], HorarioService);
//# sourceMappingURL=horario.service.js.map