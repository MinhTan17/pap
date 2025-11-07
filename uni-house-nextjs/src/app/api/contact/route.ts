import { NextRequest, NextResponse } from 'next/server';
import { sendContactEmail } from '@/lib/email';
import { checkApiRateLimit } from '@/lib/api-rate-limit';
import { validateEmail, validatePhone, validateText, sanitizeHtml } from '@/lib/input-validation';

export async function POST(request: NextRequest) {
  try {
    // Rate limiting by IP
    const ip = request.headers.get('x-forwarded-for') || 
                request.headers.get('x-real-ip') || 
                'unknown';
    
    const rateLimit = checkApiRateLimit(`contact:${ip}`, {
      maxRequests: 5,
      windowMs: 60 * 60 * 1000, // 1 hour
      blockDurationMs: 60 * 60 * 1000, // 1 hour block
    });

    if (!rateLimit.allowed) {
      return NextResponse.json(
        { 
          success: false, 
          error: `Bạn đã gửi quá nhiều tin nhắn. Vui lòng thử lại sau ${Math.ceil(rateLimit.retryAfter! / 60)} phút.` 
        },
        { 
          status: 429,
          headers: {
            'Retry-After': rateLimit.retryAfter!.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': new Date(rateLimit.resetTime).toISOString(),
          }
        }
      );
    }

    const body = await request.json();
    const { name, email, phone, message } = body;

    // Validate required fields
    if (!name || !phone || !message) {
      return NextResponse.json(
        { success: false, error: 'Vui lòng điền đầy đủ thông tin bắt buộc' },
        { status: 400 }
      );
    }

    // Validate and sanitize name
    const nameValidation = validateText(name, 2, 100);
    if (!nameValidation.isValid) {
      return NextResponse.json(
        { success: false, error: nameValidation.error },
        { status: 400 }
      );
    }

    // Validate phone
    const phoneValidation = validatePhone(phone);
    if (!phoneValidation.isValid) {
      return NextResponse.json(
        { success: false, error: phoneValidation.error },
        { status: 400 }
      );
    }

    // Validate email if provided
    let sanitizedEmail = '';
    if (email) {
      const emailValidation = validateEmail(email);
      if (!emailValidation.isValid) {
        return NextResponse.json(
          { success: false, error: emailValidation.error },
          { status: 400 }
        );
      }
      sanitizedEmail = emailValidation.sanitized!;
    }

    // Validate and sanitize message
    const messageValidation = validateText(message, 10, 2000);
    if (!messageValidation.isValid) {
      return NextResponse.json(
        { success: false, error: messageValidation.error },
        { status: 400 }
      );
    }

    // Send email with sanitized data
    await sendContactEmail({
      name: nameValidation.sanitized!,
      email: sanitizedEmail || undefined,
      phone: phoneValidation.sanitized!,
      message: sanitizeHtml(messageValidation.sanitized!),
    });

    return NextResponse.json(
      { success: true, message: 'Gửi tin nhắn thành công! Chúng tôi sẽ liên hệ lại sớm.' },
      { 
        status: 200,
        headers: {
          'X-RateLimit-Remaining': rateLimit.remaining.toString(),
          'X-RateLimit-Reset': new Date(rateLimit.resetTime).toISOString(),
        }
      }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, error: 'Có lỗi xảy ra. Vui lòng thử lại sau.' },
      { status: 500 }
    );
  }
}
