# SDK & CLI Upgrade Gameplan: Path to Full AIP Capacity

> **Objective**: Upgrade SDK and CLI to full Agentic Intent Protocol capacity while maintaining the "super easy to use" reputation.

---

## Guiding Principles

### 1. Progressive Complexity
```
Simple → Intermediate → Advanced

zendfi.createPayment()           // Everyone starts here (no change)
zendfi.agent.createSession()     // Agents graduate to this
zendfi.autonomy.enable()         // Power users unlock this
```

### 2. Zero Breaking Changes
- All existing SDK methods remain unchanged
- New features are additive only
- Default behaviors stay the same

### 3. Opt-in Complexity
- Basic usage requires no new knowledge
- Advanced features discoverable but not forced
- TypeScript guides developers naturally

### 4. "Pit of Success" Design
- Easy things are easy
- Hard things are possible
- Wrong things are hard/impossible

---

## Phase 1: Foundation (Week 1-2)

### Goal: Add missing types and core infrastructure

### 1.1 SDK: Types & Interfaces

**File**: `packages/sdk/src/types.ts`

Add all missing types (see Gap Analysis Part 1.4):

```typescript
// === Agent API Keys ===
export interface AgentApiKey { ... }
export type AgentPermission = 'payments:read' | 'payments:write' | ...;
export interface CreateAgentApiKeyRequest { ... }

// === Agent Sessions ===
export interface AgentSession { ... }
export interface CreateAgentSessionRequest { ... }

// === Payment Intents ===
export interface PaymentIntent { ... }
export interface CreatePaymentIntentRequest { ... }

// === PPP Pricing ===
export interface PPPFactor { ... }
export interface PricingSuggestion { ... }

// === Autonomous Delegates ===
export interface AutonomousDelegate { ... }
export interface EnableAutonomyRequest { ... }
export interface EnableAutonomyResponse { ... }

// === Smart Payments ===
export interface SmartPaymentRequest { ... }
export interface SmartPaymentResponse { ... }

// === Analytics ===
export interface AgentAnalytics { ... }
```

**Effort**: 2-3 hours
**Risk**: Low

### 1.2 SDK: Namespace Structure

**File**: `packages/sdk/src/client.ts`

Introduce namespaced API for new features:

```typescript
class ZendFiClient {
  // Existing methods stay at root
  createPayment() { ... }
  getPayment() { ... }
  
  // New features in namespaces
  readonly agent: AgentAPI;
  readonly intents: PaymentIntentsAPI;
  readonly pricing: PricingAPI;
  readonly autonomy: AutonomyAPI;
  
  constructor(options: ZendFiOptions) {
    this.agent = new AgentAPI(this);
    this.intents = new PaymentIntentsAPI(this);
    this.pricing = new PricingAPI(this);
    this.autonomy = new AutonomyAPI(this);
  }
}

// Usage stays clean
zendfi.createPayment()          // Still works!
zendfi.agent.createKey()        // New capability
zendfi.intents.create()         // New capability
zendfi.pricing.getPPPFactor()   // New capability
```

**Effort**: 4-6 hours
**Risk**: Low (additive)

---

## Phase 2: Agent Infrastructure (Week 2-3)

### Goal: Full agent API key and session support

### 2.1 SDK: Agent API Keys

**New File**: `packages/sdk/src/agent-keys.ts`

```typescript
export class AgentAPI {
  constructor(private client: ZendFiClient) {}

  /**
   * Create a new agent API key with scoped permissions
   * 
   * @example
   * ```typescript
   * const agentKey = await zendfi.agent.createKey({
   *   name: 'Shopping Assistant',
   *   permissions: ['payments:write', 'session_keys:write'],
   *   spending_limit_usd: 100,
   * });
   * // => { id: 'ak_...', key: 'zai_test_...', ... }
   * ```
   */
  async createKey(request: CreateAgentApiKeyRequest): Promise<AgentApiKey> { ... }

  async listKeys(): Promise<AgentApiKey[]> { ... }
  async revokeKey(keyId: string): Promise<void> { ... }
  
  // Sessions
  async createSession(request: CreateAgentSessionRequest): Promise<AgentSession> { ... }
  async listSessions(): Promise<AgentSession[]> { ... }
  async getSession(sessionId: string): Promise<AgentSession> { ... }
  async revokeSession(sessionId: string): Promise<void> { ... }
  
  // Analytics
  async getAnalytics(): Promise<AgentAnalytics> { ... }
}
```

