import '../globals.css'
import { AdminSidebar, AdminHeader } from '@/components'
import { DataProvider } from '@/contexts/DataContext'
import { Inter } from 'next/font/google'
import { ReactNode } from 'react';
import AuthProvider from '@/components/auth/AuthProvider';

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
  return (
    <html lang="vi" suppressHydrationWarning>
      <body suppressHydrationWarning className={inter.className}>
        <DataProvider>
          <AuthProvider>
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
          </AuthProvider>
        </DataProvider>
      </body>
    </html>
  )
}
