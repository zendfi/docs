# SDK & CLI Gap Analysis: Current State vs. Agentic Intent Protocol

> **Purpose**: Comprehensive comparison of SDK/CLI implementation against the full AIP backend to identify gaps and plan upgrades.

---

## Executive Summary

| Component | Current Coverage | AIP Coverage Needed | Gap Level |
|-----------|-----------------|---------------------|-----------|
| **SDK Core Payments** | 95% | 100% | 🟢 Minor |
| **SDK Session Keys** | 60% | 100% | 🟡 Moderate |
| **SDK Autonomous Delegates** | 0% | 100% | 🔴 Critical |
| **SDK Agent API Keys** | 0% | 100% | 🔴 Critical |
| **SDK PPP Pricing** | 0% | 100% | 🔴 Critical |
| **SDK Payment Intents** | 0% | 100% | 🔴 Critical |
| **SDK Analytics** | 0% | 100% | 🟡 Moderate |
| **CLI Commands** | 40% | 100% | 🔴 Critical |
| **CLI Templates** | 30% | 100% | 🟡 Moderate |

---

## Part 1: SDK Component Analysis

### 1.1 Current SDK Structure

```
packages/sdk/src/
├── index.ts              # Exports: zendfi, ZendFiClient, types, webhooks, DeviceBoundSessionKey
├── client.ts             # ZendFiClient class (658 lines)
├── types.ts              # Type definitions (416 lines)
├── webhooks.ts           # Webhook utilities
├── device-bound-crypto.ts # Crypto primitives (833 lines)
└── device-bound-session-keys.ts # Session key manager (542 lines)
```

---

### 1.2 ZendFiClient Methods - Complete Inventory

#### ✅ Currently Implemented

| Method | Description | AIP Endpoint |
|--------|-------------|--------------|
| `createPayment()` | Create payment request | `/api/v1/payments` |
| `getPayment()` | Get payment by ID | `/api/v1/payments/:id` |
| `listPayments()` | List all payments | `/api/v1/payments` |
| `createSubscriptionPlan()` | Create subscription plan | `/api/v1/subscription-plans` |
| `createSubscription()` | Start subscription | `/api/v1/subscriptions` |
| `cancelSubscription()` | Cancel subscription | `/api/v1/subscriptions/:id/cancel` |
| `createPaymentLink()` | Create hosted payment link | `/api/v1/payment-links` |
| `createInstallmentPlan()` | Create installment plan | `/api/v1/installment-plans` |
| `listInstallmentPlans()` | List installment plans | `/api/v1/installment-plans` |
| `createEscrow()` | Create escrow | `/api/v1/escrows` |
| `approveEscrow()` | Release escrow | `/api/v1/escrows/:id/approve` |
| `refundEscrow()` | Refund escrow | `/api/v1/escrows/:id/refund` |
| `disputeEscrow()` | Dispute escrow | `/api/v1/escrows/:id/dispute` |
| `createInvoice()` | Create invoice | `/api/v1/invoices` |
| `verifyWebhook()` | Verify webhook signature | N/A (client-side) |

#### 🔴 NOT Implemented (AIP Features)

| Method Needed | Description | AIP Endpoint | Priority |
|--------------|-------------|--------------|----------|
| `createAgentApiKey()` | Create agent API key (zai_) | `/api/v1/agent-keys` | **P0** |
| `listAgentApiKeys()` | List agent API keys | `/api/v1/agent-keys` | **P0** |
| `revokeAgentApiKey()` | Revoke agent key | `/api/v1/agent-keys/:id/revoke` | **P0** |
| `createAgentSession()` | Create AI agent session | `/api/v1/ai/sessions` | **P0** |
| `listAgentSessions()` | List agent sessions | `/api/v1/ai/sessions` | **P1** |
| `getAgentSession()` | Get session details | `/api/v1/ai/sessions/:id` | **P1** |
| `revokeAgentSession()` | Revoke agent session | `/api/v1/ai/sessions/:id/revoke` | **P1** |
| `smartPayment()` | AI smart payment routing | `/api/v1/ai/smart-payment` | **P0** |
| `getPPPFactor()` | Get PPP factor for country | `/api/v1/ai/pricing/ppp-factor` | **P1** |
| `listPPPFactors()` | List all PPP factors | `/api/v1/ai/pricing/ppp-factors` | **P2** |
| `getPricingSuggestion()` | AI pricing suggestion | `/api/v1/ai/pricing/suggest` | **P1** |
| `createPaymentIntent()` | Create payment intent | `/api/v1/payment-intents` | **P0** |
| `getPaymentIntent()` | Get payment intent | `/api/v1/payment-intents/:id` | **P1** |
| `listPaymentIntents()` | List payment intents | `/api/v1/payment-intents` | **P1** |
| `confirmPaymentIntent()` | Confirm payment intent | `/api/v1/payment-intents/:id/confirm` | **P0** |
| `cancelPaymentIntent()` | Cancel payment intent | `/api/v1/payment-intents/:id/cancel` | **P1** |
| `getAgentAnalytics()` | Get agent analytics | `/api/v1/analytics/agents` | **P2** |

