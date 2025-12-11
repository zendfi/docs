---
title: Device-Bound Keys
description: Secure key storage using WebAuthn and TPM for agentic payments
sidebar_position: 8
---

# Device-Bound Keys

Device-Bound Keys tie cryptographic keys to specific hardware devices using WebAuthn and TPM. Even if malware compromises your system, keys cannot be extracted.

## Overview

Traditional key storage has vulnerabilities:
- **File-based**: Keys can be copied from disk
- **Memory**: Keys can be dumped from RAM
- **Environment variables**: Exposed to processes

Device-Bound Keys solve this by:
- Storing keys in hardware (TPM/Secure Enclave)
- Requiring biometric or PIN verification
- Making keys non-exportable

## How It Works

```
┌─────────────────────────────────────────────────────────────┐
│                      Your Application                        │
├─────────────────────────────────────────────────────────────┤
│                       ZendFi SDK                            │
├───────────────┬─────────────────────────┬───────────────────┤
│   WebAuthn    │    Lit Protocol MPC     │    TPM Direct     │
│  (Browser)    │   (Distributed Keys)    │   (Hardware)      │
├───────────────┴─────────────────────────┴───────────────────┤
│               Hardware Secure Elements                       │
│     ┌──────────┐    ┌──────────┐    ┌──────────┐           │
│     │   TPM    │    │  Secure  │    │ Hardware │           │
│     │  Chip    │    │ Enclave  │    │   Key    │           │
│     └──────────┘    └──────────┘    └──────────┘           │
└─────────────────────────────────────────────────────────────┘
```

## Creating a Device-Bound Key

```typescript
import { zendfi } from '@zendfi/sdk';

// Create device-bound key (prompts for biometric)
const key = await zendfi.keys.createDeviceBound({
  name: 'My Agent Key',
  type: 'webauthn',
  
  // Require biometric for signing
  user_verification: 'required',
  
  // Attach to agent
  agent_id: 'shopping-agent',
  
  // Set permissions
  permissions: ['payments', 'intents'],
  
  // Spending limits
  limits: {
    max_per_transaction: 100,
    max_per_day: 1000,
  },
});

console.log(`Key ID: ${key.id}`);
console.log(`Public Key: ${key.public_key}`);
console.log(`Device: ${key.device_info.name}`);
```

## WebAuthn Integration

For browser-based agents:

```typescript
// Initialize WebAuthn
const webauthn = await zendfi.keys.initWebAuthn({
  rp: {
    name: 'My Agent',
    id: 'myagent.com',
  },
});

// Create credential (shows biometric prompt)
const credential = await webauthn.create({
  user: {
    id: userId,
    name: 'user@example.com',
    displayName: 'User',
  },
  authenticatorSelection: {
    authenticatorAttachment: 'platform', // Use device's TPM
    userVerification: 'required',
    residentKey: 'required',
  },
});

// Register with ZendFi
const key = await zendfi.keys.registerWebAuthn({
  credential_id: credential.id,
  public_key: credential.publicKey,
  agent_id: 'browser-agent',
});
```

## Signing with Device-Bound Keys

```typescript
// Request signature (prompts for biometric)
const signature = await zendfi.keys.sign({
  key_id: key.id,
  message: transactionData,
});

// Submit signed transaction
const result = await zendfi.smart.submitSigned({
  signed_transaction: signature.signed_data,
});
```

## Lit Protocol MPC Keys

Distribute keys across Lit Protocol nodes:

```typescript
// Create MPC key (splits across Lit nodes)
const mpcKey = await zendfi.keys.createMPC({
  name: 'Distributed Agent Key',
  threshold: 2,      // 2-of-3 threshold
  node_count: 3,
  
  // Access control conditions
  access_control: {
    type: 'wallet',
    wallet: userWallet,
  },
  
  agent_id: 'secure-agent',
});

console.log(`MPC Key ID: ${mpcKey.id}`);
console.log(`PKP Address: ${mpcKey.pkp_address}`);
```

### Signing with MPC

```typescript
// Request distributed signature
const signature = await zendfi.keys.signMPC({
  key_id: mpcKey.id,
  message: transactionData,
  
  // Prove access control
  auth_sig: await zendfi.lit.getAuthSig(userWallet),
});
```

## TPM Direct Keys

For server-side agents with TPM:

```typescript
// Create TPM-bound key
const tpmKey = await zendfi.keys.createTPM({
  name: 'Server Agent Key',
  
  // TPM configuration
  tpm_path: '/dev/tpmrm0',
  pcr_selection: [0, 1, 7], // PCR registers for attestation
  
  agent_id: 'server-agent',
});

// Sign with TPM
const signature = await zendfi.keys.signTPM({
  key_id: tpmKey.id,
  message: transactionData,
});
```

