# Test Cookie trên Vercel

## Vấn đề hiện tại
Cookie được set từ server (`hasToken: true`, `tokenValid: true`) nhưng browser không nhận được (`No cookies found`).

## Các thay đổi đã thực hiện

### 1. Cookie Settings
```typescript
response.cookies.set('auth-token', token, {
  httpOnly: true,      // Bảo mật - không đọc được qua JS
  secure: true,        // Chỉ gửi qua HTTPS
  sameSite: 'strict',  // Chặt chẽ - chỉ same-site
  path: '/',           // Áp dụng cho toàn site
  maxAge: 86400,       // 24 giờ
});
```

### 2. Login Page
- Thêm delay 100ms trước khi redirect để đảm bảo cookie được set

### 3. Middleware
- Thêm logging chi tiết
- Thêm `/debug-auth` vào public paths

## Cách test

### Test 1: Kiểm tra Response Headers
1. Mở F12 → Network tab
2. Đăng nhập
3. Click vào request `/api/auth/login`
4. Xem tab "Response Headers"
5. Tìm `Set-Cookie: auth-token=...`

**Nếu KHÔNG thấy Set-Cookie:**
- Cookie không được set từ server
- Kiểm tra Vercel Function logs

**Nếu CÓ thấy Set-Cookie:**
- Cookie được set nhưng browser không lưu
- Có thể do sameSite hoặc secure settings

### Test 2: Kiểm tra Request Headers
1. Sau khi đăng nhập
2. Truy cập `/admin` hoặc `/debug-auth`
3. Xem request headers
4. Tìm `Cookie: auth-token=...`

**Nếu KHÔNG thấy Cookie header:**
- Browser không gửi cookie
- Có thể do sameSite settings

### Test 3: Kiểm tra Application Tab
1. Mở F12 → Application tab
2. Sidebar → Cookies → chọn domain
3. Tìm cookie `auth-token`

**Nếu KHÔNG thấy cookie:**
- Cookie không được lưu trong browser
- Có thể do secure flag (cần HTTPS)

## Các giải pháp thử

### Giải pháp 1: Thay đổi sameSite
Nếu vẫn không được, thử:
```typescript
sameSite: 'lax'  // Thay vì 'strict'
```

### Giải pháp 2: Kiểm tra Domain
Đảm bảo domain khớp:
- Login tại: `https://your-domain.vercel.app/admin/login`
- Redirect tới: `https://your-domain.vercel.app/admin`
- KHÔNG dùng: `http://` hoặc `www.` khác nhau

### Giải pháp 3: Xóa cache
1. Xóa tất cả cookies của site
2. Hard refresh (Ctrl+Shift+R)
3. Thử lại

### Giải pháp 4: Kiểm tra Vercel Settings
1. Vào Vercel Dashboard
2. Project Settings → General
3. Kiểm tra domain settings

## Nếu vẫn không được

Có thể cần dùng localStorage thay vì cookie:

```typescript
// Trong login API
return NextResponse.json({
  success: true,
  token: token, // Gửi token trong response
});

// Trong login page
if (response.ok && data.success) {
  localStorage.setItem('auth-token', data.token);
  window.location.href = '/admin';
}

// Trong middleware
const token = request.cookies.get('auth-token')?.value ||
              request.headers.get('authorization')?.replace('Bearer ', '');
```

Nhưng cách này kém bảo mật hơn cookie httpOnly.
