import { ContactInfo } from '@/types/contact'
import { DEFAULT_CONTACT_INFO } from '@/data/contact'

const STORAGE_KEY = 'contactInfo'

export const saveContactInfo = (data: ContactInfo): { success: boolean; error?: string } => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    return { success: true }
  } catch (error) {
    console.error('Error saving contact info:', error)
    if (error instanceof DOMException && error.name === 'QuotaExceededError') {
      return { success: false, error: 'Bộ nhớ đầy. Vui lòng xóa dữ liệu cũ.' }
    }
    return { success: false, error: 'Lỗi khi lưu dữ liệu. Vui lòng thử lại.' }
  }
}

export const loadContactInfo = (): ContactInfo => {
  try {
    if (typeof window === 'undefined') {
      return DEFAULT_CONTACT_INFO
    }
    
    const data = localStorage.getItem(STORAGE_KEY)
    if (!data) {
      return DEFAULT_CONTACT_INFO
    }
    
    return JSON.parse(data) as ContactInfo
  } catch (error) {
    console.error('Error loading contact info:', error)
    return DEFAULT_CONTACT_INFO
  }
}

export const resetContactInfo = (): { success: boolean; error?: string } => {
  try {
    localStorage.removeItem(STORAGE_KEY)
    return { success: true }
  } catch (error) {
    console.error('Error resetting contact info:', error)
    return { success: false, error: 'Lỗi khi reset dữ liệu.' }
  }
}
