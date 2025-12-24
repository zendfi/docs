---
sidebar_position: 6
title: Payment Links
description: Generate shareable payment links
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Payment Links

Create shareable payment links that work anywhere - email, social media, or messaging apps. Each link generates a unique checkout page for customers.

## Features

- **Shareable URLs** - One link for unlimited payments
- **Simple Setup** - Just amount, currency, and description
- **Usage Limits** - Optionally set maximum uses
- **Expiration** - Set expiration dates for time-limited offers
- **Crypto Payments** - Accept USDC, SOL, or USDT on Solana


## Create Payment Link

Create a new shareable payment link.

### Endpoint

```
POST /api/v1/payment-links
```

### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `amount` | number | **Yes** | Payment amount in USD |
| `currency` | string | **Yes** | Currency code ("USD" only) |
| `token` | string | No | Payment token ("USDC", "SOL", "USDT" - default: "USDC") |
| `description` | string | No | Payment description |
| `max_uses` | number | No | Maximum times link can be used |
| `expires_at` | string | No | Link expiration (ISO 8601) |
| `metadata` | object | No | Custom key-value pairs |

### Example: Simple Product Link

<Tabs groupId="sdk-language">
<TabItem value="sdk" label="TypeScript SDK" default>

```typescript
import { ZendFi } from '@zendfi/sdk';

const zendfi = new ZendFi();

const link = await zendfi.createPaymentLink({
  amount: 299,
  currency: 'USD',
  token: 'USDC',
  description: 'ZendFi Pro License - Lifetime Access'
});

console.log('Share this link:', link.hosted_page_url);
console.log('Link code:', link.link_code);
console.log('Payment URL:', link.payment_url);
```

</TabItem>
<TabItem value="rest" label="REST API">

```bash
curl -X POST https://api.zendfi.tech/api/v1/payment-links \
  -H "Authorization: Bearer zfi_live_abc123..." \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 299,
    "currency": "USD",
    "token": "USDC",
    "description": "ZendFi Pro License - Lifetime Access"
  }'
```

</TabItem>
</Tabs>

**Response:**

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "link_code": "abc123xyz",
  "payment_url": "https://checkout.zendfi.tech/pay/link/abc123xyz",
  "hosted_page_url": "https://checkout.zendfi.tech/checkout/abc123xyz",
  "amount": 299,
  "currency": "USD",
  "token": "USDC",
  "max_uses": null,
  "uses_count": 0,
  "expires_at": null,
  "is_active": true,
  "created_at": "2025-10-26T14:00:00Z"
}
```

### Example: Limited Time Offer

<Tabs groupId="sdk-language">
<TabItem value="sdk" label="TypeScript SDK" default>

```typescript
const link = await zendfi.createPaymentLink({
  amount: 49.50,
  currency: 'USD',
  description: 'Black Friday Deal - 50% Off!',
  expires_at: '2025-12-02T00:00:00Z',
  max_uses: 100,
  metadata: {
    campaign: 'black_friday_2025',
    original_price: 99
  }
});

console.log('Limited offer link:', link.hosted_page_url);
console.log('Expires:', link.expires_at);
console.log('Max uses:', link.max_uses);
```

</TabItem>
<TabItem value="rest" label="REST API">

```bash
curl -X POST https://api.zendfi.tech/api/v1/payment-links \
  -H "Authorization: Bearer zfi_live_abc123..." \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 49.50,
    "currency": "USD",
    "description": "Black Friday Deal - 50% Off!",
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

### Example: Event Tickets

<Tabs groupId="sdk-language">
<TabItem value="sdk" label="TypeScript SDK" default>

```typescript
const link = await zendfi.createPaymentLink({
  amount: 149,
  currency: 'USD',
  token: 'USDC',
  description: 'Web3 Conference 2025 - General Admission',
  expires_at: '2025-03-01T00:00:00Z',
  max_uses: 500,
  metadata: {
    event_id: 'web3conf2025',
    ticket_type: 'general'
  }
});

console.log('Ticket link:', link.hosted_page_url);
```

