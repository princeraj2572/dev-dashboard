import { useState } from 'react'
import type { Goal } from '@/types'

interface GoalFormProps {
  onSubmit: (goal: Omit<Goal, 'id'>) => void
}

export const GoalForm = ({ onSubmit }: GoalFormProps) => {
  const [title, setTitle] = useState('')
  const [target, setTarget] = useState(10)
  const [unit, setUnit] = useState('tasks')
  const [deadline, setDeadline] = useState(() => {
    const date = new Date()
    date.setDate(date.getDate() + 30)
    return date.toISOString().split('T')[0]
  })
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

    // Reset form
    setTitle('')
    setTarget(10)
    setUnit('tasks')
    setDeadline(() => {
      const date = new Date()
      date.setDate(date.getDate() + 30)
      return date.toISOString().split('T')[0]
    })
    setIsOpen(false)
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition flex items-center justify-center gap-2"
      >
        ➕ Create New Goal
      </button>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 border-2 border-indigo-300">
      <h3 className="text-lg font-bold mb-4">Create New Goal</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Goal Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Solve LeetCode Problems"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            autoFocus
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Target</label>
            <input
              type="number"
              value={target}
              onChange={(e) => setTarget(Math.max(1, parseInt(e.target.value)))}
              min="1"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option>tasks</option>
              <option>hours</option>
              <option>commits</option>
              <option>problems</option>
              <option>days</option>
              <option>projects</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Deadline</label>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        <div className="flex gap-2 justify-end">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-semibold transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg font-semibold transition"
          >
            Create Goal
          </button>
        </div>
      </form>
    </div>
  )
}

export default GoalForm
