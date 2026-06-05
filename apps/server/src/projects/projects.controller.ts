import { Body, Controller, Delete, Get, Post, Put, Query, Param, HttpException, HttpStatus } from '@nestjs/common';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Get()
  async getProjects(@Query('limit') limit: number = 10) {
    try {
      return await this.projectsService.getProjects(limit);
    } catch (error) {
      throw new HttpException(
        { error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  async createProject(
    @Body()
    body: {
      title: string;
      description: string;
      status?: string;
      image?: string;
      ownerId: string;
    },
  ) {
    try {
      const project = await this.projectsService.createProject(body);
      return { message: 'Project created successfully', project };
    } catch (error) {
      throw new HttpException(
        { error: error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put(':id')
  async updateProject(
    @Param('id') id: string,
    @Body() body: any,
  ) {
    try {
      const project = await this.projectsService.updateProject(id, body);
      return { message: 'Project updated successfully', project };
    } catch (error) {
      throw new HttpException(
        { error: error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id')
  async deleteProject(@Param('id') id: string) {
    try {
      await this.projectsService.deleteProject(id);
      return { message: 'Project deleted successfully' };
    } catch (error) {
      throw new HttpException(
        { error: error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
