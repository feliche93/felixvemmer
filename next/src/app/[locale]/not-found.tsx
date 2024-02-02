import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold">404 Not Found</h1>
      <p className="text-lg text-muted-foreground mt-4">
        The page you are looking for does not exist.
      </p>
      <Link href={'/'} className={cn(buttonVariants({ variant: 'default' }), 'mt-8')}>
        Return to Homepage
      </Link>
    </div>
  )
}
