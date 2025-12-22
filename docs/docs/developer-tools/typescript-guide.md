---
sidebar_position: 6
title: TypeScript Guide
description: Type safety, best practices, and TypeScript patterns
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# TypeScript Guide

Complete guide to using ZendFi with TypeScript for maximum type safety and developer experience.

## Why TypeScript?

The ZendFi SDK is built with TypeScript and provides:

✅ **Full type coverage** - Every method, parameter, and response is typed  
✅ **Autocomplete** - IntelliSense shows available methods and parameters  
✅ **Compile-time errors** - Catch mistakes before runtime  
✅ **Better refactoring** - Rename and update with confidence  
✅ **Documentation** - Types serve as inline documentation

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
import { ZendFi } from '@zendfi/sdk';
import type { Payment, PaymentCreateParams } from '@zendfi/sdk';

const zendfi = new ZendFi();
```

## Core Types

### Payment Types

```typescript
import type {
  Payment,
  PaymentCreateParams,
  PaymentStatus,
  PaymentUpdateParams
} from '@zendfi/sdk';

// Payment object returned from API
const payment: Payment = {
  id: 'pay_abc123',
  merchantId: 'merchant_xyz789',
  amount: 99.99,
  currency: 'USD',
  status: 'pending',
  paymentUrl: 'https://zendfi.tech/pay/pay_abc123',
  createdAt: '2025-12-22T10:00:00Z',
  metadata: {}
};

// Parameters for creating a payment
const params: PaymentCreateParams = {
  amount: 99.99,
  currency: 'USD',
  description: 'Pro Plan Subscription',
  metadata: {
    order_id: 'order_123'
  }
};

// Payment status enum
const status: PaymentStatus = 'completed'; // 'pending' | 'completed' | 'failed' | 'expired'
```

### Subscription Types

```typescript
import type {
  SubscriptionPlan,
  SubscriptionPlanCreateParams,
  Subscription,
  SubscriptionCreateParams,
  SubscriptionStatus
} from '@zendfi/sdk';

// Plan object
const plan: SubscriptionPlan = {
  id: 'plan_abc123',
  merchantId: 'merchant_xyz789',
  name: 'Pro Plan',
  amount: 29.99,
  currency: 'USD',
  interval: 'monthly',
  active: true,
  createdAt: '2025-12-22T10:00:00Z'
};

// Subscription object
const subscription: Subscription = {
  id: 'sub_abc123',
  merchantId: 'merchant_xyz789',
  planId: 'plan_abc123',
  customerWallet: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
  status: 'active',
  currentPeriodStart: '2025-12-22T10:00:00Z',
  currentPeriodEnd: '2026-01-22T10:00:00Z',
  createdAt: '2025-12-22T10:00:00Z'
};
```

### Payment Link Types

```typescript
import type {
  PaymentLink,
  PaymentLinkCreateParams,
  PaymentLinkUpdateParams
} from '@zendfi/sdk';

const link: PaymentLink = {
  id: 'plink_abc123',
  merchantId: 'merchant_xyz789',
  name: 'Pro Plan Upgrade',
  amount: 99.99,
  currency: 'USD',
  url: 'https://zendfi.tech/pay/plink_abc123',
  active: true,
  timesUsed: 47,
  totalRevenue: 4699.53,
  createdAt: '2025-12-22T10:00:00Z'
};
```

### Invoice Types

```typescript
import type {
  Invoice,
  InvoiceCreateParams,
  InvoiceLineItem,
  InvoiceStatus
} from '@zendfi/sdk';

const lineItem: InvoiceLineItem = {
  id: 'li_001',
  description: 'Website Development',
  quantity: 40,
  unitPrice: 150,
  amount: 6000
};

const invoice: Invoice = {
  id: 'inv_abc123',
  merchantId: 'merchant_xyz789',
  invoiceNumber: 'INV-2025-001',
  customerName: 'Acme Corp',
  customerEmail: 'billing@acme.com',
  lineItems: [lineItem],
  subtotal: 6000,
  taxAmount: 510,
  total: 6510,
  amountPaid: 0,
  amountDue: 6510,
  status: 'sent',
  dueDate: '2025-12-31T23:59:59Z',
  createdAt: '2025-12-22T10:00:00Z'
};
```

### Webhook Types

```typescript
import type {
  WebhookEvent,
  WebhookEventType
} from '@zendfi/sdk';

const event: WebhookEvent = {
  event: 'payment.completed',
  timestamp: '2025-12-22T10:00:00Z',
  data: {
    id: 'pay_abc123',
    amount: 99.99,
    status: 'completed'
  }
};

// Event type enum
const eventType: WebhookEventType =
  'payment.completed' |
  'payment.failed' |
  'subscription.created' |
  'subscription.cancelled';
