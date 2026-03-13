'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  HiOutlineSquares2X2,
  HiOutlineBanknotes,
  HiOutlineShoppingBag,
  HiOutlineCog6Tooth,
  HiOutlineBuildingStorefront,
  HiOutlineLightBulb,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
} from 'react-icons/hi2'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: HiOutlineSquares2X2, exact: true },
  { label: 'Sales Analytics', href: '/dashboard/sales', icon: HiOutlineBanknotes, exact: false },
  { label: 'Product Mix', href: '/dashboard/products', icon: HiOutlineShoppingBag, exact: false },
  { label: 'Operations', href: '/dashboard/operations', icon: HiOutlineCog6Tooth, exact: false },
  {
    label: 'Units',
    href: '/dashboard/units',
    icon: HiOutlineBuildingStorefront,
    exact: false,
  },
  { label: 'Insights', href: '/dashboard/insights', icon: HiOutlineLightBulb, exact: false },
]

export function SidebarNav() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  function isActive(href: string, exact: boolean) {
    if (exact) return pathname === href
    return pathname.startsWith(href)
  }

  return (
    <TooltipProvider delay={0}>
      <aside
        className={cn(
          'flex h-full flex-col bg-[#0f172a] transition-all duration-200',
          collapsed ? 'w-20' : 'w-64'
        )}
      >
        {/* Logo */}
        <div className="flex h-14 items-center gap-2 px-5">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white">
            DB
          </div>
          {!collapsed && <span className="text-base font-semibold text-white">Dining Board</span>}
        </div>

        <Separator className="bg-white/10" />

        {/* Navigation */}
        <nav className="mt-4 flex flex-1 flex-col gap-1 px-3">
          {navItems.map((item) => {
            const active = isActive(item.href, item.exact)
            const Icon = item.icon

            const linkClasses = cn(
              'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
              active
                ? 'border-l-[3px] border-blue-500 bg-white/10 text-white'
                : 'border-l-[3px] border-transparent text-slate-400 hover:bg-white/5 hover:text-slate-200'
            )

            if (collapsed) {
              return (
                <Tooltip key={item.href}>
                  <TooltipTrigger render={<Link href={item.href} className={linkClasses} />}>
                    <Icon className="size-5 shrink-0" />
                  </TooltipTrigger>
                  <TooltipContent side="right">{item.label}</TooltipContent>
                </Tooltip>
              )
            }

            return (
              <Link key={item.href} href={item.href} className={linkClasses}>
                <Icon className="size-5 shrink-0" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Collapse toggle */}
        <div className="p-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="w-full text-slate-400 hover:bg-white/10 hover:text-white"
          >
            {collapsed ? (
              <HiOutlineChevronRight className="size-5" />
            ) : (
              <HiOutlineChevronLeft className="size-5" />
            )}
          </Button>
        </div>
      </aside>
    </TooltipProvider>
  )
}
