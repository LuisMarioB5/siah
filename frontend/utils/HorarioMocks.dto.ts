export interface HorarioMock {
    mensaje: string;
    resultado: CursoHorario[];
}

export interface Curso {
    pk_id: number;
    nombre: string;
    descripcion: string | null;
}

export interface CursoHorario {
    curso: Curso;
    asignaciones: AsignacionDia[];
}

export interface AsignacionDia {
    dia: string;
    data: BloqueHorario[];
}

export interface BloqueHorario {
    bloque: Bloque;
    docente?: Docente;
    aula?: Aula;
    materia?: Materia;
}

interface Bloque {
    pk_id: number;
    tipo: "clase" | "receso" | "almuerzo";
    hora_inicio: string; // Formato ISO: "1970-01-01T12:15:00.000Z"
    hora_fin: string;
    observacion: string;
}

interface Docente {
    pk_id: number;
    fk_id_persona: number;
    horas_max_semana: string;
    fecha_ingreso: string; // ISO
    activo: boolean;
    persona: Persona;
}

interface Persona {
    pk_id: number;
	fk_id_sexo: number;
	nombre: string;
	apellido: string;
	fecha_nacimiento: string;
	correo_electronico: string,
	telefono: string;
	direccion: string;
	tipo: string;
}

interface Aula {
    pk_id: number;
    nombre: string;
    capacidad: number;
    tipo: string;
    posicion: number;
    tiene_pc: boolean;
    tiene_proyector: boolean;
    tiene_lab: boolean;
}

interface Materia {
    pk_id: number;
    nombre: string;
    clave: string;
    requiere_lab: boolean;
    requiere_pc: boolean;
    observaciones: string | null;
}
  