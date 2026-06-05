import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as crypto from 'crypto';

@Injectable()
export class OtpService {
  private readonly logger = new Logger(OtpService.name);
  private readonly otpExpiryMinutes = 10;

  constructor(private prisma: PrismaService) {}

  generateOtp(): string {
    return crypto.randomInt(100000, 999999).toString();
  }

  generateToken(length: number = 32): string {
    return crypto.randomBytes(length).toString('hex');
  }

  async createOtp(userId: string, method: 'email' | 'sms' = 'email'): Promise<{ otp: string; expiresAt: Date }> {
    try {
      const otp = this.generateOtp();
      const expiresAt = new Date(Date.now() + this.otpExpiryMinutes * 60 * 1000);

      // Delete any existing OTP for this user and method
      await this.prisma.otp.deleteMany({
        where: {
          userId,
          method,
          expiresAt: { gt: new Date() }
        }
      });

      // Create new OTP
      await this.prisma.otp.create({
        data: {
          userId,
          otp,
          method,
          expiresAt,
          attempts: 0
        }
      });

      this.logger.log(`OTP created for user ${userId}`);
      return { otp, expiresAt };
    } catch (error) {
      this.logger.error('Failed to create OTP:', error);
      throw error;
    }
  }

  async verifyOtp(userId: string, otp: string, method: 'email' | 'sms' = 'email'): Promise<boolean> {
    try {
      const record = await this.prisma.otp.findFirst({
        where: {
          userId,
          method,
          expiresAt: { gt: new Date() }
        },
        orderBy: { createdAt: 'desc' }
      });

      if (!record) {
        this.logger.warn(`No valid OTP found for user ${userId}`);
        return false;
      }

      // Increment attempts
      await this.prisma.otp.update({
        where: { id: record.id },
        data: { attempts: record.attempts + 1 }
      });

      // Check max attempts (typically 3)
      if (record.attempts >= 3) {
        this.logger.warn(`Max OTP attempts exceeded for user ${userId}`);
        return false;
      }

      if (record.otp !== otp) {
        this.logger.warn(`OTP mismatch for user ${userId}`);
        return false;
      }

      // Mark OTP as verified
      await this.prisma.otp.update({
        where: { id: record.id },
        data: { isVerified: true, verifiedAt: new Date() }
      });

      this.logger.log(`OTP verified for user ${userId}`);
      return true;
    } catch (error) {
      this.logger.error('Failed to verify OTP:', error);
      throw error;
    }
  }

  async createEmailVerificationToken(userId: string): Promise<{ token: string; expiresAt: Date }> {
    try {
      const token = this.generateToken();
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

      // Delete existing verification tokens
      await this.prisma.emailVerificationToken.deleteMany({
        where: { userId }
      });

      // Create new token
      await this.prisma.emailVerificationToken.create({
        data: {
          userId,
          token,
          expiresAt
        }
      });

      this.logger.log(`Email verification token created for user ${userId}`);
      return { token, expiresAt };
    } catch (error) {
      this.logger.error('Failed to create email verification token:', error);
      throw error;
    }
  }

  async verifyEmailToken(userId: string, token: string): Promise<boolean> {
    try {
      const record = await this.prisma.emailVerificationToken.findFirst({
        where: {
          userId,
          token,
          expiresAt: { gt: new Date() }
        }
      });

      if (!record) {
        this.logger.warn(`Invalid or expired email verification token for user ${userId}`);
        return false;
      }

      // Mark as verified and delete
      await this.prisma.emailVerificationToken.delete({
        where: { id: record.id }
      });

      // Update user as email verified
      await this.prisma.user.update({
        where: { id: userId },
        data: { emailVerified: new Date() }
      });

      this.logger.log(`Email verified for user ${userId}`);
      return true;
    } catch (error) {
      this.logger.error('Failed to verify email token:', error);
      throw error;
    }
  }
}
