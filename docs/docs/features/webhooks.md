---
sidebar_position: 2
title: Webhooks
description: Real-time event notifications for payment lifecycle
---

# Webhooks

Receive real-time notifications when events happen in your ZendFi account. Webhooks let you automate workflows, update your systems, and provide instant feedback to users.

## How Webhooks Work

```
Payment Event → ZendFi → POST to Your URL → Your Server Processes
```

1. An event occurs (payment confirmed, subscription renewed, etc.)
2. ZendFi sends an HTTP POST request to your webhook URL
3. Your server receives and processes the event
4. Respond with 200 OK to acknowledge receipt


## Quick Setup

### 1. Create a Webhook Endpoint

Build an endpoint on your server to receive webhook events:

```typescript
// Express.js example
import express from 'express';
import crypto from 'crypto';

const app = express();
app.use(express.json());

app.post('/webhooks/zendfi', (req, res) => {
  // Verify the webhook signature
  const signature = req.headers['x-zendfi-signature'];
  const payload = JSON.stringify(req.body);
  
  const expectedSignature = crypto
    .createHmac('sha256', process.env.ZENDFI_WEBHOOK_SECRET)
    .update(payload)
    .digest('hex');
  
  if (signature !== expectedSignature) {
    return res.status(401).json({ error: 'Invalid signature' });
  }
  
  // Process the event
  const { event, payment } = req.body;
  
  switch (event) {
    case 'PaymentConfirmed':
      // Grant access, send confirmation, update database
      console.log('Payment confirmed:', payment.id);
      break;
    case 'SubscriptionRenewed':
      // Extend subscription period
      console.log('Subscription renewed:', payment.id);
      break;
    // ... handle other events
  }
  
  // Acknowledge receipt
  res.status(200).json({ received: true });
});

app.listen(3000);
```

### 2. Configure Your Webhook URL

Set your webhook URL in the merchant dashboard or via API:

```bash
curl -X PUT https://api.zendfi.tech/api/v1/merchants/me/webhook \
  -H "Authorization: Bearer zfi_live_abc123..." \
  -H "Content-Type: application/json" \
  -d '{
    "webhook_url": "https://myapp.com/webhooks/zendfi"
  }'
```

**Response:**

```json
{
  "success": true,
  "webhook_url": "https://myapp.com/webhooks/zendfi",
  "webhook_secret": "whsec_abc123xyz789...",
  "message": "Webhook URL updated successfully"
}
```

:::warning Save Your Secret!
The webhook secret is shown when you configure your webhook URL. Save it securely - you'll need it to verify webhook signatures.
:::

### 3. Start Receiving Events

Once configured, ZendFi will send events to your URL immediately when they occur.


## Webhook Events

### Payment Events

| Event | Description | Trigger |
|-------|-------------|---------|
| `PaymentCreated` | Payment request created | Create payment API called |
| `PaymentConfirmed` | Payment confirmed on-chain | Transaction confirmed |
| `PaymentFailed` | Payment failed | Transaction failed or expired |
| `PaymentExpired` | Payment link expired | Expiration time reached |

### Payment Intent Events

| Event | Description | Trigger |
|-------|-------------|---------|
| `PaymentIntentCreated` | Payment intent created | Create intent API called |
| `PaymentIntentRequiresPayment` | Awaiting payment | Intent ready for payment |
| `PaymentIntentSucceeded` | Intent payment successful | Payment confirmed |
| `PaymentIntentCanceled` | Intent cancelled | Cancel API called |
| `PaymentIntentFailed` | Intent payment failed | Payment failed |

### Subscription Events

| Event | Description | Trigger |
|-------|-------------|---------|
| `SubscriptionCreated` | New subscription started | Customer subscribed |
| `SubscriptionRenewed` | Subscription billing completed | Renewal payment confirmed |
| `SubscriptionPaymentFailed` | Renewal payment failed | Payment not received |
| `SubscriptionCancelled` | Subscription cancelled | Cancel API called |

### Installment Events

| Event | Description | Trigger |
|-------|-------------|---------|
| `InstallmentPaid` | Installment payment received | Payment confirmed |
| `InstallmentLate` | Payment overdue | Grace period ended |
| `InstallmentDefaulted` | Customer defaulted | Excessive late payments |
| `InstallmentPlanCompleted` | All installments paid | Final payment confirmed |

### Invoice Events

| Event | Description | Trigger |
|-------|-------------|---------|
| `InvoiceCreated` | Invoice created | Create invoice API called |
| `InvoiceSent` | Invoice emailed | Send API called |
| `InvoicePaid` | Invoice fully paid | Balance reaches zero |

### Payment Link Events

