/**
 * Direct Cloudinary Upload Utility
 * 
 * This bypasses Vercel's 4.5MB serverless function limit by uploading
 * directly from the browser to Cloudinary using signed uploads.
 */

import { compressImage as advancedCompress } from './image-compressor'

/**
 * Compress image to fit within size limit
 * Uses aggressive compression with multiple passes
 */
async function compressImage(file: File, maxSize: number): Promise<File> {
    try {
        const result = await advancedCompress(file, {
            maxSizeMB: maxSize / (1024 * 1024),
            maxWidthOrHeight: 1920,
            quality: 0.75,
        })
        return result.file
    } catch (error) {
        console.error('[Compression] Advanced compression failed, falling back to basic:', error)
        // Fallback to basic compression
        return basicCompressImage(file, maxSize)
    }
}

/**
 * Basic compression fallback
 */
async function basicCompressImage(file: File, maxSize: number): Promise<File> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = (e) => {
            const img = new Image()
            img.src = e.target?.result as string
            img.onload = () => {
                const canvas = document.createElement('canvas')
                let width = img.width
                let height = img.height

                // More aggressive size reduction
                // Target 80% of max size to have safety margin
                const targetSize = maxSize * 0.8
                const sizeRatio = targetSize / file.size
                
                // If file is much larger, reduce dimensions more aggressively
                let scale = 1
                if (sizeRatio < 0.5) {
                    // File is more than 2x too large, reduce dimensions significantly
                    scale = Math.sqrt(sizeRatio) * 0.7
                } else {
                    scale = Math.sqrt(sizeRatio) * 0.85
                }

                width = Math.floor(width * scale)
                height = Math.floor(height * scale)

                // Ensure minimum dimensions
                if (width < 800) width = Math.min(800, img.width)
                if (height < 600) height = Math.min(600, img.height)

                canvas.width = width
                canvas.height = height

                const ctx = canvas.getContext('2d')
                if (!ctx) {
                    reject(new Error('Failed to get canvas context'))
                    return
                }

                // Use better image smoothing
                ctx.imageSmoothingEnabled = true
                ctx.imageSmoothingQuality = 'high'
                ctx.drawImage(img, 0, 0, width, height)

                // Try different quality levels, starting lower for large files
                let quality = file.size > maxSize * 2 ? 0.6 : 0.75
                let attempts = 0
                const maxAttempts = 10

                const tryCompress = () => {
                    attempts++
                    canvas.toBlob(
                        (blob) => {
                            if (!blob) {
                                reject(new Error('Failed to compress image'))
                                return
                            }

                            console.log(`[Compress] Attempt ${attempts}: ${(blob.size / 1024 / 1024).toFixed(2)}MB at quality ${quality.toFixed(2)}`)

                            if (blob.size <= maxSize) {
                                // Success!
                                const compressedFile = new File([blob], file.name, {
                                    type: 'image/jpeg', // Force JPEG for better compression
                                    lastModified: Date.now(),
                                })
                                resolve(compressedFile)
                            } else if (attempts >= maxAttempts || quality <= 0.1) {
                                // Give up, return best effort
                                const compressedFile = new File([blob], file.name, {
                                    type: 'image/jpeg',
                                    lastModified: Date.now(),
                                })
                                resolve(compressedFile)
                            } else {
                                // Try again with lower quality
                                quality -= 0.1
                                tryCompress()
                            }
                        },
                        'image/jpeg', // Always use JPEG for better compression
                        quality
                    )
                }

                tryCompress()
            }
            img.onerror = () => reject(new Error('Failed to load image'))
        }
        reader.onerror = () => reject(new Error('Failed to read file'))
    })
}

interface UploadSignature {
    signature: string
    timestamp: number
    cloudName: string
    apiKey: string
    folder: string
}

interface UploadResult {
    success: boolean
    url?: string
    publicId?: string
    width?: number
    height?: number
    format?: string
    error?: string
}

/**
 * Upload file directly to Cloudinary from browser
 * @param file - File object from input
 * @param folder - Cloudinary folder (e.g., 'banners', 'products', 'services')
 * @returns Upload result with URL
 */
