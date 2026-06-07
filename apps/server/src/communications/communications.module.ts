import { Module } from '@nestjs/common';
import { CommunicationsController } from './communications.controller';
import { CommunicationsControllerUpdate } from './communications.controller.update';
import { CommunicationsService } from './communications.service';
import { PrismaModule } from '../prisma/prisma.module';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [PrismaModule, EmailModule],
  controllers: [CommunicationsController, CommunicationsControllerUpdate],
  providers: [CommunicationsService],
})
export class CommunicationsModule {}
