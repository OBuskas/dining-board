import { cn } from '@/lib/utils'

interface PlaceholderProps {
  label: string
  height?: string
  className?: string
}

export function Placeholder({ label, height = 'h-64', className }: PlaceholderProps) {
  return (
    <div
      className={cn(
        'bg-muted text-muted-foreground flex w-full items-center justify-center rounded-lg border border-dashed text-sm font-medium',
        height,
        className
      )}
    >
      [{label}]
    </div>
  )
}
