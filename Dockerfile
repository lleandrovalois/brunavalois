FROM node:20-alpine

WORKDIR /app

# Copia arquivos e instala dependências
COPY package*.json ./
RUN npm install --omit=dev

COPY . .

# Define porta padrão
ENV NODE_ENV=production
ENV PORT=80

EXPOSE 80

# Inicia o servidor HTTP
CMD ["node", "server.js"]
