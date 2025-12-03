# Getting Started with ZendFi - Accept Crypto in Minutes!

Welcome to ZendFi! You're about to join the future of payments. This guide will get you accepting crypto payments in minutes - no blockchain experience needed. Let's make this super easy and fun!

---

## What You'll Need

Before we start, make sure you have:

- A valid business email address
- Your business/organization name
- A webhook endpoint URL (optional but recommended for real-time notifications)
- Either:
  - A Solana wallet address (if you already have one), OR
  - A modern browser with Face ID/Touch ID for passkey setup (takes 5 seconds!)

That's it! No complicated crypto setup required. Let's go!

---

---

## Step 1: Create Your Merchant Account

This is where the magic begins! Creating your merchant account takes just one API call. Choose the wallet type that works best for you - we'll walk you through all the options!

### Endpoint

```
POST /api/v1/merchants
```

### Request

No authentication required for this endpoint - everyone's welcome!

#### Headers

```
Content-Type: application/json
```

#### Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | string | **Yes** | Your business or organization name (2-100 characters) |
| `email` | string | **Yes** | Your business email address |
| `business_address` | string | **Yes** | Your business address (max 500 characters) |
| `webhook_url` | string | No | HTTPS URL to receive payment notifications |
| `wallet_address` | string | No | Your existing Solana wallet address |
| `wallet_generation_method` | string | No | `"mpc_passkey"` (default), `"mnemonic"`, `"simple"`, or omit if providing wallet_address |
| `settlement_preference` | string | No | `"auto_usdc"` (default) or `"direct_token"` |

### Wallet Generation Methods Explained

Choose the wallet type that fits your needs! Each has its own superpowers.

#### Option 1: MPC Passkey Wallet (Recommended - Non-Custodial)

**Best for:** Merchants who want maximum security without managing seed phrases

**Why we love it:**
- **Non-custodial**: You own the keys, always
- **Secured by Face ID/Touch ID**: No passwords to remember!
- **No seed phrases**: No more writing down 12 words on paper
- **MPC security**: Multi-party computation keeps you ultra-safe
- **Can export anytime**: Full control when you need it
- **5-second setup**: Just one quick biometric scan

```json
{
  "name": "My Online Store",
  "email": "payments@mystore.com",
  "business_address": "123 Main Street, San Francisco, CA 94102",
  "webhook_url": "https://mystore.com/webhooks/zendfi",
  "wallet_generation_method": "mpc_passkey"
}
```

**What you get:**
- Non-custodial wallet (you own the keys)
- Secured by Face ID/Touch ID/Windows Hello
- No seed phrases to manage
- Multi-party computation (MPC) security
- Can export private key anytime
- Requires completing passkey setup (5 seconds)

**Next step:** You'll receive a `passkey_setup_url` - just open it in your browser, scan your face/finger, and you're done! Easy!

---

#### Option 2: BIP39 Mnemonic Wallet (Traditional & Reliable - Custodial)

**Best for:** Merchants who prefer traditional crypto wallets with recovery phrases

**Why it's great:**
- **BIP39-compatible**: Works with all standard crypto tools
- **Recoverable**: Use your mnemonic phrase if needed
- **Instant activation**: Ready to use immediately
- **Enterprise custody**: ZendFi secures your master mnemonic
- **Support available**: Contact us anytime for mnemonic backup

```json
{
  "name": "My Online Store", 
  "email": "payments@mystore.com",
  "business_address": "123 Main Street, San Francisco, CA 94102",
  "webhook_url": "https://mystore.com/webhooks/zendfi",
  "wallet_generation_method": "mnemonic"
}
```

**What you get:**
- BIP39-compatible wallet (standard HD derivation)
- Can recover with master mnemonic phrase
- Immediate activation (no setup required)
- ZendFi holds the master mnemonic (custodial)
- Contact support for mnemonic backup

---

#### Option 3: Simple Deterministic Wallet (Fastest Setup Ever! - Custodial)

**Best for:** Merchants who want the fastest setup and trust ZendFi with custody

**Why it rocks:**
- **Lightning fast**: One API call and you're done!
- **Instant activation**: Start accepting payments immediately
- **Enterprise security**: Bank-grade key management
- **Fully managed**: ZendFi handles all the crypto complexity
- **Zero hassle**: Just focus on your business!

