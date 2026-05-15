import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  private readonly cloudName: string;
  private readonly apiKey: string;
  private readonly apiSecret: string;
  private readonly uploadPreset?: string;

  constructor(private readonly configService: ConfigService) {
    this.cloudName = this.configService.get<string>('CLOUDINARY_CLOUD_NAME')?.trim() ?? '';
    this.apiKey = this.configService.get<string>('CLOUDINARY_API_KEY')?.trim() ?? '';
    this.apiSecret = this.configService.get<string>('CLOUDINARY_API_SECRET')?.trim() ?? '';
    this.uploadPreset = this.configService.get<string>('CLOUDINARY_UPLOAD_PRESET')?.trim() || undefined;

    if (!this.cloudName || !this.apiKey || !this.apiSecret) {
      throw new InternalServerErrorException(
        'Cloudinary environment variables are not set. Please configure CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in apps/server/.env',
      );
    }

    cloudinary.config({
      cloud_name: this.cloudName,
      api_key: this.apiKey,
      api_secret: this.apiSecret,
      secure: true,
    });
  }

  createSignature(options: { folder?: string; public_id?: string } = {}) {
    const timestamp = Math.floor(Date.now() / 1000);
    const payload: Record<string, string | number> = { timestamp };

    if (options.folder) {
      payload.folder = options.folder;
    }
    if (options.public_id) {
      payload.public_id = options.public_id;
    }
    if (this.uploadPreset) {
      payload.upload_preset = this.uploadPreset;
    }

    const signature = cloudinary.utils.api_sign_request(payload, this.apiSecret);

    return {
      cloudName: this.cloudName,
      apiKey: this.apiKey,
      timestamp,
      signature,
      uploadPreset: this.uploadPreset,
    };
  }
}
