const PASSKEY_CANCEL_ERROR_CODES = new Set(["ERROR_CEREMONY_ABORTED", "AUTH_CANCELLED"])
const PASSKEY_CANCEL_ERROR_NAMES = new Set(["NotAllowedError", "AbortError"])
const PASSKEY_CANCEL_MESSAGE_PARTS = ["timed out", "not allowed", "cancel", "aborted"] as const

interface PasskeyErrorLike {
  code?: unknown
  message?: unknown
  name?: unknown
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null
}

function getPasskeyErrorLike(value: unknown): PasskeyErrorLike | null {
  return isRecord(value) ? value : null
}

function includesPasskeyCancellationMessage(value: unknown): boolean {
  if (typeof value !== "string") return false

  const message = value.toLowerCase()
  return PASSKEY_CANCEL_MESSAGE_PARTS.some((part) => message.includes(part))
}

export function isPasskeyCancelled(error: unknown): boolean {
  if (!error) return false

  const errorLike = getPasskeyErrorLike(error)
  if (
    errorLike &&
    typeof errorLike.code === "string" &&
    PASSKEY_CANCEL_ERROR_CODES.has(errorLike.code)
  ) {
    return true
  }

  if (typeof DOMException !== "undefined" && error instanceof DOMException) {
    return PASSKEY_CANCEL_ERROR_NAMES.has(error.name)
  }

  if (error instanceof Error) {
    if (PASSKEY_CANCEL_ERROR_NAMES.has(error.name)) return true
    return includesPasskeyCancellationMessage(error.message)
  }

  if (includesPasskeyCancellationMessage(error)) return true
  return includesPasskeyCancellationMessage(errorLike?.message)
}
