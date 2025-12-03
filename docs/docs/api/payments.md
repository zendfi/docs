---
sidebar_position: 1
title: Payments API
description: Create and manage crypto payments with ZendFi
---

# Payments API

The Payments API is the core of ZendFi - it's how you accept crypto payments from your customers. This guide covers everything from creating simple payments to advanced features like pay-what-you-want pricing and payment splits.

## Overview

ZendFi payments support:
- **Multiple tokens**: USDC, SOL, USDT
- **Instant settlement**: Funds arrive directly in your wallet
- **QR codes**: Mobile wallet support via Solana Pay
- **Pay-what-you-want**: Flexible pricing for donations and tips
- **Payment splits**: Revenue sharing between multiple wallets
- **Idempotency**: Safe retry handling

## Create Payment

Create a new payment request that customers can pay via QR code or payment link.

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
| `amount` | number | **Yes** | Payment amount in USD (min: 0.01, max: 10,000) |
| `currency` | string | **Yes** | Currency code (currently only "USD") |
| `token` | string | No | Token to receive: "USDC", "SOL", "USDT" (default: "USDC") |
| `description` | string | No | Payment description shown to customer |
| `customer_email` | string | No | Customer's email for receipts |
| `customer_name` | string | No | Customer's name |
| `metadata` | object | No | Custom key-value pairs (max 16KB) |
| `idempotency_key` | string | No | Unique key for idempotent requests |
| `redirect_url` | string | No | URL to redirect after successful payment |
| `splits` | array | No | Payment split configuration |

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `payment_id` | string | Unique payment identifier |
| `merchant_name` | string | Your business name |
| `amount_usd` | number | Payment amount in USD |
| `amount_token` | number | Amount in selected token |
| `token` | string | Token type |
| `status` | string | Payment status |
| `payment_url` | string | URL for payment page |
| `qr_code` | string | Solana Pay URI for QR codes |
| `wallet_address` | string | Destination wallet address |
| `expires_at` | datetime | Payment expiration (15 minutes) |
| `created_at` | datetime | Creation timestamp |

### Example: Simple USDC Payment

<TryIt method="POST" endpoint="/api/v1/payments" description="Create a new USDC payment">

```bash
curl -X POST https://api.zendfi.tech/api/v1/payments \
  -H "Authorization: Bearer zfi_live_abc123..." \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 49.99,
    "currency": "USD",
    "token": "USDC",
    "description": "Pro Plan - Monthly Subscription",
    "customer_email": "customer@example.com",
    "metadata": {
      "order_id": "ORD-12345",
      "plan": "pro_monthly"
    }
  }'
```

</TryIt>

**Response:**

```json
{
  "payment_id": "pay_abc123xyz789",
  "merchant_name": "My Awesome Store",
  "amount_usd": 49.99,
  "amount_token": 49.99,
  "token": "USDC",
  "currency": "USD",
  "description": "Pro Plan - Monthly Subscription",
  "status": "pending",
  "payment_url": "https://zendfi.tech/pay/pay_abc123xyz789",
  "qr_code": "solana:7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU?amount=49.99&spl-token=EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v&reference=pay_abc123xyz789&label=My%20Awesome%20Store&message=Pro%20Plan%20-%20Monthly%20Subscription",
  "wallet_address": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
  "expires_at": "2025-10-26T12:15:00Z",
  "created_at": "2025-10-26T12:00:00Z",
  "solana_network": "mainnet-beta"
}
```

### Example: SOL Payment

<TryIt method="POST" endpoint="/api/v1/payments" description="Create a payment in SOL">

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

</TryIt>

**Response:**

```json
{
  "payment_id": "pay_sol123xyz",
  "amount_usd": 100.00,
  "amount_token": 0.5263,
  "token": "SOL",
  "status": "pending",
  "payment_url": "https://zendfi.tech/pay/pay_sol123xyz",
  "qr_code": "solana:7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU?amount=0.5263&reference=pay_sol123xyz",
  "expires_at": "2025-10-26T12:15:00Z"
}
```

:::info SOL Price Conversion
When using SOL, the `amount_token` is calculated at the current SOL/USD rate. The rate is locked for the 15-minute payment window.
:::

## Get Payment

Retrieve details of an existing payment.

### Endpoint

```
GET /api/v1/payments/:payment_id
```

### Example

<TryIt method="GET" endpoint="/api/v1/payments/pay_abc123xyz789" description="Retrieve payment details">

```bash
curl https://api.zendfi.tech/api/v1/payments/pay_abc123xyz789 \
  -H "Authorization: Bearer zfi_live_abc123..."
```

