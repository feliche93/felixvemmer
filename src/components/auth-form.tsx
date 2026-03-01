"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { FingerprintIcon, Loader2Icon } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { env } from "@/client"
import { Icons } from "@/components/icons"
import { authClient } from "@/lib/auth/client"
import { isPasskeyCancelled } from "@/lib/auth/passkey-utils"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"

const SSignIn = z.object({
  email: z.email("Please enter a valid email address"),
})

const SSignUp = SSignIn.extend({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
})

type TMode = "signin" | "signup"

interface AuthFormProps {
  mode: TMode
}

type SignInFormValues = z.infer<typeof SSignIn>
type SignUpFormValues = z.infer<typeof SSignUp>

export function AuthForm({ mode }: AuthFormProps) {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [isPasskeyLoading, setIsPasskeyLoading] = useState(false)
  const searchParams = useSearchParams()
  const returnUrl = searchParams.get("returnUrl") || "/"
  const callbackURL = new URL(returnUrl, env.NEXT_PUBLIC_BASE_URL).toString()

  const signInForm = useForm<SignInFormValues>({
    resolver: zodResolver(SSignIn),
    defaultValues: { email: searchParams.get("email") || "" },
  })

  const signUpForm = useForm<SignUpFormValues>({
    resolver: zodResolver(SSignUp),
    defaultValues: {
      email: searchParams.get("email") || "",
      firstName: "",
      lastName: "",
    },
  })

  const handleGoogleAuth = async () => {
    try {
      setIsGoogleLoading(true)
      await authClient.signIn.social({
        provider: "google",
        callbackURL,
        newUserCallbackURL: callbackURL,
      })
    } catch (error) {
      setIsGoogleLoading(false)
      const message = error instanceof Error ? error.message : "Google sign in failed."
      toast.error(message)
    }
  }

  const handlePasskeyAuth = async () => {
    try {
      setIsPasskeyLoading(true)
      const response = await authClient.signIn.passkey({
        fetchOptions: {
          onSuccess: () => {
            window.location.href = callbackURL
          },
        },
      })

      if (response.error) {
        if (isPasskeyCancelled(response.error)) return
        throw new Error(response.error.message || "Failed to sign in with passkey")
      }

      if (response.data) {
        window.location.href = callbackURL
      }
    } catch (error) {
      if (isPasskeyCancelled(error)) return
      const message = error instanceof Error ? error.message : "Passkey sign in failed."
      toast.error(message)
    } finally {
      setIsPasskeyLoading(false)
    }
  }

  const onSignInSubmit = async (values: SignInFormValues) => {
    const result = await authClient.signIn.magicLink({
      email: values.email,
      callbackURL,
      newUserCallbackURL: callbackURL,
      fetchOptions: {
        body: { mode: "signin" },
      },
    })

    if (result.error) {
      toast.error(result.error.message)
      return
    }

    toast.success("Magic link sent. Check your inbox.")
  }

  const onSignUpSubmit = async (values: SignUpFormValues) => {
    const result = await authClient.signIn.magicLink({
      email: values.email,
      name: `${values.firstName.trim()} ${values.lastName.trim()}`,
      callbackURL,
      newUserCallbackURL: callbackURL,
      fetchOptions: {
        body: { mode: "signup" },
      },
    })

    if (result.error) {
      toast.error(result.error.message)
      return
    }

    toast.success("Magic link sent. Check your inbox.")
  }

  const isSignup = mode === "signup"
  const title = isSignup ? "Create your account" : "Sign in to your account"
  const description = isSignup
    ? "Use magic link, Google, or a passkey."
    : "Welcome back. Continue with your preferred method."

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={() => void handleGoogleAuth()}
          disabled={isGoogleLoading}
        >
          {isGoogleLoading ? (
            <Loader2Icon className="mr-2 size-4 animate-spin" />
          ) : (
            <Icons.google />
          )}
          Continue with Google
        </Button>

        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={() => void handlePasskeyAuth()}
          disabled={isPasskeyLoading}
        >
          {isPasskeyLoading ? (
            <Loader2Icon className="mr-2 size-4 animate-spin" />
          ) : (
            <FingerprintIcon className="mr-2 size-4" />
          )}
          Continue with Passkey
        </Button>

        <div className="text-center text-muted-foreground text-sm">or continue with email</div>

        {isSignup ? (
          <form onSubmit={signUpForm.handleSubmit(onSignUpSubmit)} className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <Input placeholder="First name" {...signUpForm.register("firstName")} />
              <Input placeholder="Last name" {...signUpForm.register("lastName")} />
            </div>
            <Input type="email" placeholder="Email address" {...signUpForm.register("email")} />
            <Button type="submit" className="w-full" disabled={signUpForm.formState.isSubmitting}>
              {signUpForm.formState.isSubmitting ? (
                <Loader2Icon className="mr-2 size-4 animate-spin" />
              ) : null}
              Send magic link
            </Button>
          </form>
        ) : (
          <form onSubmit={signInForm.handleSubmit(onSignInSubmit)} className="space-y-3">
            <Input type="email" placeholder="Email address" {...signInForm.register("email")} />
            <Button type="submit" className="w-full" disabled={signInForm.formState.isSubmitting}>
              {signInForm.formState.isSubmitting ? (
                <Loader2Icon className="mr-2 size-4 animate-spin" />
              ) : null}
              Send magic link
            </Button>
          </form>
        )}
      </CardContent>
      <CardFooter className="justify-center text-muted-foreground text-xs">
        By continuing, you agree to secure authentication via better-auth.
      </CardFooter>
    </Card>
  )
}
