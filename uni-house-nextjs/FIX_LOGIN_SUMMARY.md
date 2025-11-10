# Tóm tắt Fix Login Issue trên Vercel

## Vấn đề
- Đăng nhập với admin/admin123 thành công
- Token được tạo và valid
- Nhưng không chuyển sang trang /admin, vẫn ở trang login
- Nguyên nhân: Cookie không được browser lưu

## Các thay đổi đã thực hiện

### 1. Cookie Settings (`src/app/api/auth/login/route.ts`)
```typescript
response.cookies.set('auth-token', token, {
  httpOnly: true,
  secure: true,
  sameSite: 'strict',
  path: '/',
  maxAge: 86400,
});
```

### 2. Login Page (`src/app/admin/login/page.tsx`)
- Thêm delay 100ms trước khi redirect
- Thêm logging để debug

### 3. Middleware (`middleware.ts`)
- Thêm `/debug-auth` vào public paths
- Thêm `/api/debug/auth-status` vào public API paths
- Mở rộng matcher để bao gồm `/api/:path*` và `/debug-auth`

### 4. Debug Tools
- `/debug-auth` - Trang kiểm tra auth status
- `/api/debug/auth-status` - API kiểm tra token và env vars

## Bước tiếp theo

### 1. Commit và Push
```bash
git add .
git commit -m "fix: update cookie settings for Vercel"
git push
```

### 2. Kiểm tra trên Vercel
Sau khi deploy xong:

1. **Xóa cookies cũ:**
   - F12 → Application → Cookies → Xóa tất cả

2. **Test login:**
   - Vào `/admin/login`
   - Đăng nhập: admin / admin123
   - Mở F12 → Network tab
   - Xem request `/api/auth/login`
   - Kiểm tra Response Headers có `Set-Cookie` không

3. **Kiểm tra debug:**
   - Vào `/debug-auth`
   - Xem `hasToken`, `tokenValid`
   - Xem Browser Cookies

### 3. Nếu vẫn không được

Thử thay đổi `sameSite`:

```typescript
// Trong src/app/api/auth/login/route.ts
sameSite: 'lax'  // Thay vì 'strict'
```

Hoặc:

```typescript
sameSite: 'none'  // Cho cross-site (cần secure: true)
```

### 4. Kiểm tra Vercel Logs
1. Vercel Dashboard → Deployments
2. Click deployment mới nhất
3. Tab "Functions"
4. Xem logs của `/api/auth/login`

Tìm:
```
[Auth] Login successful
[Auth] Cookie set successfully
```

## Thông tin đăng nhập

**Tài khoản:** admin  
**Mật khẩu:** admin123

## Environment Variables cần có trên Vercel

```
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=$2b$10$CUb2rbnCOGMPDmEx1nC50eDkk5O86J9qf8qnSZLufLWTocPWCq5R.
JWT_SECRET=a8f5e2c9b4d7a1e6f3c8b5d2a9e7f4c1b8d5a2e9f6c3b0d7a4e1f8c5b2d9a6e3f0c7b4d1a8e5f2c9b6d3a0e7f4c1b8d5a2e9f6c3b0d7a4e1f8c5b2d9
SESSION_MAX_AGE=86400
```

**LƯU Ý:** Sau khi thêm/sửa env vars, phải REDEPLOY!

## Liên hệ
Nếu vẫn gặp vấn đề, gửi cho tôi:
1. Screenshot của F12 → Network → `/api/auth/login` → Response Headers
2. Screenshot của `/debug-auth`
3. Screenshot của Vercel Function logs
