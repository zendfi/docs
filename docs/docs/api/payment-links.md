---
sidebar_position: 6
title: Payment Links
description: Generate shareable payment links without code
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Payment Links

Create payment links that you can share anywhere - email, social media, messaging apps, or embed on your website. No coding required!

## Quick Start

<Tabs groupId="sdk-language">
<TabItem value="sdk" label="TypeScript SDK" default>

```typescript
import { ZendFi } from '@zendfi/sdk';

const zendfi = new ZendFi();

const link = await zendfi.paymentLinks.create({
  name: 'Pro Plan Upgrade',
  amount: 99,
  currency: 'USD'
});

console.log('Share this link:', link.url);
// https://checkout.zendfi.tech/pay/plink_abc123
```

</TabItem>
<TabItem value="rest" label="REST API">

```bash
curl -X POST https://api.zendfi.tech/api/v1/payment-links \
  -H "Authorization: Bearer zfi_live_abc123..." \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Pro Plan Upgrade",
    "amount": 99,
    "currency": "USD"
  }'
```

**Response:**

```json
{
  "id": "plink_abc123",
  "url": "https://zendfi.tech/pay/plink_abc123",
  "name": "Pro Plan Upgrade",
  "amount": 99,
  "currency": "USD"
}
```

</TabItem>
</Tabs>

Share `https://zendfi.tech/pay/plink_abc123` and start collecting payments! 🎉


## Features

- **No-Code** - Create links from dashboard or API
- **Shareable** - Works on any platform
- **Customizable** - Add metadata, limits, expiration
- **Reusable** - One link for multiple payments
- **Analytics** - Track views, conversions, revenue


## Use Cases

| Use Case | Description |
|----------|-------------|
| **Donations** | Accept tips, donations, or support payments |
| **Quick Sales** | Sell products without a full checkout |
| **Event Tickets** | Sell tickets via social media |
| **Freelance Billing** | Send payment links instead of invoices |
| **Pre-Orders** | Collect payments before launch |


## Create Payment Link

Create a new shareable payment link.

### Endpoint

```
POST /api/v1/payment-links
```

### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | string | **Yes** | Link name/description shown to payer |
| `amount` | number | Conditional | Fixed amount (omit for PWYW) |
| `currency` | string | **Yes** | Currency code ("USD" only) |
| `description` | string | No | Longer description |
| `image_url` | string | No | Product/service image URL |
| `allow_custom_amount` | boolean | No | Allow payer to enter custom amount |
| `min_amount` | number | No | Minimum amount (for PWYW) |
| `max_amount` | number | No | Maximum amount |
| `suggested_amounts` | array | No | Suggested amounts to display |
| `quantity_enabled` | boolean | No | Allow quantity selection |
| `max_quantity` | number | No | Maximum quantity per payment |
| `collect_email` | boolean | No | Require email (default: false) |
| `collect_name` | boolean | No | Require name (default: false) |
| `collect_phone` | boolean | No | Require phone (default: false) |
| `collect_address` | boolean | No | Require shipping address (default: false) |
| `success_url` | string | No | Redirect URL after payment |
| `expires_at` | string | No | Link expiration (ISO 8601) |
| `max_uses` | number | No | Maximum times link can be used |
| `metadata` | object | No | Custom key-value pairs |

### Example: Fixed Amount Product

<Tabs groupId="sdk-language">
<TabItem value="sdk" label="TypeScript SDK" default>

```typescript
const link = await zendfi.paymentLinks.create({
  name: 'ZendFi Pro License',
  description: 'Lifetime access to ZendFi Pro features',
  amount: 299,
  currency: 'USD',
  imageUrl: 'https://zendfi.tech/images/pro-license.png',
  collectEmail: true,
  successUrl: 'https://myapp.com/thank-you',
  metadata: {
    product_id: 'pro_license',
    sku: 'ZFPRO001'
  }
});

console.log('Payment link:', link.url);
console.log('Link ID:', link.id);
```

</TabItem>
<TabItem value="rest" label="REST API">

```bash
curl -X POST https://api.zendfi.tech/api/v1/payment-links \
  -H "Authorization: Bearer zfi_live_abc123..." \
  -H "Content-Type: application/json" \
  -d '{
    "name": "ZendFi Pro License",
    "description": "Lifetime access to ZendFi Pro features",
    "amount": 299,
    "currency": "USD",
    "image_url": "https://zendfi.tech/images/pro-license.png",
    "collect_email": true,
    "success_url": "https://myapp.com/thank-you",
    "metadata": {
      "product_id": "pro_license",
      "sku": "ZFPRO001"
    }
  }'
```

</TabItem>
</Tabs>

### Example: Pay What You Want (Tips/Donations)

