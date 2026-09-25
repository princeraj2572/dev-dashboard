import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { execFileSync } from 'node:child_process'

const git = (...args: string[]) =>
  execFileSync('git', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim()

const tryGit = (...args: string[]) => {
  try {
    return git(...args)
  } catch {
    return null
  }
}

/**
 * Dev-only, read-only git status endpoint for the in-app sync indicator.
 * Runs a fixed set of git commands (no user input reaches them). Pass ?fetch=1
 * to run `git fetch origin` first so ahead/behind reflects the real remote.
 */
const gitStatusPlugin = (): Plugin => ({
  name: 'git-status',
  apply: 'serve',
  configureServer(server) {
    server.middlewares.use('/__git-status', (req, res) => {
      res.setHeader('Content-Type', 'application/json')
      res.setHeader('Cache-Control', 'no-store')

      const inRepo = tryGit('rev-parse', '--is-inside-work-tree') === 'true'
      if (!inRepo) {
        res.end(JSON.stringify({ isRepo: false }))
        return
      }

      let fetchError: string | null = null
      if (new URL(req.url ?? '', 'http://localhost').searchParams.get('fetch') === '1') {
        try {
          execFileSync('git', ['fetch', 'origin'], { stdio: 'ignore', timeout: 20000 })
        } catch {
          fetchError = 'Could not reach the remote.'
        }
      }

      const branch = tryGit('rev-parse', '--abbrev-ref', 'HEAD') ?? 'unknown'
      const counts = tryGit('rev-list', '--left-right', '--count', `HEAD...origin/${branch}`)
      const [ahead, behind] = counts ? counts.split(/\s+/).map(Number) : [null, null]
      const changed = (tryGit('status', '--porcelain') ?? '').split('\n').filter(Boolean).length

      res.end(
        JSON.stringify({
          isRepo: true,
          branch,
          sha: tryGit('rev-parse', '--short', 'HEAD'),
          subject: tryGit('log', '-1', '--format=%s'),
          remote: tryGit('remote', 'get-url', 'origin'),
          hasRemoteBranch: counts !== null,
          ahead,
          behind,
          changed,
          fetchError,
          checkedAt: Date.now(),
        })
      )
    })
  },
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), gitStatusPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
