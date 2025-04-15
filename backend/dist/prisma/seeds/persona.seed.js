"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedPersonas = seedPersonas;
const client_1 = require("@prisma/client");
const faker_1 = require("@faker-js/faker");
const prisma = new client_1.PrismaClient();
async function seedPersonas() {
    const sexos = await prisma.sexo.findMany();
    const sexoMasculino = sexos.find(sexo => sexo.nombre === 'Masculino');
    const sexoFemenino = sexos.find(sexo => sexo.nombre === 'Femenino');
    const personas = [];
    console.log('🌱 Iniciando seeding para personas...');
    for (let i = 0; i < 10; i++) {
        const sexo = i % 2 === 0 ? sexoMasculino : sexoFemenino;
        const fakerSex = sexo === sexoFemenino ? 'female' : 'male';
        const fechaNacimiento = faker_1.faker.date.birthdate({
            min: 25,
            max: 65,
            mode: 'age',
            refDate: new Date()
        });
        personas.push({
            fk_id_sexo: sexo.pk_id,
            nombre: faker_1.faker.person.firstName(fakerSex),
            apellido: faker_1.faker.person.lastName(fakerSex),
            fecha_nacimiento: fechaNacimiento,
            correo_electronico: faker_1.faker.internet.email(),
            telefono: faker_1.faker.phone.number({
                style: 'national'
            }),
            direccion: '',
            tipo: client_1.tipo_persona.docente,
        });
    }
    await prisma.persona.createMany({
        data: personas,
    });
    console.log('✅ Seeding de personas completo.');
}
if (require.main === module) {
    seedPersonas()
        .catch((e) => {
        throw e;
    })
        .finally(async () => {
        await prisma.$disconnect();
    });
}
//# sourceMappingURL=persona.seed.js.map