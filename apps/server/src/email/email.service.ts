import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

interface EmailOptions {
  to: string | string[];
  subject: string;
  templateId?: number;
  params?: Record<string, any>;
  htmlContent?: string;
  textContent?: string;
}

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private readonly brevoApiKey = process.env.BREVO_API_KEY;
  private readonly senderEmail = process.env.BREVO_SENDER_EMAIL || 'noreply@carefornaturezambia.org';
  private readonly senderName = process.env.BREVO_SENDER_NAME || 'Care for Nature Zambia';
  private readonly brevoApiUrl = 'https://api.brevo.com/v3';
  private readonly brevoTemplateEmailVerification = this.parseTemplateId(process.env.BREVO_TEMPLATE_EMAIL_VERIFICATION);
  private readonly brevoTemplatePasswordReset = this.parseTemplateId(process.env.BREVO_TEMPLATE_PASSWORD_RESET);
  private readonly brevoTemplateOtp = this.parseTemplateId(process.env.BREVO_TEMPLATE_OTP);
  private readonly brevoTemplateAuthNotification = this.parseTemplateId(process.env.BREVO_TEMPLATE_AUTH_NOTIFICATION);
  private readonly brevoTemplateNewsletterSubscription = this.parseTemplateId(process.env.BREVO_TEMPLATE_NEWSLETTER_SUBSCRIPTION);
  private readonly brevoTemplateNewsletter = this.parseTemplateId(process.env.BREVO_TEMPLATE_NEWSLETTER);

  private parseTemplateId(value?: string): number | undefined {
    if (!value) return undefined;
    const id = Number(value);
    return Number.isInteger(id) && id > 0 ? id : undefined;
  }

  async sendEmail(options: EmailOptions): Promise<boolean> {
    try {
      if (!this.brevoApiKey) {
        this.logger.warn('BREVO_API_KEY not configured, skipping email send');
        return false;
      }

      const recipients = Array.isArray(options.to)
        ? options.to.map(email => ({ email }))
        : [{ email: options.to }];

      const payload: Record<string, any> = {
        sender: {
          email: this.senderEmail,
          name: this.senderName,
        },
        to: recipients,
      };

      if (options.templateId) {
        payload.templateId = options.templateId;
        payload.params = options.params || {};
      } else {
        payload.subject = options.subject;
        payload.htmlContent = options.htmlContent;
        payload.textContent = options.textContent;
      }

      const response = await axios.post(
        `${this.brevoApiUrl}/smtp/email`,
        payload,
        {
          headers: {
            'api-key': this.brevoApiKey,
            'Content-Type': 'application/json',
          },
        }
      );

      this.logger.log(`Email sent successfully. Message ID: ${response.data.messageId}`);
      return true;
    } catch (error) {
      this.logger.error('Failed to send email:', error);
      return false;
    }
  }

  async sendVerificationEmail(email: string, verificationToken: string): Promise<boolean> {
    try {
      const verificationLink = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/auth/verify-email?token=${verificationToken}&email=${encodeURIComponent(email)}`;
      const subject = 'Verify your email for Care for Nature Zambia';
      const htmlContent = `<p>Hello,</p><p>Please verify your email by clicking the link below:</p><p><a href="${verificationLink}">Verify my email</a></p><p>If you did not request this, ignore this message.</p>`;
      const textContent = `Hello,\n\nPlease verify your email by visiting: ${verificationLink}\n\nIf you did not request this, ignore this message.`;

      return await this.sendEmail({
        to: email,
        subject,
        templateId: this.brevoTemplateEmailVerification,
        params: {
          verification_link: verificationLink,
          user_email: email,
        },
        htmlContent,
        textContent,
      });
    } catch (error) {
      this.logger.error('Failed to send verification email:', error);
      return false;
    }
  }

  async sendPasswordResetEmail(email: string, resetToken: string): Promise<boolean> {
    try {
      const resetLink = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/auth/reset-password?token=${resetToken}&email=${encodeURIComponent(email)}`;
      const subject = 'Reset your password for Care for Nature Zambia';
      const htmlContent = `<p>Hello,</p><p>To reset your password, click the link below:</p><p><a href="${resetLink}">Reset my password</a></p><p>This link will expire in one hour.</p>`;
      const textContent = `Hello,\n\nTo reset your password, visit: ${resetLink}\n\nThis link will expire in one hour.`;

      return await this.sendEmail({
        to: email,
        subject,
        templateId: this.brevoTemplatePasswordReset,
        params: {
          reset_link: resetLink,
          user_email: email,
        },
        htmlContent,
        textContent,
      });
    } catch (error) {
      this.logger.error('Failed to send password reset email:', error);
      return false;
    }
  }

  async sendOtpEmail(email: string, otp: string): Promise<boolean> {
    try {
      const subject = 'Your one-time verification code';
      const htmlContent = `<p>Hello,</p><p>Your one-time verification code is:</p><h2>${otp}</h2><p>This code expires in 10 minutes.</p>`;
      const textContent = `Hello,\n\nYour one-time verification code is: ${otp}\n\nThis code expires in 10 minutes.`;

      return await this.sendEmail({
        to: email,
        subject,
        templateId: this.brevoTemplateOtp,
        params: {
          otp_code: otp,
          user_email: email,
        },
        htmlContent,
        textContent,
      });
    } catch (error) {
      this.logger.error('Failed to send OTP email:', error);
      return false;
    }
  }

  async sendAuthNotificationEmail(email: string, userName: string): Promise<boolean> {
    try {
      const subject = 'New sign-in notification';
      const htmlContent = `<p>Hello ${userName},</p><p>Your account was just used to sign in. If this wasn’t you, please contact support immediately.</p><p>Login time: ${new Date().toLocaleString()}</p>`;
      const textContent = `Hello ${userName},\n\nYour account was just used to sign in. If this wasn’t you, contact support immediately.\n\nLogin time: ${new Date().toLocaleString()}`;

      return await this.sendEmail({
        to: email,
        subject,
        templateId: this.brevoTemplateAuthNotification,
        params: {
          user_name: userName,
          user_email: email,
          login_time: new Date().toLocaleString(),
        },
        htmlContent,
        textContent,
      });
    } catch (error) {
      this.logger.error('Failed to send auth notification email:', error);
      return false;
    }
  }

  async sendSubscriptionConfirmationEmail(email: string, firstName?: string): Promise<boolean> {
    try {
      const subject = 'Thanks for subscribing to Care for Nature Zambia';
      const htmlContent = `<p>Hello ${firstName || ''},</p><p>Thank you for subscribing to our newsletter. You’ll receive updates from us soon.</p>`;
      const textContent = `Hello ${firstName || ''},\n\nThank you for subscribing to our newsletter. You’ll receive updates from us soon.`;

      return await this.sendEmail({
        to: email,
        subject,
        templateId: this.brevoTemplateNewsletterSubscription,
        params: {
          user_name: firstName || email,
          user_email: email,
        },
        htmlContent,
        textContent,
      });
    } catch (error) {
      this.logger.error('Failed to send subscription confirmation email:', error);
      return false;
    }
  }

  async sendNewsletterEmail(emails: string[], content: string, subject: string): Promise<boolean> {
    try {
      const htmlContent = `<div>${content}</div>`;
      const textContent = content.replace(/<[^>]+>/g, '');

      return await this.sendEmail({
        to: emails,
        subject,
        templateId: this.brevoTemplateNewsletter,
        params: {
          newsletter_content: content,
          newsletter_subject: subject,
        },
        htmlContent,
        textContent,
      });
    } catch (error) {
      this.logger.error('Failed to send newsletter:', error);
      return false;
    }
  }
}
