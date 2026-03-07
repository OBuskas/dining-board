# Dining Board

Dashboard analítico de Business Intelligence para restaurantes e franquias. Centraliza métricas operacionais e financeiras em uma interface profissional com KPIs, gráficos comparativos, tabelas analíticas e filtros contextuais.

> Projeto de estudo com dados 100% mockados. Sem backend real nesta versão.

---

## Visão Geral

Na maioria dos restaurantes, dados de vendas, pedidos, produtos e performance de unidades estão espalhados em diferentes sistemas ou planilhas. O Dining Board consolida tudo em um único lugar, permitindo que gestores tomem decisões baseadas em dados.

**Problema que resolve:** fragmentação de informações operacionais e financeiras em redes de restaurantes e franquias.

**Foco técnico:** demonstrar domínio na construção de dashboards analíticos com tecnologias modernas do ecossistema React.

---

## Funcionalidades

| Página                    | Descrição                                                                                          | Status    |
| ------------------------- | -------------------------------------------------------------------------------------------------- | --------- |
| **Dashboard Overview**    | KPIs principais, faturamento, pedidos, ticket médio e crescimento vs período anterior              | Essencial |
| **Sales Analytics**       | Receita por período, comparações entre unidades, ranking de franquias e gráficos de evolução       | Essencial |
| **Product Mix**           | Participação de produtos no faturamento, top itens, receita por categoria e gráficos de composição | Essencial |
| **Operação e Pedidos**    | Horários de pico, distribuição por canal, taxa de cancelamento e pedidos recentes                  | Opcional  |
| **Unidades / Franquias**  | Comparativo de performance entre unidades, ranking e identificação de destaques                    | Opcional  |
| **Insights e Tendências** | Tendências de crescimento, alertas de métricas e destaques automáticos                             | Opcional  |

### KPIs e Métricas

**Financeiras:** Faturamento total · Ticket médio · Receita por categoria · Crescimento vs período anterior · Receita por unidade · Receita por produto

**Vendas e Produtos:** Pedidos totais · Vendas por dia · Product Mix (%) · Top 10 itens · Itens por pedido (média)

**Operacionais:** Horários de pico · Distribuição por canal (salão / delivery / takeout) · Taxa de cancelamento · Performance por unidade

---

## Stack Técnica

### Core

