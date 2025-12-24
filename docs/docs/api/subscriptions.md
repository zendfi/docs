---
sidebar_position: 2
title: Subscriptions API
description: Create recurring payment plans with automated billing
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Subscriptions API

Create recurring payment plans with automated billing cycles. Perfect for SaaS, memberships, and subscription services.

## Quick Start

1. Create a subscription plan with your pricing and billing interval
2. Subscribe customers using their wallet address
3. ZendFi automatically bills customers at each interval
4. Receive webhook events for all subscription lifecycle changes

**That's it!** No manual billing, no payment tracking - we handle everything automatically. 🎉

## Features

- **Flexible Billing Intervals** - Daily, weekly, monthly, or yearly
- **Free Trials** - Offer trial periods before billing starts
- **Automatic Billing** - Background worker handles all recurring charges
- **Cycle Limits** - Set maximum billing cycles or unlimited
- **Customer Tracking** - View all subscriptions per customer wallet
- **Webhook Events** - Real-time notifications for all lifecycle events

## Common Use Cases

| Use Case | Description |
|----------|-------------|
| **SaaS Platforms** | Monthly/yearly subscriptions for software access |
| **Online Courses** | Monthly memberships for educational content |
| **Gaming Services** | Premium memberships for game servers |
| **Content Creators** | Patreon-style subscriptions for exclusive content |


## Create Subscription Plan

Create a reusable subscription plan that customers can subscribe to.

### Endpoint

```
POST /api/v1/subscription-plans
```

### Authentication

```
Authorization: Bearer YOUR_API_KEY
```

### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | string | **Yes** | Plan name (e.g., "Premium Monthly") |
| `description` | string | No | Plan description |
| `amount` | number | **Yes** | Price per billing cycle in USD |
| `currency` | string | No | Currency code (default: "USD") |
| `interval` | string | **Yes** | "daily", "weekly", "monthly", or "yearly" |
| `interval_count` | number | No | Number of intervals between charges (default: 1) |
| `trial_days` | number | No | Free trial days before first charge (default: 0) |
| `metadata` | object | No | Custom key-value pairs |

### Example: Monthly SaaS Plan with Trial

<Tabs groupId="sdk-language">
<TabItem value="sdk" label="TypeScript SDK" default>

```typescript
import { ZendFiClient } from '@zendfi/sdk';

const zendfi = new ZendFiClient({
  apiKey: process.env.ZENDFI_API_KEY,
});

const plan = await zendfi.createSubscriptionPlan({
  name: 'Pro Plan - Monthly',
  description: 'Full access to all pro features',
  amount: 29.99,
  interval: 'monthly',
  interval_count: 1,
  trial_days: 14,
  metadata: {
    features: ['unlimited_api_calls', 'priority_support', 'advanced_analytics'],
    tier: 'pro',
  },
});

console.log('Plan ID:', plan.id);
console.log('Subscription URL:', plan.subscription_url);
```

</TabItem>
<TabItem value="rest" label="REST API">

```bash
curl -X POST https://api.zendfi.tech/api/v1/subscription-plans \
  -H "Authorization: Bearer zfi_live_abc123..." \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Pro Plan - Monthly",
    "description": "Full access to all pro features",
    "amount": 29.99,
    "currency": "USD",
    "interval": "monthly",
    "interval_count": 1,
    "trial_days": 14,
    "metadata": {
      "features": ["unlimited_api_calls", "priority_support", "advanced_analytics"],
      "tier": "pro"
    }
  }'
```

</TabItem>
</Tabs>

**Response:**

```json
{
  "id": "plan_abc123def456",
  "merchant_id": "merchant_xyz789",
  "name": "Pro Plan - Monthly",
  "description": "Full access to all pro features",
  "amount": 29.99,
  "currency": "USD",
  "billing_interval": "Monthly",
  "interval_count": 1,
  "trial_days": 14,
  "max_cycles": null,
  "is_active": true,
  "created_at": "2025-10-26T12:10:00Z",
  "subscription_url": "/subscribe/plan_abc123def456"
}
```

### Example: Annual Plan with Discount

<Tabs groupId="sdk-language">
<TabItem value="sdk" label="TypeScript SDK" default>

```typescript
const annualPlan = await zendfi.createSubscriptionPlan({
  name: 'Pro Plan - Annual',
  description: 'Save 20% with annual billing!',
  amount: 287.90,
  interval: 'yearly',
  metadata: {
    annual_discount: '20%',
    monthly_equivalent: 23.99,
  },
});

// Annual plan saves customers 20%
```

</TabItem>
<TabItem value="rest" label="REST API">

```bash
curl -X POST https://api.zendfi.tech/api/v1/subscription-plans \
  -H "Authorization: Bearer zfi_live_abc123..." \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Pro Plan - Annual",
    "description": "Save 20% with annual billing!",
    "amount": 287.90,
    "currency": "USD",
    "interval": "yearly",
    "interval_count": 1,
    "trial_days": 0,
    "metadata": {
      "annual_discount": "20%",
      "monthly_equivalent": 23.99
    }
  }'
```

