'use client'

import Link from 'next/link'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Placeholder } from '@/components/placeholder'

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

        <DropdownMenu>
          <DropdownMenuTrigger className="cursor-pointer rounded-full outline-none">
            <Avatar>
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" sideOffset={8}>
            <DropdownMenuGroup>
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">John Doe</span>
                  <span className="text-muted-foreground text-xs">john@restaurant.com</span>
                </div>
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem render={<Link href="/dashboard/profile" />}>Profile</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" render={<Link href="/sign-in" />}>
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