---

### 1.3 Device-Bound Session Keys - Complete Inventory

#### ✅ Currently Implemented in `ZendFiSessionKeyManager`

| Method | Description | Backend Endpoint |
|--------|-------------|------------------|
| `createSessionKey()` | Create device-bound session key | `/api/v1/ai/session-keys/device-bound/create` |
| `loadSessionKey()` | Load encrypted session key | `/api/v1/ai/session-keys/device-bound/get-encrypted` |
| `makePayment()` | Sign and submit payment | `/api/v1/ai/payments/:id/submit-signed` |
| `recoverSessionKey()` | Recover from QR code | `/api/v1/ai/session-keys/device-bound/:id/recover` |
| `revokeSessionKey()` | Revoke session key | `/api/v1/ai/session-keys/revoke` |
| `unlockSessionKey()` | Decrypt and cache keypair | N/A (client-side) |
| `clearCache()` | Clear cached keypair | N/A (client-side) |
| `getStatus()` | Get session key status | `/api/v1/ai/session-keys/status` |

#### ✅ Currently Implemented in `DeviceBoundSessionKey` (Crypto)

| Method | Description |
|--------|-------------|
| `DeviceBoundSessionKey.create()` | Generate keypair + encrypt with PIN |
| `signTransaction()` | Sign Solana transaction |
| `isCached()` | Check if keypair is cached |
| `unlockWithPin()` | Decrypt and cache without signing |
| `clearCache()` | Clear cached keypair |
| `getRecoveryQR()` | Get recovery QR data |
| `getPublicKey()` | Get session key public key |
| `getDeviceFingerprint()` | Get device fingerprint |

#### 🔴 NOT Implemented (AIP Autonomous Features)

| Method Needed | Description | Backend Endpoint | Priority |
|--------------|-------------|------------------|----------|
| `enableAutonomousDelegation()` | Enable autonomous signing | `/api/v1/ai/session-keys/:id/enable-autonomy` | **P0** |
| `revokeAutonomousDelegation()` | Revoke autonomous mode | `/api/v1/ai/session-keys/:id/revoke-autonomy` | **P0** |
| `getAutonomyStatus()` | Get autonomy status | `/api/v1/ai/session-keys/:id/autonomy-status` | **P1** |
| `createDelegationSignature()` | Create Ed25519 delegation sig | N/A (client-side) | **P0** |
| `encryptWithLitProtocol()` | Encrypt keypair for Lit | N/A (client-side) | **P0** |

---

### 1.4 Type Definitions Gap Analysis

#### ✅ Currently Defined in `types.ts`

```typescript
// Payments
Payment, PaymentRequest, PaymentStatus, Token, ListPaymentsRequest

// Subscriptions  
SubscriptionPlan, CreateSubscriptionPlanRequest, Subscription, CreateSubscriptionRequest

// Payment Links
PaymentLink, CreatePaymentLinkRequest

// Installments
InstallmentPlan, CreateInstallmentPlanRequest, InstallmentPayment

// Escrow
Escrow, CreateEscrowRequest, EscrowDispute

// Invoices
Invoice, CreateInvoiceRequest

// Webhooks
WebhookEvent, WebhookPayload
```

#### 🔴 Missing Types for AIP

