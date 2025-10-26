# Tính năng Upload Ảnh trong RichTextEditor

## ✅ Đã hoàn thành

Hệ thống admin service đã được tích hợp tính năng upload ảnh trực tiếp vào RichTextEditor.

## 🎯 Cách sử dụng:

### 1. **Mở trang admin service**
```
http://localhost:3002/admin/services/[id]
```

### 2. **Click "Chỉnh sửa"**
- Bật chế độ editor
- Thấy toolbar với nút **📷** (upload ảnh)

### 3. **Upload ảnh**
1. Click nút **📷** trên toolbar
2. Chọn ảnh từ máy tính (file picker mở)
3. Đợi upload hoàn tất (thấy log trong console)
4. Ảnh tự động chèn vào vị trí cursor

### 4. **Lưu và xem kết quả**
- Click **"Lưu"** để save
- Click **"👁️ Xem trên site"** để xem
- Reload trang site để thấy ảnh mới

## 🔧 Technical Details:

### **API Upload:**
- **Endpoint:** `/api/upload`
- **Method:** POST
- **Body:** `{ base64, folder: 'icons/services' }`
- **Response:** `{ success: true, path: '/icons/services/filename.jpg' }`

### **Folder Structure:**
```
public/
├── icons/
│   ├── services/     ← Ảnh upload từ editor
│   ├── products/     ← Ảnh sản phẩm
│   └── banners/      ← Ảnh banner
```

### **Component Changes:**

1. **RichTextEditor.tsx:**
   - Thêm prop `onUploadImage?: () => Promise<string>`
   - Cập nhật `addImage` function để async
   - Fallback về URL prompt nếu không có upload function

2. **Service Editor:**
   - Thêm `handleImageUpload()` function
   - Hidden file input với ref
   - Upload qua API với folder `icons/services`
   - Log debug để tracking

### **CSS Styling:**
- Ảnh trong editor: `.ProseMirror img`
- Ảnh trên site: `.prose img`
- Responsive, border-radius, proper spacing

## 🚀 Tính năng hoạt động:

✅ **Upload ảnh từ máy tính**
✅ **Auto-resize và optimize**
✅ **Lưu vào folder đúng**
✅ **Hiển thị trong editor**
✅ **Render trên site với styling đẹp**
✅ **Error handling và logging**
✅ **Fallback URL input**

## 🧪 Test:

1. **Upload ảnh có kích thước lớn** → Tự động resize
2. **Upload nhiều ảnh** → Mỗi ảnh có tên unique
3. **Upload ảnh không hợp lệ** → Error message
4. **Click 📷 khi không có upload function** → Fallback URL prompt

## 📝 Logs để debug:

```
📝 Content changed: <p>Test <img src="/icons/services/image-123.jpg"></p>
🔄 Đang lưu service: 1
📄 HTML Content: <p>Content with <img src="/icons/services/image-123.jpg"></p>
✅ Uploaded image for editor: /icons/services/image-123.jpg
✅ Đã reload data từ API
```

Bây giờ bạn có thể upload ảnh trực tiếp vào nội dung dịch vụ giống như trong Word! 🎉
