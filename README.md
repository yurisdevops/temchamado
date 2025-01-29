# Tem Chamado?

> Plataforma web para gerenciamento de chamados de serviços.

O **Tem Chamado?** é uma aplicação moderna desenvolvida com as últimas tecnologias do **Next.js**, fornecendo uma experiência eficiente para abrir e gerenciar chamados de serviços. O projeto inclui recursos avançados para a gestão de chamados, tanto para usuários autenticados quanto para visitantes.

## Índice

- [Descrição do Projeto](#descrição-do-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Como Usar](#como-usar)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Contato](#contato)

## Descrição do Projeto

O **Tem Chamado?** permite abrir e gerenciar chamados de serviços de maneira prática. Ele oferece:

- Abertura de chamados com ou sem login ativo.
- Criação e exclusão de clientes, disponível apenas para usuários logados.
- Abertura e fechamento de chamados.
- Autenticação via **NextAuth** com **Google**.

## Funcionalidades

- **Abertura de Chamados:** Permite abrir chamados com ou sem login.
- **Gerenciamento de Clientes:** Criação e exclusão de clientes, apenas para usuários logados.
- **Autenticação:** Autenticação segura utilizando **NextAuth** com **Google**.
- **Interface Moderna:** Navegação responsiva com Tailwind CSS.
- **Validação:** Formulários validados com **Zod** e **Hook Form**.
- **Integrações:** Utilização de **Axios** para fazer requisições HTTP.

## Tecnologias Utilizadas

- **Next.js:** Framework moderno para construção de aplicações web.
- **React:** Biblioteca para construção de interfaces de usuário.
- **NextAuth:** Biblioteca para autenticação com provedores como Google.
- **Tailwind CSS:** Framework CSS utilitário.
- **TypeScript:** Superconjunto de JavaScript que adiciona tipagem estática.
- **MongoDB:** Banco de dados NoSQL flexível e escalável.
- **Prisma:** ORM para lidar com o banco de dados.
- **Zod:** Biblioteca para validação de esquemas.
- **React Hook Form:** Biblioteca para criar e gerenciar formulários.
- **Axios:** Cliente HTTP para fazer requisições.

## Como Usar

### 1. Clonar o Repositório

```bash
git clone https://github.com/yurisdevops/temchamado.git
cd temchamado
```

### 2. Instalar Dependências

Com `npm`:

```bash
npm install
```

Com `yarn`:

```bash
yarn install
```

### 3. Configurar as Variáveis de Ambiente

Adicione as seguintes variáveis no arquivo `.env`:

```env
DATABASE_URL=mongodb+srv://<username>:<password>@cluster0.mongodb.net/temchamado?retryWrites=true&w=majority
NODE_ENV=development
NEXTAUTH_URL=https://temchamado.vercel.app/
HOST_URL=https://temchamado.vercel.app/
NEXTAUTH_SECRET=your_secret
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
```

### 4. Executar o Projeto

Com `npm`:

```bash
npm run dev
```

Com `yarn`:

```bash
yarn dev
```

Acesse a aplicação no navegador: [Tem Chamado?](https://temchamado.vercel.app/)

Para abrir um chamado sem estar logado: [Abrir Chamado](https://temchamado.vercel.app/open)

## Scripts Disponíveis

- **`npm run dev`**: Inicia o servidor de desenvolvimento.
- **`npm run build`**: Gera os arquivos para produção.
- **`npm run start`**: Inicia a aplicação em produção.
- **`npm run lint`**: Executa o linter para verificar erros de código.

## Estrutura do Projeto

- **prisma** (configurações do Prisma)
- **public** (arquivos públicos)
- **src**
  - **@types** (tipagens TypeScript)
  - **app**
    - **api**
      - **auth** (autenticação)
      - **customer** (clientes)
      - **ticket** (chamados)
    - **dashboard** (painel de controle)
      - **components**
        - **customer** (gerenciamento de clientes)
        - **ticket** (gerenciamento de chamados)
      - **open** (abrir chamado)
    - **assets** (arquivos de mídia)
  - **components** (componentes reutilizáveis)
  - **lib** (bibliotecas auxiliares)
  - **providers** (provedores de serviços)
  - **utils** (utilitários gerais)

## Contato

Desenvolvido por [Yuri Souza](https://github.com/yurisdevops). Entre em contato para dúvidas ou sugestões!

---

### 🔧 **Gerencie seus chamados de serviços de maneira eficiente com Tem Chamado?**

