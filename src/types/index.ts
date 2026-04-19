// GitHub
export interface GithubStats {
  totalCommitsThisWeek: number
  commitsPerDay: { day: string; count: number }[]
  totalPRs: number
  languageBreakdown: { language: string; percentage: number }[]
  topRepos: { name: string; stars: number; commits: number }[]
}

// LeetCode
export interface LeetCodeStats {
  totalSolved: number
  easySolved: number
  mediumSolved: number
  hardSolved: number
  acceptanceRate: number
  ranking: number
}

// Goals
export interface Goal {
  id: string
  title: string
  target: number
  current: number
  unit: string
  deadline: string
}

// Coding Session
export interface CodingSession {
  id: string
  start: number
  end: number
  duration: number
}
