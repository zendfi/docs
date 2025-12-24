---
sidebar_position: 4
---

# AI Shopping Bot

Build an AI agent that can autonomously make purchases on behalf of users.

:::info
**This is an advanced use case** that uses ZendFi's AI-ready features. For traditional e-commerce, see the [E-commerce Store guide](./ecommerce-store.md).
:::

## What You'll Build

- AI agent with spending permissions
- Session-based spending limits
- User-approved autonomous purchases
- Real-time purchase notifications
- Automatic order fulfillment

## Real-World Example

**Scenario:** A user wants an AI assistant to automatically restock their favorite snacks when inventory runs low, without asking each time.

```
User: "Keep my pantry stocked with coffee. Budget: $50/month, max $15 per order."
AI: "Got it! I'll monitor your coffee inventory and reorder when needed."

[2 weeks later, AI detects low inventory]
AI: *Autonomously purchases 2lb coffee bag for $14.99*
User: *Receives notification* "✅ Coffee restocked. $14.99 charged."
```


## Step 1: Understanding the Flow

```mermaid
graph TD
    A[User] -->|1. Grant spending authority| B[Create Session]
    B -->|2. Set limits| C[AI Agent]
    C -->|3. Check inventory| D{Need restock?}
    D -->|Yes| E[Create Payment]
    E -->|4. Auto-approve| F[Process Order]
    F -->|5. Notify user| A
    D -->|No| C
```


## Step 2: Grant AI Spending Permission

First, the user grants the AI agent permission to spend on their behalf:

```typescript
// app/api/ai/create-session/route.ts
import { zendfi } from '@/lib/zendfi';
import { getServerSession } from 'next-auth';

export async function POST(request: Request) {
  const session = await getServerSession();
  if (!session?.user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  const { 
    agent_id,
    max_per_transaction, 
    max_per_day,
    max_per_month,
    duration_hours,
  } = await request.json();
  
  // Create AI agent session with spending limits
  const agentSession = await zendfi.agent.createSession({
    agent_id,
    agent_name: 'Shopping Bot',
    user_wallet: session.user.walletAddress, // REQUIRED
    limits: {
      max_per_transaction,
      max_per_day,
      max_per_month,
      require_approval_above: max_per_transaction * 0.8, // Optional: require approval for large purchases
    },
    duration_hours,
    metadata: {
      user_id: session.user.id,
      user_email: session.user.email,
      created_via: 'shopping-bot-ui',
    },
  });
  
  // Store session in your database for the AI to use
  await saveAgentSession({
    user_id: session.user.id,
    session_id: agentSession.id,
    session_token: agentSession.session_token, // Use this for API calls
    agent_id,
    limits: agentSession.limits,
    expires_at: agentSession.expires_at,
  });
  
  return Response.json({ 
    session_id: agentSession.id,
    session_token: agentSession.session_token,
    expires_at: agentSession.expires_at,
  });
}
```


## Step 3: User Interface for Granting Permission

```typescript
// components/AIShoppingSetup.tsx
'use client';

import { useState } from 'react';

export function AIShoppingSetup() {
  const [maxPerTransaction, setMaxPerTransaction] = useState(15);
  const [maxPerDay, setMaxPerDay] = useState(50);
  const [maxPerMonth, setMaxPerMonth] = useState(200);
  const [durationHours, setDurationHours] = useState(720); // 30 days in hours
  
  async function handleEnable() {
    const res = await fetch('/api/ai/create-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        agent_id: 'shopping-bot-v1',
        max_per_transaction: maxPerTransaction,
        max_per_day: maxPerDay,
        max_per_month: maxPerMonth,
        duration_hours: durationHours,
      }),
    });
    
    const { session_id, expires_at } = await res.json();
    alert(`AI shopping enabled! Session expires: ${new Date(expires_at).toLocaleDateString()}`);
  }
  
  return (
    <div className="ai-shopping-setup">
      <h2>🤖 Enable AI Shopping Assistant</h2>
      <p>Grant your AI assistant permission to make purchases on your behalf.</p>
      
      <div className="limits">
        <label>
          Max per transaction:
          <input
            type="number"
            value={maxPerTransaction}
            onChange={(e) => setMaxPerTransaction(Number(e.target.value))}
          />
        </label>
        
        <label>
          Max per day:
          <input
            type="number"
            value={maxPerDay}
            onChange={(e) => setMaxPerDay(Number(e.target.value))}
          />
        </label>
        
        <label>
          Max per month:
          <input
            type="number"
            value={maxPerMonth}
            onChange={(e) => setMaxPerMonth(Number(e.target.value))}
          />
        </label>
        
        <label>
          Session duration (days):
          <input
            type="number"
            value={durationHours / 24}
            onChange={(e) => setDurationHours(Number(e.target.value) * 24)}
          />
        </label>
      </div>
      
      <div className="safety-info">
        <h3>✅ Safety Features</h3>
        <ul>
          <li>Session expires automatically</li>
          <li>Strict spending limits enforced</li>
          <li>Real-time purchase notifications</li>
          <li>Revoke permission anytime</li>
        </ul>
      </div>
      
      <button onClick={handleEnable}>Enable AI Shopping</button>
    </div>
  );
}
```


