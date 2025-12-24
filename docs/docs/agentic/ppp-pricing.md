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

// Get PPP factor for a country
const factor = await zendfi.pricing.getPPPFactor('BR');

console.log(factor);
// {
//   country_code: 'BR',
//   country_name: 'Brazil',
//   ppp_factor: 0.55,
//   currency_code: 'BRL',
//   adjustment_percentage: 55.0
// }

// Calculate adjusted price
const basePrice = 99.00;
const adjustedPrice = basePrice * factor.ppp_factor; // 99 * 0.55 = $54.45
```

## How PPP Works

Each country has a PPP factor (0.0 to 1.3+) that represents its purchasing power relative to the United States:

- **1.0** = Same as US prices (baseline)
- **> 1.0** = Higher purchasing power (Switzerland: 1.30, Norway: 1.25)
- **< 1.0** = Lower purchasing power (India: 0.28, Brazil: 0.55)

**Examples:**
- United States: 1.00 (baseline)
- Switzerland: 1.30 (30% higher)
- Brazil: 0.55 (45% lower)
- India: 0.28 (72% lower)

Multiply your base price by the PPP factor to get the localized price

## Supported Countries

ZendFi supports PPP pricing for 50+ countries. Use `zendfi ppp factors` to see the complete list.

**Sample PPP factors:**
- 🇨🇭 Switzerland: 1.30 (30% premium)
- 🇳🇴 Norway: 1.25
- 🇺🇸 United States: 1.00 (baseline)
- 🇩🇪 Germany: 0.98
- 🇧🇷 Brazil: 0.55
- 🇲🇽 Mexico: 0.50
- 🇻🇳 Vietnam: 0.33
- 🇮🇳 India: 0.28

## SDK Usage

### Get PPP Factor

```typescript
const factor = await zendfi.pricing.getPPPFactor('IN');

console.log(factor);
// {
//   country_code: 'IN',
//   country_name: 'India',
//   ppp_factor: 0.28,
//   currency_code: 'INR',
//   adjustment_percentage: 28.0
// }

// Calculate adjusted price
const basePrice = 99.00;
const adjustedPrice = basePrice * factor.ppp_factor; // $27.72

// Create payment with adjusted amount
const payment = await zendfi.payments.create({
  amount: adjustedPrice,
  currency: 'USD',
  metadata: {
    ppp_applied: true,
    original_amount: basePrice,
    ppp_factor: factor.ppp_factor,
    country: factor.country_name,
  },
});
```

### List All Factors

```typescript
const factors = await zendfi.pricing.listFactors();

factors.forEach(f => {
  console.log(`${f.country_name}: factor ${f.ppp_factor.toFixed(2)}`);
});
// United States: factor 1.00
// Brazil: factor 0.55
// India: factor 0.28
// Germany: factor 0.98
// Vietnam: factor 0.33
```

### Calculate Local Price

```typescript
const result = await zendfi.pricing.calculateLocalPrice(99.00, 'BR');

console.log(result);
// {
//   original: 99.00,
//   adjusted: 54.45,
//   savings: 44.55,
//   discount_percentage: 55.0,
//   country: 'Brazil',
//   ppp_factor: 0.55
// }
```

## CLI Commands

```bash
# Get PPP factor for a country
zendfi ppp check BR
# Output:
# Country: Brazil (BR)
# PPP Factor: 0.55
# Currency: BRL
# Adjustment: 55% of US price

# Get PPP factor with price calculation
zendfi ppp check BR --price 99
# Adjusted Price: $54.45

# List all PPP factors
zendfi ppp factors
zendfi ppp factors --sort discount

# Calculate localized price
zendfi ppp calculate --price 99 --country BR
```

## Integration with AI Pricing

Use AI-powered pricing suggestions that automatically apply PPP:

```typescript
const suggestion = await zendfi.pricing.getSuggestion({
  agent_id: 'shopping-assistant',
  base_price: 99.99,
  user_profile: {
    location_country: 'BR',  // User's country
    wallet: userWallet,
  },
  ppp_config: {
    enabled: true,
    floor_price: 29.99,          // Never go below $29.99
    max_discount_percent: 60,     // Cap discount at 60%
  },
});

