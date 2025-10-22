// Partners/Partners logos data
export interface Partner {
  id: number
  name: string
  logo: string
  website?: string
  description?: string
}

export const partners: Partner[] = [
  {
    id: 1,
    name: 'CÔNG TY TNHH KỸ THUẬT DAIKOU VIỆT NAM',
    logo: '/icons/partners/DAIKOU.jpg',
    website: 'https://daiko-vn.com/',
    description: 'Nghiên cứu, thiết kế và sản xuất các sản phẩm cơ khí chính xác, tự động hóa và robot'
  },
  {
    id: 2,
    name: 'Tập đoàn Hòa Phát',
    logo: '/icons/partners/hoa-phat.png',
    website: 'https://hoaphat.com.vn',
    description: 'Tập đoàn thép hàng đầu Việt Nam'
  },
  {
    id: 3,
    name: 'Công ty CP Kim loại Màu',
    logo: '/icons/partners/kim-loai-mau.png',
    website: 'https://nonferrous.vn',
    description: 'Chuyên gia hợp kim màu'
  },
  {
    id: 4,
    name: 'Công ty TNHH Vật liệu Xây dựng ABC',
    logo: '/icons/partners/abc-construction.png',
    website: 'https://abc.vn',
    description: 'Vật liệu xây dựng chất lượng cao'
  },
  {
    id: 5,
    name: 'Nhà máy Thép Pomina',
    logo: '/icons/partners/pomina.png',
    website: 'https://pomina.com.vn',
    description: 'Thép xây dựng cao cấp'
  },
  {
    id: 6,
    name: 'Công ty CP Thép Việt Ý',
    logo: '/icons/partners/viet-y.png',
    website: 'https://viety.com.vn',
    description: 'Thép công nghiệp chất lượng'
  }
]
