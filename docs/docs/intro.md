---
sidebar_position: 2
slug: /intro
title: Introduction
---

# Welcome to ZendFi

Accept SOL, USDC, and USDT payments in 7 lines of code. Built for e-commerce.

```typescript
import { zendfi } from '@zendfi/sdk';

const payment = await zendfi.createPayment({
  amount: 50,
  description: 'Premium subscription',
});

console.log(payment.payment_url); // Send customer here
```

That's it. Same simple API for all your payment needs.


## Why ZendFi?

### Start Simple

Integrate crypto payments in 5 minutes. If you've used Stripe, you already know how ZendFi works.

- **0.6% fees** (vs Stripe's 2.9%) — Save 81% on transaction costs
- **Instant settlements** — Get paid immediately, no 7-day holds
- **No chargebacks** — Crypto payments are final
- **QR codes included** — Mobile wallet support via Solana Pay
- **Test mode free** — Unlimited devnet testing

### Scale Up

Add advanced features as you grow. No architecture changes needed.

- **Subscriptions** — Recurring billing with trials and webhooks
- **Payment Links** — Reusable checkout pages for social/email
- **Embedded Checkout** — Accept payments directly in your app, no redirects
- **Installments** — Buy now, pay later flows
- **Invoices** — Professional invoicing with email delivery
- **Payment Splits** — Revenue sharing for marketplaces


## What Can You Build?

| Use Case | Features You'll Use |
|----------|-------------------|
| **E-commerce Store** | Payments, Payment Links, Webhooks |
| **SaaS Platform** | Payments, Subscriptions, Webhooks |
| **Marketplace** | Payments, Payment Splits, Invoices |
| **Creator Tools** | Payment Links, Subscriptions |


## Quick Links

| Resource | Description |
|----------|-------------|
| [Get Started](/) | Create your first payment in 5 minutes |
| [Payments API](/api/payments) | Complete API reference |
| [Embedded Checkout](/features/embedded-checkout) | Accept payments in your app |
| [Subscriptions](/api/subscriptions) | Recurring billing |
| [Webhooks](/features/webhooks) | Real-time notifications |


## Core Concepts

### Payments
One-time payment requests. Customer scans QR code or clicks payment link. Funds arrive instantly in your wallet.

### Payment Links
Reusable checkout pages. Share one link with multiple customers. Perfect for social media and email.

### Embedded Checkout
Accept payments directly in your website or app—no redirects required. Seamless user experience with full customization.

### Subscriptions
Recurring billing with flexible intervals. Free trials, automatic payments, webhook notifications.

### Webhooks
Real-time event notifications. Know instantly when payments are confirmed, subscriptions renew, or issues occur.

### AI Agent Support
Let AI agents make payments autonomously with spending limits and cryptographic security. Optional advanced feature.


## Getting Help

- **Email:** [support@zendfi.tech](mailto:support@zendfi.tech)
- **Discord:** [discord.gg/zendfi](https://discord.gg/zendfi)
- **Twitter:** [@zendfi](https://twitter.com/zendfi)

Ready to accept your first crypto payment? **[Get started →](/)**
