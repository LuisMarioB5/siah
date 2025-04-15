import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedCursos() {
  console.log('🌱 Iniciando seeding para los cursos...');

  await prisma.curso.createMany({
    data: [
      { 
        nombre: `1º A`,
      },
      { 
        nombre: `1º B`,
      },
      { 
        nombre: `1º C`,
      },
      { 
        nombre: `2º A`,
      },
      { 
        nombre: `2º B`,
      },
      { 
        nombre: `2º C`,
      },
      { 
        nombre: `3º A`,
      },
      { 
        nombre: `3º B`,
      },
      { 
        nombre: `3º C`,
      },
    ],
  });

  console.log('✅ Seeding de los cursos completo.');
}


if (require.main === module) {
  seedCursos()
    .catch((e) => {
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
