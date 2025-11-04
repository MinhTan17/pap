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

      {/* Contact CTA
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Liên Hệ Với Chúng Tôi
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Hãy để chúng tôi giúp bạn thực hiện dự án xây dựng của mình một cách hoàn hảo nhất.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://zalo.me/0931535007"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 2.237.738 4.304 1.986 5.972L2.05 21.95l4.028-1.937A9.954 9.954 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.988 0-3.84-.73-5.25-1.938l-.375-.313-2.438 1.175 1.188-2.4-.325-.388A7.951 7.951 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z" />
              </svg>
              Chat Zalo
            </a>
            <a
              href="/lien-he"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors inline-flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Gửi Email
            </a>
          </div>
        </div>
      </section> */}

      <Footer />
    </div>
  );
}