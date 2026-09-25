import { useCodingTimer } from '@/hooks/useCodingTimer'
import { useDashboardStore } from '@/store/dashboardStore'
import { minutesPerDay } from '@/utils/timeStats'
import { TimerDisplay } from '@/components/timer/TimerDisplay'
import { StartStopButton } from '@/components/timer/StartStopButton'
import { CodingSessionList } from '@/components/timer/CodingSessionList'
import TodayTarget from '@/components/timer/TodayTarget'
import CodingTimeChart from '@/components/charts/CodingTimeChart'
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
  const { dailyTargetMinutes } = useDashboardStore()

  const week = minutesPerDay(sessions, 7)
  // Count the session in progress so the target moves while you work.
  const todayMinutes = week[week.length - 1].minutes + (isRunning ? elapsedSeconds / 60 : 0)

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

        <div className="grid gap-6 lg:grid-cols-12">
          <TodayTarget minutes={todayMinutes} target={dailyTargetMinutes} className="lg:col-span-5" />

          <section
            aria-label="Coding time this week"
            className="rounded-xl border border-line bg-surface p-5 sm:p-6 lg:col-span-7"
          >
            <h2 className="text-lg font-semibold">Last 7 days</h2>
            <p className="mb-3 text-sm text-subtle">Dashed line is your daily target</p>
            <CodingTimeChart days={week} target={dailyTargetMinutes} />
          </section>
        </div>

        {sessions.length > 0 && (
          <MetricStrip
            items={[
              { label: 'Sessions', value: sessions.length },
              { label: 'Total time', value: `${getTotalHours().toFixed(1)}h` },
              { label: 'Average session', value: `${getAverageSessionMinutes().toFixed(0)}m` },
              { label: 'Days on target', value: week.filter((d) => d.minutes >= dailyTargetMinutes).length, note: 'of the last 7' },
            ]}
          />
        )}

        <CodingSessionList sessions={sessions} formatTime={formatTime} onClear={clearSessions} />
      </div>
    </>
  )
}

export default DSATracker
