# 🚀 Hướng Dẫn Deploy Website Lên Vercel

## Tổng Quan
Hướng dẫn này sẽ giúp bạn deploy website Phú An Phát lên Vercel trong 15-20 phút.

**Last updated:** 2025-01-10

---

## 📋 Chuẩn Bị Trước Khi Deploy

### Bước 1: Tạo Mật Khẩu Admin Mới

Chạy lệnh sau để tạo mật khẩu mới:

```bash
cd uni-house-nextjs
node scripts/update-password.js
```

**Lưu lại thông tin:**
- Username: `admin`
- Password: (mật khẩu bạn vừa nhập)
- Password Hash: (copy hash này - cần dùng sau)

### Bước 2: Tạo JWT Secret Mới

```bash
node scripts/generate-strong-secret.js
```

**Lưu lại:** JWT Secret (cần dùng sau)

### Bước 3: Kiểm Tra .gitignore

Đảm bảo file `.gitignore` có các dòng sau:

```
.env.local
.env.production
.env*.local
node_modules/
.next/
```

### Bước 4: Commit Code Lên GitHub

```bash
# Quay về thư mục gốc
cd ..

# Kiểm tra status
git status

# Add tất cả files
git add .

# Commit
git commit -m "Ready for Vercel deployment"

# Push lên GitHub
git push origin main
```

**Lưu ý:** Nếu chưa có GitHub repository, tạo mới tại https://github.com/new

---

## 🌐 Deploy Lên Vercel

### Bước 1: Tạo Tài Khoản Vercel

1. Truy cập: https://vercel.com/signup
2. Chọn "Continue with GitHub"
3. Đăng nhập GitHub và cho phép Vercel truy cập

### Bước 2: Import Project

1. Sau khi đăng nhập, click "Add New..." → "Project"
2. Chọn repository `uni-house-nextjs` (hoặc tên repo của bạn)
3. Click "Import"

### Bước 3: Configure Project

**Framework Preset:** Next.js (tự động detect)

**Root Directory:** `uni-house-nextjs` (nếu code ở subfolder)

**Build Settings:** (để mặc định)
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`

### Bước 4: Thêm Environment Variables

Click "Environment Variables" và thêm các biến sau:

#### 1. Admin Credentials
```
Name: ADMIN_USERNAME
Value: admin
```

```
Name: ADMIN_PASSWORD_HASH
Value: [paste hash từ Bước 1]
```

```
Name: JWT_SECRET
Value: [paste secret từ Bước 2]
```

```
Name: SESSION_MAX_AGE
Value: 86400
```

```
Name: NODE_ENV
Value: production
```

#### 2. Email Configuration (SMTP)

**Nếu dùng Gmail:**

```
Name: SMTP_HOST
Value: smtp.gmail.com
```

```
Name: SMTP_PORT
Value: 587
```

```
Name: SMTP_SECURE
Value: false
```

```
Name: SMTP_USER
Value: your-email@gmail.com
```

```
Name: SMTP_PASS
Value: [App Password - xem hướng dẫn bên dưới]
```

```
Name: EMAIL_FROM
Value: your-email@gmail.com
```

```
Name: EMAIL_TO
Value: recipient@example.com
```

**Lưu ý:** Để lấy Gmail App Password:
1. Vào https://myaccount.google.com/security
2. Bật "2-Step Verification"
3. Vào "App passwords"
4. Tạo password mới cho "Mail"
5. Copy password 16 ký tự

### Bước 5: Deploy

1. Click "Deploy"
2. Đợi 2-5 phút để Vercel build và deploy
3. Xem logs để đảm bảo không có lỗi

---

## ✅ Kiểm Tra Sau Khi Deploy

### 1. Truy Cập Website

Vercel sẽ cung cấp URL dạng: `https://your-project.vercel.app`

**Kiểm tra:**
- ✅ Trang chủ load được
- ✅ Các trang khác (Giới thiệu, Sản phẩm, Dịch vụ, Liên hệ)
- ✅ Ảnh hiển thị đúng
- ✅ Ngôn ngữ (VI/EN) chuyển đổi được

### 2. Test Admin Panel

1. Truy cập: `https://your-project.vercel.app/admin/login`
2. Đăng nhập với:
   - Username: `admin`
   - Password: (mật khẩu bạn tạo ở Bước 1)
3. Kiểm tra các chức năng admin

### 3. Test Contact Form

1. Vào trang Liên hệ
2. Điền form và gửi
3. Kiểm tra email có nhận được không

