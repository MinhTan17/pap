import { 
  Header, 
  Hero, 
  ServicesSection, 
  HotlineSection, 
  ProductsSection, 
  NewsSection, 
  Partners, 
  Footer 
} from '@/components'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <ServicesSection />
      <HotlineSection />
      <ProductsSection />
      <NewsSection />
      <Partners />
      <Footer />
    </div>
  )
}