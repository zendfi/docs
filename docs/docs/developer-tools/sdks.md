---
sidebar_position: 1
title: SDKs
description: Official SDKs for TypeScript, Python, and more
---

# SDKs

Official SDKs to integrate ZendFi into your applications. Full type safety, automatic retries, and comprehensive error handling included.

## Available SDKs

| Language | Package | Version | Install |
|----------|---------|---------|---------|
| **TypeScript/Node.js** | `@zendfi/sdk` | 1.0.0 | `npm install @zendfi/sdk` |
| **Python** | `zendfi` | 1.0.0 | `pip install zendfi` |
| **React** | `@zendfi/react` | 1.0.0 | `npm install @zendfi/react` |

---

## TypeScript SDK

### Installation

```bash
npm install @zendfi/sdk
# or
yarn add @zendfi/sdk
# or
pnpm add @zendfi/sdk
```

### Quick Start

```typescript
import { ZendFi } from '@zendfi/sdk';

const zendfi = new ZendFi({
  apiKey: process.env.ZENDFI_API_KEY!,
  network: 'mainnet' // or 'devnet' for testing
});

// Create a payment
const payment = await zendfi.payments.create({
  amount: 99.99,
  currency: 'USD',
  description: 'Pro Plan Subscription'
});

console.log('Payment URL:', payment.paymentUrl);
```

### Configuration

```typescript
const zendfi = new ZendFi({
  apiKey: 'zfi_live_abc123...',
  network: 'mainnet',
  
  // Optional configuration
  timeout: 30000,           // Request timeout in ms
  maxRetries: 3,            // Automatic retry count
  baseUrl: 'https://...',   // Custom API URL (rare)
  
  // Logging
  debug: true,              // Enable debug logging
  logger: console           // Custom logger
});
```

### Payments

```typescript
// Create payment
const payment = await zendfi.payments.create({
  amount: 100,
  currency: 'USD',
  description: 'Order #12345',
  customerEmail: 'customer@example.com',
  metadata: { orderId: '12345' },
  expiresIn: 3600, // 1 hour
  splits: [
    { wallet: 'PartnerWallet...', percentage: 10 }
  ]
});

// Get payment
const payment = await zendfi.payments.get('pay_xyz789');

// List payments
const payments = await zendfi.payments.list({
  status: 'completed',
  limit: 20,
  startDate: new Date('2025-10-01')
});
```

### Subscriptions

```typescript
// Create subscription plan
const plan = await zendfi.subscriptionPlans.create({
  name: 'Pro Monthly',
  amount: 29.99,
  currency: 'USD',
  billingInterval: 'monthly',
  trialDays: 14
});

// Subscribe customer
const subscription = await zendfi.subscriptions.create({
  planId: plan.id,
  customerWallet: '7xKXtg...',
  customerEmail: 'customer@example.com'
});

// Cancel subscription
await zendfi.subscriptions.cancel(subscription.id, {
  cancelAtPeriodEnd: true
});
```

### Escrows

```typescript
// Create escrow
const escrow = await zendfi.escrows.create({
  title: 'Website Development',
  totalAmount: 5000,
  currency: 'USD',
  sellerWallet: 'SellerWallet...',
  milestones: [
    { title: 'Design', amount: 1500, dueDate: '2025-11-15' },
    { title: 'Development', amount: 2500, dueDate: '2025-12-01' },
    { title: 'Launch', amount: 1000, dueDate: '2025-12-15' }
  ]
});

// Release milestone
await zendfi.escrows.releaseMilestone(escrow.id, 'milestone_001');
```

### Webhooks

```typescript
// Verify webhook signature
import { verifyWebhookSignature } from '@zendfi/sdk';

const isValid = verifyWebhookSignature(
  payload,
  signature,
  webhookSecret
);

// Or use the WebhookHandler helper
const handler = new zendfi.WebhookHandler(webhookSecret);

handler.on('payment.completed', async (event) => {
  console.log('Payment completed:', event.data.paymentId);
  // Update your database, send confirmation, etc.
});

handler.on('subscription.renewed', async (event) => {
  console.log('Subscription renewed:', event.data.subscriptionId);
});

// In your Express route
app.post('/webhooks/zendfi', async (req, res) => {
  await handler.handle(req.body, req.headers['x-zendfi-signature']);
  res.json({ received: true });
});
```

