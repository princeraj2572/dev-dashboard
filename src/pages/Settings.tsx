import { useState } from 'react'
import { useDashboardStore } from '@/store/dashboardStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import Alert from '@/components/common/Alert'
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
        <Card className="mb-5">
          <CardHeader>
            <CardTitle className="text-lg">🐙 GitHub</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Username</label>
              <Input
                value={githubUsername}
                onChange={(e) => setGithubUsername(e.target.value)}
                placeholder="e.g., octocat"
              />
              <p className="text-xs text-muted-foreground mt-1">Your GitHub username for stats</p>
            </div>
            <div className="p-3 bg-accent rounded-lg border border-border">
              <p className="text-xs font-medium mb-1">🔐 Token Setup</p>
              <p className="text-xs text-muted-foreground">
                Add <code className="bg-background px-1 rounded">VITE_GITHUB_TOKEN</code> to <code className="bg-background px-1 rounded">.env.local</code>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* LeetCode Settings */}
        <Card className="mb-5">
          <CardHeader>
            <CardTitle className="text-lg">🎯 LeetCode</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Username</label>
              <Input
                value={leetcodeUsername}
                onChange={(e) => setLeetcodeUsername(e.target.value)}
                placeholder="e.g., yourletcode"
              />
              <p className="text-xs text-muted-foreground mt-1">Your LeetCode username for DSA tracking</p>
            </div>
          </CardContent>
        </Card>

        {/* Appearance */}
        <Card className="mb-5">
          <CardHeader>
            <CardTitle className="text-lg">🌓 Theme</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={() => store.setTheme('light')}
                variant={store.theme === 'light' ? 'default' : 'outline'}
              >
                ☀️ Light
              </Button>
              <Button
                onClick={() => store.setTheme('dark')}
                variant={store.theme === 'dark' ? 'default' : 'outline'}
              >
                🌙 Dark
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Coding Timer */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">⏱️ Coding Sessions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">Clear all your saved coding session data.</p>
            {!showClearConfirm ? (
              <Button
                variant="destructive"
                onClick={() => setShowClearConfirm(true)}
                className="w-full"
              >
                🗑️ Clear Sessions
              </Button>
            ) : (
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                <p className="font-semibold text-destructive text-sm mb-3">⚠️ Confirm deletion. This cannot be undone.</p>
                <div className="flex gap-2">
                  <Button variant="destructive" onClick={handleClearSessions} className="flex-1">
                    Delete
                  </Button>
                  <Button variant="outline" onClick={() => setShowClearConfirm(false)} className="flex-1">
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Save Button */}
        <Button onClick={handleSave} className="w-full py-2 h-auto">
          💾 Save Settings
        </Button>
      </div>
    </div>
  )
}

export default Settings
