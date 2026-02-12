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
NEXT_PUBLIC_URL=http://localhost:3000
```

Initialize the SDK:

```typescript
// lib/zendfi.ts
import { ZendFi } from '@zendfi/sdk';

export const zendfi = new ZendFi({
  apiKey: process.env.ZENDFI_API_KEY!,
  mode: process.env.NODE_ENV === 'production' ? 'live' : 'test',
});
```

## Step 2: Create Checkout Flow

### Option A: Hosted Checkout (Redirect)

Redirect customers to ZendFi's hosted checkout page:

### Product Page

```typescript
// app/products/[id]/page.tsx
import { zendfi } from '@/lib/zendfi';

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id); // Your DB query
  
  async function checkout() {
    'use server';
    
    const payment = await zendfi.createPayment({
      amount: product.price,
      currency: 'USD',
      token: 'USDC', // Accept USDC stablecoin
      description: product.name,
      metadata: {
        product_id: product.id,
        product_name: product.name,
      },
    });
    
    // Redirect to checkout
    return payment.payment_url; // Returns hosted checkout URL
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
  const payment = await zendfi.createPayment({
    amount: total,
    currency: 'USD',
    token: 'USDC',
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
  });
  
  // Return checkout URL with payment ID in query string
  const checkoutUrl = `${payment.payment_url}?session_id=${payment.id}`;
  
  return Response.json({ paymentUrl: checkoutUrl });
}
```

### Option B: Embedded Checkout (No Redirect)

Keep customers on your site with embedded checkout:

```typescript
// app/products/[id]/page.tsx
'use client';
import { ZendFiEmbeddedCheckout } from '@zendfi/sdk';
import { useState } from 'react';

export default function ProductPage({ product }: { product: Product }) {
  const [checkoutVisible, setCheckoutVisible] = useState(false);
  const [checkoutMounted, setCheckoutMounted] = useState(false);
  
  async function handleBuyNow() {
    // Create payment link via API route
    const response = await fetch('/api/checkout/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productId: product.id,
        amount: product.price,
        description: product.name,
      }),
    });
    
    const { linkCode } = await response.json();
    
    // Show checkout container
    setCheckoutVisible(true);
    
    // Mount embedded checkout
    if (!checkoutMounted) {
      const checkout = new ZendFiEmbeddedCheckout({
        linkCode,
        containerId: 'checkout-container',
        mode: 'live',
        
        onSuccess: async (payment) => {
          // Hide checkout
          setCheckoutVisible(false);
          
          // Redirect to success page
          window.location.href = `/orders/success?paymentId=${payment.paymentId}`;
        },
        
        onError: (error) => {
          alert(`Payment failed: ${error.message}`);
        },
        
        theme: {
          primaryColor: '#0066ff',
          borderRadius: '12px',
        },
      });
      
      await checkout.mount();
      setCheckoutMounted(true);
    }
  }
  
  return (
    <div>
      <h1>{product.name}</h1>
      <p>${product.price}</p>
      <img src={product.image} alt={product.name} />
      
      <button onClick={handleBuyNow}>Buy Now</button>
      
      {checkoutVisible && (
        <div id="checkout-container" className="checkout-modal" />
      )}
    </div>
  );
}
```

**Backend API route for creating payment link:**

```typescript
// app/api/checkout/create/route.ts
import { zendfi } from '@/lib/zendfi';

export async function POST(request: Request) {
  const { productId, amount, description } = await request.json();
  
  const link = await zendfi.createPaymentLink({
    amount,
    currency: 'USD',
    token: 'USDC',
    description,
    metadata: { product_id: productId },
  });
  
  return Response.json({ linkCode: link.link_code });
}
```

**Shopping cart embedded checkout:**

```typescript
// app/cart/page.tsx
'use client';
import { ZendFiEmbeddedCheckout } from '@zendfi/sdk';

export default function CartPage({ cart }: { cart: Cart }) {
  const [showCheckout, setShowCheckout] = useState(false);
  
  async function handleCheckout() {
    const total = cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity, 
      0
    );
    
    // Create payment link
    const response = await fetch('/api/checkout/create', {
      method: 'POST',
      body: JSON.stringify({
        amount: total,
        description: 'Shopping Cart Order',
        metadata: {
          cartId: cart.id,
          items: cart.items,
        },
      }),
    });
    
    const { linkCode } = await response.json();
    
    // Show embedded checkout
    setShowCheckout(true);
    
    const checkout = new ZendFiEmbeddedCheckout({
      linkCode,
      containerId: 'checkout-container',
      mode: 'live',
      onSuccess: (payment) => {
        window.location.href = `/orders/success?paymentId=${payment.paymentId}`;
      },
    });
    
    await checkout.mount();
  }
  
  return (
    <div>
      <h1>Shopping Cart</h1>
      {/* Cart items */}
      <button onClick={handleCheckout}>Proceed to Checkout</button>
      {showCheckout && <div id="checkout-container" />}
    </div>
  );
}
```

**When to use each:**

| Scenario | Best Choice |
|----------|-------------|
| Product pages | ✅ Embedded (Option B) |
| Shopping cart | ✅ Embedded (Option B) |
| Email campaigns | Hosted (Option A) |
| Social media | Hosted (Option A) |
| Simple setup | Hosted (Option A) |
| Custom branding | Embedded (Option B) |


## Step 3: Handle Webhooks

Create webhook handler to process orders:

```typescript
// app/api/webhooks/zendfi/route.ts
import { createNextWebhookHandler } from '@zendfi/sdk/next';
import { createOrder, reduceInventory, sendOrderConfirmation, clearCart, sendPaymentFailedEmail } from '@/lib/orders';

