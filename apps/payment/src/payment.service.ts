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
  async createCharge({ amount }: { amount: number }) {
    const paymentIntent = await this.stipe.paymentIntents.create({
      amount: amount * 100,
      confirm: true,
      currency: 'usd',
      payment_method: 'pm_card_visa',
      return_url: 'https://www.linkedin.com/feed/',
    });
    // todo:payment notification to the user
    return paymentIntent;
  }
}
