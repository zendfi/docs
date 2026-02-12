---
sidebar_position: 7
title: TypeScript Guide
description: Complete guide to using ZendFi with TypeScript for maximum type safety and developer experience.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Why TypeScript?

The ZendFi SDK is built with TypeScript and provides:

 **Full type coverage** - Every method, parameter, and response is typed  
 **Autocomplete** - IntelliSense shows available methods and parameters  
 **Compile-time errors** - Catch mistakes before runtime  
 **Better refactoring** - Rename and update with confidence  
 **Documentation** - Types serve as inline documentation

## Installation

```bash
npm install @zendfi/sdk

# TypeScript should be installed in your project
npm install -D typescript @types/node
```

## Basic Setup

### TypeScript Configuration

```json title="tsconfig.json"
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020"],
    "moduleResolution": "node",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true
  }
}
```

### Import the SDK

```typescript
import { ZendFiClient } from '@zendfi/sdk';
import type { Payment, CreatePaymentRequest } from '@zendfi/sdk';

const zendfi = new ZendFiClient({
  apiKey: process.env.ZENDFI_API_KEY,
});
```

## Core Types

### Payment Types

```typescript
import type {
  Payment,
  CreatePaymentRequest,
  PaymentStatus,
  ListPaymentsRequest
} from '@zendfi/sdk';

// Payment object returned from API (snake_case fields)
const payment: Payment = {
  id: 'pay_abc123',
  merchant_id: 'merch_xyz789',
  amount: 99.99,
  currency: 'USD',
  status: 'pending',
  payment_url: 'https://pay.zendfi.tech/pay_abc123',
  expires_at: '2025-12-22T10:00:00Z',
  metadata: {}
};

// Parameters for creating a payment
const params: CreatePaymentRequest = {
  amount: 99.99,
  currency: 'USD',
  description: 'Pro Plan Subscription',
  metadata: {
    order_id: 'order_123'
  }
};

// Payment status type
const status: PaymentStatus = 'confirmed'; // 'pending' | 'confirmed' | 'failed' | 'expired'
```

### Subscription Types

```typescript
import type {
  SubscriptionPlan,
  CreateSubscriptionPlanRequest,
  Subscription,
  CreateSubscriptionRequest,
  SubscriptionStatus
} from '@zendfi/sdk';

// Plan object (snake_case fields)
const plan: SubscriptionPlan = {
  id: 'plan_abc123',
  merchant_id: 'merch_xyz789',
  name: 'Pro Plan',
  amount: 29.99,
  currency: 'USD',
  interval: 'monthly',
  interval_count: 1,
  trial_days: 0,
  is_active: true,
  created_at: '2025-12-22T10:00:00Z',
  updated_at: '2025-12-22T10:00:00Z'
};

// Subscription object (snake_case fields)
const subscription: Subscription = {
  id: 'sub_abc123',
  merchant_id: 'merch_xyz789',
  plan_id: 'plan_abc123',
  customer_email: 'user@example.com',
  customer_wallet: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
  status: 'active',
  current_period_start: '2025-12-22T10:00:00Z',
  current_period_end: '2026-01-22T10:00:00Z',
  created_at: '2025-12-22T10:00:00Z',
  updated_at: '2025-12-22T10:00:00Z'
};
```

### Payment Link Types

```typescript
import type {
  PaymentLink,
  CreatePaymentLinkRequest
} from '@zendfi/sdk';

const link: PaymentLink = {
  link_code: 'plink_abc123',
  merchant_id: 'merch_xyz789',
  description: 'Pro Plan Upgrade',
  amount: 99.99,
  currency: 'USD',
  payment_url: 'https://pay.zendfi.tech/plink_abc123',
  hosted_page_url: 'https://pay.zendfi.tech/plink_abc123',
  url: 'https://pay.zendfi.tech/plink_abc123', // Alias for hosted_page_url
  is_active: true,
  uses_count: 47,
  created_at: '2025-12-22T10:00:00Z',
  updated_at: '2025-12-22T10:00:00Z'
};
```

