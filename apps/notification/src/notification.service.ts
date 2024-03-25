import { TransportType } from '@nestjs-modules/mailer/dist/interfaces/mailer-options.interface';
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import * as nodemailer from 'nodemailer';
import 'dotenv/config';

type mailOptions = {
  subject: string;
  email: string;
  html: string;
};
@Injectable()
export class NotificationService {
  constructor() {} // private mailService: MailerService

  transporter: nodemailer.Transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    service: process.env.SMTP_SERVICE,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });
  async sendEmail({ subject, email, html }: mailOptions) {
    try {
      console.log(subject, email, html);
      // await this.transporter.sendMail({
      //   from: process.env.SMTP_MAIL,
      //   to: email,
      //   subject,
      //   html: html,
      // });
    } catch (error) {
      console.log(error);
    }
  }
}
