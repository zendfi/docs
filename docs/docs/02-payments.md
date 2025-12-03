# Payments API - Accept Crypto Like a Boss!

Welcome to the Payments API! This is where the magic happens. Accept one-time crypto payments with a simple API call - perfect for e-commerce checkouts, invoices, donations, tips, and anything else you can dream up. Let's make you a payment pro!

---

## Table of Contents

- [Create a Payment](#create-a-payment)
- [Get Payment Details](#get-payment-details)
- [Get Payment Status](#get-payment-status)
- [Pay-What-You-Want Payments](#pay-what-you-want-payments)
- [Payment Splits](#payment-splits)
- [Idempotency](#idempotency)
- [Testing](#testing)

---

## Create a Payment

Create a one-time payment request in seconds! You'll get back a QR code and payment URL that you can show to your customer. They scan/connect, approve, done!

### Endpoint

```
POST /api/v1/payments
```

### Authentication

```
Authorization: Bearer YOUR_API_KEY
```

### Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Authorization` | **Yes** | Bearer token with your API key |
| `Content-Type` | **Yes** | Must be `application/json` |
| `Idempotency-Key` | No | Unique key to prevent duplicate payments |

### Request Body

#### Basic Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `amount` | number | **Yes** | Payment amount in USD (0.01 - 10,000.00) |
| `currency` | string | **Yes** | Currency code. Only `"USD"` supported |
| `token` | string | No | Token for payment: `"USDC"` (default), `"SOL"`, or `"USDT"` |
| `description` | string | No | Payment description (max 500 characters) |
| `metadata` | object | No | Custom key-value pairs for your reference |
| `webhook_url` | string | No | Override merchant's default webhook URL for this payment |
| `settlement_preference_override` | string | No | Override settlement: `"auto_usdc"` or `"direct_token"` |

#### Pay-What-You-Want Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `allow_custom_amount` | boolean | No | Enable customer to choose amount (default: `false`) |
| `minimum_amount` | number | Conditional | **Required** if `allow_custom_amount` is `true` |
| `maximum_amount` | number | No | Optional ceiling for custom amounts |
| `suggested_amount` | number | No | Suggested amount shown to customer |

#### Payment Splits Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `split_recipients` | array | No | Array of recipients for split payments (see [Payment Splits](#payment-splits)) |

---

### Example 1: Simple USDC Payment (The Classic!)

Let's create a basic payment - this is probably what you'll use 90% of the time. Super straightforward!

**Request:**

```bash
curl -X POST https://api.zendfi.tech/api/v1/payments \
  -H "Authorization: Bearer zendfi_live_abc123..." \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 99.99,
    "currency": "USD",
    "description": "Premium Plan - Annual Subscription",
    "token": "USDC",
    "metadata": {
      "customer_id": "cus_12345",
      "plan": "premium_annual",
      "seats": 5
    }
  }'
```

**Response: 200 OK**

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "amount": 99.99,
  "currency": "USD",
  "status": "Pending",
  "qr_code": "solana:6qWDyySDsrWbUqXCzwaxVYc47xTaZVUEdeC9apdo6Ewa?amount=99990000&spl-token=EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v&reference=550e8400-e29b-41d4-a716-446655440000&label=Zendfi%20Payment%20(USDC)&message=Payment%20550e8400-e29b-41d4-a716-446655440000",
  "payment_url": "https://api.zendfi.tech/pay/550e8400-e29b-41d4-a716-446655440000",
  "expires_at": "2025-10-26T12:30:00.000Z",
  "settlement_info": null
}
```

---

### Example 2: SOL Payment (For the SOL Lovers! ☀️)

Want to accept Solana's native token? No problem! Same API, different token.

**Request:**

```bash
curl -X POST https://api.zendfi.tech/api/v1/payments \
  -H "Authorization: Bearer zendfi_live_abc123..." \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 50.00,
    "currency": "USD",
    "description": "Coffee Subscription Box",
    "token": "SOL"
  }'
```

**Response: 200 OK**

```json
{
  "id": "payment_sol123",
  "amount": 50.00,
  "currency": "USD",
  "status": "Pending",
  "qr_code": "solana:6qWDyySDsrWbUqXCzwaxVYc47xTaZVUEdeC9apdo6Ewa?amount=50000000000&reference=payment_sol123&label=Zendfi%20Payment%20(SOL)&message=Payment%20payment_sol123",
  "payment_url": "https://api.zendfi.tech/pay/payment_sol123",
  "expires_at": "2025-10-26T12:30:00.000Z",
  "settlement_info": null
}
```

---

### Example 3: Pay-What-You-Want (Perfect for Donations!)

Let your customers choose how much to pay! Great for donations, tips, or flexible pricing. Power to the people!

**Request:**

```bash
curl -X POST https://api.zendfi.tech/api/v1/payments \
  -H "Authorization: Bearer zendfi_live_abc123..." \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 10.00,
    "currency": "USD",
    "description": "Support our open-source project",
    "allow_custom_amount": true,
    "minimum_amount": 1.00,
    "maximum_amount": 1000.00,
    "suggested_amount": 10.00,
    "metadata": {
      "campaign": "winter_2025",
      "source": "homepage"
    }
  }'
```

**Response: 200 OK**

```json
{
  "id": "payment_pwyw123",
  "amount": 10.00,
  "currency": "USD",
  "status": "Pending",
  "qr_code": "solana:...",
  "payment_url": "https://api.zendfi.tech/pay/payment_pwyw123",
  "expires_at": "2025-10-26T12:30:00.000Z",
  "settlement_info": null
}
```

**Customer experience:** The payment page shows a slider or input allowing amounts from $1.00 to $1,000.00, with $10.00 pre-selected. They pick what feels right!

---

### Example 4: Payment with Custom Webhook (Route Notifications Your Way!)

Need this payment's notifications to go somewhere specific? Override the webhook URL per payment!

**Request:**

```bash
curl -X POST https://api.zendfi.tech/api/v1/payments \
  -H "Authorization: Bearer zendfi_live_abc123..." \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 29.99,
    "currency": "USD",
    "description": "Event Ticket - VIP Pass",
    "webhook_url": "https://mytickets.com/webhooks/payment-confirmed",
    "metadata": {
      "event_id": "evt_20251231",
      "ticket_type": "vip",
      "email": "customer@example.com"
    }
  }'
```

**Response: 200 OK**

```json
{
  "id": "payment_evt123",
  "amount": 29.99,
  "currency": "USD",
  "status": "Pending",
  "qr_code": "solana:...",
  "payment_url": "https://api.zendfi.tech/pay/payment_evt123",
  "expires_at": "2025-10-26T12:30:00.000Z",
  "settlement_info": null
}
```

**Note:** This payment's confirmation will be sent to `https://mytickets.com/webhooks/payment-confirmed` instead of your default webhook URL.

---

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | string (UUID) | Unique payment identifier |
| `amount` | number | Payment amount in USD |
| `currency` | string | Currency code (`USD`) |
| `status` | string | Payment status (see [Payment Statuses](#payment-statuses)) |
| `qr_code` | string | Solana Pay QR code URI |
| `payment_url` | string | Hosted payment page URL |
| `expires_at` | string (ISO 8601) | Payment expiration timestamp (15 minutes) |
| `settlement_info` | object\|null | Settlement details (if applicable) |
| `split_ids` | array\|null | Array of split payment IDs (if splits enabled) |

---

### Error Responses

#### 400 Bad Request - Invalid Amount

```json
{
  "error": {
    "message": "Invalid payment amount: Amount must be between $0.01 and $10,000.00",
    "field": "amount",
    "value": 0
  }
}
```

#### 400 Bad Request - Invalid Currency

```json
{
  "error": {
    "message": "Only USD currency is supported",
    "field": "currency",
    "supported_values": ["USD"]
  }
}
```

#### 400 Bad Request - Invalid Token

```json
{
  "error": {
    "message": "Unsupported token. Supported tokens: USDC, SOL, USDT",
    "field": "token",
    "value": "BTC"
  }
}
```

#### 400 Bad Request - Invalid PWYW Config

```json
{
  "error": {
    "message": "Invalid pay-what-you-want configuration: minimum_amount is required when allow_custom_amount is true",
    "field": "pwyw_config"
  }
}
```

#### 400 Bad Request - Invalid Description

```json
{
  "error": {
    "message": "Invalid description: Description cannot exceed 500 characters",
    "field": "description"
  }
}
```

#### 401 Unauthorized

```json
{
  "error": "unauthorized",
  "message": "Invalid or missing API key"
}
```

#### 429 Too Many Requests - Limits Exceeded

```json
{
  "error": {
    "message": "Payment limits exceeded",
    "details": "You have exceeded your daily volume, payment amount, or rate limits",
    "contact": "Contact support to increase your limits"
  }
}
```

**Default Limits:**
- Max single payment: $10,000
- Daily volume: $50,000
- Hourly requests: 100

Contact support@zendfi.tech to increase your limits.

#### 500 Internal Server Error

```json
{
  "error": {
    "message": "Failed to create payment"
  }
}
```

---

## Get Payment Details

Want to see everything about a payment? This endpoint gives you the full story - metadata, settlement info, transaction signatures, the works!

### Endpoint

```
GET /api/v1/payments/:id
```

### Authentication

```
Authorization: Bearer YOUR_API_KEY
```

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `id` | Payment ID (UUID) |

### Example Request

```bash
curl -X GET https://api.zendfi.tech/api/v1/payments/550e8400-e29b-41d4-a716-446655440000 \
  -H "Authorization: Bearer zendfi_live_abc123..."
```

### Response: 200 OK

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "merchant_id": "merchant_abc123",
  "amount": 99.99,
  "currency": "USD",
  "status": "Confirmed",
  "token": "USDC",
  "description": "Premium Plan - Annual Subscription",
  "transaction_signature": "5j7s6JP28XvC1jQeU3hpkKHqRVEkBpDLrEr3cKXXJPaG7W2yQSp6YJ7s6JP28XvC1",
  "customer_wallet": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
  "metadata": {
    "customer_id": "cus_12345",
    "plan": "premium_annual",
    "seats": 5
  },
  "qr_code": "solana:...",
  "payment_url": "https://api.zendfi.tech/pay/550e8400-e29b-41d4-a716-446655440000",
  "created_at": "2025-10-26T12:15:00.000Z",
  "confirmed_at": "2025-10-26T12:17:30.000Z",
  "expires_at": "2025-10-26T12:30:00.000Z",
  "settlement_status": "completed",
  "settlement_signature": "3k8n5TY89VvD2kRfV4iqmLKtSWFjDnMoRcWr4dJYKPcH8N3qZTp7ZK8n5TY89VvD2"
}
```

### Error Responses

#### 404 Not Found

```json
{
  "error": "payment_not_found",
  "message": "No payment found with ID: 550e8400-e29b-41d4-a716-446655440000"
}
```

---

## Get Payment Status

Quick status check! Use this when you just need to know "has this payment been confirmed yet?" Perfect for polling or manual checks. 🔍

### Endpoint

```
GET /api/v1/payments/:id/status
```

### Authentication

```
Authorization: Bearer YOUR_API_KEY
```

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `id` | Payment ID (UUID) |

### Example Request

```bash
curl -X GET https://api.zendfi.tech/api/v1/payments/550e8400-e29b-41d4-a716-446655440000/status \
  -H "Authorization: Bearer zendfi_live_abc123..."
```

### Response: 200 OK - Pending

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "status": "Pending",
  "amount": 99.99,
  "currency": "USD",
  "transaction_signature": null,
  "confirmed_at": null,
  "settlement_status": "not_started"
}
```

### Response: 200 OK - Confirmed

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "status": "Confirmed",
  "amount": 99.99,
  "currency": "USD",
  "transaction_signature": "5j7s6JP28XvC1jQeU3hpkKHqRVEkBpDLrEr3cKXXJPaG7W2yQSp6YJ7s6JP28XvC1",
  "confirmed_at": "2025-10-26T12:17:30.000Z",
  "settlement_status": "processing",
  "customer_wallet": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU"
}
```

### Payment Statuses

| Status | Description | Next Steps |
|--------|-------------|------------|
| `Pending` | Waiting for customer payment | Customer should complete payment within 15 minutes |
| `Confirmed` | Payment received and verified!| Settlement is processing or completed |
| `Failed` | Transaction failed | Create a new payment if needed |
| `Expired` | Payment window expired | Create a new payment |

### Settlement Statuses

| Status | Description |
|--------|-------------|
| `not_started` | Payment not yet confirmed |
| `processing` | Settlement in progress |
| `completed` | Funds in your wallet! |
| `failed` | Settlement failed (rare - contact support immediately) |

---

## Pay-What-You-Want Payments (Flexible Pricing FTW!)

Perfect for donations, tips, flexible pricing, or "pay what feels right" models. Give your customers the power to choose!

### How It Works

1. You set minimum (required) and maximum (optional) amounts
2. Customer chooses an amount within that range
3. You can suggest a default amount
4. Customer pays their chosen amount

### Configuration

```json
{
  "amount": 10.00,
  "currency": "USD",
  "allow_custom_amount": true,
  "minimum_amount": 1.00,
  "maximum_amount": 1000.00,
  "suggested_amount": 10.00
}
```

### Validation Rules

- `minimum_amount` is **required** when `allow_custom_amount` is `true`
- `maximum_amount` must be greater than `minimum_amount` (if provided)
- `suggested_amount` must be between `minimum_amount` and `maximum_amount`
- `amount` field is ignored for display (but used as fallback)

### Use Cases

**Donations (Support a Cause! ❤️):**
```json
{
  "allow_custom_amount": true,
  "minimum_amount": 5.00,
  "suggested_amount": 25.00,
  "description": "Support our mission"
}
```

**Tips for Service (Show Some Love! 💝):**
```json
{
  "allow_custom_amount": true,
  "minimum_amount": 0.50,
  "maximum_amount": 100.00,
  "suggested_amount": 5.00,
  "description": "Tip your driver"
}
```

**Flexible Pricing (You Decide the Value! 💎):**
```json
{
  "allow_custom_amount": true,
  "minimum_amount": 10.00,
  "maximum_amount": 50.00,
  "suggested_amount": 29.00,
  "description": "Pay what you think it's worth"
}
```

---

## Payment Splits (Share the Wealth!)

Automatically split incoming payments between multiple recipients - perfect for marketplaces, revenue sharing, and team payments!

**Perfect for:**
- Marketplace commissions
- Revenue sharing
- Affiliate payments  
- Multi-party invoices

Want the full scoop? Check out [Payment Splits Documentation](./06-advanced-features.md#payment-splits) for all the details!

### Quick Example (See It in Action!)

```json
{
  "amount": 100.00,
  "currency": "USD",
  "description": "Marketplace Sale",
  "split_recipients": [
    {
      "wallet_address": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
      "percentage": 80.0,
      "description": "Seller - 80%"
    },
    {
      "wallet_address": "9yJKg3DX98h87TYKSDqcE6jCkhgTrB94UZSmKptgBsV",
      "percentage": 15.0,
      "description": "Platform Fee - 15%"
    },
    {
      "wallet_address": "4mNKh5FY21i98UZLTErdG8kDjhsWsC05VATnLquiBwX",
      "percentage": 5.0,
      "description": "Referral - 5%"
    }
  ]
}
```

**Result:** When customer pays $100, funds are automatically distributed:
- $80.00 → Seller
- $15.00 → Platform
- $5.00 → Referral partner

Everyone gets paid automatically! No manual transfers needed. How cool is that? 🎉

---

## Idempotency (Prevent Duplicate Payments Like a Pro!)

Ever had a customer double-click the "Pay" button? Network timeout? Idempotency keys save the day by preventing duplicate payments!

### How It Works

Include an `Idempotency-Key` header with a unique value. If you retry the same request with the same key, you'll get the original response instead of creating a duplicate payment. Magic! ✨

It's like a safety net for your payments - try the same request twice, only pay once!

### Usage

```bash
curl -X POST https://api.zendfi.tech/api/v1/payments \
  -H "Authorization: Bearer zendfi_live_abc123..." \
  -H "Content-Type: application/json" \
  -H "Idempotency-Key: checkout_session_abc123_attempt1" \
  -d '{
    "amount": 49.99,
    "currency": "USD",
    "description": "Product Purchase"
  }'
```

### Best Practices

**Generate Unique Keys:**
```javascript
// Node.js example
const idempotencyKey = `checkout_${sessionId}_${Date.now()}_${Math.random()}`;
```

**Retry with Same Key:**
```javascript
// Retry logic
let attempts = 0;
const maxAttempts = 3;
const idempotencyKey = generateUniqueKey();

while (attempts < maxAttempts) {
  try {
    const response = await createPayment(data, idempotencyKey);
    return response;
  } catch (error) {
    if (error.status === 500 || error.status === 429) {
      attempts++;
      await sleep(1000 * attempts); // Exponential backoff
    } else {
      throw error; // Don't retry client errors (4xx)
    }
  }
}
```

**Key Requirements:**
- Must be unique per request
- Maximum 255 characters
- Valid for 24 hours
- Recommended format: `prefix_${unique_id}_${timestamp}`

---

## Testing (Try Before You Fly!)

Always test your integration before going live! We make it super easy.

### Test on Devnet (Your Playground!)

1. Set `SOLANA_NETWORK=devnet` in your `.env`
2. Use devnet USDC mint: `4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU`
3. Get free devnet SOL/USDC from [Solana Faucet](https://faucet.solana.com/) - it's like Monopoly money, but fun!

### Test Wallet Addresses (Ready to Use!)

Use these test wallets for devnet testing - they're all yours!

```
Customer Wallet: 7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU
Merchant Wallet: 9yJKg3DX98h87TYKSDqcE6jCkhgTrB94UZSmKptgBsV
```

### Common Testing Scenarios

#### Scenario 1: Successful Payment
1. Create payment
2. Copy QR code or payment URL
3. Pay with devnet wallet
4. Check status → should show `Confirmed` (usually within 60 seconds!)

#### Scenario 2: Expired Payment
1. Create payment
2. Wait 16+ minutes (grab a coffee! ☕)
3. Check status → should show `Expired`

#### Scenario 3: Idempotency Magic
1. Create payment with `Idempotency-Key: test_123`
2. Retry with same key
3. Should receive identical response (no duplicate payment - nice!)

---

## Next Steps (Keep Going!)

You're crushing it! Here's what to explore next:

- **Payment Links:** [Create reusable payment pages](./03-payment-links.md) - Share one link everywhere!
- **Webhooks:** [Handle payment events in real-time](./04-webhooks.md) - Never miss a payment!
- **Wallet Management:** [Export keys, withdraw funds](./05-wallet-management.md) - Full control of your money!
- **Advanced Features:** [Subscriptions, escrows, installments](./06-advanced-features.md) - Level up your game!

---

**Need Help? We're Here for You!**

- support@zendfi.tech - Real humans who actually reply!
- [Discord Community](https://discord.gg/zendfi) - Join fellow builders!
- [Video Tutorials](https://zendfi.tech/tutorials) - See it in action!

Happy building! You're doing amazing!
