import type { Unit } from '@/lib/schemas'

export const units: Unit[] = [
  {
    id: 'unit-sp-centro',
    name: 'Centro',
    city: 'São Paulo',
    state: 'SP',
    isActive: true,
    createdAt: new Date('2023-03-15'),
  },
  {
    id: 'unit-sp-jardins',
    name: 'Jardins',
    city: 'São Paulo',
    state: 'SP',
    isActive: true,
    createdAt: new Date('2023-06-01'),
  },
  {
    id: 'unit-rj-copacabana',
    name: 'Copacabana',
    city: 'Rio de Janeiro',
    state: 'RJ',
    isActive: true,
    createdAt: new Date('2024-01-10'),
  },
  {
    id: 'unit-bh',
    name: 'Belo Horizonte',
    city: 'Belo Horizonte',
    state: 'MG',
    isActive: true,
    createdAt: new Date('2024-05-20'),
  },
  {
    id: 'unit-cwb',
    name: 'Curitiba',
    city: 'Curitiba',
    state: 'PR',
    isActive: true,
    createdAt: new Date('2025-08-01'),
  },
]

export const unitWeights = [0.22, 0.25, 0.2, 0.18, 0.15]
