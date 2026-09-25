import { useState } from 'react'
import { Plus } from 'lucide-react'
import type { Goal } from '@/types'
import Button from '@/components/common/Button'

interface GoalFormProps {
  onSubmit: (goal: Omit<Goal, 'id'>) => void
}

const defaultDeadline = () => {
  const date = new Date()
  date.setDate(date.getDate() + 30)
  return date.toISOString().split('T')[0]
}

const fieldClass =
  'h-11 w-full rounded-lg border border-line bg-surface px-3 text-base text-ink focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/25 sm:h-10 sm:text-sm'

const units = ['tasks', 'hours', 'commits', 'problems', 'days', 'projects']

export const GoalForm = ({ onSubmit }: GoalFormProps) => {
  const [title, setTitle] = useState('')
  const [target, setTarget] = useState(10)
  const [unit, setUnit] = useState('tasks')
  const [deadline, setDeadline] = useState(defaultDeadline)
  const [isOpen, setIsOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    onSubmit({
      title: title.trim(),
      target: Math.max(1, target),
      current: 0,
      unit: unit.trim(),
      deadline,
    })

    setTitle('')
    setTarget(10)
    setUnit('tasks')
    setDeadline(defaultDeadline())
    setIsOpen(false)
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
          <select id="goal-unit" value={unit} onChange={(e) => setUnit(e.target.value)} className={fieldClass}>
            {units.map((u) => (
              <option key={u}>{u}</option>
            ))}
          </select>
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
