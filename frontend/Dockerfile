# Etapa 1: Build do front (node)
FROM node:20-alpine as builder

WORKDIR /app

# Copia package.json e package-lock.json (ou yarn.lock)
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia o restante do código
COPY . .

# Build (opcional, se for produção)
# RUN npm run build

# Etapa 2: Servir em dev (usando react dev server)
# Aqui mantemos tudo no mesmo container para desenvolvimento
CMD ["npm", "start"]