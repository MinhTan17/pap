/**
 * Client-side authentication utilities
 */

/**
 * Get the authentication token from cookies
 */
export function getAuthToken(): string | null {
  if (typeof document === 'undefined') return null
  
  const token = document.cookie
    .split('; ')
    .find(row => row.startsWith('auth-token='))
    ?.split('=')[1]
  
  return token || null
}

/**
 * Make an authenticated API request
 */
export async function authenticatedFetch(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const token = getAuthToken()
  
  const headers = new Headers(options.headers)
  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }
  
  return fetch(url, {
    ...options,
    headers,
  })
}
