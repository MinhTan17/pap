'use client'

import { useState, useEffect } from 'react'
import { ContactInfo, Branch } from '@/types/contact'
import { loadContactInfo, saveContactInfo, resetContactInfo } from '@/lib/contactStorage'
import { DEFAULT_CONTACT_INFO } from '@/data/contact'

export default function ContactManagement() {
  const [contactInfo, setContactInfo] = useState<ContactInfo>(DEFAULT_CONTACT_INFO)
  const [editingBranch, setEditingBranch] = useState<{ branch: Branch; type: 'north' | 'south'; index?: number } | null>(null)
  const [showPreview, setShowPreview] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const data = loadContactInfo()
    setContactInfo(data)
  }, [])

  const showNotification = (message: string) => {
    setToastMessage(message)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  const handleSaveCompanyInfo = () => {
    const result = saveContactInfo(contactInfo)
    if (result.success) {
      showNotification('✅ Đã lưu thông tin công ty thành công!')
    } else {
      showNotification(`❌ ${result.error}`)
    }
  }

  const handleSaveMapUrl = () => {
    const result = saveContactInfo(contactInfo)
    if (result.success) {
      showNotification('✅ Đã lưu URL bản đồ thành công!')
    } else {
      showNotification(`❌ ${result.error}`)
    }
  }

  const handleReset = () => {
    if (confirm('⚠️ Bạn có chắc muốn khôi phục về dữ liệu mặc định?\n\nTất cả thay đổi sẽ bị mất!')) {
      const result = resetContactInfo()
      if (result.success) {
        setContactInfo(DEFAULT_CONTACT_INFO)
        showNotification('✅ Đã khôi phục dữ liệu mặc định!')
      } else {
        showNotification(`❌ ${result.error}`)
      }
    }
  }

  if (!isMounted) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Quản lý Trang Liên Hệ</h1>
          <div className="bg-gray-200 h-10 w-32 rounded-lg animate-pulse"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Quản lý Trang Liên Hệ</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setShowPreview(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            👁️ Xem trước
          </button>
          <button
            onClick={handleReset}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            🔄 Khôi phục mặc định
          </button>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <span className="text-2xl">ℹ️</span>
          <div>
            <p className="text-sm text-blue-900 mb-2">
              <strong>Quản lý thông tin liên hệ:</strong> Cập nhật thông tin công ty, chi nhánh và bản đồ hiển thị trên trang liên hệ công khai.
            </p>
            <p className="text-xs text-blue-700">
              💡 Tất cả thay đổi sẽ được lưu vào localStorage và hiển thị ngay lập tức trên trang liên hệ.
            </p>
          </div>
        </div>
      </div>

      {/* Company Info Section */}
      <div className="bg-white rounded-lg shadow border p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <span>🏢</span> Thông tin công ty
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tên công ty <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={contactInfo.company.name}
              onChange={(e) => setContactInfo({
                ...contactInfo,
                company: { ...contactInfo.company, name: e.target.value }
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Tên công ty"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Địa chỉ <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={contactInfo.company.address}
              onChange={(e) => setContactInfo({
                ...contactInfo,
                company: { ...contactInfo.company, address: e.target.value }
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Địa chỉ công ty"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hotline <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={contactInfo.company.hotline}
              onChange={(e) => setContactInfo({
                ...contactInfo,
                company: { ...contactInfo.company, hotline: e.target.value }
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Số điện thoại"
            />
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleSaveCompanyInfo}
              disabled={!contactInfo.company.name || !contactInfo.company.address || !contactInfo.company.hotline}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              💾 Lưu thông tin công ty
            </button>
          </div>
        </div>
      </div>

      {/* North Branches Section */}
      <div className="bg-white rounded-lg shadow border p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <span>🏢</span> Chi nhánh miền Bắc
          </h2>
          <button
            onClick={() => setEditingBranch({
              branch: { id: Date.now().toString(), name: '', address: '', hotline: '' },
              type: 'north'
            })}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm"
          >
            ➕ Thêm chi nhánh
          </button>
        </div>
        <div className="space-y-3">
          {contactInfo.northBranches.length === 0 ? (
            <p className="text-gray-500 text-sm text-center py-4">Chưa có chi nhánh nào</p>
          ) : (
            contactInfo.northBranches.map((branch, index) => (
              <div key={branch.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{branch.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{branch.address}</p>
                    <p className="text-sm text-gray-600">Hotline: {branch.hotline}</p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => setEditingBranch({ branch: { ...branch }, type: 'north', index })}
                      className="bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-1 rounded text-sm"
                    >
                      ✏️ Sửa
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Xóa chi nhánh "${branch.name}"?`)) {
                          const newBranches = contactInfo.northBranches.filter((_, i) => i !== index)
                          const newInfo = { ...contactInfo, northBranches: newBranches }
                          setContactInfo(newInfo)
                          const result = saveContactInfo(newInfo)
                          if (result.success) {
                            showNotification('✅ Đã xóa chi nhánh!')
                          }
                        }
                      }}
                      className="bg-red-50 text-red-600 hover:bg-red-100 px-3 py-1 rounded text-sm"
                    >
                      🗑️ Xóa
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* South Branches Section */}
      <div className="bg-white rounded-lg shadow border p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <span>🏢</span> Chi nhánh miền Nam
          </h2>
          <button
            onClick={() => setEditingBranch({
              branch: { id: Date.now().toString(), name: '', address: '', hotline: '' },
              type: 'south'
            })}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm"
          >
            ➕ Thêm chi nhánh
          </button>
        </div>
        <div className="space-y-3">
          {contactInfo.southBranches.length === 0 ? (
            <p className="text-gray-500 text-sm text-center py-4">Chưa có chi nhánh nào</p>
          ) : (
            contactInfo.southBranches.map((branch, index) => (
              <div key={branch.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{branch.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{branch.address}</p>
                    <p className="text-sm text-gray-600">Hotline: {branch.hotline}</p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => setEditingBranch({ branch: { ...branch }, type: 'south', index })}
                      className="bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-1 rounded text-sm"
                    >
                      ✏️ Sửa
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Xóa chi nhánh "${branch.name}"?`)) {
                          const newBranches = contactInfo.southBranches.filter((_, i) => i !== index)
                          const newInfo = { ...contactInfo, southBranches: newBranches }
                          setContactInfo(newInfo)
                          const result = saveContactInfo(newInfo)
                          if (result.success) {
                            showNotification('✅ Đã xóa chi nhánh!')
                          }
                        }
                      }}
                      className="bg-red-50 text-red-600 hover:bg-red-100 px-3 py-1 rounded text-sm"
                    >
                      🗑️ Xóa
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Branch Edit Modal */}
      {editingBranch && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50" onClick={() => setEditingBranch(null)}>
          <div className="relative top-20 mx-auto p-6 border w-full max-w-md shadow-lg rounded-md bg-white" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">
                {editingBranch.index !== undefined ? '✏️ Chỉnh sửa chi nhánh' : '➕ Thêm chi nhánh mới'}
              </h3>
              <button 
                onClick={() => setEditingBranch(null)}
                className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tên chi nhánh <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={editingBranch.branch.name}
                  onChange={(e) => setEditingBranch({
                    ...editingBranch,
                    branch: { ...editingBranch.branch, name: e.target.value }
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="VD: HẢO AN PHÁT"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Địa chỉ <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={editingBranch.branch.address}
                  onChange={(e) => setEditingBranch({
                    ...editingBranch,
                    branch: { ...editingBranch.branch, address: e.target.value }
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Địa chỉ chi nhánh"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hotline <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={editingBranch.branch.hotline}
                  onChange={(e) => setEditingBranch({
                    ...editingBranch,
                    branch: { ...editingBranch.branch, hotline: e.target.value }
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Số điện thoại"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setEditingBranch(null)}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                Hủy
              </button>
              <button
                onClick={() => {
                  if (!editingBranch.branch.name || !editingBranch.branch.address || !editingBranch.branch.hotline) {
                    showNotification('❌ Vui lòng điền đầy đủ thông tin!')
                    return
                  }

                  let newInfo: ContactInfo
                  if (editingBranch.type === 'north') {
                    if (editingBranch.index !== undefined) {
                      const newBranches = [...contactInfo.northBranches]
                      newBranches[editingBranch.index] = editingBranch.branch
                      newInfo = { ...contactInfo, northBranches: newBranches }
                    } else {
                      newInfo = { ...contactInfo, northBranches: [...contactInfo.northBranches, editingBranch.branch] }
                    }
                  } else {
                    if (editingBranch.index !== undefined) {
                      const newBranches = [...contactInfo.southBranches]
                      newBranches[editingBranch.index] = editingBranch.branch
                      newInfo = { ...contactInfo, southBranches: newBranches }
                    } else {
                      newInfo = { ...contactInfo, southBranches: [...contactInfo.southBranches, editingBranch.branch] }
                    }
                  }

                  setContactInfo(newInfo)
                  const result = saveContactInfo(newInfo)
                  if (result.success) {
                    showNotification(editingBranch.index !== undefined ? '✅ Đã cập nhật chi nhánh!' : '✅ Đã thêm chi nhánh mới!')
                    setEditingBranch(null)
                  } else {
                    showNotification(`❌ ${result.error}`)
                  }
                }}
                disabled={!editingBranch.branch.name || !editingBranch.branch.address || !editingBranch.branch.hotline}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                💾 Lưu
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Map URL Section */}
      <div className="bg-white rounded-lg shadow border p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <span>🗺️</span> Google Maps
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Google Maps Embed URL
            </label>
            <textarea
              value={contactInfo.mapUrl}
              onChange={(e) => setContactInfo({ ...contactInfo, mapUrl: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
              placeholder="https://www.google.com/maps/embed?pb=..."
            />
            <p className="text-xs text-gray-500 mt-2">
              💡 Lấy embed URL từ Google Maps: Tìm địa điểm → Chia sẻ → Nhúng bản đồ → Copy HTML → Lấy URL trong src="..."
            </p>
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleSaveMapUrl}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              💾 Lưu URL bản đồ
            </button>
          </div>
          {contactInfo.mapUrl && (
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Xem trước bản đồ:</p>
              <div className="border border-gray-300 rounded-lg overflow-hidden">
                <iframe
                  src={contactInfo.mapUrl}
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50" onClick={() => setShowPreview(false)}>
          <div className="relative top-10 mx-auto p-6 border w-full max-w-6xl shadow-lg rounded-md bg-white mb-10" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">👁️ Xem trước trang liên hệ</h3>
              <button 
                onClick={() => setShowPreview(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
              >
                ×
              </button>
            </div>
            
            <div className="max-h-[70vh] overflow-y-auto border border-gray-200 rounded-lg p-6 bg-gray-50">
              {/* Preview Content */}
              <div className="bg-white rounded-lg p-6">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
                  {contactInfo.company.name}
                </h2>

                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Contact Information */}
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">{contactInfo.company.name}</h3>

                    <div className="space-y-3 text-gray-700">
                      <p><strong>Địa chỉ:</strong> {contactInfo.company.address}</p>
                      <p><strong>Hotline:</strong> {contactInfo.company.hotline}</p>
                    </div>

                    <div className="mt-8">
                      <h4 className="text-xl font-bold text-gray-800 mb-4">CÁC CHI NHÁNH THUỘC CÙNG MẠNG LƯỚI PHÚ AN PHÁT</h4>

                      {contactInfo.northBranches.length > 0 && (
                        <div className="mb-6">
                          <h5 className="text-lg font-semibold text-gray-800 mb-3">CHI NHÁNH MIỀN BẮC:</h5>
                          {contactInfo.northBranches.map((branch, index) => (
                            <div key={branch.id} className={`pl-4 border-l-4 border-yellow-500 ${index < contactInfo.northBranches.length - 1 ? 'mb-4' : ''}`}>
                              <p className="font-semibold text-gray-800">{branch.name}</p>
                              <p className="text-sm text-gray-600">{branch.address}</p>
                              <p className="text-sm text-gray-600">Hotline: {branch.hotline}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {contactInfo.southBranches.length > 0 && (
                        <div>
                          <h5 className="text-lg font-semibold text-gray-800 mb-3">CHI NHÁNH MIỀN NAM:</h5>
                          {contactInfo.southBranches.map((branch, index) => (
                            <div key={branch.id} className={`pl-4 border-l-4 border-yellow-500 ${index < contactInfo.southBranches.length - 1 ? 'mb-4' : ''}`}>
                              <p className="font-semibold text-gray-800">{branch.name}</p>
                              <p className="text-sm text-gray-600">{branch.address}</p>
                              <p className="text-sm text-gray-600">Hotline: {branch.hotline}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Map Preview */}
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">Vị trí</h3>
                    {contactInfo.mapUrl && (
                      <div className="border border-gray-300 rounded-lg overflow-hidden">
                        <iframe
                          src={contactInfo.mapUrl}
                          width="100%"
                          height="400"
                          style={{ border: 0 }}
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowPreview(false)}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                Đóng
              </button>
              <button
                onClick={() => {
                  const result = saveContactInfo(contactInfo)
                  if (result.success) {
                    showNotification('✅ Đã lưu tất cả thay đổi!')
                    setShowPreview(false)
                  } else {
                    showNotification(`❌ ${result.error}`)
                  }
                }}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                💾 Lưu thay đổi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in z-50">
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  )
}
