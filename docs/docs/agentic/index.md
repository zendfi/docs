---
title: Overview
description: AI-powered autonomous payment capabilities with the Agentic Intent Protocol
sidebar_position: 1
---

# Agentic Payments

Enable AI agents to make payments autonomously with scoped permissions, spending limits, and complete audit trails.

:::tip What is the Agentic Intent Protocol?
The Agentic Intent Protocol (AIP) is ZendFi's framework for enabling AI agents to handle payments on behalf of users. It provides:
- **Scoped API keys** with limited permissions
- **Spending limits** per transaction, per day, per week, and per month
- **Time-bound sessions** that auto-expire
- **Device-bound session keys** for non-custodial signing
- **Autonomous delegates** for hands-free operation
- **PKP session identity** (optional on-chain audit trail via Lit Protocol)
- **PPP pricing** for global reach
- **Complete audit trails** for compliance
:::

## Quick Start

```typescript
import { zendfi } from '@zendfi/sdk';

// 1. Create an agent key (requires agent_id)
const agentKey = await zendfi.agent.createKey({
  name: 'Shopping Assistant',
  agent_id: 'shopping-assistant-v1',
  scopes: ['create_payments'],
});

console.log('Save this key:', agentKey.full_key); // zai_test_...

// 2. Create a session with spending limits
const session = await zendfi.agent.createSession({
  agent_id: 'shopping-assistant-v1',
  user_wallet: 'Hx7B...abc',
  limits: {
    max_per_transaction: 50,
    max_per_day: 200,
  },
  duration_hours: 24,
});

// 3. Make payments within limits
const payment = await zendfi.agent.pay({
  session_token: session.session_token,
  amount: 25.00,
  description: 'Widget purchase',
});

console.log('Payment confirmed:', payment.transaction_signature);

// Or use Payment Intents for two-phase flow
const intent = await zendfi.intents.create({
  amount: 25.00,
  description: 'Coffee purchase',
});

// 4. Confirm when customer is ready to pay
const confirmed = await zendfi.intents.confirm(intent.id, {
  client_secret: intent.client_secret,
  customer_wallet: 'Hx7B...abc',
});
```

## Core Concepts

| Concept | Description | Learn More |
|---------|-------------|------------|
| **Agent Keys** | Scoped API keys for AI agents | [Agent Keys →](./agent-keys) |
| **Sessions** | Time-bound spending limits | [Sessions →](./sessions) |
| **Session Keys** | Pre-funded wallets for autonomous agents | [Session Keys →](./session-keys) |
| **Payment Intents** | Two-phase commit for reliable payments | [Payment Intents →](./payment-intents) |
| **PPP Pricing** | Purchasing power parity for global markets | [PPP Pricing →](./ppp-pricing) |
| **Autonomous Delegation** | User-granted spending authority | [Delegation →](./autonomous-delegation) |
| **Smart Payments** | AI-optimized payment execution | [Smart Payments →](./smart-payments) |
| **Device-Bound Keys** | Hardware-secured signing keys | [Device Keys →](./device-bound-keys) |
| **Security** | Best practices and controls | [Security →](./security) |

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Your AI Agent                          │
├─────────────────────────────────────────────────────────────┤
│                       ZendFi SDK                            │
├───────────────┬───────────────┬───────────────┬─────────────┤
│  Agent Keys   │   Sessions    │  Session Keys │   Smart     │
│  (Scoped)     │   (Limits)    │  (Pre-funded) │  Payments   │
├───────────────┴───────────────┴───────────────┴─────────────┤
│                    ZendFi Platform                          │
├─────────────────────────────────────────────────────────────┤
│   Solana   │   Lit Protocol   │   Webhooks   │   Analytics  │
└─────────────────────────────────────────────────────────────┘
```

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

---

## CLI Quick Reference

```bash
# Agent Keys
zendfi agent keys create --name "My Agent"
zendfi agent keys list
zendfi agent keys revoke <key-id>

# Agent Sessions
zendfi agent sessions create --agent-id my-agent --wallet Hx7B...
zendfi agent sessions list

# Payment Intents
zendfi intents create --amount 99.99
zendfi intents confirm <intent-id> --wallet Hx7B...

# PPP Pricing
zendfi ppp check BR
zendfi ppp calculate --price 99.99 --country IN

# Smart Payments
zendfi smart pay --to <wallet> --amount 99.99
```

---

## Resources

- [SDK Examples](/developer-tools/sdk-examples) - Complete code examples
- [SDK Reference](/developer-tools/sdks) - SDK documentation
- [CLI Reference](/developer-tools/cli) - CLI command reference
- [Webhooks](/features/webhooks) - Handle payment events
- [API Reference](/api/payments) - REST API documentation
