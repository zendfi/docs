---
sidebar_position: 3
title: Escrow Payments
description: Secure milestone-based payments with built-in dispute resolution
---

# Escrow Payments

Protect both buyers and sellers with milestone-based payments that hold funds securely until work is verified complete.

## How Escrow Works

```
Customer Pays → Funds Held in Escrow → Work Verified → Funds Released
                      ↓
              Dispute? → Resolution → Refund or Release
```

1. **Customer pays** - Funds are locked in a secure escrow account
2. **Work delivered** - Seller completes deliverables for each milestone
3. **Verification** - Customer verifies work quality
4. **Release** - Funds released to seller on approval

:::tip Perfect For
Freelance marketplaces, project-based services, high-value goods, and any transaction requiring trust between parties.
:::

## Features

- ✅ **Milestone-Based** - Break payments into deliverable chunks
- ✅ **Built-in Disputes** - Fair resolution process for disagreements
- ✅ **Automatic Expiration** - Auto-refund if uncompleted
- ✅ **Partial Releases** - Release funds as milestones complete
- ✅ **Full Audit Trail** - Complete history of all escrow actions

---

## Create Escrow Payment

Create a new escrow payment with milestones.

### Endpoint

```
POST /api/v1/escrows
```

### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `title` | string | **Yes** | Escrow title (e.g., "Website Development") |
| `description` | string | No | Description of the work |
| `total_amount` | number | **Yes** | Total payment amount in USD |
| `currency` | string | **Yes** | Currency code ("USD" only) |
| `seller_wallet` | string | **Yes** | Seller's Solana wallet address |
| `buyer_email` | string | No | Buyer's email for notifications |
| `expires_at` | string | No | Expiration date (ISO 8601) |
| `milestones` | array | **Yes** | Array of milestone objects |
| `metadata` | object | No | Custom key-value pairs |

### Milestone Object

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | **Yes** | Milestone title |
| `description` | string | No | What deliverables are expected |
| `amount` | number | **Yes** | Amount for this milestone |
| `due_date` | string | No | Expected completion date (ISO 8601) |

:::warning Milestone Amounts
The sum of all milestone amounts must equal `total_amount`!
:::

### Example: Freelance Project

```bash
curl -X POST https://api.zendfi.tech/api/v1/escrows \
  -H "Authorization: Bearer zfi_live_abc123..." \
  -H "Content-Type: application/json" \
  -d '{
    "title": "E-commerce Website Development",
    "description": "Build a complete Shopify-like store",
    "total_amount": 5000,
    "currency": "USD",
    "seller_wallet": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
    "buyer_email": "client@example.com",
    "expires_at": "2025-12-31T23:59:59Z",
    "milestones": [
      {
        "title": "Design & Wireframes",
        "description": "Complete UI/UX design with Figma mockups",
        "amount": 1000,
        "due_date": "2025-11-15T23:59:59Z"
      },
      {
        "title": "Frontend Development",
        "description": "React frontend with all pages implemented",
        "amount": 2000,
        "due_date": "2025-12-01T23:59:59Z"
      },
      {
        "title": "Backend & Integration",
        "description": "API integration, payment processing, deployment",
        "amount": 2000,
        "due_date": "2025-12-20T23:59:59Z"
      }
    ],
    "metadata": {
      "project_type": "web_development",
      "platform": "freelance_marketplace"
    }
  }'
```

**Response:**

