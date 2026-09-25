import { useState } from 'react'
import { Sun, Moon } from 'lucide-react'
import { useDashboardStore } from '@/store/dashboardStore'
import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
import Alert from '@/components/common/Alert'
import PageHeader from '@/components/layout/PageHeader'

const panel = 'rounded-xl border border-line bg-surface p-5 sm:p-6'

export const Settings = () => {
  const store = useDashboardStore()
  const [githubUsername, setGithubUsername] = useState(store.githubUsername)
  const [leetcodeUsername, setLeetcodeUsername] = useState(store.leetcodeUsername)
  const [savedMessage, setSavedMessage] = useState('')
  const [showClearConfirm, setShowClearConfirm] = useState(false)

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    store.setGithubUsername(githubUsername.trim())
    store.setLeetcodeUsername(leetcodeUsername.trim())
    setSavedMessage('Settings saved.')
    setTimeout(() => setSavedMessage(''), 3000)
  }

  const handleClearSessions = () => {
    localStorage.removeItem('codingTimerState')
    setSavedMessage('All coding sessions cleared.')
    setShowClearConfirm(false)
    setTimeout(() => window.location.reload(), 1200)
  }

  const themes = [
    { id: 'light', label: 'Light', Icon: Sun },
    { id: 'dark', label: 'Dark', Icon: Moon },
  ] as const

  return (
    <>
      <PageHeader title="Settings" description="Choose which accounts to read from and how the app looks." />

      <div className="max-w-2xl space-y-6">
        {savedMessage && (
          <Alert type="success" onClose={() => setSavedMessage('')}>
            {savedMessage}
          </Alert>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          <section className={panel} aria-labelledby="accounts-heading">
            <h2 id="accounts-heading" className="text-lg font-semibold">
              Accounts
            </h2>
            <div className="mt-4 space-y-5">
              <Input
                label="GitHub username"
                value={githubUsername}
                onChange={setGithubUsername}
                placeholder="octocat"
                helperText="Used for commits, pull requests, languages and repositories."
              />
              <div className="rounded-lg bg-sunken p-3 text-sm text-subtle">
                A token is optional. Without one GitHub allows 60 requests an hour. To raise that, add{' '}
                <code className="rounded bg-surface px-1.5 py-0.5 text-[13px] text-ink">VITE_GITHUB_TOKEN</code> to{' '}
                <code className="rounded bg-surface px-1.5 py-0.5 text-[13px] text-ink">.env.local</code> and restart
                the dev server.
              </div>
              <Input
                label="LeetCode username"
                value={leetcodeUsername}
                onChange={setLeetcodeUsername}
                placeholder="your-leetcode-name"
                helperText="Used for solved problems, acceptance rate and ranking."
              />
            </div>
            <div className="mt-6">
              <Button type="submit">Save changes</Button>
            </div>
          </section>
        </form>

        <section className={panel} aria-labelledby="theme-heading">
          <h2 id="theme-heading" className="text-lg font-semibold">
            Theme
          </h2>
          <div className="mt-4 grid grid-cols-2 gap-2 sm:max-w-xs" role="radiogroup" aria-labelledby="theme-heading">
            {themes.map(({ id, label, Icon }) => (
              <button
                key={id}
                type="button"
                role="radio"
                aria-checked={store.theme === id}
                onClick={() => store.setTheme(id)}
                className={`flex h-11 items-center justify-center gap-2 rounded-lg border text-sm font-semibold transition-colors sm:h-10 ${
                  store.theme === id
                    ? 'border-brand bg-brand-soft text-brand'
                    : 'border-line text-subtle hover:bg-sunken hover:text-ink'
                }`}
              >
                <Icon className="size-4" aria-hidden="true" />
                {label}
              </button>
            ))}
          </div>
        </section>

        <section className={panel} aria-labelledby="sessions-heading">
          <h2 id="sessions-heading" className="text-lg font-semibold">
            Coding sessions
          </h2>
          <p className="mt-1 text-subtle">Delete every saved timer session. Your streak resets with them.</p>
          <div className="mt-4">
            {!showClearConfirm ? (
              <Button variant="secondary" onClick={() => setShowClearConfirm(true)}>
                Clear sessions
              </Button>
            ) : (
              <div className="rounded-lg bg-danger-soft p-4">
                <p className="text-sm font-semibold">Delete all sessions? This cannot be undone.</p>
                <div className="mt-3 flex gap-2">
                  <Button variant="danger" onClick={handleClearSessions}>
                    Delete sessions
                  </Button>
                  <Button variant="secondary" onClick={() => setShowClearConfirm(false)}>
                    Keep them
                  </Button>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  )
}

export default Settings
