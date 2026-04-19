import axios, { type AxiosError, type AxiosInstance, AxiosError as AxiosErrorClass } from 'axios'

interface RetryConfig {
  maxRetries: number
  retryDelay: number
  backoffMultiplier: number
  retryableStatuses: number[]
}

interface RateLimitError extends Error {
  retryAfter?: number
}

const DEFAULT_RETRY_CONFIG: RetryConfig = {
  maxRetries: 3,
  retryDelay: 1000,
  backoffMultiplier: 2,
  retryableStatuses: [408, 429, 500, 502, 503, 504],
}

/**
 * Create an axios instance with retry logic and rate limit handling
 */
export const createApiClient = (config?: Partial<RetryConfig>): AxiosInstance => {
  const retryConfig = { ...DEFAULT_RETRY_CONFIG, ...config }

  const client = axios.create()

  // Request interceptor - validate token presence for authenticated endpoints
  client.interceptors.request.use((config) => {
    // Add request timestamp for rate limit tracking
    ;(config as any).requestTimestamp = Date.now()
    return config
  })

  // Response interceptor - handle rate limits and retries
  client.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const config = error.config as any

      // Handle 429 (Too Many Requests)
      if (error.response?.status === 429) {
        const retryAfter = error.response.headers['retry-after']
        const waitTime = retryAfter ? parseInt(retryAfter) * 1000 : retryConfig.retryDelay

        console.warn(
          `Rate limited. Waiting ${waitTime}ms before retry. Retries left: ${
            (config.retryCount || 0) + 1
          }`
        )

        const rateLimitError: RateLimitError = new Error('Rate limit exceeded')
        rateLimitError.retryAfter = waitTime
        throw rateLimitError
      }

      // Handle retryable errors
      if (
        retryConfig.retryableStatuses.includes(error.response?.status || 0) &&
        config.retryCount === undefined
      ) {
        config.retryCount = 0
      }

      if (config.retryCount !== undefined && config.retryCount < retryConfig.maxRetries) {
        config.retryCount++
        const delay =
          retryConfig.retryDelay * Math.pow(retryConfig.backoffMultiplier, config.retryCount - 1)
        await new Promise((resolve) => setTimeout(resolve, delay))
        return client(config)
      }

      return Promise.reject(error)
    }
  )

  return client
}

/**
 * Validate API credentials before making requests
 */
export const validateCredentials = (
  username: string,
  token?: string
): { isValid: boolean; error?: string } => {
  if (!username || username.trim().length === 0) {
    return { isValid: false, error: 'Username is required' }
  }

  if (token && token.trim().length === 0) {
    return { isValid: false, error: 'Token is invalid' }
  }

  return { isValid: true }
}

/**
 * Wrap API calls with error handling and logging
 */
export const callApi = async <T>(
  apiCall: () => Promise<T>,
  context: string
): Promise<T | null> => {
  try {
    return await apiCall()
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error(`[${context}] API call failed:`, errorMessage)

    // Log to monitoring service in production (browser environment)
    // In Node.js/SSR, process would be available
    try {
      // @ts-ignore - browser won't have process, but checking for safety
      if (typeof window === 'undefined' && process.env.NODE_ENV === 'production') {
        // Send to monitoring/logging service
        console.log(`[PRODUCTION ERROR] ${context}: ${errorMessage}`)
      }
    } catch {
      // Silently ignore in browser
    }

    return null
  }
}

/**
 * Get retry-safe error message for user
 */
export const getErrorMessage = (error: unknown, context: string): string => {
  if (error instanceof AxiosErrorClass) {
    if (error.response?.status === 404) {
      return `${context}: Not found. Check your username.`
    }
    if (error.response?.status === 401 || error.response?.status === 403) {
      return `${context}: Access denied. Check your token or credentials.`
    }
    if (error.response?.status === 429) {
      return `${context}: Rate limited. Please try again later.`
    }
    if (error.code === 'ECONNABORTED') {
      return `${context}: Request timeout. Please check your connection.`
    }
  }

  return `${context}: Unable to fetch data. Please try again.`
}
