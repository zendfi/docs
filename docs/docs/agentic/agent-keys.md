---
title: Agent API Keys
description: Create scoped API keys for AI agents with limited permissions
sidebar_position: 2
---

# Agent API Keys

Agent API keys (`zai_` prefix) provide limited, scoped access for AI agents to interact with ZendFi. Unlike merchant keys (`zfi_` prefix), agent keys have restricted permissions and rate limits, enabling safe delegation to autonomous systems.

## Why Use Agent Keys?

- **Security**: Agents only get the permissions they need
- **Rate Limiting**: Prevent runaway costs with hourly limits
- **Auditability**: Track which agent made each API call
- **Revocability**: Instantly revoke access without affecting other keys

## Creating an Agent Key

```typescript
import { zendfi } from '@zendfi/sdk';

const agentKey = await zendfi.agent.createKey({
  name: 'Shopping Assistant',
  agent_id: 'shopping-assistant-v1',
  scopes: ['create_payments', 'read_analytics'],
  rate_limit_per_hour: 500,
});

// IMPORTANT: Save this immediately - it won't be shown again!
console.log(agentKey.full_key); // zai_test_abc123...
console.log(agentKey.id);       // ak_xyz789...
```

:::warning Save Your Key
The `full_key` is only shown once at creation time. Store it securely - you cannot retrieve it later.
:::

## Available Scopes

| Scope | Description | Use Case |
|-------|-------------|----------|
| `full` | Full access to all APIs | Admin agents (use with caution) |
| `read_only` | Read-only access | Monitoring, dashboards |
| `create_payments` | Create new payments | Shopping agents, checkout bots |
| `create_subscriptions` | Create subscriptions | Subscription management |
| `manage_escrow` | Manage escrow transactions | Marketplace agents |
| `manage_installments` | Manage installment plans | BNPL agents |
| `read_analytics` | Access analytics data | Reporting dashboards |

### Scope Examples

**Minimal scope for a shopping assistant:**
```typescript
scopes: ['create_payments']
```

**Full access for an admin agent:**
```typescript
scopes: ['full']
// Or specific scopes:
scopes: ['create_payments', 'create_subscriptions', 'manage_escrow', 'read_analytics']
```

## Rate Limiting

Agent keys have configurable rate limits to prevent abuse:

```typescript
const agentKey = await zendfi.agent.createKey({
  name: 'High-Volume Bot',
  agent_id: 'bulk-processor',
  scopes: ['create_payments'],
  rate_limit_per_hour: 1000, // 1000 requests per hour
});
```

When the rate limit is exceeded, the API returns a `429 Too Many Requests` error with a `Retry-After` header.

## Managing Agent Keys

### List All Keys

```typescript
const keys = await zendfi.agent.listKeys();

keys.forEach(key => {
  console.log(`${key.name}: ${key.id}`);
  console.log(`  Scopes: ${key.scopes.join(', ')}`);
  console.log(`  Created: ${key.created_at}`);
  console.log(`  Last used: ${key.last_used_at || 'Never'}`);
});
```

### Revoke a Key

```typescript
await zendfi.agent.revokeKey('ak_xyz789...');
console.log('Key revoked successfully');
```

:::tip Instant Revocation
Revoking a key takes effect immediately. Any in-flight requests using the key will fail.
:::

## CLI Commands

```bash
# Create a new agent key
zendfi agent keys create --name "My Agent" --scopes create_payments

# List all agent keys
zendfi agent keys list

# Revoke a key
zendfi agent keys revoke ak_xyz789...
```

## API Reference

### Create Agent Key

```
POST /api/v1/ai/agent-keys
```

**Request:**
```json
{
  "name": "Shopping Assistant",
  "agent_id": "shopping-assistant-v1",
  "scopes": ["create_payments", "read_analytics"],
  "rate_limit_per_hour": 500
}
```

**Response:**
```json
{
  "id": "ak_xyz789...",
  "full_key": "zai_test_abc123...",
  "name": "Shopping Assistant",
  "agent_id": "shopping-assistant-v1",
  "scopes": ["create_payments", "read_analytics"],
  "rate_limit_per_hour": 500,
  "created_at": "2025-01-15T10:30:00Z"
}
```

## Best Practices

1. **One key per agent** - Create separate keys for different agents
2. **Minimal scopes** - Only grant the permissions each agent needs
3. **Conservative rate limits** - Start low and increase as needed
4. **Regular rotation** - Rotate keys periodically for security
5. **Monitor usage** - Track key usage through analytics

## Next Steps

- [Agent Sessions](/agentic/sessions) - Create spending-limited sessions
- [Autonomous Delegation](/agentic/autonomous-delegation) - Enable hands-free payments
- [Security Model](/agentic/security) - Understand the permission hierarchy
