export interface ProductItem {
  id: number
  name: string
  category: string
  description: string
  image: string
  images?: string[]
  gallery?: string[]
  color?: string
  price?: string
  specifications?: {
    material?: string
    thickness?: string
    size?: string
    standard?: string
    origin?: string
    [key: string]: string | undefined
  }
}

export interface ProductCategory {
  id: string
  name: string
  description?: string
}

export const products: ProductItem[] = [
  {
    "id": 1,
    "name": "Hợp kim đồng: C3604, C1020, C1100",
    "category": "alloy",
    "price": "Liên hệ",
    "description": "Hợp kim đồng chất lượng cao",
    "color": "from-orange-500 to-red-600",
    "image": "/icons/products/image-1761476431689.png",
    "images": [
      "/icons/products/image-1761476443922.png",
      "/icons/products/image-1761476443876.jpeg",
      "/icons/products/image-1761476443839.jpeg"
    ]
  },
  {
    "id": 2,
    "name": "Hợp kim nhôm: A1050, A5052, A6061, A7075",
    "category": "alloy",
    "price": "Liên hệ",
    "description": "Hợp kim nhôm đa dạng",
    "color": "from-gray-400 to-gray-600",
    "image": "/icons/products/image-1761473319764.png",
    "images": [
      "/icons/products/image-1761476648731.png",
      "/icons/products/image-1761476648750.png",
      "/icons/products/image-1761476780820.jpeg",
      "/icons/products/image-1761477034599.png"
    ]
  },
  {
    "id": 3,
    "name": "Thép làm khuôn dập nóng: SKT4, SKD61, DH2F",
    "category": "mold-steel",
    "price": "Liên hệ",
    "description": "Thép khuôn dập nóng",
    "color": "from-red-600 to-red-800",
    "image": "/icons/products/image-1761474105498.png",
    "images": [
      "/icons/products/image-1761477217412.png",
      "/icons/products/image-1761477217444.png",
      "/icons/products/image-1761477217452.png",
      "/icons/products/image-1761477217476.png",
      "/icons/products/image-1761477237080.png",
      "/icons/products/image-1761477237032.png"
    ]
  },
  {
    "id": 4,
    "name": "Thép không gỉ: SUS201, SUS304, SUS316",
    "category": "stainless-steel",
    "price": "Liên hệ",
    "description": "Thép không gỉ chất lượng",
    "color": "from-blue-400 to-blue-600",
    "image": "/icons/products/image-1761474394635.png",
    "images": [
      "/icons/products/image-1761477603687.png",
      "/icons/products/image-1761477616141.webp",
      "/icons/products/image-1761477616214.png",
      "/icons/products/image-1761477616183.jpeg"
    ]
  },
  {
    "id": 5,
    "name": "Thép làm khuôn dập nguội: SK3, SKS3, SKD11, DC53, SLD",
    "category": "mold-steel",
    "price": "Liên hệ",
    "description": "Thép khuôn dập nguội",
    "color": "from-blue-600 to-blue-800",
    "image": "/icons/products/sks3.png",
    "images": [
      "/icons/products/sks3.png",
      "/icons/products/image-1761478051227.jpeg",
      "/icons/products/image-1761478051274.jpeg",
      "/icons/products/image-1761478051260.jpeg"
    ]
  },
  {
    "id": 6,
    "name": "Thép làm khuôn nhựa: P20, 2311, 2083, SUS420J2, NAK55, NAK80",
    "category": "mold-steel",
    "price": "Liên hệ",
    "description": "Thép khuôn nhựa chuyên dụng",
    "color": "from-green-500 to-green-700",
    "image": "/icons/products/p20.png",
    "images": [
      "/icons/products/p20.png",
      "/icons/products/image-1761477937205.webp",
      "/icons/products/image-1761477937164.jpeg",
      "/icons/products/image-1761477937230.png",
      "/icons/products/image-1761477937215.png"
    ]
  },
  {
    "id": 7,
    "name": "Thép chế tạo máy: SCR420, SCR440, SCM415, SCM420, SCM440, SNCM439, 65Mn, 5XM",
    "category": "machine-steel",
    "price": "Liên hệ",
    "description": "Thép chế tạo máy",
    "color": "from-purple-500 to-purple-700",
    "image": "/icons/products/image-1761478223565.png",
    "images": [
      "/icons/products/image-1761478237372.png",
      "/icons/products/image-1761478237319.webp",
      "/icons/products/image-1761478237333.jpeg",
      "/icons/products/image-1761478237281.webp"
    ]
  },
  {
    "id": 8,
    "name": "Thép Carbon: S20C, SS400, S45C, S50C, S55C",
    "category": "carbon-steel",
    "price": "Liên hệ",
    "description": "Thép Carbon đa dạng",
    "color": "from-gray-600 to-gray-800",
    "image": "/icons/products/image-1761478293405.png",
    "images": [
      "/icons/products/image-1761478301402.png",
      "/icons/products/image-1761478386644.jpeg",
      "/icons/products/image-1761478386596.jpeg",
      "/icons/products/image-1761478386625.webp",
      "/icons/products/image-1761478386659.jpeg"
    ]
  }
]

export const categories: ProductCategory[] = [
  { id: 'all', name: 'Tất cả sản phẩm' },
  { id: 'alloy', name: 'Hợp kim' },
  { id: 'mold-steel', name: 'Thép làm khuôn' },
  { id: 'machine-steel', name: 'Thép chế tạo máy' },
  { id: 'carbon-steel', name: 'Thép Carbon' },
  { id: 'stainless-steel', name: 'Thép không rỉ' }
]