<Tabs groupId="sdk-language">
<TabItem value="sdk" label="TypeScript SDK" default>

```typescript
const link = await zendfi.paymentLinks.create({
  name: 'Support My Work',
  description: 'Buy me a coffee or support my open source work!',
  currency: 'USD',
  allowCustomAmount: true,
  minAmount: 1,
  suggestedAmounts: [5, 10, 25, 50],
  imageUrl: 'https://example.com/coffee.png',
  collectName: true,
  metadata: {
    type: 'donation',
    campaign: 'open_source_2025'
  }
});

console.log('Donation link:', link.url);
```

</TabItem>
<TabItem value="rest" label="REST API">

```bash
curl -X POST https://api.zendfi.tech/api/v1/payment-links \
  -H "Authorization: Bearer zfi_live_abc123..." \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Support My Work",
    "description": "Buy me a coffee or support my open source work!",
    "currency": "USD",
    "allow_custom_amount": true,
    "min_amount": 1,
    "suggested_amounts": [5, 10, 25, 50],
    "image_url": "https://example.com/coffee.png",
    "collect_name": true,
    "metadata": {
      "type": "donation",
      "campaign": "open_source_2025"
    }
  }'
```

</TabItem>
</Tabs>

### Example: Event Tickets with Quantity

<Tabs groupId="sdk-language">
<TabItem value="sdk" label="TypeScript SDK" default>

```typescript
const link = await zendfi.paymentLinks.create({
  name: 'Web3 Conference 2025 - General Admission',
  description: 'Full day access to all sessions and networking',
  amount: 149,
  currency: 'USD',
  imageUrl: 'https://example.com/conference-banner.jpg',
  quantityEnabled: true,
  maxQuantity: 10,
  collectEmail: true,
  collectName: true,
  expiresAt: '2025-03-01T00:00:00Z',
  maxUses: 500,
  successUrl: 'https://myconference.com/tickets/confirmation',
  metadata: {
    event_id: 'web3conf2025',
    ticket_type: 'general'
  }
});

console.log('Ticket link:', link.url);
console.log('Expires:', link.expiresAt);
```

</TabItem>
<TabItem value="rest" label="REST API">

```bash
curl -X POST https://api.zendfi.tech/api/v1/payment-links \
  -H "Authorization: Bearer zfi_live_abc123..." \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Web3 Conference 2025 - General Admission",
    "description": "Full day access to all sessions and networking",
    "amount": 149,
    "currency": "USD",
    "image_url": "https://example.com/conference-banner.jpg",
    "quantity_enabled": true,
    "max_quantity": 10,
    "collect_email": true,
    "collect_name": true,
    "expires_at": "2025-03-01T00:00:00Z",
    "max_uses": 500,
    "success_url": "https://myconference.com/tickets/confirmation",
    "metadata": {
      "event_id": "web3conf2025",
      "ticket_type": "general"
    }
  }'
```

</TabItem>
</Tabs>

### Example: Limited Time Offer

<Tabs groupId="sdk-language">
<TabItem value="sdk" label="TypeScript SDK" default>

```typescript
const link = await zendfi.paymentLinks.create({
  name: 'Black Friday Deal - 50% Off!',
  description: 'Limited time offer - ends Monday!',
  amount: 49.50,
  currency: 'USD',
  expiresAt: '2025-12-02T00:00:00Z',
  maxUses: 100,
  metadata: {
    campaign: 'black_friday_2025',
    original_price: 99
  }
});

console.log('Limited offer link:', link.url);
console.log('Max uses:', link.maxUses);
```

</TabItem>
<TabItem value="rest" label="REST API">

```bash
curl -X POST https://api.zendfi.tech/api/v1/payment-links \
  -H "Authorization: Bearer zfi_live_abc123..." \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Black Friday Deal - 50% Off!",
    "description": "Limited time offer - ends Monday!",
    "amount": 49.50,
    "currency": "USD",
    "expires_at": "2025-12-02T00:00:00Z",
    "max_uses": 100,
    "metadata": {
      "campaign": "black_friday_2025",
      "original_price": 99
    }
  }'
```

</TabItem>
</Tabs>


## Get Payment Link

Retrieve payment link details.

### Endpoint

```
GET /api/v1/payment-links/:id
```

### Example

<Tabs groupId="sdk-language">
<TabItem value="sdk" label="TypeScript SDK" default>

```typescript
const link = await zendfi.paymentLinks.retrieve('plink_abc123');

console.log('Link name:', link.name);
console.log('Amount:', link.amount);
console.log('Times used:', link.timesUsed);
console.log('Total revenue:', link.totalRevenue);
```

**Response:**

