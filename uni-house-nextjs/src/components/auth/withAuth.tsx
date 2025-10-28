'use client';

import { useEffect, useState, ComponentType } from 'react';
import { useRouter } from 'next/navigation';
import Loading from '@/components/ui/Loading';

type Props = {
  children?: React.ReactNode;
  [key: string]: any;
};

const withAuth = <P extends object>(
  WrappedComponent: ComponentType<P>
): React.FC<P> => {
  const WithAuthWrapper: React.FC<P> = (props) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const checkAuth = async () => {
        try {
          const res = await fetch('/api/auth/check');
          const data = await res.json();

          if (!data.authenticated) {
            router.push('/admin/login');
          } else {
            setIsLoading(false);
          }
        } catch (error) {
          console.error('Auth check failed:', error);
          router.push('/admin/login');
        }
      };

      checkAuth();
    }, [router]);

    if (isLoading) {
      return <Loading />;
    }

    return <WrappedComponent {...props as P} />;
  };

  return WithAuthWrapper;
};

export default withAuth;
