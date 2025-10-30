import { NextRequest, NextResponse } from 'next/server';
import { sendContactEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    if (!name || !phone || !message) {
      return NextResponse.json(
        { success: false, error: 'Vui lòng điền đầy đủ thông tin bắt buộc' },
        { status: 400 }
      );
    }

    if (name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: 'Họ tên phải có ít nhất 2 ký tự' },
        { status: 400 }
      );
    }

    const phoneRegex = /^[0-9]{10,11}$/;
    if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
      return NextResponse.json(
        { success: false, error: 'Số điện thoại không hợp lệ' },
        { status: 400 }
      );
    }

    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return NextResponse.json(
          { success: false, error: 'Email không hợp lệ' },
          { status: 400 }
        );
      }
    }

    if (message.trim().length < 10) {
      return NextResponse.json(
        { success: false, error: 'Nội dung tin nhắn phải có ít nhất 10 ký tự' },
        { status: 400 }
      );
    }

    await sendContactEmail({
      name: name.trim(),
      email: email?.trim(),
      phone: phone.trim(),
      message: message.trim(),
    });

    return NextResponse.json(
      { success: true, message: 'Gửi tin nhắn thành công! Chúng tôi sẽ liên hệ lại sớm.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, error: 'Có lỗi xảy ra. Vui lòng thử lại sau.' },
      { status: 500 }
    );
  }
}
