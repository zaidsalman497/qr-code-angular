import Stripe from 'stripe';

export const environment = {
  production: false,
  stripeSecureKey:  'sk_test_51J9MZbJ6E4w7cr4JoZ5TkejLpuJDjCdMdY679BsbGIdYymbcjM6jEj5WnNOKSDJOWrrODpg8e1MHVbjXnsMbvLNm0011j0Qq6s',
  stripWebUrl: 'http://localhost:3333',
  stripConfig: {
    apiVersion: '2020-08-27',
  } as Stripe.StripeConfig,
};