```typescript
// Agent API Keys
interface AgentApiKey {
  id: string;
  name: string;
  key_prefix: string;
  permissions: AgentPermission[];
  spending_limit_usd?: number;
  rate_limit_per_minute?: number;
  created_at: string;
  last_used_at?: string;
  mode: 'test' | 'live';
}

type AgentPermission = 
  | 'payments:read' 
  | 'payments:write' 
  | 'session_keys:read' 
  | 'session_keys:write'
  | 'autonomy:enable'
  | 'analytics:read';

interface CreateAgentApiKeyRequest {
  name: string;
  permissions: AgentPermission[];
  spending_limit_usd?: number;
  rate_limit_per_minute?: number;
  metadata?: Record<string, unknown>;
}

// Agent Sessions
interface AgentSession {
  id: string;
  agent_api_key_id: string;
  session_key_id?: string;
  spending_limit_usd: number;
  spent_usd: number;
  remaining_usd: number;
  expires_at: string;
  created_at: string;
  status: 'active' | 'expired' | 'revoked';
}

interface CreateAgentSessionRequest {
  spending_limit_usd: number;
  duration_hours?: number;
  session_key_id?: string;
  metadata?: Record<string, unknown>;
}

// Payment Intents
interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: 'requires_payment_method' | 'requires_confirmation' | 'processing' | 'succeeded' | 'canceled';
  payment_method?: string;
  customer_email?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  confirmed_at?: string;
}

interface CreatePaymentIntentRequest {
  amount: number;
  currency?: string;
  token?: Token;
  customer_email?: string;
  metadata?: Record<string, unknown>;
  confirm?: boolean;
}

// PPP Pricing
interface PPPFactor {
  country_code: string;
  country_name: string;
  ppp_factor: number;
  discount_percentage: number;
  min_discount: number;
  max_discount: number;
  updated_at: string;
}

interface PricingSuggestion {
  original_price_usd: number;
  country_code: string;
  ppp_factor: number;
  suggested_price_usd: number;
  discount_percentage: number;
  savings_usd: number;
}

// Smart Payments
interface SmartPaymentRequest {
  amount: number;
  recipient_wallet?: string;
  description?: string;
  token?: Token;
  auto_ppp?: boolean;
  customer_country?: string;
  metadata?: Record<string, unknown>;
}

interface SmartPaymentResponse {
  payment_id: string;
  transaction_signature?: string;
  amount_usd: number;
  final_amount_usd: number;
  ppp_discount_applied: boolean;
  ppp_factor?: number;
  status: string;
}

// Autonomous Delegates
interface AutonomousDelegate {
  id: string;
  session_key_id: string;
  max_amount_usd: number;
  spent_usd: number;
  remaining_usd: number;
  expires_at: string;
  created_at: string;
  revoked_at?: string;
  lit_protocol_enabled: boolean;
  delegation_signature: string;
}

interface EnableAutonomyRequest {
  max_amount_usd: number;
  duration_hours: number;
  delegation_signature: string;
  expires_at?: string;
  lit_encrypted_keypair?: string;
  lit_data_hash?: string;
  metadata?: Record<string, unknown>;
}

interface EnableAutonomyResponse {
  delegate_id: string;
  session_key_id: string;
  max_amount_usd: number;
  expires_at: string;
  delegate_public_key: string;
  autonomous_mode_enabled: boolean;
  lit_protocol_enabled: boolean;
  requires_lit_for_auto_sign?: boolean;
}

// Agent Analytics
interface AgentAnalytics {
  total_payments: number;
  total_volume_usd: number;
  average_payment_usd: number;
  success_rate: number;
  active_sessions: number;
  active_delegates: number;
  ppp_savings_usd: number;
  payments_by_token: Record<Token, number>;
  payments_by_day: Array<{ date: string; count: number; volume_usd: number }>;
}
```

---

## Part 2: CLI Component Analysis

### 2.1 Current CLI Structure

```
packages/cli/src/
├── index.ts              # Entry point, command registration
├── commands/
│   ├── create.ts         # create-zendfi-app scaffolder (200 lines)
│   ├── init.ts           # Add ZendFi to existing project (208 lines)
│   ├── keys.ts           # API key management (311 lines)
│   ├── status.ts         # Check connection status
│   ├── test.ts           # Run test payments
│   └── webhooks.ts       # Webhook listener (247 lines)
├── templates/            # Project templates
│   ├── nextjs-ecommerce/
│   ├── nextjs-saas/
│   └── express-api/
└── utils/                # Utilities
```

### 2.2 CLI Commands - Complete Inventory

#### ✅ Currently Implemented

| Command | Description | Functionality |
|---------|-------------|---------------|
| `zendfi create <name>` | Create new project | Scaffold from templates |
| `zendfi init` | Add to existing project | Install SDK, create files |
| `zendfi keys list` | List API keys | Fetch `/merchants/me/api-keys` |
| `zendfi keys create` | Create API key | Interactive creation |
| `zendfi keys rotate` | Rotate API key | Key rotation |
| `zendfi status` | Check connection | Verify API connectivity |
| `zendfi test` | Run test payment | Create test payment |
| `zendfi webhooks listen` | Local webhook listener | Tunnel + local server |

