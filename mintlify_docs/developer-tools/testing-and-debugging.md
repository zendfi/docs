---
sidebar_position: 6
title: Testing & Debugging
description: Complete guide to testing ZendFi integrations locally and debugging common issues.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Local Development Setup

### 1. Get API Keys

Create test mode API keys from your [dashboard](https://dashboard.zendfi.tech):

```bash
# .env.local or .env
ZENDFI_API_KEY=zfi_test_abc123...
ZENDFI_WEBHOOK_SECRET=whsec_test_xyz789...
```

>Tip: Test Mode
API keys starting with `zfi_test_` automatically use test mode - no real crypto transactions!

### 2. Install Dependencies

<Tabs groupId="package-manager">
<TabItem value="npm" label="npm" default>

```bash
npm install @zendfi/sdk
```

</TabItem>
<TabItem value="yarn" label="yarn">

```bash
yarn add @zendfi/sdk
```

</TabItem>
<TabItem value="pnpm" label="pnpm">

```bash
pnpm add @zendfi/sdk
```

</TabItem>
</Tabs>

### 3. Enable Debug Mode

<Tabs groupId="framework">
<TabItem value="sdk" label="TypeScript SDK" default>

```typescript
import { ZendFiClient } from '@zendfi/sdk';

const zendfi = new ZendFiClient({
  apiKey: process.env.ZENDFI_API_KEY,
  debug: true // Logs all requests/responses
});

// Or use environment variable
// ZENDFI_DEBUG=true
```

</TabItem>
<TabItem value="env" label="Environment Variable">

```bash
# .env.local
ZENDFI_DEBUG=true
ZENDFI_API_KEY=zfi_test_abc123...
```

</TabItem>
</Tabs>

Debug mode logs:
-  Request URL, method, headers
-  Request body (sanitized)
-  Response status, headers
-  Response body
-  Request timing


## Testing Payments Locally

### Create Test Payment

```typescript
import { ZendFiClient } from '@zendfi/sdk';

const zendfi = new ZendFiClient({
  apiKey: process.env.ZENDFI_API_KEY,
});

// Create test payment
const payment = await zendfi.createPayment({
  amount: 10,
  currency: 'USD',
  description: 'Test Payment'
});

console.log('Payment URL:', payment.payment_url);
// Visit this URL to complete test payment
```

### Test Payment with CLI

The CLI provides a quick way to test payments:

```bash
# Create test payment
zendfi payment create \
  --amount 50 \
  --description "Test order #123"

# Check payment status
zendfi payment status pay_abc123
```

### Simulate Payment Completion

In test mode, you can simulate payment completion without real crypto:

```typescript
// Create payment
const payment = await zendfi.createPayment({
  amount: 25,
  currency: 'USD'
});

// In test mode, visit the payment URL and click "Simulate Payment"
// Or use the dashboard to mark as paid
```

## Testing Webhooks Locally

Webhooks need a public URL, but you're developing on `localhost`. Here are solutions:

### Option 1: CLI Webhook Forwarding (Recommended)

The ZendFi CLI can forward webhooks to your local server:

```bash
# Forward webhooks to localhost:3000
zendfi webhooks --forward-to http://localhost:3000/api/webhooks/zendfi

# This creates a secure tunnel and automatically configures your webhook endpoint
```

**Output:**
```
✓ Tunnel created: https://abc123.zendfi.dev
✓ Webhook endpoint configured
✓ Forwarding to http://localhost:3000/api/webhooks/zendfi

Listening for webhooks...
Press Ctrl+C to stop
```

Now any webhook events will be forwarded to your local server!

### Option 2: ngrok

```bash
# Install ngrok
npm install -g ngrok

# Start tunnel
ngrok http 3000

# Copy the HTTPS URL (e.g., https://abc123.ngrok.io)
# Add to dashboard: Settings → Webhooks → Add Endpoint
```

### Option 3: Local Webhook Testing

Test webhook handler logic without external service:

```typescript
import { ZendFiClient } from '@zendfi/sdk';

const zendfi = new ZendFiClient({
  apiKey: process.env.ZENDFI_API_KEY,
});

// Your webhook handler
async function handleWebhook(body: any, signature: string) {
  const isValid = zendfi.verifyWebhook({
    payload: body,
    signature,
    secret: process.env.ZENDFI_WEBHOOK_SECRET!,
  });
  
  if (!isValid) {
    console.error('Invalid webhook signature');
    return;
  }
  
  const event = typeof body === 'string' ? JSON.parse(body) : body;
  
  console.log('Event:', event.event_type);
  console.log('Data:', event.data);
}

// Simulate webhook payload
const mockPayload = {
  event_type: 'PaymentConfirmed',
  timestamp: new Date().toISOString(),
  merchant_id: 'merch_test_123',
  data: {
    id: 'pay_test_123',
    amount: 50,
    status: 'confirmed'
  }
};

// Test handler (skip signature verification for local testing)
await handleWebhook(mockPayload, 'mock_signature');
```

### Verify Webhook Signatures

Always verify webhook signatures in production:

```typescript
import { ZendFiClient } from '@zendfi/sdk';

const zendfi = new ZendFiClient({
  apiKey: process.env.ZENDFI_API_KEY,
});

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get('x-zendfi-signature');
  
  if (!signature) {
    return new Response('No signature', { status: 400 });
  }
  
  // Verify signature
  const isValid = zendfi.verifyWebhook({
    payload: body,
    signature,
    secret: process.env.ZENDFI_WEBHOOK_SECRET!
  });
  
  if (!isValid) {
    return new Response('Invalid signature', { status: 401 });
  }
  
  // Parse and handle event
  const event = JSON.parse(body);
  console.log('Verified event:', event.event_type);
  
  return new Response('Success', { status: 200 });
}
```


## Common Issues & Solutions

### Issue: "Invalid API key"

**Symptoms:**
```
Error: Invalid API key provided
Status: 401 Unauthorized
```

**Solutions:**
1.  Check API key is correct (no extra spaces)
2.  Verify environment variable is loaded:
   ```typescript
   console.log('API Key:', process.env.ZENDFI_API_KEY?.substring(0, 15) + '...');
   ```
3.  Restart dev server after changing `.env` file
4.  Use `zfi_test_` prefix for test mode

### Issue: "Payment URL not working"

**Symptoms:**
- Payment link shows 404 or error page
- Cannot complete payment

**Solutions:**
1.  Verify payment was created successfully (check `payment.id`)
2.  Use `payment.payment_url` field (snake_case, not camelCase)
3.  Check payment hasn't expired
4.  Test mode payments require test wallet

### Issue: "Webhooks not received"

**Symptoms:**
- Payment completes but webhook never fires
- No events logged

**Solutions:**
1.  Verify webhook endpoint is configured in dashboard
2.  Endpoint must be **publicly accessible** (use CLI webhook forwarding or ngrok for localhost)
3.  Endpoint must return **200 status code**
4.  Check webhook logs in dashboard for delivery errors
5.  Verify signature is being validated correctly using `zendfi.verifyWebhook()`
6.  Check firewall isn't blocking ZendFi IPs

### Issue: "Module not found: @zendfi/sdk"

**Symptoms:**
```
Error: Cannot find module '@zendfi/sdk'
```

**Solutions:**
1.  Install package: `npm install @zendfi/sdk`
2.  Restart TypeScript server (VS Code: Cmd+Shift+P → "Restart TS Server")
3.  Delete `node_modules` and reinstall:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

### Issue: "Type errors with SDK"

**Symptoms:**
```typescript
// Property 'paymentUrl' does not exist on type 'Payment'
const url = payment.paymentUrl;
```

**Solutions:**
1.  Use snake_case field names: `payment.payment_url` (not `payment.paymentUrl`)
2.  Update to latest SDK version:
   ```bash
   npm install @zendfi/sdk@latest
   ```
3.  Check TypeScript version (requires 4.5+):
   ```bash
   npx tsc --version
   ```
4.  Add proper imports:
   ```typescript
   import { ZendFiClient } from '@zendfi/sdk';
   import type { Payment, CreatePaymentRequest } from '@zendfi/sdk';
   ```

### Issue: "CORS errors in browser"

**Symptoms:**
```
Access to fetch blocked by CORS policy
```

**Solutions:**

**Don't call API directly from browser** - API keys would be exposed!

 **Create API route on your server:**

<Tabs groupId="framework">
<TabItem value="nextjs" label="Next.js" default>

```typescript
// app/api/create-payment/route.ts
import { ZendFiClient } from '@zendfi/sdk';

const zendfi = new ZendFiClient({
  apiKey: process.env.ZENDFI_API_KEY,
}); // Uses server-side env vars

export async function POST(request: Request) {
  const { amount } = await request.json();
  
  const payment = await zendfi.createPayment({
    amount,
    currency: 'USD'
  });
  
  return Response.json({ payment_url: payment.payment_url });
}
```

</TabItem>
<TabItem value="express" label="Express">

```typescript
import express from 'express';
import { ZendFiClient } from '@zendfi/sdk';

const app = express();
const zendfi = new ZendFiClient({
  apiKey: process.env.ZENDFI_API_KEY,
});

app.post('/api/create-payment', async (req, res) => {
  const { amount } = req.body;
  
  const payment = await zendfi.createPayment({
    amount,
    currency: 'USD'
  });
  
  res.json({ payment_url: payment.payment_url });
});
```

</TabItem>
</Tabs>

### Issue: "Rate limit exceeded"

**Symptoms:**
```
Error: Rate limit exceeded
Status: 429 Too Many Requests
Retry-After: 60
```

**Solutions:**
1.  Implement exponential backoff:
   ```typescript
   import { ZendFiClient } from '@zendfi/sdk';
   
   const zendfi = new ZendFiClient({
     apiKey: process.env.ZENDFI_API_KEY,
     retries: 3, // Auto-retry with backoff
   });
   ```
2.  Cache responses when possible
3.  Batch requests instead of making individual calls
4.  Contact support for higher limits if needed

### Issue: "Connection timeout"

**Symptoms:**
```
Error: Request timeout after 30000ms
```

**Solutions:**
1.  Increase timeout:
   ```typescript
   const zendfi = new ZendFiClient({
     apiKey: process.env.ZENDFI_API_KEY,
     timeout: 60000 // 60 seconds
   });
   ```
2.  Check network connectivity
3.  Check ZendFi status page for outages


## Debugging Checklist

Before asking for help, verify:

- [ ] Using latest SDK version (`npm install @zendfi/sdk@latest`)
- [ ] API key is correct and has `zfi_test_` or `zfi_live_` prefix
- [ ] Environment variables are loaded (restart dev server)
- [ ] Debug mode enabled (`debug: true` or `ZENDFI_DEBUG=true`)
- [ ] Webhook endpoint returns 200 status code
- [ ] Webhook endpoint is publicly accessible (not localhost)
- [ ] Webhook signature is verified using `zendfi.verifyWebhook()`
- [ ] Error messages are logged (check console/server logs)
- [ ] Check [status page](https://status.zendfi.tech) for outages


## Testing Best Practices

### 1. Use Test Mode for Development

```typescript
// .env.development
ZENDFI_API_KEY=zfi_test_abc123...

// .env.production
ZENDFI_API_KEY=zfi_live_xyz789...
```

### 2. Separate API Keys per Environment

- **Development:** `zfi_test_dev_...`
- **Staging:** `zfi_test_staging_...`
- **Production:** `zfi_live_prod_...`

### 3. Write Integration Tests

```typescript
import { ZendFiClient } from '@zendfi/sdk';
import { expect, test } from 'vitest';

test('creates payment successfully', async () => {
  const zendfi = new ZendFiClient({
    apiKey: process.env.ZENDFI_TEST_API_KEY
  });
  
  const payment = await zendfi.createPayment({
    amount: 10,
    currency: 'USD',
    description: 'Test payment'
  });
  
  expect(payment.id).toMatch(/^pay_/);
  expect(payment.amount).toBe(10);
  expect(payment.status).toBe('pending');
});
```

### 4. Mock Webhooks in Tests

```typescript
import { ZendFiClient } from '@zendfi/sdk';

test('handles payment confirmed webhook', async () => {
  const mockEvent = {
    event_type: 'PaymentConfirmed',
    timestamp: new Date().toISOString(),
    merchant_id: 'merch_test_123',
    data: {
      id: 'pay_test_123',
      amount: 50,
      status: 'confirmed'
    }
  };
  
  const result = await handleWebhook(mockEvent);
  expect(result).toBe('success');
});
```

### 5. Test Error Scenarios

```typescript
import { ZendFiError } from '@zendfi/sdk';

test('handles payment creation failure', async () => {
  const zendfi = new ZendFiClient({
    apiKey: 'invalid_key'
  });
  
  try {
    await zendfi.createPayment({ amount: 10, currency: 'USD' });
  } catch (error) {
    expect(error).toBeInstanceOf(ZendFiError);
    expect(error.message).toContain('Invalid API key');
  }
});
```


## Monitoring in Production

### 1. Log All Payment Events

```typescript
const payment = await zendfi.createPayment({
  amount: 100,
  currency: 'USD',
  metadata: {
    order_id: '12345',
    user_id: 'user_789'
  }
});

console.log('Payment created', {
  payment_id: payment.id,
  amount: payment.amount,
  status: payment.status,
  metadata: payment.metadata
});
```

### 2. Set Up Error Tracking

```typescript
import * as Sentry from '@sentry/node';
import { ZendFiError } from '@zendfi/sdk';

try {
  const payment = await zendfi.createPayment({...});
} catch (error) {
  if (error instanceof ZendFiError) {
    Sentry.captureException(error, {
      tags: {
        service: 'zendfi',
        operation: 'create_payment',
        error_type: error.type
      },
      extra: {
        amount: 100,
        currency: 'USD'
      }
    });
  }
  throw error;
}
```

### 3. Monitor Webhook Success Rate

```typescript
export async function POST(request: Request) {
  const startTime = Date.now();
  
  try {
    const body = await request.text();
    const signature = request.headers.get('x-zendfi-signature');
    
    const isValid = zendfi.verifyWebhook({
      payload: body,
      signature: signature!,
      secret: process.env.ZENDFI_WEBHOOK_SECRET!
    });
    
    if (!isValid) {
      console.warn('Invalid webhook signature', {
        duration: Date.now() - startTime
      });
      return new Response('Invalid signature', { status: 401 });
    }
    
    const event = JSON.parse(body);
    
    // Log success
    console.log('Webhook processed', {
      event: event.event_type,
      duration: Date.now() - startTime
    });
    
    return new Response('OK', { status: 200 });
  } catch (error) {
    // Log failure
    console.error('Webhook failed', {
      error: error.message,
      duration: Date.now() - startTime
    });
    
    return new Response('Error', { status: 500 });
  }
}
```


## CLI Debugging Commands

```bash
# Check API connection
zendfi status

# List recent payments
zendfi payment list --limit 10

# Get payment details
zendfi payment get pay_abc123

# Test webhook delivery
zendfi webhooks test

# Validate configuration
zendfi config validate

# Check CLI version
zendfi --version
```


## Get Help

**Still stuck?**

- �� [API Reference](../api/payments) - Complete API documentation
- 💬 [Discord Community](https://discord.gg/zendfi) - Get help from the community
- 📧 [Email Support](mailto:support@zendfi.tech) - Contact our team
- 🐛 [GitHub Issues](https://github.com/zendfi/issues) - Report bugs

When asking for help, include:
1. SDK version (`npm list @zendfi/sdk`)
2. Framework & version (Next.js 14, Express 4, etc.)
3. Error message (full stack trace)
4. Code snippet (sanitize API keys!)
5. Expected vs actual behavior
