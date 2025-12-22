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
$1,000 Purchase → Split into 4 payments → $250 due now + $250 × 3 months
```

1. **Create plan** - Define total amount and number of installments
2. **Customer pays first** - First installment collected immediately
3. **Automatic billing** - Remaining installments collected on schedule
4. **Completion** - All installments paid, plan completed!

:::tip Increase Conversions
Offering installment plans can increase conversion rates by 20-30% for high-ticket items by lowering the barrier to purchase.
:::

## Features

- **Flexible Schedules** - Weekly, bi-weekly, or monthly payments
- **Down Payments** - Require larger first payment if needed
- **Automatic Billing** - ZendFi handles recurring collection
- **Grace Periods** - Configurable late payment handling
- **Early Payoff** - Customers can pay remaining balance anytime


## Create Installment Plan

Create an installment plan for a purchase.

### Endpoint

```
POST /api/v1/installments
```

### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `title` | string | **Yes** | Plan title (e.g., "MacBook Pro Purchase") |
| `description` | string | No | Description |
| `total_amount` | number | **Yes** | Total purchase amount in USD |
| `currency` | string | **Yes** | Currency code ("USD" only) |
| `num_installments` | number | **Yes** | Number of payments (2-24) |
| `installment_interval` | string | **Yes** | "weekly", "biweekly", or "monthly" |
| `down_payment_amount` | number | No | Custom first payment (default: equal split) |
| `customer_wallet` | string | **Yes** | Customer's Solana wallet address |
| `customer_email` | string | No | Customer email for payment reminders |
| `grace_period_days` | number | No | Days before marking payment as late (default: 3) |
| `metadata` | object | No | Custom key-value pairs |

### Example: 4-Month Plan

<Tabs groupId="sdk-language">
<TabItem value="sdk" label="TypeScript SDK" default>

```typescript
import { ZendFi } from '@zendfi/sdk';

const zendfi = new ZendFi();

const plan = await zendfi.installments.create({
  title: 'MacBook Pro M3 Purchase',
  description: '14-inch MacBook Pro with M3 Pro chip',
  totalAmount: 1999,
  currency: 'USD',
  numInstallments: 4,
  installmentInterval: 'monthly',
  customerWallet: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
  customerEmail: 'customer@example.com',
  gracePeriodDays: 5,
  metadata: {
    product_sku: 'MBPM3PRO14',
    order_id: 'order_12345'
  }
});

console.log('Plan created:', plan.id);
console.log('Payment schedule:', plan.schedule);
console.log('First payment:', plan.installmentAmount);
console.log('Payment URL:', plan.paymentUrl);
```

</TabItem>
<TabItem value="rest" label="REST API">

```bash
curl -X POST https://api.zendfi.tech/api/v1/installments \
  -H "Authorization: Bearer zfi_live_abc123..." \
  -H "Content-Type: application/json" \
  -d '{
    "title": "MacBook Pro M3 Purchase",
    "description": "14-inch MacBook Pro with M3 Pro chip",
    "total_amount": 1999,
    "currency": "USD",
    "num_installments": 4,
    "installment_interval": "monthly",
    "customer_wallet": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
    "customer_email": "customer@example.com",
    "grace_period_days": 5,
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
  "id": "inst_abc123def456",
  "merchant_id": "merchant_xyz789",
  "title": "MacBook Pro M3 Purchase",
  "description": "14-inch MacBook Pro with M3 Pro chip",
  "total_amount": 1999,
  "currency": "USD",
  "num_installments": 4,
  "installment_interval": "monthly",
  "installment_amount": 499.75,
  "down_payment_amount": 499.75,
  "customer_wallet": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
  "customer_email": "customer@example.com",
  "status": "pending_first_payment",
  "paid_amount": 0,
  "remaining_amount": 1999,
  "installments_paid": 0,
  "grace_period_days": 5,
  "created_at": "2025-10-26T14:00:00Z",
  "schedule": [
    {
      "number": 1,
      "amount": 499.75,
      "due_date": "2025-10-26T14:00:00Z",
      "status": "pending"
    },
    {
      "number": 2,
      "amount": 499.75,
      "due_date": "2025-11-26T14:00:00Z",
      "status": "scheduled"
    },
    {
      "number": 3,
      "amount": 499.75,
      "due_date": "2025-12-26T14:00:00Z",
      "status": "scheduled"
    },
    {
      "number": 4,
      "amount": 499.75,
      "due_date": "2026-01-26T14:00:00Z",
      "status": "scheduled"
    }
  ],
  "payment_url": "https://zendfi.tech/installment/inst_abc123def456/pay"
}
```

### Example: Custom Down Payment

<Tabs groupId="sdk-language">
<TabItem value="sdk" label="TypeScript SDK" default>

```typescript
const plan = await zendfi.installments.create({
  title: 'Home Gym Equipment',
  totalAmount: 3000,
  currency: 'USD',
  numInstallments: 6,
  installmentInterval: 'monthly',
  downPaymentAmount: 500, // Custom down payment
  customerWallet: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU'
});

