import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

type mailOptions = {
  subject: string;
  email: string;
  name: string;
  activationCode: string;
  template: string;
};

type mailOrderOptions = {
  subject: string;
  email: string;
  name: string;
  template: string;
  data: any;
};

@Injectable()
export class EmailService {
  constructor(private mailService: MailerService) {}
  async sendEmailVerificationForUser({
    subject,
    email,
    name,
    activationCode,
    template,
  }: mailOptions) {
    await this.mailService.sendMail({
      to: email,
      subject,
      template,
      context: {
        name,
        activationCode,
      },
    });
  }

  async sendMailForUserOrders({
    data,
    email,
    subject,
    template,
  }: mailOrderOptions) {
    await this.mailService.sendMail({
      to: email,
      subject,
      template,
      context: {
        data,
      },
    });
  }
}
