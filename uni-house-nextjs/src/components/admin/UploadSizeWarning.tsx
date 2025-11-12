'use client'

import { useState } from 'react'

export default function UploadSizeWarning() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
      <div className="flex items-start gap-3">
        <span className="text-2xl">⚠️</span>
        <div className="flex-1">
          <h3 className="font-semibold text-yellow-900 mb-1">
            Giới Hạn Upload: 10MB/file
          </h3>
          <p className="text-sm text-yellow-800 mb-2">
            Cloudinary FREE plan giới hạn 10MB cho mỗi file. Nếu ảnh của bạn lớn hơn, vui lòng resize trước khi upload.
          </p>
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-sm text-yellow-900 font-medium hover:underline"
          >
            {isOpen ? '▼ Ẩn hướng dẫn' : '▶ Xem hướng dẫn resize ảnh'}
          </button>

          {isOpen && (
            <div className="mt-3 space-y-3 text-sm">
              <div>
                <h4 className="font-medium text-yellow-900 mb-1">
                  🛠️ Tools Resize/Compress Online:
                </h4>
                <ul className="space-y-1 pl-4">
                  <li>
                    <a 
                      href="https://tinypng.com/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline font-medium"
                    >
                      TinyPNG
                    </a>
                    {' '}- Compress nhanh, giữ chất lượng tốt
                  </li>
                  <li>
                    <a 
                      href="https://squoosh.app/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline font-medium"
                    >
                      Squoosh (Google)
                    </a>
                    {' '}- Resize + Compress, nhiều options
                  </li>
                  <li>
                    <a 
                      href="https://www.iloveimg.com/compress-image" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline font-medium"
                    >
                      iLoveIMG
                    </a>
                    {' '}- Batch compress nhiều ảnh cùng lúc
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-yellow-900 mb-1">
                  📏 Khuyến Nghị Kích Thước:
                </h4>
                <ul className="space-y-0.5 pl-4 text-yellow-800">
                  <li>• Banner/Hero: 1920x1080px, {'<'} 500KB</li>
                  <li>• Product Images: 1200x800px, {'<'} 300KB</li>
                  <li>• Thumbnails: 600x400px, {'<'} 100KB</li>
                  <li>• Quality: 75-80% (JPEG)</li>
                </ul>
              </div>

              <div className="bg-yellow-100 p-2 rounded">
                <p className="text-xs text-yellow-900">
                  💡 <strong>Tip:</strong> Ảnh web không cần resolution cao như ảnh in. 
                  Width 1920px là đủ cho màn hình 4K. Quality 75-80% vẫn trông rất đẹp nhưng nhẹ hơn nhiều.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
