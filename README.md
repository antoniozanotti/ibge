# IBGE

Cria gráficos com os dados da [API do IBGE](https://servicodados.ibge.gov.br/api/docs/agregados?versao=3)

Selecione Pesquisa, Agregado, Variáveis, Períodos, Classificações/Categorias, Nível Geográfico/Localidades e Opções de Montagem do Gráfico ou Tabela.

Destina-se a todos que desejam de forma fácil criar gráficos ou tabelas apartir dos dados das pesquisas do IBGE.

Você pode acessar [aqui](https://ibge.antoniozanotti.com/) versão publicada.

## Setup

Instale as dependências:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Inicia o servidor de desenvolvimento em `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Para fazer o build da aplicação em produção:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Para pré visualizar o build de produção:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```
## Quais as tecnologias que eu usei?
- Vue.js 3.5
- Nuxt 3.13
- TypeScript
- Tailwind CSS
- NuxtUI como biblioteca de componentes UI
- Chart.js para geração dos gráficos
- Tanstack Query para cache de requisições
- Axios para data fetching
- Pinia para gerenciamento de estado
- Zod para validação do formulário
- Playwright para os testes automatizados em differentes tamanhos de tela.
- ESLint
- Vercel