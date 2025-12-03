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
npm install -g @zendfi/cli

# yarn
yarn global add @zendfi/cli

# pnpm
pnpm add -g @zendfi/cli

# Verify installation
zendfi --version
```

---

## Authentication

### Login

```bash
zendfi login
```

This opens a browser window for authentication. After logging in, your credentials are stored securely.

### Login with API Key

```bash
zendfi login --api-key zfi_live_abc123...
```

### Check Authentication

```bash
zendfi whoami
# Output: Logged in as: merchant@example.com (merchant_abc123)
```

### Logout

```bash
zendfi logout
```

---

## Project Scaffolding

### Create New Project

```bash
zendfi init
```

Interactive prompts guide you through project setup:

```
? What type of project? (Use arrow keys)
❯ Next.js E-commerce
  Express API Server
  React Checkout
  Python Flask
  Custom (Manual setup)

? Include examples? Yes
? Configure webhooks? Yes
? Set up test environment? Yes

✔ Created project structure
✔ Installed dependencies
✔ Configured environment
✔ Set up webhook endpoint

🚀 Ready! Run: cd my-zendfi-app && npm run dev
```

### Templates

```bash
# Specific template
zendfi init --template nextjs-store

# List available templates
zendfi templates list

# Available templates:
# - nextjs-store        Next.js e-commerce with checkout
# - express-api         Express.js API server
# - react-checkout      React payment components
# - flask-webhooks      Python Flask webhook handler
# - fastapi-webhooks    Python FastAPI webhook handler
```

### Options

```bash
zendfi init my-project \
  --template nextjs-store \
  --package-manager pnpm \
  --typescript \
  --git
```

---

## Payments

### Create Payment

```bash
zendfi payments create \
  --amount 99.99 \
  --currency USD \
  --description "Test payment"
```

Output:

```
✔ Payment created

Payment ID:    pay_xyz789abc123
Amount:        $99.99 USD
Status:        pending
Payment URL:   https://zendfi.tech/pay/pay_xyz789abc123

QR Code: (scan with mobile wallet)
█████████████████████████
██ ▄▄▄▄▄ ██▄▄▄██ ▄▄▄▄▄ ██
██ █   █ █ ▄▄ ▄█ █   █ ██
...
```

### Get Payment

```bash
zendfi payments get pay_xyz789abc123
```

### List Payments

```bash
# Recent payments
zendfi payments list

# With filters
zendfi payments list --status completed --limit 10

# Output as JSON
zendfi payments list --json
```

### Watch Payment

```bash
zendfi payments watch pay_xyz789abc123
```

This watches the payment in real-time and notifies when status changes:

```
Watching payment pay_xyz789abc123...
Status: pending ⏳

[15:30:05] Status changed: pending → completed ✅
Transaction: 5K2Nz7J8H2gK...

Payment complete! 🎉
```

---

## Subscriptions

### Create Plan

```bash
zendfi plans create \
  --name "Pro Monthly" \
  --amount 29.99 \
  --interval monthly \
  --trial-days 14
```

### List Plans

```bash
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
