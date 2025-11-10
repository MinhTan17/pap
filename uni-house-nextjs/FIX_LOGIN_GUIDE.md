# Hướng dẫn Fix Login Admin trên Vercel

## Thông tin đăng nhập mới

- **Username**: `admin`
- **Password**: `Admin2025!`
- **Password Hash**: `$2b$10$B4ol32Ye5Wc.ouKLk8vW0OgmvT5fmmkLvvDPl2gTeneri0avCUwMG`

## Các bước thực hiện

### Bước 1: Cập nhật Environment Variables trên Vercel

1. Truy cập: https://vercel.com/phu-an-phats-projects/pap-xool/settings/environment-variables
2. Tìm biến `ADMIN_PASSWORD_HASH`
3. Click **Edit** (biểu tượng bút chì)
4. Thay đổi giá trị thành: `$2b$10$B4ol32Ye5Wc.ouKLk8vW0OgmvT5fmmkLvvDPl2gTeneri0avCUwMG`
5. Click **Save**

### Bước 2: Redeploy Project

**QUAN TRỌNG**: Sau khi thay đổi environment variables, bạn PHẢI redeploy!

1. Vào tab **Deployments**: https://vercel.com/phu-an-phats-projects/pap-xool/deployments
2. Click vào deployment mới nhất (dòng đầu tiên)
3. Click nút **"..."** (3 chấm) ở góc trên bên phải
4. Chọn **"Redeploy"**
5. Confirm bằng cách click **"Redeploy"** lần nữa
6. Đợi 1-2 phút cho deployment hoàn tất

### Bước 3: Đợi 15 phút (nếu bị rate limit)

Nếu bạn đã thử đăng nhập sai quá nhiều lần, hệ thống sẽ chặn IP của bạn trong 15 phút.

**Giải pháp**:
- Đợi 15 phút
- Hoặc thử đăng nhập từ mạng khác (4G/5G trên điện thoại)
- Hoặc dùng VPN để đổi IP

### Bước 4: Đăng nhập

Sau khi redeploy xong và đợi đủ thời gian:

1. Truy cập: https://phuanphat.com/admin/login
2. Nhập:
   - Username: `admin`
   - Password: `Admin2025!`
3. Click **Đăng nhập**

## Kiểm tra xem Environment Variables đã được apply chưa

Truy cập: https://phuanphat.com/api/debug-env

Bạn sẽ thấy thông tin:
```json
{
  "username": "admin",
  "hashExists": true,
  "hashPreview": "$2b$10$B4ol32Ye5Wc...",
  "passwordTest": {
    "password": "AdminPAP@2025!177305",
    "match": false
  },
  "env": "production"
}
```

**Lưu ý**: Sau khi kiểm tra xong, hãy xóa file `/api/debug-env/route.ts` vì lý do bảo mật!

## Nếu vẫn không được

### Kiểm tra logs trên Vercel

1. Vào: https://vercel.com/phu-an-phats-projects/pap-xool/logs
2. Filter theo `/api/auth/login`
3. Tìm các dòng log có `[Auth]`:
   - `[Auth] Environment check:` - Kiểm tra env variables
   - `[Auth] Username check:` - Kiểm tra username
   - `[Auth] Password check:` - Kiểm tra password

### Thử password cũ

Có thể environment variables chưa được update. Thử đăng nhập với password cũ:
- Password: `admin123`

## Tóm tắt

1. ✅ Cập nhật `ADMIN_PASSWORD_HASH` trên Vercel
2. ✅ **Redeploy** project (QUAN TRỌNG!)
3. ✅ Đợi 15 phút nếu bị rate limit
4. ✅ Đăng nhập với `admin` / `Admin2025!`

## Liên hệ hỗ trợ

Nếu vẫn gặp vấn đề, hãy:
1. Chụp màn hình logs từ Vercel
2. Chụp màn hình kết quả từ `/api/debug-env`
3. Gửi cho developer để được hỗ trợ
