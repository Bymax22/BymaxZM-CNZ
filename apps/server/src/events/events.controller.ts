import { Body, Controller, Delete, Get, Param, Post, Put, Query, HttpException, HttpStatus } from '@nestjs/common';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @Get()
  async getEvents(
    @Query('limit') limit = 10,
    @Query('upcoming') upcoming = 'true',
    @Query('onlineOnly') onlineOnly = 'false',
  ) {
    try {
      return await this.eventsService.getEvents(Number(limit), upcoming === 'true', onlineOnly === 'true');
    } catch (error) {
      throw new HttpException({ error: error.message }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async getEventById(@Param('id') id: string) {
    try {
      const event = await this.eventsService.getEventById(id);
      if (!event) {
        throw new HttpException({ error: 'Event not found' }, HttpStatus.NOT_FOUND);
      }
      return event;
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({ error: error.message }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  async createEvent(@Body() body: any) {
    try {
      return await this.eventsService.createEvent({
        ...body,
        startDate: new Date(body.startDate),
        endDate: new Date(body.endDate),
      });
    } catch (error) {
      throw new HttpException({ error: error.message }, HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':id')
  async updateEvent(@Param('id') id: string, @Body() body: any) {
    try {
      return await this.eventsService.updateEvent(id, body);
    } catch (error) {
      throw new HttpException({ error: error.message }, HttpStatus.BAD_REQUEST);
    }
  }
}
