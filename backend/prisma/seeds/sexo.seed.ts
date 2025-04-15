import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedSexo() {
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
      throw e
    })
    .finally(async () => {
      await prisma.$disconnect()
    });
}