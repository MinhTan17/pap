'use client'

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { services as initialServices, ServiceItem } from '@/data/services'
import { products as initialProducts, categories as initialCategories, ProductItem, ProductCategory } from '@/data/products'
import { newsArticles as initialNews, homepageNews as initialHomepageNews, NewsItem } from '@/data/news'
import { initialBanners, BannerSlide } from '@/data/banners'

interface DataContextType {
  // Services
  services: ServiceItem[]
  updateServices: (services: ServiceItem[]) => void
  addService: (service: ServiceItem) => void
  updateService: (id: number, service: ServiceItem) => void
  deleteService: (id: number) => void

  // Products
  products: ProductItem[]
  updateProducts: (products: ProductItem[]) => void
  addProduct: (product: ProductItem) => void
  updateProduct: (id: number, product: ProductItem) => void
  deleteProduct: (id: number) => void

  // Categories
  categories: ProductCategory[]
  updateCategories: (categories: ProductCategory[]) => void
  addCategory: (category: ProductCategory) => void
  updateCategory: (id: string, category: ProductCategory) => void
  deleteCategory: (id: string) => void

  // News
  newsArticles: NewsItem[]
  homepageNews: NewsItem[]
  updateNewsArticles: (news: NewsItem[]) => void
  updateHomepageNews: (news: NewsItem[]) => void
  addNews: (news: NewsItem) => void
  updateNews: (id: number, news: NewsItem) => void
  deleteNews: (id: number) => void

  // Banners
  banners: BannerSlide[]
  updateBanners: (banners: BannerSlide[]) => void
  addBanner: (banner: BannerSlide) => void
  updateBanner: (id: number, banner: BannerSlide) => void
  deleteBanner: (id: number) => void
  
  // Reload from storage
  reloadFromStorage: () => void
}

const DataContext = createContext<DataContextType | undefined>(undefined)

