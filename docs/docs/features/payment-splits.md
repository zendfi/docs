---
sidebar_position: 1
title: Payment Splits
description: Automatic revenue distribution to multiple wallets
---

# Payment Splits

Automatically distribute payments across multiple recipients with configurable percentages. Perfect for marketplaces, affiliate programs, and revenue sharing.

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

When a payment is completed, funds are automatically distributed to all split recipients in a single atomic transaction.

---

## Features

- ✅ **Atomic Transfers** - All splits happen in one transaction
- ✅ **Flexible Percentages** - Any split configuration totaling 100%
- ✅ **Multiple Recipients** - Up to 10 recipients per payment
- ✅ **Per-Payment or Global** - Set splits per payment or as defaults
- ✅ **Real-Time Settlement** - Recipients receive funds immediately

---

## Use Cases

| Use Case | Example Split |
|----------|---------------|
| 🏪 **Marketplace** | 85% Seller / 15% Platform |
| 🤝 **Affiliates** | 90% Merchant / 10% Referrer |
| 👥 **Team Revenue** | 50% Lead / 30% Dev / 20% Design |
| 💰 **Royalties** | 80% Artist / 20% Label |
| 🏢 **Franchises** | 70% Location / 30% Corporate |

---

## Create Payment with Splits

Add splits to any payment request.

### Request Parameters

Add a `splits` array to your payment request:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `wallet` | string | **Yes** | Recipient's Solana wallet address |
| `percentage` | number | **Yes** | Percentage of payment (0.01 - 99.99) |
| `name` | string | No | Recipient name for your records |
| `reference` | string | No | Reference ID for reconciliation |

:::warning Split Total
All split percentages must total exactly 100%. If they total less than 100%, the remainder goes to your merchant wallet.
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
    "splits": [
      {
        "wallet": "SellerWalletAddress123...",
        "percentage": 85,
        "name": "vintage_finds",
        "reference": "seller_001"
      },
      {
        "wallet": "YourPlatformWallet456...",
        "percentage": 15,
        "name": "Platform Fee",
        "reference": "platform"
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

### Example: Affiliate Commission

```bash
curl -X POST https://api.zendfi.tech/api/v1/payments \
  -H "Authorization: Bearer zfi_live_abc123..." \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 299,
    "currency": "USD",
    "description": "Pro Plan Subscription",
    "splits": [
      {
        "wallet": "YourMerchantWallet...",
        "percentage": 90,
        "name": "Merchant"
      },
      {
        "wallet": "AffiliateWalletXYZ...",
        "percentage": 10,
        "name": "Affiliate - John",
        "reference": "aff_john_123"
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
    "splits": [
      {
        "wallet": "ProjectLeadWallet...",
        "percentage": 50,
        "name": "Project Lead"
      },
      {
        "wallet": "DeveloperWallet...",
        "percentage": 30,
        "name": "Developer"
      },
      {
        "wallet": "DesignerWallet...",
        "percentage": 20,
        "name": "Designer"
      }
    ]
  }'
```

**Result:**
- Project Lead: $500
- Developer: $300
- Designer: $200

---

## Default Splits

Set default splits for all payments from your merchant account.

### Configure Default Splits

```
PATCH /api/v1/merchants/settings
```

```bash
curl -X PATCH https://api.zendfi.tech/api/v1/merchants/settings \
  -H "Authorization: Bearer zfi_live_abc123..." \
  -H "Content-Type: application/json" \
  -d '{
    "default_splits": [
      {
        "wallet": "PartnerWalletAddress...",
        "percentage": 5,
        "name": "Strategic Partner"
      }
    ]
  }'
```

Now all payments will automatically include 5% to your partner (unless overridden).

### Override Default Splits

Pass `splits` in your payment request to override defaults:

```json
{
  "amount": 100,
  "currency": "USD",
  "splits": [],  // Empty array = no splits for this payment
  "override_default_splits": true
}
```

---

## Split Verification

ZendFi validates all splits before processing:

| Validation | Description |
|------------|-------------|
| ✅ **Total Check** | Percentages must total ≤ 100% |
| ✅ **Wallet Validation** | All wallets must be valid Solana addresses |
| ✅ **Minimum Amount** | Each split must result in at least $0.01 |
| ✅ **Recipient Limit** | Maximum 10 recipients per payment |

---

## Split Settlement

### Atomic Transactions

All splits settle in a single Solana transaction:
- Either all recipients receive funds, or none do
- No partial settlements
- One transaction signature for the entire payment

### Settlement Timing

| Scenario | Settlement |
|----------|------------|
| **Standard Payment** | Immediate (same block as payment) |
| **Escrow Release** | Splits applied when milestone released |
| **Subscription Renewal** | Splits applied each billing cycle |

---

## Webhook Data

Payment webhooks include split details:

```json
{
  "event": "payment.completed",
  "timestamp": "2025-10-26T15:00:00Z",
  "data": {
    "payment_id": "pay_abc123",
    "amount": 100,
    "currency": "USD",
    "transaction_signature": "5K2Nz...",
    "splits": [
      {
        "wallet": "SellerWalletAddress123...",
        "percentage": 85,
        "amount": 85,
        "name": "vintage_finds",
        "reference": "seller_001",
        "settled": true
      },
      {
        "wallet": "YourPlatformWallet456...",
        "percentage": 15,
        "amount": 15,
        "name": "Platform Fee",
        "reference": "platform",
        "settled": true
      }
    ]
  }
}
```

---

## Reporting

### Get Split Summary

View all split payments and distributions:

```
GET /api/v1/splits/summary
```

```bash
curl -X GET "https://api.zendfi.tech/api/v1/splits/summary?from=2025-10-01&to=2025-10-31" \
  -H "Authorization: Bearer zfi_live_abc123..."
```

**Response:**

```json
{
  "period": {
    "from": "2025-10-01T00:00:00Z",
    "to": "2025-10-31T23:59:59Z"
  },
  "total_payments": 150,
  "total_volume": 45000,
  "recipients": [
    {
      "wallet": "SellerWallet1...",
      "name": "Top Seller",
      "payments_count": 45,
      "total_received": 12750
    },
    {
      "wallet": "SellerWallet2...",
      "name": "Active Seller",
      "payments_count": 30,
      "total_received": 8500
    }
  ],
  "platform_revenue": 6750
}
```

---

## Edge Cases

### Minimum Split Amounts

If a split results in less than $0.01, it's rounded:

```
$1.00 payment with 0.5% split = $0.005 → Rounded to $0.01
$0.50 payment with 1% split = $0.005 → Rounded to $0.01
```

### Remainder Handling

If percentages total less than 100%, the remainder goes to your merchant wallet:

```json
{
  "splits": [
    { "wallet": "Partner1...", "percentage": 30 },
    { "wallet": "Partner2...", "percentage": 20 }
  ]
}
// 50% remainder → Your merchant wallet
```

---

## Best Practices

### For Marketplaces

1. **Verify Seller Wallets** - Validate wallet addresses before onboarding
2. **Clear Fee Structure** - Document platform fees in your terms
3. **Handle Disputes** - Have a process for split payment disputes
4. **Track by Reference** - Use `reference` field for reconciliation

### For Affiliates

1. **Unique References** - Track each affiliate with unique reference IDs
2. **Cap Commissions** - Consider maximum commission amounts
3. **Attribution Windows** - Track referral sources in metadata
4. **Payout Reports** - Generate reports for affiliate reconciliation

---

## Next Steps

- [Payments API](/api/payments) - Create payments with splits
- [Webhooks](/features/webhooks) - Get notified of split settlements
- [Escrow](/api/escrows) - Apply splits to escrow releases
