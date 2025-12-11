---
title: Smart Payments
description: AI-optimized payment execution with automatic routing and gas management
sidebar_position: 7
---

# Smart Payments

Smart Payments use AI to optimize payment execution. Automatic routing, gas estimation, retry logic, and cross-chain bridging - all handled transparently.

## Overview

Smart Payments solve common agent payment challenges:

- **Gas estimation** - Accurate fee predictions
- **Route optimization** - Best path for cross-chain payments
- **Retry logic** - Automatic recovery from failures
- **Transaction batching** - Combine multiple payments
- **Slippage protection** - Prevent MEV and sandwich attacks

## Basic Usage

```typescript
import { zendfi } from '@zendfi/sdk';

// Execute a smart payment
const result = await zendfi.smart.execute({
  from: userWallet,
  to: merchantWallet,
  amount: 100.00,
  currency: 'USD',
});

console.log(result);
// {
//   status: 'succeeded',
//   payment_id: 'pay_abc123',
//   tx_signature: '5K7x...',
//   gas_used: 0.00025,
//   route: 'direct',
//   optimization_savings: 0.0001
// }
```

## Smart Execution Options

```typescript
const result = await zendfi.smart.execute({
  from: userWallet,
  to: merchantWallet,
  amount: 100.00,
  currency: 'USD',
  
  // Optimization settings
  optimize_for: 'speed',  // 'speed' | 'cost' | 'balanced'
  max_slippage: 0.5,      // 0.5% max slippage
  deadline: 300,          // 5 minute deadline
  
  // Gas settings
  gas_strategy: 'auto',   // 'auto' | 'fast' | 'slow' | 'custom'
  max_gas: 0.01,          // Max gas in SOL
  gasless: true,          // Pay gas for user
  
  // Retry settings
  retry_count: 3,
  retry_delay: 5000,      // 5 seconds between retries
  
  // Metadata
  idempotency_key: 'order_123',
  metadata: {
    order_id: 'ORD-456',
  },
});
```

## Optimization Strategies

### Speed Optimization

```typescript
// Prioritize fast confirmation
const result = await zendfi.smart.execute({
  from: userWallet,
  to: merchantWallet,
  amount: 50.00,
  optimize_for: 'speed',
  gas_strategy: 'fast',
});

// Typically confirms in 1-2 seconds on Solana
```

### Cost Optimization

```typescript
// Minimize fees
const result = await zendfi.smart.execute({
  from: userWallet,
  to: merchantWallet,
  amount: 50.00,
  optimize_for: 'cost',
  gas_strategy: 'slow',
  batch: true, // Batch with other payments
});

// May take longer but saves on fees
```

### Balanced (Default)

```typescript
// Balance speed and cost
const result = await zendfi.smart.execute({
  from: userWallet,
  to: merchantWallet,
  amount: 50.00,
  optimize_for: 'balanced',
});
```

## Pre-Flight Simulation

Simulate before executing:

```typescript
const simulation = await zendfi.smart.simulate({
  from: userWallet,
  to: merchantWallet,
  amount: 100.00,
});

console.log(simulation);
// {
//   success: true,
//   estimated_gas: 0.00025,
//   estimated_time: 2,
//   route: 'direct',
//   warnings: [],
// }

// Execute only if simulation succeeds
if (simulation.success) {
  const result = await zendfi.smart.execute({
    from: userWallet,
    to: merchantWallet,
    amount: 100.00,
  });
}
```

## Submit Signed Transaction

For agents that build transactions locally:

```typescript
// Agent builds and signs transaction
const tx = await zendfi.smart.buildTransaction({
  from: userWallet,
  to: merchantWallet,
  amount: 100.00,
});

// Sign with agent's key
const signedTx = await signTransaction(tx, agentKey);

// Submit via ZendFi (monitoring, retry, webhooks)
const result = await zendfi.smart.submitSigned({
  signed_transaction: signedTx,
  monitor: true,
  retry_on_failure: true,
});

console.log(result.tx_signature);
```

## Cross-Chain Payments

Smart routing for cross-chain:

```typescript
const result = await zendfi.smart.execute({
  from: { chain: 'ethereum', address: ethWallet },
  to: { chain: 'solana', address: solWallet },
  amount: 100.00,
  currency: 'USD',
});

// Automatic bridging via Wormhole/LayerZero
console.log(result.route);
// 'ethereum -> wormhole -> solana'
```

## Batched Payments

Combine multiple payments:

