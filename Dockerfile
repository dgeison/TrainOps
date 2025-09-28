# syntax=docker/dockerfile:1

# Etapa base
FROM node:20-alpine AS base
WORKDIR /app
ENV NODE_ENV=production

# Copia package para instalar deps primeiro (cache)
COPY package.json package-lock.json* ./

# Instala apenas production deps (não há separação dev aqui, mas mantemos padrão)
RUN npm install --omit=dev || npm install

# Copia restante do código
COPY . .

# Porta exposta
EXPOSE 5000

# Comando default
CMD ["npm", "run", "serve"]
