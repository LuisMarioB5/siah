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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HorarioController = void 0;
const common_1 = require("@nestjs/common");
const generar_horario_dto_1 = require("./dto/generar-horario.dto");
const horario_service_1 = require("./horario.service");
let HorarioController = class HorarioController {
    constructor(horarioService) {
        this.horarioService = horarioService;
    }
    async generarHorario(dto) {
        return await this.horarioService.generarHorario(dto);
    }
};
exports.HorarioController = HorarioController;
__decorate([
    (0, common_1.Post)('generar'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [generar_horario_dto_1.GenerarHorarioDto]),
    __metadata("design:returntype", Promise)
], HorarioController.prototype, "generarHorario", null);
exports.HorarioController = HorarioController = __decorate([
    (0, common_1.Controller)('horario'),
    __metadata("design:paramtypes", [horario_service_1.HorarioService])
], HorarioController);
//# sourceMappingURL=horario.controller.js.map