**Effort**: 6-8 hours
**Risk**: Medium

### 2.2 CLI: Agent Commands

**New File**: `packages/cli/src/commands/agent.ts`

```bash
# Create agent key (interactive wizard)
$ zendfi agent keys create
? Agent name: Shopping Assistant
? Permissions: (select with space)
  ❯ ◉ payments:write
    ◉ session_keys:write
    ◯ autonomy:enable
? Spending limit (USD): 100

✅ Created agent key: zai_test_abc123...
   Name: Shopping Assistant
   Permissions: payments:write, session_keys:write
   Limit: $100/session

⚠️  Save this key now - it won't be shown again!

# List agent keys
$ zendfi agent keys list

# Create agent session
$ zendfi agent sessions create --key zai_test_... --limit 50

# View analytics
$ zendfi agent analytics
```

**Effort**: 8-10 hours
**Risk**: Low

---

## Phase 3: Payment Intents (Week 3-4)

### Goal: Two-phase payment flow for modern checkouts

### 3.1 SDK: Payment Intents API

**New File**: `packages/sdk/src/payment-intents.ts`

```typescript
export class PaymentIntentsAPI {
  /**
   * Create a payment intent (step 1 of 2-phase flow)
   * 
   * @example
   * ```typescript
   * // Step 1: Create intent (holds amount, no charge yet)
   * const intent = await zendfi.intents.create({
   *   amount: 99.99,
   *   customer_email: 'user@example.com',
   * });
   * 
   * // Step 2: Confirm when ready (charges the customer)
   * await zendfi.intents.confirm(intent.id);
   * ```
   */
  async create(request: CreatePaymentIntentRequest): Promise<PaymentIntent> { ... }
  async get(intentId: string): Promise<PaymentIntent> { ... }
  async list(options?: ListOptions): Promise<PaymentIntent[]> { ... }
  async confirm(intentId: string): Promise<PaymentIntent> { ... }
  async cancel(intentId: string): Promise<PaymentIntent> { ... }
  async getEvents(intentId: string): Promise<PaymentIntentEvent[]> { ... }
}
```

**Effort**: 4-6 hours
**Risk**: Low

### 3.2 CLI: Intent Commands

**New File**: `packages/cli/src/commands/intents.ts`

```bash
$ zendfi intents create --amount 99.99 --email user@example.com
✅ Created intent: pi_abc123
   Amount: $99.99
   Status: requires_confirmation

$ zendfi intents confirm pi_abc123
✅ Intent confirmed and processing
```

**Effort**: 3-4 hours
**Risk**: Low

---

## Phase 4: PPP Pricing (Week 4)

### Goal: Enable geo-aware pricing for global reach

### 4.1 SDK: Pricing API

**New File**: `packages/sdk/src/pricing.ts`

```typescript
export class PricingAPI {
  /**
   * Get PPP factor for a country
   * 
   * @example
   * ```typescript
   * const factor = await zendfi.pricing.getPPPFactor('BR');
   * // => { country_code: 'BR', ppp_factor: 0.42, discount: 35% }
   * 
   * const suggestedPrice = 100 * factor.ppp_factor; // $42
   * ```
   */
  async getPPPFactor(countryCode: string): Promise<PPPFactor> { ... }
  
  /**
   * Get AI-powered pricing suggestion
   */
  async getSuggestion(basePrice: number, countryCode: string): Promise<PricingSuggestion> { ... }
  
  /**
   * List all available PPP factors
   */
  async listFactors(): Promise<PPPFactor[]> { ... }
}
```

