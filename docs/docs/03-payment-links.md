# Payment Links - Your Reusable Payment Superpower!

Welcome to Payment Links - one of the coolest features in ZendFi! Think of payment links as your personal payment URLs that you can share anywhere and use multiple times. Perfect for social media, invoices, or anywhere you need a quick way to accept crypto payments. Let's dive in!

---

## Table of Contents
- [What Are Payment Links?](#what-are-payment-links)
- [Create a Payment Link](#create-a-payment-link)
- [Get Payment Link Details](#get-payment-link-details)
- [Create Payment from Link](#create-payment-from-link)
- [Hosted Checkout Pages](#hosted-checkout-pages)
- [Use Cases & Best Practices](#use-cases--best-practices)
- [Testing Payment Links](#testing-payment-links)

---

## What Are Payment Links?

Payment links are **reusable payment URLs** that you can share with your customers. Unlike regular payments (which are one-time use), payment links can be used multiple times, making them perfect for:

- **E-commerce**: Product checkout pages
- **Social Media**: Instagram/Twitter bio links
- **Email Campaigns**: One link for all customers
- **Invoicing**: Professional payment requests
- **Events**: Ticket sales with QR codes
- **Donations**: Ongoing fundraising campaigns

**Key Features:**
- Reusable (use limits optional)
- Hosted checkout pages included
- QR code generation automatic
- Expiration dates supported
- Track usage counts
- Custom metadata support

---

## Create a Payment Link

Generate a shareable payment link that can be used multiple times!

### Endpoint
```
POST /api/v1/payment-links
```

### Authentication
```
Authorization: Bearer YOUR_API_KEY
```

### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `amount` | number | Yes | Payment amount in USD (min: 0.01, max: 10,000) |
| `currency` | string | Yes | Currency code (currently only "USD" supported) |
| `token` | string | No | Token to receive ("USDC", "SOL", "USDT"). Default: "USDC" |
| `description` | string | No | Description shown on checkout page |
| `max_uses` | integer | No | Maximum number of uses (unlimited if not set) |
| `expires_at` | datetime | No | ISO 8601 expiration date (e.g., "2024-12-31T23:59:59Z") |
| `metadata` | object | No | Custom data to attach (max 16KB JSON) |

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Unique payment link ID |
| `link_code` | string | Short code for the link (e.g., "abc123xyz") |
| `payment_url` | string | Direct Solana Pay URL for wallet apps |
| `hosted_page_url` | string | Beautiful hosted checkout page URL |
| `amount` | number | Payment amount in USD |
| `currency` | string | Currency code |
| `token` | string | Token type (USDC/SOL/USDT) |
| `max_uses` | integer | Maximum uses allowed (null = unlimited) |
| `uses_count` | integer | Current number of uses |
| `expires_at` | datetime | Expiration date (null = never expires) |
| `is_active` | boolean | Whether the link is active |
| `created_at` | datetime | Link creation timestamp |

---

## Examples

### Example 1: Simple Product Payment Link (USDC)

Perfect for selling a product or service!

**Request:**
```bash
curl -X POST https://api.zendfi.tech/api/v1/payment-links \
  -H "Authorization: Bearer zfi_test_abc123..." \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 49.99,
    "currency": "USD",
    "token": "USDC",
    "description": "Premium Subscription - Annual Plan",
    "metadata": {
      "product_id": "premium_annual",
      "plan": "yearly",
      "tier": "premium"
    }
  }'
```

**Response:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "link_code": "pyl_hk3n7x9m2q",
  "payment_url": "https://zendfi.tech/pay/link/pyl_hk3n7x9m2q",
  "hosted_page_url": "https://zendfi.tech/checkout/pyl_hk3n7x9m2q",
  "amount": 49.99,
  "currency": "USD",
  "token": "USDC",
  "max_uses": null,
  "uses_count": 0,
  "expires_at": null,
  "is_active": true,
  "created_at": "2024-01-15T10:30:00Z"
}
```

**What You Get:**
- **payment_url**: Direct link for Solana wallets (Phantom, Solflare)
- **hosted_page_url**: Beautiful checkout page with QR code
- **Unlimited uses**: Perfect for a product listing
- **Metadata**: Track which product was purchased

---

### Example 2: Limited-Use Event Ticket Link

Great for events with limited capacity!

**Request:**
```bash
curl -X POST https://api.zendfi.tech/api/v1/payment-links \
  -H "Authorization: Bearer zfi_test_abc123..." \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 99.00,
    "currency": "USD",
    "token": "USDC",
    "description": "Web3 Conference 2024 - General Admission",
    "max_uses": 100,
    "expires_at": "2024-03-01T00:00:00Z",
    "metadata": {
      "event_name": "Web3 Conference 2024",
      "ticket_type": "general_admission",
      "venue": "Convention Center"
    }
  }'
```

**Response:**
```json
{
  "id": "660e8400-e29b-41d4-a716-446655440001",
  "link_code": "pyl_event_conf2024",
  "payment_url": "https://zendfi.tech/pay/link/pyl_event_conf2024",
  "hosted_page_url": "https://zendfi.tech/checkout/pyl_event_conf2024",
  "amount": 99.00,
  "currency": "USD",
  "token": "USDC",
  "max_uses": 100,
  "uses_count": 0,
  "expires_at": "2024-03-01T00:00:00Z",
  "is_active": true,
  "created_at": "2024-01-15T10:30:00Z"
}
```

**What Makes This Special:**
- **Limited to 100 tickets**: Automatic capacity management
- **Expires on event date**: No late purchases
- **Usage tracking**: Monitor ticket sales in real-time
- **Perfect for events**: Conferences, concerts, workshops

---

### Example 3: SOL Payment Link with Expiration

Accept SOL instead of stablecoins!

**Request:**
```bash
curl -X POST https://api.zendfi.tech/api/v1/payment-links \
  -H "Authorization: Bearer zfi_test_abc123..." \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 25.00,
    "currency": "USD",
    "token": "SOL",
    "description": "Monthly Membership - January 2024",
    "max_uses": 500,
    "expires_at": "2024-01-31T23:59:59Z",
    "metadata": {
      "membership_month": "2024-01",
      "type": "monthly"
    }
  }'
```

**Response:**
```json
{
  "id": "770e8400-e29b-41d4-a716-446655440002",
  "link_code": "pyl_membership_jan2024",
  "payment_url": "https://zendfi.tech/pay/link/pyl_membership_jan2024",
  "hosted_page_url": "https://zendfi.tech/checkout/pyl_membership_jan2024",
  "amount": 25.00,
  "currency": "USD",
  "token": "SOL",
  "max_uses": 500,
  "uses_count": 0,
  "expires_at": "2024-01-31T23:59:59Z",
  "is_active": true,
  "created_at": "2024-01-15T10:30:00Z"
}
```

**Why SOL?**
- **Lightning-fast**: SOL transfers are instant
- **Crypto-native**: Great for crypto-savvy audiences
- **Auto-conversion**: Automatically converts to USDC on settlement (if `auto_usdc` is enabled)
- **Price locked**: Amount in USD, converted to SOL at payment time

---

### Example 4: Social Media Bio Link

Perfect for creators and influencers!

**Request:**
```bash
curl -X POST https://api.zendfi.tech/api/v1/payment-links \
  -H "Authorization: Bearer zfi_test_abc123..." \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 5.00,
    "currency": "USD",
    "token": "USDC",
    "description": "☕ Buy Me a Coffee - Thanks for your support!",
    "metadata": {
      "creator": "awesome_creator",
      "platform": "instagram",
      "link_location": "bio"
    }
  }'
```

**Response:**
```json
{
  "id": "880e8400-e29b-41d4-a716-446655440003",
  "link_code": "pyl_coffee_tip",
  "payment_url": "https://zendfi.tech/pay/link/pyl_coffee_tip",
  "hosted_page_url": "https://zendfi.tech/checkout/pyl_coffee_tip",
  "amount": 5.00,
  "currency": "USD",
  "token": "USDC",
  "max_uses": null,
  "uses_count": 0,
  "expires_at": null,
  "is_active": true,
  "created_at": "2024-01-15T10:30:00Z"
}
```

**How to Use:**
1. Copy the `hosted_page_url`
2. Add to Instagram/Twitter/TikTok bio
3. Share in posts and stories
4. Track tips with the `uses_count` field!

---

## Get Payment Link Details

Retrieve information about an existing payment link.

### Endpoint
```
GET /api/v1/payment-links/{link_code}
```

### Authentication
No authentication required! Payment links are publicly accessible (but can only be used by the merchant).

### URL Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `link_code` | string | The unique link code (e.g., "pyl_hk3n7x9m2q") |

### Example Request

```bash
curl https://api.zendfi.tech/api/v1/payment-links/pyl_hk3n7x9m2q
```

### Example Response

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "link_code": "pyl_hk3n7x9m2q",
  "payment_url": "https://zendfi.tech/pay/link/pyl_hk3n7x9m2q",
  "hosted_page_url": "https://zendfi.tech/checkout/pyl_hk3n7x9m2q",
  "amount": 49.99,
  "currency": "USD",
  "token": "USDC",
  "max_uses": null,
  "uses_count": 47,
  "expires_at": null,
  "is_active": true,
  "created_at": "2024-01-15T10:30:00Z"
}
```

**Pro Tip:** Check the `uses_count` field to monitor how many times your link has been used! Great for tracking sales.

---

## Create Payment from Link

When a customer clicks your payment link, ZendFi automatically creates a new payment session with a 15-minute expiration window.

### Endpoint
```
POST /api/v1/payment-links/{link_code}/pay
```

### Authentication
No authentication required! This endpoint is meant to be called by your hosted checkout page or your frontend.

### URL Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `link_code` | string | The unique link code (e.g., "pyl_hk3n7x9m2q") |

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `payment_id` | UUID | Unique payment ID for this session |
| `merchant_name` | string | Your business name |
| `amount_usd` | number | Payment amount in USD |
| `currency` | string | Currency code |
| `token` | string | Token type (USDC/SOL/USDT) |
| `description` | string | Payment description |
| `qr_code` | string | Solana Pay URI for QR code |
| `payment_url` | string | Full Solana Pay URL |
| `wallet_address` | string | Your merchant wallet address |
| `expires_at` | datetime | Payment expiration (15 minutes from creation) |
| `status` | string | Payment status ("pending") |
| `solana_network` | string | Network ("mainnet-beta" or "devnet") |
| `allow_custom_amount` | boolean | Whether PWYW is enabled (false for payment links) |
| `minimum_amount` | number | Minimum amount (null for payment links) |
| `maximum_amount` | number | Maximum amount (null for payment links) |
| `suggested_amount` | number | Suggested amount (null for payment links) |

### Example Request

```bash
curl -X POST https://api.zendfi.tech/api/v1/payment-links/pyl_hk3n7x9m2q/pay
```

### Example Response

```json
{
  "payment_id": "990e8400-e29b-41d4-a716-446655440004",
  "merchant_name": "Awesome Coffee Shop",
  "amount_usd": 49.99,
  "currency": "USD",
  "token": "USDC",
  "description": "Premium Subscription - Annual Plan",
  "qr_code": "solana:ABC123...XYZ789?amount=49.99&spl-token=EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
  "payment_url": "solana:ABC123...XYZ789?amount=49.99&spl-token=EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
  "wallet_address": "ABC123...XYZ789",
  "expires_at": "2024-01-15T10:45:00Z",
  "status": "pending",
  "solana_network": "mainnet-beta",
  "allow_custom_amount": false,
  "minimum_amount": null,
  "maximum_amount": null,
  "suggested_amount": null
}
```

**What Happens Next:**
1. A new payment record is created in the database
2. The payment link `uses_count` is incremented
3. QR code is generated for mobile wallets
4. 15-minute timer starts
5. Customer can complete payment via Phantom, Solflare, etc.

---

## Error Responses

### 400 Bad Request
Link is invalid or inactive.

```json
{
  "error": "Invalid payment link parameters",
  "details": "Amount must be greater than 0"
}
```

### 404 Not Found
Payment link doesn't exist.

```json
{
  "error": "Payment link not found",
  "details": "No payment link found with code: pyl_invalid123"
}
```

### 410 Gone
Payment link has expired or reached max uses.

```json
{
  "error": "Payment link no longer available",
  "details": "This payment link has expired or reached its usage limit"
}
```

**Expired Link:**
```json
{
  "error": "Payment link expired",
  "details": "This link expired on 2024-01-31T23:59:59Z"
}
```

**Max Uses Reached:**
```json
{
  "error": "Payment link capacity reached",
  "details": "This link has been used 100 times (maximum allowed)"
}
```

### 500 Internal Server Error
Something went wrong on our end.

```json
{
  "error": "Internal server error",
  "details": "Failed to create payment from link. Please try again."
}
```

---

## Hosted Checkout Pages

Every payment link comes with a **beautiful, mobile-optimized checkout page** automatically! No frontend development needed. 🎨

### Accessing Hosted Pages

Use the `hosted_page_url` from your payment link response:

```
https://zendfi.tech/checkout/pyl_hk3n7x9m2q
```

### What's Included?

- **Mobile-optimized design**: Perfect on all devices
- **Professional UI**: Beautiful, trustworthy checkout experience
- **QR code display**: Scan with Phantom, Solflare, or any Solana wallet
- **Live countdown timer**: Shows 15-minute expiration
- **Payment instructions**: Clear steps for customers
- **Real-time status updates**: Automatically updates when payment confirms
- **Multi-network support**: Works on mainnet and devnet
- **Secure**: All transactions on Solana blockchain

### Sharing Options

**Direct Link:**
```
Share the hosted_page_url directly:
https://zendfi.tech/checkout/pyl_hk3n7x9m2q
```

**QR Code:**
Generate a QR code pointing to your hosted page for:
- Physical products (print on packaging)
- Marketing materials (flyers, posters)
- Event tickets (print on entrance)
- Restaurant menus (table tents)

**Embed in Email:**
```html
<a href="https://zendfi.tech/checkout/pyl_hk3n7x9m2q">
  Click here to complete your payment
</a>
```

**Social Media:**
Perfect for Instagram/Twitter bio links, TikTok profiles, YouTube descriptions!

---

## Use Cases & Best Practices

### E-Commerce Store

**Scenario:** You sell digital products and want one link per product.

**Implementation:**
1. Create a payment link for each product
2. Store the `link_code` in your database
3. Share the `hosted_page_url` on your product page
4. Listen for `payment.confirmed` webhooks
5. Deliver digital product automatically

**Best Practice:**
- Use unlimited `max_uses` for digital products
- Include product details in `metadata`
- Set `description` to product name
- Use USDC for price stability

---

### Social Media Creator

**Scenario:** You want fans to support you via tips.

**Implementation:**
1. Create payment link with small amount (e.g., $5)
2. Add `hosted_page_url` to Instagram/Twitter bio
3. Monitor `uses_count` to track support
4. Thank supporters via webhook data

**Best Practice:**
- Keep amount low ($1-$10) for accessibility
- Use friendly `description` like "☕ Buy me a coffee!"
- No `max_uses` or `expires_at` limits
- Consider USDC for stability, SOL for crypto fans

---

### Event Tickets

**Scenario:** Sell tickets for a conference with limited capacity.

**Implementation:**
1. Create payment link with `max_uses` = ticket capacity
2. Set `expires_at` to day before event
3. Share hosted page on event website
4. Monitor `uses_count` for capacity tracking
5. Send ticket confirmation via webhook

**Best Practice:**
- Always set `max_uses` to prevent overselling
- Set `expires_at` to prevent late purchases
- Include event details in `metadata`
- Use descriptive `description` with date/time

---

### Professional Invoicing

**Scenario:** Send payment requests to clients.

**Implementation:**
1. Create payment link with `max_uses: 1` (one-time use)
2. Include client details in `metadata`
3. Email the `hosted_page_url` to client
4. Set `expires_at` to payment due date
5. Track payment via webhook

**Best Practice:**
- Use `max_uses: 1` for single invoices
- Set `expires_at` to payment deadline
- Include invoice number in `metadata`
- Use USDC for business payments

---

### Donations & Fundraising

**Scenario:** Accept ongoing donations for a cause.

**Implementation:**
1. Create payment link with suggested donation amount
2. No `max_uses` or `expires_at` limits
3. Share everywhere: website, social media, email
4. Track total donations via `uses_count`
5. Thank donors via webhook data

**Best Practice:**
- Keep amount flexible (consider PWYW in future)
- Use inspiring `description`
- No limits on uses or expiration
- USDC recommended for donor simplicity

---

## Testing Payment Links

### Step 1: Create Test Link on Devnet

```bash
curl -X POST https://api.zendfi.tech/api/v1/payment-links \
  -H "Authorization: Bearer zfi_test_abc123..." \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 0.01,
    "currency": "USD",
    "token": "USDC",
    "description": "Test Payment Link",
    "max_uses": 5
  }'
```

### Step 2: Visit Hosted Page

Open the `hosted_page_url` in your browser. You should see:
- Payment amount and description
- QR code for mobile wallets
- Your merchant name
- 15-minute countdown timer

### Step 3: Create Payment Session

```bash
curl -X POST https://api.zendfi.tech/api/v1/payment-links/YOUR_LINK_CODE/pay
```

### Step 4: Complete Payment

Use a Solana devnet wallet (Phantom with devnet mode enabled) to scan the QR code or click the payment URL.

### Step 5: Monitor Webhook

Watch for `payment.created` and `payment.confirmed` webhooks to your configured URL!

---

## Code Examples

### Node.js/Express: Create & Share Payment Link

```javascript
const express = require('express');
const axios = require('axios');

const app = express();
const ZENDFI_API_KEY = process.env.ZENDFI_API_KEY;

// Create payment link for a product
app.post('/products/:id/payment-link', async (req, res) => {
  const { id } = req.params;
  const product = await getProductById(id); // Your DB function

  try {
    const response = await axios.post(
      'https://api.zendfi.tech/api/v1/payment-links',
      {
        amount: product.price,
        currency: 'USD',
        token: 'USDC',
        description: `${product.name} - ${product.description}`,
        metadata: {
          product_id: product.id,
          sku: product.sku,
          category: product.category
        }
      },
      {
        headers: {
          'Authorization': `Bearer ${ZENDFI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const link = response.data;

    // Save link_code to database for future reference
    await savePaymentLink(product.id, link.link_code);

    res.json({
      success: true,
      payment_link: link.hosted_page_url,
      link_code: link.link_code,
      message: 'Share this link with your customers!'
    });
  } catch (error) {
    console.error('Payment link creation failed:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to create payment link' });
  }
});

