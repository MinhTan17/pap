# Implementation Plan

## Task List

- [x] 1. Create core types and interfaces for styling system


  - Create `src/types/styles.ts` with StyleSettings interface
  - Define all typography, color, spacing, border, and shadow properties
  - Add icon configuration interface
  - _Requirements: 1.1, 2.1, 3.1, 4.1, 6.1, 7.1_

- [x] 2. Create style utility functions


  - Create `src/utils/styleUtils.ts` file
  - Implement `styleSettingsToCSS()` function to convert StyleSettings to React.CSSProperties
  - Implement `copyStylesToClipboard()` function using sessionStorage
  - Implement `pasteStylesFromClipboard()` function to retrieve copied styles
  - _Requirements: 5.1, 5.2, 5.3, 5.4_



- [ ] 3. Create style presets data
  - Create `src/data/stylePresets.ts` file
  - Define spacing presets (none, small, medium, large)
  - Define shadow presets (none, small, medium, large, extra-large)
  - Define font family presets with popular Google Fonts

  - _Requirements: 2.1, 4.4, 6.2_





- [x] 4. Extend existing data interfaces with styles property


  - [x] 4.1 Update ServiceItem interface in `src/data/services.ts`

    - Add optional `styles?: StyleSettings` property



    - _Requirements: 1.4, 2.5, 3.5_


  - [ ] 4.2 Update ProductItem interface in `src/data/products.ts`
    - Add optional `styles?: StyleSettings` property
    - _Requirements: 1.4, 2.5, 3.5_
  - [ ] 4.3 Update AboutContent interface in `src/app/admin/pages/about/page.tsx`
    - Add optional `styles?: StyleSettings` property


    - _Requirements: 1.4, 2.5, 3.5_

- [ ] 5. Create StylePanel component
  - [x] 5.1 Create component file `src/components/admin/StylePanel.tsx`


    - Define StylePanelProps interface
    - Create basic component structure with collapsible sections
    - _Requirements: 1.1, 2.1, 3.1, 4.1, 6.1, 7.1_


  - [ ] 5.2 Implement Typography section
    - Add font family dropdown with presets
    - Add font size input with range 12-72px for headings, 12-24px for body
    - Add font weight selector (300-900)


    - Add line height input (1.0-3.0)
    - Add text color picker
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_
  - [ ] 5.3 Implement Text Styling section
    - Add text alignment buttons (left, center, right, justify)


    - Add text decoration options (none, underline, overline, line-through)
    - Add text transform options (none, uppercase, lowercase, capitalize)
    - Add letter spacing input (-2px to 10px)
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

  - [ ] 5.4 Implement Colors section
    - Add text color picker
    - Add background color picker
    - Add gradient background option with 2+ color stops
    - _Requirements: 1.1, 1.2, 1.3, 1.5_



  - [ ] 5.5 Implement Spacing section
    - Add padding controls (top, right, bottom, left) with range 0-100px
    - Add margin controls (top, right, bottom, left) with range 0-100px
    - Add border radius control (0-50px)
    - Add preset buttons (none, small, medium, large)
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_
  - [ ] 5.6 Implement Border & Shadow section
    - Add border width input (0-10px)
    - Add border style selector (solid, dashed, dotted, none)
    - Add border color picker
    - Add box shadow presets dropdown
    - Add custom shadow controls (x, y, blur, spread, color)
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_
  - [ ] 5.7 Implement Icon section (for services/products)
    - Add icon picker with preview
    - Add icon library selector (Font Awesome, Material Icons, Heroicons)
    - Add icon color picker
    - Add icon size input (16-128px)


    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_


  - [ ] 5.8 Implement action buttons
    - Add "Copy Style" button
    - Add "Paste Style" button
    - Add "Reset to Default" button with confirmation dialog

    - _Requirements: 5.1, 5.2, 5.4, 5.5, 8.1, 8.2, 8.3, 8.4, 8.5_

- [x] 6. Integrate StylePanel into About page editor

  - [ ] 6.1 Update `src/app/admin/pages/about/page.tsx`
    - Import StylePanel component
    - Add styles state to formData


    - Render StylePanel in edit mode alongside RichTextEditor
    - Implement onStyleChange handler to update formData.styles
    - Implement copy/paste/reset handlers
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 5.1, 5.2, 5.4, 8.1, 8.2_
  - [ ] 6.2 Apply styles in preview mode
    - Import styleSettingsToCSS utility
    - Apply styles to section containers using style prop
    - Test real-time style updates
    - _Requirements: 1.2, 4.5_
  - [ ] 6.3 Save styles with content
    - Update handleSave to include styles in API request
    - Verify styles persist to about.json or data file
    - _Requirements: 1.4_
  - [ ] 6.4 Load and display styles on public page
    - Update `src/app/gioi-thieu/page.tsx` to read and apply styles
    - Test styles render correctly on public site
    - _Requirements: 1.3_

