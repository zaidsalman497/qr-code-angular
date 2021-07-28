import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AngularFireFunctions } from '@angular/fire/functions';
import  StripeCheckoutHandler  from "stripe";
import { loadStripe, StripeError } from "@stripe/stripe-js";
import { environment } from "../../environments/environment";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent {
  constructor(private auth: AuthService, private functions: AngularFireFunctions) {}
  priceid: 'prod_JnfNZAIdmf8dEy'
 stripePromise = loadStripe(environment.stripe.stripe_key)
  handler: StripeCheckoutHandler;
  confirmation: any;
  loading = false;
  quantity = 1;

 
  async checkout(clientSecret: string) {
    const stripe = await this.stripePromise
    const error = stripe.redirectToCheckout({
      mode: 'subscription',
      lineItems: [{ price: this.priceid, quantity: this.quantity }],
      successUrl: environment.stripe.pass_url,
      cancelUrl: environment.stripe.fail_url,
    })
    return this.status(clientSecret)
}
async status(clientSecret: string) {
  const checkout = this.checkout(clientSecret)
  const stripe = await this.stripePromise
  stripe.confirmCardPayment(clientSecret).then(function(response) {
    if (response.error || checkout) {
      console.error()
    } else if (response.paymentIntent && response.paymentIntent.status === 'succeeded') {
      alert('have worked')
    }
  });
}
}