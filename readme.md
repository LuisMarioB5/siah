# 🎓 Proyecto Final – Sistema de Asignación de Horarios

---

## 📌 Descripción General

Este sistema permite la creación de **horarios académicos inteligentes** para cursos o grupos, basado en criterios personalizados y preferencias configuradas por el usuario.

### 🧩 Estructura del proceso (3 pasos):

1. **Selección de datos iniciales:** Curso, materias, docentes, aulas, etc.  
2. **Configuración del horario:** Definición de bloques semanales (clases, recesos, almuerzos).  
3. **Aplicación de criterios:** Asignación basada en experiencia docente, equipamiento de aulas, entre otros.

---

## 💻 Requisitos del Sistema

- Node.js `v20+`
- Docker y Docker Compose
- Navegador moderno (Chrome, Firefox, Edge)

---

## 🚀 Instrucciones de Ejecución

### 1. 📂 Abrir la carpeta raíz del proyecto (`root`)

### 2. 🗄 Base de Datos

```bash
docker compose up db -d
```

### 3. 🛠 Backend

```bash
docker compose -f docker-compose.yml up -d --build backend
```
  - El backend se ejecutará en: http://localhost:3001

**Inicializar la base de datos**
```bash
docker exec -it siash-backend sh
```
```bash
npx prisma migrate dev
```
    
**Sembrar datos de prueba**
```bash
npx prisma db seed
```
    
**Visualizador de la base de datos**
```bash
npx prisma studio
```
  - Accesible en: http://localhost:5555

### 4. 🎨 Frontend

```bash
docker compose -f docker-compose.yml up -d --build frontend
```
  - El frontend se ejecutará en: http://localhost:3000


## ✅ Funcionalidades Implementadas

- ✔ **Paso 1:** Selección de curso, año escolar, materias, docentes, aulas y requisitos especiales.
- ✔ **Paso 2:** Edición de bloques del horario semanal con soporte para recesos y almuerzos.
- ✔ **Paso 3:** Criterios de asignación por puntos y criterios personalizados.
- ✖ **Generación automática del horario:** *En desarrollo* (pendiente el endpoint y visualización final).

---

## 🛠 Tecnologías Utilizadas

- **Backend:** NestJS, Prisma, PostgreSQL  
- **Frontend:** Next.js, TailwindCSS, Context API  
- **Otros:** Docker, Docker Compose  

---

## 📝 Notas

> Este proyecto puede ejecutarse completamente de forma local sin conexión a internet.  
> Puedes personalizar los criterios de asignación para ajustar el sistema a tus necesidades.
