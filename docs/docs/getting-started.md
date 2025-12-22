---
sidebar_position: 1
slug: /
title: Get started
description: Create your first crypto payment in 5 minutes
---

# Get Started with ZendFi

Accept SOL, USDC, and USDT payments in 5 minutes. No blockchain knowledge required.


## Quick Start (Using SDK)

The fastest way to integrate ZendFi:

### 1. Install the SDK

```bash
npm install @zendfi/sdk
```

### 2. Get your API key

[Sign up at zendfi.tech](https://zendfi.tech) to get your test API key.

### 3. Create a payment

```typescript
import { zendfi } from '@zendfi/sdk';

// Set your API key (environment variable recommended)
// ZENDFI_API_KEY=zfi_test_your_key_here

const payment = await zendfi.createPayment({
  amount: 50,
  description: 'Premium subscription',
  customer_email: 'customer@example.com',
});

console.log('Payment URL:', payment.payment_url);
// Send customer to: payment.payment_url
```

**Done!** Customer scans QR code or clicks link. Funds arrive in your wallet instantly.


## Detailed Setup (API)

Prefer to use the REST API directly? Here's the complete flow.

### Step 1: Create Your Merchant Account

```bash
curl -X POST https://api.zendfi.tech/api/v1/merchants \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My Store",
    "email": "merchant@example.com",
    "business_address": "123 Main St, San Francisco, CA",
    "wallet_generation_method": "mpc_passkey"
  }'
```

**Response:**

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "My Store",
  "email": "merchant@example.com",
  "api_key": "zfi_test_abc123...",
  "passkey_setup_url": "https://api.zendfi.tech/merchants/550e.../setup-passkey",
  "created_at": "2025-10-26T12:00:00Z"
}
```

:::warning Save Your API Key
Your `api_key` is shown only once! Store it securely in environment variables.
:::

### Wallet Options

| Option | Description | Best For |
|--------|-------------|----------|
| **MPC Passkey** | Non-custodial wallet with biometric auth | Most users (recommended) |
| **External Wallet** | Use your existing Solana wallet | Advanced users with existing setup |

**MPC Passkey** (No seed phrases!):

- No seed phrases to manage
- Export private keys anytime
- Withdraw funds via API
- Secure with WebAuthn/passkeys

```json
{
  "wallet_generation_method": "mpc_passkey"
}
```

**External Wallet:**

```json
{
  "wallet_generation_method": "external",
  "wallet_address": "YOUR_SOLANA_WALLET_ADDRESS"
}
```

### Step 2: Set Up Passkey (MPC Only)

If you chose MPC passkey:

1. Open the `passkey_setup_url` from the response
2. Click **"Register Passkey"**
3. Complete biometric authentication (Face ID/Touch ID)
4. Wait 5-10 seconds for wallet generation

**Done!** Your wallet is ready.

### Step 3: Test Your API Key

```bash
curl https://api.zendfi.tech/api/v1/merchants/me \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Step 4: Create Your First Payment

```bash
curl -X POST https://api.zendfi.tech/api/v1/payments \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 50,
    "currency": "USD",
    "description": "Premium subscription",
    "customer_email": "customer@example.com"
  }'
```

**Response:**

```json
{
  "payment_id": "pay_abc123",
  "amount_usd": 50,
  "status": "Pending",
  "payment_url": "https://pay.zendfi.tech/abc123",
  "qr_code": "data:image/png;base64,...",
  "expires_at": "2025-12-22T12:15:00Z"
}
```

Send your customer to `payment_url` or show them the `qr_code`. Done!


## API Key Modes

ZendFi uses **smart API keys** that auto-route to the correct network:

| Mode | Prefix | Network | Purpose |
|------|--------|---------|---------|
| **Test** | `zfi_test_` | Solana Devnet | Development (free) |
| **Live** | `zfi_live_` | Solana Mainnet | Production (real money) |

**No configuration needed.** The SDK/API detects the mode from your key prefix.


## Next Steps

### Set Up Webhooks

Get notified when payments are confirmed:

```typescript
// Next.js example
import { createWebhookHandler } from '@zendfi/sdk/nextjs';

export const POST = createWebhookHandler({
  secret: process.env.ZENDFI_WEBHOOK_SECRET!,
  handlers: {
    'payment.confirmed': async (payment) => {
      // Payment received! Fulfill order
      await fulfillOrder(payment.metadata.orderId);
    },
  },
});
```

