---
title: Autonomous Delegation
description: Enable AI agents to spend on behalf of users with controlled autonomy
sidebar_position: 6
---

# Autonomous Delegation

Autonomous Delegation enables AI agents to make payments on behalf of users without requiring approval for each transaction. Users set spending limits, and agents operate freely within those constraints.

## Overview

Traditional payment flows require user approval for every transaction. Autonomous Delegation flips this model:

| Traditional | Autonomous Delegation |
|-------------|----------------------|
| User approves each payment | Agent pays within limits |
| Slow, requires interaction | Fast, fully automated |
| User must be present | Agent works 24/7 |
| High friction | Zero friction |

## How It Works

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│    User     │────▶│   ZendFi    │────▶│    Agent    │
│  Sets Limits│     │  Enforces   │     │  Spends     │
└─────────────┘     └─────────────┘     └─────────────┘
      │                   │                    │
      │   Deposit +       │                    │
      │   Set Rules       │   Validate &       │
      └──────────────────▶│   Execute          │
                          │◀───────────────────┘
                          │
                          ▼
                    ┌─────────────┐
                    │   Merchant  │
                    │   Receives  │
                    └─────────────┘
```

## Creating a Delegation

```typescript
import { zendfi } from '@zendfi/sdk';

// User creates a delegation for an agent
const delegation = await zendfi.agent.createDelegation({
  user_wallet: userWallet,
  agent_id: 'shopping-agent',
  
  // Spending controls
  limits: {
    max_per_transaction: 100,
    max_per_day: 500,
    max_per_week: 1500,
    max_total: 5000,
  },
  
  // Optional: restrict to specific merchants
  allowed_merchants: ['merch_abc', 'merch_xyz'],
  
  // Optional: restrict to categories
  allowed_categories: ['groceries', 'entertainment'],
  
  // Duration
  expires_at: '2024-12-31T23:59:59Z',
  
  // Required: user signature authorizing delegation
  signature: userSignature,
});

console.log(`Delegation ID: ${delegation.id}`);
console.log(`Status: ${delegation.status}`); // "active"
```

## Delegation Limits

Configure precise spending controls:

```typescript
const delegation = await zendfi.agent.createDelegation({
  user_wallet: userWallet,
  agent_id: 'finance-agent',
  
  limits: {
    // Transaction limits
    max_per_transaction: 50,     // Max $50 per payment
    min_per_transaction: 1,      // Min $1 per payment
    
    // Time-based limits
    max_per_hour: 100,           // Max $100/hour
    max_per_day: 500,            // Max $500/day
    max_per_week: 2000,          // Max $2000/week
    max_per_month: 5000,         // Max $5000/month
    
    // Total budget
    max_total: 10000,            // Lifetime limit
    
    // Transaction count limits
    max_transactions_per_day: 10,
    max_transactions_per_week: 50,
  },
  
  signature: userSignature,
});
```

## Merchant Restrictions

Limit which merchants agents can pay:

```typescript
// Whitelist specific merchants
const delegation = await zendfi.agent.createDelegation({
  user_wallet: userWallet,
  agent_id: 'shopping-agent',
  allowed_merchants: [
    'merch_amazon_abc123',
    'merch_walmart_xyz789',
  ],
  limits: { max_per_transaction: 100 },
  signature: userSignature,
});

// Or blacklist merchants
const delegation2 = await zendfi.agent.createDelegation({
  user_wallet: userWallet,
  agent_id: 'general-agent',
  blocked_merchants: ['merch_casino_123'],
  limits: { max_per_transaction: 50 },
  signature: userSignature,
});
```

## Category Restrictions

Control spending by category:

```typescript
const delegation = await zendfi.agent.createDelegation({
  user_wallet: userWallet,
  agent_id: 'household-agent',
  
  allowed_categories: [
    'groceries',
    'household',
    'utilities',
  ],
  
  // Different limits per category
  category_limits: {
    groceries: { max_per_transaction: 200 },
    household: { max_per_transaction: 100 },
    utilities: { max_per_transaction: 500 },
  },
  
  limits: { max_per_day: 500 },
  signature: userSignature,
});
```

## Agent Making Payments

With an active delegation, agents can pay autonomously:

```typescript
// Agent code - no user interaction needed
const payment = await zendfi.agent.payWithDelegation({
  delegation_id: delegation.id,
  merchant_id: 'merch_grocery_store',
  amount: 45.00,
  description: 'Weekly groceries',
  category: 'groceries',
});

if (payment.status === 'succeeded') {
  console.log('Payment completed autonomously');
} else if (payment.error?.code === 'LIMIT_EXCEEDED') {
  console.log('Would exceed spending limit');
}
```

## Checking Remaining Budget

```typescript
const status = await zendfi.agent.getDelegationStatus(delegation.id);

