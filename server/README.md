# Servidor da aplicação

### Anotações

##### Comandos Prisma

###### `npm i prisma -D` - Instala o prisma.
###### `npm i @prisma/client` - Instala o cliente do prisma.
###### `npm i prisma-erd-generator @mermaid-js/mermaid -D` - Instala o pacotes para criação e exibição dos modelos de entidades.
###### `npm i @fastify/cors` - Instala o pacote para lidar com cors no fastify.

###### `npx prisma init --datasource-provider SQLite` - Inicia a configuração do prisma e arquivos iniciais.
###### `npx prisma migrate dev` - Inicia uma migration e pede para você nomear (Iqual a um commit).
###### `npx prisma studio` - Inicia o playground do prisma na porta 5555.
###### `npx prisma generate` - Gera os modelos de relacionamento de entidades.