import { GitBranch, RefreshCw } from 'lucide-react'
import { useGitStatus } from '@/hooks/useGitStatus'

interface GitSyncStatusProps {
  variant?: 'compact' | 'full'
}

/** Shows how this project's git branch compares with its remote. Dev server only. */
export const GitSyncStatus = ({ variant = 'full' }: GitSyncStatusProps) => {
  const { status, isAvailable, isSynced, summary, isSyncing, sync } = useGitStatus()

  if (!isAvailable || !status) return null

  const dot = (
    <span
      aria-hidden="true"
      className={`size-2 shrink-0 rounded-full ${isSynced ? 'bg-brand' : 'bg-amber'}`}
    />
  )

  if (variant === 'compact') {
    return (
      <button
        type="button"
        onClick={() => void sync()}
        disabled={isSyncing}
        title={`${status.branch}: ${summary}. Click to check the remote.`}
        aria-label={`Git: ${status.branch}, ${summary}. Check the remote.`}
        className="mb-1 flex h-auto min-h-10 items-center gap-3 rounded-lg px-3 py-2 text-left text-subtle transition-colors hover:bg-sunken hover:text-ink disabled:opacity-60"
      >
        <span className="relative shrink-0">
          <GitBranch className="size-[18px]" aria-hidden="true" />
          <span className="absolute -right-1 -top-1 lg:hidden">{dot}</span>
        </span>
        <span className="hidden min-w-0 flex-1 lg:block">
          <span className="flex items-center gap-2 text-sm font-medium text-ink">
            <span className="truncate">{status.branch}</span>
            {dot}
          </span>
          <span className="block truncate text-xs">{summary}</span>
        </span>
        <RefreshCw
          className={`hidden size-3.5 shrink-0 lg:block ${isSyncing ? 'animate-spin' : ''}`}
          aria-hidden="true"
        />
      </button>
    )
  }

  const checked = status.checkedAt
    ? new Date(status.checkedAt).toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })
    : null

  return (
    <section className="rounded-xl border border-line bg-surface p-5 sm:p-6" aria-labelledby="git-heading">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 id="git-heading" className="text-lg font-semibold">
            Repository
          </h2>
          <p className="mt-1 flex items-center gap-2 text-subtle" role="status">
            {dot}
            {summary}
          </p>
        </div>
        <button
          type="button"
          onClick={() => void sync()}
          disabled={isSyncing}
          className="inline-flex h-11 shrink-0 items-center gap-2 rounded-lg border border-line px-3 text-sm font-semibold transition-colors hover:bg-sunken disabled:opacity-60 sm:h-10"
        >
          <RefreshCw className={`size-4 ${isSyncing ? 'animate-spin' : ''}`} aria-hidden="true" />
          {isSyncing ? 'Checking' : 'Check remote'}
        </button>
      </div>

      <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-subtle">Branch</dt>
          <dd className="font-medium">{status.branch}</dd>
        </div>
        <div>
          <dt className="text-subtle">Latest commit</dt>
          <dd className="font-medium">
            <span className="tabular-nums">{status.sha}</span>
            {status.subject && <span className="text-subtle">, {status.subject}</span>}
          </dd>
        </div>
        <div>
          <dt className="text-subtle">Remote</dt>
          <dd className="break-all font-medium">{status.remote ? status.remote.replace(/^https?:\/\//, '').replace(/\.git$/, '') : 'None'}</dd>
        </div>
        <div>
          <dt className="text-subtle">Last checked</dt>
          <dd className="font-medium">{checked ?? 'Just now'}</dd>
        </div>
      </dl>

      {status.fetchError && <p className="mt-4 text-sm text-danger">{status.fetchError}</p>}
      <p className="mt-4 text-xs text-subtle">
        Counts come from the last fetch. Use Check remote to fetch first. Only shown in the dev server.
      </p>
    </section>
  )
}

export default GitSyncStatus
