# Etapa 1: Construção da aplicação
FROM node:18-alpine AS builder

WORKDIR /app

# Copia apenas os arquivos necessários para instalar dependências
COPY package.json package-lock.json ./ 

# Instala as dependências sem rodar scripts desnecessários
RUN npm ci 

# Copia o restante do código e compila o projeto
COPY . . 
RUN npm run build 

# Etapa 2: Imagem final para rodar a aplicação
FROM node:18-alpine

WORKDIR /app

# Copia apenas os arquivos necessários da etapa anterior
COPY --from=builder /app/package.json /app/package-lock.json ./
RUN npm ci --omit=dev

# Copia a build da aplicação
COPY --from=builder /app/.next .next
COPY --from=builder /app/public public
COPY --from=builder /app/node_modules node_modules

EXPOSE 3000

# Comando para rodar o Next.js
CMD ["npm", "start"]
