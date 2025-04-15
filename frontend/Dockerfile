# Etapa 1: build
FROM node:20-slim AS builder

WORKDIR /app

COPY package*.json* ./
RUN npm install

COPY . .
RUN npm run build


# Etapa 2: entorno final
FROM node:20-slim

# Establece el directorio de trabajo en la imagen final
WORKDIR /app

# Copia solo lo necesario desde el builder
COPY --from=builder /app ./

# Asegura el entorno de desarrollo
ENV NODE_ENV=development

EXPOSE 3000

CMD ["npx", "nest", "start", "--watch"]
