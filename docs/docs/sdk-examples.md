---
title: SDK Examples
description: Complete code examples for every ZendFi SDK function
sidebar_position: 4
---

# SDK Examples

Complete, copy-paste-ready code examples for every function in the ZendFi SDK.

## Installation & Setup

```bash
npm install @zendfi/sdk
# or
yarn add @zendfi/sdk
# or
pnpm add @zendfi/sdk
```

### Initialization

```typescript
import { ZendFiClient, zendfi } from '@zendfi/sdk';

// Option 1: Use singleton (reads ZENDFI_API_KEY from env)
// Just import and use - auto-configured!
const payment = await zendfi.createPayment({ amount: 50 });

// Option 2: Create custom instance
const client = new ZendFiClient({
  apiKey: 'zfi_live_your_api_key',
  environment: 'production',
  debug: true,  // Enable request/response logging
  timeout: 30000,
  retries: 3,
});
```

---

## Payments

### Create Payment

```typescript
const payment = await zendfi.createPayment({
  amount: 99.99,
  currency: 'USD',
  token: 'USDC',
  description: 'Premium subscription',
  customer_email: 'customer@example.com',
  redirect_url: 'https://yourapp.com/success',
  metadata: {
    order_id: 'ORD-12345',
    user_id: 'usr_abc',
  },
});

console.log(`Payment ID: ${payment.id}`);
console.log(`Checkout URL: ${payment.checkout_url}`);
console.log(`Status: ${payment.status}`); // "pending"
```

### Get Payment

```typescript
const payment = await zendfi.getPayment('pay_123abc...');

console.log(`Status: ${payment.status}`);
console.log(`Amount: $${payment.amount_usd}`);

if (payment.status === 'confirmed') {
  console.log(`Transaction: ${payment.transaction_signature}`);
  console.log(`Confirmed at: ${payment.confirmed_at}`);
}
```

### List Payments

```typescript
const { data: payments, pagination } = await zendfi.listPayments({
  page: 1,
  limit: 20,
  status: 'confirmed',
  from_date: '2024-01-01',
  to_date: '2024-12-31',
});

console.log(`Found ${pagination.total} payments`);
payments.forEach(p => {
  console.log(`${p.id}: $${p.amount_usd} - ${p.status}`);
});
```

### Payment with Splits

```typescript
const payment = await zendfi.createPayment({
  amount: 100,
  description: 'Marketplace purchase',
  split_recipients: [
    {
      recipient_wallet: 'SellerWallet123...',
      recipient_name: 'Seller Inc',
      percentage: 85,  // 85% to seller
    },
    {
      recipient_wallet: 'PlatformWallet456...',
      recipient_name: 'Platform Fee',
      percentage: 15,  // 15% platform fee
    },
  ],
});
```

---

## Payment Links

### Create Payment Link

```typescript
const link = await zendfi.createPaymentLink({
  amount: 49.99,
  description: 'Pro Plan - Monthly',
  max_uses: 100,
  expires_at: '2024-12-31T23:59:59Z',
  metadata: {
    plan: 'pro',
    billing: 'monthly',
  },
});

console.log(`Link Code: ${link.link_code}`);
console.log(`Share URL: ${link.url}`);
// => https://pay.zendfi.tech/l/ABC123
```

### Get Payment Link

```typescript
const link = await zendfi.getPaymentLink('ABC123');

console.log(`Uses: ${link.uses_count}/${link.max_uses}`);
console.log(`Active: ${link.is_active}`);
```

### List Payment Links

```typescript
const links = await zendfi.listPaymentLinks();

links.forEach(link => {
  console.log(`${link.link_code}: $${link.amount} - ${link.uses_count} uses`);
});
```

---

## Subscriptions

### Create Subscription Plan

```typescript
const plan = await zendfi.createSubscriptionPlan({
  name: 'Pro Plan',
  description: 'Full access to all features',
  amount: 29.99,
  currency: 'USD',
  interval: 'monthly',
  interval_count: 1,
  trial_days: 14,
  metadata: {
    features: ['unlimited_projects', 'priority_support'],
  },
});

console.log(`Plan ID: ${plan.id}`);
console.log(`Price: $${plan.amount}/${plan.interval}`);
```

