---
title: Agent Sessions
description: Time-bound sessions with spending limits for AI agents
sidebar_position: 3
---

# Agent Sessions

Sessions allow AI agents to act within user-defined spending limits. Each session is time-bound, wallet-specific, and can optionally create an on-chain identity for audit purposes.

## Why Use Sessions?

- **Spending Controls**: Set per-transaction, daily, weekly, and monthly limits
- **Time-Bound**: Sessions auto-expire after a set duration
- **User Consent**: Users explicitly approve session parameters
- **Audit Trail**: Optional on-chain identity via Lit Protocol PKP

## Creating a Session

```typescript
import { zendfi } from '@zendfi/sdk';

const session = await zendfi.agent.createSession({
  agent_id: 'shopping-assistant-v1',
  user_wallet: 'Hx7B...abc',
  limits: {
    max_per_transaction: 50,    // $50 max per payment
    max_per_day: 200,           // $200 daily limit
    max_per_week: 1000,         // $1000 weekly limit
    max_per_month: 3000,        // $3000 monthly limit
    require_approval_above: 25, // Manual approval above $25
  },
  duration_hours: 24,
  mint_pkp: true,  // Optional: create on-chain session identity
});

console.log(`Session ID: ${session.id}`);
console.log(`Token: ${session.session_token}`);
console.log(`Expires: ${session.expires_at}`);
console.log(`Remaining today: $${session.remaining_today}`);
```

## Spending Limits

### Limit Types

| Limit | Description | Example |
|-------|-------------|---------|
| `max_per_transaction` | Maximum single payment | $50 |
| `max_per_day` | Total spend per 24 hours | $200 |
| `max_per_week` | Total spend per 7 days | $1000 |
| `max_per_month` | Total spend per 30 days | $3000 |
| `require_approval_above` | Requires manual approval | Above $25 |

### How Limits Work

```typescript
// Session with $200/day limit
const session = await zendfi.agent.createSession({
  agent_id: 'bot-v1',
  user_wallet: userWallet,
  limits: { max_per_day: 200 },
  duration_hours: 24,
});

// Check remaining budget before each payment
console.log(`Remaining today: $${session.remaining_today}`); // $200

// After a $50 payment, check again:
const updated = await zendfi.agent.getSession(session.id);
console.log(`Remaining today: $${updated.remaining_today}`); // $150

// If next payment would exceed limit, it will fail with LIMIT_EXCEEDED
```

:::note
The SDK doesn't include a `makePayment()` helper. Use `zendfi.payments.create()` with the session token, or create a Payment Intent for the full flow.
:::

### Checking Remaining Limits

```typescript
const session = await zendfi.agent.getSession(sessionId);

console.log(`Remaining today: $${session.remaining_today}`);
console.log(`Remaining this week: $${session.remaining_this_week}`);
console.log(`Remaining this month: $${session.remaining_this_month}`);
console.log(`Active: ${session.is_active}`);
console.log(`Expires: ${session.expires_at}`);
```

## Merchant Whitelists

Restrict which merchants can receive payments:

```typescript
const session = await zendfi.agent.createSession({
  agent_id: 'shopping-bot',
  user_wallet: userWallet,
  limits: { max_per_day: 100 },
  allowed_merchants: [
    'merchant_amazon',
    'merchant_walmart',
    'merchant_target',
  ],
  duration_hours: 24,
});
```

:::tip
If `allowed_merchants` is not specified, the session can pay any merchant.
:::

## On-Chain Session Identity (PKP)

When `mint_pkp: true` is set, ZendFi creates a Programmable Key Pair (PKP) via Lit Protocol:

```typescript
const session = await zendfi.agent.createSession({
  agent_id: 'compliance-bot',
  user_wallet: userWallet,
  limits: { max_per_day: 500 },
  duration_hours: 24,
  mint_pkp: true,  // Create on-chain identity
});

console.log(`PKP Address: ${session.pkp_address}`);
// => 0x742d35Cc6634C0532925a3b844Bc454e4438f44e
```

### What PKP Provides

| Feature | Description |
|---------|-------------|
| **Audit Trail** | Verifiable proof that a session existed |
| **Session Identity** | Unique blockchain address (Ethereum) |
| **Tamper-Proof Timestamp** | On-chain creation time |
| **Compliance Evidence** | Provable session parameters |

:::info
Spending limits are still enforced server-side for speed. The PKP serves as an identity anchor and audit trail, not a signing key for Solana transactions.
:::

## Managing Sessions

### List Active Sessions

```typescript
const sessions = await zendfi.agent.listSessions();

sessions.forEach(session => {
  console.log(`${session.id}: ${session.agent_id}`);
  console.log(`  Wallet: ${session.user_wallet}`);
  console.log(`  Expires: ${session.expires_at}`);
  console.log(`  Remaining: $${session.remaining_today}`);
});
```

### Get Session Details

```typescript
const session = await zendfi.agent.getSession('sess_abc123');
console.log(session);
```

### Revoke a Session

```typescript
await zendfi.agent.revokeSession('sess_abc123');
console.log('Session revoked');
```

## CLI Commands

```bash
# Create a session
zendfi agent sessions create \
  --agent-id shopping-bot \
  --wallet Hx7B...abc \
  --max-per-day 200 \
  --duration 24

# List sessions
zendfi agent sessions list

# Get session details
zendfi agent sessions get sess_abc123

# Revoke a session
zendfi agent sessions revoke sess_abc123
```

## Session Lifecycle

```
User Approves Session
        │
        ▼
┌───────────────┐
│  Session      │
│  Created      │
│  (Active)     │
└───────┬───────┘
        │
        ├──────────────┬──────────────┐
        ▼              ▼              ▼
   ┌─────────┐   ┌──────────┐   ┌─────────┐
   │ Payment │   │  Limit   │   │ Manual  │
   │ Success │   │ Reached  │   │ Revoke  │
   └────┬────┘   └────┬─────┘   └────┬────┘
        │             │              │
        ▼             ▼              ▼
   Continue      Session         Session
   (if limits    Paused          Ended
    remain)
        │
        ▼
   Session Expires
   (auto after duration)
```

## Webhook Events

| Event | Description |
|-------|-------------|
| `agent.session.created` | New session started |
| `agent.session.revoked` | Session manually revoked |
| `agent.session.expired` | Session auto-expired |
| `agent.session.limit_reached` | Spending limit hit |

## Best Practices

1. **Short durations** - Use 24 hours or less for most use cases
2. **Conservative limits** - Start low, increase based on usage
3. **Use merchant whitelists** - Restrict where payments can go
4. **Enable PKP for compliance** - Create audit trails for regulated use cases
5. **Monitor remaining limits** - Check before attempting payments

## Next Steps

- [Payment Intents](/agentic/payment-intents) - Two-phase payment flow
- [Autonomous Delegation](/agentic/autonomous-delegation) - Hands-free payments
- [Security Model](/agentic/security) - Permission hierarchy
