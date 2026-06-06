import Stripe from 'stripe';

let stripeClient;

export function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not configured');
  }

  if (!stripeClient) {
    stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-06-20',
    });
  }

  return stripeClient;
}

export const STRIPE_PRICE_ENV = {
  starter: 'NEXT_PUBLIC_VIXLUXIA_PRICE_STARTER',
  starter_yearly: 'NEXT_PUBLIC_VIXLUXIA_PRICE_STARTER_YEARLY',
  pro: 'NEXT_PUBLIC_VIXLUXIA_PRICE_PRO',
  pro_yearly: 'NEXT_PUBLIC_VIXLUXIA_PRICE_PRO_YEARLY',
  enterprise: 'NEXT_PUBLIC_VIXLUXIA_PRICE_ENTERPRISE',
  studio: 'NEXT_PUBLIC_VIXLUXIA_PRICE_ENTERPRISE',
};

export function getPriceId(plan) {
  const key = STRIPE_PRICE_ENV[plan];
  return key ? process.env[key] : null;
}