```

## Type-Safe API Calls

### Payments

```typescript
import { ZendFi } from '@zendfi/sdk';
import type { Payment, PaymentCreateParams } from '@zendfi/sdk';

const zendfi = new ZendFi();

async function createPayment(): Promise<Payment> {
  const params: PaymentCreateParams = {
    amount: 99.99,
    currency: 'USD', // Type-checked: only 'USD' is valid
    description: 'Pro Plan',
    metadata: {
      order_id: 'order_123',
      user_id: 'user_456'
    }
  };
  
  // TypeScript knows the return type is Payment
  const payment = await zendfi.payments.create(params);
  
  // Autocomplete available for all properties
  console.log(payment.id);
  console.log(payment.paymentUrl);
  console.log(payment.status);
  
  return payment;
}

async function getPayment(id: string): Promise<Payment> {
  return await zendfi.payments.retrieve(id);
}

async function listPayments(limit: number = 20): Promise<Payment[]> {
  const result = await zendfi.payments.list({ limit });
  return result.data;
}
```

### Subscriptions

```typescript
import type {
  SubscriptionPlan,
  SubscriptionPlanCreateParams,
  Subscription,
  SubscriptionCreateParams
} from '@zendfi/sdk';

async function createPlan(): Promise<SubscriptionPlan> {
  const params: SubscriptionPlanCreateParams = {
    name: 'Pro Plan',
    amount: 29.99,
    currency: 'USD',
    interval: 'monthly', // Type-checked: 'daily' | 'weekly' | 'monthly' | 'yearly'
    trialPeriodDays: 14
  };
  
  return await zendfi.subscriptions.createPlan(params);
}

async function subscribe(
  planId: string,
  customerWallet: string
): Promise<Subscription> {
  const params: SubscriptionCreateParams = {
    planId,
    customerWallet,
    metadata: {
      source: 'website'
    }
  };
  
  return await zendfi.subscriptions.create(params);
}
```

### Payment Links

```typescript
import type {
  PaymentLink,
  PaymentLinkCreateParams
} from '@zendfi/sdk';

async function createPaymentLink(): Promise<PaymentLink> {
  const params: PaymentLinkCreateParams = {
    name: 'Pro Plan Upgrade',
    amount: 99.99,
    currency: 'USD',
    collectEmail: true,
    successUrl: 'https://myapp.com/success',
    metadata: {
      campaign: 'summer_sale'
    }
  };
  
  return await zendfi.paymentLinks.create(params);
}
```

## Custom Type Guards

Create type guards for runtime validation:

```typescript
import type { Payment, PaymentStatus } from '@zendfi/sdk';

