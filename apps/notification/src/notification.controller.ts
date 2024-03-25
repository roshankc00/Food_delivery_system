import {
  Controller,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CreateNotification } from './dtos/create-notification.dto';
import { CommonJwtAuthGuard } from '@app/common';

@Controller()
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}
  @EventPattern('notify_email')
  @UseGuards(CommonJwtAuthGuard)
  @UsePipes(new ValidationPipe())
  async sendMail(@Payload() data: CreateNotification) {
    console.log('hahah');
    await this.notificationService.sendEmail(data);
  }
}
