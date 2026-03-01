"use client"

import { passkeyClient } from "@better-auth/passkey/client"
import { magicLinkClient } from "better-auth/client/plugins"
import { createAuthClient } from "better-auth/react"
import { env } from "@/client"

export const authClient = createAuthClient({
  baseURL: env.NEXT_PUBLIC_BASE_URL,
  basePath: "/api/auth",
  plugins: [magicLinkClient(), passkeyClient()],
})

const resetPostHog = async () => {
  try {
    const posthog = (await import("posthog-js")).default
    posthog.reset()
  } catch (error) {
    console.error("Failed to reset PostHog after sign out", error)
  }
}

export const signOut = async (...args: Parameters<typeof authClient.signOut>) => {
  const result = await authClient.signOut(...args)

  const hasError =
    typeof result === "object" && result !== null && "error" in result && Boolean(result.error)

  if (!hasError) {
    await resetPostHog()
  }

  return result
}

export const { signIn, signUp, useSession, getSession } = authClient