// Type guard for payment status
function isCompletedPayment(payment: Payment): boolean {
  return payment.status === 'completed';
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
const payment = await zendfi.payments.retrieve('pay_abc123');

if (isCompletedPayment(payment)) {
  // TypeScript knows payment is completed here
  console.log('Payment completed:', payment.id);
}

if (isValidPayment(unknownData)) {
  // TypeScript knows unknownData is Payment here
  console.log(unknownData.paymentUrl);
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
const payment: Payment = await zendfi.payments.retrieve('pay_123');
const updatedPayment = addMetadata(payment, 'processed', true);

const invoice: Invoice = await zendfi.invoices.retrieve('inv_123');
const updatedInvoice = addMetadata(invoice, 'sent_via', 'email');
```

## Type-Safe Webhook Handlers

```typescript
import { ZendFi } from '@zendfi/sdk';
import type { WebhookEvent, Payment, Subscription } from '@zendfi/sdk';

const zendfi = new ZendFi();

// Generic webhook handler with type narrowing
async function handleWebhook(
  body: string,
  signature: string
): Promise<void> {
  const event: WebhookEvent = zendfi.webhooks.constructEvent(
    body,
    signature,
    process.env.ZENDFI_WEBHOOK_SECRET!
  );
  
  // Type narrowing based on event type
  switch (event.event) {
    case 'payment.completed':
      await handlePaymentCompleted(event.data as Payment);
      break;
    case 'subscription.created':
      await handleSubscriptionCreated(event.data as Subscription);
      break;
    case 'subscription.cancelled':
      await handleSubscriptionCancelled(event.data as Subscription);
      break;
    default:
      console.log('Unhandled event:', event.event);
  }
}

async function handlePaymentCompleted(payment: Payment): Promise<void> {
  console.log('Payment completed:', payment.id);
  // TypeScript knows payment has all Payment properties
  console.log('Amount:', payment.amount);
  console.log('Status:', payment.status);
}

async function handleSubscriptionCreated(subscription: Subscription): Promise<void> {
  console.log('Subscription created:', subscription.id);
  // TypeScript knows subscription has all Subscription properties
  console.log('Plan:', subscription.planId);
  console.log('Customer:', subscription.customerWallet);
}

async function handleSubscriptionCancelled(subscription: Subscription): Promise<void> {
  console.log('Subscription cancelled:', subscription.id);
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
import { ZendFi } from '@zendfi/sdk';

// TypeScript ensures env vars are defined
const apiKey = process.env.ZENDFI_API_KEY;
const webhookSecret = process.env.ZENDFI_WEBHOOK_SECRET;

if (!apiKey) {
  throw new Error('ZENDFI_API_KEY is required');
}

if (!webhookSecret) {
  throw new Error('ZENDFI_WEBHOOK_SECRET is required');
}

export const zendfi = new ZendFi({
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
import type { Payment, PaymentCreateParams } from '@zendfi/sdk';

// Define custom metadata interface
interface OrderMetadata {
  order_id: string;
  user_id: string;
  product_sku: string;
  coupon_code?: string;
}

// Extend PaymentCreateParams with typed metadata
interface TypedPaymentCreateParams extends Omit<PaymentCreateParams, 'metadata'> {
  metadata: OrderMetadata;
}

// Type-safe payment creation
async function createOrderPayment(
  params: TypedPaymentCreateParams
): Promise<Payment> {
  return await zendfi.payments.create(params);
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
import { ZendFi, ZendFiError } from '@zendfi/sdk';
import type { Payment } from '@zendfi/sdk';

const zendfi = new ZendFi();

async function createPaymentSafely(
  amount: number
): Promise<Payment | null> {
  try {
    return await zendfi.payments.create({
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
  status: 'completed'
};

// Make all properties optional
type PartialPayment = Partial<Payment>;

// Make all properties required
type RequiredSubscription = Required<Subscription>;

// Exclude properties
type PaymentWithoutMetadata = Omit<Payment, 'metadata'>;

// Create union type from status values
type PaymentStatusUnion = Payment['status']; // 'pending' | 'completed' | 'failed' | 'expired'
```

## Best Practices

### 1. Always Import Types

```typescript
// ✅ Good: Import types separately
import { ZendFi } from '@zendfi/sdk';
import type { Payment, PaymentCreateParams } from '@zendfi/sdk';

// ❌ Avoid: Importing everything
import { ZendFi, Payment, PaymentCreateParams } from '@zendfi/sdk';
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
// ✅ Good: Explicit return type
async function getPayment(id: string): Promise<Payment> {
  return await zendfi.payments.retrieve(id);
}

// ❌ Avoid: Implicit return type
async function getPayment(id: string) {
  return await zendfi.payments.retrieve(id);
}
```

### 4. Use Type Narrowing

```typescript
import type { Payment } from '@zendfi/sdk';

function processPayment(payment: Payment): void {
  // Type narrowing with switch
  switch (payment.status) {
    case 'completed':
      console.log('Payment completed');
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

### 5. Validate at Runtime

```typescript
import { z } from 'zod';
import type { PaymentCreateParams } from '@zendfi/sdk';

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
  
  return await zendfi.payments.create(params);
}
```

## Framework-Specific Patterns

### Next.js with TypeScript

```typescript
// app/api/payments/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { ZendFi } from '@zendfi/sdk';
import type { Payment } from '@zendfi/sdk';

const zendfi = new ZendFi();

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    
    const payment: Payment = await zendfi.payments.create({
      amount: body.amount,
      currency: 'USD',
      description: body.description
    });
    
    return NextResponse.json({
      success: true,
      paymentUrl: payment.paymentUrl
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
import { ZendFi } from '@zendfi/sdk';
import type { Payment, PaymentCreateParams } from '@zendfi/sdk';

const router = express.Router();
const zendfi = new ZendFi();

interface CreatePaymentBody {
  amount: number;
  description: string;
}

router.post('/payments', async (
  req: Request<{}, {}, CreatePaymentBody>,
  res: Response
) => {
  try {
    const params: PaymentCreateParams = {
      amount: req.body.amount,
      currency: 'USD',
      description: req.body.description
    };
    
    const payment: Payment = await zendfi.payments.create(params);
    
    res.json({
      success: true,
      paymentUrl: payment.paymentUrl
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
- [Testing & Debugging](/developer-tools/testing-and-debugging) - Test your integration
- [Best Practices](/developer-tools/best-practices) - Production patterns
- [API Reference](/api/payments) - Complete API documentation

**Need Help?**
- 💬 [Discord Community](https://discord.gg/zendfi)
- 📧 [Email Support](mailto:support@zendfi.tech)