```typescript
const batch = await zendfi.smart.batch([
  { to: merchant1, amount: 25.00 },
  { to: merchant2, amount: 30.00 },
  { to: merchant3, amount: 45.00 },
], {
  from: userWallet,
  atomic: true, // All or nothing
});

console.log(batch);
// {
//   status: 'succeeded',
//   total_amount: 100.00,
//   total_gas: 0.00045, // Less than 3 separate txs
//   transactions: [...]
// }
```

## Conditional Payments

Execute based on conditions:

```typescript
const result = await zendfi.smart.executeConditional({
  from: userWallet,
  to: merchantWallet,
  amount: 100.00,
  
  conditions: {
    price_check: {
      token: 'SOL',
      min_price: 150,  // Only if SOL > $150
    },
    gas_limit: {
      max_gas: 0.001,  // Only if gas < 0.001 SOL
    },
  },
  
  timeout: 3600, // 1 hour to meet conditions
});
```

## Recurring Smart Payments

Schedule recurring payments with optimization:

```typescript
const recurring = await zendfi.smart.createRecurring({
  from: userWallet,
  to: subscriptionMerchant,
  amount: 9.99,
  currency: 'USD',
  
  schedule: {
    frequency: 'monthly',
    day: 1, // 1st of each month
    time: '09:00',
    timezone: 'UTC',
  },
  
  optimize_for: 'cost',
  gasless: true,
});

// Payments execute automatically each month
```

## Gas Abstraction

Let ZendFi handle gas:

```typescript
// User pays in USDC, ZendFi handles gas
const result = await zendfi.smart.execute({
  from: userWallet,
  to: merchantWallet,
  amount: 100.00,
  currency: 'USDC',
  gasless: true, // ZendFi pays gas, deducts small fee
});

// User only sees $100 deducted, no SOL needed
```

## CLI Commands

```bash
# Execute smart payment
zendfi smart pay --to <wallet> --amount 100

# Simulate first
zendfi smart simulate --to <wallet> --amount 100

# Batch payments
zendfi smart batch payments.json

# Check gas estimates
zendfi smart gas-estimate --amount 100

# List pending smart payments
zendfi smart pending
```

## Alias: smartPayment()

For backward compatibility:

```typescript
// These are equivalent
const result1 = await zendfi.smart.execute(params);
const result2 = await zendfi.smartPayment(params);
```

## Error Handling

```typescript
try {
  const result = await zendfi.smart.execute({
    from: userWallet,
    to: merchantWallet,
    amount: 100.00,
  });
} catch (error) {
  switch (error.code) {
    case 'INSUFFICIENT_FUNDS':
      console.log('Not enough balance');
      break;
    case 'GAS_ESTIMATION_FAILED':
      console.log('Could not estimate gas');
      break;
    case 'SLIPPAGE_EXCEEDED':
      console.log('Price moved too much');
      break;
    case 'DEADLINE_EXCEEDED':
      console.log('Transaction took too long');
      break;
    case 'SIMULATION_FAILED':
      console.log('Transaction would fail:', error.simulation_error);
      break;
    case 'MAX_RETRIES_EXCEEDED':
      console.log('All retries failed');
      break;
    default:
      console.log('Payment failed:', error.message);
  }
}
```

## Webhook Events

| Event | Description |
|-------|-------------|
| `smart.initiated` | Payment started |
| `smart.simulated` | Simulation completed |
| `smart.routing` | Finding optimal route |
| `smart.executing` | Transaction submitted |
| `smart.succeeded` | Payment completed |
| `smart.failed` | Payment failed |
| `smart.retrying` | Retry in progress |

## Performance Metrics

Access optimization metrics:

```typescript
const metrics = await zendfi.smart.getMetrics(paymentId);

console.log(metrics);
// {
//   total_time_ms: 1847,
//   simulation_time_ms: 234,
//   routing_time_ms: 89,
//   execution_time_ms: 1524,
//   gas_saved: 0.00012,
//   route_optimization: 'Saved $0.02 vs default route'
// }
```

## Best Practices

1. **Always simulate first** for large payments
2. **Use idempotency keys** to prevent duplicates
3. **Set reasonable deadlines** (5-15 minutes typical)
4. **Enable gasless** for better user experience
5. **Monitor webhook events** for real-time status
6. **Use batching** when making multiple payments

## API Reference

### Execute Payment

```
POST /api/v1/ai/smart/execute
```

### Simulate Payment

```
POST /api/v1/ai/smart/simulate
```

### Submit Signed

```
POST /api/v1/ai/smart/submit-signed
```

### Batch Payments

```
POST /api/v1/ai/smart/batch
```

## Next Steps

- [Payment Intents](/agentic/payment-intents) - Two-phase payments
- [Autonomous Delegation](/agentic/autonomous-delegation) - Agent spending limits
- [Device-Bound Keys](/agentic/device-bound-keys) - Secure key storage
