# Design Document

## Overview

Tính năng Admin Site Customization mở rộng các trang admin hiện có để cho phép quản trị viên tùy chỉnh styling của nội dung thông qua một Style Panel. Thiết kế này tích hợp seamlessly với hệ thống admin hiện tại, sử dụng DataContext để lưu trữ style settings cùng với content data.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Admin Pages (Existing)                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ About Editor │  │Service Editor│  │Product Editor│  ...  │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘      │
│         │                  │                  │               │
│         └──────────────────┴──────────────────┘              │
│                            │                                  │
│                    ┌───────▼────────┐                        │
│                    │  Style Panel   │ ◄─── New Component    │
│                    │   Component    │                        │
│                    └───────┬────────┘                        │
│                            │                                  │
│         ┌──────────────────┴──────────────────┐             │
│         │                                       │             │
│  ┌──────▼────────┐                    ┌───────▼────────┐   │
│  │ DataContext   │                    │  Style Storage │   │
│  │  (Extended)   │                    │    Interface   │   │
│  └──────┬────────┘                    └───────┬────────┘   │
│         │                                       │             │
│         └───────────────┬───────────────────────┘            │
│                         │                                     │
│                  ┌──────▼──────┐                            │
│                  │  API Routes │                            │
│                  │  (Extended) │                            │
│                  └──────┬──────┘                            │
│                         │                                     │
│                  ┌──────▼──────┐                            │
│                  │ Data Files  │                            │
│                  │ (.ts files) │                            │
│                  └─────────────┘                            │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow

1. **User Interaction**: Admin chọn element và mở Style Panel
2. **Style Configuration**: Admin điều chỉnh colors, fonts, spacing, v.v.
3. **Real-time Preview**: Changes được apply ngay lập tức qua inline styles
4. **Save to Context**: Style settings được lưu vào DataContext
5. **Persist to File**: DataContext auto-save style data vào .ts files
6. **Frontend Rendering**: Public pages đọc style data và render với custom styles

## Components and Interfaces

### 1. StylePanel Component

Component mới để hiển thị các controls tùy chỉnh styling.

**Location**: `src/components/admin/StylePanel.tsx`

**Props**:
```typescript
interface StylePanelProps {
  targetElement: string // ID hoặc selector của element đang edit
  currentStyles: StyleSettings
  onStyleChange: (styles: StyleSettings) => void
  onReset: () => void
  onCopyStyle: () => void
  onPasteStyle: () => void
}
```

**Features**:
- Collapsible sections cho từng nhóm styling (Typography, Colors, Spacing, v.v.)
- Color pickers với preview
- Font family dropdown với Google Fonts
- Numeric inputs với sliders cho sizes
- Preset buttons cho quick styling
- Copy/Paste style buttons

### 2. StyleSettings Interface

**Location**: `src/types/styles.ts`

```typescript
export interface StyleSettings {
  // Typography
  fontFamily?: string
  fontSize?: string
  fontWeight?: string | number
  lineHeight?: string | number
  textAlign?: 'left' | 'center' | 'right' | 'justify'
  textDecoration?: 'none' | 'underline' | 'overline' | 'line-through'
  textTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize'
  letterSpacing?: string
  color?: string
  
  // Background
  backgroundColor?: string
  backgroundGradient?: {
    type: 'linear' | 'radial'
    colors: string[]
    angle?: number
  }
  
  // Spacing
  padding?: {
    top?: string
    right?: string
    bottom?: string
    left?: string
  }
  margin?: {
    top?: string
    right?: string
    bottom?: string
    left?: string
  }
  
  // Border
  borderWidth?: string
  borderStyle?: 'solid' | 'dashed' | 'dotted' | 'none'
  borderColor?: string
  borderRadius?: string
  
  // Shadow
  boxShadow?: string
  
  // Icon (for services/products)
  icon?: {
    name: string
    library: 'fontawesome' | 'material' | 'heroicons'
    size?: string
    color?: string
  }
}
```

### 3. Extended Data Interfaces

Mở rộng các interface hiện có để bao gồm style settings.

**ServiceItem** (Extended):
```typescript
export interface ServiceItem {
  id: number
  title: string
  description: string
  icon?: string
  image?: string
  features?: string[]
  color?: string
  detailContent?: string
  styles?: StyleSettings // NEW
}
```

**ProductItem** (Extended):
```typescript
export interface ProductItem {
  id: number
  title: string
  description: string
  image: string
  category: string
  features?: string[]
  detailContent?: string
  styles?: StyleSettings // NEW
}
```

**AboutContent** (Extended):
```typescript
interface AboutContent {
  id: string
  title: string
  content: string
  images: ImageItem[]
  gridImages?: ImageItem[]
  section: 'company' | 'staff' | 'equipment'
  styles?: StyleSettings // NEW
}
```

