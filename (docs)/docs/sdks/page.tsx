"use client";
import { Card } from "@/components/ui/card";
import { Package, Zap, CheckCircle2, Code2, Shield } from "lucide-react";

export default function SDKDocumentation() {
  return (
    <div className="max-w-5xl mx-auto py-8 px-4 space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <Package className="h-8 w-8 text-primary" />
          <h1 className="text-3xl md:text-4xl font-bold">ZendFi SDK</h1>
        </div>
        <p className="text-lg text-muted-foreground">
          Zero-config TypeScript SDK for crypto payments. Built for developers, works everywhere.
        </p>
      </div>

      {/* Quick Start */}
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
        <div className="flex items-start gap-3">
          <Zap className="h-6 w-6 text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0" />
          <div className="w-full">
            <h3 className="text-lg font-semibold mb-2 text-blue-900 dark:text-blue-100">Quick Start</h3>
            <p className="text-sm text-blue-800 dark:text-blue-200 mb-4">
              Install the SDK and create your first payment in 2 minutes!
            </p>
            <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm">
              <code className="language-json mt-5">{`npm install @zendfi/sdk

import { zendfi } from '@zendfi/sdk';

const payment = await zendfi.createPayment({
  amount: 50,
  description: 'Premium subscription',
  customer_email: 'customer@example.com'
});

console.log(payment.checkout_url);`}</code>
            </pre>
          </div>
        </div>
      </Card>

      {/* Installation */}
      <section>
        <h2 className="text-3xl font-bold mb-4">Installation</h2>
        
        <Card className="p-6">
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
          <div className="mt-6 pt-6 border-t">
            <h3 className="font-semibold mb-3">Requirements</h3>
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
                <span className="text-sm">ZendFi API key (get from dashboard)</span>
              </li>
            </ul>
          </div>
        </Card>
      </section>

      {/* Initialization */}
      <section>
        <h2 className="text-3xl font-bold mb-4">Initialization</h2>
        
        <Card className="p-6 mb-4">
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <Code2 className="h-5 w-5 text-primary" />
            Option 1: Environment Variables (Recommended)
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Set your API key in <code className="bg-muted px-2 py-1 rounded">.env</code> file and use the default singleton instance:
          </p>
          <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm mb-4">
            <code className="language-json mt-5">{`# .env
ZENDFI_API_KEY=zfi_test_your_key_here
ZENDFI_MODE=test  # 'test' or 'live'`}</code>
          </pre>
          <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm">
            <code className="language-java mt-5script">{`import { zendfi } from '@zendfi/sdk';

// Auto-configured from environment variables
const payment = await zendfi.createPayment({ amount: 50 });`}</code>
          </pre>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <Code2 className="h-5 w-5 text-primary" />
            Option 2: Custom Configuration
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Create a custom instance with your own configuration:
          </p>
          <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm">
            <code className="language-java mt-5script">{`import { ZendFiClient } from '@zendfi/sdk';

const zendfi = new ZendFiClient({
  apiKey: 'zfi_test_your_key_here',
  mode: 'test',              // 'test' or 'live'
  timeout: 30000,            // Request timeout (ms)
  retries: 3,                // Number of retries for 5xx errors
  idempotencyEnabled: true,  // Auto-generate idempotency keys
  debug: false               // Enable debug logging
});`}</code>
          </pre>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-semibold">Option</th>
                  <th className="text-left p-3 font-semibold">Type</th>
                  <th className="text-left p-3 font-semibold">Default</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-3"><code className="bg-muted px-2 py-1 rounded">apiKey</code></td>
                  <td className="p-3">string</td>
                  <td className="p-3 text-muted-foreground">ZENDFI_API_KEY env</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3"><code className="bg-muted px-2 py-1 rounded">mode</code></td>
                  <td className="p-3">'test' | 'live'</td>
                  <td className="p-3 text-muted-foreground">ZENDFI_MODE env</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3"><code className="bg-muted px-2 py-1 rounded">baseURL</code></td>
                  <td className="p-3">string</td>
                  <td className="p-3 text-muted-foreground">https://api.zendfi.com</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3"><code className="bg-muted px-2 py-1 rounded">timeout</code></td>
                  <td className="p-3">number</td>
                  <td className="p-3 text-muted-foreground">30000</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3"><code className="bg-muted px-2 py-1 rounded">retries</code></td>
                  <td className="p-3">number</td>
                  <td className="p-3 text-muted-foreground">3</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3"><code className="bg-muted px-2 py-1 rounded">idempotencyEnabled</code></td>
                  <td className="p-3">boolean</td>
                  <td className="p-3 text-muted-foreground">true</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3"><code className="bg-muted px-2 py-1 rounded">debug</code></td>
                  <td className="p-3">boolean</td>
                  <td className="p-3 text-muted-foreground">false</td>
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
          <h3 className="text-xl font-semibold mb-3">createPayment()</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Create a new one-time payment
          </p>
          <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm">
            <code className="language-json mt-5">{`const payment = await zendfi.createPayment({
  amount: 100.00,
  currency: 'USD',           // Default: 'USD'
  token: 'USDC',             // 'USDC', 'SOL', or 'USDT'
  description: 'Premium subscription',
  customer_email: 'customer@example.com',
  webhook_url: 'https://yourapp.com/webhooks', // Optional
  metadata: {                // Optional custom data
    order_id: 'ord_12345',
    customer_id: 'cus_67890'
  }
});

console.log(payment.checkout_url);      // Redirect customer here
console.log(payment.qr_code);           // Or show QR code
console.log(payment.status);            // 'pending'
console.log(payment.id);                // 'pay_abc123'`}</code>
          </pre>
        </Card>

        <Card className="p-6 mb-4">
          <h3 className="text-xl font-semibold mb-3">getPayment()</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Retrieve a payment by ID
          </p>
          <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm">
            <code className="language-json mt-5">{`const payment = await zendfi.getPayment('pay_abc123');

console.log(payment.status);                 // 'pending' | 'confirmed' | 'failed'
console.log(payment.amount_usd);             // 100.00
console.log(payment.transaction_signature);  // Solana tx signature`}</code>
          </pre>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-3">listPayments()</h3>
          <p className="text-sm text-muted-foreground mb-4">
            List all payments with pagination
          </p>
          <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm">
            <code className="language-json mt-5">{`const response = await zendfi.listPayments({
  page: 1,
  limit: 50,
  status: 'confirmed',         // Optional: filter by status
  from_date: '2024-01-01',     // Optional: date range
  to_date: '2024-12-31'
});

console.log(response.data);          // Array of payments
console.log(response.total);         // Total count
console.log(response.page);          // Current page
console.log(response.pages);         // Total pages`}</code>
          </pre>
        </Card>
      </section>

      {/* Subscriptions API */}
      <section>
        <h2 className="text-3xl font-bold mb-4">Subscriptions</h2>
        
        <Card className="p-6 mb-4">
          <h3 className="text-xl font-semibold mb-3">createSubscriptionPlan()</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Create a recurring subscription plan
          </p>
          <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm">
            <code className="language-json mt-5">{`const plan = await zendfi.createSubscriptionPlan({
  name: 'Premium Monthly',
  description: 'Access to all premium features',
  amount: 29.99,
  currency: 'USD',
  interval: 'monthly',       // 'monthly' | 'yearly'
  interval_count: 1,         // Bill every 1 month
  trial_days: 14,            // Optional: 14-day trial
  token: 'USDC'
});

console.log(plan.subscription_url);`}</code>
          </pre>
        </Card>

        <Card className="p-6 mb-4">
          <h3 className="text-xl font-semibold mb-3">createSubscription()</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Subscribe a customer to a plan
          </p>
          <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm">
            <code className="language-json mt-5">{`const subscription = await zendfi.createSubscription({
  plan_id: 'plan_abc123',
  customer_email: 'customer@example.com'
});

console.log(subscription.status);            // 'trialing' or 'active'
console.log(subscription.next_billing_date);
console.log(subscription.checkout_url);      // Send to customer`}</code>
          </pre>
        </Card>

        <Card className="p-6 mb-4">
          <h3 className="text-xl font-semibold mb-3">getSubscription()</h3>
          <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm">
            <code className="language-json mt-5">{`const subscription = await zendfi.getSubscription('sub_abc123');`}</code>
          </pre>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-3">cancelSubscription()</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Cancel a customer's subscription
          </p>
          <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm">
            <code className="language-json mt-5">{`const subscription = await zendfi.cancelSubscription('sub_abc123');

console.log(subscription.status);  // 'cancelled'`}</code>
          </pre>
        </Card>
      </section>

      {/* Escrows API */}
      <section>
        <h2 className="text-3xl font-bold mb-4">Escrows</h2>
        
        <Card className="p-6 mb-4">
          <h3 className="text-xl font-semibold mb-3">createEscrow()</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Create an escrow transaction for marketplace payments
          </p>
          <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm">
            <code className="language-json mt-5">{`const escrow = await zendfi.createEscrow({
  buyer_email: 'buyer@example.com',
  seller_email: 'seller@example.com',
  amount: 2500.00,
  currency: 'USD',
  token: 'USDC',
  description: 'Freelance web development project',
  release_trigger: 'manual'    // 'manual' | 'time_based'
});

console.log(escrow.payment_url);       // Send to buyer
console.log(escrow.status);            // 'pending_payment'`}</code>
          </pre>
        </Card>

        <Card className="p-6 mb-4">
          <h3 className="text-xl font-semibold mb-3">getEscrow()</h3>
          <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm">
            <code className="language-json mt-5">{`const escrow = await zendfi.getEscrow('escrow_abc123');`}</code>
          </pre>
        </Card>

        <Card className="p-6 mb-4">
          <h3 className="text-xl font-semibold mb-3">listEscrows()</h3>
          <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm">
            <code className="language-json mt-5">{`const escrows = await zendfi.listEscrows({
  limit: 50,
  offset: 0
});`}</code>
          </pre>
        </Card>

        <Card className="p-6 mb-4">
          <h3 className="text-xl font-semibold mb-3">approveEscrow()</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Release funds to seller (buyer approves)
          </p>
          <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm">
            <code className="language-json mt-5">{`const result = await zendfi.approveEscrow('escrow_abc123', {
  approver_wallet: '7xKBN4tF2vxUqLrXpE3mDwY7zQsN8rW6vH5jC4kM1pT2'
});

console.log(result.transaction_signature);`}</code>
          </pre>
        </Card>

        <Card className="p-6 mb-4">
          <h3 className="text-xl font-semibold mb-3">refundEscrow()</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Refund funds to buyer (seller initiates or admin)
          </p>
          <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm">
            <code className="language-json mt-5">{`const result = await zendfi.refundEscrow('escrow_abc123', {
  reason: 'Buyer requested cancellation'
});`}</code>
          </pre>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-3">disputeEscrow()</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Raise a dispute for mediation
          </p>
          <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm">
            <code className="language-json mt-5">{`const dispute = await zendfi.disputeEscrow('escrow_abc123', {
  raised_by: 'buyer',        // 'buyer' | 'seller'
  reason: 'Product not delivered as described'
});

console.log(dispute.dispute_id);`}</code>
          </pre>
        </Card>
      </section>

      {/* Installments API */}
      <section>
        <h2 className="text-3xl font-bold mb-4">Installments (Buy Now, Pay Later)</h2>
        
        <Card className="p-6 mb-4">
          <h3 className="text-xl font-semibold mb-3">createInstallmentPlan()</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Split a purchase into multiple payments
          </p>
          <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm">
            <code className="language-json mt-5">{`const plan = await zendfi.createInstallmentPlan({
  customer_email: 'customer@example.com',
  total_amount: 900.00,
  installment_count: 3,              // 3 payments
  payment_frequency_days: 30,        // Every 30 days
  description: 'MacBook Pro purchase',
  currency: 'USD',
  token: 'USDC'
});

console.log(plan.plan_id);
console.log(plan.status);              // 'pending_first_payment'`}</code>
          </pre>
        </Card>

        <Card className="p-6 mb-4">
          <h3 className="text-xl font-semibold mb-3">getInstallmentPlan()</h3>
          <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm">
            <code className="language-json mt-5">{`const plan = await zendfi.getInstallmentPlan('plan_abc123');`}</code>
          </pre>
        </Card>

        <Card className="p-6 mb-4">
          <h3 className="text-xl font-semibold mb-3">listInstallmentPlans()</h3>
          <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm">
            <code className="language-json mt-5">{`const plans = await zendfi.listInstallmentPlans({
  limit: 50,
  offset: 0
});`}</code>
          </pre>
        </Card>

        <Card className="p-6 mb-4">
          <h3 className="text-xl font-semibold mb-3">listCustomerInstallmentPlans()</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Get all installment plans for a specific customer
          </p>
          <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm">
            <code className="language-json mt-5">{`const plans = await zendfi.listCustomerInstallmentPlans(
  '7xKBN4tF2vxUqLrXpE3mDwY7zQsN8rW6vH5jC4kM1pT2'
);`}</code>
          </pre>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-3">cancelInstallmentPlan()</h3>
          <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm">
            <code className="language-json mt-5">{`const result = await zendfi.cancelInstallmentPlan('plan_abc123');

console.log(result.message);`}</code>
          </pre>
        </Card>
      </section>

      {/* Invoices API */}
      <section>
        <h2 className="text-3xl font-bold mb-4">Invoices</h2>
        
        <Card className="p-6 mb-4">
          <h3 className="text-xl font-semibold mb-3">createInvoice()</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Create a professional invoice with line items
          </p>
          <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm">
            <code className="language-json mt-5">{`const invoice = await zendfi.createInvoice({
  customer_email: 'client@company.com',
  customer_name: 'Acme Corp',
  due_date: '2024-12-31',
  token: 'USDC',
  notes: 'Payment terms: Net 30',
  items: [
    {
      description: 'Website Design',
      quantity: 1,
      unit_price: 5000.00
    },
    {
      description: 'Custom Development',
      quantity: 40,
      unit_price: 150.00
    }
  ]
});

console.log(invoice.invoice_number);   // 'INV-001'
console.log(invoice.total_amount);     // 11000.00
console.log(invoice.payment_url);      // Send to customer`}</code>
          </pre>
        </Card>

        <Card className="p-6 mb-4">
          <h3 className="text-xl font-semibold mb-3">getInvoice()</h3>
          <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm">
            <code className="language-json mt-5">{`const invoice = await zendfi.getInvoice('inv_abc123');`}</code>
          </pre>
        </Card>

        <Card className="p-6 mb-4">
          <h3 className="text-xl font-semibold mb-3">listInvoices()</h3>
          <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm">
            <code className="language-json mt-5">{`const invoices = await zendfi.listInvoices();`}</code>
          </pre>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-3">sendInvoice()</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Send invoice to customer via email
          </p>
          <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm">
            <code className="language-json mt-5">{`const result = await zendfi.sendInvoice('inv_abc123');

console.log(result.sent_to);           // 'client@company.com'
console.log(result.payment_url);`}</code>
          </pre>
        </Card>
      </section>

      {/* Payment Links API */}
      <section>
        <h2 className="text-3xl font-bold mb-4">Payment Links</h2>
        
        <Card className="p-6 mb-4">
          <h3 className="text-xl font-semibold mb-3">createPaymentLink()</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Create a shareable checkout URL for products/services
          </p>
          <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm">
            <code className="language-json mt-5">{`const link = await zendfi.createPaymentLink({
  name: 'Premium Course Access',
  description: 'Lifetime access to all courses',
  amount: 299.00,
  currency: 'USD',
  token: 'USDC',
  success_url: 'https://yoursite.com/success',
  cancel_url: 'https://yoursite.com/cancel'
});

console.log(link.url);                 // Share this URL
console.log(link.link_code);           // 'link_abc123'`}</code>
          </pre>
        </Card>

        <Card className="p-6 mb-4">
          <h3 className="text-xl font-semibold mb-3">getPaymentLink()</h3>
          <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm">
            <code className="language-json mt-5">{`const link = await zendfi.getPaymentLink('link_abc123');`}</code>
          </pre>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-3">listPaymentLinks()</h3>
          <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm">
            <code className="language-json mt-5">{`const links = await zendfi.listPaymentLinks();`}</code>
          </pre>
        </Card>
      </section>

      {/* Webhooks */}
      <section>
        <h2 className="text-3xl font-bold mb-4 flex items-center gap-2">
          <Shield className="h-7 w-7 text-primary" />
          Webhook Verification
        </h2>
        
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-3">verifyWebhook()</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Verify webhook signatures to ensure they're from ZendFi
          </p>
          <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm">
            <code className="language-json mt-5">{`// In your webhook handler (e.g., /api/webhooks)
import { zendfi } from '@zendfi/sdk';

export async function POST(request: Request) {
  const signature = request.headers.get('x-zendfi-signature');
  const payload = await request.text();
  
  const isValid = zendfi.verifyWebhook({
    payload: payload,
    signature: signature,
    secret: process.env.ZENDFI_WEBHOOK_SECRET
  });
  
  if (!isValid) {
    return new Response('Invalid signature', { status: 401 });
  }
  
  const event = JSON.parse(payload);
  
  switch (event.event) {
    case 'payment.confirmed':
      // Handle successful payment
      console.log('Payment confirmed:', event.data.payment_id);
      break;
    case 'payment.failed':
      // Handle failed payment
      break;
    case 'subscription.created':
      // Handle new subscription
      break;
    // ... handle other events
  }
  
  return new Response('OK', { status: 200 });
}`}</code>
          </pre>
        </Card>
      </section>

      {/* Error Handling */}
      <section>
        <h2 className="text-3xl font-bold mb-4">Error Handling</h2>
        
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-4">
            The SDK provides typed errors for different scenarios:
          </p>
          <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm">
            <code className="language-java mt-5script">{`import { zendfi, isZendFiError } from '@zendfi/sdk';

try {
  const payment = await zendfi.createPayment({
    amount: 50,
    description: 'Test payment'
  });
} catch (error) {
  if (isZendFiError(error)) {
    console.error('ZendFi Error:', error.type);
    console.error('Message:', error.message);
    console.error('Status Code:', error.statusCode);
    console.error('Details:', error.details);
    
    switch (error.type) {
      case 'authentication':
        // Invalid API key
        break;
      case 'validation':
        // Invalid request parameters
        break;
      case 'payment':
        // Payment-specific error
        break;
      case 'network':
        // Network/timeout error
        break;
      case 'rate_limit':
        // Too many requests
        break;
    }
  } else {
    // Unknown error
    console.error('Unknown error:', error);
  }
}`}</code>
          </pre>
        </Card>
      </section>

      {/* Interceptors */}
      <section>
        <h2 className="text-3xl font-bold mb-4">Advanced: Interceptors</h2>
        
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-4">
            Modify requests/responses or add custom logging:
          </p>
          <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm">
            <code className="language-java mt-5script">{`import { ZendFiClient } from '@zendfi/sdk';

const zendfi = new ZendFiClient({ apiKey: 'your_key' });

// Request interceptor
zendfi.interceptors.request.use(async (config) => {
  console.log('Making request to:', config.url);
  config.headers['X-Custom-Header'] = 'value';
  return config;
});

// Response interceptor
zendfi.interceptors.response.use(async (response) => {
  console.log('Received response:', response.status);
  return response;
});

// Error interceptor
zendfi.interceptors.error.use(async (error) => {
  console.error('Request failed:', error.message);
  // You could send to error tracking service here
  return error; // Re-throw
});`}</code>
          </pre>
        </Card>
      </section>

      {/* Summary */}
      <Card className="p-6 bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-900/50 dark:to-gray-900/50">
        <h3 className="text-xl font-semibold mb-4">Quick Reference</h3>
        
        <div className="grid md:grid-cols-2 gap-6 text-sm">
          <div>
            <h4 className="font-semibold mb-3">Payments</h4>
            <ul className="space-y-1 text-muted-foreground">
              <li><code className="bg-muted px-1 rounded">createPayment()</code></li>
              <li><code className="bg-muted px-1 rounded">getPayment(id)</code></li>
              <li><code className="bg-muted px-1 rounded">listPayments(params)</code></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Subscriptions</h4>
            <ul className="space-y-1 text-muted-foreground">
              <li><code className="bg-muted px-1 rounded">createSubscriptionPlan()</code></li>
              <li><code className="bg-muted px-1 rounded">createSubscription()</code></li>
              <li><code className="bg-muted px-1 rounded">cancelSubscription(id)</code></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Escrows</h4>
            <ul className="space-y-1 text-muted-foreground">
              <li><code className="bg-muted px-1 rounded">createEscrow()</code></li>
              <li><code className="bg-muted px-1 rounded">approveEscrow(id)</code></li>
              <li><code className="bg-muted px-1 rounded">refundEscrow(id)</code></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Installments</h4>
            <ul className="space-y-1 text-muted-foreground">
              <li><code className="bg-muted px-1 rounded">createInstallmentPlan()</code></li>
              <li><code className="bg-muted px-1 rounded">cancelInstallmentPlan(id)</code></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Invoices</h4>
            <ul className="space-y-1 text-muted-foreground">
              <li><code className="bg-muted px-1 rounded">createInvoice()</code></li>
              <li><code className="bg-muted px-1 rounded">sendInvoice(id)</code></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Payment Links</h4>
            <ul className="space-y-1 text-muted-foreground">
              <li><code className="bg-muted px-1 rounded">createPaymentLink()</code></li>
              <li><code className="bg-muted px-1 rounded">listPaymentLinks()</code></li>
            </ul>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t">
          <p className="text-sm text-muted-foreground">
            📦 Package: <code className="bg-muted px-2 py-1 rounded">@zendfi/sdk</code> | 
            📚 <a href="https://github.com/zendfi/zendfi-toolkit" className="text-primary hover:underline ml-2">
              GitHub
            </a> | 
            🐛 <a href="https://github.com/zendfi/zendfi-toolkit/issues" className="text-primary hover:underline ml-2">
              Report Issues
            </a>
          </p>
        </div>
      </Card>
    </div>
  );
}
