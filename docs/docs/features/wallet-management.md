---
sidebar_position: 3
title: Wallet Management
description: Secure merchant and customer wallet solutions
---

# Wallet Management

ZendFi provides flexible wallet solutions for both merchants and customers. Choose the setup that best fits your security requirements and user experience goals.

## Wallet Types Overview

| Type | Best For | Control | Security |
|------|----------|---------|----------|
| **MPC Passkey Wallet** | Maximum security, enterprise | Distributed | Highest |
| **Own Wallet** | Full control, existing wallets | Self-custody | User-managed |
| **Custodial (Coming)** | Simplest UX, onboarding | ZendFi-managed | High |

---

## MPC Passkey Wallets

Multi-Party Computation (MPC) wallets split your private key into multiple secure shares. No single party ever has access to the complete key.

### How It Works

```
Your Key = Share 1 (Your Device) + Share 2 (ZendFi) + Share 3 (Recovery)
              ↓                        ↓                    ↓
         Stored locally          Encrypted vault      Secure backup
```

**To sign a transaction:**
1. Your device provides Share 1
2. ZendFi provides Share 2
3. Shares combine to sign without reconstructing full key
4. No single party can sign alone

### Benefits

- **No Seed Phrase** - Nothing to write down or lose
- **Phishing Resistant** - WebAuthn prevents credential theft
- **Device-Bound** - Keys tied to your biometrics/device
- **Recovery Possible** - Lost device? Recover with Share 3
- **Institutional Grade** - Same tech used by major exchanges

### Setting Up MPC Wallet

MPC wallet creation is handled through the API during merchant onboarding. Once set up, you can use the SDK for payments.

#### 1. Merchant Registration (API)

When you register as a merchant, an MPC wallet is automatically created:

```bash
curl -X POST https://api.zendfi.tech/api/v1/merchants \
  -H "Content-Type: application/json" \
  -d '{
    "business_name": "My Business",
    "email": "merchant@example.com"
  }'
```

This returns a passkey setup URL for WebAuthn registration.

#### 2. Using the SDK After Setup

```typescript
import { zendfi } from '@zendfi/sdk';

// Create payments - wallet signing handled by the API
const payment = await zendfi.createPayment({
  amount: 100,
  description: 'Product purchase'
});

console.log('Payment URL:', payment.payment_url);
```

#### 3. Transaction Signing

For operations requiring MPC signatures (refunds, withdrawals), the API handles signing through the dashboard or secure API endpoints with your registered passkey.

### Recovery Options

If you lose access to your device:

| Recovery Method | How It Works |
|-----------------|--------------|
| **Recovery Passkey** | Register a backup device during setup |
| **Social Recovery** | Trusted contacts approve recovery |
| **Time-Locked Recovery** | Request recovery, wait 48h, claim |

Recovery is managed through the merchant dashboard at `dashboard.zendfi.tech`.

---

## Own Wallet

Connect your existing Solana wallet to ZendFi. You maintain full custody and control.

### Supported Wallets

- **Phantom** - Most popular Solana wallet
- **Solflare** - Full-featured web & mobile wallet
- **Backpack** - xNFT-enabled wallet
- **Ledger** - Hardware wallet support
- **Any Solana Wallet** - Via WalletConnect

### Connecting Your Wallet

#### Dashboard Setup

1. Go to **Settings → Wallets** in your merchant dashboard
2. Click **Connect Wallet**
3. Select your wallet provider
4. Approve the connection in your wallet
5. Sign a message to verify ownership

#### API Setup

```bash
curl -X POST https://api.zendfi.tech/api/v1/merchants/wallet \
  -H "Authorization: Bearer zfi_live_abc123..." \
  -H "Content-Type: application/json" \
  -d '{
    "wallet_address": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
    "signature": "...",
    "message": "Connect wallet to ZendFi: 1698325200"
  }'
```

### Receiving Payments

With your own wallet connected, payments flow directly:

```
Customer Payment → Solana → Your Wallet
                     ↓
            ZendFi tracks & notifies
```

You receive funds immediately in your wallet. ZendFi monitors transactions and sends webhooks.

### Transaction Signing

For operations that require signing (refunds, splits), you'll need to sign with your wallet:

```typescript
import { useWallet } from '@solana/wallet-adapter-react';
import { zendfi } from '@zendfi/sdk';

const { signTransaction, publicKey } = useWallet();

// Create a payment that requires your signature
const payment = await zendfi.createPayment({
  amount: 100,
  description: 'Order refund',
  metadata: { refund_for: 'pay_xyz789' }
});

// For refunds via API - the API builds the transaction
// You sign and submit through the dashboard or API
```

---

## Customer Wallets

### Embedded Wallets for Customers

Create wallets for your customers without them needing to manage keys. This is handled through the API:

```bash
curl -X POST https://api.zendfi.tech/api/v1/customer-wallets \
  -H "Authorization: Bearer $ZENDFI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "customer_id": "cust_123",
    "email": "customer@example.com"
  }'
```

Customers sign with email magic link - no seed phrases or wallet extensions required.

### Connect Customer Wallets

Or let customers connect their existing wallets:

```typescript
import { ZendFiCheckout } from '@zendfi/react';

function PaymentPage() {
  return (
    <ZendFiCheckout
      paymentId="pay_xyz789"
      onSuccess={(result) => console.log('Paid!', result)}
      walletOptions={{
        allowConnect: true,    // Allow wallet adapter
        allowEmbedded: true,   // Allow email-based wallet
        allowQR: true          // Allow mobile wallet QR
      }}
    />
  );
}
```

---

## Wallet Security Best Practices

### For MPC Wallets

1. **Enable Multiple Recovery Methods** - Don't rely on a single device
2. **Use Platform Authenticators** - Biometrics are more secure than security keys for most users
3. **Review Sessions Regularly** - Check active sessions in dashboard
4. **Set Transaction Limits** - Configure daily/per-transaction limits

### For Own Wallets

1. **Use Hardware Wallets** - Ledger/Trezor for high-value merchants
2. **Enable Multi-Sig** - Require multiple signatures for large transfers
3. **Separate Hot/Cold** - Keep reserves in cold storage
4. **Regular Audits** - Review wallet activity regularly

### General Security

| Practice | Why |
|----------|-----|
| **2FA on Dashboard** | Protect account access |
| **IP Allowlisting** | Restrict API access by IP |
| **Webhook Signatures** | Verify all incoming webhooks |
| **API Key Rotation** | Rotate keys quarterly |
| **Audit Logs** | Review all account activity |

---

## Wallet Balances & Activity

### Get Wallet Balance

```bash
curl -X GET https://api.zendfi.tech/api/v1/wallets/balance \
  -H "Authorization: Bearer zfi_live_abc123..."
```

**Response:**

```json
{
  "wallet_address": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
  "balances": [
    {
      "token": "USDC",
      "mint": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
      "amount": 15234.56,
      "usd_value": 15234.56
    },
    {
      "token": "SOL",
      "mint": "native",
      "amount": 2.5,
      "usd_value": 87.50
    }
  ],
  "total_usd": 15322.06
}
```

### Get Wallet Activity

```bash
curl -X GET https://api.zendfi.tech/api/v1/wallets/activity?limit=20 \
  -H "Authorization: Bearer zfi_live_abc123..."
```

**Response:**

```json
{
  "activity": [
    {
      "type": "payment_received",
      "payment_id": "pay_xyz789",
      "amount": 99.99,
      "token": "USDC",
      "from": "CustomerWallet...",
      "signature": "5K2Nz...",
      "timestamp": "2025-10-26T15:30:00Z"
    },
    {
      "type": "split_sent",
      "payment_id": "pay_xyz789",
      "amount": 10,
      "token": "USDC",
      "to": "PartnerWallet...",
      "signature": "5K2Nz...",
      "timestamp": "2025-10-26T15:30:00Z"
    }
  ]
}
```

---

## Token Support

ZendFi supports the following tokens on Solana:

| Token | Mint Address | Decimals |
|-------|--------------|----------|
| **USDC** | `EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v` | 6 |
| **USDT** | `Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB` | 6 |
| **SOL** | Native | 9 |

More tokens coming soon! Request tokens in our Discord.

---

## Next Steps

- [Getting Started](/intro) - Initial merchant setup
- [Payments API](/api/payments) - Create your first payment
- [SDKs](/developer-tools/sdks) - Integrate wallet features in your app
