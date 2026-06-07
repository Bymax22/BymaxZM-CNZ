import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

interface EmailOptions {
  to: string | string[];
  templateId: number;
  params?: Record<string, any>;
  subject?: string;
}

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private readonly brevoApiKey = process.env.BREVO_API_KEY;
  private readonly senderEmail = process.env.BREVO_SENDER_EMAIL;
  private readonly senderName = process.env.BREVO_SENDER_NAME || 'Care for Nature Zambia';
  private readonly brevoApiUrl = 'https://api.brevo.com/v3';

  async sendTemplatedEmail(options: EmailOptions): Promise<boolean> {
    try {
      if (!this.brevoApiKey) {
        this.logger.warn('BREVO_API_KEY not configured, skipping email send');
        return false;
      }

      const recipients = Array.isArray(options.to)
        ? options.to.map(email => ({ email }))
        : [{ email: options.to }];

      const payload = {
        to: recipients,
        templateId: options.templateId,
        params: options.params || {},
        sender: {
          email: this.senderEmail || 'noreply@carefornaturezambia.org',
          name: this.senderName
        }
      };

      const response = await axios.post(
        `${this.brevoApiUrl}/smtp/email`,
        payload,
        {
          headers: {
            'api-key': this.brevoApiKey,
            'Content-Type': 'application/json'
          }
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
      
      const templateId = parseInt(process.env.BREVO_TEMPLATE_EMAIL_VERIFICATION || '0');
      if (templateId === 0) {
        this.logger.warn('BREVO_TEMPLATE_EMAIL_VERIFICATION not configured');
        return false;
      }

      return await this.sendTemplatedEmail({
        to: email,
        templateId,
        params: {
          verification_link: verificationLink,
          user_email: email
        }
      });
    } catch (error) {
      this.logger.error('Failed to send verification email:', error);
      return false;
    }
  }

  async sendPasswordResetEmail(email: string, resetToken: string): Promise<boolean> {
    try {
      const resetLink = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/auth/reset-password?token=${resetToken}&email=${encodeURIComponent(email)}`;
      const templateId = parseInt(process.env.BREVO_TEMPLATE_PASSWORD_RESET || '0');
      if (templateId === 0) {
        this.logger.warn('BREVO_TEMPLATE_PASSWORD_RESET not configured');
        return false;
      }

      return await this.sendTemplatedEmail({
        to: email,
        templateId,
        params: {
          reset_link: resetLink,
          user_email: email,
        }
      });
    } catch (error) {
      this.logger.error('Failed to send password reset email:', error);
      return false;
    }
  }

  async sendOtpEmail(email: string, otp: string): Promise<boolean> {
    try {
      const templateId = parseInt(process.env.BREVO_TEMPLATE_OTP || '0');
      if (templateId === 0) {
        this.logger.warn('BREVO_TEMPLATE_OTP not configured');
        return false;
      }

      return await this.sendTemplatedEmail({
        to: email,
        templateId,
        params: {
          otp_code: otp,
          user_email: email
        }
      });
    } catch (error) {
      this.logger.error('Failed to send OTP email:', error);
      return false;
    }
  }

  async sendAuthNotificationEmail(email: string, userName: string): Promise<boolean> {
    try {
      const templateId = parseInt(process.env.BREVO_TEMPLATE_AUTH_NOTIFICATION || '0');
      if (templateId === 0) {
        this.logger.warn('BREVO_TEMPLATE_AUTH_NOTIFICATION not configured');
        return false;
      }

      return await this.sendTemplatedEmail({
        to: email,
        templateId,
        params: {
          user_name: userName,
          user_email: email,
          login_time: new Date().toLocaleString()
        }
      });
    } catch (error) {
      this.logger.error('Failed to send auth notification email:', error);
      return false;
    }
  }

  async sendSubscriptionConfirmationEmail(email: string, firstName?: string): Promise<boolean> {
    try {
      const templateId = parseInt(process.env.BREVO_TEMPLATE_NEWSLETTER_SUBSCRIPTION || '0');
      if (templateId === 0) {
        this.logger.warn('BREVO_TEMPLATE_NEWSLETTER_SUBSCRIPTION not configured');
        return false;
      }

      return await this.sendTemplatedEmail({
        to: email,
        templateId,
        params: {
          user_name: firstName || email,
          user_email: email,
        }
      });
    } catch (error) {
      this.logger.error('Failed to send subscription confirmation email:', error);
      return false;
    }
  }

  async sendNewsletterEmail(emails: string[], content: string, subject: string): Promise<boolean> {
    try {
      const templateId = parseInt(process.env.BREVO_TEMPLATE_NEWSLETTER || '0');
      if (templateId === 0) {
        this.logger.warn('BREVO_TEMPLATE_NEWSLETTER not configured');
        return false;
      }

      return await this.sendTemplatedEmail({
        to: emails,
        templateId,
        params: {
          newsletter_content: content,
          newsletter_subject: subject
        }
      });
    } catch (error) {
      this.logger.error('Failed to send newsletter:', error);
      return false;
    }
  }
}
