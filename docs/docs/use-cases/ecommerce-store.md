---
sidebar_position: 1
---

# E-commerce Store Integration

Build a complete e-commerce store accepting crypto payments with ZendFi.

## What You'll Build

- Product catalog with shopping cart
- Crypto checkout (SOL, USDC, USDT)
- Order management and fulfillment
- Email confirmations
- Webhook-based order processing

## Prerequisites

- Next.js 14+ (or Express backend)
- ZendFi API key ([get one here](https://dashboard.zendfi.tech))

## Quick Start

```bash
# Use our template
npx create-zendfi-app my-store --template nextjs-ecommerce
cd my-store
npm run dev
```

Or follow the guide below to build from scratch.

## Step 1: Install ZendFi SDK

```bash
npm install @zendfi/sdk
```

Create `.env.local`:

```env
ZENDFI_API_KEY=zfi_test_your_key_here
ZENDFI_WEBHOOK_SECRET=your_webhook_secret
```

## Step 2: Create Checkout Flow

### Product Page

```typescript
// app/products/[id]/page.tsx
import { zendfi } from '@/lib/zendfi';

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id); // Your DB query
  
  async function checkout() {
    'use server';
    
    const payment = await zendfi.payments.create({
      amount: product.price,
      description: product.name,
      metadata: {
        product_id: product.id,
        product_name: product.name,
      },
      successUrl: `${process.env.NEXT_PUBLIC_URL}/orders/success`,
      cancelUrl: `${process.env.NEXT_PUBLIC_URL}/products/${product.id}`,
    });
    
    return payment.paymentUrl;
  }
  
  return (
    <div>
      <h1>{product.name}</h1>
      <p>${product.price}</p>
      <form action={checkout}>
        <button type="submit">Buy Now</button>
      </form>
    </div>
  );
}
```

### Shopping Cart Checkout

```typescript
// app/cart/checkout/route.ts
import { zendfi } from '@/lib/zendfi';
import { getCart } from '@/lib/cart';

export async function POST(request: Request) {
  const { userId } = await request.json();
  
  // Get user's cart
  const cart = await getCart(userId);
  const total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  // Create payment with line items
  const payment = await zendfi.payments.create({
    amount: total,
    description: `Order from My Store`,
    metadata: {
      user_id: userId,
      cart_id: cart.id,
      items: JSON.stringify(cart.items.map(item => ({
        id: item.productId,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      }))),
    },
    successUrl: `${process.env.NEXT_PUBLIC_URL}/orders/success?session_id={PAYMENT_ID}`,
    cancelUrl: `${process.env.NEXT_PUBLIC_URL}/cart`,
  });
  
  return Response.json({ paymentUrl: payment.paymentUrl });
}
```

## Step 3: Handle Webhooks

Create webhook handler to process orders:

```typescript
// app/api/webhooks/zendfi/route.ts
import { createNextWebhookHandler } from '@zendfi/sdk/nextjs';
import { fulfillOrder, sendOrderConfirmation } from '@/lib/orders';

export const POST = createNextWebhookHandler({
  secret: process.env.ZENDFI_WEBHOOK_SECRET!,
  handlers: {
    'payment.confirmed': async (payment) => {
      // Payment successful - fulfill the order
      const items = JSON.parse(payment.metadata.items);
      
      // 1. Create order in database
      const order = await createOrder({
        userId: payment.metadata.user_id,
        items,
        total: payment.amount,
        paymentId: payment.id,
        transactionHash: payment.transactionHash,
      });
      
      // 2. Reduce inventory
      await reduceInventory(items);
      
      // 3. Send confirmation email
      await sendOrderConfirmation({
        email: payment.email,
        orderId: order.id,
        items,
        total: payment.amount,
      });
      
      // 4. Clear user's cart
      await clearCart(payment.metadata.user_id);
      
      console.log(`Order ${order.id} fulfilled for payment ${payment.id}`);
    },
    
    'payment.failed': async (payment) => {
      // Payment failed - notify user
      await sendPaymentFailedEmail({
        email: payment.email,
        reason: payment.failureReason,
      });
    },
  },
});
```

## Step 4: Order Success Page

```typescript
// app/orders/success/page.tsx
import { zendfi } from '@/lib/zendfi';

export default async function OrderSuccessPage({ 
  searchParams 
}: { 
  searchParams: { session_id: string } 
}) {
  const payment = await zendfi.payments.retrieve(searchParams.session_id);
  const items = JSON.parse(payment.metadata.items);
  
  return (
    <div className="success-page">
      <h1>✅ Order Confirmed!</h1>
      <p>Thank you for your purchase</p>
      
      <div className="order-details">
        <h2>Order Summary</h2>
        {items.map((item: any) => (
          <div key={item.id}>
            <span>{item.name}</span>
            <span>${item.price} × {item.quantity}</span>
          </div>
        ))}
        <div className="total">
          <strong>Total: ${payment.amount}</strong>
        </div>
      </div>
      
      <p>Transaction: {payment.transactionHash}</p>
      <p>We've sent a confirmation email to {payment.email}</p>
    </div>
  );
}
```

## Optional Enhancements

### Add Payment Status Tracking

Let customers track their payment in real-time:

```typescript
// app/api/payment-status/[id]/route.ts
import { zendfi } from '@/lib/zendfi';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const payment = await zendfi.payments.retrieve(params.id);
  return Response.json({
    status: payment.status,
    confirmed: payment.confirmedAt,
  });
}
```

```typescript
// components/PaymentStatus.tsx
'use client';

import { useEffect, useState } from 'react';

export function PaymentStatus({ paymentId }: { paymentId: string }) {
  const [status, setStatus] = useState('pending');
  
  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await fetch(`/api/payment-status/${paymentId}`);
      const data = await res.json();
      setStatus(data.status);
      
      if (data.status === 'confirmed') {
        clearInterval(interval);
        window.location.href = '/orders/success';
      }
    }, 3000);
    
    return () => clearInterval(interval);
  }, [paymentId]);
  
  return (
    <div>
      {status === 'pending' && <p>⏳ Waiting for payment...</p>}
      {status === 'confirmed' && <p>✅ Payment confirmed!</p>}
    </div>
  );
}
```

### Add Discount Codes

```typescript
const discountCode = 'SAVE20';
const discountPercent = 0.20;

const payment = await zendfi.payments.create({
  amount: total * (1 - discountPercent),
  description: `Order from My Store (${discountCode} applied)`,
  metadata: {
    discount_code: discountCode,
    original_amount: total,
    discount_amount: total * discountPercent,
  },
});
```


## Testing

```bash
# Test the checkout flow
zendfi payment create --amount 99.99 --open

# Listen for webhooks locally
zendfi webhooks listen --forward-to http://localhost:3000/api/webhooks/zendfi
```

## Production Checklist

- [ ] Switch to `zfi_live_` API key
- [ ] Test webhooks on production URL
- [ ] Set up error monitoring (Sentry, LogRocket)
- [ ] Add loading states and error handling
- [ ] Test with different tokens (SOL, USDC, USDT)
- [ ] Add customer support contact
- [ ] Set up order notification system
- [ ] Test refund flow


## Complete Example

See the full working example:

```bash
npx create-zendfi-app my-store --template nextjs-ecommerce
```

**Live Demo:** [ecommerce.zendfi.tech](https://ecommerce.zendfi.tech)

## Need Help?

- [Join Discord](https://discord.gg/zendfi)
- [Email support](mailto:support@zendfi.tech)
- [View API docs](https://docs.zendfi.tech/api)
