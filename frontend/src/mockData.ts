// Mock data for courses
export const mockCourses = [
  { id: "1A", label: "1° A" },
  { id: "1B", label: "1° B" },
  { id: "2A", label: "2° A" },
  { id: "2B", label: "2° B" },
  { id: "3A", label: "3° A" },
  { id: "3B", label: "3° B" },
]

// Mock data for teachers
export const mockTeachers = [
  { id: "maria-lopez", label: "María López" },
  { id: "juan-perez", label: "Juan Pérez" },
  { id: "ana-garcia", label: "Ana García" },
  { id: "carlos-ruiz", label: "Carlos Ruiz" },
  { id: "laura-martinez", label: "Laura Martínez" },
  { id: "pedro-sanchez", label: "Pedro Sánchez" },
  { id: "elena-gomez", label: "Elena Gómez" },
  { id: "roberto-diaz", label: "Roberto Díaz" },
  { id: "miguel-torres", label: "Miguel Torres" },
  { id: "lucia-fernandez", label: "Lucía Fernández" },
]

// Mock data for subjects
export const mockSubjects = [
  { id: "matematicas", label: "Matemáticas" },
  { id: "ciencias", label: "Ciencias" },
  { id: "historia", label: "Historia" },
  { id: "literatura", label: "Literatura" },
  { id: "ingles", label: "Inglés" },
  { id: "fisica", label: "Física" },
  { id: "quimica", label: "Química" },
  { id: "biologia", label: "Biología" },
  { id: "educacion-fisica", label: "Educación Física" },
  { id: "arte", label: "Arte" },
  { id: "musica", label: "Música" },
  { id: "informatica", label: "Informática" },
]

// Mock data for classrooms
export const mockClassrooms = [
  { id: "a101", label: "A101" },
  { id: "a102", label: "A102" },
  { id: "b203", label: "B203" },
  { id: "b204", label: "B204" },
  { id: "c305", label: "C305" },
  { id: "c306", label: "C306" },
]

// Mock data for days
export const mockDays = [
  { id: "lunes", label: "Lunes" },
  { id: "martes", label: "Martes" },
  { id: "miercoles", label: "Miércoles" },
  { id: "jueves", label: "Jueves" },
  { id: "viernes", label: "Viernes" },
]

