#!/usr/bin/env bun

import { execFileSync } from "node:child_process"
import { createHash } from "node:crypto"
import { dirname, isAbsolute, normalize, relative, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const MANAGED_BASE_PORTS = {
  next: 3000,
  drizzle: 4983,
} as const

type ManagedPortKey = keyof typeof MANAGED_BASE_PORTS

interface GitDirectoryInfo {
  gitDir: string
  gitCommonDir: string
}

function main() {
  const input = process.argv[2]
  if (!input) {
    console.error("Usage: bun --bun ./scripts/port.ts <next|drizzle|basePort>")
    process.exit(1)
  }

  const basePort = resolveBasePort(input)
  const resolved = resolveManagedPort(basePort)
  console.log(resolved)
}

function resolveBasePort(input: string): number {
  if (isManagedPortKey(input)) {
    return MANAGED_BASE_PORTS[input]
  }

  const parsed = Number.parseInt(input, 10)
  if (Number.isNaN(parsed) || parsed <= 0 || parsed > 65535) {
    throw new Error(`Invalid port input: ${input}`)
  }

  return parsed
}

function isManagedPortKey(value: string): value is ManagedPortKey {
  return value in MANAGED_BASE_PORTS
}

export function resolveManagedPort(basePort: number): number {
  const scriptDir = dirname(fileURLToPath(import.meta.url))
  const offset = resolveWorktreePortOffset(resolve(scriptDir, ".."))
  const port = basePort + offset

  if (port > 65535) {
    throw new Error(`Resolved port out of range (${port}) for base port ${basePort}`)
  }

  return port
}

function resolveWorktreePortOffset(repoRoot: string): number {
  const gitDirectories = getGitDirectories(repoRoot)
  if (!gitDirectories) return 0
  if (gitDirectories.gitDir === gitDirectories.gitCommonDir) return 0

  const rel = relative(gitDirectories.gitCommonDir, gitDirectories.gitDir)
  const segments = rel.split(/[\\/]+/).filter(Boolean)
  const worktreeId = segments.length >= 2 && segments[0] === "worktrees" ? segments[1] || rel : rel

  const hash = createHash("sha256").update(worktreeId).digest("hex").slice(0, 8)
  const numeric = Number.parseInt(hash, 16)
  const maxOffset = 2000
  return (numeric % maxOffset) + 1
}

function getGitDirectories(repoRoot: string): GitDirectoryInfo | null {
  try {
    const output = execFileSync("git", ["rev-parse", "--git-dir", "--git-common-dir"], {
      cwd: repoRoot,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    })
    const lines = output
      .trim()
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean)

    if (lines.length < 2) return null

    return {
      gitDir: toAbsolutePath(repoRoot, lines[0]),
      gitCommonDir: toAbsolutePath(repoRoot, lines[1]),
    }
  } catch {
    return null
  }
}

function toAbsolutePath(repoRoot: string, value: string): string {
  const absolute = isAbsolute(value) ? value : resolve(repoRoot, value)
  return normalize(absolute)
}

const isMainModule =
  typeof process.argv[1] === "string" && resolve(process.argv[1]) === fileURLToPath(import.meta.url)

if (isMainModule) {
  main()
}
