---
sidebar_position: 5
title: Invoices API
description: Professional invoicing with payment tracking
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Invoices API

Create professional invoices with automatic payment tracking and reminders. Perfect for B2B, services, and freelance billing.

## Features

- **Professional Invoices** - Generate branded, itemized invoices
- **Multiple Line Items** - Products, services, discounts, taxes
- **Payment Tracking** - Track paid, partial, and outstanding amounts
- **Auto Reminders** - Automated payment reminders before/after due date
- **Crypto Payments** - Accept USDC payments with on-chain tracking
- **PDF Generation** - Downloadable invoice PDFs


## Create Invoice

Create a new invoice with line items.

### Endpoint

```
POST /api/v1/invoices
```

### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `invoice_number` | string | No | Custom invoice number (auto-generated if not provided) |
| `customer_name` | string | **Yes** | Customer or company name |
| `customer_email` | string | **Yes** | Customer email for notifications |
| `customer_wallet` | string | No | Customer's Solana wallet (for payments) |
| `customer_address` | object | No | Billing address object |
| `line_items` | array | **Yes** | Array of line item objects |
| `currency` | string | **Yes** | Currency code ("USD" only) |
| `due_date` | string | **Yes** | Payment due date (ISO 8601) |
| `notes` | string | No | Notes to appear on invoice |
| `terms` | string | No | Payment terms text |
| `tax_rate` | number | No | Tax rate as percentage (e.g., 8.5 for 8.5%) |
| `discount_amount` | number | No | Fixed discount amount |
| `discount_percent` | number | No | Percentage discount |
| `send_email` | boolean | No | Send invoice email immediately (default: true) |
| `metadata` | object | No | Custom key-value pairs |

### Line Item Object

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `description` | string | **Yes** | Item description |
| `quantity` | number | **Yes** | Quantity |
| `unit_price` | number | **Yes** | Price per unit |
| `tax_rate` | number | No | Item-specific tax rate (overrides invoice tax) |

### Example: Service Invoice

<Tabs groupId="sdk-language">
<TabItem value="sdk" label="TypeScript SDK" default>

```typescript
import { ZendFi } from '@zendfi/sdk';

const zendfi = new ZendFi();

const invoice = await zendfi.invoices.create({
  invoiceNumber: 'INV-2025-001',
  customerName: 'Acme Corporation',
  customerEmail: 'billing@acme.com',
  customerWallet: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
  customerAddress: {
    line1: '123 Business Ave',
    line2: 'Suite 456',
    city: 'San Francisco',
    state: 'CA',
    postalCode: '94102',
    country: 'US'
  },
  lineItems: [
    {
      description: 'Website Development - October 2025',
      quantity: 40,
      unitPrice: 150
    },
    {
      description: 'Hosting & Maintenance (Monthly)',
      quantity: 1,
      unitPrice: 200
    },
    {
      description: 'SSL Certificate (Annual)',
      quantity: 1,
      unitPrice: 99
    }
  ],
  currency: 'USD',
  dueDate: '2025-11-15T23:59:59Z',
  notes: 'Thank you for your business!',
  terms: 'Payment due within 30 days. Late payments subject to 1.5% monthly fee.',
  taxRate: 8.5,
  sendEmail: true,
  metadata: {
    project: 'website_redesign',
    contract_id: 'contract_456'
  }
});

console.log('Invoice created:', invoice.invoiceNumber);
console.log('Total:', invoice.total);
console.log('Payment URL:', invoice.paymentUrl);
console.log('PDF URL:', invoice.pdfUrl);
```

</TabItem>
<TabItem value="rest" label="REST API">

```bash
curl -X POST https://api.zendfi.tech/api/v1/invoices \
  -H "Authorization: Bearer zfi_live_abc123..." \
  -H "Content-Type: application/json" \
  -d '{
    "invoice_number": "INV-2025-001",
    "customer_name": "Acme Corporation",
    "customer_email": "billing@acme.com",
    "customer_wallet": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
    "customer_address": {
      "line1": "123 Business Ave",
      "line2": "Suite 456",
      "city": "San Francisco",
      "state": "CA",
      "postal_code": "94102",
      "country": "US"
    },
    "line_items": [
      {
        "description": "Website Development - October 2025",
        "quantity": 40,
        "unit_price": 150
      },
      {
        "description": "Hosting & Maintenance (Monthly)",
        "quantity": 1,
        "unit_price": 200
      },
      {
        "description": "SSL Certificate (Annual)",
        "quantity": 1,
        "unit_price": 99
      }
    ],
    "currency": "USD",
    "due_date": "2025-11-15T23:59:59Z",
    "notes": "Thank you for your business!",
    "terms": "Payment due within 30 days. Late payments subject to 1.5% monthly fee.",
    "tax_rate": 8.5,
    "send_email": true,
    "metadata": {
      "project": "website_redesign",
      "contract_id": "contract_456"
    }
  }'
```

