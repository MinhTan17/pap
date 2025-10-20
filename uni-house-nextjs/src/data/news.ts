// Centralized news data
export type NewsIcon = 'laser' | 'steel' | 'plasma'

export interface NewsItem {
  id: number
  title: string
  description: string
  icon: NewsIcon
  color: string
  image?: string
  category?: string
  date?: string
  readTime?: string
  excerpt?: string
}

export const homepageNews: NewsItem[] = [
  { id: 1, title: 'Gia công cắt Laser uy tín giá rẻ ở đâu?', description: 'Hiện nay, với thời buổi công nghệ 4.0 thì gia công cắt laser có vai trò và vị trí không nhỏ trong cách ngành thiết kế nội thất, trang trí,...giúp đây mạnh sự phát triển vượt bậc của nền kinh tế nước nhà.', icon: 'laser', color: 'from-red-500 to-orange-500' },
  { id: 2, title: 'Giá thép tại Trung Quốc tăng thêm 2%, lập đỉnh mới', description: 'Giá thép xây dựng và thép cuộn cán nóng tại Trung Quốc tăng phiên thứ 5 liên tiếp, tính đến ngày 25/6.', icon: 'steel', color: 'from-blue-500 to-blue-700' },
  { id: 3, title: 'Ưu và nhược điểm của máy cắt Laser và máy cắt Plasma', description: 'Sự hiện đại của ngành công nghiệp trên thế giới dẫn đến nhu cầu gia công vật liệu càng phổ biến...', icon: 'plasma', color: 'from-purple-500 to-blue-500' }
]

export const newsArticles: NewsItem[] = [
  {
    id: 1,
    title: 'Xu hướng thiết kế nội thất hiện đại năm 2024',
    excerpt: 'Khám phá những xu hướng thiết kế nội thất mới nhất đang được ưa chuộng trong năm 2024, từ phong cách tối giản đến các giải pháp thông minh.',
    category: 'Thiết kế',
    date: '15/01/2024',
    readTime: '5 phút đọc',
    image: '/api/placeholder/400/250',
    description: 'Nội dung bài viết chi tiết...',
    icon: 'steel',
    color: 'from-blue-500 to-blue-700'
  },
  {
    id: 2,
    title: 'Các loại vật liệu xây dựng bền vững cho tương lai',
    excerpt: 'Tìm hiểu về các loại vật liệu xây dựng thân thiện với môi trường và bền vững, giúp tiết kiệm chi phí và bảo vệ môi trường.',
    category: 'Vật liệu',
    date: '12/01/2024',
    readTime: '7 phút đọc',
    image: '/api/placeholder/400/250',
    description: 'Nội dung bài viết chi tiết...',
    icon: 'steel',
    color: 'from-blue-500 to-blue-700'
  },
  {
    id: 3,
    title: 'Quy trình thi công nhà ở an toàn và hiệu quả',
    excerpt: 'Hướng dẫn chi tiết về quy trình thi công nhà ở đúng chuẩn, đảm bảo an toàn và chất lượng công trình.',
    category: 'Thi công',
    date: '10/01/2024',
    readTime: '6 phút đọc',
    image: '/api/placeholder/400/250',
    description: 'Nội dung bài viết chi tiết...',
    icon: 'steel',
    color: 'from-blue-500 to-blue-700'
  },
  {
    id: 4,
    title: 'Công nghệ laser CNC trong xây dựng hiện đại',
    excerpt: 'Khám phá ứng dụng của công nghệ laser CNC trong ngành xây dựng, mang lại độ chính xác và hiệu quả cao.',
    category: 'Công nghệ',
    date: '08/01/2024',
    readTime: '8 phút đọc',
    image: '/api/placeholder/400/250',
    description: 'Nội dung bài viết chi tiết...',
    icon: 'laser',
    color: 'from-red-500 to-orange-500'
  },
  {
    id: 5,
    title: 'Tips chọn vật liệu xây dựng phù hợp với ngân sách',
    excerpt: 'Những lời khuyên hữu ích giúp bạn chọn lựa vật liệu xây dựng phù hợp với ngân sách mà vẫn đảm bảo chất lượng.',
    category: 'Tư vấn',
    date: '05/01/2024',
    readTime: '4 phút đọc',
    image: '/api/placeholder/400/250',
    description: 'Nội dung bài viết chi tiết...',
    icon: 'steel',
    color: 'from-blue-500 to-blue-700'
  },
  {
    id: 6,
    title: 'Dự án nhà ở xã hội - Cơ hội cho người dân',
    excerpt: 'Thông tin về các dự án nhà ở xã hội đang được triển khai, mang đến cơ hội sở hữu nhà ở cho người dân có thu nhập thấp.',
    category: 'Dự án',
    date: '03/01/2024',
    readTime: '6 phút đọc',
    image: '/api/placeholder/400/250',
    description: 'Nội dung bài viết chi tiết...',
    icon: 'steel',
    color: 'from-blue-500 to-blue-700'
  }
]


