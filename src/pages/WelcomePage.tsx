import { Link } from 'react-router-dom'
import { GitCommitHorizontal, Code2, Timer, Target } from 'lucide-react'
import WeekStrip from '@/components/charts/WeekStrip'
import type { DayActivity } from '@/utils/weekActivity'

const sampleCounts = [2, 0, 5, 3, 8, 1, 4]

const sampleWeek: DayActivity[] = sampleCounts.map((count, i) => {
  const date = new Date()
  date.setHours(0, 0, 0, 0)
  date.setDate(date.getDate() - (6 - i))
  return { key: date.toISOString(), weekday: date.toLocaleDateString(undefined, { weekday: 'short' }), date, count }
})

const features = [
  { Icon: GitCommitHorizontal, title: 'GitHub', text: 'Commits, pull requests, languages and top repositories.' },
  { Icon: Code2, title: 'LeetCode', text: 'Problems solved by difficulty, acceptance rate and ranking.' },
  { Icon: Timer, title: 'Coding timer', text: 'Time each session and keep a daily streak going.' },
  { Icon: Target, title: 'Goals', text: 'Set a number and a deadline, then track it to the end.' },
]

export const WelcomePage = () => {
  return (
    <div className="min-h-screen bg-canvas">
      <div className="mx-auto grid min-h-screen max-w-6xl items-center gap-12 px-6 py-12 lg:grid-cols-[1.1fr_1fr] lg:px-10">
        <div>
          <h1 className="text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl">
            See whether you coded today.
          </h1>
          <p className="mt-5 max-w-prose text-lg text-subtle">
            DevDash turns your GitHub commits, LeetCode problems and timed sessions into one score, a streak and a
            week you can read at a glance.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/settings"
              className="inline-flex h-12 items-center rounded-lg bg-brand px-6 font-semibold text-brand-ink transition-colors hover:brightness-110"
            >
              Add your usernames
            </Link>
            <Link
              to="/"
              className="inline-flex h-12 items-center rounded-lg border border-line bg-surface px-6 font-semibold transition-colors hover:bg-sunken"
            >
              Open dashboard
            </Link>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl bg-slab p-6 text-slab-ink sm:p-8" aria-hidden="true">
            <p className="text-sm text-slab-ink/70">A sample week</p>
            <div className="mt-4">
              <WeekStrip days={sampleWeek} onDark />
            </div>
          </div>

          <ul className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
            {features.map(({ Icon, title, text }) => (
              <li key={title} className="flex gap-3">
                <Icon className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden="true" />
                <div>
                  <h2 className="text-base font-semibold">{title}</h2>
                  <p className="text-sm text-subtle">{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default WelcomePage