**Effort**: 3-4 hours
**Risk**: Low

### 4.2 CLI: PPP Commands

```bash
$ zendfi ppp check BR
🇧🇷 Brazil
   PPP Factor: 0.42
   Suggested discount: 35%
   $100 → $65

$ zendfi ppp factors
Country        Factor    Discount
─────────────────────────────────
🇮🇳 India       0.28      50%
🇧🇷 Brazil      0.42      35%
🇲🇽 Mexico      0.52      25%
...
```

**Effort**: 2-3 hours
**Risk**: Low

---

## Phase 5: Autonomous Delegation (Week 5-6) ⚠️ CRITICAL

### Goal: Enable the core AIP value prop - autonomous agents

### 5.1 SDK: Delegation Signature Utility

**New File**: `packages/sdk/src/delegation.ts`

```typescript
import { Keypair } from '@solana/web3.js';
import nacl from 'tweetnacl';

export class DelegationSigner {
  /**
   * Create Ed25519 delegation signature for autonomous mode
   * 
   * Message format (must match backend exactly):
   * "I authorize autonomous delegate for session {id} to spend up to ${amount} until {expiry}"
   */
  static sign(
    keypair: Keypair,
    sessionKeyId: string,
    maxAmountUsd: number,
    expiresAt: string
  ): string {
    const message = `I authorize autonomous delegate for session ${sessionKeyId} to spend up to $${maxAmountUsd} until ${expiresAt}`;
    const messageBytes = new TextEncoder().encode(message);
    const signature = nacl.sign.detached(messageBytes, keypair.secretKey);
    return Buffer.from(signature).toString('base64');
  }
}
```

**Effort**: 2-3 hours
**Risk**: Medium (must match backend)

### 5.2 SDK: Lit Protocol Integration (Optional)

**New File**: `packages/sdk/src/lit-protocol.ts`

```typescript
import { LitNodeClient } from '@lit-protocol/lit-node-client';

export class LitProtocolClient {
  private client: LitNodeClient;

  /**
   * Encrypt keypair with Lit Protocol for threshold crypto
   * Requires 2-of-3 nodes to decrypt
   */
  async encryptKeypair(
    keypair: Keypair,
    accessControlConditions: any[]
  ): Promise<{ ciphertext: string; dataHash: string }> { ... }

  /**
   * Decrypt keypair using Lit Protocol
   * Called by backend nodes during autonomous signing
   */
  async decryptKeypair(
    ciphertext: string,
    authSig: any
  ): Promise<Keypair> { ... }
}

// Make Lit optional via dynamic import
export async function getLitClient(): Promise<LitProtocolClient | null> {
  try {
    const lit = await import('@lit-protocol/lit-node-client');
    return new LitProtocolClient();
  } catch {
    console.warn('Lit Protocol not installed - autonomous mode limited');
    return null;
  }
}
```

**Effort**: 8-12 hours
**Risk**: HIGH (external dependency, complexity)

### 5.3 SDK: Autonomy API

**New File**: `packages/sdk/src/autonomy.ts`

```typescript
export class AutonomyAPI {
  /**
   * Enable autonomous signing for a session key
   * 
   * @example
   * ```typescript
   * // Create session key first
   * const sessionKey = await manager.createSessionKey({ pin: '123456' });
   * 
   * // Enable autonomous mode
   * const delegate = await zendfi.autonomy.enable({
   *   sessionKeyId: sessionKey.id,
   *   maxAmountUsd: 50,
   *   durationHours: 24,
   *   pin: '123456', // Needed to sign delegation
   * });
   * 
   * // Now agent can make payments without user interaction!
   * ```
   */
  async enable(options: {
    sessionKeyId: string;
    maxAmountUsd: number;
    durationHours: number;
    pin: string;
    useLitProtocol?: boolean;
  }): Promise<EnableAutonomyResponse> {
    // 1. Load session key from backend
    // 2. Decrypt with PIN
    // 3. Create delegation signature
    // 4. Optionally encrypt with Lit Protocol
    // 5. Call backend enable-autonomy endpoint
  }

  async revoke(sessionKeyId: string, reason?: string): Promise<void> { ... }
  
  async getStatus(sessionKeyId: string): Promise<AutonomousDelegate | null> { ... }
}
```

