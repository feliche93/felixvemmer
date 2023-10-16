'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { navigationConfig } from '@/config/navigation'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'
import Image from 'next/image'

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <Image
          src={'/logos/felix-vemmer.png'}
          priority={true}
          width={40}
          height={40}
          alt="Felix Vemmer"
        />
        <span className="hidden font-bold sm:inline-block">{siteConfig.name}</span>
      </Link>
      <nav className="flex items-center space-x-6 text-sm font-medium">
        {navigationConfig.mainNav.map((item) => {
          if (item.external || !item.href) return null

          return (
            <Link
              key={item.title}
              href={item.href}
              className={cn(
                'transition-colors hover:text-foreground/80',
                pathname === item.href ? 'text-foreground' : 'text-foreground/60',
              )}
            >
              {item.title}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
