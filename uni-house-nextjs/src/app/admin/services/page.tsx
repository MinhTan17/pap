'use client'

import { useState, useEffect } from 'react'
import { useData } from '@/contexts/DataContext'
import Link from 'next/link'

export default function ServicesPage() {
  const { services, reloadFromStorage } = useData()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Force reload data on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        console.log('🔄 Loading services data...')
        await reloadFromStorage()
        console.log('✅ Services loaded:', services.length)
      } catch (err) {
        console.error('❌ Error loading services:', err)
        setError('Không thể tải dữ liệu services')
      } finally {
        setIsLoading(false)
      }
    }
    
    loadData()
  }, [reloadFromStorage])

  // Debug log
  useEffect(() => {
    console.log('📊 Services state updated:', services.length, services)
  }, [services])

  const handleForceReload = async () => {
    setIsLoading(true)
    setError(null)
    try {
      console.log('🔄 Force reloading services...')
      await reloadFromStorage()
      console.log('✅ Force reload completed:', services.length)
    } catch (err) {
      console.error('❌ Force reload error:', err)
      setError('Không thể tải lại dữ liệu')
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-500">Đang tải dịch vụ...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <h2 className="text-red-800 font-bold mb-2">Lỗi tải dữ liệu</h2>
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={handleForceReload}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Thử lại
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Quản lý Dịch vụ</h1>
        <div className="flex gap-2">
          <button
            onClick={handleForceReload}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
            disabled={isLoading}
          >
            🔄 Tải lại
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Thêm dịch vụ mới
          </button>
        </div>
      </div>

      {/* Debug info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-bold text-blue-800 mb-2">Debug Info:</h3>
        <p className="text-blue-700">Services count: {services.length}</p>
        <p className="text-blue-700">Services loaded: {services.length > 0 ? 'Yes' : 'No'}</p>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tên Dịch Vụ
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Mô Tả
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thao Tác
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {services.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                  <div className="text-center">
                    <p className="text-lg mb-2">Không có dịch vụ nào</p>
                    <p className="text-sm text-gray-400 mb-4">
                      Có thể do lỗi kết nối API hoặc database trống
                    </p>
                    <button
                      onClick={handleForceReload}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                      Thử tải lại
                    </button>
                  </div>
                </td>
              </tr>
            ) : (
              services.map((service) => (
                <tr key={service.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {service.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{service.title}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500 max-w-xs truncate">
                      {service.description}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <Link
                        href={`/admin/services/${service.id}`}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Chỉnh sửa
                      </Link>
                      <a
                        href={`/dich-vu/${service.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 hover:text-green-900"
                      >
                        Xem
                      </a>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}