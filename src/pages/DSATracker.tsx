import { useCodingTimer } from '@/hooks/useCodingTimer'
import { TimerDisplay } from '@/components/timer/TimerDisplay'
import { StartStopButton } from '@/components/timer/StartStopButton'
import { CodingSessionList } from '@/components/timer/CodingSessionList'
import Section from '@/components/common/Section'
import StatCard from '@/components/cards/StatCard'

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

  const todaySessions = sessions.filter((s) => new Date(s.end).toDateString() === new Date().toDateString())
  const todayMinutes = todaySessions.reduce((sum, s) => sum + s.duration, 0) / 60

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <Section
        title="⏱️ Coding Timer"
        subtitle="Track your coding sessions and DSA practice time"
      />

      {/* Timer Display */}
      <TimerDisplay elapsedSeconds={elapsedSeconds} formatTime={formatTime} />

      {/* Control Buttons */}
      <StartStopButton isRunning={isRunning} onStart={startTimer} onStop={stopTimer} onReset={resetTimer} />

      {/* Quick Stats */}
      {sessions.length > 0 && (
        <div>
          <Section title="📊 Your Stats" subtitle="Coding session metrics" />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 mt-6">
            <StatCard
              title="Total Hours"
              value={getTotalHours().toFixed(1)}
              unit="hours"
              icon="⏳"
              trend="up"
              change={10}
            />

            <StatCard
              title="Avg Session"
              value={getAverageSessionMinutes().toFixed(0)}
              unit="minutes"
              icon="📈"
              trend="up"
              change={5}
            />

            <StatCard
              title="Sessions"
              value={sessions.length}
              icon="📋"
              trend="up"
            />

            <StatCard
              title="Today"
              value={todayMinutes < 1 ? '0' : todayMinutes.toFixed(0)}
              unit={todayMinutes < 1 ? '' : 'min'}
              icon="🔥"
              trend={todayMinutes > 0 ? 'up' : 'neutral'}
            />
          </div>
        </div>
      )}

      {/* Sessions List */}
      <CodingSessionList sessions={sessions} formatTime={formatTime} onClear={clearSessions} />
    </div>
  )
}

export default DSATracker
