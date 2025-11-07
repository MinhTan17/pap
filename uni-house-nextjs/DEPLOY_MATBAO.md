# Hướng Dẫn Deploy lên Hosting Mắt Bão

## Yêu Cầu
- Hosting có hỗ trợ Node.js (VPS hoặc Cloud Hosting)
- SSH access
- Node.js version 18 trở lên

## Bước 1: Chuẩn Bị Trên Máy Local

### 1.1. Tạo mật khẩu và JWT secret mới
```bash
cd uni-house-nextjs
node scripts/update-password.js
node scripts/generate-strong-secret.js
```

Lưu lại các giá trị này, bạn sẽ cần dùng trên server.

### 1.2. Build test local
```bash
npm run build
npm run start
```

Kiểm tra xem có lỗi không. Nếu OK, tiếp tục.

### 1.3. Push code lên Git (nếu dùng Git)
```bash
git add .
git commit -m "Ready for production"
git push origin main
```

## Bước 2: Kết Nối SSH vào Server

### 2.1. SSH vào server
```bash
ssh username@your-server-ip
```

Hoặc nếu Mắt Bão cung cấp SSH key:
```bash
ssh -i /path/to/key.pem username@your-server-ip
```

### 2.2. Kiểm tra Node.js
```bash
node --version
npm --version
```

Nếu chưa có hoặc version cũ, cài đặt Node.js 20:
```bash
# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# CentOS/RHEL
curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
sudo yum install -y nodejs
```

## Bước 3: Upload Code lên Server

### Cách 1: Dùng Git (Khuyến nghị)
```bash
# Tạo thư mục
cd /var/www
sudo mkdir uni-house
sudo chown $USER:$USER uni-house
cd uni-house

# Clone repository
git clone https://github.com/your-username/your-repo.git .
cd uni-house-nextjs
```

### Cách 2: Upload qua FTP/SFTP
- Dùng FileZilla hoặc WinSCP
- Upload toàn bộ folder `uni-house-nextjs` lên server
- Đường dẫn: `/var/www/uni-house/uni-house-nextjs`

## Bước 4: Cài Đặt Dependencies

```bash
cd /var/www/uni-house/uni-house-nextjs
npm install --production
```

## Bước 5: Tạo File Environment Variables

```bash
nano .env.production
```

Paste nội dung sau (thay đổi các giá trị):
```env
# Admin Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=paste-hash-from-script-here
JWT_SECRET=paste-secret-from-script-here
SESSION_MAX_AGE=86400

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
EMAIL_FROM=your-email@gmail.com
EMAIL_TO=recipient@example.com

# Production
NODE_ENV=production
```

Lưu file: `Ctrl+X`, `Y`, `Enter`

## Bước 6: Build Production

```bash
npm run build
```

Đợi build xong (có thể mất 2-5 phút).

## Bước 7: Cài Đặt PM2 (Process Manager)

```bash
sudo npm install -g pm2
```

## Bước 8: Start App với PM2

```bash
# Start app
pm2 start npm --name "uni-house" -- start

# Lưu config
pm2 save

# Auto start khi server restart
pm2 startup
# Copy và chạy lệnh mà PM2 hiển thị
```

Kiểm tra app đang chạy:
```bash
pm2 status
pm2 logs uni-house
```

App giờ đang chạy ở `http://localhost:3000`

## Bước 9: Cấu Hình Nginx (Reverse Proxy)

### 9.1. Cài Nginx (nếu chưa có)
```bash
sudo apt update
sudo apt install nginx
```

### 9.2. Tạo config file
```bash
sudo nano /etc/nginx/sites-available/uni-house
```

Paste config sau (thay `your-domain.com`):
```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Static files caching
    location /_next/static {
        proxy_pass http://localhost:3000;
        proxy_cache_valid 200 60m;
        add_header Cache-Control "public, immutable";
    }
}
```

Lưu file: `Ctrl+X`, `Y`, `Enter`

### 9.3. Enable site
```bash
sudo ln -s /etc/nginx/sites-available/uni-house /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## Bước 10: Cấu Hình Domain

### 10.1. Trỏ domain về server
Vào quản lý DNS của domain (Mắt Bão hoặc nhà cung cấp domain):

Thêm A Record:
```
Type: A
Name: @ (hoặc để trống)
Value: IP-server-của-bạn
TTL: 3600
```

Thêm CNAME cho www:
```
Type: CNAME
Name: www
Value: your-domain.com
TTL: 3600
```

Đợi 5-30 phút để DNS propagate.

## Bước 11: Cài SSL (HTTPS)

```bash
# Cài Certbot
sudo apt install certbot python3-certbot-nginx

# Tạo SSL certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Làm theo hướng dẫn, chọn option redirect HTTP to HTTPS
```

SSL sẽ tự động renew. Kiểm tra:
```bash
sudo certbot renew --dry-run
```

## Bước 12: Kiểm Tra

1. Truy cập: `https://your-domain.com`
2. Test login admin: `https://your-domain.com/admin/login`
3. Test contact form
4. Check security headers: https://securityheaders.com

## Quản Lý App

### Xem logs
```bash
pm2 logs uni-house
```

### Restart app
```bash
pm2 restart uni-house
```

### Stop app
```bash
pm2 stop uni-house
```

### Xem status
```bash
pm2 status
pm2 monit
```

## Cập Nhật Code

Khi có code mới:

```bash
# SSH vào server
ssh username@your-server-ip

# Vào thư mục project
cd /var/www/uni-house/uni-house-nextjs

# Pull code mới
git pull origin main

# Install dependencies mới (nếu có)
npm install --production

# Build lại
npm run build

# Restart app
pm2 restart uni-house

# Xem logs để check
pm2 logs uni-house
```

## Troubleshooting

### App không start
```bash
# Check logs
pm2 logs uni-house

# Check port 3000 có bị chiếm không
sudo lsof -i :3000

# Restart
pm2 restart uni-house
```

### 502 Bad Gateway
```bash
# Check Nginx
sudo nginx -t
sudo systemctl status nginx

# Check app
pm2 status
pm2 logs uni-house
```

### Cannot connect to server
```bash
# Check firewall
sudo ufw status
sudo ufw allow 80
sudo ufw allow 443
sudo ufw allow 22
```

### Out of memory
```bash
# Tăng memory cho PM2
pm2 delete uni-house
pm2 start npm --name "uni-house" --max-memory-restart 500M -- start
pm2 save
```

## Backup

### Backup code
```bash
cd /var/www/uni-house
tar -czf backup-$(date +%Y%m%d).tar.gz uni-house-nextjs/
```

### Backup database (nếu có)
```bash
# Tùy loại database
```

## Monitoring

### Setup monitoring với PM2
```bash
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7
```

## Chi Phí Ước Tính

- VPS Mắt Bão: ~200,000 - 500,000 VNĐ/tháng
- Domain: ~200,000 - 500,000 VNĐ/năm
- SSL: Miễn phí (Let's Encrypt)

## Liên Hệ Hỗ Trợ Mắt Bão

- Website: https://matbao.net
- Hotline: 1900 6680
- Email: support@matbao.net

## Checklist Deploy

- [ ] Node.js đã cài (version 18+)
- [ ] Code đã upload lên server
- [ ] Dependencies đã install
- [ ] Environment variables đã tạo
- [ ] Build thành công
- [ ] PM2 đã start app
- [ ] Nginx đã cấu hình
- [ ] Domain đã trỏ về server
- [ ] SSL đã cài đặt
- [ ] Test login admin thành công
- [ ] Test contact form thành công

**Chúc bạn deploy thành công! 🚀**
