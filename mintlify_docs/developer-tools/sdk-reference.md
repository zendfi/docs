---
title: SDK Reference
description: The official Node.js/TypeScript SDK for integrating ZendFi payments, subscriptions, and more.
---

## Installation

```bash
npm install @zendfi/sdk
```

## Configuration

Initialize the client with your API key.

```typescript
import { ZendFi } from '@zendfi/sdk';

const zendfi = new ZendFi({
  apiKey: process.env.ZENDFI_API_KEY,
  // options...
});
```

## Services

The SDK provides access to all ZendFi modules:

- **Payments** - Create and manage one-time payments
- **Subscriptions** - Manage recurring billing plans and subscriptions
- **Payment Links** - Create reusable payment URLs
- **Invoices** - Send invoices with crypto payment options
- **Installments** - Manage buy now, pay later plans

## Error Handling

The SDK throws typed errors for API failures.

```typescript
try {
  const payment = await zendfi.createPayment({ ... });
} catch (error) {
  console.error('Payment failed:', error.message);
}
```

## Next Steps

Explore the specific guides for detailed usage:

- [TypeScript Guide](./typescript-guide) - Deep dive into types and patterns
- [Payments API](../api/payments) - Payment endpoints
- [Subscriptions API](../api/subscriptions) - Subscription endpoints
