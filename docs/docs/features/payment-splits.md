---
sidebar_position: 1
title: Payment Splits
description: Automatic revenue distribution to multiple wallets
---

# Payment Splits

Automatically distribute payments across multiple recipients with configurable percentages or fixed amounts. Perfect for marketplaces, affiliate programs, and revenue sharing.

## How It Works

```
Customer Payment ($100)
        ↓
    ZendFi Splits
        ↓
┌───────────────────┬───────────────────┬───────────────────┐
│   Merchant (70%)  │   Partner (20%)   │  Affiliate (10%)  │
│       $70         │       $20         │       $10         │
└───────────────────┴───────────────────┴───────────────────┘
```

When a payment is completed, funds are automatically distributed to all split recipients according to the specified percentages or fixed amounts.


## What's Built In?

- **Atomic Transfers** - All splits happen in one transaction on Solana
- **Flexible Configuration** - Use percentages OR fixed USD amounts per recipient
- **Multiple Recipients** - Distribute to multiple wallets simultaneously
- **Per-Payment Configuration** - Set splits individually for each payment
- **Real-Time Settlement** - Recipients receive funds when payment confirms
- **Automatic Retry** - Failed splits are automatically retried


## Use Cases

| Use Case | Example Split |
|----------|---------------|
| **Marketplace** | 85% Seller / 15% Platform |
| **Affiliates** | 90% Merchant / 10% Referrer |
| **Team Revenue** | 50% Lead / 30% Dev / 20% Design |
| **Royalties** | 80% Artist / 20% Label |
| **Franchises** | 70% Location / 30% Corporate |


## Create Payment with Splits

Add splits to any payment request.

### Request Parameters

Add a `split_recipients` array to your payment request:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `recipient_wallet` | string | **Yes** | Recipient's Solana wallet address |
| `percentage` | number | Conditional | Percentage of payment (0.01 - 100) |
| `fixed_amount_usd` | number | Conditional | Fixed USD amount to send |
| `recipient_name` | string | No | Recipient name for your records |
| `split_order` | number | No | Order of execution (default: 0) |

:::warning Split Configuration
Each recipient must have **either** `percentage` OR `fixed_amount_usd` (not both).

For percentage-based splits:
- Total percentages can be ≤ 100%
- If total < 100%, remainder goes to your merchant wallet
- If total = 100%, entire payment is distributed to recipients
:::

### Example: Marketplace with Platform Fee

```bash
curl -X POST https://api.zendfi.tech/api/v1/payments \
  -H "Authorization: Bearer zfi_live_abc123..." \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 100,
    "currency": "USD",
    "description": "Vintage Camera - Seller: vintage_finds",
    "split_recipients": [
      {
        "recipient_wallet": "SellerWalletAddress123...",
        "percentage": 85,
        "recipient_name": "vintage_finds",
        "split_order": 0
      },
      {
        "recipient_wallet": "YourPlatformWallet456...",
        "percentage": 15,
        "recipient_name": "Platform Fee",
        "split_order": 1
      }
    ],
    "metadata": {
      "listing_id": "listing_789",
      "seller_username": "vintage_finds"
    }
  }'
```

**Result:** When customer pays $100:
- Seller receives $85 directly to their wallet
- Platform receives $15 to your merchant wallet
- Both transfers happen atomically in one Solana transaction

### Example: Affiliate Commission

```bash
curl -X POST https://api.zendfi.tech/api/v1/payments \
  -H "Authorization: Bearer zfi_live_abc123..." \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 299,
    "currency": "USD",
    "description": "Pro Plan Subscription",
    "split_recipients": [
      {
        "recipient_wallet": "YourMerchantWallet...",
        "percentage": 90,
        "recipient_name": "Merchant"
      },
      {
        "recipient_wallet": "AffiliateWalletXYZ...",
        "percentage": 10,
        "recipient_name": "Affiliate - John"
      }
    ],
    "metadata": {
      "affiliate_code": "JOHN10",
      "campaign": "launch_promo"
    }
  }'
```

