FROM node:16

# Criar a pasta da aplicação
WORKDIR /usr/src/app

# Instalar as dependências
COPY package*.json ./
RUN npm install

# Copiar arquivos
COPY . .
