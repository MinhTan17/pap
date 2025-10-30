# Hướng dẫn Tối ưu hóa Hiệu suất

## Đã áp dụng

✅ **Next.js Config Optimizations**
- Image optimization (AVIF, WebP)
- SWC minification
- Compression enabled
- Font optimization
- Package imports optimization

✅ **Removed Console Logs**
- Loại bỏ console.log trong production
- Chỉ log trong development mode

## Cách kiểm tra hiệu suất

### 1. Build Production
```bash
npm run build
npm run start
```

Production build sẽ nhanh hơn **rất nhiều** so với dev mode.

### 2. Analyze Bundle Size
```bash
npm run build
```

Xem output để biết bundle size.

## Các tối ưu hóa bổ sung

### 1. Lazy Loading Components

Sử dụng dynamic import cho các component lớn:

\`\`\`typescript
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Loading />,
  ssr: false // Nếu không cần SSR
});
\`\`\`

### 2. Image Optimization

Luôn sử dụng Next.js Image component:

\`\`\`typescript
import Image from 'next/image';

<Image
  src="/path/to/image.jpg"
  alt="Description"
  width={800}
  height={600}
  priority // Cho images quan trọng
  placeholder="blur" // Thêm blur effect
/>
\`\`\`

### 3. Caching

Thêm caching cho API routes:

\`\`\`typescript
export const revalidate = 3600; // Cache 1 hour
\`\`\`

### 4. Database Optimization

Nếu dùng database:
- Add indexes
- Optimize queries
- Use connection pooling

### 5. CDN

Deploy static assets lên CDN:
- Images
- Fonts
- CSS/JS files

## Monitoring

### Chrome DevTools
1. Mở DevTools (F12)
2. Vào tab Performance
3. Click Record
4. Load trang
5. Stop recording
6. Phân tích timeline

### Lighthouse
1. Mở DevTools (F12)
2. Vào tab Lighthouse
3. Click "Generate report"
4. Xem recommendations

## Expected Performance

### Development Mode
- First load: 2-5 seconds
- Subsequent loads: 500ms - 1s

### Production Mode
- First load: 500ms - 1.5s
- Subsequent loads: 100ms - 300ms

## Troubleshooting

### Vẫn chậm sau khi build?

1. **Check network**: Mở DevTools > Network tab
   - Xem file nào lớn nhất
   - Xem request nào chậm nhất

2. **Check bundle size**:
   ```bash
   npm run build
   ```
   Xem output, nếu bundle > 500KB cần optimize

3. **Check images**:
   - Compress images trước khi upload
   - Sử dụng WebP format
   - Resize images về kích thước phù hợp

4. **Check API responses**:
   - API có trả về quá nhiều data không?
   - Có thể paginate không?

5. **Check dependencies**:
   ```bash
   npm ls
   ```
   Có package nào quá lớn không cần thiết?

## Quick Wins

### 1. Compress Images
```bash
# Install imagemin
npm install -g imagemin-cli

# Compress all images
imagemin public/**/*.{jpg,png} --out-dir=public/optimized
```

### 2. Remove Unused Dependencies
```bash
npm prune
```

### 3. Update Dependencies
```bash
npm update
```

### 4. Clear Cache
```bash
rm -rf .next
npm run build
```

## Production Checklist

- [ ] Run `npm run build` successfully
- [ ] No console errors
- [ ] Images optimized
- [ ] Lighthouse score > 90
- [ ] First load < 2s
- [ ] No unused dependencies
- [ ] Environment variables set correctly
