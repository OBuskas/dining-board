import {
  HiOutlineSquares2X2,
  HiOutlineBanknotes,
  HiOutlineShoppingBag,
  HiOutlineCog6Tooth,
  HiOutlineBuildingStorefront,
  HiOutlineLightBulb,
} from 'react-icons/hi2'

export const NAV_ITEMS = [
  { label: 'Dashboard', href: '/dashboard', icon: HiOutlineSquares2X2, exact: true },
  { label: 'Sales Analytics', href: '/dashboard/sales', icon: HiOutlineBanknotes, exact: false },
  { label: 'Product Mix', href: '/dashboard/products', icon: HiOutlineShoppingBag, exact: false },
  { label: 'Operations', href: '/dashboard/operations', icon: HiOutlineCog6Tooth, exact: false },
  { label: 'Units', href: '/dashboard/units', icon: HiOutlineBuildingStorefront, exact: false },
  { label: 'Insights', href: '/dashboard/insights', icon: HiOutlineLightBulb, exact: false },
] as const
