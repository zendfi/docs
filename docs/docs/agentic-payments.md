---
title: Agentic Payments
description: AI-powered autonomous payment capabilities with the Agentic Intent Protocol
sidebar_position: 3
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

---

## Core Concepts

### Agent API Keys

Agent API keys (`zai_` prefix) have limited permissions compared to merchant keys (`zfi_` prefix). This enables safe delegation to AI agents.

```typescript
import { zendfi } from '@zendfi/sdk';

// Create an agent key with specific scopes
const agentKey = await zendfi.agent.createKey({
  name: 'Shopping Assistant',
  agent_id: 'shopping-assistant-v1',
  scopes: ['create_payments', 'read_analytics'],
  rate_limit_per_hour: 500,
});

// Save this! It won't be shown again
console.log(agentKey.full_key); // zai_test_abc123...
```

**Available Scopes:**
| Scope | Description |
|-------|-------------|
| `create_payments` | Create new payments |
| `read_payments` | View payment status |
| `read_analytics` | Access analytics data |
| `manage_sessions` | Create/revoke sessions |

### Agent Sessions

Sessions allow agents to act within user-defined spending limits:

```typescript
const session = await zendfi.agent.createSession({
  agent_id: 'shopping-assistant-v1',
  user_wallet: 'Hx7B...abc',
  limits: {
    max_per_transaction: 50,  // $50 max per payment
    max_per_day: 200,         // $200 daily limit
    max_per_week: 1000,       // $1000 weekly limit
    max_per_month: 3000,      // $3000 monthly limit
    require_approval_above: 25, // Manual approval above $25
  },
  allowed_merchants: ['merchant_123'], // Optional whitelist
  duration_hours: 24,
  mint_pkp: true,  // Optional: create on-chain session identity
});

// Session response includes remaining limits
console.log(`Remaining today: $${session.remaining_today}`);
console.log(`PKP address: ${session.pkp_address}`); // If mint_pkp: true
```

:::info On-Chain Session Identity (PKP)
When `mint_pkp: true` is set, ZendFi mints a Programmable Key Pair (PKP) via Lit Protocol. This creates a blockchain-verified session identity for audit and compliance purposes. The PKP provides:
- **Audit trail**: Verifiable proof that a session existed with specific parameters
- **Session identity**: Unique blockchain-based identifier (ETH address)
- **Tamper-proof creation time**: On-chain timestamp

Note: Spending limits are enforced server-side for speed and Solana compatibility. The PKP serves as an identity anchor, not a signing key.
:::

### Payment Intents

Two-phase commit pattern for reliable payments:

```typescript
// Step 1: Create intent (reserves amount)
const intent = await zendfi.intents.create({
  amount: 99.99,
  description: 'Premium subscription',
});

// Step 2: Confirm when ready
await zendfi.intents.confirm(intent.id, {
  client_secret: intent.client_secret,
  customer_wallet: 'Hx7B...abc',
});
```

---

## PPP Pricing

Purchasing Power Parity (PPP) automatically adjusts prices based on customer location for global reach.

### How It Works

```typescript
// Get PPP factor for Brazil
const factor = await zendfi.pricing.getPPPFactor('BR');
// {
//   country_code: 'BR',
//   country_name: 'Brazil',
//   ppp_factor: 0.35,
//   adjustment_percentage: 65.0
// }

// Calculate localized price
const basePrice = 100;
const localPrice = basePrice * factor.ppp_factor;
console.log(`$${localPrice} for Brazilian customers`); // $35
```

### Supported Countries

ZendFi supports PPP pricing for 27+ countries:

