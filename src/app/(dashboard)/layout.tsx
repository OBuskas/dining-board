import { SidebarNav } from '@/components/sidebar-nav'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="hidden shrink-0 md:block">
        <SidebarNav />
      </div>
      <main className="bg-background flex min-h-0 flex-1 flex-col overflow-y-auto">{children}</main>
    </div>
  )
}
