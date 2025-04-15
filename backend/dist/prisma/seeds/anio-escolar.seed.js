"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedAniosEscolares = seedAniosEscolares;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function seedAniosEscolares() {
    console.log('🌱 Iniciando seeding para años académicos...');
    const currentYear = new Date().getFullYear();
    const lastYear = (currentYear - 1).toString();
    const nextYear = (currentYear + 1).toString();
    await prisma.anio_escolar.createMany({
        data: [
            {
                nombre: `Año ${lastYear}`,
                fecha_inicio: new Date(`${lastYear}-08-01`),
                fecha_fin: new Date(`${lastYear}-06-15`),
            },
            {
                nombre: `Año ${currentYear}`,
                fecha_inicio: new Date(`${currentYear}-08-01`),
                fecha_fin: new Date(`${currentYear}-06-15`),
            },
            {
                nombre: `Año ${nextYear}`,
                fecha_inicio: new Date(`${nextYear}-08-01`),
                fecha_fin: new Date(`${nextYear}-06-15`),
            },
        ],
    });
    console.log('✅ Seeding de años académicos completo.');
}
if (require.main === module) {
    seedAniosEscolares()
        .catch((e) => {
        throw e;
    })
        .finally(async () => {
        await prisma.$disconnect();
    });
}
//# sourceMappingURL=anio-escolar.seed.js.map