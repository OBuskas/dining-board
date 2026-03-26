import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface ChartCardProps {
  title: string
  children: React.ReactNode
  className?: string
  isEmpty?: boolean
}

export function ChartCard({ title, children, className, isEmpty }: ChartCardProps) {
  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {isEmpty ? (
          <div className="flex h-64 items-center justify-center">
            <p className="text-muted-foreground text-sm">No data available.</p>
          </div>
        ) : (
          children
        )}
      </CardContent>
    </Card>
  )
}
