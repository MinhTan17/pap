'use client'

import { useState } from 'react'

export default function CompanySettingsPage() {
  const [companyInfo, setCompanyInfo] = useState({
    name: 'Uni House',
    address: '',
    phone: '',
    email: '',
    taxCode: '',
  })

  const handleSave = async () => {
    // TODO: Implement save functionality
    alert('Chức năng đang được phát triển')
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Thông tin Công ty</h1>
      
      <div className="bg-white rounded-lg shadow p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Tên công ty</label>
            <input
              type="text"
              value={companyInfo.name}
              onChange={(e) => setCompanyInfo({ ...companyInfo, name: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Địa chỉ</label>
            <input
              type="text"
              value={companyInfo.address}
              onChange={(e) => setCompanyInfo({ ...companyInfo, address: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Số điện thoại</label>
            <input
              type="text"
              value={companyInfo.phone}
              onChange={(e) => setCompanyInfo({ ...companyInfo, phone: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={companyInfo.email}
              onChange={(e) => setCompanyInfo({ ...companyInfo, email: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Mã số thuế</label>
            <input
              type="text"
              value={companyInfo.taxCode}
              onChange={(e) => setCompanyInfo({ ...companyInfo, taxCode: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
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
