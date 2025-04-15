const BASE_URL = 'http://localhost:3001/asignacion/catalogo';

export async function getMaterias() {
  const res = await fetch(`${BASE_URL}/materias`);
  return res.json();
}

export async function getDocentes() {
  const res = await fetch(`${BASE_URL}/docentes`);
  return res.json();
}

export async function getAulas() {
  const res = await fetch(`${BASE_URL}/aulas`);
  return res.json();
}

export async function getAniosEscolares() {
  const res = await fetch(`${BASE_URL}/anios-escolares`);
  return res.json();
}

export async function getCursos() {
  const res = await fetch(`${BASE_URL}/cursos`);
  return res.json();
}
