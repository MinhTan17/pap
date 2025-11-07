# Tài liệu Bảo mật

> **Lưu ý**: Tài liệu này đã được cập nhật. Xem thêm:
> - `SECURITY_ENHANCED.md` - Chi tiết các tính năng bảo mật nâng cao
> - `SECURITY_CHECKLIST.md` - Danh sách kiểm tra bảo mật

## Các tính năng bảo mật đã triển khai

### 1. JWT (JSON Web Tokens)
- Sử dụng JWT thay vì simple base64 tokens
- Token có thời gian hết hạn (mặc định 24 giờ)
- Token được ký bằng secret key
- Verify token ở mọi request

### 2. Rate Limiting
- Giới hạn 5 lần đăng nhập thất bại trong 15 phút
- Tự động reset sau khi đăng nhập thành công
- Theo dõi theo IP address
- Thông báo rõ ràng số lần thử còn lại

### 3. Password Security
- Mật khẩu được hash bằng bcrypt với 10 salt rounds
- Không lưu mật khẩu plain text
- So sánh hash an toàn

### 4. Cookie Security
- `httpOnly: true` - Không thể truy cập từ JavaScript (chống XSS)
- `secure: true` trong production - Chỉ gửi qua HTTPS
- `sameSite: 'lax'` - Bảo vệ khỏi CSRF attacks
- Có thời gian hết hạn

### 5. Environment Variables
- Credentials được lưu trong `.env.local`
- Không commit sensitive data vào git
- JWT secret có thể thay đổi dễ dàng

### 6. Logging & Monitoring
- Log tất cả các lần đăng nhập (thành công và thất bại)
- Log IP address của người dùng
- Log token verification failures
- Giúp phát hiện các cuộc tấn công

## Cấu hình

### Environment Variables (.env.local)

```env
# Admin Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=$2b$10$...

# JWT Secret (PHẢI thay đổi trong production)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Session Settings (seconds)
SESSION_MAX_AGE=86400
```

### Thay đổi mật khẩu admin

1. Chạy script generate hash:
```bash
node scripts/generate-hash.js
```

2. Sửa password trong script nếu cần:
```javascript
const password = 'your-new-password';
```

3. Copy hash mới vào `.env.local`:
```env
ADMIN_PASSWORD_HASH=your-new-hash-here
```

### Thay đổi JWT Secret

**QUAN TRỌNG**: Phải thay đổi JWT_SECRET trong production!

```env
JWT_SECRET=$(openssl rand -base64 32)
```

Hoặc tạo random string bất kỳ (ít nhất 32 ký tự).

## Best Practices

### 1. Production Deployment
- [ ] Thay đổi JWT_SECRET thành random string
- [ ] Thay đổi ADMIN_PASSWORD
- [ ] Đảm bảo HTTPS được bật
- [ ] Không commit `.env.local` vào git
- [ ] Sử dụng environment variables của hosting platform

### 2. Regular Maintenance
- [ ] Thay đổi mật khẩu admin định kỳ (3-6 tháng)
- [ ] Review logs để phát hiện suspicious activities
- [ ] Update dependencies thường xuyên
- [ ] Monitor failed login attempts

### 3. Additional Security (Nâng cao)
- [ ] Implement 2FA (Two-Factor Authentication)
- [ ] Add CAPTCHA sau nhiều lần đăng nhập thất bại
- [ ] Implement session management (force logout all devices)
- [ ] Add IP whitelist cho admin
- [ ] Implement audit logs
- [ ] Add email notifications cho login từ IP mới

## Giới hạn hiện tại

### 1. In-Memory Rate Limiting
- Rate limit data được lưu trong memory
- Sẽ mất khi restart server
- Không hoạt động với multiple server instances
- **Giải pháp**: Sử dụng Redis hoặc database cho production

### 2. Single Admin User
- Chỉ hỗ trợ 1 admin user
- Không có role-based access control
- **Giải pháp**: Implement user database với roles

### 3. No Session Management
- Không thể force logout từ xa
- Không thể xem active sessions
- **Giải pháp**: Implement session store với Redis

## Testing Security

### Test Rate Limiting
```bash
# Thử đăng nhập sai 6 lần liên tiếp
# Lần thứ 6 sẽ bị block
```

### Test Token Expiration
```bash
# Đợi 24 giờ (hoặc thay đổi SESSION_MAX_AGE)
# Token sẽ hết hạn và phải đăng nhập lại
```

### Test Cookie Security
```javascript
// Mở Console và thử:
document.cookie // Không thể thấy auth-token vì httpOnly
```

## Incident Response

### Nếu phát hiện unauthorized access:
1. Thay đổi JWT_SECRET ngay lập tức (invalidate tất cả tokens)
2. Thay đổi admin password
3. Review logs để xác định breach
4. Check code changes gần đây
5. Scan for malware/backdoors

### Nếu quên mật khẩu:
1. Generate hash mới bằng script
2. Update `.env.local`
3. Restart server

## Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)
- [bcrypt Documentation](https://github.com/kelektiv/node.bcrypt.js)
