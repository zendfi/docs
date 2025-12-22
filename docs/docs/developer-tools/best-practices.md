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
const zendfi = new ZendFi({
  apiKey: 'zfi_live_abc123...' // Visible in browser!
});
```

✅ **Do this instead:**

<Tabs groupId="framework">
<TabItem value="nextjs" label="Next.js" default>

```typescript
// app/api/payments/route.ts (Server-side)
import { ZendFi } from '@zendfi/sdk';

const zendfi = new ZendFi(); // Reads from server env vars

export async function POST(request: Request) {
  const payment = await zendfi.payments.create({...});
  return Response.json({ paymentUrl: payment.paymentUrl });
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
    
    const { paymentUrl } = await response.json();
    window.location.href = paymentUrl;
  }
  
  return <button onClick={handleCheckout}>Pay Now</button>;
}
```

</TabItem>
<TabItem value="express" label="Express">

```typescript
// server.ts (Server-side only)
import express from 'express';
import { ZendFi } from '@zendfi/sdk';

const app = express();
const zendfi = new ZendFi(); // Server-side only

app.post('/api/payments', async (req, res) => {
  const payment = await zendfi.payments.create({...});
  res.json({ paymentUrl: payment.paymentUrl });
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
import { ZendFi } from '@zendfi/sdk';

const zendfi = new ZendFi();

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get('zendfi-signature');
  
  if (!signature) {
    return new Response('Missing signature', { status: 401 });
  }
  
  try {
    // Verifies signature automatically
    const event = zendfi.webhooks.constructEvent(
      body,
      signature,
      process.env.ZENDFI_WEBHOOK_SECRET!
    );
    
    // Process verified event
    await handleEvent(event);
    
    return new Response('OK', { status: 200 });
  } catch (err) {
    console.error('Invalid webhook signature:', err);
    return new Response('Invalid signature', { status: 401 });
  }
}
```

### Sanitize Metadata

Don't store sensitive data in metadata - it may be logged or visible in dashboard:

❌ **Don't do this:**
```typescript
const payment = await zendfi.payments.create({
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
const payment = await zendfi.payments.create({
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
  
  const payment = await zendfi.payments.create(validated);
  return Response.json({ paymentUrl: payment.paymentUrl });
}
```


## Error Handling

### Use Try-Catch Blocks

```typescript
import { ZendFi } from '@zendfi/sdk';

const zendfi = new ZendFi();

try {
  const payment = await zendfi.payments.create({
    amount: 100,
    currency: 'USD'
  });
  
  return { success: true, paymentUrl: payment.paymentUrl };
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
import { ZendFi, ZendFiError } from '@zendfi/sdk';

try {
  const payment = await zendfi.payments.create({...});
} catch (error) {
  if (error instanceof ZendFiError) {
    // Handle ZendFi-specific errors
    switch (error.code) {
      case 'invalid_api_key':
        console.error('API key is invalid');
        break;
      case 'rate_limit_exceeded':
        console.error('Rate limit exceeded, retry after:', error.retryAfter);
        break;
      case 'payment_failed':
        console.error('Payment failed:', error.message);
        break;
      default:
        console.error('ZendFi error:', error.message);
    }
  } else {
    // Handle other errors (network, etc.)
    console.error('Unexpected error:', error);
  }
}
```

### Implement Retry Logic

```typescript
import { ZendFi } from '@zendfi/sdk';

const zendfi = new ZendFi({
  retries: 3, // Automatically retry failed requests
  timeout: 30000 // 30 second timeout
});

// Or implement custom retry logic
async function createPaymentWithRetry(params: any, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await zendfi.payments.create(params);
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
    const payment = await zendfi.payments.create({...});
    return Response.json({ paymentUrl: payment.paymentUrl });
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
import { ZendFi } from '@zendfi/sdk';

const zendfi = new ZendFi();
let cachedPlans: any[] | null = null;
let cacheTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

async function getSubscriptionPlans() {
  const now = Date.now();
  
  // Return cached data if still valid
  if (cachedPlans && (now - cacheTime) < CACHE_DURATION) {
    return cachedPlans;
  }
  
  // Fetch fresh data
  cachedPlans = await zendfi.subscriptions.listPlans();
  cacheTime = now;
  
  return cachedPlans;
}
```

### Use Pagination

For large datasets, always use pagination:

```typescript
// ❌ Don't fetch everything at once
const allPayments = await zendfi.payments.list({ limit: 10000 });

// ✅ Paginate through results
async function getAllPayments() {
  const payments = [];
  let hasMore = true;
  let offset = 0;
  
  while (hasMore) {
    const page = await zendfi.payments.list({
      limit: 100,
      offset
    });
    
    payments.push(...page.data);
    hasMore = page.hasMore;
    offset += 100;
  }
  
  return payments;
}
```

### Batch Operations

Group operations when possible:

```typescript
// ❌ Slow: Individual requests
for (const order of orders) {
  await zendfi.payments.create({ amount: order.total });
}

// ✅ Fast: Create payment links in batch
const links = await Promise.all(
  orders.map(order =>
    zendfi.paymentLinks.create({
      amount: order.total,
      metadata: { order_id: order.id }
    })
  )
);
```

### Optimize Webhook Processing

Return 200 immediately, process asynchronously:

```typescript
import { ZendFi } from '@zendfi/sdk';

const zendfi = new ZendFi();

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get('zendfi-signature');
  
  // Verify webhook
  const event = zendfi.webhooks.constructEvent(
    body,
    signature!,
    process.env.ZENDFI_WEBHOOK_SECRET!
  );
  
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
  if (event.event === 'payment.completed') {
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
const quickClient = new ZendFi({
  timeout: 10000 // 10 seconds
});

// Slow operations (create, process payments)
const standardClient = new ZendFi({
  timeout: 30000 // 30 seconds
});

// Very slow operations (reports, bulk operations)
const slowClient = new ZendFi({
  timeout: 60000 // 60 seconds
});
```


## Scalability

### Use Idempotency Keys

Prevent duplicate payments during retries:

```typescript
import { v4 as uuidv4 } from 'uuid';

// Generate unique idempotency key per operation
const idempotencyKey = uuidv4();

const payment = await zendfi.payments.create({
  amount: 100,
  currency: 'USD',
  idempotencyKey // Prevents duplicates if request is retried
});

// If this request is retried with same key, 
// you'll get the same payment back instead of creating a duplicate
```

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
  const payment = await zendfi.payments.create({
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
  const payment = await zendfi.payments.create({...});
  
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
  
  const payment = await zendfi.payments.create({
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
import { ZendFi } from '@zendfi/sdk';

export class PaymentService {
  private zendfi: ZendFi;
  
  constructor() {
    this.zendfi = new ZendFi();
  }
  
  async createPayment(params: {
    amount: number;
    description: string;
    metadata?: Record<string, any>;
  }) {
    return await this.zendfi.payments.create({
      amount: params.amount,
      currency: 'USD',
      description: params.description,
      metadata: params.metadata
    });
  }
  
  async getPayment(paymentId: string) {
    return await this.zendfi.payments.retrieve(paymentId);
  }
  
  async listPayments(filters?: { status?: string; limit?: number }) {
    return await this.zendfi.payments.list(filters);
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
  
  return Response.json({ paymentUrl: payment.paymentUrl });
}
```

### Centralize Configuration

```typescript
// config/zendfi.config.ts
import { ZendFi } from '@zendfi/sdk';

export const zendfiConfig = {
  apiKey: process.env.ZENDFI_API_KEY!,
  webhookSecret: process.env.ZENDFI_WEBHOOK_SECRET!,
  debug: process.env.NODE_ENV === 'development',
  timeout: 30000,
  retries: 3
};

export const zendfi = new ZendFi(zendfiConfig);

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
const payment = await zendfi.payments.create({
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
  it('processes payment completed event', async () => {
    const mockRequest = new Request('http://localhost/api/webhooks', {
      method: 'POST',
      headers: {
        'zendfi-signature': 'mock_signature',
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        event: 'payment.completed',
        timestamp: new Date().toISOString(),
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

const payment = await zendfi.payments.create({
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

### Track Business Metrics

```typescript
import { ZendFi } from '@zendfi/sdk';

const zendfi = new ZendFi();

// Track payment volume
async function trackPaymentMetrics() {
  const payments = await zendfi.payments.list({
    status: 'completed',
    limit: 100
  });
  
  const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0);
  const averagePayment = totalRevenue / payments.length;
  
  // Send to analytics
  analytics.track('revenue_metrics', {
    total_revenue: totalRevenue,
    payment_count: payments.length,
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
    const zendfi = new ZendFi();
    await zendfi.payments.list({ limit: 1 });
    
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