// Mock schedule data
export const mockScheduleData = {
  Lunes: {
    "7:30 - 8:20": {
      teacher: "María López",
      subject: "Matemáticas",
      room: "A101",
      course: "1A",
      points: 92,
    },
    "8:20 - 9:10": {
      teacher: "María López",
      subject: "Matemáticas",
      room: "A101",
      course: "1A",
      points: 92,
    },
    "9:10 - 10:00": {
      teacher: "Carlos Ruiz",
      subject: "Literatura",
      room: "A102",
      course: "1B",
      points: 88,
    },
    "10:00 - 10:30": {
      isBreak: true,
      name: "RECESO",
    },
    "10:30 - 11:20": {
      teacher: "María López",
      subject: "Matemáticas",
      room: "A101",
      course: "2B",
      points: 90,
    },
    "11:20 - 12:10": {
      teacher: "Carlos Ruiz",
      subject: "Literatura",
      room: "A102",
      course: "3A",
      points: 85,
    },
    "12:10 - 13:00": {
      teacher: "María López",
      subject: "Matemáticas",
      room: "A101",
      course: "3B",
      points: 87,
      isSubstitution: true,
      originalTeacher: "Pedro Sánchez",
    },
  },
  Martes: {
    "7:30 - 8:20": {
      teacher: "Pedro Sánchez",
      subject: "Física",
      room: "C306",
      course: "1A",
      points: 89,
    },
    "8:20 - 9:10": {
      teacher: "María López",
      subject: "Matemáticas",
      room: "A101",
      course: "2A",
      points: 91,
    },
    "9:10 - 10:00": {
      teacher: "Ana García",
      subject: "Ciencias",
      room: "C305",
      course: "1B",
      points: 86,
    },
    "10:00 - 10:30": {
      isBreak: true,
      name: "RECESO",
    },
    "10:30 - 11:20": {
      teacher: "Pedro Sánchez",
      subject: "Física",
      room: "C306",
      course: "2B",
      points: 88,
    },
    "11:20 - 12:10": {
      teacher: "Ana García",
      subject: "Ciencias",
      room: "C305",
      course: "3A",
      points: 84,
    },
    "12:10 - 13:00": {
      teacher: "Juan Pérez",
      subject: "Historia",
      room: "B203",
      course: "2B",
      points: 82,
      isSubstitution: true,
      originalTeacher: "Laura Martínez",
    },
  },
  Miércoles: {
    "7:30 - 8:20": {
      teacher: "Laura Martínez",
      subject: "Inglés",
      room: "B204",
      course: "1A",
      points: 90,
    },
    "8:20 - 9:10": {
      teacher: "Pedro Sánchez",
      subject: "Física",
      room: "C306",
      course: "2A",
      points: 87,
    },
    "9:10 - 10:00": {
      teacher: "Juan Pérez",
      subject: "Historia",
      room: "B203",
      course: "1B",
      points: 85,
    },
    "10:00 - 10:30": {
      isBreak: true,
      name: "RECESO",
    },
    "10:30 - 11:20": {
      teacher: "Roberto Díaz",
      subject: "Matemáticas",
      room: "A101",
      course: "1B",
      points: 92,
      isSubstitution: true,
      originalTeacher: "María López",
    },
    "11:20 - 12:10": {
      teacher: "Juan Pérez",
      subject: "Historia",
      room: "B203",
      course: "3A",
      points: 86,
    },
    "12:10 - 13:00": {
      teacher: "Laura Martínez",
      subject: "Inglés",
      room: "B204",
      course: "3B",
      points: 89,
    },
  },
  Jueves: {
    "7:30 - 8:20": {
      teacher: "Carlos Ruiz",
      subject: "Literatura",
      room: "A102",
      course: "1A",
      points: 88,
    },
    "8:20 - 9:10": {
      teacher: "Laura Martínez",
      subject: "Inglés",
      room: "B204",
      course: "2A",
      points: 90,
    },
    "9:10 - 10:00": {
      teacher: "María López",
      subject: "Matemáticas",
      room: "A101",
      course: "1B",
      points: 92,
    },
    "10:00 - 10:30": {
      isBreak: true,
      name: "RECESO",
    },
    "10:30 - 11:20": {
      teacher: "Carlos Ruiz",
      subject: "Literatura",
      room: "A102",
      course: "2B",
      points: 87,
    },
    "11:20 - 12:10": {
      teacher: "María López",
      subject: "Matemáticas",
      room: "A101",
      course: "3A",
      points: 91,
    },
    "12:10 - 13:00": {
      teacher: "Elena Gómez",
      subject: "Historia",
      room: "B203",
      course: "3B",
      points: 87,
      isSubstitution: true,
      originalTeacher: "Juan Pérez",
    },
  },
  Viernes: {
    "7:30 - 8:20": {
      teacher: "Ana García",
      subject: "Ciencias",
      room: "C305",
      course: "1A",
      points: 85,
    },
    "8:20 - 9:10": {
      teacher: "Carlos Ruiz",
      subject: "Literatura",
      room: "A102",
      course: "2A",
      points: 88,
    },
    "9:10 - 10:00": {
      teacher: "Pedro Sánchez",
      subject: "Física",
      room: "C306",
      course: "1B",
      points: 89,
    },
    "10:00 - 10:30": {
      isBreak: true,
      name: "RECESO",
    },
    "10:30 - 11:20": {
      teacher: "Ana García",
      subject: "Ciencias",
      room: "C305",
      course: "2B",
      points: 84,
    },
    "11:20 - 12:10": {
      teacher: "Miguel Torres",
      subject: "Física",
      room: "C306",
      course: "3A",
      points: 82,
      isSubstitution: true,
      originalTeacher: "Pedro Sánchez",
    },
    "12:10 - 13:00": {
      teacher: "María López",
      subject: "Matemáticas",
      room: "A101",
      course: "1A",
      points: 92,
    },
  },
}
