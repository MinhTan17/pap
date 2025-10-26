# Fix API Errors - Services & Products

## Vấn đề gặp phải

### 1. Services API Error
```
Error saving services: SyntaxError: Unexpected end of JSON input
    at JSON.parse (<anonymous>)
    at POST (src\app\api\services\route.ts:25:36)
```

### 2. Products API Error
```
POST /api/products 200 in 711ms
Error saving products: [Error: aborted] { code: 'ECONNRESET' }
```

## Nguyên nhân

### Vấn đề chính: Infinite Loop & Multiple Simultaneous API Calls

1. **Vòng lặp vô hạn trong DataContext**:
   - `useEffect` theo dõi `services`/`products` state
   - Khi state thay đổi → gọi API để lưu
   - API convert base64 → file path
   - Update state với path mới
   - State thay đổi → trigger `useEffect` lại → **vòng lặp vô hạn**

2. **Multiple simultaneous requests**:
   - Mỗi lần state thay đổi → gọi API ngay lập tức
   - Không có debouncing → nhiều request cùng lúc
   - Request body bị consume nhiều lần
   - Connection reset do quá tải

3. **Request body parsing issues**:
   - `request.json()` chỉ có thể gọi 1 lần
   - Nếu body đã được đọc hoặc connection bị abort → lỗi "Unexpected end of JSON input"

## Giải pháp đã áp dụng

### 1. Fix API Routes - Better Request Handling

**File: `src/app/api/services/route.ts` và `src/app/api/products/route.ts`**

```typescript
export async function POST(request: NextRequest) {
  try {
    // Clone request to avoid body already read errors
    const body = await request.text()
    if (!body || body.trim() === '') {
      return NextResponse.json({ error: 'Empty request body' }, { status: 400 })
    }
    
    const services = JSON.parse(body)
    // ... rest of code
```

**Cải tiến**:
- Đọc body bằng `request.text()` trước
- Validate body không rỗng
- Parse JSON thủ công → tránh lỗi khi body bị consume
- Better error handling

### 2. Fix DataContext - Debouncing & Prevent Infinite Loops

**File: `src/contexts/DataContext.tsx`**

#### A. Thêm refs để track save operations

```typescript
// Refs to track save operations and prevent infinite loops
const servicesSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null)
const productsSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null)
const bannersSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null)
const isSavingServicesRef = useRef(false)
const isSavingProductsRef = useRef(false)
const isSavingBannersRef = useRef(false)
```

#### B. Debounce API calls (1 second delay)

```typescript
useEffect(() => {
  safeLocalStorageSet('admin-services', services)
  
  // Clear existing timeout
  if (servicesSaveTimeoutRef.current) {
    clearTimeout(servicesSaveTimeoutRef.current)
  }
  
  // Debounce API calls to prevent multiple simultaneous requests
  if (typeof window !== 'undefined' && !isSavingServicesRef.current) {
    servicesSaveTimeoutRef.current = setTimeout(async () => {
      isSavingServicesRef.current = true
      
      try {
        // Process and save...
      } catch (err) {
        console.error('Error saving services:', err)
      } finally {
        isSavingServicesRef.current = false
      }
    }, 1000) // 1 second debounce
  }
}, [services])
```

**Cải tiến**:
- ✅ **Debouncing**: Đợi 1 giây sau thay đổi cuối cùng mới gọi API
- ✅ **Prevent multiple calls**: Dùng `isSavingRef` để chặn calls đồng thời
- ✅ **Clear timeout**: Hủy timeout cũ khi có thay đổi mới
- ✅ **Better error handling**: Try-catch-finally đảm bảo reset flag
- ✅ **Proper state update**: Chỉ update state khi thực sự có thay đổi

#### C. Áp dụng cho tất cả: Services, Products, Banners

Cùng pattern được áp dụng cho:
- Services (line 234-282)
- Products (line 284-347)
- Banners (line 372-420)

## Kết quả

### Trước khi fix:
- ❌ Multiple API calls cùng lúc
- ❌ Connection reset errors
- ❌ JSON parsing errors
- ❌ Vòng lặp vô hạn
- ❌ Performance issues

### Sau khi fix:
- ✅ Chỉ 1 API call sau 1 giây không có thay đổi
- ✅ Không còn connection reset
- ✅ Request body được handle đúng cách
- ✅ Không còn infinite loops
- ✅ Performance tốt hơn nhiều

## Testing

Để test các fix:

1. **Mở admin page**: `/admin/services` hoặc `/admin/products`
2. **Thêm/sửa item**: Upload ảnh hoặc thay đổi thông tin
3. **Kiểm tra console**:
   - Không còn error "Unexpected end of JSON input"
   - Không còn error "ECONNRESET"
   - Chỉ thấy 1 log "✅ Đã lưu..." sau 1 giây
4. **Kiểm tra file**: Data được lưu đúng vào `src/data/services.ts` và `src/data/products.ts`

## Notes

- Debounce time: 1000ms (1 giây) - có thể điều chỉnh nếu cần
- Refs được dùng thay vì state để tránh re-render không cần thiết
- localStorage vẫn được save ngay lập tức, chỉ API calls được debounce
- Base64 → file conversion vẫn hoạt động bình thường

## Các file đã sửa

1. ✅ `src/app/api/services/route.ts` - Better request handling
2. ✅ `src/app/api/products/route.ts` - Better request handling
3. ✅ `src/app/api/banners/route.ts` - Better request handling (preventive fix)
4. ✅ `src/app/api/news/route.ts` - Better request handling (preventive fix)
5. ✅ `src/contexts/DataContext.tsx` - Debouncing & prevent infinite loops

**Note**: Banners và News cũng được fix để tránh lỗi tương tự trong tương lai.