## Step 4: AI Makes Autonomous Purchase

The AI agent can now make purchases without asking for approval each time:

```typescript
// AI agent code (runs on your server or AI platform)
import { ZendFi } from '@zendfi/sdk';

// Use agent API key (created via /api/v1/agent-keys)
const zendfi = new ZendFi({
  apiKey: process.env.ZENDFI_AGENT_API_KEY, // Agent key starts with "zai_"
  mode: 'test', // or 'live'
});

async function checkAndRestock(userId: string, productId: string) {
  // 1. Check inventory level (your business logic)
  const inventoryLevel = await checkInventory(userId, productId);
  
  if (inventoryLevel < RESTOCK_THRESHOLD) {
    // 2. Get product details
    const product = await getProduct(productId);
    
    // 3. Get user's AI session from your database
    const session = await getUserAgentSession(userId);
    
    // 4. Create smart payment using session token
    try {
      const payment = await zendfi.smart.execute({
        session_token: session.session_token, // Session validates spending limits
        agent_id: 'shopping-bot-v1',
        user_wallet: session.user_wallet,
        amount_usd: product.price,
        auto_detect_gasless: true, // ZendFi covers gas fees if needed
        instant_settlement: true,
        description: `Auto-restock: ${product.name}`,
        metadata: {
          user_id: userId,
          product_id: product.id,
          product_name: product.name,
          autonomous: true,
          agent_decision: 'inventory-low',
        },
      });
      
      console.log(`✅ Autonomous purchase: ${payment.payment_id}`);
      console.log(`Receipt: ${payment.receipt_url}`);
      
      // 5. Notify user
      await notifyUser({
        userId,
        title: 'AI Purchase Complete',
        message: `Your AI assistant restocked ${product.name} for $${product.price}`,
        paymentId: payment.payment_id,
      });
      
      return payment;
    } catch (error) {
      // Handle errors: limit exceeded, expired session, insufficient balance, etc.
      console.error('Autonomous payment failed:', error);
      
      if (error.message.includes('limit exceeded')) {
        // User hit spending limit
        await notifyUser({
          userId,
          title: '⚠️ AI Spending Limit Reached',
          message: 'Please increase your AI shopping limits to continue auto-restocking.',
        });
      } else if (error.message.includes('expired')) {
        // Session expired
        await notifyUser({
          userId,
          title: 'AI Session Expired',
          message: 'Please renew your AI shopping session to continue auto-restocking.',
        });
      }
      
      throw error;
    }
  }
}

// Run this periodically (e.g., daily check)
setInterval(async () => {
  const users = await getUsersWithAIEnabled();
  for (const user of users) {
    for (const productId of user.favoriteProducts) {
      await checkAndRestock(user.id, productId);
    }
  }
}, 24 * 60 * 60 * 1000); // Daily check
```


## Step 5: Process AI Purchases via Webhooks

