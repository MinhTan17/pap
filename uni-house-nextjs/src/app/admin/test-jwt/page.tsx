'use client'

import { useState } from 'react'

export default function TestJWTPage() {
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const checkJWTSecret = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/debug/jwt-secret')
      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({
        error: error instanceof Error ? error.message : 'Unknown error',
      })
    } finally {
      setLoading(false)
    }
  }

  const testLogin = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: 'admin',
          password: 'AdminPAP@2025!177305',
        }),
        credentials: 'include',
      })
      
      const data = await response.json()
      setResult({
        loginStatus: response.status,
        loginOk: response.ok,
        loginData: data,
      })
    } catch (error) {
      setResult({
        error: error instanceof Error ? error.message : 'Unknown error',
      })
    } finally {
      setLoading(false)
    }
  }

  const testVerify = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem('auth-token')
      if (!token) {
        setResult({ error: 'No token found in localStorage' })
        setLoading(false)
        return
      }

      const response = await fetch('/api/auth/check', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
      })
      
      const data = await response.json()
      setResult({
        verifyStatus: response.status,
        verifyOk: response.ok,
        verifyData: data,
        tokenUsed: token.substring(0, 30) + '...',
      })
    } catch (error) {
      setResult({
        error: error instanceof Error ? error.message : 'Unknown error',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Test JWT</h1>
      
      <div className="space-y-4">
        <button
          onClick={checkJWTSecret}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          Check JWT Secret
        </button>
        
        <button
          onClick={testLogin}
          disabled={loading}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400 ml-2"
        >
          Test Login
        </button>
        
        <button
          onClick={testVerify}
          disabled={loading}
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:bg-gray-400 ml-2"
        >
          Test Verify Token
        </button>
      </div>
      
      {result && (
        <div className="mt-6 p-4 bg-gray-100 rounded">
          <h2 className="font-bold mb-2">Result:</h2>
          <pre className="text-sm overflow-auto max-h-96">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
      
      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded">
        <h3 className="font-bold mb-2">⚠️ Troubleshooting:</h3>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Nếu "usingFallback: true" → JWT_SECRET không được set trên Vercel</li>
          <li>Nếu login thành công nhưng verify fail → JWT_SECRET không khớp</li>
          <li>Kiểm tra Vercel Dashboard → Settings → Environment Variables</li>
          <li>Đảm bảo JWT_SECRET giống nhau ở local và production</li>
        </ul>
      </div>
    </div>
  )
}
