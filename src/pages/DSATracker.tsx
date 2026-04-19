import { useCodingTimer } from '@/hooks/useCodingTimer'
import { TimerDisplay } from '@/components/timer/TimerDisplay'
import { StartStopButton } from '@/components/timer/StartStopButton'
import { CodingSessionList } from '@/components/timer/CodingSessionList'
import Section from '@/components/common/Section'
import HeroSection from '@/components/common/HeroSection'
import MetricCard from '@/components/cards/MetricCard'
import GlassCard from '@/components/cards/GlassCard'

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
    <div className="min-h-screen">
      {/* Hero Header */}
      <HeroSection
        title="⏱️ Coding Timer & DSA Tracker"
        subtitle="Track your coding sessions and DSA practice time"
        description="Build consistent habits and monitor your progress towards mastery."
        backgroundVariant="info"
      />

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Timer Display */}
        <GlassCard title="Session Timer">
          <TimerDisplay elapsedSeconds={elapsedSeconds} formatTime={formatTime} />
        </GlassCard>

        {/* Control Buttons */}
        <StartStopButton isRunning={isRunning} onStart={startTimer} onStop={stopTimer} onReset={resetTimer} />

        {/* Quick Stats */}
        {sessions.length > 0 && (
          <div>
            <Section title="📊 Your Stats" subtitle="Coding session metrics" />
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 mt-6">
              <MetricCard
                label="Total Hours"
                value={getTotalHours().toFixed(1)}
                icon="⏳"
                trend={{ direction: 'up', percentage: 10 }}
              />

              <MetricCard
                label="Avg Session"
                value={getAverageSessionMinutes().toFixed(0)}
                icon="📈"
                trend={{ direction: 'up', percentage: 5 }}
              />

              <MetricCard
                label="Sessions"
                value={sessions.length}
                icon="📋"
                trend={{ direction: 'up', percentage: 3 }}
              />

              <MetricCard
                label="Today"
                value={todayMinutes < 1 ? '0' : todayMinutes.toFixed(0)}
                icon="🔥"
                trend={todayMinutes > 0 ? { direction: 'up', percentage: 5 } : undefined}
              />
            </div>
          </div>
        )}

        {/* Sessions List */}
        <CodingSessionList sessions={sessions} formatTime={formatTime} onClear={clearSessions} />
      </div>
    </div>
  )
}

export default DSATracker
