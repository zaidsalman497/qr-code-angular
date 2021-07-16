import { Component, OnInit } from '@angular/core';
import { PaymentService } from './payment.service';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  constructor(public payment: PaymentService) {
  }
  title = 'Zaid Pro';
  priceId = 'price_1JA42NJ6E4w7cr4JAdYjpcTw';
  product = {
    title: 'Zaid Pro',
    subTitle: 'pro',
    description: 'Zaid Pro has now have courses and source codes and you can comment if you are stuck with something.',
    price: 3.00
    
  };
  
  quantity = 1;
 
  ngOnInit(): void {
    
  }

}