---
sidebar_position: 2
title: CLI
description: Command-line tools for managing your ZendFi integration, scaffolding projects, and testing payments
---

## Installation

```bash
# npm
npm install -g create-zendfi-app

# yarn
yarn global add create-zendfi-app

# pnpm
pnpm add -g create-zendfi-app

# Verify installation
zendfi --version
```


## Authentication

Set your API key as an environment variable:

```bash
export ZENDFI_API_KEY=zfi_test_your_key_here
```

Or create a `.env` file in your project:

```env
ZENDFI_API_KEY=zfi_test_your_key_here
```


## Project Scaffolding

### Create New Project

```bash
# Interactive mode (recommended)
npx create-zendfi-app my-store

# With template specified
npx create-zendfi-app my-store --template nextjs-ecommerce

# Skip prompts
npx create-zendfi-app my-store --template nextjs-saas --skip-install
```

### Available Templates

- **nextjs-ecommerce** - Full-featured online store with Next.js 14
- **nextjs-saas** - SaaS application with subscription billing
- **express-api** - Backend API server with crypto payment endpoints

### Initialize Existing Project

```bash
# Add ZendFi to an existing project
zendfi init

# Specify framework
zendfi init --framework nextjs

# Skip dependency installation
zendfi init --skip-install
```


## Core Commands

### Create Test Payment

```bash
# Interactive mode
zendfi payment create

# Quick test payment
zendfi payment create --amount 50 --open

# Full options
zendfi payment create \
  --amount 100 \
  --description "Premium subscription" \
  --email customer@example.com \
  --open \
  --watch
```

**Options:**
- `--amount <number>` - Payment amount in USD
- `--description <text>` - Payment description
- `--email <email>` - Customer email
- `--open` - Open payment URL in browser
- `--watch` - Watch payment status in real-time

**Output:**
```
✔ Test payment created!

Payment ID: pay_test_abc123xyz
Amount: $50.00 USD
Status: Pending
Payment URL: https://pay.zendfi.tech/abc123

Opening in browser...
```

### Check Payment Status

```bash
zendfi payment status pay_test_abc123xyz
```

**Output:**
```
Payment Status: pay_test_abc123xyz

Status: Confirmed
Amount: $50.00 USD
Currency: USDC
Customer: customer@example.com
Created: 2025-11-09 10:30:15 AM
Confirmed: 2025-11-09 10:31:42 AM

Transaction:
  Signature: 5x7yZ9...abc123
  Block: 12345678
  Network: Solana Devnet
```


## Webhooks

### Listen for Webhooks

Forward webhooks to your local machine during development:

```bash
# Listen on default port (3000)
zendfi webhooks

# Specify port
zendfi webhooks --port 4000

# Forward to specific endpoint
zendfi webhooks --forward-to http://localhost:3000/api/webhooks
```

**Output:**
```
Webhook listener started

Listening on: http://localhost:3000/webhooks
Forwarding to: http://localhost:3000/api/webhooks/zendfi

[10:45:23] payment.confirmed
  Payment ID: pay_test_xyz789
  Amount: $25.00 USDC
  ✓ Signature verified
  ✓ Forwarded to endpoint
```


## API Keys

### List API Keys

```bash
zendfi keys list
```

### Create API Key

```bash
# Interactive
zendfi keys create

# With options
zendfi keys create --name "Production Key" --mode live
```

### Rotate API Key

```bash
zendfi keys rotate <key-id>
```


## Command Reference

```
zendfi [command] [options]

Core Commands:
  init                      Add ZendFi to an existing project
  payment create            Create test payments
  payment status <id>       Check payment status  
  webhooks                  Forward webhooks locally
  keys list                 List API keys
  keys create               Create new API key
  keys rotate <id>          Rotate an API key

Options:
  -V, --version             Show version number
  -h, --help                Show help
```


## Environment Variables

| Variable | Description |
|----------|-------------|
| `ZENDFI_API_KEY` | API key for authentication (required) |
| `ZENDFI_WEBHOOK_SECRET` | Webhook secret for signature verification |
| `ZENDFI_API_URL` | Custom API URL (rarely needed) |


## Troubleshooting

### Debug Mode

Enable verbose output for debugging:

```bash
# Use verbose flag (if available)
zendfi payment create --amount 10 --verbose

# Or set DEBUG environment variable
DEBUG=zendfi* zendfi payment create --amount 10
```

### Common Issues

**Authentication Error**
```bash
# Check if API key is set
echo $ZENDFI_API_KEY

# Set your API key
export ZENDFI_API_KEY=zfi_test_your_key_here
```

**Command Not Found**
```bash
# Reinstall the CLI
npm install -g create-zendfi-app

# Verify installation
zendfi --version
```

**Payment Stuck in Pending**
```bash
# Check payment status
zendfi payment status pay_test_abc123

# Test mode uses free devnet - get test SOL at:
# https://sol-faucet.com
```

### Getting Help

```bash
# Show all commands
zendfi --help

# Get help for specific command
zendfi payment --help
zendfi webhooks --help
```


## Next Steps

**After installing the CLI:**
1. [Create your first payment](../use-cases/ecommerce-store) - Complete e-commerce integration guide
2. [Set up webhooks](../features/webhooks) - Handle payment events
3. [View API Reference](../api/payments) - Complete API with SDK examples
4. [TypeScript Guide](./typescript-guide) - Type-safe SDK patterns

**Need help?**
- [Join Discord](https://discord.gg/zendfi)
- [Email support](mailto:support@zendfi.tech)
- [View API docs](../api/payments)
