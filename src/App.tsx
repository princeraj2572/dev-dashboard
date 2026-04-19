import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useDarkMode } from '@/hooks/useDarkMode'
import WelcomePage from '@/pages/WelcomePage'
import Dashboard from '@/pages/Dashboard'
import Analytics from '@/pages/Analytics'
import DSATracker from '@/pages/DSATracker'
import Goals from '@/pages/Goals'
import Settings from '@/pages/Settings'
import ComponentShowcase from '@/pages/ComponentShowcase'
import Layout from '@/components/layout/Layout'

function App() {
  useDarkMode()

  return (
    <Router>
      <Routes>
        <Route path="/welcome" element={<WelcomePage />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/dsa" element={<DSATracker />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/components" element={<ComponentShowcase />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App
