'use client';

import { useEffect, useState } from 'react';

export default function DebugAuthPage() {
  const [debugInfo, setDebugInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/debug/auth-status')
      .then(res => res.json())
      .then(data => {
        setDebugInfo(data);
        setLoading(false);
      })
      .catch(err => {
        setDebugInfo({ error: err.message });
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Auth Debug Info</h1>
      <pre className="bg-gray-100 p-4 rounded overflow-auto">
        {JSON.stringify(debugInfo, null, 2)}
      </pre>
      
      <div className="mt-4">
        <h2 className="text-xl font-bold mb-2">Browser Cookies:</h2>
        <pre className="bg-gray-100 p-4 rounded overflow-auto">
          {document.cookie || 'No cookies found'}
        </pre>
      </div>

      <div className="mt-4">
        <a href="/admin/login" className="text-blue-600 underline">
          Go to Login
        </a>
      </div>
    </div>
  );
}