### 4. StylePresets

Predefined style presets cho quick application.

**Location**: `src/data/stylePresets.ts`

```typescript
export const spacingPresets = {
  none: { padding: '0', margin: '0' },
  small: { padding: '8px', margin: '8px' },
  medium: { padding: '16px', margin: '16px' },
  large: { padding: '24px', margin: '24px' }
}

export const shadowPresets = {
  none: 'none',
  small: '0 1px 3px rgba(0,0,0,0.12)',
  medium: '0 4px 6px rgba(0,0,0,0.1)',
  large: '0 10px 25px rgba(0,0,0,0.15)',
  'extra-large': '0 20px 40px rgba(0,0,0,0.2)'
}

export const fontPresets = [
  'Arial',
  'Helvetica',
  'Times New Roman',
  'Georgia',
  'Verdana',
  'Roboto',
  'Open Sans',
  'Lato',
  'Montserrat',
  'Poppins',
  'Inter',
  'Playfair Display'
]
```

### 5. StyleUtils

Utility functions để convert style objects thành CSS strings.

**Location**: `src/utils/styleUtils.ts`

```typescript
export function styleSettingsToCSS(styles: StyleSettings): React.CSSProperties {
  const cssProps: React.CSSProperties = {}
  
  // Typography
  if (styles.fontFamily) cssProps.fontFamily = styles.fontFamily
  if (styles.fontSize) cssProps.fontSize = styles.fontSize
  if (styles.fontWeight) cssProps.fontWeight = styles.fontWeight
  if (styles.lineHeight) cssProps.lineHeight = styles.lineHeight
  if (styles.textAlign) cssProps.textAlign = styles.textAlign
  if (styles.textDecoration) cssProps.textDecoration = styles.textDecoration
  if (styles.textTransform) cssProps.textTransform = styles.textTransform
  if (styles.letterSpacing) cssProps.letterSpacing = styles.letterSpacing
  if (styles.color) cssProps.color = styles.color
  
  // Background
  if (styles.backgroundColor) cssProps.backgroundColor = styles.backgroundColor
  if (styles.backgroundGradient) {
    const { type, colors, angle } = styles.backgroundGradient
    if (type === 'linear') {
      cssProps.background = `linear-gradient(${angle || 0}deg, ${colors.join(', ')})`
    } else {
      cssProps.background = `radial-gradient(circle, ${colors.join(', ')})`
    }
  }
  
  // Spacing
  if (styles.padding) {
    cssProps.paddingTop = styles.padding.top
    cssProps.paddingRight = styles.padding.right
    cssProps.paddingBottom = styles.padding.bottom
    cssProps.paddingLeft = styles.padding.left
  }
  if (styles.margin) {
    cssProps.marginTop = styles.margin.top
    cssProps.marginRight = styles.margin.right
    cssProps.marginBottom = styles.margin.bottom
    cssProps.marginLeft = styles.margin.left
  }
  
  // Border
  if (styles.borderWidth && styles.borderStyle && styles.borderColor) {
    cssProps.border = `${styles.borderWidth} ${styles.borderStyle} ${styles.borderColor}`
  }
  if (styles.borderRadius) cssProps.borderRadius = styles.borderRadius
  
  // Shadow
  if (styles.boxShadow) cssProps.boxShadow = styles.boxShadow
  
  return cssProps
}

export function copyStylesToClipboard(styles: StyleSettings): void {
  sessionStorage.setItem('copiedStyles', JSON.stringify(styles))
}

export function pasteStylesFromClipboard(): StyleSettings | null {
  const stored = sessionStorage.getItem('copiedStyles')
  return stored ? JSON.parse(stored) : null
}
```

## Integration with Existing Pages

### About Page Integration

**File**: `src/app/admin/pages/about/page.tsx`

**Changes**:
1. Import StylePanel component
2. Add state for selected section and its styles
3. Render StylePanel when editing a section
4. Apply styles using styleSettingsToCSS utility
5. Save styles with content to API

**Example**:
```typescript
const [selectedSection, setSelectedSection] = useState<string | null>(null)
const [sectionStyles, setSectionStyles] = useState<StyleSettings>({})

// In edit mode
{isEditing && (
  <div className="flex gap-4">
    <div className="flex-1">
      {/* Existing content editor */}
      <RichTextEditor ... />
    </div>
    <div className="w-80">
      <StylePanel
        targetElement={`section-${section.key}`}
        currentStyles={formData.styles || {}}
        onStyleChange={(styles) => setFormData(prev => ({ ...prev, styles }))}
        onReset={() => setFormData(prev => ({ ...prev, styles: {} }))}
        onCopyStyle={() => copyStylesToClipboard(formData.styles || {})}
        onPasteStyle={() => {
          const styles = pasteStylesFromClipboard()
          if (styles) setFormData(prev => ({ ...prev, styles }))
        }}
      />
    </div>
  </div>
)}

// In preview/display mode
<div 
  id={`section-${section.key}`}
  style={styleSettingsToCSS(content.styles || {})}
>
  {/* Content */}
</div>
```

