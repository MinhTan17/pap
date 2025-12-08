'use client';

import '../globals.css'
import { AdminSidebar, AdminHeader } from '@/components'
import { DataProvider } from '@/contexts/DataContext'
import { Inter } from 'next/font/google'
import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { ClientAuthCheck } from '@/components/auth/ClientAuthCheck';

const inter = Inter({ 
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

export default function AdminLayout({
  children,
}: {
  children: ReactNode
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  // If it's login page, render without auth protection and admin UI
  if (isLoginPage) {
    return (
      <html lang="vi" suppressHydrationWarning>
        <body suppressHydrationWarning className={inter.className}>
          {children}
        </body>
      </html>
    );
  }

  // For other admin pages, use full layout with auth check
  return (
    <html lang="vi" suppressHydrationWarning>
      <body suppressHydrationWarning className={inter.className}>
        <DataProvider>
          <ClientAuthCheck>
            <div className="flex min-h-screen bg-gray-100">
              <AdminSidebar />
              <div className="flex-1 flex flex-col min-w-0">
                <AdminHeader />
                <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
                  <div className="max-w-7xl mx-auto">
                    {children}
                  </div>
                </main>
              </div>
            </div>
          </ClientAuthCheck>
        </DataProvider>
      </body>
    </html>
  )
}
