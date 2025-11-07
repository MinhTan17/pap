# Hướng dẫn Deploy lên Hosting

## Các nền tảng hosting phổ biến cho Next.js

### 1. Vercel (Khuyến nghị - Miễn phí)
**Ưu điểm**: 
- Tối ưu cho Next.js (do Vercel tạo ra Next.js)
- Deploy tự động từ Git
- CDN toàn cầu
- Miễn phí cho personal projects

**Cách deploy:**

1. **Tạo tài khoản Vercel**: https://vercel.com
2. **Connect GitHub repository**
3. **Import project**
4. **Configure environment variables**:
   ```
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD_HASH=your-hash-here
   JWT_SECRET=your-secret-key-here
   SESSION_MAX_AGE=86400
   NODE_ENV=production
   ```
5. **Deploy** - Vercel tự động chạy `npm run build` và deploy

**Lệnh CLI (nếu dùng terminal):**
```bash
npm install -g vercel
vercel login
vercel
```

---

### 2. Netlify (Miễn phí)
**Ưu điểm**:
- Dễ sử dụng
- Deploy tự động
- CDN toàn cầu

**Cách deploy:**

1. **Tạo file `netlify.toml`**:
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

2. **Tạo tài khoản Netlify**: https://netlify.com
3. **Connect Git repository**
4. **Configure environment variables** trong Netlify dashboard
5. **Deploy**

---

### 3. Railway (Miễn phí $5/tháng credit)
**Ưu điểm**:
- Hỗ trợ Node.js tốt
- Dễ setup
- Có database nếu cần

**Cách deploy:**

1. **Tạo tài khoản Railway**: https://railway.app
2. **New Project > Deploy from GitHub**
3. **Configure environment variables**
4. **Deploy** - Railway tự động detect Next.js

---

### 4. VPS (DigitalOcean, Linode, AWS EC2)
**Ưu điểm**:
- Kiểm soát hoàn toàn
- Có thể chạy nhiều app

**Cách deploy:**

1. **SSH vào server**:
```bash
ssh root@your-server-ip
```

2. **Cài đặt Node.js**:
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

3. **Clone repository**:
```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo/uni-house-nextjs
```

4. **Install dependencies**:
```bash
npm install
```

5. **Tạo file `.env.production`**:
```bash
nano .env.production
```
Paste environment variables:
```
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=your-hash-here
JWT_SECRET=your-secret-key-here
SESSION_MAX_AGE=86400
NODE_ENV=production
```

6. **Build**:
```bash
npm run build
```

7. **Install PM2** (process manager):
```bash
npm install -g pm2
```

8. **Start app với PM2**:
```bash
pm2 start npm --name "uni-house" -- start
pm2 save
pm2 startup
```

9. **Setup Nginx** (reverse proxy):
```bash
sudo apt install nginx
sudo nano /etc/nginx/sites-available/uni-house
```

Paste config:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable site:
```bash
sudo ln -s /etc/nginx/sites-available/uni-house /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

10. **Setup SSL với Let's Encrypt**:
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

---

## Checklist trước khi deploy

### 1. Environment Variables
- [ ] `ADMIN_USERNAME` - Tên đăng nhập admin
- [ ] `ADMIN_PASSWORD_HASH` - Hash mật khẩu (chạy: `node scripts/update-password.js`)
- [ ] `JWT_SECRET` - Secret key cho JWT (chạy: `node scripts/generate-strong-secret.js`)
- [ ] `SESSION_MAX_AGE` - Thời gian session (86400 = 24h)
- [ ] `NODE_ENV=production`
- [ ] `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` - Email config
- [ ] `EMAIL_FROM`, `EMAIL_TO` - Email addresses

### 2. Security
- [ ] Đổi mật khẩu admin mặc định
- [ ] Đổi JWT_SECRET thành random string
- [ ] Không commit `.env.local` vào Git
- [ ] Enable HTTPS/SSL

### 3. Performance
- [ ] Chạy `npm run build` thành công
- [ ] Test production mode local: `npm run start`
- [ ] Optimize images (compress, resize)
- [ ] Enable CDN nếu có

### 4. Git
- [ ] Tạo `.gitignore` đúng:
```
node_modules/
.next/
.env.local
.env.production
.DS_Store
*.log
```

---

## Cập nhật code sau khi deploy

### Vercel/Netlify (Auto deploy)
1. Push code lên Git
2. Tự động deploy

### VPS (Manual)
```bash
ssh root@your-server-ip
cd /path/to/your-repo/uni-house-nextjs
git pull
npm install
npm run build
pm2 restart uni-house
```

---

## Troubleshooting

### Build failed
- Check logs trong hosting dashboard
- Đảm bảo `package.json` có đúng scripts
- Đảm bảo Node.js version >= 18

### 500 Error
- Check environment variables
- Check logs: `pm2 logs uni-house` (VPS)
- Check database connection (nếu có)

### Slow loading
- Enable CDN
- Optimize images
- Check server location (gần user hơn = nhanh hơn)

### Cannot login admin
- Check environment variables
- Check JWT_SECRET
- Check ADMIN_PASSWORD_HASH
- Clear browser cookies

---

## Monitoring

### Vercel
- Dashboard > Analytics
- Real-time logs

### VPS
```bash
# Check app status
pm2 status

