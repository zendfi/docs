# ZendFi Embedded Checkout

## Overview

The ZendFi Embedded Checkout allows you to integrate a complete payment checkout experience directly into your website or application, without redirecting users to `checkout.zendfi.tech`. This provides a seamless, on-brand payment experience while still leveraging ZendFi's secure payment infrastructure.

## Features

✅ **Fully Embedded** - No redirects, checkout stays on your domain  
✅ **Multiple Payment Methods** - QR codes, browser wallets, WalletConnect  
✅ **Customizable Theme** - Match your brand colors and styling  
✅ **Real-time Updates** - Automatic payment confirmation polling  
✅ **Gasless Transactions** - Support for gasless payments  
✅ **Pay What You Want** - Optional custom amount support  
✅ **TypeScript Support** - Full type safety and IntelliSense  

## Quick Start

### 1. Installation

```bash
npm install @zendfi/sdk
# or
yarn add @zendfi/sdk
# or
pnpm add @zendfi/sdk
```

### 2. Basic Usage

```typescript
import { ZendFiEmbeddedCheckout } from '@zendfi/sdk';

// Create checkout instance
const checkout = new ZendFiEmbeddedCheckout({
  linkCode: 'abc123xyz',  // Your payment link code
  containerId: 'checkout-container',
  mode: 'live',  // or 'test' for devnet
  
  onSuccess: (payment) => {
    console.log('Payment successful!', payment);
    // Redirect to success page, update UI, etc.
  },
  
  onError: (error) => {
    console.error('Payment failed:', error);
    // Show error message, retry, etc.
  }
});

// Mount to DOM
checkout.mount();
```

### 3. HTML Setup

```html
<!DOCTYPE html>
<html>
<head>
  <title>Checkout</title>
</head>
<body>
  <!-- Checkout will be rendered here -->
  <div id="checkout-container"></div>
  
  <script type="module" src="/your-checkout.js"></script>
</body>
</html>
```

## Configuration Options

### EmbeddedCheckoutConfig

```typescript
interface EmbeddedCheckoutConfig {
  // Required: Payment identifier
  linkCode?: string;        // Payment link code (from createPaymentLink)
  paymentId?: string;       // Or direct payment ID
  
  // Required: DOM container
  containerId: string;      // Element ID where checkout renders
  
  // Optional: API configuration
  mode?: 'test' | 'live';   // Default: 'test'
  apiUrl?: string;          // Default: 'https://api.zendfi.tech'
  
  // Optional: Callbacks
  onSuccess?: (payment: PaymentSuccessData) => void;
  onError?: (error: CheckoutError) => void;
  onLoad?: () => void;
  
  // Optional: Customization
  theme?: CheckoutTheme;
  allowCustomAmount?: boolean;
  
  // Optional: Payment method configuration
  paymentMethods?: {
    walletConnect?: boolean;  // Default: true
    qrCode?: boolean;         // Default: true
    solanaWallet?: boolean;   // Default: true
  };
}
```

## Theme Customization

Customize the checkout appearance to match your brand:

```typescript
const checkout = new ZendFiEmbeddedCheckout({
  linkCode: 'abc123xyz',
  containerId: 'checkout-container',
  
  theme: {
    primaryColor: '#667eea',
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    fontFamily: 'Inter, sans-serif',
    textColor: '#1f2937',
    buttonStyle: 'solid',  // 'solid' | 'outlined' | 'minimal'
  }
});
```

## Advanced Examples

### React Integration

```tsx
import { useEffect, useRef } from 'react';
import { ZendFiEmbeddedCheckout } from '@zendfi/sdk';

function CheckoutPage({ linkCode }) {
  const checkoutRef = useRef(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create checkout
    const checkout = new ZendFiEmbeddedCheckout({
      linkCode,
      containerId: 'zendfi-checkout',
      mode: 'live',
      
      onSuccess: (payment) => {
        console.log('Payment successful:', payment);
        // Navigate to success page
        window.location.href = '/success';
      },
      
      onError: (error) => {
        console.error('Payment error:', error);
        alert(`Payment failed: ${error.message}`);
      },
      
      theme: {
        primaryColor: '#8b5cf6',
        borderRadius: '12px',
      }
    });

    // Mount checkout
    checkout.mount();
    checkoutRef.current = checkout;

    // Cleanup on unmount
    return () => {
      checkout.unmount();
    };
  }, [linkCode]);

  return (
    <div className="checkout-page">
      <h1>Complete Your Payment</h1>
      <div id="zendfi-checkout" ref={containerRef} />
    </div>
  );
}
```

