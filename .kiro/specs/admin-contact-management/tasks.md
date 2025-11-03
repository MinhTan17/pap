# Implementation Plan

- [x] 1. Create data models and default contact data


  - Create TypeScript interfaces for ContactInfo and Branch
  - Define default contact data constant with current hardcoded values
  - Create utility functions for localStorage operations (save, load, reset)
  - _Requirements: 1.3, 6.3_



- [ ] 2. Update public contact page to use dynamic data
  - Add useEffect hook to load contact data from localStorage on mount
  - Implement fallback logic to use default data when localStorage is empty
  - Replace hardcoded company info with dynamic data from state
  - Render north branches dynamically from loaded data array
  - Render south branches dynamically from loaded data array


  - Use dynamic map URL from loaded data with fallback to default
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

- [ ] 3. Create admin contact management page structure
  - Create new page at `/admin/contact/page.tsx`
  - Set up component state for contact info and editing modes


  - Implement data loading from localStorage on component mount
  - Create main layout with sections for company info, branches, and map
  - Add success/error notification toast component
  - _Requirements: 1.1, 2.1, 3.1, 4.1_


- [-] 4. Implement company information management

  - Create form section for company name, address, and hotline
  - Add input validation for required fields
  - Implement save functionality to update localStorage
  - Show success notification after saving
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

- [x] 5. Implement north branches management

  - Create branch list display with name, address, and hotline

  - Add "Add Branch" button to show add form
  - Create branch edit modal with form fields
  - Implement add branch functionality with validation
  - Implement edit branch functionality
  - Implement delete branch with confirmation dialog
  - Save changes to localStorage after each operation
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6_



- [ ] 6. Implement south branches management
  - Create branch list display with name, address, and hotline
  - Add "Add Branch" button to show add form
  - Reuse branch edit modal component from north branches

  - Implement add branch functionality with validation

  - Implement edit branch functionality
  - Implement delete branch with confirmation dialog
  - Save changes to localStorage after each operation
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6_


- [-] 7. Implement Google Maps URL management

  - Create form section for map embed URL input
  - Add URL validation to check for valid Google Maps URL
  - Implement save functionality to update localStorage
  - Show success notification after saving
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_




- [ ] 8. Implement preview functionality
  - Create preview modal component that renders contact page layout
  - Add "Preview" button that opens modal with current form data
  - Render company info, branches, and map in preview modal
  - Add "Close" button to dismiss modal without saving
  - Add "Save" button in modal to save changes and close
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

- [ ] 9. Implement reset to default functionality
  - Add "Reset to Default" button in admin page
  - Show confirmation dialog with warning about data loss
  - Clear localStorage and reload default data on confirmation
  - Update form with default data after reset
  - Show success notification after reset
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_

- [ ] 10. Add admin navigation and polish UI
  - Add "Quản lý Liên hệ" link to admin sidebar/menu
  - Add contact management card to admin dashboard
  - Polish form styling and layout for consistency
  - Add helpful tooltips and instructions
  - Ensure responsive design for mobile devices
  - _Requirements: 1.1_
