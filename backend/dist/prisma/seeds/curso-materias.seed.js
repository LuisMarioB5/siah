"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedCursoMaterias = seedCursoMaterias;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const cursoMateriasMap = {
    '1º A': ['MAT101', 'MAT102', 'FIS101', 'LEN101', 'EDU101'],
    '1º B': ['MAT101', 'MAT102', 'FIS101', 'LEN101', 'EDU101'],
    '1º C': ['MAT101', 'MAT102', 'FIS101', 'LEN101', 'EDU101'],
    '2º A': ['FIS102', 'LEN102', 'INF101', 'BIO101', 'QUI101', 'HIS101', 'EDU102'],
    '2º B': ['FIS102', 'LEN102', 'INF101', 'BIO101', 'QUI101', 'HIS101', 'EDU102'],
    '2º C': ['FIS102', 'LEN102', 'INF101', 'BIO101', 'QUI101', 'HIS101', 'EDU102'],
    '3º A': ['INF102', 'BIO102', 'QUI102', 'HIS102', 'MAT201', 'FIS201', 'LEN201', 'ETI101'],
    '3º B': ['INF102', 'BIO102', 'QUI102', 'HIS102', 'MAT201', 'FIS201', 'LEN201', 'ETI101'],
    '3º C': ['INF102', 'BIO102', 'QUI102', 'HIS102', 'MAT201', 'FIS201', 'LEN201', 'ETI101'],
};
async function seedCursoMaterias() {
    console.log('🌱 Iniciando seeding de materias por curso...');
    for (const [cursoNombre, clavesMaterias] of Object.entries(cursoMateriasMap)) {
        const curso = await prisma.curso.findUnique({ where: { nombre: cursoNombre } });
        if (!curso) {
            console.warn(`❌ Curso no encontrado: ${cursoNombre}`);
            continue;
        }
        for (const clave of clavesMaterias) {
            const materia = await prisma.materia.findUnique({ where: { clave } });
            if (!materia) {
                console.warn(`❌ Materia no encontrada: ${clave}`);
                continue;
            }
            await prisma.curso_materia.upsert({
                where: {
                    fk_id_curso_fk_id_materia: {
                        fk_id_curso: curso.pk_id,
                        fk_id_materia: materia.pk_id,
                    },
                },
                update: {},
                create: {
                    fk_id_curso: curso.pk_id,
                    fk_id_materia: materia.pk_id,
                },
            });
        }
    }
    console.log('✅ Seeding de materias por curso completado.');
}
if (require.main === module) {
    seedCursoMaterias()
        .catch((e) => {
        console.error(e);
        process.exit(1);
    })
        .finally(() => prisma.$disconnect());
}
//# sourceMappingURL=curso-materias.seed.js.map