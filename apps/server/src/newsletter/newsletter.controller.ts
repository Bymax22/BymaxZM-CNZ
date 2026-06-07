import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { NewsletterService } from './newsletter.service';

@Controller('newsletter')
export class NewsletterController {
  constructor(private newsletterService: NewsletterService) {}

  // === SUBSCRIBER ENDPOINTS ===

  @Post('subscribe')
  async subscribeNewsletter(
    @Body() body: { email: string; firstName?: string; lastName?: string; source?: string }
  ) {
    try {
      if (!body.email) {
        throw new Error('Email is required');
      }
      const subscriber = await this.newsletterService.subscribeNewsletter(
        body.email,
        body.firstName,
        body.lastName,
        body.source
      );
      return { message: 'Subscribed successfully', subscriber };
    } catch (error) {
      throw new HttpException({ error: error.message }, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('unsubscribe')
  async unsubscribeNewsletter(@Body() body: { email: string }) {
    try {
      if (!body.email) {
        throw new Error('Email is required');
      }
      await this.newsletterService.unsubscribeNewsletter(body.email);
      return { message: 'Unsubscribed successfully' };
    } catch (error) {
      throw new HttpException({ error: error.message }, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('subscribers')
  async getSubscribers(
    @Query('skip') skip = 0,
    @Query('take') take = 50,
    @Query('isActive') isActive?: string
  ) {
    try {
      const active = isActive === undefined ? undefined : isActive === 'true';
      return await this.newsletterService.listNewsletterSubscribers(Number(skip), Number(take), active);
    } catch (error) {
      throw new HttpException({ error: error.message }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('subscribers/count')
  async getSubscriberCount(@Query('isActive') isActive?: string) {
    try {
      const active = isActive === undefined ? true : isActive === 'true';
      const count = await this.newsletterService.getSubscriberCount(active);
      return { count };
    } catch (error) {
      throw new HttpException({ error: error.message }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('subscribers/stats')
  async getSubscriberStats() {
    try {
      return await this.newsletterService.getSubscriberStats();
    } catch (error) {
      throw new HttpException({ error: error.message }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // === NEWSLETTER CAMPAIGN ENDPOINTS ===

  @Post('campaigns')
  async createNewsletter(
    @Body() body: { subject: string; content: string; htmlContent?: string; templateId?: number; scheduledAt?: Date; createdBy?: string }
  ) {
    try {
      if (!body.subject || !body.content) {
        throw new Error('Subject and content are required');
      }
      const newsletter = await this.newsletterService.createNewsletter(body);
      return { message: 'Newsletter created successfully', newsletter };
    } catch (error) {
      throw new HttpException({ error: error.message }, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('campaigns/:id')
  async getNewsletter(@Param('id') id: string) {
    try {
      const newsletter = await this.newsletterService.getNewsletter(id);
      if (!newsletter) {
        throw new HttpException('Newsletter not found', HttpStatus.NOT_FOUND);
      }
      return newsletter;
    } catch (error) {
      throw new HttpException({ error: error.message }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('campaigns')
  async listNewsletters(
    @Query('skip') skip = 0,
    @Query('take') take = 20,
    @Query('status') status?: string
  ) {
    try {
      return await this.newsletterService.listNewsletters(Number(skip), Number(take), status);
    } catch (error) {
      throw new HttpException({ error: error.message }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put('campaigns/:id')
  async updateNewsletter(
    @Param('id') id: string,
    @Body() body: { subject?: string; content?: string; htmlContent?: string; status?: string; scheduledAt?: Date }
  ) {
    try {
      const newsletter = await this.newsletterService.updateNewsletter(id, body);
      return { message: 'Newsletter updated successfully', newsletter };
    } catch (error) {
      throw new HttpException({ error: error.message }, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('campaigns/:id')
  async deleteNewsletter(@Param('id') id: string) {
    try {
      await this.newsletterService.deleteNewsletter(id);
      return { message: 'Newsletter deleted successfully' };
    } catch (error) {
      throw new HttpException({ error: error.message }, HttpStatus.BAD_REQUEST);
    }
  }

  // === SENDING ENDPOINTS ===

  @Post('campaigns/:id/send')
  async sendNewsletter(
    @Param('id') id: string,
    @Body() body?: { emails?: string[] }
  ) {
    try {
      return await this.newsletterService.sendNewsletter(id, body?.emails);
    } catch (error) {
      throw new HttpException({ error: error.message }, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('campaigns/:id/test')
  async sendTestNewsletter(
    @Param('id') id: string,
    @Body() body: { email: string }
  ) {
    try {
      if (!body.email) {
        throw new Error('Test email is required');
      }
      return await this.newsletterService.sendTestNewsletter(id, body.email);
    } catch (error) {
      throw new HttpException({ error: error.message }, HttpStatus.BAD_REQUEST);
    }
  }

  // === STATISTICS & TRACKING ===

  @Get('campaigns/:id/stats')
  async getNewsletterStats(@Param('id') id: string) {
    try {
      return await this.newsletterService.getNewsletterStats(id);
    } catch (error) {
      throw new HttpException({ error: error.message }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('campaigns/:id/delivery')
  async getDeliveryRecords(
    @Param('id') id: string,
    @Query('skip') skip = 0,
    @Query('take') take = 50,
    @Query('status') status?: string
  ) {
    try {
      return await this.newsletterService.getDeliveryRecords(id, Number(skip), Number(take), status);
    } catch (error) {
      throw new HttpException({ error: error.message }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('track/open')
  async trackOpen(@Body() body: { newsletterId: string; email: string }) {
    try {
      await this.newsletterService.trackNewsletterOpen(body.newsletterId, body.email);
      return { message: 'Open tracked' };
    } catch (error) {
      throw new HttpException({ error: error.message }, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('track/click')
  async trackClick(@Body() body: { newsletterId: string; email: string }) {
    try {
      await this.newsletterService.trackNewsletterClick(body.newsletterId, body.email);
      return { message: 'Click tracked' };
    } catch (error) {
      throw new HttpException({ error: error.message }, HttpStatus.BAD_REQUEST);
    }
  }
}
