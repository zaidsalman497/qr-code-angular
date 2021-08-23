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

  const url = 'https://zaid497.azurewebsites.net/';

  const session = await stripe.checkout.sessions.create({
    allow_promotion_codes: true,
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [body.item],
    success_url: `${url}/payment?success={CHECKOUT_SESSION_ID}`,
    cancel_url: `${url}/payment?failed=true`,
  });

  console.log('server session', session);
  return session;
}
