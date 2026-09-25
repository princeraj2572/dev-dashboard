import { useState } from 'react'
import {
  GitCommitHorizontal,
  GitPullRequest,
  GitFork,
  MessageSquare,
  Eye,
  Plus,
  ExternalLink,
  type LucideIcon,
} from 'lucide-react'
import type { ActivityItem } from '@/types'
import { timeAgo } from '@/utils/timeAgo'

interface ActivityFeedProps {
  items: ActivityItem[]
  /** Explains why the counts might be low, e.g. GitHub rate limiting. */
  approximate?: boolean
  pageSize?: number
}

const icons: Record<ActivityItem['kind'], LucideIcon> = {
  commit: GitCommitHorizontal,
  pull_request: GitPullRequest,
  review: Eye,
  comment: MessageSquare,
  create: Plus,
  fork: GitFork,
}

export const ActivityFeed = ({ items, approximate = false, pageSize = 6 }: ActivityFeedProps) => {
  const [expanded, setExpanded] = useState(false)
  const shown = expanded ? items : items.slice(0, pageSize)

  return (
    <section aria-labelledby="activity-heading" className="rounded-xl border border-line bg-surface p-5 sm:p-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 id="activity-heading" className="text-lg font-semibold">
            Recent activity
          </h2>
          <p className="text-sm text-subtle">Your latest public GitHub events</p>
        </div>
        {items.length > pageSize && (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="rounded-md px-2 py-1 text-sm font-semibold text-brand hover:underline"
          >
            {expanded ? 'Show fewer' : `Show all ${items.length}`}
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <p className="mt-6 max-w-sm text-subtle">
          Nothing yet. Commits, pull requests and reviews you make on GitHub show up here.
        </p>
      ) : (
        <ul className="mt-3 divide-y divide-line">
          {shown.map((item) => {
            const Icon = icons[item.kind]
            return (
              <li key={item.id}>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group -mx-2 flex items-start gap-3 rounded-lg px-2 py-3 transition-colors hover:bg-sunken"
                >
                  <Icon className="mt-0.5 size-[18px] shrink-0 text-subtle" aria-hidden="true" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-medium">{item.title}</span>
                    <span className="block truncate text-sm text-subtle">{item.detail}</span>
                  </span>
                  <span className="flex shrink-0 items-center gap-1.5 text-sm text-subtle">
                    <time dateTime={item.date}>{timeAgo(item.date)}</time>
                    <ExternalLink
                      className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
                      aria-label="Opens on GitHub"
                    />
                  </span>
                </a>
              </li>
            )
          })}
        </ul>
      )}

      {approximate && (
        <p className="mt-4 text-xs text-subtle">
          Some recent pushes are counted as one commit each while exact counts are still loading. Reload to refine
          them, or add a GitHub token (see Settings) to load them all at once.
        </p>
      )}
    </section>
  )
}

export default ActivityFeed
