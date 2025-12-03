"use client";

import { Card } from "@/components/ui/card";
import { RefreshCw, Zap, Check, AlertCircle } from "lucide-react";

export default function SubscriptionsAPIPage() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
            <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <RefreshCw className="h-8 w-8 text-primary" />
          <h1 className="text-3xl md:text-4xl font-bold">Subscriptions API</h1>
        </div>
        <p className="text-lg text-muted-foreground">
          Create recurring payment plans with automated billing cycles. Perfect for SaaS, memberships, and subscription services.
        </p>
      </div>

      {/* Quick Start Card */}
      <Card className="p-6 mb-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
        <div className="flex items-start gap-3">
          <Zap className="h-6 w-6 text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-semibold mb-2 text-blue-900 dark:text-blue-100">Quick Start</h3>
            <ol className="list-decimal pl-5 space-y-2 text-sm text-blue-800 dark:text-blue-200">
              <li>Create a subscription plan with your pricing and billing interval</li>
              <li>Subscribe customers using their wallet address</li>
              <li>ZendFi automatically bills customers at each interval</li>
              <li>Receive webhook events for all subscription lifecycle changes</li>
            </ol>
            <p className="text-sm text-blue-700 dark:text-blue-300 mt-3">
              <strong>That's it!</strong> No manual billing, no payment tracking - we handle everything automatically. 🎉
            </p>
          </div>
        </div>
      </Card>

      {/* What's Included */}
      <Card className="p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">What's Included</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold">Flexible Billing Intervals</p>
              <p className="text-sm text-muted-foreground">Daily, weekly, monthly, or yearly billing</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold">Free Trials</p>
              <p className="text-sm text-muted-foreground">Offer trial periods before billing starts</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold">Automatic Billing</p>
              <p className="text-sm text-muted-foreground">Background worker handles all recurring charges</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold">Cycle Limits</p>
              <p className="text-sm text-muted-foreground">Set maximum billing cycles or unlimited</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold">Customer Tracking</p>
              <p className="text-sm text-muted-foreground">View all subscriptions per customer wallet</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold">Webhook Events</p>
              <p className="text-sm text-muted-foreground">Real-time notifications for all lifecycle events</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Use Cases */}
      <Card className="p-6 mb-8 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border-purple-200 dark:border-purple-800">
        <h2 className="text-2xl font-bold mb-4">Common Use Cases</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-slate-900 p-4 rounded-lg border border-purple-200 dark:border-purple-700">
            <h3 className="font-semibold mb-2">💼 SaaS Platforms</h3>
            <p className="text-sm text-muted-foreground">Monthly/yearly subscriptions for software access with tiered pricing plans</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-4 rounded-lg border border-purple-200 dark:border-purple-700">
            <h3 className="font-semibold mb-2">🎓 Online Courses</h3>
            <p className="text-sm text-muted-foreground">Monthly memberships for course platforms and educational content</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-4 rounded-lg border border-purple-200 dark:border-purple-700">
            <h3 className="font-semibold mb-2">🎮 Gaming Services</h3>
            <p className="text-sm text-muted-foreground">Premium memberships for game servers, NFT drops, and exclusive content</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-4 rounded-lg border border-purple-200 dark:border-purple-700">
            <h3 className="font-semibold mb-2">📰 Content Creators</h3>
            <p className="text-sm text-muted-foreground">Patreon-style subscriptions for exclusive content and community access</p>
          </div>
        </div>
      </Card>

      {/* Create Subscription Plan */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Create Subscription Plan</h2>
        <p className="text-muted-foreground mb-4">
          Create a reusable subscription plan that customers can subscribe to. Define your pricing, billing interval, trial periods, and more.
        </p>

        <h3 className="text-xl font-semibold mb-3">Endpoint</h3>
        <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm mb-6">
          <code>POST /api/v1/subscription-plans</code>
        </pre>

        <h3 className="text-xl font-semibold mb-3">Authentication</h3>
        <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm mb-6">
          <code>Authorization: Bearer YOUR_API_KEY</code>
        </pre>

        <h3 className="text-xl font-semibold mb-3">Request Parameters</h3>
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full border-collapse border border-muted">
            <thead>
              <tr className="bg-muted/50">
                <th className="border border-muted p-3 text-left font-semibold">Parameter</th>
                <th className="border border-muted p-3 text-left font-semibold">Type</th>
                <th className="border border-muted p-3 text-left font-semibold">Required</th>
                <th className="border border-muted p-3 text-left font-semibold">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-muted p-3"><code className="text-sm">name</code></td>
                <td className="border border-muted p-3"><code className="text-sm">string</code></td>
                <td className="border border-muted p-3"><span className="text-red-600 font-semibold">Yes</span></td>
                <td className="border border-muted p-3">Plan name (e.g., "Premium Monthly")</td>
              </tr>
              <tr>
                <td className="border border-muted p-3"><code className="text-sm">description</code></td>
                <td className="border border-muted p-3"><code className="text-sm">string</code></td>
                <td className="border border-muted p-3">No</td>
                <td className="border border-muted p-3">Plan description</td>
              </tr>
              <tr>
                <td className="border border-muted p-3"><code className="text-sm">amount</code></td>
                <td className="border border-muted p-3"><code className="text-sm">number</code></td>
                <td className="border border-muted p-3"><span className="text-red-600 font-semibold">Yes</span></td>
                <td className="border border-muted p-3">Price per billing cycle in USD (must be &gt; 0)</td>
              </tr>
              <tr>
                <td className="border border-muted p-3"><code className="text-sm">currency</code></td>
                <td className="border border-muted p-3"><code className="text-sm">string</code></td>
                <td className="border border-muted p-3"><span className="text-red-600 font-semibold">Yes</span></td>
                <td className="border border-muted p-3">Currency code ("USD" only)</td>
              </tr>
              <tr className="bg-yellow-50 dark:bg-yellow-950/20">
                <td className="border border-muted p-3"><code className="text-sm">billing_interval</code></td>
                <td className="border border-muted p-3"><code className="text-sm">string</code></td>
                <td className="border border-muted p-3"><span className="text-red-600 font-semibold">Yes</span></td>
                <td className="border border-muted p-3"><strong>"daily"</strong>, <strong>"weekly"</strong>, <strong>"monthly"</strong>, or <strong>"yearly"</strong></td>
              </tr>
              <tr>
                <td className="border border-muted p-3"><code className="text-sm">interval_count</code></td>
                <td className="border border-muted p-3"><code className="text-sm">number</code></td>
                <td className="border border-muted p-3">No</td>
                <td className="border border-muted p-3">Number of intervals between charges (default: 1)</td>
              </tr>
              <tr className="bg-green-50 dark:bg-green-950/20">
                <td className="border border-muted p-3"><code className="text-sm">trial_days</code></td>
                <td className="border border-muted p-3"><code className="text-sm">number</code></td>
                <td className="border border-muted p-3">No</td>
                <td className="border border-muted p-3">Free trial days before first charge (default: 0)</td>
              </tr>
              <tr>
                <td className="border border-muted p-3"><code className="text-sm">max_cycles</code></td>
                <td className="border border-muted p-3"><code className="text-sm">number</code></td>
                <td className="border border-muted p-3">No</td>
                <td className="border border-muted p-3">Maximum billing cycles (null = unlimited)</td>
              </tr>
              <tr>
                <td className="border border-muted p-3"><code className="text-sm">metadata</code></td>
                <td className="border border-muted p-3"><code className="text-sm">object</code></td>
                <td className="border border-muted p-3">No</td>
                <td className="border border-muted p-3">Custom key-value pairs for your internal use</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-xl font-semibold mb-3">Example 1: Monthly SaaS Plan with Trial</h3>
        <h4 className="font-medium mb-2">Request:</h4>
        <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm mb-4">
          <code className="language-bash mt-5">{`curl -X POST https://api.zendfi.tech/api/v1/subscription-plans \\
  -H "Authorization: Bearer zfi_live_abc123..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Pro Plan - Monthly",
    "description": "Full access to all pro features",
    "amount": 29.99,
    "currency": "USD",
    "billing_interval": "monthly",
    "interval_count": 1,
    "trial_days": 14,
    "metadata": {
      "features": ["unlimited_api_calls", "priority_support", "advanced_analytics"],
      "tier": "pro"
    }
  }'`}</code>
        </pre>

        <h4 className="font-medium mb-2">Response: 200 OK</h4>
        <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm mb-6">
          <code className="language-json mt-5">{`{
  "id": "plan_abc123def456",
  "merchant_id": "merchant_xyz789",
  "name": "Pro Plan - Monthly",
  "description": "Full access to all pro features",
  "amount": 29.99,
  "currency": "USD",
  "billing_interval": "monthly",
  "interval_count": 1,
  "trial_days": 14,
  "max_cycles": null,
  "is_active": true,
  "created_at": "2025-10-26T12:00:00Z",
  "subscription_url": "/subscribe/plan_abc123def456"
}`}</code>
        </pre>

        <h3 className="text-xl font-semibold mb-3">Example 2: Annual Plan with Discount</h3>
        <h4 className="font-medium mb-2">Request:</h4>
        <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm mb-4">
          <code className="language-bash mt-5">{`curl -X POST https://api.zendfi.tech/api/v1/subscription-plans \\
  -H "Authorization: Bearer zfi_live_abc123..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Pro Plan - Annual",
    "description": "Save 20% with annual billing!",
    "amount": 287.90,
    "currency": "USD",
    "billing_interval": "yearly",
    "interval_count": 1,
    "trial_days": 0,
    "metadata": {
      "annual_discount": "20%",
      "monthly_equivalent": 23.99
    }
  }'`}</code>
        </pre>

        <h4 className="font-medium mb-2">Response: 200 OK</h4>
        <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm">
          <code className="language-json mt-5">{`{
  "id": "plan_annual_xyz",
  "merchant_id": "merchant_xyz789",
  "name": "Pro Plan - Annual",
  "description": "Save 20% with annual billing!",
  "amount": 287.90,
  "currency": "USD",
  "billing_interval": "yearly",
  "interval_count": 1,
  "trial_days": 0,
  "max_cycles": null,
  "is_active": true,
  "created_at": "2025-10-26T12:05:00Z",
  "subscription_url": "/subscribe/plan_annual_xyz"
}`}</code>
        </pre>
      </section>

      {/* List Subscription Plans */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">List Subscription Plans</h2>
        <p className="text-muted-foreground mb-4">
          Get all subscription plans for your merchant account.
        </p>

        <h3 className="text-xl font-semibold mb-3">Endpoint</h3>
        <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm mb-6">
          <code>GET /api/v1/subscription-plans</code>
        </pre>

        <h3 className="text-xl font-semibold mb-3">Authentication</h3>
        <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm mb-6">
          <code>Authorization: Bearer YOUR_API_KEY</code>
        </pre>

        <h4 className="font-medium mb-2">Example Request</h4>
        <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm mb-4">
          <code className="language-bash mt-5">{`curl -X GET https://api.zendfi.tech/api/v1/subscription-plans \\
  -H "Authorization: Bearer zfi_live_abc123..."`}</code>
        </pre>

        <h4 className="font-medium mb-2">Response: 200 OK</h4>
        <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm">
          <code className="language-json mt-5">{`[
  {
    "id": "plan_abc123def456",
    "merchant_id": "merchant_xyz789",
    "name": "Pro Plan - Monthly",
    "description": "Full access to all pro features",
    "amount": 29.99,
    "currency": "USD",
    "billing_interval": "monthly",
    "interval_count": 1,
    "trial_days": 14,
    "max_cycles": null,
    "is_active": true,
    "created_at": "2025-10-26T12:00:00Z",
    "subscription_url": "/subscribe/plan_abc123def456"
  },
  {
    "id": "plan_annual_xyz",
    "merchant_id": "merchant_xyz789",
    "name": "Pro Plan - Annual",
    "description": "Save 20% with annual billing!",
    "amount": 287.90,
    "currency": "USD",
    "billing_interval": "yearly",
    "interval_count": 1,
    "trial_days": 0,
    "max_cycles": null,
    "is_active": true,
    "created_at": "2025-10-26T12:05:00Z",
    "subscription_url": "/subscribe/plan_annual_xyz"
  }
]`}</code>
        </pre>
      </section>

      {/* Get Subscription Plan */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Get Subscription Plan</h2>
        <p className="text-muted-foreground mb-4">
          Get details of a specific subscription plan. This is a <strong>public endpoint</strong> - no authentication required (perfect for showing plans to potential customers).
        </p>

        <h3 className="text-xl font-semibold mb-3">Endpoint</h3>
        <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm mb-6">
          <code>GET /api/v1/subscription-plans/:plan_id</code>
        </pre>

        <h4 className="font-medium mb-2">Example Request</h4>
        <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm mb-4">
          <code className="language-bash mt-5">{`curl -X GET https://api.zendfi.tech/api/v1/subscription-plans/plan_abc123def456`}</code>
        </pre>

        <h4 className="font-medium mb-2">Response: 200 OK</h4>
        <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm">
          <code className="language-json mt-5">{`{
  "id": "plan_abc123def456",
  "merchant_id": "merchant_xyz789",
  "name": "Pro Plan - Monthly",
  "description": "Full access to all pro features",
  "amount": 29.99,
  "currency": "USD",
  "billing_interval": "monthly",
  "interval_count": 1,
  "trial_days": 14,
  "max_cycles": null,
  "is_active": true,
  "created_at": "2025-10-26T12:00:00Z",
  "subscription_url": "/subscribe/plan_abc123def456"
}`}</code>
        </pre>
      </section>

      {/* Subscribe Customer to Plan */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Subscribe Customer to Plan</h2>
        <p className="text-muted-foreground mb-4">
          Create a subscription for a customer on a specific plan. The customer will be billed automatically at each billing interval.
        </p>

        <h3 className="text-xl font-semibold mb-3">Endpoint</h3>
        <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm mb-6">
          <code>POST /api/v1/subscriptions</code>
        </pre>

        <h3 className="text-xl font-semibold mb-3">Request Parameters</h3>
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full border-collapse border border-muted">
            <thead>
              <tr className="bg-muted/50">
                <th className="border border-muted p-3 text-left font-semibold">Parameter</th>
                <th className="border border-muted p-3 text-left font-semibold">Type</th>
                <th className="border border-muted p-3 text-left font-semibold">Required</th>
                <th className="border border-muted p-3 text-left font-semibold">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-muted p-3"><code className="text-sm">plan_id</code></td>
                <td className="border border-muted p-3"><code className="text-sm">UUID</code></td>
                <td className="border border-muted p-3"><span className="text-red-600 font-semibold">Yes</span></td>
                <td className="border border-muted p-3">Subscription plan ID</td>
              </tr>
              <tr>
                <td className="border border-muted p-3"><code className="text-sm">customer_wallet</code></td>
                <td className="border border-muted p-3"><code className="text-sm">string</code></td>
                <td className="border border-muted p-3"><span className="text-red-600 font-semibold">Yes</span></td>
                <td className="border border-muted p-3">Customer's Solana wallet address</td>
              </tr>
              <tr>
                <td className="border border-muted p-3"><code className="text-sm">customer_email</code></td>
                <td className="border border-muted p-3"><code className="text-sm">string</code></td>
                <td className="border border-muted p-3">No</td>
                <td className="border border-muted p-3">Customer's email for notifications</td>
              </tr>
              <tr>
                <td className="border border-muted p-3"><code className="text-sm">metadata</code></td>
                <td className="border border-muted p-3"><code className="text-sm">object</code></td>
                <td className="border border-muted p-3">No</td>
                <td className="border border-muted p-3">Custom key-value pairs</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h4 className="font-medium mb-2">Example Request</h4>
        <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm mb-4">
          <code className="language-bash mt-5">{`curl -X POST https://api.zendfi.tech/api/v1/subscriptions \\
  -H "Content-Type: application/json" \\
  -d '{
    "plan_id": "plan_abc123def456",
    "customer_wallet": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
    "customer_email": "customer@example.com",
    "metadata": {
      "user_id": "user_12345",
      "signup_source": "landing_page"
    }
  }'`}</code>
        </pre>

        <h4 className="font-medium mb-2">Response: 200 OK</h4>
        <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm mb-4">
          <code className="language-json mt-5">{`{
  "id": "sub_xyz789abc123",
  "plan_id": "plan_abc123def456",
  "plan_name": "Pro Plan - Monthly",
  "customer_wallet": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
  "status": "trialing",
  "current_period_start": "2025-10-26T12:10:00Z",
  "current_period_end": "2025-11-09T12:10:00Z",
  "next_payment_attempt": "2025-11-09T12:10:00Z",
  "cycles_completed": 0,
  "trial_end": "2025-11-09T12:10:00Z",
  "created_at": "2025-10-26T12:10:00Z",
  "payment_url": null
}`}</code>
        </pre>

        <Card className="p-4 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-semibold text-blue-900 dark:text-blue-100 mb-1">Trial Period Behavior</p>
              <p className="text-blue-800 dark:text-blue-200">
                If the plan has <code className="text-xs bg-blue-100 dark:bg-blue-900 px-1 py-0.5 rounded">trial_days &gt; 0</code>, 
                the subscription status will be <code className="text-xs bg-blue-100 dark:bg-blue-900 px-1 py-0.5 rounded">"trialing"</code> and 
                <code className="text-xs bg-blue-100 dark:bg-blue-900 px-1 py-0.5 rounded">payment_url</code> will be <code className="text-xs bg-blue-100 dark:bg-blue-900 px-1 py-0.5 rounded">null</code>. 
                The first payment will happen automatically after the trial ends!
              </p>
            </div>
          </div>
        </Card>
      </section>

      {/* Get Subscription */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Get Subscription</h2>
        <p className="text-muted-foreground mb-4">
          Get details of a specific subscription, including its current status, billing cycle, and payment information.
        </p>

        <h3 className="text-xl font-semibold mb-3">Endpoint</h3>
        <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm mb-6">
          <code>GET /api/v1/subscriptions/:id</code>
        </pre>

        <h4 className="font-medium mb-2">Example Request</h4>
        <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm mb-4">
          <code className="language-bash mt-5">{`curl -X GET https://api.zendfi.tech/api/v1/subscriptions/sub_xyz789abc123`}</code>
        </pre>

        <h4 className="font-medium mb-2">Response: 200 OK</h4>
        <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm">
          <code className="language-json mt-5">{`{
  "id": "sub_xyz789abc123",
  "plan_id": "plan_abc123def456",
  "plan_name": "Pro Plan - Monthly",
  "customer_wallet": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
  "status": "active",
  "current_period_start": "2025-11-09T12:10:00Z",
  "current_period_end": "2025-12-09T12:10:00Z",
  "next_payment_attempt": "2025-12-09T12:10:00Z",
  "cycles_completed": 1,
  "trial_end": null,
  "created_at": "2025-10-26T12:10:00Z",
  "payment_url": "https://zendfi.tech/subscription/sub_xyz789abc123/pay"
}`}</code>
        </pre>
      </section>

      {/* Cancel Subscription */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Cancel Subscription</h2>
        <p className="text-muted-foreground mb-4">
          Cancel a subscription immediately or at the end of the current billing period. Give your customers flexibility in how they end their subscription.
        </p>

        <h3 className="text-xl font-semibold mb-3">Endpoint</h3>
        <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm mb-6">
          <code>POST /api/v1/subscriptions/:id/cancel</code>
        </pre>

        <h3 className="text-xl font-semibold mb-3">Request Parameters</h3>
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full border-collapse border border-muted">
            <thead>
              <tr className="bg-muted/50">
                <th className="border border-muted p-3 text-left font-semibold">Parameter</th>
                <th className="border border-muted p-3 text-left font-semibold">Type</th>
                <th className="border border-muted p-3 text-left font-semibold">Required</th>
                <th className="border border-muted p-3 text-left font-semibold">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-muted p-3"><code className="text-sm">cancel_at_period_end</code></td>
                <td className="border border-muted p-3"><code className="text-sm">boolean</code></td>
                <td className="border border-muted p-3">No</td>
                <td className="border border-muted p-3">If true, subscription continues until period ends (default: false)</td>
              </tr>
              <tr>
                <td className="border border-muted p-3"><code className="text-sm">reason</code></td>
                <td className="border border-muted p-3"><code className="text-sm">string</code></td>
                <td className="border border-muted p-3">No</td>
                <td className="border border-muted p-3">Cancellation reason for your records</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-xl font-semibold mb-3">Example 1: Cancel Immediately</h3>
        <h4 className="font-medium mb-2">Request:</h4>
        <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm mb-4">
          <code className="language-bash mt-5">{`curl -X POST https://api.zendfi.tech/api/v1/subscriptions/sub_xyz789abc123/cancel \\
  -H "Content-Type: application/json" \\
  -d '{
    "cancel_at_period_end": false,
    "reason": "Customer requested cancellation"
  }'`}</code>
        </pre>

        <h4 className="font-medium mb-2">Response: 200 OK</h4>
        <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm mb-6">
          <code className="language-json mt-5">{`{
  "message": "Subscription cancelled successfully",
  "subscription_id": "sub_xyz789abc123",
  "cancel_at_period_end": false
}`}</code>
        </pre>

        <h3 className="text-xl font-semibold mb-3">Example 2: Cancel at Period End</h3>
        <h4 className="font-medium mb-2">Request:</h4>
        <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm mb-4">
          <code className="language-bash mt-5">{`curl -X POST https://api.zendfi.tech/api/v1/subscriptions/sub_xyz789abc123/cancel \\
  -H "Content-Type: application/json" \\
  -d '{
    "cancel_at_period_end": true,
    "reason": "Switching to annual plan"
  }'`}</code>
        </pre>

        <h4 className="font-medium mb-2">Response: 200 OK</h4>
        <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm">
          <code className="language-json mt-5">{`{
  "message": "Subscription cancelled successfully",
  "subscription_id": "sub_xyz789abc123",
  "cancel_at_period_end": true
}`}</code>
        </pre>
      </section>

      {/* Subscription Statuses */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Subscription Statuses</h2>
        <p className="text-muted-foreground mb-4">
          Understanding subscription statuses helps you provide the right experience to your customers.
        </p>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-muted">
            <thead>
              <tr className="bg-muted/50">
                <th className="border border-muted p-3 text-left font-semibold">Status</th>
                <th className="border border-muted p-3 text-left font-semibold">Description</th>
                <th className="border border-muted p-3 text-left font-semibold">What To Do</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-muted p-3"><code className="text-sm bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded">trialing</code></td>
                <td className="border border-muted p-3">In free trial period - no charges yet</td>
                <td className="border border-muted p-3">Grant full access, remind user of trial end date</td>
              </tr>
              <tr>
                <td className="border border-muted p-3"><code className="text-sm bg-green-100 dark:bg-green-900 px-2 py-1 rounded">active</code></td>
                <td className="border border-muted p-3">Subscription is active and billing normally</td>
                <td className="border border-muted p-3">Grant full access, everything is good!</td>
              </tr>
              <tr>
                <td className="border border-muted p-3"><code className="text-sm bg-yellow-100 dark:bg-yellow-900 px-2 py-1 rounded">past_due</code></td>
                <td className="border border-muted p-3">Last payment failed - needs payment</td>
                <td className="border border-muted p-3">Show payment reminder, limited grace period</td>
              </tr>
              <tr>
                <td className="border border-muted p-3"><code className="text-sm bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">paused</code></td>
                <td className="border border-muted p-3">Temporarily paused (future feature)</td>
                <td className="border border-muted p-3">Limited or no access depending on your policy</td>
              </tr>
              <tr>
                <td className="border border-muted p-3"><code className="text-sm bg-red-100 dark:bg-red-900 px-2 py-1 rounded">cancelled</code></td>
                <td className="border border-muted p-3">Subscription cancelled by customer or merchant</td>
                <td className="border border-muted p-3">Revoke access, offer win-back incentives</td>
              </tr>
              <tr>
                <td className="border border-muted p-3"><code className="text-sm bg-purple-100 dark:bg-purple-900 px-2 py-1 rounded">expired</code></td>
                <td className="border border-muted p-3">Reached max_cycles or natural end</td>
                <td className="border border-muted p-3">Revoke access, offer renewal</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Automatic Billing */}
      <section className="mb-12">
        <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-800">
          <h2 className="text-3xl font-bold mb-4">Automatic Billing Magic ✨</h2>
          <p className="text-muted-foreground mb-4">
            ZendFi handles all subscription billing automatically! You don't need to write any cron jobs or background workers. Here's how it works:
          </p>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-lg border border-green-200 dark:border-green-700">
            <h3 className="text-lg font-semibold mb-3">Our Background Worker:</h3>
            <ol className="list-decimal pl-5 space-y-2 text-muted-foreground">
              <li>Runs every hour to check for subscriptions with <code className="text-xs bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded">next_payment_attempt</code> due</li>
              <li>Creates a payment for the billing amount</li>
              <li>Generates a payment link for the customer</li>
              <li>Sends webhook event <code className="text-xs bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded">subscription.payment_due</code> (you can email the customer)</li>
              <li>On successful payment: Advances billing cycle and sends <code className="text-xs bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded">subscription.renewed</code></li>
              <li>On failed payment: Marks subscription <code className="text-xs bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded">past_due</code> and retries later</li>
            </ol>
          </div>

          <Card className="p-4 mt-4 bg-white dark:bg-slate-900 border-green-300 dark:border-green-700">
            <p className="font-semibold text-green-900 dark:text-green-100">
              🎉 Bottom Line: You just create subscriptions and we handle everything else!
            </p>
          </Card>
        </Card>
      </section>

      {/* Webhook Events */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Webhook Events</h2>
        <p className="text-muted-foreground mb-4">
          Stay informed about subscription lifecycle changes with these webhook events. Configure your webhook URL in the merchant dashboard.
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          <Card className="p-4 border-l-4 border-l-green-500">
            <h3 className="font-semibold mb-2">subscription.created</h3>
            <p className="text-sm text-muted-foreground">Customer subscribes to a plan - sent immediately</p>
          </Card>

          <Card className="p-4 border-l-4 border-l-blue-500">
            <h3 className="font-semibold mb-2">subscription.renewed</h3>
            <p className="text-sm text-muted-foreground">Successful billing cycle payment - grant continued access</p>
          </Card>

          <Card className="p-4 border-l-4 border-l-yellow-500">
            <h3 className="font-semibold mb-2">subscription.payment_failed</h3>
            <p className="text-sm text-muted-foreground">Payment failed - send reminder, consider grace period</p>
          </Card>

          <Card className="p-4 border-l-4 border-l-red-500">
            <h3 className="font-semibold mb-2">subscription.cancelled</h3>
            <p className="text-sm text-muted-foreground">Subscription cancelled - revoke access, gather feedback</p>
          </Card>
        </div>

        <h3 className="text-xl font-semibold mt-6 mb-3">Example Webhook Payload</h3>
        <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm">
          <code className="language-json mt-5">{`{
  "event": "subscription.renewed",
  "timestamp": "2025-11-09T12:10:05Z",
  "data": {
    "subscription": {
      "id": "sub_xyz789abc123",
      "plan_id": "plan_abc123def456",
      "plan_name": "Pro Plan - Monthly",
      "customer_wallet": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
      "status": "active",
      "current_period_start": "2025-11-09T12:10:00Z",
      "current_period_end": "2025-12-09T12:10:00Z",
      "cycles_completed": 1
    },
    "payment_id": "pay_renewal_abc123"
  }
}`}</code>
        </pre>

        <Card className="p-4 mt-4 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
          <div className="flex items-start gap-3">
            <Zap className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-semibold text-blue-900 dark:text-blue-100 mb-1">Pro Tip</p>
              <p className="text-blue-800 dark:text-blue-200">
                Use webhooks to send email notifications, update user access, track MRR (Monthly Recurring Revenue), and trigger internal workflows. Check out our <a href="/docs/webhooks" className="underline font-semibold">Webhooks documentation</a> for setup details.
              </p>
            </div>
          </div>
        </Card>
      </section>

      {/* Next Steps */}
      <Card className="p-6 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <h2 className="text-2xl font-bold mb-4">Next Steps</h2>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
            <div>
              <p className="font-semibold">Set up your webhook URL</p>
              <p className="text-sm text-muted-foreground">Configure webhooks in your merchant dashboard to receive subscription events</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
            <div>
              <p className="font-semibold">Create your subscription plans</p>
              <p className="text-sm text-muted-foreground">Use the Create Plan endpoint to set up your pricing tiers</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
            <div>
              <p className="font-semibold">Let ZendFi handle the rest</p>
              <p className="text-sm text-muted-foreground">Automatic billing, payment collection, and renewal management - all taken care of!</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

