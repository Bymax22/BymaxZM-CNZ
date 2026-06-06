import { Body, Controller, Get, Post, Put, Patch, Param, Query, HttpException, HttpStatus } from '@nestjs/common';
import { CommunicationsService } from './communications.service';

@Controller('communications')
export class CommunicationsControllerUpdate {
  constructor(private communicationsService: CommunicationsService) {}

  @Put('cards/:id')
  async updateCard(@Param('id') id: string, @Body() body: any) {
    try {
      // Accept publishedAt as string or undefined
      const payload = {
        ...body,
        publishedAt: body.publishedAt ? new Date(body.publishedAt) : undefined,
      };
      return await this.communicationsService.updateCard(id, payload);
    } catch (error) {
      throw new HttpException({ error: error.message }, HttpStatus.BAD_REQUEST);
    }
  }
}
