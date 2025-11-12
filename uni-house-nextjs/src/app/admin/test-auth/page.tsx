'use client'

import { useState } from 'react'
import { getAuthToken, authenticatedFetch } from '@/lib/auth-client'

export default function TestAuthPage() {
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const testToken = () => {
    const token = getAuthToken()
    setResult({
      hasToken: !!token,
      tokenPreview: token ? token.substring(0, 30) + '...' : null,
      tokenLength: token?.length || 0,
    })
  }

  const testAuthenticatedRequest = async () => {
    setLoading(true)
    try {
      const response = await authenticatedFetch('/api/debug/middleware-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ test: 'data' }),
      })
      
      const data = await response.json()
      setResult({
        status: response.status,
        ok: response.ok,
        data,
      })
    } catch (error) {
      setResult({
        error: error instanceof Error ? error.message : 'Unknown error',
      })
    } finally {
      setLoading(false)
    }
  }

  const testServicesPost = async () => {
    setLoading(true)
    try {
      const testData = [
        {
          id: 999,
          title: 'Test Service',
          description: 'Test description',
          image: 'https://example.com/test.jpg',
        }
      ]
      
      const response = await authenticatedFetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testData),
      })
      
      const data = await response.json()
      setResult({
        status: response.status,
        ok: response.ok,
        data,
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
      <h1 className="text-2xl font-bold mb-6">Test Authentication</h1>
      
      <div className="space-y-4">
        <button
          onClick={testToken}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Check Token
        </button>
        
        <button
          onClick={testAuthenticatedRequest}
          disabled={loading}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400 ml-2"
        >
          Test Debug Endpoint
        </button>
        
        <button
          onClick={testServicesPost}
          disabled={loading}
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:bg-gray-400 ml-2"
        >
          Test Services POST
        </button>
      </div>
      
      {result && (
        <div className="mt-6 p-4 bg-gray-100 rounded">
          <h2 className="font-bold mb-2">Result:</h2>
          <pre className="text-sm overflow-auto">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}
