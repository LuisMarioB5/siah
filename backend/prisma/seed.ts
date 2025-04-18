import { PrismaClient } from '@prisma/client';
import { 
  seedSexo, 
  seedPersonas,
  seedDocentes,
  seedMateria,
  seedAulas,
  seedAniosEscolares,
  seedCursos,
  seedCursoMaterias,
  seedDocenteMaterias,
} from './seeds/index.seed';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seeding general...');

  await seedSexo();
  await seedPersonas();
  await seedDocentes();
  await seedMateria();
  await seedAulas();
  await seedAniosEscolares();
  await seedCursos();
  await seedCursoMaterias();
  await seedDocenteMaterias();
  
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
