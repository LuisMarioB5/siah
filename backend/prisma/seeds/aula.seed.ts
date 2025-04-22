import { PrismaClient, tipo_aula } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

export async function seedAulas() {
  console.log('🌱 Iniciando seeding para aulas...');

  const tipos = Object.values(tipo_aula);

  const aulas = Array.from({ length: 50 }).map((_, index) => {
    const tipo = faker.helpers.arrayElement(tipos);
    
    // Puedes usar el tipo para condicionar los valores booleanos si quieres más realismo
    return {
      nombre: String(index + 1).padStart(3, '0'),
      capacidad: faker.number.int({ min: 20, max: 30 }),
      tipo,
      posicion: faker.number.int({ min: 1, max: 300 }),
      tiene_pc: faker.datatype.boolean(),
      tiene_proyector: faker.datatype.boolean(),
      tiene_lab: tipo === tipo_aula.laboratorio
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