### 4. Test Security Headers

Truy cập: https://securityheaders.com/
- Nhập URL website của bạn
- Kiểm tra rating (nên đạt A hoặc A+)

---

## 🌍 Kết Nối Domain Riêng (Optional)

### Nếu bạn có domain phuanphat.com.vn:

#### Bước 1: Thêm Domain Trong Vercel

1. Vào Vercel Dashboard → Project Settings
2. Click "Domains"
3. Nhập: `phuanphat.com.vn`
4. Click "Add"
5. Vercel sẽ hiển thị DNS records cần thêm

#### Bước 2: Cấu Hình DNS

Vào quản lý DNS của domain (nơi bạn mua domain):

**Thêm A Record:**
```
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600
```

**Thêm CNAME Record:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

#### Bước 3: Đợi DNS Propagate

- Thời gian: 5-30 phút
- Vercel sẽ tự động cấu hình SSL
- Website sẽ chạy ở `https://phuanphat.com.vn`

---

## 🔧 Cập Nhật Code Sau Khi Deploy

### Khi có thay đổi code:

```bash
# 1. Commit changes
git add .
git commit -m "Update: description of changes"

# 2. Push to GitHub
git push origin main

# 3. Vercel tự động deploy (1-2 phút)
```

**Vercel sẽ tự động:**
- Detect changes trên GitHub
- Build lại project
- Deploy version mới
- Không downtime!

---

## 📊 Monitoring & Analytics

### Xem Logs

1. Vào Vercel Dashboard
2. Click vào project
3. Tab "Deployments" → Click deployment → "View Function Logs"

### Xem Analytics

1. Tab "Analytics" (Free Plan có basic analytics)
2. Xem:
   - Page views
   - Top pages
   - Countries
   - Devices

### Xem Usage

1. Tab "Usage"
2. Kiểm tra:
   - Bandwidth used
   - Build minutes used
   - Function invocations

---

## 🆘 Troubleshooting

### Lỗi: Build Failed

**Nguyên nhân:** Lỗi syntax hoặc dependencies

**Giải pháp:**
1. Xem build logs trong Vercel
2. Fix lỗi trong code
3. Commit và push lại

### Lỗi: Cannot Login Admin

**Nguyên nhân:** Environment variables sai

**Giải pháp:**
1. Vào Project Settings → Environment Variables
2. Kiểm tra `ADMIN_PASSWORD_HASH` và `JWT_SECRET`
3. Redeploy: Deployments → ... → Redeploy

### Lỗi: Email Không Gửi Được

**Nguyên nhân:** SMTP config sai

**Giải pháp:**
1. Kiểm tra Gmail App Password
2. Kiểm tra SMTP_USER và SMTP_PASS
3. Test local trước: `node scripts/test-email.js`

### Lỗi: Images Không Hiển Thị

**Nguyên nhân:** Path sai hoặc file quá lớn

**Giải pháp:**
1. Kiểm tra path ảnh (phải bắt đầu bằng `/`)
2. Compress ảnh nếu > 1MB
3. Upload lại vào `/public/`

---

## 📝 Checklist Hoàn Thành

- [ ] Tạo mật khẩu admin mới
- [ ] Tạo JWT secret mới
- [ ] Push code lên GitHub
- [ ] Tạo tài khoản Vercel
- [ ] Import project
- [ ] Thêm environment variables
- [ ] Deploy thành công
- [ ] Test trang chủ
- [ ] Test admin login
- [ ] Test contact form
- [ ] Test security headers
- [ ] (Optional) Kết nối domain riêng

---

## 🎉 Hoàn Thành!

Website của bạn đã online tại: `https://your-project.vercel.app`

**Thông tin quan trọng:**
- URL: [Lưu lại URL Vercel]
- Admin URL: `https://your-project.vercel.app/admin/login`
- Username: `admin`
- Password: [Lưu mật khẩu an toàn]

**Tiếp theo:**
- Share URL với team
- Test kỹ tất cả tính năng
- Monitor usage trong Vercel Dashboard
- Cập nhật nội dung qua Admin Panel

---

## 📞 Hỗ Trợ

**Vercel Documentation:** https://vercel.com/docs

**Next.js Documentation:** https://nextjs.org/docs

**Nếu cần giúp đỡ:**
- Vercel Support: https://vercel.com/support
- Vercel Community: https://github.com/vercel/vercel/discussions

---

**Chúc mừng bạn đã deploy thành công! 🚀**
