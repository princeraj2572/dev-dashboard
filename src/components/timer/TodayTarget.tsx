import { Link } from 'react-router-dom'
import ProgressBar from '@/components/common/ProgressBar'
import { formatMinutes } from '@/utils/timeStats'

interface TodayTargetProps {
  minutes: number
  target: number
  className?: string
}

export const TodayTarget = ({ minutes, target, className = '' }: TodayTargetProps) => {
  const reached = minutes >= target
  const remaining = Math.max(0, target - minutes)

  return (
    <section
      aria-label="Today's coding target"
      className={`rounded-xl border border-line bg-surface p-5 sm:p-6 ${className}`}
    >
      <div className="flex items-start justify-between gap-4">
        <h2 className="text-lg font-semibold">Today</h2>
        <Link to="/settings" className="text-sm font-semibold text-brand hover:underline">
          Change target
        </Link>
      </div>

      <p className="mt-4 flex items-baseline gap-2">
        <span className="font-display text-5xl font-extrabold leading-none tabular-nums">
          {formatMinutes(minutes)}
        </span>
        <span className="text-subtle">of {formatMinutes(target)}</span>
      </p>

      <ProgressBar
        value={Math.min(minutes, target)}
        max={target}
        size="lg"
        label="Today's coding time"
        className="mt-4"
      />

      <p className="mt-3 text-sm text-subtle">
        {reached
          ? 'Target reached. Anything more is a bonus.'
          : minutes === 0
            ? `Start a session to work towards ${formatMinutes(target)} today.`
            : `${formatMinutes(remaining)} to go.`}
      </p>
    </section>
  )
}

export default TodayTarget
