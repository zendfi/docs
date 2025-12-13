---
sidebar_position: 6
title: Payment Links
description: Generate shareable payment links without code
---

# Payment Links

Create payment links that you can share anywhere - email, social media, messaging apps, or embed on your website. No coding required!

## Quick Start

<TryIt method="POST" endpoint="/api/v1/payment-links" description="Create a simple payment link">

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

</TryIt>

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

<TryIt method="POST" endpoint="/api/v1/payment-links" description="Create a payment link for a product">

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

</TryIt>

### Example: Pay What You Want (Tips/Donations)

<TryIt method="POST" endpoint="/api/v1/payment-links" description="Create a pay-what-you-want payment link">

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

</TryIt>

### Example: Event Tickets with Quantity

<TryIt method="POST" endpoint="/api/v1/payment-links" description="Create a payment link for event tickets">

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

</TryIt>

### Example: Limited Time Offer

<TryIt method="POST" endpoint="/api/v1/payment-links" description="Create a limited-time payment link">

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

</TryIt>


## Get Payment Link

Retrieve payment link details.

### Endpoint

```
GET /api/v1/payment-links/:id
```

### Example

<TryIt method="GET" endpoint="/api/v1/payment-links/plink_abc123" description="Get payment link details">

```bash
curl -X GET https://api.zendfi.tech/api/v1/payment-links/plink_abc123 \
  -H "Authorization: Bearer zfi_live_abc123..."
```

</TryIt>

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

<TryIt method="GET" endpoint="/api/v1/payment-links?active=true&limit=10" description="List active payment links">

```bash
curl -X GET "https://api.zendfi.tech/api/v1/payment-links?active=true&limit=10" \
  -H "Authorization: Bearer zfi_live_abc123..."
```

</TryIt>


## Update Payment Link

Update an existing payment link.

### Endpoint

```
PATCH /api/v1/payment-links/:id
```

### Example: Update Price

<TryIt method="PATCH" endpoint="/api/v1/payment-links/plink_abc123" description="Update a payment link">

```bash
curl -X PATCH https://api.zendfi.tech/api/v1/payment-links/plink_abc123 \
  -H "Authorization: Bearer zfi_live_abc123..." \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 249,
    "description": "Holiday Sale - $50 off!"
  }'
```

</TryIt>

## Deactivate Payment Link

Deactivate a payment link so it can no longer accept payments.

### Endpoint

```
POST /api/v1/payment-links/:id/deactivate
```

### Example

<TryIt method="POST" endpoint="/api/v1/payment-links/plink_abc123/deactivate" description="Deactivate a payment link">

```bash
curl -X POST https://api.zendfi.tech/api/v1/payment-links/plink_abc123/deactivate \
  -H "Authorization: Bearer zfi_live_abc123..."
```

</TryIt>


## Reactivate Payment Link

Reactivate a previously deactivated payment link.

### Endpoint

```
POST /api/v1/payment-links/:id/activate
```

### Example

<TryIt method="POST" endpoint="/api/v1/payment-links/plink_abc123/activate" description="Reactivate a payment link">

```bash
curl -X POST https://api.zendfi.tech/api/v1/payment-links/plink_abc123/activate \
  -H "Authorization: Bearer zfi_live_abc123..."
```

</TryIt>


## Payment Link Analytics

Get analytics for a specific payment link.

### Endpoint

```
GET /api/v1/payment-links/:id/analytics
```

### Example

<TryIt method="GET" endpoint="/api/v1/payment-links/plink_abc123/analytics" description="Get payment link analytics">

```bash
curl -X GET https://api.zendfi.tech/api/v1/payment-links/plink_abc123/analytics \
  -H "Authorization: Bearer zfi_live_abc123..."
```

</TryIt>

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

- [Payments API](/api/payments) - Full payment creation API
- [Webhooks](/features/webhooks) - Get notified of payment events
