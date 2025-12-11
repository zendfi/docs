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
      │   Create Session  │                    │
      │   + Set Limits    │   Validate &       │
      └──────────────────▶│   Execute          │
                          │◀───────────────────┘
                          │
                          ▼
                    ┌─────────────┐
                    │   Merchant  │
                    │   Receives  │
                    └─────────────┘
```

## Creating an Autonomous Session

Use `createSession` with spending limits to enable autonomous agent payments:

```typescript
import { zendfi } from '@zendfi/sdk';

// Create a session with spending limits
const session = await zendfi.agent.createSession({
  agent_id: 'shopping-assistant-v1',
  agent_name: 'Shopping Assistant',
  user_wallet: 'Hx7B2kLLpWchsG5d3TqxPvBdEQg6kEHnxT1111111111',
  
  // Spending controls
  limits: {
    max_per_transaction: 100,   // Max $100 per payment
    max_per_day: 500,           // Max $500/day
    max_per_week: 1500,         // Max $1500/week
    max_per_month: 5000,        // Max $5000/month
  },
  
  // Duration
  duration_hours: 24,
  
  // Optional: Enable on-chain identity via Lit Protocol
  mint_pkp: true,
});

console.log(`Session ID: ${session.id}`);
console.log(`Session Token: ${session.session_token}`);
console.log(`PKP Address: ${session.pkp_address}`); // If mint_pkp: true
```

## Spending Limits

Configure precise spending controls:

```typescript
const session = await zendfi.agent.createSession({
  agent_id: 'finance-agent',
  user_wallet: userWallet,
  
  limits: {
    // Transaction limits
    max_per_transaction: 50,     // Max $50 per payment
    
    // Time-based limits
    max_per_day: 500,            // Max $500/day
    max_per_week: 2000,          // Max $2000/week
    max_per_month: 5000,         // Max $5000/month
    
    // Approval threshold
    require_approval_above: 100, // Require approval for tx > $100
  },
  
  duration_hours: 168, // 1 week
});
```

## Checking Remaining Budget

The session response includes remaining budgets:

```typescript
const session = await zendfi.agent.getSession(sessionId);

console.log('Budget Status:');
console.log(`  Today remaining: $${session.remaining_today}`);
console.log(`  Week remaining: $${session.remaining_this_week}`);
console.log(`  Month remaining: $${session.remaining_this_month}`);
console.log(`  Active: ${session.is_active}`);
console.log(`  Expires: ${session.expires_at}`);
```

## Agent Making Payments

With an active session, agents use the session token to make payments:

```typescript
// Agent code - uses session token for authentication
const payment = await zendfi.payments.create({
  amount: 45.00,
  currency: 'USD',
  description: 'Weekly groceries',
  recipient_wallet: merchantWallet,
}, {
  headers: {
    'X-Session-Token': session.session_token,
  },
});

console.log(`Payment status: ${payment.status}`);
```

## Revoking a Session

Revoke a session to immediately stop all autonomous payments:

```typescript
// Revoke the session
await zendfi.agent.revokeSession(sessionId);

// Future payments with this session token will fail
```

## List Active Sessions

```typescript
const sessions = await zendfi.agent.listSessions();

for (const session of sessions) {
  console.log(`${session.agent_id}: $${session.remaining_today} remaining today`);
}
```

## Advanced: Session Key Autonomy

For even more autonomous operation, use the Autonomy API with device-bound session keys:

```typescript
// 1. Create a session key
const sessionKey = await zendfi.sessionKeys.create({
  name: 'AI Agent Key',
  pin: userPin,
});

// 2. Generate delegation message
const message = zendfi.autonomy.createDelegationMessage(
  sessionKey.id,
  100, // $100 max
  '2024-12-31T23:59:59Z'
);

// 3. Have user sign the delegation
const signature = await signWithSessionKey(message, userPin);

// 4. Enable autonomous mode
const delegate = await zendfi.autonomy.enable(sessionKey.id, {
  max_amount_usd: 100,
  duration_hours: 24,
  delegation_signature: signature,
});

console.log(`Autonomous mode enabled until ${delegate.expires_at}`);
```

## PKP (Programmable Key Pair)

When `mint_pkp: true`, ZendFi creates an on-chain identity via Lit Protocol:

```typescript
const session = await zendfi.agent.createSession({
  agent_id: 'autonomous-agent',
  user_wallet: userWallet,
  limits: { max_per_day: 500 },
  mint_pkp: true,
});

// PKP provides cryptographic enforcement of spending rules
console.log(`PKP Address: ${session.pkp_address}`);
```

The PKP:
- Acts as an on-chain identity for the session
- Enables cryptographic enforcement of spending limits
- Can sign transactions within the authorized limits
- Automatically expires with the session

## Error Handling

```typescript
try {
  const session = await zendfi.agent.createSession({
    agent_id: 'my-agent',
    user_wallet: userWallet,
    limits: { max_per_day: 500 },
  });
} catch (error) {
  switch (error.code) {
    case 'INVALID_WALLET':
      console.log('Invalid wallet address');
      break;
    case 'LIMIT_TOO_HIGH':
      console.log('Requested limit exceeds maximum allowed');
      break;
    case 'AGENT_NOT_FOUND':
      console.log('Agent ID not registered');
      break;
    default:
      console.log('Session creation failed:', error.message);
  }
}
```

## Best Practices

1. **Start with low limits** - Increase as trust builds
2. **Use time expiration** - Set appropriate `duration_hours`
3. **Monitor spending** - Check `remaining_*` fields regularly
4. **Enable PKP for high-value** - Use `mint_pkp: true` for crypto enforcement
5. **Revoke promptly** - Call `revokeSession()` when no longer needed

## Next Steps

- [Agent Sessions](/agentic/sessions) - Deep dive into session management
- [Device-Bound Keys](/agentic/device-bound-keys) - Secure key storage
- [Security](/agentic/security) - Security best practices
