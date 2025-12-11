---
title: PPP Pricing
description: Purchasing Power Parity for international agent markets
sidebar_position: 5
---

# PPP Pricing

Purchasing Power Parity (PPP) allows AI agents to serve international markets with localized pricing. Automatically adjust prices based on the customer's location and economic conditions.

## Overview

PPP pricing helps you:
- **Expand globally** - Reach customers in emerging markets
- **Maximize revenue** - Price appropriately for each market
- **Improve conversions** - Reduce cart abandonment from price sensitivity
- **Automate localization** - No manual price management needed

## How It Works

```typescript
import { zendfi } from '@zendfi/sdk';

// Get PPP-adjusted pricing
const pricing = await zendfi.ppp.getPrice({
  amount: 99.00,         // Base USD price
  country_code: 'BR',    // Customer's country
});

console.log(pricing);
// {
//   original_amount: 99.00,
//   adjusted_amount: 49.50,
//   discount_percent: 50,
//   country: 'Brazil',
//   country_code: 'BR',
//   tier: 'emerging'
// }
```

## PPP Tiers

Countries are grouped into pricing tiers based on economic data:

| Tier | Discount | Description | Examples |
|------|----------|-------------|----------|
| `premium` | 0% | Developed economies | US, UK, Germany, Japan |
| `standard` | 20% | Strong economies | Spain, Italy, South Korea |
| `growth` | 35% | Growing markets | Mexico, Poland, Chile |
| `emerging` | 50% | Emerging markets | Brazil, India, Indonesia |
| `developing` | 65% | Developing economies | Vietnam, Nigeria, Pakistan |

## Country List

### Premium Tier (0%)
```
US, CA, UK, DE, FR, JP, AU, CH, NL, SE, NO, DK, AT, FI, IE, SG, LU, BE
```

### Standard Tier (20%)
```
ES, IT, KR, PT, CZ, IL, NZ, AE, GR, TW, HK, SI
```

### Growth Tier (35%)
```
MX, PL, CL, HU, MY, TH, RO, AR, BG, HR
```

### Emerging Tier (50%)
```
BR, IN, ID, CO, ZA, TR, PE, UA, EG, PH
```

### Developing Tier (65%)
```
VN, NG, PK, BD, KE, ET, GH, TZ, UG, MM
```

## SDK Usage

### Get Adjusted Price

```typescript
const pricing = await zendfi.ppp.getPrice({
  amount: 99.00,
  country_code: 'IN',
});

// Create payment with adjusted amount
const payment = await zendfi.payments.create({
  amount: pricing.adjusted_amount,
  currency: 'USD',
  metadata: {
    ppp_applied: true,
    original_amount: pricing.original_amount,
    discount_percent: pricing.discount_percent,
    country: pricing.country,
  },
});
```

### Batch Pricing

```typescript
const prices = await zendfi.ppp.getBatchPrices({
  amount: 99.00,
  countries: ['US', 'BR', 'IN', 'DE', 'VN'],
});

prices.forEach(p => {
  console.log(`${p.country}: $${p.adjusted_amount} (${p.discount_percent}% off)`);
});
// United States: $99.00 (0% off)
// Brazil: $49.50 (50% off)
// India: $49.50 (50% off)
// Germany: $99.00 (0% off)
// Vietnam: $34.65 (65% off)
```

### Get Country Tier

```typescript
const tier = await zendfi.ppp.getTier('MX');
console.log(tier);
// {
//   country_code: 'MX',
//   country: 'Mexico',
//   tier: 'growth',
//   discount_percent: 35
// }
```

## CLI Commands

```bash
# Get PPP pricing for a country
zendfi ppp price --amount 99 --country BR
# Output:
# Country: Brazil (BR)
# Tier: emerging
# Original: $99.00
# Adjusted: $49.50 (50% discount)

# List all tiers
zendfi ppp tiers

# Get tier for a country
zendfi ppp tier IN

# Batch pricing
zendfi ppp price --amount 99 --countries US,BR,IN,DE,VN
```

