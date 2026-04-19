interface AnimatedCounterProps {
  from: number
  to: number
  duration?: number
  label?: string
  suffix?: string
  prefix?: string
  className?: string
}

import { useEffect, useState } from 'react'

export const AnimatedCounter = ({
  from,
  to,
  duration = 2000,
  label,
  suffix = '',
  prefix = '',
  className = '',
}: AnimatedCounterProps) => {
  const [count, setCount] = useState(from)

  useEffect(() => {
    let startTime: number | null = null
    let requestId: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = (timestamp - startTime) / duration
      const currentCount = Math.floor(from + (to - from) * Math.min(progress, 1))

      setCount(currentCount)

      if (progress < 1) {
        requestId = requestAnimationFrame(animate)
      }
    }

    requestId = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(requestId)
  }, [from, to, duration])

  return (
    <div className={className}>
      <div className="text-4xl font-bold text-gray-900 dark:text-white">
        {prefix}
        {count.toLocaleString()}
        {suffix}
      </div>
      {label && <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{label}</p>}
    </div>
  )
}

export default AnimatedCounter
