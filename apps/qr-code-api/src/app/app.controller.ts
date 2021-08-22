import { Body, Controller, Post } from '@nestjs/common';
import { createStripeCheckoutSession, StripBody } from '../utils/checkout';
import Stripe from 'stripe';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('checkout')
  async checkout(@Body() body: StripBody): Promise<Stripe.Checkout.Session> {
    return createStripeCheckoutSession(body);
  }
}
