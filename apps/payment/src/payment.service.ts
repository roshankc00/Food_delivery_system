import { NOTIFICATION_SERVICE } from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PaymentService {
  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: ClientProxy,
    private readonly configService: ConfigService,
  ) {}

  private readonly stipe = new Stripe(
    this.configService.get('STRIPE_API_KEY'),
    {
      apiVersion: '2023-10-16',
    },
  );

  async createCharge({ amount, email }: { amount: number; email: string }) {
    try {
      console.log('payment');
      await this.stipe.paymentIntents.create({
        amount: amount * 100,
        confirm: true,
        currency: 'usd',
        payment_method: 'pm_card_visa',
        return_url: 'https://www.linkedin.com/feed/',
      });
      this.notificationService.emit('notify_email', {
        email,
        html: `<h1> payment of ${amount * 100} completed successfully </h1>`,
        subject: 'Payment successfull',
      });
    } catch (error) {
      console.log(error);
    }
    // todo:payment notification to the user
  }
}
