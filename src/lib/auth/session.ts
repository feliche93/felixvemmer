import { headers } from "next/headers"
import { auth } from "./index"

export async function getAuthSession() {
  return auth.api.getSession({
    headers: await headers(),
  })
}
