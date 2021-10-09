import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import Stripe from 'stripe';
import { environment } from '../../environments/environment';

@Controller('stripe')
export class StripeController {
    private stripe: Stripe;

  constructor() {
    // tslint:disable-next-line: max-line-length
    this.stripe = new Stripe(environment.stripeSecureKey,
      environment.stripConfig);
    }
    @Get('user/list')
    async getUserList(): Promise<unknown> {
      return this.stripe.customers.list();
    }


    @Get(['user/:id', 'user'])
    async getUser(@Param('id') id: string): Promise<unknown> {
      const userId = id || 'cus_K5iQOdTUJMqasW';
      return this.stripe.customers.retrieve(userId);
    }

    @Post('create-user')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async random(@Body() customer: any): Promise<unknown> {
      return this.stripe.customers.create(customer);
    }
}
