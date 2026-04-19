/**
 * Request deduplication cache to prevent concurrent duplicate API calls
 * This is a performance optimization for the backend
 */

interface RequestCache {
  promise: Promise<any>
  timestamp: number
  ttl: number
}

const requestCache = new Map<string, RequestCache>()
const CACHE_TTL = 5000 // 5 seconds - deduplicate rapid successive calls

/**
 * Generate a cache key from request parameters
 */
const generateCacheKey = (method: string, url: string, params?: any): string => {
  const paramStr = params ? JSON.stringify(params) : ''
  return `${method}:${url}:${paramStr}`
}

/**
 * Wrap an API call with request deduplication
 * If the same request is made concurrently, return the same promise
 */
export const dedupedRequest = async <T>(
  method: string,
  url: string,
  apiCall: () => Promise<T>,
  params?: any
): Promise<T> => {
  const cacheKey = generateCacheKey(method, url, params)
  const now = Date.now()

  // Check if we have a valid cached request
  const cached = requestCache.get(cacheKey)
  if (cached && now - cached.timestamp < cached.ttl) {
    console.debug(`[Dedup] Reusing cached request for ${cacheKey}`)
    return cached.promise
  }

  // Create and cache the promise
  const promise = apiCall()

  requestCache.set(cacheKey, {
    promise,
    timestamp: now,
    ttl: CACHE_TTL,
  })

  // Clean up cache after TTL
  setTimeout(() => {
    if (requestCache.get(cacheKey)?.timestamp === now) {
      requestCache.delete(cacheKey)
    }
  }, CACHE_TTL)

  return promise
}

/**
 * Clear request deduplication cache
 */
export const clearDedupCache = (): void => {
  requestCache.clear()
  console.debug('[Dedup] Cache cleared')
}