### Service Editor Integration

**File**: `src/app/admin/services/[id]/page.tsx`

Similar integration pattern:
1. Add StylePanel to editing interface
2. Store styles in service.styles
3. Apply styles in preview and public pages

### Product Editor Integration

**File**: `src/app/admin/products/page.tsx` (to be created)

Same pattern as services.

## Data Models

### Storage Format

Styles được lưu trữ cùng với content data trong các .ts files:

**Example - services.ts**:
```typescript
export const services: ServiceItem[] = [
  {
    id: 1,
    title: "GIA CÔNG CẮT LASER CNC",
    description: "...",
    styles: {
      fontFamily: 'Roboto',
      fontSize: '18px',
      color: '#333',
      backgroundColor: '#f5f5f5',
      padding: { top: '20px', bottom: '20px' },
      borderRadius: '8px'
    }
  }
]
```

## Error Handling

### Validation

1. **Color Values**: Validate hex colors, rgb, rgba formats
2. **Size Values**: Ensure numeric values with units (px, em, rem, %)
3. **Font Names**: Validate against available fonts list
4. **Gradient Colors**: Minimum 2 colors required

### Error Messages

- "Invalid color format. Please use hex (#000000) or rgb(0,0,0)"
- "Font size must be between 12px and 72px"
- "Please select at least 2 colors for gradient"

### Fallbacks

- If styles fail to load, use default styles
- If invalid style value, ignore and use browser default
- If copy/paste fails, show error toast

## Testing Strategy

### Unit Tests

1. **StyleUtils Tests**:
   - Test styleSettingsToCSS conversion
   - Test copy/paste clipboard functions
   - Test validation functions

2. **StylePanel Tests**:
   - Test color picker interactions
   - Test font selection
   - Test spacing controls
   - Test preset applications

### Integration Tests

1. **Admin Page Integration**:
   - Test style changes reflect in preview
   - Test save functionality
   - Test reset functionality
   - Test copy/paste between sections

2. **Data Persistence**:
   - Test styles save to DataContext
   - Test styles persist to files
   - Test styles load on page refresh

### E2E Tests

1. **Complete Workflow**:
   - Admin opens editor
   - Admin applies styles
   - Admin saves changes
   - Verify styles appear on public page
   - Admin resets styles
   - Verify default styles restored

## Performance Considerations

### Optimization Strategies

1. **Debounced Updates**: Style changes debounced 300ms before applying
2. **Lazy Loading**: StylePanel loaded only when editing
3. **Memoization**: Style calculations memoized with useMemo
4. **CSS-in-JS**: Use inline styles for dynamic styling (React.CSSProperties)

### Bundle Size

- StylePanel component: ~15KB
- Style utilities: ~5KB
- Total addition: ~20KB (minimal impact)

## Accessibility

### WCAG Compliance

1. **Color Contrast**: Warn if text/background contrast < 4.5:1
2. **Keyboard Navigation**: All controls keyboard accessible
3. **Screen Readers**: Proper ARIA labels for all inputs
4. **Focus Indicators**: Clear focus states for all interactive elements

### Accessibility Features

- Color picker includes contrast checker
- Font size minimum enforced (12px for readability)
- Semantic HTML in StylePanel
- Skip links for keyboard users

## Browser Compatibility

### Supported Browsers

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Fallbacks

- CSS Grid fallback to Flexbox
- Color picker fallback to text input
- Gradient fallback to solid color

## Security Considerations

### Input Sanitization

1. **CSS Injection Prevention**: Sanitize all style values
2. **XSS Protection**: Escape user-provided style strings
3. **File Write Protection**: Validate data before writing to files

### Validation Rules

- Only allow whitelisted CSS properties
- Validate color formats strictly
- Limit string lengths for text inputs
- Prevent arbitrary code execution

## Future Enhancements

### Phase 2 Features

1. **Theme Templates**: Save complete theme packages
2. **Import/Export**: Export styles as JSON
3. **Responsive Styles**: Different styles for mobile/tablet/desktop
4. **Animation Controls**: Add transition and animation settings
5. **Advanced Gradients**: Multi-stop gradients with position control
6. **Custom Fonts**: Upload custom font files
7. **Style History**: Undo/redo style changes
8. **Bulk Operations**: Apply styles to multiple elements at once

### Integration Opportunities

- Integration with design systems (Tailwind, Material-UI)
- Visual style builder with drag-and-drop
- AI-powered style suggestions
- Real-time collaboration on styles
