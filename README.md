
raw
Readme · MD
# 💸 EconoApp
 
> Aplicação fullstack de controle financeiro pessoal — gerencie despesas, categorias e visualize seus gastos com relatórios e gráficos interativos.
 
---
 
## 📌 Índice
 
- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Segurança](#-segurança)
- [Tecnologias](#-tecnologias)
- [Arquitetura](#-arquitetura)
- [Como Rodar o Projeto](#-como-rodar-o-projeto)
- [Variáveis de Ambiente](#-variáveis-de-ambiente)
- [Estrutura de Pastas](#-estrutura-de-pastas)
- [Decisões Técnicas](#-decisões-técnicas)
---
 
## 📖 Sobre o Projeto
 
O **EconoApp** é uma aplicação web fullstack desenvolvida para o controle de finanças pessoais. O usuário pode registrar despesas, organizá-las por categorias customizadas e acompanhar seus gastos através de relatórios mensais com gráficos interativos.
 
O projeto foi construído com foco em **segurança**, **boas práticas de API REST** e **compatibilidade cross-platform** — incluindo suporte nativo a dispositivos Apple sem necessidade de domínio próprio, através de Server-Side Rendering com React.
 
---
 
## ✅ Funcionalidades
 
### 🔐 Autenticação
- Registro com validação de email único
- Login com comparação segura de senha via `bcrypt`
- JWT gerado no login e armazenado em cookie `HttpOnly`
- Logout com limpeza segura de sessão
- Proteção de rotas por autenticação e por `role`
### 💰 Despesas
- Listagem com métricas: total, pagas, em aberto e quantidade
- Filtros avançados por nome, data, valor, status e categoria
- Criação com suporte a parcelas e despesas recorrentes
- Edição e exclusão com confirmação — restritas ao proprietário
- Paginação na listagem
### 🏷️ Categorias
- CRUD completo e exclusivo por usuário
- Emoji, cor customizada e nome por categoria
- Contador de despesas vinculadas por categoria
### 📊 Relatórios
- Total anual, mês atual vs. mês anterior
- Variação percentual com indicadores visuais (↑ ↓)
- Gráfico de pizza por distribuição de categorias
- Gráfico de barras de gastos mensais ao longo do ano
- Top categoria e mês de maior gasto
### ⚙️ Configurações
- Editar nome, email e senha
- Exclusão permanente de conta
---
 
## 🔒 Segurança
 
A segurança foi tratada como prioridade em todas as camadas da aplicação:
 
### Autenticação com JWT + Cookie HttpOnly
O token JWT é armazenado em um cookie `HttpOnly`, o que impede acesso via JavaScript no frontend — eliminando o risco de roubo de token por ataques XSS.
 
```
Set-Cookie: token=<jwt>; HttpOnly; Secure; SameSite=None; Max-Age=86400
```
 
### Hash de Senhas com Bcrypt
Senhas nunca são armazenadas em texto puro. O `bcrypt` aplica um salt aleatório a cada hash, tornando ataques de rainbow table ineficazes.
 
```typescript
const hash = await bcrypt.hash(password, 10) // 10 rounds de salt
```
 
### Controle de Acesso por Role (RBAC)
Três níveis de acesso protegem as rotas da API:
 
| Role | Acesso |
|---|---|
| `standard` | Próprias despesas e categorias |
| `premium` | Recursos extras (roadmap) |
| `admin` | Dados de todos os usuários |
 
### Ownership Validation
Toda operação de leitura, edição e exclusão valida se o recurso pertence ao usuário autenticado — impedindo que um usuário acesse dados de outro mesmo com um token válido.
 
```typescript
if (expense.userId !== req.user.id) {
  return res.status(403).json({ message: "Acesso negado" })
}
```
 
### Variáveis de Ambiente
Nenhuma credencial, secret ou string de conexão está hardcoded no código. Tudo é gerenciado via `.env` e ignorado no `.gitignore`.
 
---
 
## 🛠 Tecnologias
 
### Backend
| Tecnologia | Uso |
|---|---|
| `Node.js` + `TypeScript` | Runtime e tipagem estática |
| `Express` | Framework HTTP e roteamento |
| `Prisma ORM` | Acesso ao banco com type-safety |
| `PostgreSQL` | Banco de dados relacional |
| `bcrypt` | Hash seguro de senhas |
| `jsonwebtoken` | Geração e validação de JWT |
| `dotenv` | Gerenciamento de variáveis de ambiente |
 
### Frontend
| Tecnologia | Uso |
|---|---|
| `React` | Interface de usuário |
| `TypeScript` | Tipagem no frontend |
 
### Infra & Tooling
| Tecnologia | Uso |
|---|---|
| `SSR (Server-Side Rendering)` | React renderizado pelo backend para compatibilidade com dispositivos Apple sem domínio próprio |
| `ts-node` + `nodemon` | Ambiente de desenvolvimento com hot reload |
 
---
 
## 🏗 Arquitetura
 
A aplicação segue uma arquitetura modular por domínio, separando responsabilidades entre `controller`, `service` e `routes`:
 
```
Controller  →  recebe a requisição HTTP e valida entrada
Service     →  contém a regra de negócio e acessa o Prisma
Middleware  →  Validação de autenticação e role 
Schema      →  Criação da tipagem para entradas e saídas
Routes      →  define os endpoints e aplica middlewares
```
 
O frontend React é servido pelo próprio backend via SSR, eliminando a necessidade de um servidor de arquivos separado ou de um domínio próprio — garantindo compatibilidade com navegadores Safari no iOS, que bloqueiam cookies de terceiros e exigem contexto de origem única.
 
---
 
## 🚀 Como Rodar o Projeto
 
### Pré-requisitos
- Node.js 18+
- PostgreSQL rodando localmente ou na nuvem
- npm ou yarn
### Instalação
 
```bash
# Clone o repositório
git clone https://github.com/seu-usuario/econoapp.git
cd econoapp
 
# Instale as dependências
npm install
 
# Configure as variáveis de ambiente
cp .env
# edite o .env com suas credenciais
 
# Rode as migrations do banco
npx prisma migrate dev
 
# Inicie em desenvolvimento
npm run dev
```
 
### Scripts disponíveis
 
```bash
npm run dev      # inicia com hot reload (ts-node + nodemon)
npm run build    # compila TypeScript para /dist
npm run start    # inicia a versão compilada
```
 
---
 
## 🔑 Variáveis de Ambiente
 
Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
 
```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/econoapp"
SECRET_KEY="sua_chave_secreta_aqui"
PORT=3000
NODE_ENV=development
```
 
> ⚠️ Nunca commite o arquivo `.env`. Ele já está no `.gitignore`.
 
---
 
## 📁 Estrutura de Pastas
 
```
econoapp/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma            # Models e configuração do banco
│   ├── src/
│   │   ├── @types/                  # Tipagens globais (TypeScript)
│   │   ├── Controller/              # Controllers (lógica das rotas)
│   │   ├── database/                # Configuração de conexão com banco
│   │   ├── Error/                   # Tratamento de erros customizados
│   │   ├── middleware/              # Middlewares (auth, validações, etc.)
│   │   ├── Repository/              # Camada de acesso a dados (queries)
│   │   ├── Schema/                  # Schemas/validações (ex: Zod/Joi)
│   │   ├── Service/                 # Regras de negócio
│   │   ├── router.ts                # Definição de rotas
│   │   └── server.ts                # Entry point do backend
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   ├── prisma.config.ts
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── components/              # Componentes reutilizáveis
│   │   ├── context/                 # Context API (estado global)
│   │   ├── hooks/                   # Hooks customizados
│   │   ├── pages/                   # Páginas da aplicação
│   │   ├── service/                 # Comunicação com API
│   │   ├── App.jsx                  # Componente principal
│   │   ├── main.jsx                 # Entry point do React
│   │   ├── router.jsx               # Configuração de rotas
│   │   └── index.css                # Estilos globais
│   ├── index.html
│   ├── .env
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── package.json
│   ├── package-lock.json
│   ├── README.md
│   └── vite.config.js
```
 
---
 
## 💡 Decisões Técnicas
 
**Por que SSR em vez de SPA separada?**
Dispositivos Apple (iPhone/iPad) bloqueiam cookies de terceiros e têm restrições no Safari para apps servidos de origens diferentes. Renderizar o React pelo backend garante origem única, cookies funcionando corretamente e compatibilidade total sem necessidade de domínio próprio.
 
**Por que cookie HttpOnly em vez de localStorage?**
O `localStorage` é acessível por qualquer JavaScript na página, tornando-o vulnerável a XSS. O cookie `HttpOnly` é enviado automaticamente pelo browser e inacessível ao JavaScript — eliminando essa superfície de ataque.
 
**Por que Prisma?**
Além de type-safety completo com TypeScript, o Prisma torna as queries legíveis, evita SQL injection por padrão e facilita migrations versionadas com `prisma migrate`.
 
---
 
## 👨‍💻 Autor
 
Desenvolvido por **Arthur Albuquerque Amancio de Oliveira**
 
