---
sidebar_position: 5
title: Best Practices
description: Security, performance, and scalability guidelines
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Best Practices

Production-ready patterns for building secure, performant, and scalable ZendFi integrations.

## Security

### Never Expose API Keys

❌ **Don't do this:**

```typescript
// NEVER expose API keys in client-side code
const zendfi = new ZendFiClient({
  apiKey: 'zfi_live_abc123...' // Visible in browser!
});
```

✅ **Do this instead:**

<Tabs groupId="framework">
<TabItem value="nextjs" label="Next.js" default>

```typescript
// app/api/payments/route.ts (Server-side)
import { ZendFiClient } from '@zendfi/sdk';

const zendfi = new ZendFiClient(); // Reads from server env vars

export async function POST(request: Request) {
  const payment = await zendfi.createPayment({
    amount: 100,
    currency: 'USD',
  });
  return Response.json({ payment_url: payment.payment_url });
}
```

```typescript
// app/components/CheckoutButton.tsx (Client-side)
'use client';

export function CheckoutButton() {
  async function handleCheckout() {
    // Call your API route, not ZendFi directly
    const response = await fetch('/api/payments', {
      method: 'POST',
      body: JSON.stringify({ amount: 99 })
    });
    
    const { payment_url } = await response.json();
    window.location.href = payment_url;
  }
  
  return <button onClick={handleCheckout}>Pay Now</button>;
}
```

</TabItem>
<TabItem value="express" label="Express">

```typescript
// server.ts (Server-side only)
import express from 'express';
import { ZendFiClient } from '@zendfi/sdk';

const app = express();
const zendfi = new ZendFiClient(); // Server-side only

app.post('/api/payments', async (req, res) => {
  const payment = await zendfi.createPayment({
    amount: 100,
    currency: 'USD',
  });
  res.json({ payment_url: payment.payment_url });
});
```

</TabItem>
</Tabs>

### Use Environment Variables

```bash
# .env.local (Never commit this file!)
ZENDFI_API_KEY=zfi_live_abc123...
ZENDFI_WEBHOOK_SECRET=whsec_xyz789...
```

```bash
# .gitignore
.env
.env.local
.env.*.local
```

### Verify Webhook Signatures

Always verify webhook signatures to prevent spoofing:

```typescript
import { ZendFiClient } from '@zendfi/sdk';

const zendfi = new ZendFiClient();

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get('x-zendfi-signature');
  
  if (!signature) {
    return new Response('Missing signature', { status: 401 });
  }
  
  try {
    // Verify signature
    const isValid = zendfi.verifyWebhook({
      payload: body,
      signature,
      secret: process.env.ZENDFI_WEBHOOK_SECRET!,
    });
    
    if (!isValid) {
      return new Response('Invalid signature', { status: 401 });
    }
    
    // Parse verified webhook
    const event = JSON.parse(body);
    
    // Process verified event
    await handleEvent(event);
    
    return new Response('OK', { status: 200 });
  } catch (err) {
    console.error('Webhook verification failed:', err);
    return new Response('Invalid signature', { status: 401 });
  }
}
```

Or use the helper function for Next.js:

```typescript
import { verifyNextWebhook } from '@zendfi/sdk/webhooks';

export async function POST(request: Request) {
  const webhook = await verifyNextWebhook(request);
  
  if (!webhook) {
    return new Response('Invalid signature', { status: 401 });
  }
  
  // Process verified webhook
  await handleEvent(webhook);
  
  return new Response('OK', { status: 200 });
}
```

### Sanitize Metadata

Don't store sensitive data in metadata - it may be logged or visible in dashboard:

❌ **Don't do this:**
```typescript
const payment = await zendfi.createPayment({
  amount: 100,
  metadata: {
    credit_card: '4242-4242-4242-4242', // ❌ Never!
    ssn: '123-45-6789', // ❌ Never!
    password: 'secret123' // ❌ Never!
  }
});
```

