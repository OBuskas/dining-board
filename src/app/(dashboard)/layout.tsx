import { SidebarNav } from '@/components/sidebar-nav'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="hidden md:block">
        <SidebarNav />
      </div>
      <main className="bg-background flex flex-1 flex-col overflow-y-auto">{children}</main>
    </div>
  )
}
