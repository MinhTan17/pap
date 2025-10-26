# Hướng dẫn xóa base64 images

## Vấn đề
File `products.ts` chứa base64 images (5MB) khiến không thể edit trực tiếp.

## Giải pháp

### Cách 1: Dùng Admin (Khuyến nghị)
1. Vào http://localhost:3000/admin/products
2. Sửa các sản phẩm ID 2, 3, 4
3. Xóa ảnh cũ trong gallery
4. Upload lại ảnh mới
5. Lưu → Hệ thống tự động lưu đường dẫn

### Cách 2: Chạy script Python
```bash
cd uni-house-nextjs
python clean_base64.py
```

Script sẽ:
- Đọc file products.ts
- Xóa tất cả base64 images
- Giữ lại các đường dẫn file
- Lưu lại file

## Sau khi clean
- Reload trang admin
- Upload lại ảnh cho các sản phẩm
- Ảnh sẽ được lưu vào public/icons/products/