console.log('Down payment:', plan.downPaymentAmount); // 500
console.log('Remaining payments:', plan.installmentAmount); // 500 each
```

</TabItem>
<TabItem value="rest" label="REST API">

```bash
curl -X POST https://api.zendfi.tech/api/v1/installments \
  -H "Authorization: Bearer zfi_live_abc123..." \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Home Gym Equipment",
    "total_amount": 3000,
    "currency": "USD",
    "num_installments": 6,
    "installment_interval": "monthly",
    "down_payment_amount": 500,
    "customer_wallet": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU"
  }'
```

</TabItem>
</Tabs>

This creates:
- Down payment: $500 (due immediately)
- Remaining 5 payments: $500 each ($2,500 ÷ 5)

## Get Installment Plan

Retrieve details of an installment plan including payment schedule.

### Endpoint

```
GET /api/v1/installments/:id
```

### Example

<Tabs groupId="sdk-language">
<TabItem value="sdk" label="TypeScript SDK" default>

```typescript
const plan = await zendfi.installments.retrieve('inst_abc123def456');

console.log('Plan:', plan.title);
console.log('Status:', plan.status);
console.log('Paid:', plan.paidAmount, 'of', plan.totalAmount);
console.log('Remaining:', plan.remainingAmount);
console.log('\nPayment Schedule:');
plan.schedule.forEach(payment => {
  console.log(`${payment.number}: $${payment.amount} - ${payment.status}`);
});
```

</TabItem>
<TabItem value="rest" label="REST API">

```bash
curl -X GET https://api.zendfi.tech/api/v1/installments/inst_abc123def456 \
  -H "Authorization: Bearer zfi_live_abc123..."
```

</TabItem>
</Tabs>


## List Customer Installments

Get all installment plans for a specific customer.

### Endpoint

```
GET /api/v1/installments?customer_wallet=:wallet
```

### Example

<Tabs groupId="sdk-language">
<TabItem value="sdk" label="TypeScript SDK" default>

```typescript
const plans = await zendfi.installments.list({
  customerWallet: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU'
});

plans.forEach(plan => {
  console.log(`${plan.title}: ${plan.status}`);
  console.log(`Progress: ${plan.installmentsPaid}/${plan.numInstallments}`);
});
```

</TabItem>
<TabItem value="rest" label="REST API">

```bash
curl -X GET "https://api.zendfi.tech/api/v1/installments?customer_wallet=7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU" \
  -H "Authorization: Bearer zfi_live_abc123..."
```

</TabItem>
</Tabs>


## Pay Current Installment

Process payment for the current due installment.

### Endpoint

```
POST /api/v1/installments/:id/pay
```

### Example

<Tabs groupId="sdk-language">
<TabItem value="sdk" label="TypeScript SDK" default>

```typescript
const payment = await zendfi.installments.pay('inst_abc123def456');

console.log('Payment created:', payment.paymentId);
console.log('Amount:', payment.amount);
console.log('Installment number:', payment.installmentNumber);
console.log('Payment URL:', payment.paymentUrl);
```

**Response:**

```json
{
  "installment_id": "inst_abc123def456",
  "payment_id": "pay_inst_xyz789",
  "payment_url": "https://zendfi.tech/pay/pay_inst_xyz789",
  "amount": 499.75,
  "installment_number": 2,
  "due_date": "2025-11-26T14:00:00Z"
}
```

</TabItem>
<TabItem value="rest" label="REST API">

```bash
curl -X POST https://api.zendfi.tech/api/v1/installments/inst_abc123def456/pay \
  -H "Authorization: Bearer zfi_live_abc123..."
```

**Response:**

```json
{
  "installment_id": "inst_abc123def456",
  "payment_id": "pay_inst_xyz789",
  "payment_url": "https://zendfi.tech/pay/pay_inst_xyz789",
  "amount": 499.75,
  "installment_number": 2,
  "due_date": "2025-11-26T14:00:00Z"
}
```

</TabItem>
</Tabs>


## Pay Off Early

Allow customer to pay remaining balance in full.

### Endpoint

```
POST /api/v1/installments/:id/payoff
```

### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `discount_percent` | number | No | Optional early payoff discount (0-100) |

### Example: Early Payoff with Discount

<Tabs groupId="sdk-language">
<TabItem value="sdk" label="TypeScript SDK" default>

```typescript
const payoff = await zendfi.installments.payoff('inst_abc123def456', {
  discountPercent: 5 // 5% discount for early payoff
});

