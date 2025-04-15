"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedDocentes = seedDocentes;
const client_1 = require("@prisma/client");
const faker_1 = require("@faker-js/faker");
const prisma = new client_1.PrismaClient();
async function seedDocentes() {
    const personasDocentes = await prisma.persona.findMany({
        where: { tipo: 'docente' }
    });
    console.log('🌱 Iniciando seeding para docentes...');
    for (const persona of personasDocentes) {
        await prisma.docente.upsert({
            where: { fk_id_persona: persona.pk_id },
            update: {},
            create: {
                fk_id_persona: persona.pk_id,
                horas_max_semana: faker_1.faker.number.float({ min: 35, max: 40 }),
                fecha_ingreso: faker_1.faker.date.past({
                    years: faker_1.faker.number.int({ min: 2, max: 10 }),
                    refDate: new Date()
                }),
                activo: true
            },
        });
    }
    console.log('✅ Seeding de docentes completo.');
}
if (require.main === module) {
    seedDocentes()
        .catch((e) => {
        throw e;
    })
        .finally(async () => {
        await prisma.$disconnect();
    });
}
//# sourceMappingURL=docente.seed.js.map