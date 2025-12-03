---
sidebar_position: 2
title: Subscriptions API
description: Create recurring payment plans with automated billing
---

# Subscriptions API

Create recurring payment plans with automated billing cycles. Perfect for SaaS, memberships, and subscription services.

## Quick Start

1. Create a subscription plan with your pricing and billing interval
2. Subscribe customers using their wallet address
3. ZendFi automatically bills customers at each interval
4. Receive webhook events for all subscription lifecycle changes

**That's it!** No manual billing, no payment tracking - we handle everything automatically. 🎉

## Features

- ✅ **Flexible Billing Intervals** - Daily, weekly, monthly, or yearly
- ✅ **Free Trials** - Offer trial periods before billing starts
- ✅ **Automatic Billing** - Background worker handles all recurring charges
- ✅ **Cycle Limits** - Set maximum billing cycles or unlimited
- ✅ **Customer Tracking** - View all subscriptions per customer wallet
- ✅ **Webhook Events** - Real-time notifications for all lifecycle events

## Common Use Cases

| Use Case | Description |
|----------|-------------|
| 💼 **SaaS Platforms** | Monthly/yearly subscriptions for software access |
| 🎓 **Online Courses** | Monthly memberships for educational content |
| 🎮 **Gaming Services** | Premium memberships for game servers |
| 📰 **Content Creators** | Patreon-style subscriptions for exclusive content |

---

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
| `currency` | string | **Yes** | Currency code ("USD" only) |
| `billing_interval` | string | **Yes** | "daily", "weekly", "monthly", or "yearly" |
| `interval_count` | number | No | Number of intervals between charges (default: 1) |
| `trial_days` | number | No | Free trial days before first charge (default: 0) |
| `max_cycles` | number | No | Maximum billing cycles (null = unlimited) |
| `metadata` | object | No | Custom key-value pairs |

### Example: Monthly SaaS Plan with Trial

<TryIt method="POST" endpoint="/api/v1/subscription-plans" description="Create a monthly subscription plan with 14-day trial">

```bash
curl -X POST https://api.zendfi.tech/api/v1/subscription-plans \
  -H "Authorization: Bearer zfi_live_abc123..." \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Pro Plan - Monthly",
    "description": "Full access to all pro features",
    "amount": 29.99,
    "currency": "USD",
    "billing_interval": "monthly",
    "interval_count": 1,
    "trial_days": 14,
    "metadata": {
      "features": ["unlimited_api_calls", "priority_support", "advanced_analytics"],
      "tier": "pro"
    }
  }'
```

</TryIt>

**Response:**

```json
{
  "id": "plan_abc123def456",
  "merchant_id": "merchant_xyz789",
  "name": "Pro Plan - Monthly",
  "description": "Full access to all pro features",
  "amount": 29.99,
  "currency": "USD",
  "billing_interval": "monthly",
  "interval_count": 1,
  "trial_days": 14,
  "max_cycles": null,
  "is_active": true,
  "created_at": "2025-10-26T12:00:00Z",
  "subscription_url": "/subscribe/plan_abc123def456"
}
```

### Example: Annual Plan with Discount

<TryIt method="POST" endpoint="/api/v1/subscription-plans" description="Create an annual subscription plan">

```bash
curl -X POST https://api.zendfi.tech/api/v1/subscription-plans \
  -H "Authorization: Bearer zfi_live_abc123..." \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Pro Plan - Annual",
    "description": "Save 20% with annual billing!",
    "amount": 287.90,
    "currency": "USD",
    "billing_interval": "yearly",
    "interval_count": 1,
    "trial_days": 0,
    "metadata": {
      "annual_discount": "20%",
      "monthly_equivalent": 23.99
    }
  }'
```

</TryIt>

---

## List Subscription Plans

Get all subscription plans for your merchant account.

### Endpoint

```
GET /api/v1/subscription-plans
```

### Example

<TryIt method="GET" endpoint="/api/v1/subscription-plans" description="List all subscription plans">

```bash
curl -X GET https://api.zendfi.tech/api/v1/subscription-plans \
  -H "Authorization: Bearer zfi_live_abc123..."
```

</TryIt>

---

## Get Subscription Plan

Get details of a specific subscription plan. This is a **public endpoint** - no authentication required.

### Endpoint

```
GET /api/v1/subscription-plans/:plan_id
```

### Example

```bash
curl -X GET https://api.zendfi.tech/api/v1/subscription-plans/plan_abc123def456
```

---

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

