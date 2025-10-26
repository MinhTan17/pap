'use client'

import { useState } from 'react'
import { useData } from '@/contexts/DataContext'
import { NewsItem } from '@/data/news'
import Link from 'next/link'

export default function NewsManagement() {
  const { newsArticles, deleteNews, updateNews } = useData()
  const [quickItem, setQuickItem] = useState<NewsItem | null>(null)
  const [qeTitle, setQeTitle] = useState('')
  const [qeCategory, setQeCategory] = useState('')
  const [qeDate, setQeDate] = useState('')

  const handleDelete = (id: number) => {
    if (confirm('Bạn có chắc muốn xóa tin tức này?')) {
      deleteNews(id)
    }
  }

  const openQuickEdit = (item: NewsItem) => {
    setQuickItem(item)
    setQeTitle(item.title || '')
    setQeCategory(item.category || '')
    setQeDate(item.date || '')
  }

  const saveQuickEdit = () => {
    if (!quickItem) return
    updateNews(quickItem.id, { ...quickItem, title: qeTitle, category: qeCategory, date: qeDate })
    setQuickItem(null)
  }

  const cancelQuickEdit = () => setQuickItem(null)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Quản lý tin tức</h1>
        <Link
          href="/admin/news/add"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Thêm tin tức mới
        </Link>
      </div>

      {/* News List */}
      <div className="bg-white rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tiêu đề
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Danh mục
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ngày đăng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {newsArticles.map((newsItem) => (
                <tr key={newsItem.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {newsItem.id}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 max-w-xs truncate">
                    {newsItem.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {newsItem.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {newsItem.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => openQuickEdit(newsItem)}
                      className="text-orange-600 hover:text-orange-900 bg-orange-50 px-2 py-1 rounded"
                    >
                      ✎ Sửa nhanh
                    </button>
                    <Link
                      href={`/admin/news/${newsItem.id}`}
                      className="text-green-600 hover:text-green-900 bg-green-50 px-2 py-1 rounded"
                    >
                      ✏️ Chỉnh sửa chi tiết
                    </Link>
                    <button
                      onClick={() => handleDelete(newsItem.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      🗑️ Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {quickItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <h3 className="text-lg font-bold mb-4">Sửa nhanh tin tức #{quickItem.id}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Tiêu đề</label>
                <input
                  type="text"
                  value={qeTitle}
                  onChange={(e) => setQeTitle(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Danh mục</label>
                <select
                  value={qeCategory}
                  onChange={(e) => setQeCategory(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                >
                  <option value="Thiết kế">Thiết kế</option>
                  <option value="Vật liệu">Vật liệu</option>
                  <option value="Thi công">Thi công</option>
                  <option value="Công nghệ">Công nghệ</option>
                  <option value="Tư vấn">Tư vấn</option>
                  <option value="Dự án">Dự án</option>
                  <option value="Thị trường">Thị trường</option>
                  <option value="Laser">Laser</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Ngày đăng</label>
                <input
                  type="text"
                  value={qeDate}
                  onChange={(e) => setQeDate(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="15/01/2024"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button onClick={cancelQuickEdit} className="px-4 py-2 bg-gray-200 rounded-md">Hủy</button>
              <button onClick={saveQuickEdit} className="px-4 py-2 bg-blue-600 text-white rounded-md">Lưu</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
