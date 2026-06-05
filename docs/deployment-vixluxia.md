# VixLuxia Deployment

This file documents the production setup without storing secrets in the repository.

## Required Environment Variables

Add these in Vercel Project Settings > Environment Variables.

```bash
NEXT_PUBLIC_APP_URL=https://vixluxia.com

NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxx
STRIPE_SECRET_KEY=sk_live_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx

NEXT_PUBLIC_VIXLUXIA_PRICE_STARTER=price_xxx
NEXT_PUBLIC_VIXLUXIA_PRICE_PRO=price_xxx
NEXT_PUBLIC_VIXLUXIA_PRICE_ENTERPRISE=price_xxx

NVIDIA_NIM_BASE_URL=http://127.0.0.1:8000/v1
NVIDIA_NIM_MODEL=nvidia/nemotron-3-super-120b-a12b
NVIDIA_API_KEY=nvapi_xxx
```

Do not commit `.env.local`. The repository `.gitignore` already excludes environment files.

## Supabase

Run `supabase/migrations/001_vixluxia_platform.sql` in the Supabase SQL editor or through the Supabase CLI.

The migration creates:

- `profiles`
- `components`
- `likes`
- `component_votes`
- `component_comments`
- `subscriptions`
- `referrals`
- `api_keys`
- `api_usage_logs`
- `ai_generations`

RLS is enabled on all tables. Server-only operations use `SUPABASE_SERVICE_ROLE_KEY`.

## Stripe

Set the webhook endpoint to:

```text
https://vixluxia.com/api/stripe/webhook
```

Recommended events:

- `checkout.session.completed`
- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`
- `payment_intent.succeeded`

The checkout route is:

```text
POST /api/stripe/checkout
```

Body:

```json
{
  "plan": "pro",
  "referralCode": "creator"
}
```

## NVIDIA NIM

For local infrastructure, run the NIM container and expose port `8000`.

```bash
docker login nvcr.io
export NGC_API_KEY="your_ngc_or_nvapi_key"
export LOCAL_NIM_CACHE=~/.cache/nim
mkdir -p "$LOCAL_NIM_CACHE"
chmod -R a+w "$LOCAL_NIM_CACHE"
docker run -it --rm \
  --gpus all \
  --shm-size=16GB \
  -e NGC_API_KEY \
  -v "$LOCAL_NIM_CACHE:/opt/nim/.cache" \
  -p 8000:8000 \
  nvcr.io/nim/nvidia/nemotron-3-super-120b-a12b:latest
```

The app calls:

```text
POST /api/ai/generate
```

The server verifies premium access before calling NVIDIA.

## IONOS Domain: vixluxia.com

In Vercel:

1. Add `vixluxia.com` to the project domains.
2. Add `www.vixluxia.com` too.
3. Copy the exact DNS values Vercel gives you.

In IONOS DNS:

```text
Type: A
Host: @
Value: 76.76.21.21
```

```text
Type: CNAME
Host: www
Value: cname.vercel-dns-0.com
```

If Vercel shows different values, use Vercel's values. DNS propagation can take a few minutes to several hours.

## Production Checklist

- Add all environment variables in Vercel.
- Run the Supabase migration.
- Configure Stripe webhook and copy `STRIPE_WEBHOOK_SECRET`.
- Add IONOS DNS records.
- Deploy from GitHub to Vercel.
- Test `/api/health`, `/api`, `/abonnement`, `/ia`, `/publish`, `/api-keys`.
