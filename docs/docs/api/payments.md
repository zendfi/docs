---
sidebar_position: 1
title: Payments API
description: Create and manage crypto payments with ZendFi
---

# Payments API

Accept crypto payments from customers with instant settlement to your wallet. Support for USDC, SOL, and USDT on Solana.

## Overview

ZendFi payments support:
- **Multiple tokens**: USDC, SOL, USDT
- **Instant settlement**: Funds arrive directly in your wallet
- **QR codes**: Mobile wallet support via Solana Pay
- **Pay-what-you-want**: Flexible pricing for donations and tips
- **Payment splits**: Revenue sharing between multiple wallets
- **Idempotency**: Safe retry handling

## Create Payment

Create a new payment request with QR code and checkout page.

### Endpoint

```
POST /api/v1/payments
```

### Authentication

```
Authorization: Bearer YOUR_API_KEY
```

### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `amount` | number | **Yes** | Payment amount in USD |
| `currency` | string | **Yes** | Currency code ("USD" only) |
| `token` | string | No | Token: "USDC", "SOL", "USDT" (default: "USDC") |
| `description` | string | No | Payment description |
| `metadata` | object | No | Custom key-value pairs |
| `webhook_url` | string | No | Override default webhook URL |
| `settlement_preference_override` | string | No | "auto_usdc" or "direct_token" |
| `allow_custom_amount` | boolean | No | Enable pay-what-you-want |
| `minimum_amount` | number | No | Minimum amount (for PWYW) |
| `maximum_amount` | number | No | Maximum amount (for PWYW) |
| `suggested_amount` | number | No | Suggested amount (for PWYW) |
| `split_recipients` | array | No | Payment split configuration |

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Payment identifier |
| `amount` | number | Payment amount in USD |
| `currency` | string | Currency code |
| `status` | string | Payment status |
| `qr_code` | string | Solana Pay URI for QR codes |
| `payment_url` | string | Checkout page URL |
| `expires_at` | datetime | Payment expiration (15 minutes) |
| `mode` | string | "test" or "live" |
| `settlement_info` | object | Settlement details (optional) |
| `split_ids` | array | Split IDs if splits configured |

### Example: Simple USDC Payment

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId="sdk-language">
<TabItem value="sdk" label="TypeScript SDK" default>

```typescript
import { zendfi } from '@zendfi/sdk';

const payment = await zendfi.createPayment({
  amount: 49.99,
  currency: 'USD',
  token: 'USDC',
  description: 'Pro Plan - Monthly Subscription',
  metadata: {
    order_id: 'ORD-12345',
    plan: 'pro_monthly',
  },
});

console.log('Payment ID:', payment.id);
console.log('Checkout URL:', payment.payment_url);
console.log('Status:', payment.status); // "Pending"
```

</TabItem>
<TabItem value="rest" label="REST API">

```bash
curl -X POST https://api.zendfi.tech/api/v1/payments \
  -H "Authorization: Bearer zfi_live_abc123..." \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 49.99,
    "currency": "USD",
    "token": "USDC",
    "description": "Pro Plan - Monthly Subscription",
    "metadata": {
      "order_id": "ORD-12345",
      "plan": "pro_monthly"
    }
  }'
```

</TabItem>
</Tabs>

**Response:**

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "amount": 49.99,
  "currency": "USD",
  "status": "Pending",
  "qr_code": "solana:7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU?amount=49.99&spl-token=EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
  "payment_url": "https://zendfi.tech/pay/550e8400-e29b-41d4-a716-446655440000",
  "expires_at": "2025-10-26T12:15:00Z",
  "mode": "live"
}
```

### Example: SOL Payment

<Tabs groupId="sdk-language">
<TabItem value="sdk" label="TypeScript SDK" default>

```typescript
const payment = await zendfi.createPayment({
  amount: 100.00,
  currency: 'USD',
  token: 'SOL',
  description: 'NFT Minting Fee',
});

