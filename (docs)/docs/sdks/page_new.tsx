"use client";

import { Card } from "@/components/ui/card";
import { Code, Package, Zap, Shield, CheckCircle2, AlertCircle } from "lucide-react";

export default function SDKs() {
  return (
    <div className="max-w-5xl mx-auto py-8 px-4 space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <Package className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold">ZendFi SDK</h1>
        </div>
        <p className="text-xl text-muted-foreground">
          Official JavaScript/TypeScript SDK for seamless integration with ZendFi's crypto payment platform.
        </p>
      </div>

      {/* Quick Start */}
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
        <div className="flex items-start gap-3">
          <Zap className="h-6 w-6 text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-semibold mb-2 text-blue-900 dark:text-blue-100">Quick Start</h3>
            <p className="text-sm text-blue-800 dark:text-blue-200 mb-4">
              Install the SDK and start accepting crypto payments in minutes!
            </p>
            <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm">
              <code>{`npm install @zendfi/sdk
# or
yarn add @zendfi/sdk
# or
pnpm add @zendfi/sdk`}</code>
            </pre>
          </div>
        </div>
      </Card>

      {/* Installation */}
      <section>
        <h2 className="text-3xl font-bold mb-4">Installation</h2>
        
        <Card className="p-6 mb-4">
          <h3 className="text-xl font-semibold mb-3">Package Managers</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium mb-2">npm</p>
              <pre className="bg-slate-900 text-slate-100 p-3 rounded-lg overflow-x-auto font-mono text-sm">
                <code>npm install @zendfi/sdk</code>
              </pre>
            </div>
            <div>
              <p className="text-sm font-medium mb-2">Yarn</p>
              <pre className="bg-slate-900 text-slate-100 p-3 rounded-lg overflow-x-auto font-mono text-sm">
                <code>yarn add @zendfi/sdk</code>
              </pre>
            </div>
            <div>
              <p className="text-sm font-medium mb-2">pnpm</p>
              <pre className="bg-slate-900 text-slate-100 p-3 rounded-lg overflow-x-auto font-mono text-sm">
                <code>pnpm add @zendfi/sdk</code>
              </pre>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-3">Requirements</h3>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
              <span className="text-sm">Node.js 16+ or modern browser</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
              <span className="text-sm">TypeScript 4.5+ (optional, but recommended)</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
              <span className="text-sm">ZendFi API key (test or live)</span>
            </li>
          </ul>
        </Card>
      </section>

      {/* Initialization */}
      <section>
        <h2 className="text-3xl font-bold mb-4">Initialization</h2>
        
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-3">Basic Setup</h3>
          <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm mb-4">
            <code>{`import { ZendFi } from '@zendfi/sdk';

// Initialize with your API key
const zendfi = new ZendFi({
  apiKey: process.env.ZENDFI_API_KEY, // Your API key
  network: 'mainnet' // 'mainnet' or 'devnet'
});`}</code>
          </pre>

          <h3 className="text-xl font-semibold mb-3 mt-6">Configuration Options</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-muted">
              <thead>
                <tr className="bg-muted/50">
                  <th className="border border-muted p-3 text-left font-semibold">Option</th>
                  <th className="border border-muted p-3 text-left font-semibold">Type</th>
                  <th className="border border-muted p-3 text-left font-semibold">Default</th>
                  <th className="border border-muted p-3 text-left font-semibold">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-muted p-3"><code className="text-sm">apiKey</code></td>
                  <td className="border border-muted p-3"><code className="text-sm">string</code></td>
                  <td className="border border-muted p-3">-</td>
                  <td className="border border-muted p-3">Your ZendFi API key (required)</td>
                </tr>
                <tr>
                  <td className="border border-muted p-3"><code className="text-sm">network</code></td>
                  <td className="border border-muted p-3"><code className="text-sm">'mainnet' | 'devnet'</code></td>
                  <td className="border border-muted p-3"><code className="text-sm">'mainnet'</code></td>
                  <td className="border border-muted p-3">Network to use</td>
                </tr>
                <tr>
                  <td className="border border-muted p-3"><code className="text-sm">baseURL</code></td>
                  <td className="border border-muted p-3"><code className="text-sm">string</code></td>
                  <td className="border border-muted p-3"><code className="text-sm">'https://api.zendfi.tech'</code></td>
                  <td className="border border-muted p-3">API base URL (optional)</td>
                </tr>
                <tr>
                  <td className="border border-muted p-3"><code className="text-sm">timeout</code></td>
                  <td className="border border-muted p-3"><code className="text-sm">number</code></td>
                  <td className="border border-muted p-3"><code className="text-sm">30000</code></td>
                  <td className="border border-muted p-3">Request timeout in milliseconds</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </section>

      {/* Payments API */}
      <section>
        <h2 className="text-3xl font-bold mb-4">Payments</h2>
        
        <Card className="p-6 mb-4">
          <h3 className="text-xl font-semibold mb-3">Create Payment</h3>
          <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm">
            <code>{`const payment = await zendfi.payments.create({
  amount: 100.00,
  currency: 'USD',
  token: 'USDC', // Optional: 'USDC', 'SOL', or 'USDT'
  description: 'Premium subscription',
  customer_email: 'customer@example.com',
  metadata: {
    order_id: 'ord_12345',
    customer_id: 'cus_67890'
  }
});

console.log(payment.checkout_url); // Redirect customer here
console.log(payment.qr_code); // Or show QR code for mobile`}</code>
          </pre>
        </Card>

        <Card className="p-6 mb-4">
          <h3 className="text-xl font-semibold mb-3">Get Payment</h3>
          <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm">
            <code>{`const payment = await zendfi.payments.get('payment_abc123');

console.log(payment.status); // 'pending' | 'confirmed' | 'failed'
console.log(payment.amount_usd);
console.log(payment.transaction_signature);`}</code>
          </pre>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-3">List Payments</h3>
          <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm">
            <code>{`const payments = await zendfi.payments.list({
  limit: 50,
  offset: 0,
  status: 'confirmed' // Optional filter
});

payments.forEach(payment => {
  console.log(\`\${payment.id}: \${payment.status}\`);
});`}</code>
          </pre>
        </Card>
      </section>

      {/* Subscriptions API */}
      <section>
        <h2 className="text-3xl font-bold mb-4">Subscriptions</h2>
        
        <Card className="p-6 mb-4">
          <h3 className="text-xl font-semibold mb-3">Create Subscription Plan</h3>
          <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm">
            <code>{`const plan = await zendfi.subscriptions.createPlan({
  name: 'Premium Monthly',
  description: 'Access to all premium features',
  amount: 29.99,
  currency: 'USD',
  billing_interval: 'monthly',
  trial_days: 14,
  max_cycles: null // null = unlimited
});

console.log(plan.subscription_url);`}</code>
          </pre>
        </Card>

        <Card className="p-6 mb-4">
          <h3 className="text-xl font-semibold mb-3">Subscribe Customer</h3>
          <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm">
            <code>{`const subscription = await zendfi.subscriptions.subscribe({
  plan_id: 'plan_abc123',
  customer_wallet: '7xKBN4tF2vxUqLrXpE3mDwY7zQsN8rW6vH5jC4kM1pT2',
  customer_email: 'customer@example.com'
});

console.log(subscription.status); // 'trialing' or 'active'
console.log(subscription.next_billing_date);`}</code>
          </pre>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-3">Cancel Subscription</h3>
          <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm">
            <code>{`await zendfi.subscriptions.cancel('subscription_abc123', {
  cancel_at_period_end: true // true = cancel at end, false = immediate
});`}</code>
          </pre>
        </Card>
      </section>

      {/* Escrows API */}
      <section>
        <h2 className="text-3xl font-bold mb-4">Escrows</h2>
        
        <Card className="p-6 mb-4">
          <h3 className="text-xl font-semibold mb-3">Create Escrow</h3>
          <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm">
            <code>{`const escrow = await zendfi.escrows.create({
  buyer_wallet: '7xKBN4tF2vxUqLrXpE3mDwY7zQsN8rW6vH5jC4kM1pT2',
  seller_wallet: '9yMCD5uG3wyVsMLxRpF4nEzY8aRtP9xS7wK6oJ5lN2qU',
  amount: 2500.00,
  currency: 'USD',
  token: 'USDC',
  description: 'Freelance web development project',
  release_conditions: {
    type: 'manual_approval',
    approver_wallet: '7xKBN4tF2vxUqLrXpE3mDwY7zQsN8rW6vH5jC4kM1pT2'
  }
});

console.log(escrow.payment_url); // Send to buyer`}</code>
          </pre>
        </Card>

        <Card className="p-6 mb-4">
          <h3 className="text-xl font-semibold mb-3">Approve Release</h3>
          <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm">
            <code>{`await zendfi.escrows.approve('escrow_abc123');

// For multi-sig escrows
await zendfi.escrows.approve('escrow_abc123', {
  approver_wallet: '7xKBN4tF2vxUqLrXpE3mDwY7zQsN8rW6vH5jC4kM1pT2'
});`}</code>
          </pre>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-3">Refund Escrow</h3>
          <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm">
            <code>{`await zendfi.escrows.refund('escrow_abc123', {
  reason: 'Buyer requested cancellation'
});`}</code>
          </pre>
        </Card>
      </section>

      {/* Installments API */}
      <section>
        <h2 className="text-3xl font-bold mb-4">Installments (BNPL)</h2>
        
        <Card className="p-6 mb-4">
          <h3 className="text-xl font-semibold mb-3">Create Installment Plan</h3>
          <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm">
            <code>{`const plan = await zendfi.installments.createPlan({
  customer_wallet: '7xKBN4tF2vxUqLrXpE3mDwY7zQsN8rW6vH5jC4kM1pT2',
  customer_email: 'customer@example.com',
  total_amount: 900.00,
  installment_count: 3,
  payment_frequency_days: 30,
  description: 'MacBook Pro purchase',
  late_fee_amount: 25.00,
  grace_period_days: 5
});

console.log(plan.id);
console.log(plan.payment_schedule);`}</code>
          </pre>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-3">Get Installment Plan</h3>
          <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm">
            <code>{`const plan = await zendfi.installments.get('plan_abc123');

console.log(plan.status); // 'active' | 'completed' | 'defaulted'
console.log(plan.paid_count); // Number of paid installments
plan.payment_schedule.forEach(installment => {
  console.log(\`Installment #\${installment.installment_number}: \${installment.status}\`);
});`}</code>
          </pre>
        </Card>
      </section>

      {/* Invoices API */}
      <section>
        <h2 className="text-3xl font-bold mb-4">Invoices</h2>
        
        <Card className="p-6 mb-4">
          <h3 className="text-xl font-semibold mb-3">Create Invoice</h3>
          <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm">
            <code>{`const invoice = await zendfi.invoices.create({
  customer_email: 'client@example.com',
  customer_name: 'Acme Corp',
  amount: 3500.00,
  token: 'USDC',
  description: 'Web Development Services - Q4 2025',
  line_items: [
    {
      description: 'Frontend Development',
      quantity: 40,
      unit_price: 50.00
    },
    {
      description: 'Backend API',
      quantity: 30,
      unit_price: 50.00
    }
  ],
  due_date: new Date('2025-11-15')
});

console.log(invoice.invoice_number); // INV-2025-00042`}</code>
          </pre>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-3">Send Invoice</h3>
          <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm">
            <code>{`const result = await zendfi.invoices.send('invoice_abc123');

console.log(result.payment_url); // Customer payment link
console.log(result.sent_to); // Confirmation of recipient`}</code>
          </pre>
        </Card>
      </section>

      {/* Error Handling */}
      <section>
        <h2 className="text-3xl font-bold mb-4">Error Handling</h2>
        
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-3">Try-Catch Pattern</h3>
          <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm mb-4">
            <code>{`try {
  const payment = await zendfi.payments.create({
    amount: 100,
    currency: 'USD',
    description: 'Test payment'
  });
  
  console.log('Payment created:', payment.id);
} catch (error) {
  if (error.code === 'INVALID_API_KEY') {
    console.error('API key is invalid');
  } else if (error.code === 'INSUFFICIENT_BALANCE') {
    console.error('Merchant wallet has insufficient balance');
  } else if (error.code === 'NETWORK_ERROR') {
    console.error('Network request failed');
  } else {
    console.error('Unexpected error:', error.message);
  }
}`}</code>
          </pre>

          <h3 className="text-xl font-semibold mb-3 mt-6">Common Error Codes</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-muted text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="border border-muted p-3 text-left font-semibold">Code</th>
                  <th className="border border-muted p-3 text-left font-semibold">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-muted p-3"><code>INVALID_API_KEY</code></td>
                  <td className="border border-muted p-3">API key is missing or invalid</td>
                </tr>
                <tr>
                  <td className="border border-muted p-3"><code>INSUFFICIENT_BALANCE</code></td>
                  <td className="border border-muted p-3">Merchant wallet balance too low</td>
                </tr>
                <tr>
                  <td className="border border-muted p-3"><code>INVALID_WALLET</code></td>
                  <td className="border border-muted p-3">Wallet address format invalid</td>
                </tr>
                <tr>
                  <td className="border border-muted p-3"><code>PAYMENT_EXPIRED</code></td>
                  <td className="border border-muted p-3">Payment link expired (24 hours)</td>
                </tr>
                <tr>
                  <td className="border border-muted p-3"><code>RATE_LIMIT_EXCEEDED</code></td>
                  <td className="border border-muted p-3">Too many requests</td>
                </tr>
                <tr>
                  <td className="border border-muted p-3"><code>NETWORK_ERROR</code></td>
                  <td className="border border-muted p-3">Network connectivity issue</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </section>

      {/* Webhook Verification */}
      <section>
        <h2 className="text-3xl font-bold mb-4">Webhook Verification</h2>
        
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-3">Verify Webhook Signatures</h3>
          <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm mb-4">
            <code>{`import { ZendFi } from '@zendfi/sdk';

const zendfi = new ZendFi({ apiKey: process.env.ZENDFI_API_KEY });

// In your webhook endpoint (e.g., Express.js)
app.post('/webhooks/zendfi', (req, res) => {
  const signature = req.headers['x-zendfi-signature'];
  const payload = JSON.stringify(req.body);
  
  const isValid = zendfi.webhooks.verify(
    payload,
    signature,
    process.env.ZENDFI_WEBHOOK_SECRET
  );
  
  if (!isValid) {
    return res.status(401).send('Invalid signature');
  }
  
  // Process webhook event
  const event = req.body;
  console.log('Event type:', event.event);
  console.log('Payment ID:', event.data.payment.id);
  
  res.status(200).send('OK');
});`}</code>
          </pre>

          <Card className="p-4 mt-4 bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-semibold text-amber-900 dark:text-amber-100 mb-1">Security Best Practice</p>
                <p className="text-amber-800 dark:text-amber-200">
                  Always verify webhook signatures to ensure events are genuinely from ZendFi. Never skip this step in production!
                </p>
              </div>
            </div>
          </Card>
        </Card>
      </section>

      {/* TypeScript Support */}
      <section>
        <h2 className="text-3xl font-bold mb-4">TypeScript Support</h2>
        
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-3">Fully Typed SDK</h3>
          <p className="text-muted-foreground mb-4">
            The ZendFi SDK is written in TypeScript and includes complete type definitions for all methods and responses.
          </p>
          <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm">
            <code>{`import { ZendFi, Payment, PaymentStatus } from '@zendfi/sdk';

const zendfi = new ZendFi({ apiKey: process.env.ZENDFI_API_KEY! });

// Full autocomplete and type checking
const payment: Payment = await zendfi.payments.create({
  amount: 100,
  currency: 'USD',
  description: 'Test'
});

// Type-safe status checking
if (payment.status === 'confirmed') {
  console.log('Payment confirmed!');
}`}</code>
          </pre>
        </Card>
      </section>

      {/* Next Steps */}
      <Card className="p-6 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <h2 className="text-2xl font-bold mb-4">Next Steps</h2>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
            <div>
              <p className="font-semibold">Get your API key</p>
              <p className="text-sm text-muted-foreground">Visit the <a href="/docs" className="text-primary hover:underline">Getting Started guide</a> to create your merchant account</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
            <div>
              <p className="font-semibold">Set up webhooks</p>
              <p className="text-sm text-muted-foreground">Configure <a href="/docs/webhooks" className="text-primary hover:underline">webhook endpoints</a> to receive real-time payment notifications</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
            <div>
              <p className="font-semibold">Explore the API</p>
              <p className="text-sm text-muted-foreground">Check out our <a href="/docs/api" className="text-primary hover:underline">full API reference</a> for advanced features</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
