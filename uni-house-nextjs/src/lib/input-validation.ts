// Input Validation and Sanitization

export interface ValidationResult {
  isValid: boolean;
  error?: string;
  sanitized?: string;
}

// Sanitize HTML input to prevent XSS
export function sanitizeHtml(input: string): string {
  // Simple but effective HTML sanitization
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

// Validate email format
export function validateEmail(email: string): ValidationResult {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const sanitized = email.trim().toLowerCase();
  
  if (!emailRegex.test(sanitized)) {
    return { isValid: false, error: 'Email không hợp lệ' };
  }
  
  if (sanitized.length > 254) {
    return { isValid: false, error: 'Email quá dài' };
  }
  
  return { isValid: true, sanitized };
}

// Validate phone number (Vietnamese format)
export function validatePhone(phone: string): ValidationResult {
  const phoneRegex = /^(0|\+84)[0-9]{9,10}$/;
  const sanitized = phone.trim().replace(/\s+/g, '');
  
  if (!phoneRegex.test(sanitized)) {
    return { isValid: false, error: 'Số điện thoại không hợp lệ' };
  }
  
  return { isValid: true, sanitized };
}

// Validate text input (name, message, etc.)
export function validateText(
  text: string,
  minLength: number = 1,
  maxLength: number = 1000
): ValidationResult {
  const sanitized = text.trim();
  
  if (sanitized.length < minLength) {
    return { isValid: false, error: `Tối thiểu ${minLength} ký tự` };
  }
  
  if (sanitized.length > maxLength) {
    return { isValid: false, error: `Tối đa ${maxLength} ký tự` };
  }
  
  // Check for suspicious patterns
  const suspiciousPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i, // onclick, onerror, etc.
    /<iframe/i,
  ];
  
  for (const pattern of suspiciousPatterns) {
    if (pattern.test(sanitized)) {
      return { isValid: false, error: 'Nội dung chứa ký tự không hợp lệ' };
    }
  }
  
  return { isValid: true, sanitized };
}

// Validate password strength
export function validatePassword(password: string): ValidationResult {
  if (password.length < 8) {
    return { isValid: false, error: 'Mật khẩu phải có ít nhất 8 ký tự' };
  }
  
  if (password.length > 128) {
    return { isValid: false, error: 'Mật khẩu quá dài' };
  }
  
  // Check for at least one uppercase, one lowercase, one number
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  const strength = [hasUpperCase, hasLowerCase, hasNumber, hasSpecialChar].filter(Boolean).length;
  
  if (strength < 3) {
    return {
      isValid: false,
      error: 'Mật khẩu phải chứa ít nhất 3 trong 4: chữ hoa, chữ thường, số, ký tự đặc biệt',
    };
  }
  
  return { isValid: true };
}

// Sanitize filename to prevent path traversal
export function sanitizeFilename(filename: string): string {
  return filename
    .replace(/[^a-zA-Z0-9._-]/g, '_')
    .replace(/\.{2,}/g, '.')
    .substring(0, 255);
}

// Validate URL
export function validateUrl(url: string): ValidationResult {
  try {
    const parsed = new URL(url);
    
    // Only allow http and https protocols
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return { isValid: false, error: 'URL phải sử dụng http hoặc https' };
    }
    
    return { isValid: true, sanitized: url };
  } catch {
    return { isValid: false, error: 'URL không hợp lệ' };
  }
}
