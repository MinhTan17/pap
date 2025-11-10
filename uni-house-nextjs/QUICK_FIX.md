# QUICK FIX - Admin Login Issue

## Vấn đề
- Đăng nhập thành công (không báo sai mật khẩu)
- Cookie được set
- Nhưng không vào được trang admin

## Nguyên nhân
JWT_SECRET trên Vercel khác với JWT_SECRET dùng để tạo token

## Giải pháp

### Bước 1: Vào Vercel Dashboard
1. Mở https://vercel.com
2. Chọn project của bạn
3. Settings → Environment Variables

### Bước 2: Thêm JWT_SECRET
Thêm biến môi trường mới:
- **Name**: `JWT_SECRET`
- **Value**: `a8f5e2c9b4d7a1e6f3c8b5d2a9e7f4c1b8d5a2e9f6c3b0d7a4e1f8c5b2d9a6e3f0c7b4d1a8e5f2c9b6d3a0e7f4c1b8d5a2e9f6c3b0d7a4e1f8c5b2d9`
- **Environment**: Production, Preview, Development (chọn tất cả)

### Bước 3: Redeploy
1. Deployments tab
2. Click "..." trên deployment mới nhất
3. Click "Redeploy"

### Bước 4: Test
Sau khi redeploy xong, thử đăng nhập lại.

## Nếu vẫn không được
Xóa cookie cũ:
1. F12 → Application tab → Cookies
2. Xóa cookie `auth-token`
3. Thử đăng nhập lại
