---
sidebar_position: 2
---

# SaaS Subscription Platform

Build a subscription-based SaaS platform with recurring crypto payments.

## What You'll Build

- User authentication and onboarding
- Multiple pricing tiers
- Recurring crypto subscriptions
- Usage tracking and limits
- Automatic subscription management
- Webhooks for subscription events

## Prerequisites

- Next.js 14+ with NextAuth.js
- Database (PostgreSQL, MySQL, or MongoDB)
- ZendFi API key ([get one here](https://dashboard.zendfi.tech))

## Quick Start

```bash
# Use our template
npx create-zendfi-app my-saas --template nextjs-saas
cd my-saas
npm run dev
```

Or follow the guide below to build from scratch.

## Step 1: Define Pricing Tiers

```typescript
// lib/pricing.ts
export const PRICING_TIERS = {
  free: {
    id: 'free',
    name: 'Free',
    price: 0,
    interval: null,
    features: [
      '10 API calls per day',
      'Basic support',
      'Community access',
    ],
    limits: {
      apiCalls: 10,
      storage: 100, // MB
    },
  },
  pro: {
    id: 'pro',
    name: 'Pro',
    price: 29.99,
    interval: 'monthly',
    features: [
      '10,000 API calls per day',
      'Priority support',
      '10GB storage',
      'Advanced analytics',
    ],
    limits: {
      apiCalls: 10000,
      storage: 10000, // MB
    },
  },
  enterprise: {
    id: 'enterprise',
    name: 'Enterprise',
    price: 99.99,
    interval: 'monthly',
    features: [
      'Unlimited API calls',
      '24/7 dedicated support',
      'Unlimited storage',
      'Custom integrations',
      'SLA guarantee',
    ],
    limits: {
      apiCalls: Infinity,
      storage: Infinity,
    },
  },
};
```


## Step 2: Create Pricing Page

```typescript
// app/pricing/page.tsx
import { PRICING_TIERS } from '@/lib/pricing';
import { SubscribeButton } from '@/components/SubscribeButton';

export default function PricingPage() {
  return (
    <div className="pricing-grid">
      {Object.values(PRICING_TIERS).map((tier) => (
        <div key={tier.id} className="pricing-card">
          <h2>{tier.name}</h2>
          <div className="price">
            {tier.price === 0 ? (
              'Free'
            ) : (
              <>
                ${tier.price}
                <span>/month</span>
              </>
            )}
          </div>
          
          <ul className="features">
            {tier.features.map((feature) => (
              <li key={feature}>✓ {feature}</li>
            ))}
          </ul>
          
          <SubscribeButton tier={tier} />
        </div>
      ))}
    </div>
  );
}
```


## Step 3: Create Subscription Plans & Subscriptions

First, create subscription plans for each tier:

```typescript
// lib/setup-plans.ts
import { zendfi } from '@/lib/zendfi';
import { PRICING_TIERS } from '@/lib/pricing';

// Run this once to create your subscription plans
export async function setupSubscriptionPlans() {
  const plans = [];
  
  for (const [key, tier] of Object.entries(PRICING_TIERS)) {
    if (tier.price === 0) continue; // Skip free tier
    
    const plan = await zendfi.createSubscriptionPlan({
      name: `${tier.name} Plan`,
      description: `${tier.features.join(', ')}`,
      amount: tier.price,
      currency: 'USD',
      billing_interval: 'monthly',
      interval_count: 1,
      trial_days: 0,
      metadata: {
        tier_id: tier.id,
        tier_name: tier.name,
      },
    });
    
    plans.push({ tierId: key, planId: plan.id });
  }
  
  return plans;
}
```

Then create subscriptions for users:

```typescript
// app/api/subscribe/route.ts
import { zendfi } from '@/lib/zendfi';
import { getServerSession } from 'next-auth';
import { getSubscriptionPlanId } from '@/lib/plans';

export async function POST(request: Request) {
  const session = await getServerSession();
  if (!session?.user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  const { tierId, walletAddress } = await request.json();
  
  // Get the plan ID for this tier
  const planId = await getSubscriptionPlanId(tierId);
  
  if (!planId) {
    return Response.json({ error: 'Invalid tier' }, { status: 400 });
  }
  
  // Create subscription
  const subscription = await zendfi.createSubscription({
    plan_id: planId,
    customer_wallet: walletAddress,
    customer_email: session.user.email,
    metadata: {
      user_id: session.user.id,
      tier_id: tierId,
    },
  });
  
  return Response.json({ 
    subscriptionUrl: subscription.payment_url,
    subscriptionId: subscription.id,
  });
}
```

```typescript
// components/SubscribeButton.tsx
'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useWallet } from '@solana/wallet-adapter-react';

export function SubscribeButton({ tier }) {
  const { data: session } = useSession();
  const { publicKey } = useWallet();
  const [loading, setLoading] = useState(false);
  
  async function handleSubscribe() {
    if (!session) {
      window.location.href = '/login?redirect=/pricing';
      return;
    }
    
    if (!publicKey) {
      alert('Please connect your wallet first');
      return;
    }
    
    setLoading(true);
    
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          tierId: tier.id,
          walletAddress: publicKey.toBase58(),
        }),
      });
      
      const { subscriptionUrl } = await res.json();
      window.location.href = subscriptionUrl;
    } catch (error) {
      console.error('Subscription error:', error);
      alert('Failed to create subscription');
    } finally {
      setLoading(false);
    }
  }
  
  if (tier.price === 0) {
    return <button disabled>Current Plan</button>;
  }
  
  return (
    <button onClick={handleSubscribe} disabled={loading}>
      {loading ? 'Loading...' : `Subscribe to ${tier.name}`}
    </button>
  );
}
```


## Step 4: Handle Subscription Webhooks

```typescript
// app/api/webhooks/zendfi/route.ts
import { createNextWebhookHandler } from '@zendfi/sdk/next';
import { updateUserSubscription, suspendUser } from '@/lib/users';

export const POST = createNextWebhookHandler({
  secret: process.env.ZENDFI_WEBHOOK_SECRET!,
  handlers: {
    // New subscription activated
    SubscriptionCreated: async (event) => {
      const subscription = event.data;
      
      await updateUserSubscription({
        userId: subscription.metadata.user_id,
        tierId: subscription.metadata.tier_id,
        status: subscription.status,
        subscriptionId: subscription.id,
        currentPeriodEnd: new Date(subscription.current_period_end),
      });
      
      await sendWelcomeEmail({
        userId: subscription.metadata.user_id,
        tierName: subscription.plan_name,
      });
    },
    
    // Subscription renewed successfully
    SubscriptionRenewed: async (event) => {
      const subscription = event.data;
      
      await updateUserSubscription({
        userId: subscription.metadata.user_id,
        status: subscription.status,
        currentPeriodEnd: new Date(subscription.current_period_end),
      });
      
      await sendReceiptEmail({
        userId: subscription.metadata.user_id,
        nextBillingDate: subscription.current_period_end,
      });
    },
    
    // Subscription payment failed
    SubscriptionPaymentFailed: async (event) => {
      const subscription = event.data;
      
      await updateUserSubscription({
        userId: subscription.metadata.user_id,
        status: 'past_due',
      });
      
      await sendPaymentFailedEmail({
        userId: subscription.metadata.user_id,
        retryDate: subscription.next_payment_attempt,
      });
    },
    
    // Subscription cancelled
    SubscriptionCancelled: async (event) => {
      const subscription = event.data;
      
      await updateUserSubscription({
        userId: subscription.metadata.user_id,
        status: 'cancelled',
        cancelledAt: new Date(),
      });
      
      // Don't suspend immediately - let them use until period end
      await sendCancellationConfirmationEmail({
        userId: subscription.metadata.user_id,
        accessUntil: subscription.current_period_end,
      });
      
      // Schedule suspension for period end
      const periodEnd = new Date(subscription.current_period_end);
      if (periodEnd < new Date()) {
        await suspendUser(subscription.metadata.user_id);
      }
    },
  },
});
```


## Step 5: Build User Dashboard

```typescript
// app/dashboard/page.tsx
import { getServerSession } from 'next-auth';
import { getUserSubscription } from '@/lib/users';
import { PRICING_TIERS } from '@/lib/pricing';
import { ManageSubscriptionButton } from '@/components/ManageSubscriptionButton';

export default async function DashboardPage() {
  const session = await getServerSession();
  const subscription = await getUserSubscription(session.user.id);
  const tier = PRICING_TIERS[subscription.tierId];
  
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      
      {/* Current Plan */}
      <div className="current-plan">
        <h2>Current Plan: {tier.name}</h2>
        {subscription.status === 'active' && (
          <p>Next billing: {new Date(subscription.current_period_end).toLocaleDateString()}</p>
        )}
        {subscription.status === 'cancelled' && (
          <p>Access until: {new Date(subscription.current_period_end).toLocaleDateString()}</p>
        )}
        <ManageSubscriptionButton />
      </div>
      
      {/* Usage Stats */}
      <div className="usage-stats">
        <h2>Usage This Period</h2>
        <div className="stat">
          <span>API Calls</span>
          <progress 
            value={subscription.usage.apiCalls} 
            max={tier.limits.apiCalls}
          />
          <span>{subscription.usage.apiCalls} / {tier.limits.apiCalls}</span>
        </div>
        <div className="stat">
          <span>Storage</span>
          <progress 
            value={subscription.usage.storage} 
            max={tier.limits.storage}
          />
          <span>{subscription.usage.storage}MB / {tier.limits.storage}MB</span>
        </div>
      </div>
    </div>
  );
}
```


## Step 6: Enforce Subscription Limits

```typescript
// middleware.ts
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // Check subscription status for protected API routes
  if (request.nextUrl.pathname.startsWith('/api/protected')) {
    const user = await getUserWithSubscription(token.sub);
    
    // Check if subscription is active
    if (!['active', 'trialing'].includes(user.subscription.status)) {
      return NextResponse.json(
        { error: 'Active subscription required' },
        { status: 403 }
      );
    }
    
    // Check usage limits
    const tier = PRICING_TIERS[user.subscription.tierId];
    if (user.subscription.usage.apiCalls >= tier.limits.apiCalls) {
      return NextResponse.json(
        { error: 'API call limit reached. Upgrade your plan.' },
        { status: 429 }
      );
    }
    
    // Increment usage counter
    await incrementUsage(user.id, 'apiCalls');
  }
  
  return NextResponse.next();
}
```


## Step 7: Allow Subscription Management

```typescript
// app/api/cancel-subscription/route.ts
import { zendfi } from '@/lib/zendfi';
import { getServerSession } from 'next-auth';
import { getUserSubscription } from '@/lib/users';

export async function POST(request: Request) {
  const session = await getServerSession();
  if (!session?.user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  const subscription = await getUserSubscription(session.user.id);
  
  if (!subscription?.subscriptionId) {
    return Response.json({ error: 'No active subscription' }, { status: 400 });
  }
  
  // Cancel subscription (user keeps access until period ends)
  await zendfi.cancelSubscription(subscription.subscriptionId);
  
  return Response.json({ success: true });
}
```

```typescript
// components/ManageSubscriptionButton.tsx
'use client';

import { useState } from 'react';

export function ManageSubscriptionButton() {
  const [loading, setLoading] = useState(false);
  
  async function handleCancel() {
    if (!confirm('Are you sure you want to cancel your subscription?')) {
      return;
    }
    
    setLoading(true);
    
    try {
      await fetch('/api/cancel-subscription', { method: 'POST' });
      window.location.reload();
    } catch (error) {
      alert('Failed to cancel subscription');
    } finally {
      setLoading(false);
    }
  }
  
  return (
    <div className="subscription-actions">
      <a href="/pricing" className="button">Change Plan</a>
      <button onClick={handleCancel} disabled={loading}>
        {loading ? 'Cancelling...' : 'Cancel Subscription'}
      </button>
    </div>
  );
}
```


## Testing

```bash
# Test subscription creation
zendfi payment create --amount 29.99 --recurring monthly --open

# Listen for subscription webhooks
zendfi webhooks listen
```


## Production Checklist

- [ ] Switch to `zfi_live_` API key
- [ ] Test all subscription lifecycle events
- [ ] Set up grace period for failed payments
- [ ] Add email notifications for all events
- [ ] Implement usage tracking system
- [ ] Add subscription upgrade/downgrade flow
- [ ] Test cancellation and reactivation
- [ ] Set up dunning management for failed payments
- [ ] Add customer portal for self-service


## Complete Example

```bash
npx create-zendfi-app my-saas --template nextjs-saas
```

**Live Demo:** [saas.zendfi.tech](https://saas.zendfi.tech)


## Need Help?

- [Join Discord](https://discord.gg/zendfi)
- [Email support](mailto:support@zendfi.tech)
- [View Subscription API docs](https://docs.zendfi.tech/api/subscriptions)
