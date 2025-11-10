# 🔍 Debug Upload Nhanh

## Bạn đã làm:
✅ Thêm Environment Variables trên Vercel
✅ API test trả về config đúng

## Vấn đề hiện tại:
❌ Upload vẫn lỗi: "Lỗi upload nl1.png"

## Các bước debug:

### 1. Xem lỗi chi tiết trong Console

1. Mở trang admin: `https://your-domain.vercel.app/admin/pages/about`
2. Nhấn **F12** để mở Developer Tools
3. Vào tab **Console**
4. Thử upload ảnh lại
5. Xem lỗi gì hiển thị (chụp màn hình cho mình)

### 2. Xem lỗi trong Network tab

1. Mở Developer Tools (F12)
2. Vào tab **Network**
3. Thử upload ảnh
4. Click vào request `/api/upload` (màu đỏ)
5. Vào tab **Response** để xem lỗi cụ thể
6. Chụp màn hình cho mình

### 3. Kiểm tra Vercel Logs

1. Vào Vercel Dashboard
2. Click vào project
3. Vào tab **Logs** hoặc **Functions**
4. Thử upload ảnh
5. Xem logs real-time
6. Chụp màn hình lỗi

## Các lỗi có thể gặp:

### Lỗi 1: "Invalid API key"
```
Nguyên nhân: CLOUDINARY_API_KEY sai
Fix: Xóa và thêm lại biến trên Vercel
Giá trị đúng: 518911741122664
```

### Lỗi 2: "Invalid signature"
```
Nguyên nhân: CLOUDINARY_API_SECRET sai
Fix: Xóa và thêm lại biến trên Vercel
Giá trị đúng: XXUoGElrwoBy6vh2X7Nr8XO82BM
```

### Lỗi 3: "Upload preset not found"
```
Nguyên nhân: Cloudinary account chưa cấu hình đúng
Fix: Vào Cloudinary Dashboard → Settings → Upload
```

### Lỗi 4: "Request Entity Too Large"
```
Nguyên nhân: File quá lớn
Fix: Giảm kích thước xuống < 10MB
```

### Lỗi 5: "Network error"
```
Nguyên nhân: Không kết nối được Cloudinary
Fix: Kiểm tra internet, thử lại sau
```

## Cần làm ngay:

1. **Deploy code mới** (đã cải thiện error handling):
   ```bash
   git add .
   git commit -m "Improve upload error handling"
   git push
   ```

2. **Đợi deploy xong** (1-2 phút)

3. **Thử upload lại** và xem lỗi chi tiết

4. **Chụp màn hình** lỗi trong Console hoặc Network tab

5. **Gửi cho mình** để mình giúp fix cụ thể

## Test nhanh:

Thử upload ảnh nhỏ (< 100KB) trước để loại trừ vấn đề kích thước file.

## Liên hệ:

Gửi cho mình:
- Screenshot lỗi trong Console (F12 → Console)
- Screenshot response trong Network tab (F12 → Network → /api/upload → Response)
- Hoặc Vercel logs nếu có

Mình sẽ giúp bạn fix ngay!
