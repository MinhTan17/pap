/**
 * Direct Cloudinary Upload Utility
 * 
 * This bypasses Vercel's 4.5MB serverless function limit by uploading
 * directly from the browser to Cloudinary using signed uploads.
 */

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

        // Validate file size (50MB - Cloudinary's limit)
        const maxSize = 50 * 1024 * 1024
        if (file.size > maxSize) {
            return {
                success: false,
                error: 'Kích thước file không được vượt quá 50MB'
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

        // Prepare form data for Cloudinary
        const formData = new FormData()
        formData.append('file', file)
        formData.append('signature', signature.signature)
        formData.append('timestamp', signature.timestamp.toString())
        formData.append('api_key', signature.apiKey)
        formData.append('folder', signature.folder)
        formData.append('transformation', 'q_auto,f_auto')

        // Upload directly to Cloudinary
        const uploadResponse = await fetch(
            `https://api.cloudinary.com/v1_1/${signature.cloudName}/image/upload`,
            {
                method: 'POST',
                body: formData,
            }
        )

        if (!uploadResponse.ok) {
            const error = await uploadResponse.json()
            return {
                success: false,
                error: error.error?.message || 'Upload to Cloudinary failed'
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
