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
let HorarioService = class HorarioService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async generarHorario(dto) {
        return dto;
    }
    async obtenerOBloquearBloque(dto) {
        const bloqueExistente = await this.prisma.bloque.findFirst({
            where: {
                tipo: dto.tipo,
                hora_inicio: dto.hora_inicio,
                hora_fin: dto.hora_fin,
            },
        });
        if (bloqueExistente) {
            return bloqueExistente;
        }
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