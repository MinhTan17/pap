'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export function ClientAuthCheck({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [isChecking, setIsChecking] = useState(true);
    const [, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            // Skip check for login page
            if (pathname === '/admin/login') {
                setIsChecking(false);
                return;
            }

            // Small delay to ensure localStorage is ready (especially after redirect from login)
            await new Promise(resolve => setTimeout(resolve, 100));

            // Helper to get cookie
            const getCookie = (name: string) => {
                const value = `; ${document.cookie}`;
                const parts = value.split(`; ${name}=`);
                if (parts.length === 2) return parts.pop()?.split(';').shift();
                return null;
            };

            // Try to get token with retry logic (for race condition after login)
            let token: string | null = null;
            let retries = 0;
            const maxRetries = 3;

            while (!token && retries < maxRetries) {
                const localToken = localStorage.getItem('auth-token');
                const cookieToken = getCookie('auth-token-fallback');
                token = localToken || cookieToken || null;

                if (!token && retries < maxRetries - 1) {
                    // Wait a bit more and retry
                    await new Promise(resolve => setTimeout(resolve, 100));
                    retries++;
                } else {
                    break;
                }
            }

            console.log('[ClientAuthCheck] Token check:', {
                hasToken: !!token,
                retries,
            });

            if (!token) {
                console.log('[ClientAuthCheck] No token found after retries, redirecting to login');
                router.push('/admin/login');
                return;
            }

            // Verify token with server
            try {
                const response = await fetch('/api/auth/check', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                const data = await response.json();
                console.log('[ClientAuthCheck] Auth check response:', data);

                if (response.ok && data.authenticated) {
                    console.log('[ClientAuthCheck] Token valid');
                    setIsAuthenticated(true);
                } else {
                    console.log('[ClientAuthCheck] Token invalid, redirecting to login');
                    localStorage.removeItem('auth-token');
                    router.push('/admin/login');
                }
            } catch (error) {
                console.error('[ClientAuthCheck] Error checking auth:', error);
                router.push('/admin/login');
            } finally {
                setIsChecking(false);
            }
        };

        checkAuth();
    }, [pathname, router]);

    // Show loading while checking
    if (isChecking && pathname !== '/admin/login') {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return <>{children}</>;
}
