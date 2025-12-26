# Agent-Scoped Session Keys: Eliminating Liquidity Fragmentation

## The Problem

**Before (Merchant-Scoped):**
```
User has "Shopping Assistant" agent running on:
- Amazon App → Creates session key #1 with $100
- Walmart App → Creates session key #2 with $100
- Target App → Creates session key #3 with $100

Result: $300 total locked up, but each app can only access $100
```

**Issue:** Liquidity fragmentation - user has to manage multiple session keys for the same agent.

## The Solution

**After (Agent-Scoped):**
```
User authorizes "Shopping Assistant" agent with $300 once

"Shopping Assistant" (agent_id: "shopping-assistant-v1") now works across:
- Amazon App (merchant_1) ✅
- Walmart App (merchant_2) ✅  
- Target App (merchant_3) ✅

Result: One $300 session key, shared balance, zero fragmentation
```

## User Experience

The user **never thinks about "session keys"** - they only see:

```
┌─────────────────────────────────────────────┐
│  Authorize AI Shopping Assistant            │
│                                             │
│  💰 Spending Limit: $300                    │
│  ⏰ Valid for: 7 days                       │
│  🌍 Works across all shopping apps          │
│                                             │
│  [Approve] [Cancel]                         │
└─────────────────────────────────────────────┘
```

### What Happens Behind the Scenes

1. **First Use (Amazon App):**
   ```typescript
   // Amazon creates session key with agent_id
   const sessionKey = await zendfi.sessionKeys.create({
     user_wallet: "7xKN...",
     agent_id: "shopping-assistant-v1",
     agent_name: "AI Shopping Assistant",
     limit_usdc: 300,
     duration_days: 7
   });
   ```

2. **Second Use (Walmart App):**
   ```typescript
   // Walmart tries to create session key
   const sessionKey = await zendfi.sessionKeys.create({
     user_wallet: "7xKN...",
     agent_id: "shopping-assistant-v1",  // Same agent!
     agent_name: "AI Shopping Assistant",
     limit_usdc: 300,
     duration_days: 7
   });
   
   // Response: "Session key already exists for this agent"
   // Returns existing session_key_id
   ```

3. **Both Apps Use Same Key:**
   ```typescript
   // Amazon makes payment
   await zendfi.payments.create({
     amount: 29.99,
     session_key_id: "sk_abc123",
     agent_id: "shopping-assistant-v1"
   });
   // Balance: $270.01 remaining
   
   // Walmart makes payment (same session key!)
   await zendfi.payments.create({
     amount: 50.00,
     session_key_id: "sk_abc123",
     agent_id: "shopping-assistant-v1"
   });
   // Balance: $220.01 remaining
   ```

## Technical Architecture

### Database Schema

```sql
-- Session keys are now (user_wallet, agent_id) scoped
CREATE TABLE session_keys (
    id UUID PRIMARY KEY,
    
    -- Agent identification (primary scope)
    agent_id VARCHAR(255) NOT NULL,
    agent_name VARCHAR(255),
    user_wallet VARCHAR(44) NOT NULL,
    
    -- Merchant info (for auditing, not authorization)
    created_by_merchant_id UUID,
    authorized_merchants JSONB DEFAULT '[]',
    
    -- Spending limits
    limit_usdc DECIMAL(20, 2),
    used_amount_usdc DECIMAL(20, 2),
    
    -- One active session per (user, agent)
    CONSTRAINT unique_user_agent UNIQUE (user_wallet, agent_id) 
        WHERE is_active = TRUE
);

-- Track which merchant spent from shared session key
CREATE TABLE session_key_merchant_usage (
    id UUID PRIMARY KEY,
    session_key_id UUID NOT NULL,
    merchant_id UUID NOT NULL,
    agent_id VARCHAR(255) NOT NULL,
    amount_usd DECIMAL(20, 8),
    payment_id UUID,
    created_at TIMESTAMPTZ
);
```

### API Changes

#### Creating Session Keys

**Old API (Merchant-Scoped):**
```typescript
POST /api/v1/ai/session-keys/create
{
  "user_wallet": "7xKN...",
  "limit_usdc": 300,
  "duration_days": 7
}
```

**New API (Agent-Scoped):**
```typescript
POST /api/v1/ai/session-keys/create
{
  "user_wallet": "7xKN...",
  "agent_id": "shopping-assistant-v1",        // NEW: Required
  "agent_name": "AI Shopping Assistant",       // NEW: Optional
  "limit_usdc": 300,
  "duration_days": 7
}

// Response:
{
  "session_key_id": "sk_abc123",
  "agent_id": "shopping-assistant-v1",
  "cross_app_compatible": true,               // NEW: Indicates cross-app usage
  "instructions": {
    "step_1": "Sign this transaction...",
    "step_2": "Agent can make payments across ALL compatible apps",  // NEW
    "step_3": "Works across multiple apps using the same agent"      // NEW
  }
}
```

#### Handling Existing Session Keys

```typescript
// When a second app tries to create session key:

// 1. Check if session key already exists
const existing = await findExistingAgentSession(
  userWallet, 
  agentId
);

if (existing) {
  // Return existing session key instead of creating new one
  return {
    session_key_id: existing.id,
    already_authorized: true,
    message: "Using existing session key for this agent"
  };
}

// 2. Create new session key only if none exists
const newKey = await createAgentSessionKey(...);
```

## Security Model

### Authorization Levels

