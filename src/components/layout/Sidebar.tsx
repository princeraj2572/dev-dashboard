import { Link } from 'react-router-dom'

export const Sidebar = () => {
  return (
    <aside className="w-64 bg-slate-900 text-white p-6 flex flex-col">
      <div className="mb-12">
        <h1 className="text-2xl font-bold text-indigo-400">DevDash</h1>
      </div>

      <nav className="flex-1 space-y-4">
        <Link to="/" className="block px-4 py-2 rounded hover:bg-slate-800 transition">
          Dashboard
        </Link>
        <Link to="/analytics" className="block px-4 py-2 rounded hover:bg-slate-800 transition">
          Analytics
        </Link>
        <Link to="/dsa" className="block px-4 py-2 rounded hover:bg-slate-800 transition">
          DSA Tracker
        </Link>
        <Link to="/goals" className="block px-4 py-2 rounded hover:bg-slate-800 transition">
          Goals
        </Link>
        <Link to="/settings" className="block px-4 py-2 rounded hover:bg-slate-800 transition">
          Settings
        </Link>
      </nav>

      <div className="text-sm text-slate-400 border-t border-slate-700 pt-4">
        © 2026 Developer Dashboard
      </div>
    </aside>
  )
}

export default Sidebar