| Event | Description | Trigger |
|-------|-------------|---------|
| `PaymentLinkCreated` | Payment link created | Create link API called |
| `PaymentLinkUsed` | Payment via link | Link payment confirmed |

### Escrow Events

| Event | Description | Trigger |
|-------|-------------|---------|
| `EscrowCreated` | Escrow contract created | Create escrow API called |
| `EscrowFunded` | Escrow funded | Funds deposited |
| `EscrowReleased` | Funds released to recipient | Release API called |
| `EscrowRefunded` | Funds returned to payer | Refund API called |
| `EscrowDisputed` | Escrow disputed | Dispute API called |

### Withdrawal Events

| Event | Description | Trigger |
|-------|-------------|---------|
| `WithdrawalInitiated` | Withdrawal requested | Withdraw API called |
| `WithdrawalCompleted` | Withdrawal successful | Transaction confirmed |
| `WithdrawalFailed` | Withdrawal failed | Transaction failed |

### Settlement Events

| Event | Description | Trigger |
|-------|-------------|---------|
| `SettlementCompleted` | Settlement processed | Funds settled |
| `SettlementFailed` | Settlement failed | Settlement error |


## Webhook Payload Structure

All webhooks follow this structure:

```json
{
  "event": "PaymentConfirmed",
  "timestamp": "2025-10-26T15:30:00Z",
  "signature": "t=1698325200,v1=abc123...",
  "payment": {
    // Payment data (see below)
  }
}
```

**Top-level fields:**

| Field | Type | Description |
|-------|------|-------------|
| `event` | string | Event type (e.g., `PaymentConfirmed`) |
| `timestamp` | string | ISO 8601 timestamp |
| `signature` | string | HMAC signature for verification |
| `payment` | object | Payment data (for payment events) |
| `settlement` | object | Settlement data (for settlement events) |
| `withdrawal` | object | Withdrawal data (for withdrawal events) |

### Payment Event Example

```json
{
  "event": "PaymentConfirmed",
  "timestamp": "2025-10-26T15:30:00Z",
  "signature": "t=1698325200,v1=abc123def456...",
  "payment": {
    "id": "pay_xyz789",
    "merchant_id": "merch_abc123",
    "amount_usd": 99.99,
    "status": "confirmed",
    "transaction_signature": "5K2Nz7J8H2...",
    "customer_wallet": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
    "payment_token": "USDC",
    "mode": "live",
    "payment_url": "https://checkout.zendfi.tech/pay/pay_xyz789",
    "description": null,
    "created_at": "2025-10-26T15:28:00Z",
    "expires_at": "2025-10-26T16:28:00Z",
    "metadata": {
      "user_id": "user_12345",
      "plan": "pro"
    },
    "splits": [
      {
        "id": "split_123",
        "recipient_wallet": "PartnerWallet...",
        "recipient_name": "Partner",
        "percentage": 10.0,
        "amount_usd": 9.99,
        "amount_crypto": 9.99,
        "currency": "USDC",
        "status": "completed",
        "transaction_signature": "5K2Nz7J8H2...",
        "settled_at": "2025-10-26T15:30:00Z",
        "failure_reason": null,
        "split_order": 0
      }
    ]
  },
  "settlement": null,
  "withdrawal": null
}
```

## Verifying Webhooks

:::danger Always Verify Signatures
Never process webhooks without verifying the signature. Attackers could send fake events to your endpoint.
:::

### Signature Verification

ZendFi signs all webhooks with your webhook secret using HMAC-SHA256.

**Headers sent with each webhook:**

| Header | Description |
|--------|-------------|
| `X-ZendFi-Signature` | HMAC-SHA256 signature |
| `X-ZendFi-Event` | Event type |
| `X-ZendFi-Delivery` | Webhook delivery ID |
| `X-ZendFi-Attempt` | Delivery attempt number (1-5) |

### Verification Code Examples

**Node.js:**

```typescript
import crypto from 'crypto';

function verifyWebhook(payload: string, signature: string, secret: string): boolean {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}

// Usage
const rawBody = JSON.stringify(req.body);
const signature = req.headers['x-zendfi-signature'];
const isValid = verifyWebhook(
  rawBody,
  signature,
  process.env.ZENDFI_WEBHOOK_SECRET
);
```

**Python:**

```python
import hmac
import hashlib

def verify_webhook(payload: str, signature: str, secret: str) -> bool:
    expected = hmac.new(
        secret.encode(),
        payload.encode(),
        hashlib.sha256
    ).hexdigest()
    
    return hmac.compare_digest(signature, expected)

# Usage
is_valid = verify_webhook(
    request.get_data(as_text=True),
    request.headers.get('X-ZendFi-Signature'),
    os.environ['ZENDFI_WEBHOOK_SECRET']
)
```


## Managing Webhooks

### Update Webhook URL