</TabItem>
</Tabs>

**Response:**

```json
{
  "id": "inv_abc123def456",
  "merchant_id": "merchant_xyz789",
  "invoice_number": "INV-2025-001",
  "customer_name": "Acme Corporation",
  "customer_email": "billing@acme.com",
  "customer_wallet": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
  "customer_address": {
    "line1": "123 Business Ave",
    "line2": "Suite 456",
    "city": "San Francisco",
    "state": "CA",
    "postal_code": "94102",
    "country": "US"
  },
  "line_items": [
    {
      "id": "li_001",
      "description": "Website Development - October 2025",
      "quantity": 40,
      "unit_price": 150,
      "amount": 6000
    },
    {
      "id": "li_002",
      "description": "Hosting & Maintenance (Monthly)",
      "quantity": 1,
      "unit_price": 200,
      "amount": 200
    },
    {
      "id": "li_003",
      "description": "SSL Certificate (Annual)",
      "quantity": 1,
      "unit_price": 99,
      "amount": 99
    }
  ],
  "subtotal": 6299,
  "tax_rate": 8.5,
  "tax_amount": 535.42,
  "discount_amount": 0,
  "total": 6834.42,
  "amount_paid": 0,
  "amount_due": 6834.42,
  "currency": "USD",
  "status": "sent",
  "due_date": "2025-11-15T23:59:59Z",
  "created_at": "2025-10-26T14:00:00Z",
  "sent_at": "2025-10-26T14:00:01Z",
  "payment_url": "https://zendfi.tech/invoice/inv_abc123def456/pay",
  "pdf_url": "https://zendfi.tech/invoice/inv_abc123def456/pdf"
}
```


## Get Invoice

Retrieve invoice details.

### Endpoint

```
GET /api/v1/invoices/:id
```

### Example

<Tabs groupId="sdk-language">
<TabItem value="sdk" label="TypeScript SDK" default>

```typescript
const invoice = await zendfi.invoices.retrieve('inv_abc123def456');

console.log('Invoice:', invoice.invoiceNumber);
console.log('Customer:', invoice.customerName);
console.log('Status:', invoice.status);
console.log('Total:', invoice.total);
console.log('Amount due:', invoice.amountDue);
```

</TabItem>
<TabItem value="rest" label="REST API">

```bash
curl -X GET https://api.zendfi.tech/api/v1/invoices/inv_abc123def456 \
  -H "Authorization: Bearer zfi_live_abc123..."
```

</TabItem>
</Tabs>


## List Invoices

Get all invoices with optional filtering.

### Endpoint

```
GET /api/v1/invoices
```

### Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `status` | string | Filter by status |
| `customer_email` | string | Filter by customer email |
| `from_date` | string | Invoices created after this date |
| `to_date` | string | Invoices created before this date |
| `overdue` | boolean | Only overdue invoices |

### Example

<Tabs groupId="sdk-language">
<TabItem value="sdk" label="TypeScript SDK" default>

```typescript
const invoices = await zendfi.invoices.list({
  status: 'sent',
  overdue: true
});

invoices.forEach(invoice => {
  console.log(`${invoice.invoiceNumber}: ${invoice.customerName}`);
  console.log(`Due: ${invoice.dueDate}, Amount: $${invoice.amountDue}`);
});
```

</TabItem>
<TabItem value="rest" label="REST API">

```bash
curl -X GET "https://api.zendfi.tech/api/v1/invoices?status=sent&overdue=true" \
  -H "Authorization: Bearer zfi_live_abc123..."
```

</TabItem>
</Tabs>


## Update Invoice

Update a draft or sent invoice. Cannot update paid invoices.

### Endpoint

```
PATCH /api/v1/invoices/:id
```

### Example: Add Line Item

<Tabs groupId="sdk-language">
<TabItem value="sdk" label="TypeScript SDK" default>

```typescript
const updated = await zendfi.invoices.update('inv_abc123def456', {
  lineItems: [
    {
      id: 'li_001',
      description: 'Website Development - October 2025',
      quantity: 40,
      unitPrice: 150
    },
    {
      id: 'li_002',
      description: 'Hosting & Maintenance (Monthly)',
      quantity: 1,
      unitPrice: 200
    },
    {
      id: 'li_003',
      description: 'SSL Certificate (Annual)',
      quantity: 1,
      unitPrice: 99
    },
    {
      description: 'Rush delivery fee',
      quantity: 1,
      unitPrice: 250
    }
  ]
});

console.log('Updated total:', updated.total);
```

