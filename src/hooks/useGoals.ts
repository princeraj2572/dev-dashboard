import { useState, useEffect, useCallback } from 'react'
import type { Goal } from '@/types'

export const useGoals = () => {
  const [goals, setGoals] = useState<Goal[]>(() => {
    const stored = localStorage.getItem('goals')
    if (stored) {
      return JSON.parse(stored)
    }
    return []
  })

  // Persist goals to localStorage
  useEffect(() => {
    localStorage.setItem('goals', JSON.stringify(goals))
  }, [goals])

  const addGoal = useCallback(
    (goal: Omit<Goal, 'id'>) => {
      const newGoal: Goal = {
        ...goal,
        id: Date.now().toString(),
      }
      setGoals((prev) => [...prev, newGoal])
      return newGoal
    },
    []
  )

  const updateGoal = useCallback((id: string, updates: Partial<Goal>) => {
    setGoals((prev) =>
      prev.map((goal) => (goal.id === id ? { ...goal, ...updates } : goal))
    )
  }, [])

  const deleteGoal = useCallback((id: string) => {
    setGoals((prev) => prev.filter((goal) => goal.id !== id))
  }, [])

  const updateProgress = useCallback((id: string, current: number) => {
    setGoals((prev) =>
      prev.map((goal) => (goal.id === id ? { ...goal, current } : goal))
    )
  }, [])

  const getCompletedGoals = useCallback(() => {
    return goals.filter((g) => g.current >= g.target)
  }, [goals])

  const getGoalProgress = useCallback((id: string) => {
    const goal = goals.find((g) => g.id === id)
    if (!goal) return 0
    return Math.min((goal.current / goal.target) * 100, 100)
  }, [goals])

  return {
    goals,
    addGoal,
    updateGoal,
    deleteGoal,
    updateProgress,
    getCompletedGoals,
    getGoalProgress,
  }
}
