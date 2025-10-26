# Hướng dẫn sử dụng trang Admin

## Tổng quan

Hệ thống admin cho phép bạn quản lý toàn bộ nội dung website bao gồm:
- Banner/Slideshow
- Dịch vụ
- Sản phẩm
- Tin tức
- Danh mục sản phẩm

## Truy cập trang Admin

Truy cập: `http://localhost:3000/admin`

## Các chức năng chính

### 1. Quản lý Banner (`/admin/banners`)

**Chức năng:**
- ✅ Thêm banner mới
- ✅ Sửa banner hiện có
- ✅ Xóa banner
- ✅ Upload hình ảnh hoặc nhập đường dẫn
- ✅ Chọn màu gradient
- ✅ Preview trước khi lưu

**Cách sử dụng:**
1. Click "Thêm banner mới"
2. Nhập thông tin:
   - Tiêu đề chính
   - Tiêu đề phụ
   - Mô tả
   - Chọn màu gradient
   - Upload ảnh hoặc nhập đường dẫn
   - Alt text (cho SEO)
   - Link (tùy chọn)
3. Xem preview
4. Click "Lưu"

**Lưu ý:**
- Banner sẽ hiển thị trên trang chủ dưới dạng slideshow
- Có thể upload ảnh trực tiếp hoặc nhập đường dẫn ảnh
- Ảnh nên có tỷ lệ 16:9 để hiển thị đẹp

### 2. Quản lý Dịch vụ (`/admin/services`)

**Chức năng:**
- ✅ Thêm dịch vụ mới
- ✅ Sửa dịch vụ hiện có
- ✅ Xóa dịch vụ
- ✅ Upload hình ảnh dịch vụ
- ✅ Quản lý tính năng nổi bật (features)
- ✅ Chọn màu sắc

**Cách sử dụng:**
1. Click "Thêm dịch vụ mới"
2. Nhập thông tin:
   - Tên dịch vụ
   - Mô tả chi tiết
   - Chọn màu sắc
   - Upload ảnh hoặc nhập đường dẫn
3. Thêm tính năng nổi bật:
   - Nhập tính năng vào ô input
   - Click "Thêm" hoặc nhấn Enter
   - Có thể xóa từng tính năng
4. Click "Lưu"

**Lưu ý:**
- Mỗi dịch vụ có thể có nhiều tính năng nổi bật
- Ảnh dịch vụ sẽ hiển thị trên trang chủ và trang dịch vụ

### 3. Quản lý Sản phẩm (`/admin/products`)

**Chức năng:**
- ✅ Thêm sản phẩm mới
- ✅ Sửa sản phẩm hiện có
- ✅ Xóa sản phẩm
- ✅ Upload hình ảnh chính
- ✅ Upload nhiều ảnh cho thư viện (gallery)
- ✅ Chọn danh mục
- ✅ Chọn màu sắc

**Cách sử dụng:**
1. Click "Thêm sản phẩm mới"
2. Nhập thông tin cơ bản:
   - Tên sản phẩm
   - Danh mục
   - Giá
   - Mô tả
   - Màu sắc
3. Upload hình ảnh chính:
   - Click "Upload hình ảnh chính"
   - Chọn file ảnh
   - Hoặc nhập đường dẫn ảnh
4. Upload thư viện ảnh:
   - Click "Upload nhiều ảnh"
   - Chọn nhiều file ảnh cùng lúc
   - Xem preview và xóa ảnh không cần thiết
5. Click "Lưu"

**Lưu ý:**
- Hình ảnh chính hiển thị trên danh sách sản phẩm
- Thư viện ảnh hiển thị trên trang chi tiết sản phẩm
- Có thể upload nhiều ảnh cùng lúc cho thư viện
- Hover vào ảnh trong thư viện để xem nút xóa

## Lưu trữ dữ liệu

- Tất cả dữ liệu được lưu trong **localStorage** của trình duyệt
- Dữ liệu sẽ được giữ nguyên khi reload trang
- Nếu xóa cache trình duyệt, dữ liệu sẽ reset về mặc định

## Upload ảnh

Có 2 cách upload ảnh:

### Cách 1: Upload file trực tiếp
- Click nút "Choose File"
- Chọn ảnh từ máy tính
- Ảnh sẽ được convert sang base64 và lưu trực tiếp

**Ưu điểm:**
- Không cần server
- Ảnh được lưu ngay trong localStorage

**Nhược điểm:**
- Kích thước localStorage giới hạn (~5-10MB)
- Không nên upload ảnh quá lớn

### Cách 2: Nhập đường dẫn ảnh
- Đặt ảnh vào thư mục `public/icons/`
- Nhập đường dẫn: `/icons/products/ten-anh.png`

**Ưu điểm:**
- Không giới hạn kích thước
- Tốc độ load nhanh hơn

**Nhược điểm:**
- Phải upload ảnh lên server trước

## Khuyến nghị

1. **Kích thước ảnh:**
   - Banner: 1920x1080px (16:9)
   - Dịch vụ: 800x600px
   - Sản phẩm: 800x800px

2. **Định dạng ảnh:**
   - Ưu tiên: JPG, PNG
   - Có thể dùng: WebP, SVG

3. **Tối ưu:**
   - Nén ảnh trước khi upload
   - Dùng đường dẫn file thay vì base64 cho ảnh lớn

4. **Backup:**
   - Thường xuyên export dữ liệu từ localStorage
   - Hoặc chuyển sang database thực tế cho production

## Troubleshooting

### Ảnh không hiển thị
- Kiểm tra đường dẫn ảnh có đúng không
- Kiểm tra file ảnh có tồn tại trong thư mục public không
- Thử xóa cache và reload trang

### Không lưu được dữ liệu
- Kiểm tra localStorage có bị đầy không
- Thử xóa một số ảnh base64 lớn
- Chuyển sang dùng đường dẫn file thay vì upload trực tiếp

### Modal không đóng
- Click nút "Hủy" hoặc "Lưu"
- Reload trang nếu bị lỗi

## Phát triển tiếp

Để chuyển sang production, nên:
1. Thay localStorage bằng database (MongoDB, PostgreSQL, etc.)
2. Thêm authentication/authorization
3. Upload ảnh lên cloud storage (AWS S3, Cloudinary, etc.)
4. Thêm validation và error handling
5. Thêm pagination cho danh sách dài
6. Thêm search và filter
