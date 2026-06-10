import { Injectable, BadRequestException, UnauthorizedException, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EmailService } from '../email/email.service';
import { OtpService } from '../otp/otp.service';
import { MembershipType, UserRole } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
    private otpService: OtpService
  ) {}

  async register(data: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    password: string;
    role?: string;
    profile?: {
      bio?: string;
      occupation?: string;
      organization?: string;
      interests?: string[];
      skills?: string[];
      emergencyContactName?: string;
      emergencyContactPhone?: string;
      address?: string;
      city?: string;
      province?: string;
      country?: string;
    };
  }) {
    // Only allow self-registration for safe user roles.
    const allowedRoles: UserRole[] = ['USER', 'DONOR', 'PARTNER', 'CLUB_LEADER', 'YOUTH'];
    const role = allowedRoles.includes(data.role as UserRole) ? (data.role as UserRole) : 'USER';

    const existingUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new Error('User already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 12);

    const profileData = {
      bio: data.profile?.bio ?? '',
      occupation: data.profile?.occupation,
      organization: data.profile?.organization,
      interests: data.profile?.interests ?? [],
      skills: data.profile?.skills ?? [],
      emergencyContactName: data.profile?.emergencyContactName,
      emergencyContactPhone: data.profile?.emergencyContactPhone,
      address: data.profile?.address,
      city: data.profile?.city,
      province: data.profile?.province,
      country: data.profile?.country ?? 'Zambia',
    };

    // Create user with profile
    const user = await this.prisma.user.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        password: hashedPassword,
        role,
        profile: {
          create: profileData,
        },
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
      },
    });

    // Create membership record
    await this.prisma.membership.create({
      data: {
        userId: user.id,
        membershipId: crypto.randomUUID(),
        type: MembershipType.ORDINARY,
        joinDate: new Date(),
      },
    });

    await this.sendOtp(data.email);

    return { user, otpSent: true };
  }

  async login(email: string, password: string, otp?: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        password: true,
        isActive: true,
        isVerified: true,
        role: true,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    if (!user.isActive) {
      throw new Error('User is not active');
    }

    if (!user.isVerified) {
      const { token } = await this.otpService.createEmailVerificationToken(user.id);
      const emailSent = await this.emailService.sendVerificationEmail(email, token);

      if (!emailSent) {
        throw new BadRequestException('Failed to send email verification');
      }

      this.logger.log(`Email verification required for ${email}`);
      return {
        emailVerificationRequired: true,
        message: 'Email verification is required. Check your inbox for instructions.',
      };
    }

    if (!user.password) {
      throw new Error('User has no password set');
    }

    // If an OTP was provided, verify it and complete login
    if (otp) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        throw new Error('Invalid password');
      }

      const otpValid = await this.otpService.verifyOtp(user.id, otp, 'email');
      if (!otpValid) {
        throw new BadRequestException('Invalid or expired OTP');
      }

      this.logger.log(`OTP verified for ${email}`);
      return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
        isVerified: user.isVerified,
      };
    }

    // No OTP provided: send one to complete login
    const { otp: generatedOtp } = await this.otpService.createOtp(user.id, 'email');
    const emailSent = await this.emailService.sendOtpEmail(email, generatedOtp);

    if (!emailSent) {
      throw new BadRequestException('Failed to send OTP email');
    }

    this.logger.log(`OTP sent for login to ${email}`);
    return {
      otpRequired: true,
      message: 'OTP sent to your email. Enter it to complete login.',
    };
  }

  async sendEmailVerification(email: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        throw new BadRequestException('User not found');
      }

      if (user.isVerified) {
        throw new BadRequestException('Email already verified');
      }

      const { token } = await this.otpService.createEmailVerificationToken(user.id);
      const emailSent = await this.emailService.sendVerificationEmail(email, token);

      if (!emailSent) {
        throw new BadRequestException('Failed to send verification email');
      }

      this.logger.log(`Verification email sent to ${email}`);
      return { message: 'Verification email sent successfully' };
    } catch (error) {
      this.logger.error('Send email verification error:', error);
      throw error;
    }
  }

  async verifyEmail(email: string, token: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      const isValid = await this.otpService.verifyEmailToken(user.id, token);

      if (!isValid) {
        throw new UnauthorizedException('Invalid or expired verification token');
      }

      this.logger.log(`Email verified for ${email}`);
      return { message: 'Email verified successfully', user: { id: user.id, email: user.email } };
    } catch (error) {
      this.logger.error('Verify email error:', error);
      throw error;
    }
  }

  async forgotPassword(email: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        this.logger.warn(`Password reset requested for unknown email: ${email}`);
        return {
          message: 'If that email exists in our system, you will receive password reset instructions shortly.',
        };
      }

      const token = crypto.randomBytes(32).toString('hex');
      const expires = new Date(Date.now() + 1000 * 60 * 60); // 1 hour

      await this.prisma.passwordResetToken.create({
        data: {
          email,
          token,
          expires,
        },
      });

      const emailSent = await this.emailService.sendPasswordResetEmail(email, token);

      if (!emailSent) {
        throw new BadRequestException('Failed to send password reset email');
      }

      this.logger.log(`Password reset email sent to ${email}`);
      return { message: 'Password reset instructions sent to your email' };
    } catch (error) {
      this.logger.error('Forgot password error:', error);
      throw error;
    }
  }

  async resetPassword(email: string, token: string, password: string) {
    try {
      const resetToken = await this.prisma.passwordResetToken.findUnique({
        where: { token },
      });

      if (!resetToken || resetToken.email !== email) {
        throw new UnauthorizedException('Invalid or expired reset token');
      }

      if (resetToken.expires < new Date()) {
        await this.prisma.passwordResetToken.delete({ where: { token } });
        throw new UnauthorizedException('Reset token has expired');
      }

      const user = await this.prisma.user.findUnique({ where: { email } });
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      await this.prisma.user.update({
        where: { email },
        data: { password: hashedPassword },
      });

      await this.prisma.passwordResetToken.deleteMany({ where: { email } });

      this.logger.log(`Password reset completed for ${email}`);
      return { message: 'Password has been reset successfully' };
    } catch (error) {
      this.logger.error('Reset password error:', error);
      throw error;
    }
  }

  async sendOtp(email: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        throw new BadRequestException('User not found');
      }

      const { otp } = await this.otpService.createOtp(user.id, 'email');
      const emailSent = await this.emailService.sendOtpEmail(email, otp);

      if (!emailSent) {
        throw new BadRequestException('Failed to send OTP email');
      }

      this.logger.log(`OTP sent to ${email}`);
      return { message: 'OTP sent successfully' };
    } catch (error) {
      this.logger.error('Send OTP error:', error);
      throw error;
    }
  }

  async verifyOtp(email: string, otp: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      const isValid = await this.otpService.verifyOtp(user.id, otp, 'email');

      if (!isValid) {
        throw new UnauthorizedException('Invalid or expired OTP');
      }

      await this.prisma.user.update({
        where: { id: user.id },
        data: { isVerified: true },
      });

      this.logger.log(`OTP verified for ${email}`);
      return { message: 'OTP verified successfully', user: { id: user.id, email: user.email, role: user.role } };
    } catch (error) {
      this.logger.error('Verify OTP error:', error);
      throw error;
    }
  }
}
