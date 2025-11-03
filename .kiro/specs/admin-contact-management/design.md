# Design Document

## Overview

Hệ thống quản lý thông tin liên hệ cho phép admin cập nhật thông tin công ty, chi nhánh và bản đồ hiển thị trên trang liên hệ công khai. Thiết kế sử dụng localStorage để lưu trữ dữ liệu và React Context để quản lý state, tương tự như các tính năng quản lý khác trong hệ thống admin hiện tại.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Admin Contact Page                       │
│  (/admin/contact)                                           │
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │ Company Info │  │ North Branch │  │ South Branch │    │
│  │    Form      │  │  Management  │  │  Management  │    │
│  └──────────────┘  └──────────────┘  └──────────────┘    │
│                                                             │
│  ┌──────────────┐  ┌──────────────┐                       │
│  │  Maps URL    │  │   Preview    │                       │
│  │    Form      │  │    Modal     │                       │
│  └──────────────┘  └──────────────┘                       │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
                    ┌───────────────┐
                    │  localStorage │
                    │  contactInfo  │
                    └───────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                  Public Contact Page                         │
│  (/lien-he)                                                 │
│                                                             │
│  - Reads from localStorage                                  │
│  - Falls back to default hardcoded data                     │
│  - Displays company info, branches, and map                 │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow

1. **Admin Updates Data** → localStorage → Public Page Reads
2. **No Data in localStorage** → Public Page Uses Default Hardcoded Data
3. **Preview Mode** → Temporary State → Modal Display (No Save)

## Components and Interfaces

### 1. Admin Contact Management Page

**Location:** `uni-house-nextjs/src/app/admin/contact/page.tsx`

**Responsibilities:**
- Display and edit company information
- Manage north and south branches (CRUD operations)
- Update Google Maps embed URL
- Preview changes before saving
- Reset to default data

**State Management:**
```typescript
interface ContactInfo {
  company: {
    name: string
    address: string
    hotline: string
  }
  northBranches: Branch[]
  southBranches: Branch[]
  mapUrl: string
}

interface Branch {
  id: string
  name: string
  address: string
  hotline: string
}
```

### 2. Public Contact Page Updates

**Location:** `uni-house-nextjs/src/app/lien-he/page.tsx`

**Changes:**
- Add `useEffect` to load data from localStorage on mount
- Use loaded data or fall back to default hardcoded data
- Render branches dynamically from loaded data
- Use dynamic map URL

### 3. Preview Modal Component

**Location:** `uni-house-nextjs/src/components/admin/ContactPreviewModal.tsx`

**Responsibilities:**
- Display contact page preview with temporary data
- Allow saving from preview
- Close without saving

## Data Models

### ContactInfo Interface

```typescript
interface ContactInfo {
  company: {
    name: string
    address: string
    hotline: string
  }
  northBranches: Branch[]
  southBranches: Branch[]
  mapUrl: string
}
```

### Branch Interface

```typescript
interface Branch {
  id: string        // UUID or timestamp-based ID
  name: string      // Branch name (e.g., "HẢO AN PHÁT")
  address: string   // Full address
  hotline: string   // Contact phone number
}
```

### Default Data

```typescript
const DEFAULT_CONTACT_INFO: ContactInfo = {
  company: {
    name: 'CÔNG TY TNHH PHÚ AN PHÁT',
    address: 'KCN Tam Phước, P.Tam Phước, Đồng Nai',
    hotline: '0931 535 007'
  },
  northBranches: [
    {
      id: 'north-1',
      name: 'HẢO AN PHÁT',
      address: 'Thôn Phù Trì, Xã Quang Minh, TP. Hà Nội',
      hotline: '0868 586 927'
    },
    {
      id: 'north-2',
      name: 'HƯNG THỊNH PHÁT',
      address: 'Thôn Chợ Nga, xã Nội Bài, Hà Nội',
      hotline: '0966 265 504'
    }
  ],
  southBranches: [
    {
      id: 'south-1',
      name: 'BẢO AN PHÁT',
      address: 'KCN Tam Phước, Phường Tam Phước, Đồng Nai',
      hotline: '0907 353 348'
    },
    {
      id: 'south-2',
      name: 'TINH NGUYÊN HẢO',
      address: 'KCN Tam Phước, Phường Tam Phước, Đồng Nai',
      hotline: '0966 265 504'
    }
  ],
  mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.4449267878436!2d106.87445731533406!3d10.850445192277934!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d8a415c5b7e3%3A0x5d7a3b3e3e3e3e3e!2zxJDGsOG7nW5nIHPhu5EgOSwgVGFtIFBoxrDhu5tjLCBCacOqbiBIw7JhLCDEkOG7k25nIE5haSwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1234567890123!5m2!1svi!2s'
}
```

