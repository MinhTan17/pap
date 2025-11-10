# Hướng dẫn Upload Ảnh với Cloudinary

## ✅ Đã hoàn thành

Chức năng upload ảnh lên Cloudinary đã được tích hợp vào admin panel của bạn!

## 📋 Thông tin đã cấu hình

### 1. Environment Variables (.env.local)
```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dw2ahw6p9
CLOUDINARY_API_KEY=5189117411226664
CLOUDINARY_API_SECRET=XXUoGElrwoBy6vh2X7Nr8XO82BM
```

### 2. Package đã cài đặt
- `cloudinary` - SDK để upload ảnh lên Cloudinary

### 3. API Endpoint
- **URL**: `/api/upload`
- **Method**: POST
- **Content-Type**: multipart/form-data
- **Parameters**:
  - `file`: File ảnh (JPG, PNG, WEBP, GIF)
  - `section`: Tên folder trên Cloudinary (vd: 'about', 'services', 'products')

## 🎯 Cách sử dụng trong Admin Panel

### Các trang đã tích hợp sẵn:

1. **Trang Giới thiệu** (`/admin/pages/about`)
   - Upload ảnh cho các section: Company, Staff, Equipment
   - Hỗ trợ upload nhiều ảnh cùng lúc
   - Ảnh được lưu vào folder `uni-house/about`

2. **Trang Dịch vụ** (`/admin/services/[id]`)
   - Upload ảnh trong Rich Text Editor
   - Ảnh được lưu vào folder `uni-house/about` (có thể thay đổi)

## 📸 Tính năng

### ✅ Validation
- Chỉ chấp nhận file ảnh: JPG, JPEG, PNG, WEBP, GIF
- Giới hạn kích thước: 10MB
- Hiển thị lỗi rõ ràng nếu file không hợp lệ

### ✅ Tối ưu hóa tự động
- Cloudinary tự động tối ưu chất lượng ảnh
- Tự động chuyển đổi sang WebP khi trình duyệt hỗ trợ
- Ảnh được tổ chức theo folder (about, services, products, etc.)

### ✅ Bảo mật
- API Key và Secret được lưu trong .env.local (không public)
- Chỉ admin đăng nhập mới upload được ảnh
- Validate file type và size trước khi upload

## 🚀 Cách upload ảnh

### Trong trang Giới thiệu:
1. Vào `/admin/pages/about`
2. Click "Chỉnh sửa" ở section muốn thêm ảnh
3. Click "Thêm ảnh" hoặc chọn nhiều file cùng lúc
4. Ảnh sẽ tự động upload lên Cloudinary
5. Click "Lưu" để lưu thay đổi

### Trong Rich Text Editor:
1. Vào trang chỉnh sửa nội dung (vd: `/admin/services/1`)
2. Click nút 📷 (Image) trên toolbar
3. Chọn file ảnh từ máy tính
4. Ảnh sẽ tự động upload và chèn vào nội dung

## 🔧 Cấu hình nâng cao

### Thay đổi folder lưu ảnh
Trong file `/api/upload/route.ts`, thay đổi:
```typescript
folder: `uni-house/${section}`,
```

### Thay đổi giới hạn kích thước
Trong file `/api/upload/route.ts`, thay đổi:
```typescript
const maxSize = 10 * 1024 * 1024 // 10MB
```

### Thêm transformation
Trong file `/api/upload/route.ts`, thêm vào `transformation`:
```typescript
transformation: [
  { quality: 'auto', fetch_format: 'auto' },
  { width: 1200, crop: 'limit' }, // Giới hạn chiều rộng
]
```

## 📦 Deploy lên Vercel

Khi deploy lên Vercel, nhớ thêm Environment Variables:

1. Vào Vercel Dashboard → Project Settings → Environment Variables
2. Thêm 3 biến:
   - `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` = `dw2ahw6p9`
   - `CLOUDINARY_API_KEY` = `5189117411226664`
   - `CLOUDINARY_API_SECRET` = `XXUoGElrwoBy6vh2X7Nr8XO82BM`
3. Redeploy project

## 🎉 Hoàn tất!

Bây giờ bạn có thể upload ảnh lên Cloudinary từ admin panel. Ảnh sẽ được lưu trữ trên cloud và tự động tối ưu hóa!

## 📞 Hỗ trợ

Nếu gặp vấn đề:
1. Kiểm tra console log trong browser (F12)
2. Kiểm tra terminal log của Next.js server
3. Đảm bảo các biến môi trường đã được cấu hình đúng
4. Kiểm tra Cloudinary Dashboard để xem ảnh đã upload chưa