### Next.js Integration

```tsx
'use client';

import { useEffect } from 'react';
import { ZendFiEmbeddedCheckout } from '@zendfi/sdk';

export default function CheckoutPage({
  params,
}: {
  params: { linkCode: string };
}) {
  useEffect(() => {
    const checkout = new ZendFiEmbeddedCheckout({
      linkCode: params.linkCode,
      containerId: 'checkout',
      mode: process.env.NEXT_PUBLIC_ZENDFI_MODE as 'test' | 'live',
      
      onSuccess: (payment) => {
        // Track conversion
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'purchase', {
            transaction_id: payment.paymentId,
            value: payment.amount,
            currency: payment.token,
          });
        }
        
        // Redirect
        window.location.href = `/success?payment=${payment.paymentId}`;
      },
      
      onError: (error) => {
        console.error('Payment failed:', error);
      },
    });

    checkout.mount();

    return () => checkout.unmount();
  }, [params.linkCode]);

  return (
    <main className="container mx-auto py-8">
      <div id="checkout" className="max-w-lg mx-auto" />
    </main>
  );
}
```

### Vue.js Integration

```vue
<template>
  <div class="checkout-page">
    <h1>Complete Your Payment</h1>
    <div id="zendfi-checkout"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue';
import { ZendFiEmbeddedCheckout } from '@zendfi/sdk';

const props = defineProps<{
  linkCode: string;
}>();

let checkout: ZendFiEmbeddedCheckout | null = null;

onMounted(() => {
  checkout = new ZendFiEmbeddedCheckout({
    linkCode: props.linkCode,
    containerId: 'zendfi-checkout',
    mode: 'live',
    
    onSuccess: (payment) => {
      console.log('Payment successful:', payment);
      // Handle success
    },
    
    onError: (error) => {
      console.error('Payment error:', error);
      // Handle error
    },
  });

  checkout.mount();
});

onBeforeUnmount(() => {
  if (checkout) {
    checkout.unmount();
  }
});
</script>
```

### Custom Amount (Pay What You Want)

```typescript
const checkout = new ZendFiEmbeddedCheckout({
  linkCode: 'abc123xyz',
  containerId: 'checkout-container',
  
  // Enable custom amounts
  allowCustomAmount: true,
  
  onSuccess: (payment) => {
    console.log(`Customer paid $${payment.amount} ${payment.token}`);
  }
});
```

### Minimal Payment Methods

```typescript
const checkout = new ZendFiEmbeddedCheckout({
  linkCode: 'abc123xyz',
  containerId: 'checkout-container',
  
  // Only show wallet connection (no QR code)
  paymentMethods: {
    solanaWallet: true,
    qrCode: false,
    walletConnect: false,
  }
});
```

## API Reference

### ZendFiEmbeddedCheckout

#### Constructor

```typescript
new ZendFiEmbeddedCheckout(config: EmbeddedCheckoutConfig)
```

Creates a new embedded checkout instance.

#### Methods

##### mount()

```typescript
async mount(): Promise<void>
```

Mounts the checkout to the DOM. Fetches payment data and renders the UI.

**Throws:** Error if container element is not found or if payment data cannot be fetched.

##### unmount()

```typescript
unmount(): void
```

Unmounts the checkout and cleans up resources (stops polling, clears DOM).

### Types

#### PaymentSuccessData

```typescript
interface PaymentSuccessData {
  paymentId: string;
  transactionSignature: string;
  amount: number;
  token: string;
  merchantName: string;
}
```

#### CheckoutError

```typescript
interface CheckoutError {
  code: string;
  message: string;
  details?: any;
}
```

Error codes:
- `MOUNT_ERROR` - Failed to mount checkout
- `WALLET_ERROR` - Wallet connection/signing failed
- `PAYMENT_FAILED` - Payment transaction failed
- `PAYMENT_EXPIRED` - Payment link has expired

## Backend Integration

### Create Payment Link

First, create a payment link using the ZendFi SDK:

```typescript
import { zendfi } from '@zendfi/sdk';

// Create a payment link
const paymentLink = await zendfi.createPaymentLink({
  amount: 99.99,
  currency: 'USD',
  token: 'USDC',
  description: 'Premium Plan - Monthly',
  max_uses: 1,  // Single-use link
});

console.log('Link code:', paymentLink.link_code);
// Pass this link_code to your frontend
```

### Or Create Direct Payment

