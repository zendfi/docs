---
title: Payment Intents
description: Two-phase commit pattern for reliable agent payments
sidebar_position: 4
---

# Payment Intents

Payment Intents implement a two-phase commit pattern for reliable payments. First create an intent to reserve the amount, then confirm when the customer is ready to pay.

## Why Use Payment Intents?

- **Reliability**: Prevent double-charges with idempotent confirmations
- **Flexibility**: Separate payment creation from execution
- **User Experience**: Show payment details before charging
- **Session Integration**: Validate spending limits before committing

## Basic Flow

```typescript
import { zendfi } from '@zendfi/sdk';

// Step 1: Create intent (reserves amount)
const intent = await zendfi.intents.create({
  amount: 99.99,
  description: 'Premium subscription',
});

console.log(`Intent ID: ${intent.id}`);
console.log(`Client Secret: ${intent.client_secret}`);
console.log(`Status: ${intent.status}`); // "requires_payment"

// Step 2: Confirm when ready (charges the customer)
const confirmed = await zendfi.intents.confirm(intent.id, {
  client_secret: intent.client_secret,
  customer_wallet: 'Hx7B...abc',
});

console.log(`Payment ID: ${confirmed.payment_id}`);
console.log(`Status: ${confirmed.status}`); // "succeeded"
```

## Intent Statuses

| Status | Description | Next Actions |
|--------|-------------|--------------|
| `requires_payment` | Waiting for confirmation | Confirm or Cancel |
| `processing` | Payment in progress | Wait for completion |
| `succeeded` | Payment complete | Done ✅ |
| `canceled` | Canceled by user/merchant | Create new intent |
| `failed` | Payment failed | Retry or cancel |

## Creating an Intent

```typescript
const intent = await zendfi.intents.create({
  amount: 99.99,
  currency: 'USD',              // Optional, default: USD
  description: 'Pro Plan',
  capture_method: 'automatic',  // or 'manual' for auth-only
  metadata: {
    order_id: 'ORD-123',
    product: 'pro_monthly',
  },
});
```

### Intent Options

| Field | Type | Description |
|-------|------|-------------|
| `amount` | number | Payment amount in USD |
| `currency` | string | Currency code (default: USD) |
| `description` | string | Description shown to customer |
| `capture_method` | string | `automatic` or `manual` |
| `metadata` | object | Custom key-value data |

## Confirming an Intent

```typescript
const confirmed = await zendfi.intents.confirm(intent.id, {
  client_secret: intent.client_secret,
  customer_wallet: 'Hx7B...abc',
  session_token: session.token,  // Optional: for session-based limits
  auto_gasless: true,            // Optional: pay gas for user
  metadata: {
    confirmed_by: 'agent',
    ip_address: '192.168.1.1',
  },
});
```

### Confirmation Options

| Field | Type | Description |
|-------|------|-------------|
| `client_secret` | string | Secret from intent creation |
| `customer_wallet` | string | Solana wallet address |
| `session_token` | string | Optional session for limit enforcement |
| `auto_gasless` | boolean | Pay gas fees for the customer |
| `metadata` | object | Additional metadata to store |

## Canceling an Intent

```typescript
await zendfi.intents.cancel(intent.id);
console.log('Intent canceled');
```

:::tip
You can only cancel intents in the `requires_payment` status. Processing or succeeded intents cannot be canceled.
:::

## Using with Agent Sessions

Combine intents with sessions for spending limit enforcement:

```typescript
// Create session with limits
const session = await zendfi.agent.createSession({
  agent_id: 'shopping-bot',
  user_wallet: userWallet,
  limits: {
    max_per_transaction: 50,
    max_per_day: 200,
  },
  duration_hours: 24,
});

// Create and confirm intent with session
const intent = await zendfi.intents.create({
  amount: 45.00,
  description: 'Coffee machine',
  agent_id: 'shopping-bot',
});

const confirmed = await zendfi.intents.confirm(intent.id, {
  client_secret: intent.client_secret,
  customer_wallet: userWallet,
  session_token: session.token, // Enforces spending limits
});
```

## Listing Intents

```typescript
const intents = await zendfi.intents.list({
  status: 'requires_payment',
  limit: 20,
});

intents.forEach(intent => {
  console.log(`${intent.id}: $${intent.amount} - ${intent.status}`);
});
```

### Filter Options

| Field | Type | Description |
|-------|------|-------------|
| `status` | string | Filter by status |
| `limit` | number | Max results (default: 20) |
| `starting_after` | string | Cursor for pagination |

## CLI Commands

```bash
# Create an intent
zendfi intents create --amount 99.99 --description "Premium Plan"

# List intents
zendfi intents list
zendfi intents list --status requires_payment

# Get intent details
zendfi intents get pi_abc123

# Confirm an intent
zendfi intents confirm pi_abc123 --wallet Hx7B...abc

# Cancel an intent
zendfi intents cancel pi_abc123
```

## Webhook Events

| Event | Description |
|-------|-------------|
| `intent.created` | New intent created |
| `intent.confirmed` | Intent confirmed, payment processing |
| `intent.succeeded` | Payment completed successfully |
| `intent.failed` | Payment failed |
| `intent.canceled` | Intent was canceled |

## Error Handling

```typescript
try {
  const confirmed = await zendfi.intents.confirm(intent.id, {
    client_secret: intent.client_secret,
    customer_wallet: userWallet,
    session_token: session.token,
  });
} catch (error) {
  if (error.code === 'LIMIT_EXCEEDED') {
    console.log('Spending limit exceeded');
  } else if (error.code === 'SESSION_EXPIRED') {
    console.log('Session has expired');
  } else if (error.code === 'INSUFFICIENT_FUNDS') {
    console.log('Customer has insufficient funds');
  } else {
    console.log('Payment failed:', error.message);
  }
}
```

## Best Practices

1. **Store client_secret securely** - Never expose in client-side code
2. **Set appropriate timeouts** - Intents expire after 24 hours by default
3. **Use idempotency keys** - Prevent duplicate confirmations
4. **Handle all statuses** - Implement proper error handling
5. **Combine with sessions** - Enforce spending limits for agents

## API Reference

### Create Intent

```
POST /api/v1/ai/intents
```

### Confirm Intent

```
POST /api/v1/ai/intents/:id/confirm
```

### Cancel Intent

```
POST /api/v1/ai/intents/:id/cancel
```

### List Intents

```
GET /api/v1/ai/intents
```

## Next Steps

- [Agent Sessions](/agentic/sessions) - Spending limits for agents
- [Smart Payments](/agentic/smart-payments) - AI-optimized payments
- [Webhooks](/features/webhooks) - Handle payment events