### Create Subscription

```typescript
const subscription = await zendfi.createSubscription({
  plan_id: 'plan_123...',
  customer_email: 'customer@example.com',
  customer_wallet: 'CustomerWallet789...',
  metadata: {
    referral_code: 'FRIEND50',
  },
});

console.log(`Subscription ID: ${subscription.id}`);
console.log(`Status: ${subscription.status}`);
console.log(`Trial ends: ${subscription.trial_end}`);
```

### Get & Cancel Subscription

```typescript
// Get subscription details
const sub = await zendfi.getSubscription('sub_123...');
console.log(`Current period: ${sub.current_period_start} - ${sub.current_period_end}`);

// Cancel subscription
const canceled = await zendfi.cancelSubscription('sub_123...');
console.log(`Canceled at: ${canceled.canceled_at}`);
```

---

## Installment Plans

### Create Installment Plan

```typescript
const plan = await zendfi.createInstallmentPlan({
  customer_wallet: 'CustomerWallet123...',
  customer_email: 'customer@example.com',
  total_amount: 1200,
  installment_count: 4,
  payment_frequency_days: 30,
  first_payment_date: '2024-01-15',
  description: 'Laptop purchase - 4 payments',
  late_fee_amount: 25,
  grace_period_days: 5,
});

console.log(`Plan ID: ${plan.plan_id}`);
// Customer pays $300/month for 4 months
```

### Get Installment Plan

```typescript
const plan = await zendfi.getInstallmentPlan('ip_123...');

console.log(`Total: $${plan.total_amount}`);
console.log(`Paid: ${plan.paid_count}/${plan.installment_count}`);

plan.payment_schedule?.forEach(item => {
  console.log(`  #${item.installment_number}: $${item.amount} - ${item.status}`);
});
```

### List & Cancel Installment Plans

```typescript
// List all plans
const plans = await zendfi.listInstallmentPlans({ limit: 10 });

// List for specific customer
const customerPlans = await zendfi.listCustomerInstallmentPlans('CustomerWallet123...');

// Cancel plan
const result = await zendfi.cancelInstallmentPlan('ip_123...');
console.log(result.message);
```

---

## Escrow

### Create Escrow

```typescript
const escrow = await zendfi.createEscrow({
  buyer_wallet: 'BuyerWallet123...',
  seller_wallet: 'SellerWallet456...',
  amount: 500,
  currency: 'USD',
  token: 'USDC',
  description: 'Freelance project milestone 1',
  release_conditions: {
    type: 'manual_approval',
    approver: 'BuyerWallet123...',
  },
  metadata: {
    project_id: 'proj_abc',
    milestone: 1,
  },
});

console.log(`Escrow ID: ${escrow.id}`);
console.log(`Payment URL: ${escrow.payment_url}`);
console.log(`Status: ${escrow.status}`); // "pending"
```

### Approve Escrow (Release to Seller)

```typescript
const result = await zendfi.approveEscrow('esc_123...', {
  approver_wallet: 'BuyerWallet123...',
});

console.log(`Status: ${result.status}`); // "released"
console.log(`Transaction: ${result.transaction_signature}`);
```

### Refund Escrow (Return to Buyer)

```typescript
const result = await zendfi.refundEscrow('esc_123...', {
  reason: 'Project canceled by mutual agreement',
});

console.log(`Refunded: ${result.transaction_signature}`);
```

### Dispute Escrow

```typescript
const result = await zendfi.disputeEscrow('esc_123...', {
  reason: 'Work not delivered as specified',
});

console.log(`Dispute ID: ${result.dispute_id}`);
console.log(`Status: ${result.status}`); // "disputed"
```

---

## Invoices

### Create & Send Invoice

```typescript
// Create invoice
const invoice = await zendfi.createInvoice({
  customer_email: 'client@company.com',
  customer_name: 'Acme Corp',
  amount: 2500,
  token: 'USDC',
  description: 'Consulting services - December 2024',
  line_items: [
    { description: 'Strategy consultation', quantity: 10, unit_price: 150 },
    { description: 'Implementation support', quantity: 20, unit_price: 50 },
  ],
  due_date: '2025-01-15',
});

