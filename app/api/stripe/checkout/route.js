import { NextResponse } from 'next/server';
import { getServerSubscription } from '@/lib/server/subscription';
import { getPriceId, getStripe } from '@/lib/server/stripe';

function appUrl(request) {
  const origin = request.headers.get('origin');
  let url = process.env.NEXT_PUBLIC_APP_URL || origin || 'http://localhost:3000';
  if (!url.startsWith('http')) {
    url = `https://${url}`;
  }
  return url;
}

async function createCheckout(request, body = {}) {
  const stripe = getStripe();
  const subscription = await getServerSubscription(request);
  const plan = body.plan || 'pro';
  const priceId = body.priceId || getPriceId(plan);

  if (!priceId) {
    return NextResponse.json({ error: `Missing Stripe price id for plan "${plan}"` }, { status: 400 });
  }

  const baseUrl = appUrl(request);
  const referralCode = body.referralCode || request.cookies.get('vixluxia_ref')?.value || '';
  const returnPath = body.returnUrl || '/abonnement';
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${baseUrl}${returnPath}?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}${returnPath}?checkout=cancelled`,
    customer_email: body.email || subscription.user?.email || undefined,
    client_reference_id: subscription.user?.id || undefined,
    metadata: {
      userId: subscription.user?.id || '',
      plan,
      referralCode,
    },
    subscription_data: {
      metadata: {
        userId: subscription.user?.id || '',
        plan,
        referralCode,
      },
    },
  });

  return NextResponse.json({ url: session.url, id: session.id });
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
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
