---
sidebar_position: 4
---

# Next.js Integration

Complete guide to integrating ZendFi payments into your Next.js application.

## Quick Start

```bash
# Option 1: Use our template (fastest)
npx create-zendfi-app my-store --template nextjs-ecommerce

# Option 2: Add to existing Next.js app
cd my-nextjs-app
zendfi init --framework nextjs
```


## Installation

```bash
npm install @zendfi/sdk
```


## Environment Setup

Create `.env.local`:

```env
# Get your keys from https://dashboard.zendfi.tech
ZENDFI_API_KEY=zfi_test_your_key_here
ZENDFI_WEBHOOK_SECRET=your_webhook_secret

# For production
# ZENDFI_API_KEY=zfi_live_your_key_here
```


## Basic Setup

### Create SDK Instance

```typescript
// lib/zendfi.ts
import { ZendFi } from '@zendfi/sdk';

export const zendfi = new ZendFi({
  apiKey: process.env.ZENDFI_API_KEY!,
});
```


## App Router (Next.js 13+)

### Create Payment (Server Action)

```typescript
// app/checkout/actions.ts
'use server';

import { zendfi } from '@/lib/zendfi';

export async function createCheckout(formData: FormData) {
  const amount = parseFloat(formData.get('amount') as string);
  const email = formData.get('email') as string;
  
  const payment = await zendfi.payments.create({
    amount,
    currency: 'USD',
    token: 'USDC',
    customerEmail: email,
    successUrl: `${process.env.NEXT_PUBLIC_URL}/success`,
    metadata: {
      source: 'nextjs_app',
    },
  });
  
  return payment.paymentUrl;
}
```

### Checkout Page

```typescript
// app/checkout/page.tsx
import { createCheckout } from './actions';
import { redirect } from 'next/navigation';

export default function CheckoutPage() {
  async function handleCheckout(formData: FormData) {
    'use server';
    const paymentUrl = await createCheckout(formData);
    redirect(paymentUrl);
  }
  
  return (
    <form action={handleCheckout}>
      <input
        type="number"
        name="amount"
        placeholder="Amount (USD)"
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        required
      />
      <button type="submit">Pay with Crypto</button>
    </form>
  );
}
```

### API Route

```typescript
// app/api/checkout/route.ts
import { zendfi } from '@/lib/zendfi';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const { amount, email } = await request.json();
  
  const payment = await zendfi.payments.create({
    amount,
    currency: 'USD',
    customerEmail: email,
  });
  
  return Response.json({
    paymentUrl: payment.paymentUrl,
    paymentId: payment.id,
  });
}
```

### Webhooks Handler

```typescript
// app/api/webhooks/zendfi/route.ts
import { createNextWebhookHandler } from '@zendfi/sdk/nextjs';
import { fulfillOrder } from '@/lib/orders';

export const POST = createNextWebhookHandler({
  secret: process.env.ZENDFI_WEBHOOK_SECRET!,
  handlers: {
    'payment.confirmed': async (payment) => {
      // Payment successful - fulfill order
      await fulfillOrder({
        paymentId: payment.id,
        amount: payment.amount,
        email: payment.customerEmail,
        metadata: payment.metadata,
      });
      
      console.log(`✅ Order fulfilled for payment ${payment.id}`);
    },
    
    'payment.failed': async (payment) => {
      // Payment failed - notify user
      console.log(`❌ Payment failed: ${payment.id}`);
    },
  },
});

// Disable body parser for webhook verification
export const config = {
  api: {
    bodyParser: false,
  },
};
```


## Pages Router (Next.js 12)

### API Route for Payment

```typescript
// pages/api/create-payment.ts
import { zendfi } from '@/lib/zendfi';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  const { amount, email } = req.body;
  
  try {
    const payment = await zendfi.payments.create({
      amount: parseFloat(amount),
      currency: 'USD',
      customerEmail: email,
    });
    
    res.status(200).json({
      paymentUrl: payment.paymentUrl,
      paymentId: payment.id,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create payment' });
  }
}
```

### Checkout Component

```typescript
// components/Checkout.tsx
'use client';

import { useState } from 'react';

export function Checkout() {
  const [amount, setAmount] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch('/api/create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, email }),
      });
      
      const { paymentUrl } = await res.json();
      window.location.href = paymentUrl;
    } catch (error) {
      alert('Payment failed');
    } finally {
      setLoading(false);
    }
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount (USD)"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Processing...' : 'Pay with Crypto'}
      </button>
    </form>
  );
}
```

### Webhooks Handler

```typescript
// pages/api/webhooks/zendfi.ts
import { createNextWebhookHandler } from '@zendfi/sdk/nextjs';

export default createNextWebhookHandler({
  secret: process.env.ZENDFI_WEBHOOK_SECRET!,
  handlers: {
    'payment.confirmed': async (payment) => {
      console.log('Payment confirmed:', payment.id);
      // Handle order fulfillment
    },
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};
```


## Real-World Examples

### E-commerce Product Page

```typescript
// app/products/[id]/page.tsx
import { zendfi } from '@/lib/zendfi';
import { getProduct } from '@/lib/products';
import { redirect } from 'next/navigation';

export default async function ProductPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  const product = await getProduct(params.id);
  
  async function buyNow() {
    'use server';
    
    const payment = await zendfi.payments.create({
      amount: product.price,
      description: product.name,
      metadata: {
        product_id: product.id,
        product_name: product.name,
      },
      successUrl: `${process.env.NEXT_PUBLIC_URL}/orders/success?payment_id={PAYMENT_ID}`,
    });
    
    redirect(payment.paymentUrl);
  }
  
  return (
    <div>
      <h1>{product.name}</h1>
      <p>${product.price}</p>
      <form action={buyNow}>
        <button type="submit">Buy Now</button>
      </form>
    </div>
  );
}
```

