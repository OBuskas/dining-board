import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface KpiCardProps {
  title: string
  value: string
  trend: string
  trendDirection: 'up' | 'down' | 'neutral'
  className?: string
}

export function KpiCard({ title, value, trend, trendDirection, className }: KpiCardProps) {
  const arrow = trendDirection === 'up' ? '↑' : trendDirection === 'down' ? '↓' : '→'

  const badgeVariant =
    trendDirection === 'up' ? 'secondary' : trendDirection === 'down' ? 'destructive' : 'outline'

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle className="text-muted-foreground text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {trend && (
          <Badge
            variant={badgeVariant}
            className={cn('mt-2', trendDirection === 'up' && 'text-emerald-600')}
          >
            {arrow} {trend}
          </Badge>
        )}
      </CardContent>
    </Card>
  )
}
