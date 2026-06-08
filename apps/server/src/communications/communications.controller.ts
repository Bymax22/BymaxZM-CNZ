import { Body, Controller, Get, Post, Put, Patch, Param, Query, HttpException, HttpStatus } from '@nestjs/common';
import { NotificationType } from '@prisma/client';
import { CommunicationsService } from './communications.service';

@Controller('communications')
export class CommunicationsController {
  constructor(private communicationsService: CommunicationsService) {}

  @Post('newsletter/subscribe')
  async subscribeNewsletter(@Body() body: { email: string; firstName?: string; lastName?: string; source?: string }) {
    try {
      if (!body.email) {
        throw new Error('Email is required');
      }
      const subscriber = await this.communicationsService.subscribeNewsletter(body.email, body.firstName, body.lastName, body.source);
      return { message: 'Subscribed successfully', subscriber };
    } catch (error) {
      throw new HttpException({ error: error.message }, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('newsletter/subscribers')
  async getNewsletterSubscribers(
    @Query('skip') skip = 0,
    @Query('take') take = 50,
  ) {
    try {
      return await this.communicationsService.listNewsletterSubscribers(Number(skip), Number(take));
    } catch (error) {
      throw new HttpException({ error: error.message }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('newsletter/send')
  async sendNewsletter(@Body() body: { subject: string; content: string; emails?: string[] }) {
    try {
      if (!body.subject || !body.content) {
        throw new Error('Subject and content are required');
      }
      return await this.communicationsService.sendNewsletter(body.subject, body.content, body.emails);
    } catch (error) {
      throw new HttpException({ error: error.message }, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('notifications')
  async createNotification(@Body() body: { title: string; content: string; type: NotificationType; userId: string; relatedId?: string; relatedType?: string }) {
    try {
      if (!body.title || !body.content || !body.type || !body.userId) {
        throw new Error('Title, content, type and userId are required');
      }
      return await this.communicationsService.createNotification(body);
    } catch (error) {
      throw new HttpException({ error: error.message }, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('notifications')
  async getNotifications(@Query('userId') userId?: string, @Query('skip') skip = 0, @Query('take') take = 50) {
    try {
      return await this.communicationsService.getNotifications(userId, Number(skip), Number(take));
    } catch (error) {
      throw new HttpException({ error: error.message }, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch('notifications/:id/read')
  async markNotificationRead(@Param('id') id: string) {
    try {
      return await this.communicationsService.markNotificationRead(id);
    } catch (error) {
      throw new HttpException({ error: error.message }, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('notification-groups')
  async createNotificationGroup(@Body() body: { name: string; description?: string; userIds: string[]; createdById: string }) {
    try {
      if (!body.name || !body.userIds?.length || !body.createdById) {
        throw new Error('Name, userIds and createdById are required');
      }
      return await this.communicationsService.createNotificationGroup(body.name, body.description ?? null, body.userIds, body.createdById);
    } catch (error) {
      throw new HttpException({ error: error.message }, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('notification-groups')
  async listNotificationGroups(@Query('skip') skip = 0, @Query('take') take = 50) {
    try {
      return await this.communicationsService.listNotificationGroups(Number(skip), Number(take));
    } catch (error) {
      throw new HttpException({ error: error.message }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('submissions')
  async createSubmission(@Body() body: { title: string; description: string; type: string; submitterId?: string; firstName?: string; lastName?: string; email?: string; phone?: string; assigneeId?: string; priority?: string; attachments?: any; notes?: string }) {
    try {
      if (!body.title || !body.description || !body.type) {
        throw new Error('Title, description and type are required');
      }
      if (!body.submitterId && !body.email) {
        throw new Error('Email is required when submitterId is not provided');
      }
      return await this.communicationsService.createSubmission(body);
    } catch (error) {
      throw new HttpException({ error: error.message }, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('submissions')
  async listSubmissions(@Query('skip') skip = 0, @Query('take') take = 50, @Query('status') status?: string) {
    try {
      return await this.communicationsService.listSubmissions(Number(skip), Number(take), status);
    } catch (error) {
      throw new HttpException({ error: error.message }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put('submissions/:id')
  async updateSubmission(@Param('id') id: string, @Body() body: { status?: string; assigneeId?: string; notes?: string; priority?: string; title?: string; description?: string }) {
    try {
      return await this.communicationsService.updateSubmission(id, body);
    } catch (error) {
      throw new HttpException({ error: error.message }, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('cards')
  async createCard(@Body() body: { title: string; slug: string; subtitle?: string; description?: string; imageUrl?: string; imageAlt?: string; link?: string; cardType: string; category?: string; tags?: string[]; status?: string; featured?: boolean; displayOrder?: number; metadata?: any; relatedId?: string; publishedAt?: string }) {
    try {
      if (!body.title || !body.slug || !body.cardType) {
        throw new Error('Title, slug, and cardType are required');
      }
      return await this.communicationsService.createCard({
        ...body,
        publishedAt: body.publishedAt ? new Date(body.publishedAt) : undefined,
      });
    } catch (error) {
      throw new HttpException({ error: error.message }, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('cards')
  async listCards(
    @Query('skip') skip = 0,
    @Query('take') take = 50,
    @Query('cardType') cardType?: string | string[],
    @Query('featured') featured?: string,
  ) {
    try {
      const featuredFlag = featured === 'true' ? true : featured === 'false' ? false : undefined;
      return await this.communicationsService.listCards(Number(skip), Number(take), cardType, featuredFlag);
    } catch (error) {
      throw new HttpException({ error: error.message }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('cards/:id')
  async getCard(@Param('id') id: string) {
    try {
      const card = await this.communicationsService.getCardByIdOrSlug(id);
      if (!card) {
        throw new Error('Card not found');
      }
      return card;
    } catch (error) {
      throw new HttpException({ error: error.message }, HttpStatus.NOT_FOUND);
    }
  }
}
