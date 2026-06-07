import { NextResponse } from 'next/server';
import { getStripe } from '@/lib/server/stripe';
import { getSupabaseAdmin } from '@/lib/server/supabase-admin';

export async function POST(request) {
  const payload = await request.text();
  const signature = request.headers.get('stripe-signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return new Response("Missing signature or webhook secret", { status: 400 });
  }

  let event;
  try {
    const stripe = getStripe();
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch (error) {
    console.error("Webhook signature verification failed.", error.message);
    return new Response(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return new Response("Supabase admin client not found", { status: 500 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        const userId = session.client_reference_id || session.metadata?.userId;
        const customerId = typeof session.customer === 'string' ? session.customer : session.customer?.id;
        const subscriptionId = session.subscription;
        
        if (!userId) {
          console.error("No userId found in session metadata or client_reference_id");
          break;
        }

        const plan = session.metadata?.plan || 'pro';
        const referralCode = session.metadata?.referralCode || '';

        // Retrieve subscription for details
        let status = 'active';
        let currentPeriodEnd = null;

        if (subscriptionId) {
          const stripe = getStripe();
          const subscription = await stripe.subscriptions.retrieve(subscriptionId);
          status = subscription.status;
          currentPeriodEnd = subscription.current_period_end 
            ? new Date(subscription.current_period_end * 1000).toISOString() 
            : null;

          await supabase.from('subscriptions').upsert({
            user_id: userId,
            stripe_customer_id: customerId,
            stripe_subscription_id: subscription.id,
            status: status,
            plan: plan,
            current_period_end: currentPeriodEnd,
            updated_at: new Date().toISOString(),
          }, { onConflict: 'stripe_subscription_id' });
        }

        // Update profiles
        await supabase.from('profiles').upsert({
          id: userId,
          stripe_customer_id: customerId,
          subscription_status: status,
          subscription_plan: plan,
          updated_at: new Date().toISOString(),
        }, { onConflict: 'id' });

        // Handle referrals
        if (referralCode && status === 'active') {
          const { data: referrer } = await supabase
            .from('profiles')
            .select('id')
            .eq('referral_code', referralCode)
            .maybeSingle();

          if (referrer) {
            await supabase.from('referrals').insert({
              referrer_id: referrer.id,
              referred_user_id: userId,
              referral_code: referralCode,
              status: 'converted',
              commission_rate: plan === 'enterprise' ? 0.25 : plan === 'pro' ? 0.18 : 0.10,
              stripe_checkout_session_id: session.id,
              converted_at: new Date().toISOString(),
            });
          }
        }

        // Handle Bonus Affiliation Team (+3.00€)
        if (status === 'active') {
          const { data: member } = await supabase
            .from('team_members')
            .select('team_id')
            .eq('user_id', userId)
            .limit(1)
            .maybeSingle();

          if (member && member.team_id) {
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
        break;
      }
      
      case 'customer.subscription.updated': {
        const subscription = event.data.object;
        const customerId = typeof subscription.customer === 'string' ? subscription.customer : subscription.customer?.id;
        const status = subscription.status;
        const currentPeriodEnd = subscription.current_period_end 
          ? new Date(subscription.current_period_end * 1000).toISOString() 
          : null;
        const plan = subscription.metadata?.plan || 'pro';
        
        // Find user by customer ID
        const { data: profile } = await supabase
          .from('profiles')
          .select('id')
          .eq('stripe_customer_id', customerId)
          .single();

        if (profile) {
          const userId = profile.id;

          await supabase.from('profiles').update({
            subscription_status: status,
            subscription_plan: plan,
            updated_at: new Date().toISOString(),
          }).eq('id', userId);

          await supabase.from('subscriptions').upsert({
            user_id: userId,
            stripe_customer_id: customerId,
            stripe_subscription_id: subscription.id,
            status: status,
            plan: plan,
            current_period_end: currentPeriodEnd,
            updated_at: new Date().toISOString(),
          }, { onConflict: 'stripe_subscription_id' });
        }
        break;
      }

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return new Response("Webhook handler failed", { status: 500 });
  }
}
