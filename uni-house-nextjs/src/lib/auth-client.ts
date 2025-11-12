/**
 * Client-side authentication utilities
 */

/**
 * Get the authentication token from cookies or localStorage
 */
export function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null
  
  // Try to get from cookies first
  const cookies = document.cookie.split('; ')
  
  // Try auth-token (httpOnly)
  let token = cookies
    .find(row => row.startsWith('auth-token='))
    ?.split('=')[1]
  
  // Try fallback cookie
  if (!token) {
    token = cookies
      .find(row => row.startsWith('auth-token-fallback='))
      ?.split('=')[1]
  }
  
  // Try localStorage as last resort
  if (!token) {
    try {
      const storedToken = localStorage.getItem('auth-token')
      if (storedToken) token = storedToken
    } catch (e) {
      console.error('Error reading from localStorage:', e)
    }
  }
  
  return token || null
}

/**
 * Set the authentication token in localStorage
 */
export function setAuthToken(token: string): void {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.setItem('auth-token', token)
  } catch (e) {
    console.error('Error writing to localStorage:', e)
  }
}

/**
 * Remove the authentication token
 */
export function removeAuthToken(): void {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.removeItem('auth-token')
  } catch (e) {
    console.error('Error removing from localStorage:', e)
  }
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
  
  console.log('[Auth Client] Making authenticated request:', {
    url,
    method: options.method || 'GET',
    hasToken: !!token,
    tokenPreview: token ? token.substring(0, 20) + '...' : undefined
  })
  
  return fetch(url, {
    ...options,
    headers,
    credentials: 'include', // Important: include cookies
  })
}
