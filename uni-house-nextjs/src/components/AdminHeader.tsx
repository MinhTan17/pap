'use client';

import { useRouter } from 'next/navigation';

export default function AdminHeader() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      console.log('[AdminHeader] Logging out...');
      
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      
      const data = await response.json();
      console.log('[AdminHeader] Logout response:', data);
      
      if (response.ok && data.success) {
        console.log('[AdminHeader] Logout successful, redirecting to login...');
        // Force full page reload to clear all state
        window.location.href = '/admin/login';
      } else {
        console.error('[AdminHeader] Logout failed:', data.message);
        alert('Có lỗi xảy ra khi đăng xuất');
      }
    } catch (error) {
      console.error('[AdminHeader] Logout error:', error);
      alert('Có lỗi xảy ra khi đăng xuất');
    }
  };

  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4">
      <div className="font-semibold">Bảng điều khiển</div>
      <div className="flex items-center gap-4">
        <button
          onClick={handleLogout}
          className="px-3 py-1 text-sm text-red-600 hover:text-red-800 border border-red-200 rounded-md hover:bg-red-50 transition-colors"
        >
          Đăng xuất
        </button>
        <div className="w-8 h-8 rounded-full bg-gray-300" />
      </div>
    </header>
  )
}


