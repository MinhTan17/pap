'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Loading from '@/components/ui/Loading';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log('[AuthProvider] Checking authentication...');
        const res = await fetch('/api/auth/check', {
          credentials: 'include',
          cache: 'no-store'
        });
        const data = await res.json();
        
        console.log('[AuthProvider] Auth check result:', data);

        if (!data.authenticated) {
          console.log('[AuthProvider] Not authenticated, redirecting to login...');
          router.push('/admin/login');
        } else {
          console.log('[AuthProvider] Authenticated, rendering children');
          setIsLoading(false);
        }
      } catch (error) {
        console.error('[AuthProvider] Auth check failed:', error);
        router.push('/admin/login');
      }
    };

    checkAuth();
  }, [router]);

  if (isLoading) {
    return <Loading />;
  }

  return <>{children}</>;
}
