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
    id: 'dashboard',
    label: 'TỔNG QUAN',
    children: [
      { id: 'overview', label: 'Bảng điều khiển', href: '/admin' }
    ]
  },
  {
    id: 'content',
    label: 'QUẢN LÝ NỘI DUNG',
    children: [
      { id: 'banners', label: 'Banner/Slideshow', href: '/admin/banners' },
      { id: 'services', label: 'Dịch vụ', href: '/admin/services' },
      // { id: 'services-detail', label: 'Chi tiết dịch vụ', href: '/admin/services/1' }, // Placeholder, sẽ dynamic
      { id: 'products', label: 'Sản phẩm', href: '/admin/products' },
      // { id: 'products-detail', label: 'Chi tiết sản phẩm', href: '/admin/products/1' }, // Placeholder
      { id: 'news', label: 'Tin tức', href: '/admin/news' },
      // { id: 'news-detail', label: 'Chi tiết tin tức', href: '/admin/news/1' }, // Placeholder, sẽ dynamic
      { id: 'categories', label: 'Danh mục sản phẩm', href: '/admin/categories' }
    ]
  },
  {
    id: 'pages',
    label: 'QUẢN LÝ TRANG',
    children: [
      { id: 'homepage', label: 'Trang chủ', href: '/admin/pages/homepage' },
      { id: 'about', label: 'Giới thiệu', href: '/admin/pages/about' },
      { id: 'contact', label: 'Liên hệ', href: '/admin/pages/contact' }
    ]
  },
  {
    id: 'media',
    label: 'QUẢN LÝ MEDIA',
    children: [
      { id: 'media', label: 'Hình ảnh & Video', href: '/admin/media' }
    ]
  },
  {
    id: 'settings',
    label: 'CÀI ĐẶT',
    children: [
      { id: 'company', label: 'Thông tin công ty', href: '/admin/settings/company' },
      { id: 'seo', label: 'SEO & Meta', href: '/admin/settings/seo' },
      { id: 'contact-info', label: 'Thông tin liên hệ', href: '/admin/settings/contact' }
    ]
  }
]


