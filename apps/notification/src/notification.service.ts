import { TransportType } from '@nestjs-modules/mailer/dist/interfaces/mailer-options.interface';
import { Injectable, UsePipes, ValidationPipe } from '@nestjs/common';
import nodemailer, { Transporter } from 'nodemailer';
import path from 'path';
import ejs from 'ejs';
import 'dotenv/config';
import { EventPattern } from '@nestjs/microservices';
import { CreateNotification } from './dtos/create-notification.dto';
@Injectable()
export class NotificationService {
  transporter: Transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    service: process.env.SMTP_SERVICE,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });
  @EventPattern('notify_email')
  @UsePipes(new ValidationPipe())
  async sendNotification(createNotification: CreateNotification) {
    const { email, template, subject, data } = createNotification;
    const templatePath = path.join(
      __dirname,
      '../../../apps/notification/src/templates',
      template,
    );
    const html: string = await ejs.renderFile(templatePath, data);

    //   render the email template with ejs
    await this.transporter.sendMail({
      from: process.env.SMTP_MAIL,
      subject: subject,
      to: email,
      html,
    });
  }
}