console.log('Payment URL:', payment.payment_url);
console.log('Amount:', payment.amount); // 100.00
```

</TabItem>
<TabItem value="rest" label="REST API">

```bash
curl -X POST https://api.zendfi.tech/api/v1/payments \
  -H "Authorization: Bearer zfi_live_abc123..." \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 100.00,
    "currency": "USD",
    "token": "SOL",
    "description": "NFT Minting Fee"
  }'
```

</TabItem>
</Tabs>

**Response:**

```json
{
  "id": "660e8400-e29b-41d4-a716-446655440001",
  "amount": 100.00,
  "currency": "USD",
  "status": "Pending",
  "qr_code": "solana:7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU?amount=0.5263",
  "payment_url": "https://zendfi.tech/pay/660e8400-e29b-41d4-a716-446655440001",
  "expires_at": "2025-10-26T12:15:00Z",
  "mode": "live"
}
```

:::info SOL Price Conversion
When using SOL, the amount is converted at the current SOL/USD rate. The rate is locked for the 15-minute payment window.
:::

## Get Payment

Retrieve details of an existing payment.

### Endpoint

```
GET /api/v1/payments/:id
```

### Example

<Tabs groupId="sdk-language">
<TabItem value="sdk" label="TypeScript SDK" default>

```typescript
const payment = await zendfi.getPayment('550e8400-e29b-41d4-a716-446655440000');

console.log('Status:', payment.status);
console.log('Amount:', payment.amount_usd);

if (payment.status === 'Confirmed') {
  console.log('Transaction:', payment.transaction_signature);
  console.log('Confirmed at:', payment.confirmed_at);
}
```

</TabItem>
<TabItem value="rest" label="REST API">

```bash
curl https://api.zendfi.tech/api/v1/payments/550e8400-e29b-41d4-a716-446655440000 \
  -H "Authorization: Bearer zfi_live_abc123..."
```

</TabItem>
</Tabs>

**Response:**

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "merchant_id": "merchant_xyz789",
  "amount_usd": 49.99,
  "status": "Confirmed",
  "transaction_signature": "5KzZ8LWvZh7NYjJvPhHGYnNrB2rKqb2...",
  "customer_wallet": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
  "metadata": {
    "order_id": "ORD-12345"
  },
  "created_at": "2025-10-26T12:00:00Z",
  "expires_at": "2025-10-26T12:15:00Z"
}
```

## List Payments

Get all payments with pagination and filters.

### Endpoint

```
GET /api/v1/payments
```

### Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `page` | number | Page number (default: 1) |
| `limit` | number | Results per page (default: 20, max: 100) |
| `status` | string | Filter by status |
| `from_date` | string | Start date (ISO 8601) |
| `to_date` | string | End date (ISO 8601) |

### Example

<Tabs groupId="sdk-language">
<TabItem value="sdk" label="TypeScript SDK" default>

```typescript
const result = await zendfi.listPayments({
  page: 1,
  limit: 50,
  status: 'Confirmed',
  from_date: '2025-01-01',
  to_date: '2025-12-31',
});

console.log(`Found ${result.pagination.total} payments`);
result.data.forEach(payment => {
  console.log(`${payment.id}: $${payment.amount_usd} - ${payment.status}`);
});
```

</TabItem>
<TabItem value="rest" label="REST API">

```bash
curl "https://api.zendfi.tech/api/v1/payments?page=1&limit=50&status=Confirmed" \
  -H "Authorization: Bearer zfi_live_abc123..."
```

</TabItem>
</Tabs>

**Response:**

```json
{
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "amount_usd": 49.99,
      "status": "Confirmed",
      "created_at": "2025-10-26T12:00:00Z"
    },
    {
      "id": "660e8400-e29b-41d4-a716-446655440001",
      "amount_usd": 100.00,
      "status": "Confirmed",
      "created_at": "2025-10-25T10:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 50,
    "total": 247,
    "total_pages": 5
  }
}
```

## Get Payment Status

Check payment status without authentication (public endpoint).

### Endpoint

```
GET /api/v1/payments/:id/status
```

### Example

```bash
curl https://api.zendfi.tech/api/v1/payments/550e8400-e29b-41d4-a716-446655440000/status
```

**Response:**

