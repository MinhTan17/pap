// Centralized products data
export interface ProductCategory {
  id: string
  name: string
}

export interface ProductItem {
  id: number
  name: string
  category: string
  image?: string // Main product image
  images?: string[] // Multiple images for detail page
  description: string
  color: string
  features?: string[]
  price: string
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
  {
    id: 1,
    name: 'Hợp kim đồng: C3604, C1020, C1100',
    category: 'alloy',
    price: 'Liên hệ',
    description: 'Hợp kim đồng chất lượng cao',
    color: 'from-orange-500 to-red-600',
    image: '/icons/products/C1100.png',
    images: [
      '/icons/products/C1100.png',
      '/icons/products/C1100.png',
      '/icons/products/C1100.png',
      '/icons/products/C1100.png'
    ]
  },
  {
    id: 2,
    name: 'Hợp kim nhôm: A1050, A5052, A6061, A7075',
    category: 'alloy',
    price: 'Liên hệ',
    description: 'Hợp kim nhôm đa dạng',
    color: 'from-gray-400 to-gray-600',
    image: '/icons/products/nhom.png',
    images: [
      '/icons/products/nhom.png',
      '/icons/products/nhom-1.png',
      '/icons/products/nhom-2.png',
      '/icons/products/nhom-3.png'
    ]
  },
  {
    id: 3,
    name: 'Thép làm khuôn dập nóng: SKT4, SKD61, DH2F',
    category: 'mold-steel',
    price: 'Liên hệ',
    description: 'Thép khuôn dập nóng',
    color: 'from-red-600 to-red-800',
    image: '/icons/products/khuon-nong.png',
    images: [
      '/icons/products/khuon-nong.png',
      '/icons/products/khuon-nong-1.png',
      '/icons/products/khuon-nong-2.png',
      '/icons/products/khuon-nong-3.png'
    ]
  },
  {
    id: 4,
    name: 'Thép không gỉ: SUS201, SUS304, SUS316',
    category: 'stainless-steel',
    price: 'Liên hệ',
    description: 'Thép không gỉ chất lượng',
    color: 'from-blue-400 to-blue-600',
    image: '/icons/products/khong-gi.png',
    images: [
      '/icons/products/khong-gi.png',
      '/icons/products/khong-gi-1.png',
      '/icons/products/khong-gi-2.png',
      '/icons/products/khong-gi-3.png'
    ]
  },
  {
    id: 5,
    name: 'Thép làm khuôn dập nguội: SK3, SKS3, SKD11, DC53, SLD',
    category: 'mold-steel',
    price: 'Liên hệ',
    description: 'Thép khuôn dập nguội',
    color: 'from-blue-600 to-blue-800',
    image: '/icons/products/sks3.png',
    images: [
      '/icons/products/sks3.png',
      '/icons/products/sks3.png',
      '/icons/products/sks3.png',
      '/icons/products/sks3.png'
    ]
  },
  {
    id: 6,
    name: 'Thép làm khuôn nhựa: P20, 2311, 2083, SUS420J2, NAK55, NAK80',
    category: 'mold-steel',
    price: 'Liên hệ',
    description: 'Thép khuôn nhựa chuyên dụng',
    color: 'from-green-500 to-green-700',
    image: '/icons/products/p20.png',
    images: [
      '/icons/products/p20.png',
      '/icons/products/p20.png',
      '/icons/products/p20.png',
      '/icons/products/p20.png'
    ]
  },
  {
    id: 7,
    name: 'Thép chế tạo máy: SCR420, SCR440, SCM415, SCM420, SCM440, SNCM439, 65Mn, 5XM',
    category: 'machine-steel',
    price: 'Liên hệ',
    description: 'Thép chế tạo máy',
    color: 'from-purple-500 to-purple-700',
    image: '/icons/products/che-tao.png',
    images: [
      '/icons/products/che-tao.png',
      '/icons/products/che-tao-1.png',
      '/icons/products/che-tao-2.png',
      '/icons/products/che-tao-3.png'
    ]
  },
  {
    id: 8,
    name: 'Thép Carbon: S20C, SS400, S45C, S50C, S55C',
    category: 'carbon-steel',
    price: 'Liên hệ',
    description: 'Thép Carbon đa dạng',
    color: 'from-gray-600 to-gray-800',
    image: '/icons/products/carbon.png',
    images: [
      '/icons/products/carbon.png',
      '/icons/products/carbon-1.png',
      '/icons/products/carbon-2.png',
      '/icons/products/carbon-3.png'
    ]
  }
]


