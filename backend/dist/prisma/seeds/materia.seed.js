"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedMateria = seedMateria;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function seedMateria() {
    console.log('🌱 Iniciando seeding para las materias...');
    const materias = [
        { nombre: 'Matemáticas I', clave: 'MAT101', requiere_lab: false, requiere_pc: false },
        { nombre: 'Matemáticas II', clave: 'MAT102', requiere_lab: false, requiere_pc: false },
        { nombre: 'Física General', clave: 'FIS101', requiere_lab: true, requiere_pc: false },
        { nombre: 'Física Aplicada', clave: 'FIS102', requiere_lab: true, requiere_pc: false },
        { nombre: 'Lengua Española I', clave: 'LEN101', requiere_lab: false, requiere_pc: false },
        { nombre: 'Lengua Española II', clave: 'LEN102', requiere_lab: false, requiere_pc: false },
        { nombre: 'Informática Básica', clave: 'INF101', requiere_lab: true, requiere_pc: true },
        { nombre: 'Programación Básica', clave: 'INF102', requiere_lab: true, requiere_pc: true },
        { nombre: 'Biología General', clave: 'BIO101', requiere_lab: true, requiere_pc: false },
        { nombre: 'Biología Celular', clave: 'BIO102', requiere_lab: true, requiere_pc: false },
        { nombre: 'Química General', clave: 'QUI101', requiere_lab: true, requiere_pc: false },
        { nombre: 'Química Orgánica', clave: 'QUI102', requiere_lab: true, requiere_pc: false },
        { nombre: 'Historia Universal', clave: 'HIS101', requiere_lab: false, requiere_pc: false },
        { nombre: 'Historia Dominicana', clave: 'HIS102', requiere_lab: false, requiere_pc: false },
        { nombre: 'Educación Física I', clave: 'EDU101', requiere_lab: false, requiere_pc: false },
        { nombre: 'Educación Física II', clave: 'EDU102', requiere_lab: false, requiere_pc: false },
        { nombre: 'Matemáticas Avanzadas', clave: 'MAT201', requiere_lab: false, requiere_pc: false },
        { nombre: 'Física Teórica', clave: 'FIS201', requiere_lab: false, requiere_pc: false },
        { nombre: 'Literatura General', clave: 'LEN201', requiere_lab: false, requiere_pc: false },
        { nombre: 'Ética y Ciudadanía', clave: 'ETI101', requiere_lab: false, requiere_pc: false },
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
        throw e;
    })
        .finally(async () => {
        await prisma.$disconnect();
    });
}
//# sourceMappingURL=materia.seed.js.map