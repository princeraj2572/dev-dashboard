import { useState, useEffect, useCallback } from 'react'
import { type CodingSession } from '@/types'

interface TimerState {
  isRunning: boolean
  /** When the current run began (ms). Elapsed time is derived from it, so it survives navigation and reloads. */
  startedAt: number | null
  /** Seconds counted before the current run began. */
  accumulated: number
  sessions: CodingSession[]
}

const STORAGE_KEY = 'codingTimerState'
const MIN_SESSION_SECONDS = 60

const emptyState = (): TimerState => ({ isRunning: false, startedAt: null, accumulated: 0, sessions: [] })

const loadState = (): TimerState => {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null')
    if (raw && typeof raw === 'object') {
      const startedAt = typeof raw.startedAt === 'number' ? raw.startedAt : null
      // Older saves kept a per-second counter and no start time; treat a running one as stopped.
      const isRunning = !!raw.isRunning && startedAt !== null
      return {
        isRunning,
        startedAt: isRunning ? startedAt : null,
        accumulated:
          typeof raw.accumulated === 'number' ? raw.accumulated : Number(raw.elapsedSeconds) || 0,
        sessions: Array.isArray(raw.sessions) ? raw.sessions : [],
      }
    }
  } catch {
    // Corrupt data: start clean.
  }
  return emptyState()
}

const elapsedAt = (state: TimerState, now: number) =>
  state.accumulated +
  (state.isRunning && state.startedAt !== null ? Math.max(0, Math.floor((now - state.startedAt) / 1000)) : 0)

export const useCodingTimer = () => {
  const [state, setState] = useState<TimerState>(loadState)
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  // Re-render once a second while running; the value itself comes from the clock, not the tick count.
  useEffect(() => {
    if (!state.isRunning) return
    const interval = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(interval)
  }, [state.isRunning])

  const startTimer = useCallback(() => {
    const started = Date.now()
    setNow(started)
    setState((prev) => (prev.isRunning ? prev : { ...prev, isRunning: true, startedAt: started }))
  }, [])

  const stopTimer = useCallback(() => {
    const ended = Date.now()
    setState((prev) => {
      const elapsed = elapsedAt(prev, ended)
      return {
        ...prev,
        isRunning: false,
        startedAt: null,
        accumulated: 0,
        sessions:
          elapsed > MIN_SESSION_SECONDS
            ? [
                ...prev.sessions,
                { id: ended.toString(), start: ended - elapsed * 1000, end: ended, duration: elapsed },
              ]
            : prev.sessions,
      }
    })
  }, [])

  const resetTimer = useCallback(() => {
    setState((prev) => ({ ...prev, isRunning: false, startedAt: null, accumulated: 0 }))
  }, [])

  const clearSessions = useCallback(() => {
    setState((prev) => ({ ...prev, sessions: [] }))
  }, [])

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`
  }

  const getTotalHours = (): number =>
    state.sessions.reduce((total, session) => total + session.duration, 0) / 3600

  const getAverageSessionMinutes = (): number => {
    if (state.sessions.length === 0) return 0
    const totalMinutes = state.sessions.reduce((total, session) => total + session.duration, 0) / 60
    return totalMinutes / state.sessions.length
  }

  return {
    isRunning: state.isRunning,
    elapsedSeconds: elapsedAt(state, now),
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
