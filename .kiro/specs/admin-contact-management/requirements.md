# Requirements Document

## Introduction

Hệ thống quản lý thông tin liên hệ cho phép admin cập nhật và quản lý các thông tin hiển thị trên trang liên hệ của website, bao gồm thông tin công ty chính, các chi nhánh miền Bắc và miền Nam, hotline, địa chỉ và Google Maps embed URL. Tất cả thay đổi sẽ được lưu trữ trong localStorage và hiển thị ngay lập tức trên trang liên hệ công khai.

## Glossary

- **Admin System**: Hệ thống quản trị nội dung của website Phú An Phát
- **Contact Page**: Trang liên hệ công khai hiển thị thông tin công ty cho khách hàng
- **Contact Data**: Dữ liệu thông tin liên hệ bao gồm địa chỉ, hotline, chi nhánh
- **Branch**: Chi nhánh thuộc mạng lưới Phú An Phát (miền Bắc hoặc miền Nam)
- **localStorage**: Bộ nhớ trình duyệt để lưu trữ dữ liệu cục bộ
- **DataContext**: Context React quản lý và chia sẻ dữ liệu trong ứng dụng

## Requirements

### Requirement 1

**User Story:** Là admin, tôi muốn xem và chỉnh sửa thông tin công ty chính, để cập nhật địa chỉ và hotline khi có thay đổi

#### Acceptance Criteria

1. WHEN admin truy cập trang quản lý liên hệ, THE Admin System SHALL hiển thị form chỉnh sửa với các trường: tên công ty, địa chỉ, và hotline
2. WHEN admin nhập dữ liệu vào các trường thông tin, THE Admin System SHALL cho phép nhập và hiển thị giá trị trong form
3. WHEN admin nhấn nút lưu thông tin công ty, THE Admin System SHALL lưu dữ liệu vào localStorage với key 'contactInfo'
4. WHEN dữ liệu được lưu thành công, THE Admin System SHALL hiển thị thông báo xác nhận trong vòng 3 giây
5. WHEN trang liên hệ công khai được tải, THE Contact Page SHALL đọc và hiển thị thông tin công ty từ localStorage

### Requirement 2

**User Story:** Là admin, tôi muốn quản lý danh sách chi nhánh miền Bắc, để thêm, sửa hoặc xóa thông tin chi nhánh khi cần

#### Acceptance Criteria

1. WHEN admin xem trang quản lý liên hệ, THE Admin System SHALL hiển thị danh sách tất cả chi nhánh miền Bắc với tên, địa chỉ và hotline
2. WHEN admin nhấn nút thêm chi nhánh miền Bắc, THE Admin System SHALL hiển thị form nhập với các trường: tên chi nhánh, địa chỉ, hotline
3. WHEN admin nhập đầy đủ thông tin và nhấn lưu, THE Admin System SHALL thêm chi nhánh mới vào danh sách và lưu vào localStorage
4. WHEN admin nhấn nút chỉnh sửa chi nhánh, THE Admin System SHALL hiển thị form với dữ liệu hiện tại của chi nhánh đó
5. WHEN admin nhấn nút xóa chi nhánh, THE Admin System SHALL hiển thị dialog xác nhận trước khi xóa
6. WHEN admin xác nhận xóa, THE Admin System SHALL xóa chi nhánh khỏi danh sách và cập nhật localStorage

### Requirement 3

**User Story:** Là admin, tôi muốn quản lý danh sách chi nhánh miền Nam, để thêm, sửa hoặc xóa thông tin chi nhánh khi cần

#### Acceptance Criteria

