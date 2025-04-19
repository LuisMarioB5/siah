"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedDocenteMaterias = seedDocenteMaterias;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function seedDocenteMaterias() {
    console.log('🌱 Iniciando seeding para las materias que imparte cada docente...');
    const relaciones = [
        { fk_id_docente: 1, fk_id_materia: 1 },
        { fk_id_docente: 1, fk_id_materia: 2 },
        { fk_id_docente: 1, fk_id_materia: 17 },
        { fk_id_docente: 2, fk_id_materia: 3 },
        { fk_id_docente: 2, fk_id_materia: 4 },
        { fk_id_docente: 2, fk_id_materia: 18 },
        { fk_id_docente: 3, fk_id_materia: 5 },
        { fk_id_docente: 3, fk_id_materia: 6 },
        { fk_id_docente: 3, fk_id_materia: 19 },
        { fk_id_docente: 4, fk_id_materia: 7 },
        { fk_id_docente: 4, fk_id_materia: 8 },
        { fk_id_docente: 5, fk_id_materia: 9 },
        { fk_id_docente: 5, fk_id_materia: 10 },
        { fk_id_docente: 6, fk_id_materia: 11 },
        { fk_id_docente: 6, fk_id_materia: 12 },
        { fk_id_docente: 7, fk_id_materia: 13 },
        { fk_id_docente: 7, fk_id_materia: 14 },
        { fk_id_docente: 8, fk_id_materia: 15 },
        { fk_id_docente: 8, fk_id_materia: 16 },
        { fk_id_docente: 9, fk_id_materia: 20 },
        { fk_id_docente: 10, fk_id_materia: 1 },
        { fk_id_docente: 10, fk_id_materia: 5 },
        { fk_id_docente: 10, fk_id_materia: 13 },
    ];
    await prisma.docente_materia.createMany({
        data: relaciones,
        skipDuplicates: true,
    });
    console.log('✅ Seeding de las materias que imparte cada docente completo.');
}
if (require.main === module) {
    seedDocenteMaterias()
        .catch((e) => {
        throw e;
    })
        .finally(async () => {
        await prisma.$disconnect();
    });
}
//# sourceMappingURL=docente-materias.seed.js.map