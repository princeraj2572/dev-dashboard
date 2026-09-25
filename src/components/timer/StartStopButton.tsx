import { Play, Square, RotateCcw } from 'lucide-react'
import Button from '@/components/common/Button'

interface StartStopButtonProps {
  isRunning: boolean
  onStart: () => void
  onStop: () => void
  onReset: () => void
}

export const StartStopButton = ({ isRunning, onStart, onStop, onReset }: StartStopButtonProps) => {
  return (
    <div className="flex flex-wrap gap-3">
      {!isRunning ? (
        <Button size="lg" onClick={onStart}>
          <Play aria-hidden="true" />
          Start session
        </Button>
      ) : (
        <Button size="lg" variant="danger" onClick={onStop}>
          <Square aria-hidden="true" />
          Stop and save
        </Button>
      )}

      <Button size="lg" variant="secondary" onClick={onReset}>
        <RotateCcw aria-hidden="true" />
        Reset
      </Button>
    </div>
  )
}

export default StartStopButton
