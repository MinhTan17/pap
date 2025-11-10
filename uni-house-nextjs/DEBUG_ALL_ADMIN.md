# 🔍 Debug Toàn Bộ Admin Panel

## Vấn đề: TẤT CẢ chức năng admin không hoạt động

Nếu không chỉ upload mà tất cả chức năng đều lỗi, vấn đề có thể là:

## 1. Kiểm tra Console Errors (QUAN TRỌNG!)

1. Mở trang admin: `https://your-domain.vercel.app/admin`
2. Nhấn **F12** → tab **Console**
3. Xem có lỗi gì màu đỏ không?
4. Chụp màn hình tất cả lỗi

### Các lỗi thường gặp:

#### Lỗi: "Failed to fetch" hoặc "Network error"
```
Nguyên nhân: API routes không hoạt động
Fix: Kiểm tra Vercel deployment logs
```

#### Lỗi: "Unauthorized" hoặc "401"
```
Nguyên nhân: Authentication không hoạt động
Fix: Kiểm tra JWT_SECRET trên Vercel
```

#### Lỗi: "CORS" hoặc "blocked by CORS policy"
```
Nguyên nhân: CORS configuration sai
Fix: Cập nhật middleware hoặc API headers
```

#### Lỗi: "Module not found" hoặc "Cannot find module"
```
Nguyên nhân: Build error trên Vercel
Fix: Kiểm tra Vercel build logs
```

## 2. Kiểm tra Network Tab

1. Mở **F12** → tab **Network**
2. Thử thực hiện một hành động (vd: lưu nội dung)
3. Xem request nào bị lỗi (màu đỏ)
4. Click vào request đó
5. Xem tab **Response** để biết lỗi cụ thể

## 3. Kiểm tra Vercel Deployment

### A. Kiểm tra Build Logs

1. Vào Vercel Dashboard
2. Click vào project
3. Vào tab **Deployments**
4. Click vào deployment mới nhất
5. Xem **Build Logs**
6. Tìm lỗi (màu đỏ)

### B. Kiểm tra Function Logs

1. Vào tab **Logs** hoặc **Functions**
2. Thử thực hiện hành động trên admin
3. Xem logs real-time
4. Tìm lỗi

## 4. Kiểm tra Environment Variables

Vào Vercel → Settings → Environment Variables

Đảm bảo có đủ các biến sau:

```
✅ ADMIN_USERNAME
✅ ADMIN_PASSWORD_HASH
✅ JWT_SECRET
✅ NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
✅ CLOUDINARY_API_KEY
✅ CLOUDINARY_API_SECRET
✅ SMTP_HOST
✅ SMTP_PORT
✅ SMTP_USER
✅ SMTP_PASS
✅ EMAIL_FROM
✅ EMAIL_TO
```

**Quan trọng:** Tất cả phải chọn **All Environments**!

## 5. Test từng API endpoint

### Test 1: Auth API
```
https://your-domain.vercel.app/api/auth/check
```
Kết quả mong đợi: `{"authenticated": false}` hoặc `{"authenticated": true}`

### Test 2: Upload API
```
POST https://your-domain.vercel.app/api/upload
```
(Cần test bằng Postman hoặc curl)

### Test 3: About API
```
https://your-domain.vercel.app/api/about
```
Kết quả mong đợi: JSON data hoặc empty array

### Test 4: Cloudinary Config
```
https://your-domain.vercel.app/api/test-cloudinary
```
Kết quả mong đợi: `{"cloudName": "dw2ahw6p9", "hasApiKey": true, ...}`

## 6. Kiểm tra Middleware

Middleware có thể đang block requests. Kiểm tra:

1. File `middleware.ts` có đúng không?
2. Có block `/api/*` routes không?
3. Có lỗi trong middleware logic không?

## 7. Test Local vs Production

### Test Local:
```bash
npm run dev
```
Vào http://localhost:3000/admin

- Nếu local OK → Vấn đề ở Vercel config
- Nếu local cũng lỗi → Vấn đề ở code

## 8. Các vấn đề phổ biến

### Vấn đề 1: Vercel Serverless Function Timeout
```
Nguyên nhân: Function chạy quá lâu (> 10s trên Free plan)
Fix: Optimize code hoặc upgrade plan
```

### Vấn đề 2: Missing Dependencies
```
Nguyên nhân: Package không được install trên Vercel
Fix: Kiểm tra package.json, chạy npm install
```

### Vấn đề 3: Environment Variables không load
```
Nguyên nhân: Chưa redeploy sau khi thêm env vars
Fix: Redeploy lại project
```

### Vấn đề 4: API Routes không được deploy
```
Nguyên nhân: Build error hoặc file structure sai
Fix: Kiểm tra build logs, đảm bảo file structure đúng
```

## 9. Quick Fix Steps

### Bước 1: Redeploy
```bash
git commit --allow-empty -m "Trigger redeploy"
git push
```

### Bước 2: Clear Vercel Cache
1. Vào Vercel Dashboard
2. Settings → General
3. Scroll xuống "Clear Cache"
4. Click "Clear Cache"
5. Redeploy

### Bước 3: Check Vercel Status
Vào https://www.vercel-status.com/
Xem có sự cố nào không

## 10. Cần làm NGAY:

1. **Mở Console (F12)** và chụp màn hình tất cả lỗi
2. **Mở Network tab** và xem request nào bị lỗi
3. **Vào Vercel Logs** và xem có lỗi gì
4. **Gửi cho mình:**
   - Screenshot Console errors
   - Screenshot Network tab (failed requests)
   - Screenshot Vercel logs (nếu có)

Với thông tin này, mình sẽ biết chính xác vấn đề là gì và fix ngay!

---

## Checklist Debug:

- [ ] Mở Console (F12) → có lỗi gì?
- [ ] Mở Network tab → request nào fail?
- [ ] Vào Vercel Logs → có lỗi gì?
- [ ] Kiểm tra Environment Variables → đủ chưa?
- [ ] Test API endpoints → hoạt động không?
- [ ] So sánh Local vs Production → khác gì?
- [ ] Chụp màn hình lỗi → gửi cho dev

**Hãy làm theo checklist và gửi kết quả cho mình!**
