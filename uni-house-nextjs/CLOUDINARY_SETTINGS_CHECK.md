# ⚙️ Kiểm tra Cloudinary Settings

Bạn đang ở Cloudinary Dashboard. Hãy kiểm tra các settings sau:

## 1. Upload Settings (Quan trọng!)

1. Trong Cloudinary Dashboard, click vào **Settings** (⚙️) ở góc trên bên phải
2. Vào tab **Upload**
3. Kiểm tra các setting:

### Upload Presets
- Tìm section **Upload presets**
- Kiểm tra xem có preset nào **unsigned** không
- Nếu không có, tạo một preset mới:
  - Click **Add upload preset**
  - **Preset name**: `unsigned_preset` (hoặc tên khác)
  - **Signing mode**: Chọn **Unsigned** ⚠️ (Quan trọng!)
  - **Folder**: `uni-house` (tùy chọn)
  - Click **Save**

### Unsigned Upload
- Đảm bảo **Unsigned uploading** được bật (enabled)
- Nếu tắt, hãy bật lên

## 2. Security Settings

1. Vẫn trong **Settings**
2. Vào tab **Security**
3. Kiểm tra:

### Allowed fetch domains
- Thêm domain Vercel của bạn nếu cần
- Ví dụ: `pap-xool-1gayd99xz-phu-an-phats-projects.vercel.app`

### Restricted media types
- Đảm bảo **image** không bị restrict

## 3. API Keys

1. Vào tab **API Keys** trong Settings
2. Kiểm tra:
   - **Cloud name**: `dw2ahw6p9` ✅
   - **API Key**: `518911741122664` ✅
   - **API Secret**: `XXUoGElrwoBy6vh2X7Nr8XO82BM` ✅

## 4. Account Limits

1. Vào tab **Account** trong Settings
2. Kiểm tra:
   - **Storage**: Còn dung lượng không?
   - **Bandwidth**: Còn băng thông không?
   - **Transformations**: Còn quota không?

Nếu hết quota, upload sẽ bị lỗi!

## Vấn đề có thể gặp:

### Lỗi: "Upload preset not found"
→ Cần tạo unsigned upload preset (xem bước 1)

### Lỗi: "Invalid signature"
→ Đang dùng signed upload nhưng signature sai
→ Fix: Dùng unsigned upload preset

### Lỗi: "Quota exceeded"
→ Hết dung lượng hoặc băng thông
→ Fix: Upgrade plan hoặc xóa ảnh cũ

## Giải pháp nhanh:

Nếu không muốn config phức tạp, hãy:

1. Vào **Settings** → **Upload**
2. Tạo một **Unsigned upload preset**
3. Copy tên preset
4. Cập nhật code để dùng preset đó

Hoặc đơn giản hơn: Đảm bảo **Unsigned uploading** được bật!

## Test sau khi setting:

1. Lưu tất cả settings
2. Quay lại trang admin
3. Thử upload ảnh lại
4. Nếu vẫn lỗi, chụp màn hình lỗi trong Console (F12)

---

**Bạn đang ở đâu trong Cloudinary Dashboard?**
Chụp màn hình cho mình xem để mình hướng dẫn cụ thể hơn!