```json
{
  "payment_id": "550e8400-e29b-41d4-a716-446655440000",
  "status": "Confirmed",
  "timestamp": "2025-10-26T12:05:00Z"
}
```

## Payment Statuses

| Status | Description |
|--------|-------------|
| `Pending` | Payment created, waiting for customer |
| `Confirmed` | Payment successful! |
| `Failed` | Payment failed or rejected |
| `Expired` | 15-minute window expired |

## Pay-What-You-Want (PWYW)

Enable flexible pricing for donations, tips, or suggested pricing.

### Request Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `allow_custom_amount` | boolean | Enable PWYW mode |
| `minimum_amount` | number | Minimum accepted amount |
| `maximum_amount` | number | Maximum accepted amount |
| `suggested_amount` | number | Default suggested amount |

### Example

<Tabs groupId="sdk-language">
<TabItem value="sdk" label="TypeScript SDK" default>

```typescript
const payment = await zendfi.createPayment({
  currency: 'USD',
  token: 'USDC',
  description: 'Support our project! ☕',
  allow_custom_amount: true,
  minimum_amount: 1.00,
  maximum_amount: 1000.00,
  suggested_amount: 5.00,
  amount: 5.00, // Required but used as default
});

// Customer can choose any amount between $1-$1000
// Default suggestion is $5
```

</TabItem>
<TabItem value="rest" label="REST API">

```bash
curl -X POST https://api.zendfi.tech/api/v1/payments \
  -H "Authorization: Bearer zfi_live_abc123..." \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 5.00,
    "currency": "USD",
    "token": "USDC",
    "description": "Support our project! ☕",
    "allow_custom_amount": true,
    "minimum_amount": 1.00,
    "maximum_amount": 1000.00,
    "suggested_amount": 5.00
  }'
```

</TabItem>
</Tabs>

## Payment Splits

Split payments between multiple recipients automatically.

### Split Configuration

| Field | Type | Description |
|-------|------|-------------|
| `recipient_wallet` | string | Solana wallet address |
| `percentage` | number | Split percentage (0.01 to 100) |
| `description` | string | Split description |

:::warning Split Rules
- Total percentages must equal exactly 100%
- Each percentage must be between 0.01% and 100%
- Maximum 10 recipients per payment
:::

### Example: 80/20 Split

<Tabs groupId="sdk-language">
<TabItem value="sdk" label="TypeScript SDK" default>

```typescript
const payment = await zendfi.createPayment({
  amount: 100.00,
  currency: 'USD',
  token: 'USDC',
  description: 'Marketplace Purchase',
  split_recipients: [
    {
      recipient_wallet: 'SellerWallet123...',
      percentage: 80,
      description: 'Seller',
    },
    {
      recipient_wallet: 'PlatformWallet456...',
      percentage: 20,
      description: 'Platform Fee',
    },
  ],
});

// Seller gets $80, Platform gets $20 automatically
```

</TabItem>
<TabItem value="rest" label="REST API">

```bash
curl -X POST https://api.zendfi.tech/api/v1/payments \
  -H "Authorization: Bearer zfi_live_abc123..." \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 100.00,
    "currency": "USD",
    "token": "USDC",
    "description": "Marketplace Purchase",
    "split_recipients": [
      {
        "recipient_wallet": "SellerWallet123...",
        "percentage": 80,
        "description": "Seller"
      },
      {
        "recipient_wallet": "PlatformWallet456...",
        "percentage": 20,
        "description": "Platform Fee"
      }
    ]
  }'
```

</TabItem>
</Tabs>

### Get Payment Splits

Retrieve split details for a payment.

### Endpoint

```
GET /api/v1/payments/:payment_id/splits
```

### Example

```bash
curl https://api.zendfi.tech/api/v1/payments/550e8400-e29b-41d4-a716-446655440000/splits \
  -H "Authorization: Bearer zfi_live_abc123..."
```

**Response:**

```json
{
  "splits": [
    {
      "id": "split_abc123",
      "recipient_wallet": "SellerWallet123...",
      "percentage": 80,
      "amount": 80.00,
      "status": "completed"
    },
    {
      "id": "split_xyz789",
      "recipient_wallet": "PlatformWallet456...",
      "percentage": 20,
      "amount": 20.00,
      "status": "completed"
    }
  ]
}
```