console.log('Budget Status:');
console.log(`  Daily remaining: $${status.limits.daily_remaining}`);
console.log(`  Weekly remaining: $${status.limits.weekly_remaining}`);
console.log(`  Total remaining: $${status.limits.total_remaining}`);
console.log(`  Transactions today: ${status.transactions_today}`);
```

## Revoking a Delegation

Users can revoke delegations at any time:

```typescript
// User revokes delegation
await zendfi.agent.revokeDelegation(delegation.id, {
  reason: 'No longer needed',
  signature: userSignature,
});

// Future payments will fail
const result = await zendfi.agent.payWithDelegation({
  delegation_id: delegation.id,
  amount: 10.00,
});
// Error: DELEGATION_REVOKED
```

## Delegation Types

| Type | Description | Use Case |
|------|-------------|----------|
| `standard` | Basic spending delegation | Shopping, subscriptions |
| `recurring` | Auto-renewing limits | Monthly budgets |
| `conditional` | Rule-based approval | Complex logic |
| `time_locked` | Only active at certain times | Business hours |

### Time-Locked Delegation

```typescript
const delegation = await zendfi.agent.createDelegation({
  user_wallet: userWallet,
  agent_id: 'work-agent',
  type: 'time_locked',
  
  time_restrictions: {
    days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
    hours: { start: '09:00', end: '17:00' },
    timezone: 'America/New_York',
  },
  
  limits: { max_per_transaction: 500 },
  signature: userSignature,
});
```

## CLI Commands

```bash
# Create a delegation
zendfi delegation create \
  --agent shopping-agent \
  --max-per-tx 100 \
  --max-per-day 500

# List delegations
zendfi delegation list

# Check status
zendfi delegation status del_abc123

# Revoke
zendfi delegation revoke del_abc123
```

## Webhook Events

| Event | Description |
|-------|-------------|
| `delegation.created` | New delegation created |
| `delegation.updated` | Limits or settings changed |
| `delegation.revoked` | Delegation revoked |
| `delegation.expired` | Delegation expired |
| `delegation.limit_warning` | Approaching limit (80%) |
| `delegation.limit_reached` | Limit reached |
| `delegation.payment` | Payment made via delegation |

## Security Features

### Multi-Signature Delegation

Require multiple approvals:

```typescript
const delegation = await zendfi.agent.createDelegation({
  user_wallet: userWallet,
  agent_id: 'high-value-agent',
  
  multi_sig: {
    required_signers: 2,
    signers: [signer1Pubkey, signer2Pubkey, signer3Pubkey],
  },
  
  limits: { max_per_transaction: 10000 },
  signatures: [sig1, sig2], // Need 2 of 3
});
```

### Velocity Controls

Automatic protection against rapid spending:

```typescript
const delegation = await zendfi.agent.createDelegation({
  user_wallet: userWallet,
  agent_id: 'trading-agent',
  
  velocity_controls: {
    max_transactions_per_minute: 5,
    cooldown_after_large_tx: 300, // 5 min after tx > $500
    suspicious_pattern_threshold: 0.8,
  },
  
  limits: { max_per_transaction: 1000 },
  signature: userSignature,
});
```

## Error Handling

```typescript
try {
  const payment = await zendfi.agent.payWithDelegation({
    delegation_id: delegation.id,
    amount: 1000.00,
    merchant_id: 'merch_xyz',
  });
} catch (error) {
  switch (error.code) {
    case 'LIMIT_EXCEEDED':
      console.log('Transaction exceeds limits');
      break;
    case 'DELEGATION_EXPIRED':
      console.log('Delegation has expired');
      break;
    case 'DELEGATION_REVOKED':
      console.log('Delegation was revoked');
      break;
    case 'MERCHANT_NOT_ALLOWED':
      console.log('Merchant not in allowed list');
      break;
    case 'CATEGORY_NOT_ALLOWED':
      console.log('Category not permitted');
      break;
    case 'OUTSIDE_TIME_WINDOW':
      console.log('Outside allowed time window');
      break;
    default:
      console.log('Payment failed:', error.message);
  }
}
```

## Best Practices

1. **Start with low limits** - Increase as trust builds
2. **Use time expiration** - Don't create permanent delegations
3. **Restrict merchants** - Limit to known, trusted merchants
4. **Monitor actively** - Watch webhook events for unusual activity
5. **Enable notifications** - Alert users on significant transactions
6. **Set velocity controls** - Prevent rapid draining

## Next Steps

- [Agent Sessions](/agentic/sessions) - Temporary session-based limits
- [Device-Bound Keys](/agentic/device-bound-keys) - Secure key storage
- [Security](/agentic/security) - Security best practices