export function DataProvider({ children }: { children: React.ReactNode }) {
  // Initialize state with localStorage or default data
  const [services, setServices] = useState<ServiceItem[]>(() => {
    if (typeof window === 'undefined') return initialServices

    try {
      const saved = localStorage.getItem('admin-services')
      if (!saved) return initialServices

      const parsed: ServiceItem[] = JSON.parse(saved)
      // Gộp để đảm bảo luôn có field image (và các field mới khác)
      return initialServices.map(init => {
        const found = parsed.find(p => p.id === init.id)
        return { ...init, ...found } // init có ảnh chuẩn
      })
    } catch {
      return initialServices
    }
  })

  // Listen for localStorage changes from other tabs/windows AND same tab (admin)
  useEffect(() => {
    // Handler for cross-tab changes (storage event)
    const handleStorageChange = (e: StorageEvent) => {
      if (!e.newValue) return

      try {
        const parsed = JSON.parse(e.newValue)
        
        switch (e.key) {
          case 'admin-services':
            setServices(parsed)
            console.log('🔄 Services updated from admin (cross-tab)')
            break
          case 'admin-products':
            setProducts(parsed)
            console.log('🔄 Products updated from admin (cross-tab)')
            break
          case 'admin-banners':
            setBanners(parsed)
            console.log('🔄 Banners updated from admin (cross-tab)')
            break
          case 'admin-news-articles':
            setNewsArticles(parsed)
            console.log('🔄 News updated from admin (cross-tab)')
            break
          case 'admin-categories':
            setCategories(parsed)
            console.log('🔄 Categories updated from admin (cross-tab)')
            break
        }
      } catch (error) {
        console.error('Error parsing storage change:', error)
      }
    }

    // Handler for same-tab changes (custom event)
    const handleCustomStorageChange = (e: Event) => {
      const customEvent = e as CustomEvent
      const { key, value } = customEvent.detail
      
      switch (key) {
        case 'admin-services':
          setServices(value)
          console.log('🔄 Services updated from admin (same-tab)')
          break
        case 'admin-products':
          setProducts(value)
          console.log('🔄 Products updated from admin (same-tab)')
          break
        case 'admin-banners':
          setBanners(value)
          console.log('🔄 Banners updated from admin (same-tab)')
          break
        case 'admin-news-articles':
          setNewsArticles(value)
          console.log('🔄 News updated from admin (same-tab)')
          break
        case 'admin-categories':
          setCategories(value)
          console.log('🔄 Categories updated from admin (same-tab)')
          break
      }
    }

    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('localStorageChange', handleCustomStorageChange)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('localStorageChange', handleCustomStorageChange)
    }
  }, [])

  const [products, setProducts] = useState<ProductItem[]>(() => {
    if (typeof window === 'undefined') return initialProducts

    try {
      const saved = localStorage.getItem('admin-products')
      if (!saved) return initialProducts

      const parsed: ProductItem[] = JSON.parse(saved)
      return initialProducts.map(init => {
        const found = parsed.find(p => p.id === init.id)
        return { ...init, ...found }
      })
    } catch {
      return initialProducts
    }
  })

  const [categories, setCategories] = useState<ProductCategory[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('admin-categories')
      return saved ? JSON.parse(saved) : initialCategories
    }
    return initialCategories
  })

  const [newsArticles, setNewsArticles] = useState<NewsItem[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('admin-news-articles')
      return saved ? JSON.parse(saved) : initialNews
    }
    return initialNews
  })

  const [homepageNews, setHomepageNews] = useState<NewsItem[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('admin-homepage-news')
      return saved ? JSON.parse(saved) : initialHomepageNews
    }
    return initialHomepageNews
  })

  const [banners, setBanners] = useState<BannerSlide[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('admin-banners')
      return saved ? JSON.parse(saved) : initialBanners
    }
    return initialBanners
  })

  // Helper function to safely save to localStorage
  const safeLocalStorageSet = (key: string, value: any) => {
    if (typeof window === 'undefined') return
    
    try {
      const jsonString = JSON.stringify(value)
      const sizeKB = (new Blob([jsonString]).size / 1024).toFixed(2)
      localStorage.setItem(key, jsonString)
      console.log(`💾 Đã lưu ${key}: ${sizeKB}KB`)
      
      // Dispatch custom event để sync trong cùng tab
      window.dispatchEvent(new CustomEvent('localStorageChange', {
        detail: { key, value }
      }))
    } catch (error) {
      if (error instanceof DOMException && error.name === 'QuotaExceededError') {
        console.error(`❌ localStorage đầy! Không thể lưu ${key}`)
        alert(`⚠️ CẢNH BÁO: Bộ nhớ localStorage đã đầy!\n\n` +
              `Không thể lưu: ${key}\n\n` +
              `Giải pháp:\n` +
              `1. Xóa bớt dữ liệu không cần thiết\n` +
              `2. Dùng đường dẫn file thay vì upload base64\n` +
              `3. Nén ảnh trước khi upload\n` +
              `4. Xóa cache: F12 > Application > Local Storage > Clear All`)
      } else {
        console.error(`❌ Lỗi khi lưu ${key}:`, error)
      }
    }
  }

  // Save to localStorage AND file whenever state changes
  useEffect(() => {
    safeLocalStorageSet('admin-services', services)
    
    // Convert base64 to files and save
    if (typeof window !== 'undefined') {
      const processAndSave = async () => {
        const processedServices = await Promise.all(
          services.map(async (service) => {
            if (service.image && service.image.startsWith('data:image/')) {
              const newPath = await convertBase64ToFile(service.image, 'icons/services')
              return { ...service, image: newPath }
            }
            return service
          })
        )
        
        fetch('/api/services', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(processedServices)
        })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            console.log('✅ Đã lưu services vào file!')
            if (JSON.stringify(processedServices) !== JSON.stringify(services)) {
              setServices(processedServices)
            }
          }
        })
        .catch(err => console.error('❌ Lỗi khi lưu services:', err))
      }
      
      processAndSave()
    }
  }, [services])

  useEffect(() => {
    safeLocalStorageSet('admin-products', products)
    
    // Convert base64 to files and save
    if (typeof window !== 'undefined') {
      const processAndSave = async () => {
        const processedProducts = await Promise.all(
          products.map(async (product) => {
            let newImage = product.image
            let newGallery = product.gallery
            
            // Convert main image
            if (product.image && product.image.startsWith('data:image/')) {
              newImage = await convertBase64ToFile(product.image, 'icons/products')
            }
            
            // Convert gallery images
            if (product.gallery && product.gallery.length > 0) {
              newGallery = await Promise.all(
                product.gallery.map(async (img) => {
                  if (img.startsWith('data:image/')) {
                    return await convertBase64ToFile(img, 'icons/products')
                  }
                  return img
                })
              )
            }
            
            return { ...product, image: newImage, gallery: newGallery }
          })
        )
        
        fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(processedProducts)
        })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            console.log('✅ Đã lưu products vào file!')
            if (JSON.stringify(processedProducts) !== JSON.stringify(products)) {
              setProducts(processedProducts)
            }
          }
        })
        .catch(err => console.error('❌ Lỗi khi lưu products:', err))
      }
      
      processAndSave()
    }
  }, [products])

  useEffect(() => {
    safeLocalStorageSet('admin-categories', categories)
  }, [categories])

  useEffect(() => {
    safeLocalStorageSet('admin-news-articles', newsArticles)
    safeLocalStorageSet('admin-homepage-news', homepageNews)
    
    // Save to file via API
    if (typeof window !== 'undefined') {
      fetch('/api/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ articles: newsArticles, homepage: homepageNews })
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) console.log('✅ Đã lưu news vào file!')
      })
      .catch(err => console.error('❌ Lỗi khi lưu news:', err))
    }
  }, [newsArticles, homepageNews])

  useEffect(() => {
    safeLocalStorageSet('admin-banners', banners)
    
    // Convert base64 to files and save
    if (typeof window !== 'undefined') {
      const processAndSave = async () => {
        // Convert all base64 images to files
        const processedBanners = await Promise.all(
          banners.map(async (banner) => {
            if (banner.image && banner.image.startsWith('data:image/')) {
              const newPath = await convertBase64ToFile(banner.image, 'icons/banners')
              return { ...banner, image: newPath }
            }
            return banner
          })
        )
        
        // Save to file via API
        fetch('/api/banners', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(processedBanners)
        })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            console.log('✅ Đã lưu vào file banners.ts!')
            // Update state with new paths
            if (JSON.stringify(processedBanners) !== JSON.stringify(banners)) {
              setBanners(processedBanners)
            }
          }
        })
        .catch(err => console.error('❌ Lỗi khi lưu vào file:', err))
      }
      
      processAndSave()
    }
  }, [banners])

  // Services functions
  const updateServices = (newServices: ServiceItem[]) => {
    setServices(newServices)
  }

  const addService = (service: ServiceItem) => {
    setServices([...services, service])
  }

  const updateService = (id: number, service: ServiceItem) => {
    setServices(services.map(s => s.id === id ? service : s))
  }

  const deleteService = (id: number) => {
    setServices(services.filter(s => s.id !== id))
  }

  // Products functions
  const updateProducts = (newProducts: ProductItem[]) => {
    setProducts(newProducts)
  }

  const addProduct = (product: ProductItem) => {
    setProducts([...products, product])
  }

  const updateProduct = (id: number, product: ProductItem) => {
    setProducts(products.map(p => p.id === id ? product : p))
  }

  const deleteProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id))
  }

  // Categories functions
  const updateCategories = (newCategories: ProductCategory[]) => {
    setCategories(newCategories)
  }

  const addCategory = (category: ProductCategory) => {
    setCategories([...categories, category])
  }

  const updateCategory = (id: string, category: ProductCategory) => {
    setCategories(categories.map(c => c.id === id ? category : c))
  }

  const deleteCategory = (id: string) => {
    setCategories(categories.filter(c => c.id !== id))
  }

  // News functions
  const updateNewsArticles = (newNews: NewsItem[]) => {
    setNewsArticles(newNews)
  }

  const updateHomepageNews = (newNews: NewsItem[]) => {
    setHomepageNews(newNews)
  }

  const addNews = (news: NewsItem) => {
    setNewsArticles([...newsArticles, news])
  }

  const updateNews = (id: number, news: NewsItem) => {
    setNewsArticles(newsArticles.map(n => n.id === id ? news : n))
  }

  const deleteNews = (id: number) => {
    setNewsArticles(newsArticles.filter(n => n.id !== id))
  }

  // Banners functions
  const updateBanners = (newBanners: BannerSlide[]) => {
    setBanners(newBanners)
  }

  const addBanner = (banner: BannerSlide) => {
    setBanners([...banners, banner])
  }

  const updateBanner = (id: number, banner: BannerSlide) => {
    setBanners(banners.map(b => b.id === id ? banner : b))
  }

  const deleteBanner = (id: number) => {
    setBanners(banners.filter(b => b.id !== id))
  }

  // Convert base64 to file
  const convertBase64ToFile = async (base64: string, folder: string): Promise<string> => {
    if (!base64.startsWith('data:image/')) {
      return base64 // Already a path
    }
    
    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ base64, folder })
      })
      
      const data = await response.json()
      if (data.success) {
        console.log('✅ Converted base64 to file:', data.path)
        return data.path
      }
      return base64
    } catch (error) {
      console.error('❌ Error converting base64:', error)
      return base64
    }
  }

  // Reload all data from localStorage
  const reloadFromStorage = useCallback(() => {
    if (typeof window === 'undefined') return
    
    try {
      const bannersData = localStorage.getItem('admin-banners')
      if (bannersData) {
        setBanners(JSON.parse(bannersData))
        console.log('🔄 Reloaded banners from localStorage')
      }
      
      const servicesData = localStorage.getItem('admin-services')
      if (servicesData) {
        setServices(JSON.parse(servicesData))
        console.log('🔄 Reloaded services from localStorage')
      }
      
      const productsData = localStorage.getItem('admin-products')
      if (productsData) {
        setProducts(JSON.parse(productsData))
        console.log('🔄 Reloaded products from localStorage')
      }
    } catch (error) {
      console.error('Error reloading from storage:', error)
    }
  }, [])

  const value: DataContextType = {
    services,
    updateServices,
    addService,
    updateService,
    deleteService,
    products,
    updateProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    categories,
    updateCategories,
    addCategory,
    updateCategory,
    deleteCategory,
    newsArticles,
    homepageNews,
    updateNewsArticles,
    updateHomepageNews,
    addNews,
    updateNews,
    deleteNews,
    banners,
    updateBanners,
    addBanner,
    updateBanner,
    deleteBanner,
    reloadFromStorage,
  }

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const context = useContext(DataContext)
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider')
  }
  return context
}
