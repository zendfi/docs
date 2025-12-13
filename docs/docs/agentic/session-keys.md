---
title: Session Keys
description: On-chain funded wallets with PKP identity for autonomous agent payments
sidebar_position: 4
---

# Session Keys

Session Keys are pre-funded wallets with spending limits that enable AI agents to make autonomous payments without requiring user signatures for each transaction. They use Lit Protocol's PKP (Programmable Key Pairs) for secure on-chain identity.

## Overview

Session Keys differ from Agent Sessions in a key way:

| Feature | Agent Sessions | Session Keys |
|---------|----------------|--------------|
| **Funding** | Virtual limits on user's wallet | Pre-funded dedicated wallet |
| **User Signature** | Required per payment | One-time approval only |
| **On-Chain Identity** | Optional PKP | Always has PKP address |
| **Best For** | Interactive flows | Fully autonomous agents |
| **Can Link Together** | Yes | Yes |

:::tip Defense in Depth
For maximum security, **link a session key to a session**. The session key provides signing capability while the session enforces granular spending policies. See [Linking Session Keys to Sessions](#linking-session-keys-to-sessions).
:::

## The Session Key Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    Session Key Lifecycle                     │
└─────────────────────────────────────────────────────────────┘

1. CREATE          2. APPROVE           3. SPEND            4. TOP-UP
   Agent             User signs           Agent makes         (Optional)
   requests →        approval    →        payments     →      Add more
   session key       transaction          autonomously        funds

     ┌────┐          ┌────────┐          ┌────────┐          ┌────────┐
     │ 🤖 │   ───▶   │ ✍️ User │   ───▶   │ 💸 Pay │   ───▶   │ 💰 +$$ │
     └────┘          └────────┘          └────────┘          └────────┘
       │                 │                   │                   │
       ▼                 ▼                   ▼                   ▼
   pending_approval   active              active              active
                                      (limit decreases)   (limit increases)
```

## Creating a Session Key

```typescript
import { zendfi } from '@zendfi/sdk';

// Step 1: Create a session key
const key = await zendfi.sessionKeys.create({
  agent_id: 'shopping-assistant',
  user_wallet: 'Hx7B...abc',
  max_amount: 100,       // $100 spending limit
  expiry_hours: 24,      // Valid for 24 hours
  token: 'USDC',         // Token to fund with
});

console.log(`Session Key ID: ${key.session_key_id}`);
console.log(`Status: ${key.status}`);  // "pending_approval"
console.log(`Wallet Address: ${key.session_key_address}`);
console.log(`PKP Public Key: ${key.pkp_public_key}`);
```

### Response Fields

| Field | Description |
|-------|-------------|
| `session_key_id` | Unique identifier for the session key |
| `status` | Current status (see statuses below) |
| `session_key_address` | The funded wallet address |
| `pkp_public_key` | Lit Protocol PKP public key |
| `approval_transaction` | Transaction for user to sign |
| `max_amount` | Maximum spending limit |
| `expires_at` | Expiration timestamp |

## Submitting User Approval

After creating a session key, the user must sign the approval transaction:

```typescript
// The user's wallet signs the transaction
const signedTx = await userWallet.signTransaction(
  key.approval_transaction
);

// Submit the signed approval
await zendfi.sessionKeys.submitApproval(key.session_key_id, {
  signed_transaction: signedTx,
});

// Session key is now active!
const status = await zendfi.sessionKeys.getStatus(key.session_key_id);
console.log(status.status);  // "active"
```

## Checking Session Key Status

```typescript
const status = await zendfi.sessionKeys.getStatus(key.session_key_id);

console.log(`Status: ${status.status}`);
console.log(`Max Amount: $${status.max_amount}`);
console.log(`Spent: $${status.spent_amount}`);
console.log(`Remaining: $${status.remaining_amount}`);
console.log(`Transaction Count: ${status.transaction_count}`);
console.log(`Expires: ${status.expires_at}`);

// Security information
if (status.security) {
  console.log(`Last Activity: ${status.security.last_activity}`);
  console.log(`Risk Score: ${status.security.risk_score}`);
}
```

### Session Key Statuses

| Status | Description |
|--------|-------------|
| `pending_approval` | Waiting for user to sign approval transaction |
| `active` | Ready for payments |
| `exhausted` | Spending limit reached |
| `expired` | Past expiry time |
| `revoked` | Manually revoked |

## Making Payments with Session Keys

Once a session key is active, agents can make payments autonomously:

```typescript
// Use the smart payment endpoint with session context
const payment = await zendfi.smart.execute({
  agent_id: 'shopping-assistant',
  user_wallet: key.session_key_address,  // Use session key address
  amount_usd: 29.99,
  description: 'Premium widget',
  auto_detect_gasless: true,
});

console.log(`Payment ID: ${payment.payment_id}`);
console.log(`Status: ${payment.status}`);
console.log(`Transaction: ${payment.transaction_signature}`);
```

## Topping Up a Session Key

Add more funds to an existing session key:

```typescript
// Step 1: Request a top-up
const topUp = await zendfi.sessionKeys.topUp(key.session_key_id, {
  amount: 50,  // Add $50 more
});

console.log(`New Max Amount: $${topUp.new_max_amount}`);
console.log(`Approval Required: sign the transaction`);

// Step 2: User signs the top-up transaction
const signedTopUp = await userWallet.signTransaction(
  topUp.approval_transaction
);

// Step 3: Submit the signed top-up
await zendfi.sessionKeys.submitTopUp(key.session_key_id, {
  signed_transaction: signedTopUp,
});

// Verify the new limit
const updated = await zendfi.sessionKeys.getStatus(key.session_key_id);
console.log(`Updated Remaining: $${updated.remaining_amount}`);
```

## Revoking a Session Key

Immediately invalidate a session key:

```typescript
await zendfi.sessionKeys.revoke(key.session_key_id);
console.log('Session key revoked - no further payments possible');
```

:::warning
Revocation is immediate and irreversible. Any pending payments will fail.
:::

## Listing Session Keys

```typescript
const result = await zendfi.sessionKeys.list();

console.log(`Total: ${result.total}`);
result.session_keys.forEach(key => {
  console.log(`${key.session_key_id}:`);
  console.log(`  Status: ${key.status}`);
  console.log(`  Remaining: $${key.remaining_amount}`);
  console.log(`  Expires: ${key.expires_at}`);
});
```

## Linking Session Keys to Sessions

For **defense in depth**, you can link a session key to an AI session. This provides two layers of protection:

1. **Session Key Balance** - Hard cap on total spending (what's funded)
2. **Session Policy Limits** - Granular limits (per-tx, daily, weekly, monthly)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    LINKED SESSION KEY + SESSION                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   Session Key (Execution Layer)     Session (Policy Layer)                  │
│   ─────────────────────────────     ──────────────────────                  │
│   • Pre-funded wallet: $500         • max_per_transaction: $25              │
│   • Signing capability              • max_per_day: $100                     │
│   • Hard spending cap               • max_per_month: $1000                  │
│                                                                             │
│   When linked, BOTH limits are checked before each payment.                 │
│   Payment succeeds only if it satisfies BOTH constraints.                   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Linking a Session Key to a Session

```typescript
// 1. Create a session with granular limits
const session = await zendfi.agent.createSession({
  agent_id: 'shopping-bot',
  user_wallet: userWallet,
  limits: {
    max_per_transaction: 25,   // $25 max per payment
    max_per_day: 100,          // $100 daily limit
    max_per_month: 1000,       // $1000 monthly limit
  },
  duration_hours: 168,  // 7 days
});

// 2. Create and fund a session key
const key = await zendfi.sessionKeys.create({
  user_wallet: userWallet,
  limit_usdc: 500,  // Fund with $500
  duration_days: 7,
  device_fingerprint: fp,
});

// User approves...
await zendfi.sessionKeys.submitApproval(key.session_key_id, { signed_transaction: signedTx });

// 3. Link them together
await zendfi.sessionKeys.linkSession(key.session_key_id, session.id);

// Now payments will check BOTH:
// - Session key balance ($500 funded)
// - Session limits ($25 per tx, $100 per day)
```

### Pre-Checking Payment Affordability

Before making a payment, check if it's allowed:

```typescript
const check = await zendfi.sessionKeys.canAfford(key.session_key_id, 50);

if (check.allowed) {
  console.log(`Payment allowed. Effective limit: $${check.effective_limit}`);
  // Proceed with payment...
} else {
  console.log(`Payment blocked: ${check.reason}`);
  console.log(`Session key remaining: $${check.session_key_remaining}`);
  console.log(`Session remaining today: $${check.session_remaining_today}`);
}
```

### Unlinking a Session

If you need to remove the policy layer:

```typescript
await zendfi.sessionKeys.unlinkSession(key.session_key_id);
// Now only session key balance limits apply
```

### Why Link Them?

| Scenario | Session Key Only | Linked |
|----------|------------------|--------|
| Agent tries $500 payment | ✅ Allowed (has balance) | ❌ Blocked (exceeds $25 per-tx limit) |
| Agent makes 5x $50 payments/day | ✅ Allowed ($250 total) | ❌ Blocked after 2nd (exceeds $100/day) |
| Compromised agent tries to drain | Can spend full $500 | Capped at policy limits |

**Recommendation:** Always link session keys to sessions for production AI agents.

## CLI Commands

```bash
# Create a session key
zendfi session-keys create \
  --agent-id shopping-bot \
  --wallet Hx7B...abc \
  --max-amount 100 \
  --expiry-hours 24

# Get session key status
zendfi session-keys status sk_abc123

# Top up a session key
zendfi session-keys top-up sk_abc123 --amount 50

# Revoke a session key
zendfi session-keys revoke sk_abc123

# List all session keys
zendfi session-keys list
```

## Session Keys vs Agent Sessions

Choose the right approach for your use case:

### Use Agent Sessions When:
- User is present and can approve payments
- You want server-side limit enforcement
- Payments go through the user's existing wallet
- You need real-time limit adjustments

### Use Session Keys When:
- Agent operates fully autonomously (no user present)
- You need dedicated pre-funded wallets
- You want on-chain identity (PKP) for every session
- Agent makes frequent payments without user interaction

## Security Considerations

### PKP Identity
Every session key has a Lit Protocol PKP, providing:
- Verifiable on-chain session identity
- Tamper-proof audit trail
- Cryptographic proof of session parameters

### Spending Limits
- Limits are enforced at the protocol level
- Even if agent code is compromised, spending cannot exceed the limit
- Top-ups require explicit user signature

### Expiration
- Session keys auto-expire after the set duration
- Expired keys cannot be used for new payments
- Consider using 24-hour durations for most use cases

## Webhook Events

| Event | Description |
|-------|-------------|
| `session_key.created` | Session key created (pending approval) |
| `session_key.activated` | User approved, session key active |
| `session_key.exhausted` | Spending limit reached |
| `session_key.expired` | Session key expired |
| `session_key.revoked` | Session key manually revoked |
| `session_key.topped_up` | Additional funds added |

## Best Practices

1. **Start with low limits** - Begin with $50-100 and increase based on usage
2. **Short durations** - Use 24-hour expiry for most cases
3. **Monitor spending** - Check `getStatus()` before payments
4. **Handle exhaustion** - Prompt user for top-up when limits are low
5. **Revoke unused keys** - Clean up inactive session keys

## Next Steps

- [Agent Sessions](/agentic/sessions) - For interactive payment flows
- [Smart Payments](/agentic/smart-payments) - AI-optimized payment execution
- [Autonomous Delegation](/agentic/autonomous-delegation) - Alternative for trusted agents
