# Giải pháp đơn giản - Bỏ ClientAuthCheck

## Vấn đề
ClientAuthCheck gây ra redirect loop hoặc không cho phép truy cập admin.

## Giải pháp
Bỏ ClientAuthCheck, chỉ dùng middleware để protect admin routes.

## Thay đổi

### 1. Admin Layout
- Bỏ `<ClientAuthCheck>` wrapper
- Middleware sẽ handle authentication

### 2. Middleware
- Đã kiểm tra cả `auth-token` và `auth-token-fallback` cookies
- Verify token và redirect nếu invalid

### 3. Test Page (MỚI)
Tạo `/test-login` để test toàn bộ flow:
- Login
- Check cookies
- Check auth
- Try access admin

## Cách test

### Bước 1: Commit và push
```bash
git add .
git commit -m "fix: remove ClientAuthCheck, rely on middleware only"
git push
```

### Bước 2: Test trên Vercel
1. Vào `https://your-domain.vercel.app/test-login`
2. Click "Test Login"
3. Xem kết quả trong JSON output
4. Nếu `step4_canAccessAdmin: true` → sẽ tự động redirect tới `/admin`

### Bước 3: Nếu test page hoạt động
- Vào `/admin/login`
- Đăng nhập: admin / admin123
- Sẽ redirect tới `/admin`

## Debug

Nếu vẫn không được, kiểm tra Console logs:

### Logs cần thấy khi login:
```
[Login Page] Login successful
[Login Page] Token stored in localStorage
[Login Page] Response data: {success: true, token: "...", user: {...}}
```

### Logs cần thấy khi vào /admin:
```
[Middleware] Token check: {hasCookieToken: false, hasFallbackToken: true, ...}
[Middleware] Token found, verifying...
[Middleware] Token verification result: {isValidToken: true, payload: {...}}
```

### Nếu thấy:
```
[Middleware] Token verification result: {isValidToken: false}
```

→ Vấn đề là JWT_SECRET không khớp giữa login và verify!

## Kiểm tra JWT_SECRET

Vào Vercel Dashboard → Environment Variables:
- `JWT_SECRET` phải GIỐNG NHAU cho tất cả environments
- Sau khi sửa, phải REDEPLOY

## Thông tin đăng nhập

**Tài khoản:** admin  
**Mật khẩu:** admin123

## Nếu vẫn không được

Gửi cho tôi:
1. Screenshot của `/test-login` sau khi click "Test Login"
2. Screenshot của Console logs
3. Screenshot của Vercel Function logs cho `/api/auth/login`
