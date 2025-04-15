"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedSexo = seedSexo;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function seedSexo() {
    console.log('🌱 Iniciando seeding para sexos...');
    await prisma.sexo.createMany({
        data: [
            { nombre: 'Masculino' },
            { nombre: 'Femenino' },
        ],
    });
    console.log('✅ Seeding de sexos completo.');
}
if (require.main === module) {
    seedSexo()
        .catch((e) => {
        throw e;
    })
        .finally(async () => {
        await prisma.$disconnect();
    });
}
//# sourceMappingURL=sexo.seed.js.map