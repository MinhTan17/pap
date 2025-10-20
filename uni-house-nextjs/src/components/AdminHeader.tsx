export default function AdminHeader() {
  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4">
      <div className="font-semibold">Bảng điều khiển</div>
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-600">Xin chào: Administrator</span>
        <div className="w-8 h-8 rounded-full bg-gray-300" />
      </div>
    </header>
  )
}


