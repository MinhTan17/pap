/**
 * API Client utility for authenticated requests
 */

export function getAuthToken(): string | null {
    if (typeof window === 'undefined') return null;

    // Try localStorage first
    const localToken = localStorage.getItem('auth-token');
    if (localToken) return localToken;

    // Fallback to cookie
    const getCookie = (name: string) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
        return null;
    };

    return getCookie('auth-token-fallback');
}

export function getAuthHeaders(): HeadersInit {
    const token = getAuthToken();
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
}

export async function authenticatedFetch(
    url: string,
    options: RequestInit = {}
): Promise<Response> {
    const token = getAuthToken();

    const headers = new Headers(options.headers);
    if (token) {
        headers.set('Authorization', `Bearer ${token}`);
    }

    // Don't set Content-Type for FormData - browser will set it with boundary
    if (options.body instanceof FormData && headers.has('Content-Type')) {
        headers.delete('Content-Type');
    }

    return fetch(url, {
        ...options,
        headers,
        credentials: 'include',
    });
}
