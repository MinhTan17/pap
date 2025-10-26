'use client'

import Link from 'next/link'
import { useData } from '@/contexts/DataContext'

export default function AdminDashboard() {
  const { banners, services, products, newsArticles } = useData()

  const stats = [
    {
      title: 'Banner',
      count: banners.length,
      href: '/admin/banners',
      color: 'bg-blue-500',
      icon: '🖼️'
    },
    {
      title: 'Dịch vụ',
      count: services.length,
      href: '/admin/services',
      color: 'bg-green-500',
      icon: '⚙️'
    },
    {
      title: 'Sản phẩm',
      count: products.length,
      href: '/admin/products',
      color: 'bg-orange-500',
      icon: '📦'
    },
    {
      title: 'Tin tức',
      count: newsArticles.length,
      href: '/admin/news',
      color: 'bg-purple-500',
      icon: '📰'
    }
  ]

  const quickLinks = [
    { title: 'Thêm Banner mới', href: '/admin/banners', icon: '➕' },
    { title: 'Thêm Dịch vụ mới', href: '/admin/services', icon: '➕' },
    { title: 'Thêm Sản phẩm mới', href: '/admin/products', icon: '➕' },
    { title: 'Quản lý Danh mục', href: '/admin/categories', icon: '📁' },
    { title: 'Quản lý Media', href: '/admin/media', icon: '🖼️' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Bảng điều khiển</h1>
        <p className="text-gray-600">Chào mừng đến với trang quản trị Phú An Phát</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Link 
            key={stat.title}
            href={stat.href}
            className="p-6 rounded-lg bg-white shadow border hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.count}</p>
              </div>
              <div className={`w-12 h-12 rounded-full ${stat.color} flex items-center justify-center text-2xl`}>
                {stat.icon}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Links */}
      <div className="bg-white rounded-lg shadow border p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Thao tác nhanh</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {quickLinks.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-colors"
            >
              <span className="text-2xl">{link.icon}</span>
              <span className="text-sm font-medium text-gray-700">{link.title}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow border p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Hướng dẫn sử dụng</h2>
        <div className="space-y-3 text-sm text-gray-600">
          <div className="flex items-start gap-2">
            <span className="text-blue-500 font-bold">•</span>
            <p>Sử dụng menu bên trái để điều hướng giữa các trang quản lý</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-blue-500 font-bold">•</span>
            <p>Tất cả dữ liệu được lưu trong localStorage của trình duyệt</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-blue-500 font-bold">•</span>
            <p>Có thể upload ảnh trực tiếp hoặc nhập đường dẫn ảnh từ thư mục public</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-blue-500 font-bold">•</span>
            <p>Xem file <code className="bg-gray-100 px-2 py-1 rounded">HUONG_DAN_ADMIN.md</code> để biết thêm chi tiết</p>
          </div>
        </div>
      </div>
    </div>
  )
}


