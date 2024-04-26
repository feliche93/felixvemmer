import { Link } from '@/app/navigation'
import { UserButton } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'
import { unstable_noStore } from 'next/cache'
import { FC } from 'react'
import { buttonVariants } from './ui/button'

export interface AuthClerkHeaderProps {}
export const AuthClerkHeader: FC<AuthClerkHeaderProps> = () => {
  unstable_noStore() // opt out before we even get to the try/catch

  const { userId } = auth()

  return (
    <>
      {userId ? (
        <div className="flex flex-row gap-4 ml-2">
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