### Example: Multi-Party Revenue Share

```bash
curl -X POST https://api.zendfi.tech/api/v1/payments \
  -H "Authorization: Bearer zfi_live_abc123..." \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 1000,
    "currency": "USD",
    "description": "Website Development Project",
    "split_recipients": [
      {
        "recipient_wallet": "ProjectLeadWallet...",
        "percentage": 50,
        "recipient_name": "Project Lead",
        "split_order": 0
      },
      {
        "recipient_wallet": "DeveloperWallet...",
        "percentage": 30,
        "recipient_name": "Developer",
        "split_order": 1
      },
      {
        "recipient_wallet": "DesignerWallet...",
        "percentage": 20,
        "recipient_name": "Designer",
        "split_order": 2
      }
    ]
  }'
```

**Result:**
- Project Lead: $500
- Developer: $300
- Designer: $200

### Example: Fixed Amount Splits

```bash
curl -X POST https://api.zendfi.tech/api/v1/payments \
  -H "Authorization: Bearer zfi_live_abc123..." \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 1000,
    "currency": "USD",
    "description": "Custom Project with Fixed Fees",
    "split_recipients": [
      {
        "recipient_wallet": "ConsultantWallet...",
        "fixed_amount_usd": 250,
        "recipient_name": "Consultant Fee"
      },
      {
        "recipient_wallet": "ReferralWallet...",
        "fixed_amount_usd": 50,
        "recipient_name": "Referral Bonus"
      }
    ]
  }'
```

**Result:**
- Consultant: $250 (fixed)
- Referral: $50 (fixed)
- Merchant: $700 (remainder)


## Split Validation

ZendFi validates all splits before processing:

| Validation | Description |
|------------|-------------|
| **Configuration Check** | Each recipient must have percentage OR fixed_amount_usd (not both) |
| **Total Check** | Percentage totals must be ≤ 100% |
| **Wallet Validation** | All wallets must be valid Solana addresses |
| **Duplicate Check** | No duplicate wallet addresses allowed |
| **Amount Validation** | Fixed amounts must be positive |
| **Percentage Range** | Percentages must be 0-100 |


## Split Settlement

### Atomic Transactions

All splits settle in a single Solana transaction:
- Either all recipients receive funds, or none do
- No partial settlements
- One transaction signature for the entire payment
- Automatic retry on failure

### Settlement Timing

| Scenario | Settlement |
|----------|------------|
| **Standard Payment** | Immediate (when payment confirms) |
| **Subscription Renewal** | Splits applied each billing cycle |

### Split Status

Each split has a status that tracks its settlement:

| Status | Description |
|--------|-------------|
| `pending` | Split created, waiting for payment confirmation |
| `processing` | Payment confirmed, split transfer in progress |
| `completed` | Split successfully transferred to recipient |
| `failed` | Split transfer failed (will auto-retry) |
| `refunded` | Split was refunded |


## Webhook Data

Payment webhooks include split details:

```json
{
  "event": "PaymentConfirmed",
  "timestamp": "2025-12-24T15:00:00Z",
  "merchant_id": "merch_abc123",
  "payment": {
    "id": "pay_abc123",
    "merchant_id": "merch_abc123",
    "amount_usd": 100,
    "status": "confirmed",
    "transaction_signature": "5K2Nz...",
    "customer_wallet": "CustomerWallet...",
    "payment_token": "USDC",
    "splits": [
      {
        "id": "split_123",
        "recipient_wallet": "SellerWalletAddress123...",
        "recipient_name": "vintage_finds",
        "percentage": 85,
        "amount_usd": 85,
        "amount_crypto": 85.0,
        "currency": "USDC",
        "status": "completed",
        "transaction_signature": "5K2Nz...",
        "settled_at": "2025-12-24T15:00:05Z",
        "split_order": 0
      },
      {
        "id": "split_124",
        "recipient_wallet": "YourPlatformWallet456...",
        "recipient_name": "Platform Fee",
        "percentage": 15,
        "amount_usd": 15,
        "amount_crypto": 15.0,
        "currency": "USDC",
        "status": "completed",
        "transaction_signature": "5K2Nz...",
        "settled_at": "2025-12-24T15:00:05Z",
        "split_order": 1
      }
    ],
    "created_at": "2025-12-24T14:58:00Z",
    "expires_at": "2025-12-24T15:58:00Z"
  }
}
```


