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
exports.HorarioService = exports.BloqueDto = void 0;
const common_1 = require("@nestjs/common");
const primsa_service_1 = require("../prisma/primsa.service");
const bloque_dto_1 = require("./dto/bloque.dto");
Object.defineProperty(exports, "BloqueDto", { enumerable: true, get: function () { return bloque_dto_1.BloqueDto; } });
const client_1 = require("@prisma/client");
let HorarioService = class HorarioService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async generarHorario(dto) {
        const resultados = [];
        for (const cursoId of dto.cursoIds) {
            const porCurso = [];
            for (const dia of dto.dias) {
                const horario = await this._getOrCreateHorario(dto.anioEscolarId, dia);
                await this._markHorarioActivo(horario.pk_id);
                const asignacionesDelDia = [];
                for (const bloqueDto of dto.bloques) {
                    const bloque = await this._getOrCreateBloque(bloqueDto);
                    if (bloque.tipo === client_1.tipo_bloque.clase) {
                        await this._deactivateExisting(cursoId, bloque.pk_id, horario.pk_id);
                        const materia = await this._pickRandomMateria(cursoId);
                        if (!materia)
                            continue;
                        const docente = await this._pickBestDocente(materia.pk_id, bloque.pk_id, dto.criterios);
                        if (!docente)
                            continue;
                        const aula = await this._pickBestAula(materia.pk_id, bloque.pk_id, dto.criterios);
                        if (!aula)
                            continue;
                        const asign = await this.prisma.asignacion.create({
                            data: {
                                fk_id_bloque: bloque.pk_id,
                                fk_id_curso: cursoId,
                                fk_id_docente: docente.pk_id,
                                fk_id_aula: aula.pk_id,
                                fk_id_materia: materia.pk_id,
                                fk_id_horario: horario.pk_id,
                                justificacion: 'Asignado de forma inteligente'
                            }
                        });
                        asignacionesDelDia.push(asign);
                    }
                    else {
                        const reserv = await this.prisma.asignacion.create({
                            data: {
                                fk_id_bloque: bloque.pk_id,
                                fk_id_horario: horario.pk_id,
                                justificacion: `Reservado para ${bloque.tipo}`
                            }
                        });
                        asignacionesDelDia.push(reserv);
                    }
                }
                porCurso.push({ dia, asignaciones: asignacionesDelDia });
            }
            resultados.push({ cursoId, horarios: porCurso });
        }
        return { mensaje: 'Horario generado', resultados };
    }
    async _getOrCreateHorario(anioId, dia) {
        return ((await this.prisma.horario_generado.findFirst({
            where: { fk_id_anio_escolar: anioId, dia }
        })) ??
            (await this.prisma.horario_generado.create({
                data: { fk_id_anio_escolar: anioId, dia }
            })));
    }
    async _markHorarioActivo(pk) {
        await this.prisma.horario_generado.update({
            where: { pk_id: pk },
            data: { esta_activo: true }
        });
    }
    async _getOrCreateBloque(dto) {
        return ((await this.prisma.bloque.findFirst({
            where: {
                tipo: dto.tipo,
                hora_inicio: new Date(dto.hora_inicio),
                hora_fin: new Date(dto.hora_fin)
            }
        })) ??
            this.prisma.bloque.create({
                data: {
                    tipo: dto.tipo,
                    hora_inicio: new Date(dto.hora_inicio),
                    hora_fin: new Date(dto.hora_fin),
                    observacion: dto.observacion
                }
            }));
    }
    async _deactivateExisting(cursoId, bloqueId, horarioId) {
        await this.prisma.asignacion.updateMany({
            where: {
                fk_id_curso: cursoId,
                fk_id_bloque: bloqueId,
                fk_id_horario: horarioId,
                esta_activo: true
            },
            data: { esta_activo: false }
        });
    }
    async _pickRandomMateria(cursoId) {
        const rels = await this.prisma.curso_materia.findMany({
            where: { fk_id_curso: cursoId }
        });
        if (!rels.length)
            return null;
        const sel = rels[Math.floor(Math.random() * rels.length)];
        return this.prisma.materia.findUnique({ where: { pk_id: sel.fk_id_materia } });
    }
    async _pickBestDocente(materiaId, bloqueId, w) {
        const rels = await this.prisma.docente_materia.findMany({
            where: { fk_id_materia: materiaId }
        });
        let best = null;
        for (const { fk_id_docente, fk_id_materia } of rels) {
            const ocup = await this.prisma.asignacion.findFirst({
                where: {
                    fk_id_docente,
                    fk_id_bloque: bloqueId,
                    esta_activo: true
                }
            });
            if (ocup)
                continue;
            const doc = await this.prisma.docente.findUnique({
                where: { pk_id: fk_id_docente },
                include: { persona: true }
            });
            if (!doc)
                continue;
            const antiguedad = (new Date().getFullYear() - doc.fecha_ingreso.getFullYear());
            const experiencia = await this.prisma.asignacion.count({
                where: { fk_id_docente, fk_id_materia: materiaId }
            });
            const especialidad = await this.prisma.docente_materia.findFirst({
                where: {
                    fk_id_docente,
                    fk_id_materia
                }
            }).then(r => r?.especialidadScore ?? 0);
            const score = antiguedad * w.antiguedadWeight +
                doc.horas_max_semana.toNumber() * w.disponibilidadWeight +
                experiencia * w.experienciaWeight +
                especialidad * w.especialidadWeight;
            if (!best || score > best.score)
                best = { docente: doc, score };
        }
        return best?.docente ?? null;
    }
    async _pickBestAula(materiaId, bloqueId, w) {
        const mat = await this.prisma.materia.findUnique({
            where: { pk_id: materiaId }
        });
        if (!mat)
            return null;
        const cand = await this.prisma.aula.findMany({
            where: {
                tipo: mat.require_lab ? client_1.tipo_aula.laboratorio : undefined
            }
        });
        let best = null;
        for (const aula of cand) {
            const ocup = await this.prisma.asignacion.findFirst({
                where: {
                    fk_id_aula: aula.pk_id,
                    fk_id_bloque: bloqueId,
                    esta_activo: true
                }
            });
            if (ocup)
                continue;
            const capacidad = aula.capacidad;
            const equipamiento = aula.equipamientoScore ?? 0;
            const ubicacion = aula.ubicacionScore ?? 0;
            const score = capacidad * w.capacidadWeight +
                equipamiento * w.equipamientoWeight +
                ubicacion * w.ubicacionWeight;
            if (!best || score > best.score)
                best = { aula, score };
        }
        return best?.aula ?? null;
    }
};
exports.HorarioService = HorarioService;
exports.HorarioService = HorarioService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [primsa_service_1.PrismaService])
], HorarioService);
//# sourceMappingURL=horario.service.js.map