import { SidebarNav } from '@/components/sidebar-nav'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarNav />
      <main className="flex flex-1 flex-col overflow-y-auto bg-zinc-50">{children}</main>
    </div>
  )
}
