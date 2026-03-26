'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi2'
import { cn } from '@/lib/utils'
import { NAV_ITEMS } from '@/constants/nav-items'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

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
          'bg-sidebar flex h-full flex-col transition-all duration-200',
          collapsed ? 'w-20' : 'w-64'
        )}
      >
        {/* Logo */}
        <div className="flex h-14 items-center gap-2 px-5">
          <div className="bg-sidebar-primary text-sidebar-primary-foreground flex size-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold">
            DB
          </div>
          {!collapsed && (
            <span className="text-sidebar-foreground text-base font-semibold">Dining Board</span>
          )}
        </div>

        <Separator className="bg-sidebar-border" />

        {/* Navigation */}
        <nav className="mt-4 flex flex-1 flex-col gap-1 px-3">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href, item.exact)
            const Icon = item.icon

            const linkClasses = cn(
              'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
              active
                ? 'border-l-[3px] border-sidebar-primary bg-sidebar-accent text-sidebar-foreground'
                : 'border-l-[3px] border-transparent text-sidebar-foreground/60 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
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
            className="text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground w-full"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
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
