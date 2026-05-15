import { Body, Controller, Post } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';

@Controller('cloudinary')
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post('sign')
  signUpload(@Body() body: { folder?: string; public_id?: string }) {
    return this.cloudinaryService.createSignature(body);
  }
}