export async function uploadToCloudinary(
    file: File,
    folder: string = 'general'
): Promise<UploadResult> {
    try {
        // Validate file
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
        if (!validTypes.includes(file.type)) {
            return {
                success: false,
                error: 'Chỉ chấp nhận file ảnh (JPG, PNG, WEBP, GIF)'
            }
        }

        // Warn if file is very large
        const warnSize = 20 * 1024 * 1024 // 20MB
        if (file.size > warnSize) {
            console.warn('[Cloudinary Upload] Very large file detected:', {
                size: `${(file.size / 1024 / 1024).toFixed(2)}MB`,
                recommendation: 'Consider resizing image before upload'
            })
        }

        // Validate file size (10MB - Cloudinary FREE plan limit)
        const maxSize = 10 * 1024 * 1024
        
        // If file is too large, compress it
        let fileToUpload = file
        if (file.size > maxSize) {
            console.log('[Cloudinary Upload] File too large, compressing...', {
                originalSize: `${(file.size / 1024 / 1024).toFixed(2)}MB`,
                maxSize: `${(maxSize / 1024 / 1024).toFixed(2)}MB`,
            })
            
            try {
                fileToUpload = await compressImage(file, maxSize)
                console.log('[Cloudinary Upload] Compression result:', {
                    originalSize: `${(file.size / 1024 / 1024).toFixed(2)}MB`,
                    compressedSize: `${(fileToUpload.size / 1024 / 1024).toFixed(2)}MB`,
                    reduction: `${(((file.size - fileToUpload.size) / file.size) * 100).toFixed(1)}%`,
                })
                
                // Final check
                if (fileToUpload.size > maxSize) {
                    const compressedSizeMB = (fileToUpload.size / 1024 / 1024).toFixed(2)
                    return {
                        success: false,
                        error: `❌ Không thể nén ảnh xuống dưới 10MB (hiện tại: ${compressedSizeMB}MB).\n\n` +
                               `💡 Vui lòng resize ảnh trước khi upload:\n` +
                               `• TinyPNG: https://tinypng.com/\n` +
                               `• Squoosh: https://squoosh.app/\n` +
                               `• iLoveIMG: https://www.iloveimg.com/compress-image\n\n` +
                               `Khuyến nghị: Width 1920px, Quality 75-80%`
                    }
                }
            } catch (error: any) {
                console.error('[Cloudinary Upload] Compression error:', error)
                return {
                    success: false,
                    error: `Lỗi khi nén ảnh: ${error.message}`
                }
            }
        }

        // Get upload signature from server
        const token = localStorage.getItem('auth-token') ||
            document.cookie.split('; ')
                .find(row => row.startsWith('auth-token='))
                ?.split('=')[1]

        const signatureResponse = await fetch('/api/upload/signature', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token ? `Bearer ${token}` : '',
            },
            body: JSON.stringify({ folder }),
        })

        if (!signatureResponse.ok) {
            const error = await signatureResponse.json()
            return {
                success: false,
                error: error.message || 'Failed to get upload signature'
            }
        }

        const signature: UploadSignature = await signatureResponse.json()

        console.log('[Cloudinary Upload] Signature received:', {
            cloudName: signature.cloudName,
            folder: signature.folder,
            timestamp: signature.timestamp,
            hasSignature: !!signature.signature,
            hasApiKey: !!signature.apiKey,
        })

        // Prepare form data for Cloudinary
        // IMPORTANT: Only include parameters that were signed + file
        // Order matters for some Cloudinary implementations
        const formData = new FormData()
        formData.append('file', fileToUpload)
        formData.append('api_key', signature.apiKey)
        formData.append('timestamp', signature.timestamp.toString())
        formData.append('folder', signature.folder)
        formData.append('signature', signature.signature)

        console.log('[Cloudinary Upload] Uploading to:', 
            `https://api.cloudinary.com/v1_1/${signature.cloudName}/image/upload`)

        // Upload directly to Cloudinary
        const uploadResponse = await fetch(
            `https://api.cloudinary.com/v1_1/${signature.cloudName}/image/upload`,
            {
                method: 'POST',
                body: formData,
            }
        )

        console.log('[Cloudinary Upload] Response status:', uploadResponse.status)

        if (!uploadResponse.ok) {
            const errorText = await uploadResponse.text()
            console.error('[Cloudinary Upload] Error response:', errorText)
            
            let errorMessage = 'Upload to Cloudinary failed'
            try {
                const error = JSON.parse(errorText)
                errorMessage = error.error?.message || errorMessage
            } catch (e) {
                errorMessage = errorText || errorMessage
            }
            
            return {
                success: false,
                error: errorMessage
            }
        }

        const result = await uploadResponse.json()

        return {
            success: true,
            url: result.secure_url,
            publicId: result.public_id,
            width: result.width,
            height: result.height,
            format: result.format,
        }

    } catch (error: any) {
        console.error('[Cloudinary Upload] Error:', error)
        return {
            success: false,
            error: error.message || 'Upload failed'
        }
    }
}

/**
 * Upload base64 image to Cloudinary
 * Note: This still goes through the server API and is subject to Vercel's 4.5MB limit
 * Use uploadToCloudinary() for larger files
 */
export async function uploadBase64ToCloudinary(
    base64Data: string,
    folder: string = 'general'
): Promise<UploadResult> {
    try {
        const token = localStorage.getItem('auth-token') ||
            document.cookie.split('; ')
                .find(row => row.startsWith('auth-token='))
                ?.split('=')[1]

        const response = await fetch('/api/upload', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token ? `Bearer ${token}` : '',
            },
            body: JSON.stringify({ base64: base64Data, folder }),
        })

        if (!response.ok) {
            const error = await response.json()
            return {
                success: false,
                error: error.message || 'Upload failed'
            }
        }

        const result = await response.json()
        return {
            success: true,
            url: result.path,
            publicId: result.publicId,
            width: result.width,
            height: result.height,
            format: result.format,
        }

    } catch (error: any) {
        console.error('[Base64 Upload] Error:', error)
        return {
            success: false,
            error: error.message || 'Upload failed'
        }
    }
}
