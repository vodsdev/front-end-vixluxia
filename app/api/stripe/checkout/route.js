import { NextResponse } from 'next/server';
import { getServerSubscription } from '@/lib/server/subscription';
import Stripe from 'stripe';

const stripe = process.env.STRIPE_SECRET_KEY 
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : { checkout: { sessions: { create: () => { throw new Error("Stripe not configured"); } } } };

function appUrl(request) {
  const origin = request.headers.get('origin');
  let url = process.env.NEXT_PUBLIC_APP_URL || origin || 'http://localhost:3000';
  if (!url.startsWith('http')) {
    url = `https://${url}`;
  }
  return url;
}

async function createCheckout(request, body = {}) {
  const subscription = await getServerSubscription(request);
  const plan = body.plan ? body.plan.toLowerCase() : 'pro';

  const baseUrl = appUrl(request);
  const referralCode = body.referralCode || request.cookies.get('vixluxia_ref')?.value || '';
  const returnPath = body.returnUrl || '/abonnement';

  const userId = subscription.user?.id;
  const userEmail = subscription.user?.email;

  // Determine price ID based on plan
  let priceId = body.priceId;
  if (!priceId) {
    if (plan === 'starter') {
      priceId = process.env.NEXT_PUBLIC_VIXLUXIA_PRICE_STARTER;
    } else if (plan === 'enterprise') {
      priceId = process.env.NEXT_PUBLIC_VIXLUXIA_PRICE_ENTERPRISE;
    } else {
      priceId = process.env.NEXT_PUBLIC_VIXLUXIA_PRICE_PRO;
    }
  }

  if (!priceId) {
    return NextResponse.json({ error: 'No price ID provided or configured' }, { status: 400 });
  }

  const successUrl = `${baseUrl}${returnPath}?checkout=success&session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = `${baseUrl}${returnPath}?checkout=canceled`;

  try {
    const sessionConfig = {
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        userId: userId || '',
        plan: plan,
        referralCode: referralCode,
      },
    };

    if (userId) {
      sessionConfig.client_reference_id = userId;
    }

    if (userEmail) {
      sessionConfig.customer_email = userEmail;
    }

    const session = await stripe.checkout.sessions.create(sessionConfig);

    return NextResponse.json({ url: session.url, id: session.id });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    return await createCheckout(request, body);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    return await createCheckout(request, {
      plan: searchParams.get('plan') || 'pro',
      priceId: searchParams.get('priceId'),
      referralCode: searchParams.get('ref') || '',
      returnUrl: searchParams.get('returnUrl') || '/abonnement'
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
