# 🔧 Fix Lỗi Upload Ảnh Trên Vercel

## ❌ Vấn đề
Không thể upload ảnh lên Cloudinary khi deploy trên Vercel

## ✅ Giải pháp

### Bước 1: Thêm Environment Variables trên Vercel

1. Vào **Vercel Dashboard**: https://vercel.com/dashboard
2. Chọn project **uni-house-nextjs**
3. Vào **Settings** → **Environment Variables**
4. Thêm 3 biến sau:

```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = dw2ahw6p9
CLOUDINARY_API_KEY = 518911741122664
CLOUDINARY_API_SECRET = XXUoGElrwoBy6vh2X7Nr8XO82BM
```

5. Chọn **All Environments** (Production, Preview, Development)
6. Click **Save**

### Bước 2: Redeploy Project

Sau khi thêm environment variables:

1. Vào tab **Deployments**
2. Click vào deployment mới nhất
3. Click nút **⋯** (3 chấm) → **Redeploy**
4. Chọn **Use existing Build Cache** (nhanh hơn)
5. Click **Redeploy**

Hoặc đơn giản hơn:
```bash
git commit --allow-empty -m "Trigger redeploy"
git push
```

### Bước 3: Kiểm tra cấu hình

Đã cập nhật `next.config.ts` để hỗ trợ upload file lớn:
```typescript
api: {
  bodyParser: {
    sizeLimit: '10mb',
  },
}
```

## 🧪 Test Upload

### Test Local trước (Khuyến nghị)

Trước khi deploy, test local để đảm bảo cấu hình đúng:

```bash
# Cài dependencies nếu chưa có
npm install

# Test Cloudinary config
node scripts/test-upload.js

# Chạy dev server
npm run dev
```

Vào http://localhost:3000/admin/login và thử upload ảnh.

### Test trên Vercel

Sau khi redeploy xong:

1. Vào trang admin: `https://your-domain.vercel.app/admin/login`
2. Đăng nhập
3. Kiểm tra config: `https://your-domain.vercel.app/api/test-cloudinary`
   - Phải thấy: `"hasApiKey": true, "hasApiSecret": true`
4. Vào **Trang Giới thiệu** hoặc **Dịch vụ**
5. Thử upload 1 ảnh nhỏ (< 1MB) trước
6. Nếu thành công, thử ảnh lớn hơn (< 10MB)

## 🔍 Debug nếu vẫn lỗi

### Kiểm tra Environment Variables
Tạo file test để kiểm tra:

```typescript
// src/app/api/test-cloudinary/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    hasApiKey: !!process.env.CLOUDINARY_API_KEY,
    hasApiSecret: !!process.env.CLOUDINARY_API_SECRET,
  });
}
```

Truy cập: `https://your-domain.vercel.app/api/test-cloudinary`

Kết quả mong đợi:
```json
{
  "cloudName": "dw2ahw6p9",
  "hasApiKey": true,
  "hasApiSecret": true
}
```

### Kiểm tra Console Log

1. Mở **Developer Tools** (F12)
2. Vào tab **Console**
3. Thử upload ảnh
4. Xem lỗi gì hiển thị

### Kiểm tra Network

1. Mở **Developer Tools** (F12)
2. Vào tab **Network**
3. Thử upload ảnh
4. Click vào request `/api/upload`
5. Xem **Response** để biết lỗi cụ thể

## 📋 Checklist

- [ ] Đã thêm 3 environment variables trên Vercel
- [ ] Đã chọn "All Environments"
- [ ] Đã redeploy project
- [ ] Đã đợi deployment hoàn tất (xanh ✓)
- [ ] Đã test upload ảnh nhỏ
- [ ] Upload thành công!

## 🚨 Lỗi thường gặp

### Lỗi: "Invalid API Key"
→ Kiểm tra lại `CLOUDINARY_API_KEY` trên Vercel

### Lỗi: "Upload failed"
→ Kiểm tra `CLOUDINARY_API_SECRET` trên Vercel

### Lỗi: "Request Entity Too Large"
→ Giảm kích thước ảnh xuống < 10MB

### Lỗi: "Unauthorized"
→ Đảm bảo đã đăng nhập admin

## 💡 Tips

1. **Test local trước**: Chạy `npm run dev` và test upload local trước
2. **Dùng ảnh nhỏ**: Test với ảnh < 1MB trước khi thử ảnh lớn
3. **Kiểm tra Cloudinary**: Vào https://cloudinary.com/console để xem ảnh đã upload
4. **Clear cache**: Thử hard refresh (Ctrl + Shift + R) nếu vẫn lỗi

## ✅ Kết quả mong đợi

Sau khi hoàn thành các bước trên:
- Upload ảnh thành công trên Vercel
- Ảnh hiển thị từ Cloudinary CDN
- URL ảnh dạng: `https://res.cloudinary.com/dw2ahw6p9/image/upload/...`

## 📞 Cần hỗ trợ?

Nếu vẫn gặp lỗi, cung cấp thông tin sau:
1. Thông báo lỗi trong Console
2. Response từ `/api/upload` trong Network tab
3. Screenshot màn hình lỗi
