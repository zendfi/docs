# ZendFi Embedded Checkout - Quick Start

## 🚀 Installation

```bash
npm install @zendfi/sdk
```

## 📦 Basic Usage

```typescript
import { ZendFiEmbeddedCheckout } from '@zendfi/sdk';

const checkout = new ZendFiEmbeddedCheckout({
  linkCode: 'your-link-code',
  containerId: 'checkout',
  mode: 'live',
  onSuccess: (payment) => console.log('✅ Paid:', payment),
  onError: (error) => console.error('❌ Error:', error)
});

checkout.mount();
```

## 🎨 With Custom Theme

```typescript
const checkout = new ZendFiEmbeddedCheckout({
  linkCode: 'your-link-code',
  containerId: 'checkout',
  theme: {
    primaryColor: '#8b5cf6',
    borderRadius: '12px',
    fontFamily: 'Inter, sans-serif'
  }
});
```

## ⚛️ React Example

```tsx
import { useEffect } from 'react';
import { ZendFiEmbeddedCheckout } from '@zendfi/sdk';

export function Checkout({ linkCode }) {
  useEffect(() => {
    const checkout = new ZendFiEmbeddedCheckout({
      linkCode,
      containerId: 'checkout',
      onSuccess: () => window.location.href = '/success'
    });
    
    checkout.mount();
    return () => checkout.unmount();
  }, [linkCode]);

  return <div id="checkout" />;
}
```

## 📚 Full Documentation

See [EMBEDDED_CHECKOUT.md](./EMBEDDED_CHECKOUT.md) for complete documentation.

## 🔧 Features

- ✅ No redirects - checkout stays on your domain
- ✅ Fully customizable theme
- ✅ Multiple payment methods (QR, wallet, WalletConnect)
- ✅ Real-time payment confirmation
- ✅ TypeScript support
- ✅ Works with any framework

## 🆚 Hosted vs Embedded

### Hosted Checkout (Existing)
```typescript
// Redirect to checkout.zendfi.tech
window.location.href = paymentLink.hosted_page_url;
```

### Embedded Checkout (New!)
```typescript
// Stay on your domain
const checkout = new ZendFiEmbeddedCheckout({
  linkCode: paymentLink.link_code,
  containerId: 'checkout'
});
checkout.mount();
```

## 📖 Examples

- [React Example](../zendfi-toolkit/packages/sdk/examples/embedded-checkout-react.tsx)
- [Vanilla JS Example](../zendfi-toolkit/packages/sdk/examples/embedded-checkout-vanilla.html)
- [Full Documentation](./EMBEDDED_CHECKOUT.md)

## 🎯 API Endpoints Used

- `POST /api/v1/payment-links/{linkCode}/pay` - Create payment from link
- `GET /api/v1/payments/{id}/checkout-data` - Get checkout data
- `POST /api/v1/payments/{id}/build-transaction` - Build transaction
- `POST /api/v1/payments/{id}/submit-transaction` - Submit payment
- `GET /api/v1/payments/{id}/status` - Check status (polling)

## 🔐 Security

✅ All transactions validated server-side  
✅ Signatures verified on-chain  
✅ CORS properly configured  
✅ No private keys in frontend  

## 🐛 Troubleshooting

**Checkout not appearing?**
- Check container ID exists in DOM
- Verify link code is valid
- Check browser console for errors

**Payment not confirming?**
- Wait 15-30 seconds for blockchain confirmation
- Check Solana network status
- Verify wallet has sufficient SOL for fees

## 💡 Support

- 📚 [Full Docs](./EMBEDDED_CHECKOUT.md)
- 🌐 [Website](https://zendfi.tech)
- 💬 [Discord](https://discord.gg/zendfi)
- 📧 Email: support@zendfi.tech