```typescript
// app/api/webhooks/zendfi/route.ts
import { createNextWebhookHandler } from '@zendfi/sdk/next';

export const POST = createNextWebhookHandler({
  secret: process.env.ZENDFI_WEBHOOK_SECRET!,
  handlers: {
    // Regular payment confirmed (includes AI payments)
    'PaymentConfirmed': async (payment) => {
      console.log('Payment confirmed:', payment.id);
      
      // Check if this was an autonomous AI purchase
      if (payment.metadata?.autonomous === 'true') {
        console.log('AI autonomous purchase confirmed');
        
        // Fulfill order automatically
        await fulfillOrder({
          user_id: payment.metadata.user_id,
          product_id: payment.metadata.product_id,
          payment_id: payment.id,
          autonomous: true,
        });
        
        // Send notification to user
        await sendPushNotification({
          userId: payment.metadata.user_id,
          title: '🤖 AI Purchase Complete',
          body: `${payment.metadata.product_name} ordered for $${payment.amount_usd}`,
          link: `/orders/${payment.id}`,
        });
        
        // Send email receipt
        await sendEmailReceipt({
          to: payment.customer_email,
          orderDetails: {
            product: payment.metadata.product_name,
            amount: payment.amount_usd,
            autonomous: true,
          },
        });
      }
    },
    
    'PaymentFailed': async (payment) => {
      // AI payment failed
      if (payment.metadata?.autonomous === 'true') {
        await notifyUser({
          userId: payment.metadata.user_id,
          title: '⚠️ AI Purchase Failed',
          message: `Failed to restock ${payment.metadata.product_name}. Please check your balance.`,
        });
      }
    },
    
    // Autonomous delegate limit exceeded (when using session keys with autonomy)
    'AutonomousDelegateLimitExceeded': async (delegate) => {
      await notifyUser({
        userId: delegate.metadata?.user_id,
        title: '⚠️ AI Spending Limit Reached',
        message: 'Your AI assistant hit the spending limit. Increase limits or wait for reset.',
      });
    },
  },
});
```


## Step 6: User Dashboard

Show users their AI's spending activity:

```typescript
// app/dashboard/ai-spending/page.tsx
import { getAISpendingHistory, getActiveSession } from '@/lib/ai';

export default async function AISpendingPage() {
  const session = await getActiveSession();
  const history = await getAISpendingHistory();
  
  return (
    <div className="ai-spending-dashboard">
      <h1>🤖 AI Shopping Assistant</h1>
      
      {/* Current Session */}
      <div className="session-info">
        <h2>Active Session</h2>
        {session ? (
          <>
            <p>Status: ✅ Active</p>
            <p>Expires: {new Date(session.expires_at).toLocaleDateString()}</p>
            <div className="limits">
              <div>Per Transaction: ${session.limits.max_per_transaction}</div>
              <div>Daily: ${session.remaining.today} / ${session.limits.max_per_day}</div>
              <div>Monthly: ${session.remaining.this_month} / ${session.limits.max_per_month}</div>
            </div>
            <button onClick={revokeSession}>Revoke Access</button>
          </>
        ) : (
          <>
            <p>Status: ❌ Inactive</p>
            <button onClick={() => window.location.href = '/setup-ai'}>
              Enable AI Shopping
            </button>
          </>
        )}
      </div>
      
      {/* Spending History */}
      <div className="spending-history">
        <h2>Purchase History</h2>
        {history.map((purchase) => (
          <div key={purchase.id} className="purchase-card">
            <span className="icon">🤖</span>
            <div className="details">
              <strong>{purchase.product_name}</strong>
              <span>${purchase.amount}</span>
              <span>{new Date(purchase.created_at).toLocaleDateString()}</span>
              <span className="autonomous-badge">Autonomous</span>
            </div>
            <a href={`/orders/${purchase.id}`}>View Order</a>
          </div>
        ))}
      </div>
    </div>
  );
}
```


## Advanced: Approval Flow (Optional)

For high-value purchases, require user approval:

```typescript
// AI agent checks if approval needed
async function createPurchaseIntent(userId: string, product: any) {
  const session = await getUserAgentSession(userId);
  
  // If over threshold, require approval
  if (product.price > session.limits.max_per_transaction) {
    // Create payment intent (requires confirmation)
    const intent = await zendfi.intents.create({
      amount_usd: product.price,
      description: `Approval needed: ${product.name}`,
      metadata: {
        user_id: userId,
        product_id: product.id,
        requires_approval: true,
      },
    });
    
    // Notify user to approve
    await notifyUser({
      userId,
      title: '⚠️ AI Purchase Approval Needed',
      message: `Your AI wants to buy ${product.name} for $${product.price}. Approve?`,
      actions: [
        { label: 'Approve', action: `/approve/${intent.id}` },
        { label: 'Deny', action: `/deny/${intent.id}` },
      ],
    });
    
    return intent;
  }
  
  // Under threshold - proceed autonomously
  return await createAutonomousPayment(session, product);
}
```


## Security Best Practices

1. **Always set spending limits**
   - Per-transaction maximum
   - Daily spending cap
   - Monthly budget limit

2. **Use session expiration**
   - Don't create infinite sessions
   - Require periodic re-authorization

3. **Notify users immediately**
   - Push notifications for purchases
   - Email receipts
   - SMS for high-value items

4. **Audit trail**
   - Log all AI decisions
   - Track spending patterns
   - Alert on unusual behavior

5. **Easy revocation**
   - One-click disable
   - Immediate effect
   - Clear confirmation


## Testing

### Step 1: Create Agent API Key

First, create an agent API key (starts with `zai_`) for your AI agent:

```typescript
// Create agent key programmatically
const agentKey = await zendfi.agent.createKey({
  name: 'Shopping Bot',
  agent_id: 'shopping-bot-v1',
  agent_name: 'Shopping Bot',
  scopes: ['create_payments'], // Limited permissions
  rate_limit_per_hour: 1000,
});

// IMPORTANT: Save the full_key - it's only shown once!
console.log('Agent API Key:', agentKey.full_key); // zai_test_...
```

### Step 2: Test Session Creation

```bash
# Using the SDK
import { ZendFi } from '@zendfi/sdk';

const zendfi = new ZendFi({
  apiKey: process.env.ZENDFI_AGENT_API_KEY, // Use agent key
  mode: 'test',
});

const session = await zendfi.agent.createSession({
  agent_id: 'shopping-bot-v1',
  user_wallet: 'YOUR_WALLET_ADDRESS',
  limits: {
    max_per_transaction: 15,
    max_per_day: 50,
  },
  duration_hours: 24,
});

console.log('Session Token:', session.session_token); // zai_session_...
```

### Step 3: Test Smart Payment

```typescript
// Make a test autonomous payment
const payment = await zendfi.smart.execute({
  session_token: session.session_token,
  agent_id: 'shopping-bot-v1',
  user_wallet: session.user_wallet,
  amount_usd: 14.99,
  auto_detect_gasless: true,
  description: 'Test AI purchase',
});

console.log('Payment ID:', payment.payment_id);
console.log('Receipt:', payment.receipt_url);
```

### Step 4: Check Session Status

```typescript
// Get updated session info
const sessions = await zendfi.agent.listSessions();
const activeSession = sessions.find(s => s.is_active);

console.log('Remaining today:', activeSession.remaining.today);
console.log('Remaining this week:', activeSession.remaining.this_week);
```


## Production Checklist

- [ ] Implement spending limits UI
- [ ] Set up real-time notifications (push + email)
- [ ] Add session renewal flow
- [ ] Implement audit logging
- [ ] Test session expiration behavior
- [ ] Add emergency revocation button
- [ ] Monitor for unusual spending patterns
- [ ] Implement approval flow for high-value items
- [ ] Test across different user scenarios


## Learn More

- [Payments API](../api/payments.md) - Core payment functionality
- [Payment Links](../api/payment-links.md) - Shareable payment links
- [Subscriptions](../api/subscriptions.md) - Recurring payments
- [Invoices](../api/invoices.md) - Professional invoicing
- [Webhooks](../features/webhooks.md) - Process payment events


## Need Help?

- [Join Discord](https://discord.gg/zendfi)
- [Email support](mailto:support@zendfi.tech)
- [Book a demo](https://zendfi.tech/demo)
