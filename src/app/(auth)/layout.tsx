export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white">
            DB
          </div>
          <h1 className="text-2xl font-bold">Dining Board</h1>
          <p className="text-muted-foreground mt-1 text-sm">Analytics for your restaurant chain</p>
        </div>
        {children}
      </div>
    </div>
  )
}
