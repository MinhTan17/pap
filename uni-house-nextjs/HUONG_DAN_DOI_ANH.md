📸 **HƯỚNG DẪN ĐỔI ẢNH CHI TIẾT SẢN PHẨM**

## 🎯 **Cách hoạt động:**

### **1. Ảnh được đổi ở file:** `src/data/products.ts`

Mỗi sản phẩm có 2 trường ảnh:
- `image`: Ảnh chính (dùng trong danh sách sản phẩm)
- `images`: Mảng 4 ảnh (dùng trong trang chi tiết)

### **2. Đặt ảnh vào thư mục:** `public/icons/products/`

**Tên ảnh theo format:**
```
📁 public/icons/products/
├── dong.png (chính) + dong-1.png, dong-2.png, dong-3.png (chi tiết)
├── nhom.png (chính) + nhom-1.png, nhom-2.png, nhom-3.png (chi tiết)
├── khuon-nong.png (chính) + khuon-nong-1.png, khuon-nong-2.png, khuon-nong-3.png (chi tiết)
├── khong-gi.png (chính) + khong-gi-1.png, khong-gi-2.png, khong-gi-3.png (chi tiết)
├── khuon-nguoi.png (chính) + khuon-nguoi-1.png, khuon-nguoi-2.png, khuon-nguoi-3.png (chi tiết)
├── khuon-nhua.png (chính) + khuon-nhua-1.png, khuon-nhua-2.png, khuon-nhua-3.png (chi tiết)
├── che-tao.png (chính) + che-tao-1.png, che-tao-2.png, che-tao-3.png (chi tiết)
└── carbon.png (chính) + carbon-1.png, carbon-2.png, carbon-3.png (chi tiết)
```

### **3. Ví dụ thay đổi ảnh cho "Hợp kim đồng":**

**Trước (dùng ảnh mặc định):**
```typescript
{ id: 1, name: 'Hợp kim đồng: C3604, C1020, C1100', 
  image: '/icons/products/C1100.png' }
```

**Sau (dùng ảnh riêng):**
```typescript
{ id: 1, name: 'Hợp kim đồng: C3604, C1020, C1100',
  image: '/icons/products/dong.png',           // Ảnh chính
  images: [                                    // 4 ảnh chi tiết
    '/icons/products/dong.png',                // Ảnh 1 (chính)
    '/icons/products/dong-1.png',              // Ảnh 2 
    '/icons/products/dong-2.png',              // Ảnh 3
    '/icons/products/dong-3.png'               // Ảnh 4
  ]
}
```

### **4. Thay đổi nhanh cho 1 sản phẩm:**

**Chỉ cần đổi trong `products.ts`:**
```typescript
// Ví dụ đổi Hợp kim đồng
{ id: 1, 
  image: '/icons/products/dong-moi.png',      // Ảnh chính mới
  images: [                                   // 4 ảnh chi tiết mới
    '/icons/products/dong-moi.png',
    '/icons/products/dong-chi-tiet-1.png',
    '/icons/products/dong-chi-tiet-2.png',
    '/icons/products/dong-chi-tiet-3.png'
  ]
}
```

### **5. Tính năng ảnh trong chi tiết:**

✅ **Main image:** Ảnh chính (16:9)  
✅ **Thumbnails:** 3 ảnh nhỏ với hover zoom  
✅ **Gallery tab:** Grid 2x3 ảnh với hover scale  
✅ **Related products:** Ảnh từ database  
✅ **Responsive:** Tự động co giãn

### **6. URL xem chi tiết sản phẩm:**

- Hợp kim đồng: `http://localhost:3000/san-pham/1`
- Hợp kim nhôm: `http://localhost:3000/san-pham/2`
- Thép khuôn dập nóng: `http://localhost:3000/san-pham/3`
- ...

**🎉 Refresh trang để thấy ảnh mới!**