console.log(`Invoice #${invoice.invoice_number}`);

// Send to customer
const sent = await zendfi.sendInvoice(invoice.id);
console.log(`Sent to: ${sent.sent_to}`);
console.log(`Payment URL: ${sent.payment_url}`);
```

### List Invoices

```typescript
const invoices = await zendfi.listInvoices();

invoices.forEach(inv => {
  console.log(`#${inv.invoice_number}: $${inv.amount} - ${inv.status}`);
});
```

---

## Agent API Keys

### Create Agent Key

```typescript
const agentKey = await zendfi.agent.createKey({
  name: 'Shopping Assistant',
  agent_id: 'shopping-assistant-v1',
  agent_name: 'Smart Shopping Bot',
  scopes: ['create_payments', 'read_payments', 'read_analytics'],
  rate_limit_per_hour: 500,
  metadata: {
    version: '1.0.0',
    capabilities: ['purchase', 'refund'],
  },
});

// ⚠️ SAVE THIS - only shown once!
console.log(`Full Key: ${agentKey.full_key}`);
// => zai_test_abc123xyz...

console.log(`Key Prefix: ${agentKey.key_prefix}`);
// => zai_test_abc1
```

### List Agent Keys

```typescript
const keys = await zendfi.agent.listKeys();

keys.forEach(key => {
  console.log(`${key.name}`);
  console.log(`  Prefix: ${key.key_prefix}***`);
  console.log(`  Scopes: ${key.scopes.join(', ')}`);
  console.log(`  Rate limit: ${key.rate_limit_per_hour}/hr`);
});
```

### Revoke Agent Key

```typescript
await zendfi.agent.revokeKey('ak_123...');
console.log('Agent key revoked - can no longer be used');
```

---

## Agent Sessions

### Create Session

```typescript
const session = await zendfi.agent.createSession({
  agent_id: 'shopping-assistant-v1',
  agent_name: 'Shopping Bot',
  user_wallet: 'UserWallet123...',
  limits: {
    max_per_transaction: 100,    // $100 max per payment
    max_per_day: 500,            // $500 daily limit
    max_per_week: 2000,          // $2000 weekly limit
    max_per_month: 5000,         // $5000 monthly limit
    require_approval_above: 50,  // Manual approval above $50
  },
  allowed_merchants: ['merchant_123', 'merchant_456'],  // Optional whitelist
  duration_hours: 24,
  mint_pkp: true,  // Create on-chain session identity
  metadata: {
    user_id: 'usr_abc',
    purpose: 'grocery_shopping',
  },
});

console.log(`Session Token: ${session.session_token}`);
// => zai_session_abc123...

console.log(`Expires: ${session.expires_at}`);
console.log(`PKP Address: ${session.pkp_address}`);  // If mint_pkp: true
```

### Get Session

```typescript
const session = await zendfi.agent.getSession('sess_123...');

console.log(`Remaining Today: $${session.remaining_today}`);
console.log(`Remaining This Week: $${session.remaining_this_week}`);
console.log(`Remaining This Month: $${session.remaining_this_month}`);
console.log(`Active: ${session.is_active}`);
```

### List Sessions

```typescript
const sessions = await zendfi.agent.listSessions();

const activeSessions = sessions.filter(s => s.is_active);
console.log(`${activeSessions.length} active sessions`);

sessions.forEach(s => {
  console.log(`${s.agent_id}: $${s.remaining_today} remaining today`);
});
```

### Revoke Session

```typescript
await zendfi.agent.revokeSession('sess_123...');
console.log('Session revoked - agent can no longer make payments');
```

### Get Agent Analytics

```typescript
const analytics = await zendfi.agent.getAnalytics();

console.log(`Total Payments: ${analytics.total_payments}`);
console.log(`Total Volume: $${analytics.total_volume_usd}`);
console.log(`Average Payment: $${analytics.average_payment_usd}`);
console.log(`Success Rate: ${(analytics.success_rate * 100).toFixed(1)}%`);
console.log(`Active Sessions: ${analytics.active_sessions}`);
console.log(`PPP Savings: $${analytics.ppp_savings_usd}`);