</TryIt>

**Response:**

```json
{
  "payment_id": "pay_abc123xyz789",
  "amount_usd": 49.99,
  "token": "USDC",
  "status": "confirmed",
  "transaction_signature": "5KzZ8LWvZh7NYjJvPhHGYnNrB2rKqb2...",
  "confirmed_at": "2025-10-26T12:05:00Z",
  "created_at": "2025-10-26T12:00:00Z"
}
```

## Payment Statuses

| Status | Description |
|--------|-------------|
| `pending` | Payment created, waiting for customer |
| `confirming` | Transaction detected, awaiting confirmation |
| `confirmed` | Payment successful! ✅ |
| `failed` | Payment failed or rejected |
| `expired` | 15-minute window expired |
| `refunded` | Payment was refunded |

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

<TryIt method="POST" endpoint="/api/v1/payments" description="Create a pay-what-you-want payment">

```bash
curl -X POST https://api.zendfi.tech/api/v1/payments \
  -H "Authorization: Bearer zfi_live_abc123..." \
  -H "Content-Type: application/json" \
  -d '{
    "currency": "USD",
    "token": "USDC",
    "description": "Support our project! ☕",
    "allow_custom_amount": true,
    "minimum_amount": 1.00,
    "maximum_amount": 1000.00,
    "suggested_amount": 5.00
  }'
```

</TryIt>

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

<TryIt method="POST" endpoint="/api/v1/payments" description="Create a payment with revenue splitting">

```bash
curl -X POST https://api.zendfi.tech/api/v1/payments \
  -H "Authorization: Bearer zfi_live_abc123..." \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 100.00,
    "currency": "USD",
    "token": "USDC",
    "description": "Marketplace Purchase",
    "splits": [
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

</TryIt>

## Idempotency

Prevent duplicate payments with idempotency keys.

```bash
curl -X POST https://api.zendfi.tech/api/v1/payments \
  -H "Authorization: Bearer zfi_live_abc123..." \
  -H "Content-Type: application/json" \
  -H "Idempotency-Key: order_12345_attempt_1" \
  -d '{
    "amount": 49.99,
    "currency": "USD",
    "token": "USDC"
  }'
```

:::tip Idempotency Best Practices
- Use unique keys per payment intent (e.g., `order_id + timestamp`)
- Keys are valid for 24 hours
- Retrying with the same key returns the original payment
:::

## Build Transaction (Advanced)

For advanced integrations, get the raw Solana transaction to sign in your own wallet.

### Endpoint

```
POST /api/v1/payments/:payment_id/build-transaction
```

### Request

```bash
curl -X POST https://api.zendfi.tech/api/v1/payments/pay_abc123xyz789/build-transaction \
  -H "Authorization: Bearer zfi_live_abc123..." \
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

## Error Responses

### 400 Bad Request

```json
{
  "error": "Invalid payment parameters",
  "details": "Amount must be greater than 0"
}
```

### 401 Unauthorized

```json
{
  "error": "Invalid or missing API key"
}
```

### 404 Not Found

```json
{
  "error": "Payment not found",
  "payment_id": "pay_invalid123"
}
```

### 500 Internal Server Error

```json
{
  "error": "Internal server error",
  "message": "Please try again later"
}
```

## Webhook Events

Payment-related webhook events:

| Event | Description |
|-------|-------------|
| `payment.created` | New payment created |
| `payment.pending` | Waiting for customer payment |
| `payment.confirming` | Transaction detected |
| `payment.confirmed` | Payment successful! |
| `payment.failed` | Payment failed |
| `payment.expired` | Payment window expired |

See the [Webhooks documentation](/features/webhooks) for complete details.

## Code Examples

### Node.js with SDK

```typescript
import { ZendFi } from '@zendfi/sdk';

const zendfi = new ZendFi({ apiKey: process.env.ZENDFI_API_KEY });

// Create payment
const payment = await zendfi.payments.create({
  amount: 49.99,
  currency: 'USD',
  token: 'USDC',
  description: 'Pro Plan',
  customerEmail: 'customer@example.com'
});

// Get payment status
const status = await zendfi.payments.get(payment.payment_id);
console.log(`Status: ${status.status}`);
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

- [Subscriptions](/api/subscriptions) - Set up recurring billing
- [Payment Links](/api/payment-links) - Create reusable payment URLs
- [Payment Splits](/features/payment-splits) - Configure revenue sharing
- [Webhooks](/features/webhooks) - Handle payment notifications
