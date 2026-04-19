import { create } from 'zustand'

interface DashboardState {
  githubUsername: string
  leetcodeUsername: string
  theme: 'light' | 'dark'
  setGithubUsername: (username: string) => void
  setLeetcodeUsername: (username: string) => void
  setTheme: (theme: 'light' | 'dark') => void
}

export const useDashboardStore = create<DashboardState>((set) => ({
  githubUsername: localStorage.getItem('github_username') || '',
  leetcodeUsername: localStorage.getItem('leetcode_username') || '',
  theme: (localStorage.getItem('theme') as 'light' | 'dark') || 'light',

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