```bash
curl -X PUT https://api.zendfi.tech/api/v1/merchants/me/webhook \
  -H "Authorization: Bearer zfi_live_abc123..." \
  -H "Content-Type: application/json" \
  -d '{
    "webhook_url": "https://myapp.com/webhooks/v2/zendfi"
  }'
```

### List Webhook Events

Get recent webhook deliveries:

```bash
curl -X GET https://api.zendfi.tech/api/v1/webhooks \
  -H "Authorization: Bearer zfi_live_abc123..."
```

**Response:**

```json
[
  {
    "id": "wh_xyz789",
    "payment_id": "pay_abc123",
    "merchant_id": "merch_abc123",
    "event_type": "PaymentConfirmed",
    "payload": { /* full webhook payload */ },
    "webhook_url": "https://myapp.com/webhooks/zendfi",
    "status": "delivered",
    "attempts": 1,
    "last_attempt_at": "2025-10-26T15:30:01Z",
    "next_retry_at": null,
    "response_code": 200,
    "response_body": "{\"received\":true}",
    "created_at": "2025-10-26T15:30:00Z"
  }
]
```

### Retry Failed Webhook

Manually retry a failed webhook:

```bash
curl -X POST https://api.zendfi.tech/api/v1/webhooks/wh_xyz789/retry \
  -H "Authorization: Bearer zfi_live_abc123..."
```


## Testing Webhooks

### Send Test Event

Trigger a test webhook to verify your endpoint:

```bash
curl -X POST https://api.zendfi.tech/api/v1/merchants/me/webhook/test \
  -H "Authorization: Bearer zfi_live_abc123..."
```

**Response:**

```json
{
  "success": true,
  "status_code": 200,
  "response_time_ms": 145,
  "response_body": "{\"received\":true}",
  "message": "Webhook test successful!"
}
```

### Using ngrok for Local Development

1. Install ngrok: `npm install -g ngrok`
2. Start your local server: `npm run dev`
3. Expose it: `ngrok http 3000`
4. Use the ngrok URL as your webhook URL

```bash
curl -X PUT https://api.zendfi.tech/api/v1/merchants/me/webhook \
  -H "Authorization: Bearer zfi_test_abc123..." \
  -H "Content-Type: application/json" \
  -d '{
    "webhook_url": "https://abc123.ngrok.io/webhooks/zendfi"
  }'
```


## Retry Policy

If your endpoint doesn't respond with 2xx status, ZendFi retries:

| Attempt | Delay |
|---------|-------|
| 1 | Immediate |
| 2 | 1 minute |
| 3 | 5 minutes |
| 4 | 15 minutes |
| 5 | 1 hour |
| 6 | 24 hours |

After 5 failed attempts, the webhook is marked as exhausted and moved to the dead letter queue.

### Retry Headers

Retry attempts include the attempt number:

| Header | Description |
|--------|-------------|
| `X-ZendFi-Attempt` | Delivery attempt number (1-5) |
| `X-ZendFi-Delivery` | Unique delivery ID |

## Best Practices

### Endpoint Design

1. **Respond Quickly** - Return 200 immediately, process async
2. **Idempotency** - Handle duplicate events gracefully
3. **Logging** - Log all received webhooks for debugging
4. **Error Handling** - Catch exceptions, don't crash on bad data

### Idempotent Processing

Use the delivery ID to prevent processing duplicates:

```typescript
app.post('/webhooks/zendfi', async (req, res) => {
  const deliveryId = req.headers['x-zendfi-delivery'];
  
  // Check if already processed
  const existing = await db.webhookEvents.findOne({ deliveryId });
  if (existing) {
    return res.status(200).json({ received: true, duplicate: true });
  }
  
  // Mark as processing
  await db.webhookEvents.create({ deliveryId, status: 'processing' });
  
  // Acknowledge immediately
  res.status(200).json({ received: true });
  
  // Process asynchronously
  processWebhookAsync(req.body);
});
```

### Security

1. **Verify Signatures** - Always verify HMAC signatures
2. **Use HTTPS** - Only use HTTPS webhook URLs
3. **Validate Data** - Don't trust webhook data blindly
4. **Rate Limiting** - Implement rate limiting on your endpoint


## Webhook Status

Check webhook delivery status:

| Status | Description |
|--------|-------------|
| `pending` | Queued for delivery |
| `delivered` | Successfully delivered (200 OK) |
| `failed` | Failed delivery, will retry |
| `exhausted` | Failed after 5 attempts, in dead letter queue |

## Next Steps

- [Payments API](../api/payments) - Create payments that trigger webhooks
- [Subscriptions](../api/subscriptions) - Set up recurring billing with webhook events
- [TypeScript Guide](../developer-tools/typescript-guide) - Type-safe webhook handlers
