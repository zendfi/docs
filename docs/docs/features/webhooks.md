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

1. An event occurs (payment completed, subscription renewed, etc.)
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
  const { event, data } = req.body;
  
  switch (event) {
    case 'payment.completed':
      // Grant access, send confirmation, update database
      console.log('Payment completed:', data.payment_id);
      break;
    case 'subscription.renewed':
      // Extend subscription period
      console.log('Subscription renewed:', data.subscription.id);
      break;
    // ... handle other events
  }
  
  // Acknowledge receipt
  res.status(200).json({ received: true });
});

app.listen(3000);
```

### 2. Register Your Webhook

```bash
curl -X POST https://api.zendfi.tech/api/v1/webhooks \
  -H "Authorization: Bearer zfi_live_abc123..." \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://myapp.com/webhooks/zendfi",
    "events": ["payment.completed", "subscription.renewed"],
    "description": "Production webhook"
  }'
```

**Response:**

```json
{
  "id": "wh_abc123def456",
  "url": "https://myapp.com/webhooks/zendfi",
  "events": ["payment.completed", "subscription.renewed"],
  "secret": "whsec_abc123xyz789...",
  "active": true,
  "created_at": "2025-10-26T12:00:00Z"
}
```

:::warning Save Your Secret!
The webhook secret is only shown once. Save it securely - you'll need it to verify webhook signatures.
:::

### 3. Start Receiving Events

Once registered, ZendFi will send events to your URL immediately when they occur.


## Webhook Events

### Payment Events

| Event | Description | Trigger |
|-------|-------------|---------|
| `payment.created` | Payment request created | Create payment API called |
| `payment.pending` | Awaiting blockchain confirmation | Transaction submitted |
| `payment.completed` | Payment confirmed on-chain | Transaction confirmed |
| `payment.failed` | Payment failed | Transaction failed or expired |
| `payment.expired` | Payment link expired | Expiration time reached |

### Subscription Events

| Event | Description | Trigger |
|-------|-------------|---------|
| `subscription.created` | New subscription started | Customer subscribed |
| `subscription.renewed` | Subscription billing completed | Renewal payment confirmed |
| `subscription.payment_failed` | Renewal payment failed | Payment not received |
| `subscription.cancelled` | Subscription cancelled | Cancel API called |
| `subscription.expired` | Subscription expired | Max cycles reached |


### Installment Events

| Event | Description | Trigger |
|-------|-------------|---------|
| `installment.created` | Installment plan created | Create installment API called |
| `installment.first_payment` | Down payment received | First payment confirmed |
| `installment.payment_due` | Installment payment due | Due date reached |
| `installment.payment_received` | Installment paid | Payment confirmed |
| `installment.payment_late` | Payment overdue | Grace period ended |
| `installment.completed` | All installments paid | Final payment confirmed |
| `installment.defaulted` | Customer defaulted | Excessive late payments |

### Invoice Events

| Event | Description | Trigger |
|-------|-------------|---------|
| `invoice.created` | Invoice created | Create invoice API called |
| `invoice.sent` | Invoice emailed | Send API called |
| `invoice.viewed` | Customer viewed invoice | Invoice page loaded |
| `invoice.payment_received` | Payment received | Full or partial payment |
| `invoice.paid` | Invoice fully paid | Balance reaches zero |
| `invoice.overdue` | Invoice past due | Due date passed |
| `invoice.voided` | Invoice voided | Void API called |

### Payment Link Events

| Event | Description | Trigger |
|-------|-------------|---------|
| `payment_link.created` | Payment link created | Create link API called |
| `payment_link.payment_completed` | Payment via link | Link payment confirmed |
| `payment_link.deactivated` | Link deactivated | Deactivate API called |
| `payment_link.expired` | Link expired | Expiration reached |
| `payment_link.limit_reached` | Usage limit hit | max_uses reached |

## Webhook Payload Structure

All webhooks follow this structure:

```json
{
  "id": "evt_abc123def456",
  "event": "payment.completed",
  "timestamp": "2025-10-26T15:30:00Z",
  "api_version": "2025-01",
  "data": {
    // Event-specific data
  }
}
```

### Payment Completed Example

```json
{
  "id": "evt_abc123def456",
  "event": "payment.completed",
  "timestamp": "2025-10-26T15:30:00Z",
  "api_version": "2025-01",
  "data": {
    "payment_id": "pay_xyz789",
    "merchant_id": "merchant_abc123",
    "amount": 99.99,
    "currency": "USD",
    "description": "Pro Plan Subscription",
    "status": "completed",
    "customer_wallet": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
    "customer_email": "customer@example.com",
    "transaction_signature": "5K2Nz7J8H2...",
    "confirmed_at": "2025-10-26T15:29:55Z",
    "metadata": {
      "user_id": "user_12345",
      "plan": "pro"
    },
    "splits": [
      {
        "wallet": "PartnerWallet...",
        "percentage": 10,
        "amount": 9.99,
        "settled": true
      }
    ]
  }
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
| `X-ZendFi-Timestamp` | Unix timestamp of the request |
| `X-ZendFi-Event-ID` | Unique event ID |

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
const isValid = verifyWebhook(
  JSON.stringify(req.body),
  req.headers['x-zendfi-signature'],
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

### List Webhooks

```bash
curl -X GET https://api.zendfi.tech/api/v1/webhooks \
  -H "Authorization: Bearer zfi_live_abc123..."
```

### Update Webhook

```bash
curl -X PATCH https://api.zendfi.tech/api/v1/webhooks/wh_abc123def456 \
  -H "Authorization: Bearer zfi_live_abc123..." \
  -H "Content-Type: application/json" \
  -d '{
    "events": ["payment.completed", "payment.failed"],
    "url": "https://myapp.com/webhooks/v2/zendfi"
  }'
```

### Delete Webhook

```bash
curl -X DELETE https://api.zendfi.tech/api/v1/webhooks/wh_abc123def456 \
  -H "Authorization: Bearer zfi_live_abc123..."
```

### Rotate Webhook Secret

```bash
curl -X POST https://api.zendfi.tech/api/v1/webhooks/wh_abc123def456/rotate-secret \
  -H "Authorization: Bearer zfi_live_abc123..."
```


## Testing Webhooks

### Send Test Event

Trigger a test webhook to verify your endpoint:

```bash
curl -X POST https://api.zendfi.tech/api/v1/webhooks/wh_abc123def456/test \
  -H "Authorization: Bearer zfi_live_abc123..." \
  -H "Content-Type: application/json" \
  -d '{
    "event": "payment.completed"
  }'
```

### Using ngrok for Local Development

1. Install ngrok: `npm install -g ngrok`
2. Start your local server: `npm run dev`
3. Expose it: `ngrok http 3000`
4. Use the ngrok URL as your webhook URL

```bash
curl -X POST https://api.zendfi.tech/api/v1/webhooks \
  -H "Authorization: Bearer zfi_test_abc123..." \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://abc123.ngrok.io/webhooks/zendfi",
    "events": ["*"]
  }'
```


## Retry Policy

If your endpoint doesn't respond with 2xx status, ZendFi retries:

| Attempt | Delay |
|---------|-------|
| 1 | Immediate |
| 2 | 5 minutes |
| 3 | 30 minutes |
| 4 | 2 hours |
| 5 | 8 hours |
| 6 | 24 hours |

After 6 failed attempts, the webhook is marked as failed. You can view failed webhooks in your dashboard.

### Retry Headers

Retry attempts include additional headers:

| Header | Description |
|--------|-------------|
| `X-ZendFi-Retry-Count` | Number of retry attempt (1-6) |
| `X-ZendFi-Original-Timestamp` | When the event originally occurred |

## Best Practices

### Endpoint Design

1. **Respond Quickly** - Return 200 immediately, process async
2. **Idempotency** - Handle duplicate events gracefully
3. **Logging** - Log all received webhooks for debugging
4. **Error Handling** - Catch exceptions, don't crash on bad data

### Idempotent Processing

Use the event ID to prevent processing duplicates:

```typescript
app.post('/webhooks/zendfi', async (req, res) => {
  const eventId = req.body.id;
  
  // Check if already processed
  const existing = await db.webhookEvents.findOne({ eventId });
  if (existing) {
    return res.status(200).json({ received: true, duplicate: true });
  }
  
  // Mark as processing
  await db.webhookEvents.create({ eventId, status: 'processing' });
  
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
4. **IP Allowlist** - Optionally restrict to ZendFi IPs

ZendFi webhook IPs (for allowlisting):
- `34.102.136.180`
- `34.102.136.181`
- `34.102.136.182`


## Webhook Logs

View recent webhook deliveries in your dashboard or via API:

```bash
curl -X GET https://api.zendfi.tech/api/v1/webhooks/wh_abc123def456/logs \
  -H "Authorization: Bearer zfi_live_abc123..."
```

**Response:**

```json
{
  "logs": [
    {
      "id": "log_xyz789",
      "event_id": "evt_abc123",
      "event": "payment.completed",
      "url": "https://myapp.com/webhooks/zendfi",
      "status_code": 200,
      "response_time_ms": 145,
      "delivered_at": "2025-10-26T15:30:01Z",
      "success": true
    },
    {
      "id": "log_xyz790",
      "event_id": "evt_def456",
      "event": "payment.failed",
      "url": "https://myapp.com/webhooks/zendfi",
      "status_code": 500,
      "response_time_ms": 3000,
      "delivered_at": "2025-10-26T15:25:00Z",
      "success": false,
      "retry_count": 2,
      "next_retry": "2025-10-26T17:25:00Z"
    }
  ]
}
```


## Next Steps

- [Payments API](/api/payments) - Create payments that trigger webhooks
- [Subscriptions](/api/subscriptions) - Set up recurring billing with webhook events
- [SDKs](/developer-tools/sdks) - Use our SDKs for easier webhook handling
