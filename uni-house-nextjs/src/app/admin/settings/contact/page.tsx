'use client'

import { useState } from 'react'

export default function ContactSettingsPage() {
  const [contactInfo, setContactInfo] = useState({
    hotline: '',
    email: '',
    address: '',
    workingHours: '',
    facebook: '',
    zalo: '',
  })

  const handleSave = async () => {
    // TODO: Implement save functionality
    alert('Chức năng đang được phát triển')
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Thông tin Liên hệ</h1>
      
      <div className="bg-white rounded-lg shadow p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Hotline</label>
            <input
              type="text"
              value={contactInfo.hotline}
              onChange={(e) => setContactInfo({ ...contactInfo, hotline: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="0123 456 789"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={contactInfo.email}
              onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="contact@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Địa chỉ</label>
            <textarea
              value={contactInfo.address}
              onChange={(e) => setContactInfo({ ...contactInfo, address: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Giờ làm việc</label>
            <input
              type="text"
              value={contactInfo.workingHours}
              onChange={(e) => setContactInfo({ ...contactInfo, workingHours: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="8:00 - 17:00 (Thứ 2 - Thứ 6)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Facebook</label>
            <input
              type="text"
              value={contactInfo.facebook}
              onChange={(e) => setContactInfo({ ...contactInfo, facebook: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="https://facebook.com/..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Zalo</label>
            <input
              type="text"
              value={contactInfo.zalo}
              onChange={(e) => setContactInfo({ ...contactInfo, zalo: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="0123456789"
            />
          </div>

          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Lưu thay đổi
          </button>
        </div>
      </div>
    </div>
  )
}
