import { useState } from 'react'
import { useDashboardStore } from '@/store/dashboardStore'

export const Settings = () => {
  const store = useDashboardStore()
  const [githubUsername, setGithubUsername] = useState(store.githubUsername)
  const [leetcodeUsername, setLeetcodeUsername] = useState(store.leetcodeUsername)
  const [savedMessage, setSavedMessage] = useState('')

  const handleSave = () => {
    store.setGithubUsername(githubUsername)
    store.setLeetcodeUsername(leetcodeUsername)
    setSavedMessage('Settings saved successfully!')
    setTimeout(() => setSavedMessage(''), 3000)
  }

  const handleClearSessions = () => {
    if (window.confirm('Are you sure you want to clear all coding sessions? This cannot be undone.')) {
      localStorage.removeItem('codingTimerState')
      setSavedMessage('All coding sessions cleared!')
      setTimeout(() => setSavedMessage(''), 3000)
      window.location.reload()
    }
  }

  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 dark:text-white">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400">Configure your usernames and preferences</p>
      </div>

      {savedMessage && (
        <div className="mb-6 bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-lg p-4">
          <p className="text-green-700 dark:text-green-200">{savedMessage}</p>
        </div>
      )}

      <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-8 space-y-8">
        {/* GitHub Settings */}
        <div className="border-b border-gray-200 dark:border-gray-700 pb-8">
          <h2 className="text-2xl font-bold mb-4 dark:text-white">GitHub</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                GitHub Username
              </label>
              <input
                type="text"
                value={githubUsername}
                onChange={(e) => setGithubUsername(e.target.value)}
                placeholder="e.g., octocat"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Your GitHub username for fetching commits and PR statistics.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                GitHub Personal Access Token
              </label>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                ⚠️ Token is read from environment variable (VITE_GITHUB_TOKEN). Never share your token!
              </p>
              <div className="bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                <p className="text-sm font-mono text-gray-600 dark:text-gray-300">
                  Token stored in .env.local (not committed to git)
                </p>
              </div>
              <a
                href="https://github.com/settings/tokens"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 text-sm font-medium"
              >
                Create Personal Access Token →
              </a>
            </div>
          </div>
        </div>

        {/* LeetCode Settings */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
          <h2 className="text-2xl font-bold mb-4 dark:text-white">LeetCode</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              LeetCode Username
            </label>
            <input
              type="text"
              value={leetcodeUsername}
              onChange={(e) => setLeetcodeUsername(e.target.value)}
              placeholder="e.g., yourletcode"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Your LeetCode username for tracking DSA progress.
            </p>
          </div>
        </div>

        {/* Coding Timer Settings */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
          <h2 className="text-2xl font-bold mb-4 dark:text-white">Coding Timer</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Session Management</label>
            <button
              onClick={handleClearSessions}
              className="w-full bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 px-4 py-3 rounded-lg font-semibold hover:bg-red-200 dark:hover:bg-red-800 transition border border-red-300 dark:border-red-700"
            >
              🗑️ Clear All Coding Sessions
            </button>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              This will delete all your saved coding sessions. This action cannot be undone.
            </p>
          </div>
        </div>

        {/* Theme Settings */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
          <h2 className="text-2xl font-bold mb-4 dark:text-white">Appearance</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                🌓 Theme Preference
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => store.setTheme('light')}
                  className={`p-4 rounded-lg border-2 transition font-semibold ${
                    store.theme === 'light'
                      ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900 text-indigo-900 dark:text-indigo-100'
                      : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  ☀️ Light
                </button>
                <button
                  onClick={() => store.setTheme('dark')}
                  className={`p-4 rounded-lg border-2 transition font-semibold ${
                    store.theme === 'dark'
                      ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900 text-indigo-900 dark:text-indigo-100'
                      : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  🌙 Dark
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
          <button
            onClick={handleSave}
            className="w-full bg-indigo-600 dark:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 dark:hover:bg-indigo-600 transition"
          >
            Save Settings
          </button>
        </div>
      </div>

      {/* Help Section */}
      <div className="mt-8 bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
        <h3 className="font-bold text-blue-900 dark:text-blue-100 mb-3">📚 How to Set Up</h3>
        <ol className="list-decimal list-inside space-y-2 text-blue-900 dark:text-blue-200 text-sm">
          <li>Create a GitHub Personal Access Token (see link above)</li>
          <li>Copy the token and add it to your .env.local file as VITE_GITHUB_TOKEN</li>
          <li>Enter your GitHub username above</li>
          <li>Click Save Settings</li>
          <li>Go to Dashboard to see your stats!</li>
          <li>Use the Coding Timer on DSA Tracker page to track your practice sessions</li>
        </ol>
      </div>
    </div>
  )
}

export default Settings
