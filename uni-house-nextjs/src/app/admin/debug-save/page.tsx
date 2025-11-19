'use client'

import { useState } from 'react'
import { useData } from '@/contexts/DataContext'
import { authenticatedFetch } from '@/lib/auth-client'

export default function DebugSavePage() {
  const { services, updateService } = useData()
  const [logs, setLogs] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString()
    setLogs(prev => [...prev, `[${timestamp}] ${message}`])
    console.log(message)
  }

  const checkEnvironment = async () => {
    setLogs([])
    
    try {
      addLog('🔍 Kiểm tra môi trường production...')
      
      // Check if we're on Vercel
      addLog(`🌐 Environment: ${typeof window !== 'undefined' ? 'Client' : 'Server'}`)
      addLog(`🔗 Current URL: ${window.location.href}`)
      
      // Test MongoDB connection
      const response = await fetch('/api/debug/health')
      const data = await response.json()
      
      addLog(`📊 Health check status: ${response.status}`)
      addLog(`📄 Health data: ${JSON.stringify(data, null, 2)}`)
      
    } catch (error) {
      addLog(`❌ Environment check error: ${error}`)
    }
  }

  const testDirectSave = async () => {
    setIsLoading(true)
    setLogs([])
    
    try {
      addLog('🔍 Bắt đầu test lưu trực tiếp...')
      
      // Test with minimal data first
      const testServices = services.slice(0, 2).map(service => ({
        ...service,
        title: service.title + ' (TEST)',
        detailContent: '<p>Test content</p>' // Keep it simple
      }))
      
      addLog(`📊 Chuẩn bị lưu ${testServices.length} services`)
      addLog(`📄 Data size: ${JSON.stringify(testServices).length} characters`)
      
      // Direct API call without auth first
      const response = await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testServices)
      })
      
      addLog(`📡 Response status: ${response.status}`)
      addLog(`📡 Response headers: ${JSON.stringify(Object.fromEntries(response.headers.entries()))}`)
      
      const responseText = await response.text()
      addLog(`📄 Raw response: ${responseText}`)
      
      try {
        const data = JSON.parse(responseText)
        addLog(`📄 Parsed response: ${JSON.stringify(data)}`)
        
        if (data.success) {
          addLog('✅ Lưu thành công!')
        } else {
          addLog(`❌ Lỗi: ${data.error}`)
          if (data.details) addLog(`📋 Chi tiết: ${data.details}`)
        }
      } catch (parseError) {
        addLog(`❌ Không thể parse JSON response: ${parseError}`)
      }
      
    } catch (error) {
      addLog(`❌ Exception: ${error}`)
      addLog(`❌ Error stack: ${error instanceof Error ? error.stack : 'No stack'}`)
    } finally {
      setIsLoading(false)
    }
  }

  const testDataContextSave = async () => {
    setIsLoading(true)
    setLogs([])
    
    try {
      addLog('🔍 Bắt đầu test lưu qua DataContext...')
      
      if (services.length > 0) {
        const firstService = services[0]
        const updatedService = {
          ...firstService,
          title: firstService.title + ' (CONTEXT TEST)'
        }
        
        addLog(`📝 Cập nhật service ID ${firstService.id}`)
        updateService(firstService.id, updatedService)
        addLog('✅ Đã gọi updateService')
        
        // Wait for auto-save
        addLog('⏳ Chờ auto-save (2 giây)...')
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        addLog('✅ Test hoàn thành')
      } else {
        addLog('❌ Không có services để test')
      }
      
    } catch (error) {
      addLog(`❌ Exception: ${error}`)
    } finally {
      setIsLoading(false)
    }
  }

  const checkAuthStatus = async () => {
    setLogs([])
    
    try {
      addLog('🔍 Kiểm tra trạng thái xác thực...')
      
      const response = await authenticatedFetch('/api/auth/check')
      const data = await response.json()
      
      addLog(`📡 Auth check status: ${response.status}`)
      addLog(`📄 Auth data: ${JSON.stringify(data)}`)
      
    } catch (error) {
      addLog(`❌ Auth check error: ${error}`)
    }
  }

  const testGetServices = async () => {
    setLogs([])
    
    try {
      addLog('🔍 Test GET services từ API...')
      
      const response = await fetch('/api/services', {
        method: 'GET',
        cache: 'no-store'
      })
      
      addLog(`📡 GET Response status: ${response.status}`)
      
      const data = await response.json()
      addLog(`📄 GET Response: ${JSON.stringify(data).substring(0, 500)}...`)
      addLog(`📊 Services count: ${Array.isArray(data) ? data.length : 'Not array'}`)
      
      if (Array.isArray(data) && data.length > 0) {
        addLog(`📋 First service: ${JSON.stringify(data[0])}`)
      }
      
    } catch (error) {
      addLog(`❌ GET Services error: ${error}`)
    }
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Debug Save Functions</h1>
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <button
          onClick={checkEnvironment}
          className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
          disabled={isLoading}
        >
          Kiểm tra Môi Trường
        </button>
        
        <button
          onClick={testGetServices}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          disabled={isLoading}
        >
          Test GET Services
        </button>
        
        <button
          onClick={checkAuthStatus}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={isLoading}
        >
          Kiểm tra Auth
        </button>
        
        <button
          onClick={testDirectSave}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          disabled={isLoading}
        >
          Test Lưu Trực Tiếp
        </button>
        
        <button
          onClick={testDataContextSave}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          disabled={isLoading}
        >
          Test DataContext
        </button>
      </div>

      {isLoading && (
        <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
          <p className="text-yellow-800">⏳ Đang thực hiện test...</p>
        </div>
      )}

      <div className="bg-gray-50 border rounded p-4">
        <h2 className="font-bold mb-2">Console Logs:</h2>
        <div className="space-y-1 max-h-96 overflow-y-auto">
          {logs.length === 0 ? (
            <p className="text-gray-500">Chưa có logs...</p>
          ) : (
            logs.map((log, index) => (
              <div key={index} className="text-sm font-mono bg-white p-2 rounded border">
                {log}
              </div>
            ))
          )}
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded p-4">
        <h2 className="font-bold mb-2">Current Services Count:</h2>
        <p>{services.length} services loaded</p>
      </div>
    </div>
  )
}