</TabItem>
<TabItem value="rest" label="REST API">

```bash
curl -X PATCH https://api.zendfi.tech/api/v1/invoices/inv_abc123def456 \
  -H "Authorization: Bearer zfi_live_abc123..." \
  -H "Content-Type: application/json" \
  -d '{
    "line_items": [
      {
        "id": "li_001",
        "description": "Website Development - October 2025",
        "quantity": 40,
        "unit_price": 150
      },
      {
        "id": "li_002",
        "description": "Hosting & Maintenance (Monthly)",
        "quantity": 1,
        "unit_price": 200
      },
      {
        "id": "li_003",
        "description": "SSL Certificate (Annual)",
        "quantity": 1,
        "unit_price": 99
      },
      {
        "description": "Rush delivery fee",
        "quantity": 1,
        "unit_price": 250
      }
    ]
  }'
```

</TabItem>
</Tabs>


## Send Invoice

Send or resend an invoice to the customer.

### Endpoint

```
POST /api/v1/invoices/:id/send
```

### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `message` | string | No | Custom message to include in email |
| `cc_emails` | array | No | Additional email addresses to CC |

### Example

<Tabs groupId="sdk-language">
<TabItem value="sdk" label="TypeScript SDK" default>

```typescript
await zendfi.invoices.send('inv_abc123def456', {
  message: 'Please find attached invoice for October services.',
  ccEmails: ['accounts@acme.com']
});

console.log('Invoice sent!');
```

</TabItem>
<TabItem value="rest" label="REST API">

```bash
curl -X POST https://api.zendfi.tech/api/v1/invoices/inv_abc123def456/send \
  -H "Authorization: Bearer zfi_live_abc123..." \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Please find attached invoice for October services.",
    "cc_emails": ["accounts@acme.com"]
  }'
```

</TabItem>
</Tabs>


## Send Payment Reminder

Send a payment reminder for an outstanding invoice.

### Endpoint

```
POST /api/v1/invoices/:id/remind
```

### Example

<Tabs groupId="sdk-language">
<TabItem value="sdk" label="TypeScript SDK" default>

```typescript
await zendfi.invoices.sendReminder('inv_abc123def456', {
  message: 'Friendly reminder: your invoice is due in 3 days.'
});

console.log('Reminder sent!');
```

</TabItem>
<TabItem value="rest" label="REST API">

```bash
curl -X POST https://api.zendfi.tech/api/v1/invoices/inv_abc123def456/remind \
  -H "Authorization: Bearer zfi_live_abc123..." \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Friendly reminder: your invoice is due in 3 days."
  }'
```

</TabItem>
</Tabs>


## Record Payment

Manually record a payment received for an invoice.

### Endpoint

```
POST /api/v1/invoices/:id/payments
```

### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `amount` | number | **Yes** | Payment amount |
| `payment_method` | string | No | "crypto", "bank_transfer", "check", "other" |
| `reference` | string | No | Payment reference (tx signature, check number, etc.) |
| `payment_date` | string | No | Date payment was received (defaults to now) |
| `notes` | string | No | Payment notes |

### Example

<Tabs groupId="sdk-language">
<TabItem value="sdk" label="TypeScript SDK" default>

```typescript
const payment = await zendfi.invoices.recordPayment('inv_abc123def456', {
  amount: 6834.42,
  paymentMethod: 'crypto',
  reference: '5K2Nz...abc123',
  notes: 'Paid via USDC on Solana'
});

console.log('Payment recorded:', payment.paymentId);
console.log('Invoice status:', payment.invoiceStatus);
console.log('Amount due:', payment.amountDue);
```

**Response:**

```json
{
  "invoice_id": "inv_abc123def456",
  "payment_id": "pmt_xyz789",
  "amount": 6834.42,
  "payment_method": "crypto",
  "reference": "5K2Nz...abc123",
  "payment_date": "2025-10-28T10:30:00Z",
  "invoice_status": "paid",
  "amount_due": 0
}
```

</TabItem>
<TabItem value="rest" label="REST API">

```bash
curl -X POST https://api.zendfi.tech/api/v1/invoices/inv_abc123def456/payments \
  -H "Authorization: Bearer zfi_live_abc123..." \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 6834.42,
    "payment_method": "crypto",
    "reference": "5K2Nz...abc123",
    "notes": "Paid via USDC on Solana"
  }'
```