// Payments by token
Object.entries(analytics.payments_by_token).forEach(([token, count]) => {
  console.log(`  ${token}: ${count} payments`);
});

// Daily breakdown
analytics.payments_by_day.forEach(day => {
  console.log(`${day.date}: ${day.count} payments ($${day.volume_usd})`);
});
```

---

## Payment Intents

### Create Intent

```typescript
const intent = await zendfi.intents.create({
  amount: 99.99,
  currency: 'USD',
  description: 'Annual Pro Plan',
  capture_method: 'automatic',
  agent_id: 'checkout-agent',
  expires_in_seconds: 3600,  // 1 hour
  metadata: {
    plan: 'pro_annual',
  },
});

console.log(`Intent ID: ${intent.id}`);
console.log(`Client Secret: ${intent.client_secret}`);
console.log(`Status: ${intent.status}`);  // "requires_payment"
```

### Confirm Intent

```typescript
const confirmed = await zendfi.intents.confirm('pi_123...', {
  client_secret: 'pi_secret_abc...',
  customer_wallet: 'CustomerWallet123...',
  auto_gasless: true,  // Pay gas fees for user
  metadata: {
    confirmed_by: 'agent',
  },
});

console.log(`Status: ${confirmed.status}`);  // "succeeded"
console.log(`Payment ID: ${confirmed.payment_id}`);
```

### List Intents

```typescript
const intents = await zendfi.intents.list({
  status: 'requires_payment',
  limit: 20,
});

intents.forEach(intent => {
  console.log(`${intent.id}: $${intent.amount} - ${intent.status}`);
});
```

### Cancel Intent

```typescript
const canceled = await zendfi.intents.cancel('pi_123...');
console.log(`Status: ${canceled.status}`);  // "canceled"
```

### Get Intent Events

```typescript
const events = await zendfi.intents.getEvents('pi_123...');

events.forEach(event => {
  console.log(`${event.created_at}: ${event.event_type}`);
  console.log(`  Data: ${JSON.stringify(event.data)}`);
});
```

---

## Pricing (PPP)

### Get PPP Factor

```typescript
const factor = await zendfi.pricing.getPPPFactor('BR');

console.log(`Country: ${factor.country_name}`);          // "Brazil"
console.log(`PPP Factor: ${factor.ppp_factor}`);         // 0.35
console.log(`Discount: ${factor.adjustment_percentage}%`); // 65%
console.log(`Currency: ${factor.currency_code}`);        // "BRL"
```

### List All PPP Factors

```typescript
const factors = await zendfi.pricing.listFactors();

// Sort by discount
const sorted = factors.sort((a, b) => b.adjustment_percentage - a.adjustment_percentage);

console.log('Countries by discount:');
sorted.slice(0, 10).forEach(f => {
  console.log(`  ${f.country_name}: ${f.adjustment_percentage}% off`);
});
```

### Calculate Local Price

```typescript
const result = await zendfi.pricing.calculateLocalPrice(100, 'IN');

console.log(`Original: $${result.original}`);           // $100
console.log(`Local Price: $${result.adjusted}`);        // $40
console.log(`Savings: $${result.savings}`);             // $60
console.log(`Discount: ${result.discount_percentage}%`); // 60%
console.log(`Country: ${result.country}`);              // "India"
```

### Get AI Pricing Suggestion

```typescript
const suggestion = await zendfi.pricing.getSuggestion({
  agent_id: 'shopping-assistant',
  product_id: 'pro_plan',
  base_price: 99.99,
  currency: 'USD',
  user_profile: {
    location_country: 'BR',
    context: 'first-time',  // Hint for additional discount
  },
  ppp_config: {
    enabled: true,
    max_discount_percent: 50,
    floor_price: 29.99,
    extra_discount_percent: 10,  // Extra 10% for first-time
  },
});

