---
sidebar_position: 7
---
Production-ready utilities to simplify common integration patterns. All helpers are **optional**, **tree-shakeable**, and **zero-config**.

> Tip: Why Use Helpers?
- **Optional**: Import only what you need
- **Tree-shakeable**: Unused code eliminated by bundlers
- **Zero config**: Sensible defaults, works out of the box
- **Production-ready**: Full TypeScript types, error handling, documentation


## Installation

Helpers are included in the main SDK package:

```bash
npm install @zendfi/sdk
```

Import specific helpers:

```typescript
import { 
  WalletConnector,
  TransactionPoller,
  DevTools 
} from '@zendfi/sdk/helpers';
```

---

## Available Helpers

| Helper | Purpose | Best For |
|--------|---------|----------|
| [`WalletConnector`](#wallet-connector) | Detect & connect Solana wallets | Phantom, Solflare, Backpack |
| [`TransactionPoller`](#transaction-polling) | Poll for confirmations | Wait for on-chain finality |
| [`TransactionMonitor`](#transaction-polling) | Realtime tx monitoring | Event-driven workflows |
| [`DevTools`](#development-tools) | Debug mode & test utilities | Development & testing |

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
console.log(testData.paymentId);    // pay_test_def456...
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

### 1. Combine Helpers for Robust Applications

```typescript
import { 
  WalletConnector,
  TransactionPoller,
  DevTools
} from '@zendfi/sdk/helpers';

// Enable debug mode in development
if (process.env.NODE_ENV === 'development') {
  DevTools.enableDebugMode();
}

// Connect wallet
const wallet = await WalletConnector.detectAndConnect();

// Create payment
const payment = await zendfi.createPayment({
  amount: 50,
  customer_wallet: wallet.address,
});

// Wait for confirmation
const poller = new TransactionPoller({ connection });
const result = await poller.waitForConfirmation(payment.signature);

if (result.status === 'confirmed') {
  console.log('Payment confirmed!');
}
```

### 2. Clean Up Resources

```typescript
// Always cleanup when done
window.addEventListener('beforeunload', async () => {
  await wallet.disconnect();
});
```

### 3. Use DevTools in Testing

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

## TypeScript Support

All helpers include full TypeScript definitions:

```typescript
import type { 
  ConnectedWallet,
  TransactionStatus,
  PollingOptions
} from '@zendfi/sdk/helpers';

// Type-safe wallet handling
const wallet: ConnectedWallet = await WalletConnector.detectAndConnect();
```

---

## Learn More

- [Testing & Debugging](./testing-and-debugging.md) - Debug strategies
- [Best Practices](./best-practices.md) - Production guidelines
- [TypeScript Guide](./typescript-guide.md) - Type-safe development

---

## Support

Need help with helpers?

- **Discord**: [discord.gg/zendfi](https://discord.gg/zendfi)
- **Email**: dev@zendfi.tech
- **GitHub**: [github.com/zendfi/zendfi-toolkit](https://github.com/zendfi/zendfi-toolkit/issues)
