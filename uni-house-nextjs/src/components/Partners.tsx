import { partners } from '@/data/partners'
import PartnersCarousel from './carousel/PartnersCarousel'

export default function Partners() {
  // Handle edge cases
  if (partners.length === 0) {
    return (
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 relative">
              <span className="bg-gradient-to-r from-blue-800 to-blue-900 bg-clip-text text-transparent">
                ĐỐI TÁC CHIẾN LƯỢC
              </span>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-600 to-red-600 rounded-full"></div>
            </h2>
            <p className="text-xl text-gray-600">
              Chưa có đối tác nào
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 relative">
            <span className="bg-gradient-to-r from-blue-800 to-blue-900 bg-clip-text text-transparent">
              ĐỐI TÁC CHIẾN LƯỢC
            </span>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-600 to-red-600 rounded-full"></div>
          </h2>
          <p className="text-xl text-gray-600">
            Các đối tác mà chúng tôi đã hợp tác hiện nay trên thị trường
          </p>
        </div>

        {/* Partners Carousel */}
        <PartnersCarousel partners={partners} />

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Bạn muốn trở thành đối tác của chúng tôi?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://zalo.me/0931535007"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-all"
            >
              Liên hệ hợp tác
            </a>
            <a
              href="mailto:contact@phuanphat.vn"
              className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-all"
            >
              Gửi email
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
