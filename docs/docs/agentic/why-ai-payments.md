---
title: Why AI Payments?
description: Understanding when and why to use autonomous agent payments
sidebar_position: 0
---

# Why AI Payments?

Traditional payment flows require a human to click "Pay" for every transaction. AI agents need to make purchases autonomously—but safely.


## The Problem

**Traditional e-commerce:**
```
User sees product → Clicks "Buy" → Signs transaction → Payment complete
```

**AI agents:**
```
Agent finds best deal → ??? Can't ask user every time → Needs autonomy
```

**The challenge:** How do you let an AI agent make payments without:
- Giving it full access to your wallet
- Manual approval for every $5 coffee purchase
- Losing security and compliance


## The ZendFi Solution

### 1. **User Approves Once**

```typescript
// User creates a spending session (one-time approval)
const session = await zendfi.agent.createSession({
  agent_id: 'shopping-assistant',
  user_wallet: 'Hx7B...abc',
  limits: {
    max_per_transaction: 50,  // $50 per purchase
    max_per_day: 200,         // $200 daily cap
  },
  duration_hours: 24,          // Expires in 24h
});
```

### 2. **AI Agent Pays Within Limits**

```typescript
// Agent makes purchases autonomously
const payment = await zendfi.agent.pay({
  session_token: session.session_token,
  amount: 25.00,
  description: 'Coffee order',
});
//  Payment confirmed (within limits)

const payment2 = await zendfi.agent.pay({
  session_token: session.session_token,
  amount: 100.00, // Over $50 limit
  description: 'Expensive item',
});
// ❌ Rejected: Exceeds per-transaction limit
```

### 3. **Cryptographic Security**

- **Scoped API keys** — Agent can only create payments, not withdraw
- **Spending limits** — Enforced by cryptographic attestations
- **Time bounds** — Sessions auto-expire
- **Audit trail** — Every transaction logged
- **PKP identity** (optional) — On-chain audit via Lit Protocol


## Real-World Use Cases

### Shopping Assistant

"Order me coffee every morning before my 9am meeting"

```typescript
// User approves once
const session = await zendfi.agent.createSession({
  limits: { max_per_transaction: 10, max_per_day: 50 },
  allowed_merchants: ['cafe_merchant_id'],
  duration_hours: 168, // 1 week
});

// AI agent orders coffee daily (no manual approval)
await agent.orderCoffee(); // Uses session token internally
```

### **Gaming Agent**

"Buy me power-ups when I'm running low"

```typescript
const session = await zendfi.agent.createSession({
  limits: { max_per_transaction: 5, max_per_month: 50 },
  allowed_merchants: ['game_merchant_id'],
});
```

### **SaaS Auto-Upgrade**

"Upgrade my plan when I hit 80% of my limits"

```typescript
const session = await zendfi.agent.createSession({
  limits: { max_per_transaction: 100, max_per_month: 1200 },
  allowed_merchants: ['saas_platform_merchant_id'],
});
```

### **Travel Booking**

"Book cheapest flight when price drops below $300"

```typescript
const session = await zendfi.agent.createSession({
  limits: { max_per_transaction: 300, max_per_week: 600 },
  duration_hours: 72, // 3 days
});
```


## How It Works (Technical)

### Traditional Payment Flow

```
1. User clicks "Pay"
2. Wallet popup appears
3. User signs transaction
4. Transaction submitted
5. Payment confirmed
```

**Problem:** Requires human interaction for EVERY payment.

### AI Agent Payment Flow

```
1. User approves session (ONE TIME)
   ├─ Sets spending limits
   ├─ Sets duration
   └─ Gets session token

2. AI agent makes payments (AUTONOMOUS)
   ├─ Uses session token
   ├─ Backend checks limits
   ├─ Signs with session key OR user delegation
   └─ Payment confirmed

3. Session expires automatically
```

**Benefit:** User approves once, agent pays autonomously (within limits).


## Security Model

### Scoped API Keys

```typescript
// Agent key can ONLY create payments
const agentKey = await zendfi.agent.createKey({
  scopes: ['create_payments'], // Not 'withdraw' or 'full_access'
  rate_limit_per_hour: 100,
});
```

### Cryptographic Attestations

Every spending limit check is:
1. Cryptographically signed by ZendFi
2. Includes timestamp and current spend
3. Prevents replay attacks
4. Auditable on-chain (optional)

### Session Key Security

Two modes available:

**1. Device-Bound Keys** (Most Secure)
- Private key never leaves device
- Encrypted with PIN + device fingerprint
- Backend cannot decrypt

**2. Custodial Keys** (Simpler)
- Backend holds key
- Protected by session token
- Easier integration


## When to Use AI Payments?

### **Use AI Features If:**

- Building AI agents that make purchases
- Need recurring autonomous actions
- Want hands-free operation after initial approval
- Compliance requires audit trails

### **Use Traditional Payments If:**

- User clicks "Pay" for each purchase
- Standard e-commerce checkout
- One-off transactions
- No AI/automation involved

**The good news:** You can mix both! Use traditional payments for checkout, AI payments for agent features.


## Getting Started

Ready to enable AI payments in your app?

1. **[Agent Keys →](./agent-keys)** — Create scoped API keys
2. **[Sessions →](./sessions)** — Set up spending limits
3. **[Session Keys →](./session-keys)** — Pre-funded wallets (advanced)
4. **[Security →](./security)** — Best practices

**Or try the quick start:**

```typescript
import { zendfi } from '@zendfi/sdk';

// 1. Create agent key
const key = await zendfi.agent.createKey({
  name: 'My Agent',
  agent_id: 'my-agent-v1',
  scopes: ['create_payments'],
});

// 2. Create session
const session = await zendfi.agent.createSession({
  agent_id: 'my-agent-v1',
  user_wallet: 'USER_WALLET',
  limits: { max_per_transaction: 50, max_per_day: 200 },
});

// 3. Make autonomous payment
const payment = await zendfi.agent.pay({
  session_token: session.session_token,
  amount: 25,
  description: 'AI-initiated purchase',
});

console.log('Payment confirmed:', payment.transaction_signature);
```


## Questions?

- **Discord:** [discord.gg/zendfi](https://discord.gg/zendfi)
- **Email:** [support@zendfi.tech](mailto:support@zendfi.tech)
- **Docs:** [Full AI Features →](/agentic/)
