'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
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
}

const DataContext = createContext<DataContextType | undefined>(undefined)

export function DataProvider({ children }: { children: React.ReactNode }) {
  // Initialize state with localStorage or default data
  const [services, setServices] = useState<ServiceItem[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('admin-services')
      return saved ? JSON.parse(saved) : initialServices
    }
    return initialServices
  })

  const [products, setProducts] = useState<ProductItem[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('admin-products')
      return saved ? JSON.parse(saved) : initialProducts
    }
    return initialProducts
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

  // Save to localStorage whenever state changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('admin-services', JSON.stringify(services))
    }
  }, [services])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('admin-products', JSON.stringify(products))
    }
  }, [products])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('admin-categories', JSON.stringify(categories))
    }
  }, [categories])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('admin-news-articles', JSON.stringify(newsArticles))
    }
  }, [newsArticles])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('admin-homepage-news', JSON.stringify(homepageNews))
    }
  }, [homepageNews])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('admin-banners', JSON.stringify(banners))
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
