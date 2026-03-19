import type { Product, ProductCategory } from '@/lib/schemas'
import { CATEGORY_COLORS } from '@/constants/colors'

export const categories: ProductCategory[] = [
  { id: 'cat-burgers', name: 'Burgers', color: CATEGORY_COLORS['cat-burgers'] },
  { id: 'cat-salads', name: 'Salads', color: CATEGORY_COLORS['cat-salads'] },
  { id: 'cat-drinks', name: 'Drinks', color: CATEGORY_COLORS['cat-drinks'] },
  { id: 'cat-desserts', name: 'Desserts', color: CATEGORY_COLORS['cat-desserts'] },
  { id: 'cat-sides', name: 'Sides', color: CATEGORY_COLORS['cat-sides'] },
  { id: 'cat-combos', name: 'Combos', color: CATEGORY_COLORS['cat-combos'] },
  { id: 'cat-breakfast', name: 'Breakfast', color: CATEGORY_COLORS['cat-breakfast'] },
  { id: 'cat-specials', name: 'Specials', color: CATEGORY_COLORS['cat-specials'] },
]

export const products: Product[] = [
  // Burgers (7)
  {
    id: 'prod-01',
    name: 'X-Burger Classic',
    categoryId: 'cat-burgers',
    price: 32.9,
    isActive: true,
  },
  { id: 'prod-02', name: 'X-Bacon', categoryId: 'cat-burgers', price: 36.9, isActive: true },
  { id: 'prod-03', name: 'X-Salada', categoryId: 'cat-burgers', price: 29.9, isActive: true },
  { id: 'prod-04', name: 'X-Tudo', categoryId: 'cat-burgers', price: 42.9, isActive: true },
  { id: 'prod-05', name: 'X-Frango', categoryId: 'cat-burgers', price: 31.9, isActive: true },
  { id: 'prod-06', name: 'Smash Burger', categoryId: 'cat-burgers', price: 34.9, isActive: true },
  { id: 'prod-07', name: 'X-Veggie', categoryId: 'cat-burgers', price: 33.9, isActive: true },

  // Saladas (5)
  { id: 'prod-08', name: 'Caesar Salad', categoryId: 'cat-salads', price: 28.9, isActive: true },
  {
    id: 'prod-09',
    name: 'Salad Bowl Premium',
    categoryId: 'cat-salads',
    price: 34.9,
    isActive: true,
  },
  { id: 'prod-10', name: 'Salada Tropical', categoryId: 'cat-salads', price: 26.9, isActive: true },
  { id: 'prod-11', name: 'Salada Grega', categoryId: 'cat-salads', price: 25.9, isActive: true },
  { id: 'prod-12', name: 'Caprese', categoryId: 'cat-salads', price: 27.9, isActive: true },

  // Bebidas (7)
  { id: 'prod-13', name: 'Coca-Cola', categoryId: 'cat-drinks', price: 8.9, isActive: true },
  { id: 'prod-14', name: 'Suco Natural', categoryId: 'cat-drinks', price: 12.9, isActive: true },
  { id: 'prod-15', name: 'Água Mineral', categoryId: 'cat-drinks', price: 5.9, isActive: true },
  { id: 'prod-16', name: 'Milkshake', categoryId: 'cat-drinks', price: 18.9, isActive: true },
  {
    id: 'prod-17',
    name: 'Cerveja Artesanal',
    categoryId: 'cat-drinks',
    price: 16.9,
    isActive: true,
  },
  { id: 'prod-18', name: 'Limonada', categoryId: 'cat-drinks', price: 10.9, isActive: true },
  { id: 'prod-19', name: 'Chá Gelado', categoryId: 'cat-drinks', price: 9.9, isActive: true },

  // Sobremesas (6)
  { id: 'prod-20', name: 'Brownie', categoryId: 'cat-desserts', price: 16.9, isActive: true },
  { id: 'prod-21', name: 'Pudim', categoryId: 'cat-desserts', price: 14.9, isActive: true },
  { id: 'prod-22', name: 'Açaí Bowl', categoryId: 'cat-desserts', price: 24.9, isActive: true },
  {
    id: 'prod-23',
    name: 'Sorvete Artesanal',
    categoryId: 'cat-desserts',
    price: 15.9,
    isActive: true,
  },
  { id: 'prod-24', name: 'Cheesecake', categoryId: 'cat-desserts', price: 19.9, isActive: true },
  { id: 'prod-25', name: 'Petit Gâteau', categoryId: 'cat-desserts', price: 22.9, isActive: true },

  // Acompanhamentos (6)
  { id: 'prod-26', name: 'Batata Frita', categoryId: 'cat-sides', price: 18.9, isActive: true },
  { id: 'prod-27', name: 'Onion Rings', categoryId: 'cat-sides', price: 20.9, isActive: true },
  { id: 'prod-28', name: 'Mandioca Frita', categoryId: 'cat-sides', price: 17.9, isActive: true },
  { id: 'prod-29', name: 'Nuggets', categoryId: 'cat-sides', price: 19.9, isActive: true },
  { id: 'prod-30', name: 'Pão de Alho', categoryId: 'cat-sides', price: 12.9, isActive: true },
  { id: 'prod-31', name: 'Coleslaw', categoryId: 'cat-sides', price: 11.9, isActive: true },

  // Combos (5)
  { id: 'prod-32', name: 'Combo Classic', categoryId: 'cat-combos', price: 49.9, isActive: true },
  { id: 'prod-33', name: 'Combo Premium', categoryId: 'cat-combos', price: 64.9, isActive: true },
  { id: 'prod-34', name: 'Combo Fitness', categoryId: 'cat-combos', price: 54.9, isActive: true },
  { id: 'prod-35', name: 'Combo Kids', categoryId: 'cat-combos', price: 34.9, isActive: true },
  { id: 'prod-36', name: 'Combo Duplo', categoryId: 'cat-combos', price: 79.9, isActive: true },

  // Café da Manhã (5)
  { id: 'prod-37', name: 'Pão na Chapa', categoryId: 'cat-breakfast', price: 8.9, isActive: true },
  { id: 'prod-38', name: 'Misto Quente', categoryId: 'cat-breakfast', price: 14.9, isActive: true },
  { id: 'prod-39', name: 'Omelete', categoryId: 'cat-breakfast', price: 19.9, isActive: true },
  { id: 'prod-40', name: 'Tapioca', categoryId: 'cat-breakfast', price: 16.9, isActive: true },
  {
    id: 'prod-41',
    name: 'Café da Manhã Completo',
    categoryId: 'cat-breakfast',
    price: 29.9,
    isActive: true,
  },

  // Especiais (6)
  { id: 'prod-42', name: 'Costela BBQ', categoryId: 'cat-specials', price: 69.9, isActive: true },
  {
    id: 'prod-43',
    name: 'Burger do Chef',
    categoryId: 'cat-specials',
    price: 54.9,
    isActive: true,
  },
  {
    id: 'prod-44',
    name: 'Prato Executivo',
    categoryId: 'cat-specials',
    price: 39.9,
    isActive: true,
  },
  {
    id: 'prod-45',
    name: 'Festival Burger',
    categoryId: 'cat-specials',
    price: 44.9,
    isActive: true,
  },
  { id: 'prod-46', name: 'Risoto do Dia', categoryId: 'cat-specials', price: 49.9, isActive: true },
  {
    id: 'prod-47',
    name: 'Filé à Parmegiana',
    categoryId: 'cat-specials',
    price: 59.9,
    isActive: true,
  },
]

// Probability weights for product selection (burgers & combos dominate)
// X-Burger Classic gets the highest individual weight to be top seller
export const productWeights: number[] = [
  // Burgers: 35% total, X-Burger Classic gets 8%
  0.08, 0.06, 0.05, 0.05, 0.04, 0.04, 0.03,
  // Saladas: 6%
  0.015, 0.015, 0.01, 0.01, 0.01,
  // Bebidas: 15% (high volume, low price)
  0.04, 0.025, 0.03, 0.02, 0.015, 0.01, 0.01,
  // Sobremesas: 8%
  0.015, 0.015, 0.015, 0.01, 0.015, 0.01,
  // Acompanhamentos: 12%
  0.035, 0.02, 0.02, 0.02, 0.015, 0.01,
  // Combos: 14%
  0.04, 0.03, 0.03, 0.02, 0.02,
  // Café da Manhã: 5%
  0.012, 0.01, 0.01, 0.01, 0.008,
  // Especiais: 5%
  0.012, 0.01, 0.01, 0.008, 0.005, 0.005,
]
