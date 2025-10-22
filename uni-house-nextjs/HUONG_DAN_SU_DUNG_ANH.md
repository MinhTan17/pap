# Hướng dẫn sử dụng ảnh cho Icon

## Tổng quan
Hệ thống đã được cập nhật để hỗ trợ hiển thị ảnh thay vì icon SVG cho:
- **Banner/Slideshow** (trang chủ)
- **Dịch vụ** (Services)
- **Sản phẩm** (Products)

## Cấu trúc thư mục

Tất cả ảnh sẽ được lưu trong thư mục `public/` của dự án:

```
public/
├── icons/
│   ├── services/     # Ảnh icon cho dịch vụ
│   ├── products/     # Ảnh icon cho sản phẩm
│   └── banners/      # Ảnh icon cho banner
```

## Cách sử dụng

### 1. Thêm ảnh cho Dịch vụ (Services)

**Bước 1:** Đặt ảnh vào thư mục `public/icons/services/`

Ví dụ:
- `public/icons/services/laser.png`
- `public/icons/services/milling.jpg`
- `public/icons/services/precision.png`

**Bước 2:** Cập nhật file `src/data/services.ts`

```typescript
export const services: ServiceItem[] = [
  {
    id: 1,
    title: 'GIA CÔNG CẮT LASER CNC',
    icon: 'laser',
    iconImage: '/icons/services/laser.png',  // Thêm dòng này
    description: 'Việc nhập về máy gia công cắt laser...',
    color: 'from-red-600 to-orange-500',
    features: ['Độ chính xác cao', 'Tốc độ nhanh', 'Biên dạng phức tạp']
  },
  // ... các dịch vụ khác
]
```

**Tên icon có sẵn:**
- `laser` - Cắt laser CNC
- `milling` - Phay và mài 6 mặt
- `precision` - Gia công chính xác
- `heat` - Xử lý nhiệt
- `plasma` - Cắt plasma
- `steel` - Xuất nhập khẩu sắt thép

---

### 2. Thêm ảnh cho Sản phẩm (Products)

**Bước 1:** Đặt ảnh vào thư mục `public/icons/products/`

Ví dụ:
- `public/icons/products/copper.png`
- `public/icons/products/aluminum.png`
- `public/icons/products/stainless.png`

**Bước 2:** Cập nhật file `src/data/products.ts`

```typescript
export const products: ProductItem[] = [
  { 
    id: 1, 
    name: 'Hợp kim đồng: C3604, C1020, C1100', 
    category: 'alloy', 
    price: 'Liên hệ', 
    description: 'Hợp kim đồng chất lượng cao', 
    icon: 'copper',
    iconImage: '/icons/products/copper.png',  // Thêm dòng này
    color: 'from-orange-500 to-red-600' 
  },
  // ... các sản phẩm khác
]
```

**Tên icon có sẵn:**
- `copper` - Hợp kim đồng
- `aluminum` - Hợp kim nhôm
- `hot-die` - Thép khuôn dập nóng
- `stainless` - Thép không gỉ
- `cold-die` - Thép khuôn dập nguội
- `plastic-mold` - Thép khuôn nhựa
- `machine` - Thép chế tạo máy
- `carbon` - Thép Carbon

---

### 3. Thêm ảnh cho Banner/Slideshow

**Bước 1:** Đặt ảnh vào thư mục `public/icons/banners/`

Ví dụ:
- `public/icons/banners/laser-banner.png`
- `public/icons/banners/steel-banner.png`

**Bước 2:** Cập nhật file `src/data/banners.ts`

```typescript
export const initialBanners: BannerSlide[] = [
  {
    id: 1,
    title: "GIA CÔNG CẮT LASER CNC",
    subtitle: "CÔNG NGHỆ HIỆN ĐẠI",
    description: "Cung cấp dịch vụ gia công cắt laser CNC chính xác cao...",
    gradient: "from-red-600 via-orange-500 to-yellow-500",
    icon: "laser",
    iconImage: "/icons/banners/laser-banner.png",  // Thêm dòng này
    useImage: false,
    imageAlt: "Banner gia công laser CNC"
  },
  // ... các banner khác
]
```

**Tên icon có sẵn:**
- `laser` - Laser CNC
- `steel` - Sắt thép
- `precision` - Cơ khí chính xác
- `heat` - Xử lý nhiệt
- `plasma` - Cắt plasma
- `milling` - Phay và mài

---

## Lưu ý quan trọng

### 1. Định dạng ảnh
- **Định dạng được khuyến nghị:** PNG (có nền trong suốt) hoặc JPG
- **Kích thước đề xuất:**
  - Icon dịch vụ: 128x128px đến 256x256px
  - Icon sản phẩm: 96x96px đến 192x192px
  - Icon banner: 192x192px đến 384x384px

### 2. Đường dẫn ảnh
- Đường dẫn luôn bắt đầu bằng `/` (ví dụ: `/icons/services/laser.png`)
- Không cần thêm `public` vào đường dẫn

### 3. Fallback
- Nếu không có `iconImage`, hệ thống sẽ tự động hiển thị icon SVG mặc định
- Điều này giúp trang web vẫn hoạt động ngay cả khi chưa có ảnh

### 4. Tối ưu hóa ảnh
- Nén ảnh trước khi upload để tăng tốc độ tải trang
- Sử dụng công cụ như TinyPNG hoặc ImageOptim

---

## Ví dụ hoàn chỉnh

### Ví dụ 1: Thêm ảnh cho dịch vụ "Cắt Laser"

1. Đặt file `laser-icon.png` vào `public/icons/services/`
2. Mở file `src/data/services.ts`
3. Tìm dịch vụ có `icon: 'laser'`
4. Thêm dòng: `iconImage: '/icons/services/laser-icon.png',`

### Ví dụ 2: Thêm ảnh cho sản phẩm "Hợp kim đồng"

1. Đặt file `copper-product.png` vào `public/icons/products/`
2. Mở file `src/data/products.ts`
3. Tìm sản phẩm có `icon: 'copper'`
4. Thêm dòng: `iconImage: '/icons/products/copper-product.png',`

### Ví dụ 3: Thêm ảnh cho banner

1. Đặt file `laser-hero.png` vào `public/icons/banners/`
2. Mở file `src/data/banners.ts`
3. Tìm banner có `icon: 'laser'`
4. Thêm dòng: `iconImage: '/icons/banners/laser-hero.png',`

---

## Kiểm tra kết quả

Sau khi thêm ảnh:
1. Lưu tất cả các file
2. Khởi động lại server development (nếu cần): `npm run dev`
3. Mở trình duyệt và kiểm tra:
   - Trang chủ: Banner slideshow
   - Trang chủ: Phần "Dịch vụ cung cấp"
   - Trang chủ: Phần "Sản phẩm nổi bật"
   - Trang `/dich-vu`: Danh sách dịch vụ
   - Trang `/san-pham`: Danh sách sản phẩm

---

## Hỗ trợ

Nếu gặp vấn đề:
1. Kiểm tra đường dẫn ảnh có đúng không
2. Kiểm tra file ảnh có tồn tại trong thư mục `public/` không
3. Xóa cache trình duyệt và tải lại trang
4. Kiểm tra console của trình duyệt để xem lỗi (F12)
