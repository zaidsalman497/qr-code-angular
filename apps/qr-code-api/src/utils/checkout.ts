import { User } from './../../../qr-code-angular/src/app/services/user.model';
/* eslint-disable @typescript-eslint/no-unused-vars */
import Stripe from 'stripe';
import { environment } from '../environments/environment';

export interface StripBody {
  item: Stripe.Checkout.SessionCreateParams.LineItem;
}

/**
 * Creates a Stripe Checkout session with line items
 */
export async function createStripeCheckoutSession(
  body: StripBody,
): Promise<Stripe.Checkout.Session> {
  const stripe = new Stripe(
    environment.stripeSecureKey,
    environment.stripConfig
  );

  const session = await stripe.checkout.sessions.create({
    allow_promotion_codes: true,
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [body.item],
    success_url: `${window.location.href}/payment?success={CHECKOUT_SESSION_ID}`,
    cancel_url: `${window.location.href}/payment?failed=true`,
  });
  console.log('server session', session);
  return session;
}

export async function createcustomer(
  body: StripBody,
  token: string
): Promise<Stripe.Customer| void> {
  const stripe = new Stripe(
    environment.stripeSecureKey,
    environment.stripConfig
  );

  const customer = await stripe.customers.create({
    email: ,
    source: token,
  });
  console.log('result', customer);
}
