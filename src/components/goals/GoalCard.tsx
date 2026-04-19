import type { Goal } from '@/types'

interface GoalCardProps {
  goal: Goal
  progress: number
  onUpdate: (current: number) => void
  onDelete: () => void
  isCompleted: boolean
}

export const GoalCard = ({ goal, progress, onUpdate, onDelete, isCompleted }: GoalCardProps) => {
  const handleIncrease = () => {
    onUpdate(Math.min(goal.current + 1, goal.target))
  }

  const handleDecrease = () => {
    onUpdate(Math.max(goal.current - 1, 0))
  }

  return (
    <div
      className={`rounded-lg shadow p-6 border-2 transition ${
        isCompleted ? 'bg-green-50 border-green-300' : 'bg-white border-gray-200'
      }`}
    >
      <div className="space-y-4">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-bold text-gray-900">{goal.title}</h3>
            <p className="text-sm text-gray-600 mt-1">
              {goal.current} / {goal.target} {goal.unit}
            </p>
          </div>
          {isCompleted && <span className="text-2xl">✅</span>}
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${
                isCompleted ? 'bg-green-500' : 'bg-indigo-500'
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-gray-600 text-right">{progress.toFixed(0)}%</p>
        </div>

        {/* Deadline */}
        <div className="text-sm text-gray-600">
          <p>📅 Deadline: {new Date(goal.deadline).toLocaleDateString()}</p>
        </div>

        {/* Controls */}
        <div className="flex gap-2 justify-between">
          <div className="flex gap-2">
            <button
              onClick={handleDecrease}
              disabled={goal.current === 0}
              className="px-3 py-1 bg-gray-200 hover:bg-gray-300 disabled:opacity-50 rounded text-sm font-semibold transition"
            >
              −
            </button>
            <button
              onClick={handleIncrease}
              disabled={goal.current >= goal.target}
              className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-green-600 disabled:opacity-100 text-white rounded text-sm font-semibold transition"
            >
              +
            </button>
          </div>
          <button
            onClick={onDelete}
            className="px-4 py-1 text-red-600 hover:text-red-700 hover:bg-red-50 rounded text-sm font-semibold transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default GoalCard
