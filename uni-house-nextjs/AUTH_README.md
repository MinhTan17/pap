# Hướng dẫn đăng nhập Admin

## Thông tin đăng nhập

- **Tài khoản**: `admin`
- **Mật khẩu**: `123456`

## Cách sử dụng

1. Truy cập trang đăng nhập: `http://localhost:3000/admin/login`
2. Nhập thông tin đăng nhập ở trên
3. Click "Đăng nhập"
4. Bạn sẽ được chuyển hướng đến trang admin dashboard

## Đăng xuất

Click nút "Đăng xuất" ở góc trên bên phải của header admin.

## Troubleshooting

Nếu bạn gặp vấn đề với đăng nhập:

1. Mở Developer Console (F12) để xem logs
2. Kiểm tra các log có prefix `[Auth]`, `[Login Page]`, `[AuthProvider]`, `[Middleware]`
3. Xóa cookies và thử lại:
   - Mở Developer Tools > Application > Cookies
   - Xóa cookie `auth-token`
   - Refresh trang và thử đăng nhập lại

## Thay đổi mật khẩu

Để thay đổi mật khẩu admin:

1. Chạy script generate hash:
   ```bash
   cd uni-house-nextjs
   node scripts/generate-hash.js
   ```

2. Sửa password trong script nếu cần:
   ```javascript
   const password = 'your-new-password';
   ```

3. Copy hash mới vào file `src/app/api/auth/login/route.ts`:
   ```typescript
   const ADMIN_PASSWORD_HASH = 'your-new-hash-here';
   ```

## Cấu trúc Authentication

- **Login API**: `/api/auth/login` - Xử lý đăng nhập
- **Check API**: `/api/auth/check` - Kiểm tra trạng thái đăng nhập
- **Logout API**: `/api/auth/logout` - Xử lý đăng xuất
- **Middleware**: `middleware.ts` - Bảo vệ các route admin
- **AuthProvider**: `src/components/auth/AuthProvider.tsx` - Provider cho admin layout
- **Login Page**: `src/app/admin/login/page.tsx` - Trang đăng nhập

## Security Features

### ✅ Đã triển khai:
- **JWT Tokens**: Sử dụng JSON Web Tokens thay vì simple tokens
- **Rate Limiting**: Giới hạn 5 lần đăng nhập thất bại trong 15 phút
- **Password Hashing**: Bcrypt với 10 salt rounds
- **Secure Cookies**: httpOnly, secure (production), sameSite
- **Token Verification**: Verify JWT ở mọi request
- **Environment Variables**: Credentials được lưu an toàn
- **Logging**: Log tất cả authentication events

### 📖 Xem thêm:
Đọc file `SECURITY.md` để biết chi tiết về các tính năng bảo mật và best practices.
