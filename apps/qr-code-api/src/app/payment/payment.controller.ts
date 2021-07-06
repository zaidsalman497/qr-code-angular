import { Controller, Get } from '@nestjs/common';

@Controller('payment')
export class PaymentController {

    @Get()
    getPaymentInfo() {
      return 'zaid try 1';
    }
}
