import Link from 'next/link'
import { adminMenu } from '@/data/admin'

export default function AdminSidebar() {
  return (
    <aside className="w-64 min-h-screen bg-gray-900 text-gray-100">
      <div className="px-4 py-4 border-b border-gray-800 text-xl font-bold"> <img src="/icons/banners/logo.png" width={180} alt="" /></div>
      <nav className="p-2 space-y-4">
        {adminMenu.map(group => (
          <div key={group.id}>
            <div className="px-3 py-2 text-xs font-semibold uppercase text-gray-400">
              {group.label}
            </div>
            <ul className="space-y-1">
              {(group.children || []).map(item => (
                <li key={item.id}>
                  {item.href ? (
                    <Link href={item.href} className="block px-4 py-2 rounded hover:bg-gray-800 text-sm">
                      {item.label}
                    </Link>
                  ) : (
                    <div className="block px-4 py-2 text-sm">{item.label}</div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  )
}


