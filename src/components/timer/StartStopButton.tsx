interface StartStopButtonProps {
  isRunning: boolean
  onStart: () => void
  onStop: () => void
  onReset: () => void
}

export const StartStopButton = ({ isRunning, onStart, onStop, onReset }: StartStopButtonProps) => {
  return (
    <div className="flex gap-4 justify-center">
      {!isRunning ? (
        <button
          onClick={onStart}
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition flex items-center gap-2"
        >
          ▶ Start Session
        </button>
      ) : (
        <button
          onClick={onStop}
          className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition flex items-center gap-2"
        >
          ⏹ Stop Session
        </button>
      )}

      <button
        onClick={onReset}
        className="bg-gray-400 hover:bg-gray-500 text-white px-8 py-3 rounded-lg font-semibold transition"
      >
        ↻ Reset
      </button>
    </div>
  )
}

export default StartStopButton