</TabItem>
</Tabs>


## Get Subscription Plan

Get details of a specific subscription plan. This is a **public endpoint** - no authentication required.

### Endpoint

```
GET /api/v1/subscription-plans/:plan_id
```

### Example

<Tabs groupId="sdk-language">
<TabItem value="sdk" label="TypeScript SDK" default>

```typescript
const plan = await zendfi.getSubscriptionPlan('plan_abc123def456');

console.log('Plan:', plan.name);
console.log('Price:', `$${plan.amount}/${plan.billing_interval.toLowerCase()}`);
console.log('Trial:', plan.trial_days ? `${plan.trial_days} days` : 'No trial');
```

</TabItem>
<TabItem value="rest" label="REST API">

```bash
curl -X GET https://api.zendfi.tech/api/v1/subscription-plans/plan_abc123def456
```

</TabItem>
</Tabs>


## Subscribe Customer to Plan

Create a subscription for a customer on a specific plan.

### Endpoint

```
POST /api/v1/subscriptions
```

### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `plan_id` | UUID | **Yes** | Subscription plan ID |
| `customer_wallet` | string | **Yes** | Customer's Solana wallet address |
| `customer_email` | string | No | Customer's email for notifications |
| `metadata` | object | No | Custom key-value pairs |

### Example

<Tabs groupId="sdk-language">
<TabItem value="sdk" label="TypeScript SDK" default>

```typescript
const subscription = await zendfi.createSubscription({
  plan_id: 'plan_abc123def456',
  customer_wallet: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
  customer_email: 'customer@example.com',
  metadata: {
    user_id: 'user_12345',
    signup_source: 'landing_page',
  },
});

console.log('Subscription ID:', subscription.id);
console.log('Status:', subscription.status); // "Trialing" or "Active"
if (subscription.trial_end) {
  console.log('Trial ends:', subscription.trial_end);
}
```

</TabItem>
<TabItem value="rest" label="REST API">

```bash
curl -X POST https://api.zendfi.tech/api/v1/subscriptions \
  -H "Content-Type: application/json" \
  -d '{
    "plan_id": "plan_abc123def456",
    "customer_wallet": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
    "customer_email": "customer@example.com",
    "metadata": {
      "user_id": "user_12345",
      "signup_source": "landing_page"
    }
  }'
```

</TabItem>
</Tabs>

**Response:**

```json
{
  "id": "sub_xyz789abc123",
  "plan_id": "plan_abc123def456",
  "plan_name": "Pro Plan - Monthly",
  "customer_wallet": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
  "status": "Trialing",
  "current_period_start": "2025-10-26T12:10:00Z",
  "current_period_end": "2025-11-09T12:10:00Z",
  "next_payment_attempt": "2025-11-09T12:10:00Z",
  "cycles_completed": 0,
  "trial_end": "2025-11-09T12:10:00Z",
  "created_at": "2025-10-26T12:10:00Z",
  "payment_url": null
}
```

:::info Trial Period Behavior
If the plan has `trial_days > 0`, the subscription status will be `"Trialing"` and `payment_url` will be `null`. The first payment happens automatically after the trial ends!
:::


## Get Subscription

Get details of a specific subscription.

### Endpoint

```
GET /api/v1/subscriptions/:id
```

### Example

<Tabs groupId="sdk-language">
<TabItem value="sdk" label="TypeScript SDK" default>

```typescript
const subscription = await zendfi.getSubscription('sub_xyz789abc123');

console.log('Status:', subscription.status);
console.log('Next payment:', subscription.next_payment_attempt);
console.log('Cycles completed:', subscription.cycles_completed);
```

</TabItem>
<TabItem value="rest" label="REST API">

```bash
curl -X GET https://api.zendfi.tech/api/v1/subscriptions/sub_xyz789abc123
```

</TabItem>
</Tabs>

**Response:**

```json
{
  "id": "sub_xyz789abc123",
  "plan_id": "plan_abc123def456",
  "plan_name": "Pro Plan - Monthly",
  "customer_wallet": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
  "status": "Active",
  "current_period_start": "2025-11-09T12:10:00Z",
  "current_period_end": "2025-12-09T12:10:00Z",
  "next_payment_attempt": "2025-12-09T12:10:00Z",
  "cycles_completed": 1,
  "trial_end": null,
  "created_at": "2025-10-26T12:10:00Z",
  "payment_url": "https://checkout.zendfi.tech/subscription/sub_xyz789abc123/pay"
}
```


## Create Subscription Payment

Create a payment for a subscription's current billing cycle. Used by customers to pay their subscription bill.

### Endpoint

```
POST /api/v1/subscriptions/:id/pay
```

### Example

<Tabs groupId="sdk-language">
<TabItem value="sdk" label="TypeScript SDK" default>

```typescript
// Customer initiates payment for their subscription
const payment = await zendfi.request('POST', `/api/v1/subscriptions/${subscriptionId}/pay`);

console.log('Payment created:', payment.id);
console.log('Payment URL:', payment.payment_url);
```

