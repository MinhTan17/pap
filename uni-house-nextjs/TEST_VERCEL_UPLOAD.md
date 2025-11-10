# 🧪 Test Upload Trên Vercel

## Bước 1: Chạy script test

```bash
node scripts/test-vercel-upload.js https://your-domain.vercel.app
```

Thay `https://your-domain.vercel.app` bằng URL Vercel thực của bạn.

## Bước 2: Xem kết quả

### ✅ Nếu thành công, bạn sẽ thấy:

```
🧪 Testing Vercel Upload Configuration...

🌐 Vercel URL: https://your-domain.vercel.app

📋 Test 1: Checking Cloudinary environment variables...
   ✅ NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: OK
   ✅ CLOUDINARY_API_KEY: SET
   ✅ CLOUDINARY_API_SECRET: SET
   ✅ API Key length: OK (15 characters)
   ✅ API Secret length: OK (27 characters)

🎉 All environment variables are configured correctly!

✅ Upload should work now. Try these steps:
   1. Go to: https://your-domain.vercel.app/admin/login
   2. Login with your admin credentials
   3. Go to: Trang Giới thiệu or Dịch vụ
   4. Try uploading an image
```

→ **Upload đã sẵn sàng!** Vào admin panel và thử upload ảnh.

### ❌ Nếu thất bại, bạn sẽ thấy:

```
❌ Configuration incomplete!

🔧 Fix steps:
   1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   2. Make sure these 3 variables are set:
      - NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = dw2ahw6p9
      - CLOUDINARY_API_KEY = 518911741122664
      - CLOUDINARY_API_SECRET = XXUoGElrwoBy6vh2X7Nr8XO82BM
   3. Make sure "All Environments" is selected
   4. Redeploy your project
   5. Run this test again
```

→ **Cần fix:** Làm theo hướng dẫn và chạy lại test.

## Bước 3: Test thực tế trên browser

### Cách 1: Test API trực tiếp

Mở browser và vào:
```
https://your-domain.vercel.app/api/test-cloudinary
```

Bạn sẽ thấy JSON response:
```json
{
  "cloudName": "dw2ahw6p9",
  "hasApiKey": true,
  "hasApiSecret": true,
  "apiKeyLength": 15,
  "apiSecretLength": 27
}
```

### Cách 2: Test upload thực tế

1. Vào: `https://your-domain.vercel.app/admin/login`
2. Đăng nhập
3. Vào: `https://your-domain.vercel.app/admin/pages/about`
4. Click "Chỉnh sửa" một section
5. Click "Thêm ảnh"
6. Chọn 1 ảnh nhỏ (< 1MB)
7. Đợi upload...

**Nếu thành công:**
- Thấy ảnh hiển thị trong preview
- URL ảnh dạng: `https://res.cloudinary.com/dw2ahw6p9/image/upload/...`
- Click "Lưu" để lưu thay đổi

**Nếu thất bại:**
- Mở Console (F12) → tab Console
- Xem lỗi cụ thể
- Mở tab Network → click request `/api/upload`
- Xem Response để biết lỗi

## Bước 4: Debug nếu vẫn lỗi

### Kiểm tra logs trên Vercel

1. Vào Vercel Dashboard
2. Click vào project
3. Vào tab **Logs** hoặc **Functions**
4. Thử upload ảnh
5. Xem logs real-time để biết lỗi gì

### Các lỗi thường gặp

#### Lỗi: "Invalid API key"
```
Nguyên nhân: CLOUDINARY_API_KEY sai hoặc không đúng
Fix: Kiểm tra lại giá trị: 518911741122664
```

#### Lỗi: "Invalid cloud name"
```
Nguyên nhân: NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME sai
Fix: Phải là: dw2ahw6p9
```

#### Lỗi: "Upload failed"
```
Nguyên nhân: CLOUDINARY_API_SECRET sai
Fix: Kiểm tra lại giá trị: XXUoGElrwoBy6vh2X7Nr8XO82BM
```

#### Lỗi: "Request Entity Too Large"
```
Nguyên nhân: File quá lớn
Fix: Giảm kích thước xuống < 10MB
```

## Bước 5: Xác nhận hoàn tất

Khi upload thành công:

- [ ] Script test hiển thị "All environment variables are configured correctly!"
- [ ] API `/api/test-cloudinary` trả về đúng config
- [ ] Upload ảnh thành công trên admin panel
- [ ] Ảnh hiển thị từ Cloudinary CDN
- [ ] URL ảnh dạng: `https://res.cloudinary.com/dw2ahw6p9/...`

## 🎉 Hoàn tất!

Upload ảnh đã hoạt động trên Vercel! Bây giờ bạn có thể:
- Upload ảnh cho trang Giới thiệu
- Upload ảnh trong Rich Text Editor
- Upload ảnh cho Dịch vụ, Sản phẩm, v.v.

Tất cả ảnh sẽ được lưu trên Cloudinary và tự động tối ưu hóa!
