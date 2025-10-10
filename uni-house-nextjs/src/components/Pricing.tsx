export default function Pricing() {
  const pricingItems = [
    {
      title: "BÁO GIÁ THIẾT KẾ",
      note: "Đơn giá áp dụng từ 12-2021 đến khi có cập nhật thông tin mới trên website",
      link: "Xem Thêm"
    },
    {
      title: "BÁO GIÁ THI CÔNG",
      note: "Đơn giá áp dụng từ 1-2023 đến khi có cập nhật thông tin mới trên website",
      link: "Xem Thêm"
    },
    {
      title: "BÁO GIÁ HOÀN THIỆN",
      note: "Đơn giá áp dụng từ 12-2021 đến khi có cập nhật thông tin mới trên website",
      link: "Xem Thêm"
    },
    {
      title: "BÁO GIÁ NỘI THẤT",
      note: "Đơn giá áp dụng từ 12-2021 đến khi có cập nhật thông tin mới trên website",
      link: "Xem Thêm"
    }
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Báo Giá Dịch Vụ
          </h2>
          <p className="text-xl text-gray-600">
            Thông tin báo giá chi tiết cho các dịch vụ của chúng tôi
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pricingItems.map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="text-center">
                <h3 className="text-xl font-bold text-blue-600 mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-6 text-sm">
                  {item.note}
                </p>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  {item.link}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
