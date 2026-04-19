import { CodingSession } from '@/types'

interface CodingSessionListProps {
  sessions: CodingSession[]
  formatTime: (seconds: number) => string
  onClear: () => void
}

export const CodingSessionList = ({ sessions, formatTime, onClear }: CodingSessionListProps) => {
  if (sessions.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-8 text-center border border-dashed border-gray-300">
        <p className="text-gray-600">No coding sessions yet. Start your first session! 🎯</p>
      </div>
    )
  }

  const totalDuration = sessions.reduce((sum, session) => sum + session.duration, 0)
  const averageDuration = totalDuration / sessions.length

  return (
    <div className="space-y-6">
      {/* Stats Summary */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-200">
          <p className="text-sm text-gray-600">Total Sessions</p>
          <p className="text-3xl font-bold text-indigo-600 mt-1">{sessions.length}</p>
        </div>

        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
          <p className="text-sm text-gray-600">Total Time</p>
          <p className="text-3xl font-bold text-green-600 mt-1">
            {(totalDuration / 3600).toFixed(1)}h
          </p>
        </div>

        <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
          <p className="text-sm text-gray-600">Avg Session</p>
          <p className="text-3xl font-bold text-amber-600 mt-1">
            {(averageDuration / 60).toFixed(0)}m
          </p>
        </div>
      </div>

      {/* Sessions List */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold">Recent Sessions</h3>
          <button
            onClick={onClear}
            className="text-red-600 hover:text-red-700 text-sm font-medium"
          >
            Clear All
          </button>
        </div>

        <div className="space-y-3">
          {sessions
            .sort((a, b) => b.end - a.end)
            .slice(0, 10)
            .map((session) => (
              <div key={session.id} className="bg-white border border-gray-200 rounded-lg p-4 flex justify-between items-center">
                <div>
                  <p className="font-semibold text-gray-900">
                    {formatTime(session.duration)}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(session.end).toLocaleString()}
                  </p>
                </div>
                <div className="text-right text-sm text-gray-600">
                  {((session.duration / 60) / (totalDuration / 60 / sessions.length)).toFixed(1)} avg
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default CodingSessionList
