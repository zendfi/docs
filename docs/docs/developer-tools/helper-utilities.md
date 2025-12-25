---
sidebar_position: 7
---

# Helper Utilities

Production-ready utilities to simplify common integration patterns. All helpers are **optional**, **tree-shakeable**, and **zero-config**.

:::tip Why Use Helpers?
- **Optional**: Import only what you need
- **Tree-shakeable**: Unused code eliminated by bundlers
- **Zero config**: Sensible defaults, works out of the box
- **Pluggable**: Bring your own storage/AI/PIN providers
- **Production-ready**: Full TypeScript types, error handling, documentation
:::

## Installation

Helpers are included in the main SDK package:

```bash
npm install @zendfi/sdk
```

Import specific helpers:

```typescript
import { 
  SessionKeyCache,
  WalletConnector,
  TransactionPoller,
  DevTools 
} from '@zendfi/sdk/helpers';
```

---

## Available Helpers

| Helper | Purpose | Best For |
|--------|---------|----------|
| [`SessionKeyCache`](#session-key-cache) | Cache encrypted session keys | Avoid re-prompting for PIN |
| [`WalletConnector`](#wallet-connector) | Detect & connect Solana wallets | Phantom, Solflare, Backpack |
| [`PaymentIntentParser`](#ai-payment-parser) | Parse natural language → payments | AI chat interfaces |
| [`PINValidator`](#security-utilities) | Validate PIN strength | Device-bound security |
| [`PINRateLimiter`](#security-utilities) | Prevent brute force attacks | Rate limiting |
| [`SecureStorage`](#security-utilities) | AES-GCM encrypted localStorage | Secure sensitive data |
| [`TransactionPoller`](#transaction-polling) | Poll for confirmations | Wait for on-chain finality |
| [`TransactionMonitor`](#transaction-polling) | Realtime tx monitoring | Event-driven workflows |
| [`RetryStrategy`](#error-recovery) | Exponential backoff retries | Handle network failures |
| [`ErrorRecovery`](#error-recovery) | Smart error handling | Resilient applications |
| [`SessionKeyLifecycle`](#session-key-lifecycle) | High-level session key manager | One-liner session setup |
| [`DevTools`](#development-tools) | Debug mode & test utilities | Development & testing |

---

## Session Key Cache

Cache encrypted session keys to avoid re-prompting users for their PIN every time.

### Quick Start

```typescript
import { SessionKeyCache, QuickCaches } from '@zendfi/sdk/helpers';

// Option 1: Use presets (recommended)
const cache = QuickCaches.persistent(); // 1 hour localStorage
const cache = QuickCaches.memory();     // 30 min in-memory
const cache = QuickCaches.longTerm();   // 24 hour localStorage
const cache = QuickCaches.secure();     // AES-encrypted storage

// Option 2: Custom configuration
const cache = new SessionKeyCache({
  storage: 'localStorage',  // 'memory' | 'localStorage' | 'indexedDB'
  ttl: 3600000,            // 1 hour in milliseconds
  maxEntries: 10,          // LRU eviction
});
```

### Usage with Device-Bound Session Keys

```typescript
import { SessionKeyCache } from '@zendfi/sdk/helpers';
import { zendfi } from '@zendfi/sdk';

const cache = QuickCaches.persistent();

// Get cached keypair (or decrypt with PIN on cache miss)
const keypair = await cache.getCached(
  sessionKeyId,
  async () => {
    // This callback only runs on cache miss
    const pin = await promptUserForPIN();
    
    // Decrypt keypair using ZendFi's crypto utilities
    const { SessionKeyCrypto } = await import('@zendfi/sdk');
    const decrypted = await SessionKeyCrypto.decrypt(
      encryptedKey.ciphertext,
      encryptedKey.nonce,
      pin,
      deviceFingerprint
    );
    
    return Keypair.fromSecretKey(decrypted);
  },
  { deviceFingerprint } // Optional: validate device hasn't changed
);

// Use cached keypair for signing
const signedTx = await keypair.sign(transaction);
```

### Auto-Refresh

Cache automatically refreshes before expiration:

```typescript
const cache = new SessionKeyCache({
  storage: 'localStorage',
  ttl: 3600000,              // 1 hour
  autoRefresh: true,         // Enable auto-refresh
  refreshBeforeExpiry: 300000, // Refresh 5 min before expiration
});

cache.onRefresh(async (sessionKeyId) => {
  console.log(`Cache auto-refreshing for ${sessionKeyId}`);
  // Optionally re-decrypt with saved PIN or prompt user
});
```

### Manual Cache Management

```typescript
// Check if cached
const isCached = await cache.has(sessionKeyId);

// Invalidate specific entry
await cache.invalidate(sessionKeyId);

// Clear entire cache
await cache.clear();

// Get cache stats
const stats = cache.getStats();
console.log(`Hit rate: ${stats.hitRate}%`);
console.log(`Entries: ${stats.entries}`);
```

### Custom Storage Adapter

Bring your own storage backend:

```typescript
import { SessionKeyCache, type CustomStorageAdapter } from '@zendfi/sdk/helpers';

// Example: Redis adapter
class RedisStorageAdapter implements CustomStorageAdapter {
  constructor(private redis: Redis) {}
  
  async getItem(key: string): Promise<string | null> {
    return await this.redis.get(key);
  }
  
  async setItem(key: string, value: string, ttl?: number): Promise<void> {
    if (ttl) {
      await this.redis.setex(key, ttl / 1000, value);
    } else {
      await this.redis.set(key, value);
    }
  }
  
  async removeItem(key: string): Promise<void> {
    await this.redis.del(key);
  }
  
  async clear(): Promise<void> {
    await this.redis.flushdb();
  }
}

// Use custom adapter
const cache = new SessionKeyCache({
  storage: new RedisStorageAdapter(redisClient),
  ttl: 3600000,
});
```

---

## Wallet Connector

Auto-detect and connect to Solana wallets with zero configuration.

### Supported Wallets

- **Phantom** - Most popular Solana wallet
- **Solflare** - Mobile-friendly wallet
- **Backpack** - Multi-chain wallet
- **Coinbase Wallet** - Mainstream wallet
- **Trust Wallet** - Mobile wallet

### Basic Usage

```typescript
import { WalletConnector } from '@zendfi/sdk/helpers';

// Auto-detect and connect to available wallet
const wallet = await WalletConnector.detectAndConnect();

console.log(wallet.type);      // 'phantom' | 'solflare' | 'backpack' | ...
console.log(wallet.address);   // User's wallet address
console.log(wallet.publicKey); // Solana PublicKey object

// Sign transaction
const signedTx = await wallet.signTransaction(transaction);

// Sign message
const signature = await wallet.signMessage(message);

// Disconnect
await wallet.disconnect();
```

### Specific Wallet

```typescript
// Connect to specific wallet type
const wallet = await WalletConnector.detectAndConnect({
  preferredWallet: 'phantom', // Try Phantom first
  autoConnect: true,          // Auto-connect if previously connected
});
```

### Event Listeners

```typescript
// Listen for account changes (user switches wallet)
wallet.onAccountChange((newAddress) => {
  console.log('Wallet changed to:', newAddress);
  // Update UI, invalidate cache, etc.
});

// Listen for disconnect
wallet.onDisconnect(() => {
  console.log('Wallet disconnected');
  // Clear session, redirect to login, etc.
});
```

### React Hook (Optional)

```typescript
import { createWalletHook } from '@zendfi/sdk/helpers';

// Create hook (only once, at module level)
const useWallet = createWalletHook();

// Use in components
function MyComponent() {
  const { wallet, connecting, error, connect, disconnect } = useWallet();

  if (connecting) {
    return <div>Connecting to wallet...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!wallet) {
    return <button onClick={() => connect()}>Connect Wallet</button>;
  }

  return (
    <div>
      <p>Connected: {wallet.address}</p>
      <button onClick={disconnect}>Disconnect</button>
    </div>
  );
}
```

### Manual Wallet Selection

```typescript
// Get list of available wallets
const available = WalletConnector.getAvailableWallets();
console.log(available); // ['phantom', 'solflare']

// Let user choose
function WalletSelector() {
  const [wallets, setWallets] = useState<string[]>([]);
  
  useEffect(() => {
    setWallets(WalletConnector.getAvailableWallets());
  }, []);
  
  async function handleConnect(type: string) {
    const wallet = await WalletConnector.detectAndConnect({
      preferredWallet: type,
    });
    console.log('Connected to', wallet.type);
  }
  
  return (
    <div>
      {wallets.map(type => (
        <button key={type} onClick={() => handleConnect(type)}>
          Connect {type}
        </button>
      ))}
    </div>
  );
}
```

---

## AI Payment Parser

Parse natural language into structured payment intents for AI chat interfaces.

### Basic Usage

```typescript
import { PaymentIntentParser } from '@zendfi/sdk/helpers';

// Parse user message
const intent = PaymentIntentParser.parse(
  "Send $50 to Alice for dinner last night"
);

console.log(intent);
// {
//   action: 'payment',
//   amount: 50,
//   description: 'dinner',
//   confidence: 0.9,
//   rawText: 'Send $50...'
// }

// Use parsed intent
if (intent.action === 'payment' && intent.amount) {
  const payment = await zendfi.createPayment({
    amount: intent.amount,
    description: intent.description,
  });
}
```

### AI Provider Adapters

Integrate with OpenAI, Anthropic, or Gemini:

```typescript
import { OpenAIAdapter } from '@zendfi/sdk/helpers';

const ai = new OpenAIAdapter({ 
  apiKey: process.env.OPENAI_API_KEY,
  model: 'gpt-4',
});

// Parse with AI context
const response = await ai.parsePaymentIntent(
  "I need to pay for my coffee subscription",
  {
    enabledCapabilities: ['payment', 'subscription'],
    context: {
      recentPayments: [
        { description: 'Coffee subscription', amount: 9.99 }
      ],
      userPreferences: {
        defaultCurrency: 'USD',
      }
    }
  }
);

console.log(response.amount);      // 9.99 (inferred from history)
console.log(response.description); // 'Coffee subscription'
console.log(response.isSubscription); // true
```

### Available Adapters

```typescript
// OpenAI (GPT-3.5, GPT-4)
import { OpenAIAdapter } from '@zendfi/sdk/helpers';
const openai = new OpenAIAdapter({ apiKey: 'sk-...' });

// Anthropic (Claude)
import { AnthropicAdapter } from '@zendfi/sdk/helpers';
const claude = new AnthropicAdapter({ apiKey: 'sk-ant-...' });

// Google Gemini
import { GeminiAdapter } from '@zendfi/sdk/helpers';
const gemini = new GeminiAdapter({ apiKey: 'AIza...' });
```

### Heuristic Parsing (No AI Required)

```typescript
// Fast, local parsing without AI API calls
const intent = PaymentIntentParser.parse(userMessage);

// Extracts:
// - Amounts: $50, 50 USD, 50.00, fifty dollars
// - Actions: pay, send, transfer, buy, purchase
// - Descriptions: for dinner, coffee, subscription
```

---

## Security Utilities

PIN validation, rate limiting, and secure storage.

### PIN Validator

```typescript
import { PINValidator } from '@zendfi/sdk/helpers';

const validation = PINValidator.validate('123456');

console.log(validation.isValid);     // false (too weak)
console.log(validation.score);       // 20 (out of 100)
console.log(validation.strength);    // 'weak' | 'medium' | 'strong'
console.log(validation.feedback);    // ['Sequential digits detected', ...]

// Require minimum strength
if (validation.score < 60) {
  alert('PIN too weak. Please choose a stronger PIN.');
}
```

**PIN Strength Factors:**
- Length (4-6 digits)
- No sequential patterns (123456, 654321)
- No repeated digits (111111, 222222)
- No common PINs (000000, 123123)

### PIN Rate Limiter

Prevent brute force attacks:

```typescript
import { PINRateLimiter } from '@zendfi/sdk/helpers';

const rateLimiter = new PINRateLimiter({
  maxAttempts: 3,          // Max attempts before lockout
  windowMs: 60000,         // Time window (1 minute)
  lockoutDuration: 300000, // Lockout duration (5 minutes)
});

// Check before allowing attempt
if (rateLimiter.isLocked()) {
  const remaining = rateLimiter.getLockoutRemaining();
  throw new Error(`Too many attempts. Try again in ${remaining}ms`);
}

// Record attempt
const allowed = rateLimiter.recordAttempt();
if (!allowed) {
  console.log('Rate limit exceeded');
}

// Reset on successful PIN entry
rateLimiter.reset();
```

### Secure Storage

AES-GCM encrypted localStorage:

```typescript
import { SecureStorage } from '@zendfi/sdk/helpers';

// Initialize with master key (derived from user password)
const storage = new SecureStorage({
  masterKey: await deriveMasterKey(userPassword),
});

// Store encrypted
await storage.setItem('sensitive-data', { 
  pin: '1234',
  secretKey: '...' 
});

// Retrieve and decrypt
const data = await storage.getItem('sensitive-data');
console.log(data.pin); // '1234'

// Remove
await storage.removeItem('sensitive-data');

// Clear all
await storage.clear();
```

**Features:**
- AES-256-GCM encryption
- Automatic nonce generation
- PBKDF2 key derivation
- Browser and Node.js support

---

## Transaction Polling

Wait for Solana transaction confirmations with smart exponential backoff.

### Basic Usage

```typescript
import { TransactionPoller } from '@zendfi/sdk/helpers';
import { Connection } from '@solana/web3.js';

const connection = new Connection('https://api.devnet.solana.com');

const poller = new TransactionPoller({
  connection,
  commitment: 'confirmed', // 'processed' | 'confirmed' | 'finalized'
  timeout: 60000,         // 60 seconds
  pollInterval: 1000,     // Start with 1s
  maxPollInterval: 5000,  // Cap at 5s (exponential backoff)
});

// Wait for confirmation
const result = await poller.waitForConfirmation(signature);

console.log(result.status);     // 'confirmed' | 'finalized' | 'failed'
console.log(result.slot);       // Solana slot number
console.log(result.blockTime);  // Unix timestamp
console.log(result.confirmations); // Number of confirmations
```

### Realtime Monitoring

Event-driven transaction monitoring:

```typescript
import { TransactionMonitor } from '@zendfi/sdk/helpers';

const monitor = new TransactionMonitor({
  connection,
  
  onProcessed: (signature, result) => {
    console.log('Transaction processed (not yet confirmed)');
    // Update UI: show as "processing"
  },
  
  onConfirmed: (signature, result) => {
    console.log('Transaction confirmed!');
    // Update UI: show as "confirmed"
  },
  
  onFinalized: (signature, result) => {
    console.log('Transaction finalized (irreversible)');
    // Update UI: show as "complete"
  },
  
  onFailed: (signature, error) => {
    console.error('Transaction failed:', error);
    // Update UI: show error
  },
});

// Start watching
monitor.watch(signature);

// Stop watching
monitor.unwatch(signature);

// Stop all
monitor.stopAll();
```

### Parallel Polling

Poll multiple transactions simultaneously:

```typescript
const poller = new TransactionPoller({ connection });

// Wait for multiple transactions
const results = await Promise.all([
  poller.waitForConfirmation(signature1),
  poller.waitForConfirmation(signature2),
  poller.waitForConfirmation(signature3),
]);

console.log(`${results.filter(r => r.status === 'confirmed').length} confirmed`);
```

---

## Error Recovery

Exponential backoff retries and circuit breaker patterns.

### Retry Strategy

```typescript
import { RetryStrategy } from '@zendfi/sdk/helpers';

// Retry with exponential backoff
const result = await RetryStrategy.withRetry(
  async () => {
    return await zendfi.createPayment({ amount: 50 });
  },
  {
    maxAttempts: 3,
    initialDelay: 1000,      // 1s
    maxDelay: 10000,         // 10s cap
    backoff: 'exponential',  // or 'linear' or 'constant'
    onRetry: (error, attempt, nextDelay) => {
      console.log(`Retry attempt ${attempt} in ${nextDelay}ms`);
      console.log(`Error: ${error.message}`);
    },
  }
);
```

### Error Recovery Helpers

```typescript
import { ErrorRecovery } from '@zendfi/sdk/helpers';

const recovery = new ErrorRecovery();

try {
  await zendfi.createPayment({ amount: 50 });
} catch (error) {
  // Check error type and handle appropriately
  if (recovery.isNetworkError(error)) {
    // Temporary network issue - retry with backoff
    await recovery.handleNetworkError(error, async () => {
      return await zendfi.createPayment({ amount: 50 });
    });
  } else if (recovery.isRateLimitError(error)) {
    // Rate limited - wait and retry
    const waitTime = recovery.getRateLimitWaitTime(error);
    console.log(`Rate limited. Waiting ${waitTime}ms`);
    await recovery.handleRateLimitError(error, retryFn);
  } else if (recovery.isRPCError(error)) {
    // RPC node issue - try different RPC endpoint
    await recovery.handleRPCError(error, retryFn, alternateRPCs);
  } else if (recovery.isTimeoutError(error)) {
    // Timeout - retry with longer timeout
    await recovery.handleTimeoutError(error, retryFn, { timeout: 90000 });
  } else {
    // Unknown error - don't retry
    throw error;
  }
}
```

### Custom Backoff

```typescript
// Custom backoff function
const customBackoff = (attempt: number) => {
  // Fibonacci backoff: 1s, 1s, 2s, 3s, 5s, 8s...
  if (attempt === 1) return 1000;
  if (attempt === 2) return 1000;
  return customBackoff(attempt - 1) + customBackoff(attempt - 2);
};

const result = await RetryStrategy.withRetry(
  asyncFn,
  {
    maxAttempts: 6,
    backoffFn: customBackoff,
  }
);
```

---

## Session Key Lifecycle

High-level wrapper for complete device-bound session key management.

### Quick Setup

```typescript
import { SessionKeyLifecycle, QuickCaches } from '@zendfi/sdk/helpers';
import { zendfi } from '@zendfi/sdk';

const lifecycle = new SessionKeyLifecycle(zendfi, {
  cache: QuickCaches.persistent(),        // Auto-cache for 1 hour
  pinProvider: () => promptUserForPIN(),  // Custom PIN prompt
  autoCleanup: true,                      // Clear cache on window close
});

// Create and fund session key (one call)
await lifecycle.createAndFund({
  userWallet: userAddress,
  agentId: 'my-shopping-agent',
  agentName: 'Shopping Assistant',
  limitUsdc: 100,
  durationDays: 7,
  onApprovalNeeded: async (transaction) => {
    // User signs funding transaction in wallet
    const signed = await wallet.signTransaction(transaction);
    return signed;
  },
});

console.log('Session key created and funded!');
```

### Make Payments

Auto-handles caching, PIN prompts, and signing:

```typescript
// First payment - prompts for PIN, caches keypair
await lifecycle.pay(5.00, 'Coffee at Starbucks');

// Subsequent payments within cache TTL - no PIN prompt
await lifecycle.pay(12.50, 'Lunch at Chipotle');
await lifecycle.pay(3.00, 'Parking meter');

// Cache expires after 1 hour - prompts for PIN again
await lifecycle.pay(8.00, 'Afternoon snack');
```

### Check Status

```typescript
const status = await lifecycle.getStatus();

console.log(`Limit: $${status.limit_usdc}`);
console.log(`Used: $${status.used_amount_usdc}`);
console.log(`Remaining: $${status.remaining_usdc}`);
console.log(`Expires: ${status.expires_at}`);
```

### Top Up

```typescript
// Add more funds to session key
await lifecycle.topUp(50, userWallet, async (transaction) => {
  const signed = await wallet.signTransaction(transaction);
  return signed;
});
```

### Revoke & Cleanup

```typescript
// Revoke session key and clear cache
await lifecycle.revoke();

// Or just cleanup (without revoking)
await lifecycle.cleanup();
```

### Full Configuration

```typescript
const lifecycle = new SessionKeyLifecycle(zendfi, {
  // Cache configuration
  cache: new SessionKeyCache({
    storage: 'localStorage',
    ttl: 3600000, // 1 hour
  }),
  
  // PIN provider (custom prompt)
  pinProvider: async () => {
    return await showPINModal();
  },
  
  // Device fingerprint provider
  deviceFingerprintProvider: async () => {
    const { DeviceFingerprintGenerator } = await import('@zendfi/sdk');
    const fp = await DeviceFingerprintGenerator.generate();
    return fp.fingerprint;
  },
  
  // Auto-cleanup on window close
  autoCleanup: true,
});
```

---

## Development Tools

Debug mode, test utilities, and performance monitoring.

### Debug Mode

Log all API requests and responses:

```typescript
import { DevTools } from '@zendfi/sdk/helpers';

// Enable debug mode (development only)
DevTools.enableDebugMode();

// All API calls will now be logged:
// 📤 API Request: POST /api/v1/payments
// Time: 2025-12-25T10:30:00.000Z
// Body: { amount: 50, description: '...' }
//
// ✅ API Response: POST /api/v1/payments [200]
// Duration: 234ms
// Data: { payment_id: 'pay_...', ... }

// Disable debug mode
DevTools.disableDebugMode();
```

### Generate Test Data

```typescript
// Generate realistic test data
const testData = DevTools.generateTestData();

console.log(testData.userWallet);   // Valid-looking Solana address
console.log(testData.agentId);      // test-agent-1735127400000
console.log(testData.sessionKeyId); // sk_test_abc123...
console.log(testData.paymentId);    // pay_test_def456...
```

### Create Test Session Key (Devnet)

```typescript
// Generate test session key (devnet only)
const testKey = await DevTools.createTestSessionKey();

console.log(testKey.sessionKeyId);   // sk_test_...
console.log(testKey.sessionWallet);  // Devnet address
console.log(testKey.budget);         // 10 (test budget)
```

### Mock Wallet

Test without real wallet:

```typescript
// Create mock wallet (no wallet extension needed)
const mockWallet = DevTools.mockWallet();

console.log(mockWallet.address); // Mock address

// Mock signing (returns unsigned tx)
const signedTx = await mockWallet.signTransaction(tx);

// Mock message signing
const signature = await mockWallet.signMessage(message);
```

### Benchmark API Calls

```typescript
// Measure API call performance
const { result, durationMs } = await DevTools.benchmarkRequest(
  'Create Payment',
  () => zendfi.createPayment({ amount: 50 })
);

console.log(`Completed in ${durationMs}ms`);
```

### Visual Flow Logging

```typescript
// Print ASCII diagram of transaction flow
DevTools.logTransactionFlow(paymentId);

// Prints:
// ╔═══════════════════════════════════════════════════════════════╗
// ║                    TRANSACTION FLOW                           ║
// ╠═══════════════════════════════════════════════════════════════╣
// ║  Payment ID: pay_abc123...                                    ║
// ║  1. Create Payment Intent                                     ║
// ║  2. Sign Transaction (Device-Bound)                           ║
// ║  3. Submit Signed Transaction                                 ║
// ║  4. Wait for Blockchain Confirmation                          ║
// ║  5. Payment Confirmed                                         ║
// ╚═══════════════════════════════════════════════════════════════╝
```

### Performance Monitoring

```typescript
import { PerformanceMonitor } from '@zendfi/sdk/helpers';

const monitor = new PerformanceMonitor();

// Record metrics
monitor.record('api-call-duration', 234);
monitor.record('api-call-duration', 156);
monitor.record('api-call-duration', 289);

// Get statistics
const stats = monitor.getStats('api-call-duration');
console.log(`Average: ${stats.avg}ms`);
console.log(`P50: ${stats.p50}ms`);
console.log(`P95: ${stats.p95}ms`);
console.log(`P99: ${stats.p99}ms`);

// Print report
monitor.printReport();
```

### Inspect SDK Configuration

```typescript
// View current SDK configuration
DevTools.inspectConfig(zendfi);

// Prints:
// 🔍 ZendFi SDK Configuration
// Base URL: https://api.zendfi.tech
// API Key: zfi_test_abc123...
// Mode: test
// Environment: development
```

---

## Best Practices

### 1. Use Presets for Common Cases

```typescript
// Good: Use preset configurations
const cache = QuickCaches.persistent();

// Also good: Custom config when needed
const cache = new SessionKeyCache({ 
  storage: 'indexedDB',
  ttl: 7200000 
});
```

### 2. Handle Cache Expiration Gracefully

```typescript
try {
  const keypair = await cache.getCached(sessionKeyId, decryptFn);
} catch (error) {
  if (error.message.includes('expired')) {
    // Cache expired - prompt user for PIN again
    const pin = await promptForPIN('Session expired. Re-enter PIN:');
    return await decryptKeypair(pin);
  }
  throw error;
}
```

### 3. Combine Helpers for Robust Applications

```typescript
import { 
  SessionKeyLifecycle,
  WalletConnector,
  TransactionPoller,
  RetryStrategy,
  DevTools
} from '@zendfi/sdk/helpers';

// Enable debug mode in development
if (process.env.NODE_ENV === 'development') {
  DevTools.enableDebugMode();
}

// Connect wallet
const wallet = await WalletConnector.detectAndConnect();

// Setup session key lifecycle
const lifecycle = new SessionKeyLifecycle(zendfi, {
  cache: QuickCaches.persistent(),
});

// Create session with retry
const session = await RetryStrategy.withRetry(
  () => lifecycle.createAndFund({
    userWallet: wallet.address,
    agentId: 'my-agent',
    limitUsdc: 100,
  }),
  { maxAttempts: 3 }
);

// Make payment with confirmation polling
const payment = await lifecycle.pay(5.00, 'Coffee');

const poller = new TransactionPoller({ connection });
const result = await poller.waitForConfirmation(payment.signature);

console.log('Payment confirmed!', result);
```

### 4. Clean Up Resources

```typescript
// Always cleanup when done
window.addEventListener('beforeunload', async () => {
  await lifecycle.cleanup();
  await wallet.disconnect();
});
```

### 5. Use DevTools in Testing

```typescript
// In test files
import { DevTools } from '@zendfi/sdk/helpers';

describe('Payment flow', () => {
  it('should create payment', async () => {
    // Use mock wallet for testing
    const wallet = DevTools.mockWallet();
    
    // Generate test data
    const { userWallet } = DevTools.generateTestData();
    
    // Test payment creation
    const payment = await zendfi.createPayment({
      amount: 50,
      customer_wallet: userWallet,
    });
    
    expect(payment.status).toBe('Pending');
  });
});
```

---

## Examples

### Complete E-commerce Checkout

```typescript
import { 
  WalletConnector,
  SessionKeyLifecycle,
  TransactionPoller,
  RetryStrategy 
} from '@zendfi/sdk/helpers';

async function handleCheckout(cartTotal: number) {
  // 1. Connect wallet
  const wallet = await WalletConnector.detectAndConnect();
  
  // 2. Setup session key (if not exists)
  let lifecycle = await getExistingLifecycle();
  if (!lifecycle) {
    lifecycle = new SessionKeyLifecycle(zendfi, {
      cache: QuickCaches.persistent(),
    });
    
    await lifecycle.createAndFund({
      userWallet: wallet.address,
      agentId: 'checkout-v1',
      limitUsdc: 500,
      onApprovalNeeded: async (tx) => wallet.signTransaction(tx),
    });
  }
  
  // 3. Create payment with retry
  const payment = await RetryStrategy.withRetry(
    () => lifecycle.pay(cartTotal, 'E-commerce purchase'),
    { maxAttempts: 3 }
  );
  
  // 4. Wait for confirmation
  const poller = new TransactionPoller({ connection });
  const result = await poller.waitForConfirmation(payment.signature);
  
  if (result.status === 'confirmed') {
    // Order confirmed!
    await fulfillOrder(payment.paymentId);
  }
}
```

### AI Chat Payment Assistant

```typescript
import { PaymentIntentParser, OpenAIAdapter } from '@zendfi/sdk/helpers';

const ai = new OpenAIAdapter({ apiKey: process.env.OPENAI_API_KEY });

async function handleUserMessage(message: string) {
  // Parse with heuristics first (fast)
  const quickParse = PaymentIntentParser.parse(message);
  
  if (quickParse.confidence > 0.8) {
    // High confidence - use heuristic result
    return await processPayment(quickParse);
  }
  
  // Low confidence - use AI for better understanding
  const aiParse = await ai.parsePaymentIntent(message, {
    enabledCapabilities: ['payment', 'subscription'],
  });
  
  return await processPayment(aiParse);
}
```

---

## TypeScript Support

All helpers include full TypeScript definitions:

```typescript
import type { 
  CachedKeypair,
  SessionKeyCacheConfig,
  ConnectedWallet,
  ParsedIntent,
  TransactionStatus,
  RetryOptions 
} from '@zendfi/sdk/helpers';

// Type-safe configuration
const config: SessionKeyCacheConfig = {
  storage: 'localStorage',
  ttl: 3600000,
  maxEntries: 10,
};

// Type-safe wallet handling
const wallet: ConnectedWallet = await WalletConnector.detectAndConnect();

// Type-safe parsed intents
const intent: ParsedIntent = PaymentIntentParser.parse(message);
```

---

## FAQ

**Q: Are helpers required to use ZendFi?**  
A: No, they're completely optional. The core SDK works perfectly without them.

**Q: Will unused helpers bloat my bundle?**  
A: No, helpers are tree-shakeable. Only imported helpers are included.

**Q: Can I use helpers in Node.js?**  
A: Yes! Most helpers work in both browser and Node.js. Exceptions:
- `WalletConnector` - Browser only (requires wallet extensions)
- `SecureStorage` - Uses Web Crypto API (browser/Node.js 15+)

**Q: How do I customize helper behavior?**  
A: Helpers support custom adapters. See each helper's documentation for adapter interfaces.

**Q: Are helpers production-ready?**  
A: Yes! All helpers include error handling, TypeScript types, and have been tested in production.

---

## Learn More

- [Testing & Debugging](./testing-and-debugging.md) - Debug strategies
- [Best Practices](./best-practices.md) - Production guidelines
- [TypeScript Guide](./typescript-guide.md) - Type-safe development
- [AI Shopping Bot](../use-cases/ai-shopping-bot.md) - See helpers in action

---

## Support

Need help with helpers?

- **Discord**: [discord.gg/zendfi](https://discord.gg/zendfi)
- **Email**: dev@zendfi.tech
- **GitHub**: [github.com/zendfi/zendfi-toolkit](https://github.com/zendfi/zendfi-toolkit/issues)