## Integration with Agents

Agents can automatically apply PPP pricing:

```typescript
// Shopping agent with PPP support
const agent = await zendfi.agent.create({
  name: 'global-shop-agent',
  capabilities: ['ppp_pricing', 'payments'],
});

const session = await zendfi.agent.createSession({
  agent_id: agent.id,
  user_wallet: userWallet,
  ppp_enabled: true,           // Enable automatic PPP
  user_country: 'BR',          // User's country
  limits: {
    max_per_transaction: 100,  // Limits apply to adjusted prices
  },
});

// Agent creates payment - PPP applied automatically
const intent = await zendfi.intents.create({
  amount: 99.00,               // Base price
  session_token: session.token, // Session enables PPP
});

// Intent uses adjusted price
console.log(intent.amount); // 49.50 (50% discount for Brazil)
```

## Geo-Detection

You can auto-detect country from IP:

```typescript
const pricing = await zendfi.ppp.getPrice({
  amount: 99.00,
  ip_address: request.ip, // Detects country automatically
});
```

:::warning
IP-based detection is approximate. For accuracy, use explicit country codes when possible.
:::

## Custom Tiers

Set up custom pricing tiers for your business:

```typescript
// Dashboard or API configuration
await zendfi.ppp.setCustomTiers({
  merchant_id: 'your_merchant_id',
  tiers: {
    premium: { discount: 0, countries: ['US', 'CA', 'UK'] },
    standard: { discount: 15, countries: ['DE', 'FR', 'JP'] },
    growth: { discount: 30, countries: ['MX', 'BR', 'IN'] },
    // ... custom configuration
  },
});
```

## Minimum Prices

Set floor prices to ensure profitability:

```typescript
const pricing = await zendfi.ppp.getPrice({
  amount: 99.00,
  country_code: 'VN',
  minimum: 25.00, // Never go below $25
});

// Adjusted would be $34.65 (65% off)
// But if that's below minimum, returns $25.00
```

## API Reference

### Get PPP Price

```bash
curl "https://api.zend.fi/api/v1/ai/ppp/price?amount=99&country=BR" \
  -H "Authorization: Bearer $API_KEY"
```

**Response:**
```json
{
  "original_amount": 99.00,
  "adjusted_amount": 49.50,
  "discount_percent": 50,
  "country": "Brazil",
  "country_code": "BR",
  "tier": "emerging"
}
```

### List Tiers

```bash
curl "https://api.zend.fi/api/v1/ai/ppp/tiers" \
  -H "Authorization: Bearer $API_KEY"
```

### Get Country Tier

```bash
curl "https://api.zend.fi/api/v1/ai/ppp/tier/MX" \
  -H "Authorization: Bearer $API_KEY"
```

## Best Practices

1. **Display original price** - Show the discount clearly to users
2. **Verify country** - Use payment address to confirm location
3. **Set minimums** - Ensure prices cover your costs
4. **Track metrics** - Monitor conversion rates by region
5. **Test markets** - A/B test discount levels

## Fraud Prevention

PPP can be exploited with VPNs. Protect yourself:

```typescript
const pricing = await zendfi.ppp.getPrice({
  amount: 99.00,
  country_code: 'BR',
  verify_with: 'payment_method', // Verify with payment location
  fraud_score_threshold: 0.7,    // Reject high-risk transactions
});
```

## Analytics

Track PPP performance in the dashboard:

- Revenue by country/tier
- Conversion rates with/without PPP
- Average discount applied
- Top markets by volume

## Next Steps

- [Agent Sessions](/agentic/sessions) - Session-based spending limits
- [Payment Intents](/agentic/payment-intents) - Two-phase payments
- [Smart Payments](/agentic/smart-payments) - AI-optimized transactions