```json
{
  "name": "My Online Store",
  "email": "payments@mystore.com",
  "business_address": "123 Main Street, San Francisco, CA 94102",
  "webhook_url": "https://mystore.com/webhooks/zendfi",
  "wallet_generation_method": "simple"
}
```

**What you get:**
- Fastest setup (1 API call, done!)
- Immediate activation
- Secure enterprise key management
- ZendFi holds the keys (custodial)
- Cannot export private key

---

#### Option 4: Bring Your Own Wallet (Already Have a Wallet? Perfect!)

**Best for:** Merchants who already have a Solana wallet they want to use

**Why it's awesome:**
- **Full control**: Your wallet, your rules
- **Works with everything**: Phantom, Solflare, Ledger, you name it!
- **Non-custodial**: Always in your control
- **You manage keys**: Use your existing wallet setup
- **Keep it safe**: Remember, lost keys = lost funds (but you already know that!)

```json
{
  "name": "My Online Store",
  "email": "payments@mystore.com",
  "business_address": "123 Main Street, San Francisco, CA 94102",
  "webhook_url": "https://mystore.com/webhooks/zendfi",
  "wallet_address": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU"
}
```

**What you get:**
- Full control of your wallet
- Use with Phantom, Solflare, Ledger, etc.
- Non-custodial
- You must manage your own keys
- Lost keys = lost funds, please we always advice to be very careful

---

### Webhook URL Configuration (Highly Recommended!)

Your webhook URL receives real-time notifications for payment events - it's like having a direct hotline to ZendFi! Set this up and you'll always know what's happening with your payments.

**Your webhook endpoint must:**

Use HTTPS (security first!)  
Respond within 30 seconds  
Return `200 OK` status code  
Be publicly accessible (we need to reach you!)  

**What you'll get notified about:**
- `payment.confirmed` - Cha-ching! Money received
- `payment.failed` - Oops, something went wrong
- `settlement.completed` - Funds are in your wallet
- `settlement.failed` - Rare, but we'll let you know

Want to become a webhook pro? Check out our [Webhooks Deep Dive](./04-webhooks.md)!

---

### Response - MPC Passkey Wallet

**Status:** `200 OK`

```json
{
  "merchant": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "My Online Store",
    "wallet_address": "",
    "wallet_type": "mpc",
    "settlement_preference": "auto_usdc",
    "wallet_generation_method": "mpc_passkey"
  },
  "api_key": "zendfi_live_abc123def456...",
  "message": "Merchant created with non-custodial MPC wallet! Complete passkey setup to activate auto-settlements.",
  "security_note": "Non-custodial MPC wallet secured by your device biometrics (Face ID/Touch ID). We never hold your keys!",
  "next_steps": {
    "passkey_setup_url": "https://api.zendfi.tech/merchants/550e8400-e29b-41d4-a716-446655440000/setup-passkey",
    "setup_required": true,
    "estimated_time": "5 seconds with Face ID/Touch ID",
    "api_endpoints": {
      "register_start": "/api/v1/webauthn/register/start",
      "register_finish": "/api/v1/webauthn/register/finish"
    }
  },
  "warning": "Store this API key securely. It will not be shown again."
}
```

---

### Response - Mnemonic/Simple/Provided Wallet

**Status:** `200 OK`

```json
{
  "merchant": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "My Online Store",
    "wallet_address": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
    "wallet_type": "custodial",
    "settlement_preference": "auto_usdc",
    "wallet_generation_method": "mnemonic"
  },
  "api_key": "zendfi_live_abc123def456...",
  "message": "Merchant created with BIP39 mnemonic-derived wallet! Store your master mnemonic securely.",
  "security_note": "Your wallet can be recovered using the master mnemonic phrase. Keep it secure!",
  "next_steps": {
    "setup_required": false
  },
  "warning": "Store this API key securely. It will not be shown again."
}
```

---

### Error Responses

#### 400 Bad Request - Invalid Input

```json
{
  "error": "validation_error",
  "message": "Business address is required"
}
```

#### 400 Bad Request - Invalid Wallet Address

```json
{
  "error": "validation_error",
  "message": "Invalid Solana wallet address format"
}
```