### Error Handling

```typescript
import { ZendFiError, PaymentNotFoundError, ValidationError } from '@zendfi/sdk';

try {
  const payment = await zendfi.payments.get('invalid_id');
} catch (error) {
  if (error instanceof PaymentNotFoundError) {
    console.log('Payment not found');
  } else if (error instanceof ValidationError) {
    console.log('Validation errors:', error.errors);
  } else if (error instanceof ZendFiError) {
    console.log('API error:', error.message, error.code);
  }
}
```

---

## Python SDK

### Installation

```bash
pip install zendfi
# or
poetry add zendfi
```

### Quick Start

```python
from zendfi import ZendFi

zendfi = ZendFi(
    api_key="zfi_live_abc123...",
    network="mainnet"
)

# Create a payment
payment = zendfi.payments.create(
    amount=99.99,
    currency="USD",
    description="Pro Plan Subscription"
)

print(f"Payment URL: {payment.payment_url}")
```

### Async Support

```python
from zendfi import AsyncZendFi
import asyncio

async def main():
    zendfi = AsyncZendFi(
        api_key="zfi_live_abc123...",
        network="mainnet"
    )
    
    payment = await zendfi.payments.create(
        amount=99.99,
        currency="USD",
        description="Pro Plan"
    )
    
    print(f"Payment URL: {payment.payment_url}")
    
    await zendfi.close()

asyncio.run(main())
```

### Payments

```python
# Create payment
payment = zendfi.payments.create(
    amount=100,
    currency="USD",
    description="Order #12345",
    customer_email="customer@example.com",
    metadata={"order_id": "12345"},
    expires_in=3600,
    splits=[
        {"wallet": "PartnerWallet...", "percentage": 10}
    ]
)

# Get payment
payment = zendfi.payments.get("pay_xyz789")

# List payments
payments = zendfi.payments.list(
    status="completed",
    limit=20
)
```

### Subscriptions

```python
# Create plan
plan = zendfi.subscription_plans.create(
    name="Pro Monthly",
    amount=29.99,
    currency="USD",
    billing_interval="monthly",
    trial_days=14
)

# Subscribe customer
subscription = zendfi.subscriptions.create(
    plan_id=plan.id,
    customer_wallet="7xKXtg...",
    customer_email="customer@example.com"
)
```

### Webhooks with Flask

```python
from flask import Flask, request
from zendfi import verify_webhook

app = Flask(__name__)

@app.route('/webhooks/zendfi', methods=['POST'])
def handle_webhook():
    payload = request.get_data(as_text=True)
    signature = request.headers.get('X-ZendFi-Signature')
    
    if not verify_webhook(payload, signature, WEBHOOK_SECRET):
        return {'error': 'Invalid signature'}, 401
    
    event = request.json
    
    if event['event'] == 'payment.completed':
        # Handle payment completion
        payment_id = event['data']['payment_id']
        print(f"Payment completed: {payment_id}")
    
    return {'received': True}
```

### Webhooks with FastAPI

```python
from fastapi import FastAPI, Request, HTTPException
from zendfi import verify_webhook

app = FastAPI()

@app.post('/webhooks/zendfi')
async def handle_webhook(request: Request):
    payload = await request.body()
    signature = request.headers.get('X-ZendFi-Signature')
    
    if not verify_webhook(payload.decode(), signature, WEBHOOK_SECRET):
        raise HTTPException(status_code=401, detail='Invalid signature')
    
    event = await request.json()
    
    match event['event']:
        case 'payment.completed':
            print(f"Payment completed: {event['data']['payment_id']}")
        case 'subscription.renewed':
            print(f"Subscription renewed: {event['data']['subscription']['id']}")
    
    return {'received': True}
```

---

## React SDK

### Installation

