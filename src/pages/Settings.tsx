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

  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Settings</h1>
        <p className="text-gray-600">Configure your usernames and preferences</p>
      </div>

      {savedMessage && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-green-700">{savedMessage}</p>
        </div>
      )}

      <div className="bg-white rounded-lg shadow p-8 space-y-8">
        {/* GitHub Settings */}
        <div>
          <h2 className="text-2xl font-bold mb-4">GitHub</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                GitHub Username
              </label>
              <input
                type="text"
                value={githubUsername}
                onChange={(e) => setGithubUsername(e.target.value)}
                placeholder="e.g., octocat"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <p className="mt-2 text-sm text-gray-500">
                Your GitHub username for fetching commits and PR statistics.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                GitHub Personal Access Token
              </label>
              <p className="text-sm text-gray-600 mb-4">
                ⚠️ Token is read from environment variable (VITE_GITHUB_TOKEN). Never share your token!
              </p>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p className="text-sm font-mono text-gray-600">
                  Token stored in .env.local (not committed to git)
                </p>
              </div>
              <a
                href="https://github.com/settings/tokens"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-indigo-600 hover:text-indigo-700 text-sm font-medium"
              >
                Create Personal Access Token →
              </a>
            </div>
          </div>
        </div>

        {/* LeetCode Settings */}
        <div className="border-t pt-8">
          <h2 className="text-2xl font-bold mb-4">LeetCode</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              LeetCode Username
            </label>
            <input
              type="text"
              value={leetcodeUsername}
              onChange={(e) => setLeetcodeUsername(e.target.value)}
              placeholder="e.g., yourletcode"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <p className="mt-2 text-sm text-gray-500">
              Your LeetCode username for tracking DSA progress.
            </p>
          </div>
        </div>

        {/* Theme Settings */}
        <div className="border-t pt-8">
          <h2 className="text-2xl font-bold mb-4">Appearance</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
            <select
              value={store.theme}
              onChange={(e) => store.setTheme(e.target.value as 'light' | 'dark')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
        </div>

        {/* Save Button */}
        <div className="border-t pt-8">
          <button
            onClick={handleSave}
            className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Save Settings
          </button>
        </div>
      </div>

      {/* Help Section */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-bold text-blue-900 mb-3">📚 How to Set Up</h3>
        <ol className="list-decimal list-inside space-y-2 text-blue-900 text-sm">
          <li>Create a GitHub Personal Access Token (see link above)</li>
          <li>Copy the token and add it to your .env.local file as VITE_GITHUB_TOKEN</li>
          <li>Enter your GitHub username above</li>
          <li>Click Save Settings</li>
          <li>Go to Dashboard to see your stats!</li>
        </ol>
      </div>
    </div>
  )
}

export default Settings
