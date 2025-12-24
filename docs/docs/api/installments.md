---
sidebar_position: 4
title: Installment Plans
description: Split purchases into multiple payments over time
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Installment Plans

Let customers split purchases into manageable payments over time. Perfect for high-ticket items and services.

## How Installments Work

```
$1,000 Purchase → Split into 4 payments → $250 every 30 days
```

1. **Create plan** - Define total amount and number of installments
2. **Customer pays first** - First installment collected immediately
3. **Automatic billing** - Remaining installments collected on schedule
4. **Completion** - All installments paid, plan completed!

:::tip Increase Conversions
Offering installment plans can increase conversion rates by 20-30% for high-ticket items by lowering the barrier to purchase.
:::

## Features

- **Flexible Schedules** - Define payment frequency in days (7, 14, 30, etc.)
- **Automatic Billing** - ZendFi handles recurring collection
- **Grace Periods** - Configurable late payment handling (default: 7 days)
- **Late Fees** - Optional late payment fees


## Create Installment Plan

Create an installment plan for a purchase.

### Endpoint

```
POST /api/v1/installment-plans
```

### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `customer_wallet` | string | **Yes** | Customer's Solana wallet address |
| `customer_email` | string | No | Customer email for payment reminders |
| `total_amount` | number | **Yes** | Total purchase amount in USD |
| `installment_count` | number | **Yes** | Number of payments (2-24) |
| `payment_frequency_days` | number | **Yes** | Days between payments (e.g., 7, 14, 30) |
| `first_payment_date` | string | No | ISO 8601 date for first payment (default: now + 1 day) |
| `description` | string | No | Plan description |
| `late_fee_amount` | number | No | Late payment fee in USD |
| `grace_period_days` | number | No | Days before marking late (default: 7) |
| `metadata` | object | No | Custom key-value pairs |

### Example: 4-Month Plan

<Tabs groupId="sdk-language">
<TabItem value="sdk" label="TypeScript SDK" default>

```typescript
import { ZendFi } from '@zendfi/sdk';

const zendfi = new ZendFi();

const plan = await zendfi.createInstallmentPlan({
  customer_wallet: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
  customer_email: 'customer@example.com',
  total_amount: 1999,
  installment_count: 4,
  payment_frequency_days: 30, // Monthly
  description: '14-inch MacBook Pro with M3 Pro chip',
  grace_period_days: 5,
  late_fee_amount: 25,
  metadata: {
    product_sku: 'MBPM3PRO14',
    order_id: 'order_12345'
  }
});

console.log('Plan ID:', plan.plan_id);
console.log('Status:', plan.status); // "active"
```

</TabItem>
<TabItem value="rest" label="REST API">

```bash
curl -X POST https://api.zendfi.tech/api/v1/installment-plans \\
  -H "Authorization: Bearer zfi_live_abc123..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "customer_wallet": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
    "customer_email": "customer@example.com",
    "total_amount": 1999,
    "installment_count": 4,
    "payment_frequency_days": 30,
    "description": "14-inch MacBook Pro with M3 Pro chip",
    "grace_period_days": 5,
    "late_fee_amount": 25,
    "metadata": {
      "product_sku": "MBPM3PRO14",
      "order_id": "order_12345"
    }
  }'
```

</TabItem>
</Tabs>

**Response:**

```json
{
  "plan_id": "550e8400-e29b-41d4-a716-446655440000",
  "status": "active"
}
```

### Example: Weekly Payments

<Tabs groupId="sdk-language">
<TabItem value="sdk" label="TypeScript SDK" default>

```typescript
const plan = await zendfi.createInstallmentPlan({
  customer_wallet: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
  total_amount: 500,
  installment_count: 8,
  payment_frequency_days: 7, // Weekly
  description: 'Fitness course payment plan'
});

// 8 payments of $62.50 each, one per week
```

</TabItem>
<TabItem value="rest" label="REST API">

```bash
curl -X POST https://api.zendfi.tech/api/v1/installment-plans \\
  -H "Authorization: Bearer zfi_live_abc123..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "customer_wallet": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
    "total_amount": 500,
    "installment_count": 8,
    "payment_frequency_days": 7,
    "description": "Fitness course payment plan"
  }'
```

</TabItem>
</Tabs>


## Get Installment Plan

Retrieve details of an installment plan including payment schedule.

### Endpoint

```
GET /api/v1/installment-plans/:plan_id
```

### Example

<Tabs groupId="sdk-language">
<TabItem value="sdk" label="TypeScript SDK" default>

