# Requirements Document

## Introduction

Chức năng upload ảnh cho phép admin tải lên và quản lý hình ảnh trên website thông qua Cloudinary. Admin có thể upload ảnh cho các trang như Giới thiệu, Dịch vụ, Sản phẩm, và các nội dung khác.

## Glossary

- **Admin Panel**: Giao diện quản trị website dành cho admin
- **Cloudinary**: Dịch vụ lưu trữ và quản lý ảnh trên cloud
- **Image Upload Component**: Component cho phép chọn và upload ảnh
- **Image Preview**: Hiển thị xem trước ảnh đã chọn hoặc đã upload
- **Upload API**: API endpoint xử lý việc upload ảnh lên Cloudinary

## Requirements

### Requirement 1

**User Story:** As an admin, I want to upload images to the website, so that I can add visual content to pages

#### Acceptance Criteria

1. WHEN the admin clicks on an image upload area, THE Admin Panel SHALL display a file selection dialog
2. WHEN the admin selects an image file (jpg, png, webp, gif), THE Admin Panel SHALL display a preview of the selected image
3. WHEN the admin confirms the upload, THE Admin Panel SHALL upload the image to Cloudinary and return the image URL
4. IF the upload fails, THEN THE Admin Panel SHALL display an error message with the reason
5. WHEN the upload succeeds, THE Admin Panel SHALL display the uploaded image URL and allow copying it

### Requirement 2

**User Story:** As an admin, I want to see upload progress, so that I know the upload is working

#### Acceptance Criteria

1. WHEN an image upload starts, THE Admin Panel SHALL display a progress indicator
2. WHILE the image is uploading, THE Admin Panel SHALL show the upload percentage
3. WHEN the upload completes, THE Admin Panel SHALL hide the progress indicator and show success message
4. IF the upload takes longer than 30 seconds, THEN THE Admin Panel SHALL display a timeout warning

### Requirement 3

**User Story:** As an admin, I want to upload images with proper validation, so that only valid images are uploaded

#### Acceptance Criteria

1. WHEN the admin selects a file, THE Admin Panel SHALL validate the file type is an image (jpg, jpeg, png, webp, gif)
2. WHEN the admin selects a file, THE Admin Panel SHALL validate the file size is less than 10MB
3. IF the file type is invalid, THEN THE Admin Panel SHALL display an error message "Chỉ chấp nhận file ảnh (JPG, PNG, WEBP, GIF)"
4. IF the file size exceeds 10MB, THEN THE Admin Panel SHALL display an error message "Kích thước file không được vượt quá 10MB"
5. THE Admin Panel SHALL prevent upload if validation fails

### Requirement 4

**User Story:** As an admin, I want to use uploaded images in content editors, so that I can add images to pages easily

#### Acceptance Criteria

1. WHEN the admin is editing page content, THE Admin Panel SHALL provide an image upload button in the editor
2. WHEN the admin uploads an image successfully, THE Admin Panel SHALL automatically insert the image URL into the content
3. THE Admin Panel SHALL support drag-and-drop image upload in content areas
4. WHEN the admin pastes an image, THE Admin Panel SHALL automatically upload it to Cloudinary

### Requirement 5

**User Story:** As an admin, I want uploaded images to be optimized, so that the website loads faster

#### Acceptance Criteria

1. WHEN an image is uploaded, THE Upload API SHALL configure Cloudinary to auto-optimize the image quality
2. THE Upload API SHALL enable automatic format conversion to WebP when supported
3. THE Upload API SHALL organize images into folders by content type (about, services, products, news)
4. WHEN retrieving image URLs, THE Admin Panel SHALL include Cloudinary transformation parameters for responsive images
