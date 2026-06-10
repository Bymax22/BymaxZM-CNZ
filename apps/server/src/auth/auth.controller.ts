import { Body, Controller, Post, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(
    @Body()
    body: {
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
    },
  ) {
    try {
      const user = await this.authService.register(body);
      return { message: 'User created successfully', user };
    } catch (error) {
      throw new HttpException(
        { error: error instanceof Error ? error.message : 'Unable to register user' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string; otp?: string }) {
    try {
      const result = await this.authService.login(body.email, body.password, body.otp);

      // If the service returned a challenge (OTP or email verification required),
      // surface that to the client as a non-2xx response so the frontend can handle it.
      if (result && (result.otpRequired || result.emailVerificationRequired)) {
        throw new HttpException(result, HttpStatus.UNAUTHORIZED);
      }

      // Successful login - return the authenticated user object
      return { message: 'Login successful', user: result };
    } catch (error) {
      throw new HttpException(
        { error: error.message },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  @Post('send-verification-email')
  async sendVerificationEmail(@Body() body: { email: string }) {
    try {
      const result = await this.authService.sendEmailVerification(body.email);
      return result;
    } catch (error) {
      throw new HttpException(
        { error: error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('verify-email')
  async verifyEmail(@Body() body: { email: string; token: string }) {
    try {
      const result = await this.authService.verifyEmail(body.email, body.token);
      return result;
    } catch (error) {
      throw new HttpException(
        { error: error.message },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  @Post('send-otp')
  async sendOtp(@Body() body: { email: string }) {
    try {
      const result = await this.authService.sendOtp(body.email);
      return result;
    } catch (error) {
      throw new HttpException(
        { error: error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('verify-otp')
  async verifyOtp(@Body() body: { email: string; otp: string }) {
    try {
      const result = await this.authService.verifyOtp(body.email, body.otp);
      return result;
    } catch (error) {
      throw new HttpException(
        { error: error.message },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  @Post('forgot-password')
  async forgotPassword(@Body() body: { email: string }) {
    try {
      const result = await this.authService.forgotPassword(body.email);
      return result;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        { error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('reset-password')
  async resetPassword(@Body() body: { email: string; token: string; password: string }) {
    try {
      const result = await this.authService.resetPassword(body.email, body.token, body.password);
      return result;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        { error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
