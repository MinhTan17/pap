# Test Word Features - Hướng dẫn kiểm tra

## ✅ Đã hoàn thành

Tất cả các tính năng Word editor đã được cài đặt và styling đã được thêm vào `globals.css`.

## 🎨 Các tính năng có sẵn:

### 1. **Text Formatting**
- **Bold** (Ctrl+B) - In đậm
- *Italic* (Ctrl+I) - In nghiêng  
- <u>Underline</u> (Ctrl+U) - Gạch chân
- ~~Strikethrough~~ - Gạch ngang

### 2. **Headings**
- H1 - Tiêu đề cấp 1 (lớn nhất)
- H2 - Tiêu đề cấp 2
- H3 - Tiêu đề cấp 3
- P - Đoạn văn bình thường

### 3. **Lists**
- Bullet list (•) - Danh sách dấu đầu dòng
- Numbered list (1.) - Danh sách đánh số

### 4. **Alignment**
- Align left - Căn trái
- Align center - Căn giữa
- Align right - Căn phải
- Justify - Căn đều

### 5. **Insert**
- 🔗 Links - Chèn liên kết
- 🖼️ Images - Chèn hình ảnh
- " Blockquote - Trích dẫn
- ― Horizontal Rule - Đường kẻ ngang

### 6. **Undo/Redo**
- ↶ Undo (Ctrl+Z) - Hoàn tác
- ↷ Redo (Ctrl+Y) - Làm lại

## 🧪 Cách test:

### Bước 1: Vào trang admin
```
http://localhost:3002/admin/services
```

### Bước 2: Click "Chỉnh sửa chi tiết" 
Chọn một dịch vụ bất kỳ (ví dụ: ID = 1)

### Bước 3: Click "Chỉnh sửa"
Bật chế độ editor

### Bước 4: Test các tính năng
Thử tất cả các nút trên toolbar:

**Ví dụ nội dung test:**

```html
<h1>Tiêu đề lớn</h1>
<h2>Tiêu đề vừa</h2>
<h3>Tiêu đề nhỏ</h3>

<p>Đây là đoạn văn bình thường với <strong>chữ đậm</strong>, <em>chữ nghiêng</em>, và <u>gạch chân</u>.</p>

<ul>
  <li>Mục 1</li>
  <li>Mục 2</li>
  <li>Mục 3</li>
</ul>

<ol>
  <li>Bước 1</li>
  <li>Bước 2</li>
  <li>Bước 3</li>
</ol>

<blockquote>
  Đây là một trích dẫn quan trọng
</blockquote>

<p><a href="https://example.com">Đây là một liên kết</a></p>
```

### Bước 5: Click "Lưu"
Đợi thông báo "✅ Đã lưu thành công!"

### Bước 6: Click "👁️ Xem trên site"
Mở tab mới để xem kết quả

### Bước 7: Kiểm tra styling
- ✅ Tiêu đề H1, H2, H3 có kích thước khác nhau
- ✅ Chữ đậm, nghiêng, gạch chân hiển thị đúng
- ✅ Danh sách có dấu đầu dòng/số thứ tự
- ✅ Blockquote có viền trái
- ✅ Links có màu xanh và underline
- ✅ Spacing giữa các elements hợp lý

## 🎯 Nếu styling không hiện:

1. **Hard reload trang site**: Ctrl+Shift+R hoặc Cmd+Shift+R
2. **Kiểm tra console**: F12 → Console → xem có lỗi CSS không
3. **Kiểm tra HTML**: F12 → Elements → xem HTML có đúng không
4. **Clear cache**: Xóa cache browser

## 📝 CSS Classes được sử dụng:

- `.prose` - Container chính
- `.prose-lg` - Kích thước lớn hơn
- `.max-w-none` - Không giới hạn width
- `.ProseMirror` - Editor styles

Tất cả đã được định nghĩa trong `src/app/globals.css` từ dòng 223-521.

## ✨ Kết quả mong đợi:

Khi xem trên site, nội dung sẽ hiển thị:
- Typography đẹp, dễ đọc
- Spacing hợp lý giữa các elements
- Colors phù hợp (headings đậm hơn, links xanh)
- Responsive trên mọi thiết bị

Chúc bạn test thành công! 🚀
