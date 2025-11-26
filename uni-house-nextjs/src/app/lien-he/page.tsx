'use client'

import { useState, useEffect } from 'react'
import { Header, Footer } from '@/components'
import PageHeader from '@/components/PageHeader'
import { loadContactInfo } from '@/lib/contactStorage'
import { ContactInfo } from '@/types/contact'

export default function ContactPage() {
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const data = loadContactInfo()
    setContactInfo(data)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setSuccess(true)
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        })
        setTimeout(() => setSuccess(false), 5000)
      } else {
        setError(data.error || 'Có lỗi xảy ra')
      }
    } catch (err) {
      setError('Không thể kết nối đến server. Vui lòng thử lại.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <PageHeader
        title="LIÊN HỆ VỚI CHÚNG TÔI"
        description="Hãy liên hệ với chúng tôi để được tư vấn miễn phí về các sản phẩm thép và dịch vụ gia công cơ khí. Đội ngũ chuyên gia sẵn sàng hỗ trợ bạn 24/7."
        stats={[
          { value: '24/7', label: 'Hỗ trợ', color: 'text-blue-600' },
          { value: '<1h', label: 'Phản hồi', color: 'text-red-600' },
          { value: '4', label: 'Chi nhánh', color: 'text-green-600' },
          { value: '100%', label: 'Tư vấn miễn phí', color: 'text-purple-600' }
        ]}
      />

      {/* Contact Info & Form */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                {contactInfo?.company.name || 'PHÚ AN PHÁT'}
              </h3>

              <div className="space-y-3 text-gray-700">
                <p><strong>Địa chỉ:</strong> {contactInfo?.company.address || 'KCN Tam Phước, P.Tam Phước, Đồng Nai'}</p>
                <p><strong>Hotline:</strong> {contactInfo?.company.hotline || '0931 535 007'}</p>
              </div>

              <div className="mt-8">
                <h4 className="text-xl font-bold text-gray-800 mb-4">CÁC CHI NHÁNH THUỘC CÙNG MẠNG LƯỚI PHÚ AN PHÁT</h4>

                {contactInfo && contactInfo.northBranches.length > 0 && (
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

                {contactInfo && contactInfo.southBranches.length > 0 && (
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

            {/* Contact Form */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">GỬI LỜI NHẮN</h3>

              {success && (
                <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                  Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong thời gian sớm nhất.
                </div>
              )}

              {error && (
                <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Họ tên *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    placeholder="Nhập họ và tên"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Điện thoại *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                      placeholder="Nhập số điện thoại"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                      placeholder="Nhập email"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Ghi chú *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    placeholder="Nhập nội dung tin nhắn của bạn..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-yellow-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-yellow-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Đang gửi...
                    </>
                  ) : (
                    'Gửi lời nhắn'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <iframe
            src={contactInfo?.mapUrl || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.4449267878436!2d106.87445731533406!3d10.850445192277934!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d8a415c5b7e3%3A0x5d7a3b3e3e3e3e3e!2zxJDGsOG7nW5nIHPhu5EgOSwgVGFtIFBoxrDhu5tjLCBCacOqbiBIw7JhLCDEkOG7k25nIE5haSwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1234567890123!5m2!1svi!2s"}
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-lg shadow-lg"
          ></iframe>
        </div>
      </section>

      <Footer />
    </div>
  )
}