# View logs
pm2 logs uni-house

# Monitor resources
pm2 monit

# Restart app
pm2 restart uni-house
```

---

## Backup

### Database (nếu có)
```bash
# Backup
pg_dump database_name > backup.sql

# Restore
psql database_name < backup.sql
```

### Files
```bash
# Backup uploads folder
tar -czf uploads-backup.tar.gz public/uploads/

# Restore
tar -xzf uploads-backup.tar.gz
```

---

## Cost Estimate

| Platform | Free Tier | Paid |
|----------|-----------|------|
| Vercel | ✅ Unlimited (personal) | $20/month (team) |
| Netlify | ✅ 100GB bandwidth | $19/month |
| Railway | ✅ $5 credit/month | $5-20/month |
| DigitalOcean | ❌ | $6/month (basic) |

**Khuyến nghị**: Bắt đầu với Vercel (miễn phí) cho personal projects.


---

## 🚀 Quick Start - Deploy Nhanh với Vercel (Khuyến nghị)

### Bước 1: Chuẩn bị
```bash
# Tạo mật khẩu mới
node scripts/update-password.js

# Tạo JWT secret mới
node scripts/generate-strong-secret.js
```

### Bước 2: Push code lên GitHub
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Bước 3: Deploy trên Vercel
1. Truy cập https://vercel.com
2. Click "New Project"
3. Import repository từ GitHub
4. Thêm Environment Variables:
   - `ADMIN_USERNAME`: admin
   - `ADMIN_PASSWORD_HASH`: (copy từ script)
   - `JWT_SECRET`: (copy từ script)
   - `SESSION_MAX_AGE`: 86400
   - `SMTP_HOST`: smtp.gmail.com
   - `SMTP_PORT`: 587
   - `SMTP_USER`: your-email@gmail.com
   - `SMTP_PASS`: your-app-password
   - `EMAIL_FROM`: your-email@gmail.com
   - `EMAIL_TO`: recipient@example.com
5. Click "Deploy"

### Bước 4: Kiểm tra
- Truy cập URL Vercel cung cấp
- Test login admin: `https://your-app.vercel.app/admin/login`
- Test contact form

**Xong! Website đã online trong 5 phút! 🎉**

---

## 📱 Sau khi Deploy

### Kiểm tra bảo mật
1. Test login admin
2. Test contact form
3. Check security headers: https://securityheaders.com
4. Test HTTPS

### Custom Domain (Optional)
1. Mua domain (Namecheap, GoDaddy, etc.)
2. Trong Vercel: Settings > Domains
3. Add domain và follow hướng dẫn DNS

### Monitor
- Vercel Dashboard > Analytics
- Check logs nếu có lỗi
- Monitor email notifications

---

## ⚠️ Lưu Ý Quan Trọng

1. **KHÔNG commit `.env.local`** vào Git
2. **ĐỔI mật khẩu admin** trước khi deploy
3. **ĐỔI JWT_SECRET** thành random string
4. **BẬT HTTPS** (Vercel tự động)
5. **BACKUP** environment variables ở nơi an toàn

---

## 🆘 Cần Giúp Đỡ?

Xem các file:
- `SECURITY_SUMMARY.md` - Tóm tắt bảo mật
- `SECURITY_CHECKLIST.md` - Checklist bảo mật
- `DEPLOYMENT.md` - Hướng dẫn deploy (file này)
