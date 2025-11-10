# 🧪 Test Local Trước Khi Deploy

## Tại sao cần test local?

- Đảm bảo code hoạt động 100% trước khi deploy
- Tránh mất thời gian chờ deploy rồi mới phát hiện lỗi
- Dễ debug hơn khi chạy local

## Các bước test:

### 1. Chạy dev server

```bash
cd uni-house-nextjs
npm run dev
```

Đợi server khởi động (khoảng 10-20 giây)

### 2. Test đăng nhập

1. Mở: http://localhost:3000/admin/login
2. Đăng nhập với:
   - Username: `admin`
   - Password: `AdminPAP@2025!177305`
3. Phải thành công và redirect đến dashboard

**Nếu lỗi:** Xem Console (F12) và cho mình biết

### 3. Test upload ảnh

1. Vào: http://localhost:3000/admin/pages/about
2. Click "Chỉnh sửa" một section
3. Click "Thêm ảnh grid"
4. Chọn 1 ảnh nhỏ (< 1MB)
5. Đợi upload...

**Kết quả mong đợi:**
- ✅ Upload thành công
- ✅ Ảnh hiển thị trong preview
- ✅ URL ảnh dạng: `https://res.cloudinary.com/dw2ahw6p9/...`

**Nếu lỗi:** Xem Console (F12) và cho mình biết lỗi gì

### 4. Test lưu nội dung

1. Chỉnh sửa tiêu đề hoặc nội dung
2. Click "Lưu"
3. Phải thấy thông báo "✅ Đã lưu thành công!"

**Nếu lỗi:** Xem Console (F12)

### 5. Test các chức năng khác

- Vào: http://localhost:3000/admin/contact
- Vào: http://localhost:3000/admin/services/1
- Thử chỉnh sửa và lưu

## Kết quả:

### ✅ Nếu tất cả test đều PASS:

**→ Deploy lên Vercel ngay!**

```bash
git add .
git commit -m "Fix middleware blocking admin APIs"
git push
```

Sau khi deploy xong, test lại trên production.

### ❌ Nếu có test FAIL:

**→ ĐỪNG deploy! Cho mình biết lỗi gì:**

1. Chụp màn hình Console errors
2. Copy/paste lỗi trong terminal
3. Cho mình biết test nào fail

Mình sẽ fix ngay!

## Tại sao mình 95% chắc chắn?

### ✅ Những gì đã fix:

1. **Middleware logic** - Đã cập nhật để cho phép protected APIs
2. **Authentication flow** - Token được check đúng cách
3. **API routes** - Đã thêm vào danh sách protected APIs
4. **Error handling** - Đã cải thiện để dễ debug

### ⚠️ 5% không chắc chắn vì:

1. **Cloudinary credentials** - Có thể vẫn sai trên Vercel
2. **Environment variables** - Có thể chưa được set đúng
3. **Vercel-specific issues** - Có thể có vấn đề chỉ xảy ra trên Vercel

Nhưng nếu **test local thành công** → **99% sẽ hoạt động trên Vercel**!

## Checklist:

- [ ] Chạy `npm run dev`
- [ ] Test đăng nhập → ✅ Thành công
- [ ] Test upload ảnh → ✅ Thành công
- [ ] Test lưu nội dung → ✅ Thành công
- [ ] Tất cả test PASS → Deploy lên Vercel
- [ ] Đợi deploy xong → Test lại trên production

**Hãy test local và cho mình biết kết quả!**
