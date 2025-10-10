export default function ProductsSection() {
  const products = [
    { id: 1, name: "GẠCH ỐP LÁT", image: "/api/placeholder/300/200" },
    { id: 2, name: "SÀN GỖ", image: "/api/placeholder/300/200" },
    { id: 3, name: "THẢM", image: "/api/placeholder/300/200" },
    { id: 4, name: "NỘI THẤT", image: "/api/placeholder/300/200" },
    { id: 5, name: "VẬT LIỆU XÂY DỰNG", image: "/api/placeholder/300/200" },
    { id: 6, name: "VẬT LIỆU ỐP TƯỜNG", image: "/api/placeholder/300/200" },
    { id: 7, name: "ĐÁ HOA CƯƠNG", image: "/api/placeholder/300/200" },
    { id: 8, name: "NỘI THẤT VĂN PHÒNG", image: "/api/placeholder/300/200" },
    { id: 9, name: "XI MĂNG LAPILLA", image: "/api/placeholder/300/200" },
    { id: 10, name: "GẠCH TÀU 30X30", image: "/api/placeholder/300/200" },
    { id: 11, name: "GẠCH RỖNG", image: "/api/placeholder/300/200" },
    { id: 12, name: "ĐÁ DĂM", image: "/api/placeholder/300/200" }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            SẢN PHẨM NỔI BẬT
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="aspect-square bg-gray-200 flex items-center justify-center">
                  <div className="text-center text-gray-600">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                    <p className="text-xs">Sản phẩm</p>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition-colors text-center">
                    {product.name}
                  </h3>
                  <div className="text-center mt-2">
                    <span className="text-blue-600 text-sm font-medium">Liên hệ</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
