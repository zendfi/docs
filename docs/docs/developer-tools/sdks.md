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
| **TypeScript/Node.js** | `@zendfi/sdk` | 0.4.0 | `npm install @zendfi/sdk` |
| **Python** | `zendfi` | Coming soon | — |
| **React** | `@zendfi/react` | Coming soon | — |

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
import { zendfi } from '@zendfi/sdk';

// Automatically configured from ZENDFI_API_KEY environment variable
const payment = await zendfi.createPayment({
  amount: 99.99,
  description: 'Pro Plan Subscription'
});

console.log('Payment URL:', payment.payment_url);
```

### Configuration

```typescript
import { ZendFiClient } from '@zendfi/sdk';

// Custom configuration (rarely needed - SDK auto-configures from env)
const zendfi = new ZendFiClient({
  apiKey: 'zfi_live_abc123...',  // Optional if ZENDFI_API_KEY env var is set
  
  // Optional configuration
  timeout: 30000,           // Request timeout in ms
  retries: 3,               // Automatic retry count
  baseURL: 'https://...',   // Custom API URL (rare)
  debug: true,              // Enable debug logging
});

// Mode (test/live) is auto-detected from API key prefix:
// - zfi_test_xxx → test mode (Solana devnet)
// - zfi_live_xxx → live mode (Solana mainnet)
```

### Payments

```typescript
// Create payment
const payment = await zendfi.createPayment({
  amount: 100,
  currency: 'USD',
  token: 'USDC', // 'SOL', 'USDC', or 'USDT'
  description: 'Order #12345',
  customer_email: 'customer@example.com',
  metadata: { orderId: '12345' },
  redirect_url: 'https://yourapp.com/success',
});

// Get payment
const payment = await zendfi.getPayment('pay_xyz789');

// List payments
const payments = await zendfi.listPayments({
  status: 'Confirmed',
  limit: 20,
  from_date: '2025-01-01'
});
```

### Subscriptions

```typescript
// Create subscription plan
const plan = await zendfi.createSubscriptionPlan({
  name: 'Pro Monthly',
  amount: 29.99,
  interval: 'monthly',
  trial_days: 14
});

// Subscribe customer
const subscription = await zendfi.createSubscription({
  plan_id: plan.id,
  customer_wallet: '7xKXtg...',
  customer_email: 'customer@example.com'
});

// Cancel subscription
await zendfi.cancelSubscription(subscription.id);
```

### Webhooks

```typescript
// Next.js App Router
import { createNextWebhookHandler } from '@zendfi/sdk/nextjs';

export const POST = createNextWebhookHandler({
  secret: process.env.ZENDFI_WEBHOOK_SECRET!,
  handlers: {
    'payment.confirmed': async (payment) => {
      console.log('Payment completed:', payment.id);
      // Update your database
    },
    'subscription.activated': async (subscription) => {
      console.log('Subscription activated:', subscription.id);
    },
  },
});
```

### Error Handling

```typescript
import { ZendFiError, AuthenticationError, ValidationError } from '@zendfi/sdk';

try {
  const payment = await zendfi.getPayment('invalid_id');
} catch (error) {
  if (error instanceof AuthenticationError) {
    console.log('Invalid API key');
  } else if (error instanceof ValidationError) {
    console.log('Validation errors:', error.message);
  } else if (error instanceof ZendFiError) {
    console.log('API error:', error.message, error.code);
  }
}
```

---

## Agentic Intent Protocol

Enable AI agents to make payments autonomously with scoped permissions and spending limits.

### Namespaced APIs

```typescript
import { zendfi } from '@zendfi/sdk';

// Agent API - Manage agent keys and sessions
zendfi.agent.createKey(...)
zendfi.agent.createSession(...)

// Payment Intents - Two-phase payment flow
zendfi.intents.create(...)
zendfi.intents.confirm(...)

// Pricing - PPP and AI pricing
zendfi.pricing.getPPPFactor(...)

// Autonomy - Autonomous delegation
zendfi.autonomy.enable(...)

