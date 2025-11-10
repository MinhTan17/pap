# ✅ Checklist Fix Upload Ảnh Trên Vercel

## Bước 1: Cấu hình Local (5 phút)

- [ ] Mở file `.env.local`
- [ ] Kiểm tra có 3 dòng sau:
  ```
  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dw2ahw6p9
  CLOUDINARY_API_KEY=518911741122664
  CLOUDINARY_API_SECRET=XXUoGElrwoBy6vh2X7Nr8XO82BM
  ```
- [ ] Chạy test: `node scripts/test-upload.js`
- [ ] Thấy "✅ All tests passed!"

## Bước 2: Test Local (5 phút)

- [ ] Chạy: `npm run dev`
- [ ] Vào: http://localhost:3000/admin/login
- [ ] Đăng nhập
- [ ] Vào: http://localhost:3000/admin/pages/about
- [ ] Click "Chỉnh sửa" một section
- [ ] Thử upload 1 ảnh
- [ ] Upload thành công → Tiếp tục Bước 3

## Bước 3: Cấu hình Vercel (5 phút)

- [ ] Vào: https://vercel.com/dashboard
- [ ] Chọn project của bạn
- [ ] Click **Settings** (thanh bên trái)
- [ ] Click **Environment Variables**
- [ ] Click **Add New**
- [ ] Thêm biến 1:
  - Name: `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
  - Value: `dw2ahw6p9`
  - Environments: **All** (Production, Preview, Development)
  - Click **Save**
- [ ] Click **Add New** lần 2:
  - Name: `CLOUDINARY_API_KEY`
  - Value: `518911741122664`
  - Environments: **All**
  - Click **Save**
- [ ] Click **Add New** lần 3:
  - Name: `CLOUDINARY_API_SECRET`
  - Value: `XXUoGElrwoBy6vh2X7Nr8XO82BM`
  - Environments: **All**
  - Click **Save**

## Bước 4: Redeploy (2 phút)

Chọn 1 trong 2 cách:

### Cách 1: Từ Git (Khuyến nghị)
```bash
git add .
git commit -m "Fix upload config"
git push
```

### Cách 2: Từ Vercel Dashboard
- [ ] Vào tab **Deployments**
- [ ] Click vào deployment mới nhất
- [ ] Click nút **⋯** (3 chấm)
- [ ] Click **Redeploy**
- [ ] Click **Redeploy** để confirm

## Bước 5: Đợi Deploy (1-3 phút)

- [ ] Đợi deployment status chuyển sang **Ready** (màu xanh ✓)
- [ ] Click vào deployment để xem URL

## Bước 6: Test Production (5 phút)

- [ ] Vào: `https://your-domain.vercel.app/api/test-cloudinary`
- [ ] Kiểm tra response:
  ```json
  {
    "cloudName": "dw2ahw6p9",
    "hasApiKey": true,
    "hasApiSecret": true
  }
  ```
- [ ] Nếu thấy `false` → Quay lại Bước 3
- [ ] Vào: `https://your-domain.vercel.app/admin/login`
- [ ] Đăng nhập
- [ ] Vào: `https://your-domain.vercel.app/admin/pages/about`
- [ ] Click "Chỉnh sửa" một section
- [ ] Thử upload 1 ảnh nhỏ (< 1MB)
- [ ] Upload thành công! 🎉

## 🚨 Nếu vẫn lỗi

### Lỗi: "Invalid API Key"
- [ ] Kiểm tra lại `CLOUDINARY_API_KEY` trên Vercel
- [ ] Đảm bảo không có khoảng trắng thừa
- [ ] Redeploy lại

### Lỗi: "Upload failed"
- [ ] Mở Console (F12) → tab Console
- [ ] Xem lỗi cụ thể
- [ ] Mở tab Network → click request `/api/upload`
- [ ] Xem Response để biết lỗi

### Lỗi: "Request Entity Too Large"
- [ ] Giảm kích thước ảnh xuống < 10MB
- [ ] Hoặc nén ảnh trước khi upload

### Vẫn không được?
- [ ] Xóa tất cả environment variables trên Vercel
- [ ] Thêm lại từ đầu (Bước 3)
- [ ] Redeploy lại (Bước 4)
- [ ] Clear browser cache (Ctrl + Shift + Delete)
- [ ] Thử lại

## ✅ Hoàn tất!

Khi tất cả các bước đều có ✓:
- Upload ảnh hoạt động trên local ✓
- Upload ảnh hoạt động trên Vercel ✓
- Ảnh hiển thị từ Cloudinary CDN ✓

Bạn đã fix xong! 🎉

---

**Thời gian ước tính**: 20-30 phút
**Độ khó**: ⭐⭐☆☆☆ (Dễ)
