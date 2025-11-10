'use client';

import { useState } from 'react';

export default function TestLoginPage() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const testLogin = async () => {
    setLoading(true);
    try {
      // Step 1: Login
      console.log('Step 1: Logging in...');
      const loginRes = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'admin', password: 'admin123' }),
        credentials: 'include',
      });
      
      const loginData = await loginRes.json();
      console.log('Login response:', loginData);

      if (!loginData.success) {
        setResult({ error: 'Login failed', data: loginData });
        setLoading(false);
        return;
      }

      // Step 2: Check cookies
      console.log('Step 2: Checking cookies...');
      const cookies = document.cookie;
      console.log('Cookies:', cookies);

      // Step 3: Check auth
      console.log('Step 3: Checking auth...');
      const checkRes = await fetch('/api/auth/check', {
        credentials: 'include',
      });
      
      const checkData = await checkRes.json();
      console.log('Auth check response:', checkData);

      // Step 4: Try to access admin
      console.log('Step 4: Trying to access /admin...');
      
      setResult({
        step1_login: loginData,
        step2_cookies: cookies,
        step3_authCheck: checkData,
        step4_canAccessAdmin: checkData.authenticated,
      });

      if (checkData.authenticated) {
        console.log('SUCCESS! Redirecting to /admin...');
        setTimeout(() => {
          window.location.href = '/admin';
        }, 1000);
      }

    } catch (error) {
      console.error('Error:', error);
      setResult({ error: error instanceof Error ? error.message : String(error) });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-8">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-6">Test Login Flow</h1>
        
        <button
          onClick={testLogin}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400 mb-4"
        >
          {loading ? 'Testing...' : 'Test Login (admin/admin123)'}
        </button>

        {result && (
          <div className="mt-4">
            <h2 className="text-xl font-bold mb-2">Result:</h2>
            <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}

        <div className="mt-4 text-sm text-gray-600">
          <p>This page will test the complete login flow:</p>
          <ol className="list-decimal list-inside mt-2">
            <li>POST /api/auth/login</li>
            <li>Check if cookies are set</li>
            <li>GET /api/auth/check</li>
            <li>Try to access /admin</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
