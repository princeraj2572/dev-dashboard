import { getStreakBadge } from '@/utils/streakCalculator'
import type { StreakData } from '@/utils/streakCalculator'

interface StreakDisplayProps {
  streak: StreakData
}

export const StreakDisplay = ({ streak }: StreakDisplayProps) => {
  const badge = getStreakBadge(streak.currentStreak)

  return (
    <div className={`bg-gradient-to-br ${badge.color} rounded-lg shadow-lg p-8 text-white`}>
      <div className="space-y-6">
        {/* Header with Badge */}
        <div className="text-center">
          <p className="text-4xl mb-3">{badge.icon}</p>
          <p className="text-sm font-semibold opacity-90">{badge.label} Streak</p>
        </div>

        {/* Current Streak */}
        <div className="text-center bg-black bg-opacity-20 rounded-lg py-6">
          <p className="text-sm opacity-75 font-semibold mb-2">Current Streak</p>
          <p className="text-6xl font-bold">{streak.currentStreak}</p>
          <p className="text-sm opacity-75 mt-2">days</p>
        </div>

        {/* Longest Streak */}
        <div className="bg-black bg-opacity-20 rounded-lg p-4 text-center">
          <p className="text-xs opacity-75 font-semibold mb-2">Personal Best</p>
          <p className="text-3xl font-bold">{streak.longestStreak}</p>
          <p className="text-xs opacity-75">day streak</p>
        </div>

        {/* Last Activity */}
        {streak.lastActivityDate && (
          <div className="text-center text-sm opacity-90">
            <p className="font-semibold">Last Active</p>
            <p className="opacity-75">{streak.lastActivityDate}</p>
          </div>
        )}

        {/* Motivational Message */}
        {streak.currentStreak === 0 ? (
          <div className="text-center text-sm font-semibold">
            🚀 Start your first session today!
          </div>
        ) : streak.currentStreak >= 30 ? (
          <div className="text-center text-sm font-semibold">
            🎉 You're on fire! Keep it up!
          </div>
        ) : (
          <div className="text-center text-sm font-semibold">
            💪 Keep the momentum going!
          </div>
        )}
      </div>
    </div>
  )
}

export default StreakDisplay