// Smart Payments - AI-powered routing
zendfi.smart.execute(...)
zendfi.smart.submitSigned(...)  // For device-bound flows
```

### Agent API Keys

Create scoped API keys for AI agents with limited permissions:

```typescript
// Create an agent API key (prefixed with zai_)
const agentKey = await zendfi.agent.createKey({
  name: 'Shopping Assistant',
  agent_id: 'shopping-assistant-v1',
  scopes: ['create_payments', 'read_analytics'],
  rate_limit_per_hour: 500,
});

// IMPORTANT: Save full_key now - it won't be shown again!
console.log(agentKey.full_key); // => "zai_test_abc123..."

// List agent keys
const keys = await zendfi.agent.listKeys();

// Revoke a key
await zendfi.agent.revokeKey(keyId);
```

### Agent Sessions

Create sessions with spending limits for user-approved agent actions:

```typescript
// Create a session with spending limits
const session = await zendfi.agent.createSession({
  agent_id: 'shopping-assistant-v1',
  user_wallet: 'Hx7B...abc',
  limits: {
    max_per_transaction: 50,  // $50 max per payment
    max_per_day: 200,         // $200 daily limit
  },
  duration_hours: 24,
});

// List active sessions
const sessions = await zendfi.agent.listSessions();

// Revoke session
await zendfi.agent.revokeSession(sessionId);
```

### Payment Intents

Modern two-phase payment flow for reliable checkout:

```typescript
// Step 1: Create intent when user starts checkout
const intent = await zendfi.intents.create({
  amount: 99.99,
  description: 'Premium subscription',
  capture_method: 'automatic',
});

// Step 2: Pass client_secret to frontend
console.log(intent.client_secret); // cs_abc123...

// Step 3: Confirm when user clicks "Pay"
const confirmed = await zendfi.intents.confirm(intent.id, {
  client_secret: intent.client_secret,
  customer_wallet: 'Hx7B...abc',
});

// Or cancel if needed
await zendfi.intents.cancel(intent.id);
```

### PPP Pricing

Automatically adjust prices based on customer location:

```typescript
// Get PPP factor for a country
const factor = await zendfi.pricing.getPPPFactor('BR');
// {
//   country_code: 'BR',
//   country_name: 'Brazil',
//   ppp_factor: 0.35,
//   adjustment_percentage: 35.0
// }

// Calculate localized price
const basePrice = 100;
const localPrice = basePrice * factor.ppp_factor;
console.log(`$${localPrice} for Brazilian customers`); // $35

// List all supported countries
const factors = await zendfi.pricing.listFactors();
```

**Supported Countries (27+):** Argentina, Australia, Brazil, Canada, China, Colombia, Egypt, France, Germany, Ghana, India, Indonesia, Japan, Kenya, Mexico, Nigeria, Philippines, Poland, South Africa, Thailand, Turkey, Ukraine, United Kingdom, Vietnam, and more.

### Autonomous Delegation

Enable agents to make payments without per-transaction approval:

```typescript
// Enable autonomous mode
const delegate = await zendfi.autonomy.enable({
  wallet_address: 'Hx7B...abc',
  agent_id: 'shopping-assistant',
  max_per_day_usd: 100,
  max_per_transaction_usd: 25,
  duration_hours: 24,
});

// Check status
const status = await zendfi.autonomy.getStatus(walletAddress);

// Revoke
await zendfi.autonomy.revoke(delegateId);
```

### Smart Payments

AI-powered payments with automatic PPP, gasless detection, and intelligent routing:

```typescript
const payment = await zendfi.smart.execute({
  agent_id: 'my-agent',
  user_wallet: 'Hx7B...abc',
  amount_usd: 99.99,
  country_code: 'BR', // Apply PPP automatically
  description: 'Pro subscription',
});

console.log(`Original: $${payment.original_amount_usd}`);
console.log(`Final: $${payment.final_amount_usd}`);
// Original: $99.99
// Final: $64.99 (35% PPP discount applied)
```

:::tip Alias Methods
`zendfi.smartPayment()` is also available as an alias for `zendfi.smart.execute()`. We recommend using the namespaced `smart.execute()` for consistency with other SDK methods.
:::

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
  Invoice,
  WebhookEvent,
  CreatePaymentRequest,
  CreateSubscriptionRequest,
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

- [Getting Started](/intro) - Initial setup guide
- [Payments API](/api/payments) - API reference
- [CLI](/developer-tools/cli) - Command-line tools
