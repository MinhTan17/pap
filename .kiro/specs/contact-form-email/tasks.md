# Danh sách Task - Gửi Email Form Liên Hệ

- [x] 1. Cài đặt Nodemailer


  - Chạy `npm install nodemailer` và `npm install -D @types/nodemailer`
  - _Yêu cầu: 2.1, 4.1_

- [x] 2. Tạo Email Service

  - [x] 2.1 Tạo file `src/lib/email.ts` với function sendContactEmail


    - Cấu hình Nodemailer transporter với SMTP
    - Tạo template email HTML
    - Xử lý gửi email và error handling
    - _Yêu cầu: 2.1, 2.2, 4.1, 4.2, 4.3_

- [ ] 3. Tạo API endpoint
  - [x] 3.1 Tạo file `src/app/api/contact/route.ts`


    - Xử lý POST request
    - Validate dữ liệu đầu vào (name, phone, message, email)
    - Gọi sendContactEmail
    - Trả về response phù hợp
    - _Yêu cầu: 1.1, 2.1, 2.3, 3.1, 3.2, 3.3, 3.4_


- [x] 4. Cập nhật Contact Form

  - [-] 4.1 Cập nhật `src/app/lien-he/page.tsx`

    - Thêm state loading và error
    - Implement handleSubmit gọi API `/api/contact`
    - Hiển thị loading spinner khi đang gửi
    - Hiển thị thông báo thành công
    - Hiển thị thông báo lỗi nếu có


    - Reset form sau khi gửi thành công

    - _Yêu cầu: 1.1, 1.2, 1.3, 1.4_


- [ ] 5. Cấu hình biến môi trường
  - [ ] 5.1 Thêm biến môi trường vào `.env.local`
    - SMTP_HOST, SMTP_PORT, SMTP_SECURE
    - SMTP_USER, SMTP_PASS
    - EMAIL_FROM, EMAIL_TO
    - _Yêu cầu: 4.1, 4.2, 4.3, 4.4_
