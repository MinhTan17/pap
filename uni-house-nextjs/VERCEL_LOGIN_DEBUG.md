# Debug Login Issue trên Vercel

## Vấn đề
Đăng nhập với admin/admin123 nhưng không chuyển sang trang admin, vẫn ở trang login.

## Các bước kiểm tra

### 1. Kiểm tra Environment Variables trên Vercel
Vào Vercel Dashboard → Project Settings → Environment Variables và đảm bảo có:

```
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=$2b$10$CUb2rbnCOGMPDmEx1nC50eDkk5O86J9qf8qnSZLufLWTocPWCq5R.
JWT_SECRET=a8f5e2c9b4d7a1e6f3c8b5d2a9e7f4c1b8d5a2e9f6c3b0d7a4e1f8c5b2d9a6e3f0c7b4d1a8e5f2c9b6d3a0e7f4c1b8d5a2e9f6c3b0d7a4e1f8c5b2d9
SESSION_MAX_AGE=86400
```

**QUAN TRỌNG**: Sau khi thêm/sửa environment variables, phải **Redeploy** project!

### 2. Kiểm tra Debug Info
Truy cập: `https://your-domain.vercel.app/debug-auth`

Kiểm tra:
- `hasToken`: Có token không?
- `tokenValid`: Token có hợp lệ không?
- `envVarsSet`: Các biến môi trường có được set không?

### 3. Kiểm tra Browser Console
Mở Developer Tools (F12) → Console tab

Khi đăng nhập, xem log:
- `[Login Page] Attempting login...`
- `[Login Page] Login response: ...`
- `[Login Page] Login successful, redirecting...`

### 4. Kiểm tra Network Tab
Mở Developer Tools (F12) → Network tab

Khi đăng nhập, kiểm tra request `/api/auth/login`:
- Response có `success: true` không?
- Response Headers có `Set-Cookie: auth-token=...` không?

### 5. Kiểm tra Cookies
Mở Developer Tools (F12) → Application tab → Cookies

Sau khi đăng nhập, kiểm tra có cookie `auth-token` không?

## Các nguyên nhân thường gặp

### 1. Environment Variables chưa được set
**Giải pháp**: Set đầy đủ env vars trên Vercel và redeploy

### 2. Cookie không được set do secure flag
**Giải pháp**: Đã fix trong code, cookie luôn dùng `secure: true` trên production

### 3. JWT_SECRET khác nhau giữa login và middleware
**Giải pháp**: Đảm bảo JWT_SECRET giống nhau trên Vercel

### 4. Middleware redirect loop
**Giải pháp**: Kiểm tra log trong Vercel Functions để xem middleware có lỗi không

## Kiểm tra Vercel Logs

1. Vào Vercel Dashboard → Project → Deployments
2. Click vào deployment hiện tại
3. Click tab "Functions"
4. Xem logs của các function:
   - `/api/auth/login`
   - `middleware`

Tìm các log:
- `[Auth] Login attempt:`
- `[Auth] Login successful`
- `[Middleware] Cookie check:`
- `[Middleware] Token verification result:`

## Test nhanh

Chạy lệnh này để test login API trực tiếp:

```bash
curl -X POST https://your-domain.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}' \
  -v
```

Kiểm tra response có `Set-Cookie` header không.

## Nếu vẫn không được

1. Xóa tất cả cookies của site
2. Hard refresh (Ctrl+Shift+R)
3. Thử đăng nhập lại
4. Kiểm tra console và network tab

## Contact
Nếu vẫn gặp vấn đề, gửi cho tôi:
1. Screenshot của `/debug-auth` page
2. Screenshot của Browser Console khi đăng nhập
3. Screenshot của Network tab (request `/api/auth/login`)
4. Screenshot của Vercel Function logs
