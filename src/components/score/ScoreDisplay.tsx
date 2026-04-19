import { getScoreRank, getScoreColor } from '@/utils/scoreCalculator'
import type { CombinedScore } from '@/utils/scoreCalculator'

interface ScoreDisplayProps {
  score: CombinedScore
}

export const ScoreDisplay = ({ score }: ScoreDisplayProps) => {
  const rankLabel = getScoreRank(score.totalScore)
  const gradientColor = getScoreColor(score.totalScore)

  return (
    <div className={`bg-gradient-to-br ${gradientColor} rounded-lg shadow-lg p-8 text-white`}>
      <div className="space-y-6">
        {/* Rank Badge */}
        <div className="text-center">
          <p className="text-sm font-semibold opacity-90 mb-2">Your Rank</p>
          <p className="text-4xl font-bold mb-2">{rankLabel}</p>
        </div>

        {/* Total Score */}
        <div className="text-center bg-black bg-opacity-20 rounded-lg py-6">
          <p className="text-sm font-semibold opacity-90 mb-2">Total Score</p>
          <p className="text-6xl font-bold">{score.totalScore}</p>
        </div>

        {/* Score Breakdown */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-black bg-opacity-20 rounded-lg p-4 text-center">
            <p className="text-xs opacity-75 mb-2 font-semibold">GitHub Score</p>
            <p className="text-3xl font-bold">{score.githubScore}</p>
          </div>
          <div className="bg-black bg-opacity-20 rounded-lg p-4 text-center">
            <p className="text-xs opacity-75 mb-2 font-semibold">LeetCode Score</p>
            <p className="text-3xl font-bold">{score.leetcodeScore}</p>
          </div>
        </div>

        {/* Metrics */}
        <div className="space-y-2 text-sm opacity-90">
          <div className="flex justify-between">
            <span>📝 Commits this week</span>
            <span className="font-semibold">{score.breakdown.commits}</span>
          </div>
          <div className="flex justify-between">
            <span>🔀 Pull Requests</span>
            <span className="font-semibold">{score.breakdown.prs}</span>
          </div>
          <div className="flex justify-between">
            <span>🎯 Problems Solved</span>
            <span className="font-semibold">{score.breakdown.leetcodeProblems}</span>
          </div>
          {score.breakdown.acceptanceBonus > 0 && (
            <div className="flex justify-between">
              <span>📊 Acceptance Bonus</span>
              <span className="font-semibold">+{score.breakdown.acceptanceBonus}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ScoreDisplay
