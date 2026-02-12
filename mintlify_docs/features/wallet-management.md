---
sidebar_position: 3
title: Wallet Management
description: Secure merchant wallet solutions
---

# Wallet Management

ZendFi provides flexible wallet solutions for merchants. Choose the setup that best fits your security requirements and business needs.

## Wallet Types Overview

| Type | Best For | Control | Security |
|------|----------|---------|----------|
| **MPC Passkey Wallet** | Maximum security, no seed phrases | Distributed key shares | Highest |
| **Own Wallet** | Full self-custody, existing wallets | Self-custody | User-managed |

## MPC Passkey Wallets

Multi-Party Computation (MPC) wallets split your private key into multiple secure shares using Shamir's Secret Sharing. No single party ever has access to the complete key.

### How It Works

```
Your Key = Share 1 (Encrypted DB) + Share 2 (Lit Network) + Share 3 (Recovery)
              ↓                          ↓                       ↓
      Passkey-protected         Distributed nodes        Encrypted backup
```

**To sign a transaction:**
1. You authenticate with your passkey (biometrics/device)
2. Share 1 is decrypted using your passkey authentication
3. Share 2 is retrieved from Lit Protocol's distributed network
4. Shares combine temporarily to sign the transaction
5. The full key is never reconstructed or stored

### Benefits

- **No Seed Phrase** - Nothing to write down or lose
- **Phishing Resistant** - WebAuthn prevents credential theft
- **Device-Bound** - Keys tied to your biometrics/device  
- **Recovery Possible** - Lost device? Use recovery shard
- **Institutional Grade** - Same tech used by major crypto exchanges
- **Non-Custodial** - You control key reconstruction, not ZendFi

### Setting Up MPC Wallet

MPC wallet creation happens during merchant registration.

#### 1. Register as Merchant

```bash
curl -X POST https://api.zendfi.tech/api/v1/merchants \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My Business",
    "email": "merchant@example.com",
    "wallet_generation_method": "mpc_passkey"
  }'
```

**Response:**

```json
{
  "merchant_id": "merch_abc123",
  "email": "merchant@example.com",
  "name": "My Business",
  "passkey_setup_url": "https://dashboard.zendfi.tech/merchants/merch_abc123/setup-passkey",
  "setup_token": "tok_xyz789",
  "message": "Complete passkey setup to activate your MPC wallet"
}
```

#### 2. Complete Passkey Setup

Visit the `passkey_setup_url` to register your passkey:

1. Open the setup URL in your browser
2. Click "Register Passkey"
3. Your browser prompts for biometric authentication (Touch ID, Face ID, Windows Hello)
4. Your MPC wallet is created and activated

**Behind the scenes:**
- Your Solana keypair is generated
- Private key is split into 3 shards using Shamir's Secret Sharing
- Shard 1: Encrypted and stored in ZendFi database (requires your passkey to decrypt)
- Shard 2: Distributed across Lit Protocol's decentralized network
- Shard 3: Encrypted recovery shard
- Your wallet address is registered to your merchant account

#### 3. Using Your MPC Wallet

Once set up, all payments automatically flow to your MPC wallet:

```bash
# Create a payment - funds will be received by your MPC wallet
curl -X POST https://api.zendfi.tech/api/v1/payments \
  -H "Authorization: Bearer zfi_live_abc123..." \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 100,
    "currency": "USD",
    "description": "Product purchase"
  }'
```

#### 4. Transaction Signing

For operations requiring signatures (withdrawals, refunds), authenticate with your passkey through the dashboard or API.

### Recovery Process

If you lose access to your device, recovery is handled through your recovery shard. Contact support with proof of identity to initiate recovery.

:::warning Recovery Security
Recovery requires strong identity verification to prevent unauthorized access. Keep your recovery credentials secure.
:::


## Own Wallet (External)

Connect your existing Solana wallet to ZendFi. You maintain full custody and control.

### Supported Wallet Providers

When your customers pay, these wallets are supported:

- **Phantom** - Most popular Solana wallet
- **Solflare** - Full-featured web & mobile wallet
- **Backpack** - xNFT-enabled wallet
- **Ledger** - Hardware wallet support
- **Any Solana Wallet** - Via wallet adapter

### Connecting Your Own Wallet

Provide your wallet address during merchant registration:

```bash
curl -X POST https://api.zendfi.tech/api/v1/merchants \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My Business",
    "email": "merchant@example.com",
    "wallet_address": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU"
  }'
```

**Response:**

```json
{
  "merchant_id": "merch_abc123",
  "email": "merchant@example.com", 
  "name": "My Business",
  "wallet_address": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
  "wallet_type": "external",
  "message": "Merchant account created successfully"
}
```

### Receiving Payments

With your own wallet, payments flow directly to your provided address:

