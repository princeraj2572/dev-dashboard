import { useCodingTimer } from '@/hooks/useCodingTimer'
import { TimerDisplay } from '@/components/timer/TimerDisplay'
import { StartStopButton } from '@/components/timer/StartStopButton'
import { CodingSessionList } from '@/components/timer/CodingSessionList'

export const DSATracker = () => {
  const {
    isRunning,
    elapsedSeconds,
    sessions,
    formatTime,
    startTimer,
    stopTimer,
    resetTimer,
    clearSessions,
    getTotalHours,
    getAverageSessionMinutes,
  } = useCodingTimer()

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Coding Timer</h1>
        <p className="text-gray-600">Track your coding sessions and DSA practice time</p>
      </div>

      {/* Timer Display */}
      <TimerDisplay elapsedSeconds={elapsedSeconds} formatTime={formatTime} />

      {/* Control Buttons */}
      <StartStopButton isRunning={isRunning} onStart={startTimer} onStop={stopTimer} onReset={resetTimer} />

      {/* Quick Stats */}
      {sessions.length > 0 && (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <p className="text-xs text-gray-600 uppercase font-semibold">Total Hours</p>
            <p className="text-2xl font-bold text-blue-600 mt-1">
              {getTotalHours().toFixed(1)}h
            </p>
          </div>

          <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
            <p className="text-xs text-gray-600 uppercase font-semibold">Avg Session</p>
            <p className="text-2xl font-bold text-purple-600 mt-1">
              {getAverageSessionMinutes().toFixed(0)}m
            </p>
          </div>

          <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
            <p className="text-xs text-gray-600 uppercase font-semibold">Sessions</p>
            <p className="text-2xl font-bold text-orange-600 mt-1">{sessions.length}</p>
          </div>

          <div className="bg-rose-50 rounded-lg p-4 border border-rose-200">
            <p className="text-xs text-gray-600 uppercase font-semibold">Today</p>
            <p className="text-2xl font-bold text-rose-600 mt-1">
              {sessions
                .filter((s) => new Date(s.end).toDateString() === new Date().toDateString())
                .reduce((sum, s) => sum + s.duration, 0) / 60 < 1
                ? '0m'
                : (sessions
                    .filter((s) => new Date(s.end).toDateString() === new Date().toDateString())
                    .reduce((sum, s) => sum + s.duration, 0) / 60).toFixed(0) + 'm'}
            </p>
          </div>
        </div>
      )}

      {/* Sessions List */}
      <CodingSessionList sessions={sessions} formatTime={formatTime} onClear={clearSessions} />
    </div>
  )
}

export default DSATracker
