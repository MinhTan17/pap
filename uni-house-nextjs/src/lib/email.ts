import nodemailer from 'nodemailer';

export interface ContactData {
    name: string;
    email?: string;
    phone: string;
    message: string;
}

export async function sendContactEmail(data: ContactData): Promise<void> {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #f8b500; padding: 20px; text-align: center; }
        .content { background-color: #f9f9f9; padding: 20px; margin-top: 20px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #555; }
        .value { margin-top: 5px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>Liên hệ mới từ Website</h2>
        </div>
        <div class="content">
          <div class="field">
            <div class="label">Họ tên:</div>
            <div class="value">${data.name}</div>
          </div>
          <div class="field">
            <div class="label">Email:</div>
            <div class="value">${data.email || 'Không cung cấp'}</div>
          </div>
          <div class="field">
            <div class="label">Điện thoại:</div>
            <div class="value">${data.phone}</div>
          </div>
          <div class="field">
            <div class="label">Nội dung:</div>
            <div class="value">${data.message.replace(/\n/g, '<br>')}</div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

    await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: process.env.EMAIL_TO,
        replyTo: data.email || undefined,
        subject: `Liên hệ từ ${data.name}${data.email ? ` (${data.email})` : ''}`,
        html: emailHtml,
    });
}
