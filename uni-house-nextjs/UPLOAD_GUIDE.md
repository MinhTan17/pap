# 📸 Hướng dẫn Upload Ảnh với Cloudinary

## ✅ Đã hoàn tất tích hợp!

Các nút "Thêm ảnh" màu xanh trong admin panel đã được tích hợp với Cloudinary!

## 🎯 Cách sử dụng

### 1. Trang Giới thiệu (`/admin/pages/about`)

1. Click "Chỉnh sửa" ở section muốn thêm ảnh
2. Tìm nút **"📷 Thêm ảnh"** (màu xanh lá)
3. Click vào nút → Chọn 1 hoặc nhiều file ảnh
4. Đợi upload hoàn tất (có loading indicator)
5. Ảnh sẽ hiển thị ngay trong danh sách
6. Click **"Lưu"** để lưu thay đổi

### 2. Ảnh Grid (6 ảnh nhỏ)

Chỉ có trong section Staff và Equipment:

1. Tìm nút **"🖼️ Thêm ảnh grid"** (màu tím)
2. Click vào nút → Chọn tối đa 6 ảnh
3. Ảnh sẽ được upload lên Cloudinary
4. Hiển thị dưới dạng lưới 2x3

### 3. Rich Text Editor (Dịch vụ)

1. Vào `/admin/services/[id]`
2. Click "Chỉnh sửa"
3. Click nút **📷** trên toolbar editor
4. Chọn ảnh → Tự động upload và chèn vào nội dung

## 🎨 Tính năng mới

### ✅ Loading Indicator
- Hiển thị "Đang upload..." khi đang upload
- Hiển thị tiến trình: "Đang upload 2/5 ảnh..."
- Nút bị disable khi đang upload

### ✅ Validation
- Chỉ chấp nhận: JPG, PNG, WEBP, GIF
- Giới hạn: 10MB/file
- Hiển thị lỗi rõ ràng nếu file không hợp lệ

### ✅ Upload lên Cloudinary
- Ảnh được lưu trên cloud (không lưu local)
- Tự động tối ưu hóa chất lượng
- Tự động chuyển sang WebP
- URL dạng: `https://res.cloudinary.com/dw2ahw6p9/...`

### ✅ Tổ chức theo folder
- Ảnh được lưu vào folder `uni-house/about`
- Dễ quản lý trên Cloudinary Dashboard

## 🚀 Test ngay

1. Restart dev server:
```bash
npm run dev
```

2. Vào `/admin/pages/about`
3. Click "Chỉnh sửa" → "📷 Thêm ảnh"
4. Chọn ảnh và xem magic happen! ✨

## 📦 Deploy lên Vercel

Nhớ thêm Environment Variables trên Vercel:
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

## 🎉 Hoàn tất!

Tất cả các nút "Thêm ảnh" màu xanh đã hoạt động với Cloudinary!