```json
{
  "id": "plink_abc123",
  "merchant_id": "merchant_xyz789",
  "name": "ZendFi Pro License",
  "description": "Lifetime access to ZendFi Pro features",
  "amount": 299,
  "currency": "USD",
  "image_url": "https://zendfi.tech/images/pro-license.png",
  "url": "https://zendfi.tech/pay/plink_abc123",
  "active": true,
  "collect_email": true,
  "collect_name": false,
  "success_url": "https://myapp.com/thank-you",
  "expires_at": null,
  "max_uses": null,
  "times_used": 47,
  "total_revenue": 14053,
  "created_at": "2025-10-01T12:00:00Z",
  "metadata": {
    "product_id": "pro_license",
    "sku": "ZFPRO001"
  }
}
```

</TabItem>
<TabItem value="rest" label="REST API">

```bash
curl -X GET https://api.zendfi.tech/api/v1/payment-links/plink_abc123 \
  -H "Authorization: Bearer zfi_live_abc123..."
```

**Response:**

```json
{
  "id": "plink_abc123",
  "merchant_id": "merchant_xyz789",
  "name": "ZendFi Pro License",
  "description": "Lifetime access to ZendFi Pro features",
  "amount": 299,
  "currency": "USD",
  "image_url": "https://zendfi.tech/images/pro-license.png",
  "url": "https://zendfi.tech/pay/plink_abc123",
  "active": true,
  "collect_email": true,
  "collect_name": false,
  "success_url": "https://myapp.com/thank-you",
  "expires_at": null,
  "max_uses": null,
  "times_used": 47,
  "total_revenue": 14053,
  "created_at": "2025-10-01T12:00:00Z",
  "metadata": {
    "product_id": "pro_license",
    "sku": "ZFPRO001"
  }
}
```

</TabItem>
</Tabs>


## List Payment Links

Get all payment links for your merchant account.

### Endpoint

```
GET /api/v1/payment-links
```

### Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `active` | boolean | Filter by active status |
| `limit` | number | Number of results (default: 20, max: 100) |
| `offset` | number | Pagination offset |

### Example

<Tabs groupId="sdk-language">
<TabItem value="sdk" label="TypeScript SDK" default>

```typescript
const links = await zendfi.paymentLinks.list({
  active: true,
  limit: 10
});

links.forEach(link => {
  console.log(`${link.name}: ${link.url}`);
  console.log(`Used ${link.timesUsed} times, $${link.totalRevenue} revenue`);
});
```

</TabItem>
<TabItem value="rest" label="REST API">

```bash
curl -X GET "https://api.zendfi.tech/api/v1/payment-links?active=true&limit=10" \
  -H "Authorization: Bearer zfi_live_abc123..."
```

</TabItem>
</Tabs>


## Update Payment Link

Update an existing payment link.

### Endpoint

```
PATCH /api/v1/payment-links/:id
```

### Example: Update Price

<Tabs groupId="sdk-language">
<TabItem value="sdk" label="TypeScript SDK" default>

```typescript
const link = await zendfi.paymentLinks.update('plink_abc123', {
  amount: 249,
  description: 'Holiday Sale - $50 off!'
});

console.log('Updated link:', link.url);
console.log('New amount:', link.amount);
```

</TabItem>
<TabItem value="rest" label="REST API">

```bash
curl -X PATCH https://api.zendfi.tech/api/v1/payment-links/plink_abc123 \
  -H "Authorization: Bearer zfi_live_abc123..." \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 249,
    "description": "Holiday Sale - $50 off!"
  }'
```

</TabItem>
</Tabs>

## Deactivate Payment Link

Deactivate a payment link so it can no longer accept payments.

### Endpoint

```
POST /api/v1/payment-links/:id/deactivate
```

### Example

<Tabs groupId="sdk-language">
<TabItem value="sdk" label="TypeScript SDK" default>

```typescript
await zendfi.paymentLinks.deactivate('plink_abc123');

console.log('Payment link deactivated');
```

</TabItem>
<TabItem value="rest" label="REST API">

```bash
curl -X POST https://api.zendfi.tech/api/v1/payment-links/plink_abc123/deactivate \
  -H "Authorization: Bearer zfi_live_abc123..."
```

</TabItem>
</Tabs>


## Reactivate Payment Link

Reactivate a previously deactivated payment link.

### Endpoint

```
POST /api/v1/payment-links/:id/activate
```

### Example

<Tabs groupId="sdk-language">
<TabItem value="sdk" label="TypeScript SDK" default>

```typescript
await zendfi.paymentLinks.activate('plink_abc123');

console.log('Payment link reactivated');
```

</TabItem>
<TabItem value="rest" label="REST API">

```bash
curl -X POST https://api.zendfi.tech/api/v1/payment-links/plink_abc123/activate \
  -H "Authorization: Bearer zfi_live_abc123..."
```