#### 400 Bad Request - Invalid Webhook URL

```json
{
  "error": "invalid_webhook_url",
  "message": "Webhook URL must use HTTPS"
}
```

#### 500 Internal Server Error

```json
{
  "error": "internal_server_error",
  "message": "Failed to create merchant account"
}
```

---

## Step 2: Complete Passkey Setup (MPC Wallet Only)

If you chose `wallet_generation_method: "mpc_passkey"`, you'll need to complete this super quick step before you can receive payments. Don't worry, it takes literally 5 seconds! ⚡

### Option A: Browser Setup (Easiest Way!)

1. Open the `passkey_setup_url` from your merchant creation response
2. Click "Setup Passkey"
3. Authenticate with Face ID/Touch ID/Windows Hello
4. Done! Your wallet is now active and ready to rock!

### Option B: API Setup (For the Tech-Savvy!)

Prefer to do it programmatically? We've got you covered! Check out our [Passkey Setup Guide](./05-wallet-management.md#passkey-setup) for the API approach.

---

## Step 3: Store Your API Key Securely (This Is Important! 🔐)

**SUPER IMPORTANT:** Your API key is shown only once during merchant creation. Store it securely immediately - we can't show it again!

Think of your API key like your house keys - keep them safe!

### Environment Variables (Recommended Best Practice!)

Store your API key in environment variables - never hardcode it! 🚫

```bash
# .env file
ZENDFI_API_KEY=zendfi_live_abc123def456...
```

### Configuration Management (Enterprise Level!)

For production apps, use a secrets manager. Your security team will love you! ❤️

- AWS Secrets Manager
- HashiCorp Vault
- Azure Key Vault
- Google Secret Manager

### Never Commit API Keys (Golden Rule!)

Add to `.gitignore`:
```
.env
.env.local
config/secrets.*
```

Your future self will thank you!

---

## Step 4: Test Your Integration (Let's See It Work! 🎉)

Time to create your first payment! This is the fun part.

### Create a Test Payment

```bash
curl -X POST https://api.zendfi.tech/api/v1/payments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{
    "amount": 1.00,
    "currency": "USD",
    "description": "Test Payment",
    "token": "USDC"
  }'
```

### Response

```json
{
  "id": "payment_abc123",
  "amount": 1.00,
  "currency": "USD",
  "status": "Pending",
  "qr_code": "solana:6qWDyySDsrWbUqXCzwaxVYc47xTaZVUEdeC9apdo6Ewa?amount=...",
  "payment_url": "https://api.zendfi.tech/pay/payment_abc123",
  "expires_at": "2025-10-26T12:30:00Z"
}
```

### Test the Payment Flow

1. Open the `payment_url` in your browser
2. Connect a Solana wallet (Phantom, Solflare, etc.)
3. Approve the transaction
4. Check payment status (see below)

---

## Step 5: Monitor Payment Status (Keep Track of Your Money!)

Want to check how your payment is doing? Easy!

### Endpoint

```
GET /api/v1/payments/:id/status
```

### Request

