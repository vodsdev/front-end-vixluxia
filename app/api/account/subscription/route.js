import { NextResponse } from 'next/server';
import { getServerSubscription } from '@/lib/server/subscription';

export async function GET(request) {
  const result = await getServerSubscription(request);
  return NextResponse.json({
    isPremium: result.isPremium,
    source: result.source,
    plan: result.subscription?.plan || result.subscription?.subscription_plan || null,
    status: result.subscription?.status || result.subscription?.subscription_status || null,
    userId: result.user?.id || null,
  });
}