```typescript
const plan = await zendfi.getInstallmentPlan('550e8400-e29b-41d4-a716-446655440000');

console.log('Status:', plan.status);
console.log('Total:', plan.total_amount);
console.log('Paid:', plan.paid_count, 'of', plan.installment_count);
console.log('\\nPayment Schedule:');
plan.payment_schedule.forEach(payment => {
  console.log(`\${payment.installment_number}: $\${payment.amount} - \${payment.status}`);
});
```

</TabItem>
<TabItem value="rest" label="REST API">

```bash
curl -X GET https://api.zendfi.tech/api/v1/installment-plans/550e8400-e29b-41d4-a716-446655440000 \\
  -H "Authorization: Bearer zfi_live_abc123..."
```

</TabItem>
</Tabs>

**Response:**

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "merchant_id": "merchant_xyz789",
  "customer_wallet": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
  "customer_email": "customer@example.com",
  "total_amount": "1999.00",
  "installment_count": 4,
  "amount_per_installment": "499.75",
  "paid_count": 1,
  "status": "active",
  "description": "14-inch MacBook Pro with M3 Pro chip",
  "late_fee_amount": "25.00",
  "grace_period_days": 5,
  "payment_schedule": [
    {
      "installment_number": 1,
      "amount": "499.75",
      "due_date": "2025-10-26T14:00:00Z",
      "status": "paid",
      "payment_id": "pay_abc123",
      "paid_at": "2025-10-26T14:30:00Z"
    },
    {
      "installment_number": 2,
      "amount": "499.75",
      "due_date": "2025-11-26T14:00:00Z",
      "status": "pending",
      "payment_id": null,
      "paid_at": null
    },
    {
      "installment_number": 3,
      "amount": "499.75",
      "due_date": "2025-12-26T14:00:00Z",
      "status": "pending",
      "payment_id": null,
      "paid_at": null
    },
    {
      "installment_number": 4,
      "amount": "499.75",
      "due_date": "2026-01-26T14:00:00Z",
      "status": "pending",
      "payment_id": null,
      "paid_at": null
    }
  ],
  "metadata": {
    "product_sku": "MBPM3PRO14",
    "order_id": "order_12345"
  },
  "mode": "live",
  "created_at": "2025-10-26T13:00:00Z",
  "updated_at": "2025-10-26T14:30:00Z",
  "completed_at": null,
  "defaulted_at": null
}
```


## List Merchant's Installment Plans

Get all installment plans for the authenticated merchant.

### Endpoint

```
GET /api/v1/installment-plans?limit=:limit&offset=:offset
```

### Example

<Tabs groupId="sdk-language">
<TabItem value="sdk" label="TypeScript SDK" default>

```typescript
const plans = await zendfi.listInstallmentPlans({
  limit: 10,
  offset: 0
});

plans.forEach(plan => {
  console.log(`\${plan.description}: \${plan.status}`);
  console.log(`Progress: \${plan.paid_count}/\${plan.installment_count}`);
});
```

</TabItem>
<TabItem value="rest" label="REST API">

```bash
curl -X GET "https://api.zendfi.tech/api/v1/installment-plans?limit=10&offset=0" \\
  -H "Authorization: Bearer zfi_live_abc123..."
```

</TabItem>
</Tabs>


## List Customer Installments

Get all installment plans for a specific customer.

### Endpoint

```
GET /api/v1/customers/:customer_wallet/installment-plans
```

### Example

<Tabs groupId="sdk-language">
<TabItem value="sdk" label="TypeScript SDK" default>

```typescript
const plans = await zendfi.listCustomerInstallmentPlans(
  '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU'
);

plans.forEach(plan => {
  console.log(`\${plan.description}: \${plan.status}`);
  console.log(`Progress: \${plan.paid_count}/\${plan.installment_count}`);
});
```

</TabItem>
<TabItem value="rest" label="REST API">

```bash
curl -X GET "https://api.zendfi.tech/api/v1/customers/7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU/installment-plans" \\
  -H "Authorization: Bearer zfi_live_abc123..."
