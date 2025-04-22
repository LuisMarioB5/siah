"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedDocenteMaterias = seedDocenteMaterias;
const client_1 = require("@prisma/client");
const faker_1 = require("@faker-js/faker");
const prisma = new client_1.PrismaClient();
async function seedDocenteMaterias() {
    console.log('🌱 Iniciando seeding para las materias que imparte cada docente...');
    const relaciones = [
        { fk_id_docente: 1, fk_id_materia: 1, tiene_especialidad: faker_1.faker.datatype.boolean(), experiencia_anios: faker_1.faker.number.int({ min: 0, max: 10 }) },
        { fk_id_docente: 1, fk_id_materia: 2, tiene_especialidad: faker_1.faker.datatype.boolean(), experiencia_anios: faker_1.faker.number.int({ min: 0, max: 10 }) },
        { fk_id_docente: 1, fk_id_materia: 17, tiene_especialidad: faker_1.faker.datatype.boolean(), experiencia_anios: faker_1.faker.number.int({ min: 0, max: 10 }) },
        { fk_id_docente: 2, fk_id_materia: 3, tiene_especialidad: faker_1.faker.datatype.boolean(), experiencia_anios: faker_1.faker.number.int({ min: 0, max: 10 }) },
        { fk_id_docente: 2, fk_id_materia: 4, tiene_especialidad: faker_1.faker.datatype.boolean(), experiencia_anios: faker_1.faker.number.int({ min: 0, max: 10 }) },
        { fk_id_docente: 2, fk_id_materia: 18, tiene_especialidad: faker_1.faker.datatype.boolean(), experiencia_anios: faker_1.faker.number.int({ min: 0, max: 10 }) },
        { fk_id_docente: 3, fk_id_materia: 5, tiene_especialidad: faker_1.faker.datatype.boolean(), experiencia_anios: faker_1.faker.number.int({ min: 0, max: 10 }) },
        { fk_id_docente: 3, fk_id_materia: 6, tiene_especialidad: faker_1.faker.datatype.boolean(), experiencia_anios: faker_1.faker.number.int({ min: 0, max: 10 }) },
        { fk_id_docente: 3, fk_id_materia: 19, tiene_especialidad: faker_1.faker.datatype.boolean(), experiencia_anios: faker_1.faker.number.int({ min: 0, max: 10 }) },
        { fk_id_docente: 4, fk_id_materia: 7, tiene_especialidad: faker_1.faker.datatype.boolean(), experiencia_anios: faker_1.faker.number.int({ min: 0, max: 10 }) },
        { fk_id_docente: 4, fk_id_materia: 8, tiene_especialidad: faker_1.faker.datatype.boolean(), experiencia_anios: faker_1.faker.number.int({ min: 0, max: 10 }) },
        { fk_id_docente: 4, fk_id_materia: 1, tiene_especialidad: faker_1.faker.datatype.boolean(), experiencia_anios: faker_1.faker.number.int({ min: 0, max: 10 }) },
        { fk_id_docente: 4, fk_id_materia: 2, tiene_especialidad: faker_1.faker.datatype.boolean(), experiencia_anios: faker_1.faker.number.int({ min: 0, max: 10 }) },
        { fk_id_docente: 4, fk_id_materia: 17, tiene_especialidad: faker_1.faker.datatype.boolean(), experiencia_anios: faker_1.faker.number.int({ min: 0, max: 10 }) },
        { fk_id_docente: 4, fk_id_materia: 15, tiene_especialidad: faker_1.faker.datatype.boolean(), experiencia_anios: faker_1.faker.number.int({ min: 0, max: 10 }) },
        { fk_id_docente: 4, fk_id_materia: 16, tiene_especialidad: faker_1.faker.datatype.boolean(), experiencia_anios: faker_1.faker.number.int({ min: 0, max: 10 }) },
        { fk_id_docente: 5, fk_id_materia: 9, tiene_especialidad: faker_1.faker.datatype.boolean(), experiencia_anios: faker_1.faker.number.int({ min: 0, max: 10 }) },
        { fk_id_docente: 5, fk_id_materia: 10, tiene_especialidad: faker_1.faker.datatype.boolean(), experiencia_anios: faker_1.faker.number.int({ min: 0, max: 10 }) },
        { fk_id_docente: 5, fk_id_materia: 11, tiene_especialidad: faker_1.faker.datatype.boolean(), experiencia_anios: faker_1.faker.number.int({ min: 0, max: 10 }) },
        { fk_id_docente: 5, fk_id_materia: 12, tiene_especialidad: faker_1.faker.datatype.boolean(), experiencia_anios: faker_1.faker.number.int({ min: 0, max: 10 }) },
        { fk_id_docente: 6, fk_id_materia: 11, tiene_especialidad: faker_1.faker.datatype.boolean(), experiencia_anios: faker_1.faker.number.int({ min: 0, max: 10 }) },
        { fk_id_docente: 6, fk_id_materia: 12, tiene_especialidad: faker_1.faker.datatype.boolean(), experiencia_anios: faker_1.faker.number.int({ min: 0, max: 10 }) },
        { fk_id_docente: 6, fk_id_materia: 3, tiene_especialidad: faker_1.faker.datatype.boolean(), experiencia_anios: faker_1.faker.number.int({ min: 0, max: 10 }) },
        { fk_id_docente: 6, fk_id_materia: 4, tiene_especialidad: faker_1.faker.datatype.boolean(), experiencia_anios: faker_1.faker.number.int({ min: 0, max: 10 }) },
        { fk_id_docente: 6, fk_id_materia: 18, tiene_especialidad: faker_1.faker.datatype.boolean(), experiencia_anios: faker_1.faker.number.int({ min: 0, max: 10 }) },
        { fk_id_docente: 7, fk_id_materia: 13, tiene_especialidad: faker_1.faker.datatype.boolean(), experiencia_anios: faker_1.faker.number.int({ min: 0, max: 10 }) },
        { fk_id_docente: 7, fk_id_materia: 14, tiene_especialidad: faker_1.faker.datatype.boolean(), experiencia_anios: faker_1.faker.number.int({ min: 0, max: 10 }) },
        { fk_id_docente: 7, fk_id_materia: 20, tiene_especialidad: faker_1.faker.datatype.boolean(), experiencia_anios: faker_1.faker.number.int({ min: 0, max: 10 }) },
        { fk_id_docente: 8, fk_id_materia: 15, tiene_especialidad: faker_1.faker.datatype.boolean(), experiencia_anios: faker_1.faker.number.int({ min: 0, max: 10 }) },
        { fk_id_docente: 8, fk_id_materia: 16, tiene_especialidad: faker_1.faker.datatype.boolean(), experiencia_anios: faker_1.faker.number.int({ min: 0, max: 10 }) },
        { fk_id_docente: 8, fk_id_materia: 20, tiene_especialidad: faker_1.faker.datatype.boolean(), experiencia_anios: faker_1.faker.number.int({ min: 0, max: 10 }) },
        { fk_id_docente: 9, fk_id_materia: 20, tiene_especialidad: faker_1.faker.datatype.boolean(), experiencia_anios: faker_1.faker.number.int({ min: 0, max: 10 }) },
        { fk_id_docente: 9, fk_id_materia: 3, tiene_especialidad: faker_1.faker.datatype.boolean(), experiencia_anios: faker_1.faker.number.int({ min: 0, max: 10 }) },
        { fk_id_docente: 9, fk_id_materia: 4, tiene_especialidad: faker_1.faker.datatype.boolean(), experiencia_anios: faker_1.faker.number.int({ min: 0, max: 10 }) },
        { fk_id_docente: 9, fk_id_materia: 18, tiene_especialidad: faker_1.faker.datatype.boolean(), experiencia_anios: faker_1.faker.number.int({ min: 0, max: 10 }) },
        { fk_id_docente: 10, fk_id_materia: 1, tiene_especialidad: faker_1.faker.datatype.boolean(), experiencia_anios: faker_1.faker.number.int({ min: 0, max: 10 }) },
        { fk_id_docente: 10, fk_id_materia: 5, tiene_especialidad: faker_1.faker.datatype.boolean(), experiencia_anios: faker_1.faker.number.int({ min: 0, max: 10 }) },
        { fk_id_docente: 10, fk_id_materia: 13, tiene_especialidad: faker_1.faker.datatype.boolean(), experiencia_anios: faker_1.faker.number.int({ min: 0, max: 10 }) },
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