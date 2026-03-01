import { Link } from "@/app/navigation"
import { AuthForm } from "@/components/auth-form"

export default function Page() {
  return (
    <div className="container flex min-h-[70vh] flex-col items-center justify-center gap-6">
      <AuthForm mode="signup" />
      <p className="text-muted-foreground text-sm">
        Already have an account?{" "}
        <Link href="/sign-in" className="underline">
          Sign in
        </Link>
      </p>
    </div>
  )
}
