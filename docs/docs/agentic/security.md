---
title: Security
description: Security best practices for agentic payments
sidebar_position: 9
---

# Security

Comprehensive security guide for implementing agentic payments safely. Learn about permission hierarchies, enforcement mechanisms, and best practices.

## Permission Hierarchy

```
                    ┌─────────────────────────┐
                    │      Merchant Admin     │  ← Full control
                    │   (Master API Keys)     │
                    └───────────┬─────────────┘
                                │
                    ┌───────────▼─────────────┐
                    │     Agent API Keys      │  ← Scoped permissions
                    │   (Limited Scopes)      │
                    └───────────┬─────────────┘
                                │
          ┌─────────────────────┼─────────────────────┐
          │                     │                     │
┌─────────▼─────────┐ ┌────────▼────────┐ ┌─────────▼─────────┐
│  Agent Sessions   │ │   Delegations   │ │  Device-Bound     │
│ (Time-limited)    │ │ (User-granted)  │ │     Keys          │
└─────────┬─────────┘ └────────┬────────┘ └─────────┬─────────┘
          │                     │                     │
          └─────────────────────┼─────────────────────┘
                                │
                    ┌───────────▼─────────────┐
                    │   Individual Payment    │  ← Most restricted
                    │    (Single Action)      │
                    └─────────────────────────┘
```

## API Key Scopes

Agent API keys support the following scopes:

| Scope | Capabilities | Risk Level |
|-------|--------------|------------|
| `full` | Full access to all APIs | Critical |
| `read_only` | Read-only access to data | Low |
| `create_payments` | Create new payments | Medium |
| `create_subscriptions` | Create subscriptions | Medium |
| `manage_escrow` | Manage escrow transactions | High |
| `manage_installments` | Manage installment plans | Medium |
| `read_analytics` | Access analytics data | Low |

### Creating Scoped Keys

```typescript
import { zendfi } from '@zendfi/sdk';

// Create minimally-scoped key for a shopping agent
const agentKey = await zendfi.agent.createKey({
  name: 'Shopping Agent Key',
  agent_id: 'shopping-agent-v1',
  scopes: ['create_payments'],
  rate_limit_per_hour: 1000,
});

// IMPORTANT: Save the full_key immediately - it won't be shown again!
console.log(agentKey.full_key); // zai_test_abc123...
```

## Rate Limiting

Protect against abuse with API key rate limits:

```typescript
// Configure rate limit when creating agent key
const agentKey = await zendfi.agent.createKey({
  name: 'Shopping Agent',
  agent_id: 'shopping-assistant-v1',
  scopes: ['create_payments'],
  rate_limit_per_hour: 500, // Max 500 API calls per hour
});
```

### Rate Limit Headers

All responses include rate limit headers:

```
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 45
X-RateLimit-Reset: 1699999999
```

## Spending Controls

### Session Limits

```typescript
const session = await zendfi.agent.createSession({
  agent_id: 'agent',
  user_wallet: wallet,
  limits: {
    max_per_transaction: 100,    // Single tx limit
    max_per_day: 500,            // Daily limit
    max_per_week: 2000,          // Weekly limit
    max_per_month: 5000,         // Monthly limit
    require_approval_above: 200, // Require approval for large tx
  },
  duration_hours: 24,
  mint_pkp: true, // Enable on-chain audit trail (Lit Protocol)
});
```

### Session Configuration

```typescript
const session = await zendfi.agent.createSession({
  agent_id: 'shopping-agent',
  user_wallet: wallet,
  
  // Spending limits enforced by ZendFi
  limits: {
    max_per_transaction: 50,
    max_per_day: 200,
    max_per_week: 1000,
    max_per_month: 3000,
  },
  
  // Session expiration
  duration_hours: 24,
  
  // On-chain identity (Lit Protocol)
  mint_pkp: true,
});

// Check remaining budget
const status = await zendfi.agent.getSession(session.id);
console.log(`Remaining today: $${status.remaining_today}`);
console.log(`Remaining this week: $${status.remaining_this_week}`);
```

## Webhook Security

### Signature Verification

Always verify webhook signatures. The signature format is `t=<timestamp>,v1=<signature>`.