#### 🔴 NOT Implemented (AIP Commands)

| Command Needed | Description | Priority |
|---------------|-------------|----------|
| `zendfi agent keys create` | Create agent API key | **P0** |
| `zendfi agent keys list` | List agent API keys | **P0** |
| `zendfi agent keys revoke <id>` | Revoke agent key | **P1** |
| `zendfi agent sessions create` | Create agent session | **P1** |
| `zendfi agent sessions list` | List agent sessions | **P1** |
| `zendfi agent analytics` | View agent analytics | **P2** |
| `zendfi session-keys create` | Create session key (wizard) | **P0** |
| `zendfi session-keys enable-autonomy` | Enable autonomous mode | **P0** |
| `zendfi session-keys status <id>` | Check session key status | **P1** |
| `zendfi ppp factors` | List PPP factors | **P2** |
| `zendfi ppp check <country>` | Check PPP for country | **P2** |
| `zendfi intents create` | Create payment intent | **P1** |
| `zendfi intents confirm <id>` | Confirm payment intent | **P1** |

### 2.3 Templates Gap Analysis

#### ✅ Current Templates

| Template | Framework | AIP Features |
|----------|-----------|--------------|
| `nextjs-ecommerce` | Next.js 14 | Basic payments, webhooks |
| `nextjs-saas` | Next.js 14 | Subscriptions, basic payments |
| `express-api` | Express.js | Backend payments |

#### 🔴 Missing AIP Template Features

| Template Update | Features to Add | Priority |
|-----------------|-----------------|----------|
| `nextjs-ecommerce` | PPP pricing, Payment intents | **P1** |
| `nextjs-saas` | Agent API keys, Session keys | **P0** |
| `express-api` | Autonomous delegates, Smart payments | **P0** |
| **NEW** `nextjs-agentic` | Full AIP: session keys, delegates, Lit Protocol | **P0** |
| **NEW** `ai-agent-starter` | Agent SDK boilerplate for AI agents | **P0** |

---

## Part 3: Critical Missing Capabilities

### 3.1 Autonomous Delegation (THE BIG GAP)

**Current State**: SDK has device-bound session keys but NO autonomous delegation.

**What's Missing**:
1. **Delegation Signature Creation** - Client-side Ed25519 signing
2. **Lit Protocol Integration** - Encrypting keypair for threshold crypto
3. **Enable Autonomy API Call** - `POST /api/v1/ai/session-keys/:id/enable-autonomy`
4. **Revoke Autonomy API Call** - `POST /api/v1/ai/session-keys/:id/revoke-autonomy`
5. **Autonomy Status Check** - `GET /api/v1/ai/session-keys/:id/autonomy-status`

**Impact**: Without this, agents cannot operate autonomously (the core AIP value prop).

### 3.2 Agent API Keys (`zai_` prefix)

**Current State**: SDK only supports merchant API keys (`zfi_test_`, `zfi_live_`).

**What's Missing**:
1. Agent key creation
2. Agent key scoping (permissions)
3. Agent key rate limits
4. Agent session management

**Impact**: AI agents cannot have scoped, auditable access.

### 3.3 PPP Pricing

**Current State**: SDK has zero PPP support.

**What's Missing**:
1. PPP factor lookup
2. Pricing suggestions
3. Auto-PPP in smart payments

**Impact**: Missing 20-60% discounts for emerging markets = lost customers.

### 3.4 Payment Intents

**Current State**: SDK only has `createPayment()` (single-step).

**What's Missing**:
1. Two-phase payment flow (create + confirm)
2. Payment method attachment
3. Intent cancellation
4. Intent events

**Impact**: Cannot support modern checkout flows.

---

## Part 4: Detailed Gap Summary

### SDK Gaps by Category

| Category | Methods Implemented | Methods Missing | % Complete |
|----------|--------------------:|----------------:|-----------:|
| Basic Payments | 3 | 0 | 100% |
| Subscriptions | 3 | 0 | 100% |
| Installments | 2 | 0 | 100% |
| Escrow | 4 | 0 | 100% |
| Invoices | 1 | 0 | 100% |
| Payment Links | 1 | 0 | 100% |
| Agent API Keys | 0 | 3 | 0% |
| Agent Sessions | 0 | 4 | 0% |
| Payment Intents | 0 | 5 | 0% |
| PPP Pricing | 0 | 3 | 0% |
| Smart Payments | 0 | 1 | 0% |
| Analytics | 0 | 1 | 0% |
| Session Keys (Device) | 8 | 0 | 100% |
| Autonomous Delegates | 0 | 5 | 0% |