console.log(suggestion);
// {
//   suggested_amount: 54.99,
//   min_amount: 29.99,
//   max_amount: 299.97,
//   currency: 'USD',
//   reasoning: 'Price adjusted for Brazil purchasing power parity (55% of US baseline)',
//   ppp_adjusted: true,
//   adjustment_factor: 0.55
// }
```

## Using PPP with Payments

Calculate localized pricing before creating payments:

```typescript
// Get user's country (from your application)
const userCountry = 'IN'; // Could come from IP, user profile, etc.

// Get PPP factor
const factor = await zendfi.pricing.getPPPFactor(userCountry);

// Calculate adjusted price
const basePrice = 99.99;
const localPrice = basePrice * factor.ppp_factor;

// Create payment with adjusted price
const payment = await zendfi.payments.create({
  amount: localPrice,
  currency: 'USD',
  metadata: {
    base_price: basePrice,
    ppp_factor: factor.ppp_factor,
    country: factor.country_name,
  },
});
```

## Pricing Configuration

Control PPP adjustments with `ppp_config`:

```typescript
const suggestion = await zendfi.pricing.getSuggestion({
  agent_id: 'my-agent',
  base_price: 99.99,
  user_profile: { location_country: 'VN' },
  ppp_config: {
    enabled: true,
    floor_price: 25.00,          // Minimum price
    ceiling_price: 199.99,        // Maximum price
    min_factor: 0.30,            // Don't go below 30% of base
    max_factor: 1.50,            // Don't go above 150% of base
    max_discount_percent: 60,     // Cap discount at 60%
    extra_discount_percent: 5,    // Add extra 5% discount
  },
});
```

## API Reference

### Get PPP Factor

```bash
curl "https://api.zendfi.tech/api/v1/ai/pricing/ppp-factor" \
  -X POST \
  -H "Authorization: Bearer $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"country_code": "BR"}'
```

**Response:**
```json
{
  "country_code": "BR",
  "country_name": "Brazil",
  "ppp_factor": 0.55,
  "currency_code": "BRL",
  "adjustment_percentage": 55.0
}
```

### List All Factors

```bash
curl "https://api.zendfi.tech/api/v1/ai/pricing/ppp-factors" \
  -H "Authorization: Bearer $API_KEY"
```

### Get Pricing Suggestion

```bash
curl "https://api.zendfi.tech/api/v1/ai/pricing/suggest" \
  -X POST \
  -H "Authorization: Bearer $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "agent_id": "shopping-bot",
    "base_price": 99.99,
    "user_profile": {"location_country": "BR"},
    "ppp_config": {"enabled": true}
  }'
```

## Best Practices

1. **Store PPP factors** - Cache factors to reduce API calls
2. **Display original price** - Show the discount clearly to users
3. **Set minimums** - Use `floor_price` to ensure profitability
4. **Verify country** - Get country from user profile or billing address
5. **Monitor conversions** - Track conversion rates by country

## Example: E-Commerce Integration

```typescript
// In your checkout flow
async function getLocalizedPrice(basePrice: number, userCountry: string) {
  try {
    const factor = await zendfi.pricing.getPPPFactor(userCountry);
    const localPrice = basePrice * factor.ppp_factor;
    
    return {
      original: basePrice,
      local: localPrice,
      savings: basePrice - localPrice,
      country: factor.country_name,
      factor: factor.ppp_factor,
    };
  } catch (error) {
    // Fallback to base price if PPP lookup fails
    return {
      original: basePrice,
      local: basePrice,
      savings: 0,
      country: userCountry,
      factor: 1.0,
    };
  }
}
```

## Next Steps

- [Agent Sessions](/agentic/sessions) - Session-based spending limits
- [Payment Intents](/agentic/payment-intents) - Two-phase payments
- [Smart Payments](/agentic/smart-payments) - AI-optimized transactions