## Key Types Comparison

| Type | Security | User Experience | Use Case |
|------|----------|-----------------|----------|
| WebAuthn | High | Biometric prompt | Browser agents |
| Lit MPC | Very High | No user action | Automated agents |
| TPM | Very High | No user action | Server agents |

## Device Attestation

Verify device integrity:

```typescript
const attestation = await zendfi.keys.getAttestation(key.id);

console.log(attestation);
// {
//   device: 'MacBook Pro',
//   authenticator: 'Touch ID',
//   aaguid: '...',
//   attestation_type: 'packed',
//   verified: true,
// }
```

## Key Recovery

Device-bound keys cannot be exported, but you can set up recovery:

```typescript
// Create key with recovery option
const key = await zendfi.keys.createDeviceBound({
  name: 'Recoverable Key',
  type: 'webauthn',
  
  recovery: {
    enabled: true,
    method: 'social',    // or 'seed_phrase'
    guardians: [
      guardian1Wallet,
      guardian2Wallet,
      guardian3Wallet,
    ],
    threshold: 2,        // 2-of-3 guardians to recover
  },
});

// Later: Initiate recovery
const recovery = await zendfi.keys.initiateRecovery({
  key_id: key.id,
  new_device: true,
});

// Guardians approve
await zendfi.keys.approveRecovery({
  recovery_id: recovery.id,
  guardian_signature: guardianSig,
});
```

## Rotating Keys

```typescript
// Create new key on new device
const newKey = await zendfi.keys.createDeviceBound({
  name: 'New Agent Key',
  type: 'webauthn',
  agent_id: 'my-agent',
});

// Migrate from old key
await zendfi.keys.migrate({
  from_key_id: oldKey.id,
  to_key_id: newKey.id,
  
  // Requires signature from old key
  old_key_signature: oldKeySig,
});

// Revoke old key
await zendfi.keys.revoke(oldKey.id);
```

## CLI Commands

```bash
# Create device-bound key
zendfi keys create --type webauthn --name "My Key"

# Create MPC key
zendfi keys create --type mpc --threshold 2 --nodes 3

# List keys
zendfi keys list

# Get key info
zendfi keys info key_abc123

# Sign message
zendfi keys sign --key key_abc123 --message "data"

# Revoke key
zendfi keys revoke key_abc123
```

## Browser Support

| Browser | WebAuthn Support | Platform Authenticator |
|---------|------------------|----------------------|
| Chrome | ✅ | Touch ID, Windows Hello |
| Firefox | ✅ | Touch ID, Windows Hello |
| Safari | ✅ | Touch ID, Face ID |
| Edge | ✅ | Windows Hello |

## Security Best Practices

1. **Always require user verification** for high-value operations
2. **Use platform authenticators** (Touch ID, Windows Hello) over external keys
3. **Set up recovery** before deploying to production
4. **Rotate keys periodically** (every 90 days recommended)
5. **Monitor key usage** via webhooks
6. **Use MPC for automated agents** that can't prompt users

## Webhook Events

| Event | Description |
|-------|-------------|
| `key.created` | New key registered |
| `key.used` | Key signed a message |
| `key.revoked` | Key was revoked |
| `key.recovery_initiated` | Recovery started |
| `key.recovery_completed` | Recovery finished |
| `key.attestation_verified` | Device attestation passed |

## Error Handling

```typescript
try {
  const signature = await zendfi.keys.sign({
    key_id: key.id,
    message: data,
  });
} catch (error) {
  switch (error.code) {
    case 'USER_CANCELLED':
      console.log('User cancelled biometric prompt');
      break;
    case 'DEVICE_NOT_FOUND':
      console.log('Device not available');
      break;
    case 'KEY_REVOKED':
      console.log('Key has been revoked');
      break;
    case 'ATTESTATION_FAILED':
      console.log('Device attestation failed');
      break;
    case 'NOT_ALLOWED':
      console.log('Key not permitted for this operation');
      break;
    default:
      console.log('Signing failed:', error.message);
  }
}
```

## API Reference

### Create Device-Bound Key

```
POST /api/v1/ai/keys/device-bound
```

### Create MPC Key

```
POST /api/v1/ai/keys/mpc
```

### Sign with Key

```
POST /api/v1/ai/keys/:id/sign
```

### Revoke Key

```
DELETE /api/v1/ai/keys/:id
```

## Next Steps

- [Security](/agentic/security) - Security best practices
- [Autonomous Delegation](/agentic/autonomous-delegation) - Agent spending controls
- [Sessions](/agentic/sessions) - Session-based limits
