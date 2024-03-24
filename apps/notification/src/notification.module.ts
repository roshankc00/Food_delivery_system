import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmailModule } from './mail/mail.module';
import { EmailService } from './mail/mail.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    EmailModule,
  ],
  controllers: [NotificationController],
  providers: [NotificationService, ConfigService, EmailService],
})
export class NotificationModule {}
