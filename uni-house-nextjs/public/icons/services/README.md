# Hướng dẫn đặt ảnh icon

## Cấu trúc thư mục đã được tạo:

```
public/icons/
├── services/     # Đặt ảnh icon dịch vụ vào đây
├── products/     # Đặt ảnh icon sản phẩm vào đây
└── banners/      # Đặt ảnh icon banner vào đây (tùy chọn)
```

## Danh sách file ảnh cần đặt:

### Dịch vụ (services/)
- `laser.png` - Cắt laser CNC
- `milling.png` - Phay và mài 6 mặt
- `precision.png` - Gia công chính xác
- `heat.png` - Xử lý nhiệt
- `plasma.png` - Cắt plasma
- `steel.png` - Xuất nhập khẩu sắt thép

### Sản phẩm (products/)
- `copper.png` - Hợp kim đồng
- `aluminum.png` - Hợp kim nhôm
- `hot-die.png` - Thép khuôn dập nóng
- `stainless.png` - Thép không gỉ
- `cold-die.png` - Thép khuôn dập nguội
- `plastic-mold.png` - Thép khuôn nhựa
- `machine.png` - Thép chế tạo máy
- `carbon.png` - Thép Carbon

### Banner (banners/) - Tùy chọn
- `laser-banner.png`
- `steel-banner.png`
- `precision-banner.png`

## Kích thước đề xuất:
- Icon dịch vụ: 128x128px - 256x256px
- Icon sản phẩm: 96x96px - 192x192px
- Icon banner: 192x192px - 384x384px

## Lưu ý:
- Định dạng: PNG (nền trong suốt) hoặc JPG
- Nén ảnh trước khi upload để tối ưu tốc độ
- Sau khi đặt ảnh, khởi động lại server: `npm run dev`
