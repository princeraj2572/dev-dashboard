import { getStreakBadge } from '@/utils/streakCalculator'
import type { StreakData } from '@/utils/streakCalculator'

interface StreakDisplayProps {
  streak: StreakData
}

export const StreakDisplay = ({ streak }: StreakDisplayProps) => {
  const badge = getStreakBadge(streak.currentStreak)

  return (
    <div className={`bg-gradient-to-br ${badge.color} rounded-2xl shadow-xl p-8 md:p-12 text-white overflow-hidden relative`}>
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full -ml-24 -mb-24" />

      <div className="relative z-10 space-y-6">
        {/* Header with Badge */}
        <div className="text-center">
          <p className="text-5xl mb-3 animate-bounce">{badge.icon}</p>
          <p className="text-sm font-bold opacity-90 uppercase tracking-wide">{badge.label} Streak</p>
        </div>

        {/* Current Streak */}
        <div className="text-center bg-white/10 backdrop-blur-md rounded-2xl py-8 px-4 border border-white/20">
          <p className="text-sm opacity-75 font-semibold mb-2 uppercase tracking-wide">Current Streak</p>
          <p className="text-7xl font-bold tracking-tight">{streak.currentStreak}</p>
          <p className="text-sm opacity-75 mt-2 font-medium">days</p>
        </div>

        {/* Longest Streak */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 text-center border border-white/20">
          <p className="text-xs opacity-75 font-semibold mb-2 uppercase tracking-wide">Personal Best</p>
          <p className="text-4xl font-bold">{streak.longestStreak}</p>
          <p className="text-xs opacity-75 mt-1 font-medium">day streak</p>
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