**Response:**

```json
{
  "invoice_id": "inv_abc123def456",
  "payment_id": "pmt_xyz789",
  "amount": 6834.42,
  "payment_method": "crypto",
  "reference": "5K2Nz...abc123",
  "payment_date": "2025-10-28T10:30:00Z",
  "invoice_status": "paid",
  "amount_due": 0
}
```

</TabItem>
</Tabs>


## Mark as Void

Void an invoice. Voided invoices cannot be paid or edited.

### Endpoint

```
POST /api/v1/invoices/:id/void
```

### Example

<Tabs groupId="sdk-language">
<TabItem value="sdk" label="TypeScript SDK" default>

```typescript
await zendfi.invoices.void('inv_abc123def456', {
  reason: 'Duplicate invoice created in error'
});

console.log('Invoice voided');
```

</TabItem>
<TabItem value="rest" label="REST API">

```bash
curl -X POST https://api.zendfi.tech/api/v1/invoices/inv_abc123def456/void \
  -H "Authorization: Bearer zfi_live_abc123..." \
  -H "Content-Type: application/json" \
  -d '{
    "reason": "Duplicate invoice created in error"
  }'
```

</TabItem>
</Tabs>


## Invoice Statuses

| Status | Description |
|--------|-------------|
| `draft` | Not yet sent to customer |
| `sent` | Sent and awaiting payment |
| `viewed` | Customer viewed the invoice |
| `partial` | Partially paid |
| `paid` | Fully paid |
| `overdue` | Past due date, unpaid |
| `void` | Cancelled/voided |


## Automatic Reminders

ZendFi can automatically send payment reminders:

| Timing | Type | Description |
|--------|------|-------------|
| 7 days before | Upcoming | Friendly reminder of upcoming due date |
| 1 day before | Due Soon | Payment due tomorrow reminder |
| On due date | Due Today | Due date reminder |
| 3 days after | Overdue | First overdue notice |
| 7 days after | Overdue | Second overdue notice |
| 14 days after | Final | Final payment notice |

Configure automatic reminders in your merchant settings.


## Webhook Events

| Event | Description |
|-------|-------------|
| `invoice.created` | Invoice created |
| `invoice.sent` | Invoice sent to customer |
| `invoice.viewed` | Customer opened invoice |
| `invoice.payment_received` | Payment received (full or partial) |
| `invoice.paid` | Invoice fully paid |
| `invoice.overdue` | Invoice became overdue |
| `invoice.voided` | Invoice voided |

### Example Webhook Payload

```json
{
  "event": "invoice.paid",
  "timestamp": "2025-10-28T10:30:00Z",
  "data": {
    "invoice_id": "inv_abc123def456",
    "invoice_number": "INV-2025-001",
    "customer_name": "Acme Corporation",
    "customer_email": "billing@acme.com",
    "total": 6834.42,
    "amount_paid": 6834.42,
    "payment_method": "crypto",
    "transaction_signature": "5K2Nz...abc123"
  }
}
```


## Invoice PDF

Generate and download a PDF version of the invoice.

### Endpoint

```
GET /api/v1/invoices/:id/pdf
```

The PDF includes:
- Your merchant branding (logo, company info)
- Customer details and billing address
- Itemized line items with quantities and prices
- Subtotal, taxes, discounts, and total
- Payment instructions and QR code
- Terms and notes

## Best Practices

### Creating Invoices

1. **Clear Descriptions** - Use specific item descriptions
2. **Reasonable Due Dates** - 15-30 days is standard
3. **Include Terms** - Set expectations for late payments
4. **Itemize Everything** - Separate line items for transparency

### Managing Payments

1. **Track Partials** - Record partial payments as they come in
2. **Follow Up** - Use reminders before invoices become overdue
3. **Reconcile Regularly** - Match payments to invoices promptly
4. **Keep Records** - Store payment references for accounting


## Next Steps

**Integration Guides:**
- [Next.js Integration](/developer-tools/nextjs-integration) - Complete setup for Next.js projects
- [Express Integration](/developer-tools/express-integration) - REST API server guide

**Related APIs:**
- [Payments API](/api/payments) - Direct payment creation
- [Payment Links](/api/payment-links) - Simple payment links
- [Subscriptions API](/api/subscriptions) - Recurring billing
- [Webhooks](/features/webhooks) - Invoice event notifications

**Need Help?**
- [Discord Community](https://discord.gg/zendfi)
- [Email Support](mailto:support@zendfi.tech)