console.log('Original remaining:', payoff.originalRemaining);
console.log('Discount:', payoff.discountAmount);
console.log('Payoff amount:', payoff.payoffAmount);
console.log('Payment URL:', payoff.paymentUrl);
```

**Response:**

```json
{
  "installment_id": "inst_abc123def456",
  "original_remaining": 1499.25,
  "discount_percent": 5,
  "discount_amount": 74.96,
  "payoff_amount": 1424.29,
  "payment_id": "pay_payoff_xyz789",
  "payment_url": "https://zendfi.tech/pay/pay_payoff_xyz789"
}
```

</TabItem>
<TabItem value="rest" label="REST API">

```bash
curl -X POST https://api.zendfi.tech/api/v1/installments/inst_abc123def456/payoff \
  -H "Authorization: Bearer zfi_live_abc123..." \
  -H "Content-Type: application/json" \
  -d '{
    "discount_percent": 5
  }'
```

**Response:**

```json
{
  "installment_id": "inst_abc123def456",
  "original_remaining": 1499.25,
  "discount_percent": 5,
  "discount_amount": 74.96,
  "payoff_amount": 1424.29,
  "payment_id": "pay_payoff_xyz789",
  "payment_url": "https://zendfi.tech/pay/pay_payoff_xyz789"
}
```

</TabItem>
</Tabs>

:::tip Early Payoff Incentives
Offering a small discount for early payoff (3-5%) can improve your cash flow and reduce collection overhead!
:::


## Cancel Installment Plan

Cancel an installment plan. Only available for plans with pending first payment.

### Endpoint

```
POST /api/v1/installments/:id/cancel
```

### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `reason` | string | No | Cancellation reason |
| `refund_paid` | boolean | No | Whether to refund any paid installments (default: false) |

### Example

<Tabs groupId="sdk-language">
<TabItem value="sdk" label="TypeScript SDK" default>

```typescript
await zendfi.installments.cancel('inst_abc123def456', {
  reason: 'Customer cancelled order',
  refundPaid: true
});

console.log('Installment plan cancelled');
```

</TabItem>
<TabItem value="rest" label="REST API">

```bash
curl -X POST https://api.zendfi.tech/api/v1/installments/inst_abc123def456/cancel \
  -H "Authorization: Bearer zfi_live_abc123..." \
  -H "Content-Type: application/json" \
  -d '{
    "reason": "Customer cancelled order",
    "refund_paid": true
  }'
```

</TabItem>
</Tabs>

## Installment Plan Statuses

| Status | Description |
|--------|-------------|
| `pending_first_payment` | Created, waiting for down payment |
| `active` | First payment made, plan in progress |
| `current` | All payments on time |
| `past_due` | Payment overdue (within grace period) |
| `delinquent` | Payment significantly overdue |
| `completed` | All installments paid |
| `cancelled` | Cancelled by merchant |
| `defaulted` | Customer defaulted on payments |


## Installment Statuses

| Status | Description |
|--------|-------------|
| `scheduled` | Future payment, not yet due |
| `pending` | Current payment due |
| `paid` | Payment completed |
| `late` | Paid after due date |
| `failed` | Payment attempt failed |
| `waived` | Waived by merchant |


## Automatic Payment Collection

ZendFi automatically handles installment collection:

1. **3 days before due** - Reminder email sent to customer
2. **On due date** - Payment link generated and emailed
3. **Within grace period** - Daily reminders
4. **After grace period** - Plan marked as delinquent, webhooks fired

:::info Manual Payment Links
You can also generate payment links manually using the `/pay` endpoint for customers who prefer to pay early or outside of automated emails.
:::


## Webhook Events

| Event | Description |
|-------|-------------|
| `installment.created` | New installment plan created |
| `installment.first_payment` | Down payment received |
| `installment.payment_due` | Installment payment is due |
| `installment.payment_received` | Installment payment completed |
| `installment.payment_late` | Payment past due date |
| `installment.completed` | All installments paid |
| `installment.defaulted` | Customer defaulted |

### Example Webhook Payload

```json
{
  "event": "installment.payment_received",
  "timestamp": "2025-11-26T14:05:00Z",
  "data": {
    "installment_plan_id": "inst_abc123def456",
    "installment_number": 2,
    "amount": 499.75,
    "customer_wallet": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
    "paid_amount": 999.50,
    "remaining_amount": 999.50,
    "installments_remaining": 2,
    "next_due_date": "2025-12-26T14:00:00Z",
    "transaction_signature": "5K2Nz...abc123"
  }
}
```


## Best Practices

### Setting Up Installment Plans

1. **Reasonable Terms** - 2-12 months is typical for most purchases
2. **Clear Communication** - Show total cost and per-payment amount upfront
3. **Grace Periods** - 3-7 days is reasonable for most situations
4. **Down Payments** - 10-25% down payment reduces default risk

### Handling Delinquent Accounts

1. **Send reminders** - Automated reminders before marking as delinquent
2. **Offer solutions** - Payment extensions, revised schedules
3. **Document everything** - Keep records of all communications
4. **Know your options** - Refund and cancel vs pursue collection


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
