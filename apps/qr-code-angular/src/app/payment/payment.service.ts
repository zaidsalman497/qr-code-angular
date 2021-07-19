import { Injectable } from '@angular/core';
import { ConfirmCardPaymentData, ConfirmCardPaymentOptions, loadStripe, PaymentIntentResult, SetupIntentResult, Stripe } from '@stripe/stripe-js';
import { error } from 'protractor';
import { async } from 'rxjs/internal/scheduler/async';
import { environment } from '../../environments/environment';
import stripe from 'stripe' 

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private stripePromise: Promise<Stripe | null>;

  constructor() {
    this.stripePromise = loadStripe(environment.stripe.stripe_key);
  }
  
  
  async secret() {
    (await this.checkPayment())?.setupIntent?.client_secret
  }
  async id() {
    (await this.checkPayment())?.setupIntent?.id
  }
  async checkPayment(): Promise<SetupIntentResult | undefined> {
    const stripe = await this.stripePromise;
    const secret = this.secret;
    const id = this.id;
    return await stripe?.confirmCardSetup(`${this.id}_secret_${this.secret}`);
  }

  async paid(clientSecret: string, data?: ConfirmCardPaymentData, options?: ConfirmCardPaymentOptions): Promise<undefined | PaymentIntentResult | ConfirmCardPaymentOptions | string> {
      const stripe = this.stripePromise;
      return(await (await ( await stripe)?.confirmCardPayment(clientSecret, data, options)).paymentIntent?)
      
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
    }).then(async function(result) {
        alert('payment completed')
    });
    
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.

  }
  
}

export async function CreatePaymentIntent(apiKey: string, config: stripe.StripeConfig) {
  const paymentintent = new stripe(apiKey, config).paymentIntents.create({
    amount: 3.00,
    currency: 'usd',
  })

  ;(await paymentintent).status

  return paymentintent
}


