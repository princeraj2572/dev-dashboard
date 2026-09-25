import { useState } from 'react'
import { Plus } from 'lucide-react'
import type { Goal, GoalSource } from '@/types'
import type { LiveData } from '@/utils/goalSources'
import { GOAL_SOURCES, sourceInfo } from '@/utils/goalSources'
import Button from '@/components/common/Button'

interface GoalFormProps {
  onSubmit: (goal: Omit<Goal, 'id'>) => void
  /** Used to check which automatic sources have data, and to set the LeetCode baseline. */
  live: LiveData
}

const defaultDeadline = () => {
  const date = new Date()
  date.setDate(date.getDate() + 30)
  return date.toISOString().split('T')[0]
}

const fieldClass =
  'h-11 w-full rounded-lg border border-line bg-surface px-3 text-base text-ink focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/25 sm:h-10 sm:text-sm'

const units = ['tasks', 'hours', 'commits', 'problems', 'days', 'projects']

export const GoalForm = ({ onSubmit, live }: GoalFormProps) => {
  const [title, setTitle] = useState('')
  const [target, setTarget] = useState(10)
  const [unit, setUnit] = useState('tasks')
  const [source, setSource] = useState<GoalSource>('manual')
  const [deadline, setDeadline] = useState(defaultDeadline)
  const [isOpen, setIsOpen] = useState(false)

  // Why a source cannot be chosen right now, or null when it can.
  const unavailable: Partial<Record<GoalSource, string>> = {
    leetcode: live.leetcodeSolved === null ? 'needs working LeetCode stats' : undefined,
    commits: live.commitsThisWeek === null ? 'needs GitHub stats' : undefined,
  }

  const isAuto = source !== 'manual'
  const info = sourceInfo(source)

  const reset = () => {
    setTitle('')
    setTarget(10)
    setUnit('tasks')
    setSource('manual')
    setDeadline(defaultDeadline())
    setIsOpen(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    onSubmit({
      title: title.trim(),
      target: Math.max(1, target),
      current: 0,
      unit: isAuto ? info.unit : unit.trim(),
      deadline,
      source,
      createdAt: Date.now(),
      ...(source === 'leetcode' ? { baseline: live.leetcodeSolved ?? 0 } : {}),
    })
    reset()
  }

  if (!isOpen) {
    return (
      <Button onClick={() => setIsOpen(true)}>
        <Plus aria-hidden="true" />
        New goal
      </Button>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full rounded-xl border border-line bg-surface p-5 sm:p-6"
      aria-label="New goal"
    >
      <h2 className="text-lg font-semibold">New goal</h2>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="goal-title" className="mb-1.5 block text-sm font-medium">
            What do you want to achieve?
          </label>
          <input
            id="goal-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Solve 20 LeetCode problems"
            className={fieldClass}
            autoFocus
            required
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="goal-source" className="mb-1.5 block text-sm font-medium">
            How is progress counted?
          </label>
          <select
            id="goal-source"
            value={source}
            onChange={(e) => setSource(e.target.value as GoalSource)}
            className={fieldClass}
          >
            {GOAL_SOURCES.map((s) => (
              <option key={s.id} value={s.id} disabled={!!unavailable[s.id]}>
                {s.label}
                {unavailable[s.id] ? ` (${unavailable[s.id]})` : ''}
              </option>
            ))}
          </select>
          <p className="mt-1.5 text-sm text-subtle">{info.description}</p>
        </div>

        <div>
          <label htmlFor="goal-target" className="mb-1.5 block text-sm font-medium">
            Target
          </label>
          <input
            id="goal-target"
            type="number"
            value={target}
            onChange={(e) => setTarget(Math.max(1, parseInt(e.target.value, 10) || 1))}
            min="1"
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="goal-unit" className="mb-1.5 block text-sm font-medium">
            Unit
          </label>
          {isAuto ? (
            <p className={`${fieldClass} flex items-center text-subtle`}>{info.unit}</p>
          ) : (
            <select id="goal-unit" value={unit} onChange={(e) => setUnit(e.target.value)} className={fieldClass}>
              {units.map((u) => (
                <option key={u}>{u}</option>
              ))}
            </select>
          )}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="goal-deadline" className="mb-1.5 block text-sm font-medium">
            Deadline
          </label>
          <input
            id="goal-deadline"
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className={fieldClass}
          />
        </div>
      </div>

      <div className="mt-5 flex justify-end gap-2">
        <Button variant="secondary" onClick={() => setIsOpen(false)}>
          Cancel
        </Button>
        <Button type="submit">Create goal</Button>
      </div>
    </form>
  )
}

export default GoalForm