```bash
npm install @zendfi/react @zendfi/sdk
```

### Setup Provider

```tsx
import { ZendFiProvider } from '@zendfi/react';

function App() {
  return (
    <ZendFiProvider
      apiKey="zfi_live_abc123..."
      network="mainnet"
    >
      <YourApp />
    </ZendFiProvider>
  );
}
```

### Checkout Component

The easiest way to accept payments:

```tsx
import { ZendFiCheckout } from '@zendfi/react';

function PaymentPage({ paymentId }: { paymentId: string }) {
  return (
    <ZendFiCheckout
      paymentId={paymentId}
      onSuccess={(result) => {
        console.log('Payment successful!', result.transactionSignature);
        // Redirect to success page
      }}
      onError={(error) => {
        console.error('Payment failed:', error);
      }}
      theme="dark" // 'light' | 'dark' | 'auto'
      accentColor="#6366f1"
    />
  );
}
```

### Payment Button

```tsx
import { PayButton } from '@zendfi/react';

function ProductPage() {
  return (
    <PayButton
      amount={99.99}
      currency="USD"
      description="Pro Plan"
      onSuccess={(result) => {
        console.log('Paid!', result);
      }}
    >
      Buy Now - $99.99
    </PayButton>
  );
}
```

### useZendFi Hook

```tsx
import { useZendFi } from '@zendfi/react';

function Dashboard() {
  const { payments, subscriptions, isLoading } = useZendFi();
  
  const handleCreatePayment = async () => {
    const payment = await payments.create({
      amount: 50,
      currency: 'USD',
      description: 'Custom payment'
    });
    
    // Redirect to payment.paymentUrl
    window.location.href = payment.paymentUrl;
  };
  
  return (
    <button onClick={handleCreatePayment} disabled={isLoading}>
      Create Payment
    </button>
  );
}
```

### usePayment Hook

```tsx
import { usePayment } from '@zendfi/react';

function PaymentStatus({ paymentId }: { paymentId: string }) {
  const { payment, isLoading, error, refetch } = usePayment(paymentId);
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      <p>Status: {payment.status}</p>
      <p>Amount: ${payment.amount}</p>
      {payment.status === 'completed' && (
        <p>✅ Payment confirmed!</p>
      )}
    </div>
  );
}
```

### Wallet Connection

```tsx
import { WalletButton, useWallet } from '@zendfi/react';

function WalletSection() {
  const { connected, address, disconnect } = useWallet();
  
  return (
    <div>
      {connected ? (
        <div>
          <p>Connected: {address}</p>
          <button onClick={disconnect}>Disconnect</button>
        </div>
      ) : (
        <WalletButton>Connect Wallet</WalletButton>
      )}
    </div>
  );
}
```

---

## TypeScript Types

All SDKs are fully typed. Import types directly:

```typescript
import type {
  Payment,
  PaymentStatus,
  Subscription,
  SubscriptionPlan,
  Escrow,
  Invoice,
  WebhookEvent,
  CreatePaymentParams,
  CreateSubscriptionParams
} from '@zendfi/sdk';

const handlePayment = (payment: Payment) => {
  if (payment.status === 'completed') {
    // TypeScript knows all Payment properties
  }
};
```

---

## Examples Repository

Find complete example applications in our GitHub repository:

```bash
git clone https://github.com/zendfi/examples
cd examples

# Next.js e-commerce
cd nextjs-store && npm install && npm run dev

# Express webhook server
cd express-webhooks && npm install && npm start

# Python Flask
cd flask-webhooks && pip install -r requirements.txt && flask run
```

---

## Support

- **Documentation**: [docs.zendfi.tech](https://docs.zendfi.tech)
- **GitHub Issues**: [github.com/zendfi/sdk/issues](https://github.com/zendfi/sdk/issues)
- **Discord**: [discord.gg/zendfi](https://discord.gg/zendfi)

---

## Next Steps

- [Getting Started](/getting-started) - Initial setup guide
- [Payments API](/api/payments) - API reference
- [CLI](/developer-tools/cli) - Command-line tools
