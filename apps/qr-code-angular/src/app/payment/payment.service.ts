import { PaymentComponent } from './payment.component';
import { Injectable } from '@angular/core';
import { loadStripe, SetupIntentResult, Stripe } from '@stripe/stripe-js';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private stripePromise: Promise<Stripe | null>;

  constructor() {
    this.stripePromise = loadStripe(environment.stripe.stripe_key);
  }

  async ifpaid() {
    return false;
  }

  async checkPayment() {
    const stripe = await this.stripePromise;
    return await stripe?.confirmCardSetup(environment.stripe.stripe_key);
  }

  async checkout(priceId = 'price_1JA42NJ6E4w7cr4JAdYjpcTw', quantity = 1) {
    // Call your backend to create the Checkout session.

    // When the customer clicks on the button, redirect them to Checkout.
    const stripePromise = loadStripe(environment.stripe.stripe_key);
    const stripe = await stripePromise;
    const error = await stripe?.redirectToCheckout({
      mode: 'subscription',
      lineItems: [{ price: priceId, quantity }],
      successUrl: 'http://localhost:4200/payment',
      cancelUrl: `http://localhost:4200/payment`,
    });

    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
    return this.ifpaid();
    /* if (error) {
      console.log('sorry we could not complete your payment because' + error);
    } else {
      
    }*/
  }
}