**[Full Webhook Guide →](/features/webhooks)**

### Add Subscriptions

Recurring billing with trials and webhooks:

```typescript
const subscription = await zendfi.createSubscription({
  plan_id: 'plan_xyz',
  customer_wallet: '7xKXtg...',
  customer_email: 'customer@example.com',
});
```

**[Subscriptions Guide →](/api/subscriptions)**

### Try AI Features

Building AI agents? Enable autonomous payments:

```typescript
const session = await zendfi.agent.createSession({
  agent_id: 'shopping-bot-v1',
  user_wallet: 'Hx7B...abc',
  limits: { max_per_day: 200 },
});
```

**[AI Payments Guide →](/agentic)**


## Test vs Live Mode

### Test Mode (Free)

- Uses Solana **devnet** (test network)
- Get free SOL from [sol-faucet.com](https://www.sol-faucet.com/)
- All tokens are worthless (for testing only)
- Perfect for development

### Live Mode (Production)

- Uses Solana **mainnet** (real network)
- Real crypto transactions
- ~$0.0001 network fees (we cover it with 0.6% platform fee)
- Ready for customers

**Switch between modes by changing your API key.** That's it!


## Getting Help

- **Discord:** [discord.gg/zendfi](https://discord.gg/zendfi)
- **Email:** [support@zendfi.tech](mailto:support@zendfi.tech)
- **Docs:** [Full API Reference →](/api/payments)

**Ready to scale?** Check out [Payment Links](/api/payment-links), [Subscriptions](/api/subscriptions), and [AI Features](/agentic).

### Example Request

```bash
curl -X POST https://api.zendfi.tech/api/v1/payments \
  -H "Authorization: Bearer zfi_test_abc123..." \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 25.00,
    "currency": "USD",
    "token": "USDC",
    "description": "Premium Subscription",
    "customer_email": "customer@example.com",
    "metadata": {
      "order_id": "ORD-12345",
      "product": "premium_plan"
    }
  }'
```

### Response

```json
{
  "payment_id": "pay_abc123xyz789",
  "amount_usd": 25.00,
  "token": "USDC",
  "status": "pending",
  "payment_url": "https://zendfi.tech/pay/pay_abc123xyz789",
  "qr_code": "solana:...",
  "expires_at": "2025-10-26T12:15:00Z",
  "created_at": "2025-10-26T12:00:00Z"
}
```

### Payment Flow

1. **Create payment** → Get `payment_url` and `qr_code`
2. **Customer pays** → Scans QR or clicks link
3. **Webhook fired** → `payment.confirmed` event sent to your server
4. **Funds received** → Check your wallet balance!

## Step 5: Handle Webhooks

Set up a webhook endpoint to receive real-time payment notifications:

```javascript
// Express.js example
app.post('/webhooks/zendfi', (req, res) => {
  const { event, data } = req.body;
  
  switch (event) {
    case 'payment.confirmed':
      // Payment successful!
      console.log(`Payment ${data.payment_id} confirmed!`);
      // Fulfill the order...
      break;
    case 'payment.failed':
      // Payment failed
      console.log(`Payment ${data.payment_id} failed`);
      break;
  }
  
  res.status(200).send('OK');
});
```

:::info Webhook Verification
Always verify webhook signatures in production. See the [Webhooks documentation](/features/webhooks) for details.
:::

## Using the SDK

For a better developer experience, use our TypeScript SDK:

```typescript
import { zendfi } from '@zendfi/sdk';

// Zero-config: API key auto-loaded from ZENDFI_API_KEY env var
// Mode (test/live) auto-detected from API key prefix

// Create a payment
const payment = await zendfi.createPayment({
  amount: 25.00,
  description: 'Premium Subscription'
});

console.log(`Payment URL: ${payment.payment_url}`);
```

## What's Next?

Now that you have the basics down, explore more features:

- [Payments API](/api/payments) - Full payment API reference
- [Subscriptions](/api/subscriptions) - Recurring billing
- [Payment Links](/api/payment-links) - Reusable payment URLs
- [Webhooks](/features/webhooks) - Event notifications
- [API Reference](/api/payments) - Complete API documentation with SDK examples

## Need Help?

- Email: [support@zendfi.tech](mailto:support@zendfi.tech)
- Discord: [discord.gg/zendfi](https://discord.gg/zendfi)
- API Reference: [api.zendfi.tech](https://api.zendfi.tech)

Happy building!