### Subscription Checkout

```typescript
// app/subscribe/[plan]/page.tsx
import { zendfi } from '@/lib/zendfi';
import { PLANS } from '@/lib/plans';
import { redirect } from 'next/navigation';

export default async function SubscribePage({ 
  params 
}: { 
  params: { plan: string } 
}) {
  const plan = PLANS[params.plan];
  
  async function subscribe(formData: FormData) {
    'use server';
    
    const email = formData.get('email') as string;
    
    const subscription = await zendfi.subscriptions.create({
      planId: plan.id,
      customerEmail: email,
      successUrl: `${process.env.NEXT_PUBLIC_URL}/dashboard`,
    });
    
    redirect(subscription.paymentUrl);
  }
  
  return (
    <div>
      <h1>Subscribe to {plan.name}</h1>
      <p>${plan.price}/month</p>
      
      <form action={subscribe}>
        <input
          type="email"
          name="email"
          placeholder="Your email"
          required
        />
        <button type="submit">Subscribe</button>
      </form>
    </div>
  );
}
```

### Shopping Cart

```typescript
// app/cart/checkout/route.ts
import { zendfi } from '@/lib/zendfi';
import { getCart } from '@/lib/cart';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const { userId } = await request.json();
  const cart = await getCart(userId);
  
  const total = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity, 
    0
  );
  
  const payment = await zendfi.payments.create({
    amount: total,
    description: `Order from My Store`,
    metadata: {
      user_id: userId,
      cart_id: cart.id,
      items: JSON.stringify(cart.items),
    },
  });
  
  return Response.json({ paymentUrl: payment.paymentUrl });
}
```


## Testing Locally

### 1. Start Development Server

```bash
npm run dev
```

### 2. Listen for Webhooks

```bash
# In a new terminal
zendfi webhooks listen --forward-to http://localhost:3000/api/webhooks/zendfi
```

### 3. Create Test Payment

```bash
zendfi payment create --amount 10 --open
```


## Deployment Checklist

### Vercel

1. Add environment variables in Vercel dashboard:
   ```
   ZENDFI_API_KEY=zfi_live_your_key_here
   ZENDFI_WEBHOOK_SECRET=your_webhook_secret
   NEXT_PUBLIC_URL=https://yourapp.com
   ```

2. Deploy:
   ```bash
   vercel --prod
   ```

3. Configure webhook URL in [ZendFi Dashboard](https://dashboard.zendfi.tech):
   ```
   https://yourapp.com/api/webhooks/zendfi
   ```

### Other Platforms

**Railway, Render, Fly.io:**
- Set same environment variables
- Deploy your app
- Update webhook URL in dashboard


## Best Practices

### 1. Error Handling

```typescript
try {
  const payment = await zendfi.payments.create({
    amount: 50,
    currency: 'USD',
  });
} catch (error) {
  if (error.code === 'INVALID_AMOUNT') {
    // Handle validation error
  } else if (error.code === 'RATE_LIMIT_EXCEEDED') {
    // Handle rate limit
  } else {
    // Handle other errors
  }
}
```

### 2. Loading States

```typescript
'use client';

export function CheckoutButton() {
  const [isLoading, setIsLoading] = useState(false);
  
  async function handleClick() {
    setIsLoading(true);
    try {
      const res = await fetch('/api/checkout', { method: 'POST' });
      const { paymentUrl } = await res.json();
      window.location.href = paymentUrl;
    } catch (error) {
      alert('Failed to create payment');
      setIsLoading(false);
    }
  }
  
  return (
    <button onClick={handleClick} disabled={isLoading}>
      {isLoading ? 'Processing...' : 'Checkout'}
    </button>
  );
}
```

### 3. TypeScript Types

```typescript
import type { Payment, Subscription } from '@zendfi/sdk';

interface OrderData {
  payment: Payment;
  items: CartItem[];
  total: number;
}

async function processOrder(data: OrderData) {
  // TypeScript knows the shape of Payment
  console.log(data.payment.id);
  console.log(data.payment.status);
}
```


## Troubleshooting

### Webhooks Not Working

```bash
# Test webhook locally
zendfi webhooks listen

# Check webhook signature in production
# Make sure ZENDFI_WEBHOOK_SECRET is set correctly
```

### Payment Not Creating

```bash
# Check API key is set
echo $ZENDFI_API_KEY

# Enable debug mode
DEBUG=zendfi* npm run dev
```

### TypeScript Errors

```bash
# Make sure @zendfi/sdk is installed
npm install @zendfi/sdk

# Regenerate types
rm -rf node_modules/.cache
npm run dev
```


## Next Steps

- [Complete E-commerce Example](../use-cases/ecommerce-store)
- [SaaS Subscription Guide](../use-cases/saas-subscriptions)
- [TypeScript Guide](./typescript-guide) - Type-safe SDK patterns
- [Webhook Events](../features/webhooks)


## Need Help?

- [Join Discord](https://discord.gg/zendfi)
- [Email support](mailto:support@zendfi.tech)
- [View examples on GitHub](https://github.com/zendfi/examples)
