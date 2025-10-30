import dynamic from 'next/dynamic';
import { Header, Hero, Footer } from '@/components';

// Lazy load các components không cần thiết ngay lập tức
const ServicesSection = dynamic(() => import('@/components/ServicesSection'), {
  loading: () => <div className="h-96 animate-pulse bg-gray-100" />,
});

const HotlineSection = dynamic(() => import('@/components/HotlineSection'), {
  loading: () => <div className="h-32 animate-pulse bg-gray-100" />,
});

const ProductsSection = dynamic(() => import('@/components/ProductsSection'), {
  loading: () => <div className="h-96 animate-pulse bg-gray-100" />,
});

const NewsSection = dynamic(() => import('@/components/NewsSection'), {
  loading: () => <div className="h-96 animate-pulse bg-gray-100" />,
});

const Partners = dynamic(() => import('@/components/Partners'), {
  loading: () => <div className="h-64 animate-pulse bg-gray-100" />,
});

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
  );
}