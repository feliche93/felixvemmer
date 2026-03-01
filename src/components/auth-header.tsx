"use client"

import { LogOutIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import type { FC } from "react"
import { Link } from "@/app/navigation"
import { signOut, useSession } from "@/lib/auth/client"
import { buttonVariants } from "./ui/button"

export type AuthHeaderProps = {}
export const AuthHeader: FC<AuthHeaderProps> = () => {
  const router = useRouter()
  const { data, isPending } = useSession()

  const handleSignOut = async () => {
    const result = await signOut()
    if (result.error) {
      return
    }

    router.refresh()
    router.push("/sign-in")
  }

  const userId = data?.user?.id

  return (
    <>
      {userId ? (
        <div className="ml-2 flex flex-row gap-4">
          <button
            type="button"
            disabled={isPending}
            className={buttonVariants({
              variant: "outline",
            })}
            onClick={() => void handleSignOut()}
          >
            <LogOutIcon className="mr-2 size-4" />
            Sign Out
          </button>
        </div>
      ) : (
        <Link
          href="/sign-in"
          className={buttonVariants({
            variant: "default",
            className: "ml-2",
          })}
        >
          Sign In
        </Link>
      )}
    </>
  )
}
