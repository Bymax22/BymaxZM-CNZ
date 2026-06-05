import { Body, Controller, Delete, Get, Post, Put, Query, Param, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getUsers(
    @Query('skip') skip: number = 0,
    @Query('take') take: number = 10,
    @Query('role') role?: string,
    @Query('status') status?: string,
  ) {
    try {
      return await this.usersService.getUsers(skip, take, role, status);
    } catch (error) {
      throw new HttpException(
        { error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  async createUser(
    @Body()
    body: {
      firstName: string;
      lastName: string;
      email: string;
      phone?: string;
      role?: string;
    },
  ) {
    try {
      const user = await this.usersService.createUser(body);
      return { message: 'User created successfully', user };
    } catch (error) {
      throw new HttpException(
        { error: error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() body: any,
  ) {
    try {
      const user = await this.usersService.updateUser(id, body);
      return { message: 'User updated successfully', user };
    } catch (error) {
      throw new HttpException(
        { error: error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    try {
      await this.usersService.deleteUser(id);
      return { message: 'User deleted successfully' };
    } catch (error) {
      throw new HttpException(
        { error: error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