### Invoice Types

```typescript
import type {
  Invoice,
  CreateInvoiceRequest,
  InvoiceLineItem,
  InvoiceStatus
} from '@zendfi/sdk';

const lineItem: InvoiceLineItem = {
  description: 'Website Development',
  quantity: 40,
  unit_amount: 150,
  amount: 6000
};

const invoice: Invoice = {
  id: 'inv_abc123',
  merchant_id: 'merch_xyz789',
  invoice_number: 'INV-2025-001',
  customer_name: 'Acme Corp',
  customer_email: 'billing@acme.com',
  line_items: [lineItem],
  subtotal: 6000,
  tax: 510,
  total: 6510,
  amount_paid: 0,
  amount_due: 6510,
  status: 'sent',
  due_date: '2025-12-31',
  created_at: '2025-12-22T10:00:00Z',
  updated_at: '2025-12-22T10:00:00Z'
};
```

### Webhook Types

```typescript
import type {
  WebhookPayload,
  WebhookEvent
} from '@zendfi/sdk';

const payload: WebhookPayload = {
  event: 'payment.confirmed',
  timestamp: '2025-12-22T10:00:00Z',
  merchant_id: 'merch_test_123',
  data: {
    id: 'pay_abc123',
    amount: 99.99,
    status: 'confirmed'
  } as Payment
};

// Event type union
const eventType: WebhookEvent =
  'payment.created' |
  'payment.confirmed' |
  'payment.failed' |
  'subscription.created' |
  'subscription.canceled';
```

## Type-Safe API Calls

### Payments

```typescript
import { ZendFiClient } from '@zendfi/sdk';
import type { Payment, CreatePaymentRequest } from '@zendfi/sdk';

const zendfi = new ZendFiClient({
  apiKey: process.env.ZENDFI_API_KEY,
});

async function createPayment(): Promise<Payment> {
  const params: CreatePaymentRequest = {
    amount: 99.99,
    currency: 'USD',
    description: 'Pro Plan',
    metadata: {
      order_id: 'order_123',
      user_id: 'user_456'
    }
  };
  
  // TypeScript knows the return type is Payment
  const payment = await zendfi.createPayment(params);
  
  // Autocomplete available for all properties (snake_case)
  console.log(payment.id);
  console.log(payment.payment_url); // Note: snake_case
  console.log(payment.status);
  
  return payment;
}

async function getPayment(id: string): Promise<Payment> {
  return await zendfi.getPayment(id);
}

async function listPayments(limit: number = 20): Promise<Payment[]> {
  const result = await zendfi.listPayments({ limit });
  return result.data;
}
```

### Subscriptions

```typescript
import type {
  SubscriptionPlan,
  CreateSubscriptionPlanRequest,
  Subscription,
  CreateSubscriptionRequest
} from '@zendfi/sdk';

async function createPlan(): Promise<SubscriptionPlan> {
  const params: CreateSubscriptionPlanRequest = {
    name: 'Pro Plan',
    amount: 29.99,
    currency: 'USD',
    interval: 'monthly', // Type-checked: 'daily' | 'weekly' | 'monthly' | 'yearly'
    trial_days: 14
  };
  
  return await zendfi.createSubscriptionPlan(params);
}

async function subscribe(
  planId: string,
  email: string
): Promise<Subscription> {
  const params: CreateSubscriptionRequest = {
    plan_id: planId,
    customer_email: email,
    metadata: {
      source: 'website'
    }
  };
  
  return await zendfi.createSubscription(params);
}
```

### Payment Links

