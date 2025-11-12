/**
 * Direct Cloudinary Upload Utility
 * 
 * This bypasses Vercel's 4.5MB serverless function limit by uploading
 * directly from the browser to Cloudinary using signed uploads.
 */

/**
 * Compress image to fit within size limit
 */
async function compressImage(file: File, maxSize: number): Promise<File> {
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

                // Calculate new dimensions (reduce by 50% each time until under limit)
                const ratio = Math.sqrt(maxSize / file.size)
                width = Math.floor(width * ratio * 0.9) // 0.9 for safety margin
                height = Math.floor(height * ratio * 0.9)

                canvas.width = width
                canvas.height = height

                const ctx = canvas.getContext('2d')
                ctx?.drawImage(img, 0, 0, width, height)

                // Try different quality levels
                let quality = 0.8
                const tryCompress = () => {
                    canvas.toBlob(
                        (blob) => {
                            if (!blob) {
                                reject(new Error('Failed to compress image'))
                                return
                            }

                            if (blob.size <= maxSize || quality <= 0.3) {
                                const compressedFile = new File([blob], file.name, {
                                    type: file.type,
                                    lastModified: Date.now(),
                                })
                                resolve(compressedFile)
                            } else {
                                quality -= 0.1
                                tryCompress()
                            }
                        },
                        file.type,
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

        // Validate file size (10MB - Cloudinary FREE plan limit)
        const maxSize = 10 * 1024 * 1024
        
        // If file is too large, compress it
        let fileToUpload = file
        if (file.size > maxSize) {
            console.log('[Cloudinary Upload] File too large, compressing...', {
                originalSize: file.size,
                maxSize,
            })
            
            try {
                fileToUpload = await compressImage(file, maxSize)
                console.log('[Cloudinary Upload] Compressed:', {
                    originalSize: file.size,
                    compressedSize: fileToUpload.size,
                })
            } catch (error) {
                return {
                    success: false,
                    error: 'Không thể nén ảnh. Vui lòng chọn ảnh nhỏ hơn 10MB'
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
