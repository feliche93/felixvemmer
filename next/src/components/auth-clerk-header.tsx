import { Link } from '@/app/navigation'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { FC } from 'react'
import { buttonVariants } from './ui/button'

export interface AuthClerkHeaderProps {}
export const AuthClerkHeader: FC<AuthClerkHeaderProps> = () => {
  return (
    <>
      <SignedOut>
        <Link
          href="/sign-in"
          className={buttonVariants({
            variant: 'default',
            className: 'ml-2',
          })}
        >
          Sign In
        </Link>
      </SignedOut>
      <SignedIn>
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
      </SignedIn>
    </>
  )
}
