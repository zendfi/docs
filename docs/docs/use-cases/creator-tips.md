---
sidebar_position: 3
---

# Creator Tips & Donations

Accept crypto tips and donations for content creators, streamers, and open source projects.

## What You'll Build

- Simple tip jar widget
- One-time and recurring donations
- Custom tip amounts
- Supporter recognition
- Email thank-you messages
- Public supporter leaderboard

## Use Cases

- Twitch/YouTube streamers
- Podcast creators
- Open source maintainers
- Content creators
- NFT artists
- Community projects


## Quick Start: Embed a Tip Button

The fastest way to accept tips is to create a payment link and share it:

```typescript
import { ZendFi } from '@zendfi/sdk';

const zendfi = new ZendFi({
  apiKey: process.env.ZENDFI_API_KEY!,
  mode: 'live',
});

// Create a shareable tip link
const tipLink = await zendfi.createPaymentLink({
  amount: 5,
  currency: 'USD',
  token: 'USDC',
  description: 'Buy me a coffee!',
  metadata: {
    type: 'tip',
  },
});

// Share this URL:
console.log(tipLink.url); // https://checkout.zendfi.tech/checkout/ABC123
```

Add the link to:
- Twitch panel
- YouTube description
- Twitter bio
- Linktree
- Email signature


## Step 1: Create Payment Link

The simplest approach - no code required:

```typescript
// lib/zendfi.ts
import { ZendFi } from '@zendfi/sdk';

export const zendfi = new ZendFi({
  apiKey: process.env.ZENDFI_API_KEY!,
  mode: 'test', // or 'live'
});

// Create a reusable payment link
const tipLink = await zendfi.createPaymentLink({
  amount: 5, // Fixed $5 tip
  currency: 'USD',
  token: 'USDC', // Accept USDC stablecoin
  description: 'Tip for awesome content!',
  metadata: {
    creator: 'your_username',
    type: 'tip',
  },
});

// Share this URL anywhere
console.log(tipLink.url); // hosted_page_url
console.log(tipLink.link_code); // Use to track this link
```

**Share your link:**
- Twitch panel
- YouTube description
- Twitter bio
- Linktree
- Email signature


## Step 2: Custom Tip Page

Build a branded tip page with Next.js:

```typescript
// app/tip/[creator]/page.tsx
import { TipForm } from '@/components/TipForm';

export default function TipPage({ params }: { params: { creator: string } }) {
  return (
    <div className="tip-page">
      <img src={`/creators/${params.creator}/avatar.jpg`} alt={params.creator} />
      <h1>Support {params.creator}</h1>
      <p>Your support helps create more awesome content!</p>
      
      <TipForm creator={params.creator} />
    </div>
  );
}
```

```typescript
// components/TipForm.tsx
'use client';

import { useState } from 'react';

const PRESET_AMOUNTS = [5, 10, 25, 50, 100];

export function TipForm({ creator }: { creator: string }) {
  const [amount, setAmount] = useState(5);
  const [customAmount, setCustomAmount] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  
  async function handleTip() {
    setLoading(true);
    
    try {
      const res = await fetch('/api/create-tip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          creator,
          amount: customAmount || amount,
          message,
        }),
      });
      
      const { paymentUrl } = await res.json();
      
      // Redirect to ZendFi checkout
      window.location.href = paymentUrl;
    } catch (error) {
      alert('Failed to create tip');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  
  return (
    <div className="tip-form">
      {/* Preset amounts */}
      <div className="preset-amounts">
        {PRESET_AMOUNTS.map((preset) => (
          <button
            key={preset}
            onClick={() => {
              setAmount(preset);
              setCustomAmount('');
            }}
            className={amount === preset && !customAmount ? 'active' : ''}
          >
            ${preset}
          </button>
        ))}
      </div>
      
      {/* Custom amount */}
      <div className="custom-amount">
        <label>Or enter custom amount:</label>
        <input
          type="number"
          min="1"
          placeholder="$"
          value={customAmount}
          onChange={(e) => setCustomAmount(e.target.value)}
        />
      </div>
      
      {/* Optional message */}
      <div className="message">
        <label>Leave a message (optional):</label>
        <textarea
          placeholder="Thanks for the great content!"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={280}
        />
      </div>
      
      <button onClick={handleTip} disabled={loading}>
        {loading ? 'Processing...' : `Tip $${customAmount || amount}`}
      </button>
    </div>
  );
}
```


## Step 3: Process Tips with Webhooks

```typescript
// app/api/create-tip/route.ts
import { zendfi } from '@/lib/zendfi';

export async function POST(request: Request) {
  const { creator, amount, message } = await request.json();
  
  const payment = await zendfi.createPayment({
    amount: parseFloat(amount),
    currency: 'USD',
    token: 'USDC',
    description: `Tip for ${creator}`,
    metadata: {
      creator,
      message,
      type: 'tip',
    },
    redirect_url: `${process.env.NEXT_PUBLIC_URL}/tip/success`,
  });
  
  return Response.json({ 
    paymentUrl: payment.checkout_url || payment.payment_url 
  });
}
```

