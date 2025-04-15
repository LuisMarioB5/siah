# Dockerfile para el backend de NestJS
FROM node:20-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de dependencias y los instala
COPY package*.json ./
RUN npm install

# Copia el resto del código
COPY . .

# Genera el entorno inicial de prisma
RUN npx prisma generate

# Compila la aplicación NestJS
RUN npm run build

# Expone el puerto en el que corre la app
EXPOSE 3001

# Comando para arrancar la app en desarrollo
CMD ["npx", "nest", "start", "--watch"]

