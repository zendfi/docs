# Advanced Features - Level Up Your Payments!

Welcome to Advanced Features! This is where ZendFi gets really powerful. From splitting payments among multiple recipients to subscriptions and escrow - we've got enterprise-grade features ready for you. Let's explore! ✨

---

## Table of Contents
- [Payment Splits (Available Now!)](#payment-splits-available-now)
- [Subscriptions (Coming Soon)](#subscriptions-coming-soon)
- [Installment Plans (Coming Soon)](#installment-plans-coming-soon)
- [Escrow Payments (Coming Soon)](#escrow-payments-coming-soon)
- [Invoices (Coming Soon)](#invoices-coming-soon)

---

## Payment Splits (Available Now!)

**Payment Splits** let you automatically distribute a single payment among multiple recipients - perfect for marketplaces, affiliate programs, revenue sharing, and multi-vendor platforms!

### How It Works

1. Customer makes a single payment
2. ZendFi receives the full amount
3. After confirmation, funds are automatically split
4. Each recipient gets their share sent to their wallet
5. All splits tracked with unique transaction signatures

### Perfect For:

- **Marketplaces**: Split between seller, platform fee, and payment processor
- **Affiliates**: Share revenue with referral partners
- **Creators**: Split royalties with collaborators
- **Agencies**: Distribute payments among team members
- **Platforms**: Revenue sharing (e.g., Spotify-style splits)

---

## Create Payment with Splits

Add `split_recipients` to any payment creation request!

### Endpoint
```
POST /api/v1/payments
```

### Authentication
```
Authorization: Bearer YOUR_API_KEY
```

### Request Parameters

**Basic Payment Fields:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `amount` | number | Yes | Total payment amount in USD |
| `currency` | string | Yes | Currency code (USD only) |
| `token` | string | No | Token to receive (USDC, SOL, USDT) |
| `description` | string | No | Payment description |
| `metadata` | object | No | Custom data (max 16KB JSON) |

**Split Fields:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `split_recipients` | array | No | Array of split recipient objects |
| `split_recipients[].recipient_wallet` | string | Yes | Solana wallet address (base58) |
| `split_recipients[].recipient_name` | string | No | Recipient name for reference |
| `split_recipients[].percentage` | number | Yes* | Percentage of payment (0-100) |
| `split_recipients[].fixed_amount_usd` | number | Yes* | Fixed USD amount |
| `split_recipients[].split_order` | number | No | Order of execution (default: 0) |

**\*Note:** Use **either** `percentage` OR `fixed_amount_usd`, not both.

### Response Fields

**Standard Payment Response + Split IDs:**
| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Payment ID |
| `amount` | number | Payment amount in USD |
| `currency` | string | Currency code |
| `status` | string | Payment status |
| `qr_code` | string | Solana Pay URI |
| `payment_url` | string | Payment URL |
| `expires_at` | datetime | Expiration timestamp (15 minutes) |
| `split_ids` | array | Array of split IDs (if splits configured) |

---

## Payment Split Examples

### Example 1: Marketplace with Platform Fee (Percentage)

Perfect for platforms like Etsy, Gumroad, or any marketplace!

**Request:**
```bash
curl -X POST https://api.zendfi.tech/api/v1/payments \
  -H "Authorization: Bearer zfi_test_abc123..." \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 100.00,
    "currency": "USD",
    "token": "USDC",
    "description": "Handmade Pottery - Order #12345",
    "metadata": {
      "order_id": "12345",
      "product": "Ceramic Vase",
      "seller": "ArtisanPottery"
    },
    "split_recipients": [
      {
        "recipient_wallet": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
        "recipient_name": "Seller - ArtisanPottery",
        "percentage": 85.0,
        "split_order": 1
      },
      {
        "recipient_wallet": "8yKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsV",
        "recipient_name": "Platform Fee",
        "percentage": 10.0,
        "split_order": 2
      },
      {
        "recipient_wallet": "9zKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsW",
        "recipient_name": "Payment Processor",
        "percentage": 5.0,
        "split_order": 3
      }
    ]
  }'
```

**Response:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "amount": 100.00,
  "currency": "USD",
  "status": "Pending",
  "qr_code": "solana:ABC123...?amount=100&spl-token=USDC",
  "payment_url": "https://zendfi.tech/pay/550e8400-e29b-41d4-a716-446655440000",
  "expires_at": "2024-01-15T10:45:00Z",
  "split_ids": [
    "660e8400-e29b-41d4-a716-446655440001",
    "770e8400-e29b-41d4-a716-446655440002",
    "880e8400-e29b-41d4-a716-446655440003"
  ]
}
```

**What Happens:**
1. Customer pays $100 USDC
2. After confirmation:
   - Seller gets $85 (85%)
   - Platform gets $10 (10%)
   - Payment processor gets $5 (5%)
3. All splits executed automatically
4. Each recipient gets a separate transaction

---

### Example 2: Affiliate Program (Fixed + Percentage)

Great for referral programs and affiliate marketing!

**Request:**
```bash
curl -X POST https://api.zendfi.tech/api/v1/payments \
  -H "Authorization: Bearer zfi_test_abc123..." \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 299.99,
    "currency": "USD",
    "token": "USDC",
    "description": "Premium Course - Web3 Development",
    "metadata": {
      "course_id": "web3-101",
      "affiliate_code": "JOHN2024"
    },
    "split_recipients": [
      {
        "recipient_wallet": "AxKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsX",
        "recipient_name": "Course Creator",
        "percentage": 70.0,
        "split_order": 1
      },
      {
        "recipient_wallet": "BxKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsY",
        "recipient_name": "Affiliate - John",
        "fixed_amount_usd": 50.00,
        "split_order": 2
      },
      {
        "recipient_wallet": "CxKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsZ",
        "recipient_name": "Platform",
        "percentage": 13.33,
        "split_order": 3
      }
    ]
  }'
```

**Response:**
```json
{
  "id": "990e8400-e29b-41d4-a716-446655440004",
  "amount": 299.99,
  "currency": "USD",
  "status": "Pending",
  "qr_code": "solana:DEF456...?amount=299.99&spl-token=USDC",
  "payment_url": "https://zendfi.tech/pay/990e8400-e29b-41d4-a716-446655440004",
  "expires_at": "2024-01-15T11:00:00Z",
  "split_ids": [
    "aa0e8400-e29b-41d4-a716-446655440005",
    "bb0e8400-e29b-41d4-a716-446655440006",
    "cc0e8400-e29b-41d4-a716-446655440007"
  ]
}
```

**What Happens:**
1. Customer pays $299.99 USDC
2. After confirmation:
   - Course creator gets $210.00 (70% = ~$209.99, rounded)
   - Affiliate gets $50.00 (fixed amount)
   - Platform gets $39.99 (remaining after fixed amounts)
3. All recipients paid automatically

**Split Calculation:**
- Course Creator: 70% of $299.99 = $209.99
- Affiliate: Fixed $50.00
- Platform: 13.33% of remaining = ~$40.00

---

### Example 3: Multi-Creator Revenue Share

Perfect for music, podcasts, or collaborative content!

**Request:**
```bash
curl -X POST https://api.zendfi.tech/api/v1/payments \
  -H "Authorization: Bearer zfi_live_xyz789..." \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 9.99,
    "currency": "USD",
    "token": "USDC",
    "description": "Album Purchase - Midnight Dreams",
    "metadata": {
      "album_id": "midnight-dreams",
      "format": "digital"
    },
    "split_recipients": [
      {
        "recipient_wallet": "DxKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsA",
        "recipient_name": "Artist 1 - Vocals",
        "percentage": 40.0,
        "split_order": 1
      },
      {
        "recipient_wallet": "ExKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsB",
        "recipient_name": "Artist 2 - Production",
        "percentage": 40.0,
        "split_order": 2
      },
      {
        "recipient_wallet": "FxKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsC",
        "recipient_name": "Label",
        "percentage": 15.0,
        "split_order": 3
      },
      {
        "recipient_wallet": "GxKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsD",
        "recipient_name": "Distribution Platform",
        "percentage": 5.0,
        "split_order": 4
      }
    ]
  }'
```

**Response:**
```json
{
  "id": "dd0e8400-e29b-41d4-a716-446655440008",
  "amount": 9.99,
  "currency": "USD",
  "status": "Pending",
  "qr_code": "solana:GHI789...?amount=9.99&spl-token=USDC",
  "payment_url": "https://zendfi.tech/pay/dd0e8400-e29b-41d4-a716-446655440008",
  "expires_at": "2024-01-15T11:15:00Z",
  "split_ids": [
    "ee0e8400-e29b-41d4-a716-446655440009",
    "ff0e8400-e29b-41d4-a716-446655440010",
    "000e8400-e29b-41d4-a716-446655440011",
    "110e8400-e29b-41d4-a716-446655440012"
  ]
}
```

**What Happens:**
1. Customer pays $9.99 USDC
2. After confirmation:
   - Vocalist gets $3.996 (40%)
   - Producer gets $3.996 (40%)
   - Label gets $1.499 (15%)
   - Platform gets $0.499 (5%)
3. Percentages add up to 100%
4. Each artist gets paid directly

---

## Split Validation Rules

ZendFi automatically validates your splits to prevent errors! ✅

### Percentage-Based Splits
- Total percentages must equal exactly 100%
- Each percentage: 0.01% to 99.99%
- At least 1 recipient required
- Maximum 10 recipients per payment

### Fixed Amount Splits
- zendfi.techTotal fixed amounts must be less than payment amount
- zendfi.techRemaining balance distributed via percentages
- zendfi.techMinimum $0.01 per recipient
- zendfi.techEach wallet address must be valid Solana address

### General Rules
- zendfi.techNo duplicate wallet addresses
- zendfi.techCannot split to the merchant's own wallet
- zendfi.techAll wallet addresses must be base58 format
- zendfi.tech`split_order` determines execution sequence
- zendfi.techEach split gets unique ID for tracking

---

## Error Responses

### 400 Bad Request - Invalid Split Configuration

**Total percentages don't equal 100%:**
```json
{
  "error": "Invalid split configuration",
  "details": "Total percentages must equal 100%, got 95%",
  "field": "split_recipients"
}
```

**Solution:** Ensure all percentages add up to exactly 100.

---

**Fixed amounts exceed payment total:**
```json
{
  "error": "Invalid split configuration",
  "details": "Total fixed amounts ($120.00) exceed payment amount ($100.00)",
  "field": "split_recipients"
}
```

**Solution:** Fixed amounts must leave room for percentage-based splits.

---

**Invalid wallet address:**
```json
{
  "error": "Invalid split configuration",
  "details": "Invalid Solana wallet address: invalid_address",
  "field": "split_recipients[0].recipient_wallet"
}
```

**Solution:** All recipient wallets must be valid base58 Solana addresses.

---

**Duplicate wallets:**
```json
{
  "error": "Invalid split configuration",
  "details": "Duplicate wallet address: 7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
  "field": "split_recipients"
}
```

**Solution:** Each recipient must have a unique wallet address.

---

**Too many recipients:**
```json
{
  "error": "Invalid split configuration",
  "details": "Maximum 10 split recipients allowed, got 15",
  "field": "split_recipients"
}
```

**Solution:** Limit splits to 10 recipients per payment.

---

**Missing required field:**
```json
{
  "error": "Invalid split configuration",
  "details": "Either percentage or fixed_amount_usd is required",
  "field": "split_recipients[1]"
}
```

**Solution:** Each recipient needs either `percentage` or `fixed_amount_usd`.

---

## Split Status & Tracking

Each split has its own lifecycle and can be tracked independently!

### Split Statuses

| Status | Description |
|--------|-------------|
| `pending` | Payment confirmed, split queued for processing |
| `processing` | Split transaction being sent on-chain |
| `completed` | Split successfully sent to recipient |
| `failed` | Split failed (will retry automatically) |
| `refunded` | Split was refunded due to payment refund |

### Automatic Retry

If a split fails (network issues, insufficient fees, etc.), ZendFi automatically retries:
- **1st retry:** After 1 minute
- **2nd retry:** After 5 minutes
- **3rd retry:** After 15 minutes
- **4th retry:** After 1 hour
- **5th retry:** After 24 hours

After 5 failed attempts, the split is moved to manual review.

---

## Webhooks for Splits

ZendFi sends separate webhook events for split completions!

### Split Webhook Events

**Split Completed:**
```json
{
  "event": "SplitCompleted",
  "split": {
    "id": "660e8400-e29b-41d4-a716-446655440001",
    "payment_id": "550e8400-e29b-41d4-a716-446655440000",
    "recipient_wallet": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
    "recipient_name": "Seller - ArtisanPottery",
    "amount_usd": 85.00,
    "amount_crypto": 85.00,
    "currency": "USDC",
    "status": "completed",
    "transaction_signature": "5KzZ8LWvZh7NYjJvPhHGYnNrB2rKqb2...",
    "settled_at": "2024-01-15T10:35:00Z"
  },
  "timestamp": "2024-01-15T10:35:00Z"
}
```

**Split Failed:**
```json
{
  "event": "SplitFailed",
  "split": {
    "id": "770e8400-e29b-41d4-a716-446655440002",
    "payment_id": "550e8400-e29b-41d4-a716-446655440000",
    "recipient_wallet": "8yKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsV",
    "failure_reason": "Insufficient SOL for transaction fees",
    "retry_count": 3,
    "next_retry_at": "2024-01-15T11:35:00Z"
  },
  "timestamp": "2024-01-15T10:36:00Z"
}
```

---

## Code Examples

### Node.js: Create Payment with Splits

```javascript
const axios = require('axios');

const ZENDFI_API_KEY = process.env.ZENDFI_API_KEY;

async function createMarketplacePayment(orderData) {
  const { 
    totalAmount, 
    sellerWallet, 
    sellerPercentage,
    platformWallet,
    platformPercentage 
  } = orderData;

  try {
    const response = await axios.post(
      'https://api.zendfi.tech/api/v1/payments',
      {
        amount: totalAmount,
        currency: 'USD',
        token: 'USDC',
        description: `Order ${orderData.orderId} - ${orderData.productName}`,
        metadata: {
          order_id: orderData.orderId,
          seller_id: orderData.sellerId,
          product_id: orderData.productId
        },
        split_recipients: [
          {
            recipient_wallet: sellerWallet,
            recipient_name: `Seller - ${orderData.sellerName}`,
            percentage: sellerPercentage,
            split_order: 1
          },
          {
            recipient_wallet: platformWallet,
            recipient_name: 'Platform Fee',
            percentage: platformPercentage,
            split_order: 2
          }
        ]
      },
      {
        headers: {
          'Authorization': `Bearer ${ZENDFI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const payment = response.data;
    console.log('zendfi.techPayment created with splits:');
    console.log(`  Payment ID: ${payment.id}`);
    console.log(`  Amount: $${payment.amount} ${payment.currency}`);
    console.log(`  Splits: ${payment.split_ids.length} recipients`);
    console.log(`  QR Code: ${payment.qr_code}`);
    console.log(`  Expires: ${payment.expires_at}`);

    return payment;
  } catch (error) {
    console.error('❌ Failed to create payment:', error.response?.data || error.message);
    throw error;
  }
}

// Example usage
(async () => {
  const payment = await createMarketplacePayment({
    orderId: 'ORD-12345',
    productName: 'Handmade Ceramic Vase',
    productId: 'PROD-999',
    totalAmount: 100.00,
    sellerId: 'SELLER-123',
    sellerName: 'ArtisanPottery',
    sellerWallet: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
    sellerPercentage: 85.0,
    platformWallet: '8yKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsV',
    platformPercentage: 15.0
  });

  console.log('\n💡 Next steps:');
  console.log('1. Show QR code to customer');
  console.log('2. Monitor payment status via webhooks');
  console.log('3. Splits will process automatically after confirmation');
})();
```

---

### Python: Affiliate Payment with Fixed Commission

```python
import requests
import os

ZENDFI_API_KEY = os.getenv('ZENDFI_API_KEY')
BASE_URL = 'https://api.zendfi.tech'

def create_affiliate_payment(sale_data):
    """Create payment with affiliate commission"""
    
    # Calculate splits
    affiliate_fixed = 50.00  # Fixed $50 commission
    creator_percentage = 70.0
    platform_percentage = 100.0 - creator_percentage  # Remaining after fixed amount
    
    response = requests.post(
        f'{BASE_URL}/api/v1/payments',
        headers={
            'Authorization': f'Bearer {ZENDFI_API_KEY}',
            'Content-Type': 'application/json'
        },
        json={
            'amount': sale_data['total_amount'],
            'currency': 'USD',
            'token': 'USDC',
            'description': f"{sale_data['product_name']} - Affiliate Sale",
            'metadata': {
                'product_id': sale_data['product_id'],
                'affiliate_code': sale_data['affiliate_code'],
                'customer_email': sale_data['customer_email']
            },
            'split_recipients': [
                {
                    'recipient_wallet': sale_data['creator_wallet'],
                    'recipient_name': f"Creator - {sale_data['creator_name']}",
                    'percentage': creator_percentage,
                    'split_order': 1
                },
                {
                    'recipient_wallet': sale_data['affiliate_wallet'],
                    'recipient_name': f"Affiliate - {sale_data['affiliate_name']}",
                    'fixed_amount_usd': affiliate_fixed,
                    'split_order': 2
                },
                {
                    'recipient_wallet': sale_data['platform_wallet'],
                    'recipient_name': 'Platform',
                    'percentage': platform_percentage,
                    'split_order': 3
                }
            ]
        }
    )
    
    if response.status_code == 200:
        payment = response.json()
        print('zendfi.techAffiliate payment created:')
        print(f'  Payment ID: {payment["id"]}')
        print(f'  Total: ${payment["amount"]} {payment["currency"]}')
        print(f'  Splits: {len(payment["split_ids"])} recipients')
        print(f'  Creator gets: {creator_percentage}%')
        print(f'  Affiliate gets: ${affiliate_fixed} (fixed)')
        print(f'  Platform gets: {platform_percentage}% of remainder')
        return payment
    else:
        print(f'❌ Payment creation failed: {response.json()}')
        return None

# Example usage
if __name__ == '__main__':
    payment = create_affiliate_payment({
        'product_id': 'course-web3-101',
        'product_name': 'Web3 Development Course',
        'total_amount': 299.99,
        'creator_name': 'TechGuru',
        'creator_wallet': 'AxKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsX',
        'affiliate_code': 'JOHN2024',
        'affiliate_name': 'John',
        'affiliate_wallet': 'BxKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsY',
        'platform_wallet': 'CxKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsZ',
        'customer_email': 'customer@example.com'
    })
    
    if payment:
        print('\n💡 Payment created successfully!')
        print('Splits will be processed automatically after payment confirmation.')
```

---

## Best Practices for Splits

### zendfi.techDO

- zendfi.tech**Validate splits on your backend**: Double-check percentages add to 100%
- zendfi.tech**Use recipient names**: Helps with tracking and debugging
- zendfi.tech**Set split_order**: Control execution sequence
- zendfi.tech**Store split_ids**: Track each split independently
- zendfi.tech**Listen for split webhooks**: Know when each recipient gets paid
- zendfi.tech**Test on devnet first**: Verify split logic before production
- zendfi.tech**Keep metadata detailed**: Include order/transaction context
- zendfi.tech**Handle split failures gracefully**: Automatic retries handle most cases

### ❌ DON'T

- ❌ **Don't hardcode percentages**: Make them configurable
- ❌ **Don't ignore validation**: ZendFi validates, but you should too
- ❌ **Don't exceed 10 recipients**: Keep it simple
- ❌ **Don't mix percentage and fixed randomly**: Be consistent in your model
- ❌ **Don't forget transaction fees**: Recipients need SOL for USDC
- ❌ **Don't skip testing**: Test all split scenarios
- ❌ **Don't assume instant**: Splits process after payment confirms (~30-60s)

---

## Subscriptions API (LIVE NOW!) 🔄

**Recurring payments made easy!** Create subscription plans with flexible billing intervals - perfect for SaaS, memberships, and any recurring service!

### What's Available:
- Multiple billing intervals (daily, weekly, monthly, yearly)
- Trial periods (free trials before billing starts)
- Automatic billing cycle processing
- Subscription management (cancel immediately or at period end)
- Cycle limits (max number of billing cycles)
- Customer subscription tracking
- Webhook events for subscription lifecycle

**Status:** **FULLY OPERATIONAL** - Start using subscriptions today!

---

### Create Subscription Plan

Create a reusable subscription plan that customers can subscribe to!

#### Endpoint
```
POST /api/v1/subscription-plans
```

#### Authentication
```
Authorization: Bearer YOUR_API_KEY
```

#### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | string | Yes | Plan name (e.g., "Premium Monthly") |
| `description` | string | No | Plan description |
| `amount` | number | Yes | Price per billing cycle in USD (must be > 0) |
| `currency` | string | Yes | Currency code ("USD" only) |
| `billing_interval` | string | Yes | "daily", "weekly", "monthly", or "yearly" |
| `interval_count` | number | No | Number of intervals between charges (default: 1) |
| `trial_days` | number | No | Free trial days before first charge (default: 0) |
| `max_cycles` | number | No | Maximum billing cycles (null = unlimited) |
| `metadata` | object | No | Custom key-value pairs |

#### Example 1: Monthly SaaS Plan

**Request:**
```bash
curl -X POST https://api.zendfi.tech/api/v1/subscription-plans \
  -H "Authorization: Bearer zfi_live_abc123..." \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Pro Plan - Monthly",
    "description": "Full access to all pro features",
    "amount": 29.99,
    "currency": "USD",
    "billing_interval": "monthly",
    "interval_count": 1,
    "trial_days": 14,
    "metadata": {
      "features": ["unlimited_api_calls", "priority_support", "advanced_analytics"],
      "tier": "pro"
    }
  }'
```

**Response: 200 OK**
```json
{
  "id": "plan_abc123def456",
  "merchant_id": "merchant_xyz789",
  "name": "Pro Plan - Monthly",
  "description": "Full access to all pro features",
  "amount": 29.99,
  "currency": "USD",
  "billing_interval": "monthly",
  "interval_count": 1,
  "trial_days": 14,
  "max_cycles": null,
  "is_active": true,
  "created_at": "2025-10-26T12:00:00Z",
  "subscription_url": "/subscribe/plan_abc123def456"
}
```

#### Example 2: Annual Plan with Discount

**Request:**
```bash
curl -X POST https://api.zendfi.tech/api/v1/subscription-plans \
  -H "Authorization: Bearer zfi_live_abc123..." \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Pro Plan - Annual",
    "description": "Save 20% with annual billing!",
    "amount": 287.90,
    "currency": "USD",
    "billing_interval": "yearly",
    "interval_count": 1,
    "trial_days": 0,
    "metadata": {
      "annual_discount": "20%",
      "monthly_equivalent": 23.99
    }
  }'
```

**Response: 200 OK**
```json
{
  "id": "plan_annual_xyz",
  "merchant_id": "merchant_xyz789",
  "name": "Pro Plan - Annual",
  "description": "Save 20% with annual billing!",
  "amount": 287.90,
  "currency": "USD",
  "billing_interval": "yearly",
  "interval_count": 1,
  "trial_days": 0,
  "max_cycles": null,
  "is_active": true,
  "created_at": "2025-10-26T12:05:00Z",
  "subscription_url": "/subscribe/plan_annual_xyz"
}
```

---

### List Subscription Plans

Get all subscription plans for your merchant account.

#### Endpoint
```
GET /api/v1/subscription-plans
```

#### Authentication
```
Authorization: Bearer YOUR_API_KEY
```

#### Example Request

```bash
curl -X GET https://api.zendfi.tech/api/v1/subscription-plans \
  -H "Authorization: Bearer zfi_live_abc123..."
```

#### Response: 200 OK
```json
[
  {
    "id": "plan_abc123def456",
    "merchant_id": "merchant_xyz789",
    "name": "Pro Plan - Monthly",
    "description": "Full access to all pro features",
    "amount": 29.99,
    "currency": "USD",
    "billing_interval": "monthly",
    "interval_count": 1,
    "trial_days": 14,
    "max_cycles": null,
    "is_active": true,
    "created_at": "2025-10-26T12:00:00Z",
    "subscription_url": "/subscribe/plan_abc123def456"
  },
  {
    "id": "plan_annual_xyz",
    "merchant_id": "merchant_xyz789",
    "name": "Pro Plan - Annual",
    "description": "Save 20% with annual billing!",
    "amount": 287.90,
    "currency": "USD",
    "billing_interval": "yearly",
    "interval_count": 1,
    "trial_days": 0,
    "max_cycles": null,
    "is_active": true,
    "created_at": "2025-10-26T12:05:00Z",
    "subscription_url": "/subscribe/plan_annual_xyz"
  }
]
```

---

### Get Subscription Plan

Get details of a specific subscription plan (public endpoint - no auth required).

#### Endpoint
```
GET /api/v1/subscription-plans/:plan_id
```

#### Example Request

```bash
curl -X GET https://api.zendfi.tech/api/v1/subscription-plans/plan_abc123def456
```

#### Response: 200 OK
```json
{
  "id": "plan_abc123def456",
  "merchant_id": "merchant_xyz789",
  "name": "Pro Plan - Monthly",
  "description": "Full access to all pro features",
  "amount": 29.99,
  "currency": "USD",
  "billing_interval": "monthly",
  "interval_count": 1,
  "trial_days": 14,
  "max_cycles": null,
  "is_active": true,
  "created_at": "2025-10-26T12:00:00Z",
  "subscription_url": "/subscribe/plan_abc123def456"
}
```

---

### Subscribe Customer to Plan

Create a subscription for a customer on a specific plan.

#### Endpoint
```
POST /api/v1/subscriptions
```

#### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `plan_id` | UUID | Yes | Subscription plan ID |
| `customer_wallet` | string | Yes | Customer's Solana wallet address |
| `customer_email` | string | No | Customer's email for notifications |
| `metadata` | object | No | Custom key-value pairs |

#### Example Request

```bash
curl -X POST https://api.zendfi.tech/api/v1/subscriptions \
  -H "Content-Type: application/json" \
  -d '{
    "plan_id": "plan_abc123def456",
    "customer_wallet": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
    "customer_email": "customer@example.com",
    "metadata": {
      "user_id": "user_12345",
      "signup_source": "landing_page"
    }
  }'
```

#### Response: 200 OK
```json
{
  "id": "sub_xyz789abc123",
  "plan_id": "plan_abc123def456",
  "plan_name": "Pro Plan - Monthly",
  "customer_wallet": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
  "status": "trialing",
  "current_period_start": "2025-10-26T12:10:00Z",
  "current_period_end": "2025-11-09T12:10:00Z",
  "next_payment_attempt": "2025-11-09T12:10:00Z",
  "cycles_completed": 0,
  "trial_end": "2025-11-09T12:10:00Z",
  "created_at": "2025-10-26T12:10:00Z",
  "payment_url": null
}
```

**Note:** If plan has `trial_days > 0`, subscription status is `"trialing"` and `payment_url` is `null`. First payment happens after trial ends!

---

### Get Subscription

Get details of a specific subscription.

#### Endpoint
```
GET /api/v1/subscriptions/:id
```

#### Example Request

```bash
curl -X GET https://api.zendfi.tech/api/v1/subscriptions/sub_xyz789abc123
```

#### Response: 200 OK
```json
{
  "id": "sub_xyz789abc123",
  "plan_id": "plan_abc123def456",
  "plan_name": "Pro Plan - Monthly",
  "customer_wallet": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
  "status": "active",
  "current_period_start": "2025-11-09T12:10:00Z",
  "current_period_end": "2025-12-09T12:10:00Z",
  "next_payment_attempt": "2025-12-09T12:10:00Z",
  "cycles_completed": 1,
  "trial_end": null,
  "created_at": "2025-10-26T12:10:00Z",
  "payment_url": "https://zendfi.tech/subscription/sub_xyz789abc123/pay"
}
```

---

### Cancel Subscription

Cancel a subscription immediately or at the end of the current billing period.

#### Endpoint
```
POST /api/v1/subscriptions/:id/cancel
```

#### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `cancel_at_period_end` | boolean | No | If true, subscription continues until period ends (default: false) |
| `reason` | string | No | Cancellation reason |

#### Example 1: Cancel Immediately

```bash
curl -X POST https://api.zendfi.tech/api/v1/subscriptions/sub_xyz789abc123/cancel \
  -H "Content-Type: application/json" \
  -d '{
    "cancel_at_period_end": false,
    "reason": "Customer requested cancellation"
  }'
```

**Response: 200 OK**
```json
{
  "message": "Subscription cancelled successfully",
  "subscription_id": "sub_xyz789abc123",
  "cancel_at_period_end": false
}
```

#### Example 2: Cancel at Period End

```bash
curl -X POST https://api.zendfi.tech/api/v1/subscriptions/sub_xyz789abc123/cancel \
  -H "Content-Type: application/json" \
  -d '{
    "cancel_at_period_end": true,
    "reason": "Switching to annual plan"
  }'
```

**Response: 200 OK**
```json
{
  "message": "Subscription cancelled successfully",
  "subscription_id": "sub_xyz789abc123",
  "cancel_at_period_end": true
}
```

---

### Subscription Statuses

| Status | Description |
|--------|-------------|
| `trialing` | In free trial period - no charges yet |
| `active` | Subscription is active and billing |
| `past_due` | Last payment failed - subscription still active but needs payment |
| `paused` | Subscription temporarily paused (future feature) |
| `cancelled` | Subscription cancelled |
| `expired` | Subscription reached max_cycles or ended |

---

### Automatic Billing

ZendFi automatically processes subscription billing! A background worker runs every hour to:

1. Check for subscriptions with `next_payment_attempt` due
2. Create payment for the billing amount
3. Send payment link to customer via webhook/email
4. On successful payment: Advance billing cycle
5. On failed payment: Mark subscription `past_due` and retry
6. Send webhooks for all subscription events

You don't need to do anything - just create the subscription and we handle the rest! 🎉

---

## Installment Plans API (LIVE NOW!)

**Let customers pay over time!** Split a single purchase into multiple scheduled payments - perfect for big-ticket items!

### What's Available:
- Flexible payment schedules (custom frequency in days)
- Automatic payment tracking
- Late payment detection with grace periods
- Late fees support
- Default tracking and notifications
- Plan cancellation
- Customer and merchant plan views

**Status:** **FULLY OPERATIONAL** - Start offering installment plans today!

---

### Create Installment Plan

Create a payment plan that spreads a purchase across multiple payments!

#### Endpoint
```
POST /api/v1/installment-plans
```

#### Authentication
```
Authorization: Bearer YOUR_API_KEY
```

#### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `customer_wallet` | string | Yes | Customer's Solana wallet address |
| `customer_email` | string | No | Customer's email for reminders |
| `total_amount` | number | Yes | Total purchase amount in USD (must be > 0) |
| `installment_count` | number | Yes | Number of payments (must be > 0) |
| `first_payment_date` | datetime | No | First payment due date (default: tomorrow) |
| `payment_frequency_days` | number | Yes | Days between payments (e.g., 30 for monthly) |
| `description` | string | No | Plan description |
| `late_fee_amount` | number | No | Late fee in USD |
| `grace_period_days` | number | No | Grace period after due date (default: 7) |
| `metadata` | object | No | Custom key-value pairs |

#### Example: 3-Month Payment Plan

**Request:**
```bash
curl -X POST https://api.zendfi.tech/api/v1/installment-plans \
  -H "Authorization: Bearer zfi_live_abc123..." \
  -H "Content-Type: application/json" \
  -d '{
    "customer_wallet": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
    "customer_email": "customer@example.com",
    "total_amount": 900.00,
    "installment_count": 3,
    "payment_frequency_days": 30,
    "description": "MacBook Pro - 3 Monthly Payments",
    "late_fee_amount": 25.00,
    "grace_period_days": 5,
    "metadata": {
      "product_id": "macbook_pro_16",
      "order_id": "ORD-12345"
    }
  }'
```

**Response: 200 OK**
```json
{
  "plan_id": "install_abc123def456",
  "status": "active"
}
```

**What Happens:**
- Customer pays $300 now, $300 in 30 days, $300 in 60 days
- 5-day grace period after each due date
- $25 late fee if payment is late
- Automatic reminders sent via email

---

### Get Installment Plan

Get details of a specific installment plan including payment schedule!

#### Endpoint
```
GET /api/v1/installment-plans/:plan_id
```

#### Authentication
```
Authorization: Bearer YOUR_API_KEY
```

#### Example Request

```bash
curl -X GET https://api.zendfi.tech/api/v1/installment-plans/install_abc123def456 \
  -H "Authorization: Bearer zfi_live_abc123..."
```

#### Response: 200 OK
```json
{
  "id": "install_abc123def456",
  "merchant_id": "merchant_xyz789",
  "customer_wallet": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
  "customer_email": "customer@example.com",
  "total_amount": "900.00",
  "installment_count": 3,
  "amount_per_installment": "300.00",
  "payment_schedule": [
    {
      "installment_number": 1,
      "due_date": "2025-10-27T12:00:00Z",
      "amount": "300.00",
      "status": "paid",
      "payment_id": "payment_1_abc",
      "paid_at": "2025-10-27T10:30:00Z"
    },
    {
      "installment_number": 2,
      "due_date": "2025-11-26T12:00:00Z",
      "amount": "300.00",
      "status": "pending",
      "payment_id": null,
      "paid_at": null
    },
    {
      "installment_number": 3,
      "due_date": "2025-12-26T12:00:00Z",
      "amount": "300.00",
      "status": "pending",
      "payment_id": null,
      "paid_at": null
    }
  ],
  "paid_count": 1,
  "status": "active",
  "description": "MacBook Pro - 3 Monthly Payments",
  "late_fee_amount": "25.00",
  "grace_period_days": 5,
  "metadata": {
    "product_id": "macbook_pro_16",
    "order_id": "ORD-12345"
  },
  "created_at": "2025-10-26T12:00:00Z",
  "updated_at": "2025-10-27T10:30:00Z",
  "completed_at": null,
  "defaulted_at": null
}
```

---

### List Merchant's Installment Plans

Get all installment plans for your merchant account.

#### Endpoint
```
GET /api/v1/installment-plans
```

#### Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `limit` | number | Max results (default: 50, max: 100) |
| `offset` | number | Pagination offset (default: 0) |

#### Example Request

```bash
curl -X GET "https://api.zendfi.tech/api/v1/installment-plans?limit=20&offset=0" \
  -H "Authorization: Bearer zfi_live_abc123..."
```

---

### List Customer's Installment Plans

Get all installment plans for a specific customer (public endpoint).

#### Endpoint
```
GET /api/v1/customers/:customer_wallet/installment-plans
```

#### Example Request

```bash
curl -X GET https://api.zendfi.tech/api/v1/customers/7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU/installment-plans
```

---

### Cancel Installment Plan

Cancel an active installment plan.

#### Endpoint
```
POST /api/v1/installment-plans/:plan_id/cancel
```

#### Authentication
```
Authorization: Bearer YOUR_API_KEY
```

#### Example Request

```bash
curl -X POST https://api.zendfi.tech/api/v1/installment-plans/install_abc123def456/cancel \
  -H "Authorization: Bearer zfi_live_abc123..."
```

#### Response: 200 OK
```json
{
  "message": "Installment plan cancelled successfully",
  "plan_id": "install_abc123def456"
}
```

---

### Installment Plan Statuses

| Status | Description |
|--------|-------------|
| `active` | Plan is active, customer making payments |
| `completed` | All installments paid successfully! 🎉 |
| `defaulted` | Customer missed payment beyond grace period |
| `cancelled` | Plan cancelled by merchant |

---

### Automatic Monitoring

ZendFi automatically monitors installment plans! A background worker runs hourly to:

1. Check for overdue installments
2. Send late payment reminders
3. Apply late fees after grace period
4. Mark plans as defaulted if payment missed too long
5. Send email notifications to customers
6. Trigger webhooks for payment events

---

## Escrow Payments API (LIVE NOW!)

**Protect buyers and sellers!** Hold funds in escrow until conditions are met - perfect for high-value transactions!

### What's Available:
- Funds held in secure escrow wallet
- Multiple release conditions (manual approval, time-based, confirmations, milestones)
- Approve release to seller
- Refund to buyer
- Dispute resolution workflow
- Automatic time-based releases
- Webhook events for escrow lifecycle

**Status:** **FULLY OPERATIONAL** - Start using escrow today!

---

### Create Escrow

Create an escrow transaction that holds funds until conditions are met!

#### Endpoint
```
POST /api/v1/escrows
```

#### Authentication
```
Authorization: Bearer YOUR_API_KEY
```

#### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `buyer_wallet` | string | Yes | Buyer's Solana wallet address |
| `seller_wallet` | string | Yes | Seller's Solana wallet address |
| `amount` | number | Yes | Escrow amount in USD (must be > 0) |
| `currency` | string | Yes | Currency code ("USD" only) |
| `token` | string | No | Token for payment ("USDC", "SOL", "USDT") |
| `description` | string | No | Escrow description |
| `release_conditions` | object | Yes | Conditions for releasing funds (see below) |
| `metadata` | object | No | Custom key-value pairs |

#### Release Condition Types

**1. Manual Approval:**
```json
{
  "type": "manual_approval",
  "approver": "wallet_address",
  "approved": false
}
```

**2. Time-Based (Auto-release after date):**
```json
{
  "type": "time_based",
  "release_after": "2025-11-01T00:00:00Z"
}
```

**3. Confirmation Required (Multiple approvals):**
```json
{
  "type": "confirmation_required",
  "confirmations_needed": 2,
  "confirmed_by": []
}
```

**4. Milestone-Based:**
```json
{
  "type": "milestone",
  "description": "Website delivered and approved",
  "approved": false,
  "approved_by": null
}
```

#### Example: Freelance Project Escrow

**Request:**
```bash
curl -X POST https://api.zendfi.tech/api/v1/escrows \
  -H "Authorization: Bearer zfi_live_abc123..." \
  -H "Content-Type: application/json" \
  -d '{
    "buyer_wallet": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
    "seller_wallet": "9yJKg3DX98h87TYKSDqcE6jCkhgTrB94UZSmKptgBsV",
    "amount": 2500.00,
    "currency": "USD",
    "token": "USDC",
    "description": "Website Development - Full Stack Project",
    "release_conditions": {
      "type": "milestone",
      "description": "Website delivered and approved by client",
      "approved": false,
      "approved_by": null
    },
    "metadata": {
      "project_id": "proj_12345",
      "contract_url": "https://example.com/contracts/12345"
    }
  }'
```

**Response: 200 OK**
```json
{
  "id": "escrow_abc123def456",
  "payment_id": "payment_xyz789",
  "buyer_wallet": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
  "seller_wallet": "9yJKg3DX98h87TYKSDqcE6jCkhgTrB94UZSmKptgBsV",
  "escrow_wallet": "EscrowSystemWallet...",
  "amount": 2500.00,
  "status": "pending",
  "release_conditions": {
    "type": "milestone",
    "description": "Website delivered and approved by client",
    "approved": false,
    "approved_by": null
  },
  "payment_url": "https://zendfi.tech/pay/payment_xyz789",
  "qr_code": "solana:...",
  "created_at": "2025-10-26T12:00:00Z"
}
```

**What Happens Next:**
1. Buyer pays $2,500 USDC
2. Funds held in secure escrow wallet
3. Seller delivers website
4. Buyer approves milestone
5. Funds automatically released to seller! 🎉

---

### Get Escrow

Get details of a specific escrow transaction.

#### Endpoint
```
GET /api/v1/escrows/:escrow_id
```

#### Authentication
```
Authorization: Bearer YOUR_API_KEY
```

#### Example Request

```bash
curl -X GET https://api.zendfi.tech/api/v1/escrows/escrow_abc123def456 \
  -H "Authorization: Bearer zfi_live_abc123..."
```

#### Response: 200 OK
```json
{
  "id": "escrow_abc123def456",
  "payment_id": "payment_xyz789",
  "merchant_id": "merchant_123",
  "buyer_wallet": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
  "seller_wallet": "9yJKg3DX98h87TYKSDqcE6jCkhgTrB94UZSmKptgBsV",
  "escrow_wallet": "EscrowSystemWallet...",
  "release_conditions": {
    "type": "milestone",
    "description": "Website delivered and approved by client",
    "approved": false,
    "approved_by": null
  },
  "status": "funded",
  "funded_at": "2025-10-26T14:30:00Z",
  "released_at": null,
  "refunded_at": null,
  "disputed_at": null,
  "dispute_reason": null,
  "release_transaction_signature": null,
  "refund_transaction_signature": null,
  "metadata": {
    "project_id": "proj_12345"
  },
  "created_at": "2025-10-26T12:00:00Z",
  "updated_at": "2025-10-26T14:30:00Z"
}
```

---

### List Escrows

Get all escrow transactions for your merchant account.

#### Endpoint
```
GET /api/v1/escrows
```

#### Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `limit` | number | Max results (default: 50, max: 100) |
| `offset` | number | Pagination offset (default: 0) |

#### Example Request

```bash
curl -X GET "https://api.zendfi.tech/api/v1/escrows?limit=20&offset=0" \
  -H "Authorization: Bearer zfi_live_abc123..."
```

---

### Approve Escrow Release

Approve the release of escrowed funds to the seller!

#### Endpoint
```
POST /api/v1/escrows/:escrow_id/approve
```

#### Authentication
```
Authorization: Bearer YOUR_API_KEY
```

#### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `approver_wallet` | string | Yes | Wallet address of approver |

#### Example Request

```bash
curl -X POST https://api.zendfi.tech/api/v1/escrows/escrow_abc123def456/approve \
  -H "Authorization: Bearer zfi_live_abc123..." \
  -H "Content-Type: application/json" \
  -d '{
    "approver_wallet": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU"
  }'
```

#### Response: 200 OK (Fully Released)
```json
{
  "status": "released",
  "transaction_signature": "5KzZ8LWvZh7NYjJvPhHGYnNrB2rKqb2...",
  "message": "Escrow funds released to seller"
}
```

#### Response: 200 OK (Approval Recorded, Waiting for More)
```json
{
  "status": "approved",
  "message": "Approval recorded, waiting for additional confirmations"
}
```

---

### Refund Escrow

Refund escrowed funds back to the buyer.

#### Endpoint
```
POST /api/v1/escrows/:escrow_id/refund
```

#### Authentication
```
Authorization: Bearer YOUR_API_KEY
```

#### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `reason` | string | Yes | Refund reason |

#### Example Request

```bash
curl -X POST https://api.zendfi.tech/api/v1/escrows/escrow_abc123def456/refund \
  -H "Authorization: Bearer zfi_live_abc123..." \
  -H "Content-Type: application/json" \
  -d '{
    "reason": "Project cancelled by mutual agreement"
  }'
```

#### Response: 200 OK
```json
{
  "status": "refunded",
  "transaction_signature": "3k8n5TY89VvD2kRfV4iqmLKtSWFjDnMoRcWr4dJYKPcH...",
  "message": "Escrow funds refunded to buyer",
  "reason": "Project cancelled by mutual agreement"
}
```

---

### Dispute Escrow

Raise a dispute for an escrow transaction.

#### Endpoint
```
POST /api/v1/escrows/:escrow_id/dispute
```

#### Authentication
```
Authorization: Bearer YOUR_API_KEY
```

#### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `reason` | string | Yes | Dispute reason (detailed) |

#### Example Request

```bash
curl -X POST https://api.zendfi.tech/api/v1/escrows/escrow_abc123def456/dispute \
  -H "Authorization: Bearer zfi_live_abc123..." \
  -H "Content-Type: application/json" \
  -d '{
    "reason": "Seller did not deliver agreed upon features. Missing responsive design and payment integration."
  }'
```

#### Response: 200 OK
```json
{
  "status": "disputed",
  "message": "Dispute raised successfully. ZendFi support will review within 24 hours.",
  "dispute_id": "dispute_abc123",
  "created_at": "2025-10-26T16:00:00Z"
}
```

---

### Escrow Statuses

| Status | Description |
|--------|-------------|
| `pending` | Escrow created, waiting for buyer payment |
| `funded` | Payment received, funds held in escrow |
| `released` | Funds released to seller |
| `refunded` | Funds refunded to buyer |
| `disputed` | Dispute raised, under review |
| `cancelled` | Escrow cancelled |

---

### Automatic Monitoring

ZendFi automatically monitors escrow transactions! A background worker runs hourly to:

1. Check time-based release conditions
2. Auto-release funds when time condition met
3. Send email notifications to all parties
4. Trigger webhooks for status changes
5. Alert admins for disputed transactions

---

## Invoices API (LIVE NOW!)

**Professional invoicing for your business!** Generate and send invoices with payment tracking and email delivery!

### What's Available:
- Automatic invoice numbering (INV-2025-00001)
- Line items support
- Due dates
- Email delivery to customers
- Payment URL generation
- Status tracking (draft, sent, paid)
- List all invoices

**Status:** **FULLY OPERATIONAL** - Start invoicing today!

---

### Create Invoice

Create a professional invoice for your customer!

#### Endpoint
```
POST /api/v1/invoices
```

#### Authentication
```
Authorization: Bearer YOUR_API_KEY
```

#### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `customer_email` | string | Yes | Customer's email address |
| `customer_name` | string | No | Customer's name |
| `amount` | number | Yes | Invoice amount in USD (must be > 0) |
| `token` | string | No | Token for payment ("USDC", "SOL", "USDT") |
| `description` | string | Yes | Invoice description |
| `line_items` | array | No | Array of line item objects |
| `due_date` | datetime | No | Payment due date |
| `metadata` | object | No | Custom key-value pairs |

#### Line Item Object

| Field | Type | Description |
|-------|------|-------------|
| `description` | string | Item description |
| `quantity` | number | Quantity |
| `unit_price` | number | Price per unit in USD |

#### Example: Service Invoice with Line Items

**Request:**
```bash
curl -X POST https://api.zendfi.tech/api/v1/invoices \
  -H "Authorization: Bearer zfi_live_abc123..." \
  -H "Content-Type: application/json" \
  -d '{
    "customer_email": "client@example.com",
    "customer_name": "Acme Corp",
    "amount": 3500.00,
    "token": "USDC",
    "description": "Web Development Services - Q4 2025",
    "line_items": [
      {
        "description": "Frontend Development (React)",
        "quantity": 40,
        "unit_price": 50.00
      },
      {
        "description": "Backend API Development",
        "quantity": 30,
        "unit_price": 50.00
      },
      {
        "description": "UI/UX Design",
        "quantity": 10,
        "unit_price": 100.00
      }
    ],
    "due_date": "2025-11-15T23:59:59Z",
    "metadata": {
      "project_id": "proj_q4_2025",
      "po_number": "PO-12345"
    }
  }'
```

**Response: 200 OK**
```json
{
  "id": "invoice_abc123def456",
  "invoice_number": "INV-2025-00042",
  "customer_email": "client@example.com",
  "customer_name": "Acme Corp",
  "amount_usd": 3500.00,
  "token": "USDC",
  "description": "Web Development Services - Q4 2025",
  "status": "draft",
  "payment_url": null,
  "due_date": "2025-11-15T23:59:59Z",
  "created_at": "2025-10-26T12:00:00Z"
}
```

---

### Send Invoice

Send an invoice to your customer via email with a payment link!

#### Endpoint
```
POST /api/v1/invoices/:id/send
```

#### Authentication
```
Authorization: Bearer YOUR_API_KEY
```

#### Example Request

```bash
curl -X POST https://api.zendfi.tech/api/v1/invoices/invoice_abc123def456/send \
  -H "Authorization: Bearer zfi_live_abc123..."
```

#### Response: 200 OK
```json
{
  "success": true,
  "invoice_id": "invoice_abc123def456",
  "invoice_number": "INV-2025-00042",
  "sent_to": "client@example.com",
  "payment_url": "https://zendfi.tech/checkout/link_xyz789",
  "status": "sent"
}
```

**What Happens:**
- Invoice status changed to "sent"
- Professional email sent to customer
- Payment link generated and included
- Customer can click link to pay immediately!

---

### Get Invoice

Get details of a specific invoice.

#### Endpoint
```
GET /api/v1/invoices/:id
```

#### Authentication
```
Authorization: Bearer YOUR_API_KEY
```

#### Example Request

```bash
curl -X GET https://api.zendfi.tech/api/v1/invoices/invoice_abc123def456 \
  -H "Authorization: Bearer zfi_live_abc123..."
```

#### Response: 200 OK
```json
{
  "id": "invoice_abc123def456",
  "invoice_number": "INV-2025-00042",
  "customer_email": "client@example.com",
  "customer_name": "Acme Corp",
  "amount_usd": 3500.00,
  "token": "USDC",
  "description": "Web Development Services - Q4 2025",
  "status": "sent",
  "payment_url": "https://zendfi.tech/checkout/link_xyz789",
  "due_date": "2025-11-15T23:59:59Z",
  "created_at": "2025-10-26T12:00:00Z"
}
```

---

### List Invoices

Get all invoices for your merchant account.

#### Endpoint
```
GET /api/v1/invoices
```

#### Authentication
```
Authorization: Bearer YOUR_API_KEY
```

#### Example Request

```bash
curl -X GET https://api.zendfi.tech/api/v1/invoices \
  -H "Authorization: Bearer zfi_live_abc123..."
```

#### Response: 200 OK
```json
[
  {
    "id": "invoice_abc123def456",
    "invoice_number": "INV-2025-00042",
    "customer_email": "client@example.com",
    "customer_name": "Acme Corp",
    "amount_usd": 3500.00,
    "token": "USDC",
    "description": "Web Development Services - Q4 2025",
    "status": "sent",
    "payment_url": "https://zendfi.tech/checkout/link_xyz789",
    "due_date": "2025-11-15T23:59:59Z",
    "created_at": "2025-10-26T12:00:00Z"
  },
  {
    "id": "invoice_def456ghi789",
    "invoice_number": "INV-2025-00041",
    "customer_email": "another@example.com",
    "customer_name": "Tech Startup Inc",
    "amount_usd": 1200.00,
    "token": "USDC",
    "description": "Consulting Services - October 2025",
    "status": "paid",
    "payment_url": null,
    "due_date": "2025-10-31T23:59:59Z",
    "created_at": "2025-10-20T10:00:00Z"
  }
]
```

**Note:** List is ordered by creation date (newest first), limited to 100 results.

---

### Invoice Statuses

| Status | Description |
|--------|-------------|
| `draft` | Invoice created but not sent yet |
| `sent` | Invoice emailed to customer with payment link |
| `paid` | Invoice paid successfully! 🎉 |

---

## Summary & Next Steps (You're All Set! 🎉)

Congratulations! You now have access to ZendFi's complete suite of advanced features!

**ALL Features Are LIVE and Ready to Use:**
- **Payment Splits**: Automatically distribute payments among multiple recipients
- **Subscriptions**: Recurring billing with flexible intervals and trial periods
- **Installment Plans**: Let customers pay over time with flexible schedules
- **Escrow Payments**: Secure fund holding with multiple release conditions
- **Invoices**: Professional invoicing with email delivery

**You Can Now:**
- Accept recurring payments (SaaS, memberships, subscriptions)
- Offer payment plans (big-ticket items, courses)
- Protect high-value transactions (freelance, real estate)
- Send professional invoices with one-click payment

**Next Steps:**
1. Review [API Reference](./07-reference.md) for complete endpoint documentation
2. Check out [Payment Links](./03-payment-links.md) for reusable payment URLs
3. Set up [Webhooks](./04-webhooks.md) to track payment events
4. Manage funds with [Wallet Management](./05-wallet-management.md)

**Need Help? We're Here for You!**
- Email: support@zendfi.tech - Real humans, real fast!
- Discord: discord.gg/zendfi - Join the community!
- Docs: https://docs.zendfi.tech - Full documentation
- Feature Requests: features@zendfi.tech - We listen!

**Ready to Build Something Amazing?**

You have everything you need to create world-class payment experiences! Start with one feature or combine them all - the possibilities are endless!

Happy building! You're going to do great things!
