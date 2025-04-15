import { PrismaClient, tipo_persona } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

export async function seedDocentes() {
  const personasDocentes = await prisma.persona.findMany({
    where: { tipo: 'docente' }
  })
  
  console.log('🌱 Iniciando seeding para docentes...');
  for(const persona of personasDocentes) {
    await prisma.docente.upsert({
      where: { fk_id_persona: persona.pk_id},
      update: {},
      create: {
        fk_id_persona: persona.pk_id,
        horas_max_semana: faker.number.float({ min: 35, max: 40 }),
        fecha_ingreso: faker.date.past({ 
          years: faker.number.int({ min: 2, max: 10 }),
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
      throw e
    })
    .finally(async () => {
      await prisma.$disconnect()
    });
}
