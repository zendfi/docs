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

The fastest way to accept tips - just 3 lines of code:

```html
<!-- Add to your website, Twitch panel, or Linktree -->
<script src="https://cdn.zendfi.tech/widget.js"></script>
<button 
  data-zendfi-tip
  data-amount="5"
  data-creator="your_username"
>
  ☕ Buy me a coffee ($5)
</button>
```

That's it! Clicking the button opens a payment page.


## Step 1: Create Payment Link

The simplest approach - no code required:

```typescript
// lib/zendfi.ts
import { ZendFi } from '@zendfi/sdk';

export const zendfi = new ZendFi();

// Create a reusable payment link
const tipLink = await zendfi.paymentLinks.create({
  amount: 5, // Fixed $5 tip
  description: 'Tip for awesome content!',
  allowCustomAmount: true, // Let supporters choose amount
  minAmount: 1,
  maxAmount: 100,
  successMessage: 'Thank you for your support! 🙏',
  metadata: {
    creator: 'your_username',
    type: 'tip',
  },
});

console.log(tipLink.url); // Share this URL anywhere
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
      window.location.href = paymentUrl;
    } catch (error) {
      alert('Failed to create tip');
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
  
  const payment = await zendfi.payments.create({
    amount: parseFloat(amount),
    description: `Tip for ${creator}`,
    metadata: {
      creator,
      message,
      type: 'tip',
    },
    successUrl: `${process.env.NEXT_PUBLIC_URL}/tip/success`,
  });
  
  return Response.json({ paymentUrl: payment.paymentUrl });
}
```

```typescript
// app/api/webhooks/zendfi/route.ts
import { createNextWebhookHandler } from '@zendfi/sdk/nextjs';
import { recordTip, sendThankYouEmail, notifyCreator } from '@/lib/tips';

export const POST = createNextWebhookHandler({
  secret: process.env.ZENDFI_WEBHOOK_SECRET!,
  handlers: {
    'payment.confirmed': async (payment) => {
      if (payment.metadata.type !== 'tip') return;
      
      // Record tip in database
      const tip = await recordTip({
        creator: payment.metadata.creator,
        amount: payment.amount,
        message: payment.metadata.message,
        currency: payment.currency,
        transactionHash: payment.transactionHash,
        tipper: payment.email || 'Anonymous',
      });
      
      // Send thank you to tipper
      if (payment.email) {
        await sendThankYouEmail({
          to: payment.email,
          creator: payment.metadata.creator,
          amount: payment.amount,
          message: payment.metadata.message,
        });
      }
      
      // Notify creator
      await notifyCreator({
        creator: payment.metadata.creator,
        amount: payment.amount,
        message: payment.metadata.message,
        tipper: payment.email || 'Anonymous',
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

```typescript
// components/RecurringDonation.tsx
'use client';

import { useState } from 'react';

export function RecurringDonation({ creator }) {
  const [amount, setAmount] = useState(10);
  const [interval, setInterval] = useState<'monthly' | 'yearly'>('monthly');
  
  async function handleSubscribe() {
    const res = await fetch('/api/create-subscription', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ creator, amount, interval }),
    });
    
    const { subscriptionUrl } = await res.json();
    window.location.href = subscriptionUrl;
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

```bash
# Create test tip
zendfi payment create --amount 5 --description "Test tip" --open

# Listen for tip webhooks
zendfi webhooks listen
```


## Production Tips

- Add social sharing ("I just tipped @creator!")
- Send thank you emails automatically
- Create supporter tiers (Bronze, Silver, Gold)
- Offer perks for recurring supporters
- Display top supporters prominently
- Set up stream alerts for live notifications
- Add "Thank you" videos for large tips


## Complete Example

```bash
npx create-zendfi-app tip-page --template nextjs-ecommerce
# Customize for tips
```


## Need Help?

- [Join Discord](https://discord.gg/zendfi)
- [Email support](mailto:support@zendfi.tech)
- [View Payment Links API](https://docs.zendfi.tech/api/payment-links)