console.log(`Suggested: $${suggestion.suggested_amount}`);  // $44.99
console.log(`Min: $${suggestion.min_amount}`);              // $29.99
console.log(`Max: $${suggestion.max_amount}`);              // $99.99
console.log(`PPP Applied: ${suggestion.ppp_adjusted}`);     // true
console.log(`Reasoning: ${suggestion.reasoning}`);
// => "Price adjusted for Brazilian purchasing power (35% PPP) plus 10% first-time discount"
```

---

## Autonomy (Autonomous Delegation)

### Enable Autonomous Mode

```typescript
// Step 1: Create delegation message
const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
const message = zendfi.autonomy.createDelegationMessage(
  'sk_123...',  // Session key ID
  100,          // Max $100
  expiresAt
);
// => "I authorize autonomous delegate for session sk_123... to spend up to $100 until 2024-12-06T..."

// Step 2: Have user sign with their session key
// (Implementation depends on your wallet integration)
const signature = await signMessage(message, sessionKeyPair);

// Step 3: Enable autonomous mode
const delegate = await zendfi.autonomy.enable('sk_123...', {
  max_amount_usd: 100,
  duration_hours: 24,
  delegation_signature: Buffer.from(signature).toString('base64'),
  metadata: {
    purpose: 'autonomous_shopping',
  },
});

console.log(`Delegate ID: ${delegate.delegate_id}`);
console.log(`Expires: ${delegate.expires_at}`);
console.log(`Autonomous: ${delegate.autonomous_mode_enabled}`);  // true
```

### Check Autonomy Status

```typescript
const status = await zendfi.autonomy.getStatus('sk_123...');

if (status.autonomous_mode_enabled && status.delegate) {
  console.log(`Remaining: $${status.delegate.remaining_usd}`);
  console.log(`Used: $${status.delegate.used_amount_usd}`);
  console.log(`Expires: ${status.delegate.expires_at}`);
  console.log(`Last Used: ${status.delegate.last_used_at}`);
} else {
  console.log('Autonomous mode not enabled');
}
```

### Revoke Autonomy

```typescript
await zendfi.autonomy.revoke('sk_123...', 'User requested revocation');
console.log('Autonomous mode disabled');
```

---

## Smart Payments

### Execute Smart Payment

```typescript
const result = await zendfi.smartPayment({
  session_token: 'zai_session_abc...',  // Optional
  agent_id: 'shopping-assistant',
  user_wallet: 'UserWallet123...',
  amount_usd: 49.99,
  token: 'USDC',
  auto_detect_gasless: true,
  instant_settlement: false,
  enable_escrow: false,
  description: 'Premium subscription',
  product_details: {
    name: 'Pro Plan',
    sku: 'PRO-MONTHLY',
  },
  metadata: {
    user_id: 'usr_abc',
  },
});

console.log(`Payment ID: ${result.payment_id}`);
console.log(`Status: ${result.status}`);
console.log(`Gasless: ${result.gasless_used}`);
console.log(`Receipt: ${result.receipt_url}`);

if (result.requires_signature) {
  // Device-bound flow - user needs to sign
  console.log('Transaction to sign:', result.unsigned_transaction);
  console.log('Submit URL:', result.submit_url);
} else {
  // Auto-signed
  console.log(`Transaction: ${result.transaction_signature}`);
  console.log(`Confirmed in: ${result.confirmed_in_ms}ms`);
}
```

### Submit Signed Transaction

```typescript
// After user signs the transaction (device-bound flow)
const result = await zendfi.submitSignedPayment(
  'pay_123...',
  signedTransactionBase64
);

console.log(`Status: ${result.status}`);  // "confirmed"
console.log(`Transaction: ${result.transaction_signature}`);
```

---

## Device-Bound Session Keys

### Create Session Key

```typescript
import { ZendFiSessionKeyManager } from '@zendfi/sdk';

const manager = new ZendFiSessionKeyManager('your-api-key');

const result = await manager.createSessionKey({
  userWallet: 'UserWallet123...',
  limitUSDC: 500,
  durationDays: 30,
  pin: '123456',
  generateRecoveryQR: true,
});

console.log(`Session Key ID: ${result.sessionKeyId}`);
console.log(`Session Wallet: ${result.sessionWallet}`);
console.log(`Limit: $${result.limitUsdc}`);
console.log(`Expires: ${result.expiresAt}`);

