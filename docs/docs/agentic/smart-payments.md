---
title: Smart Payments
description: AI-powered payment routing with PPP pricing and gasless transactions
sidebar_position: 7
---

# Smart Payments

Smart Payments combine multiple features into a single intelligent API. The `zendfi.smart.execute()` method automatically applies PPP discounts, detects gasless needs, and routes payments optimally.

## Overview

Smart Payments provide:

- **PPP Pricing** - Automatic purchasing power parity adjustments
- **Gasless Detection** - Auto-subsidize gas for better UX
- **Session Integration** - Works with agent sessions for limit enforcement
- **Instant Settlement** - Optional immediate merchant payout
- **Escrow Support** - Optional fund holding for service delivery

## Basic Usage

```typescript
import { zendfi } from '@zendfi/sdk';

// Execute a smart payment
const result = await zendfi.smart.execute({
  agent_id: 'shopping-assistant',
  user_wallet: 'Hx7B...abc',
  amount_usd: 100.00,
  description: 'Premium subscription',
});

console.log(result);
// {
//   status: 'confirmed',
//   payment_id: 'pay_abc123',
//   transaction_signature: '5K7x...',
//   requires_signature: false,
//   receipt_url: 'https://zendfi.tech/receipt/...',
//   next_steps: 'Payment complete!'
// }
```

## Available Options

```typescript
const result = await zendfi.smart.execute({
  // Required
  agent_id: 'shopping-assistant',
  user_wallet: 'Hx7B...abc',
  amount_usd: 100.00,
  
  // Optional session token for limit enforcement
  session_token: 'zai_session_...',
  
  // Optional merchant targeting
  merchant_id: 'merchant_abc123',
  
  // Payment token (default: USDC)
  token: 'USDC',
  
  // Auto-detect if user needs gas subsidization
  auto_detect_gasless: true,
  
  // Enable instant merchant settlement
  instant_settlement: true,
  
  // Create escrow instead of direct payment
  enable_escrow: false,
  
  // Description and metadata
  description: 'Premium subscription',
  product_details: {
    name: 'Pro Plan',
    sku: 'PRO-ANNUAL',
  },
  metadata: {
    order_id: 'ORD-456',
  },
});
```

## Response Structure

```typescript
interface SmartPaymentResponse {
  /** Payment ID (UUID) */
  payment_id: string;
  
  /** Current status */
  status: 'pending' | 'confirmed' | 'awaiting_signature' | 'failed';
  
  /** Amount in USD */
  amount_usd: number;
  
  /** Whether gasless transaction was used */
  gasless_used: boolean;
  
  /** Whether settlement is complete */
  settlement_complete: boolean;
  
  /** Escrow ID if escrow was enabled */
  escrow_id?: string;
  
  /** Base64 encoded transaction (for signing) */
  unsigned_transaction?: string;
  
  /** Whether client signature is required */
  requires_signature: boolean;
  
  /** Transaction signature (if auto-signed) */
  transaction_signature?: string;
  
  /** Confirmation time in milliseconds */
  confirmed_in_ms?: number;
  
  /** URL to payment receipt */
  receipt_url: string;
  
  /** NFT receipt address (if minted) */
  receipt_nft?: string;
  
  /** Human-readable next steps */
  next_steps: string;
  
  /** URL to submit signed transaction */
  submit_url?: string;
  
  /** ISO 8601 timestamp */
  created_at: string;
}
```

## Device-Bound Flow

When `requires_signature: true`, the user must sign the transaction:

```typescript
const result = await zendfi.smart.execute({
  agent_id: 'my-agent',
  user_wallet: userWallet,
  amount_usd: 50.00,
});

if (result.requires_signature) {
  // User needs to sign the transaction
  console.log('Sign this transaction:', result.unsigned_transaction);
  console.log('Submit to:', result.submit_url);
  
  // After user signs
  const signedTx = await wallet.signTransaction(result.unsigned_transaction);
  
  // Submit the signed transaction
  const confirmed = await zendfi.smart.submitSigned(
    result.payment_id,
    signedTx
  );
  
  console.log('Payment confirmed:', confirmed.transaction_signature);
} else {
  // Payment auto-signed (custodial or autonomous delegate)
  console.log('Payment complete:', result.transaction_signature);
}
```

