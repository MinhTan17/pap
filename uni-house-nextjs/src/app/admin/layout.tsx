import '../globals.css'
import { AdminSidebar, AdminHeader } from '@/components'
import { DataProvider } from '@/contexts/DataContext'
import { Inter } from 'next/font/google'

const inter = Inter({ 
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <style dangerouslySetInnerHTML={{__html: `
          /* Cải thiện độ rõ của text trong admin */
          * {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            text-rendering: optimizeLegibility;
          }
        `}} />
      </head>
      <body suppressHydrationWarning className={inter.className}>
        <DataProvider>
          <div className="flex min-h-screen bg-gray-50">
            <AdminSidebar />
            <div className="flex-1 flex flex-col min-w-0">
              <AdminHeader />
              <main className="p-6">
                {children}
              </main>
            </div>
          </div>
        </DataProvider>
      </body>
    </html>
  )
}


