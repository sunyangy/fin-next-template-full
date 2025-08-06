import { Resend } from 'resend';

export async function sendVerificationEmail(email: string, code: string) {
  // 开发模式：使用固定验证码，不发送真实邮件
  if (process.env.NODE_ENV === 'development') {
    // 开发模式：在控制台显示验证码，不发送邮件
    console.log('🔐 [DEV MODE] ==========================================');
    console.log(`📧 Email: ${email}`);
    console.log(`🔢 Verification Code: ${code}`);
    console.log('📝 Use this code to complete registration');
    console.log('🔐 [DEV MODE] ==========================================');
    
    // 模拟成功发送
    return { id: 'dev-mode', message: 'Email sent in development mode' };
  } else {
    // 生产模式：正常发送邮件
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const { data, error } = await resend.emails.send({
        from: 'RemoteHunter <onboarding@resend.dev>',
        to: [email],
        subject: 'Verify your email address',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb;">RemoteHunter Email Verification</h2>
            <p>Thank you for signing up! Please use the following verification code to complete your registration:</p>
            <div style="background-color: #f3f4f6; padding: 20px; text-align: center; margin: 20px; margin: 20px 0;">
              <h1 style="color: #2563eb; font-size: 32px; letter-spacing: 4px; margin: 0;">${code}</h1>
            </div>
            <p>This code will expire in 10 minutes.</p>
            <p>If you didn't request this verification, please ignore this email.</p>
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px;">
              This is an automated email from RemoteHunter. Please do not reply to this email.
            </p>
          </div>
        `,
      });

      if (error) {
        console.error('Failed to send email:', error);
        throw new Error('Failed to send verification email');
      }

      return data;
    } catch (error) {
      console.error('Email sending error:', error);
      throw new Error('Failed to send verification email');
    }
  }
}

// 生成6位字母数字混合验证码
export function generateVerificationCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}