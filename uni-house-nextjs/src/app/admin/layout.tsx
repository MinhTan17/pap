import '../globals.css'
import { AdminSidebar, AdminHeader } from '@/components'
import { DataProvider } from '@/contexts/DataContext'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className="bg-gray-50">
        <DataProvider>
          <div className="flex min-h-screen">
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


