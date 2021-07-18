import { Component, OnInit } from '@angular/core';
import { ConfirmCardPaymentData, ConfirmCardPaymentOptions, PaymentIntentResult } from '@stripe/stripe-js';
import { PaymentService } from './payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  response: any;
  ifPaid = false;
  constructor(public payment: PaymentService) {}
  title = 'Zaid Pro';
  priceId = 'price_1JA42NJ6E4w7cr4JAdYjpcTw';
  product = {
    title: 'Zaid Pro',
    subTitle: 'pro',
    description:
      'Zaid Pro has now have courses and source codes and you can comment if you are stuck with something.',
    price: 3.0,
  };

  quantity = 1;

  ngOnInit(): void {}

  checkPayment() {
    this.payment
      .checkPayment()
      .then((res) => {
        this.response = res;
      })
      .catch((err) => {
        this.response = err;
      });
  }
    ifpaid() {
    if(this.payment.paid) {
         ( this.payment.paid)
    } else {
      this.payment.paid
    }
  }

  
}