```json
{
  "id": "escrow_abc123def456",
  "merchant_id": "merchant_xyz789",
  "title": "E-commerce Website Development",
  "description": "Build a complete Shopify-like store",
  "total_amount": 5000,
  "currency": "USD",
  "seller_wallet": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
  "buyer_email": "client@example.com",
  "status": "pending_funding",
  "funded_amount": 0,
  "released_amount": 0,
  "expires_at": "2025-12-31T23:59:59Z",
  "created_at": "2025-10-26T14:00:00Z",
  "milestones": [
    {
      "id": "milestone_001",
      "title": "Design & Wireframes",
      "description": "Complete UI/UX design with Figma mockups",
      "amount": 1000,
      "status": "pending",
      "due_date": "2025-11-15T23:59:59Z"
    },
    {
      "id": "milestone_002",
      "title": "Frontend Development",
      "description": "React frontend with all pages implemented",
      "amount": 2000,
      "status": "pending",
      "due_date": "2025-12-01T23:59:59Z"
    },
    {
      "id": "milestone_003",
      "title": "Backend & Integration",
      "description": "API integration, payment processing, deployment",
      "amount": 2000,
      "status": "pending",
      "due_date": "2025-12-20T23:59:59Z"
    }
  ],
  "payment_url": "https://zendfi.tech/escrow/escrow_abc123def456/fund"
}
```

---

## Get Escrow Details

Retrieve full details of an escrow including milestones.

### Endpoint

```
GET /api/v1/escrows/:id
```

### Example

```bash
curl -X GET https://api.zendfi.tech/api/v1/escrows/escrow_abc123def456 \
  -H "Authorization: Bearer zfi_live_abc123..."
```

---

## Fund Escrow

Buyer funds the escrow to lock funds. This creates a payment that the buyer must complete.

### Endpoint

```
POST /api/v1/escrows/:id/fund
```

### Example

```bash
curl -X POST https://api.zendfi.tech/api/v1/escrows/escrow_abc123def456/fund \
  -H "Authorization: Bearer zfi_live_abc123..." \
  -H "Content-Type: application/json" \
  -d '{
    "buyer_wallet": "BuyerWalletAddress123..."
  }'
```

**Response:**

```json
{
  "escrow_id": "escrow_abc123def456",
  "payment_id": "pay_funding_xyz789",
  "payment_url": "https://zendfi.tech/pay/pay_funding_xyz789",
  "amount": 5000,
  "currency": "USD",
  "status": "pending_payment"
}
```

Once the buyer completes payment, escrow status changes to `funded`.

---

## Release Milestone

Release funds for a completed milestone to the seller.

### Endpoint

```
POST /api/v1/escrows/:id/milestones/:milestone_id/release
```

### Example

```bash
curl -X POST https://api.zendfi.tech/api/v1/escrows/escrow_abc123def456/milestones/milestone_001/release \
  -H "Authorization: Bearer zfi_live_abc123..." \
  -H "Content-Type: application/json" \
  -d '{
    "release_note": "Design approved, excellent work!"
  }'
```

**Response:**

```json
{
  "escrow_id": "escrow_abc123def456",
  "milestone_id": "milestone_001",
  "milestone_title": "Design & Wireframes",
  "released_amount": 1000,
  "seller_wallet": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
  "status": "released",
  "transaction_signature": "5K2Nz...abc123",
  "released_at": "2025-11-15T18:30:00Z"
}
```

---

## Open Dispute

Either party can open a dispute if there's a disagreement.

### Endpoint

```
POST /api/v1/escrows/:id/dispute
```

### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `reason` | string | **Yes** | Dispute reason |
| `description` | string | **Yes** | Detailed description of the issue |
| `disputer_wallet` | string | **Yes** | Wallet of the party opening dispute |
| `requested_resolution` | string | No | "full_refund", "partial_refund", "release_to_seller" |
| `evidence_urls` | array | No | URLs to evidence (screenshots, files, etc.) |

### Example

```bash
curl -X POST https://api.zendfi.tech/api/v1/escrows/escrow_abc123def456/dispute \
  -H "Authorization: Bearer zfi_live_abc123..." \
  -H "Content-Type: application/json" \
  -d '{
    "reason": "Work not delivered as specified",
    "description": "The frontend is missing 3 of the 5 pages specified in the requirements. The dashboard and settings pages were not implemented.",
    "disputer_wallet": "BuyerWalletAddress123...",
    "requested_resolution": "partial_refund",
    "evidence_urls": [
      "https://example.com/screenshot1.png",
      "https://example.com/original-requirements.pdf"
    ]
  }'
```

**Response:**

