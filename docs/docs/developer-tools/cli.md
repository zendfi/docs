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

---

## Authentication

Set your API key as an environment variable:

```bash
export ZENDFI_API_KEY=zfi_test_your_key_here
```

Or create a `.env` file in your project:

```env
ZENDFI_API_KEY=zfi_test_your_key_here
```

---

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

---

## Testing Payments

### Create Test Payment

```bash
# Interactive mode
zendfi test payment

# Quick test payment
zendfi test payment --amount 50

# Full options
zendfi test payment \
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

### Check Payment Status

```bash
zendfi status pay_test_abc123xyz
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
```

---

## Webhooks

### Listen for Webhooks

Forward webhooks to your local machine during development:

```bash
# Listen on default port (3000)
zendfi webhooks listen

# Forward to specific endpoint
zendfi webhooks listen --forward-to http://localhost:3000/api/webhooks
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

---

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

---

## Agentic Intent Protocol Commands

### Agent Keys & Sessions

```bash
# Create an agent API key
zendfi agent keys create

# With options
zendfi agent keys create --name "Shopping Bot" --agent-id shopping-v1

# List all agent keys
zendfi agent keys list

# Revoke an agent key
zendfi agent keys revoke <key-id>

# Create session with spending limits
zendfi agent sessions create \
  --agent-id shopping-v1 \
  --wallet Hx7B...abc \
  --max-per-day 100 \
  --max-per-transaction 25 \
  --duration 24

# List all sessions
zendfi agent sessions list

# Revoke a session
zendfi agent sessions revoke <session-id>

# View agent analytics
zendfi agent analytics
```

### Payment Intents

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

### PPP Pricing

```bash
# Get PPP factor for a country
zendfi ppp check BR

# Check with price calculation
zendfi ppp check BR --price 99.99

# List all PPP factors
zendfi ppp factors

# Sort by discount percentage
zendfi ppp factors --sort discount

# Calculate localized price
zendfi ppp calculate --price 99.99 --country IN
```

**Output:**
```
🌍 PPP Factor Lookup

  🇧🇷 Brazil (BR)

  PPP Factor:       0.35
  Discount:         65%
  Local Currency:   BRL

  Example: $100 → $35.00
```

### Autonomous Delegation

```bash
# Enable autonomy interactively
zendfi autonomy enable

# With options
zendfi autonomy enable \
  --wallet Hx7B...abc \
  --agent-id shopping-v1 \
  --max-per-day 100 \
  --max-per-transaction 25 \
  --duration 24

# Check autonomy status
zendfi autonomy status <wallet-address>

# List all delegates
zendfi autonomy delegates

# Revoke delegation
zendfi autonomy revoke <delegate-id>
```

### Smart Payments

```bash
# Create a smart payment
zendfi smart create \
  --amount 99.99 \
  --wallet Hx7B...abc \
  --country BR \
  --ppp

# Simulate pricing (no actual payment)
zendfi smart simulate --amount 99.99 --country BR
```

---

## Command Reference

```
zendfi [command] [options]

Commands:
  init                  Add ZendFi to an existing project
  test payment          Create test payments
  status <payment-id>   Check payment status
  webhooks listen       Forward webhooks locally
  keys                  Manage API keys
  
  # Agentic Intent Protocol
  agent keys            Manage agent API keys
  agent sessions        Manage agent sessions
  agent analytics       View agent metrics
  intents               Payment intent management
  ppp                   PPP pricing commands
  autonomy              Autonomous delegation
  smart                 Smart payments

Options:
  --version             Show version number
  --help                Show help
```

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| `ZENDFI_API_KEY` | API key for authentication |
| `ZENDFI_API_URL` | Custom API URL (optional) |

---

## Next Steps

- [SDKs](/developer-tools/sdks) - Integrate ZendFi in your application
- [Webhooks](/features/webhooks) - Set up event notifications
- [Agentic Payments](/agentic-payments) - AI agent payment capabilities
zendfi plans list
```

### Create Subscription

```bash
zendfi subscriptions create \
  --plan plan_abc123 \
  --customer-wallet 7xKXtg...
```

---

## Webhooks

### List Webhooks

```bash
zendfi webhooks list
```

### Create Webhook

```bash
zendfi webhooks create \
  --url https://myapp.com/webhooks/zendfi \
  --events payment.completed subscription.renewed
```

### Test Webhook

```bash
# Send test event to your webhook
zendfi webhooks test wh_abc123 --event payment.completed
```

### Webhook Logs

```bash
zendfi webhooks logs wh_abc123
```

### Local Webhook Development

Forward webhooks to your local machine:

```bash
zendfi webhooks listen
```

Output:

```
Forwarding webhooks to localhost:3000/webhooks/zendfi
Webhook URL for testing: https://hooks.zendfi.dev/abc123xyz

