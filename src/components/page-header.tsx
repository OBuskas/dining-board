'use client'

import { DateRangePicker } from '@/components/filters/date-range-picker'
import { UnitSelector } from '@/components/filters/unit-selector'
import { MobileNav } from '@/components/mobile-nav'
import { ThemeToggle } from '@/components/theme-toggle'
import { UserButton } from '@clerk/nextjs'
import { HiOutlineUser } from 'react-icons/hi2'

interface PageHeaderProps {
  title: string
}

export function PageHeader({ title }: PageHeaderProps) {
  return (
    <header className="bg-card flex min-h-14 shrink-0 flex-wrap items-center gap-2 border-b px-4 py-2 md:px-6">
      <MobileNav />
      <h1 className="text-xl font-semibold md:mr-auto">{title}</h1>

      <div className="flex w-full items-center gap-2 sm:w-auto sm:gap-3">
        <DateRangePicker />
        <UnitSelector />
        <ThemeToggle />
        <UserButton
          appearance={{
            elements: {
              avatarBox: 'ring-2 ring-border hover:ring-primary transition-all',
            },
          }}
        >
          <UserButton.MenuItems>
            <UserButton.Link
              label="Profile"
              labelIcon={<HiOutlineUser className="size-4" />}
              href="/dashboard/profile"
            />
          </UserButton.MenuItems>
        </UserButton>
      </div>
    </header>
  )
}
