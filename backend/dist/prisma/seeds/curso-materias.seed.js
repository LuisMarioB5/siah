"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedCursoMaterias = seedCursoMaterias;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function seedCursoMaterias() {
    console.log('🌱 Iniciando seeding para las materias que se imparten por curso...');
    const primero = [
        { fk_id_curso: 1, fk_id_materia: 1 },
        { fk_id_curso: 1, fk_id_materia: 2 },
        { fk_id_curso: 1, fk_id_materia: 3 },
        { fk_id_curso: 1, fk_id_materia: 5 },
        { fk_id_curso: 1, fk_id_materia: 15 },
        { fk_id_curso: 2, fk_id_materia: 1 },
        { fk_id_curso: 2, fk_id_materia: 2 },
        { fk_id_curso: 2, fk_id_materia: 3 },
        { fk_id_curso: 2, fk_id_materia: 5 },
        { fk_id_curso: 2, fk_id_materia: 15 },
        { fk_id_curso: 3, fk_id_materia: 1 },
        { fk_id_curso: 3, fk_id_materia: 2 },
        { fk_id_curso: 3, fk_id_materia: 3 },
        { fk_id_curso: 3, fk_id_materia: 5 },
        { fk_id_curso: 3, fk_id_materia: 15 },
    ];
    const segundo = [
        { fk_id_curso: 4, fk_id_materia: 4 },
        { fk_id_curso: 4, fk_id_materia: 6 },
        { fk_id_curso: 4, fk_id_materia: 7 },
        { fk_id_curso: 4, fk_id_materia: 9 },
        { fk_id_curso: 4, fk_id_materia: 11 },
        { fk_id_curso: 4, fk_id_materia: 13 },
        { fk_id_curso: 4, fk_id_materia: 16 },
        { fk_id_curso: 5, fk_id_materia: 4 },
        { fk_id_curso: 5, fk_id_materia: 6 },
        { fk_id_curso: 5, fk_id_materia: 7 },
        { fk_id_curso: 5, fk_id_materia: 9 },
        { fk_id_curso: 5, fk_id_materia: 11 },
        { fk_id_curso: 5, fk_id_materia: 13 },
        { fk_id_curso: 5, fk_id_materia: 16 },
        { fk_id_curso: 6, fk_id_materia: 4 },
        { fk_id_curso: 6, fk_id_materia: 6 },
        { fk_id_curso: 6, fk_id_materia: 7 },
        { fk_id_curso: 6, fk_id_materia: 9 },
        { fk_id_curso: 6, fk_id_materia: 11 },
        { fk_id_curso: 6, fk_id_materia: 13 },
        { fk_id_curso: 6, fk_id_materia: 16 },
    ];
    const tercero = [
        { fk_id_curso: 7, fk_id_materia: 8 },
        { fk_id_curso: 7, fk_id_materia: 10 },
        { fk_id_curso: 7, fk_id_materia: 12 },
        { fk_id_curso: 7, fk_id_materia: 14 },
        { fk_id_curso: 7, fk_id_materia: 17 },
        { fk_id_curso: 7, fk_id_materia: 18 },
        { fk_id_curso: 7, fk_id_materia: 19 },
        { fk_id_curso: 7, fk_id_materia: 20 },
        { fk_id_curso: 8, fk_id_materia: 8 },
        { fk_id_curso: 8, fk_id_materia: 10 },
        { fk_id_curso: 8, fk_id_materia: 12 },
        { fk_id_curso: 8, fk_id_materia: 14 },
        { fk_id_curso: 8, fk_id_materia: 17 },
        { fk_id_curso: 8, fk_id_materia: 18 },
        { fk_id_curso: 8, fk_id_materia: 19 },
        { fk_id_curso: 8, fk_id_materia: 20 },
        { fk_id_curso: 9, fk_id_materia: 8 },
        { fk_id_curso: 9, fk_id_materia: 10 },
        { fk_id_curso: 9, fk_id_materia: 12 },
        { fk_id_curso: 9, fk_id_materia: 14 },
        { fk_id_curso: 9, fk_id_materia: 17 },
        { fk_id_curso: 9, fk_id_materia: 18 },
        { fk_id_curso: 9, fk_id_materia: 19 },
        { fk_id_curso: 9, fk_id_materia: 20 },
    ];
    await prisma.curso_materia.createMany({
        data: [...primero, ...segundo, ...tercero],
        skipDuplicates: true,
    });
    console.log('✅ Seeding de las materias que se imparten por curso completo.');
}
if (require.main === module) {
    seedCursoMaterias()
        .catch((e) => {
        throw e;
    })
        .finally(async () => {
        await prisma.$disconnect();
    });
}
//# sourceMappingURL=curso-materias.seed.js.map