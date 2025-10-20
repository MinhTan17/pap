// Centralized products data
export type ProductIcon = 'copper' | 'aluminum' | 'hot-die' | 'stainless' | 'cold-die' | 'plastic-mold' | 'machine' | 'carbon'

export interface ProductCategory {
  id: string
  name: string
}

export interface ProductItem {
  id: number
  name: string
  category: string
  price: string
  description: string
  icon: ProductIcon
  color: string
  images?: string[]
}

export const categories: ProductCategory[] = [
  { id: 'all', name: 'Tất cả sản phẩm' },
  { id: 'alloy', name: 'Hợp kim' },
  { id: 'mold-steel', name: 'Thép làm khuôn' },
  { id: 'machine-steel', name: 'Thép chế tạo máy' },
  { id: 'carbon-steel', name: 'Thép Carbon' },
  { id: 'stainless-steel', name: 'Thép không rỉ' }
]

export const products: ProductItem[] = [
  { id: 1, name: 'Hợp kim đồng: C3604, C1020, C1100', category: 'alloy', price: 'Liên hệ', description: 'Hợp kim đồng chất lượng cao', icon: 'copper', color: 'from-orange-500 to-red-600' },
  { id: 2, name: 'Hợp kim nhôm: A1050, A5052, A6061, A7075', category: 'alloy', price: 'Liên hệ', description: 'Hợp kim nhôm đa dạng', icon: 'aluminum', color: 'from-gray-400 to-gray-600' },
  { id: 3, name: 'Thép làm khuôn dập nóng: SKT4, SKD61, DH2F', category: 'mold-steel', price: 'Liên hệ', description: 'Thép khuôn dập nóng', icon: 'hot-die', color: 'from-red-600 to-red-800' },
  { id: 4, name: 'Thép không gỉ: SUS201, SUS304, SUS316', category: 'stainless-steel', price: 'Liên hệ', description: 'Thép không gỉ chất lượng', icon: 'stainless', color: 'from-blue-400 to-blue-600' },
  { id: 5, name: 'Thép làm khuôn dập nguội: SK3, SKS3, SKD11, DC53, SLD', category: 'mold-steel', price: 'Liên hệ', description: 'Thép khuôn dập nguội', icon: 'cold-die', color: 'from-blue-600 to-blue-800' },
  { id: 6, name: 'Thép làm khuôn nhựa: P20, 2311, 2083, SUS420J2, NAK55, NAK80', category: 'mold-steel', price: 'Liên hệ', description: 'Thép khuôn nhựa chuyên dụng', icon: 'plastic-mold', color: 'from-green-500 to-green-700' },
  { id: 7, name: 'Thép chế tạo máy: SCR420, SCR440, SCM415, SCM420, SCM440, SNCM439, 65Mn, 5XM', category: 'machine-steel', price: 'Liên hệ', description: 'Thép chế tạo máy', icon: 'machine', color: 'from-purple-500 to-purple-700' },
  { id: 8, name: 'Thép Carbon: S20C, SS400, S45C, S50C, S55C', category: 'carbon-steel', price: 'Liên hệ', description: 'Thép Carbon đa dạng', icon: 'carbon', color: 'from-gray-600 to-gray-800' }
]


