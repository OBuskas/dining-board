# Dining Board

Analytical Business Intelligence dashboard for restaurants and franchises. Centralizes operational and financial metrics in a professional interface with KPIs, comparative charts, analytical tables, and contextual filters.

> Study project with 100% mocked data. No real backend in this version.

---

## Overview

In most restaurants, sales, orders, products, and unit performance data are scattered across different systems or spreadsheets. Dining Board consolidates everything in one place, enabling managers to make data-driven decisions.

**Problem it solves:** fragmentation of operational and financial information in restaurant chains and franchises.

**Technical focus:** demonstrate proficiency in building analytical dashboards with modern technologies from the React ecosystem.

---

## Features

| Page                    | Description                                                                       | Status    |
| ----------------------- | --------------------------------------------------------------------------------- | --------- |
| **Dashboard Overview**  | Main KPIs, revenue, orders, average ticket, and growth vs previous period         | Essential |
| **Sales Analytics**     | Revenue by period, comparisons between units, franchise ranking, and trend charts | Essential |
| **Product Mix**         | Product share in revenue, top items, revenue by category, and composition charts  | Essential |
| **Operations & Orders** | Peak hours, distribution by channel, cancellation rate, and recent orders         | Optional  |
| **Units / Franchises**  | Performance comparison between units, ranking, and highlight identification       | Optional  |
| **Insights & Trends**   | Growth trends, metric alerts, and automatic highlights                            | Optional  |
| **Profile**             | Profile settings: personal data, security (password/email), email notifications   | Essential |

### KPIs and Metrics

**Financial:** Total revenue · Average ticket · Revenue by category · Growth vs previous period · Revenue by unit · Revenue by product

**Sales & Products:** Total orders · Daily sales · Product Mix (%) · Top 10 items · Items per order (average)

**Operational:** Peak hours · Distribution by channel (dine-in / delivery / takeout) · Cancellation rate · Performance by unit

---

## Tech Stack

### Core

