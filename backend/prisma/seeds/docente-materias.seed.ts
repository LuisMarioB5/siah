import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

export async function seedDocenteMaterias() {
  console.log('🌱 Iniciando seeding para las materias que imparte cada docente...');

  const relaciones: { fk_id_docente: number; fk_id_materia: number, tiene_especialidad: boolean, experiencia_anios: number}[] = [
    // Docente 1: Matemáticas
    { fk_id_docente: 1, fk_id_materia: 1, tiene_especialidad: faker.datatype.boolean(), experiencia_anios: faker.number.int({ min: 0, max: 10})},
    { fk_id_docente: 1, fk_id_materia: 2, tiene_especialidad: faker.datatype.boolean(), experiencia_anios: faker.number.int({ min: 0, max: 10})},
    { fk_id_docente: 1, fk_id_materia: 17, tiene_especialidad: faker.datatype.boolean(), experiencia_anios: faker.number.int({ min: 0, max: 10})},

    // Docente 2: Física
    { fk_id_docente: 2, fk_id_materia: 3, tiene_especialidad: faker.datatype.boolean(), experiencia_anios: faker.number.int({ min: 0, max: 10})},
    { fk_id_docente: 2, fk_id_materia: 4, tiene_especialidad: faker.datatype.boolean(), experiencia_anios: faker.number.int({ min: 0, max: 10})},
    { fk_id_docente: 2, fk_id_materia: 18, tiene_especialidad: faker.datatype.boolean(), experiencia_anios: faker.number.int({ min: 0, max: 10})},

    // Docente 3: Lengua y Literatura
    { fk_id_docente: 3, fk_id_materia: 5, tiene_especialidad: faker.datatype.boolean(), experiencia_anios: faker.number.int({ min: 0, max: 10})},
    { fk_id_docente: 3, fk_id_materia: 6, tiene_especialidad: faker.datatype.boolean(), experiencia_anios: faker.number.int({ min: 0, max: 10})},
    { fk_id_docente: 3, fk_id_materia: 19, tiene_especialidad: faker.datatype.boolean(), experiencia_anios: faker.number.int({ min: 0, max: 10})},

    // Docente 4: Informática
    { fk_id_docente: 4, fk_id_materia: 7, tiene_especialidad: faker.datatype.boolean(), experiencia_anios: faker.number.int({ min: 0, max: 10})},
    { fk_id_docente: 4, fk_id_materia: 8, tiene_especialidad: faker.datatype.boolean(), experiencia_anios: faker.number.int({ min: 0, max: 10})},

    // Docente 5: Biología
    { fk_id_docente: 5, fk_id_materia: 9, tiene_especialidad: faker.datatype.boolean(), experiencia_anios: faker.number.int({ min: 0, max: 10})},
    { fk_id_docente: 5, fk_id_materia: 10, tiene_especialidad: faker.datatype.boolean(), experiencia_anios: faker.number.int({ min: 0, max: 10})},

    // Docente 6: Química
    { fk_id_docente: 6, fk_id_materia: 11, tiene_especialidad: faker.datatype.boolean(), experiencia_anios: faker.number.int({ min: 0, max: 10})},
    { fk_id_docente: 6, fk_id_materia: 12, tiene_especialidad: faker.datatype.boolean(), experiencia_anios: faker.number.int({ min: 0, max: 10})},

    // Docente 7: Historia
    { fk_id_docente: 7, fk_id_materia: 13, tiene_especialidad: faker.datatype.boolean(), experiencia_anios: faker.number.int({ min: 0, max: 10})},
    { fk_id_docente: 7, fk_id_materia: 14, tiene_especialidad: faker.datatype.boolean(), experiencia_anios: faker.number.int({ min: 0, max: 10})},

    // Docente 8: Educación Física
    { fk_id_docente: 8, fk_id_materia: 15, tiene_especialidad: faker.datatype.boolean(), experiencia_anios: faker.number.int({ min: 0, max: 10})},
    { fk_id_docente: 8, fk_id_materia: 16, tiene_especialidad: faker.datatype.boolean(), experiencia_anios: faker.number.int({ min: 0, max: 10})},

    // Docente 9: Ética
    { fk_id_docente: 9, fk_id_materia: 20, tiene_especialidad: faker.datatype.boolean(), experiencia_anios: faker.number.int({ min: 0, max: 10})},

    // Docente 10: Reforzadores mixtos
    { fk_id_docente: 10, fk_id_materia: 1, tiene_especialidad: faker.datatype.boolean(), experiencia_anios: faker.number.int({ min: 0, max: 10})},
    { fk_id_docente: 10, fk_id_materia: 5, tiene_especialidad: faker.datatype.boolean(), experiencia_anios: faker.number.int({ min: 0, max: 10})},
    { fk_id_docente: 10, fk_id_materia: 13, tiene_especialidad: faker.datatype.boolean(), experiencia_anios: faker.number.int({ min: 0, max: 10})},
  ];

  await prisma.docente_materia.createMany({
    data: relaciones,
    skipDuplicates: true,
  });

  console.log('✅ Seeding de las materias que imparte cada docente completo.');
}


if (require.main === module) {
  seedDocenteMaterias()
    .catch((e) => {
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
