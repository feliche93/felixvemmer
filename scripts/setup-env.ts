#!/usr/bin/env bun

import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import { resolveManagedPort } from "./port"

const COMMANDS = ["ports"] as const
type Command = (typeof COMMANDS)[number]

function main() {
  const command = process.argv[2]
  if (!isCommand(command)) {
    throw new Error(`Usage: bun --bun ./scripts/setup-env.ts <${COMMANDS.join(" | ")}>`)
  }

  if (command === "ports") {
    printPortSummary()
  }
}

function isCommand(value: string | undefined): value is Command {
  return value === "ports"
}

function printPortSummary() {
  const scriptDir = dirname(fileURLToPath(import.meta.url))
  const repoRoot = resolve(scriptDir, "..")
  const port = resolveManagedPort(3000)
  const drizzlePort = resolveManagedPort(4983)

  console.log("")
  console.log("Port Setup")
  console.log("----------")
  console.log(`Directory: ${repoRoot}`)
  console.log("")
  console.log("Local Dev Services")
  console.log("------------------")
  console.log(`Next.js          http://localhost:${port}`)
  console.log(`Drizzle Studio   https://local.drizzle.studio/?host=127.0.0.1&port=${drizzlePort}`)
  console.log("")
  console.log(`Runtime vars: PORT=${port}, DRIZZLE_STUDIO_PORT=${drizzlePort}`)
  console.log("Note: no local env file is written; ports resolve dynamically per worktree.")
  console.log("")
}

main()
