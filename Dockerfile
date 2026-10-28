FROM node:20-alpine

WORKDIR /app

# Copia arquivos da aplicação
COPY package*.json ./
COPY . .

# Define porta padrão
ENV NODE_ENV=production
ENV PORT=80

EXPOSE 80

# Inicia o servidor HTTP
CMD ["node", "server.js"]
