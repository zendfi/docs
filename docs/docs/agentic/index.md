---
title: Overview
description: Let AI agents make payments autonomously with spending limits and cryptographic security
sidebar_position: 1
---

# AI-Ready Payments

**Enable AI agents to make payments autonomously—safely and securely.**

Traditional payments require a human to click "Pay" for every transaction. AI agents need autonomy with guardrails.

:::tip Not Sure If You Need This?
**Use traditional payments if:** User clicks "Pay" for each purchase (e-commerce, SaaS checkout)

**Use AI features if:** Building AI agents that make purchases autonomously (shopping bots, auto-subscriptions, gaming agents)

**[Learn more: Why AI Payments? →](./why-ai-payments)**
:::


## Quick Start

```typescript
import { zendfi } from '@zendfi/sdk';

// 1. Create agent key with limited permissions
const agentKey = await zendfi.agent.createKey({
  name: 'Shopping Assistant',
  agent_id: 'shopping-assistant-v1',
  scopes: ['create_payments'], // Can't withdraw or full access
});

// 2. User approves spending session (one-time)
const session = await zendfi.agent.createSession({
  agent_id: 'shopping-assistant-v1',
  user_wallet: 'Hx7B...abc',
  limits: {
    max_per_transaction: 50,  // $50 max per payment
    max_per_day: 200,         // $200 daily cap
  },
  duration_hours: 24,          // Auto-expires
});

// 3. AI agent makes payments autonomously (within limits)
const payment = await zendfi.agent.pay({
  session_token: session.session_token,
  amount: 25.00,
  description: 'Coffee order',
});

console.log('Payment confirmed:', payment.transaction_signature);
// ✅ User approved once, AI paid within limits
```

**That's it.** No manual approval for each transaction. Limits enforced cryptographically.


## How It Works
![How do agentic payments work?](/images/how-agentic-payments-work.png)


## Core Features

| Feature | Description | Learn More |
|---------|-------------|------------|
| **Agent Keys** | Scoped API keys with limited permissions | [Agent Keys →](./agent-keys) |
| **Sessions** | Time-bound spending limits | [Sessions →](./sessions) |
| **Session Keys** | Pre-funded wallets for agents (advanced) | [Session Keys →](./session-keys) |
| **Payment Intents** | Two-phase commit for reliable payments | [Payment Intents →](./payment-intents) |
| **PPP Pricing** | Auto-adjust prices for 27+ countries | [PPP Pricing →](./ppp-pricing) |
| **Autonomous Delegation** | User-granted spending authority | [Delegation →](./autonomous-delegation) |
| **Smart Payments** | AI-optimized payment execution | [Smart Payments →](./smart-payments) |
| **Security** | Cryptographic attestations & audit trails | [Security →](./security) |


## Security Model

### Scoped Permissions

```typescript
// Agent can ONLY create payments (not withdraw or access wallet)
const key = await zendfi.agent.createKey({
  scopes: ['create_payments'], // Limited scope
  rate_limit_per_hour: 100,
});
```

### Spending Limits

```typescript
// Enforced cryptographically
const session = await zendfi.agent.createSession({
  limits: {
    max_per_transaction: 50,   // Per-payment cap
    max_per_day: 200,          // Daily total
    max_per_week: 500,         // Weekly total (optional)
    max_per_month: 1000,       // Monthly total (optional)
  },
});
```

### Time Bounds

```typescript
// Sessions auto-expire
const session = await zendfi.agent.createSession({
  duration_hours: 24, // Expires in 24 hours
});
```

### Audit Trail

- Every transaction logged
- Cryptographic attestations
- Optional on-chain audit (Lit Protocol PKP)
- Compliance-ready


## Real-World Examples

### Shopping Bot

```typescript
// "Order coffee every morning"
const session = await zendfi.agent.createSession({
  limits: { max_per_transaction: 10, max_per_day: 50 },
  allowed_merchants: ['cafe_merchant_id'],
  duration_hours: 168, // 1 week
});
```

### Gaming Agent

```typescript
// "Buy power-ups when needed"
const session = await zendfi.agent.createSession({
  limits: { max_per_transaction: 5, max_per_month: 50 },
});
```

### Auto-Upgrade

```typescript
// "Upgrade my SaaS plan when usage hits 80%"
const session = await zendfi.agent.createSession({
  limits: { max_per_transaction: 100, max_per_year: 1200 },
});
```


## Architecture

![Agentic Intent Protocol Architecture](/images/agentic-architecture.png)

## Features at a Glance

### Spending Controls

- Per-transaction limits
- Daily, weekly, monthly caps
- Merchant whitelists/blacklists
- Category restrictions
- Time-based restrictions

### Security

- Device-bound keys (WebAuthn/TPM)
- MPC distributed signing (Lit Protocol)
- Complete audit trails
- Webhook signature verification
- IP whitelisting

### Optimization

- Smart routing
- Gas abstraction
- Batch payments
- PPP pricing
- Cross-chain support

## Use Cases

### Shopping Agents

```typescript
// Agent shops within user's budget
const session = await zendfi.agent.createSession({
  agent_id: 'shopping-bot',
  limits: { max_per_transaction: 100, max_per_day: 500 },
});
```

### Subscription Management

```typescript
// Agent manages recurring payments
const intent = await zendfi.intents.create({
  amount: 9.99,
  description: 'Monthly subscription',
});
```

### Autonomous Trading

```typescript
// Agent executes trades within parameters
const delegation = await zendfi.agent.createDelegation({
  limits: { max_per_transaction: 1000 },
  allowed_categories: ['trading'],
});
```

## Next Steps

<div className="grid grid-cols-2 gap-4">

**Getting Started**
- [Agent Keys](./agent-keys) - Create scoped API keys
- [Sessions](./sessions) - Set up spending limits

**Advanced Features**
- [Smart Payments](./smart-payments) - AI-optimized execution
- [Device-Bound Keys](./device-bound-keys) - Hardware security

</div>


## CLI Quick Reference

```bash
# Agent Keys
zendfi ai keys create --agent-id my-agent --name "My Agent"
zendfi ai keys list
zendfi ai keys revoke <key-id>

# Agent Sessions
zendfi ai sessions create --agent-id my-agent --wallet Hx7B...
zendfi ai sessions list

# Payment Intents
zendfi ai intents create --amount 99.99
zendfi ai intents confirm <intent-id> --wallet Hx7B...

# PPP Pricing
zendfi ai ppp check BR
zendfi ai ppp calculate --price 99.99 --country IN

# Smart Payments
zendfi smart pay --to <wallet> --amount 99.99
```


## Resources

- [Getting Started](/) - Quick start guide with SDK setup
- [TypeScript Guide](/developer-tools/typescript-guide) - Type-safe SDK patterns
- [CLI Reference](/developer-tools/cli) - CLI command reference
- [Webhooks](/features/webhooks) - Handle payment events
- [API Reference](/api/payments) - REST API documentation
