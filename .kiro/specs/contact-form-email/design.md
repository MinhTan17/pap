# Tài liệu Thiết kế - Gửi Email Form Liên Hệ

## Tổng quan

Hệ thống sử dụng Nodemailer để gửi email thông qua SMTP. API endpoint nhận dữ liệu form, validate, và gửi email đến admin.

## Kiến trúc

```
Client (Form) → API Route (/api/contact) → Nodemailer → SMTP Server → Admin Email
```

## Components và Interfaces

### 1. API Route: `/api/contact/route.ts`

**Request Body:**
```typescript
{
  name: string;
  email?: string;
  phone: string;
  message: string;
}
```

**Response:**
```typescript
// Success
{ success: true, message: string }

// Error
{ success: false, error: string }
```

### 2. Email Service: `src/lib/email.ts`

**Function: sendContactEmail**
```typescript
interface ContactData {
  name: string;
  email?: string;
  phone: string;
  message: string;
}

async function sendContactEmail(data: ContactData): Promise<void>
```

### 3. Contact Form Component

Cập nhật `src/app/lien-he/page.tsx`:
- Thêm state loading và error
- Gọi API `/api/contact` khi submit
- Hiển thị thông báo thành công/lỗi

## Data Models

### ContactFormData
```typescript
interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}
```

### EmailConfig
```typescript
interface EmailConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
  from: string;
  to: string;
}
```

## Xử lý lỗi

1. **Validation Errors (400):**
   - Thiếu trường bắt buộc
   - Email không hợp lệ
   - Số điện thoại không hợp lệ

2. **Server Errors (500):**
   - Lỗi kết nối SMTP
   - Lỗi gửi email
   - Thiếu cấu hình môi trường

3. **Client Errors:**
   - Hiển thị toast/alert với thông báo lỗi
   - Giữ dữ liệu form khi lỗi

## Chiến lược Testing

1. **Unit Tests:**
   - Validate dữ liệu form
   - Format email template

2. **Integration Tests:**
   - Test API endpoint với dữ liệu hợp lệ
   - Test API endpoint với dữ liệu không hợp lệ

## Biến môi trường

```env
# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
EMAIL_FROM=your-email@gmail.com
EMAIL_TO=sales.phuanphat@gmail.com
```

## Template Email

```html
Subject: Liên hệ mới từ website

Họ tên: [name]
Email: [email]
Điện thoại: [phone]
Nội dung: [message]
```