```json
{
  "escrow_id": "escrow_abc123def456",
  "dispute_id": "dispute_abc123",
  "status": "under_dispute",
  "reason": "Work not delivered as specified",
  "disputer_wallet": "BuyerWalletAddress123...",
  "requested_resolution": "partial_refund",
  "created_at": "2025-11-20T10:00:00Z",
  "resolution_deadline": "2025-11-27T10:00:00Z"
}
```

---

## Resolve Dispute

Merchant or admin resolves the dispute.

### Endpoint

```
POST /api/v1/escrows/:id/resolve
```

### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `resolution` | string | **Yes** | "refund_buyer", "release_seller", "split" |
| `buyer_amount` | number | Conditional | Amount to refund buyer (required if "split") |
| `seller_amount` | number | Conditional | Amount to release to seller (required if "split") |
| `resolution_note` | string | No | Explanation of the resolution decision |

### Example: Split Resolution

```bash
curl -X POST https://api.zendfi.tech/api/v1/escrows/escrow_abc123def456/resolve \
  -H "Authorization: Bearer zfi_live_abc123..." \
  -H "Content-Type: application/json" \
  -d '{
    "resolution": "split",
    "buyer_amount": 2000,
    "seller_amount": 3000,
    "resolution_note": "Seller completed 60% of work satisfactorily. Remaining 40% will be refunded to buyer."
  }'
```

---

## Cancel Escrow

Cancel an unfunded escrow.

### Endpoint

```
POST /api/v1/escrows/:id/cancel
```

:::warning Funded Escrows
You cannot cancel a funded escrow. Use the dispute process or release all milestones back to the buyer.
:::

### Example

```bash
curl -X POST https://api.zendfi.tech/api/v1/escrows/escrow_abc123def456/cancel \
  -H "Authorization: Bearer zfi_live_abc123..." \
  -H "Content-Type: application/json" \
  -d '{
    "reason": "Project cancelled by mutual agreement"
  }'
```

---

## Escrow Statuses

| Status | Description |
|--------|-------------|
| `pending_funding` | Created, waiting for buyer to fund |
| `funded` | Buyer funded, work can begin |
| `partially_released` | Some milestones released |
| `under_dispute` | Active dispute being resolved |
| `completed` | All milestones released |
| `cancelled` | Cancelled before funding |
| `refunded` | Full refund to buyer |
| `expired` | Expired without completion |

---

## Milestone Statuses

| Status | Description |
|--------|-------------|
| `pending` | Work not started |
| `in_progress` | Seller working on milestone |
| `submitted` | Seller marked as complete |
| `approved` | Buyer approved, funds released |
| `disputed` | Under dispute |
| `refunded` | Refunded to buyer |

---

## Webhook Events

| Event | Description |
|-------|-------------|
| `escrow.created` | New escrow created |
| `escrow.funded` | Escrow fully funded |
| `escrow.milestone_released` | Milestone payment released |
| `escrow.disputed` | Dispute opened |
| `escrow.resolved` | Dispute resolved |
| `escrow.completed` | All funds distributed |
| `escrow.expired` | Escrow expired |

### Example Webhook Payload

```json
{
  "event": "escrow.milestone_released",
  "timestamp": "2025-11-15T18:30:00Z",
  "data": {
    "escrow_id": "escrow_abc123def456",
    "milestone_id": "milestone_001",
    "milestone_title": "Design & Wireframes",
    "released_amount": 1000,
    "seller_wallet": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
    "remaining_balance": 4000,
    "transaction_signature": "5K2Nz...abc123"
  }
}
```

---

## Best Practices

:::tip For Marketplaces
1. **Clear Milestones** - Define specific, measurable deliverables
2. **Reasonable Deadlines** - Give enough time for quality work
3. **Evidence Requirements** - Encourage parties to document everything
4. **Communication** - Maintain records of all discussions
5. **Fair Splits** - When disputes arise, consider partial work completed
:::

## Next Steps

- [Webhooks](/features/webhooks) - Set up notifications for escrow events
- [Payment Splits](/features/payment-splits) - Add platform fees to escrow releases
