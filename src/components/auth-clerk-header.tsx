import { Link } from '@/app/navigation'
import { UserButton } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'
import { unstable_noStore } from 'next/cache'
import type { FC } from 'react'
import { buttonVariants } from './ui/button'

export type AuthClerkHeaderProps = {}
export const AuthClerkHeader: FC<AuthClerkHeaderProps> = async () => {
  unstable_noStore() // opt out before we even get to the try/catch

  const { userId } = await auth()

  return (
    <>
      {userId ? (
        <div className="ml-2 flex flex-row gap-4">
          {/* <OrganizationSwitcher
afterSelectOrganizationUrl={(organization) => {
  if (organization) {
    return `/${organization.slug}/profile`
  }
  return '/'
}}
/> */}
          <UserButton afterSignOutUrl="/sign-in" />
        </div>
      ) : (
        <Link
          href="/sign-in"
          className={buttonVariants({
            variant: 'default',
            className: 'ml-2',
          })}
        >
          Sign In
        </Link>
      )}
    </>
  )
}
