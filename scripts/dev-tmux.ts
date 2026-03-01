#!/usr/bin/env bun

import { execFileSync, spawnSync } from "node:child_process"
import { createHash } from "node:crypto"
import { dirname, isAbsolute, normalize, relative, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const SESSION_PREFIX = "felixvemmer-dev"
const LOG_LINES = "300"

interface SessionContext {
  repoRoot: string
  sessionName: string
  logFilePath: string
}

interface GitDirectoryInfo {
  gitDir: string
  gitCommonDir: string
}

function main() {
  const command = process.argv[2]
  if (!isCommand(command)) {
    console.error("❌  Unknown command.")
    console.error(
      "Usage: bun --bun ./scripts/dev-tmux.ts start|stop|stop-all|logs|logs-live|attach|list",
    )
    process.exit(1)
  }

  ensureTmuxAvailable()

  const scriptDir = dirname(fileURLToPath(import.meta.url))
  const repoRoot = resolve(scriptDir, "..")
  const context = resolveSessionContext(repoRoot)

  switch (command) {
    case "start":
      startDevSession(context)
      return
    case "stop":
      stopDevSession(context)
      return
    case "stop-all":
      stopAllDevSessions()
      return
    case "logs":
      showDevLogs(context)
      return
    case "logs-live":
      showDevLogsLive(context)
      return
    case "attach":
      attachDevSession(context)
      return
    case "list":
      listDevSessions(context.sessionName)
      return
  }
}

function isCommand(
  value: string | undefined,
): value is "start" | "stop" | "stop-all" | "logs" | "logs-live" | "attach" | "list" {
  return (
    value === "start" ||
    value === "stop" ||
    value === "stop-all" ||
    value === "logs" ||
    value === "logs-live" ||
    value === "attach" ||
    value === "list"
  )
}

function ensureTmuxAvailable() {
  const result = spawnSync("tmux", ["-V"], { stdio: "ignore" })
  if (result.error || result.status !== 0) {
    console.error("❌  tmux is not installed. Install with `brew install tmux` and try again.")
    process.exit(1)
  }
}

function resolveSessionContext(repoRoot: string): SessionContext {
  const gitDirectories = getGitDirectories(repoRoot)
  const commonDir = gitDirectories?.gitCommonDir ?? repoRoot
  const worktreeId = extractWorktreeId(gitDirectories) ?? "canonical"
  const sessionId = `${shortHash(commonDir)}-${toSafeToken(worktreeId)}`

  return {
    repoRoot,
    sessionName: `${SESSION_PREFIX}-${sessionId}`,
    logFilePath: resolve(repoRoot, `tmux-${sessionId}.log`),
  }
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

function extractWorktreeId(gitDirectories: GitDirectoryInfo | null): string | null {
  if (!gitDirectories) return null
  if (gitDirectories.gitDir === gitDirectories.gitCommonDir) return null

  const rel = relative(gitDirectories.gitCommonDir, gitDirectories.gitDir)
  const segments = rel.split(/[\\/]+/).filter(Boolean)
  if (segments.length >= 2 && segments[0] === "worktrees") {
    return segments[1] || null
  }

  return shortHash(gitDirectories.gitDir)
}

function shortHash(value: string): string {
  return createHash("sha256").update(value).digest("hex").slice(0, 8)
}

function toSafeToken(value: string): string {
  const safe = value.replace(/[^A-Za-z0-9_-]/g, "-")
  return safe.length > 0 ? safe : "unknown"
}

function hasSession(sessionName: string): boolean {
  const result = spawnSync("tmux", ["has-session", "-t", `=${sessionName}`], {
    stdio: "ignore",
  })
  return result.status === 0
}

function startDevSession(context: SessionContext) {
  if (hasSession(context.sessionName)) {
    console.log(`✅  Dev session already running: ${context.sessionName}`)
    return
  }

  const command = [
    "set -euo pipefail",
    `touch "${context.logFilePath}"`,
    `echo "[$(date '+%Y-%m-%d %H:%M:%S')] Starting dev session..." >> "${context.logFilePath}"`,
    `bun run env:ports >> "${context.logFilePath}" 2>&1`,
    `bun run dev 2>&1 | tee -a "${context.logFilePath}"`,
  ].join("; ")

  const result = spawnSync(
    "tmux",
    ["new-session", "-d", "-s", context.sessionName, "-c", context.repoRoot, `sh -lc '${command}'`],
    { stdio: "inherit" },
  )

  if (result.error || result.status !== 0) {
    console.error(
      `❌  Failed to start session: ${result.error?.message || `exit ${result.status}`}`,
    )
    process.exit(1)
  }

  console.log(`✅  Started dev session: ${context.sessionName}`)
  console.log(`ℹ️  Logs: ${context.logFilePath}`)
}

function stopDevSession(context: SessionContext) {
  if (!hasSession(context.sessionName)) {
    console.log(`ℹ️  Session not running: ${context.sessionName}`)
    return
  }

  const result = spawnSync("tmux", ["kill-session", "-t", context.sessionName], {
    stdio: "inherit",
  })
  if (result.error || result.status !== 0) {
    console.error(`❌  Failed to stop session: ${result.error?.message || `exit ${result.status}`}`)
    process.exit(1)
  }

  console.log(`✅  Stopped session: ${context.sessionName}`)
}

function listManagedSessions(): string[] {
  const result = spawnSync("tmux", ["list-sessions", "-F", "#{session_name}"], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"],
  })

  if (result.status !== 0) return []
  return result.stdout
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .filter((name) => name.startsWith(`${SESSION_PREFIX}-`))
}

function stopAllDevSessions() {
  const sessions = listManagedSessions()
  if (sessions.length === 0) {
    console.log("ℹ️  No dev sessions found.")
    return
  }

  for (const session of sessions) {
    spawnSync("tmux", ["kill-session", "-t", session], { stdio: "ignore" })
    console.log(`✅  Stopped: ${session}`)
  }
}

function showDevLogs(context: SessionContext) {
  const result = spawnSync("tail", ["-n", LOG_LINES, context.logFilePath], { stdio: "inherit" })
  if (result.error || result.status !== 0) {
    console.error("ℹ️  No log file yet. Start a session first.")
  }
}

function showDevLogsLive(context: SessionContext) {
  const result = spawnSync("tail", ["-n", LOG_LINES, "-f", context.logFilePath], {
    stdio: "inherit",
  })
  if (result.error || result.status !== 0) {
    console.error("ℹ️  No log file yet. Start a session first.")
  }
}

function attachDevSession(context: SessionContext) {
  if (!hasSession(context.sessionName)) {
    console.error("❌  Session not running. Start it with `bun run dev:session:start`.")
    process.exit(1)
  }
  spawnSync("tmux", ["attach-session", "-t", context.sessionName], { stdio: "inherit" })
}

function listDevSessions(currentSessionName: string) {
  const sessions = listManagedSessions()
  if (sessions.length === 0) {
    console.log("No dev sessions found.")
    return
  }

  for (const session of sessions) {
    const marker = session === currentSessionName ? "*" : " "
    console.log(`${marker} ${session}`)
  }
}

main()
