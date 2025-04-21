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
exports.CriteriaDto = exports.OpcionesAvanzadas = exports.CustomCriteria = exports.AulaCriteria = exports.DocenteCriteria = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class DocenteCriteria {
}
exports.DocenteCriteria = DocenteCriteria;
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], DocenteCriteria.prototype, "antiguedad", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], DocenteCriteria.prototype, "disponibilidad", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], DocenteCriteria.prototype, "experiencia", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], DocenteCriteria.prototype, "especialidad", void 0);
class AulaCriteria {
}
exports.AulaCriteria = AulaCriteria;
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], AulaCriteria.prototype, "capacidad", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], AulaCriteria.prototype, "equipamiento", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], AulaCriteria.prototype, "ubicacion", void 0);
class CustomCriteria {
}
exports.CustomCriteria = CustomCriteria;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CustomCriteria.prototype, "nombre", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CustomCriteria.prototype, "puntos", void 0);
class OpcionesAvanzadas {
}
exports.OpcionesAvanzadas = OpcionesAvanzadas;
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], OpcionesAvanzadas.prototype, "balancearCarga", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], OpcionesAvanzadas.prototype, "minimizarDesplazamientos", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], OpcionesAvanzadas.prototype, "horasConsecutivas", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], OpcionesAvanzadas.prototype, "especializacion", void 0);
class CriteriaDto {
}
exports.CriteriaDto = CriteriaDto;
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => DocenteCriteria),
    __metadata("design:type", DocenteCriteria)
], CriteriaDto.prototype, "docente", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => AulaCriteria),
    __metadata("design:type", AulaCriteria)
], CriteriaDto.prototype, "aula", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CustomCriteria),
    __metadata("design:type", Array)
], CriteriaDto.prototype, "personalizados", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => OpcionesAvanzadas),
    __metadata("design:type", OpcionesAvanzadas)
], CriteriaDto.prototype, "opcionesAvanzadas", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CriteriaDto.prototype, "maxHorasDocente", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CriteriaDto.prototype, "maxVecesDocente", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CriteriaDto.prototype, "umbralMinimo", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CriteriaDto.prototype, "notas", void 0);
//# sourceMappingURL=criterios.dto.js.map