| Technology                               | Version | Purpose                         |
| ---------------------------------------- | ------- | ------------------------------- |
| [Next.js](https://nextjs.org)            | 16      | React framework with App Router |
| [TypeScript](https://typescriptlang.org) | 5       | Static typing                   |
| [Tailwind CSS](https://tailwindcss.com)  | 4       | Utility-first styling           |
| [React](https://react.dev)               | 19      | UI library                      |

### Authentication

| Technology                 | Purpose                                                                                                                                               |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Clerk](https://clerk.com) | Login, registration, route protection, and sessions. Middleware protects all `/dashboard/*` routes. Ready-made UI components for sign-in and sign-up. |

### Interface

| Technology                                                | Purpose                                                                                                                   |
| --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| [shadcn/ui](https://ui.shadcn.com) (base-nova)            | Accessible components based on `@base-ui/react` (not Radix UI), copied into the project — no external version dependency  |
| [React Icons](https://react-icons.github.io/react-icons)  | Unified icons from multiple libraries (Font Awesome, Material, Heroicons). Preferably use `Fa`, `Md`, or `Hi`             |
| [Inter](https://rsms.me/inter)                            | Professional sans-serif font, loaded via `next/font/google`. Standard in SaaS dashboards                                  |
| [next-themes](https://github.com/pacocoursey/next-themes) | Light/dark theme management via HTML class. Natively integrates with shadcn/ui CSS variables and persists user preference |

### Data & State

| Technology                              | Purpose                                                                                   |
| --------------------------------------- | ----------------------------------------------------------------------------------------- |
| [Zustand](https://zustand-demo.pmnd.rs) | Lightweight global state: period filters, selected unit, sidebar. Zero boilerplate        |
| [Zod](https://zod.dev)                  | Validation schemas for all mocked entities. Generates TypeScript types via `z.infer`      |
| [date-fns](https://date-fns.org)        | Date manipulation and formatting. Pure and tree-shakeable functions — import individually |

### Visualization

| Technology                                   | Purpose                                                                 |
| -------------------------------------------- | ----------------------------------------------------------------------- |
| [Recharts](https://recharts.org)             | Line, bar, pie, area, and composite charts. Declarative and responsive  |
| [TanStack Table](https://tanstack.com/table) | Headless tables with sorting, filtering, and pagination. Core of the BI |

### Forms

| Technology                                     | Purpose                                                                             |
| ---------------------------------------------- | ----------------------------------------------------------------------------------- |
| [React Hook Form](https://react-hook-form.com) | Manages filters and period selectors. Integrated with Zod via `@hookform/resolvers` |

### Code Quality

| Technology                                                                                            | Purpose                                                              |
| ----------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| [ESLint](https://eslint.org)                                                                          | Linting with `eslint-config-next` and `eslint-config-prettier`       |
| [Prettier](https://prettier.io)                                                                       | Auto-formatting with `prettier-plugin-tailwindcss` for class sorting |
| [Husky](https://typicode.github.io/husky) + [lint-staged](https://github.com/lint-staged/lint-staged) | Pre-commit hook: runs ESLint + Prettier only on staged files         |

### Package Manager

This project uses **pnpm** as the official package manager. Do not commit `package-lock.json` or `yarn.lock`.

---

## Folder Structure

```
src/
├── app/
│   ├── (auth)/              # Public routes: /sign-in, /sign-up
│   ├── (dashboard)/         # Protected routes with shared layout
│   │   ├── layout.tsx        # Sidebar + Header
│   │   ├── dashboard/        # Overview (KPIs and charts)
│   │   ├── dashboard/sales/  # Sales Analytics
│   │   ├── dashboard/products/ # Product Mix
│   │   ├── dashboard/operations/ # Operations & Orders
│   │   ├── dashboard/units/  # Units / Franchises
│   │   ├── dashboard/insights/ # Insights & Trends
│   │   └── dashboard/profile/ # User Profile
│   ├── layout.tsx            # Root layout (ClerkProvider)
│   └── page.tsx              # Redirects to /dashboard
├── components/
│   ├── ui/                  # shadcn/ui components (generated via CLI)
│   ├── layout/              # AppSidebar, DashboardHeader, Shell, PageContainer
│   ├── cards/               # KPICard, KPIGrid, TrendIndicator
│   ├── charts/              # Recharts wrappers (Line, Bar, Pie, etc.)
│   ├── tables/              # TanStack Table wrappers
│   └── filters/             # DateRangePicker, UnitSelector, CategoryFilter
├── lib/
│   ├── mock/                # Mocked data and generator functions (fixed seed)
│   ├── schemas/             # Zod schemas for all entities
│   └── utils.ts             # cn(), formatting, helpers
├── stores/                  # Zustand stores (sidebar, global filters)
├── hooks/                   # Reusable custom hooks
├── types/                   # Global TypeScript interfaces and types
└── constants/               # Colors, labels, configurations
```

---

## Data Modeling

All data is mocked and generated by functions with fixed seeds (reproducible results). Each entity is validated by a Zod schema before use.

| Entity         | Description              | Main Fields                              |
| -------------- | ------------------------ | ---------------------------------------- |
| `Restaurant`   | Chain/brand data         | id, name, logo                           |
| `Unit`         | Individual units         | id, name, city, state, status            |
| `Category`     | Menu categories          | id, name, order                          |
| `Product`      | Menu items               | id, name, price, categoryId              |
| `Order`        | Placed orders            | id, date, unitId, channel, status, total |
| `OrderItem`    | Items within an order    | id, orderId, productId, qty, price       |
| `DailySales`   | Daily aggregated sales   | date, unitId, revenue, orders, ticket    |
| `ProductSales` | Product aggregated sales | productId, period, qty, revenue, %mix    |
| `UnitMetrics`  | KPIs per unit            | unitId, period, revenue, orders, ranking |
| `TimeSeries`   | Time series for charts   | date, metric, value                      |

**Simulated volume:** 5 units · 30+ products across 5–8 categories · 90 days of sales · realistic variations with weekend peaks.

---

## Authentication Flow

```
User accesses /
       ↓
Not authenticated → /sign-in (Clerk)
Authenticated     → /dashboard
       ↓
Middleware protects all /dashboard/* and /settings routes
       ↓
UserButton in header: avatar + name + logout
```

---

## Local Setup

**Prerequisites:** Node.js 20+, pnpm 9+

### 1. Clone and install

```bash
git clone git@github.com:OBuskas/dining-board.git
cd dining-board
pnpm install
```

### 2. Configure environment variables


### 3. Run

```bash
pnpm dev
```

Go to [http://localhost:3000](http://localhost:3000).

---

## Scripts

```bash
pnpm dev      # Development server
pnpm build    # Production build
pnpm start    # Production server
pnpm lint     # Run ESLint
```

---

## Routes

| Route                   | Description         | Access        |
| ----------------------- | ------------------- | ------------- |
| `/sign-in`              | Login               | Public        |
| `/sign-up`              | Registration        | Public        |
| `/dashboard`            | General overview    | Authenticated |
| `/dashboard/sales`      | Sales Analytics     | Authenticated |
| `/dashboard/products`   | Product Mix         | Authenticated |
| `/dashboard/operations` | Operations & Orders | Authenticated |
| `/dashboard/units`      | Units / Franchises  | Authenticated |
| `/dashboard/insights`   | Insights & Trends   | Authenticated |
| `/dashboard/profile`    | User Profile        | Authenticated |

---

## Future Improvements (V2)

- **Real backend** — Node.js, Prisma, PostgreSQL
- **TanStack Query** — caching and fetching when an API is available
- **Export** — reports in PDF and CSV
- **Multitenancy** — admin, manager, and viewer profiles with Clerk Organizations
- **Integrations** — iFood, Rappi, POS systems
- **AI-powered insights** — pattern analysis and automatic recommendations
- **Testing** — Vitest + Playwright
