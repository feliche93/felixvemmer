#!/usr/bin/env bun

import { spawn, spawnSync } from "node:child_process"
import { createConnection } from "node:net"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const target = process.argv[2]
const printOnly = process.argv.includes("--print")

if (!target || (target !== "next" && target !== "drizzle_studio")) {
  console.error("Usage: bun --bun ./scripts/open-local-dev-link.ts <next|drizzle_studio> [--print]")
  process.exit(1)
}

const scriptDir = dirname(fileURLToPath(import.meta.url))
const repoRoot = resolve(scriptDir, "..")

function resolvePort(basePort: number): number {
  const portScript = resolve(repoRoot, "scripts/port.ts")
  const result = spawnSync("bun", [portScript, String(basePort)], {
    cwd: repoRoot,
    stdio: ["ignore", "pipe", "pipe"],
    encoding: "utf8",
  })

  if (result.error) throw result.error
  if (result.status !== 0) {
    const message = result.stderr.trim() || result.stdout.trim() || "unknown error"
    throw new Error(`Failed to resolve port ${basePort}: ${message}`)
  }

  const value = Number(result.stdout.trim())
  if (!Number.isFinite(value)) {
    throw new Error(`Invalid port value: ${result.stdout.trim()}`)
  }

  return value
}

async function resolveNextPort(): Promise<number> {
  const configured = resolvePort(3000)
  if (await isLocalPortListening(configured)) return configured
  for (const fallback of [configured + 1, configured + 2]) {
    if (await isLocalPortListening(fallback)) return fallback
  }
  return configured
}

function resolveDrizzlePort(): number {
  return resolvePort(4983)
}

function isLocalPortListening(port: number): Promise<boolean> {
  return new Promise((resolvePromise) => {
    const socket = createConnection({ host: "127.0.0.1", port })
    let settled = false

    const done = (value: boolean) => {
      if (settled) return
      settled = true
      socket.destroy()
      resolvePromise(value)
    }

    socket.setTimeout(600)
    socket.once("connect", () => done(true))
    socket.once("timeout", () => done(false))
    socket.once("error", () => done(false))
  })
}

function getOpener(): { cmd: string; args: string[] } | null {
  if (process.platform === "darwin") {
    return { cmd: "open", args: [] }
  }
  if (process.platform === "linux") {
    return { cmd: "xdg-open", args: [] }
  }
  if (process.platform === "win32") {
    return { cmd: "cmd", args: ["/c", "start", ""] }
  }
  return null
}

async function main() {
  const url =
    target === "next"
      ? `http://localhost:${await resolveNextPort()}`
      : `https://local.drizzle.studio/?host=127.0.0.1&port=${resolveDrizzlePort()}`

  if (printOnly) {
    console.log(url)
    return
  }

  const opener = getOpener()
  if (!opener) {
    console.log(url)
    return
  }

  const child = spawn(opener.cmd, [...opener.args, url], {
    detached: true,
    stdio: "ignore",
  })
  child.unref()
  console.log(url)
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error)
  console.error(`❌  ${message}`)
  process.exit(1)
})