Ready! Listening for events...

[15:30:05] payment.completed → 200 OK (145ms)
[15:30:10] subscription.renewed → 200 OK (98ms)
```

:::tip Local Development
Use `zendfi webhooks listen` during development to receive webhooks without deploying your app!
:::

---

## Testing

### Test Mode

```bash
# Switch to test environment
zendfi config set environment test

# Or use --test flag
zendfi payments create --amount 10 --test
```

### Simulate Events

```bash
# Simulate a payment completion
zendfi test simulate payment.completed

# Simulate subscription events
zendfi test simulate subscription.renewed --subscription sub_abc123

# Simulate webhook delivery
zendfi test webhook payment.completed --url http://localhost:3000/webhooks
```

### Test Cards/Wallets

```bash
# Get test wallet addresses
zendfi test wallets

# Output:
# Test Wallets (Devnet):
# - Success: TestSuccessWallet111111111111111111
# - Failure: TestFailureWallet111111111111111111
# - Slow: TestSlowWallet1111111111111111111111
```

---

## Configuration

### View Configuration

```bash
zendfi config list
```

### Set Configuration

```bash
# Set default environment
zendfi config set environment production

# Set default output format
zendfi config set format json

# Set custom API URL (rare)
zendfi config set api-url https://api.zendfi.tech
```

### Environment Variables

The CLI respects these environment variables:

| Variable | Description |
|----------|-------------|
| `ZENDFI_API_KEY` | API key for authentication |
| `ZENDFI_ENVIRONMENT` | `production` or `test` |
| `ZENDFI_API_URL` | Custom API URL |

---

## API Keys

### List API Keys

```bash
zendfi keys list
```

### Create API Key

```bash
zendfi keys create --name "Production Server"
```

### Revoke API Key

```bash
zendfi keys revoke zfi_live_abc123...
```

---

## Output Formats

### JSON Output

```bash
zendfi payments list --json
```

### Table Output (Default)

```bash
zendfi payments list --table
```

### Quiet Mode

```bash
# Only output the payment ID
zendfi payments create --amount 10 --quiet
# Output: pay_xyz789abc123
```

### Verbose Mode

```bash
zendfi payments create --amount 10 --verbose
```

---

## Shell Completion

### Bash

```bash
zendfi completion bash >> ~/.bashrc
source ~/.bashrc
```

### Zsh

```bash
zendfi completion zsh >> ~/.zshrc
source ~/.zshrc
```

### Fish

```bash
zendfi completion fish > ~/.config/fish/completions/zendfi.fish
```

---

## Command Reference

```
zendfi [command] [options]

Commands:
  login                 Authenticate with ZendFi
  logout                Remove stored credentials
  whoami                Display current user info
  init                  Create a new ZendFi project
  
  payments              Manage payments
    create              Create a new payment
    get <id>            Get payment details
    list                List payments
    watch <id>          Watch payment status
    
  plans                 Manage subscription plans
    create              Create a subscription plan
    list                List plans
    get <id>            Get plan details
    
  subscriptions         Manage subscriptions
    create              Create a subscription
    list                List subscriptions
    cancel <id>         Cancel a subscription
    
  webhooks              Manage webhooks
    create              Create a webhook endpoint
    list                List webhooks
    test <id>           Send test event
    logs <id>           View webhook delivery logs
    listen              Forward webhooks locally
    
  keys                  Manage API keys
    create              Create a new API key
    list                List API keys
    revoke <key>        Revoke an API key
    
  config                Configure CLI settings
    list                List configuration
    set <key> <value>   Set configuration value
    
  test                  Testing utilities
    simulate <event>    Simulate an event
    wallets             List test wallets
    webhook <event>     Test webhook delivery

Options:
  --version             Show version number
  --help                Show help
  --json                Output as JSON
  --quiet               Minimal output
  --verbose             Detailed output
  --test                Use test environment
```

---

## Troubleshooting

### Reset CLI

```bash
zendfi reset
```

### Debug Mode

```bash
DEBUG=zendfi* zendfi payments list
```

### Check Connectivity

```bash
zendfi doctor

# Output:
# ✔ API reachable
# ✔ Authentication valid
# ✔ Webhook endpoint accessible
# ✔ CLI up to date
```

---

## Next Steps

- [SDKs](/developer-tools/sdks) - Integrate ZendFi in your application
- [Webhooks](/features/webhooks) - Set up event notifications
- [Payments API](/api/payments) - API reference
