"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedAulas = seedAulas;
const client_1 = require("@prisma/client");
const faker_1 = require("@faker-js/faker");
const prisma = new client_1.PrismaClient();
async function seedAulas() {
    console.log('🌱 Iniciando seeding para aulas...');
    const tipos = Object.values(client_1.tipo_aula);
    const aulas = Array.from({ length: 10 }).map((_, index) => {
        const tipo = faker_1.faker.helpers.arrayElement(tipos);
        return {
            nombre: String(index + 1).padStart(3, '0'),
            capacidad: faker_1.faker.number.int({ min: 20, max: 30 }),
            tipo,
            posicion: faker_1.faker.number.int({ min: 1, max: 300 }),
            tiene_pc: faker_1.faker.datatype.boolean(),
            tiene_proyector: faker_1.faker.datatype.boolean(),
            tiene_lab: tipo === client_1.tipo_aula.laboratorio
        };
    });
    for (const aula of aulas) {
        await prisma.aula.upsert({
            where: { nombre: aula.nombre },
            update: {},
            create: aula
        });
    }
    console.log('✅ Seeding de aulas completo.');
}
if (require.main === module) {
    seedAulas()
        .catch((e) => {
        throw e;
    })
        .finally(async () => {
        await prisma.$disconnect();
    });
}
//# sourceMappingURL=aula.seed.js.map