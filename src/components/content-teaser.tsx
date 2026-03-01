"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2Icon } from "lucide-react"
import { usePathname } from "next/navigation"
import type { FC, PropsWithChildren } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { env } from "@/client"
import { authClient } from "@/lib/auth/client"
import { Button } from "./ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "./ui/form"
import { Input } from "./ui/input"

export interface ContentTeaserProps extends PropsWithChildren {}

const SSubscribe = z.object({
  email: z.email({
    message: "Please enter a valid email address",
  }),
  mode: z.literal("sign-up").or(z.literal("sign-in")).default("sign-up"),
})

type TSubscribeInput = z.input<typeof SSubscribe>
type TSubscribeOutput = z.output<typeof SSubscribe>

export const ContentTeaser: FC<ContentTeaserProps> = () => {
  const pathname = usePathname()
  const form = useForm<TSubscribeInput, unknown, TSubscribeOutput>({
    resolver: zodResolver(SSubscribe),
    defaultValues: {
      email: "",
      mode: "sign-up",
    },
  })

  const onSubmit = async (values: TSubscribeOutput) => {
    try {
      const callbackURL = new URL(pathname || "/", env.NEXT_PUBLIC_BASE_URL).toString()
      const response = await authClient.signIn.magicLink({
        email: values.email,
        callbackURL,
        newUserCallbackURL: callbackURL,
        fetchOptions: {
          body: { mode: values.mode === "sign-up" ? "signup" : "signin" },
        },
      })

      if (response.error) {
        throw new Error(response.error.message)
      }

      toast.success("Magic link sent. Check your inbox to continue.")
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to send magic link."
      toast.error(message)
    }
  }

  return (
    <Card className="my-12 flex flex-col items-center">
      <CardHeader>
        <CardTitle>
          {form.watch("mode") === "sign-up"
            ? "Subscribe to continue reading."
            : "Sign in to continue reading."}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {form.watch("mode") === "sign-up"
          ? "Become a free member to get access to all subscriber-only content."
          : "Enter your email to sign in and continue reading."}
      </CardContent>
      <CardFooter>
        <Form {...form}>
          <div className="flex flex-col items-center">
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-2 sm:flex-row">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input className="w-60" placeholder="" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">
                  {form.formState.isSubmitting ? (
                    <Loader2Icon className="mr-2 size-4 animate-spin" />
                  ) : null}
                  {form.watch("mode") === "sign-up" ? "Subscribe" : "Sign in"}
                </Button>
              </div>
            </form>
            <FormDescription className="pt-2">
              Already a reader?{" "}
              <Button
                className="p-0"
                onClick={(e) => {
                  e.preventDefault()
                  const value = form.watch("mode") === "sign-in" ? "sign-up" : "sign-in"
                  form.setValue("mode", value)
                }}
                variant="link"
              >
                {form.watch("mode") === "sign-in" ? "Sign up" : "Sign in"}
              </Button>
            </FormDescription>
          </div>
        </Form>
      </CardFooter>
    </Card>
  )
}

export default ContentTeaser
