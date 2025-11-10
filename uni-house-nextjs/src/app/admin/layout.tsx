'use client';

import '../globals.css'
import { AdminSidebar, AdminHeader } from '@/components'
import { DataProvider } from '@/contexts/DataContext'
import { Inter } from 'next/font/google'
import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import AuthProvider from '@/components/auth/AuthProvider';
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

  // For other admin pages, use full layout with auth
  return (
    <html lang="vi" suppressHydrationWarning>
      <body suppressHydrationWarning className={inter.className}>
        <DataProvider>
          <AuthProvider>
            <ClientAuthCheck>
              <div className="flex min-h-screen bg-gray-50">
                <AdminSidebar />
                <div className="flex-1 flex flex-col min-w-0">
                  <AdminHeader />
                  <main className="p-6">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                      {children}
                    </div>
                  </main>
                </div>
              </div>
            </ClientAuthCheck>
          </AuthProvider>
        </DataProvider>
      </body>
    </html>
  )
}
