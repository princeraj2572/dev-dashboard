import { createApiClient, validateCredentials, callApi } from './apiClient'
import { dedupedRequest } from './requestDedup'
import type { ActivityItem, GithubStats } from '@/types'

const GITHUB_API_BASE = 'https://api.github.com'
const githubClient = createApiClient({
  maxRetries: 3,
  retryDelay: 1000,
  retryableStatuses: [408, 429, 503, 504],
})

export interface GithubEvent {
  id?: string
  type: string
  created_at: string
  actor: { login: string }
  repo: { name: string }
  payload: {
    // GitHub no longer sends `commits` on PushEvent; `head` and `before` are what remain.
    commits?: { message: string }[]
    head?: string
    before?: string
    ref?: string
    ref_type?: string
    action?: string
    number?: number
    pull_request?: { title: string; number?: number }
    issue?: { title: string; number: number }
  }
}

interface GithubRepo {
  name: string
  stargazers_count: number
  language: string | null
}

const authHeaders = (token?: string) => (token ? { Authorization: `Bearer ${token}` } : {})

export const fetchUserEvents = async (username: string, token?: string) => {
  const validation = validateCredentials(username, token)
  if (!validation.isValid) {
    console.error('GitHub validation failed:', validation.error)
    return null
  }

  return dedupedRequest(
    'GET',
    `${GITHUB_API_BASE}/users/${username}/events`,
    () =>
      callApi(
        () =>
          githubClient
            .get<GithubEvent[]>(`${GITHUB_API_BASE}/users/${username}/events`, {
              headers: authHeaders(token),
              params: { per_page: 100 },
              timeout: 10000,
            })
            .then((r) => r.data),
        'GitHub Events'
      ),
    { username }
  )
}

export const fetchUserRepos = async (username: string, token?: string) => {
  const validation = validateCredentials(username, token)
  if (!validation.isValid) {
    console.error('GitHub validation failed:', validation.error)
    return null
  }

  return callApi(
    () =>
      githubClient
        .get<GithubRepo[]>(`${GITHUB_API_BASE}/users/${username}/repos`, {
          headers: authHeaders(token),
          params: { per_page: 100, sort: 'stars', direction: 'desc' },
          timeout: 10000,
        })
        .then((r) => r.data),
    'GitHub Repos'
  )
}

/* ---------- Commit counts for pushes ---------- */

export interface PushDetail {
  count: number
  message: string | null
}
export type PushDetails = Record<string, PushDetail>

const PUSH_CACHE_KEY = 'github_push_details_v1'
const PUSH_CACHE_LIMIT = 400
const MAX_NEW_LOOKUPS = 20 // per load without a token, to stay within 60 anonymous requests an hour
const MAX_NEW_LOOKUPS_WITH_TOKEN = 60
const FEED_PUSHES = 10
const HEX_SHA = /^[0-9a-f]{7,40}$/
const ZERO_SHA = /^0+$/

const firstLine = (message: string) => message.split('\n')[0]

const readPushCache = (): PushDetails => {
  try {
    const parsed = JSON.parse(localStorage.getItem(PUSH_CACHE_KEY) || '{}')
    return parsed && typeof parsed === 'object' ? parsed : {}
  } catch {
    return {}
  }
}

const writePushCache = (cache: PushDetails) => {
  try {
    const keys = Object.keys(cache)
    const kept = keys.length > PUSH_CACHE_LIMIT ? keys.slice(-PUSH_CACHE_LIMIT) : keys
    localStorage.setItem(PUSH_CACHE_KEY, JSON.stringify(Object.fromEntries(kept.map((k) => [k, cache[k]]))))
  } catch {
    // Storage full or unavailable: counts will simply be looked up again next time.
  }
}

const lookupPush = async (event: GithubEvent, token?: string): Promise<PushDetail | null> => {
  const { head, before } = event.payload
  const repo = event.repo.name
  if (!head || !HEX_SHA.test(head)) return null
  const opts = { headers: authHeaders(token), timeout: 10000 }

  // A branch's first push has no "before" commit to compare against.
  if (!before || ZERO_SHA.test(before) || !HEX_SHA.test(before)) {
    const commit = await callApi(
      () =>
        githubClient
          .get<{ commit: { message: string } }>(`${GITHUB_API_BASE}/repos/${repo}/commits/${head}`, opts)
          .then((r) => r.data),
      'GitHub Commit'
    )
    return commit ? { count: 1, message: firstLine(commit.commit.message) } : null
  }

  const comparison = await callApi(
    () =>
      githubClient
        .get<{ total_commits: number; commits: { commit: { message: string } }[] }>(
          `${GITHUB_API_BASE}/repos/${repo}/compare/${before}...${head}`,
          opts
        )
        .then((r) => r.data),
    'GitHub Compare'
  )
  if (!comparison) return null
  const newest = comparison.commits[comparison.commits.length - 1]
  return { count: comparison.total_commits, message: newest ? firstLine(newest.commit.message) : null }
}

/**
 * Resolves each recent push to its commit count and message. A push never
 * changes once made, so results are cached for good and each load only asks
 * about pushes it has not seen (a capped number), keeping API use low.
 */
