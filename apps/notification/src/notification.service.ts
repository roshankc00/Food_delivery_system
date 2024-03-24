import { TransportType } from '@nestjs-modules/mailer/dist/interfaces/mailer-options.interface';
import { Injectable, UsePipes, ValidationPipe } from '@nestjs/common';
import nodemailer, { Transporter } from 'nodemailer';
import path from 'path';
import ejs from 'ejs';
import 'dotenv/config';
import { CreateNotification } from './dtos/create-notification.dto';
import { EmailService } from './mail/mail.service';
@Injectable()
export class NotificationService {
  constructor(private readonly mailerService: EmailService) {}
  async sendNotification(createNotification: CreateNotification) {}
}
