/**
 * Advanced Image Compression Utility
 * Provides multiple compression strategies for different use cases
 */

export interface CompressionOptions {
  maxSizeMB?: number
  maxWidthOrHeight?: number
  quality?: number
  useWebWorker?: boolean
}

export interface CompressionResult {
  file: File
  originalSize: number
  compressedSize: number
  reduction: number
}

/**
 * Compress image with multiple strategies
 */
export async function compressImage(
  file: File,
  options: CompressionOptions = {}
): Promise<CompressionResult> {
  const {
    maxSizeMB = 10,
    maxWidthOrHeight = 1920,
    quality = 0.8,
  } = options

  const maxSizeBytes = maxSizeMB * 1024 * 1024

  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    
    reader.onload = (e) => {
      const img = new Image()
      img.src = e.target?.result as string
      
      img.onload = () => {
        // Calculate dimensions
        let width = img.width
        let height = img.height

        // Resize if too large
        if (width > maxWidthOrHeight || height > maxWidthOrHeight) {
          if (width > height) {
            height = (height / width) * maxWidthOrHeight
            width = maxWidthOrHeight
          } else {
            width = (width / height) * maxWidthOrHeight
            height = maxWidthOrHeight
          }
        }

        // Further reduce if file is still too large
        const estimatedSize = (width * height * 3) / 2 // Rough estimate
        if (estimatedSize > maxSizeBytes) {
          const scale = Math.sqrt(maxSizeBytes / estimatedSize) * 0.8
          width *= scale
          height *= scale
        }

        // Create canvas
        const canvas = document.createElement('canvas')
        canvas.width = Math.floor(width)
        canvas.height = Math.floor(height)

        const ctx = canvas.getContext('2d')
        if (!ctx) {
          reject(new Error('Failed to get canvas context'))
          return
        }

        // High quality rendering
        ctx.imageSmoothingEnabled = true
        ctx.imageSmoothingQuality = 'high'
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

        // Try compression with decreasing quality
        let currentQuality = quality
        let attempts = 0
        const maxAttempts = 10

        const tryCompress = () => {
          attempts++
          
          canvas.toBlob(
            (blob) => {
              if (!blob) {
                reject(new Error('Failed to create blob'))
                return
              }

              const compressedSize = blob.size
              const originalSize = file.size

              console.log(`[Compression] Attempt ${attempts}:`, {
                quality: currentQuality.toFixed(2),
                size: `${(compressedSize / 1024 / 1024).toFixed(2)}MB`,
                target: `${maxSizeMB}MB`,
              })

              if (compressedSize <= maxSizeBytes || attempts >= maxAttempts || currentQuality <= 0.1) {
                // Done!
                const compressedFile = new File([blob], file.name, {
                  type: 'image/jpeg',
                  lastModified: Date.now(),
                })

                resolve({
                  file: compressedFile,
                  originalSize,
                  compressedSize,
                  reduction: ((originalSize - compressedSize) / originalSize) * 100,
                })
              } else {
                // Try again with lower quality
                currentQuality -= 0.1
                tryCompress()
              }
            },
            'image/jpeg',
            currentQuality
          )
        }

        tryCompress()
      }

      img.onerror = () => reject(new Error('Failed to load image'))
    }

    reader.onerror = () => reject(new Error('Failed to read file'))
  })
}

/**
 * Quick resize for very large images
 */
export async function quickResize(
  file: File,
  maxDimension: number = 1920
): Promise<File> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    
    reader.onload = (e) => {
      const img = new Image()
      img.src = e.target?.result as string
      
      img.onload = () => {
        let width = img.width
        let height = img.height

        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = (height / width) * maxDimension
            width = maxDimension
          } else {
            width = (width / height) * maxDimension
            height = maxDimension
          }
        }

        const canvas = document.createElement('canvas')
        canvas.width = Math.floor(width)
        canvas.height = Math.floor(height)

        const ctx = canvas.getContext('2d')
        if (!ctx) {
          reject(new Error('Failed to get canvas context'))
          return
        }

        ctx.imageSmoothingEnabled = true
        ctx.imageSmoothingQuality = 'high'
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Failed to create blob'))
              return
            }

            const resizedFile = new File([blob], file.name, {
              type: 'image/jpeg',
              lastModified: Date.now(),
            })

            resolve(resizedFile)
          },
          'image/jpeg',
          0.9
        )
      }

      img.onerror = () => reject(new Error('Failed to load image'))
    }

    reader.onerror = () => reject(new Error('Failed to read file'))
  })
}
