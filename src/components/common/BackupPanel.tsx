import { useRef, useState } from 'react'
import { Download, Upload } from 'lucide-react'
import { applyBackup, downloadBackup, parseBackup, type BackupFile } from '@/utils/backup'
import Button from '@/components/common/Button'
import Alert from '@/components/common/Alert'

export const BackupPanel = () => {
  const fileInput = useRef<HTMLInputElement>(null)
  const [pending, setPending] = useState<BackupFile | null>(null)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')

  const handleExport = () => {
    downloadBackup()
    setError('')
    setNotice('Backup downloaded.')
  }

  const handleFile = async (file: File | undefined) => {
    setNotice('')
    setPending(null)
    if (!file) return
    const result = parseBackup(await file.text())
    if (result.ok) {
      setError('')
      setPending(result.backup)
    } else {
      setError(result.error)
    }
    if (fileInput.current) fileInput.current.value = ''
  }

  const handleRestore = () => {
    if (!pending) return
    applyBackup(pending)
    window.location.reload()
  }

  return (
    <section className="rounded-xl border border-line bg-surface p-5 sm:p-6" aria-labelledby="backup-heading">
      <h2 id="backup-heading" className="text-lg font-semibold">
        Backup
      </h2>
      <p className="mt-1 text-subtle">
        Your goals, sessions and settings live only in this browser. Save a copy to keep them safe or move them to
        another device.
      </p>

      <div className="mt-4 flex flex-wrap gap-3">
        <Button variant="secondary" onClick={handleExport}>
          <Download aria-hidden="true" />
          Export backup
        </Button>
        <Button variant="secondary" onClick={() => fileInput.current?.click()}>
          <Upload aria-hidden="true" />
          Import backup
        </Button>
        <input
          ref={fileInput}
          type="file"
          accept="application/json,.json"
          className="sr-only"
          tabIndex={-1}
          aria-label="Choose a DevDash backup file"
          onChange={(e) => void handleFile(e.target.files?.[0])}
        />
      </div>

      {notice && <Alert type="success" className="mt-4">{notice}</Alert>}
      {error && (
        <Alert type="error" title="Could not import that file" className="mt-4">
          {error}
        </Alert>
      )}

      {pending && (
        <div className="mt-4 rounded-lg bg-amber-soft p-4" role="alertdialog" aria-label="Confirm import">
          <p className="text-sm font-semibold">Replace your current data with this backup?</p>
          <p className="mt-1 text-sm text-subtle">
            It contains {pending.data.goals.length} {pending.data.goals.length === 1 ? 'goal' : 'goals'} and{' '}
            {pending.data.sessions.length} {pending.data.sessions.length === 1 ? 'session' : 'sessions'}
            {pending.data.settings.githubUsername ? `, for GitHub user ${pending.data.settings.githubUsername}` : ''}
            {pending.exportedAt
              ? `, saved ${new Date(pending.exportedAt).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}`
              : ''}
            . Your current goals, sessions and settings will be replaced.
          </p>
          <div className="mt-3 flex gap-2">
            <Button variant="danger" onClick={handleRestore}>
              Replace my data
            </Button>
            <Button variant="secondary" onClick={() => setPending(null)}>
              Cancel
            </Button>
          </div>
        </div>
      )}
    </section>
  )
}

export default BackupPanel
