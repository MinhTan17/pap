# Test JWT_SECRET trên Production

## Bước 1: Kiểm tra JWT_SECRET
Truy cập: `https://your-domain.vercel.app/api/debug-jwt`

Bạn sẽ thấy:
```json
{
  "hasJwtSecret": true/false,
  "jwtSecretLength": 128,
  "jwtSecretPreview": "a8f5e2c9b4...",
  "isUsingFallback": false
}
```

## Bước 2: So sánh với local
Local JWT_SECRET length: 128
Local JWT_SECRET preview: a8f5e2c9b4...

## Vấn đề có thể xảy ra:

### 1. JWT_SECRET khác nhau
- **Triệu chứng**: Login thành công nhưng không vào được admin
- **Nguyên nhân**: Token được tạo với JWT_SECRET A nhưng verify với JWT_SECRET B
- **Giải pháp**: Đảm bảo JWT_SECRET trên Vercel giống với local

### 2. JWT_SECRET không tồn tại trên Vercel
- **Triệu chứng**: `isUsingFallback: true`
- **Nguyên nhân**: Chưa set JWT_SECRET trên Vercel
- **Giải pháp**: 
  1. Vào Vercel Dashboard → Settings → Environment Variables
  2. Thêm `JWT_SECRET` với value: `a8f5e2c9b4d7a1e6f3c8b5d2a9e7f4c1b8d5a2e9f6c3b0d7a4e1f8c5b2d9a6e3f0c7b4d1a8e5f2c9b6d3a0e7f4c1b8d5a2e9f6c3b0d7a4e1f8c5b2d9`
  3. Redeploy

## Bước 3: Kiểm tra Console Logs
Sau khi deploy code mới với logging, mở Console và đăng nhập lại.

Bạn sẽ thấy:
```
[Auth] Verifying token with JWT_SECRET length: 128
[Auth] Token verified successfully: { username: 'admin', ... }
[Middleware] Token found, verifying...
[Middleware] Token verification result: { isValidToken: true, ... }
```

Hoặc nếu có lỗi:
```
[Auth] Token verification failed: JsonWebTokenError: invalid signature
[Auth] JWT_SECRET preview: fallback-se...
[Middleware] Redirecting to login (not authenticated)
```

## Giải pháp cuối cùng:
Nếu JWT_SECRET đã đúng nhưng vẫn không vào được, có thể do:
1. Cookie không được set đúng domain
2. Middleware matcher không đúng
3. Có lỗi trong code admin page