**Note:** Signature verification is handled by ZendFi's backend when sending webhooks. If you're receiving webhooks, you'll need to implement verification manually using HMAC-SHA256:

```typescript
import crypto from 'crypto';

app.post('/webhooks/zendfi', (req, res) => {
  const signature = req.headers['x-zendfi-signature'];
  const timestamp = req.headers['x-zendfi-timestamp'];
  
  // Extract timestamp and signature
  const parts = signature.split(',');
  const timestampPart = parts[0].replace('t=', '');
  const signaturePart = parts[1].replace('v1=', '');
  
  // Recreate signed payload
  const signedPayload = `${timestampPart}:${req.rawBody}`;
  const expectedSignature = crypto
    .createHmac('sha256', process.env.WEBHOOK_SECRET)
    .update(signedPayload)
    .digest('hex');
  
  // Constant-time comparison
  const isValid = crypto.timingSafeEqual(
    Buffer.from(signaturePart, 'hex'),
    Buffer.from(expectedSignature, 'hex')
  );
  
  // Check timestamp (within 5 minutes)
  const now = Math.floor(Date.now() / 1000);
  const age = now - parseInt(timestampPart);
  if (age > 300) {
    return res.status(401).send('Signature expired');
  }
  
  if (!isValid) {
    return res.status(401).send('Invalid signature');
  }
  
  // Process webhook
  const event = req.body;
  handleEvent(event);
  
  res.status(200).send('OK');
});
```

## Audit Logging

Enable comprehensive audit logging:

```typescript
// All actions are logged automatically
const logs = await zendfi.audit.list({
  start_date: '2024-01-01',
  end_date: '2024-12-31',
  actions: ['payment.created', 'key.used', 'session.created'],
});

logs.forEach(log => {
  console.log(`${log.timestamp}: ${log.action} by ${log.actor}`);
  console.log(`  IP: ${log.ip_address}`);
  console.log(`  Resource: ${log.resource_id}`);
});
```

## Cryptographic Attestations

For autonomous delegation, ZendFi creates cryptographically signed attestations for every payment. These provide an immutable audit trail proving spending limits were enforced correctly.

### How Attestations Work

```
┌─────────────────────────────────────────────────────────────────┐
│                    ATTESTATION FLOW                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. Agent requests payment                                      │
│  2. ZendFi checks spending limits (programmatic)                │
│  3. ZendFi signs attestation: { spent, limit, requested }       │
│  4. Attestation stored in immutable audit log                   │
│  5. Transaction signed and submitted                            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

Each attestation contains:

| Field | Description |
|-------|-------------|
| `spent_usd` | Amount already spent before this payment |
| `limit_usd` | User-defined maximum spending limit |
| `requested_usd` | Amount requested in this payment |
| `remaining_after_usd` | Remaining budget after payment |
| `timestamp_ms` | Attestation creation time |
| `nonce` | Unique ID preventing replay attacks |
| `signature` | Ed25519 signature from ZendFi |

### Fetching Attestations

```typescript
const audit = await zendfi.autonomy.getAttestations(delegateId);

console.log(`ZendFi public key: ${audit.zendfi_attestation_public_key}`);

for (const signed of audit.attestations) {
  const { attestation, signature, signer_public_key } = signed;
  
  console.log(`Payment ${attestation.payment_id}:`);
  console.log(`  Limit: $${attestation.limit_usd}`);
  console.log(`  Spent before: $${attestation.spent_usd}`);
  console.log(`  Requested: $${attestation.requested_usd}`);
  console.log(`  Remaining after: $${attestation.remaining_after_usd}`);
}
```

### Independent Verification

Verify attestation signatures using ZendFi's public key:

```typescript
import nacl from 'tweetnacl';
import bs58 from 'bs58';

function verifyAttestation(signed, zendfiPublicKey) {
  // Decode public key from Base58
  const publicKeyBytes = bs58.decode(zendfiPublicKey);
  
  // Decode signature from Base64
  const signatureBytes = Buffer.from(signed.signature, 'base64');
  
  // Reconstruct signed message (canonical JSON)
  const message = JSON.stringify(signed.attestation);
  const messageBytes = new TextEncoder().encode(message);
  
  // Verify Ed25519 signature
  return nacl.sign.detached.verify(messageBytes, signatureBytes, publicKeyBytes);
}

