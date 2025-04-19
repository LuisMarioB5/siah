-- CreateEnum
CREATE TYPE "tipo_persona" AS ENUM ('docente', 'director', 'administrativo', 'estudiante');

-- CreateEnum
CREATE TYPE "tipo_aula" AS ENUM ('conferencias', 'taller', 'normal', 'laboratorio');

-- CreateEnum
CREATE TYPE "tipo_bloque" AS ENUM ('clase', 'receso', 'almuerzo');

-- CreateEnum
CREATE TYPE "dia_semana" AS ENUM ('lunes', 'martes', 'miercoles', 'jueves', 'viernes');

-- CreateTable
CREATE TABLE "sexo" (
    "pk_id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "sexo_pkey" PRIMARY KEY ("pk_id")
);

-- CreateTable
CREATE TABLE "persona" (
    "pk_id" SERIAL NOT NULL,
    "fk_id_sexo" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "fecha_nacimiento" TIMESTAMP(3) NOT NULL,
    "correo_electronico" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "tipo" "tipo_persona" NOT NULL,

    CONSTRAINT "persona_pkey" PRIMARY KEY ("pk_id")
);

-- CreateTable
CREATE TABLE "materia" (
    "pk_id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "clave" TEXT NOT NULL,
    "require_lab" BOOLEAN NOT NULL,
    "require_pc" BOOLEAN NOT NULL,
    "observaciones" TEXT,

    CONSTRAINT "materia_pkey" PRIMARY KEY ("pk_id")
);

-- CreateTable
CREATE TABLE "docente" (
    "pk_id" SERIAL NOT NULL,
    "fk_id_persona" INTEGER NOT NULL,
    "horas_max_semana" DECIMAL(5,2) NOT NULL,
    "fecha_ingreso" TIMESTAMP(3) NOT NULL,
    "activo" BOOLEAN NOT NULL,

    CONSTRAINT "docente_pkey" PRIMARY KEY ("pk_id")
);

-- CreateTable
CREATE TABLE "docente_materia" (
    "pk_id" SERIAL NOT NULL,
    "fk_id_docente" INTEGER NOT NULL,
    "fk_id_materia" INTEGER NOT NULL,

    CONSTRAINT "docente_materia_pkey" PRIMARY KEY ("pk_id")
);

-- CreateTable
CREATE TABLE "curso" (
    "pk_id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,

    CONSTRAINT "curso_pkey" PRIMARY KEY ("pk_id")
);

-- CreateTable
CREATE TABLE "curso_materia" (
    "pk_id" SERIAL NOT NULL,
    "fk_id_curso" INTEGER NOT NULL,
    "fk_id_materia" INTEGER NOT NULL,

    CONSTRAINT "curso_materia_pkey" PRIMARY KEY ("pk_id")
);

-- CreateTable
CREATE TABLE "aula" (
    "pk_id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "capacidad" INTEGER NOT NULL,
    "tipo" "tipo_aula" NOT NULL,

    CONSTRAINT "aula_pkey" PRIMARY KEY ("pk_id")
);

-- CreateTable
CREATE TABLE "anio_escolar" (
    "pk_id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "fecha_inicio" TIMESTAMP(3) NOT NULL,
    "fecha_fin" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "anio_escolar_pkey" PRIMARY KEY ("pk_id")
);

-- CreateTable
CREATE TABLE "asignacion" (
    "pk_id" SERIAL NOT NULL,
    "fk_id_curso" INTEGER,
    "fk_id_aula" INTEGER,
    "fk_id_materia" INTEGER,
    "fk_id_docente" INTEGER,
    "fk_id_bloque" INTEGER NOT NULL,
    "fk_id_horario" INTEGER NOT NULL,
    "justificacion" TEXT,

    CONSTRAINT "asignacion_pkey" PRIMARY KEY ("pk_id")
);

