import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="flex h-full flex-col items-center pt-32">
      <SignIn signUpUrl="/sign-up" />
    </div>
  )
}