## Using SDK

### TypeScript/JavaScript

```typescript
import { ZendFiClient } from '@zendfi/sdk';
import type { CreatePaymentRequest, SplitRecipient } from '@zendfi/sdk';

const zendfi = new ZendFiClient({
  apiKey: process.env.ZENDFI_API_KEY,
});

// Create payment with splits
const splitRecipients: SplitRecipient[] = [
  {
    recipient_wallet: 'SellerWallet...',
    percentage: 85,
    recipient_name: 'Seller',
    split_order: 0
  },
  {
    recipient_wallet: 'PlatformWallet...',
    percentage: 15,
    recipient_name: 'Platform',
    split_order: 1
  }
];

const payment = await zendfi.createPayment({
  amount: 100,
  currency: 'USD',
  description: 'Marketplace sale',
  split_recipients: splitRecipients
});

console.log('Payment URL:', payment.payment_url);
```

### Python

```python
import zendfi

client = zendfi.Client(api_key="zfi_live_abc123...")

# Create payment with splits
payment = client.payments.create(
    amount=100,
    currency="USD",
    description="Marketplace sale",
    split_recipients=[
        {
            "recipient_wallet": "SellerWallet...",
            "percentage": 85,
            "recipient_name": "Seller",
            "split_order": 0
        },
        {
            "recipient_wallet": "PlatformWallet...",
            "percentage": 15,
            "recipient_name": "Platform",
            "split_order": 1
        }
    ]
)

print(f"Payment URL: {payment['payment_url']}")
```


## Edge Cases

### Minimum Split Amounts

Small percentages may result in tiny amounts. The minimum transferable amount on Solana is determined by the token's decimal places (typically $0.000001 for USDC).

```
$1.00 payment with 0.5% split = $0.005
$0.50 payment with 1% split = $0.005
```

### Remainder Handling

If percentages total less than 100%, the remainder goes to your merchant wallet:

```json
{
  "split_recipients": [
    { "recipient_wallet": "Partner1...", "percentage": 30 },
    { "recipient_wallet": "Partner2...", "percentage": 20 }
  ]
}
// 50% remainder → Your merchant wallet receives $50 from $100 payment
```

### Failed Split Recovery

If a split fails (e.g., invalid recipient wallet, network issues):
- Split status becomes `failed`
- Automatic retry attempts are made
- You'll receive a webhook with `failure_reason`
- Failed splits don't prevent payment completion


## Best Practices

### For Marketplaces

1. **Verify Seller Wallets** - Validate wallet addresses before onboarding sellers
2. **Clear Fee Structure** - Document platform fees in your terms of service
3. **Track by Name** - Use `recipient_name` field for easy reconciliation
4. **Monitor Split Status** - Track split status via webhooks to detect issues

### For Affiliates

1. **Unique Identification** - Use `recipient_name` to track each affiliate
2. **Metadata Tracking** - Store affiliate codes in payment metadata
3. **Cap Commissions** - Consider using `fixed_amount_usd` for maximum limits
4. **Attribution Windows** - Track referral sources in metadata

### For Revenue Sharing

1. **Use Split Order** - Set `split_order` to control execution sequence
2. **Mix Percentage and Fixed** - Combine fixed platform fees with percentage splits
3. **Document Agreements** - Keep split configurations in contracts
4. **Audit Trail** - Use `recipient_name` for clear audit trails


## Next Steps

- [Payments API](../api/payments) - Full API reference
- [Webhooks](./webhooks) - Get notified of split settlements
- [SDK Documentation](../developer-tools/typescript-guide) - Type-safe development
