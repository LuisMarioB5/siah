import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedMateria() {
  console.log('🌱 Iniciando seeding para las materias...');

  const materias = [
    { nombre: 'Matemáticas I', clave: 'MAT101', require_lab: false, require_pc: false },
    { nombre: 'Matemáticas II', clave: 'MAT102', require_lab: false, require_pc: false },
    { nombre: 'Física General', clave: 'FIS101', require_lab: true, require_pc: false },
    { nombre: 'Física Aplicada', clave: 'FIS102', require_lab: true, require_pc: false },
    { nombre: 'Lengua Española I', clave: 'LEN101', require_lab: false, require_pc: false },
    { nombre: 'Lengua Española II', clave: 'LEN102', require_lab: false, require_pc: false },
    { nombre: 'Informática Básica', clave: 'INF101', require_lab: true, require_pc: true },
    { nombre: 'Programación Básica', clave: 'INF102', require_lab: true, require_pc: true },
    { nombre: 'Biología General', clave: 'BIO101', require_lab: true, require_pc: false },
    { nombre: 'Biología Celular', clave: 'BIO102', require_lab: true, require_pc: false },
    { nombre: 'Química General', clave: 'QUI101', require_lab: true, require_pc: false },
    { nombre: 'Química Orgánica', clave: 'QUI102', require_lab: true, require_pc: false },
    { nombre: 'Historia Universal', clave: 'HIS101', require_lab: false, require_pc: false },
    { nombre: 'Historia Dominicana', clave: 'HIS102', require_lab: false, require_pc: false },
    { nombre: 'Educación Física I', clave: 'EDU101', require_lab: false, require_pc: false },
    { nombre: 'Educación Física II', clave: 'EDU102', require_lab: false, require_pc: false },
    { nombre: 'Matemáticas Avanzadas', clave: 'MAT201', require_lab: false, require_pc: false },
    { nombre: 'Física Teórica', clave: 'FIS201', require_lab: false, require_pc: false },
    { nombre: 'Literatura General', clave: 'LEN201', require_lab: false, require_pc: false },
    { nombre: 'Ética y Ciudadanía', clave: 'ETI101', require_lab: false, require_pc: false },
];


  for (const materia of materias) {
    await prisma.materia.upsert({
      where: { clave: materia.clave },
      update: {},
      create: materia,
    });
  }

  console.log('✅ Seeding de las materias completo.');
}

if (require.main === module) {
  seedMateria()
    .catch((e) => {
      throw e
    })
    .finally(async () => {
      await prisma.$disconnect()
    });
}