FROM node:18-alpine AS build

# Definir o diretório de trabalho dentro do container
WORKDIR /app

# Copiar o package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instalar as dependências do projeto
RUN npm install

# Copiar todos os arquivos do projeto para dentro do container
COPY . .

# Etapa 2: Definição da imagem final
FROM node:18-alpine

# Definir o diretório de trabalho dentro do container
WORKDIR /app

# Copiar os arquivos instalados da etapa de build
COPY --from=build /app /app

EXPOSE 5000

# Comando para rodar a API
CMD ["npm", "start"]