</TabItem>
<TabItem value="rest" label="REST API">

```bash
curl -X POST https://api.zendfi.tech/api/v1/payment-links \
  -H "Authorization: Bearer zfi_live_abc123..." \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 149,
    "currency": "USD",
    "token": "USDC",
    "description": "Web3 Conference 2025 - General Admission",
    "expires_at": "2025-03-01T00:00:00Z",
    "max_uses": 500,
    "metadata": {
      "event_id": "web3conf2025",
      "ticket_type": "general"
    }
  }'
```

</TabItem>
</Tabs>


## Get Payment Link

Retrieve payment link details by link code.

### Endpoint

```
GET /api/v1/payment-links/:link_code
```

### Example

<Tabs groupId="sdk-language">
<TabItem value="sdk" label="TypeScript SDK" default>

```typescript
const link = await zendfi.getPaymentLink('abc123xyz');

console.log('Link code:', link.link_code);
console.log('Amount:', link.amount, link.token);
console.log('Times used:', link.uses_count);
console.log('Active:', link.is_active);
console.log('Checkout URL:', link.hosted_page_url);
```

</TabItem>
<TabItem value="rest" label="REST API">

```bash
curl -X GET https://api.zendfi.tech/api/v1/payment-links/abc123xyz \
  -H "Authorization: Bearer zfi_live_abc123..."
```

</TabItem>
</Tabs>

**Response:**

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "link_code": "abc123xyz",
  "payment_url": "https://checkout.zendfi.tech/pay/link/abc123xyz",
  "hosted_page_url": "https://checkout.zendfi.tech/checkout/abc123xyz",
  "amount": 299,
  "currency": "USD",
  "token": "USDC",
  "max_uses": null,
  "uses_count": 47,
  "expires_at": null,
  "is_active": true,
  "created_at": "2025-10-26T14:00:00Z"
}
```


## List Payment Links

Get all payment links for the authenticated merchant.

### Endpoint

```
GET /api/v1/payment-links
```

### Example

<Tabs groupId="sdk-language">
<TabItem value="sdk" label="TypeScript SDK" default>

```typescript
const links = await zendfi.listPaymentLinks();

links.forEach(link => {
  console.log(`Link: ${link.link_code}`);
  console.log(`Amount: $${link.amount} ${link.token}`);
  console.log(`Used ${link.uses_count} times`);
  console.log(`Active: ${link.is_active}`);
  console.log(`URL: ${link.hosted_page_url}`);
  console.log('---');
});
```

</TabItem>
<TabItem value="rest" label="REST API">

```bash
curl -X GET https://api.zendfi.tech/api/v1/payment-links \
  -H "Authorization: Bearer zfi_live_abc123..."