## Session Integration

Use smart payments with agent sessions for spending limit enforcement:

```typescript
// Create a session first
const session = await zendfi.agent.createSession({
  agent_id: 'shopping-bot',
  user_wallet: userWallet,
  limits: { max_per_day: 500 },
  duration_hours: 24,
});

// Make payment with session token (enforces limits)
const payment = await zendfi.smart.execute({
  session_token: session.session_token,
  agent_id: 'shopping-bot',
  user_wallet: userWallet,
  amount_usd: 29.99,
  auto_detect_gasless: true,
});

// Limits are automatically enforced
// If payment would exceed limit, it fails with error
```

## Gasless Transactions

Enable `auto_detect_gasless` to automatically subsidize gas:

```typescript
const payment = await zendfi.smart.execute({
  agent_id: 'my-agent',
  user_wallet: userWallet,
  amount_usd: 100.00,
  auto_detect_gasless: true, // ZendFi covers gas if needed
});

// User only pays the amount in USDC
// No SOL required for gas
console.log(`Gasless used: ${payment.gasless_used}`);
```

## Instant Settlement

Enable instant merchant payout:

```typescript
const payment = await zendfi.smart.execute({
  agent_id: 'my-agent',
  user_wallet: userWallet,
  amount_usd: 100.00,
  instant_settlement: true, // Merchant receives funds immediately
});

console.log(`Settlement complete: ${payment.settlement_complete}`);
```

## Escrow Payments

Create payment with escrow for service delivery:

```typescript
const payment = await zendfi.smart.execute({
  agent_id: 'my-agent',
  user_wallet: userWallet,
  amount_usd: 100.00,
  enable_escrow: true,
});

console.log(`Escrow ID: ${payment.escrow_id}`);
// Funds held in escrow until service is delivered
// See escrow API for release/refund
```

## CLI Commands

```bash
# Create a smart payment
zendfi smart create \
  --amount 100 \
  --wallet <user-wallet> \
  --merchant <merchant-id> \
  --description "Premium subscription"

# Simulate PPP pricing
zendfi smart simulate \
  --amount 100 \
  --country BR
```

## Alias: smartPayment()

For backward compatibility, `smartPayment()` is available as an alias:

```typescript
// These are equivalent
const result1 = await zendfi.smart.execute(params);
const result2 = await zendfi.smartPayment(params);
```

## Error Handling

```typescript
try {
  const result = await zendfi.smart.execute({
    agent_id: 'my-agent',
    user_wallet: userWallet,
    amount_usd: 100.00,
  });
} catch (error) {
  if (error.code === 'INSUFFICIENT_FUNDS') {
    console.log('User does not have enough balance');
  } else if (error.code === 'LIMIT_EXCEEDED') {
    console.log('Session spending limit exceeded');
  } else if (error.code === 'SESSION_EXPIRED') {
    console.log('Agent session has expired');
  } else {
    console.log('Payment failed:', error.message);
  }
}
```

## API Reference

### Execute Payment

```
POST /api/v1/ai/smart-payment
```

### Submit Signed Transaction

```
POST /api/v1/ai/payments/{payment_id}/submit-signed
```

## Best Practices

1. **Use session tokens** for spending limit enforcement
2. **Enable auto_detect_gasless** for better user experience
3. **Add product_details** for better receipts
4. **Handle requires_signature flow** for device-bound keys
5. **Use idempotency keys** (via headers) to prevent duplicates

## Next Steps

- [Agent Sessions](/agentic/sessions) - Create sessions with spending limits
- [Payment Intents](/agentic/payment-intents) - Two-phase payment flow
- [Autonomous Delegation](/agentic/autonomous-delegation) - Enable auto-signing
