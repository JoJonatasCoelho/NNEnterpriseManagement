# Enterprise Management API

Uma API REST completa para gerenciamento de empresas, desenvolvida com NestJS, TypeORM e PostgreSQL. O sistema oferece funcionalidades de CRUD para empresas, endereços, contatos e usuários, com autenticação JWT e controle de acesso baseado em roles.

## 🚀 Funcionalidades

- ✅ **CRUD de Empresas**: Criar, listar, atualizar e deletar empresas
- ✅ **Gestão de Endereços**: Associação de endereços às empresas
- ✅ **Gestão de Contatos**: Múltiplos contatos por empresa
- ✅ **Autenticação JWT**: Sistema seguro de login e registro
- ✅ **Controle de Roles**: Diferentes níveis de acesso (Admin/User)
- ✅ **Documentação Swagger**: API totalmente documentada
- ✅ **Validação de Dados**: Validação automática com class-validator
- ✅ **Banco PostgreSQL**: Persistência robusta com TypeORM

## 🛠️ Tecnologias Utilizadas

- **NestJS** v10 - Framework Node.js progressivo
- **TypeORM** v0.3 - ORM para TypeScript/JavaScript
- **PostgreSQL** - Banco de dados relacional
- **JWT** - Autenticação via tokens
- **Swagger** - Documentação automática da API
- **Class Validator** - Validação de DTOs
- **Jest** - Framework de testes

## 📁 Estrutura do Projeto

```
src/
├── address/           # Módulo de endereços
├── auth/             # Autenticação e autorização
├── contact/          # Módulo de contatos
├── enterprise/       # Módulo principal de empresas
├── users/            # Gestão de usuários
├── app.module.ts     # Módulo principal
└── main.ts          # Arquivo de inicialização
```

## ⚙️ Configuração do Ambiente

### Pré-requisitos

- Node.js (v16 ou superior)
- PostgreSQL
- npm ou yarn

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=sua_senha
DB_DATABASE=enterprise_db
JWT_SECRET=seu_jwt_secret_aqui
PORT=3000
```

### Instalação

```bash
# Instalar dependências
npm install

# Configurar banco de dados PostgreSQL
# Certifique-se de que o PostgreSQL está rodando e crie o database
```

## 🚀 Executando a Aplicação

```bash
# Desenvolvimento
npm run dev

# Desenvolvimento com debug
npm run start:debug

# Produção
npm run build
npm run start:prod
```

A aplicação estará disponível em `http://localhost:3000`

## 📚 Documentação da API

Acesse a documentação Swagger em: `http://localhost:3000/api`

### Principais Endpoints

#### Autenticação

- `POST /auth/register` - Registro de usuário
- `POST /auth/login` - Login
- `POST /auth/profile` - Perfil do usuário (Admin only)

#### Empresas

- `GET /enterprise` - Listar todas as empresas
- `POST /enterprise` - Criar nova empresa
- `GET /enterprise/:id` - Buscar empresa por ID
- `PATCH /enterprise/:id` - Atualizar empresa
- `DELETE /enterprise/:id` - Deletar empresa

#### Endereços

- `GET /address` - Listar endereços
- `POST /address` - Criar endereço
- `PATCH /address/:id` - Atualizar endereço

#### Contatos

- `GET /contact` - Listar contatos
- `POST /contact` - Criar contato
- `PATCH /contact/:id` - Atualizar contato

## 🔐 Autenticação

A API utiliza JWT (JSON Web Tokens) para autenticação. Para acessar endpoints protegidos:

1. Faça login em `/auth/login`
2. Use o token retornado no header `Authorization: Bearer <token>`

### Roles Disponíveis

- **User**: Acesso básico
- **Admin**: Acesso completo

## 🧪 Testes

```bash
# Testes unitários
npm run test

# Testes e2e
npm run test:e2e

# Cobertura de testes
npm run test:cov

# Testes em modo watch
npm run test:watch
```

## 📊 Modelo de Dados

### Enterprise (Empresa)

- `id`: Identificador único
- `name`: Nome da empresa
- `cnpj`: CNPJ único
- `company`: Razão social
- `margin`: Margem de lucro
- `address`: Relacionamento com endereço
- `contacts`: Lista de contatos

### Address (Endereço)

- Informações de localização das empresas

### Contact (Contato)

- Contatos associados às empresas

### User (Usuário)

- `id`: Identificador único
- `name`: Nome do usuário
- `email`: Email único
- `password`: Senha criptografada
- `roles`: Array de roles (User/Admin)

## 🔧 Scripts Disponíveis

- `npm run build` - Build da aplicação
- `npm run format` - Formatação de código com Prettier
- `npm run start` - Executar em produção
- `npm run dev` - Executar em desenvolvimento
- `npm run lint` - Linting do código

## 📈 Próximas Melhorias

- [ ] Cache com Redis
- [ ] Upload de arquivos
- [ ] Logs estruturados
- [ ] Métricas e monitoramento
- [ ] Rate limiting
- [ ] Versionamento da API

Desenvolvido com ❤️ usando NestJS
