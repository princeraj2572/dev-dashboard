import axios from 'axios'

const GITHUB_API_BASE = 'https://api.github.com'

interface GithubEvent {
  type: string
  created_at: string
  actor: { login: string }
  repo: { name: string }
  payload: {
    commits?: { message: string }[]
    pull_request?: { title: string }
    ref?: string
  }
}

interface GithubRepo {
  name: string
  stargazers_count: number
  language: string | null
}

export const fetchUserEvents = async (username: string, token: string) => {
  try {
    const response = await axios.get<GithubEvent[]>(
      `${GITHUB_API_BASE}/users/${username}/events`,
      {
        headers: { Authorization: `Bearer ${token}` },
        params: { per_page: 100 },
      }
    )
    return response.data
  } catch (error) {
    console.error('GitHub events fetch failed:', error)
    return null
  }
}

export const fetchUserRepos = async (username: string, token: string) => {
  try {
    const response = await axios.get<GithubRepo[]>(
      `${GITHUB_API_BASE}/users/${username}/repos`,
      {
        headers: { Authorization: `Bearer ${token}` },
        params: { per_page: 100, sort: 'stars', direction: 'desc' },
      }
    )
    return response.data
  } catch (error) {
    console.error('GitHub repos fetch failed:', error)
    return null
  }
}

export const calculateGithubStats = (events: GithubEvent[] | null, repos: GithubRepo[] | null) => {
  if (!events) {
    return {
      totalCommitsThisWeek: 0,
      commitsPerDay: [],
      totalPRs: 0,
      languageBreakdown: [],
      topRepos: [],
    }
  }

  // Get commits from this week
  const weekAgo = new Date()
  weekAgo.setDate(weekAgo.getDate() - 7)

  const commitEvents = events.filter(
    (e) => e.type === 'PushEvent' && new Date(e.created_at) > weekAgo
  )

  let totalCommits = 0
  const commitsPerDay: Record<string, number> = {}

  commitEvents.forEach((event) => {
    const date = new Date(event.created_at).toLocaleDateString()
    const commits = event.payload.commits?.length || 0
    totalCommits += commits
    commitsPerDay[date] = (commitsPerDay[date] || 0) + commits
  })

  // Get PRs
  const totalPRs = events.filter((e) => e.type === 'PullRequestEvent').length

  // Language breakdown
  const languageCounts: Record<string, number> = {}
  if (repos) {
    repos.forEach((repo) => {
      if (repo.language) {
        languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1
      }
    })
  }

  const totalRepos = Object.values(languageCounts).reduce((a, b) => a + b, 0)
  const languageBreakdown = Object.entries(languageCounts)
    .map(([language, count]) => ({
      language,
      percentage: totalRepos > 0 ? (count / totalRepos) * 100 : 0,
    }))
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 5)

  // Top repos
  const topRepos = (repos || [])
    .slice(0, 5)
    .map((repo) => ({
      name: repo.name,
      stars: repo.stargazers_count,
      commits: 0, // Would require additional API calls
    }))

  return {
    totalCommitsThisWeek: totalCommits,
    commitsPerDay: Object.entries(commitsPerDay)
      .map(([day, count]) => ({ day, count }))
      .reverse()
      .slice(-7),
    totalPRs,
    languageBreakdown,
    topRepos,
  }
}