| Region | Countries |
|--------|-----------|
| **Americas** | Argentina, Brazil, Canada, Chile, Colombia, Mexico, Peru |
| **Europe** | Czech Republic, Denmark, France, Germany, Hungary, Ireland, Italy, Netherlands, Norway, Poland, Portugal, Romania, Spain, Sweden, Switzerland, Ukraine, UK |
| **Africa** | Egypt, Ghana, Kenya, Nigeria, South Africa |
| **Asia** | China, Hong Kong, India, Indonesia, Israel, Japan, Malaysia, Philippines, Pakistan, Saudi Arabia, Singapore, South Korea, Taiwan, Thailand, Turkey, Vietnam |
| **Oceania** | Australia, New Zealand |

### CLI Example

```bash
# Check PPP factor for a country
zendfi ppp check BR

# Calculate localized price
zendfi ppp calculate --price 99.99 --country IN

# List all factors sorted by discount
zendfi ppp factors --sort discount
```

---

## Autonomous Delegation

Enable agents to make payments without per-transaction approval:

```typescript
// Enable autonomous mode
const delegate = await zendfi.autonomy.enable({
  wallet_address: 'Hx7B...abc',
  agent_id: 'shopping-assistant',
  max_per_day_usd: 100,
  max_per_transaction_usd: 25,
  duration_hours: 24,
  allowed_categories: ['subscriptions', 'digital_goods'],
});

// Check status
const status = await zendfi.autonomy.getStatus(walletAddress);
// {
//   is_enabled: true,
//   total_delegates: 1,
//   active_delegates: 1,
//   delegates: [...]
// }

// Revoke when done
await zendfi.autonomy.revoke(delegate.id);
```

---

## Smart Payments

AI-powered payments that automatically apply optimizations:

```typescript
const payment = await zendfi.smart.execute({
  agent_id: 'my-agent',
  user_wallet: 'Hx7B...abc',
  amount_usd: 99.99,
  country_code: 'BR', // Apply PPP automatically
  auto_detect_gasless: true,
  description: 'Pro subscription',
});

console.log(`Original: $${payment.original_amount_usd}`);
console.log(`Final: $${payment.final_amount_usd}`);
console.log(`PPP Applied: ${payment.ppp_discount_applied}`);
// Original: $99.99
// Final: $64.99
// PPP Applied: true
```

---

## Device-Bound Session Keys

For maximum security, use device-bound session keys where the private key never leaves the user's device:

```typescript
import { ZendFiSessionKeyManager } from '@zendfi/sdk';

const manager = new ZendFiSessionKeyManager('your-api-key');

// Create a device-bound session key with a PIN
const { sessionKey, recoveryQR } = await manager.createSessionKey({
  userWallet: 'Hx7B...abc',
  limitUsdc: 500,
  durationDays: 30,
  pin: '123456',  // User's chosen PIN
});

// IMPORTANT: Show recoveryQR to user for backup!
console.log('Save this QR code for recovery:', recoveryQR.dataUrl);

// Make a payment (requires PIN to decrypt key)
const payment = await manager.makePayment(
  sessionKey.id,
  {
    amount: 25.00,
    recipient: 'merchant_wallet...',
    description: 'Coffee',
    pin: '123456',
  }
);
```

### Custodial vs Non-Custodial

| Feature | Custodial (default) | Device-Bound |
|---------|---------------------|--------------|
| Key storage | ZendFi servers | User's device only |
| Auto-signing | ✅ Yes | ❌ Requires PIN |
| Recovery | Server backup | QR code backup |
| Best for | Convenience | Maximum security |

---

## Security Model

### Permission Hierarchy

```
Merchant Key (zfi_)
  └── Full access to all APIs
  
Agent Key (zai_)
  └── Scoped permissions only
  └── Rate limited
  └── No access to merchant settings
  
Session Token
  └── Spending limits enforced (server-side)
  └── Time-bound (auto-expires)
  └── Wallet-specific
  └── Optional PKP identity (on-chain audit trail)
  
Device-Bound Key
  └── Private key never leaves device
  └── PIN-protected decryption
  └── QR code recovery
```

### Spending Limit Enforcement

Spending limits are enforced **server-side** for:
- **Speed**: No blockchain latency for limit checks
- **Solana compatibility**: PKPs use ECDSA (Ethereum) while Solana uses Ed25519
- **Reliability**: No network failures can bypass limits