export const fetchPushDetails = async (events: GithubEvent[] | null, token?: string): Promise<PushDetails> => {
  if (!events) return {}

  const cache = readPushCache()
  const weekAgo = Date.now() - 7 * 86400000
  const pushes = events.filter((e) => e.type === 'PushEvent' && e.payload.head)
  const wanted = pushes.filter((e, i) => i < FEED_PUSHES || new Date(e.created_at).getTime() > weekAgo)
  const missing = wanted.filter((e) => !cache[e.payload.head as string]).slice(0, token ? MAX_NEW_LOOKUPS_WITH_TOKEN : MAX_NEW_LOOKUPS)

  for (let i = 0; i < missing.length; i += 5) {
    const batch = missing.slice(i, i + 5)
    const results = await Promise.all(batch.map((e) => lookupPush(e, token)))
    let failures = 0
    results.forEach((result, j) => {
      if (result) cache[batch[j].payload.head as string] = result
      else failures++
    })
    if (failures === batch.length) break // rate limited or offline: stop asking
  }

  writePushCache(cache)
  return cache
}

/* ---------- Stats and activity ---------- */

const repoShortName = (repo: string) => repo.split('/')[1] ?? repo

const buildActivity = (events: GithubEvent[], pushDetails: PushDetails): ActivityItem[] => {
  const items: ActivityItem[] = []

  for (const event of events.slice(0, 40)) {
    const { type, payload } = event
    const repo = event.repo.name
    const short = repoShortName(repo)
    const base = { id: event.id ?? `${type}-${event.created_at}`, repo, date: event.created_at }
    const repoUrl = `https://github.com/${repo}`

    if (type === 'PushEvent') {
      const detail = payload.head ? pushDetails[payload.head] : undefined
      const count = payload.commits?.length ?? detail?.count ?? 1
      const branch = payload.ref?.replace('refs/heads/', '') ?? 'a branch'
      items.push({
        ...base,
        kind: 'commit',
        title: detail?.message ?? `Pushed to ${branch}`,
        detail: `${count} ${count === 1 ? 'commit' : 'commits'} to ${short}`,
        url: payload.head ? `${repoUrl}/commit/${payload.head}` : repoUrl,
      })
    } else if (type === 'PullRequestEvent') {
      const number = payload.number ?? payload.pull_request?.number
      const action = payload.action ?? 'updated'
      items.push({
        ...base,
        kind: 'pull_request',
        title: payload.pull_request?.title ?? 'Pull request',
        detail: `${action.charAt(0).toUpperCase()}${action.slice(1)} in ${short}`,
        url: number ? `${repoUrl}/pull/${number}` : repoUrl,
      })
    } else if (type === 'PullRequestReviewEvent') {
      const number = payload.pull_request?.number
      items.push({
        ...base,
        kind: 'review',
        title: payload.pull_request?.title ?? 'Reviewed a pull request',
        detail: `Reviewed in ${short}`,
        url: number ? `${repoUrl}/pull/${number}` : repoUrl,
      })
    } else if (type === 'IssueCommentEvent' || type === 'PullRequestReviewCommentEvent') {
      const number = payload.issue?.number ?? payload.pull_request?.number
      items.push({
        ...base,
        kind: 'comment',
        title: payload.issue?.title ?? payload.pull_request?.title ?? 'Commented',
        detail: `Commented in ${short}`,
        url: number ? `${repoUrl}/issues/${number}` : repoUrl,
      })
    } else if (type === 'CreateEvent') {
      const what = payload.ref_type ?? 'repository'
      items.push({
        ...base,
        kind: 'create',
        title: what === 'repository' ? `Created ${short}` : `Created ${what} ${payload.ref ?? ''}`.trim(),
        detail: short,
        url: repoUrl,
      })
    } else if (type === 'ForkEvent') {
      items.push({ ...base, kind: 'fork', title: `Forked ${short}`, detail: repo, url: repoUrl })
    }
  }

  return items.slice(0, 12)
}

export const calculateGithubStats = (
  events: GithubEvent[] | null,
  repos: GithubRepo[] | null,
  pushDetails: PushDetails = {}
): GithubStats => {
  if (!events) {
    return {
      totalCommitsThisWeek: 0,
      commitsPerDay: [],
      totalPRs: 0,
      languageBreakdown: [],
      topRepos: [],
      recentActivity: [],
      commitsApproximate: false,
    }
  }

  const weekAgo = new Date()
  weekAgo.setDate(weekAgo.getDate() - 7)

  const pushEvents = events.filter((e) => e.type === 'PushEvent' && new Date(e.created_at) > weekAgo)

  let totalCommits = 0
  let approximate = false
  const commitsPerDay: Record<string, number> = {}

  pushEvents.forEach((event) => {
    const date = new Date(event.created_at).toLocaleDateString()
    const known = event.payload.commits?.length ?? (event.payload.head ? pushDetails[event.payload.head]?.count : undefined)
    if (known === undefined) approximate = true
    const commits = known ?? 1
    totalCommits += commits
    commitsPerDay[date] = (commitsPerDay[date] || 0) + commits
  })

  const totalPRs = events.filter((e) => e.type === 'PullRequestEvent').length

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

  const topRepos = (repos || []).slice(0, 5).map((repo) => ({
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
    recentActivity: buildActivity(events, pushDetails),
    commitsApproximate: approximate,
  }
}