// ⚠️ IMPORTANT: Show recovery QR to user!
if (result.recoveryQR) {
  console.log('Save this QR code for recovery!');
  // Display result.recoveryQR as QR image
}
```

### Load Existing Session Key

```typescript
// Load session key on returning user
await manager.loadSessionKey('sk_123...', '123456');
console.log('Session key loaded');
```

### Unlock for Auto-Signing

```typescript
// Unlock once, then payments are instant
await manager.unlockSessionKey('123456', 3600000);  // 1 hour cache

// Check cache status
console.log(`Cached: ${manager.isCached()}`);
console.log(`Time remaining: ${manager.getCacheTimeRemaining()}ms`);
```

### Make Payment

```typescript
// First payment - requires PIN
const payment1 = await manager.makePayment({
  amount: 15.00,
  recipient: 'MerchantWallet...',
  token: 'USDC',
  description: 'Coffee',
  pin: '123456',
});

console.log(`Signature: ${payment1.signature}`);

// Subsequent payments - NO PIN NEEDED! ✨
const payment2 = await manager.makePayment({
  amount: 8.50,
  recipient: 'MerchantWallet...',
  description: 'Snack',
  // No PIN - uses cached keypair!
});
```

### Check Session Key Status

```typescript
const status = await manager.getStatus();

console.log(`Active: ${status.isActive}`);
console.log(`Approved: ${status.isApproved}`);
console.log(`Limit: $${status.limitUsdc}`);
console.log(`Used: $${status.usedAmountUsdc}`);
console.log(`Remaining: $${status.remainingUsdc}`);
console.log(`Days until expiry: ${status.daysUntilExpiry}`);
```

### Recover on New Device

```typescript
await manager.recoverSessionKey({
  sessionKeyId: 'sk_123...',
  recoveryQR: '{"encryptedSessionKey":"..."}',  // From QR scan
  oldPin: '123456',
  newPin: '654321',  // Set new PIN for this device
});

console.log('Session key recovered on new device');
```

### Revoke Session Key

```typescript
await manager.revokeSessionKey();
console.log('Session key revoked');
```

### Clear Cache (Logout)

```typescript
// Clear on logout
manager.clearCache();

// Or auto-clear on tab close
window.addEventListener('beforeunload', () => {
  manager.clearCache();
});
```

---

## Webhooks

### Verify Webhook (Manual)

```typescript
const isValid = zendfi.verifyWebhook({
  payload: req.body,  // Raw request body string
  signature: req.headers['x-zendfi-signature'],
  secret: process.env.ZENDFI_WEBHOOK_SECRET!,
});

if (!isValid) {
  return res.status(401).json({ error: 'Invalid signature' });
}
```

### Next.js Webhook Handler

```typescript
// app/api/webhooks/zendfi/route.ts
import { verifyNextWebhook } from '@zendfi/sdk/webhooks';

export async function POST(request: Request) {
  const webhook = await verifyNextWebhook(request);
  
  if (!webhook) {
    return new Response('Invalid signature', { status: 401 });
  }
  
  switch (webhook.event) {
    case 'payment.confirmed':
      console.log('Payment confirmed:', webhook.data);
      // Update order status, send receipt, etc.
      break;
      
    case 'payment.failed':
      console.log('Payment failed:', webhook.data);
      // Notify user, retry logic, etc.
      break;
      
    case 'subscription.canceled':
      console.log('Subscription canceled:', webhook.data);
      // Revoke access, send survey, etc.
      break;
  }
  
  return new Response('OK');
}
```

### Express.js Webhook Handler

```typescript
import { verifyExpressWebhook } from '@zendfi/sdk/webhooks';

// IMPORTANT: Use raw body parser for webhooks
app.use('/webhooks/zendfi', express.raw({ type: 'application/json' }));

app.post('/webhooks/zendfi', async (req, res) => {
  req.rawBody = req.body.toString();
  
  const webhook = await verifyExpressWebhook(req);
  
  if (!webhook) {
    return res.status(401).json({ error: 'Invalid signature' });
  }
  
  console.log(`Event: ${webhook.event}`);
  console.log(`Data:`, webhook.data);
  
  res.json({ received: true });
});
```

### Process Webhook with Handlers

```typescript
import { processWebhook } from '@zendfi/sdk';

