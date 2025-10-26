'use client'

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react'
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
  // Refs to track save operations and prevent infinite loops
  const servicesSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const productsSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const bannersSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const isSavingServicesRef = useRef(false)
  const isSavingProductsRef = useRef(false)
  const isSavingBannersRef = useRef(false)
  
  // Initialize state - load from API on mount
  const [services, setServices] = useState<ServiceItem[]>(initialServices)

  // Load data from API on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        // Load products from API
        const productsRes = await fetch('/api/products')
        if (productsRes.ok) {
          const productsData = await productsRes.json()
          setProducts(productsData)
          console.log('✅ Loaded products from API')
        }
        
        // Load services from API
        const servicesRes = await fetch('/api/services')
        if (servicesRes.ok) {
          const servicesData = await servicesRes.json()
          setServices(servicesData)
          console.log('✅ Loaded services from API')
        }
        
        // Load banners from API
        const bannersRes = await fetch('/api/banners')
        if (bannersRes.ok) {
          const bannersData = await bannersRes.json()
          setBanners(bannersData)
          console.log('✅ Loaded banners from API')
        }
        
        // Load news from API
        const newsRes = await fetch('/api/news')
        if (newsRes.ok) {
          const newsData = await newsRes.json()
          if (newsData.articles) setNewsArticles(newsData.articles)
          if (newsData.homepage) setHomepageNews(newsData.homepage)
          console.log('✅ Loaded news from API')
        }
      } catch (error) {
        console.error('❌ Error loading data from API:', error)
      }
    }
    
    loadData()
  }, [])

  const [products, setProducts] = useState<ProductItem[]>(initialProducts)

  const [categories, setCategories] = useState<ProductCategory[]>(initialCategories)

  const [newsArticles, setNewsArticles] = useState<NewsItem[]>(initialNews)

  const [homepageNews, setHomepageNews] = useState<NewsItem[]>(initialHomepageNews)

  const [banners, setBanners] = useState<BannerSlide[]>(initialBanners)

  // Save to file whenever state changes (debounced)
  useEffect(() => {
    // Clear existing timeout
    if (servicesSaveTimeoutRef.current) {
      clearTimeout(servicesSaveTimeoutRef.current)
    }
    
    // Debounce API calls to prevent multiple simultaneous requests
    if (typeof window !== 'undefined' && !isSavingServicesRef.current) {
      servicesSaveTimeoutRef.current = setTimeout(async () => {
        isSavingServicesRef.current = true
        
        try {
          const response = await fetch('/api/services', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(services)
          })
          
          const data = await response.json()
          if (data.success) {
            console.log('✅ Đã lưu services vào file!')
          } else {
            console.error('❌ Lỗi khi lưu services:', data.error)
          }
        } catch (err) {
          console.error('Error saving services:', err)
        } finally {
          isSavingServicesRef.current = false
        }
      }, 500) // 0.5 second debounce
    }
  }, [services])

  useEffect(() => {
    // Clear existing timeout
    if (productsSaveTimeoutRef.current) {
      clearTimeout(productsSaveTimeoutRef.current)
    }
    
    // Debounce API calls to prevent multiple simultaneous requests
    if (typeof window !== 'undefined' && !isSavingProductsRef.current) {
      productsSaveTimeoutRef.current = setTimeout(async () => {
        isSavingProductsRef.current = true
        
        try {
          const response = await fetch('/api/products', {
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
    // Clear existing timeout
    if (bannersSaveTimeoutRef.current) {
      clearTimeout(bannersSaveTimeoutRef.current)
    }
    
    // Debounce API calls to prevent multiple simultaneous requests
    if (typeof window !== 'undefined' && !isSavingBannersRef.current) {
      bannersSaveTimeoutRef.current = setTimeout(async () => {
        isSavingBannersRef.current = true
        
        try {
          const response = await fetch('/api/banners', {
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

  // Reload all data from API
  const reloadFromStorage = useCallback(async () => {
    try {
      // Load products from API
      const productsRes = await fetch('/api/products')
      if (productsRes.ok) {
        const productsData = await productsRes.json()
        setProducts(productsData)
        console.log('🔄 Reloaded products from API')
      }
      
      // Load services from API
      const servicesRes = await fetch('/api/services')
      if (servicesRes.ok) {
        const servicesData = await servicesRes.json()
        setServices(servicesData)
        console.log('🔄 Reloaded services from API')
      }
      
      // Load banners from API
      const bannersRes = await fetch('/api/banners')
      if (bannersRes.ok) {
        const bannersData = await bannersRes.json()
        setBanners(bannersData)
        console.log('🔄 Reloaded banners from API')
      }
      
      // Load news from API
      const newsRes = await fetch('/api/news')
      if (newsRes.ok) {
        const newsData = await newsRes.json()
        if (newsData.articles) setNewsArticles(newsData.articles)
        if (newsData.homepage) setHomepageNews(newsData.homepage)
        console.log('🔄 Reloaded news from API')
      }
    } catch (error) {
      console.error('Error reloading from API:', error)
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
