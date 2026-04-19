import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

interface NavItem {
  label: string
  href: string
  icon: string
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/', icon: '📊' },
  { label: 'Analytics', href: '/analytics', icon: '📈' },
  { label: 'DSA Tracker', href: '/dsa', icon: '🎯' },
  { label: 'Goals', href: '/goals', icon: '🏆' },
  { label: 'Settings', href: '/settings', icon: '⚙️' },
]

export const Sidebar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const location = useLocation()

  const isActive = (href: string) => {
    return location.pathname === href
  }

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        aria-label="Toggle navigation menu"
        className="hidden md:hidden fixed top-4 left-4 z-40 p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
      >
        ☰
      </button>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsMobileOpen(false)}
          role="presentation"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:relative w-64 h-screen bg-gradient-to-b from-slate-900 to-slate-950 dark:from-slate-950 dark:to-slate-950 text-white p-6 flex flex-col transition-transform duration-300 z-40
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        {/* Logo */}
        <div className="mb-8">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🚀</span>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              DevDash
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-2">Developer Productivity Hub</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => setIsMobileOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                ${
                  isActive(item.href)
                    ? 'bg-indigo-600 text-white font-semibold shadow-lg'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }
              `}
              aria-current={isActive(item.href) ? 'page' : undefined}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-slate-700 pt-4 space-y-2">
          <p className="text-xs text-slate-500">© 2026 Developer Dashboard</p>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
