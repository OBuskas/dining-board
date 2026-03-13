import Link from 'next/link'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Placeholder } from '@/components/placeholder'

export default function SignInPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>Enter your credentials to access your dashboard</CardDescription>
      </CardHeader>
      <CardContent>
        <Placeholder label="Auth Form: Email & Password" height="h-52" />
      </CardContent>
      <CardFooter>
        <p className="text-muted-foreground text-sm">
          Don&apos;t have an account?{' '}
          <Link
            href="/sign-up"
            className="text-primary hover:text-primary/80 underline underline-offset-4"
          >
            Sign up
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
