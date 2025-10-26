export interface ServiceItem {
  id: number
  title: string
  description: string
  icon?: string
  image?: string
  features?: string[]
  color?: string
}

export const services: ServiceItem[] = [
  {
    "id": 1,
    "title": "GIA CÔNG CẮT LASER CNC",
    "description": "Việc nhập về máy gia công cắt laser đã giúp cho Khách hàng có quy trình khép kín từ việc cung cấp phôi thô cho đến gia công.",
    "color": "from-red-600 to-orange-500",
    "features": [
      "Độ chính xác cao",
      "Tốc độ nhanh",
      "Biên dạng phức tạp"
    ],
    "image": "/icons/services/gcls.png"
  },
  {
    "id": 2,
    "title": "GIA CÔNG PHAY VÀ MÀI 6 MẶT",
    "description": "Gia công phay và mài cho độ phẳng và độ song song cao.",
    "color": "from-blue-600 to-blue-800",
    "features": [
      "Độ phẳng cao",
      "Bề mặt đẹp",
      "Kích thước chính xác"
    ],
    "image": "/icons/services/m.png"
  },
  {
    "id": 3,
    "title": "GIA CÔNG KHUÔN MẪU, CƠ KHÍ CHÍNH XÁC",
    "description": "Đội ngũ kinh nghiệm, sản phẩm chính xác với thiết kế thông minh.",
    "color": "from-green-600 to-green-800",
    "features": [
      "Dung sai chặt",
      "Bền bỉ",
      "Vật liệu đa dạng"
    ],
    "image": "/icons/services/phay.png"
  },
  {
    "id": 4,
    "title": "XỬ LÝ NHIỆT - NHIỆT LUYỆN",
    "description": "Tư vấn & hỗ trợ tối đa để sản phẩm đạt chất lượng tốt nhất.",
    "color": "from-orange-600 to-red-600",
    "features": [
      "Tôi – Ram",
      "Thấm Cacbon",
      "Cải thiện cơ tính"
    ],
    "image": "/icons/services/phay.png"
  },
  {
    "id": 5,
    "title": "GIA CÔNG CẮT PLASMA",
    "description": "Cắt chính xác – ưu tiên hàng đầu của chúng tôi.",
    "color": "from-purple-600 to-blue-600",
    "features": [
      "Tấm lớn",
      "Dày vật liệu",
      "Chi phí tối ưu"
    ],
    "image": "/icons/services/phay.png"
  },
  {
    "id": 6,
    "title": "XUẤT NHẬP KHẨU SẮT THÉP",
    "description": "Cung cấp sắt thép tốt nhất của các nước tiên tiến với thời gian ngắn.",
    "color": "from-yellow-600 to-amber-600",
    "features": [
      "Nguồn gốc rõ ràng",
      "Chất lượng đảm bảo",
      "Giá cả cạnh tranh"
    ],
    "image": "/icons/services/phay.png"
  }
]