</TabItem>
<TabItem value="rest" label="REST API">

```bash
curl -X POST https://api.zendfi.tech/api/v1/subscriptions/sub_xyz789abc123/pay
```

</TabItem>
</Tabs>

**Response:**

Returns a payment object with payment URL for the customer to complete payment.


## Cancel Subscription

Cancel a subscription immediately or at the end of the current billing period.

### Endpoint

```
POST /api/v1/subscriptions/:id/cancel
```

### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `cancel_at_period_end` | boolean | No | If true, continues until period ends (default: false) |
| `cancellation_reason` | string | No | Cancellation reason for your records |

### Example: Cancel Immediately

<Tabs groupId="sdk-language">
<TabItem value="sdk" label="TypeScript SDK" default>

```typescript
// Cancel immediately (SDK method doesn't support options - use direct request)
const response = await zendfi.cancelSubscription('sub_xyz789abc123');

console.log('Cancelled:', response);
```

</TabItem>
<TabItem value="rest" label="REST API">

```bash
curl -X POST https://api.zendfi.tech/api/v1/subscriptions/sub_xyz789abc123/cancel \
  -H "Content-Type: application/json" \
  -d '{
    "cancel_at_period_end": false,
    "cancellation_reason": "Customer requested cancellation"
  }'
```

</TabItem>
</Tabs>

### Example: Cancel at Period End

<Tabs groupId="sdk-language">
<TabItem value="sdk" label="TypeScript SDK" default>

```typescript
// Let customer finish the current billing period
// Use direct API request for full control
const response = await zendfi.request('POST', `/api/v1/subscriptions/${subscriptionId}/cancel`, {
  cancel_at_period_end: true,
  cancellation_reason: 'Switching to annual plan',
});

// Status remains "Active" until period ends
console.log('Will cancel at:', response.current_period_end);
```

</TabItem>
<TabItem value="rest" label="REST API">

```bash
curl -X POST https://api.zendfi.tech/api/v1/subscriptions/sub_xyz789abc123/cancel \
  -H "Content-Type: application/json" \
  -d '{
    "cancel_at_period_end": true,
    "cancellation_reason": "Switching to annual plan"
  }'
```

</TabItem>
</Tabs>


## Subscription Statuses

| Status | Description | Action |
|--------|-------------|--------|
| `Trialing` | In free trial period | Grant full access, remind of trial end date |
| `Active` | Billing normally | Grant full access |
| `PastDue` | Last payment failed | Show payment reminder, limited grace period |
| `Paused` | Temporarily paused | Limited or no access |
| `Cancelled` | Cancelled by customer/merchant | Revoke access, offer win-back incentives |
| `Expired` | Reached max_cycles or natural end | Revoke access, offer renewal |


## Automatic Billing

ZendFi handles all subscription billing automatically. Our background worker:

1. Runs every hour to check for subscriptions with `next_payment_attempt` due
2. Creates a payment for the billing amount
3. Generates a payment link for the customer
4. Sends webhook event `SubscriptionPaymentFailed` if payment fails
5. On successful payment: Advances billing cycle and sends `SubscriptionRenewed`
6. On failed payment: Marks subscription `PastDue` and retries later

:::tip No Manual Work Required
You just create subscriptions and we handle everything else!
:::


## Webhook Events

| Event | Description |
|-------|-------------|
| `SubscriptionCreated` | Customer subscribed to a plan |
| `SubscriptionRenewed` | Successful billing cycle payment |
| `SubscriptionPaymentFailed` | Payment failed |
| `SubscriptionCancelled` | Subscription cancelled |

### Example Webhook Payload

```json
{
  "event_type": "SubscriptionRenewed",
  "timestamp": "2025-11-09T12:10:05Z",
  "subscription": {
    "id": "sub_xyz789abc123",
    "plan_id": "plan_abc123def456",
    "plan_name": "Pro Plan - Monthly",
    "customer_wallet": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
    "status": "Active",
    "current_period_start": "2025-11-09T12:10:00Z",
    "current_period_end": "2025-12-09T12:10:00Z",
    "cycles_completed": 1,
    "next_payment_attempt": "2025-12-09T12:10:00Z",
    "trial_end": null,
    "created_at": "2025-10-26T12:10:00Z"
  }
}
```


## Next Steps

**Ready to integrate subscriptions?**
- [SaaS Subscription Guide](../use-cases/saas-subscriptions) - Complete tutorial
- [Next.js Integration](../developer-tools/nextjs-integration) - Framework guide
- [Express Integration](../developer-tools/express-integration) - REST API guide
- [Set up Webhooks](../features/webhooks) - Handle subscription events

**Explore more features:**
- [Payments API](./payments) - One-time payments
- [Payment Links API](./payment-links) - Reusable URLs
- [Invoices API](./invoices) - Send invoices

**Need help?**
- [Join Discord](https://discord.gg/zendfi)
- [Email support](mailto:support@zendfi.tech)
