import { getScoreRank, getScoreColor } from '@/utils/scoreCalculator'
import type { CombinedScore } from '@/utils/scoreCalculator'

interface ScoreDisplayProps {
  score: CombinedScore
}

export const ScoreDisplay = ({ score }: ScoreDisplayProps) => {
  const rankLabel = getScoreRank(score.totalScore)
  const gradientColor = getScoreColor(score.totalScore)

  return (
    <div className={`bg-gradient-to-br ${gradientColor} rounded-2xl shadow-xl p-8 md:p-12 text-white overflow-hidden relative`}>
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full -ml-24 -mb-24" />

      <div className="relative z-10 space-y-6">
        {/* Rank Badge */}
        <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
          <p className="text-xs font-semibold uppercase tracking-wider opacity-90">Your Rank</p>
          <p className="text-2xl font-bold mt-1">{rankLabel}</p>
        </div>

        {/* Total Score - Prominent */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl py-8 px-6 border border-white/20">
          <p className="text-sm font-semibold opacity-75 mb-2 uppercase tracking-wide">Total Score</p>
          <p className="text-7xl font-bold tracking-tight">{score.totalScore}</p>
        </div>

        {/* Score Breakdown */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/20">
            <p className="text-xs opacity-75 mb-3 font-semibold uppercase tracking-wide">GitHub Score</p>
            <p className="text-4xl font-bold">{score.githubScore}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/20">
            <p className="text-xs opacity-75 mb-3 font-semibold uppercase tracking-wide">LeetCode Score</p>
            <p className="text-4xl font-bold">{score.leetcodeScore}</p>
          </div>
        </div>

        {/* Metrics */}
        <div className="space-y-3 text-sm opacity-90 pt-4 border-t border-white/20">
          <div className="flex justify-between items-center">
            <span>📊 Commits</span>
            <span className="font-semibold">{score.breakdown.commits}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>🎯 Problems Solved</span>
            <span className="font-semibold">{score.breakdown.leetcodeProblems}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>🔥 Streak Bonus</span>
            <span className="font-semibold">{score.breakdown.streakBonus} pts</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ScoreDisplay