```bash
curl -X GET https://api.zendfi.tech/api/v1/payments/payment_abc123/status \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Response

```json
{
  "id": "payment_abc123",
  "status": "Confirmed",
  "amount": 1.00,
  "transaction_signature": "5j7s6JP28XvC1...",
  "confirmed_at": "2025-10-26T12:15:30Z",
  "settlement_status": "pending"
}
```

**Payment Statuses Explained:**
- `Pending` - Waiting for customer payment (they have 15 minutes!)
- `Confirmed` - Payment received and verified on blockchain (woohoo!)
- `Failed` - Transaction failed (no worries, just create a new one)
- `Expired` - Payment window expired (15 minutes passed)

---

## Step 6: Receive Webhook Notifications (Real-Time Magic! ⚡)

When a payment is confirmed, ZendFi instantly sends a webhook to your configured URL. It's like getting a text message every time you make money!

### Webhook Payload

```json
{
  "event": "payment.confirmed",
  "payment": {
    "id": "payment_abc123",
    "amount": 1.00,
    "currency": "USD",
    "status": "Confirmed",
    "transaction_signature": "5j7s6JP28XvC1...",
    "customer_wallet": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
    "confirmed_at": "2025-10-26T12:15:30Z"
  },
  "timestamp": "2025-10-26T12:15:31Z"
}
```

### Verify Webhook Signatures (Security First!)

Always verify webhook signatures to ensure they're really from ZendFi! See [Webhook Security](./04-webhooks.md#security) for the complete guide.

---

## Settlement Preferences Explained (Where Does the Money Go? 💵)

Choose how you want to receive your funds!

### auto_usdc (Default - Recommended for Most Merchants! 🌟)

**How it works:**
1. Customer pays with SOL or USDC
2. If paid in SOL, we automatically swap to USDC (stable value!)
3. USDC is settled to your wallet (minus 1.5% fee)

**Why it's great:** Stable value, predictable, no crypto volatility worries!

**Fees:**
- USDC payment: 1.5% (clean and simple!)
- SOL payment: 1.5% + Solana gas fees + tiny swap fee (~0.1%)

### direct_token (For Crypto Enthusiasts!)

**How it works:**
1. Customer pays with specified token (SOL or USDC)
2. Same token is settled to your wallet (minus 1.5% fee)

**Why it's cool:** Hold crypto directly, ride the wave, be a HODLer!

**Fees:**
- Any token: 1.5% flat (that's it!)

---

## Quick Start Code Examples (Copy, Paste, Win!)

Let's get you up and running with some production-ready code!

### Node.js/Express

```javascript
const express = require('express');
const axios = require('axios');

const app = express();
const ZENDFI_API_KEY = process.env.ZENDFI_API_KEY;

// Create payment
app.post('/api/checkout', async (req, res) => {
  try {
    const response = await axios.post(
      'https://api.zendfi.tech/api/v1/payments',
      {
        amount: req.body.amount,
        currency: 'USD',
        description: req.body.description,
        token: 'USDC'
      },
      {
        headers: {
          'Authorization': `Bearer ${ZENDFI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Webhook handler
app.post('/webhooks/zendfi', express.json(), (req, res) => {
  const { event, payment } = req.body;
  
  if (event === 'payment.confirmed') {
    console.log('Payment confirmed:', payment.id);
    // Fulfill order, grant access, etc.
  }
  
  res.status(200).send('OK');
});

app.listen(3000);
```

### Python/Flask

```python
from flask import Flask, request, jsonify
import requests
import os

app = Flask(__name__)
ZENDFI_API_KEY = os.getenv('ZENDFI_API_KEY')

# Create payment
@app.route('/api/checkout', methods=['POST'])
def create_checkout():
    data = request.json
    
    response = requests.post(
        'https://api.zendfi.tech/api/v1/payments',
        json={
            'amount': data['amount'],
            'currency': 'USD',
            'description': data['description'],
            'token': 'USDC'
        },
        headers={
            'Authorization': f'Bearer {ZENDFI_API_KEY}',
            'Content-Type': 'application/json'
        }
    )
    
    return jsonify(response.json())

# Webhook handler
@app.route('/webhooks/zendfi', methods=['POST'])
def handle_webhook():
    data = request.json
    
    if data['event'] == 'payment.confirmed':
        print(f"Payment confirmed: {data['payment']['id']}")
        # Fulfill order, grant access, etc.
    
    return 'OK', 200

if __name__ == '__main__':
    app.run(port=3000)
```

---

## Next Steps (Your Journey Continues!)

**You're now accepting crypto payments!** How awesome is that?

**Continue your ZendFi journey:**

1. [Full Payment API Reference](./02-payments.md) - Master all payment options
2. [Payment Links](./03-payment-links.md) - Create reusable payment URLs
3. [Webhooks Deep Dive](./04-webhooks.md) - Become a webhook wizard
4. [Wallet Management](./05-wallet-management.md) - Manage your funds like a pro
5. [Advanced Features](./06-advanced-features.md) - Subscriptions, splits, and more!

**Need help? We're here for you!**
- support@zendfi.tech - We actually read our emails! 
- [Discord Community](https://discord.gg/zendfi) - Join the conversation!
- [Video Tutorials](https://zendfi.tech/tutorials) - Watch and learn!

---

**Welcome to ZendFi! Let's revolutionize payments together!**

You're not just integrating a payment API - you're joining a community building the future of money. We're excited to have you here!
