'use client'

import { useState } from 'react'
import { useData } from '@/contexts/DataContext'
import { NewsItem } from '@/data/news'

export default function NewsManagement() {
  const { newsArticles, addNews, updateNews, deleteNews } = useData()
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null)
  const [isAdding, setIsAdding] = useState(false)

  const handleAdd = () => {
    setIsAdding(true)
    setEditingNews({
      id: Math.max(...newsArticles.map(n => n.id)) + 1,
      title: '',
      description: '',
      excerpt: '',
      category: '',
      date: new Date().toLocaleDateString('vi-VN'),
      readTime: '5 phút đọc',
      image: '/api/placeholder/400/250',
      icon: 'steel',
      color: 'from-blue-500 to-blue-700'
    })
  }

  const handleEdit = (newsItem: NewsItem) => {
    setEditingNews({ ...newsItem })
    setIsAdding(false)
  }

  const handleSave = () => {
    if (!editingNews) return

    if (isAdding) {
      addNews(editingNews)
    } else {
      updateNews(editingNews.id, editingNews)
    }

    setEditingNews(null)
    setIsAdding(false)
  }

  const handleDelete = (id: number) => {
    if (confirm('Bạn có chắc muốn xóa tin tức này?')) {
      deleteNews(id)
    }
  }

  const handleCancel = () => {
    setEditingNews(null)
    setIsAdding(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Quản lý tin tức</h1>
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Thêm tin tức mới
        </button>
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
                      onClick={() => handleEdit(newsItem)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(newsItem.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {editingNews && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              {isAdding ? 'Thêm tin tức mới' : 'Chỉnh sửa tin tức'}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Tiêu đề</label>
                <input
                  type="text"
                  value={editingNews.title}
                  onChange={(e) => setEditingNews({ ...editingNews, title: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Danh mục</label>
                <select
                  value={editingNews.category || ''}
                  onChange={(e) => setEditingNews({ ...editingNews, category: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                >
                  <option value="Thiết kế">Thiết kế</option>
                  <option value="Vật liệu">Vật liệu</option>
                  <option value="Thi công">Thi công</option>
                  <option value="Công nghệ">Công nghệ</option>
                  <option value="Tư vấn">Tư vấn</option>
                  <option value="Dự án">Dự án</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Ngày đăng</label>
                <input
                  type="text"
                  value={editingNews.date || ''}
                  onChange={(e) => setEditingNews({ ...editingNews, date: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Thời gian đọc</label>
                <input
                  type="text"
                  value={editingNews.readTime || ''}
                  onChange={(e) => setEditingNews({ ...editingNews, readTime: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Mô tả ngắn</label>
                <textarea
                  value={editingNews.excerpt || ''}
                  onChange={(e) => setEditingNews({ ...editingNews, excerpt: e.target.value })}
                  rows={2}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Nội dung đầy đủ</label>
                <textarea
                  value={editingNews.description}
                  onChange={(e) => setEditingNews({ ...editingNews, description: e.target.value })}
                  rows={4}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Hình ảnh</label>
                <input
                  type="text"
                  value={editingNews.image || ''}
                  onChange={(e) => setEditingNews({ ...editingNews, image: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2 mt-6">
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Hủy
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