```typescript
import type {
  PaymentLink,
  CreatePaymentLinkRequest
} from '@zendfi/sdk';

async function createPaymentLink(): Promise<PaymentLink> {
  const params: CreatePaymentLinkRequest = {
    amount: 99.99,
    currency: 'USD',
    description: 'Pro Plan Upgrade',
    metadata: {
      campaign: 'summer_sale'
    }
  };
  
  const link = await zendfi.createPaymentLink(params);
  
  // Use snake_case fields
  console.log(link.payment_url);
  console.log(link.link_code);
  
  return link;
}
```

## Custom Type Guards

Create type guards for runtime validation:

```typescript
import type { Payment, PaymentStatus } from '@zendfi/sdk';

// Type guard for payment status
function isConfirmedPayment(payment: Payment): boolean {
  return payment.status === 'confirmed';
}

// Type guard with type predicate
function isValidPayment(value: unknown): value is Payment {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'amount' in value &&
    'status' in value
  );
}

// Usage
const payment = await zendfi.getPayment('pay_abc123');

if (isConfirmedPayment(payment)) {
  // TypeScript knows payment is confirmed here
  console.log('Payment confirmed:', payment.id);
}

if (isValidPayment(unknownData)) {
  // TypeScript knows unknownData is Payment here
  console.log(unknownData.payment_url);
}
```

## Generic Helper Functions

```typescript
import type { Payment, Subscription, Invoice } from '@zendfi/sdk';

// Generic function for handling metadata
function addMetadata<T extends { metadata?: Record<string, any> }>(
  item: T,
  key: string,
  value: any
): T {
  return {
    ...item,
    metadata: {
      ...item.metadata,
      [key]: value
    }
  };
}

// Usage with different types
const payment: Payment = await zendfi.getPayment('pay_123');
const updatedPayment = addMetadata(payment, 'processed', true);

const invoice: Invoice = await zendfi.getInvoice('inv_123');
const updatedInvoice = addMetadata(invoice, 'sent_via', 'email');
```

## Type-Safe Webhook Handlers

```typescript
import { ZendFiClient } from '@zendfi/sdk';
import type { WebhookPayload, Payment, Subscription } from '@zendfi/sdk';

const zendfi = new ZendFiClient({
  apiKey: process.env.ZENDFI_API_KEY,
});

// Webhook handler with type narrowing
async function handleWebhook(
  body: string,
  signature: string
): Promise<void> {
  // Verify webhook signature (returns boolean)
  const isValid = zendfi.verifyWebhook({
    payload: body,
    signature,
    secret: process.env.ZENDFI_WEBHOOK_SECRET!
  });
  
  if (!isValid) {
    throw new Error('Invalid webhook signature');
  }
  
  // Parse payload
  const payload: WebhookPayload = JSON.parse(body);
  
  // Type narrowing based on event type
  switch (payload.event) {
    case 'payment.confirmed':
      await handlePaymentConfirmed(payload.data as Payment);
      break;
    case 'subscription.created':
      await handleSubscriptionCreated(payload.data as Subscription);
      break;
    case 'subscription.canceled':
      await handleSubscriptionCanceled(payload.data as Subscription);
      break;
    default:
      console.log('Unhandled event:', payload.event);
  }
}

async function handlePaymentConfirmed(payment: Payment): Promise<void> {
  console.log('Payment confirmed:', payment.id);
  // TypeScript knows payment has all Payment properties
  console.log('Amount:', payment.amount);
  console.log('Status:', payment.status);
}

async function handleSubscriptionCreated(subscription: Subscription): Promise<void> {
  console.log('Subscription created:', subscription.id);
  // TypeScript knows subscription has all Subscription properties (snake_case)
  console.log('Plan:', subscription.plan_id);
  console.log('Customer:', subscription.customer_email);
}

async function handleSubscriptionCanceled(subscription: Subscription): Promise<void> {
  console.log('Subscription canceled:', subscription.id);
}
```

## Environment Variables with Types

