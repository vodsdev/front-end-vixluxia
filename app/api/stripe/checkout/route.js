import { NextResponse } from 'next/server';
import { getServerSubscription } from '@/lib/server/subscription';
import { getSupabaseAdmin } from '@/lib/server/supabase-admin';

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
  const plan = body.plan || 'pro';

  const baseUrl = appUrl(request);
  const referralCode = body.referralCode || request.cookies.get('vixluxia_ref')?.value || '';
  const returnPath = body.returnUrl || '/abonnement';

  const userId = subscription.user?.id;
  const mockSessionId = 'cs_test_' + Math.random().toString(36).substr(2, 9);

  // MOCK SUCCESS: Update DB immediately since we don't have real Stripe keys
  if (userId) {
    const supabaseAdmin = getSupabaseAdmin();
    if (supabaseAdmin) {
      const mockSubId = 'sub_mock_' + Math.random().toString(36).substr(2, 9);
      const mockCustomerId = 'cus_mock_' + Math.random().toString(36).substr(2, 9);

      await supabaseAdmin.from('subscriptions').upsert({
        user_id: userId,
        stripe_customer_id: mockCustomerId,
        stripe_subscription_id: mockSubId,
        status: 'active',
        plan,
        current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date().toISOString(),
      }, { onConflict: 'stripe_subscription_id' });

      await supabaseAdmin.from('profiles').upsert({
        id: userId,
        stripe_customer_id: mockCustomerId,
        subscription_status: 'active',
        subscription_plan: plan,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'id' });
      
      // Bonus Affiliation Team (+3.00€) for mock
      const { data: member } = await supabaseAdmin
        .from('team_members')
        .select('team_id')
        .eq('user_id', userId)
        .limit(1)
        .maybeSingle();

      if (member && member.team_id) {
        const { data: team } = await supabaseAdmin
          .from('teams')
          .select('vault_balance')
          .eq('id', member.team_id)
          .single();
        
        if (team) {
          await supabaseAdmin
            .from('teams')
            .update({ vault_balance: Number(team.vault_balance) + 3.00 })
            .eq('id', member.team_id);
        }
      }
    }
  }

  const successUrl = `${baseUrl}${returnPath}?checkout=success&session_id=${mockSessionId}`;

  return NextResponse.json({ url: successUrl, id: mockSessionId });
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
