---
sidebar_position: 2
title: CLI
description: Command-line tools for ZendFi development
---

# ZendFi CLI

Command-line tools for managing your ZendFi integration, scaffolding projects, and testing payments.

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

Status: Confirmed ✅
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


## Smart Payments

Smart payments automatically apply optimizations like PPP pricing and agent sessions:

```bash
# Create smart payment
zendfi smart create \
  --amount 99.99 \
  --wallet Hx7B...abc \
  --country BR \
  --ppp

# Simulate smart payment (preview pricing)
zendfi smart simulate --amount 99.99 --country BR
```

**Options:**
- `--amount <number>` - Amount in USD
- `--wallet <address>` - Payer wallet address
- `--merchant <id>` - Merchant ID
- `--description <text>` - Payment description
- `--country <code>` - 2-letter country code for PPP
- `--ppp` - Enable PPP pricing
- `--agent-id <id>` - Agent ID for session payments
- `--use-session` - Use existing agent session


## Payment Intents

Two-phase payment flow for complex scenarios:

```bash
# Create a payment intent
zendfi intents create --amount 99.99

# List all intents
zendfi intents list

# Get intent details
zendfi intents get <intent-id>

# Confirm an intent
zendfi intents confirm <intent-id> --wallet Hx7B...abc

# Cancel an intent
zendfi intents cancel <intent-id>
```

**Create Options:**
- `--amount <number>` - Amount in USD
- `--currency <code>` - Currency code (default: USD)
- `--description <text>` - Payment description
- `--capture <method>` - Capture method: automatic or manual


## PPP Pricing

Purchasing Power Parity pricing tools:

```bash
# Get PPP factor for a country
zendfi ppp check BR --price 99.99

# List all PPP factors
zendfi ppp factors --sort discount

# Calculate localized price
zendfi ppp calculate --price 99.99 --country BR
```

**Output:**
```
🌍 PPP Factor Lookup

  🇧🇷 Brazil (BR)
  PPP Factor: 0.35
  Discount: 65%
  
  Original Price: $99.99
  Localized Price: $35.00
```


## Autonomous Delegation

Enable autonomous signing for session keys:

```bash
# Enable autonomy
zendfi autonomy enable \
  --wallet Hx7B...abc \
  --agent-id my-agent \
  --max-per-day 100 \
  --max-per-transaction 25 \
  --duration 24

# Check status
zendfi autonomy status <wallet-address>

# Revoke delegation
zendfi autonomy revoke <delegate-id>

# List all delegates
zendfi autonomy delegates --wallet Hx7B...abc
```

**Enable Options:**
- `--wallet <address>` - User Solana wallet address
- `--agent-id <id>` - Agent identifier
- `--max-per-day <amount>` - Max spending per day in USD
- `--max-per-transaction <amount>` - Max per transaction in USD
- `--duration <hours>` - Delegation duration in hours
- `--merchants <ids>` - Comma-separated allowed merchant IDs
- `--categories <names>` - Comma-separated allowed categories


## AI Agent Features

:::tip Optional Features
These commands are for building AI agents. Most users won't need them. [Learn more about AI payments →](/agentic)
:::

### Agent API Keys

```bash
# Create an AI agent API key
zendfi ai keys create \
  --name "Shopping Bot" \
  --agent-id shopping-assistant \
  --scopes create_payments,read_analytics

# List all agent keys
zendfi ai keys list

# Revoke an agent key
zendfi ai keys revoke <key-id>
```

**Create Options:**
- `--name <name>` - Agent name
- `--agent-id <id>` - Unique agent identifier
- `--scopes <scopes>` - Comma-separated scopes
- `--rate-limit <limit>` - Rate limit per hour

### Agent Sessions

```bash
# Create session with spending limits
zendfi ai sessions create \
  --agent-id shopping-bot \
  --wallet Hx7B...abc \
  --max-per-day 100 \
  --max-per-transaction 25 \
  --duration 24

# List all sessions
zendfi ai sessions list

# Get session details
zendfi ai sessions get <session-id>

# Revoke a session
zendfi ai sessions revoke <session-id>
```

**Create Options:**
- `--agent-id <id>` - Agent identifier
- `--wallet <address>` - User Solana wallet address
- `--max-per-day <amount>` - Max spending per day in USD
- `--max-per-transaction <amount>` - Max per transaction in USD
- `--duration <hours>` - Session duration in hours

### Agent Analytics

```bash
# View agent analytics and metrics
zendfi ai analytics
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
  
Smart Payments:
  smart create              Create smart payment with optimizations
  smart simulate            Simulate smart payment (preview pricing)
  
Payment Intents:
  intents create            Create payment intent
  intents list              List all intents
  intents get <id>          Get intent details
  intents confirm <id>      Confirm payment intent
  intents cancel <id>       Cancel payment intent

PPP Pricing:
  ppp check <country>       Check PPP pricing for country
  ppp factors               List all PPP factors
  ppp calculate             Calculate localized price

Autonomous Delegation:
  autonomy enable           Enable autonomous delegation
  autonomy status <wallet>  Check autonomy status
  autonomy revoke <id>      Revoke delegation
  autonomy delegates        List all delegates
  
AI Features (Optional):
  ai keys create            Create AI agent API key
  ai keys list              List agent keys
  ai keys revoke <id>       Revoke agent key
  ai sessions create        Create agent session with limits
  ai sessions list          List all sessions
  ai sessions get <id>      Get session details
  ai sessions revoke <id>   Revoke session
  ai analytics              View agent analytics

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
zendfi ai --help
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