</TabItem>
</Tabs>


## Payment Link Analytics

Get analytics for a specific payment link.

### Endpoint

```
GET /api/v1/payment-links/:id/analytics
```

### Example

<Tabs groupId="sdk-language">
<TabItem value="sdk" label="TypeScript SDK" default>

```typescript
const analytics = await zendfi.paymentLinks.getAnalytics('plink_abc123');

console.log('Views:', analytics.views);
console.log('Conversion rate:', analytics.conversionRate + '%');
console.log('Total revenue:', analytics.totalRevenue);
console.log('Average payment:', analytics.averagePayment);

// Daily breakdown
analytics.paymentsByDay.forEach(day => {
  console.log(`${day.date}: ${day.count} payments, $${day.revenue}`);
});
```

**Response:**

```json
{
  "payment_link_id": "plink_abc123",
  "views": 1250,
  "unique_visitors": 980,
  "payments_started": 120,
  "payments_completed": 47,
  "conversion_rate": 4.8,
  "total_revenue": 14053,
  "average_payment": 299,
  "payments_by_day": [
    { "date": "2025-10-25", "count": 5, "revenue": 1495 },
    { "date": "2025-10-26", "count": 8, "revenue": 2392 }
  ]
}
```

</TabItem>
<TabItem value="rest" label="REST API">

```bash
curl -X GET https://api.zendfi.tech/api/v1/payment-links/plink_abc123/analytics \
  -H "Authorization: Bearer zfi_live_abc123..."
```

**Response:**

```json
{
  "payment_link_id": "plink_abc123",
  "views": 1250,
  "unique_visitors": 980,
  "payments_started": 120,
  "payments_completed": 47,
  "conversion_rate": 4.8,
  "total_revenue": 14053,
  "average_payment": 299,
  "payments_by_day": [
    { "date": "2025-10-25", "count": 5, "revenue": 1495 },
    { "date": "2025-10-26", "count": 8, "revenue": 2392 }
  ]
}
```

</TabItem>
</Tabs>


## Embedding Payment Links

### Simple Link

```html
<a href="https://zendfi.tech/pay/plink_abc123">Pay Now</a>
```

### Button

```html
<a href="https://zendfi.tech/pay/plink_abc123" 
   style="background: #6366f1; color: white; padding: 12px 24px; 
          border-radius: 8px; text-decoration: none; display: inline-block;">
  Pay $299 with Crypto
</a>
```

### QR Code

Generate a QR code for your payment link:

```
https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https://zendfi.tech/pay/plink_abc123
```

Or use the built-in QR endpoint:

```
GET /api/v1/payment-links/:id/qr
```


## Webhook Events

| Event | Description |
|-------|-------------|
| `payment_link.created` | Payment link created |
| `payment_link.payment_completed` | Payment made via link |
| `payment_link.deactivated` | Link deactivated |
| `payment_link.expired` | Link reached expiration |
| `payment_link.limit_reached` | Link reached max_uses |

### Example Webhook Payload

```json
{
  "event": "payment_link.payment_completed",
  "timestamp": "2025-10-26T15:30:00Z",
  "data": {
    "payment_link_id": "plink_abc123",
    "payment_link_name": "ZendFi Pro License",
    "payment_id": "pay_xyz789",
    "amount": 299,
    "currency": "USD",
    "payer_wallet": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
    "payer_email": "customer@example.com",
    "quantity": 1,
    "transaction_signature": "5K2Nz...abc123",
    "metadata": {
      "product_id": "pro_license"
    }
  }
}
```


## Best Practices

### Creating Effective Payment Links

1. **Clear Names** - Use descriptive names that explain what the payment is for
2. **Add Images** - Visual products convert better
3. **Set Expectations** - Include descriptions of what payer receives
4. **Success URLs** - Redirect to a thank-you page with next steps

### Managing Links

1. **Use Metadata** - Track campaigns, products, and sources
2. **Set Limits** - Use `max_uses` for limited offers
3. **Expiration** - Set `expires_at` for time-sensitive offers
4. **Monitor Analytics** - Track conversion rates and optimize


## Next Steps

**Integration Guides:**
- [Next.js Integration](/developer-tools/nextjs-integration) - Complete setup for Next.js projects
- [Express Integration](/developer-tools/express-integration) - REST API server guide

**Related APIs:**
- [Payments API](/api/payments) - Direct payment creation
- [Subscriptions API](/api/subscriptions) - Recurring billing
- [Webhooks](/features/webhooks) - Get notified of payment events

**Need Help?**
- [Discord Community](https://discord.gg/zendfi)
- [Email Support](mailto:support@zendfi.tech)
