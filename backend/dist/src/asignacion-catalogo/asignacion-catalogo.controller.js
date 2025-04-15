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
exports.AsignacionCatalogoController = void 0;
const common_1 = require("@nestjs/common");
const asignacion_catalogo_service_1 = require("./asignacion-catalogo.service");
let AsignacionCatalogoController = class AsignacionCatalogoController {
    constructor(catalogoService) {
        this.catalogoService = catalogoService;
    }
    async getMaterias() {
        return await this.catalogoService.getMaterias();
    }
    async getDocentes() {
        return await this.catalogoService.getDocentes();
    }
    async getAulas() {
        return await this.catalogoService.getAulas();
    }
    async getAniosEscolares() {
        return await this.catalogoService.getAniosEscolares();
    }
    async getCursos() {
        return await this.catalogoService.getCursos();
    }
};
exports.AsignacionCatalogoController = AsignacionCatalogoController;
__decorate([
    (0, common_1.Get)('materias'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AsignacionCatalogoController.prototype, "getMaterias", null);
__decorate([
    (0, common_1.Get)('docentes'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AsignacionCatalogoController.prototype, "getDocentes", null);
__decorate([
    (0, common_1.Get)('aulas'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AsignacionCatalogoController.prototype, "getAulas", null);
__decorate([
    (0, common_1.Get)('anios-escolares'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AsignacionCatalogoController.prototype, "getAniosEscolares", null);
__decorate([
    (0, common_1.Get)('cursos'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AsignacionCatalogoController.prototype, "getCursos", null);
exports.AsignacionCatalogoController = AsignacionCatalogoController = __decorate([
    (0, common_1.Controller)('asignacion/catalogo'),
    __metadata("design:paramtypes", [asignacion_catalogo_service_1.AsignacionCatalogoService])
], AsignacionCatalogoController);
//# sourceMappingURL=asignacion-catalogo.controller.js.map