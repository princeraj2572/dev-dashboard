import { useState } from 'react'
import { useDashboardStore } from '@/store/dashboardStore'
import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
import Alert from '@/components/common/Alert'
import GlassCard from '@/components/cards/GlassCard'
import HeroSection from '@/components/common/HeroSection'

export const Settings = () => {
  const store = useDashboardStore()
  const [githubUsername, setGithubUsername] = useState(store.githubUsername)
  const [leetcodeUsername, setLeetcodeUsername] = useState(store.leetcodeUsername)
  const [savedMessage, setSavedMessage] = useState('')
  const [showClearConfirm, setShowClearConfirm] = useState(false)

  const handleSave = () => {
    store.setGithubUsername(githubUsername)
    store.setLeetcodeUsername(leetcodeUsername)
    setSavedMessage('Settings saved successfully!')
    setTimeout(() => setSavedMessage(''), 3000)
  }

  const handleClearSessions = () => {
    localStorage.removeItem('codingTimerState')
    setSavedMessage('All coding sessions cleared!')
    setShowClearConfirm(false)
    setTimeout(() => setSavedMessage(''), 3000)
    setTimeout(() => window.location.reload(), 1500)
  }

  return (
    <div className="min-h-screen">
      {/* Hero Header */}
      <HeroSection
        title="Settings ⚙️"
        subtitle="Configure your dashboard and preferences"
        description="Manage your GitHub and LeetCode accounts, customize appearance, and control your coding session data."
        backgroundVariant="primary"
      />

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Success Alert */}
        {savedMessage && (
          <Alert
            type="success"
            onClose={() => setSavedMessage('')}
            className="mb-6"
          >
            {savedMessage}
          </Alert>
        )}

        {/* GitHub Settings */}
        <GlassCard title="🐙 GitHub Settings" className="mb-6">
          <div className="space-y-4">
            <Input
              label="GitHub Username"
              value={githubUsername}
              onChange={setGithubUsername}
              placeholder="e.g., octocat"
              helperText="Your GitHub username for fetching commits and PR statistics."
            />

            <div className="bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg p-4">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                🔐 GitHub Personal Access Token
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Token is read from environment variable (VITE_GITHUB_TOKEN). Never share your token!
              </p>
              <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded p-3 mb-4">
                <p className="text-xs font-mono text-gray-600 dark:text-gray-400">
                  Token stored in .env.local (not committed to git)
                </p>
              </div>
              <a
                href="https://github.com/settings/tokens"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 dark:text-indigo-400 hover:underline text-sm font-medium"
              >
                Create Personal Access Token →
              </a>
            </div>
          </div>
        </GlassCard>

        {/* LeetCode Settings */}
        <GlassCard title="🎯 LeetCode Settings" className="mb-6">
          <Input
            label="LeetCode Username"
            value={leetcodeUsername}
            onChange={setLeetcodeUsername}
            placeholder="e.g., yourletcode"
            helperText="Your LeetCode username for tracking DSA progress."
          />
        </GlassCard>

        {/* Theme Settings */}
        <GlassCard title="🌓 Appearance" className="mb-6">
          <div className="grid grid-cols-2 gap-3">
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
        </GlassCard>

        {/* Coding Timer Settings */}
        <GlassCard title="⏱️ Coding Timer" className="mb-6">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Manage your coding session data. This action cannot be undone.
          </p>
          {!showClearConfirm ? (
            <Button
              variant="danger"
              fullWidth
              onClick={() => setShowClearConfirm(true)}
            >
              🗑️ Clear All Coding Sessions
            </Button>
          ) : (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <p className="font-semibold text-red-900 dark:text-red-200 mb-4">
                Are you sure? This cannot be undone.
              </p>
              <div className="flex gap-2">
                <Button
                  variant="danger"
                  onClick={handleClearSessions}
                  className="flex-1"
                >
                  Yes, Clear Sessions
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => setShowClearConfirm(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </GlassCard>

        {/* Save Button */}
        <Button
          onClick={handleSave}
          fullWidth
          className="mb-8 py-3 text-lg"
        >
          💾 Save Settings
        </Button>

        {/* Help Section */}
        <Alert
          type="info"
          title="📚 How to Set Up"
        >
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Create a GitHub Personal Access Token</li>
            <li>Copy the token and add it to your .env.local file as VITE_GITHUB_TOKEN</li>
            <li>Enter your GitHub username above</li>
            <li>Click Save Settings</li>
            <li>Go to Dashboard to see your stats!</li>
            <li>Use the Coding Timer on DSA Tracker page to track your practice sessions</li>
          </ol>
        </Alert>
      </div>
    </div>
  )
}

export default Settings
