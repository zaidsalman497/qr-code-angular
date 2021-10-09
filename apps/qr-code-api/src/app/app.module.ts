import { StripeController } from './stripe/stripe.controller';
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController, StripeController],
  providers: [AppService],
})
export class AppModule {}
