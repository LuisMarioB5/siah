"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const index_seed_1 = require("./seeds/index.seed");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('🌱 Iniciando seeding general...');
    await (0, index_seed_1.seedSexo)();
    await (0, index_seed_1.seedPersonas)();
    await (0, index_seed_1.seedDocentes)();
    await (0, index_seed_1.seedMateria)();
    await (0, index_seed_1.seedAulas)();
    await (0, index_seed_1.seedAniosEscolares)();
    await (0, index_seed_1.seedCursos)();
    await (0, index_seed_1.seedCursoMaterias)();
    console.log('✅ Seeding general completo.');
}
main()
    .catch((e) => {
    console.error('Error al hacer el seeding:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map