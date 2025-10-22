// Banner/Slideshow data structure
export interface BannerSlide {
  id: number
  title: string
  subtitle: string
  description: string
  gradient: string
  image?: string // Path to banner background image (optional)
  link?: string
  imageAlt?: string
}

export const initialBanners: BannerSlide[] = [
  {
    id: 1,
    title: "GIA CÔNG CẮT LASER CNC",
    subtitle: "CÔNG NGHỆ HIỆN ĐẠI",
    description: "Cung cấp dịch vụ gia công cắt laser CNC chính xác cao với công nghệ tiên tiến",
    gradient: "from-red-600 via-orange-500 to-yellow-500",
    image: "/icons/banners/bn.png",
    imageAlt: "Banner gia công laser CNC"
  },
  {
    id: 2,
    title: "SẮT THÉP CHẤT LƯỢNG CAO", 
    subtitle: "NHẬP KHẨU TRỰC TIẾP",
    description: "Nhập khẩu và phân phối các loại sắt thép chất lượng cao từ các nước tiên tiến",
    gradient: "from-blue-600 via-blue-700 to-gray-800",
    image: "/icons/banners/bn2.png?v=2",
    imageAlt: "Banner sắt thép chất lượng cao"
  },
  {
    id: 3,
    title: "CƠ KHÍ CHÍNH XÁC",
    subtitle: "KINH NGHIỆM 20+ NĂM",
    description: "Đội ngũ kỹ thuật giàu kinh nghiệm, cam kết chất lượng và tiến độ giao hàng",
    gradient: "from-green-600 via-green-700 to-blue-800",
    image: "/icons/banners/bn3.png?v=2",
    imageAlt: "Banner cơ khí chính xác"
  }
]
