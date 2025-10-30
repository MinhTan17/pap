# Tài liệu Yêu cầu - Gửi Email Form Liên Hệ

## Giới thiệu

Tính năng cho phép khách hàng gửi thông tin liên hệ qua form trên trang liên hệ và hệ thống sẽ tự động gửi email thông báo đến địa chỉ email của công ty.

## Thuật ngữ

- **ContactForm**: Form liên hệ trên trang web
- **EmailAPI**: API endpoint xử lý gửi email
- **EmailService**: Dịch vụ gửi email (Nodemailer)
- **AdminEmail**: Email nhận thông báo của công ty

## Yêu cầu

### Yêu cầu 1

**User Story:** Là khách hàng, tôi muốn gửi thông tin liên hệ qua form để công ty có thể nhận được yêu cầu của tôi

#### Tiêu chí chấp nhận

1. WHEN khách hàng điền đầy đủ thông tin và nhấn nút gửi, THE ContactForm SHALL gửi dữ liệu đến EmailAPI
2. THE ContactForm SHALL hiển thị trạng thái loading trong khi gửi dữ liệu
3. WHEN gửi thành công, THE ContactForm SHALL hiển thị thông báo thành công
4. IF gửi thất bại, THEN THE ContactForm SHALL hiển thị thông báo lỗi

### Yêu cầu 2

**User Story:** Là admin, tôi muốn nhận email thông báo khi có khách hàng gửi form liên hệ để có thể phản hồi kịp thời

#### Tiêu chí chấp nhận

1. WHEN EmailAPI nhận được request hợp lệ, THE EmailAPI SHALL gửi email đến AdminEmail
2. THE email SHALL chứa đầy đủ thông tin: tên, email, số điện thoại, và nội dung tin nhắn
3. THE EmailAPI SHALL trả về status 200 khi gửi email thành công
4. IF gửi email thất bại, THEN THE EmailAPI SHALL trả về status 500 với thông báo lỗi

### Yêu cầu 3

**User Story:** Là hệ thống, tôi cần validate dữ liệu form để đảm bảo thông tin hợp lệ trước khi gửi email

#### Tiêu chí chấp nhận

1. THE EmailAPI SHALL kiểm tra các trường bắt buộc: name, phone, message
2. THE EmailAPI SHALL validate định dạng email nếu có
3. THE EmailAPI SHALL validate định dạng số điện thoại
4. IF dữ liệu không hợp lệ, THEN THE EmailAPI SHALL trả về status 400 với thông báo lỗi cụ thể

### Yêu cầu 4

**User Story:** Là admin, tôi muốn cấu hình thông tin email gửi qua biến môi trường để dễ dàng thay đổi

#### Tiêu chí chấp nhận

1. THE EmailService SHALL đọc cấu hình SMTP từ biến môi trường
2. THE EmailService SHALL đọc AdminEmail từ biến môi trường
3. THE EmailService SHALL sử dụng thông tin xác thực từ biến môi trường
4. IF thiếu cấu hình, THEN THE EmailService SHALL báo lỗi rõ ràng
