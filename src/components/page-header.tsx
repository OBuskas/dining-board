'use client'

import { Placeholder } from '@/components/placeholder'
import { UserButton } from '@clerk/nextjs'

interface PageHeaderProps {
  title: string
}

export function PageHeader({ title }: PageHeaderProps) {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b bg-white px-6">
      <h1 className="text-xl font-semibold">{title}</h1>

      <div className="flex items-center gap-3">
        <Placeholder label="Date Range Picker" height="h-9" className="w-44 text-xs" />
        <Placeholder label="Unit Selector" height="h-9" className="w-40 text-xs" />

        <UserButton />
      </div>
    </header>
  )
}
