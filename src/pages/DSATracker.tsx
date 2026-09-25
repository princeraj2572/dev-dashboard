import { useCodingTimer } from '@/hooks/useCodingTimer'
import { TimerDisplay } from '@/components/timer/TimerDisplay'
import { StartStopButton } from '@/components/timer/StartStopButton'
import { CodingSessionList } from '@/components/timer/CodingSessionList'
import MetricStrip from '@/components/cards/MetricStrip'
import PageHeader from '@/components/layout/PageHeader'

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

  const todayString = new Date().toDateString()
  const todayMinutes =
    sessions.filter((s) => new Date(s.end).toDateString() === todayString).reduce((sum, s) => sum + s.duration, 0) / 60

  return (
    <>
      <PageHeader
        title="Coding timer"
        description="Time your DSA practice and project work. Finished sessions build your streak."
      />

      <div className="space-y-6">
        <section aria-label="Session timer" className="rounded-xl border border-line bg-surface p-5 sm:p-8">
          <TimerDisplay elapsedSeconds={elapsedSeconds} formatTime={formatTime} isRunning={isRunning} />
          <div className="mt-4">
            <StartStopButton isRunning={isRunning} onStart={startTimer} onStop={stopTimer} onReset={resetTimer} />
          </div>
        </section>

        {sessions.length > 0 && (
          <MetricStrip
            items={[
              { label: 'Today', value: `${Math.round(todayMinutes)}m` },
              { label: 'Sessions', value: sessions.length },
              { label: 'Total time', value: `${getTotalHours().toFixed(1)}h` },
              { label: 'Average session', value: `${getAverageSessionMinutes().toFixed(0)}m` },
            ]}
          />
        )}

        <CodingSessionList sessions={sessions} formatTime={formatTime} onClear={clearSessions} />
      </div>
    </>
  )
}

export default DSATracker
