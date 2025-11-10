# Fix Login trên Vercel - Checklist Nhanh

## ✅ Các thay đổi đã thực hiện

1. ✅ Sửa cookie settings trong `/api/auth/login` - luôn dùng `secure: true`
2. ✅ Thêm logging vào middleware để debug
3. ✅ Tạo API endpoint `/api/debug/auth-status` để kiểm tra
4. ✅ Tạo trang `/debug-auth` để xem thông tin debug

## 🚀 Các bước tiếp theo

### Bước 1: Commit và Push
```bash
git add .
git commit -m "fix: improve login cookie handling for Vercel"
git push
```

### Bước 2: Kiểm tra Environment Variables trên Vercel
1. Vào https://vercel.com/dashboard
2. Chọn project của bạn
3. Settings → Environment Variables
4. Đảm bảo có đầy đủ:
   - `ADMIN_USERNAME` = `admin`
   - `ADMIN_PASSWORD_HASH` = `$2b$10$CUb2rbnCOGMPDmEx1nC50eDkk5O86J9qf8qnSZLufLWTocPWCq5R.`
   - `JWT_SECRET` = `a8f5e2c9b4d7a1e6f3c8b5d2a9e7f4c1b8d5a2e9f6c3b0d7a4e1f8c5b2d9a6e3f0c7b4d1a8e5f2c9b6d3a0e7f4c1b8d5a2e9f6c3b0d7a4e1f8c5b2d9`
   - `SESSION_MAX_AGE` = `86400`

### Bước 3: Redeploy (NẾU CẦN)
Nếu bạn vừa thêm/sửa environment variables:
1. Vào Deployments tab
2. Click "..." trên deployment mới nhất
3. Click "Redeploy"

### Bước 4: Test
1. Truy cập `https://your-domain.vercel.app/debug-auth`
2. Kiểm tra xem các env vars có được set không
3. Thử đăng nhập tại `/admin/login`
4. Mở F12 → Console để xem logs
5. Mở F12 → Network để xem request/response

## 🔍 Nếu vẫn không được

### Kiểm tra Console Log
Khi đăng nhập, bạn sẽ thấy:
```
[Login Page] Attempting login for username: admin
[Login Page] Login response: {success: true, user: {...}}
[Login Page] Login successful, redirecting...
```

Nếu không thấy "Login successful", có nghĩa là:
- Response không có `success: true`
- Hoặc có lỗi trong quá trình fetch

### Kiểm tra Network Tab
Request `/api/auth/login` phải có:
- Status: 200
- Response: `{"success": true, "user": {"username": "admin"}}`
- Response Headers: `Set-Cookie: auth-token=...`

### Kiểm tra Vercel Function Logs
1. Vào Vercel Dashboard → Deployments
2. Click vào deployment hiện tại
3. Tab "Functions"
4. Tìm logs của `/api/auth/login`

Phải thấy:
```
[Auth] Login attempt: {username: 'admin', ...}
[Auth] Username check: {valid: true}
[Auth] Login successful
[Auth] Cookie set with token
```

## 💡 Nguyên nhân thường gặp

1. **Environment variables chưa set** → Set và redeploy
2. **Cookie bị block do secure flag** → Đã fix
3. **JWT_SECRET không khớp** → Kiểm tra env vars
4. **Browser cache** → Xóa cookies và hard refresh (Ctrl+Shift+R)

## 📞 Cần hỗ trợ?

Gửi cho tôi:
1. Screenshot của `/debug-auth`
2. Screenshot của Console khi login
3. Screenshot của Network tab (request `/api/auth/login`)