// Get payment link stats
app.get('/payment-links/:code/stats', async (req, res) => {
  const { code } = req.params;

  try {
    const response = await axios.get(
      `https://api.zendfi.tech/api/v1/payment-links/${code}`
    );

    const link = response.data;

    res.json({
      link_code: code,
      uses_count: link.uses_count,
      max_uses: link.max_uses,
      remaining_uses: link.max_uses ? link.max_uses - link.uses_count : 'unlimited',
      is_active: link.is_active,
      expires_at: link.expires_at,
      created_at: link.created_at
    });
  } catch (error) {
    console.error('Failed to get link stats:', error.response?.data || error.message);
    res.status(404).json({ error: 'Payment link not found' });
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

---

### Python/Flask: Event Ticketing with Payment Links

```python
from flask import Flask, request, jsonify
import requests
import os
from datetime import datetime, timedelta

app = Flask(__name__)
ZENDFI_API_KEY = os.getenv('ZENDFI_API_KEY')

@app.route('/events/<event_id>/create-ticket-link', methods=['POST'])
def create_ticket_link(event_id):
    """Create a payment link for event tickets"""
    event = get_event_by_id(event_id)  # Your DB function
    
    # Calculate expiration (day before event)
    event_date = datetime.fromisoformat(event['date'])
    expires_at = event_date - timedelta(days=1)
    
    response = requests.post(
        'https://api.zendfi.tech/api/v1/payment-links',
        headers={
            'Authorization': f'Bearer {ZENDFI_API_KEY}',
            'Content-Type': 'application/json'
        },
        json={
            'amount': event['ticket_price'],
            'currency': 'USD',
            'token': 'USDC',
            'description': f"{event['name']} - General Admission",
            'max_uses': event['capacity'],
            'expires_at': expires_at.isoformat() + 'Z',
            'metadata': {
                'event_id': event['id'],
                'event_name': event['name'],
                'event_date': event['date'],
                'ticket_type': 'general_admission',
                'venue': event['venue']
            }
        }
    )
    
    if response.status_code == 200:
        link = response.json()
        
        # Save to database
        save_ticket_link(event_id, link['link_code'], link['id'])
        
        return jsonify({
            'success': True,
            'hosted_page': link['hosted_page_url'],
            'link_code': link['link_code'],
            'capacity': link['max_uses'],
            'expires_at': link['expires_at'],
            'message': f"Ticket link created! Share this link to sell {link['max_uses']} tickets."
        }), 200
    else:
        return jsonify({
            'error': 'Failed to create ticket link',
            'details': response.json()
        }), 500

@app.route('/events/<event_id>/ticket-sales', methods=['GET'])
def get_ticket_sales(event_id):
    """Check how many tickets have been sold"""
    link_code = get_ticket_link_code(event_id)  # Your DB function
    
    response = requests.get(
        f'https://api.zendfi.tech/api/v1/payment-links/{link_code}'
    )
    
    if response.status_code == 200:
        link = response.json()
        sold = link['uses_count']
        capacity = link['max_uses']
        remaining = capacity - sold if capacity else 'unlimited'
        
        return jsonify({
            'event_id': event_id,
            'tickets_sold': sold,
            'total_capacity': capacity,
            'tickets_remaining': remaining,
            'is_sold_out': sold >= capacity if capacity else False,
            'link_active': link['is_active'],
            'expires_at': link['expires_at']
        }), 200
    else:
        return jsonify({'error': 'Ticket link not found'}), 404

if __name__ == '__main__':
    app.run(debug=True, port=5000)
```

---

## Summary & Next Steps

Congratulations! 🎉 You now know how to create and use payment links like a pro!

**What You Learned:**
- Create reusable payment links with optional limits and expiration
- Accept USDC, SOL, or USDT payments
- Get beautiful hosted checkout pages automatically
- Track usage counts and monitor capacity
- Implement various use cases (e-commerce, events, donations, etc.)

**Next Steps:**
1. Read [Webhooks Guide](./04-webhooks.md) to handle payment notifications
2. Explore [Wallet Management](./05-wallet-management.md) to check balances
3. Check out [Advanced Features](./06-advanced-features.md) for payment splits

**Need Help?**
- Email: support@zendfi.tech
- Discord: discord.gg/zendfi
- Docs: https://docs.zendfi.tech

Happy building!
