import { Link } from "@/app/navigation"
import { AuthForm } from "@/components/auth-form"

export default function Page() {
  return (
    <div className="container flex min-h-[70vh] flex-col items-center justify-center gap-6">
      <AuthForm mode="signin" />
      <p className="text-muted-foreground text-sm">
        New here?{" "}
        <Link href="/sign-up" className="underline">
          Create an account
        </Link>
      </p>
    </div>
  )
}
