import { Minus, Plus, Trash2, Check } from 'lucide-react'
import type { ResolvedGoal } from '@/hooks/useResolvedGoals'
import { sourceInfo } from '@/utils/goalSources'
import ProgressBar from '@/components/common/ProgressBar'
import Badge from '@/components/common/Badge'

interface GoalCardProps {
  goal: ResolvedGoal
  progress: number
  onUpdate: (current: number) => void
  onDelete: () => void
  isCompleted: boolean
}

const daysLeft = (deadline: string) => {
  const end = new Date(deadline)
  end.setHours(23, 59, 59, 999)
  return Math.ceil((end.getTime() - Date.now()) / 86400000)
}

const formatValue = (value: number) => (Number.isInteger(value) ? value : value.toFixed(1))

const iconButton =
  'grid size-11 place-items-center rounded-lg border border-line text-ink transition-colors hover:bg-sunken disabled:cursor-not-allowed disabled:opacity-40 sm:size-9'

export const GoalCard = ({ goal, progress, onUpdate, onDelete, isCompleted }: GoalCardProps) => {
  const remaining = daysLeft(goal.deadline)
  const deadlineText = isCompleted
    ? 'Due'
    : remaining < 0
      ? `Overdue by ${-remaining} ${remaining === -1 ? 'day' : 'days'}`
      : remaining === 0
        ? 'Due today'
        : `${remaining} ${remaining === 1 ? 'day' : 'days'} left`
  const info = sourceInfo(goal.source)

  return (
    <article className="rounded-xl border border-line bg-surface p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-lg font-semibold">{goal.title}</h3>
          <p className={`text-sm ${!isCompleted && remaining < 0 ? 'text-danger' : 'text-subtle'}`}>
            {deadlineText}, {new Date(goal.deadline).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {goal.isAuto && <Badge>Auto</Badge>}
          {isCompleted && (
            <span className="grid size-7 place-items-center rounded-full bg-brand text-brand-ink">
              <Check className="size-4" aria-label="Completed" />
            </span>
          )}
        </div>
      </div>

      <p className="font-display mt-5 flex items-baseline gap-1.5 tabular-nums">
        <span className="text-4xl font-bold leading-none">{formatValue(goal.current)}</span>
        <span className="text-subtle">
          of {goal.target} {goal.unit}
        </span>
      </p>

      <ProgressBar value={progress} max={100} label={goal.title} className="mt-3" />

      <div className="mt-5 flex items-center justify-between gap-3">
        {goal.isAuto ? (
          <p className="min-w-0 text-sm text-subtle">
            {goal.waiting ? 'Waiting for data. ' : ''}
            {info.description}
          </p>
        ) : (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => onUpdate(Math.max(goal.current - 1, 0))}
              disabled={goal.current === 0}
              aria-label={`Decrease ${goal.title}`}
              className={iconButton}
            >
              <Minus className="size-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => onUpdate(Math.min(goal.current + 1, goal.target))}
              disabled={goal.current >= goal.target}
              aria-label={`Increase ${goal.title}`}
              className={iconButton}
            >
              <Plus className="size-4" aria-hidden="true" />
            </button>
          </div>
        )}
        <button
          type="button"
          onClick={onDelete}
          aria-label={`Delete ${goal.title}`}
          className="grid size-11 shrink-0 place-items-center rounded-lg text-subtle transition-colors hover:bg-danger-soft hover:text-danger sm:size-9"
        >
          <Trash2 className="size-4" aria-hidden="true" />
        </button>
      </div>
    </article>
  )
}

export default GoalCard