// Verify all attestations
const audit = await zendfi.autonomy.getAttestations(delegateId);
const pubkey = audit.zendfi_attestation_public_key;

for (const signed of audit.attestations) {
  const valid = verifyAttestation(signed, pubkey);
  console.log(`Payment ${signed.attestation.payment_id}: ${valid ? '✓' : '✗'}`);
}
```

### Security Properties

| Property | Guarantee |
|----------|-----------|
| **Non-repudiation** | ZendFi cannot deny creating the attestation |
| **Tamper-evident** | Any modification invalidates the signature |
| **Replay protection** | Unique nonce per attestation |
| **Time-bound** | Timestamp for chronological ordering |
| **Auditable** | Third parties can verify independently |

### Regulatory Benefits

Attestations strengthen ZendFi's non-MSB (Money Services Business) position:

- **Cryptographic accountability** - Every spending decision is signed
- **User control evidence** - Attestations prove user-defined limits
- **Non-custodial proof** - Demonstrates ZendFi doesn't hold funds
- **Third-party verifiable** - Anyone can audit with the public key

## Environment Security

### Secret Management

```typescript
//  Good: Use environment variables or secret managers
const client = new ZendFiClient({
  api_key: process.env.ZENDFI_API_KEY,
});

//  Better: Use a secret manager
import { SecretManagerServiceClient } from '@google-cloud/secret-manager';

const secretClient = new SecretManagerServiceClient();
const [secret] = await secretClient.accessSecretVersion({
  name: 'projects/123/secrets/zendfi-api-key/versions/latest',
});

const client = new ZendFiClient({
  api_key: secret.payload.data.toString(),
});

// ❌ Bad: Hardcoded secrets
const client = new ZendFiClient({
  api_key: 'sk_live_abc123...', // NEVER do this
});
```

### Mode Separation

```typescript
// Use separate keys for test and production
const testClient = new ZendFiClient({
  api_key: process.env.ZENDFI_TEST_KEY,
  mode: 'test',
});

const prodClient = new ZendFiClient({
  api_key: process.env.ZENDFI_LIVE_KEY,
  mode: 'live',
});
```

## Security Checklist

### Before Launch

- [ ] API keys are scoped minimally
- [ ] Rate limits are configured on agent keys
- [ ] Spending limits are set on sessions
- [ ] Webhook signatures are verified
- [ ] Audit logging is enabled
- [ ] Test mode is disabled for production
- [ ] Environment variables are used for secrets

### Ongoing

- [ ] Keys are rotated every 90 days
- [ ] Audit logs are reviewed regularly
- [ ] Spending patterns are monitored
- [ ] Dependencies are kept updated

## Incident Response

If you suspect a compromised key:

```typescript
// 1. Immediately revoke the agent key
await zendfi.agent.revokeKey(compromisedKeyId);

// 2. Revoke all sessions for that agent
const sessions = await zendfi.agent.listSessions();
for (const session of sessions.filter(s => s.agent_id === 'compromised-agent')) {
  await zendfi.agent.revokeSession(session.id);
}

// 3. Review audit logs
const logs = await zendfi.audit.list({
  key_id: compromisedKeyId,
  start_date: suspectedCompromiseDate,
});

// 4. Create new key with limited scope
const newKey = await zendfi.agent.createKey({
  name: 'Replacement Key',
  agent_id: 'new-agent-v2',
  scopes: ['create_payments'], // Minimal permissions
  rate_limit_per_hour: 500,
});
```

## Compliance

### Data Handling

- ZendFi does not store full card numbers
- Wallet addresses are pseudonymous
- All data encrypted at rest (AES-256)
- All data encrypted in transit (TLS 1.3)

### Certifications

- SOC 2 Type II (in progress)
- PCI DSS compliant infrastructure
- GDPR compliant data handling

## Next Steps

- [Agent Keys](/agentic/agent-keys) - API key management
- [Device-Bound Keys](/agentic/device-bound-keys) - Secure key storage
- [Autonomous Delegation](/agentic/autonomous-delegation) - Spending controls
