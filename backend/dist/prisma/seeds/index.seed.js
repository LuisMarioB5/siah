"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedDocenteMaterias = exports.seedCursoMaterias = exports.seedCursos = exports.seedAniosEscolares = exports.seedAulas = exports.seedMateria = exports.seedDocentes = exports.seedPersonas = exports.seedSexo = void 0;
const sexo_seed_1 = require("./sexo.seed");
Object.defineProperty(exports, "seedSexo", { enumerable: true, get: function () { return sexo_seed_1.seedSexo; } });
const persona_seed_1 = require("./persona.seed");
Object.defineProperty(exports, "seedPersonas", { enumerable: true, get: function () { return persona_seed_1.seedPersonas; } });
const docente_seed_1 = require("./docente.seed");
Object.defineProperty(exports, "seedDocentes", { enumerable: true, get: function () { return docente_seed_1.seedDocentes; } });
const materia_seed_1 = require("./materia.seed");
Object.defineProperty(exports, "seedMateria", { enumerable: true, get: function () { return materia_seed_1.seedMateria; } });
const aula_seed_1 = require("./aula.seed");
Object.defineProperty(exports, "seedAulas", { enumerable: true, get: function () { return aula_seed_1.seedAulas; } });
const anio_escolar_seed_1 = require("./anio-escolar.seed");
Object.defineProperty(exports, "seedAniosEscolares", { enumerable: true, get: function () { return anio_escolar_seed_1.seedAniosEscolares; } });
const curso_seed_1 = require("./curso.seed");
Object.defineProperty(exports, "seedCursos", { enumerable: true, get: function () { return curso_seed_1.seedCursos; } });
const curso_materias_seed_1 = require("./curso-materias.seed");
Object.defineProperty(exports, "seedCursoMaterias", { enumerable: true, get: function () { return curso_materias_seed_1.seedCursoMaterias; } });
const docente_materias_seed_1 = require("./docente-materias.seed");
Object.defineProperty(exports, "seedDocenteMaterias", { enumerable: true, get: function () { return docente_materias_seed_1.seedDocenteMaterias; } });
//# sourceMappingURL=index.seed.js.map