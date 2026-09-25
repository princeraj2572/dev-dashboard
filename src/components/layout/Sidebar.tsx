import { NavLink } from 'react-router-dom'
import { LayoutDashboard, LineChart, Timer, Target, Settings, Sun, Moon } from 'lucide-react'
import { useDashboardStore } from '@/store/dashboardStore'
import GitSyncStatus from '@/components/common/GitSyncStatus'

const navItems = [
  { label: 'Dashboard', href: '/', icon: LayoutDashboard },
  { label: 'Analytics', href: '/analytics', icon: LineChart },
  { label: 'Timer', href: '/dsa', icon: Timer },
  { label: 'Goals', href: '/goals', icon: Target },
  { label: 'Settings', href: '/settings', icon: Settings },
]

export const Sidebar = () => {
  const { theme, setTheme } = useDashboardStore()
  const nextTheme = theme === 'dark' ? 'light' : 'dark'
  const ThemeIcon = theme === 'dark' ? Sun : Moon

  const themeButton = (
    <button
      type="button"
      onClick={() => setTheme(nextTheme)}
      aria-label={`Switch to ${nextTheme} theme`}
      className="flex h-10 items-center gap-3 rounded-lg px-3 text-subtle transition-colors hover:bg-sunken hover:text-ink"
    >
      <ThemeIcon className="size-[18px] shrink-0" aria-hidden="true" />
      <span className="hidden text-sm font-medium lg:inline">
        {theme === 'dark' ? 'Light theme' : 'Dark theme'}
      </span>
    </button>
  )

  return (
    <>
      {/* Tablet and desktop: side rail. Icon-only until lg. */}
      <aside className="sticky top-0 hidden h-screen w-[72px] shrink-0 flex-col border-r border-line bg-surface px-3 py-5 md:flex lg:w-60 lg:px-4">
        <div className="mb-8 flex h-10 items-center gap-2.5 px-2">
          <span
            aria-hidden="true"
            className="grid size-7 shrink-0 grid-cols-2 gap-[3px] rounded-md"
          >
            <span className="rounded-[3px] bg-cell-1" />
            <span className="rounded-[3px] bg-cell-3" />
            <span className="rounded-[3px] bg-cell-2" />
            <span className="rounded-[3px] bg-cell-4" />
          </span>
          <span className="font-display hidden text-xl font-bold tracking-tight lg:inline">DevDash</span>
        </div>

        <nav aria-label="Main" className="flex flex-1 flex-col gap-1">
          {navItems.map(({ label, href, icon: Icon }) => (
            <NavLink
              key={href}
              to={href}
              end={href === '/'}
              title={label}
              className={({ isActive }) =>
                `flex h-10 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-brand-soft text-brand'
                    : 'text-subtle hover:bg-sunken hover:text-ink'
                }`
              }
            >
              <Icon className="size-[18px] shrink-0" aria-hidden="true" />
              <span className="hidden lg:inline">{label}</span>
            </NavLink>
          ))}
        </nav>

        <GitSyncStatus variant="compact" />
        {themeButton}
      </aside>

      {/* Phone: bottom tab bar. */}
      <nav
        aria-label="Main"
        className="fixed inset-x-0 bottom-0 z-40 flex border-t border-line bg-surface pb-[env(safe-area-inset-bottom)] md:hidden"
      >
        {navItems.map(({ label, href, icon: Icon }) => (
          <NavLink
            key={href}
            to={href}
            end={href === '/'}
            className={({ isActive }) =>
              `flex min-h-14 flex-1 flex-col items-center justify-center gap-1 text-[11px] font-medium transition-colors ${
                isActive ? 'text-brand' : 'text-subtle'
              }`
            }
          >
            <Icon className="size-5" aria-hidden="true" />
            {label}
          </NavLink>
        ))}
      </nav>
    </>
  )
}

export default Sidebar
