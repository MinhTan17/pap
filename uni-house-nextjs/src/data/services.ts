// Centralized services data for reuse across pages/components
export type ServiceIcon = 'laser' | 'milling' | 'precision' | 'heat' | 'plasma' | 'steel'

export interface ServiceItem {
  id: number
  title: string
  icon: ServiceIcon
  description: string
  color: string
  features?: string[]
}

export const services: ServiceItem[] = [
  {
    id: 1,
    title: 'GIA CÔNG CẮT LASER CNC',
    icon: 'laser',
    description: 'Việc nhập về máy gia công cắt laser đã giúp cho Khách hàng có quy trình khép kín từ việc cung cấp phôi thô cho đến gia công.',
    color: 'from-red-600 to-orange-500',
    features: ['Độ chính xác cao', 'Tốc độ nhanh', 'Biên dạng phức tạp']
  },
  {
    id: 2,
    title: 'GIA CÔNG PHAY VÀ MÀI 6 MẶT',
    icon: 'milling',
    description: 'Gia công phay và mài cho độ phẳng và độ song song cao.',
    color: 'from-blue-600 to-blue-800',
    features: ['Độ phẳng cao', 'Bề mặt đẹp', 'Kích thước chính xác']
  },
  {
    id: 3,
    title: 'GIA CÔNG KHUÔN MẪU, CƠ KHÍ CHÍNH XÁC',
    icon: 'precision',
    description: 'Đội ngũ kinh nghiệm, sản phẩm chính xác với thiết kế thông minh.',
    color: 'from-green-600 to-green-800',
    features: ['Dung sai chặt', 'Bền bỉ', 'Vật liệu đa dạng']
  },
  {
    id: 4,
    title: 'XỬ LÝ NHIỆT - NHIỆT LUYỆN',
    icon: 'heat',
    description: 'Tư vấn & hỗ trợ tối đa để sản phẩm đạt chất lượng tốt nhất.',
    color: 'from-orange-600 to-red-600',
    features: ['Tôi – Ram', 'Thấm Cacbon', 'Cải thiện cơ tính']
  },
  {
    id: 5,
    title: 'GIA CÔNG CẮT PLASMA',
    icon: 'plasma',
    description: 'Cắt chính xác – ưu tiên hàng đầu của chúng tôi.',
    color: 'from-purple-600 to-blue-600',
    features: ['Tấm lớn', 'Dày vật liệu', 'Chi phí tối ưu']
  },
  {
    id: 6,
    title: 'XUẤT NHẬP KHẨU SẮT THÉP',
    icon: 'steel',
    description: 'Cung cấp sắt thép tốt nhất của các nước tiên tiến với thời gian ngắn.',
    color: 'from-gray-600 to-gray-800',
    features: ['Nguồn hàng ổn định', 'Chủng loại đa dạng', 'Giao nhanh']
  }
]


