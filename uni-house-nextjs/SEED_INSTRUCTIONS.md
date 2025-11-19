# Hướng dẫn Seed dữ liệu lên Production

## Cách 1: Seed từ command line (Khuyến nghị)

```bash
# Windows CMD
set MONGODB_URI=mongodb+srv://your_connection_string
node scripts/seed-services.js

# Windows PowerShell
$env:MONGODB_URI="mongodb+srv://your_connection_string"
node scripts/seed-services.js
```

## Cách 2: Sửa file .env.local

1. Mở file `.env.local`
2. Thay `MONGODB_URI` bằng connection string của production
3. Chạy: `node scripts/seed-services.js`
4. Sau khi seed xong, đổi lại `MONGODB_URI` về local

## Cách 3: Sử dụng Vercel CLI

```bash
# Install Vercel CLI (nếu chưa có)
npm i -g vercel

# Link project
vercel link

# Pull environment variables
vercel env pull .env.production

# Seed với production env
node -r dotenv/config scripts/seed-services.js dotenv_config_path=.env.production
```

## Kiểm tra sau khi seed

1. Vào trang admin: https://your-domain.vercel.app/admin/services
2. Bạn sẽ thấy 6 dịch vụ hiện ra
3. Click vào từng dịch vụ để chỉnh sửa nội dung