**Effort**: 10-15 hours
**Risk**: HIGH (core feature, crypto)

### 5.4 Update ZendFiSessionKeyManager

**File**: `packages/sdk/src/device-bound-session-keys.ts`

Add methods to existing manager:

```typescript
class ZendFiSessionKeyManager {
  // ... existing methods ...

  /**
   * Enable autonomous signing for this session key
   * Simplified API that handles delegation signature internally
   */
  async enableAutonomousMode(options: {
    maxAmountUsd: number;
    durationHours: number;
    useLitProtocol?: boolean;
  }): Promise<EnableAutonomyResponse> {
    if (!this.sessionKey) throw new Error('No session key loaded');
    if (!this.pin) throw new Error('Session key not unlocked');
    
    return this.client.autonomy.enable({
      sessionKeyId: this.sessionKeyId!,
      maxAmountUsd: options.maxAmountUsd,
      durationHours: options.durationHours,
      pin: this.pin,
      useLitProtocol: options.useLitProtocol,
    });
  }

  async revokeAutonomousMode(reason?: string): Promise<void> { ... }
  
  async getAutonomyStatus(): Promise<AutonomousDelegate | null> { ... }
}
```

**Effort**: 4-6 hours
**Risk**: Medium

---

## Phase 6: Smart Payments (Week 6-7)

### Goal: AI-powered payment routing with PPP

### 6.1 SDK: Smart Payment Method

Add to `ZendFiClient`:

```typescript
/**
 * AI-powered smart payment with automatic PPP pricing
 * 
 * @example
 * ```typescript
 * const result = await zendfi.smartPayment({
 *   amount: 100,
 *   description: 'Premium plan',
 *   auto_ppp: true,
 *   customer_country: 'BR',
 * });
 * // => { final_amount_usd: 65, ppp_discount_applied: true, ... }
 * ```
 */
async smartPayment(request: SmartPaymentRequest): Promise<SmartPaymentResponse> { ... }
```

**Effort**: 3-4 hours
**Risk**: Low

---

## Phase 7: Templates & Examples (Week 7-8)

### Goal: Production-ready templates showcasing AIP

### 7.1 New Template: `nextjs-agentic`

Full AIP showcase:
- Device-bound session keys
- Autonomous delegation flow
- PPP pricing toggle
- Agent API key management
- Real-time analytics dashboard

**Structure**:
```
templates/nextjs-agentic/
├── app/
│   ├── page.tsx              # Landing with PPP pricing
│   ├── checkout/             # Session key creation
│   ├── agent/                # Agent management
│   │   ├── keys/             # API key management
│   │   └── sessions/         # Session monitoring
│   ├── autonomy/             # Autonomous delegation
│   └── api/
│       └── webhooks/         # Webhook handler
├── lib/
│   ├── zendfi.ts             # SDK setup
│   └── session-keys.ts       # Session key helpers
└── components/
    ├── PinPad.tsx            # PIN entry UI
    ├── PPPToggle.tsx         # PPP pricing toggle
    └── AutonomyPanel.tsx     # Delegation UI
```

**Effort**: 15-20 hours
**Risk**: Medium

### 7.2 New Template: `ai-agent-starter`

Minimal template for AI agents:
```
templates/ai-agent-starter/
├── src/
│   ├── index.ts              # Agent entry point
│   ├── agent.ts              # Agent logic
│   └── payments.ts           # Payment helpers
├── .env.example
└── README.md
```

**Effort**: 6-8 hours
**Risk**: Low

---

## Phase 8: Documentation & Polish (Week 8)

### Goal: World-class developer experience

### 8.1 Update SDK README

