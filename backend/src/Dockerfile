# Use a imagem base oficial do Node.js
FROM node:22-alpine

# Defina o diretório de trabalho no contêiner
WORKDIR /app

# Copie o package.json e o package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências, incluindo as devDependencies
RUN npm install --include=dev

# Copie o restante do código do projeto para o contêiner
COPY . .

# Compile o TypeScript para JavaScript
RUN npm run build

# Exponha a porta que a aplicação utiliza
EXPOSE 8080

# Comando para rodar a aplicação
CMD ["npm", "run", "start"]
