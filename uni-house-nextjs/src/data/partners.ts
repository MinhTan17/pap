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
    name: 'CÔNG TY TNHH DAITOH INDUSTRY VIỆT NAM',
    logo: '/icons/partners/DAITOH.png',
    website: 'http://daitoh-vietnam.com/?lang=vi.vn',
    description: 'Tập đoàn thép hàng đầu Việt Nam'
  },
  {
    id: 3,
    name: 'CÔNG TY HỮU HẠN CƠ KHÍ ĐỘNG LỰC TOÀN CẦU',
    logo: '/icons/partners/dltc.png',
    website: 'https://https://masothue.com/3602852511-cong-ty-huu-han-co-khi-dong-luc-toan-cau.vn',
    description: 'Chuyên gia hợp kim màu'
  },
  {
    id: 4,
    name: 'CÔNG TY TRÁCH NHIỆM HỮU HẠN HIROTA PRECISION VIỆT NAM',
    logo: '/icons/partners/hrt.jpg',
    website: 'https://hirota-vn.com/',
    description: 'Vật liệu xây dựng chất lượng cao'
  },
  {
    id: 5,
    name: 'CÔNG TY CỔ PHẦN CÁP ĐIỆN VÀ HỆ THỐNG LS-VINA',
    logo: '/icons/partners/lsvina.png',
    website: 'https://lsvinacns.vn/',
    description: 'Thép xây dựng cao cấp'
  },
  {
    id: 6,
    name: 'CÔNG TY TNHH STOLZ-MIRAS (VIỆT NAM)',
    logo: '/icons/partners/mras.png',
    website: 'https://www.stolzmiras.com/',
    description: 'Thép công nghiệp chất lượng'
  }
  
]
