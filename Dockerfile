FROM node:18-alpine AS build

# Criar a pasta da aplicação
WORKDIR /app

# Instalar as dependências
COPY package*.json .
RUN npm ci --include=dev

# Copiar arquivos
COPY . .

# Buildar a aplicação
RUN npm run build

# - TODO -

FROM node:18-alpine

# Criar a pasta da aplicação
WORKDIR /app

# Instalar as dependências
COPY package*.json .
RUN npm ci --omit=dev

# Copiar arquivos
COPY --from=build /app/dist /app/src/
COPY tsconfig.json .
COPY .env .

# Iniciar a aplicação
CMD ["npm", "start"]
