// Admin navigation/menu data
export interface AdminMenuItem {
  id: string
  label: string
  href?: string
  icon?: string
  children?: AdminMenuItem[]
}

export const adminMenu: AdminMenuItem[] = [
  {
    id: 'intro',
    label: 'NHÓM GIỚI THIỆU',
    children: [
      { id: 'fields', label: 'Lĩnh vực hoạt động', href: '/admin/intro/fields' },
      { id: 'about', label: 'Giới thiệu', href: '/admin/intro/about' },
      { id: 'about-main', label: 'Giới thiệu Main', href: '/admin/intro/about-main' }
    ]
  },
  {
    id: 'product',
    label: 'QUẢN LÝ SẢN PHẨM',
    children: [
      { id: 'factory-620', label: 'Nhà máy 620', href: '/admin/products/factory-620' },
      { id: 'equipment', label: 'Trang thiết bị', href: '/admin/products/equipment' }
    ]
  },
  {
    id: 'posts',
    label: 'QUẢN LÝ BÀI VIẾT',
    children: [
      { id: 'projects', label: 'Dự án', href: '/admin/posts/projects' },
      { id: 'construction', label: 'Thiết bị thi công', href: '/admin/posts/construction' },
      { id: 'advantages', label: 'Ưu điểm', href: '/admin/posts/advantages' },
      { id: 'factory', label: 'Nhà máy sản xuất', href: '/admin/posts/factory' },
      { id: 'news', label: 'Tin tức', href: '/admin/posts/news' },
      { id: 'careers', label: 'Tuyển dụng', href: '/admin/posts/careers' },
      { id: 'services', label: 'Dịch vụ', href: '/admin/posts/services' }
    ]
  },
  {
    id: 'static',
    label: 'QUẢN LÝ TRANG TĨNH',
    children: [
      { id: 'profile', label: 'Hồ sơ năng lực', href: '/admin/static/profile' },
      { id: 'slogan', label: 'Slogan', href: '/admin/static/slogan' },
      { id: 'contact', label: 'Liên hệ', href: '/admin/static/contact' },
      { id: 'footer', label: 'Footer', href: '/admin/static/footer' }
    ]
  },
  {
    id: 'media',
    label: 'QUẢN LÝ HÌNH ẢNH - LIÊN KẾT',
    children: [
      { id: 'logo', label: 'Logo', href: '/admin/media/logo' },
      { id: 'banner', label: 'Banner', href: '/admin/media/banner' },
      { id: 'favicon', label: 'Favicon', href: '/admin/media/favicon' },
      { id: 'slideshow', label: 'Slideshow', href: '/admin/media/slideshow' },
      { id: 'partners', label: 'Đối tác', href: '/admin/media/partners' },
      { id: 'social-header', label: 'Mạng xã hội header', href: '/admin/media/social-header' },
      { id: 'social-footer', label: 'Mạng xã hội footer', href: '/admin/media/social-footer' },
      { id: 'social', label: 'Mạng xã hội', href: '/admin/media/social' }
    ]
  },
  {
    id: 'email',
    label: 'QUẢN LÝ EMAIL',
    children: [
      { id: 'contact-mail', label: 'Liên hệ', href: '/admin/email/contact' },
      { id: 'newsletter', label: 'Đăng ký nhận tin', href: '/admin/email/newsletter' }
    ]
  }
]


