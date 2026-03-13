import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)'])

export default clerkMiddleware(async (auth, request) => {
  // Se a rota é protegida, exige autenticação
  if (isProtectedRoute(request)) {
    await auth.protect()
  }
})
