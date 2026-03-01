import { customAlphabet } from "nanoid"

const nanoid = customAlphabet("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz")

const prefixes = {
  account: "acct",
  passkey: "pass",
  session: "sess",
  user: "user",
  verification: "ver",
} as const

export type AuthModelPrefix = keyof typeof prefixes

export function newId(prefix: AuthModelPrefix): string {
  return [prefixes[prefix], nanoid(12)].join("_")
}

export function generateAuthModelId(model: string): string | false {
  switch (model) {
    case "user":
      return newId("user")
    case "account":
      return newId("account")
    case "session":
      return newId("session")
    case "verification":
      return newId("verification")
    case "passkey":
      return newId("passkey")
    default:
      return false
  }
}