```

</TabItem>
</Tabs>


## Pay Current Installment

Generate a payment for the current due installment.

### Endpoint

```
POST /api/v1/installment-plans/:plan_id/pay
```

### Example

<Tabs groupId="sdk-language">
<TabItem value="sdk" label="TypeScript SDK" default>

```typescript
// Note: This creates a payment but returns the payment ID
// Customer must complete payment using the standard payment flow
const response = await fetch('https://api.zendfi.tech/api/v1/installment-plans/550e8400-e29b-41d4-a716-446655440000/pay', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer \${apiKey}`
  }
});

const data = await response.json();
console.log('Payment ID:', data.payment_id);
console.log('Payment URL:', `https://zendfi.tech/pay/\${data.payment_id}`);
```

</TabItem>
<TabItem value="rest" label="REST API">

```bash
curl -X POST https://api.zendfi.tech/api/v1/installment-plans/550e8400-e29b-41d4-a716-446655440000/pay \\
  -H "Authorization: Bearer zfi_live_abc123..."
```

**Response:**

```json
{
  "payment_id": "pay_inst_xyz789"
}
```

</TabItem>
</Tabs>

:::info Payment Flow
The `pay` endpoint creates a payment record and sends a reminder email to the customer. The customer completes payment using the standard ZendFi payment URL. When payment is confirmed, the installment is automatically marked as paid.
:::


## Cancel Installment Plan

Cancel an installment plan.

### Endpoint

```
POST /api/v1/installment-plans/:plan_id/cancel
```

### Example

<Tabs groupId="sdk-language">
<TabItem value="sdk" label="TypeScript SDK" default>

```typescript
await zendfi.cancelInstallmentPlan('550e8400-e29b-41d4-a716-446655440000');

console.log('Installment plan cancelled');
```

</TabItem>
<TabItem value="rest" label="REST API">

```bash
curl -X POST https://api.zendfi.tech/api/v1/installment-plans/550e8400-e29b-41d4-a716-446655440000/cancel \\
  -H "Authorization: Bearer zfi_live_abc123..."
```

</TabItem>
</Tabs>

:::warning No Refunds
Cancellation does not automatically refund paid installments. Handle refunds separately if needed.
:::


## Installment Plan Statuses

| Status | Description |
|--------|-------------|
| `active` | Plan is active, payments in progress |
| `completed` | All installments paid successfully |
| `cancelled` | Cancelled by merchant |
| `defaulted` | Customer defaulted (failed payment after grace period) |


## Installment Payment Statuses

Individual installment statuses within a plan:

| Status | Description |
|--------|-------------|
| `pending` | Payment not yet made, within due date |
| `paid` | Payment completed successfully |
| `late` | Payment overdue but within grace period |


## Automatic Payment Collection

ZendFi automatically handles installment collection:

1. **3 days before due** - Reminder email sent to customer
2. **On due date** - Payment link generated and emailed
3. **After due date** - Marked as `late`, daily reminders sent
4. **After grace period** - Plan marked as `defaulted`, webhooks fired

:::info Background Worker
An automatic background worker checks for overdue payments every hour and updates statuses accordingly.
:::


## Webhook Events

| Event | Description |
|-------|-------------|
| `InstallmentPaid` | Installment payment completed |
| `InstallmentLate` | Payment past due date (within grace period) |
| `InstallmentDefaulted` | Customer defaulted (after grace period) |
| `InstallmentPlanCompleted` | All installments paid |

### Example Webhook Payload

```json
{
  "event": "InstallmentPaid",
  "timestamp": "2025-11-26T14:05:00Z",
  "installment_plan": {
    "installment_plan_id": "550e8400-e29b-41d4-a716-446655440000",
    "merchant_id": "merchant_xyz789",
    "customer_wallet": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
    "total_amount": 1999.00,
    "total_installments": 4,
    "installment_number": 2,
    "installment_amount": 499.75,
    "paid_installments": 2,
    "status": "active"
  }
}
```


## Best Practices

### Setting Up Installment Plans

1. **Reasonable Terms** - 2-12 installments is typical for most purchases
2. **Clear Communication** - Show total cost and per-payment amount upfront
3. **Grace Periods** - 5-7 days is reasonable for most situations
4. **Late Fees** - Keep fees reasonable ($10-$50 depending on amount)

### Payment Frequency

Common patterns:
- **Weekly**: `payment_frequency_days: 7`
- **Bi-weekly**: `payment_frequency_days: 14`
- **Monthly**: `payment_frequency_days: 30`
- **Custom**: Any number of days

### Handling Late Payments

1. **Send reminders** - Automated reminders during grace period
2. **Grace period** - Give customers time to make late payments
3. **Late fees** - Discourage late payments with reasonable fees
4. **Default handling** - Mark as defaulted after grace period expires


## Next Steps

**Integration Guides:**
- [Next.js Integration](/developer-tools/nextjs-integration) - Complete setup for Next.js projects
- [Express Integration](/developer-tools/express-integration) - REST API server guide

**Related APIs:**
- [Payments API](/api/payments) - One-time payment creation
- [Subscriptions API](/api/subscriptions) - Recurring billing
- [Webhooks](/features/webhooks) - Installment event notifications

**Need Help?**
- [Discord Community](https://discord.gg/zendfi)
- [Email Support](mailto:support@zendfi.tech)