```

</TabItem>
</Tabs>

**Response:**

```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "link_code": "abc123xyz",
    "payment_url": "https://checkout.zendfi.tech/pay/link/abc123xyz",
    "hosted_page_url": "https://checkout.zendfi.tech/checkout/abc123xyz",
    "amount": 299,
    "currency": "USD",
    "token": "USDC",
    "max_uses": null,
    "uses_count": 47,
    "expires_at": null,
    "is_active": true,
    "created_at": "2025-10-26T14:00:00Z"
  },
  {
    "id": "660e8400-e29b-41d4-a716-446655440001",
    "link_code": "xyz789abc",
    "payment_url": "https://checkout.zendfi.tech/pay/link/xyz789abc",
    "hosted_page_url": "https://checkout.zendfi.tech/checkout/xyz789abc",
    "amount": 49.50,
    "currency": "USD",
    "token": "USDC",
    "max_uses": 100,
    "uses_count": 23,
    "expires_at": "2025-12-02T00:00:00Z",
    "is_active": true,
    "created_at": "2025-11-25T10:00:00Z"
  }
]
```


## Link Behavior

### Expiration

When a payment link expires:
- Links with `expires_at` in the past cannot create new payments
- The link remains in your list but stops accepting payments
- Customers see an expiration message

### Usage Limits

When a payment link reaches `max_uses`:
- No new payments can be created from this link
- Existing pending payments are not affected
- The link remains visible but inactive

### Active Status

The `is_active` field indicates if a link can currently accept payments:
- `true` - Link is accepting payments
- `false` - Link expired or reached usage limit


## Webhook Events

| Event | Description |
|-------|-------------|
| `PaymentLinkCreated` | Payment link created |
| `PaymentLinkUsed` | Payment created from link |

### Example Webhook Payload

```json
{
  "event": "PaymentLinkUsed",
  "timestamp": "2025-10-26T14:05:00Z",
  "data": {
    "payment_link_id": "550e8400-e29b-41d4-a716-446655440000",
    "link_code": "abc123xyz",
    "payment_id": "770e8400-e29b-41d4-a716-446655440002",
    "amount": 299,
    "token": "USDC",
    "uses_count": 48
  }
}
```


## Use Cases

| Use Case | Description |
|----------|-------------|
| **Simple Sales** | Share a link to sell digital products or services |
| **Event Tickets** | Distribute ticket purchase links with usage limits |
| **Limited Offers** | Create time-limited deals with expiration dates |
| **Pre-Orders** | Collect payments before launch with max_uses |
| **Quick Billing** | Share payment links instead of formal invoices |


## Best Practices

### Creating Links

1. **Clear Descriptions** - Use specific descriptions so customers know what they're paying for
2. **Set Limits** - Use `max_uses` for limited inventory or special offers
3. **Expiration Dates** - Set `expires_at` for time-sensitive promotions
4. **Metadata Tracking** - Add campaign, product, or source tracking to metadata

### Sharing Links

1. **Use hosted_page_url** - This is the main checkout URL to share
2. **Test Mode First** - Create test links before going live
3. **Track Usage** - Monitor `uses_count` to gauge interest
4. **Check Expiration** - Verify links haven't expired before sharing

### Managing Links

1. **List Regularly** - Review your active links periodically
2. **Monitor Usage** - Check `uses_count` against `max_uses`
3. **Update Campaigns** - Create new links for new campaigns rather than reusing
4. **Use Metadata** - Track performance by campaign, source, or product


## Embedding Links

### Simple Link

```html
<a href="https://checkout.zendfi.tech/checkout/abc123xyz">Buy Now with Crypto</a>
```

### Button

```html
<a href="https://checkout.zendfi.tech/checkout/abc123xyz" 
   style="background: #6366f1; color: white; padding: 12px 24px; 
          border-radius: 8px; text-decoration: none; display: inline-block;">
  Pay $299 with USDC
</a>
```

### React Component

```tsx
import { useState } from 'react';

export function PaymentButton({ linkCode, amount }: { linkCode: string, amount: number }) {
  const checkoutUrl = `https://checkout.zendfi.tech/checkout/${linkCode}`;
  
  return (
    <a 
      href={checkoutUrl}
      className="btn btn-primary"
      target="_blank"
      rel="noopener noreferrer"
    >
      Pay ${amount} with Crypto
    </a>
  );
}
```


## Next Steps

**Integration Guides:**
- [Next.js Integration](/developer-tools/nextjs-integration) - Complete setup for Next.js projects
- [Express Integration](/developer-tools/express-integration) - REST API server guide

**Related APIs:**
- [Payments API](/api/payments) - Direct payment creation
- [Invoices](/api/invoices) - Formal invoicing with email delivery
- [Webhooks](/features/webhooks) - Get notified of link usage

**Need Help?**
- [Discord Community](https://discord.gg/zendfi)
- [Email Support](mailto:support@zendfi.tech)