```typescript
// env.d.ts
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ZENDFI_API_KEY: string;
      ZENDFI_WEBHOOK_SECRET: string;
      NODE_ENV: 'development' | 'production' | 'test';
    }
  }
}

export {};
```

```typescript
// config/zendfi.ts
import { ZendFiClient } from '@zendfi/sdk';

// TypeScript ensures env vars are defined
const apiKey = process.env.ZENDFI_API_KEY;
const webhookSecret = process.env.ZENDFI_WEBHOOK_SECRET;

if (!apiKey) {
  throw new Error('ZENDFI_API_KEY is required');
}

if (!webhookSecret) {
  throw new Error('ZENDFI_WEBHOOK_SECRET is required');
}

export const zendfi = new ZendFiClient({
  apiKey,
  debug: process.env.NODE_ENV === 'development'
});

export const config = {
  webhookSecret
};
```

## Extending Types

Add custom properties to metadata:

```typescript
import type { Payment, CreatePaymentRequest } from '@zendfi/sdk';

// Define custom metadata interface
interface OrderMetadata {
  order_id: string;
  user_id: string;
  product_sku: string;
  coupon_code?: string;
}

// Extend CreatePaymentRequest with typed metadata
interface TypedPaymentRequest extends Omit<CreatePaymentRequest, 'metadata'> {
  metadata: OrderMetadata;
}

// Type-safe payment creation
async function createOrderPayment(
  params: TypedPaymentRequest
): Promise<Payment> {
  return await zendfi.createPayment(params);
}

// Usage - TypeScript enforces metadata structure
const payment = await createOrderPayment({
  amount: 99.99,
  currency: 'USD',
  description: 'Order #12345',
  metadata: {
    order_id: 'order_12345',
    user_id: 'user_789',
    product_sku: 'PROD-001'
    // TypeScript error if required fields missing!
  }
});
```

## Error Handling with Types

```typescript
import { ZendFiClient, ZendFiError } from '@zendfi/sdk';
import type { Payment } from '@zendfi/sdk';

const zendfi = new ZendFiClient({
  apiKey: process.env.ZENDFI_API_KEY,
});

async function createPaymentSafely(
  amount: number
): Promise<Payment | null> {
  try {
    return await zendfi.createPayment({
      amount,
      currency: 'USD'
    });
  } catch (error) {
    // Type guard for ZendFiError
    if (error instanceof ZendFiError) {
      console.error('ZendFi error:', {
        code: error.code,
        message: error.message,
        statusCode: error.statusCode
      });
    } else if (error instanceof Error) {
      console.error('Unexpected error:', error.message);
    } else {
      console.error('Unknown error:', error);
    }
    
    return null;
  }
}

// Usage with type narrowing
const payment = await createPaymentSafely(99.99);

if (payment) {
  // TypeScript knows payment is Payment here (not null)
  console.log('Payment created:', payment.id);
  console.log('Payment URL:', payment.payment_url); // snake_case
} else {
  // Handle null case
  console.log('Payment creation failed');
}
```

## Utility Types

```typescript
import type { Payment, Subscription } from '@zendfi/sdk';

// Extract specific properties
type PaymentSummary = Pick<Payment, 'id' | 'amount' | 'status'>;

const summary: PaymentSummary = {
  id: 'pay_123',
  amount: 99.99,
  status: 'confirmed'
};

// Make all properties optional
type PartialPayment = Partial<Payment>;

// Make all properties required
type RequiredSubscription = Required<Subscription>;

// Exclude properties
type PaymentWithoutMetadata = Omit<Payment, 'metadata'>;

// Create union type from status values
type PaymentStatusUnion = Payment['status']; // 'pending' | 'confirmed' | 'failed' | 'expired'
```

## Best Practices

### 1. Always Import Types

```typescript
//  Good: Import types separately
import { ZendFiClient } from '@zendfi/sdk';
import type { Payment, CreatePaymentRequest } from '@zendfi/sdk';

// Avoid: Importing everything without type keyword
import { ZendFiClient, Payment, CreatePaymentRequest } from '@zendfi/sdk';
```