**Total: 22 implemented, 22 missing = 50% complete**

### CLI Gaps by Category

| Category | Commands Implemented | Commands Missing | % Complete |
|----------|--------------------:|-----------------:|-----------:|
| Project Scaffolding | 2 | 0 | 100% |
| API Key Management | 3 | 4 | 43% |
| Agent Management | 0 | 6 | 0% |
| Session Keys | 0 | 3 | 0% |
| Payment Intents | 0 | 2 | 0% |
| PPP Pricing | 0 | 2 | 0% |
| Testing/Status | 2 | 0 | 100% |
| Webhooks | 1 | 0 | 100% |

**Total: 8 implemented, 17 missing = 32% complete**

---

## Part 5: File-by-File Changes Required

### 5.1 SDK Files to Modify

| File | Changes Required | Complexity |
|------|-----------------|------------|
| `client.ts` | Add 17 new methods | Medium |
| `types.ts` | Add ~20 new types/interfaces | Low |
| `device-bound-session-keys.ts` | Add 5 autonomous methods | High |
| `device-bound-crypto.ts` | Add Lit Protocol encryption | High |
| `index.ts` | Export new modules | Low |

### 5.2 New SDK Files to Create

| File | Purpose | Complexity |
|------|---------|------------|
| `agent-keys.ts` | Agent API key management | Medium |
| `agent-sessions.ts` | Agent session management | Medium |
| `payment-intents.ts` | Payment intent flows | Medium |
| `ppp-pricing.ts` | PPP pricing utilities | Low |
| `lit-protocol.ts` | Lit Protocol integration | High |
| `delegation.ts` | Ed25519 delegation signatures | Medium |

### 5.3 CLI Files to Modify

| File | Changes Required | Complexity |
|------|-----------------|------------|
| `index.ts` | Register new commands | Low |
| `keys.ts` | Add agent key subcommands | Medium |

### 5.4 New CLI Files to Create

| File | Purpose | Complexity |
|------|---------|------------|
| `commands/agent.ts` | Agent management commands | Medium |
| `commands/session-keys.ts` | Session key wizard | High |
| `commands/intents.ts` | Payment intent commands | Medium |
| `commands/ppp.ts` | PPP lookup commands | Low |
| `templates/nextjs-agentic/` | Full AIP template | High |
| `templates/ai-agent-starter/` | Agent SDK boilerplate | Medium |

---

## Part 6: Risk Assessment

### High-Risk Areas

1. **Lit Protocol Integration**
   - External dependency on Lit Protocol SDK
   - Browser vs Node.js environment differences
   - Threshold crypto is complex
   - **Mitigation**: Comprehensive testing, fallback to client-signed

2. **Ed25519 Delegation Signatures**
   - Must match backend verification exactly
   - Message format must be identical
   - **Mitigation**: Share test vectors with backend

3. **Backward Compatibility**
   - Existing SDK users must not break
   - New features must be opt-in
   - **Mitigation**: Additive API changes only

### Medium-Risk Areas

1. **CLI Command Structure**
   - Don't want to overwhelm users
   - Balance power vs simplicity
   - **Mitigation**: Progressive disclosure, good defaults

2. **Template Maintenance**
   - More templates = more maintenance
   - Framework updates can break templates
   - **Mitigation**: Focus on 2-3 high-quality templates

---

## Part 7: Dependencies Analysis

### New npm Dependencies Required

| Package | Purpose | Size Impact |
|---------|---------|-------------|
| `@lit-protocol/lit-node-client` | Lit Protocol client | ~500KB |
| `@lit-protocol/constants` | Lit constants | ~10KB |
| `@lit-protocol/crypto` | Lit crypto utils | ~50KB |
| `@solana/web3.js` | Already have, but may need upgrade | N/A |
| `tweetnacl` | Ed25519 signing (if not using solana-web3.js) | ~20KB |

### Bundle Size Consideration

- Current SDK: ~150KB
- With Lit Protocol: ~700KB
- **Strategy**: Make Lit Protocol optional/tree-shakeable

---

*Document generated: Analysis complete*
*Next step: Create upgrade gameplan with prioritized phases*
