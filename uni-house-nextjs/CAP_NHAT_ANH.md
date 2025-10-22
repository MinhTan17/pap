# Hướng dẫn cập nhật ảnh cho Website

## ✅ Đã hoàn thành

Hệ thống đã được cập nhật hoàn toàn để **chỉ sử dụng ảnh**, loại bỏ tất cả icon SVG.

## 📁 Cấu trúc thư mục ảnh

Tất cả ảnh được lưu trong thư mục `public/icons/`:

```
public/icons/
├── services/     # Ảnh cho dịch vụ (6 ảnh)
├── products/     # Ảnh cho sản phẩm (8 ảnh)
└── banners/      # Ảnh cho banner slideshow (3 ảnh)
```

## 🖼️ Danh sách ảnh cần chuẩn bị

### 1. Dịch vụ (6 ảnh) - `public/icons/services/`
- `laser.png` - Gia công cắt laser CNC
- `milling.png` - Gia công phay và mài 6 mặt
- `precision.png` - Gia công khuôn mẫu, cơ khí chính xác
- `heat.png` - Xử lý nhiệt - nhiệt luyện
- `plasma.png` - Gia công cắt plasma
- `steel.png` - Xuất nhập khẩu sắt thép

**Kích thước:** 128x128px - 256x256px

### 2. Sản phẩm (8 ảnh) - `public/icons/products/`
- `copper.png` - Hợp kim đồng
- `aluminum.png` - Hợp kim nhôm
- `hot-die.png` - Thép làm khuôn dập nóng
- `stainless.png` - Thép không gỉ
- `cold-die.png` - Thép làm khuôn dập nguội
- `plastic-mold.png` - Thép làm khuôn nhựa
- `machine.png` - Thép chế tạo máy
- `carbon.png` - Thép Carbon

**Kích thước:** 96x96px - 192x192px

### 3. Banner (3 ảnh) - `public/icons/banners/`
- `bn.png` hoặc `laser.png` - Banner gia công cắt laser CNC
- `steel.png` - Banner sắt thép chất lượng cao
- `precision.png` - Banner cơ khí chính xác

**Kích thước:** 1920x600px (tỷ lệ 16:5) - ảnh full màn hình

## 🔄 Cách thay đổi ảnh

### Thay ảnh dịch vụ:
1. Đặt ảnh mới vào `public/icons/services/` với tên file đúng
2. Hoặc sửa trong file `src/data/services.ts`:
```typescript
{
  id: 1,
  title: 'GIA CÔNG CẮT LASER CNC',
  image: '/icons/services/ten-anh-moi.png',  // Thay đổi ở đây
  description: '...',
  color: 'from-red-600 to-orange-500'
}
```

### Thay ảnh sản phẩm:
1. Đặt ảnh mới vào `public/icons/products/` với tên file đúng
2. Hoặc sửa trong file `src/data/products.ts`:
```typescript
{
  id: 1,
  name: 'Hợp kim đồng',
  image: '/icons/products/ten-anh-moi.png',  // Thay đổi ở đây
  ...
}
```

### Thay ảnh banner:
1. Đặt ảnh mới vào `public/icons/banners/` với tên file đúng
2. Hoặc sửa trong file `src/data/banners.ts`:
```typescript
{
  id: 1,
  title: "GIA CÔNG CẮT LASER CNC",
  image: "/icons/banners/ten-anh-moi.png",  // Thay đổi ở đây
  ...
}
```

## 💡 Lưu ý quan trọng

1. **Định dạng ảnh:** PNG (nền trong suốt) hoặc JPG
2. **Tên file:** Phải khớp chính xác với tên trong file data
3. **Đường dẫn:** Luôn bắt đầu bằng `/icons/...`
4. **Reload:** Sau khi thay ảnh, reload lại trang web (Ctrl+F5)

## 🎨 Khuyến nghị

- **Dịch vụ & Sản phẩm:** Dùng ảnh có nền trong suốt (PNG) để đẹp trên nền màu gradient
- **Banner:** Dùng ảnh chất lượng cao, có thể thêm text overlay
- **Tối ưu:** Nén ảnh trước khi upload để tăng tốc độ tải trang

## 🚀 Các file đã được cập nhật

✅ `src/data/services.ts` - Cấu trúc dữ liệu dịch vụ
✅ `src/data/products.ts` - Cấu trúc dữ liệu sản phẩm
✅ `src/data/banners.ts` - Cấu trúc dữ liệu banner
✅ `src/components/ServicesSection.tsx` - Hiển thị dịch vụ
✅ `src/components/ProductsSection.tsx` - Hiển thị sản phẩm
✅ `src/components/Hero.tsx` - Hiển thị banner slideshow

## ❓ Cần hỗ trợ?

Nếu gặp vấn đề:
1. Kiểm tra tên file ảnh có đúng không
2. Kiểm tra đường dẫn trong file data
3. Xóa cache trình duyệt (Ctrl+Shift+Delete)
4. Kiểm tra console của trình duyệt (F12)