const result = await processWebhook({
  signature: req.headers['x-zendfi-signature'],
  body: req.rawBody,
  handlers: {
    'payment.confirmed': async (data, event) => {
      await db.orders.update({
        where: { payment_id: data.id },
        data: { status: 'paid' },
      });
      await sendReceiptEmail(data.customer_email);
    },
    
    'payment.failed': async (data) => {
      await notifyUser(data.customer_email, 'Payment failed');
    },
    
    'escrow.released': async (data) => {
      await notifySeller(data.seller_wallet, 'Funds released!');
    },
  },
  config: {
    secret: process.env.ZENDFI_WEBHOOK_SECRET!,
    onError: (error, event) => {
      console.error(`Webhook error for ${event}:`, error);
    },
  },
});

if (result.success) {
  res.json({ received: true });
} else {
  res.status(result.statusCode || 500).json({ error: result.error });
}
```

---

## Interceptors

### Request Interceptor

```typescript
// Add custom headers to all requests
zendfi.interceptors.request.use(async (config) => {
  config.headers['X-Request-ID'] = generateRequestId();
  config.headers['X-Client-Version'] = '1.0.0';
  return config;
});
```

### Response Interceptor

```typescript
// Log all responses
zendfi.interceptors.response.use(async (response) => {
  console.log(`${response.config.method} ${response.config.url}: ${response.status}`);
  return response;
});
```

### Error Interceptor

```typescript
// Custom error handling
zendfi.interceptors.error.use(async (error) => {
  if (error.statusCode === 429) {
    // Rate limited - could implement retry logic
    console.warn('Rate limited, please slow down');
  }
  
  // Re-throw to propagate error
  throw error;
});
```

---

## Error Handling

```typescript
import {
  ZendFiError,
  AuthenticationError,
  PaymentError,
  ValidationError,
  NetworkError,
  RateLimitError,
  isZendFiError,
} from '@zendfi/sdk';

try {
  const payment = await zendfi.createPayment({ amount: -10 });
} catch (error) {
  if (isZendFiError(error)) {
    console.log(`Error Code: ${error.code}`);
    console.log(`Status: ${error.statusCode}`);
    console.log(`Message: ${error.message}`);
    console.log(`Details:`, error.details);
    
    if (error instanceof AuthenticationError) {
      // Invalid API key
      console.log('Check your API key');
    } else if (error instanceof ValidationError) {
      // Invalid request data
      console.log('Fix request:', error.details);
    } else if (error instanceof RateLimitError) {
      // Too many requests
      console.log('Slow down!');
    } else if (error instanceof NetworkError) {
      // Connection issues
      console.log('Check network');
    }
  }
}
```

---

## Environment Variables

```bash
# Required
ZENDFI_API_KEY=zfi_live_your_api_key

# Optional
ZENDFI_WEBHOOK_SECRET=whsec_your_secret
ZENDFI_ENVIRONMENT=production  # or development
ZENDFI_DEBUG=true              # Enable request logging
```

---

## TypeScript Types

```typescript
import type {
  // Core
  Payment,
  PaymentStatus,
  PaymentToken,
  Currency,
  
  // Subscriptions
  Subscription,
  SubscriptionPlan,
  SubscriptionStatus,
  
  // Installments
  InstallmentPlan,
  InstallmentPlanStatus,
  
  // Escrow
  Escrow,
  EscrowStatus,
  ReleaseCondition,
  
  // Invoices
  Invoice,
  InvoiceStatus,
  InvoiceLineItem,
  
  // Agent
  AgentApiKey,
  AgentSession,
  SessionLimits,
  AgentAnalytics,
  
  // Intents
  PaymentIntent,
  PaymentIntentStatus,
  
  // Pricing
  PPPFactor,
  PricingSuggestion,
  
  // Autonomy
  AutonomousDelegate,
  AutonomyStatus,
  
  // Smart Payments
  SmartPaymentRequest,
  SmartPaymentResponse,
  
  // Webhooks
  WebhookPayload,
  WebhookEvent,
} from '@zendfi/sdk';
```
