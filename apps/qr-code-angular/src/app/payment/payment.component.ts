import { Component } from '@angular/core';
import { loadStripe, Stripe, TokenResult } from '@stripe/stripe-js';
import { environment } from '../../environments/environment';
import firebase from 'firebase'
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  title = 'Zaid Pro';
  priceId = 'price_1JA42NJ6E4w7cr4JAdYjpcTw';
  product = {
    title: 'Zaid Pro',
    subTitle: 'pro',
    description: 'Zaid Pro has now have courses and source codes and you can comment if you are stuck with something.',
    price: 3.00
    
  };
  quantity = 1;
  stripePromise = loadStripe(environment.stripe.stripe_key);

  async checkout() {
    // Call your backend to create the Checkout session.

    // When the customer clicks on the button, redirect them to Checkout.
    const strip = await this.stripePromise;
    const error = await strip?.redirectToCheckout({
      mode: 'subscription',
      lineItems: [{ price: this.priceId, quantity: this.quantity }],
      successUrl: 'http://localhost:4200/loggedin',
      cancelUrl: `http://localhost:4200/payment`,
    });
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.

    if (error) {
      console.log('sorry we could not complete your payment because' + error);
    } else {
      this.checkouted()
    }

  }
  
    private async checkouted() {
      const stripe = await this.stripePromise
       if( stripe?.confirmCardPayment ) {
         firebase.
    }
  }
}
