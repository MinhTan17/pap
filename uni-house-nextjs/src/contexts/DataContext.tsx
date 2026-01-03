'use client'

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react'
import { services as initialServices, ServiceItem } from '@/data/services'
import { products as initialProducts, categories as initialCategories, ProductItem, ProductCategory } from '@/data/products'
import { newsArticles as initialNews, NewsItem } from '@/data/news'
import { initialBanners, BannerSlide } from '@/data/banners'
import { authenticatedFetch } from '@/lib/auth-client'

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
  updateNewsArticles: (news: NewsItem[]) => void
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
  // Refs to track save operations and prevent infinite loops
  const productsSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const bannersSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const newsSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const isSavingProductsRef = useRef(false)
  const isSavingBannersRef = useRef(false)
  const isSavingNewsRef = useRef(false)
  
  // Flag to prevent auto-save during initial load
  const isInitialLoadRef = useRef(true)
  const hasLoadedRef = useRef(false)
  
  // Initialize state - load from API on mount
  const [services, setServices] = useState<ServiceItem[]>(initialServices)

  // Load data from API on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        console.log('🔄 DataContext: Starting initial data load...')
        
        // Load services from API FIRST (most important)
        try {
          const servicesRes = await fetch('/api/services', { 
            cache: 'no-store',
            headers: {
              'Cache-Control': 'no-cache, no-store, must-revalidate',
              'Pragma': 'no-cache'
            }
          })
          console.log('📡 Services API response status:', servicesRes.status)
          
          if (servicesRes.ok) {
            const servicesData = await servicesRes.json()
            console.log('📊 Raw services data:', servicesData)
            
            if (Array.isArray(servicesData)) {
              setServices(servicesData)
              console.log('✅ Loaded services from API:', servicesData.length, 'services')
            } else {
              console.error('❌ Services data is not an array:', typeof servicesData)
              setServices(initialServices) // Fallback to initial data
            }
          } else {
            console.error('❌ Services API failed:', servicesRes.status)
            setServices(initialServices) // Fallback to initial data
          }
        } catch (servicesError) {
          console.error('❌ Services API error:', servicesError)
          setServices(initialServices) // Fallback to initial data
        }
        
        // Load products from API
        try {
          const productsRes = await fetch('/api/products', { cache: 'no-store' })
          if (productsRes.ok) {
            const productsData = await productsRes.json()
            setProducts(productsData)
            console.log('✅ Loaded products from API')
          }
        } catch (productsError) {
          console.error('❌ Products API error:', productsError)
        }
        
        // Load banners from API - only update if valid data
        try {
          const bannersRes = await fetch('/api/banners', { cache: 'no-store' })
          if (bannersRes.ok) {
            const bannersData = await bannersRes.json()
            // Only update if we got valid banners with images
            if (Array.isArray(bannersData) && bannersData.length > 0 && bannersData[0]?.image) {
              setBanners(bannersData)
              console.log('✅ Loaded banners from API:', bannersData.length, 'banners')
            } else {
              console.log('⚠️ Banners API returned empty/invalid, keeping initial data')
            }
          }
        } catch (bannersError) {
          console.error('❌ Banners API error:', bannersError)
        }
        
        // Load news from API
        try {
          const newsRes = await fetch('/api/news', { cache: 'no-store' })
          if (newsRes.ok) {
            const newsData = await newsRes.json()
            if (newsData.articles && Array.isArray(newsData.articles) && newsData.articles.length > 0) {
              // Remove duplicates by ID - keep only first occurrence
              const uniqueArticles = newsData.articles.filter(
                (article: NewsItem, index: number, self: NewsItem[]) => 
                  index === self.findIndex((a) => a.id === article.id)
              )
              setNewsArticles(uniqueArticles)
              console.log('✅ Loaded news from API:', uniqueArticles.length, 'articles (deduplicated)')
            } else {
              // Keep initial news if API returns empty
              console.log('⚠️ News API returned empty, keeping initial data')
            }
          }
        } catch (newsError) {
          console.error('❌ News API error:', newsError)
          // Keep initial news on error
        }
        
        console.log('✅ DataContext: Initial data load completed')
        
        // Mark initial load as complete after a delay to prevent auto-save
        setTimeout(() => {
          isInitialLoadRef.current = false
          hasLoadedRef.current = true
          console.log('✅ DataContext: Ready for auto-save')
        }, 2000)
      } catch (error) {
        console.error('❌ DataContext: Critical error loading data from API:', error)
        isInitialLoadRef.current = false
      }
    }
    
    loadData()
  }, [])

  const [products, setProducts] = useState<ProductItem[]>(initialProducts)

  const [categories, setCategories] = useState<ProductCategory[]>(initialCategories)

  const [newsArticles, setNewsArticles] = useState<NewsItem[]>(initialNews)

  const [banners, setBanners] = useState<BannerSlide[]>(initialBanners)

  // DISABLED AUTO-SAVE for services to prevent conflicts
  // Services will be saved manually from admin pages
  useEffect(() => {
    console.log('📊 Services state updated:', services.length, 'services')
    // Auto-save disabled for services - manual save only
  }, [services])

  useEffect(() => {
    // Skip auto-save during initial load
    if (isInitialLoadRef.current || !hasLoadedRef.current) {
      console.log('⏭️ Skipping products auto-save (initial load)')
      return
    }
    
    // Clear existing timeout
    if (productsSaveTimeoutRef.current) {
      clearTimeout(productsSaveTimeoutRef.current)
    }
    
    // Debounce API calls to prevent multiple simultaneous requests
    if (typeof window !== 'undefined' && !isSavingProductsRef.current) {
      productsSaveTimeoutRef.current = setTimeout(async () => {
        isSavingProductsRef.current = true
        
        try {
          const response = await authenticatedFetch('/api/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(products)
          })
          
          const data = await response.json()
          if (data.success) {
            console.log('✅ Đã lưu products vào file!')
          } else {
            console.error('❌ Lỗi khi lưu products:', data.error)
          }
        } catch (err) {
          console.error('Error saving products:', err)
        } finally {
          isSavingProductsRef.current = false
        }
      }, 500) // 0.5 second debounce
    }
  }, [products])

  // Categories are saved with products
  useEffect(() => {
    // Categories will be saved when products are saved
  }, [categories])

  useEffect(() => {
    // Skip auto-save during initial load
    if (isInitialLoadRef.current || !hasLoadedRef.current) {
      console.log('⏭️ Skipping news auto-save (initial load)')
      return
    }
    
    // Clear existing timeout
    if (newsSaveTimeoutRef.current) {
      clearTimeout(newsSaveTimeoutRef.current)
    }

    // Debounce API calls to prevent multiple simultaneous requests
    if (typeof window !== 'undefined' && !isSavingNewsRef.current) {
      newsSaveTimeoutRef.current = setTimeout(async () => {
        isSavingNewsRef.current = true

        try {
          const response = await authenticatedFetch('/api/news', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ articles: newsArticles })
          })

          const data = await response.json()
          if (data.success) {
            console.log('✅ Đã lưu news vào file!')
          } else {
            console.error('❌ Lỗi khi lưu news:', data.error)
          }
        } catch (err) {
          console.error('Error saving news:', err)
        } finally {
          isSavingNewsRef.current = false
        }
      }, 500) // 0.5 second debounce
    }
  }, [newsArticles])

  useEffect(() => {
    // Skip auto-save during initial load
    if (isInitialLoadRef.current || !hasLoadedRef.current) {
      console.log('⏭️ Skipping banners auto-save (initial load)')
      return
    }
    
    // Clear existing timeout
    if (bannersSaveTimeoutRef.current) {
      clearTimeout(bannersSaveTimeoutRef.current)
    }
    
    // Debounce API calls to prevent multiple simultaneous requests
    if (typeof window !== 'undefined' && !isSavingBannersRef.current) {
      bannersSaveTimeoutRef.current = setTimeout(async () => {
        isSavingBannersRef.current = true
        
        try {
          const response = await authenticatedFetch('/api/banners', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(banners)
          })
          
          const data = await response.json()
          if (data.success) {
            console.log('✅ Đã lưu vào file banners.ts!')
          } else {
            console.error('❌ Lỗi khi lưu banners:', data.error)
          }
        } catch (err) {
          console.error('Error saving banners:', err)
        } finally {
          isSavingBannersRef.current = false
        }
      }, 500) // 0.5 second debounce
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

  // Reload all data from API
  const reloadFromStorage = useCallback(async () => {
    try {
      console.log('🔄 Starting reload from storage...')
      
      // Load products from API - only update if valid data
      const productsRes = await fetch('/api/products', { cache: 'no-store' })
      if (productsRes.ok) {
        const productsData = await productsRes.json()
        // Only update if we got valid products
        if (Array.isArray(productsData) && productsData.length > 0) {
          setProducts(productsData)
          console.log('🔄 Reloaded products from API:', productsData.length, 'products')
        } else {
          console.log('⚠️ Products API returned empty, keeping current data')
        }
      } else {
        console.error('❌ Failed to reload products:', productsRes.status)
      }
      
      // Load services from API
      const servicesRes = await fetch('/api/services', { cache: 'no-store' })
      if (servicesRes.ok) {
        const servicesData = await servicesRes.json()
        setServices(servicesData)
        console.log('🔄 Reloaded services from API:', servicesData.length, 'services')
      } else {
        console.error('❌ Failed to reload services:', servicesRes.status)
      }
      
      // Load banners from API - only update if we get valid data
      const bannersRes = await fetch('/api/banners', { cache: 'no-store' })
      if (bannersRes.ok) {
        const bannersData = await bannersRes.json()
        // Only update if we got valid banners with images
        if (Array.isArray(bannersData) && bannersData.length > 0 && bannersData[0]?.image) {
          setBanners(bannersData)
          console.log('🔄 Reloaded banners from API:', bannersData.length, 'banners')
        } else {
          console.log('⚠️ Banners API returned empty/invalid, keeping current data')
        }
      } else {
        console.error('❌ Failed to reload banners:', bannersRes.status)
      }
      
      // Load news from API
      const newsRes = await fetch('/api/news', { cache: 'no-store' })
      if (newsRes.ok) {
        const newsData = await newsRes.json()
        if (newsData.articles && Array.isArray(newsData.articles) && newsData.articles.length > 0) {
          // Remove duplicates by ID
          const uniqueArticles = newsData.articles.filter(
            (article: NewsItem, index: number, self: NewsItem[]) => 
              index === self.findIndex((a) => a.id === article.id)
          )
          setNewsArticles(uniqueArticles)
          console.log('🔄 Reloaded news from API:', uniqueArticles.length, 'articles')
        } else {
          console.log('⚠️ News API returned empty on reload, keeping current data')
        }
      } else {
        console.error('❌ Failed to reload news:', newsRes.status)
      }
      
      console.log('✅ Reload from storage completed')
    } catch (error) {
      console.error('❌ Error reloading from API:', error)
      throw error // Re-throw so caller can handle
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
    updateNewsArticles,
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
