---
sidebar_position: 5
title: Invoices
description: Create simple invoices with crypto payment links. Perfect for freelance billing and B2B services.
---

## Features

- **Simple Invoice Creation** - Generate invoices with line items
- **Automatic Payment Links** - Each invoice gets a unique payment URL
- **Email Delivery** - Send invoices directly to customers
- **Crypto Payments** - Accept USDC/SOL payments on Solana


## Create Invoice

Create a new invoice.

### Endpoint

```
POST /api/v1/invoices
```

### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `customer_email` | string | **Yes** | Customer email address |
| `customer_name` | string | No | Customer or company name |
| `amount` | number | **Yes** | Total invoice amount in USD |
| `token` | string | No | Payment token ("USDC", "SOL", "USDT" - default: "USDC") |
| `description` | string | **Yes** | Invoice description |
| `line_items` | array | No | Array of line item objects |
| `due_date` | string | No | Payment due date (ISO 8601) |
| `metadata` | object | No | Custom key-value pairs |

### Line Item Object

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `description` | string | **Yes** | Item description |
| `quantity` | number | **Yes** | Quantity |
| `unit_price` | number | **Yes** | Price per unit in USD |

### Example: Service Invoice

<CodeGroup>
```typescript TypeScript SDK
import { ZendFi } from '@zendfi/sdk';

const zendfi = new ZendFi();

const invoice = await zendfi.createInvoice({
  customer_email: 'billing@acme.com',
  customer_name: 'Acme Corporation',
  amount: 6299,
  description: 'Website Development - October 2025',
  line_items: [
    {
      description: 'Website Development (40 hours)',
      quantity: 40,
      unit_price: 150
    },
    {
      description: 'Hosting & Maintenance',
      quantity: 1,
      unit_price: 200
    },
    {
      description: 'SSL Certificate',
      quantity: 1,
      unit_price: 99
    }
  ],
  due_date: '2025-11-15T23:59:59Z',
  metadata: {
    project: 'website_redesign',
    contract_id: 'contract_456'
  }
});

console.log('Invoice created:', invoice.invoice_number);
console.log('Amount:', invoice.amount_usd);
console.log('Status:', invoice.status); // "draft"
```

```bash REST API
curl -X POST https://api.zendfi.tech/api/v1/invoices \
  -H "Authorization: Bearer zfi_live_abc123..." \
  -H "Content-Type: application/json" \
  -d '{
    "customer_email": "billing@acme.com",
    "customer_name": "Acme Corporation",
    "amount": 6299,
    "description": "Website Development - October 2025",
    "line_items": [
      {
        "description": "Website Development (40 hours)",
        "quantity": 40,
        "unit_price": 150
      },
      {
        "description": "Hosting & Maintenance",
        "quantity": 1,
        "unit_price": 200
      },
      {
        "description": "SSL Certificate",
        "quantity": 1,
        "unit_price": 99
      }
    ],
    "due_date": "2025-11-15T23:59:59Z",
    "metadata": {
      "project": "website_redesign",
      "contract_id": "contract_456"
    }
  }'
```
</CodeGroup>

**Response:**

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "invoice_number": "INV-2025-00001",
  "customer_email": "billing@acme.com",
  "customer_name": "Acme Corporation",
  "amount_usd": 6299,
  "token": "USDC",
  "description": "Website Development - October 2025",
  "status": "draft",
  "payment_url": null,
  "due_date": "2025-11-15T23:59:59Z",
  "created_at": "2025-10-26T14:00:00Z"
}
```

### Example: Simple Invoice

<CodeGroup>
```typescript TypeScript SDK
const invoice = await zendfi.createInvoice({
  customer_email: 'client@example.com',
  customer_name: 'John Doe',
  amount: 500,
  description: 'Consulting services - October 2025',
  due_date: '2025-11-30T23:59:59Z'
});

console.log('Invoice:', invoice.invoice_number);
```

```bash REST API
curl -X POST https://api.zendfi.tech/api/v1/invoices \
  -H "Authorization: Bearer zfi_live_abc123..." \
  -H "Content-Type: application/json" \
  -d '{
    "customer_email": "client@example.com",
    "customer_name": "John Doe",
    "amount": 500,
    "description": "Consulting services - October 2025",
    "due_date": "2025-11-30T23:59:59Z"
  }'
```
</CodeGroup>


## Get Invoice

Retrieve invoice details.

### Endpoint

```
GET /api/v1/invoices/:id
```

### Example

<CodeGroup>
```typescript TypeScript SDK
const invoice = await zendfi.getInvoice('550e8400-e29b-41d4-a716-446655440000');

console.log('Invoice:', invoice.invoice_number);
console.log('Customer:', invoice.customer_name);
console.log('Amount:', invoice.amount_usd);
console.log('Status:', invoice.status);
console.log('Payment URL:', invoice.payment_url);
```

```bash REST API
curl -X GET https://api.zendfi.tech/api/v1/invoices/550e8400-e29b-41d4-a716-446655440000 \
  -H "Authorization: Bearer zfi_live_abc123..."
