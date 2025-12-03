# Webhooks - Stay in Sync with Payment Events!

Welcome to the Webhooks guide! Webhooks are how ZendFi notifies your application when important payment events happen - like when a payment is confirmed, when settlement completes, or when something fails. Think of webhooks as your real-time notification system. Let's make you a webhook expert!

---

## Table of Contents
- [What Are Webhooks?](#what-are-webhooks)
- [Webhook Events](#webhook-events)
- [Webhook Security](#webhook-security)
- [List Webhook Events](#list-webhook-events)
- [Verify Webhook Signature](#verify-webhook-signature)
- [Retry Failed Webhooks](#retry-failed-webhooks)
- [Dead Letter Queue](#dead-letter-queue)
- [Testing Webhooks](#testing-webhooks)
- [Best Practices](#best-practices)

---

## What Are Webhooks?

Webhooks are **HTTP POST requests** that ZendFi sends to your server whenever something important happens with your payments. Instead of constantly polling our API, we'll notify you instantly! ⚡

**Why Use Webhooks?**
- **Real-time notifications**: Know instantly when payments confirm
- **Automatic delivery**: No need to poll our API constantly
- **Secure**: HMAC-SHA256 signature verification
- **Reliable**: Automatic retry with exponential backoff
- **Complete data**: Full payment details in every webhook

**How It Works:**
1. You configure a webhook URL when creating your merchant account
2. Customer makes a payment
3. ZendFi detects the payment on-chain
4. We send an HTTPS POST request to your webhook URL
5. Your server processes the webhook and returns 200 OK
6. If delivery fails, we automatically retry (up to 5 times)

---

## Webhook Events

ZendFi sends webhooks for all important payment lifecycle events!

### Available Event Types

| Event Type | Description | When It's Triggered |
|-----------|-------------|---------------------|
| `PaymentCreated` | New payment was created | Immediately after payment creation via API or payment link |
| `PaymentConfirmed` | Payment confirmed on-chain | After Solana transaction is verified (usually 30-60 seconds) |
| `PaymentFailed` | Payment failed verification | If transaction verification fails or times out |
| `PaymentExpired` | Payment expired without completion | After 15-minute expiration window passes |
| `SettlementCompleted` | Funds settled to your wallet | After auto-conversion or direct token settlement completes |

---

## Webhook Payload Structure

Every webhook follows the same JSON structure:

```json
{
  "event": "PaymentConfirmed",
  "payment": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "merchant_id": "770e8400-e29b-41d4-a716-446655440001",
    "amount_usd": 99.99,
    "amount_ngn": null,
    "status": "Confirmed",
    "transaction_signature": "5KzZ8LWvZh7NYjJvPhHGYnNrB2rKqb2nnU6NJR4zHYQZ...",
    "customer_wallet": "ABC123...XYZ789",
    "metadata": {
      "order_id": "ORDER-12345",
      "customer_email": "customer@example.com"
    }
  },
  "timestamp": "2024-01-15T10:30:45Z",
  "signature": "t=1705318245,v1=a2f8c9d3e4b5a6c7d8e9f0a1b2c3d4e5..."
}
```

### Payload Fields

| Field | Type | Description |
|-------|------|-------------|
| `event` | string | Event type (e.g., "PaymentConfirmed") |
| `payment` | object | Complete payment details |
| `payment.id` | UUID | Unique payment ID |
| `payment.merchant_id` | UUID | Your merchant ID |
| `payment.amount_usd` | number | Payment amount in USD |
| `payment.amount_ngn` | number | Payment amount in NGN (if applicable) |
| `payment.status` | string | Payment status (Pending, Confirmed, Failed, Expired) |
| `payment.transaction_signature` | string | Solana transaction signature (null until confirmed) |
| `payment.customer_wallet` | string | Customer's wallet address (null until paid) |
| `payment.metadata` | object | Custom metadata you provided |
| `timestamp` | datetime | When the webhook was generated |
| `signature` | string | HMAC-SHA256 signature for verification |

---

## Webhook Event Examples

### PaymentCreated Event

Sent immediately when a payment is created (via API or payment link).

```json
{
  "event": "PaymentCreated",
  "payment": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "merchant_id": "770e8400-e29b-41d4-a716-446655440001",
    "amount_usd": 99.99,
    "amount_ngn": null,
    "status": "Pending",
    "transaction_signature": null,
    "customer_wallet": null,
    "metadata": {
      "order_id": "ORDER-12345",
      "product": "Premium Subscription"
    }
  },
  "timestamp": "2024-01-15T10:30:00Z",
  "signature": "t=1705318200,v1=abc123..."
}
```

**What To Do:**
- Update your database: mark order as "awaiting payment"
- Show customer: "Payment pending, please complete transaction"
- Set timeout: track 15-minute expiration

---

### PaymentConfirmed Event

Sent when payment is verified on Solana blockchain (usually 30-60 seconds after customer pays).

```json
{
  "event": "PaymentConfirmed",
  "payment": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "merchant_id": "770e8400-e29b-41d4-a716-446655440001",
    "amount_usd": 99.99,
    "amount_ngn": null,
    "status": "Confirmed",
    "transaction_signature": "5KzZ8LWvZh7NYjJvPhHGYnNrB2rKqb2nnU6NJR4zHYQZ3k2PxMhR7vA8sB9cC0dD1eE2fF3gG4hH5iI6jJ7kK8",
    "customer_wallet": "ABC123DEF456GHI789JKL012MNO345PQR678STU901VWX234YZ",
    "metadata": {
      "order_id": "ORDER-12345",
      "product": "Premium Subscription"
    }
  },
  "timestamp": "2024-01-15T10:31:15Z",
  "signature": "t=1705318275,v1=def456..."
}
```

**What To Do:**
- Mark order as paid in your database
- Deliver digital goods/services
- Send confirmation email to customer
- Update inventory if needed
- Display "Payment successful!" message

**This is your most important webhook!** Most of your business logic happens here.

---

### PaymentFailed Event

Sent when payment verification fails (invalid transaction, insufficient funds, etc.).

```json
{
  "event": "PaymentFailed",
  "payment": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "merchant_id": "770e8400-e29b-41d4-a716-446655440001",
    "amount_usd": 99.99,
    "amount_ngn": null,
    "status": "Failed",
    "transaction_signature": "5KzZ8LWvZh7NYjJvPhHGYnNrB2rKqb2...",
    "customer_wallet": "ABC123DEF456GHI789...",
    "metadata": {
      "order_id": "ORDER-12345",
      "product": "Premium Subscription"
    }
  },
  "timestamp": "2024-01-15T10:32:00Z",
  "signature": "t=1705318320,v1=ghi789..."
}
```

**What To Do:**
- Mark order as failed
- Notify customer payment didn't go through
- Provide option to retry payment
- Log for analytics (conversion funnel)

---

### PaymentExpired Event

Sent when the 15-minute payment window expires without customer completing payment.

```json
{
  "event": "PaymentExpired",
  "payment": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "merchant_id": "770e8400-e29b-41d4-a716-446655440001",
    "amount_usd": 99.99,
    "amount_ngn": null,
    "status": "Expired",
    "transaction_signature": null,
    "customer_wallet": null,
    "metadata": {
      "order_id": "ORDER-12345",
      "product": "Premium Subscription"
    }
  },
  "timestamp": "2024-01-15T10:45:00Z",
  "signature": "t=1705319100,v1=jkl012..."
}
```

**What To Do:**
- Mark order as expired
- Send "Payment timeout" email
- Offer "Try again" button (create new payment)
- Track abandonment rate

---

### SettlementCompleted Event

Sent when funds are settled to your wallet (after auto-conversion to USDC if enabled).

```json
{
  "event": "SettlementCompleted",
  "payment": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "merchant_id": "770e8400-e29b-41d4-a716-446655440001",
    "amount_usd": 99.99,
    "amount_ngn": null,
    "status": "Confirmed",
    "transaction_signature": "5KzZ8LWvZh7NYjJvPhHGYnNrB2rKqb2...",
    "customer_wallet": "ABC123DEF456GHI789...",
    "metadata": {
      "order_id": "ORDER-12345",
      "product": "Premium Subscription"
    }
  },
  "timestamp": "2024-01-15T10:33:00Z",
  "signature": "t=1705318380,v1=mno345..."
}
```

**What To Do:**
- Update revenue tracking
- Log for accounting/reconciliation
- Update analytics dashboard
- Celebrate your sale!

---

## Webhook Security

Security is super important! ZendFi uses **HMAC-SHA256** signatures to ensure webhook authenticity.

### Signature Format

Every webhook includes a signature in the `signature` field:

```
t=1705318245,v1=a2f8c9d3e4b5a6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1
```

**Format:**
- `t`: Unix timestamp when webhook was sent
- `v1`: HMAC-SHA256 hex digest

### How Signature Verification Works

1. Extract timestamp `t` from signature
2. Construct signed payload: `"{timestamp}:{webhook_json}"`
3. Compute HMAC-SHA256 using your webhook secret
4. Compare computed signature with provided `v1` signature
5. Check timestamp is within 5 minutes (replay protection)

### Your Webhook Secret

When you create your merchant account, ZendFi automatically generates a unique webhook secret (starts with `whsec_`). You can retrieve it from your merchant settings or it will be generated on first webhook.

**Important:**
- Keep it secret! Never commit to Git
- Store in environment variables
- Use it to verify every webhook

---

## Verify Webhook Signature

Before processing any webhook, **always verify the signature**! This ensures the webhook actually came from ZendFi.

### Endpoint
```
POST /api/v1/webhooks/verify
```

### Authentication
```
Authorization: Bearer YOUR_API_KEY
```

### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `payload` | string | Yes | The raw JSON webhook payload |
| `signature` | string | Yes | The signature from the webhook |

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `valid` | boolean | Whether the signature is valid |
| `message` | string | Explanation of result |
| `timestamp_age_seconds` | integer | How old the webhook is (null if invalid format) |

### Example Request

```bash
curl -X POST https://api.zendfi.tech/api/v1/webhooks/verify \
  -H "Authorization: Bearer zfi_test_abc123..." \
  -H "Content-Type: application/json" \
  -d '{
    "payload": "{\"event\":\"PaymentConfirmed\",\"payment\":{\"id\":\"550e8400-e29b-41d4-a716-446655440000\"}}",
    "signature": "t=1705318245,v1=a2f8c9d3e4b5a6c7d8e9f0a1b2c3d4e5..."
  }'
```

### Example Response (Valid)

```json
{
  "valid": true,
  "message": "Webhook signature is valid",
  "timestamp_age_seconds": 3
}
```

### Example Response (Expired)

```json
{
  "valid": false,
  "message": "Webhook signature expired (420 seconds old, max 300)",
  "timestamp_age_seconds": 420
}
```

### Example Response (Invalid)

```json
{
  "valid": false,
  "message": "Webhook signature is invalid",
  "timestamp_age_seconds": 5
}
```

---

## List Webhook Events

Get a history of all webhooks sent to your endpoint.

### Endpoint
```
GET /api/v1/webhooks
```

### Authentication
```
Authorization: Bearer YOUR_API_KEY
```

### Response

Returns an array of webhook event objects (up to 50 most recent).

```json
[
  {
    "id": "660e8400-e29b-41d4-a716-446655440002",
    "payment_id": "550e8400-e29b-41d4-a716-446655440000",
    "merchant_id": "770e8400-e29b-41d4-a716-446655440001",
    "event_type": "PaymentConfirmed",
    "payload": {
      "event": "PaymentConfirmed",
      "payment": { ... },
      "timestamp": "2024-01-15T10:31:15Z",
      "signature": "t=1705318275,v1=def456..."
    },
    "webhook_url": "https://yourapp.com/webhooks/zendfi",
    "status": "Delivered",
    "attempts": 1,
    "last_attempt_at": "2024-01-15T10:31:16Z",
    "next_retry_at": null,
    "response_code": 200,
    "response_body": "{\"success\":true}",
    "created_at": "2024-01-15T10:31:15Z"
  },
  {
    "id": "770e8400-e29b-41d4-a716-446655440003",
    "payment_id": "550e8400-e29b-41d4-a716-446655440000",
    "merchant_id": "770e8400-e29b-41d4-a716-446655440001",
    "event_type": "PaymentCreated",
    "payload": { ... },
    "webhook_url": "https://yourapp.com/webhooks/zendfi",
    "status": "Delivered",
    "attempts": 1,
    "last_attempt_at": "2024-01-15T10:30:01Z",
    "next_retry_at": null,
    "response_code": 200,
    "response_body": "{\"success\":true}",
    "created_at": "2024-01-15T10:30:00Z"
  }
]
```

### Webhook Status Values

| Status | Description |
|--------|-------------|
| `Pending` | Webhook queued for delivery |
| `Delivered` | Successfully delivered (HTTP 2xx response) |
| `Failed` | Temporary failure, will retry |
| `Exhausted` | All 5 retry attempts failed, moved to Dead Letter Queue |

---

## Retry Failed Webhooks

If a webhook fails to deliver (your server is down, timeout, etc.), ZendFi automatically retries with exponential backoff!

### Automatic Retry Schedule

| Attempt | Delay After Failure |
|---------|-------------------|
| 1st retry | 1 minute |
| 2nd retry | 5 minutes |
| 3rd retry | 15 minutes |
| 4th retry | 1 hour |
| 5th retry | 24 hours |

After 5 failed attempts, the webhook is moved to the **Dead Letter Queue** for manual review.

### Manual Retry Endpoint

You can also manually trigger a retry for failed webhooks!

```
POST /api/v1/webhooks/{webhook_id}/retry
```

### URL Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `webhook_id` | UUID | The webhook event ID |

### Example Request

```bash
curl -X POST https://api.zendfi.tech/api/v1/webhooks/660e8400-e29b-41d4-a716-446655440002/retry \
  -H "Authorization: Bearer zfi_test_abc123..."
```

### Example Response

```json
{
  "message": "Webhook retry triggered",
  "webhook_id": "660e8400-e29b-41d4-a716-446655440002"
}
```

**What Happens:**
- Webhook status is reset to "Pending"
- Attempt count is reset to 0
- Delivery is retried immediately
- If it was in Dead Letter Queue, it's marked as "manually_retried"

---

## Dead Letter Queue (DLQ)

When webhooks fail all 5 retry attempts, they're moved to the **Dead Letter Queue** for manual review and resolution.

### Why Webhooks End Up in DLQ

- Your server is down for extended period
- Webhook URL is incorrect or unreachable
- Your endpoint returns non-2xx status codes
- Request timeout (>30 seconds)
- SSL certificate issues
- Network connectivity problems

### List Dead Letter Queue

```
GET /admin/webhooks/dlq
```

**Note:** This is an admin endpoint. Contact support for access.

### Response

```json
[
  {
    "id": "880e8400-e29b-41d4-a716-446655440004",
    "webhook_event_id": "660e8400-e29b-41d4-a716-446655440002",
    "merchant_id": "770e8400-e29b-41d4-a716-446655440001",
    "payment_id": "550e8400-e29b-41d4-a716-446655440000",
    "event_type": "PaymentConfirmed",
    "webhook_url": "https://yourapp.com/webhooks/zendfi",
    "payload": { ... },
    "total_attempts": 5,
    "first_failure_at": "2024-01-15T10:31:16Z",
    "last_failure_at": "2024-01-16T10:31:16Z",
    "failure_reason": "Connection timeout after 30 seconds",
    "last_response_code": null,
    "last_response_body": null,
    "resolution_status": "unresolved",
    "resolved_at": null,
    "created_at": "2024-01-15T10:31:15Z",
    "updated_at": "2024-01-16T10:31:20Z"
  }
]
```

### DLQ Entry Details

Get full details including retry history for a specific DLQ entry.

```
GET /admin/webhooks/dlq/{dlq_id}
```

### Response

```json
{
  "dlq_entry": {
    "id": "880e8400-e29b-41d4-a716-446655440004",
    "webhook_event_id": "660e8400-e29b-41d4-a716-446655440002",
    "merchant_id": "770e8400-e29b-41d4-a716-446655440001",
    "payment_id": "550e8400-e29b-41d4-a716-446655440000",
    "event_type": "PaymentConfirmed",
    "webhook_url": "https://yourapp.com/webhooks/zendfi",
    "payload": { ... },
    "total_attempts": 5,
    "first_failure_at": "2024-01-15T10:31:16Z",
    "last_failure_at": "2024-01-16T10:31:16Z",
    "failure_reason": "Connection timeout after 30 seconds",
    "resolution_status": "unresolved"
  },
  "retry_history": [
    {
      "id": "990e8400-e29b-41d4-a716-446655440005",
      "attempt_number": 1,
      "attempted_at": "2024-01-15T10:31:16Z",
      "response_code": null,
      "response_body": null,
      "response_time_ms": 30000,
      "error_message": "Connection timeout",
      "retry_scheduled_for": "2024-01-15T10:32:16Z",
      "retry_delay_seconds": 60
    },
    {
      "id": "aa0e8400-e29b-41d4-a716-446655440006",
      "attempt_number": 2,
      "attempted_at": "2024-01-15T10:32:16Z",
      "response_code": null,
      "response_body": null,
      "response_time_ms": 30000,
      "error_message": "Connection timeout",
      "retry_scheduled_for": "2024-01-15T10:37:16Z",
      "retry_delay_seconds": 300
    }
    // ... attempts 3, 4, 5
  ]
}
```

### Resolve DLQ Entry

Mark a DLQ entry as resolved or ignored.

```
POST /admin/webhooks/dlq/{dlq_id}/resolve
```

**Request:**
```json
{
  "resolution_status": "resolved",
  "resolution_notes": "Fixed webhook URL and manually retried"
}
```

**Response:**
```json
{
  "message": "DLQ entry resolved",
  "dlq_id": "880e8400-e29b-41d4-a716-446655440004",
  "status": "resolved"
}
```

---

## Testing Webhooks

### Step 1: Set Up Local Webhook Endpoint

Use **ngrok** to expose your local server to the internet:

```bash
ngrok http 3000
```

This gives you a public URL like: `https://abc123.ngrok.io`

### Step 2: Update Your Webhook URL

Update your merchant settings with your ngrok URL:

```bash
curl -X PATCH https://api.zendfi.tech/api/v1/merchants/me \
  -H "Authorization: Bearer zfi_test_abc123..." \
  -H "Content-Type: application/json" \
  -d '{
    "webhook_url": "https://abc123.ngrok.io/webhooks/zendfi"
  }'
```

### Step 3: Create Test Payment

```bash
curl -X POST https://api.zendfi.tech/api/v1/payments \
  -H "Authorization: Bearer zfi_test_abc123..." \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 0.01,
    "currency": "USD",
    "token": "USDC",
    "description": "Webhook test payment"
  }'
```

### Step 4: Monitor Your Server

You should receive two webhooks:
1. `PaymentCreated` - immediately
2. `PaymentConfirmed` - after you complete the payment (~30-60 seconds)

### Alternative: Use webhook.site

If you don't have a server yet, use [webhook.site](https://webhook.site):

1. Visit https://webhook.site
2. Copy your unique URL
3. Set it as your webhook URL
4. Create a test payment
5. Watch webhooks arrive in real-time!

---

## Code Examples

### Node.js/Express: Complete Webhook Handler

```javascript
const express = require('express');
const crypto = require('crypto');

const app = express();

// IMPORTANT: Use raw body for signature verification
app.use('/webhooks/zendfi', express.raw({ type: 'application/json' }));
app.use(express.json());

const WEBHOOK_SECRET = process.env.ZENDFI_WEBHOOK_SECRET;

// Verify webhook signature
function verifyWebhookSignature(payload, signature, secret) {
  // Parse signature: "t=1705318245,v1=abc123..."
  const parts = signature.split(',');
  if (parts.length !== 2) return false;
  
  const timestamp = parts[0].split('=')[1];
  const providedSig = parts[1].split('=')[1];
  
  // Check timestamp (max 5 minutes old)
  const now = Math.floor(Date.now() / 1000);
  const age = now - parseInt(timestamp);
  if (age > 300 || age < -60) {
    console.warn(`Webhook timestamp invalid: ${age}s old`);
    return false;
  }
  
  // Compute expected signature
  const signedPayload = `${timestamp}:${payload}`;
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(signedPayload);
  const expectedSig = hmac.digest('hex');
  
  // Constant-time comparison
  return crypto.timingSafeEqual(
    Buffer.from(providedSig),
    Buffer.from(expectedSig)
  );
}

// Webhook endpoint
app.post('/webhooks/zendfi', async (req, res) => {
  const signature = req.headers['x-zendfi-signature'];
  const payload = req.body.toString('utf8');
  
  // Verify signature
  if (!verifyWebhookSignature(payload, signature, WEBHOOK_SECRET)) {
    console.error('⚠️ Invalid webhook signature!');
    return res.status(401).json({ error: 'Invalid signature' });
  }
  
  // Parse webhook
  const webhook = JSON.parse(payload);
  const { event, payment } = webhook;
  
  console.log(`Received webhook: ${event} for payment ${payment.id}`);
  
  try {
    // Handle different event types
    switch (event) {
      case 'PaymentCreated':
        await handlePaymentCreated(payment);
        break;
        
      case 'PaymentConfirmed':
        await handlePaymentConfirmed(payment);
        break;
        
      case 'PaymentFailed':
        await handlePaymentFailed(payment);
        break;
        
      case 'PaymentExpired':
        await handlePaymentExpired(payment);
        break;
        
      case 'SettlementCompleted':
        await handleSettlementCompleted(payment);
        break;
        
      default:
        console.warn(`Unknown webhook event: ${event}`);
    }
    
    // IMPORTANT: Always return 200 OK quickly!
    res.status(200).json({ success: true });
    
  } catch (error) {
    console.error('Error processing webhook:', error);
    
    // Return 500 to trigger retry
    res.status(500).json({ error: 'Internal error' });
  }
});

// Event handlers
async function handlePaymentCreated(payment) {
  console.log(`💳 Payment created: ${payment.id}`);
  
  // Update your database
  await db.orders.update({
    where: { id: payment.metadata.order_id },
    data: { 
      payment_status: 'pending',
      zendfi_payment_id: payment.id
    }
  });
}

async function handlePaymentConfirmed(payment) {
  console.log(`Payment confirmed: ${payment.id}`);
  
  const orderId = payment.metadata.order_id;
  
  // Mark order as paid
  await db.orders.update({
    where: { id: orderId },
    data: { 
      payment_status: 'paid',
      transaction_signature: payment.transaction_signature,
      paid_at: new Date()
    }
  });
  
  // Deliver digital goods
  await deliverDigitalProduct(orderId);
  
  // Send confirmation email
  await sendConfirmationEmail(orderId);
  
  console.log(`🎉 Order ${orderId} fulfilled!`);
}

async function handlePaymentFailed(payment) {
  console.log(`Payment failed: ${payment.id}`);
  
  await db.orders.update({
    where: { id: payment.metadata.order_id },
    data: { payment_status: 'failed' }
  });
  
  // Notify customer
  await sendPaymentFailedEmail(payment.metadata.order_id);
}

async function handlePaymentExpired(payment) {
  console.log(`⏰ Payment expired: ${payment.id}`);
  
  await db.orders.update({
    where: { id: payment.metadata.order_id },
    data: { payment_status: 'expired' }
  });
}

async function handleSettlementCompleted(payment) {
  console.log(`💰 Settlement completed: ${payment.id}`);
  
  // Update revenue tracking
  await db.revenue.create({
    data: {
      payment_id: payment.id,
      amount_usd: payment.amount_usd,
      settled_at: new Date()
    }
  });
}

app.listen(3000, () => {
  console.log('🚀 Webhook server running on http://localhost:3000');
});
```

---

### Python/Flask: Webhook Handler with Signature Verification

```python
from flask import Flask, request, jsonify
import hmac
import hashlib
import time
import os

app = Flask(__name__)
WEBHOOK_SECRET = os.getenv('ZENDFI_WEBHOOK_SECRET')

def verify_webhook_signature(payload, signature, secret):
    """Verify HMAC-SHA256 webhook signature"""
    try:
        # Parse signature: "t=1705318245,v1=abc123..."
        parts = signature.split(',')
        if len(parts) != 2:
            return False
        
        timestamp = int(parts[0].split('=')[1])
        provided_sig = parts[1].split('=')[1]
        
        # Check timestamp (max 5 minutes old, not in future)
        now = int(time.time())
        age = now - timestamp
        if age > 300 or age < -60:
            print(f"⚠️ Webhook timestamp invalid: {age}s old")
            return False
        
        # Compute expected signature
        signed_payload = f"{timestamp}:{payload}"
        expected_sig = hmac.new(
            secret.encode('utf-8'),
            signed_payload.encode('utf-8'),
            hashlib.sha256
        ).hexdigest()
        
        # Constant-time comparison
        return hmac.compare_digest(provided_sig, expected_sig)
        
    except Exception as e:
        print(f"Signature verification error: {e}")
        return False

@app.route('/webhooks/zendfi', methods=['POST'])
def webhook_handler():
    """Handle incoming ZendFi webhooks"""
    signature = request.headers.get('X-ZendFi-Signature')
    payload = request.get_data(as_text=True)
    
    # Verify signature
    if not verify_webhook_signature(payload, signature, WEBHOOK_SECRET):
        print("⚠️ Invalid webhook signature!")
        return jsonify({'error': 'Invalid signature'}), 401
    
    # Parse webhook
    webhook = request.get_json()
    event = webhook['event']
    payment = webhook['payment']
    
    print(f"Received webhook: {event} for payment {payment['id']}")
    
    try:
        # Handle different event types
        if event == 'PaymentCreated':
            handle_payment_created(payment)
        elif event == 'PaymentConfirmed':
            handle_payment_confirmed(payment)
        elif event == 'PaymentFailed':
            handle_payment_failed(payment)
        elif event == 'PaymentExpired':
            handle_payment_expired(payment)
        elif event == 'SettlementCompleted':
            handle_settlement_completed(payment)
        else:
            print(f"⚠️ Unknown webhook event: {event}")
        
        # IMPORTANT: Always return 200 OK quickly!
        return jsonify({'success': True}), 200
        
    except Exception as e:
        print(f"Error processing webhook: {e}")
        # Return 500 to trigger retry
        return jsonify({'error': 'Internal error'}), 500

def handle_payment_created(payment):
    """Handle PaymentCreated event"""
    print(f"💳 Payment created: {payment['id']}")
    
    # Update database
    order_id = payment['metadata']['order_id']
    db.update_order_status(order_id, 'pending', payment['id'])

def handle_payment_confirmed(payment):
    """Handle PaymentConfirmed event"""
    print(f"Payment confirmed: {payment['id']}")
    
    order_id = payment['metadata']['order_id']
    
    # Mark order as paid
    db.update_order_status(
        order_id, 
        'paid', 
        payment['id'],
        payment['transaction_signature']
    )
    
    # Deliver digital product
    deliver_digital_product(order_id)
    
    # Send confirmation email
    send_confirmation_email(order_id)
    
    print(f"🎉 Order {order_id} fulfilled!")

def handle_payment_failed(payment):
    """Handle PaymentFailed event"""
    print(f"Payment failed: {payment['id']}")
    
    order_id = payment['metadata']['order_id']
    db.update_order_status(order_id, 'failed', payment['id'])
    
    # Notify customer
    send_payment_failed_email(order_id)

def handle_payment_expired(payment):
    """Handle PaymentExpired event"""
    print(f"⏰ Payment expired: {payment['id']}")
    
    order_id = payment['metadata']['order_id']
    db.update_order_status(order_id, 'expired', payment['id'])

def handle_settlement_completed(payment):
    """Handle SettlementCompleted event"""
    print(f"💰 Settlement completed: {payment['id']}")
    
    # Update revenue tracking
    db.log_revenue(payment['id'], payment['amount_usd'])

if __name__ == '__main__':
    app.run(debug=True, port=5000)
```

---

## Best Practices

### DO

- **Always verify signatures**: Protect against spoofing
- **Return 200 OK quickly**: Under 30 seconds, ideally under 3 seconds
- **Process asynchronously**: Use job queues for slow operations
- **Handle idempotency**: Same webhook may be delivered multiple times
- **Log everything**: Track webhooks for debugging
- **Monitor DLQ**: Check for exhausted webhooks regularly
- **Test thoroughly**: Use ngrok or webhook.site during development
- **Use HTTPS**: Required for production webhook URLs

### DON'T

- **Don't skip signature verification**: Security risk!
- **Don't perform slow operations**: Causes timeouts and retries
- **Don't assume order**: Webhooks may arrive out of order
- **Don't return errors for duplicates**: Handle idempotency gracefully
- **Don't hardcode webhook secret**: Use environment variables
- **Don't use HTTP**: Always HTTPS for production
- **Don't expose webhook endpoint publicly**: Add rate limiting

---

## Webhook Checklist

Before going live, make sure you've:

- [ ] Implemented signature verification
- [ ] Tested with ngrok or webhook.site
- [ ] Handle all 5 event types
- [ ] Return 200 OK within 30 seconds
- [ ] Implement idempotency (deduplicate webhooks)
- [ ] Add error logging and monitoring
- [ ] Use HTTPS endpoint
- [ ] Store webhook secret in environment variables
- [ ] Test retry behavior (return 500 to trigger)
- [ ] Monitor Dead Letter Queue
- [ ] Add webhook events to your application logs
- [ ] Set up alerts for webhook failures

---

## Summary & Next Steps

Congratulations! You're now a webhook expert!

**What You Learned:**
- Set up secure webhook endpoints with HMAC-SHA256 verification
- Handle all 5 payment lifecycle events
- Implement automatic retry logic understanding
- Monitor and resolve Dead Letter Queue entries
- Test webhooks locally with ngrok
- Follow best practices for production-ready webhooks

**Next Steps:**
1. Explore [Wallet Management](./05-wallet-management.md) to manage your funds
2. Check out [Advanced Features](./06-advanced-features.md) for payment splits, subscriptions, and more
3. Review [API Reference](./07-reference.md) for complete endpoint documentation

**Need Help?**
- Email: support@zendfi.tech
- Discord: discord.gg/zendfi
- Docs: https://docs.zendfi.tech

Happy building!
