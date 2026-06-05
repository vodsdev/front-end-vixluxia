import { NextResponse } from 'next/server';
import { getStripe } from '@/lib/server/stripe';
import { getSupabaseAdmin } from '@/lib/server/supabase-admin';

async function upsertSubscription(event) {
  const supabase = getSupabaseAdmin();
  if (!supabase) return;

  const object = event.data.object;
  const subscriptionId = object.subscription || object.id;
  if (!subscriptionId) return;

  const stripe = getStripe();
  const subscription =
    object.object === 'subscription'
      ? object
      : await stripe.subscriptions.retrieve(subscriptionId);

  const userId = subscription.metadata?.userId || object.client_reference_id || object.metadata?.userId;
  const customerId = typeof subscription.customer === 'string' ? subscription.customer : subscription.customer?.id;
  const plan = subscription.metadata?.plan || object.metadata?.plan || 'pro';
  const referralCode = subscription.metadata?.referralCode || object.metadata?.referralCode || '';

  if (!userId) return;

  await supabase.from('subscriptions').upsert({
    user_id: userId,
    stripe_customer_id: customerId,
    stripe_subscription_id: subscription.id,
    status: subscription.status,
    plan,
    current_period_end: subscription.current_period_end
      ? new Date(subscription.current_period_end * 1000).toISOString()
      : null,
    updated_at: new Date().toISOString(),
  }, { onConflict: 'stripe_subscription_id' });

  await supabase.from('profiles').upsert({
    id: userId,
    stripe_customer_id: customerId,
    subscription_status: subscription.status,
    subscription_plan: plan,
    updated_at: new Date().toISOString(),
  }, { onConflict: 'id' });

  if (referralCode && subscription.status === 'active') {
    const { data: referrer } = await supabase
      .from('profiles')
      .select('id')
      .eq('referral_code', referralCode)
      .maybeSingle();

    await supabase.from('referrals').insert({
      referrer_id: referrer?.id || null,
      referred_user_id: userId,
      referral_code: referralCode,
      status: 'converted',
      commission_rate: plan === 'enterprise' ? 0.25 : plan === 'pro' ? 0.18 : 0.10,
      stripe_checkout_session_id: object.id || null,
      converted_at: new Date().toISOString(),
    });
  }

  // Bonus Affiliation Team (+3.00€)
  if (subscription.status === 'active') {
    const { data: member } = await supabase
      .from('team_members')
      .select('team_id')
      .eq('user_id', userId)
      .limit(1)
      .maybeSingle();

    if (member && member.team_id) {
      // Get current vault balance
      const { data: team } = await supabase
        .from('teams')
        .select('vault_balance')
        .eq('id', member.team_id)
        .single();
      
      if (team) {
        await supabase
          .from('teams')
          .update({ vault_balance: Number(team.vault_balance) + 3.00 })
          .eq('id', member.team_id);
      }
    }
  }
}

export async function POST(request) {
  const payload = await request.text();
  const signature = request.headers.get('stripe-signature');

  try {
    let event;

    if (process.env.STRIPE_WEBHOOK_SECRET && signature) {
      event = getStripe().webhooks.constructEvent(payload, signature, process.env.STRIPE_WEBHOOK_SECRET);
    } else {
      event = JSON.parse(payload);
    }

    if (
      [
        'checkout.session.completed',
        'customer.subscription.created',
        'customer.subscription.updated',
        'customer.subscription.deleted',
        'payment_intent.succeeded',
      ].includes(event.type)
    ) {
      await upsertSubscription(event);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