```typescript
// Create a direct payment
const payment = await zendfi.createPayment({
  amount: 49.99,
  description: 'One-time purchase',
});

console.log('Payment ID:', payment.id);
// Pass this payment.id to your frontend as paymentId
```

## API Endpoints

The embedded checkout uses these public API endpoints:

### Get Checkout Data

```
POST /api/v1/payment-links/{linkCode}/pay
GET /api/v1/payments/{paymentId}/checkout-data
```

Returns checkout configuration and payment details.

### Build Transaction

```
POST /api/v1/payments/{paymentId}/build-transaction
```

Builds a Solana transaction for the payment.

### Submit Transaction

```
POST /api/v1/payments/{paymentId}/submit-transaction
POST /api/v1/payments/{paymentId}/submit-gasless-transaction
```

Submits the signed transaction.

### Check Payment Status

```
GET /api/v1/payments/{paymentId}/status
```

Gets current payment status (polled automatically).

## Security Considerations

### CORS

The embedded checkout works with any domain. CORS is configured to allow:
- All localhost ports (development)
- Your production domains (automatically allowed)

### Payment Validation

- All payments are validated server-side
- Transaction signatures are verified on-chain
- Duplicate submissions are prevented via idempotency
- Payment links can be single-use or multi-use

### Best Practices

1. **Always validate on backend** - Never trust client-side payment status alone
2. **Use webhooks** - Set up webhooks to receive real-time payment notifications
3. **Handle errors gracefully** - Show user-friendly error messages
4. **Test thoroughly** - Use test mode before going live

```typescript
// Good: Verify payment on your backend after success
onSuccess: async (payment) => {
  const response = await fetch('/api/verify-payment', {
    method: 'POST',
    body: JSON.stringify({ paymentId: payment.paymentId }),
  });
  
  if (response.ok) {
    window.location.href = '/success';
  } else {
    alert('Payment verification failed');
  }
}
```

## Troubleshooting

### Checkout doesn't appear

1. **Check container ID** - Make sure the element exists in DOM
2. **Check console** - Look for error messages
3. **Verify link code** - Ensure the payment link is valid and not expired

```typescript
// Debug mode
const checkout = new ZendFiEmbeddedCheckout({
  linkCode: 'abc123xyz',
  containerId: 'checkout-container',
  onLoad: () => console.log('Checkout loaded successfully'),
  onError: (error) => console.error('Checkout error:', error),
});
```

### Wallet connection fails

1. **Install wallet extension** - User needs Phantom, Solflare, or similar
2. **Check network** - Ensure wallet is on correct network (devnet/mainnet)
3. **Check browser** - Some wallets don't work in all browsers

### Payment not confirming

1. **Check Solana network status** - Network might be congested
2. **Check transaction** - View on Solscan/Solana Explorer
3. **Wait longer** - Confirmations can take 15-30 seconds

## Migration from Hosted Checkout

If you're currently using the hosted checkout at `checkout.zendfi.tech`, migration is simple:

### Before (Hosted)

```typescript
const paymentLink = await zendfi.createPaymentLink({
  amount: 99.99,
});

// Redirect user
window.location.href = paymentLink.hosted_page_url;
```

### After (Embedded)

```typescript
const paymentLink = await zendfi.createPaymentLink({
  amount: 99.99,
});

// Embed on your site
const checkout = new ZendFiEmbeddedCheckout({
  linkCode: paymentLink.link_code,
  containerId: 'checkout',
  onSuccess: () => window.location.href = '/success',
});

checkout.mount();
```

## Examples Repository

Find complete working examples at:
- [React Example](../zendfi-toolkit/packages/sdk/examples/embedded-checkout-react.tsx)
- [Next.js Example](../zendfi-toolkit/packages/sdk/examples/embedded-checkout-nextjs.tsx)
- [Vue Example](../zendfi-toolkit/packages/sdk/examples/embedded-checkout-vue.vue)
- [Vanilla JS Example](../zendfi-toolkit/packages/sdk/examples/embedded-checkout-vanilla.html)

## Support

- **Documentation**: https://docs.zendfi.tech
- **API Reference**: https://api.zendfi.tech
- **GitHub Issues**: https://github.com/zendfi/zendfi/issues
- **Discord**: https://discord.gg/zendfi

## Next Steps

- Set up [webhooks](./WEBHOOKS.md) for payment notifications
- Explore [session keys](./AGENT_SCOPED_SESSION_KEYS.md) for autonomous payments
- Learn about [payment intents](./PAYMENT_INTENTS.md) for advanced flows