When `mint_pkp: true` is set, the session gets an on-chain identity via Lit Protocol. This provides an audit trail, not cryptographic enforcement.

### Best Practices

1. **Use agent keys for AI agents** - Never expose merchant keys
2. **Set conservative limits** - Start with low limits, increase as needed
3. **Use short session durations** - 24 hours is recommended
4. **Enable merchant whitelists** - Restrict where payments can go
5. **Monitor with analytics** - Track agent activity
6. **Use device-bound keys** for high-value operations
7. **Enable `mint_pkp`** for compliance-critical sessions

---

## Webhook Events

The Agentic Intent Protocol adds new webhook events:

| Event | Description |
|-------|-------------|
| `agent.key.created` | New agent API key created |
| `agent.key.revoked` | Agent API key revoked |
| `agent.session.created` | New session started |
| `agent.session.revoked` | Session manually revoked |
| `agent.session.expired` | Session auto-expired |
| `agent.session.limit_reached` | Spending limit hit |
| `intent.created` | Payment intent created |
| `intent.confirmed` | Payment intent confirmed |
| `intent.canceled` | Payment intent canceled |
| `autonomy.enabled` | Autonomous delegation enabled |
| `autonomy.revoked` | Autonomous delegation revoked |
| `session_key.created` | Device-bound session key created |
| `session_key.topped_up` | Session key balance added |
| `session_key.payment` | Payment made via session key |

---

## Example: AI Shopping Assistant

Complete example of an AI shopping assistant with spending limits:

```typescript
import { zendfi } from '@zendfi/sdk';

// 1. Create agent key (do this once, save the key)
const agentKey = await zendfi.agent.createKey({
  name: 'Shopping Assistant',
  agent_id: 'shopping-bot-v1',
  scopes: ['create_payments'],
});

// 2. User approves a session with limits
const session = await zendfi.agent.createSession({
  agent_id: 'shopping-bot-v1',
  user_wallet: userWallet,
  limits: {
    max_per_transaction: 50,
    max_per_day: 200,
  },
  duration_hours: 24,
});

// 3. Agent makes purchases within limits
async function makePurchase(product: { name: string; price: number }) {
  // Create intent
  const intent = await zendfi.intents.create({
    amount: product.price,
    description: `Purchase: ${product.name}`,
    agent_id: 'shopping-bot-v1',
  });
  
  // Confirm with session
  const confirmed = await zendfi.intents.confirm(intent.id, {
    client_secret: intent.client_secret,
    customer_wallet: userWallet,
    session_token: session.token,
  });
  
  return confirmed;
}

// 4. Agent can make purchases until limits are reached
await makePurchase({ name: 'Coffee', price: 4.99 });
await makePurchase({ name: 'Snacks', price: 12.50 });

// 5. Session auto-expires after 24 hours
```

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
zendfi agent sessions revoke <session-id>

# Payment Intents
zendfi intents create --amount 99.99
zendfi intents list
zendfi intents confirm <intent-id> --wallet Hx7B...
zendfi intents cancel <intent-id>

# PPP Pricing
zendfi ppp check BR
zendfi ppp calculate --price 99.99 --country IN
zendfi ppp factors --sort discount

# Autonomous Delegation
zendfi autonomy enable --wallet Hx7B... --agent-id my-agent
zendfi autonomy status <wallet>
zendfi autonomy delegates
zendfi autonomy revoke <delegate-id>

# Smart Payments
zendfi smart create --amount 99.99 --country BR --ppp
zendfi smart simulate --amount 99.99 --country IN
```

---

## Next Steps

- [SDK Reference](/developer-tools/sdks) - Complete SDK documentation
- [CLI Reference](/developer-tools/cli) - CLI command reference
- [Webhooks](/features/webhooks) - Handle payment events
- [API Reference](/api/payments) - REST API documentation
