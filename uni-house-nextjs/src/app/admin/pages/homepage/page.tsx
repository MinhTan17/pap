'use client'

import { useState } from 'react'

export default function HomepageAdminPage() {
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState('')

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Quản lý Trang chủ</h1>
      
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">
          Trang quản lý trang chủ đang được phát triển.
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Bạn có thể quản lý banners, sản phẩm nổi bật, và các phần khác của trang chủ tại đây.
        </p>
      </div>

      {message && (
        <div className={`mt-4 p-4 rounded ${
          message.includes('thành công') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {message}
        </div>
      )}
    </div>
  )
}