✅ **Do this instead:**
```typescript
const payment = await zendfi.createPayment({
  amount: 100,
  metadata: {
    order_id: 'order_12345',
    user_id: 'user_xyz789',
    product_sku: 'PROD-001'
  }
});
```

### Implement Rate Limiting

Protect your endpoints from abuse:

```typescript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Max 100 requests per window
  message: 'Too many requests, please try again later'
});

app.post('/api/payments', limiter, async (req, res) => {
  // Your payment logic
});
```

### Validate Input

Always validate user input before creating payments:

```typescript
import { z } from 'zod';

const PaymentSchema = z.object({
  amount: z.number().positive().max(1000000),
  currency: z.enum(['USD']),
  description: z.string().min(1).max(500),
});

export async function POST(request: Request) {
  const body = await request.json();
  
  // Validate input
  const validated = PaymentSchema.parse(body);
  
  const payment = await zendfi.createPayment(validated);
  return Response.json({ payment_url: payment.payment_url });
}
```


## Error Handling

### Use Try-Catch Blocks

```typescript
import { ZendFiClient } from '@zendfi/sdk';

const zendfi = new ZendFiClient();

try {
  const payment = await zendfi.createPayment({
    amount: 100,
    currency: 'USD'
  });
  
  return { success: true, payment_url: payment.payment_url };
} catch (error) {
  // Log error for debugging
  console.error('Payment creation failed:', error);
  
  // Return user-friendly message
  return {
    success: false,
    error: 'Unable to create payment. Please try again.'
  };
}
```

### Handle Specific Error Types

```typescript
import { ZendFiClient, ZendFiError } from '@zendfi/sdk';

const zendfi = new ZendFiClient();

try {
  const payment = await zendfi.createPayment({ amount: 100 });
} catch (error) {
  if (error instanceof ZendFiError) {
    // Handle ZendFi-specific errors
    console.error('ZendFi error:', error.code, error.message);
    
    if (error.type === 'authentication_error') {
      console.error('API key is invalid');
    } else if (error.type === 'rate_limit_error') {
      console.error('Rate limit exceeded');
    } else if (error.type === 'payment_error') {
      console.error('Payment failed:', error.message);
    }
    
    // Log suggestion if available
    if (error.suggestion) {
      console.log('Suggestion:', error.suggestion);
    }
  } else {
    // Handle other errors (network, etc.)
    console.error('Unexpected error:', error);
  }
}
```

### Implement Retry Logic

The SDK has built-in retry logic:

```typescript
import { ZendFiClient } from '@zendfi/sdk';

const zendfi = new ZendFiClient({
  retries: 3, // Automatically retry failed requests (5xx errors)
  timeout: 30000 // 30 second timeout
});

// SDK will automatically retry on 5xx errors with exponential backoff
const payment = await zendfi.createPayment({
  amount: 100,
  currency: 'USD',
});
```

Or implement custom retry logic:

```typescript
async function createPaymentWithRetry(params: any, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await zendfi.createPayment(params);
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      
      // Exponential backoff: 1s, 2s, 4s
      const delay = Math.pow(2, i) * 1000;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}
```

### Graceful Degradation

```typescript
export async function POST(request: Request) {
  try {
    const payment = await zendfi.createPayment({ amount: 100 });
    return Response.json({ payment_url: payment.payment_url });
  } catch (error) {
    // Log error for investigation
    console.error('Payment creation failed:', error);
    
    // Provide fallback option
    return Response.json({
      error: 'Payment system temporarily unavailable',
      fallback: {
        method: 'email',
        contact: 'payments@yourapp.com',
        message: 'Please email us to complete your purchase'
      }
    }, { status: 503 });
  }
}
```


## Performance

### Cache Responses

Cache data that doesn't change frequently:

