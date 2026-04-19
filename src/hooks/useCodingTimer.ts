import { useState, useEffect, useCallback } from 'react'
import { CodingSession } from '@/types'
import { useDashboardStore } from '@/store/dashboardStore'

interface TimerState {
  isRunning: boolean
  elapsedSeconds: number
  sessions: CodingSession[]
}

export const useCodingTimer = () => {
  const store = useDashboardStore()
  const [state, setState] = useState<TimerState>(() => {
    const stored = localStorage.getItem('codingTimerState')
    if (stored) {
      return JSON.parse(stored)
    }
    return { isRunning: false, elapsedSeconds: 0, sessions: [] }
  })

  // Persist state to localStorage
  useEffect(() => {
    localStorage.setItem('codingTimerState', JSON.stringify(state))
  }, [state])

  // Timer interval
  useEffect(() => {
    if (!state.isRunning) return

    const interval = setInterval(() => {
      setState((prev) => ({
        ...prev,
        elapsedSeconds: prev.elapsedSeconds + 1,
      }))
    }, 1000)

    return () => clearInterval(interval)
  }, [state.isRunning])

  const startTimer = useCallback(() => {
    setState((prev) => ({ ...prev, isRunning: true }))
  }, [])

  const stopTimer = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isRunning: false,
      sessions:
        prev.elapsedSeconds > 60
          ? [
              ...prev.sessions,
              {
                id: Date.now().toString(),
                start: Date.now() - prev.elapsedSeconds * 1000,
                end: Date.now(),
                duration: prev.elapsedSeconds,
              },
            ]
          : prev.sessions,
      elapsedSeconds: 0,
    }))
  }, [])

  const resetTimer = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isRunning: false,
      elapsedSeconds: 0,
    }))
  }, [])

  const clearSessions = useCallback(() => {
    setState((prev) => ({
      ...prev,
      sessions: [],
    }))
  }, [])

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const getTotalHours = (): number => {
    return state.sessions.reduce((total, session) => total + session.duration, 0) / 3600
  }

  const getAverageSessionMinutes = (): number => {
    if (state.sessions.length === 0) return 0
    const totalMinutes = state.sessions.reduce((total, session) => total + session.duration, 0) / 60
    return totalMinutes / state.sessions.length
  }

  return {
    isRunning: state.isRunning,
    elapsedSeconds: state.elapsedSeconds,
    sessions: state.sessions,
    formatTime,
    startTimer,
    stopTimer,
    resetTimer,
    clearSessions,
    getTotalHours,
    getAverageSessionMinutes,
  }
}
