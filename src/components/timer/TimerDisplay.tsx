interface TimerDisplayProps {
  elapsedSeconds: number
  formatTime: (seconds: number) => string
}

export const TimerDisplay = ({ elapsedSeconds, formatTime }: TimerDisplayProps) => {
  const displayTime = formatTime(elapsedSeconds)

  return (
    <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-lg p-8 text-center">
      <p className="text-gray-200 text-sm font-medium mb-2">Coding Session</p>
      <div className="text-6xl font-bold text-white font-mono mb-6">{displayTime}</div>
      <div className="text-indigo-200 space-y-2">
        <p className="text-lg">Keep coding! 🚀</p>
      </div>
    </div>
  )
}

export default TimerDisplay