## Storage Strategy

### localStorage Key

```typescript
const STORAGE_KEY = 'contactInfo'
```

### Save Operation

```typescript
const saveContactInfo = (data: ContactInfo) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    return { success: true }
  } catch (error) {
    console.error('Error saving contact info:', error)
    return { success: false, error }
  }
}
```

### Load Operation

```typescript
const loadContactInfo = (): ContactInfo | null => {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : null
  } catch (error) {
    console.error('Error loading contact info:', error)
    return null
  }
}
```

### Reset Operation

```typescript
const resetContactInfo = () => {
  try {
    localStorage.removeItem(STORAGE_KEY)
    return { success: true }
  } catch (error) {
    console.error('Error resetting contact info:', error)
    return { success: false, error }
  }
}
```

## UI/UX Design

### Admin Page Layout

```
┌─────────────────────────────────────────────────────────┐
│  Quản lý Trang Liên Hệ                    [Xem trước]   │
│                                           [Khôi phục]    │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  📋 THÔNG TIN CÔNG TY                                   │
│  ┌───────────────────────────────────────────────────┐ │
│  │ Tên công ty: [_____________________________]      │ │
│  │ Địa chỉ:     [_____________________________]      │ │
│  │ Hotline:     [_____________________________]      │ │
│  │                                    [💾 Lưu]       │ │
│  └───────────────────────────────────────────────────┘ │
│                                                         │
│  🏢 CHI NHÁNH MIỀN BẮC                  [➕ Thêm mới]  │
│  ┌───────────────────────────────────────────────────┐ │
│  │ 1. HẢO AN PHÁT                    [✏️] [🗑️]      │ │
│  │    Thôn Phù Trì, Xã Quang Minh...                │ │
│  │    Hotline: 0868 586 927                          │ │
│  ├───────────────────────────────────────────────────┤ │
│  │ 2. HƯNG THỊNH PHÁT                [✏️] [🗑️]      │ │
│  │    Thôn Chợ Nga, xã Nội Bài...                   │ │
│  │    Hotline: 0966 265 504                          │ │
│  └───────────────────────────────────────────────────┘ │
│                                                         │
│  🏢 CHI NHÁNH MIỀN NAM                  [➕ Thêm mới]  │
│  ┌───────────────────────────────────────────────────┐ │
│  │ 1. BẢO AN PHÁT                    [✏️] [🗑️]      │ │
│  │ 2. TINH NGUYÊN HẢO                [✏️] [🗑️]      │ │
│  └───────────────────────────────────────────────────┘ │
│                                                         │
│  🗺️ GOOGLE MAPS                                        │
│  ┌───────────────────────────────────────────────────┐ │
│  │ Embed URL: [_____________________________]        │ │
│  │                                    [💾 Lưu]       │ │
│  └───────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

### Branch Edit Modal

```
┌─────────────────────────────────────────┐
│  ✏️ Chỉnh sửa chi nhánh          [×]   │
├─────────────────────────────────────────┤
│                                         │
│  Tên chi nhánh *                        │
│  [_________________________________]    │
│                                         │
│  Địa chỉ *                              │
│  [_________________________________]    │
│                                         │
│  Hotline *                              │
│  [_________________________________]    │
│                                         │
│              [Hủy]  [💾 Lưu]           │
└─────────────────────────────────────────┘
```

### Preview Modal

```
┌─────────────────────────────────────────────────────────┐
│  👁️ Xem trước trang liên hệ                      [×]   │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  [Renders the public contact page with preview data]   │
│                                                         │
│                                                         │
│                          [Đóng]  [💾 Lưu thay đổi]    │
└─────────────────────────────────────────────────────────┘
```

## Error Handling

### localStorage Errors

```typescript
try {
  // Save/Load operation
} catch (error) {
  if (error instanceof DOMException && error.name === 'QuotaExceededError') {
    // Handle storage quota exceeded
    showNotification('Lỗi: Bộ nhớ đầy. Vui lòng xóa dữ liệu cũ.', 'error')
  } else {
    // Handle other errors
    showNotification('Lỗi khi lưu dữ liệu. Vui lòng thử lại.', 'error')
  }
}
```

### Validation Errors

```typescript
const validateBranch = (branch: Branch): string[] => {
  const errors: string[] = []
  
  if (!branch.name.trim()) {
    errors.push('Tên chi nhánh không được để trống')
  }
  
  if (!branch.address.trim()) {
    errors.push('Địa chỉ không được để trống')
  }
  
  if (!branch.hotline.trim()) {
    errors.push('Hotline không được để trống')
  } else if (!/^[0-9\s\-\+\(\)]+$/.test(branch.hotline)) {
    errors.push('Hotline không hợp lệ')
  }
  
  return errors
}
```

### Map URL Validation

```typescript
const validateMapUrl = (url: string): boolean => {
  if (!url.trim()) return true // Empty is OK, will use default
  
  try {
    const urlObj = new URL(url)
    return urlObj.hostname.includes('google.com')
  } catch {
    return false
  }
}
```

## Testing Strategy

### Unit Tests (Optional)

1. **Data Validation Tests**
   - Test branch validation logic
   - Test map URL validation
   - Test phone number format validation

2. **Storage Tests**
   - Test save operation
   - Test load operation
   - Test reset operation
   - Test error handling

### Integration Tests (Optional)

1. **Admin Page Tests**
   - Test company info update
   - Test branch CRUD operations
   - Test map URL update
   - Test preview functionality
   - Test reset functionality

2. **Public Page Tests**
   - Test data loading from localStorage
   - Test fallback to default data
   - Test dynamic rendering of branches
   - Test map display

### Manual Testing Checklist

1. ✅ Add new branch (North and South)
2. ✅ Edit existing branch
3. ✅ Delete branch with confirmation
4. ✅ Update company information
5. ✅ Update map URL
6. ✅ Preview changes before saving
7. ✅ Save changes and verify on public page
8. ✅ Reset to default data
9. ✅ Test with empty localStorage
10. ✅ Test with invalid data in localStorage

## Performance Considerations

### Optimization Strategies

1. **Debounced Auto-save** (Optional)
   - Debounce save operations to prevent excessive writes
   - Show "Saving..." indicator during save

2. **Lazy Loading**
   - Load contact data only when needed
   - Use React.lazy for preview modal

3. **Memoization**
   - Memoize branch list rendering
   - Use React.memo for branch cards

### Storage Size Management

- Contact info is relatively small (~2-5KB)
- No images stored (only URLs)
- No risk of quota exceeded for this feature alone

## Security Considerations

### Input Sanitization

```typescript
const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .substring(0, 500) // Limit length
}
```

### XSS Prevention

- All user inputs are sanitized before display
- Use React's built-in XSS protection (automatic escaping)
- Validate URLs before using in iframe

### Access Control

- Admin pages are protected by existing authentication
- No additional security layer needed for this feature
- localStorage is client-side only (no server exposure)

## Migration Strategy

### Initial Data Migration

1. Extract current hardcoded data from `/lien-he/page.tsx`
2. Create default data constant
3. No migration needed (localStorage starts empty)
4. Public page falls back to default data automatically

### Backward Compatibility

- Public page works with or without localStorage data
- No breaking changes to existing functionality
- Graceful degradation if localStorage is unavailable

## Future Enhancements

### Potential Improvements

1. **Multi-language Support**
   - Store contact info for multiple languages
   - Switch based on current locale

2. **Image Upload for Branches**
   - Add branch logo/photo support
   - Store in localStorage or upload to server

3. **Contact Form Integration**
   - Link contact form submissions to specific branches
   - Email routing based on branch selection

4. **Analytics Integration**
   - Track which branches get the most views
   - Monitor contact form submissions by branch

5. **Export/Import**
   - Export contact data as JSON
   - Import from JSON file
   - Backup and restore functionality
