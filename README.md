# DevDash

A personal dashboard that answers one question: did you code today? It combines your GitHub activity, LeetCode progress, timed coding sessions and goals into one score, a streak and a week you can read at a glance.

Everything runs in the browser. Your goals, sessions and settings are stored in `localStorage`; there is no backend and no sign-in.

## Features

**Dashboard**
- Total score with rank, the GitHub, LeetCode and streak split, and a 7-day strip of commit activity
- Metrics for commits this week, pull requests, problems solved and coding hours
- Streak, best streak and today's progress against your daily coding target. A day counts if you pushed to GitHub or finished a timer session
- Goals overview, language breakdown, LeetCode stats and a recent activity feed

**Analytics**
- Commits per day for the last 7 days, languages used, and top repositories
- LeetCode problems by difficulty, acceptance rate and global ranking

**Coding timer**
- Start and stop sessions; the timer keeps counting when you leave the page or reload
- Daily target with a progress bar, and a 7-day chart of minutes coded
- Session history, totals and averages

**Goals**
- Set a target, unit and deadline, with days left and overdue warnings
- Progress can be manual, or counted automatically from LeetCode problems solved, GitHub commits in the last 7 days, or timer hours

**Settings**
- GitHub and LeetCode usernames, daily coding target, light and dark theme
- Export and import a backup of your goals, sessions and settings
- Git sync status for this repository (development server only)

The layout is responsive: a side rail on desktop, an icon rail on tablets and a bottom tab bar on phones.

## Getting started

Requires Node.js 20.19 or newer (a Vite 8 requirement).

```bash
git clone https://github.com/princeraj2572/dev-dashboard.git
cd dev-dashboard
npm install
npm run dev
```

Open http://localhost:5173, go to Settings, and enter your GitHub and LeetCode usernames.

### GitHub token (optional)

Without a token GitHub allows 60 requests an hour, which is enough for normal use. A token raises that to 5,000 an hour and lets every recent push be counted at once. Create `.env.local` in the project root:

```env
VITE_GITHUB_TOKEN=your_token_here
```

A classic token with no extra scopes is enough for public data. `.env.local` is ignored by git (`*.local` in `.gitignore`). Restart the dev server after adding it. Note that Vite embeds `VITE_` variables in the built app, so only use a token you are comfortable exposing to anyone who can open your deployed copy.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Serve the production build |
| `npm run lint` | Run ESLint |

## Tech stack

React 19, TypeScript, Vite, Tailwind CSS v4, React Router 7, TanStack Query, Zustand, Recharts and lucide-react icons.

## Project structure

```
src/
  pages/        Dashboard, Analytics, DSATracker (timer), Goals, Settings, WelcomePage
  components/
    layout/     Sidebar (responsive nav), page layout, PageHeader
    cards/      MetricStrip, MetricCard
    charts/     CommitChart, CodingTimeChart, LanguageBar, WeekStrip
    common/     Button, Card, Alert, Badge, Modal, ProgressBar, ActivityFeed,
                BackupPanel, GitSyncStatus
    goals/      GoalCard, GoalForm
    timer/      TimerDisplay, StartStopButton, TodayTarget, CodingSessionList
    score/ streak/ leetcode/
  hooks/        useGithubData, useLeetCodeData, useCodingTimer, useGoals,
                useResolvedGoals, useGitStatus
  services/     githubAPI, leetcodeAPI, apiClient (retries, error handling)
  store/        dashboardStore (usernames, theme, daily target)
  utils/        scoreCalculator, streakCalculator, goalSources, timeStats,
                weekActivity, backup, timeAgo
  index.css     Design tokens for light and dark themes
```

## How the score works

The score rewards showing up, not volume.

| Part | Rule |
| --- | --- |
| Commits | 2 points each, but only the first 5 commits on any one day count |
| Pull requests | 5 points each, counted once per pull request over the last 30 days, up to 6 |
| LeetCode | Easy 1, medium 3, hard 5, plus up to 50 for acceptance rate |
| Streak | 5 points for each day of your current streak, up to 50 |

A streak day is any day with a GitHub push or a finished timer session. Today does not break it: if yesterday was active it stays alive until the day ends. GitHub only returns your last 300 public events, so a very busy account can show a streak shorter than the real one. Ranks run from Getting started to Legend at 800 points. The rules are constants in `src/utils/scoreCalculator.ts`.

## Data sources

- **GitHub:** the public REST API. GitHub no longer includes commit lists in push events, so each recent push is resolved to a commit count with the compare API. Results are cached in `localStorage`, and without a token at most 20 new pushes are looked up per page load. Early counts can be estimates, and the dashboard says so; reloading refines them.
- **LeetCode:** the public [alfa-leetcode-api](https://github.com/alfaarghya/alfa-leetcode-api) service. It runs on a free host, so the first request after a quiet spell can take up to a minute. If your username is not found, or the service is down, the dashboard says which.

## Data and privacy

Stored in this browser only:

| Key | Contents |
| --- | --- |
| `github_username`, `leetcode_username` | Your usernames |
| `goals` | Goals, including auto-tracking source and baseline |
| `codingTimerState` | Timer state and saved sessions |
| `daily_target_minutes` | Daily coding target |
| `theme` | `light` or `dark` |
| `github_push_details_v1` | Cached commit counts for past pushes |

Clearing site data removes all of it, so use Settings, Backup, Export backup to keep a copy. Importing a backup replaces your current goals, sessions and settings after you confirm.

## Development notes

- The git sync indicator calls a small read-only endpoint (`/__git-status`) defined in `vite.config.ts`. It only exists under `npm run dev` and is absent from production builds.
- Colours, type and spacing are defined once as tokens in `src/index.css`. Dark mode is a `.dark` class on `<html>`.

## Troubleshooting

- **GitHub numbers are zero or an error shows:** check the username in Settings. If you have reloaded many times, you may have used the 60 requests per hour; wait, or add a token.
- **LeetCode says the user was not found:** your LeetCode username can differ from your GitHub one. It must match exactly.
- **LeetCode is slow or unavailable:** the free host may be waking up. Reload after a minute.
- **The dev server will not start:** delete `node_modules`, run `npm install`, then `npm run dev`. If port 5173 is busy, Vite picks the next free port.

## License

MIT
