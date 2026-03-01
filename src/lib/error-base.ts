// Source: https://engineering.udacity.com/handling-errors-like-a-pro-in-typescript-d7a314ad4991
export class ErrorBase<T extends string> extends Error {
  name: T
  message: string
  cause: unknown

  constructor({ name, message, cause }: { name: T; message: string; cause?: unknown }) {
    super()
    this.name = name
    this.message = message
    this.cause = cause
  }
}
