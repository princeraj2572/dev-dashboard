import { type CodingSession } from '@/types'

interface CodingSessionListProps {
  sessions: CodingSession[]
  formatTime: (seconds: number) => string
  onClear: () => void
}

export const CodingSessionList = ({ sessions, formatTime, onClear }: CodingSessionListProps) => {
  if (sessions.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-line px-6 py-12 text-center">
        <p className="text-lg font-semibold">No sessions yet</p>
        <p className="mt-1 text-subtle">Start the timer when you sit down to code. Finished sessions are listed here.</p>
      </div>
    )
  }

  const recent = [...sessions].sort((a, b) => b.end - a.end).slice(0, 10)

  return (
    <section aria-labelledby="recent-sessions" className="rounded-xl border border-line bg-surface p-5 sm:p-6">
      <div className="flex items-center justify-between gap-4">
        <h2 id="recent-sessions" className="text-lg font-semibold">
          Recent sessions
        </h2>
        <button
          type="button"
          onClick={onClear}
          className="rounded-md px-2 py-1 text-sm font-medium text-subtle transition-colors hover:bg-danger-soft hover:text-danger"
        >
          Clear all
        </button>
      </div>

      <ul className="mt-2 divide-y divide-line">
        {recent.map((session) => (
          <li key={session.id} className="flex items-baseline justify-between gap-4 py-3">
            <span className="text-sm text-subtle">
              {new Date(session.end).toLocaleString(undefined, {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
              })}
            </span>
            <span className="font-display text-lg font-bold tabular-nums">{formatTime(session.duration)}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default CodingSessionList