| Tecnologia                               | Versão | Função                         |
| ---------------------------------------- | ------ | ------------------------------ |
| [Next.js](https://nextjs.org)            | 16     | Framework React com App Router |
| [TypeScript](https://typescriptlang.org) | 5      | Tipagem estática               |
| [Tailwind CSS](https://tailwindcss.com)  | 4      | Estilização utility-first      |
| [React](https://react.dev)               | 19     | Biblioteca de UI               |

### Autenticação

| Tecnologia                 | Função                                                                                                                                            |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Clerk](https://clerk.com) | Login, registro, proteção de rotas e sessões. Middleware protege todas as rotas `/dashboard/*`. Componentes prontos de UI para sign-in e sign-up. |

### Interface

| Tecnologia                                                | Função                                                                                                                                         |
| --------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| [shadcn/ui](https://ui.shadcn.com)                        | Componentes acessíveis baseados em Radix UI, copiados para o projeto — sem dependência de versão externa                                       |
| [React Icons](https://react-icons.github.io/react-icons)  | Ícones unificados de múltiplas bibliotecas (Font Awesome, Material, Heroicons). Usar preferencialmente `Fa`, `Md` ou `Hi`                      |
| [next-themes](https://github.com/pacocoursey/next-themes) | Gerenciamento de tema claro/escuro via classe no HTML. Integra nativamente com as CSS variables do shadcn/ui e persiste preferência do usuário |

### Dados e Estado

| Tecnologia                              | Função                                                                                       |
| --------------------------------------- | -------------------------------------------------------------------------------------------- |
| [Zustand](https://zustand-demo.pmnd.rs) | Estado global leve: filtros de período, unidade selecionada, sidebar. Zero boilerplate       |
| [Zod](https://zod.dev)                  | Schemas de validação para todas as entidades mockadas. Gera tipos TypeScript via `z.infer`   |
| [date-fns](https://date-fns.org)        | Manipulação e formatação de datas. Funções puras e tree-shakeable — importar individualmente |

### Visualização

| Tecnologia                                   | Função                                                                       |
| -------------------------------------------- | ---------------------------------------------------------------------------- |
| [Recharts](https://recharts.org)             | Gráficos de linha, barras, pizza, área e compostos. Declarativo e responsivo |
| [TanStack Table](https://tanstack.com/table) | Tabelas headless com ordenação, filtragem e paginação. Core do BI            |

### Formulários

| Tecnologia                                     | Função                                                                              |
| ---------------------------------------------- | ----------------------------------------------------------------------------------- |
| [React Hook Form](https://react-hook-form.com) | Gerencia filtros e seletores de período. Integrado ao Zod via `@hookform/resolvers` |

### Qualidade de Código

| Tecnologia                                                                                            | Função                                                                       |
| ----------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| [ESLint](https://eslint.org)                                                                          | Lint com `eslint-config-next` e `eslint-config-prettier`                     |
| [Prettier](https://prettier.io)                                                                       | Formatação automática com `prettier-plugin-tailwindcss` para ordenar classes |
| [Husky](https://typicode.github.io/husky) + [lint-staged](https://github.com/lint-staged/lint-staged) | Hook pre-commit: roda ESLint + Prettier apenas nos arquivos staged           |

### Gerenciador de Pacotes

Este projeto usa **pnpm** como gerenciador oficial. Não commitar `package-lock.json` ou `yarn.lock`.

---

## Estrutura de Pastas

```
src/
├── app/
│   ├── (auth)/              # Rotas públicas: /sign-in, /sign-up
│   ├── (dashboard)/         # Rotas protegidas com layout compartilhado
│   │   ├── layout.tsx        # Sidebar + Header
│   │   ├── dashboard/        # Overview (KPIs e gráficos)
│   │   ├── dashboard/sales/  # Sales Analytics
│   │   ├── dashboard/products/ # Product Mix
│   │   ├── dashboard/operations/ # Operação e Pedidos
│   │   ├── dashboard/units/  # Unidades / Franquias
│   │   └── dashboard/insights/ # Insights e Tendências
│   ├── layout.tsx            # Root layout (ClerkProvider)
│   └── page.tsx              # Redireciona para /dashboard
├── components/
│   ├── ui/                  # Componentes shadcn/ui (gerados via CLI)
│   ├── layout/              # AppSidebar, DashboardHeader, Shell, PageContainer
│   ├── cards/               # KPICard, KPIGrid, TrendIndicator
│   ├── charts/              # Wrappers Recharts (Line, Bar, Pie, etc.)
│   ├── tables/              # Wrappers TanStack Table
│   └── filters/             # DateRangePicker, UnitSelector, CategoryFilter
├── lib/
│   ├── mock/                # Dados mockados e funções geradoras (seed fixo)
│   ├── schemas/             # Schemas Zod para todas as entidades
│   └── utils.ts             # cn(), formatação, helpers
├── stores/                  # Stores Zustand (sidebar, filtros globais)
├── hooks/                   # Custom hooks reutilizáveis
├── types/                   # Interfaces e tipos TypeScript globais
└── constants/               # Cores, labels, configurações
```

---

## Modelagem dos Dados

Todos os dados são mockados e gerados por funções com seeds fixos (resultados reproduzíveis). Cada entidade é validada por um schema Zod antes de ser usada.

| Entidade       | Descrição                      | Campos principais                          |
| -------------- | ------------------------------ | ------------------------------------------ |
| `Restaurant`   | Dados da rede/marca            | id, nome, logo                             |
| `Unit`         | Unidades individuais           | id, nome, cidade, estado, status           |
| `Category`     | Categorias do cardápio         | id, nome, ordem                            |
| `Product`      | Itens do cardápio              | id, nome, preço, categoriaId               |
| `Order`        | Pedidos realizados             | id, data, unitId, canal, status, total     |
| `OrderItem`    | Itens de um pedido             | id, orderId, productId, qtd, preço         |
| `DailySales`   | Vendas agregadas por dia       | data, unitId, receita, pedidos, ticket     |
| `ProductSales` | Vendas agregadas por produto   | productId, período, qtd, receita, %mix     |
| `UnitMetrics`  | KPIs por unidade               | unitId, período, receita, pedidos, ranking |
| `TimeSeries`   | Séries temporais para gráficos | data, métrica, valor                       |

**Volume simulado:** 5 unidades · 30+ produtos em 5–8 categorias · 90 dias de vendas · variações realistas com picos de fim de semana.

---

## Fluxo de Autenticação

```
Usuário acessa /
       ↓
Não autenticado → /sign-in (Clerk)
Autenticado     → /dashboard
       ↓
Middleware protege todas as rotas /dashboard/* e /settings
       ↓
UserButton no header: avatar + nome + logout
```

---

## Setup Local

**Pré-requisitos:** Node.js 20+, pnpm 9+

### 1. Clonar e instalar

```bash
git clone git@github.com:OBuskas/dining-board.git
cd dining-board
pnpm install
```

### 2. Configurar variáveis de ambiente

Crie um app em [dashboard.clerk.com](https://dashboard.clerk.com) e copie as chaves:

```bash
cp .env.local.example .env.local
```

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

### 3. Rodar

```bash
pnpm dev
```

Acesse [http://localhost:3000](http://localhost:3000).

---

## Scripts

```bash
pnpm dev      # Servidor de desenvolvimento
pnpm build    # Build de produção
pnpm start    # Servidor de produção
pnpm lint     # Rodar ESLint
```

---

## Rotas

| Rota                    | Descrição             | Acesso      |
| ----------------------- | --------------------- | ----------- |
| `/sign-in`              | Login                 | Pública     |
| `/sign-up`              | Registro              | Pública     |
| `/dashboard`            | Overview geral        | Autenticada |
| `/dashboard/sales`      | Sales Analytics       | Autenticada |
| `/dashboard/products`   | Product Mix           | Autenticada |
| `/dashboard/operations` | Operação e Pedidos    | Autenticada |
| `/dashboard/units`      | Unidades / Franquias  | Autenticada |
| `/dashboard/insights`   | Insights e Tendências | Autenticada |

---

## Evoluções Futuras (V2)

- **Backend real** — Node.js, Prisma, PostgreSQL
- **TanStack Query** — cache e fetching quando houver API
- **Exportação** — relatórios em PDF e CSV
- **Multitenancy** — perfis de admin, gerente e visualizador com Clerk Organizations
- **Integrações** — iFood, Rappi, sistemas de PDV
- **Insights com IA** — análise de padrões e recomendações automáticas
- **Testes** — Vitest + Playwright