-- CreateTable
CREATE TABLE "bloque" (
    "pk_id" SERIAL NOT NULL,
    "tipo" "tipo_bloque" NOT NULL,
    "hora_inicio" TIME NOT NULL,
    "hora_fin" TIME NOT NULL,
    "observacion" TEXT,

    CONSTRAINT "bloque_pkey" PRIMARY KEY ("pk_id")
);

-- CreateTable
CREATE TABLE "horario_generado" (
    "pk_id" SERIAL NOT NULL,
    "fk_id_periodo" INTEGER NOT NULL,
    "dia" "dia_semana" NOT NULL,
    "esta_activo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "horario_generado_pkey" PRIMARY KEY ("pk_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "sexo_nombre_key" ON "sexo"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "persona_correo_electronico_key" ON "persona"("correo_electronico");

-- CreateIndex
CREATE UNIQUE INDEX "materia_nombre_key" ON "materia"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "materia_clave_key" ON "materia"("clave");

-- CreateIndex
CREATE UNIQUE INDEX "docente_fk_id_persona_key" ON "docente"("fk_id_persona");

-- CreateIndex
CREATE UNIQUE INDEX "docente_materia_fk_id_docente_fk_id_materia_key" ON "docente_materia"("fk_id_docente", "fk_id_materia");

-- CreateIndex
CREATE UNIQUE INDEX "curso_nombre_key" ON "curso"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "curso_materia_fk_id_curso_fk_id_materia_key" ON "curso_materia"("fk_id_curso", "fk_id_materia");

-- CreateIndex
CREATE UNIQUE INDEX "aula_nombre_key" ON "aula"("nombre");

-- AddForeignKey
ALTER TABLE "persona" ADD CONSTRAINT "persona_fk_id_sexo_fkey" FOREIGN KEY ("fk_id_sexo") REFERENCES "sexo"("pk_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "docente" ADD CONSTRAINT "docente_fk_id_persona_fkey" FOREIGN KEY ("fk_id_persona") REFERENCES "persona"("pk_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "docente_materia" ADD CONSTRAINT "docente_materia_fk_id_docente_fkey" FOREIGN KEY ("fk_id_docente") REFERENCES "docente"("pk_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "docente_materia" ADD CONSTRAINT "docente_materia_fk_id_materia_fkey" FOREIGN KEY ("fk_id_materia") REFERENCES "materia"("pk_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "curso_materia" ADD CONSTRAINT "curso_materia_fk_id_curso_fkey" FOREIGN KEY ("fk_id_curso") REFERENCES "curso"("pk_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "curso_materia" ADD CONSTRAINT "curso_materia_fk_id_materia_fkey" FOREIGN KEY ("fk_id_materia") REFERENCES "materia"("pk_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "asignacion" ADD CONSTRAINT "asignacion_fk_id_aula_fkey" FOREIGN KEY ("fk_id_aula") REFERENCES "aula"("pk_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "asignacion" ADD CONSTRAINT "asignacion_fk_id_curso_fkey" FOREIGN KEY ("fk_id_curso") REFERENCES "curso"("pk_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "asignacion" ADD CONSTRAINT "asignacion_fk_id_materia_fkey" FOREIGN KEY ("fk_id_materia") REFERENCES "materia"("pk_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "asignacion" ADD CONSTRAINT "asignacion_fk_id_docente_fkey" FOREIGN KEY ("fk_id_docente") REFERENCES "docente"("pk_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "asignacion" ADD CONSTRAINT "asignacion_fk_id_bloque_fkey" FOREIGN KEY ("fk_id_bloque") REFERENCES "bloque"("pk_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "asignacion" ADD CONSTRAINT "asignacion_fk_id_horario_fkey" FOREIGN KEY ("fk_id_horario") REFERENCES "horario_generado"("pk_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "horario_generado" ADD CONSTRAINT "horario_generado_fk_id_periodo_fkey" FOREIGN KEY ("fk_id_periodo") REFERENCES "anio_escolar"("pk_id") ON DELETE RESTRICT ON UPDATE CASCADE;