1. **Open (Default):**
   - Any app with matching `agent_id` can use the session key
   - No explicit merchant authorization needed
   - User trusts the agent identity, not individual apps

2. **Restricted (Optional):**
   ```typescript
   // User can explicitly limit which merchants can use the key
   await zendfi.sessionKeys.authorizeApp({
     session_key_id: "sk_abc123",
     merchant_id: "merchant_xyz",
     signature: userSignature  // User's wallet signature
   });
   ```

### Audit Trail

Every payment tracks:
- `session_key_id` - Which session key was used
- `merchant_id` - Which app made the payment
- `agent_id` - Which agent authorized it
- `amount` - How much was spent

```sql
-- User can see spending breakdown by app
SELECT 
    m.merchant_name,
    SUM(skmu.amount_usd) as total_spent,
    COUNT(*) as payment_count
FROM session_key_merchant_usage skmu
JOIN merchants m ON skmu.merchant_id = m.id
WHERE skmu.session_key_id = 'sk_abc123'
GROUP BY m.merchant_name;

-- Example output:
-- Amazon: $150.00 (5 payments)
-- Walmart: $75.00 (3 payments)
-- Target: $50.00 (2 payments)
```

## Migration Strategy

### Backwards Compatibility

Old merchant-scoped session keys continue to work:

```sql
-- Old keys (no agent_id)
SELECT * FROM session_keys WHERE agent_id IS NULL;
-- → Still scoped to merchant_id

-- New keys (with agent_id)
SELECT * FROM session_keys WHERE agent_id IS NOT NULL;
-- → Scoped to (user_wallet, agent_id)
```

### Gradual Rollout

**Phase 1:** Make `agent_id` optional
- Existing integrations keep working
- New integrations can use agent-scoped keys

**Phase 2:** Encourage migration
- Show warnings for merchant-scoped keys
- Highlight benefits of agent-scoped keys

**Phase 3:** Make `agent_id` required
- All new session keys must be agent-scoped
- Old merchant-scoped keys deprecated

## Benefits

### For Users
✅ **One authorization per agent** - not per app  
✅ **No liquidity fragmentation** - single shared balance  
✅ **Simpler mental model** - "authorize agent" not "manage session keys"  
✅ **Cross-app convenience** - agent works everywhere  

### For Developers
✅ **Better UX** - users don't abandon due to re-authorization  
✅ **Higher conversion** - no friction when user already authorized agent  
✅ **Shared liquidity** - users have more to spend per app  
✅ **Standardized agent IDs** - ecosystem interoperability  

### For the Ecosystem
✅ **Agent portability** - same agent works across platforms  
✅ **Network effects** - more apps = more utility for users  
✅ **Reduced waste** - no locked-up funds in unused session keys  

## Example: Real-World Flow

### Scenario: User Shops Across Multiple Apps

```typescript
// Day 1: User shops on Amazon
const user = "7xKNH6ttXQfJpAoDW1p7zGMKS7kGvXZ4XG7fCcUjU86Y";

// Amazon (merchant_1) creates session key
await zendfi.sessionKeys.create({
  user_wallet: user,
  agent_id: "shopping-assistant-v1",
  limit_usdc: 500
});
// User approves → $500 authorized

// Amazon makes purchases
await pay({ amount: 80, agent_id: "shopping-assistant-v1" });  // $420 left
await pay({ amount: 45, agent_id: "shopping-assistant-v1" });  // $375 left

// Day 2: User tries Walmart app
// Walmart (merchant_2) requests session key
const result = await zendfi.sessionKeys.create({
  user_wallet: user,
  agent_id: "shopping-assistant-v1",  // Same agent!
  limit_usdc: 500
});

// Response: { already_exists: true, remaining_balance: 375 }
// No new authorization needed! ✨

// Walmart makes purchases from same balance
await pay({ amount: 120, agent_id: "shopping-assistant-v1" }); // $255 left

// Day 3: User tries Target app
// Target (merchant_3) uses same session key
await pay({ amount: 90, agent_id: "shopping-assistant-v1" });  // $165 left

// Final state:
// - One session key with $165 remaining
// - Used by 3 different merchants
// - Zero liquidity fragmentation ✅
```

## Best Practices

### Agent ID Naming

Use consistent, versioned agent IDs:

```typescript
// Good ✅
"shopping-assistant-v1"
"travel-planner-v2"
"crypto-advisor-v1"

// Bad ❌
"my-agent"
"agent123"
"shopping"  // Too generic
```

### Handling Version Updates

When updating agent logic, decide on compatibility:

```typescript
// Breaking change → new agent ID
"shopping-assistant-v1" → "shopping-assistant-v2"
// Requires new user authorization

// Non-breaking change → keep same agent ID
"shopping-assistant-v1" (update deployment)
// Existing session keys still work
```

### Top-Up Flow

When balance runs low:

```typescript
// Check remaining balance
const status = await zendfi.sessionKeys.getStatus(sessionKeyId);
if (status.remaining_usdc < 50) {
  // Initiate top-up
  const topUp = await zendfi.sessionKeys.topUp({
    session_key_id: sessionKeyId,
    amount_usdc: 200
  });
  
  // User signs one transaction → balance increased
  // All apps using this agent_id see updated balance ✨
}
```

## Conclusion

Agent-scoped session keys transform the UX from:
- ❌ "Authorize payment for each app I use"

To:
- ✅ "Authorize my AI assistant once, use it everywhere"

This eliminates liquidity fragmentation, reduces user friction, and enables true cross-app agent interoperability.
