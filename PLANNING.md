# Dining Board — Planning

## Status Atual

Todas as páginas de layout e navegação estão implementadas com componentes reais do shadcn/ui (base-nova) e placeholders para funcionalidades complexas (gráficos, tabelas, formulários com lógica).

---

## Páginas Implementadas

| Rota                    | Status    | Descrição                                                                 |
| ----------------------- | --------- | ------------------------------------------------------------------------- |
| `/`                     | ✅ Pronto | Redirect para `/dashboard`                                                |
| `/sign-in`              | ✅ Pronto | Card de login com placeholder de formulário                               |
| `/sign-up`              | ✅ Pronto | Card de registro com placeholder de formulário                            |
| `/dashboard`            | ✅ Pronto | Overview: 4 KPIs + 2 gráficos placeholder + 1 tabela placeholder          |
| `/dashboard/sales`      | ✅ Pronto | Sales Analytics: 3 KPIs + filtros + gráficos + tabela                     |
| `/dashboard/products`   | ✅ Pronto | Product Mix: 3 KPIs + filtro de categoria + gráficos + tabela             |
| `/dashboard/operations` | ✅ Pronto | Operações: 4 KPIs + gráficos + tabela                                     |
| `/dashboard/units`      | ✅ Pronto | Unidades: 3 KPIs + gráfico + tabela                                       |
| `/dashboard/insights`   | ✅ Pronto | Insights: 3 alertas + gráfico + 3 destaques                               |
| `/dashboard/profile`    | ✅ Pronto | Perfil: dados pessoais, segurança (senha/email/reset), notificações email |

---

## Componentes Compartilhados

| Componente  | Arquivo                          | Tipo   | Descrição                                                   |
| ----------- | -------------------------------- | ------ | ----------------------------------------------------------- |
| SidebarNav  | `src/components/sidebar-nav.tsx` | Client | Sidebar com collapse, active state, tooltips                |
| PageHeader  | `src/components/page-header.tsx` | Client | Header com título, placeholders de filtros, avatar dropdown |
| KpiCard     | `src/components/kpi-card.tsx`    | Server | Card de métrica com valor e badge de tendência              |
| Placeholder | `src/components/placeholder.tsx` | Server | Box tracejado para funcionalidades não implementadas        |

---

## Decisões Técnicas

### shadcn/ui base-nova (não default/new-york)

- Primitivos: `@base-ui/react` (NÃO Radix UI)
- Prop de composição: `render` (NÃO `asChild`)
- TooltipProvider: `delay` (NÃO `delayDuration`)
- Button com Link: requer `nativeButton={false}`
- DropdownMenuLabel: deve estar dentro de `<DropdownMenuGroup>`

### Fonte

- **Inter** via `next/font/google`, variável CSS `--font-inter`
- Aplicada globalmente via `--font-sans` no Tailwind

### Layout

- PageHeader renderizado em cada página (não no layout) para evitar prop drilling de título
- Server components por padrão; `'use client'` apenas quando necessário (useState, usePathname, interatividade)

### Estilo

- Tabs do Profile: fundo azul escuro (`bg-blue-950`), aba ativa azul (`bg-blue-600`)
- Toggles de notificação: azul claro (`bg-blue-100 text-blue-700`) quando habilitado, outline quando desabilitado
- Sem push notifications (projeto web-only, sem versão mobile)

---

## Próximos Passos

### Fase 2 — Dados Mockados

- [ ] Criar schemas Zod para entidades (Restaurant, Unit, Product, Order, etc.)
- [ ] Gerar dados mockados com seed fixo
- [ ] Substituir valores hardcoded dos KPIs por dados do mock

### Fase 3 — Visualizações

- [ ] Instalar Recharts
- [ ] Substituir placeholders de gráficos por gráficos reais (Line, Bar, Pie, Area, Donut)
- [ ] Instalar TanStack Table
- [ ] Substituir placeholders de tabelas por tabelas com ordenação e paginação

### Fase 4 — Interatividade

- [ ] Instalar React Hook Form + Zod resolvers
- [ ] Implementar DateRangePicker e UnitSelector reais
- [ ] Implementar filtros contextuais (CategoryFilter, etc.)
- [ ] Conectar filtros ao estado global (Zustand)

### Fase 5 — Autenticação

- [ ] Integrar Clerk (sign-in, sign-up, proteção de rotas)
- [ ] Substituir avatar hardcoded por dados do Clerk
- [ ] Implementar formulários reais de perfil (personal info, change password, change email)

### Fase 6 — Polimento

- [ ] Tema escuro (next-themes)
- [ ] Responsividade mobile (sidebar sheet)
- [ ] Loading states (skeletons)
- [ ] Testes (Vitest + Playwright)