- [ ] 7. Integrate StylePanel into Service editor
  - [ ] 7.1 Update `src/app/admin/services/[id]/page.tsx`
    - Import StylePanel component
    - Add styles to service state
    - Render StylePanel in edit mode
    - Implement style change handlers
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 3.1, 3.2, 3.3, 3.4, 3.5_
  - [ ] 7.2 Apply styles in preview
    - Apply styles to service detail content container
    - Test icon customization if applicable
    - _Requirements: 1.2, 3.5_
  - [ ] 7.3 Save styles with service data
    - Update save handler to include styles
    - Verify DataContext auto-save includes styles
    - _Requirements: 1.4_
  - [ ] 7.4 Display styles on public service pages
    - Update `src/app/dich-vu/[id]/page.tsx` to apply styles
    - Test rendering on public site
    - _Requirements: 1.3_

- [ ] 8. Create Product editor page with StylePanel integration
  - [ ] 8.1 Create `src/app/admin/products/[id]/page.tsx`
    - Create product detail editor similar to service editor
    - Include RichTextEditor for product detail content
    - Integrate StylePanel component
    - _Requirements: 1.1, 1.2, 1.3, 1.4_
  - [ ] 8.2 Implement product style management
    - Add style change handlers
    - Implement save functionality with styles
    - Test DataContext integration
    - _Requirements: 1.4_
  - [ ] 8.3 Update public product pages
    - Update `src/app/san-pham/[id]/page.tsx` to apply styles
    - Test style rendering
    - _Requirements: 1.3_

- [ ] 9. Add validation and error handling
  - [ ] 9.1 Create validation utilities in `src/utils/styleValidation.ts`
    - Implement color format validation (hex, rgb, rgba)
    - Implement size value validation (px, em, rem, %)
    - Implement font name validation
    - Implement gradient validation (minimum 2 colors)
    - _Requirements: 1.1, 2.1, 2.2, 4.1, 4.2, 6.1_
  - [ ] 9.2 Add validation to StylePanel inputs
    - Show error messages for invalid inputs
    - Prevent saving invalid values
    - Add visual indicators for validation errors
    - _Requirements: 1.1, 2.2, 4.1, 4.2_
  - [ ] 9.3 Add error handling for copy/paste
    - Handle sessionStorage errors gracefully
    - Show toast notifications for success/failure
    - _Requirements: 5.3, 5.4, 5.5_
  - [ ] 9.4 Add fallback for failed style loading
    - Use default styles if styles fail to load
    - Log errors for debugging
    - _Requirements: 1.4_

- [ ] 10. Add confirmation dialogs and user feedback
  - [ ] 10.1 Implement reset confirmation dialog
    - Show dialog before resetting styles
    - Confirm action before proceeding
    - _Requirements: 8.1, 8.2_
  - [ ] 10.2 Add success/error toast notifications
    - Show success message after saving styles
    - Show error message if save fails
    - Show confirmation after copy/paste operations
    - _Requirements: 5.5, 8.5_
  - [ ] 10.3 Add unsaved changes warning
    - Detect unsaved style changes
    - Warn user before navigating away
    - _Requirements: 1.2_

- [ ] 11. Add accessibility features
  - [ ] 11.1 Add ARIA labels to all StylePanel controls
    - Label all inputs, buttons, and selectors
    - Add descriptions for complex controls
    - _Requirements: 1.1, 2.1, 3.1, 4.1, 6.1, 7.1_
  - [ ] 11.2 Implement keyboard navigation
    - Ensure all controls are keyboard accessible
    - Add proper tab order
    - Add keyboard shortcuts for common actions
    - _Requirements: 1.1, 2.1, 3.1, 4.1, 6.1, 7.1_
  - [ ] 11.3 Add color contrast checker
    - Warn if text/background contrast is below 4.5:1
    - Suggest alternative colors for better accessibility
    - _Requirements: 1.1, 1.2_
  - [ ] 11.4 Add focus indicators
    - Ensure clear focus states for all interactive elements
    - Test with keyboard-only navigation
    - _Requirements: 1.1, 2.1, 3.1, 4.1, 6.1, 7.1_

- [ ] 12. Performance optimization
  - [ ] 12.1 Add debouncing to style updates
    - Debounce style changes by 300ms before applying
    - Prevent excessive re-renders
    - _Requirements: 1.2, 2.5, 3.5, 4.5_
  - [ ] 12.2 Implement memoization
    - Memoize styleSettingsToCSS calculations with useMemo
    - Memoize StylePanel sub-components
    - _Requirements: 1.2, 2.5, 3.5, 4.5_
  - [ ] 12.3 Lazy load StylePanel
    - Load StylePanel only when editing mode is active
    - Reduce initial bundle size
    - _Requirements: 1.1_

- [ ] 13. Write documentation
  - [ ] 13.1 Create user guide for StylePanel
    - Document all styling options
    - Add screenshots and examples
    - Explain copy/paste workflow
    - _Requirements: All_
  - [ ] 13.2 Create developer documentation
    - Document StyleSettings interface
    - Explain integration process for new pages
    - Document utility functions
    - _Requirements: All_
  - [ ] 13.3 Add inline code comments
    - Comment complex logic in StylePanel
    - Document utility functions
    - _Requirements: All_
