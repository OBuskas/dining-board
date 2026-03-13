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

export default function SignUpPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Create an account to get started</CardDescription>
      </CardHeader>
      <CardContent>
        <Placeholder label="Registration Form: Name, Email & Password" height="h-52" />
      </CardContent>
      <CardFooter>
        <p className="text-muted-foreground text-sm">
          Already have an account?{' '}
          <Link
            href="/sign-in"
            className="text-primary hover:text-primary/80 underline underline-offset-4"
          >
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