```typescript
// app/api/webhooks/zendfi/route.ts
import { createNextWebhookHandler } from '@zendfi/sdk/next';
import { recordTip, sendThankYouEmail, notifyCreator } from '@/lib/tips';

export const POST = createNextWebhookHandler({
  secret: process.env.ZENDFI_WEBHOOK_SECRET!,
  handlers: {
    'PaymentConfirmed': async (payment) => {
      if (payment.metadata?.type !== 'tip') return;
      
      // Record tip in database
      const tip = await recordTip({
        creator: payment.metadata.creator,
        amount: payment.amount_usd || payment.amount,
        message: payment.metadata.message,
        currency: payment.currency || 'USD',
        transaction_signature: payment.transaction_signature,
        tipper: payment.customer_email || 'Anonymous',
      });
      
      // Send thank you to tipper
      if (payment.customer_email) {
        await sendThankYouEmail({
          to: payment.customer_email,
          creator: payment.metadata.creator,
          amount: payment.amount_usd || payment.amount,
          message: payment.metadata.message,
        });
      }
      
      // Notify creator
      await notifyCreator({
        creator: payment.metadata.creator,
        amount: payment.amount_usd || payment.amount,
        message: payment.metadata.message,
        tipper: payment.customer_email || 'Anonymous',
      });
    },
  },
});
```


## Step 4: Display Supporter Leaderboard

Show appreciation to your top supporters:

```typescript
// app/[creator]/supporters/page.tsx
import { getTopSupporters } from '@/lib/tips';

export default async function SupportersPage({ params }) {
  const supporters = await getTopSupporters(params.creator, 10);
  
  return (
    <div className="supporters-page">
      <h1>Top Supporters</h1>
      <p>Thank you to everyone who supports {params.creator}!</p>
      
      <div className="leaderboard">
        {supporters.map((supporter, index) => (
          <div key={supporter.id} className="supporter">
            <span className="rank">#{index + 1}</span>
            <span className="name">{supporter.name || 'Anonymous'}</span>
            <span className="amount">${supporter.totalAmount}</span>
            <span className="tips">{supporter.tipCount} tips</span>
          </div>
        ))}
      </div>
    </div>
  );
}
```


## Step 5: Add Recurring Donations

Let supporters set up monthly donations:

First, create a subscription plan:

```typescript
// Create subscription plan (run once)
const subscriptionPlan = await zendfi.createSubscriptionPlan({
  name: 'Monthly Supporter',
  description: 'Support this creator monthly',
  amount: 10,
  currency: 'USD',
  interval: 'monthly', // or 'daily', 'weekly', 'yearly'
  interval_count: 1,
  trial_days: 0,
  metadata: {
    creator: 'your_username',
  },
});

// Store plan_id for later use
console.log(subscriptionPlan.id);
```

Then let users subscribe:

```typescript
// components/RecurringDonation.tsx
'use client';

import { useState } from 'react';

export function RecurringDonation({ creator, planId }) {
  const [amount, setAmount] = useState(10);
  const [interval, setInterval] = useState<'monthly' | 'yearly'>('monthly');
  
  async function handleSubscribe() {
    const res = await fetch('/api/create-subscription', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        creator, 
        plan_id: planId,
        customer_email: 'supporter@example.com',
      }),
    });
    
    const { subscription_url } = await res.json();
    window.location.href = subscription_url;
  }
  
  return (
    <div className="recurring-donation">
      <h3>Become a monthly supporter</h3>
      
      <div className="amount-selector">
        <button onClick={() => setAmount(5)}>$5</button>
        <button onClick={() => setAmount(10)}>$10</button>
        <button onClick={() => setAmount(25)}>$25</button>
      </div>
      
      <div className="interval-selector">
        <label>
          <input
            type="radio"
            checked={interval === 'monthly'}
            onChange={() => setInterval('monthly')}
          />
          Monthly
        </label>
        <label>
          <input
            type="radio"
            checked={interval === 'yearly'}
            onChange={() => setInterval('yearly')}
          />
          Yearly (save 15%)
        </label>
      </div>
      
      <button onClick={handleSubscribe}>
        Support with ${amount}/{interval === 'monthly' ? 'mo' : 'yr'}
      </button>
    </div>
  );
}
```

Backend API route:

```typescript
// app/api/create-subscription/route.ts
import { zendfi } from '@/lib/zendfi';

export async function POST(request: Request) {
  const { creator, plan_id, customer_email } = await request.json();
  
  const subscription = await zendfi.createSubscription({
    plan_id,
    customer_email,
    metadata: {
      creator,
    },
  });
  
  return Response.json({ 
    subscription_url: subscription.payment_url,
    subscription_id: subscription.id,
  });
}
```


## Step 6: Stream Alerts Integration

Show live tip alerts during streams:

```typescript
// app/api/stream-alerts/route.ts
import { getRecentTips } from '@/lib/tips';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const creator = searchParams.get('creator');
  const since = searchParams.get('since'); // Timestamp
  
  // Get tips since last check (for polling)
  const newTips = await getRecentTips(creator, new Date(since));
  
  return Response.json({ tips: newTips });
}
```

**OBS Browser Source:**

```html
<!-- stream-alerts.html -->
<!DOCTYPE html>
<html>
<head>
  <style>
    .alert {
      position: fixed;
      top: 50px;
      right: 50px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 20px;
      border-radius: 10px;
      font-size: 24px;
      animation: slideIn 0.5s, slideOut 0.5s 4.5s;
    }
    
    @keyframes slideIn {
      from { transform: translateX(400px); }
      to { transform: translateX(0); }
    }
    
    @keyframes slideOut {
      from { transform: translateX(0); }
      to { transform: translateX(400px); }
    }
  </style>
</head>
<body>
  <script>
    const CREATOR = 'your_username';
    let lastCheck = Date.now();
    
    async function checkForTips() {
      const res = await fetch(
        `/api/stream-alerts?creator=${CREATOR}&since=${lastCheck}`
      );
      const { tips } = await res.json();
      
      tips.forEach(tip => showAlert(tip));
      lastCheck = Date.now();
    }
    
    function showAlert(tip) {
      const alert = document.createElement('div');
      alert.className = 'alert';
      alert.innerHTML = `
        <div>💰 ${tip.tipper} tipped $${tip.amount}!</div>
        ${tip.message ? `<div>"${tip.message}"</div>` : ''}
      `;
      document.body.appendChild(alert);
      
      setTimeout(() => alert.remove(), 5000);
    }
    
    setInterval(checkForTips, 5000); // Check every 5 seconds
  </script>
</body>
</html>
```


## Customization Ideas

### Goal Progress Bar

```typescript
export function GoalProgress({ creator, goalAmount }) {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    fetch(`/api/goal-progress?creator=${creator}`)
      .then(res => res.json())
      .then(data => setProgress(data.totalRaised));
  }, [creator]);
  
  const percentage = (progress / goalAmount) * 100;
  
  return (
    <div className="goal-progress">
      <h3>Goal: ${goalAmount}</h3>
      <progress value={progress} max={goalAmount} />
      <p>${progress} raised ({percentage.toFixed(0)}%)</p>
    </div>
  );
}
```

### Thank You Wall

Display messages from supporters on your website:

```typescript
export async function ThankYouWall({ creator }) {
  const recentTips = await getRecentTips(creator, 10);
  
  return (
    <div className="thank-you-wall">
      {recentTips.map(tip => (
        <div key={tip.id} className="tip-card">
          <span className="amount">${tip.amount}</span>
          <span className="tipper">{tip.tipper}</span>
          {tip.message && <p>"{tip.message}"</p>}
          <span className="time">{formatDistanceToNow(tip.createdAt)}</span>
        </div>
      ))}
    </div>
  );
}
```


## Testing

### Create Test Payment Link

```typescript
import { ZendFi } from '@zendfi/sdk';

const zendfi = new ZendFi({
  apiKey: process.env.ZENDFI_API_KEY!,
  mode: 'test', // Use test mode
});

// Create tip link
const tipLink = await zendfi.createPaymentLink({
  amount: 5,
  currency: 'USD',
  token: 'USDC',
  description: 'Test tip',
  metadata: {
    creator: 'test_creator',
    type: 'tip',
  },
});

console.log('Tip URL:', tipLink.url);
console.log('Link code:', tipLink.link_code);
```

### Test Webhook Handler

```bash
# Use webhook tester or ngrok
ngrok http 3000

# Update webhook URL in ZendFi dashboard
# Make a test payment and check your logs
```

### Verify Payment

```typescript
// Get payment by ID
const payment = await zendfi.getPayment('payment_id');
console.log('Payment status:', payment.status);
console.log('Amount:', payment.amount_usd);
```


## Production Tips

- **Accept multiple tokens**: USDC, USDT, SOL
- **Add social sharing**: "I just tipped @creator!"
- **Send thank you emails**: Use the webhook to trigger emails
- **Create supporter tiers**: Bronze ($10+), Silver ($50+), Gold ($100+)
- **Offer perks**: Shoutouts, exclusive content, early access
- **Display top supporters**: Public leaderboard
- **Set up stream alerts**: Show live notifications during streams
- **Add "Thank you" videos**: For large tips ($50+)
- **Monitor metrics**: Track tip frequency and amounts
- **Tax compliance**: Keep records for tax reporting


## Learn More

- [Payment Links API](../api/payment-links.md)
- [Payments API](../api/payments.md)
- [Subscriptions API](../api/subscriptions.md)
- [Webhooks](../features/webhooks.md)


## Need Help?

- [Join Discord](https://discord.gg/zendfi)
- [Email support](mailto:support@zendfi.tech)
- [Book a demo](https://zendfi.tech/demo)
