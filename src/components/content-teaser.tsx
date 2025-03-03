'use client'

import { useSignIn, useSignUp } from '@clerk/nextjs'
import type { EmailCodeFactor } from '@clerk/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2Icon } from 'lucide-react'
import type { FC, PropsWithChildren } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button } from './ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from './ui/input-otp'

export interface ContentTeaserProps extends PropsWithChildren {}

const SSubscribe = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address',
  }),
  pendingVerification: z.boolean().optional(),
  code: z.string().optional(),
  mode: z.literal('sign-up').or(z.literal('sign-in')).default('sign-up'),
})

export type TSubscribe = z.infer<typeof SSubscribe>

export const ContentTeaser: FC<ContentTeaserProps> = () => {
  const { isLoaded: isLoadedSignUp, signUp, setActive } = useSignUp()
  const { signIn } = useSignIn()

  const form = useForm<TSubscribe>({
    resolver: zodResolver(SSubscribe),
    defaultValues: {
      email: '',
      pendingVerification: false,
      code: '',
      mode: 'sign-up',
    },
  })

  async function onSubmit(values: TSubscribe) {
    if (!isLoadedSignUp) {
      return
    }

    if (values.mode === 'sign-up') {
      try {
        await signUp.create({
          emailAddress: values.email,
        })

        await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

        form.setValue('pendingVerification', true)
        toast.success('Please enter the verification code which was sent to your email.')
      } catch (err: any) {
        const message = err?.errors[0]?.message || 'There was an error subscribing.'
        toast.error(message)
        console.error(JSON.stringify(err, null, 2))
      }
    } else {
      if (!signIn) return

      try {
        const si = await signIn.create({ identifier: values.email })

        const firstFactor = si.supportedFirstFactors?.find(
          (ff) => ff.strategy === 'email_code' && ff.safeIdentifier === values.email,
        ) as EmailCodeFactor

        if (!firstFactor) {
          throw new Error('Email code authentication is not supported')
        }

        await si.prepareFirstFactor({
          emailAddressId: firstFactor.emailAddressId,
          strategy: firstFactor.strategy,
        })

        form.setValue('pendingVerification', true)
      } catch (err: any) {
        const message = err?.errors[0]?.message || 'There was an error signing in.'
        toast.error(message)
        console.error(JSON.stringify(err, null, 2))
      }
    }
  }

  const onVerify = async (values: TSubscribe) => {
    if (!isLoadedSignUp) {
      return
    }

    if (!values.code) {
      toast.error('Please enter the verification code sent to your email.')
      return
    }

    if (form.watch('mode') === 'sign-up') {
      try {
        const completeSignUp = await signUp.attemptEmailAddressVerification({
          code: values.code,
        })
        if (completeSignUp.status !== 'complete') {
          /*  investigate the response, to see if there was an error
          or if the user needs to complete more steps.*/
          console.log(JSON.stringify(completeSignUp, null, 2))
        }
        if (completeSignUp.status === 'complete') {
          await setActive({ session: completeSignUp.createdSessionId })

          return
        }
      } catch (err: any) {
        const message = err?.errors[0]?.message || 'There was an error verifying your email code.'
        toast.error(message)
        console.error(JSON.stringify(err, null, 2))
        return
      }
    } else {
      if (!signIn) return

      if (!values.code) {
        form.setError('code', {
          message: 'Please enter the verification code sent to your email.',
        })
        return
      }

      try {
        // Use the code provided by the user and attempt verification
        const completeSignIn = await signIn.attemptFirstFactor({
          strategy: 'email_code',
          code: values.code,
        })

        // This mainly for debuggin while developing.
        // Once your Instance is setup this should not be required.
        if (completeSignIn.status !== 'complete') {
          console.error(JSON.stringify(completeSignIn, null, 2))
          return
        }

        // If verification was completed, create a session for the user
        if (completeSignIn.status === 'complete') {
          await setActive({ session: completeSignIn.createdSessionId })

          return
        }
      } catch (err: any) {
        const message = err?.errors[0]?.message || 'There was an error verifying your email code.'
        toast.error(message)
        console.error(JSON.stringify(err, null, 2))
        return
      }
    }
  }

  if (form.watch('pendingVerification')) {
    return (
      <>
        {/* <pre>
          {JSON.stringify(
            {
              errors: form.formState.errors,
              watch: form.watch(),
              showContentTeaser,
            },
            null,
            2,
          )}
        </pre>{' '} */}
        <Card className="my-12 flex flex-col items-center">
          <CardHeader>
            <CardTitle>Enter verification code</CardTitle>
          </CardHeader>
          <CardContent>Enter the verification code which was sent to your email.</CardContent>
          <CardFooter className="gap-0">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onVerify)}
                className="flex flex-col gap-2 sm:flex-row"
              >
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormControl>
                      <InputOTP {...field} maxLength={6}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                  )}
                />
                <Button type="submit">
                  {form.formState.isSubmitting ? (
                    <Loader2Icon className="mr-2 size-4 animate-spin" />
                  ) : null}
                  Verify
                </Button>
              </form>
            </Form>
          </CardFooter>
        </Card>
      </>
    )
  }

  return (
    <>
      {/* <pre>
        {JSON.stringify(
          {
            hello: 'world',
            isBot: isBot,
            errors: form.formState.errors,
            watch: form.watch(),
            pathname,
            showContentTeaser,
          },
          null,
          2,
        )}
      </pre> */}
      <Card className="my-12 flex flex-col items-center">
        <CardHeader>
          <CardTitle>
            {form.watch('mode') === 'sign-up'
              ? 'Subscribe to continue reading.'
              : 'Sign in to continue reading.'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {form.watch('mode') === 'sign-up'
            ? 'Become a free member to get access to all subscriber-only content.'
            : 'Enter your email to sign in and continue reading.'}
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
                    {form.watch('mode') === 'sign-up' ? 'Subscribe' : 'Sign in'}
                  </Button>
                </div>
              </form>
              <FormDescription className="pt-2">
                Already a reader?{' '}
                <Button
                  className="p-0"
                  onClick={(e) => {
                    e.preventDefault()
                    const value = form.watch('mode') === 'sign-in' ? 'sign-up' : 'sign-in'
                    form.setValue('mode', value)
                  }}
                  variant={'link'}
                >
                  {form.watch('mode') === 'sign-in' ? 'Sign up' : 'Sign in'}
                </Button>
              </FormDescription>
            </div>
          </Form>
        </CardFooter>
      </Card>
    </>
  )
}

export default ContentTeaser
