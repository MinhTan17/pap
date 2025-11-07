# Tài liệu Bảo mật Nâng cao

## Các cải tiến bảo mật đã triển khai

### 1. Security Headers
Tất cả các response đều có security headers để bảo vệ khỏi các tấn công phổ biến:

- **X-XSS-Protection**: Bảo vệ khỏi XSS attacks
- **X-Frame-Options**: Ngăn chặn clickjacking
- **X-Content-Type-Options**: Ngăn MIME type sniffing
- **Strict-Transport-Security (HSTS)**: Bắt buộc HTTPS
- **Content-Security-Policy (CSP)**: Kiểm soát nguồn tài nguyên
- **Referrer-Policy**: Kiểm soát thông tin referrer
- **Permissions-Policy**: Vô hiệu hóa các tính năng không cần thiết

### 2. Input Validation & Sanitization
Tất cả input từ người dùng đều được validate và sanitize:

- **Email validation**: Kiểm tra format và độ dài
- **Phone validation**: Hỗ trợ format Việt Nam
- **Text validation**: Kiểm tra độ dài và ký tự nguy hiểm
- **HTML sanitization**: Loại bỏ script tags và attributes nguy hiểm
- **Password strength**: Yêu cầu mật khẩu mạnh (8+ ký tự, chữ hoa, chữ thường, số, ký tự đặc biệt)

### 3. API Rate Limiting
Rate limiting cho các API công khai:

- **Contact API**: 5 requests/giờ mỗi IP
- **Login API**: 5 attempts/15 phút mỗi IP
- Tự động block khi vượt quá giới hạn
- Headers thông báo rate limit status

### 4. Security Event Logging
Ghi log tất cả các sự kiện bảo mật:

- Login thành công/thất bại
- Rate limit exceeded
- Invalid token attempts
- Suspicious activities
- XSS/CSRF attempts

Xem logs qua API: `/api/admin/security-logs`

### 5. Enhanced JWT Security
- JWT secret mạnh (512-bit random)
- Token có thời gian hết hạn
- Verify token ở mọi request
- Secure cookie với httpOnly, secure, sameSite

### 6. CSRF Protection (Sẵn sàng)
Module CSRF đã được tạo và sẵn sàng tích hợp khi cần:
- Generate CSRF tokens
- Verify tokens trước khi xử lý forms
- Token có thời gian hết hạn

## Cấu hình

### Environment Variables (.env.local)

```env
# Admin Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=$2b$10$...

# JWT Secret - CRITICAL: Must be changed in production!
JWT_SECRET=<generate-with-script>

# Session Settings
SESSION_MAX_AGE=86400

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
EMAIL_FROM=your-email@gmail.com
EMAIL_TO=recipient@example.com
```

### Tạo JWT Secret mạnh

```bash
node scripts/generate-strong-secret.js
```

Copy secret được tạo vào `.env.local`

### Thay đổi mật khẩu admin

```bash
node scripts/generate-hash.js
```

Sửa password trong script, chạy và copy hash vào `.env.local`

## Best Practices cho Production

### 1. Trước khi Deploy
- [ ] Tạo JWT_SECRET mới bằng script
- [ ] Thay đổi ADMIN_PASSWORD thành mật khẩu mạnh
- [ ] Đảm bảo HTTPS được bật
- [ ] Kiểm tra tất cả environment variables
- [ ] Không commit `.env.local` vào git
- [ ] Review security logs

### 2. Sau khi Deploy
- [ ] Test tất cả các tính năng bảo mật
- [ ] Verify HTTPS hoạt động
- [ ] Test rate limiting
- [ ] Kiểm tra security headers (dùng securityheaders.com)
- [ ] Monitor security logs thường xuyên

### 3. Bảo trì định kỳ
- [ ] Thay đổi mật khẩu admin mỗi 3-6 tháng
- [ ] Review security logs hàng tuần
- [ ] Update dependencies (npm audit fix)
- [ ] Backup dữ liệu quan trọng
- [ ] Test disaster recovery plan

## Kiểm tra bảo mật

### Test Security Headers
```bash
curl -I https://your-domain.com
```

Hoặc sử dụng: https://securityheaders.com

### Test Rate Limiting
```bash
# Gửi 6 requests liên tiếp đến contact API
for i in {1..6}; do
  curl -X POST https://your-domain.com/api/contact \
    -H "Content-Type: application/json" \
    -d '{"name":"Test","phone":"0123456789","message":"Test message"}'
done
```

Request thứ 6 sẽ bị block với status 429.

### Test XSS Protection
Thử submit form với input:
```html
<script>alert('XSS')</script>
```

Input sẽ được sanitize và script tag bị loại bỏ.

### Xem Security Logs
```bash
curl https://your-domain.com/api/admin/security-logs \
  -H "Cookie: auth-token=your-token"
```

## Các tính năng bảo mật nâng cao (Tương lai)

### 1. Two-Factor Authentication (2FA)
- Sử dụng TOTP (Time-based One-Time Password)
- Backup codes
- SMS verification (optional)

### 2. IP Whitelist
- Chỉ cho phép admin login từ IP cụ thể
- Cấu hình trong environment variables

### 3. Session Management
- Xem tất cả active sessions
- Force logout từ xa
- Logout all devices

### 4. Advanced Logging
- Lưu logs vào database hoặc external service
- Real-time alerts cho suspicious activities
- Log retention policy

### 5. Database Encryption
- Encrypt sensitive data at rest
- Use encrypted connections

### 6. Automated Security Scanning
- Dependency vulnerability scanning
- Code security analysis
- Penetration testing

## Incident Response

### Nếu phát hiện breach:
1. **Ngay lập tức**:
   - Thay đổi JWT_SECRET (invalidate tất cả tokens)
   - Thay đổi admin password
   - Block suspicious IPs

2. **Điều tra**:
   - Review security logs
   - Check code changes gần đây
   - Scan for malware/backdoors
   - Identify breach vector

3. **Khắc phục**:
   - Patch vulnerabilities
   - Update dependencies
   - Strengthen security measures
   - Document incident

4. **Phòng ngừa**:
   - Implement additional security measures
   - Update security policies
   - Train team members
   - Regular security audits

## Compliance & Standards

### OWASP Top 10 Coverage
- ✅ A01: Broken Access Control
- ✅ A02: Cryptographic Failures
- ✅ A03: Injection
- ✅ A04: Insecure Design
- ✅ A05: Security Misconfiguration
- ✅ A06: Vulnerable Components
- ✅ A07: Authentication Failures
- ⚠️ A08: Software and Data Integrity (Partial)
- ✅ A09: Security Logging Failures
- ⚠️ A10: Server-Side Request Forgery (Partial)

### Security Testing Checklist
- [ ] SQL Injection testing
- [ ] XSS testing
- [ ] CSRF testing
- [ ] Authentication bypass testing
- [ ] Authorization testing
- [ ] Session management testing
- [ ] Input validation testing
- [ ] Error handling testing
- [ ] Cryptography testing
- [ ] Business logic testing

## Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)
- [Security Headers](https://securityheaders.com/)
- [Content Security Policy](https://content-security-policy.com/)
- [bcrypt Documentation](https://github.com/kelektiv/node.bcrypt.js)

## Support

Nếu có câu hỏi hoặc phát hiện vấn đề bảo mật, vui lòng liên hệ:
- Email: security@your-domain.com
- Báo cáo bảo mật: security-reports@your-domain.com

**Lưu ý**: Không công khai thông tin về lỗ hổng bảo mật trước khi được khắc phục.
