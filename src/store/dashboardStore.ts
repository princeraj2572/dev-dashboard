import { create } from 'zustand'

interface DashboardState {
  githubUsername: string
  leetcodeUsername: string
  theme: 'light' | 'dark'
  /** Minutes of coding per day the user is aiming for. */
  dailyTargetMinutes: number
  setDailyTargetMinutes: (minutes: number) => void
  setGithubUsername: (username: string) => void
  setLeetcodeUsername: (username: string) => void
  setTheme: (theme: 'light' | 'dark') => void
}

export const DEFAULT_DAILY_TARGET = 60
const clampTarget = (minutes: number) => Math.min(1440, Math.max(5, Math.round(minutes)))

const readTarget = () => {
  const stored = parseInt(localStorage.getItem('daily_target_minutes') ?? '', 10)
  return Number.isFinite(stored) ? clampTarget(stored) : DEFAULT_DAILY_TARGET
}

export const useDashboardStore = create<DashboardState>((set) => ({
  githubUsername: localStorage.getItem('github_username') || '',
  leetcodeUsername: localStorage.getItem('leetcode_username') || '',
  theme: (localStorage.getItem('theme') as 'light' | 'dark') || 'light',
  dailyTargetMinutes: readTarget(),

  setDailyTargetMinutes: (minutes) => {
    const value = clampTarget(minutes)
    localStorage.setItem('daily_target_minutes', String(value))
    set({ dailyTargetMinutes: value })
  },

  setGithubUsername: (username) => {
    localStorage.setItem('github_username', username)
    set({ githubUsername: username })
  },

  setLeetcodeUsername: (username) => {
    localStorage.setItem('leetcode_username', username)
    set({ leetcodeUsername: username })
  },

  setTheme: (theme) => {
    localStorage.setItem('theme', theme)
    set({ theme })
  },
}))
