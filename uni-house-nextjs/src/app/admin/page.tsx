export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-lg bg-white shadow border">Cấu Hình Website</div>
        <div className="p-4 rounded-lg bg-white shadow border">Tài Khoản</div>
        <div className="p-4 rounded-lg bg-white shadow border">Đổi Mật Khẩu</div>
        <div className="p-4 rounded-lg bg-white shadow border">Thư Liên Hệ</div>
      </div>

      <div className="p-4 rounded-lg bg-white shadow border">
        <div className="font-semibold mb-4">Thống kê từ khóa tìm kiếm google</div>
        <div className="h-48 bg-gray-100 rounded" />
      </div>
    </div>
  )
}


