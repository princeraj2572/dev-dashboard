import { useEffect } from 'react'
import { useDashboardStore } from '@/store/dashboardStore'

export const useDarkMode = () => {
  const { theme, setTheme } = useDashboardStore()

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return { theme, toggleTheme }
}
