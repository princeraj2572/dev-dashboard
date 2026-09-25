interface TimerDisplayProps {
  elapsedSeconds: number
  formatTime: (seconds: number) => string
  isRunning?: boolean
}

export const TimerDisplay = ({ elapsedSeconds, formatTime, isRunning = false }: TimerDisplayProps) => {
  return (
    <div className="py-4 sm:py-8">
      <p className="flex items-center gap-2 text-sm text-subtle" role="status">
        <span
          aria-hidden="true"
          className={`size-2 rounded-full ${isRunning ? 'animate-pulse bg-brand' : 'bg-line'}`}
        />
        {isRunning ? 'Session running' : 'Ready when you are'}
      </p>
      <p
        className="font-display mt-3 text-7xl font-extrabold leading-none tracking-tighter tabular-nums sm:text-9xl"
        aria-label={`Elapsed time ${formatTime(elapsedSeconds)}`}
      >
        {formatTime(elapsedSeconds)}
      </p>
    </div>
  )
}

export default TimerDisplay