1. WHEN admin xem trang quản lý liên hệ, THE Admin System SHALL hiển thị danh sách tất cả chi nhánh miền Nam với tên, địa chỉ và hotline
2. WHEN admin nhấn nút thêm chi nhánh miền Nam, THE Admin System SHALL hiển thị form nhập với các trường: tên chi nhánh, địa chỉ, hotline
3. WHEN admin nhập đầy đủ thông tin và nhấn lưu, THE Admin System SHALL thêm chi nhánh mới vào danh sách và lưu vào localStorage
4. WHEN admin nhấn nút chỉnh sửa chi nhánh, THE Admin System SHALL hiển thị form với dữ liệu hiện tại của chi nhánh đó
5. WHEN admin nhấn nút xóa chi nhánh, THE Admin System SHALL hiển thị dialog xác nhận trước khi xóa
6. WHEN admin xác nhận xóa, THE Admin System SHALL xóa chi nhánh khỏi danh sách và cập nhật localStorage

### Requirement 4

**User Story:** Là admin, tôi muốn cập nhật Google Maps embed URL, để thay đổi vị trí bản đồ hiển thị trên trang liên hệ

#### Acceptance Criteria

1. WHEN admin xem trang quản lý liên hệ, THE Admin System SHALL hiển thị trường nhập cho Google Maps embed URL
2. WHEN admin nhập URL mới, THE Admin System SHALL cho phép nhập và hiển thị giá trị trong trường
3. WHEN admin nhấn nút lưu, THE Admin System SHALL lưu URL vào localStorage với key 'contactInfo'
4. WHEN trang liên hệ công khai được tải, THE Contact Page SHALL sử dụng URL từ localStorage để hiển thị bản đồ
5. IF URL không hợp lệ hoặc trống, THEN THE Contact Page SHALL hiển thị URL mặc định

### Requirement 5

**User Story:** Là admin, tôi muốn xem trước thay đổi trước khi lưu, để đảm bảo thông tin hiển thị chính xác

#### Acceptance Criteria

1. WHEN admin thay đổi bất kỳ thông tin nào trong form, THE Admin System SHALL hiển thị nút "Xem trước"
2. WHEN admin nhấn nút xem trước, THE Admin System SHALL hiển thị modal với giao diện giống trang liên hệ công khai
3. WHEN modal xem trước được hiển thị, THE Admin System SHALL render thông tin với dữ liệu mới từ form
4. WHEN admin đóng modal xem trước, THE Admin System SHALL quay lại form chỉnh sửa mà không lưu thay đổi
5. WHEN admin nhấn nút lưu từ modal xem trước, THE Admin System SHALL lưu tất cả thay đổi vào localStorage

### Requirement 6

**User Story:** Là admin, tôi muốn khôi phục dữ liệu mặc định, để reset về thông tin ban đầu khi cần

#### Acceptance Criteria

1. WHEN admin xem trang quản lý liên hệ, THE Admin System SHALL hiển thị nút "Khôi phục mặc định"
2. WHEN admin nhấn nút khôi phục mặc định, THE Admin System SHALL hiển thị dialog xác nhận với cảnh báo mất dữ liệu
3. WHEN admin xác nhận khôi phục, THE Admin System SHALL xóa dữ liệu trong localStorage và load dữ liệu mặc định
4. WHEN dữ liệu được khôi phục, THE Admin System SHALL cập nhật form với dữ liệu mặc định
5. WHEN dữ liệu được khôi phục, THE Admin System SHALL hiển thị thông báo xác nhận thành công

### Requirement 7

**User Story:** Là người dùng, tôi muốn xem thông tin liên hệ được cập nhật từ admin, để có thông tin chính xác nhất

#### Acceptance Criteria

1. WHEN trang liên hệ được tải, THE Contact Page SHALL kiểm tra localStorage cho dữ liệu 'contactInfo'
2. IF dữ liệu tồn tại trong localStorage, THEN THE Contact Page SHALL hiển thị dữ liệu từ localStorage
3. IF dữ liệu không tồn tại trong localStorage, THEN THE Contact Page SHALL hiển thị dữ liệu mặc định được hardcode
4. WHEN hiển thị chi nhánh, THE Contact Page SHALL render danh sách chi nhánh miền Bắc và miền Nam từ dữ liệu
5. WHEN hiển thị bản đồ, THE Contact Page SHALL sử dụng Google Maps embed URL từ dữ liệu