```typescript
import { ZendFiClient } from '@zendfi/sdk';

const zendfi = new ZendFiClient();
let cachedPlan: any | null = null;
let cacheTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

async function getSubscriptionPlan(planId: string) {
  const now = Date.now();
  
  // Return cached data if still valid
  if (cachedPlan && (now - cacheTime) < CACHE_DURATION) {
    return cachedPlan;
  }
  
  // Fetch fresh data
  cachedPlan = await zendfi.getSubscriptionPlan(planId);
  cacheTime = now;
  
  return cachedPlan;
}
```

### Use Pagination

For large datasets, always use pagination:

```typescript
// ❌ Don't fetch everything at once
const allPayments = await zendfi.listPayments({ limit: 10000 });

// ✅ Paginate through results
async function getAllPayments() {
  const payments = [];
  let page = 1;
  let hasMore = true;
  
  while (hasMore) {
    const result = await zendfi.listPayments({
      limit: 100,
      page
    });
    
    payments.push(...result.data);
    hasMore = result.has_more;
    page++;
  }
  
  return payments;
}
```

### Batch Operations

Group operations when possible:

```typescript
// ❌ Slow: Individual requests
for (const order of orders) {
  await zendfi.createPayment({ amount: order.total });
}

// ✅ Fast: Create payment links in batch
const links = await Promise.all(
  orders.map(order =>
    zendfi.createPaymentLink({
      amount: order.total,
      metadata: { order_id: order.id }
    })
  )
);
```

### Optimize Webhook Processing

Return 200 immediately, process asynchronously:

```typescript
import { verifyNextWebhook } from '@zendfi/sdk/webhooks';

export async function POST(request: Request) {
  // Verify webhook
  const event = await verifyNextWebhook(request);
  
  if (!event) {
    return new Response('Invalid signature', { status: 401 });
  }
  
  // Return 200 immediately
  const response = new Response('OK', { status: 200 });
  
  // Process asynchronously (don't await)
  processWebhookAsync(event).catch(error => {
    console.error('Webhook processing failed:', error);
  });
  
  return response;
}

async function processWebhookAsync(event: any) {
  // Heavy processing here
  if (event.event === 'payment.confirmed') {
    await updateDatabase(event.data);
    await sendConfirmationEmail(event.data);
    await updateInventory(event.data);
  }
}
```

### Use Appropriate Timeouts

Set realistic timeouts based on operation:

```typescript
// Fast operations (retrieve existing data)
const quickClient = new ZendFiClient({
  timeout: 10000 // 10 seconds
});

// Standard operations (create, process payments)
const standardClient = new ZendFiClient({
  timeout: 30000 // 30 seconds (default)
});

// Slow operations (reports, bulk operations)
const slowClient = new ZendFiClient({
  timeout: 60000 // 60 seconds
});
```


## Scalability

### Use Idempotency

The SDK automatically handles idempotency with headers when enabled:

```typescript
const zendfi = new ZendFiClient({
  idempotencyEnabled: true // Automatically adds Idempotency-Key header
});

// SDK will add unique Idempotency-Key header automatically
// If request is retried, same key = same response (no duplicate payment)
const payment = await zendfi.createPayment({
  amount: 100,
  currency: 'USD',
});
```

Or manually set idempotency key via headers in your HTTP client.

### Implement Database Transactions

```typescript
import { db } from './database';

// Start transaction
const transaction = await db.transaction();

try {
  // Create order in your database
  const order = await transaction.orders.create({
    user_id: userId,
    total: 100,
    status: 'pending'
  });
  
  // Create payment with ZendFi
  const payment = await zendfi.createPayment({
    amount: order.total,
    currency: 'USD',
    metadata: {
      order_id: order.id
    }
  });
  
  // Update order with payment ID
  await transaction.orders.update(order.id, {
    payment_id: payment.id
  });
  
  // Commit transaction
  await transaction.commit();
  
  return { order, payment };
} catch (error) {
  // Rollback on error
  await transaction.rollback();
  throw error;
}
```

### Separate Environments

Use different API keys for each environment:

