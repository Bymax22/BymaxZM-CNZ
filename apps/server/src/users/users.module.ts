import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaModule } from '../prisma/prisma.module';
import { EmailModule } from '../email/email.module';
import { CommunicationsModule } from '../communications/communications.module';

@Module({
  imports: [PrismaModule, EmailModule, CommunicationsModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
