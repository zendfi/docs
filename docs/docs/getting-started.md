---
sidebar_position: 1
slug: /
title: Get started
description: Set up your ZendFi merchant account and create your first payment
---

# Getting Started with ZendFi

Welcome to ZendFi! This guide will walk you through setting up your merchant account, choosing your wallet type, generating API keys, and making your first payment. Let's get you accepting crypto payments in minutes! 🚀

## Quick Start

```bash
# Install the ZendFi SDK
npm install @zendfi/sdk

# Or use our CLI to scaffold a new project
npx create-zendfi-app my-payment-app
```

## Step 1: Create Your Merchant Account

To get started with ZendFi, you'll need to create a merchant account. This gives you access to the dashboard, API keys, and all ZendFi features.

### Endpoint

```
POST /api/v1/merchants
```

### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | string | **Yes** | Your business name |
| `email` | string | **Yes** | Business email address |
| `business_address` | string | **Yes** | Physical business address |
| `webhook_url` | string | No | URL to receive payment notifications |
| `wallet_generation_method` | string | No | Wallet type (see below) |

### Wallet Types

ZendFi supports two main wallet options:

#### 1. MPC Passkey Wallet (Recommended) ⭐

**Non-custodial** - You control your funds via biometric authentication (Face ID, Touch ID).

- No seed phrases to manage
- Export private keys anytime
- Withdraw funds via API
- Secure with WebAuthn/passkeys

```json
{
  "wallet_generation_method": "mpc_passkey"
}
```

#### 2. Bring Your Own Wallet

Use your existing Solana wallet (Phantom, Solflare, Ledger).

- Full control - you manage the wallet
- Use existing infrastructure
- No key management by ZendFi

```json
{
  "wallet_generation_method": "external",
  "wallet_address": "YOUR_SOLANA_WALLET_ADDRESS"
}
```

### Example: Create Merchant with MPC Wallet

```bash
curl -X POST https://api.zendfi.tech/api/v1/merchants \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My Awesome Store",
    "email": "merchant@example.com",
    "business_address": "123 Main St, San Francisco, CA",
    "webhook_url": "https://mystore.com/webhooks/zendfi",
    "wallet_generation_method": "mpc_passkey"
  }'
```

### Response

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "My Awesome Store",
  "email": "merchant@example.com",
  "api_key": "zfi_live_abc123xyz789...",
  "passkey_setup_url": "https://api.zendfi.tech/merchants/550e.../setup-passkey",
  "wallet_address": null,
  "created_at": "2025-10-26T12:00:00Z"
}
```

:::tip Save Your API Key
Your `api_key` is shown only once! Store it securely in environment variables. Never commit it to version control.
:::

## Step 2: Set Up Your Passkey (MPC Wallets Only)

If you chose the MPC passkey wallet, you need to complete the passkey setup:

1. Open the `passkey_setup_url` in your browser
2. Click **"Register Passkey"**
3. Complete Face ID / Touch ID authentication
4. Wait 5-10 seconds for wallet creation
5. Your wallet address will be generated automatically!

After setup, check your wallet:

```bash
curl https://api.zendfi.tech/api/v1/merchants/me/wallet \
  -H "Authorization: Bearer YOUR_API_KEY"
```

## Step 3: Generate API Keys

Your API key was provided when creating the merchant account. You can generate additional keys from the dashboard or API:

```bash
curl -X POST https://api.zendfi.tech/api/v1/api-keys \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Production Key",
    "mode": "live"
  }'
```

### API Key Modes

| Mode | Prefix | Description |
|------|--------|-------------|
| `test` | `zfi_test_` | Devnet testing - no real funds |
| `live` | `zfi_live_` | Mainnet production - real transactions |

:::warning Test Mode First
Always test your integration on devnet before going live. Use `zfi_test_` keys for development.
:::

## Step 4: Create Your First Payment

Now you're ready to accept payments! Here's a simple example:

### Endpoint

```
POST /api/v1/payments
```

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
import { ZendFi } from '@zendfi/sdk';

const zendfi = new ZendFi({
  apiKey: process.env.ZENDFI_API_KEY,
  environment: 'test' // or 'production'
});

// Create a payment
const payment = await zendfi.payments.create({
  amount: 25.00,
  currency: 'USD',
  token: 'USDC',
  description: 'Premium Subscription'
});

console.log(`Payment URL: ${payment.payment_url}`);
```

## What's Next?

Now that you have the basics down, explore more features:

- [📄 Payments API](/api/payments) - Full payment API reference
- [🔄 Subscriptions](/api/subscriptions) - Recurring billing
- [🔒 Escrow](/api/escrows) - Secure marketplace transactions
- [🔗 Payment Links](/api/payment-links) - Reusable payment URLs
- [🪝 Webhooks](/features/webhooks) - Event notifications
- [📦 SDKs](/developer-tools/sdks) - TypeScript SDK reference

## Need Help?

- 📧 Email: [support@zendfi.tech](mailto:support@zendfi.tech)
- 💬 Discord: [discord.gg/zendfi](https://discord.gg/zendfi)
- 📚 API Reference: [api.zendfi.tech](https://api.zendfi.tech)

Happy building! 🎉