<TryIt method="POST" endpoint="/api/v1/subscriptions" description="Subscribe a customer to a plan">

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

</TryIt>

**Response:**

```json
{
  "id": "sub_xyz789abc123",
  "plan_id": "plan_abc123def456",
  "plan_name": "Pro Plan - Monthly",
  "customer_wallet": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
  "status": "trialing",
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
If the plan has `trial_days > 0`, the subscription status will be `"trialing"` and `payment_url` will be `null`. The first payment happens automatically after the trial ends!
:::

---

## Get Subscription

Get details of a specific subscription.

### Endpoint

```
GET /api/v1/subscriptions/:id
```

### Example

```bash
curl -X GET https://api.zendfi.tech/api/v1/subscriptions/sub_xyz789abc123
```

**Response:**

```json
{
  "id": "sub_xyz789abc123",
  "plan_id": "plan_abc123def456",
  "plan_name": "Pro Plan - Monthly",
  "customer_wallet": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
  "status": "active",
  "current_period_start": "2025-11-09T12:10:00Z",
  "current_period_end": "2025-12-09T12:10:00Z",
  "next_payment_attempt": "2025-12-09T12:10:00Z",
  "cycles_completed": 1,
  "trial_end": null,
  "created_at": "2025-10-26T12:10:00Z",
  "payment_url": "https://zendfi.tech/subscription/sub_xyz789abc123/pay"
}
```

---

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
| `reason` | string | No | Cancellation reason for your records |

### Example: Cancel Immediately

<TryIt method="POST" endpoint="/api/v1/subscriptions/sub_xyz789abc123/cancel" description="Cancel a subscription immediately">

```bash
curl -X POST https://api.zendfi.tech/api/v1/subscriptions/sub_xyz789abc123/cancel \
  -H "Content-Type: application/json" \
  -d '{
    "cancel_at_period_end": false,
    "reason": "Customer requested cancellation"
  }'
```

</TryIt>

### Example: Cancel at Period End

```bash
curl -X POST https://api.zendfi.tech/api/v1/subscriptions/sub_xyz789abc123/cancel \
  -H "Content-Type: application/json" \
  -d '{
    "cancel_at_period_end": true,
    "reason": "Switching to annual plan"
  }'
```

---

## Subscription Statuses

| Status | Description | Action |
|--------|-------------|--------|
| `trialing` | In free trial period | Grant full access, remind of trial end date |
| `active` | Billing normally | Grant full access |
| `past_due` | Last payment failed | Show payment reminder, limited grace period |
| `paused` | Temporarily paused | Limited or no access |
| `cancelled` | Cancelled by customer/merchant | Revoke access, offer win-back incentives |
| `expired` | Reached max_cycles or natural end | Revoke access, offer renewal |

---

## Automatic Billing

ZendFi handles all subscription billing automatically. Our background worker:

1. Runs every hour to check for subscriptions with `next_payment_attempt` due
2. Creates a payment for the billing amount
3. Generates a payment link for the customer
4. Sends webhook event `subscription.payment_due`
5. On successful payment: Advances billing cycle and sends `subscription.renewed`
6. On failed payment: Marks subscription `past_due` and retries later

:::tip No Manual Work Required
You just create subscriptions and we handle everything else!
:::

---

## Webhook Events

| Event | Description |
|-------|-------------|
| `subscription.created` | Customer subscribed to a plan |
| `subscription.renewed` | Successful billing cycle payment |
| `subscription.payment_failed` | Payment failed |
| `subscription.cancelled` | Subscription cancelled |

### Example Webhook Payload

```json
{
  "event": "subscription.renewed",
  "timestamp": "2025-11-09T12:10:05Z",
  "data": {
    "subscription": {
      "id": "sub_xyz789abc123",
      "plan_id": "plan_abc123def456",
      "plan_name": "Pro Plan - Monthly",
      "customer_wallet": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
      "status": "active",
      "current_period_start": "2025-11-09T12:10:00Z",
      "current_period_end": "2025-12-09T12:10:00Z",
      "cycles_completed": 1
    },
    "payment_id": "pay_renewal_abc123"
  }
}
```

---

## Next Steps

1. **Set up your webhook URL** - Configure webhooks to receive subscription events
2. **Create your subscription plans** - Use the Create Plan endpoint to set up pricing tiers
3. **Let ZendFi handle the rest** - Automatic billing, payment collection, and renewal management

See the [Webhooks documentation](/features/webhooks) for setup details.
