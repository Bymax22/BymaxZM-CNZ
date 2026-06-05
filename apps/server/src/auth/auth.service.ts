import { Injectable, BadRequestException, UnauthorizedException, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EmailService } from '../email/email.service';
import { OtpService } from '../otp/otp.service';
import { MembershipType } from '@prisma/client';
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
  }) {
    // Check if user exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new Error('User already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 12);

    // Create user
    const user = await this.prisma.user.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        password: hashedPassword,
        profile: {
          create: {
            bio: '',
          },
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

    return user;
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        password: true,
        isActive: true,
        role: true,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    if (!user.isActive) {
      throw new Error('User is not active');
    }

    if (!user.password) {
      throw new Error('User has no password set');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error('Invalid password');
    }

    // Update last login
    await this.prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() },
    });

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
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

      this.logger.log(`OTP verified for ${email}`);
      return { message: 'OTP verified successfully', user: { id: user.id, email: user.email } };
    } catch (error) {
      this.logger.error('Verify OTP error:', error);
      throw error;
    }
  }
}