```
</CodeGroup>

**Response:**

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "invoice_number": "INV-2025-00001",
  "customer_email": "billing@acme.com",
  "customer_name": "Acme Corporation",
  "amount_usd": 6299,
  "token": "USDC",
  "description": "Website Development - October 2025",
  "status": "sent",
  "payment_url": "https://checkout.zendfi.tech/checkout/abc123xyz",
  "due_date": "2025-11-15T23:59:59Z",
  "created_at": "2025-10-26T14:00:00Z"
}
```


## List Invoices

Get all invoices for the authenticated merchant.

### Endpoint

```
GET /api/v1/invoices
```

### Example

<CodeGroup>
```typescript TypeScript SDK
const invoices = await zendfi.listInvoices();

invoices.forEach(invoice => {
  console.log(`${invoice.invoice_number}: ${invoice.customer_name}`);
  console.log(`  Amount: $${invoice.amount_usd} ${invoice.token}`);
  console.log(`  Status: ${invoice.status}`);
  console.log(`  Due: ${invoice.due_date}`);
});
```

```bash REST API
curl -X GET https://api.zendfi.tech/api/v1/invoices \
  -H "Authorization: Bearer zfi_live_abc123..."
```
</CodeGroup>

**Response:**

```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "invoice_number": "INV-2025-00001",
    "customer_email": "billing@acme.com",
    "customer_name": "Acme Corporation",
    "amount_usd": 6299,
    "token": "USDC",
    "description": "Website Development - October 2025",
    "status": "sent",
    "payment_url": "https://checkout.zendfi.tech/checkout/abc123xyz",
    "due_date": "2025-11-15T23:59:59Z",
    "created_at": "2025-10-26T14:00:00Z"
  },
  {
    "id": "660e8400-e29b-41d4-a716-446655440001",
    "invoice_number": "INV-2025-00002",
    "customer_email": "client@example.com",
    "customer_name": "John Doe",
    "amount_usd": 500,
    "token": "USDC",
    "description": "Consulting services",
    "status": "draft",
    "payment_url": null,
    "due_date": "2025-11-30T23:59:59Z",
    "created_at": "2025-10-27T10:00:00Z"
  }
]
```


## Send Invoice

Send an invoice to the customer via email and generate a payment link.

### Endpoint

```
POST /api/v1/invoices/:id/send
```

### Example

<CodeGroup>
```typescript TypeScript SDK
const result = await zendfi.sendInvoice('550e8400-e29b-41d4-a716-446655440000');

console.log('Invoice sent to:', result.sent_to);
console.log('Payment URL:', result.payment_url);
console.log('Status:', result.status); // "sent"
```

```bash REST API
curl -X POST https://api.zendfi.tech/api/v1/invoices/550e8400-e29b-41d4-a716-446655440000/send \
  -H "Authorization: Bearer zfi_live_abc123..."
```
</CodeGroup>

**Response:**

```json
{
  "success": true,
  "invoice_id": "550e8400-e29b-41d4-a716-446655440000",
  "invoice_number": "INV-2025-00001",
  "sent_to": "billing@acme.com",
  "payment_url": "https://checkout.zendfi.tech/checkout/abc123xyz",
  "status": "sent"
}
```

:::info Invoice Email
The customer receives a professionally formatted email with:
- Invoice details and line items
- Payment amount and due date
- One-click payment link
- QR code for mobile payment
:::


## Invoice Statuses

| Status | Description |
|--------|-------------|
| `draft` | Invoice created but not yet sent |
| `sent` | Invoice sent to customer with payment link |


## Webhook Events

| Event | Description |
|-------|-------------|
| `InvoiceCreated` | Invoice created |
| `InvoiceSent` | Invoice sent to customer |
| `InvoicePaid` | Invoice payment completed |

### Example Webhook Payload

```json
{
  "event": "InvoiceSent",
  "timestamp": "2025-10-26T14:05:00Z",
  "invoice": {
    "invoice_id": "550e8400-e29b-41d4-a716-446655440000",
    "merchant_id": "merchant_xyz789",
    "invoice_number": "INV-2025-00001",
    "customer_email": "billing@acme.com",
    "customer_name": "Acme Corporation",
    "amount_usd": 6299,
    "token": "USDC",
    "status": "sent",
    "payment_url": "https://checkout.zendfi.tech/checkout/abc123xyz"
  }
}
```


## Best Practices

### Creating Invoices

1. **Clear Descriptions** - Use specific descriptions for services/products
2. **Line Items** - Break down charges for transparency
3. **Due Dates** - Set reasonable payment terms (15-30 days typical)
4. **Contact Info** - Include customer name for professional appearance

### Managing Payments

1. **Send Immediately** - Send invoices right after creation
2. **Track Status** - Monitor invoice status via webhooks
3. **Payment Links** - Share payment URL for easy customer access
4. **Follow Up** - Check payment status via API


## Next Steps

**Integration Guides:**
- [Next.js Integration](/developer-tools/nextjs-integration) - Complete setup for Next.js projects
- [Express Integration](/developer-tools/express-integration) - REST API server guide

**Related APIs:**
- [Payments API](/api/payments) - Direct payment creation
- [Payment Links](/api/payment-links) - Reusable payment links
- [Webhooks](/features/webhooks) - Invoice event notifications

**Need Help?**
- [Discord Community](https://discord.gg/zendfi)
- [Email Support](mailto:support@zendfi.tech)
