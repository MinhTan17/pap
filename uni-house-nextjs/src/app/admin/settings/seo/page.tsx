'use client'

import { useState } from 'react'

export default function SEOSettingsPage() {
  const [seoSettings, setSeoSettings] = useState({
    siteTitle: 'Uni House',
    siteDescription: '',
    keywords: '',
    ogImage: '',
    googleAnalyticsId: '',
    facebookPixelId: '',
  })

  const handleSave = async () => {
    // TODO: Implement save functionality
    alert('Chức năng đang được phát triển')
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">SEO & Meta Tags</h1>
      
      <div className="bg-white rounded-lg shadow p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Tiêu đề website</label>
            <input
              type="text"
              value={seoSettings.siteTitle}
              onChange={(e) => setSeoSettings({ ...seoSettings, siteTitle: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Mô tả website</label>
            <textarea
              value={seoSettings.siteDescription}
              onChange={(e) => setSeoSettings({ ...seoSettings, siteDescription: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              rows={3}
              placeholder="Mô tả ngắn gọn về website của bạn"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Từ khóa (Keywords)</label>
            <input
              type="text"
              value={seoSettings.keywords}
              onChange={(e) => setSeoSettings({ ...seoSettings, keywords: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="từ khóa 1, từ khóa 2, từ khóa 3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">OG Image URL</label>
            <input
              type="text"
              value={seoSettings.ogImage}
              onChange={(e) => setSeoSettings({ ...seoSettings, ogImage: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="https://example.com/og-image.jpg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Google Analytics ID</label>
            <input
              type="text"
              value={seoSettings.googleAnalyticsId}
              onChange={(e) => setSeoSettings({ ...seoSettings, googleAnalyticsId: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="G-XXXXXXXXXX"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Facebook Pixel ID</label>
            <input
              type="text"
              value={seoSettings.facebookPixelId}
              onChange={(e) => setSeoSettings({ ...seoSettings, facebookPixelId: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="123456789012345"
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