- Quick start unchanged
- Add "Going Further" section
- Agent API examples
- Autonomous delegation guide
- PPP pricing examples

### 8.2 JSDoc Everything

Every public method gets:
- Description
- @param documentation
- @returns documentation
- @example with working code
- @throws for error cases

### 8.3 CLI Help Text

```bash
$ zendfi --help

  🚀 ZendFi CLI - Crypto payments made simple

  Commands:
    create <name>      Create a new ZendFi project
    init               Add ZendFi to an existing project
    
  Payments:
    test               Run a test payment
    intents            Manage payment intents
    
  Keys:
    keys               Manage merchant API keys
    agent              Manage agent API keys and sessions
    
  Session Keys:
    session-keys       Manage device-bound session keys
    
  Pricing:
    ppp                Purchasing Power Parity pricing
    
  Development:
    webhooks           Local webhook development
    status             Check ZendFi connection

  Run 'zendfi <command> --help' for more info
```

**Effort**: 8-10 hours
**Risk**: Low

---

## Implementation Timeline

```
Week 1-2:  Phase 1 (Foundation)           ████████░░░░░░░░
Week 2-3:  Phase 2 (Agent Infrastructure) ░░░░████████░░░░
Week 3-4:  Phase 3 (Payment Intents)      ░░░░░░░░████░░░░
Week 4:    Phase 4 (PPP Pricing)          ░░░░░░░░░░██░░░░
Week 5-6:  Phase 5 (Autonomous) ⚠️        ░░░░░░░░░░████████
Week 6-7:  Phase 6 (Smart Payments)       ░░░░░░░░░░░░░░██
Week 7-8:  Phase 7 (Templates)            ░░░░░░░░░░░░████
Week 8:    Phase 8 (Documentation)        ░░░░░░░░░░░░░░██
```

**Total Estimate**: 6-8 weeks with 1-2 developers

---

## Success Metrics

### Developer Experience
- [ ] Basic payment: 3 lines of code (unchanged)
- [ ] Agent setup: <10 lines of code
- [ ] Autonomous delegate: <15 lines of code
- [ ] Zero breaking changes for existing users

### API Coverage
- [ ] 100% of AIP backend endpoints accessible
- [ ] All 22 missing SDK methods implemented
- [ ] All 17 missing CLI commands added

### Documentation
- [ ] Every public method has JSDoc + example
- [ ] README has getting started for each major feature
- [ ] 2 production-ready templates

---

## Risk Mitigation

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Lit Protocol complexity | High | High | Make optional, fallback to client-signed |
| Breaking changes | Low | Critical | Strict additive-only policy |
| Bundle size bloat | Medium | Medium | Tree-shaking, optional deps |
| Backend API changes | Low | High | Version lock, integration tests |
| Template maintenance | Medium | Medium | Limit to 3 high-quality templates |

---

## Decision Points

### Decision 1: Lit Protocol Strategy
**Options**:
1. **Require** - Full Lit integration, everyone gets threshold crypto
2. **Optional** - Install separately, graceful fallback
3. **Defer** - Skip for v1, add later

**Recommendation**: Option 2 (Optional)
- Core SDK stays small
- Power users can opt-in
- Fallback works for most cases

### Decision 2: CLI Scope
**Options**:
1. **Full** - Every API endpoint has a command
2. **Essential** - Core workflows only
3. **Minimal** - Just scaffolding and keys

**Recommendation**: Option 2 (Essential)
- Agent keys & sessions
- Session key wizard
- PPP lookup
- Skip: analytics (web dashboard better), intent management (SDK better)

### Decision 3: Template Count
**Options**:
1. Update all 3 existing + add 2 new = 5 total
2. Update existing 3, add 1 new = 4 total
3. Focus on 1 flagship template

**Recommendation**: Option 2
- Update existing templates with PPP + intents
- Add `nextjs-agentic` as flagship
- Skip `ai-agent-starter` for now (docs suffice)

---

*Gameplan complete. Ready for execution.*
