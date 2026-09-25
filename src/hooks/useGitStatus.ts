import { useCallback, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'

export interface GitStatus {
  isRepo: boolean
  branch?: string
  sha?: string | null
  subject?: string | null
  remote?: string | null
  hasRemoteBranch?: boolean
  ahead?: number | null
  behind?: number | null
  changed?: number
  fetchError?: string | null
  checkedAt?: number
}

const load = async (fetchRemote: boolean): Promise<GitStatus> => {
  const res = await fetch(`/__git-status${fetchRemote ? '?fetch=1' : ''}`)
  const type = res.headers.get('content-type') ?? ''
  // Outside the dev server the path falls through to index.html, not JSON.
  if (!res.ok || !type.includes('application/json')) throw new Error('Git status is not available')
  return res.json()
}

/** Git sync state of this project. Only available while running the Vite dev server. */
export const useGitStatus = () => {
  const queryClient = useQueryClient()
  const [isSyncing, setIsSyncing] = useState(false)

  const query = useQuery({
    queryKey: ['git-status'],
    queryFn: () => load(false),
    enabled: import.meta.env.DEV,
    refetchInterval: 15000,
    retry: false,
  })

  /** Fetches from the remote, then re-reads the status. */
  const sync = useCallback(async () => {
    setIsSyncing(true)
    try {
      queryClient.setQueryData(['git-status'], await load(true))
    } finally {
      setIsSyncing(false)
    }
  }, [queryClient])

  const status = query.data

  const parts: string[] = []
  if (status?.isRepo) {
    if (status.changed) parts.push(`${status.changed} uncommitted ${status.changed === 1 ? 'file' : 'files'}`)
    if (status.ahead) parts.push(`${status.ahead} to push`)
    if (status.behind) parts.push(`${status.behind} to pull`)
    if (!status.hasRemoteBranch) parts.push('not on remote yet')
  }

  return {
    status,
    isLoading: query.isLoading,
    isAvailable: !!status?.isRepo,
    isSynced: !!status?.isRepo && parts.length === 0,
    summary: parts.length === 0 ? 'In sync' : parts.join(', '),
    isSyncing,
    sync,
  }
}