## Idempotency

Prevent duplicate payments with idempotency keys.

<Tabs groupId="sdk-language">
<TabItem value="sdk" label="TypeScript SDK" default>

```typescript
// SDK automatically handles idempotency
const payment = await zendfi.createPayment({
  amount: 49.99,
  currency: 'USD',
  description: 'Order #12345',
});

// Safe to retry - SDK prevents duplicates automatically
```

</TabItem>
<TabItem value="rest" label="REST API">

```bash
curl -X POST https://api.zendfi.tech/api/v1/payments \
  -H "Authorization: Bearer zfi_live_abc123..." \
  -H "Content-Type: application/json" \
  -H "Idempotency-Key: order_12345_attempt_1" \
  -d '{
    "amount": 49.99,
    "currency": "USD",
    "token": "USDC",
    "description": "Order #12345"
  }'
```

</TabItem>
</Tabs>

:::tip Idempotency Best Practices
- Use unique keys per payment intent (e.g., `order_id + timestamp`)
- Keys are valid for 24 hours
- Retrying with the same key returns the original payment
- Use `Idempotency-Key` header, not request body
:::

## Build Transaction (Advanced)

Get the raw Solana transaction to sign in your own wallet.

### Endpoint

```
POST /api/v1/payments/:payment_id/build-transaction
```

### Request

```bash
curl -X POST https://api.zendfi.tech/api/v1/payments/550e8400-e29b-41d4-a716-446655440000/build-transaction \
  -H "Content-Type: application/json" \
  -d '{
    "payer_wallet": "CustomerWalletAddress..."
  }'
```

### Response

```json
{
  "transaction": "AQAAAAAAAAAAAAAAAAAAAAABAAEDAw...",
  "message": "Base64 encoded transaction ready for signing"
}
```

## Webhook Events

Payment-related webhook events:

| Event | Description |
|-------|-------------|
| `PaymentCreated` | New payment created |
| `PaymentConfirmed` | Payment successful! |
| `PaymentFailed` | Payment failed |
| `PaymentExpired` | Payment window expired |

See the [Webhooks documentation](/features/webhooks) for complete details.

## Code Examples

### Node.js with SDK

```typescript
import { zendfi } from '@zendfi/sdk';

// Zero-config: API key auto-loaded from ZENDFI_API_KEY env var

// Create payment
const payment = await zendfi.createPayment({
  amount: 49.99,
  currency: 'USD',
  description: 'Pro Plan',
  metadata: {
    order_id: 'ORD-12345'
  }
});

// Get payment status
const status = await zendfi.getPayment(payment.id);
console.log(`Status: ${status.status}`);

// List payments
const payments = await zendfi.listPayments({
  page: 1,
  limit: 20,
  status: 'Confirmed'
});
console.log(`Found ${payments.pagination.total} payments`);
```

### Python

```python
import requests

ZENDFI_API_KEY = "zfi_live_abc123..."
BASE_URL = "https://api.zendfi.tech"

# Create payment
response = requests.post(
    f"{BASE_URL}/api/v1/payments",
    headers={
        "Authorization": f"Bearer {ZENDFI_API_KEY}",
        "Content-Type": "application/json"
    },
    json={
        "amount": 49.99,
        "currency": "USD",
        "token": "USDC",
        "description": "Pro Plan"
    }
)

payment = response.json()
print(f"Payment URL: {payment['payment_url']}")
```

## Next Steps

**Ready to integrate payments?**
- [Next.js Integration](../developer-tools/nextjs-integration) - Complete Next.js guide
- [Express Integration](../developer-tools/express-integration) - REST API guide
- [Set up Webhooks](../features/webhooks) - Handle payment events

**Explore more features:**
- [Subscriptions API](./subscriptions) - Recurring billing
- [Payment Links API](./payment-links) - Reusable URLs
- [Invoices API](./invoices) - Send invoices

**Need help?**
- [Join Discord](https://discord.gg/zendfi)
- [Email support](mailto:support@zendfi.tech)
