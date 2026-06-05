import { createClient } from '@/utils/supabase/server';

const PREMIUM_STATUSES = ['active', 'trialing', 'paid', 'pro', 'studio', 'enterprise'];
const PREMIUM_PLANS = ['starter', 'pro', 'studio', 'enterprise'];

export function isPremiumSubscription(subscription) {
  if (!subscription) return false;
  const status = String(subscription.status || subscription.subscription_status || '').toLowerCase();
  const plan = String(subscription.plan || subscription.subscription_plan || subscription.tier || '').toLowerCase();
  return PREMIUM_STATUSES.includes(status) || PREMIUM_PLANS.includes(plan);
}

export async function getServerSubscription(request) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    const devPlan = request?.headers?.get('x-vixluxia-plan');
    return {
      user: null,
      subscription: devPlan ? { status: devPlan, plan: devPlan } : null,
      isPremium: isPremiumSubscription({ status: devPlan, plan: devPlan }),
      source: 'env-missing',
    };
  }

  const supabase = createClient();
  const { data: { user } = {}, error } = await supabase.auth.getUser();

  if (error || !user) {
    return { user: null, subscription: null, isPremium: false, source: 'anonymous' };
  }

  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', user.id)
    .in('status', ['active', 'trialing'])
    .order('current_period_end', { ascending: false })
    .maybeSingle();

  if (subscription) {
    return { user, subscription, isPremium: isPremiumSubscription(subscription), source: 'subscriptions' };
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('subscription_status, subscription_plan, stripe_customer_id')
    .eq('id', user.id)
    .maybeSingle();

  return {
    user,
    subscription: profile,
    isPremium: isPremiumSubscription(profile),
    source: 'profiles',
  };
}
