# Wallet Management - Your Crypto Treasury! 💰

Welcome to Wallet Management! This is where you manage your merchant wallet, check balances, export keys, and withdraw funds to external addresses. Whether you have an MPC wallet or a regular wallet, we've got you covered. Let's dive in!

---

## Table of Contents
- [Understanding Your Wallet](#understanding-your-wallet)
- [Get Wallet Info & Balance](#get-wallet-info--balance)
- [Export Private Key (MPC Only)](#export-private-key-mpc-only)
- [Withdraw Funds](#withdraw-funds)
- [Passkey Setup (MPC Wallets)](#passkey-setup-mpc-wallets)
- [Security Best Practices](#security-best-practices)
- [Testing](#testing)

---

## Understanding Your Wallet

ZendFi supports **4 different wallet types** (as covered in [Getting Started](./01-getting-started.md)):

### 1. MPC Passkey Wallet (Recommended)
- **Non-custodial**: You control your funds via passkey
- **No seed phrases**: Uses Face ID/Touch ID instead
- **Can export key**: Full control when needed
- **Can withdraw**: Transfer funds to any Solana address
- **Passkey protected**: All sensitive operations require biometric auth

### 2. BIP39 Mnemonic Wallet
- **Custodial**: ZendFi manages the key
- **HD wallet**: Derived from mnemonic phrase
- **Cannot export**: Key stays secure on server
- **Cannot withdraw via API**: Contact support for withdrawals

### 3. Simple Deterministic Wallet
- **Custodial**: ZendFi manages the key
- **Fastest setup**: Generated instantly
- **Cannot export**: Key stays secure on server
- **Cannot withdraw via API**: Contact support for withdrawals

### 4. Bring Your Own Wallet
- **Non-custodial**: You manage your own wallet (Phantom, Solflare, Ledger)
- **No key management**: Use your existing wallet
- **Cannot export**: N/A (you already have the key!)
- **Can withdraw**: Just use your own wallet directly

**In this guide, we'll focus on MPC wallets** since they support the full API for wallet management! ✨

---

## Get Wallet Info & Balance

Check your wallet balance and details - works for **all wallet types**!

### Endpoint
```
GET /api/v1/merchants/me/wallet
```

### Authentication
```
Authorization: Bearer YOUR_API_KEY
```

Or use session cookie (if logged into merchant dashboard).

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `wallet_address` | string | Your Solana wallet address (base58) |
| `wallet_type` | string | Wallet type ("mpc", "custodial", "external", "unknown") |
| `sol_balance` | number | SOL balance (in SOL, not lamports) |
| `usdc_balance` | number | USDC balance (UI amount) |
| `usdc_token_account` | string | Your USDC token account address |
| `has_mpc_wallet` | boolean | Whether you have an active MPC wallet |

---

## Examples

### Example 1: Check MPC Wallet Balance

**Request:**
```bash
curl https://api.zendfi.tech/api/v1/merchants/me/wallet \
  -H "Authorization: Bearer zfi_test_abc123..."
```

**Response:**
```json
{
  "wallet_address": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
  "wallet_type": "mpc",
  "sol_balance": 0.5,
  "usdc_balance": 1234.56,
  "usdc_token_account": "8zKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsV",
  "has_mpc_wallet": true
}
```

**What This Tells You:**
- You have an MPC wallet
- Balance: 0.5 SOL + 1,234.56 USDC
- Wallet address ready for payments
- USDC token account exists and active

---

### Example 2: Check Regular Wallet Balance

**Request:**
```bash
curl https://api.zendfi.tech/api/v1/merchants/me/wallet \
  -H "Authorization: Bearer zfi_live_xyz789..."
```

**Response:**
```json
{
  "wallet_address": "9yKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsW",
  "wallet_type": "custodial",
  "sol_balance": 2.35,
  "usdc_balance": 5678.90,
  "usdc_token_account": "AzKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsX",
  "has_mpc_wallet": false
}
```

**What This Tells You:**
- You have a custodial wallet (mnemonic or simple)
- Balance: 2.35 SOL + 5,678.90 USDC
- Key is managed by ZendFi (cannot export via API)
- Contact support for withdrawals

---

### Example 3: Check External Wallet Balance

**Request:**
```bash
curl https://api.zendfi.tech/api/v1/merchants/me/wallet \
  -H "Authorization: Bearer zfi_live_def456..."
```

**Response:**
```json
{
  "wallet_address": "BxKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsY",
  "wallet_type": "external",
  "sol_balance": 10.5,
  "usdc_balance": 0.0,
  "usdc_token_account": "CzKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsZ",
  "has_mpc_wallet": false
}
```

**What This Tells You:**
- You're using your own wallet (Phantom, Solflare, etc.)
- Balance: 10.5 SOL + 0 USDC
- Manage funds directly in your wallet app
- No API-based withdrawals needed (you already control the wallet!)

---

## Export Private Key (MPC Only)

Export your MPC wallet's private key for backup or migration. **This is VERY sensitive** - handle with extreme care! 🔐

### Endpoint
```
POST /api/v1/merchants/me/wallet/export
```

### Authentication
```
Authorization: Bearer YOUR_API_KEY
```

Or use session cookie (if logged into merchant dashboard).

### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `passkey_signature` | object | Yes | Passkey signature for authentication |
| `passkey_signature.credential_id` | string | Yes | Your passkey credential ID |
| `passkey_signature.authenticator_data` | array | Yes | Authenticator data bytes |
| `passkey_signature.signature` | array | Yes | Signature bytes |
| `passkey_signature.client_data_json` | array | Yes | Client data JSON bytes |

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `wallet_address` | string | Your wallet's public address |
| `private_key_base58` | string | **SENSITIVE!** Your private key in base58 format |
| `public_key` | string | Your wallet's public key (base58) |
| `warning` | string | Security warning about key handling |
| `export_timestamp` | datetime | When the key was exported (ISO 8601) |

---

## Export Key Examples

### Example 1: Export Private Key (with Passkey)

**Important:** You must complete passkey authentication first to get the signature data. This typically happens in your frontend using the WebAuthn API.

**Request:**
```bash
curl -X POST https://api.zendfi.tech/api/v1/merchants/me/wallet/export \
  -H "Authorization: Bearer zfi_test_abc123..." \
  -H "Content-Type: application/json" \
  -d '{
    "passkey_signature": {
      "credential_id": "ABC123...XYZ789",
      "authenticator_data": [73, 150, 13, 229, ...],
      "signature": [48, 69, 2, 33, ...],
      "client_data_json": [123, 34, 116, 121, ...]
    }
  }'
```

**Response:**
```json
{
  "wallet_address": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
  "private_key_base58": "5Kz8LWvZh7NYjJvPhHGYnNrB2rKqb2nnU6NJR4zHYQZ3k2PxMhR7vA8sB9cC0dD1eE2fF3gG4hH5iI6jJ7kK8lL9",
  "public_key": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
  "warning": "⚠️ CRITICAL: Store this private key securely. Anyone with access to this key has FULL CONTROL of your wallet and funds. Never share it publicly or commit it to version control.",
  "export_timestamp": "2024-01-15T10:30:45Z"
}
```

**What To Do With Your Private Key:**
1. **Save it securely**: Password manager, encrypted file, or hardware security module
2. **Never share it**: Not in emails, Slack, or any public place
3. **Don't commit to Git**: Add to .gitignore if storing locally
4. **Consider offline storage**: USB drive in a safe, paper backup
5. **Import to other wallets**: Can use in Phantom, Solflare, Solana CLI, etc.

**Audit Trail:**
- Export is logged in `audit_logs` table
- Includes merchant ID, IP address, timestamp
- Monitor exports via admin dashboard

---

### Error Responses

#### 400 Bad Request - No MPC Wallet

```json
{
  "error": "MPC wallet not found",
  "message": "This merchant doesn't have an MPC wallet. Only MPC wallets support key export."
}
```

**Solution:** Only MPC wallets can export keys. Contact support if you need access to custodial wallet keys.

---

#### 401 Unauthorized - Invalid Passkey

```json
{
  "error": "Failed to export key: Invalid passkey signature"
}
```

**Solution:** 
- Ensure you completed passkey authentication correctly
- Check that credential_id matches your registered passkey
- Verify signature data is correct
- Try authenticating again

---

#### 500 Internal Server Error

```json
{
  "error": "Failed to export key: Failed to combine shards"
}
```

**Solution:** 
- Internal error combining MPC shards
- Contact support with the timestamp
- This is rare - may indicate network issues with Lit Protocol

---

## Withdraw Funds

Transfer SOL or USDC from your MPC wallet to any external Solana address! Perfect for moving funds to exchanges, other wallets, or cashing out. 💸

### Endpoint
```
POST /api/v1/merchants/me/wallet/withdraw
```

### Authentication
```
Authorization: Bearer YOUR_API_KEY
```

Or use session cookie (if logged into merchant dashboard).

### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `to_address` | string | Yes | Destination Solana wallet address (base58) |
| `amount` | number | Yes | Amount to withdraw (must be > 0) |
| `token` | string | Yes | Token to withdraw ("Sol" or "Usdc") |
| `passkey_signature` | object | Yes | Passkey signature for authentication |
| `passkey_signature.credential_id` | string | Yes | Your passkey credential ID |
| `passkey_signature.authenticator_data` | array | Yes | Authenticator data bytes |
| `passkey_signature.signature` | array | Yes | Signature bytes |
| `passkey_signature.client_data_json` | array | Yes | Client data JSON bytes |

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `success` | boolean | Whether withdrawal succeeded |
| `transaction_signature` | string | Solana transaction signature (base58) |
| `from_address` | string | Your merchant wallet address |
| `to_address` | string | Destination address |
| `amount` | number | Amount withdrawn |
| `token` | string | Token type ("Sol" or "Usdc") |
| `explorer_url` | string | Solscan URL to view transaction |

---

## Withdrawal Examples

### Example 1: Withdraw SOL to Phantom Wallet

**Request:**
```bash
curl -X POST https://api.zendfi.tech/api/v1/merchants/me/wallet/withdraw \
  -H "Authorization: Bearer zfi_test_abc123..." \
  -H "Content-Type: application/json" \
  -d '{
    "to_address": "9yKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsW",
    "amount": 0.5,
    "token": "Sol",
    "passkey_signature": {
      "credential_id": "ABC123...XYZ789",
      "authenticator_data": [73, 150, 13, 229, ...],
      "signature": [48, 69, 2, 33, ...],
      "client_data_json": [123, 34, 116, 121, ...]
    }
  }'
```

**Response:**
```json
{
  "success": true,
  "transaction_signature": "5KzZ8LWvZh7NYjJvPhHGYnNrB2rKqb2nnU6NJR4zHYQZ3k2PxMhR7vA8sB9cC0dD1eE2fF3gG4hH5iI6jJ7kK8",
  "from_address": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
  "to_address": "9yKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsW",
  "amount": 0.5,
  "token": "Sol",
  "explorer_url": "https://solscan.io/tx/5KzZ8LWvZh7NYjJvPhHGYnNrB2rKqb2nnU6NJR4zHYQZ..."
}
```

**What Happened:**
- 0.5 SOL withdrawn from your MPC wallet
- Sent to your Phantom wallet
- Transaction confirmed on-chain
- 🔍 View on Solscan via `explorer_url`

---

### Example 2: Withdraw USDC to Exchange

**Request:**
```bash
curl -X POST https://api.zendfi.tech/api/v1/merchants/me/wallet/withdraw \
  -H "Authorization: Bearer zfi_live_xyz789..." \
  -H "Content-Type: application/json" \
  -d '{
    "to_address": "BxKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsY",
    "amount": 1000.00,
    "token": "Usdc",
    "passkey_signature": {
      "credential_id": "DEF456...ABC789",
      "authenticator_data": [73, 150, 13, 229, ...],
      "signature": [48, 69, 2, 33, ...],
      "client_data_json": [123, 34, 116, 121, ...]
    }
  }'
```

**Response:**
```json
{
  "success": true,
  "transaction_signature": "6LzZ8LWvZh7NYjJvPhHGYnNrB2rKqb2nnU6NJR4zHYQZ3k2PxMhR7vA8sB9cC0dD1eE2fF3gG4hH5iI6jJ7kK9",
  "from_address": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
  "to_address": "BxKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsY",
  "amount": 1000.00,
  "token": "Usdc",
  "explorer_url": "https://solscan.io/tx/6LzZ8LWvZh7NYjJvPhHGYnNrB2rKqb2nnU6NJR4zHYQZ..."
}
```

**What Happened:**
- 1,000 USDC withdrawn from your MPC wallet
- Sent to your exchange deposit address
- USDC token account created automatically if needed
- Ready to cash out on the exchange!

---

### Example 3: Withdraw Small Amount for Testing

**Request:**
```bash
curl -X POST https://api.zendfi.tech/api/v1/merchants/me/wallet/withdraw \
  -H "Authorization: Bearer zfi_test_abc123..." \
  -H "Content-Type: application/json" \
  -d '{
    "to_address": "CzKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsZ",
    "amount": 0.01,
    "token": "Usdc",
    "passkey_signature": {
      "credential_id": "GHI789...DEF012",
      "authenticator_data": [73, 150, 13, 229, ...],
      "signature": [48, 69, 2, 33, ...],
      "client_data_json": [123, 34, 116, 121, ...]
    }
  }'
```

**Response:**
```json
{
  "success": true,
  "transaction_signature": "7LzZ8LWvZh7NYjJvPhHGYnNrB2rKqb2nnU6NJR4zHYQZ3k2PxMhR7vA8sB9cC0dD1eE2fF3gG4hH5iI6jJ7kL0",
  "from_address": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
  "to_address": "CzKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsZ",
  "amount": 0.01,
  "token": "Usdc",
  "explorer_url": "https://solscan.io/?cluster=devnet/tx/7LzZ8LWvZh7NYjJvPhHGYnNrB2rKqb2nnU6NJR4zHYQZ..."
}
```

**What This Shows:**
- Test withdrawal of $0.01 USDC
- Perfect for testing before large amounts
- Devnet explorer URL (notice `?cluster=devnet`)
- Always test first!

---

### Withdrawal Error Responses

#### 400 Bad Request - Invalid Amount

```json
{
  "error": "Amount must be greater than 0"
}
```

**Solution:** Use positive amounts only (no zero or negative).

---

#### 400 Bad Request - Invalid Address

```json
{
  "error": "Invalid destination address"
}
```

**Solution:** 
- Check that `to_address` is a valid Solana address
- Must be base58 format
- Cannot be empty or malformed

---

#### 400 Bad Request - No MPC Wallet

```json
{
  "error": "MPC wallet not found",
  "message": "This merchant doesn't have an MPC wallet."
}
```

**Solution:** Only MPC wallets support API withdrawals. Contact support for custodial wallet withdrawals.

---

#### 401 Unauthorized - Invalid Passkey

```json
{
  "error": "Withdrawal failed: Invalid passkey signature"
}
```

**Solution:**
- Complete passkey authentication correctly
- Ensure signature data is accurate
- Try authenticating again

---

#### 500 Internal Server Error - Insufficient Balance

```json
{
  "error": "Withdrawal failed: Insufficient balance"
}
```

**Solution:**
- Check your balance with GET /api/v1/merchants/me/wallet
- Ensure you have enough for the withdrawal + transaction fee (~0.000005 SOL)
- For USDC: need SOL for transaction fees too

---

## Passkey Setup (MPC Wallets)

If you created an MPC wallet, you **must** set up a passkey before you can export keys or withdraw funds. It's quick and easy - just like setting up Face ID!

### Why Passkey?

- **Secure**: Uses biometric authentication (Face ID, Touch ID, Windows Hello)
- **No passwords**: No passwords to remember or leak
- **Fast**: Authenticate in seconds
- **Cross-device**: Works on phone, laptop, hardware keys
- **Private**: Biometric data never leaves your device

### Setup Flow

1. Create merchant account with `wallet_generation_method: "mpc_passkey"`
2. API returns `passkey_setup_url` in response
3. Visit the setup URL in a browser
4. Click "Register Passkey" button
5. Complete Face ID/Touch ID authentication
6. MPC wallet is created automatically (5-10 seconds)
7. You're ready to use wallet management APIs!

---

## Passkey Setup Endpoints

### 1. Get Passkey Setup Page

**Endpoint:**
```
GET /merchants/{merchant_id}/setup-passkey
```

**Authentication:** None (public URL)

**What It Does:**
- Displays a beautiful setup page with instructions
- Guides you through passkey registration
- Shows real-time status updates
- Automatically creates MPC wallet after passkey registration

**How To Use:**
When you create an MPC merchant, you'll receive a `passkey_setup_url` like:
```
https://api.zendfi.tech/merchants/550e8400-e29b-41d4-a716-446655440000/setup-passkey
```

Just open it in a browser and follow the instructions!

---

### 2. Check Passkey Status

**Endpoint:**
```
GET /api/merchants/{merchant_id}/passkey-status
```

**Authentication:** None (public endpoint for merchant onboarding)

**Response:**
```json
{
  "has_passkey": true,
  "has_mpc_wallet": true,
  "wallet_address": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU"
}
```

**Use Case:** Poll this endpoint to check if passkey setup is complete.

---

### 3. WebAuthn Registration (Programmatic)

For advanced users who want to integrate passkey setup into their own UI:

#### Start Registration
```
POST /api/v1/webauthn/register/start
```

**Request:**
```json
{
  "merchant_id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "merchant@example.com",
  "display_name": "Awesome Coffee Shop"
}
```

**Response:**
```json
{
  "challenge_id": "660e8400-e29b-41d4-a716-446655440001",
  "options": {
    "challenge": "abc123...",
    "rp": {
      "name": "ZendFi",
      "id": "api.zendfi.tech"
    },
    "user": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "merchant@example.com",
      "displayName": "Awesome Coffee Shop"
    },
    "pubKeyCredParams": [...],
    "timeout": 300000,
    "attestation": "none",
    "authenticatorSelection": {
      "residentKey": "required",
      "userVerification": "required"
    }
  }
}
```

---

#### Finish Registration
```
POST /api/v1/webauthn/register/finish
```

**Request:**
```json
{
  "challenge_id": "660e8400-e29b-41d4-a716-446655440001",
  "credential": {
    "id": "ABC123...XYZ789",
    "rawId": "ABC123...XYZ789",
    "response": {
      "clientDataJSON": "eyJ0eXBlI...",
      "attestationObject": "o2NmbXRk..."
    },
    "type": "public-key"
  }
}
```

**Response:**
```json
{
  "credential_id": "ABC123...XYZ789",
  "success": true
}
```

**What Happens Next:**
- Passkey is stored in database
- MPC wallet creation starts automatically (background job)
- Wallet ready in 5-10 seconds

---

### 4. WebAuthn Authentication (For Withdrawals/Exports)

When withdrawing funds or exporting keys, you'll need to authenticate with your passkey:

#### Start Authentication
```
POST /api/v1/webauthn/auth/start
```

**Request:**
```json
{
  "merchant_id": "550e8400-e29b-41d4-a716-446655440000"
}
```

**Response:**
```json
{
  "challenge_id": "770e8400-e29b-41d4-a716-446655440002",
  "options": {
    "challenge": "def456...",
    "rpId": "api.zendfi.tech",
    "allowCredentials": [
      {
        "type": "public-key",
        "id": "ABC123...XYZ789"
      }
    ],
    "userVerification": "required",
    "timeout": 300000
  }
}
```

---

#### Finish Authentication
```
POST /api/v1/webauthn/auth/finish
```

**Request:**
```json
{
  "challenge_id": "770e8400-e29b-41d4-a716-446655440002",
  "credential": {
    "id": "ABC123...XYZ789",
    "rawId": "ABC123...XYZ789",
    "response": {
      "clientDataJSON": "eyJ0eXBlI...",
      "authenticatorData": "SZYN5YgOjGh0NBc...",
      "signature": "MEUCIQCqL...",
      "userHandle": "550e8400..."
    },
    "type": "public-key"
  }
}
```

**Response:**
```json
{
  "success": true,
  "credential_id": "ABC123...XYZ789",
  "authenticator_data": [73, 150, 13, 229, ...],
  "signature": [48, 69, 2, 33, ...],
  "client_data_json": [123, 34, 116, 121, ...]
}
```

**Use This Response:**
The `authenticator_data`, `signature`, and `client_data_json` fields become your `passkey_signature` for withdrawal/export requests!

---

## Security Best Practices

### DO

- **Store API keys securely**: Environment variables, secrets managers
- **Use passkey for sensitive ops**: Always require passkey for exports/withdrawals
- **Monitor wallet balance**: Check regularly via API
- **Test withdrawals first**: Use small amounts on devnet
- **Audit export logs**: Monitor who exported keys and when
- **Use HTTPS**: Always use HTTPS for API requests
- **Backup exported keys**: Store in password manager or encrypted storage
- **Verify addresses**: Double-check destination addresses before withdrawals

### DON'T

- **Don't share private keys**: Never share exported private keys
- **Don't commit keys to Git**: Add to .gitignore
- **Don't hardcode addresses**: Use environment variables
- **Don't skip testing**: Always test on devnet first
- **Don't ignore audit logs**: Monitor for suspicious activity
- **Don't withdraw all funds**: Keep some SOL for transaction fees
- **Don't rush**: Take time to verify amounts and addresses

---

## Testing

### Step 1: Create MPC Wallet (Devnet)

```bash
curl -X POST https://api.zendfi.tech/api/v1/merchants \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Merchant",
    "email": "test@example.com",
    "business_address": "123 Test St",
    "wallet_generation_method": "mpc_passkey",
    "webhook_url": "https://webhook.site/your-unique-url"
  }'
```

**Response includes:**
- `passkey_setup_url`: Visit this to set up your passkey
- `api_key`: Save this for API requests

---

### Step 2: Complete Passkey Setup

1. Open `passkey_setup_url` in browser
2. Click "Register Passkey"
3. Complete Face ID/Touch ID
4. Wait 5-10 seconds for MPC wallet creation
5. Save your `credential_id` from the response

---

### Step 3: Check Wallet Balance

```bash
curl https://api.zendfi.tech/api/v1/merchants/me/wallet \
  -H "Authorization: Bearer YOUR_API_KEY"
```

You should see:
- `has_mpc_wallet: true`
- `wallet_address`: Your new MPC wallet
- `sol_balance: 0` (get some devnet SOL from faucet!)

---

### Step 4: Get Devnet SOL

Visit https://faucet.solana.com and request devnet SOL to your `wallet_address`.

---

### Step 5: Test Withdrawal

Use the WebAuthn authentication flow to get a passkey signature, then:

```bash
curl -X POST https://api.zendfi.tech/api/v1/merchants/me/wallet/withdraw \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "to_address": "YOUR_PHANTOM_WALLET",
    "amount": 0.01,
    "token": "Sol",
    "passkey_signature": {
      "credential_id": "ABC123...",
      "authenticator_data": [...],
      "signature": [...],
      "client_data_json": [...]
    }
  }'
```

---

### Step 6: Verify on Solscan

Open the `explorer_url` from the response to see your transaction on-chain! 🎉

---

## Code Examples

### Node.js: Check Balance and Withdraw

```javascript
const axios = require('axios');

const ZENDFI_API_KEY = process.env.ZENDFI_API_KEY;
const BASE_URL = 'https://api.zendfi.tech';

async function checkWalletBalance() {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/merchants/me/wallet`,
      {
        headers: {
          'Authorization': `Bearer ${ZENDFI_API_KEY}`
        }
      }
    );

    const wallet = response.data;
    console.log('💰 Wallet Balance:');
    console.log(`  Address: ${wallet.wallet_address}`);
    console.log(`  SOL: ${wallet.sol_balance} SOL`);
    console.log(`  USDC: ${wallet.usdc_balance} USDC`);
    console.log(`  Type: ${wallet.wallet_type}`);
    console.log(`  MPC: ${wallet.has_mpc_wallet ? 'Yes' : 'No'}`);

    return wallet;
  } catch (error) {
    console.error('Failed to check balance:', error.response?.data || error.message);
    throw error;
  }
}

async function withdrawFunds(toAddress, amount, token, passkeySignature) {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/merchants/me/wallet/withdraw`,
      {
        to_address: toAddress,
        amount: amount,
        token: token, // 'Sol' or 'Usdc'
        passkey_signature: passkeySignature
      },
      {
        headers: {
          'Authorization': `Bearer ${ZENDFI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const result = response.data;
    console.log(' Withdrawal Successful!');
    console.log(`  Amount: ${result.amount} ${result.token}`);
    console.log(`  From: ${result.from_address}`);
    console.log(`  To: ${result.to_address}`);
    console.log(`  Signature: ${result.transaction_signature}`);
    console.log(`  Explorer: ${result.explorer_url}`);

    return result;
  } catch (error) {
    console.error('Withdrawal failed:', error.response?.data || error.message);
    throw error;
  }
}

// Example usage
(async () => {
  // Check balance
  const wallet = await checkWalletBalance();

  // Withdraw if MPC wallet
  if (wallet.has_mpc_wallet && wallet.sol_balance > 0.01) {
    // Note: You need to get passkeySignature from WebAuthn authentication
    // This is typically done in the browser frontend
    console.log('\nℹ️ To withdraw, authenticate with your passkey first!');
  }
})();
```

---

### Python: Complete Wallet Management

```python
import requests
import os

ZENDFI_API_KEY = os.getenv('ZENDFI_API_KEY')
BASE_URL = 'https://api.zendfi.tech'

def check_wallet_balance():
    """Check wallet balance and info"""
    response = requests.get(
        f'{BASE_URL}/api/v1/merchants/me/wallet',
        headers={
            'Authorization': f'Bearer {ZENDFI_API_KEY}'
        }
    )
    
    if response.status_code == 200:
        wallet = response.json()
        print(' Wallet Balance:')
        print(f'  Address: {wallet["wallet_address"]}')
        print(f'  SOL: {wallet["sol_balance"]} SOL')
        print(f'  USDC: {wallet["usdc_balance"]} USDC')
        print(f'  Type: {wallet["wallet_type"]}')
        print(f'  MPC: {"Yes" if wallet["has_mpc_wallet"] else "No"}')
        return wallet
    else:
        print(f'Failed to check balance: {response.json()}')
        return None

def export_private_key(passkey_signature):
    """Export private key (MPC wallets only)"""
    response = requests.post(
        f'{BASE_URL}/api/v1/merchants/me/wallet/export',
        headers={
            'Authorization': f'Bearer {ZENDFI_API_KEY}',
            'Content-Type': 'application/json'
        },
        json={
            'passkey_signature': passkey_signature
        }
    )
    
    if response.status_code == 200:
        key_data = response.json()
        print(' Private Key Exported:')
        print(f'  Wallet: {key_data["wallet_address"]}')
        print(f'  Private Key: {key_data["private_key_base58"]}')
        print(f'   WARNING: {key_data["warning"]}')
        print(f'  Exported: {key_data["export_timestamp"]}')
        return key_data
    else:
        print(f'Export failed: {response.json()}')
        return None

def withdraw_funds(to_address, amount, token, passkey_signature):
    """Withdraw SOL or USDC to external address"""
    response = requests.post(
        f'{BASE_URL}/api/v1/merchants/me/wallet/withdraw',
        headers={
            'Authorization': f'Bearer {ZENDFI_API_KEY}',
            'Content-Type': 'application/json'
        },
        json={
            'to_address': to_address,
            'amount': amount,
            'token': token,  # 'Sol' or 'Usdc'
            'passkey_signature': passkey_signature
        }
    )
    
    if response.status_code == 200:
        result = response.json()
        print(' Withdrawal Successful!')
        print(f'  Amount: {result["amount"]} {result["token"]}')
        print(f'  From: {result["from_address"]}')
        print(f'  To: {result["to_address"]}')
        print(f'  Signature: {result["transaction_signature"]}')
        print(f'  Explorer: {result["explorer_url"]}')
        return result
    else:
        print(f'Withdrawal failed: {response.json()}')
        return None

# Example usage
if __name__ == '__main__':
    # Check balance
    wallet = check_wallet_balance()
    
    # Only MPC wallets can withdraw via API
    if wallet and wallet['has_mpc_wallet']:
        print('\nℹ️ This is an MPC wallet - you can withdraw funds!')
        print('ℹ️ Authenticate with your passkey first to get the signature.')
    else:
        print('\nℹ️ This is not an MPC wallet.')
        print('ℹ️ Contact support for custodial wallet withdrawals.')
```

---

## Summary & Next Steps

Congratulations! You now know how to manage your ZendFi wallet like a pro!

**What You Learned:**
- Check wallet balance for any wallet type
- Export private keys from MPC wallets (with passkey auth)
- Withdraw SOL and USDC to external addresses
- Set up passkeys for secure authentication
- Use WebAuthn API for programmatic integration
- Follow security best practices

**Next Steps:**
1. Explore [Advanced Features](./06-advanced-features.md) for payment splits, subscriptions, and more
2. Review [API Reference](./07-reference.md) for complete endpoint documentation
3. Check out [Payment Links](./03-payment-links.md) for reusable payment URLs

**Need Help?**
- Email: support@zendfi.tech
- Discord: discord.gg/zendfi
- Docs: https://docs.zendfi.tech

Happy building!