export const POST = createNextWebhookHandler({
  secret: process.env.ZENDFI_WEBHOOK_SECRET!,
  handlers: {
    'PaymentConfirmed': async (payment) => {
      // Payment successful - fulfill the order
      const items = JSON.parse(payment.metadata.items);
      
      // 1. Create order in database
      const order = await createOrder({
        userId: payment.metadata.user_id,
        items,
        total: payment.amount_usd || payment.amount,
        paymentId: payment.id,
        transactionSignature: payment.transaction_signature,
      });
      
      // 2. Reduce inventory
      await reduceInventory(items);
      
      // 3. Send confirmation email
      await sendOrderConfirmation({
        email: payment.customer_email,
        orderId: order.id,
        items,
        total: payment.amount_usd || payment.amount,
      });
      
      // 4. Clear user's cart
      await clearCart(payment.metadata.user_id);
      
      console.log(`Order ${order.id} fulfilled for payment ${payment.id}`);
    },
    
    'PaymentFailed': async (payment) => {
      // Payment failed - notify user
      if (payment.customer_email) {
        await sendPaymentFailedEmail({
          email: payment.customer_email,
          reason: 'Payment could not be processed',
        });
      }
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
  const payment = await zendfi.getPayment(searchParams.session_id);
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
          <strong>Total: ${payment.amount_usd || payment.amount}</strong>
        </div>
      </div>
      
      {payment.transaction_signature && (
        <p>Transaction: {payment.transaction_signature}</p>
      )}
      {payment.customer_email && (
        <p>We've sent a confirmation email to {payment.customer_email}</p>
      )}
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
  const payment = await zendfi.getPayment(params.id);
  return Response.json({
    status: payment.status,
    confirmed_at: payment.confirmed_at,
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
const discountedAmount = total * (1 - discountPercent);

const payment = await zendfi.createPayment({
  amount: discountedAmount,
  currency: 'USD',
  token: 'USDC',
  description: `Order from My Store (${discountCode} applied)`,
  metadata: {
    discount_code: discountCode,
    original_amount: total,
    discount_amount: total * discountPercent,
    final_amount: discountedAmount,
  },
});
```


## Testing

### Create Test Payment

```typescript
import { ZendFi } from '@zendfi/sdk';

const zendfi = new ZendFi({
  apiKey: process.env.ZENDFI_API_KEY!,
  mode: 'test',
});

// Create test payment
const payment = await zendfi.createPayment({
  amount: 99.99,
  currency: 'USD',
  token: 'USDC',
  description: 'Test order',
  metadata: {
    test: true,
    items: JSON.stringify([{
      id: 'prod_1',
      name: 'Test Product',
      quantity: 1,
      price: 99.99,
    }]),
  },
});

console.log('Payment URL:', payment.payment_url);
console.log('Payment ID:', payment.id);
```

### Test Webhooks Locally

Use ngrok to test webhooks on localhost:

```bash
# Start ngrok
ngrok http 3000

# Update webhook URL in ZendFi dashboard to:
# https://your-ngrok-url.ngrok.io/api/webhooks/zendfi

# Make a test payment and watch your logs
```

### Verify Payment Status

```typescript
// Check payment status
const payment = await zendfi.getPayment('payment_id');
console.log('Status:', payment.status);
console.log('Amount:', payment.amount_usd || payment.amount);
console.log('Transaction:', payment.transaction_signature);
```

## Production Checklist

- [ ] Switch to live API key (`zfi_live_...`)
- [ ] Update webhook URL to production domain
- [ ] Test webhooks with real payments on testnet first
- [ ] Set up error monitoring (Sentry, DataDog, etc.)
- [ ] Add loading states and error handling in UI
- [ ] Test with different tokens (SOL, USDC, USDT)
- [ ] Add customer support contact information
- [ ] Set up order notification system (email/SMS)
- [ ] Test refund/cancellation flow
- [ ] Implement inventory management
- [ ] Add order tracking system
- [ ] Set up analytics and monitoring
- [ ] Test mobile checkout experience
- [ ] Ensure HTTPS on production domain


## Complete Integration Flow

1. **User adds items to cart**
2. **User clicks checkout**
   - Your app creates payment via `zendfi.createPayment()`
   - Redirects user to `payment.payment_url`
3. **User completes payment on ZendFi**
   - ZendFi sends webhook to your server
4. **Your webhook handler processes the order**
   - Creates order in database
   - Reduces inventory
   - Sends confirmation email
   - Clears cart
5. **User redirected back to your success page**
   - Shows order confirmation
   - Displays transaction details


## Learn More

- [Payments API](../api/payments.md)
- [Webhooks Guide](../features/webhooks.md)
- [Payment Links](../api/payment-links.md)
- [Error Handling](../developer-tools/best-practices.md)


## Need Help?

- [Join Discord](https://discord.gg/zendfi)
- [Email support](mailto:support@zendfi.tech)
- [Book a demo](https://zendfi.tech/demo)