### 2. Use Strict TypeScript

```json title="tsconfig.json"
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictPropertyInitialization": true
  }
}
```

### 3. Define Return Types

```typescript
//  Good: Explicit return type
async function getPayment(id: string): Promise<Payment> {
  return await zendfi.getPayment(id);
}

// Avoid: Implicit return type
async function getPayment(id: string) {
  return await zendfi.getPayment(id);
}
```

### 4. Use Type Narrowing

```typescript
import type { Payment } from '@zendfi/sdk';

function processPayment(payment: Payment): void {
  // Type narrowing with switch
  switch (payment.status) {
    case 'confirmed':
      console.log('Payment confirmed');
      break;
    case 'pending':
      console.log('Payment pending');
      break;
    case 'failed':
      console.log('Payment failed');
      break;
    case 'expired':
      console.log('Payment expired');
      break;
  }
}
```

### 5. Remember snake_case Fields

```typescript
import type { Payment } from '@zendfi/sdk';

//  Correct: snake_case
const url = payment.payment_url;
const merchant = payment.merchant_id;
const createdAt = payment.created_at;

// Wrong: camelCase (TypeScript error)
const url = payment.paymentUrl;
const merchant = payment.merchantId;
const createdAt = payment.createdAt;
```

### 6. Validate at Runtime

```typescript
import { z } from 'zod';
import type { CreatePaymentRequest } from '@zendfi/sdk';

// Define validation schema
const PaymentParamsSchema = z.object({
  amount: z.number().positive().max(1000000),
  currency: z.literal('USD'),
  description: z.string().min(1).max(500),
  metadata: z.record(z.any()).optional()
});

// Validate and infer type
async function createValidatedPayment(data: unknown): Promise<Payment> {
  // Validates at runtime AND provides TypeScript types
  const params = PaymentParamsSchema.parse(data);
  
  return await zendfi.createPayment(params);
}
```

## Framework-Specific Patterns

### Next.js with TypeScript

```typescript
// app/api/payments/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { ZendFiClient } from '@zendfi/sdk';
import type { Payment } from '@zendfi/sdk';

const zendfi = new ZendFiClient({
  apiKey: process.env.ZENDFI_API_KEY,
});

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    
    const payment: Payment = await zendfi.createPayment({
      amount: body.amount,
      currency: 'USD',
      description: body.description
    });
    
    return NextResponse.json({
      success: true,
      payment_url: payment.payment_url // snake_case
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Payment creation failed' },
      { status: 500 }
    );
  }
}
```

### Express with TypeScript

```typescript
// routes/payments.ts
import express, { Request, Response } from 'express';
import { ZendFiClient } from '@zendfi/sdk';
import type { Payment, CreatePaymentRequest } from '@zendfi/sdk';

const router = express.Router();
const zendfi = new ZendFiClient({
  apiKey: process.env.ZENDFI_API_KEY,
});

interface CreatePaymentBody {
  amount: number;
  description: string;
}

router.post('/payments', async (
  req: Request<{}, {}, CreatePaymentBody>,
  res: Response
) => {
  try {
    const params: CreatePaymentRequest = {
      amount: req.body.amount,
      currency: 'USD',
      description: req.body.description
    };
    
    const payment: Payment = await zendfi.createPayment(params);
    
    res.json({
      success: true,
      payment_url: payment.payment_url // snake_case
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Payment creation failed'
    });
  }
});

export default router;
```

## Next Steps

**Learn More:**
- [Testing & Debugging](./testing-and-debugging) - Test your integration
- [Best Practices](./best-practices) - Production patterns
- [API Reference](../api/payments) - Complete API documentation

**Need Help?**
- [Discord Community](https://discord.gg/zendfi)
- [Email Support](mailto:support@zendfi.tech)
