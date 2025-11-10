'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export function ClientAuthCheck({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      // Skip check for login page
      if (pathname === '/admin/login') {
        setIsChecking(false);
        return;
      }

      // Check if we have token in localStorage
      const localToken = localStorage.getItem('auth-token');
      
      if (!localToken) {
        console.log('[ClientAuthCheck] No token in localStorage, redirecting to login');
        router.push('/admin/login');
        return;
      }

      // Verify token with server
      try {
        const response = await fetch('/api/auth/check', {
          headers: {
            'Authorization': `Bearer ${localToken}`,
          },
        });

        if (response.ok) {
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
