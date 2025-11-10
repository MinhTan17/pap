'use client';

import { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const [authStatus, setAuthStatus] = useState<any>(null);

  useEffect(() => {
    // Check auth status when page loads
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/check', {
          credentials: 'include',
        });
        const data = await response.json();
        console.log('[Admin Dashboard] Auth status:', data);
        setAuthStatus(data);
      } catch (error) {
        console.error('[Admin Dashboard] Error checking auth:', error);
      }
    };

    checkAuth();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Chào mừng đến Admin Panel</h2>
        <p className="text-gray-600 mb-4">
          Bạn đã đăng nhập thành công!
        </p>

        {authStatus && (
          <div className="mt-4 p-4 bg-green-50 rounded">
            <h3 className="font-semibold text-green-800 mb-2">Auth Status:</h3>
            <pre className="text-sm text-green-700">
              {JSON.stringify(authStatus, null, 2)}
            </pre>
          </div>
        )}

        <div className="mt-4 p-4 bg-blue-50 rounded">
          <h3 className="font-semibold text-blue-800 mb-2">Cookies:</h3>
          <pre className="text-sm text-blue-700">
            {document.cookie || 'No cookies found'}
          </pre>
        </div>
      </div>
    </div>
  );
}