```bash
# .env.development
ZENDFI_API_KEY=zfi_test_dev_abc...
ZENDFI_WEBHOOK_SECRET=whsec_test_dev_xyz...

# .env.staging
ZENDFI_API_KEY=zfi_test_staging_abc...
ZENDFI_WEBHOOK_SECRET=whsec_test_staging_xyz...

# .env.production
ZENDFI_API_KEY=zfi_live_prod_abc...
ZENDFI_WEBHOOK_SECRET=whsec_live_prod_xyz...
```

### Monitor Performance

Track SDK performance metrics:

```typescript
const startTime = Date.now();

try {
  const payment = await zendfi.createPayment({ amount: 100 });
  
  const duration = Date.now() - startTime;
  console.log('Payment creation took:', duration, 'ms');
  
  // Send to monitoring service
  metrics.histogram('zendfi.payment.create.duration', duration);
  metrics.increment('zendfi.payment.create.success');
} catch (error) {
  metrics.increment('zendfi.payment.create.failure');
  throw error;
}
```

### Use Background Jobs

For non-urgent operations, use background jobs:

```typescript
import { Queue } from 'bull';

const paymentQueue = new Queue('payments', {
  redis: { host: 'localhost', port: 6379 }
});

// Add job to queue (fast)
await paymentQueue.add({
  amount: 100,
  userId: 'user_123',
  orderId: 'order_456'
});

// Process jobs in background
paymentQueue.process(async (job) => {
  const { amount, userId, orderId } = job.data;
  
  const payment = await zendfi.createPayment({
    amount,
    currency: 'USD',
    metadata: { user_id: userId, order_id: orderId }
  });
  
  return payment;
});
```


## Code Organization

### Create Reusable Services

```typescript
// services/payment.service.ts
import { ZendFiClient } from '@zendfi/sdk';

export class PaymentService {
  private zendfi: ZendFiClient;
  
  constructor() {
    this.zendfi = new ZendFiClient();
  }
  
  async createPayment(params: {
    amount: number;
    description: string;
    metadata?: Record<string, any>;
  }) {
    return await this.zendfi.createPayment({
      amount: params.amount,
      currency: 'USD',
      description: params.description,
      metadata: params.metadata
    });
  }
  
  async getPayment(paymentId: string) {
    return await this.zendfi.getPayment(paymentId);
  }
  
  async listPayments(filters?: { status?: string; limit?: number }) {
    return await this.zendfi.listPayments(filters);
  }
}

// Use in your routes
import { PaymentService } from './services/payment.service';

const paymentService = new PaymentService();

export async function POST(request: Request) {
  const { amount, description } = await request.json();
  
  const payment = await paymentService.createPayment({
    amount,
    description
  });
  
  return Response.json({ payment_url: payment.payment_url });
}
```

### Centralize Configuration

```typescript
// config/zendfi.config.ts
import { ZendFiClient } from '@zendfi/sdk';

export const zendfiConfig = {
  apiKey: process.env.ZENDFI_API_KEY!,
  timeout: 30000,
  retries: 3,
  debug: process.env.NODE_ENV === 'development',
  idempotencyEnabled: true,
};

export const zendfi = new ZendFiClient(zendfiConfig);

// Use throughout your app
import { zendfi } from './config/zendfi.config';
```

### Type-Safe Metadata

```typescript
// types/payment.types.ts
export interface OrderMetadata {
  order_id: string;
  user_id: string;
  product_sku?: string;
  coupon_code?: string;
}

// Use in your code
const payment = await zendfi.createPayment({
  amount: 100,
  currency: 'USD',
  metadata: {
    order_id: order.id,
    user_id: user.id,
    product_sku: product.sku
  } satisfies OrderMetadata
});
```


## Testing

### Write Unit Tests