```
Customer Payment → Solana → Your Wallet Address
                     ↓
          ZendFi tracks & notifies via webhooks
```

You receive funds immediately. ZendFi monitors transactions and sends webhook notifications.

### Transaction Signing

For refunds or withdrawals, you sign transactions with your own wallet. ZendFi never has access to your private keys.


## Check Your Wallet

### Get Wallet Info

```bash
curl -X GET https://api.zendfi.tech/api/v1/merchants/me/wallet \
  -H "Authorization: Bearer zfi_live_abc123..."
```

**Response:**

```json
{
  "wallet_address": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
  "wallet_type": "mpc",
  "sol_balance": 2.5,
  "usdc_balance": 15234.56,
  "usdc_token_account": "9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin",
  "has_mpc_wallet": true
}
```

### Test vs Live Mode

Query different network balances:

```bash
# Check live (mainnet) balance
curl -X GET "https://api.zendfi.tech/api/v1/merchants/me/wallet?mode=live" \
  -H "Authorization: Bearer zfi_live_abc123..."

# Check test (devnet) balance  
curl -X GET "https://api.zendfi.tech/api/v1/merchants/me/wallet?mode=test" \
  -H "Authorization: Bearer zfi_test_xyz789..."
```

### Withdraw Funds

Withdraw from your MPC wallet (requires passkey authentication):

```bash
curl -X POST https://api.zendfi.tech/api/v1/merchants/me/wallet/withdraw \
  -H "Authorization: Bearer zfi_live_abc123..." \
  -H "Content-Type: application/json" \
  -d '{
    "to_address": "DestinationWallet...",
    "amount": 100.50,
    "token": "Usdc",
    "passkey_signature": {
      "credential_id": "...",
      "client_data_json": "...",
      "authenticator_data": "...",
      "signature": "..."
    }
  }'
```

**Response:**

```json
{
  "success": true,
  "transaction_signature": "5K2Nz7FqK...",
  "from_address": "YourMPCWallet...",
  "to_address": "DestinationWallet...",
  "amount": 100.50,
  "token": "Usdc",
  "explorer_url": "https://solscan.io/tx/5K2Nz7FqK..."
}
```

:::info Passkey Authentication
Withdrawals from MPC wallets require passkey authentication. The passkey_signature is obtained by prompting the user for biometric authentication through the WebAuthn API.
:::


## Token Support

ZendFi supports the following tokens on Solana:

| Token | Network | Mint Address | Decimals |
|-------|---------|--------------|----------|
| **USDC** | Mainnet | `EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v` | 6 |
| **USDT** | Mainnet | `Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB` | 6 |
| **SOL** | Mainnet | Native | 9 |
| **USDC** | Devnet | `4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU` | 6 |

More tokens coming soon! Request tokens in our Discord.


## Wallet Security Best Practices

### For MPC Wallets

| Practice | Why |
|----------|-----|
| **Use Platform Authenticators** | Biometrics (Touch ID, Face ID) are more secure and convenient |
| **Register Backup Device** | Enable recovery if primary device is lost |
| **Review Sessions** | Check active sessions in dashboard regularly |
| **Set Withdrawal Limits** | Configure daily/per-transaction limits (coming soon) |

### For Own Wallets

| Practice | Why |
|----------|-----|
| **Use Hardware Wallets** | Ledger/Trezor for high-value merchants |
| **Separate Hot/Cold Storage** | Keep reserves in cold storage |
| **Never Share Private Keys** | ZendFi will never ask for your private key |
| **Regular Audits** | Review wallet activity regularly |

### General Security

| Practice | Why |
|----------|-----|
| **Enable 2FA on Dashboard** | Protect merchant dashboard access |
| **Verify Webhook Signatures** | Ensure webhooks are from ZendFi |
| **API Key Rotation** | Rotate API keys quarterly |
| **Monitor Audit Logs** | Review all account activity |
| **Use IP Allowlisting** | Restrict API access by IP (coming soon) |


## Wallet Types Comparison

| Feature | MPC Passkey | Own Wallet |
|---------|-------------|------------|
| **Custody** | Non-custodial | Self-custody |
| **Setup** | Automatic during registration | Provide your address |
| **Recovery** | Recovery shard + support | Your responsibility |
| **Seed Phrase** | None | You manage |
| **Transaction Signing** | Passkey (biometrics) | Your wallet |
| **Best For** | No crypto experience, maximum security | Existing wallet users, full control |
| **Withdrawals** | Via API with passkey | Direct from your wallet |


## Next Steps

- [Payments API](../api/payments) - Start accepting payments
- [Webhooks](./webhooks) - Get notified of wallet activity  
- [Payment Splits](./payment-splits) - Distribute funds automatically
- [Getting Started](/intro) - Complete setup guide
