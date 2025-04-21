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
exports.GenerarHorarioDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const bloque_dto_1 = require("./bloque.dto");
const criterios_dto_1 = require("./criterios.dto");
const client_1 = require("@prisma/client");
class GenerarHorarioDto {
}
exports.GenerarHorarioDto = GenerarHorarioDto;
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], GenerarHorarioDto.prototype, "anioEscolarId", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsInt)({ each: true }),
    __metadata("design:type", Array)
], GenerarHorarioDto.prototype, "cursoIds", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsEnum)(client_1.dia_semana, { each: true }),
    __metadata("design:type", Array)
], GenerarHorarioDto.prototype, "dias", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => bloque_dto_1.BloqueDto),
    __metadata("design:type", Array)
], GenerarHorarioDto.prototype, "bloques", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => criterios_dto_1.CriteriaDto),
    __metadata("design:type", criterios_dto_1.CriteriaDto)
], GenerarHorarioDto.prototype, "criterios", void 0);
//# sourceMappingURL=generar-horario.dto.js.map