```typescript
import { describe, it, expect, vi } from 'vitest';
import { PaymentService } from './payment.service';

describe('PaymentService', () => {
  it('creates payment successfully', async () => {
    const service = new PaymentService();
    
    const payment = await service.createPayment({
      amount: 100,
      description: 'Test payment'
    });
    
    expect(payment.id).toMatch(/^pay_/);
    expect(payment.amount).toBe(100);
  });
  
  it('handles payment creation failure', async () => {
    // Mock ZendFi to throw error
    const service = new PaymentService();
    vi.spyOn(service, 'createPayment').mockRejectedValue(
      new Error('Payment failed')
    );
    
    await expect(
      service.createPayment({ amount: 100, description: 'Test' })
    ).rejects.toThrow('Payment failed');
  });
});
```

### Test Webhook Handlers

```typescript
import { describe, it, expect } from 'vitest';
import { POST } from './api/webhooks/route';

describe('Webhook Handler', () => {
  it('processes payment confirmed event', async () => {
    const mockRequest = new Request('http://localhost/api/webhooks', {
      method: 'POST',
      headers: {
        'x-zendfi-signature': 'mock_signature',
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        event: 'payment.confirmed',
        timestamp: new Date().toISOString(),
        merchant_id: 'merch_123',
        data: { id: 'pay_123', amount: 100 }
      })
    });
    
    const response = await POST(mockRequest);
    expect(response.status).toBe(200);
  });
});
```


## Monitoring & Logging

### Structured Logging

```typescript
import pino from 'pino';

const logger = pino();

const payment = await zendfi.createPayment({
  amount: 100,
  currency: 'USD'
});

logger.info({
  event: 'payment.created',
  payment_id: payment.id,
  amount: payment.amount,
  status: payment.status,
  timestamp: new Date().toISOString()
});
```

### Enable Debug Mode

```typescript
import { ZendFiClient } from '@zendfi/sdk';

const zendfi = new ZendFiClient({
  debug: true // Logs all requests and responses
});

// Will log:
// [ZendFi] POST /api/v1/payments
// [ZendFi] Request: { amount: 100, currency: 'USD' }
// [ZendFi] ✓ 200 OK (342ms)
// [ZendFi] Response: { id: 'pay_123', ... }
```

### Track Business Metrics

```typescript
import { ZendFiClient } from '@zendfi/sdk';

const zendfi = new ZendFiClient();

// Track payment volume
async function trackPaymentMetrics() {
  const payments = await zendfi.listPayments({
    status: 'confirmed',
    limit: 100
  });
  
  const totalRevenue = payments.data.reduce((sum, p) => sum + p.amount, 0);
  const averagePayment = totalRevenue / payments.data.length;
  
  // Send to analytics
  analytics.track('revenue_metrics', {
    total_revenue: totalRevenue,
    payment_count: payments.data.length,
    average_payment: averagePayment,
    timestamp: new Date()
  });
}
```


## Deployment

### Pre-Deployment Checklist

- [ ] Environment variables configured
- [ ] API keys rotated from test to production
- [ ] Webhook endpoints configured and verified
- [ ] Error tracking set up (Sentry, Datadog, etc.)
- [ ] Rate limiting implemented
- [ ] Logging configured
- [ ] Database migrations applied
- [ ] SSL/TLS certificates valid
- [ ] Load testing completed
- [ ] Backup and recovery plan in place

### Zero-Downtime Deployments

```typescript
// Use health checks to verify service is ready
export async function GET() {
  try {
    // Verify ZendFi connection
    const zendfi = new ZendFiClient();
    await zendfi.listPayments({ limit: 1 });
    
    return Response.json({ status: 'healthy' });
  } catch (error) {
    return Response.json(
      { status: 'unhealthy', error: error.message },
      { status: 503 }
    );
  }
}
```


## Next Steps

**Learn More:**
- [Testing & Debugging](/developer-tools/testing-and-debugging) - Debug common issues
- [Next.js Integration](/developer-tools/nextjs-integration) - Framework-specific guide
- [Express Integration](/developer-tools/express-integration) - REST API guide

**Need Help?**
- 💬 [Discord Community](https://discord.gg/zendfi)
- 📧 [Email Support](mailto:support@zendfi.tech)
