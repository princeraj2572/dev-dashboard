import type { CodingSession, Goal, GoalSource } from '@/types'

/** Everything DevDash keeps in this browser, in a file the user can save and restore. */
export interface BackupFile {
  app: 'devdash'
  version: 1
  exportedAt: string
  data: {
    goals: Goal[]
    sessions: CodingSession[]
    settings: {
      githubUsername: string
      leetcodeUsername: string
      theme: 'light' | 'dark'
      dailyTargetMinutes: number
    }
  }
}

export type ParseResult =
  | { ok: true; backup: BackupFile }
  | { ok: false; error: string }

const MAX_BYTES = 5 * 1024 * 1024
const USERNAME = /^[\w-]{0,64}$/
const SOURCES: GoalSource[] = ['manual', 'leetcode', 'commits', 'hours']

const readJson = <T>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

const isNumber = (v: unknown): v is number => typeof v === 'number' && Number.isFinite(v)
const isObject = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v)

export const createBackup = (): BackupFile => {
  const timer = readJson<{ sessions?: CodingSession[] }>('codingTimerState', {})
  const target = parseInt(localStorage.getItem('daily_target_minutes') ?? '', 10)
  return {
    app: 'devdash',
    version: 1,
    exportedAt: new Date().toISOString(),
    data: {
      goals: readJson<Goal[]>('goals', []),
      sessions: Array.isArray(timer.sessions) ? timer.sessions : [],
      settings: {
        githubUsername: localStorage.getItem('github_username') ?? '',
        leetcodeUsername: localStorage.getItem('leetcode_username') ?? '',
        theme: localStorage.getItem('theme') === 'dark' ? 'dark' : 'light',
        dailyTargetMinutes: Number.isFinite(target) ? target : 60,
      },
    },
  }
}

/** Starts a browser download of the current data. */
export const downloadBackup = () => {
  const backup = createBackup()
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `devdash-backup-${backup.exportedAt.slice(0, 10)}.json`
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
  return backup
}

/**
 * Checks a backup file field by field and rebuilds it from only the known,
 * validated fields, so nothing unexpected reaches localStorage.
 */
export const parseBackup = (text: string): ParseResult => {
  if (text.length > MAX_BYTES) return { ok: false, error: 'That file is too large to be a DevDash backup.' }

  let raw: unknown
  try {
    raw = JSON.parse(text)
  } catch {
    return { ok: false, error: 'That file is not valid JSON.' }
  }

  if (!isObject(raw) || raw.app !== 'devdash') return { ok: false, error: 'That file is not a DevDash backup.' }
  if (raw.version !== 1) return { ok: false, error: 'This backup was made by a newer version of DevDash.' }
  if (!isObject(raw.data)) return { ok: false, error: 'The backup has no data section.' }

  const { goals: rawGoals, sessions: rawSessions, settings: rawSettings } = raw.data

  if (!Array.isArray(rawGoals)) return { ok: false, error: 'The backup has no list of goals.' }
  const goals: Goal[] = []
  for (const [i, g] of rawGoals.entries()) {
    const label = `Goal ${i + 1}`
    if (!isObject(g)) return { ok: false, error: `${label} is not valid.` }
    if (typeof g.id !== 'string' || !g.id) return { ok: false, error: `${label} has no id.` }
    if (typeof g.title !== 'string' || !g.title.trim() || g.title.length > 200)
      return { ok: false, error: `${label} has no valid title.` }
    if (!isNumber(g.target) || g.target <= 0) return { ok: false, error: `${label} has no valid target.` }
    if (!isNumber(g.current) || g.current < 0) return { ok: false, error: `${label} has no valid progress.` }
    if (typeof g.unit !== 'string' || g.unit.length > 40) return { ok: false, error: `${label} has no valid unit.` }
    if (typeof g.deadline !== 'string' || Number.isNaN(new Date(g.deadline).getTime()))
      return { ok: false, error: `${label} has no valid deadline.` }
    if (g.source !== undefined && !SOURCES.includes(g.source as GoalSource))
      return { ok: false, error: `${label} has an unknown source.` }

    goals.push({
      id: g.id,
      title: g.title,
      target: g.target,
      current: g.current,
      unit: g.unit,
      deadline: g.deadline,
      ...(g.source !== undefined ? { source: g.source as GoalSource } : {}),
      ...(isNumber(g.baseline) ? { baseline: g.baseline } : {}),
      ...(isNumber(g.createdAt) ? { createdAt: g.createdAt } : {}),
    })
  }

  if (!Array.isArray(rawSessions)) return { ok: false, error: 'The backup has no list of sessions.' }
  const sessions: CodingSession[] = []
  for (const [i, s] of rawSessions.entries()) {
    if (
      !isObject(s) ||
      typeof s.id !== 'string' ||
      !isNumber(s.start) ||
      !isNumber(s.end) ||
      !isNumber(s.duration) ||
      s.duration < 0
    ) {
      return { ok: false, error: `Session ${i + 1} is not valid.` }
    }
    sessions.push({ id: s.id, start: s.start, end: s.end, duration: s.duration })
  }

  if (!isObject(rawSettings)) return { ok: false, error: 'The backup has no settings.' }
  const { githubUsername, leetcodeUsername, theme, dailyTargetMinutes } = rawSettings
  if (typeof githubUsername !== 'string' || !USERNAME.test(githubUsername))
    return { ok: false, error: 'The GitHub username in the backup is not valid.' }
  if (typeof leetcodeUsername !== 'string' || !USERNAME.test(leetcodeUsername))
    return { ok: false, error: 'The LeetCode username in the backup is not valid.' }
  if (theme !== 'light' && theme !== 'dark') return { ok: false, error: 'The theme in the backup is not valid.' }
  if (!isNumber(dailyTargetMinutes) || dailyTargetMinutes < 5 || dailyTargetMinutes > 1440)
    return { ok: false, error: 'The daily target in the backup is not valid.' }

  return {
    ok: true,
    backup: {
      app: 'devdash',
      version: 1,
      exportedAt: typeof raw.exportedAt === 'string' ? raw.exportedAt : '',
      data: { goals, sessions, settings: { githubUsername, leetcodeUsername, theme, dailyTargetMinutes } },
    },
  }
}

/** Replaces the stored goals, sessions and settings. The caller should reload the page afterwards. */
export const applyBackup = (backup: BackupFile) => {
  const { goals, sessions, settings } = backup.data
  localStorage.setItem('goals', JSON.stringify(goals))
  // A restored timer is always stopped, so an old "running" state cannot resume by itself.
  localStorage.setItem(
    'codingTimerState',
    JSON.stringify({ isRunning: false, startedAt: null, accumulated: 0, sessions })
  )
  localStorage.setItem('github_username', settings.githubUsername)
  localStorage.setItem('leetcode_username', settings.leetcodeUsername)
  localStorage.setItem('theme', settings.theme)
  localStorage.setItem('daily_target_minutes', String(Math.round(settings.dailyTargetMinutes)))
}
