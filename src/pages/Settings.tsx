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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Hero Header */}
      <HeroSection
        title="Settings ⚙️"
        subtitle="Configure your dashboard"
        description="Personalize your experience and manage your accounts."
        backgroundVariant="primary"
      />

      <div className="max-w-2xl mx-auto px-4 py-12">
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
        <GlassCard title="🐙 GitHub" className="mb-5">
          <Input
            label="Username"
            value={githubUsername}
            onChange={setGithubUsername}
            placeholder="e.g., octocat"
            helperText="Your GitHub username for stats"
          />
          <div className="mt-4 p-3 bg-indigo-50 dark:bg-indigo-950 rounded-lg border border-indigo-200 dark:border-indigo-800">
            <p className="text-xs font-medium text-indigo-900 dark:text-indigo-300 mb-1">
              🔐 Token Setup
            </p>
            <p className="text-xs text-indigo-700 dark:text-indigo-400">
              Add <code className="bg-white dark:bg-slate-800 px-1 rounded">VITE_GITHUB_TOKEN</code> to <code className="bg-white dark:bg-slate-800 px-1 rounded">.env.local</code>
            </p>
          </div>
        </GlassCard>

        {/* LeetCode Settings */}
        <GlassCard title="🎯 LeetCode" className="mb-5">
          <Input
            label="Username"
            value={leetcodeUsername}
            onChange={setLeetcodeUsername}
            placeholder="e.g., yourletcode"
            helperText="Your LeetCode username for DSA tracking"
          />
        </GlassCard>

        {/* Appearance */}
        <GlassCard title="🌓 Theme" className="mb-5">
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => store.setTheme('light')}
              className={`p-3 rounded-lg border-2 transition duration-200 font-medium text-sm ${
                store.theme === 'light'
                  ? 'border-indigo-500 bg-indigo-100 dark:bg-indigo-900 text-indigo-900 dark:text-indigo-100 shadow-md'
                  : 'border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-700 text-gray-600 dark:text-gray-300 hover:border-indigo-300 dark:hover:border-indigo-600'
              }`}
            >
              ☀️ Light
            </button>
            <button
              onClick={() => store.setTheme('dark')}
              className={`p-3 rounded-lg border-2 transition duration-200 font-medium text-sm ${
                store.theme === 'dark'
                  ? 'border-indigo-500 bg-indigo-100 dark:bg-indigo-900 text-indigo-900 dark:text-indigo-100 shadow-md'
                  : 'border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-700 text-gray-600 dark:text-gray-300 hover:border-indigo-300 dark:hover:border-indigo-600'
              }`}
            >
              🌙 Dark
            </button>
          </div>
        </GlassCard>

        {/* Coding Timer */}
        <GlassCard title="⏱️ Coding Sessions" className="mb-6">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            Clear all your saved coding session data.
          </p>
          {!showClearConfirm ? (
            <Button
              variant="danger"
              fullWidth
              onClick={() => setShowClearConfirm(true)}
            >
              🗑️ Clear Sessions
            </Button>
          ) : (
            <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <p className="font-semibold text-red-900 dark:text-red-300 mb-3 text-sm">
                ⚠️ Confirm deletion. This cannot be undone.
              </p>
              <div className="flex gap-2">
                <Button variant="danger" onClick={handleClearSessions} className="flex-1">
                  Delete
                </Button>
                <Button variant="secondary" onClick={() => setShowClearConfirm(false)} className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </GlassCard>

        {/* Save Button */}
        <Button onClick={handleSave} fullWidth className="mb-8 py-3 font-semibold">
          💾 Save Settings
        </Button>
      </div>
    </div>
  )
}

export default Settings
