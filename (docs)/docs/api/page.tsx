import { Card } from "@/components/ui/card"
import { DollarSign, Zap, Users, Shield, RefreshCw, TestTube, ArrowRight, CheckCircle2, Clock, XCircle, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function APIReference() {
  return (
    <div className="space-y-6 md:space-y-8 max-w-5xl">
      <div>
        <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-2">
          Payments API - Accept Crypto Like a Boss!
        </h1>
        <p className="text-base md:text-lg text-muted-foreground">
          Welcome to the Payments API! This is where the magic happens. Accept one-time crypto payments with a simple API call - perfect for e-commerce checkouts, invoices, donations, tips, and anything else you can dream up. Let's make you a payment pro!
        </p>
      </div>

      {/* Table of Contents */}
      <Card className="p-6 bg-primary/5">
        <h2 className="text-xl font-bold mb-4">Table of Contents</h2>
        <ul className="space-y-2 text-muted-foreground">
          <li className="flex items-center gap-2">
            <ArrowRight className="w-4 h-4 text-primary" />
            <a href="#create-payment" className="hover:text-primary transition-colors">Create a Payment</a>
          </li>
          <li className="flex items-center gap-2">
            <ArrowRight className="w-4 h-4 text-primary" />
            <a href="#get-payment-details" className="hover:text-primary transition-colors">Get Payment Details</a>
          </li>
          <li className="flex items-center gap-2">
            <ArrowRight className="w-4 h-4 text-primary" />
            <a href="#get-payment-status" className="hover:text-primary transition-colors">Get Payment Status</a>
          </li>
          <li className="flex items-center gap-2">
            <ArrowRight className="w-4 h-4 text-primary" />
            <a href="#customer-info" className="hover:text-primary transition-colors">Collect Customer Info</a>
          </li>
          <li className="flex items-center gap-2">
            <ArrowRight className="w-4 h-4 text-primary" />
            <a href="#build-transaction" className="hover:text-primary transition-colors">Build Transaction (Advanced)</a>
          </li>
          <li className="flex items-center gap-2">
            <ArrowRight className="w-4 h-4 text-primary" />
            <a href="#pay-what-you-want" className="hover:text-primary transition-colors">Pay-What-You-Want Payments</a>
          </li>
          <li className="flex items-center gap-2">
            <ArrowRight className="w-4 h-4 text-primary" />
            <a href="#payment-splits" className="hover:text-primary transition-colors">Payment Splits</a>
          </li>
          <li className="flex items-center gap-2">
            <ArrowRight className="w-4 h-4 text-primary" />
            <a href="#idempotency" className="hover:text-primary transition-colors">Idempotency</a>
          </li>
          <li className="flex items-center gap-2">
            <ArrowRight className="w-4 h-4 text-primary" />
            <a href="#errors" className="hover:text-primary transition-colors">Error Handling</a>
          </li>
          <li className="flex items-center gap-2">
            <ArrowRight className="w-4 h-4 text-primary" />
            <a href="#testing" className="hover:text-primary transition-colors">Testing</a>
          </li>
        </ul>
      </Card>

      {/* Create a Payment */}
      <div id="create-payment" className="space-y-4">
        <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2">
          Create a Payment
        </h2>
        <p className="text-muted-foreground">
          Create a one-time payment request in seconds! You'll get back a QR code and payment URL that you can show to your customer. They scan/connect, approve, done!
        </p>

        <Card className="p-6">
          <h3 className="text-lg font-bold mb-2">Endpoint</h3>
          <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
            <code>POST /api/v1/payments</code>
          </pre>

          <h3 className="text-lg font-bold mb-2">Authentication</h3>
          <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
            <code>Authorization: Bearer YOUR_API_KEY</code>
          </pre>

          <h3 className="text-lg font-bold mb-3">Headers</h3>
          <div className="overflow-x-auto mb-4">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2 font-semibold">Header</th>
                  <th className="text-left p-2 font-semibold">Required</th>
                  <th className="text-left p-2 font-semibold">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2"><code>Authorization</code></td>
                  <td className="p-2"><strong>Yes</strong></td>
                  <td className="p-2">Bearer token with your API key</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2"><code>Content-Type</code></td>
                  <td className="p-2"><strong>Yes</strong></td>
                  <td className="p-2">Must be <code>application/json</code></td>
                </tr>
                <tr className="border-b">
                  <td className="p-2"><code>Idempotency-Key</code></td>
                  <td className="p-2">No</td>
                  <td className="p-2">Unique key to prevent duplicate payments</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-bold mb-3">Request Body - Basic Parameters</h3>
          <div className="overflow-x-auto mb-4">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2 font-semibold">Parameter</th>
                  <th className="text-left p-2 font-semibold">Type</th>
                  <th className="text-left p-2 font-semibold">Required</th>
                  <th className="text-left p-2 font-semibold">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2"><code>amount</code></td>
                  <td className="p-2">number</td>
                  <td className="p-2"><strong>Yes</strong></td>
                  <td className="p-2">Payment amount in USD (0.01 - 10,000.00)</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2"><code>currency</code></td>
                  <td className="p-2">string</td>
                  <td className="p-2"><strong>Yes</strong></td>
                  <td className="p-2">Currency code. Only <code>"USD"</code> supported</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2"><code>token</code></td>
                  <td className="p-2">string</td>
                  <td className="p-2">No</td>
                  <td className="p-2">Token for payment: <code>"USDC"</code> (default), <code>"SOL"</code>, or <code>"USDT"</code></td>
                </tr>
                <tr className="border-b">
                  <td className="p-2"><code>description</code></td>
                  <td className="p-2">string</td>
                  <td className="p-2">No</td>
                  <td className="p-2">Payment description (max 500 characters)</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2"><code>metadata</code></td>
                  <td className="p-2">object</td>
                  <td className="p-2">No</td>
                  <td className="p-2">Custom key-value pairs for your reference</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2"><code>webhook_url</code></td>
                  <td className="p-2">string</td>
                  <td className="p-2">No</td>
                  <td className="p-2">Override merchant's default webhook URL for this payment</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2"><code>settlement_preference_override</code></td>
                  <td className="p-2">string</td>
                  <td className="p-2">No</td>
                  <td className="p-2">Override settlement: <code>"auto_usdc"</code> or <code>"direct_token"</code></td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-bold mb-3">Pay-What-You-Want Parameters</h3>
          <div className="overflow-x-auto mb-4">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2 font-semibold">Parameter</th>
                  <th className="text-left p-2 font-semibold">Type</th>
                  <th className="text-left p-2 font-semibold">Required</th>
                  <th className="text-left p-2 font-semibold">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2"><code>allow_custom_amount</code></td>
                  <td className="p-2">boolean</td>
                  <td className="p-2">No</td>
                  <td className="p-2">Enable customer to choose amount (default: <code>false</code>)</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2"><code>minimum_amount</code></td>
                  <td className="p-2">number</td>
                  <td className="p-2">Conditional</td>
                  <td className="p-2"><strong>Required</strong> if <code>allow_custom_amount</code> is <code>true</code></td>
                </tr>
                <tr className="border-b">
                  <td className="p-2"><code>maximum_amount</code></td>
                  <td className="p-2">number</td>
                  <td className="p-2">No</td>
                  <td className="p-2">Optional ceiling for custom amounts</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2"><code>suggested_amount</code></td>
                  <td className="p-2">number</td>
                  <td className="p-2">No</td>
                  <td className="p-2">Suggested amount shown to customer</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-bold mb-3">Payment Splits Parameters</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2 font-semibold">Parameter</th>
                  <th className="text-left p-2 font-semibold">Type</th>
                  <th className="text-left p-2 font-semibold">Required</th>
                  <th className="text-left p-2 font-semibold">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2"><code>split_recipient</code></td>
                  <td className="p-2">array</td>
                  <td className="p-2">No</td>
                  <td className="p-2">Array of recipients for split payments</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>

        {/* Example 1: Simple USDC Payment */}
        <Card className="p-6 border-primary/50">
          <h3 className="text-lg font-bold mb-3">Example 1: Simple USDC Payment (The Classic!)</h3>
          <p className="text-muted-foreground mb-4">
            Let's create a basic payment - this is probably what you'll use 90% of the time. Super straightforward!
          </p>

          <h4 className="font-semibold mb-2">Request:</h4>
          <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
            <code className="language-bash mt-10">{`curl -X POST https://api.zendfi.tech/api/v1/payments \\
  -H "Authorization: Bearer zendfi_live_abc123..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "amount": 99.99,
    "currency": "USD",
    "description": "Premium Plan - Annual Subscription",
    "token": "USDC",
    "metadata": {
      "customer_id": "cus_12345",
      "plan": "premium_annual",
      "seats": 5
    }
  }'`}</code>
          </pre>

          <h4 className="font-semibold mb-2">Response: 200 OK</h4>
          <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
            <code className="language-json mt-10">{`{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "amount": 99.99,
  "currency": "USD",
  "token": "USDC",
  "description": "Premium T-Shirt - Size L",
  "status": "Pending",
  "qr_code": "solana:6qWDyySDsrWbUqXCzwaxVYc47xTaZVUEdeC9apdo6Ewa?amount=99990000&spl-token=EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v&reference=550e8400-e29b-41d4-a716-446655440000&label=Zendfi%20Payment%20(USDC)&message=Payment%20550e8400-e29b-41d4-a716-446655440000",
  "payment_url": "https://api.zendfi.tech/pay/550e8400-e29b-41d4-a716-446655440000",
  "mode": "live",
  "expires_at": "2025-11-10T12:30:00.000Z",
  "created_at": "2025-11-10T12:15:00.000Z",
  "customer_wallet": null,
  "transaction_signature": null,
  "confirmed_at": null,
  "metadata": {
    "order_id": "order_12345",
    "customer_email": "customer@example.com"
  },
  "settlement_info": {
    "estimated_processing_time": "2025-11-10T13:00:00.000Z",
    "batch_schedule": "Every 30 minutes",
    "processing_message": "Estimated settlement in ~45 minutes after confirmation"
  },
  "split_ids": null
}`}</code>
          </pre>
        </Card>

        {/* Example 2: SOL Payment */}
        <Card className="p-6">
          <h3 className="text-lg font-bold mb-3">Example 2: SOL Payment (For the SOL Lovers! ☀️)</h3>
          <p className="text-muted-foreground mb-4">
            Want to accept Solana's native token? No problem! Same API, different token.
          </p>

          <h4 className="font-semibold mb-2">Request:</h4>
          <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
            <code className="language-bash mt-10">{`curl -X POST https://api.zendfi.tech/api/v1/payments \\
  -H "Authorization: Bearer zendfi_live_abc123..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "amount": 50.00,
    "currency": "USD",
    "description": "Coffee Subscription Box",
    "token": "SOL"
  }'`}</code>
          </pre>

          <h4 className="font-semibold mb-2">Response: 200 OK</h4>
          <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
            <code className="language-json mt-10">{`{
  "id": "payment_sol123",
  "amount": 50.00,
  "currency": "USD",
  "token": "SOL",
  "description": "Coffee Subscription Box",
  "status": "Pending",
  "qr_code": "solana:6qWDyySDsrWbUqXCzwaxVYc47xTaZVUEdeC9apdo6Ewa?amount=50000000000&reference=payment_sol123&label=Zendfi%20Payment%20(SOL)&message=Payment%20payment_sol123",
  "payment_url": "https://api.zendfi.tech/pay/payment_sol123",
  "mode": "live",
  "expires_at": "2025-11-10T12:30:00.000Z",
  "created_at": "2025-11-10T12:15:00.000Z",
  "customer_wallet": null,
  "transaction_signature": null,
  "confirmed_at": null,
  "metadata": {},
  "settlement_info": {
    "estimated_processing_time": "2025-11-10T13:00:00.000Z",
    "batch_schedule": "Every 30 minutes",
    "processing_message": "Estimated settlement in ~45 minutes after confirmation"
  },
  "split_ids": null
}`}</code>
          </pre>
        </Card>

        {/* Example 3: Pay-What-You-Want */}
        <Card className="p-6">
          <h3 className="text-lg font-bold mb-3">Example 3: Pay-What-You-Want (Perfect for Donations!)</h3>
          <p className="text-muted-foreground mb-4">
            Let your customers choose how much to pay! Great for donations, tips, or flexible pricing. Power to the people!
          </p>

          <h4 className="font-semibold mb-2">Request:</h4>
          <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
            <code className="language-bash mt-10">{`curl -X POST https://api.zendfi.tech/api/v1/payments \\
  -H "Authorization: Bearer zendfi_live_abc123..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "amount": 10.00,
    "currency": "USD",
    "description": "Support our open-source project",
    "allow_custom_amount": true,
    "minimum_amount": 1.00,
    "maximum_amount": 1000.00,
    "suggested_amount": 10.00,
    "metadata": {
      "campaign": "winter_2025",
      "source": "homepage"
    }
  }'`}</code>
          </pre>

          <h4 className="font-semibold mb-2">Response: 200 OK</h4>
          <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
            <code className="language-json mt-10">{`{
  "id": "payment_pwyw123",
  "amount": 10.00,
  "currency": "USD",
  "token": "USDC",
  "description": "Support our open-source project",
  "status": "Pending",
  "qr_code": "solana:...",
  "payment_url": "https://api.zendfi.tech/pay/payment_pwyw123",
  "mode": "live",
  "expires_at": "2025-11-10T12:30:00.000Z",
  "created_at": "2025-11-10T12:15:00.000Z",
  "customer_wallet": null,
  "transaction_signature": null,
  "confirmed_at": null,
  "metadata": {
    "campaign": "winter_2025",
    "source": "homepage"
  },
  "settlement_info": null,
  "split_ids": null
}`}</code>
          </pre>

          <p className="text-sm text-muted-foreground">
            <strong>Customer experience:</strong> The payment page shows a slider or input allowing amounts from $1.00 to $1,000.00, with $10.00 pre-selected. They pick what feels right!
          </p>
        </Card>

        {/* Example 4: Custom Webhook */}
        <Card className="p-6">
          <h3 className="text-lg font-bold mb-3">Example 4: Payment with Custom Webhook (Route Notifications Your Way!)</h3>
          <p className="text-muted-foreground mb-4">
            Need this payment's notifications to go somewhere specific? Override the webhook URL per payment!
          </p>

          <h4 className="font-semibold mb-2">Request:</h4>
          <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
            <code className="language-bash mt-10">{`curl -X POST https://api.zendfi.tech/api/v1/payments \\
  -H "Authorization: Bearer zendfi_live_abc123..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "amount": 29.99,
    "currency": "USD",
    "description": "Event Ticket - VIP Pass",
    "webhook_url": "https://mytickets.com/webhooks/payment-confirmed",
    "metadata": {
      "event_id": "evt_20251231",
      "ticket_type": "vip",
      "email": "customer@example.com"
    }
  }'`}</code>
          </pre>

          <h4 className="font-semibold mb-2">Response: 200 OK</h4>
          <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
            <code className="language-json mt-10">{`{
  "id": "payment_evt123",
  "amount": 29.99,
  "currency": "USD",
  "token": "USDC",
  "description": "Event Ticket - VIP Pass",
  "status": "Pending",
  "qr_code": "solana:...",
  "payment_url": "https://api.zendfi.tech/pay/payment_evt123",
  "mode": "live",
  "expires_at": "2025-11-10T12:30:00.000Z",
  "created_at": "2025-11-10T12:15:00.000Z",
  "customer_wallet": null,
  "transaction_signature": null,
  "confirmed_at": null,
  "metadata": {
    "event_id": "evt_20251231",
    "ticket_type": "vip",
    "email": "customer@example.com"
  },
  "settlement_info": null,
  "split_ids": null
}`}</code>
          </pre>

          <p className="text-sm text-muted-foreground">
            <strong>Note:</strong> This payment's confirmation will be sent to <code className="bg-slate-100 border rounded-sm font-mono text-gray-600 px-[5px] py-[2px] text-xs">https://mytickets.com/webhooks/payment-confirmed</code> instead of your default webhook URL.
          </p>
        </Card>

        {/* Response Fields */}
        <Card className="p-6">
          <h3 className="text-lg font-bold mb-3">Complete Response Schema</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Here's EVERYTHING you get back when creating a payment. No surprises, complete transparency! 🎯
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2 font-semibold">Field</th>
                  <th className="text-left p-2 font-semibold">Type</th>
                  <th className="text-left p-2 font-semibold">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2"><code>id</code></td>
                  <td className="p-2">string (UUID)</td>
                  <td className="p-2">Unique payment identifier</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2"><code>amount</code></td>
                  <td className="p-2">number</td>
                  <td className="p-2">Payment amount in specified currency</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2"><code>currency</code></td>
                  <td className="p-2">string</td>
                  <td className="p-2">Currency code (currently <code>USD</code> only)</td>
                </tr>
                <tr className="border-b bg-green-50">
                  <td className="p-2"><code>token</code></td>
                  <td className="p-2">string</td>
                  <td className="p-2">Crypto token used: <code>USDC</code> (default), <code>SOL</code>, or <code>USDT</code></td>
                </tr>
                <tr className="border-b bg-green-50">
                  <td className="p-2"><code>description</code></td>
                  <td className="p-2">string|null</td>
                  <td className="p-2">Payment description (if provided)</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2"><code>status</code></td>
                  <td className="p-2">string</td>
                  <td className="p-2"><code>Pending</code>, <code>Confirmed</code>, <code>Failed</code>, or <code>Expired</code></td>
                </tr>
                <tr className="border-b">
                  <td className="p-2"><code>qr_code</code></td>
                  <td className="p-2">string</td>
                  <td className="p-2">Solana Pay QR code URI (show this to customers!)</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2"><code>payment_url</code></td>
                  <td className="p-2">string (URL)</td>
                  <td className="p-2">Hosted payment page URL (or redirect customers here)</td>
                </tr>
                <tr className="border-b bg-yellow-50">
                  <td className="p-2"><code>mode</code></td>
                  <td className="p-2">string</td>
                  <td className="p-2"><code>"test"</code> or <code>"live"</code> - which network this payment uses (CRITICAL!)</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2"><code>expires_at</code></td>
                  <td className="p-2">string (ISO 8601)</td>
                  <td className="p-2">Payment expiration timestamp (15 minutes from creation)</td>
                </tr>
                <tr className="border-b bg-green-50">
                  <td className="p-2"><code>created_at</code></td>
                  <td className="p-2">string (ISO 8601)</td>
                  <td className="p-2">When this payment was created</td>
                </tr>
                <tr className="border-b bg-green-50">
                  <td className="p-2"><code>customer_wallet</code></td>
                  <td className="p-2">string|null</td>
                  <td className="p-2">Customer's Solana wallet address (filled after payment submitted)</td>
                </tr>
                <tr className="border-b bg-green-50">
                  <td className="p-2"><code>transaction_signature</code></td>
                  <td className="p-2">string|null</td>
                  <td className="p-2">Solana transaction signature (filled after payment confirmed on-chain)</td>
                </tr>
                <tr className="border-b bg-green-50">
                  <td className="p-2"><code>confirmed_at</code></td>
                  <td className="p-2">string|null</td>
                  <td className="p-2">When payment was confirmed on-chain (null until confirmed)</td>
                </tr>
                <tr className="border-b bg-green-50">
                  <td className="p-2"><code>metadata</code></td>
                  <td className="p-2">object</td>
                  <td className="p-2">Your custom metadata (if provided in request)</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2"><code>settlement_info</code></td>
                  <td className="p-2">object|null</td>
                  <td className="p-2">Settlement details (estimated processing time, batch schedule)</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2"><code>split_ids</code></td>
                  <td className="p-2">array|null</td>
                  <td className="p-2">Array of split payment IDs (if <code>split_recipients</code> used)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-900">
              <strong>💡 Pro Tip:</strong> Fields highlighted in <span className="bg-green-200 px-1 rounded">green</span> are filled progressively as the payment moves through its lifecycle.
              The <span className="bg-yellow-200 px-1 rounded">mode</span> field is CRITICAL - it tells you which Solana network (testnet/mainnet) to verify the transaction on!
            </p>
          </div>
        </Card>

        {/* Error Responses */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold">Error Responses</h3>

          <Card className="p-4">
            <h4 className="font-semibold mb-2">400 Bad Request - Invalid Amount</h4>
            <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
              <code className="language-json mt-10">{`{
  "error": {
    "message": "Invalid payment amount: Amount must be between $0.01 and $10,000.00",
    "field": "amount",
    "value": 0
  }
}`}</code>
            </pre>
          </Card>

          <Card className="p-4">
            <h4 className="font-semibold mb-2">400 Bad Request - Invalid Currency</h4>
            <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
              <code className="language-json mt-10">{`{
  "error": {
    "message": "Only USD currency is supported",
    "field": "currency",
    "supported_values": ["USD"]
  }
}`}</code>
            </pre>
          </Card>

          <Card className="p-4">
            <h4 className="font-semibold mb-2">400 Bad Request - Invalid Token</h4>
            <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
              <code className="language-json mt-10">{`{
  "error": {
    "message": "Unsupported token. Supported tokens: USDC, SOL, USDT",
    "field": "token",
    "value": "BTC"
  }
}`}</code>
            </pre>
          </Card>

          <Card className="p-4">
            <h4 className="font-semibold mb-2">400 Bad Request - Invalid PWYW Config</h4>
            <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
              <code className="language-json mt-10">{`{
  "error": {
    "message": "Invalid pay-what-you-want configuration: minimum_amount is required when allow_custom_amount is true",
    "field": "pwyw_config"
  }
}`}</code>
            </pre>
          </Card>

          <Card className="p-4">
            <h4 className="font-semibold mb-2">400 Bad Request - Invalid Description</h4>
            <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
              <code className="language-json mt-10">{`{
  "error": {
    "message": "Invalid description: Description cannot exceed 500 characters",
    "field": "description"
  }
}`}</code>
            </pre>
          </Card>

          <Card className="p-4">
            <h4 className="font-semibold mb-2">401 Unauthorized</h4>
            <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
              <code className="language-json mt-10">{`{
  "error": "unauthorized",
  "message": "Invalid or missing API key"
}`}</code>
            </pre>
          </Card>

          <Card className="p-4">
            <h4 className="font-semibold mb-2">429 Too Many Requests - Limits Exceeded</h4>
            <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
              <code className="language-json mt-10">{`{
  "error": {
    "message": "Payment limits exceeded",
    "details": "You have exceeded your daily volume, payment amount, or rate limits",
    "contact": "Contact support to increase your limits"
  }
}`}</code>
            </pre>
            <div className="text-sm text-muted-foreground">
              <p className="font-semibold mb-2">Default Limits:</p>
              <ul className="space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Max single payment: $10,000</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Daily volume: $50,000</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Hourly requests: 100</span>
                </li>
              </ul>
              <p className="mt-2">Contact support@zendfi.tech to increase your limits.</p>
            </div>
          </Card>

          <Card className="p-4">
            <h4 className="font-semibold mb-2">500 Internal Server Error</h4>
            <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
              <code className="language-json mt-10">{`{
  "error": {
    "message": "Failed to create payment"
  }
}`}</code>
            </pre>
          </Card>
        </div>
      </div>

      {/* Get Payment Details */}
      <div id="get-payment-details" className="space-y-4">
        <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2">
          <RefreshCw className="w-6 h-6 text-primary" />
          Get Payment Details
        </h2>
        <p className="text-muted-foreground">
          Retrieve full details for a specific payment, including transaction signature, customer wallet, and settlement info.
        </p>

        <Card className="p-6">
          <h3 className="text-lg font-bold mb-2">Endpoint</h3>
          <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
            <code>GET /api/v1/payments/:id</code>
          </pre>

          <h3 className="text-lg font-bold mb-2">Authentication</h3>
          <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
            <code>Authorization: Bearer YOUR_API_KEY</code>
          </pre>

          <h3 className="text-lg font-bold mb-3">Path Parameters</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2 font-semibold">Parameter</th>
                  <th className="text-left p-2 font-semibold">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2"><code>id</code></td>
                  <td className="p-2">Payment ID (UUID)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-bold mb-3">Example Request</h3>
          <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
            <code className="language-bash mt-10">{`curl -X GET https://api.zendfi.tech/api/v1/payments/550e8400-e29b-41d4-a716-446655440000 \\
  -H "Authorization: Bearer zendfi_live_abc123..."`}</code>
          </pre>

          <h3 className="text-lg font-bold mb-3">Response: 200 OK</h3>
          <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
            <code className="language-json mt-10">{`{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "merchant_id": "merchant_abc123",
  "amount": 99.99,
  "currency": "USD",
  "status": "Confirmed",
  "token": "USDC",
  "description": "Premium Plan - Annual Subscription",
  "transaction_signature": "5j7s6JP28XvC1jQeU3hpkKHqRVEkBpDLrEr3cKXXJPaG7W2yQSp6YJ7s6JP28XvC1",
  "customer_wallet": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
  "metadata": {
    "customer_id": "cus_12345",
    "plan": "premium_annual",
    "seats": 5
  },
  "qr_code": "solana:...",
  "payment_url": "https://api.zendfi.tech/pay/550e8400-e29b-41d4-a716-446655440000",
  "created_at": "2025-10-26T12:15:00.000Z",
  "confirmed_at": "2025-10-26T12:17:30.000Z",
  "expires_at": "2025-10-26T12:30:00.000Z",
  "settlement_status": "completed",
  "settlement_signature": "3k8n5TY89VvD2kRfV4iqmLKtSWFjDnMoRcWr4dJYKPcH8N3qZTp7ZK8n5TY89VvD2"
}`}</code>
          </pre>
        </Card>

        <Card className="p-4">
          <h3 className="text-lg font-bold mb-2">Error Response - 404 Not Found</h3>
          <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
            <code className="language-json mt-10">{`{
  "error": "payment_not_found",
  "message": "No payment found with ID: 550e8400-e29b-41d4-a716-446655440000"
}`}</code>
          </pre>
        </Card>
      </div>

      {/* Get Payment Status */}
      <div id="get-payment-status" className="space-y-4">
        <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2">
          <Clock className="w-6 h-6 text-primary" />
          Get Payment Status
        </h2>
        <p className="text-muted-foreground">
          Quick status check! Use this when you just need to know "has this payment been confirmed yet?" Perfect for polling or manual checks. 🔍
        </p>

        <Card className="p-6">
          <h3 className="text-lg font-bold mb-2">Endpoint</h3>
          <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
            <code className="lanua">GET /api/v1/payments/:id/status</code>
          </pre>

          <h3 className="text-lg font-bold mb-2">Authentication</h3>
          <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
            <code>Authorization: Bearer YOUR_API_KEY</code>
          </pre>

          <h3 className="text-lg font-bold mb-3">Path Parameters</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2 font-semibold">Parameter</th>
                  <th className="text-left p-2 font-semibold">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2"><code>id</code></td>
                  <td className="p-2">Payment ID (UUID)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-bold mb-3">Example Request</h3>
          <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
            <code className="language-bash mt-10">{`curl -X GET https://api.zendfi.tech/api/v1/payments/550e8400-e29b-41d4-a716-446655440000/status \\
  -H "Authorization: Bearer zendfi_live_abc123..."`}</code>
          </pre>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-bold mb-3">Response: 200 OK - Pending</h3>
          <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
            <code className="language-json mt-10">{`{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "status": "Pending",
  "amount": 99.99,
  "currency": "USD",
  "transaction_signature": null,
  "confirmed_at": null,
  "settlement_status": "not_started"
}`}</code>
          </pre>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-bold mb-3">Response: 200 OK - Confirmed</h3>
          <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
            <code className="language-json mt-10">{`{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "status": "Confirmed",
  "amount": 99.99,
  "currency": "USD",
  "transaction_signature": "5j7s6JP28XvC1jQeU3hpkKHqRVEkBpDLrEr3cKXXJPaG7W2yQSp6YJ7s6JP28XvC1",
  "confirmed_at": "2025-10-26T12:17:30.000Z",
  "settlement_status": "processing",
  "customer_wallet": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU"
}`}</code>
          </pre>
        </Card>

        <div className="grid md:grid-cols-2 gap-4">
          <Card className="p-4">
            <h3 className="text-lg font-bold mb-3">Payment Statuses</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <Clock className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm">Pending</p>
                  <p className="text-xs text-muted-foreground">Waiting for customer payment. Customer should complete payment within 15 minutes</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm">Confirmed</p>
                  <p className="text-xs text-muted-foreground">Payment received and verified! Settlement is processing or completed</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm">Failed</p>
                  <p className="text-xs text-muted-foreground">Transaction failed. Create a new payment if needed</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm">Expired</p>
                  <p className="text-xs text-muted-foreground">Payment window expired. Create a new payment</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <h3 className="text-lg font-bold mb-3">Settlement Statuses</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <div>
                  <p className="font-semibold">not_started</p>
                  <p className="text-xs text-muted-foreground">Payment not yet confirmed</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <div>
                  <p className="font-semibold">processing</p>
                  <p className="text-xs text-muted-foreground">Settlement in progress</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <div>
                  <p className="font-semibold">completed</p>
                  <p className="text-xs text-muted-foreground">Funds in your wallet!</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <div>
                  <p className="font-semibold">failed</p>
                  <p className="text-xs text-muted-foreground">Settlement failed (rare - contact support immediately)</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Customer Info Collection */}
      <div id="customer-info" className="space-y-4">
        <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2">
          <Users className="w-6 h-6 text-primary" />
          Collect Customer Information
        </h2>
        <p className="text-muted-foreground">
          Need to collect customer details during checkout? Email, name, billing address, shipping info - we've got you covered! Perfect for e-commerce, invoices, and KYC. 📝
        </p>

        <Card className="p-6 bg-blue-50 border-blue-200">
          <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
            <Zap className="w-5 h-5 text-blue-600" />
            Why Collect Customer Info?
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
            <li><strong>E-commerce:</strong> Get shipping addresses for physical products</li>
            <li><strong>Invoicing:</strong> Proper billing information for records</li>
            <li><strong>Tax compliance:</strong> Meet your regional tax requirements</li>
            <li><strong>Customer support:</strong> Easy communication via email</li>
            <li><strong>Analytics:</strong> Better understand your customer base</li>
          </ul>
        </Card>

        {/* Submit Customer Info */}
        <Card className="p-6">
          <h3 className="text-lg font-bold mb-2">Submit Customer Information</h3>
          <p className="text-sm text-muted-foreground mb-4">
            After creating a payment, collect customer details before or during checkout.
          </p>

          <h4 className="font-semibold mb-2">Endpoint</h4>
          <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm mb-4">
            <code>POST /api/v1/payments/:payment_id/customer-info</code>
          </pre>

          <h4 className="font-semibold mb-2">Authentication</h4>
          <p className="text-sm text-muted-foreground mb-4">
            ⚠️ <strong>No authentication required</strong> - this is a <strong>public endpoint</strong>. Customers can submit their own info!
          </p>

          <h4 className="font-semibold mb-3">Request Body</h4>
          <div className="overflow-x-auto mb-4">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2 font-semibold">Field</th>
                  <th className="text-left p-2 font-semibold">Type</th>
                  <th className="text-left p-2 font-semibold">Required</th>
                  <th className="text-left p-2 font-semibold">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2"><code>email</code></td>
                  <td className="p-2">string</td>
                  <td className="p-2"><strong>Yes</strong></td>
                  <td className="p-2">Customer email address</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2"><code>name</code></td>
                  <td className="p-2">string</td>
                  <td className="p-2">No</td>
                  <td className="p-2">Full name</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2"><code>phone</code></td>
                  <td className="p-2">string</td>
                  <td className="p-2">No</td>
                  <td className="p-2">Phone number</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2"><code>company</code></td>
                  <td className="p-2">string</td>
                  <td className="p-2">No</td>
                  <td className="p-2">Company name</td>
                </tr>
                <tr className="border-b bg-blue-50">
                  <td className="p-2" colSpan={4}><strong>Billing Address (all optional)</strong></td>
                </tr>
                <tr className="border-b">
                  <td className="p-2"><code>billing_address_line1</code></td>
                  <td className="p-2">string</td>
                  <td className="p-2">No</td>
                  <td className="p-2">Street address</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2"><code>billing_address_line2</code></td>
                  <td className="p-2">string</td>
                  <td className="p-2">No</td>
                  <td className="p-2">Apartment, suite, etc.</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2"><code>billing_city</code></td>
                  <td className="p-2">string</td>
                  <td className="p-2">No</td>
                  <td className="p-2">City</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2"><code>billing_state</code></td>
                  <td className="p-2">string</td>
                  <td className="p-2">No</td>
                  <td className="p-2">State/Province</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2"><code>billing_postal_code</code></td>
                  <td className="p-2">string</td>
                  <td className="p-2">No</td>
                  <td className="p-2">ZIP/Postal code</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2"><code>billing_country</code></td>
                  <td className="p-2">string</td>
                  <td className="p-2">No</td>
                  <td className="p-2">Country code (ISO 3166-1 alpha-2)</td>
                </tr>
                <tr className="border-b bg-green-50">
                  <td className="p-2" colSpan={4}><strong>Shipping Address (all optional)</strong></td>
                </tr>
                <tr className="border-b">
                  <td className="p-2"><code>shipping_address_line1</code></td>
                  <td className="p-2">string</td>
                  <td className="p-2">No</td>
                  <td className="p-2">Street address</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2"><code>shipping_address_line2</code></td>
                  <td className="p-2">string</td>
                  <td className="p-2">No</td>
                  <td className="p-2">Apartment, suite, etc.</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2"><code>shipping_city</code></td>
                  <td className="p-2">string</td>
                  <td className="p-2">No</td>
                  <td className="p-2">City</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2"><code>shipping_state</code></td>
                  <td className="p-2">string</td>
                  <td className="p-2">No</td>
                  <td className="p-2">State/Province</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2"><code>shipping_postal_code</code></td>
                  <td className="p-2">string</td>
                  <td className="p-2">No</td>
                  <td className="p-2">ZIP/Postal code</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2"><code>shipping_country</code></td>
                  <td className="p-2">string</td>
                  <td className="p-2">No</td>
                  <td className="p-2">Country code (ISO 3166-1 alpha-2)</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2"><code>custom_fields</code></td>
                  <td className="p-2">object</td>
                  <td className="p-2">No</td>
                  <td className="p-2">Your own custom data</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h4 className="font-semibold mb-2">Example Request</h4>
          <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
            <code className="language-bash mt-10">{`curl -X POST https://api.zendfi.tech/api/v1/payments/550e8400-e29b-41d4-a716-446655440000/customer-info \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "customer@example.com",
    "name": "Alex Thompson",
    "phone": "+1-415-555-0123",
    "company": "Tech Startup Inc",
    "billing_address_line1": "123 Main Street",
    "billing_address_line2": "Suite 400",
    "billing_city": "San Francisco",
    "billing_state": "CA",
    "billing_postal_code": "94102",
    "billing_country": "US",
    "shipping_address_line1": "456 Oak Avenue",
    "shipping_city": "Oakland",
    "shipping_state": "CA",
    "shipping_postal_code": "94612",
    "shipping_country": "US",
    "custom_fields": {
      "newsletter_opt_in": true,
      "referral_source": "twitter"
    }
  }'`}</code>
          </pre>

          <h4 className="font-semibold mb-2 mt-4">Response: 200 OK</h4>
          <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
            <code className="language-json mt-10">{`{
  "success": true,
  "customer_id": "cus_abc123...",
  "payment_id": "550e8400-e29b-41d4-a716-446655440000",
  "message": "Customer information saved successfully"
}`}</code>
          </pre>
        </Card>

        {/* Get Customer Info */}
        <Card className="p-6">
          <h3 className="text-lg font-bold mb-2">Retrieve Customer Information</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Get the customer info associated with a payment.
          </p>

          <h4 className="font-semibold mb-2">Endpoint</h4>
          <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm mb-4">
            <code>GET /api/v1/payments/:payment_id/customer-info</code>
          </pre>

          <h4 className="font-semibold mb-2">Authentication</h4>
          <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm mb-4">
            <code>Authorization: Bearer YOUR_API_KEY</code>
          </pre>

          <h4 className="font-semibold mb-2">Example Request</h4>
          <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
            <code className="language-bash mt-10">{`curl -X GET https://api.zendfi.tech/api/v1/payments/550e8400-e29b-41d4-a716-446655440000/customer-info \\
  -H "Authorization: Bearer zendfi_live_abc123..."`}</code>
          </pre>

          <h4 className="font-semibold mb-2 mt-4">Response: 200 OK</h4>
          <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
            <code className="language-json mt-10">{`{
  "id": "cus_abc123...",
  "payment_id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "customer@example.com",
  "name": "Alex Thompson",
  "phone": "+1-415-555-0123",
  "company": "Tech Startup Inc",
  "billing_address_line1": "123 Main Street",
  "billing_address_line2": "Suite 400",
  "billing_city": "San Francisco",
  "billing_state": "CA",
  "billing_postal_code": "94102",
  "billing_country": "US",
  "shipping_address_line1": "456 Oak Avenue",
  "shipping_address_line2": null,
  "shipping_city": "Oakland",
  "shipping_state": "CA",
  "shipping_postal_code": "94612",
  "shipping_country": "US",
  "custom_fields": {
    "newsletter_opt_in": true,
    "referral_source": "twitter"
  },
  "ip_address": "192.168.1.100",
  "user_agent": "Mozilla/5.0...",
  "created_at": "2025-11-10T12:16:30.000Z",
  "updated_at": "2025-11-10T12:16:30.000Z"
}`}</code>
          </pre>

          <p className="text-sm text-muted-foreground mt-4">
            💡 <strong>Privacy Note:</strong> Customer data is stored securely and only accessible to the merchant who created the payment. Always comply with GDPR, CCPA, and other privacy regulations!
          </p>
        </Card>

        {/* Use Cases */}
        <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <h3 className="text-lg font-bold mb-3">Perfect Use Cases</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-sm mb-2">🛍️ E-commerce</h4>
              <p className="text-xs text-muted-foreground">Collect shipping addresses for physical products. Billing info for invoices.</p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-2">📄 Invoicing</h4>
              <p className="text-xs text-muted-foreground">Professional invoices need proper customer details.</p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-2">🎟️ Event Tickets</h4>
              <p className="text-xs text-muted-foreground">Email tickets instantly. Know who's attending.</p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-2">💼 B2B Payments</h4>
              <p className="text-xs text-muted-foreground">Company info for proper accounting.</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Build Transaction (Advanced) */}
      <div id="build-transaction" className="space-y-4">
        <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2">
          <Shield className="w-6 h-6 text-primary" />
          Build Solana Transaction (Advanced)
        </h2>
        <p className="text-muted-foreground">
          For custom wallet integrations! If you're building your own payment UI or using a custom Solana wallet, this endpoint lets you programmatically build the transaction. Perfect for web3 natives! ⚡
        </p>

        <Card className="p-6 bg-yellow-50 border-yellow-200">
          <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-yellow-600" />
            When to Use This?
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
            <li><strong>Custom wallet integrations:</strong> Building your own checkout UI</li>
            <li><strong>Mobile apps:</strong> Using Solana Mobile SDK</li>
            <li><strong>Web3 apps:</strong> Using @solana/web3.js directly</li>
            <li><strong>Programmatic payments:</strong> Automated payment systems</li>
          </ul>
          <p className="text-sm text-yellow-800 mt-3">
            ⚠️ <strong>Not needed for most use cases!</strong> Our hosted payment pages and QR codes work out of the box. Only use this if you're building custom wallet integrations.
          </p>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-bold mb-2">Endpoint</h3>
          <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm mb-4">
            <code>POST /api/v1/payments/:payment_id/build-transaction</code>
          </pre>

          <h3 className="text-lg font-bold mb-2">Authentication</h3>
          <p className="text-sm text-muted-foreground mb-4">
            ⚠️ <strong>No authentication required</strong> - this is a <strong>public endpoint</strong>. Customers can build transactions for their own payments!
          </p>

          <h3 className="text-lg font-bold mb-3">Request Body</h3>
          <div className="overflow-x-auto mb-4">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2 font-semibold">Field</th>
                  <th className="text-left p-2 font-semibold">Type</th>
                  <th className="text-left p-2 font-semibold">Required</th>
                  <th className="text-left p-2 font-semibold">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2"><code>customer_wallet</code></td>
                  <td className="p-2">string</td>
                  <td className="p-2"><strong>Yes</strong></td>
                  <td className="p-2">Customer's Solana wallet address (public key)</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2"><code>amount_override</code></td>
                  <td className="p-2">number</td>
                  <td className="p-2">No</td>
                  <td className="p-2">Custom amount (only for pay-what-you-want payments)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h4 className="font-semibold mb-2">Example Request</h4>
          <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
            <code className="language-bash mt-10">{`curl -X POST https://api.zendfi.tech/api/v1/payments/550e8400-e29b-41d4-a716-446655440000/build-transaction \\
  -H "Content-Type: application/json" \\
  -d '{
    "customer_wallet": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU"
  }'`}</code>
          </pre>

          <h4 className="font-semibold mb-2 mt-4">Response: 200 OK</h4>
          <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
            <code className="language-json mt-10">{`{
  "transaction": "AQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAQAHDRyx...",
  "message": "Transaction built successfully",
  "instructions": [
    {
      "program_id": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
      "keys": [...],
      "data": "..."
    }
  ],
  "recent_blockhash": "GHQwFusPAkJLrXR1SYeEKKtfNYvDC8qbN9m1h3z8fZ4w",
  "fee_payer": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
  "required_signers": [
    "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU"
  ]
}`}</code>
          </pre>

          <p className="text-sm text-muted-foreground mt-4">
            The <code className="bg-slate-100 border rounded-sm font-mono text-gray-600 px-[5px] py-[2px] text-xs">transaction</code> field contains a base64-encoded serialized transaction ready to sign!
          </p>
        </Card>

        {/* How to Use */}
        <Card className="p-6">
          <h3 className="text-lg font-bold mb-3">How to Use This Transaction</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Once you have the transaction, here's what to do with it:
          </p>

          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-sm mb-2">Step 1: Deserialize the Transaction</h4>
              <pre className="bg-slate-900 text-slate-100 p-3 rounded-lg overflow-x-auto font-mono text-xs">
                <code className="language-java mt-10script">{`import { Transaction } from '@solana/web3.js';

const transaction = Transaction.from(
  Buffer.from(response.transaction, 'base64')
);`}</code>
              </pre>
            </div>

            <div>
              <h4 className="font-semibold text-sm mb-2">Step 2: Sign with Customer's Wallet</h4>
              <pre className="bg-slate-900 text-slate-100 p-3 rounded-lg overflow-x-auto font-mono text-xs">
                <code className="language-json mt-10">{`// Using Phantom wallet
const signedTransaction = await window.solana.signTransaction(transaction);

// OR using Solana Wallet Adapter
const signedTransaction = await wallet.signTransaction(transaction);`}</code>
              </pre>
            </div>

            <div>
              <h4 className="font-semibold text-sm mb-2">Step 3: Submit to ZendFi</h4>
              <pre className="bg-slate-900 text-slate-100 p-3 rounded-lg overflow-x-auto font-mono text-xs">
                <code className="language-json mt-10">{`const serialized = signedTransaction.serialize();
const base64Tx = serialized.toString('base64');

await fetch(\`/api/v1/payments/\${paymentId}/submit-transaction\`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ signed_transaction: base64Tx })
});`}</code>
              </pre>
            </div>
          </div>
        </Card>

        {/* Complete Example */}
        <Card className="p-6 bg-blue-50 border-blue-200">
          <h3 className="text-lg font-bold mb-3">Complete Integration Example</h3>
          <pre className="bg-slate-900 text-slate-100 p-3 rounded-lg overflow-x-auto font-mono text-xs">
            <code className="language-java mt-10script">{`import { Connection, Transaction } from '@solana/web3.js';

async function payWithCustomWallet(paymentId, customerWallet) {
  // 1. Build transaction
  const buildResponse = await fetch(
    \`https://api.zendfi.tech/api/v1/payments/\${paymentId}/build-transaction\`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ customer_wallet: customerWallet })
    }
  );
  const { transaction: txBase64 } = await buildResponse.json();

  // 2. Deserialize
  const transaction = Transaction.from(Buffer.from(txBase64, 'base64'));

  // 3. Sign with wallet (Phantom example)
  const signedTx = await window.solana.signTransaction(transaction);

  // 4. Submit to ZendFi
  const submitResponse = await fetch(
    \`https://api.zendfi.tech/api/v1/payments/\${paymentId}/submit-transaction\`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        signed_transaction: signedTx.serialize().toString('base64')
      })
    }
  );

  const result = await submitResponse.json();
  console.log('Payment submitted!', result);
  
  // 5. ZendFi will broadcast and confirm automatically
  // You'll get a webhook when it's confirmed!
  
  return result;
}`}</code>
          </pre>
        </Card>

        {/* Pro Tips */}
        <Card className="p-6 border">
          <h3 className="text-lg font-bold mb-3">💡 Pro Tips</h3>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
            <li><strong>Error handling:</strong> Always wrap in try-catch. Wallets can reject signatures!</li>
            <li><strong>Pay-what-you-want:</strong> Include <code className="bg-slate-100 border rounded-sm font-mono text-gray-600 px-[5px] py-[2px] text-xs">amount_override</code> for PWYW payments</li>
            <li><strong>Transaction expires:</strong> Transactions are only valid for ~2 minutes. Build fresh if needed!</li>
            <li><strong>No double-signing:</strong> ZendFi handles submission to Solana. You just sign!</li>
            <li><strong>Use webhooks:</strong> Don't poll. Listen for <code className="bg-slate-100 border rounded-sm font-mono text-gray-600 px-[5px] py-[2px] text-xs">payment.confirmed</code> webhook</li>
          </ul>
        </Card>
      </div>

      {/* Pay-What-You-Want */}
      <div id="pay-what-you-want" className="space-y-4">
        <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2">
          <Zap className="w-6 h-6 text-primary" />
          Pay-What-You-Want Payments (Flexible Pricing FTW!)
        </h2>
        <p className="text-muted-foreground">
          Perfect for donations, tips, flexible pricing, or "pay what feels right" models. Give your customers the power to choose!
        </p>

        <Card className="p-6">
          <h3 className="text-lg font-bold mb-3">How It Works</h3>
          <ol className="space-y-2 text-muted-foreground list-decimal list-inside">
            <li>You set minimum (required) and maximum (optional) amounts</li>
            <li>Customer chooses an amount within that range</li>
            <li>You can suggest a default amount</li>
            <li>Customer pays their chosen amount</li>
          </ol>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-bold mb-3">Configuration</h3>
          <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
            <code className="language-json mt-10">{`{
  "amount": 10.00,
  "currency": "USD",
  "allow_custom_amount": true,
  "minimum_amount": 1.00,
  "maximum_amount": 1000.00,
  "suggested_amount": 10.00
}`}</code>
          </pre>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-bold mb-3">Validation Rules</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span><code className="bg-slate-100 border rounded-sm font-mono text-gray-600 px-[5px] py-[2px] text-xs">minimum_amount</code> is <strong>required</strong> when <code className="bg-slate-100 border rounded-sm font-mono text-gray-600 px-[5px] py-[2px] text-xs">allow_custom_amount</code> is <code className="bg-slate-100 border rounded-sm font-mono text-gray-600 px-[5px] py-[2px] text-xs">true</code></span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span><code className="bg-slate-100 border rounded-sm font-mono text-gray-600 px-[5px] py-[2px] text-xs">maximum_amount</code> must be greater than <code className="bg-slate-100 border rounded-sm font-mono text-gray-600 px-[5px] py-[2px] text-xs">minimum_amount</code> (if provided)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span><code className="bg-slate-100 border rounded-sm font-mono text-gray-600 px-[5px] py-[2px] text-xs">suggested_amount</code> must be between <code className="bg-slate-100 border rounded-sm font-mono text-gray-600 px-[5px] py-[2px] text-xs">minimum_amount</code> and <code className="bg-slate-100 border rounded-sm font-mono text-gray-600 px-[5px] py-[2px] text-xs">maximum_amount</code></span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span><code className="bg-slate-100 border rounded-sm font-mono text-gray-600 px-[5px] py-[2px] text-xs">amount</code> field is ignored for display (but used as fallback)</span>
            </li>
          </ul>
        </Card>

        <div className="space-y-4">
          <h3 className="text-lg font-bold">Use Cases</h3>

          <Card className="p-6">
            <h4 className="font-semibold mb-2">Donations (Support a Cause! ❤️):</h4>
            <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
              <code className="language-json mt-10">{`{
  "allow_custom_amount": true,
  "minimum_amount": 5.00,
  "suggested_amount": 25.00,
  "description": "Support our mission"
}`}</code>
            </pre>
          </Card>

          <Card className="p-6">
            <h4 className="font-semibold mb-2">Tips for Service (Show Some Love! 💝):</h4>
            <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
              <code className="language-json mt-10">{`{
  "allow_custom_amount": true,
  "minimum_amount": 0.50,
  "maximum_amount": 100.00,
  "suggested_amount": 5.00,
  "description": "Tip your driver"
}`}</code>
            </pre>
          </Card>

          <Card className="p-6">
            <h4 className="font-semibold mb-2">Flexible Pricing (You Decide the Value! 💎):</h4>
            <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
              <code className="language-json mt-10">{`{
  "allow_custom_amount": true,
  "minimum_amount": 10.00,
  "maximum_amount": 50.00,
  "suggested_amount": 29.00,
  "description": "Pay what you think it's worth"
}`}</code>
            </pre>
          </Card>
        </div>
      </div>

      {/* Payment Splits */}
      <div id="payment-splits" className="space-y-4">
        <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2">
          <Users className="w-6 h-6 text-primary" />
          Payment Splits (Share the Wealth!)
        </h2>
        <p className="text-muted-foreground">
          Automatically split incoming payments between multiple recipients - perfect for marketplaces, revenue sharing, and team payments!
        </p>

        <Card className="p-6 bg-primary/5">
          <h3 className="text-lg font-bold mb-3">Perfect for:</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Marketplace commissions</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Revenue sharing</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Affiliate payments</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Multi-party invoices</span>
            </li>
          </ul>
          <p className="text-sm text-muted-foreground mt-4">
            Want the full scoop? Check out Payment Splits Documentation for all the details!
          </p>
        </Card>

        <Card className="p-6 border-primary/50">
          <h3 className="text-lg font-bold mb-3">Quick Example (See It in Action!)</h3>
          <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
            <code className="language-json mt-10">{`{
  "amount": 100.00,
  "currency": "USD",
  "description": "Marketplace Sale",
  "split_recipients": [
    {
      "wallet_address": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
      "percentage": 80.0,
      "description": "Seller - 80%"
    },
    {
      "wallet_address": "9yJKg3DX98h87TYKSDqcE6jCkhgTrB94UZSmKptgBsV",
      "percentage": 15.0,
      "description": "Platform Fee - 15%"
    },
    {
      "wallet_address": "4mNKh5FY21i98UZLTErdG8kDjhsWsC05VATnLquiBwX",
      "percentage": 5.0,
      "description": "Referral - 5%"
    }
  ]
}`}</code>
          </pre>

          <div className="bg-primary/10 p-4 rounded-md">
            <p className="font-semibold mb-2">Result:</p>
            <p className="text-sm text-muted-foreground mb-3">When customer pays $100, funds are automatically distributed:</p>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>$80.00 → Seller</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>$15.00 → Platform</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>$5.00 → Referral partner</span>
              </li>
            </ul>
            <p className="text-sm font-semibold mt-3">Everyone gets paid automatically! No manual transfers needed. How cool is that? 🎉</p>
          </div>
        </Card>
      </div>

      {/* Idempotency */}
      <div id="idempotency" className="space-y-4">
        <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2">
          <Shield className="w-6 h-6 text-primary" />
          Idempotency (Prevent Duplicate Payments Like a Pro!)
        </h2>
        <p className="text-muted-foreground">
          Ever had a customer double-click the "Pay" button? Network timeout? Idempotency keys save the day by preventing duplicate payments!
        </p>

        <Card className="p-6">
          <h3 className="text-lg font-bold mb-3">How It Works</h3>
          <p className="text-muted-foreground mb-4">
            Include an <code className="bg-slate-100 border rounded-sm font-mono text-gray-600 px-[5px] py-[2px] text-xs">Idempotency-Key</code> header with a unique value. If you retry the same request with the same key, you'll get the original response instead of creating a duplicate payment. Magic! ✨
          </p>
          <p className="text-muted-foreground">
            It's like a safety net for your payments - try the same request twice, only pay once!
          </p>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-bold mb-3">Usage</h3>
          <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
            <code className="language-bash mt-10">{`curl -X POST https://api.zendfi.tech/api/v1/payments \\
  -H "Authorization: Bearer zendfi_live_abc123..." \\
  -H "Content-Type: application/json" \\
  -H "Idempotency-Key: checkout_session_abc123_attempt1" \\
  -d '{
    "amount": 49.99,
    "currency": "USD",
    "description": "Product Purchase"
  }'`}</code>
          </pre>
        </Card>

        <div className="space-y-4">
          <h3 className="text-lg font-bold">Best Practices</h3>

          <Card className="p-6">
            <h4 className="font-semibold mb-2">Generate Unique Keys:</h4>
            <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
              <code className="language-json mt-10">{`// Node.js example
const idempotencyKey = \`checkout_\${sessionId}_\${Date.now()}_\${Math.random()}\`;`}</code>
            </pre>
          </Card>

          <Card className="p-6">
            <h4 className="font-semibold mb-2">Retry with Same Key:</h4>
            <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
              <code className="language-json mt-10">{`// Retry logic
let attempts = 0;
const maxAttempts = 3;
const idempotencyKey = generateUniqueKey();

while (attempts < maxAttempts) {
  try {
    const response = await createPayment(data, idempotencyKey);
    return response;
  } catch (error) {
    if (error.status === 500 || error.status === 429) {
      attempts++;
      await sleep(1000 * attempts); // Exponential backoff
    } else {
      throw error; // Don't retry client errors (4xx)
    }
  }
}`}</code>
            </pre>
          </Card>

          <Card className="p-6">
            <h4 className="font-semibold mb-3">Key Requirements:</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Must be unique per request</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Maximum 255 characters</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Valid for 24 hours</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Recommended format: <code className="bg-slate-100 border rounded-sm font-mono text-gray-600 px-[5px] py-[2px] text-xs">{`prefix_timestamp_{unique_id}_attempt#{attempt}`}</code></span>
              </li>
            </ul>
          </Card>
        </div>
      </div>

      {/* Error Handling */}
      <div id="errors" className="space-y-4">
        <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2">
          <AlertCircle className="w-6 h-6 text-primary" />
          Error Handling (Know What Went Wrong!)
        </h2>
        <p className="text-muted-foreground">
          When things go wrong (and they sometimes do!), ZendFi provides clear, actionable error messages to help you debug quickly. All errors follow a consistent JSON format.
        </p>

        {/* Error Response Format */}
        <Card className="p-6">
          <h3 className="text-lg font-bold mb-4">Error Response Format</h3>
          <p className="text-sm text-muted-foreground mb-4">
            All error responses follow this structure:
          </p>
          <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-xs">
            <code className="language-json mt-10">{`{
  "error": "Resource not found",
  "message": "Payment with ID 550e8400-e29b-41d4-a716-446655440000 not found",
  "code": "PAYMENT_NOT_FOUND"
}`}</code>
          </pre>
          <div className="mt-4">
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2 font-semibold">Field</th>
                    <th className="text-left p-2 font-semibold">Type</th>
                    <th className="text-left p-2 font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-2"><code className="text-xs">error</code></td>
                    <td className="p-2 text-muted-foreground">string</td>
                    <td className="p-2">Human-readable error summary</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2"><code className="text-xs">message</code></td>
                    <td className="p-2 text-muted-foreground">string</td>
                    <td className="p-2">Detailed error explanation with context</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2"><code className="text-xs">code</code></td>
                    <td className="p-2 text-muted-foreground">string</td>
                    <td className="p-2">Machine-readable error code (use this for programmatic handling)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Card>

        {/* HTTP Status Codes */}
        <Card className="p-6">
          <h3 className="text-lg font-bold mb-4">HTTP Status Codes</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2 font-semibold">Status Code</th>
                  <th className="text-left p-2 font-semibold">Meaning</th>
                  <th className="text-left p-2 font-semibold">When You'll See It</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b bg-green-50 dark:bg-green-950/20">
                  <td className="p-2"><code className="text-xs">200 OK</code></td>
                  <td className="p-2">✅ Success</td>
                  <td className="p-2">Request succeeded (GET, updates)</td>
                </tr>
                <tr className="border-b bg-green-50 dark:bg-green-950/20">
                  <td className="p-2"><code className="text-xs">201 Created</code></td>
                  <td className="p-2">✅ Resource created</td>
                  <td className="p-2">Payment/merchant/subscription created successfully</td>
                </tr>
                <tr className="border-b bg-yellow-50 dark:bg-yellow-950/20">
                  <td className="p-2"><code className="text-xs">400 Bad Request</code></td>
                  <td className="p-2">⚠️ Invalid input</td>
                  <td className="p-2">Missing required fields, invalid data format</td>
                </tr>
                <tr className="border-b bg-yellow-50 dark:bg-yellow-950/20">
                  <td className="p-2"><code className="text-xs">401 Unauthorized</code></td>
                  <td className="p-2">🔒 Authentication failed</td>
                  <td className="p-2">Missing/invalid API key, expired key</td>
                </tr>
                <tr className="border-b bg-yellow-50 dark:bg-yellow-950/20">
                  <td className="p-2"><code className="text-xs">404 Not Found</code></td>
                  <td className="p-2">❌ Resource not found</td>
                  <td className="p-2">Payment/merchant/subscription doesn't exist</td>
                </tr>
                <tr className="border-b bg-yellow-50 dark:bg-yellow-950/20">
                  <td className="p-2"><code className="text-xs">409 Conflict</code></td>
                  <td className="p-2">⚠️ Duplicate/conflict</td>
                  <td className="p-2">Idempotency key mismatch, payment already confirmed</td>
                </tr>
                <tr className="border-b bg-yellow-50 dark:bg-yellow-950/20">
                  <td className="p-2"><code className="text-xs">410 Gone</code></td>
                  <td className="p-2">⏰ Expired</td>
                  <td className="p-2">Payment expired (15-minute window passed)</td>
                </tr>
                <tr className="border-b bg-red-50 dark:bg-red-950/20">
                  <td className="p-2"><code className="text-xs">500 Internal Server Error</code></td>
                  <td className="p-2">💥 Server error</td>
                  <td className="p-2">Something went wrong on our end (please contact support)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>

        {/* Common Error Codes */}
        <Card className="p-6">
          <h3 className="text-lg font-bold mb-4">Common Error Codes</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Use these <code className="bg-slate-200 dark:bg-slate-800 px-1 rounded">code</code> values to handle errors programmatically:
          </p>

          {/* Authentication Errors */}
          <div className="mb-6">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <span className="text-red-500">🔒</span> Authentication Errors (401)
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2 font-semibold">Error Code</th>
                    <th className="text-left p-2 font-semibold">Message</th>
                    <th className="text-left p-2 font-semibold">Solution</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-2"><code className="text-xs">MISSING_AUTH_HEADER</code></td>
                    <td className="p-2">Authorization header is required</td>
                    <td className="p-2">Add <code className="text-xs">Authorization: Bearer {`{api_key}`}</code> header</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2"><code className="text-xs">INVALID_AUTH_FORMAT</code></td>
                    <td className="p-2">Must use Bearer token format</td>
                    <td className="p-2">Format: <code className="text-xs">Bearer zfi_live_sk_...</code></td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2"><code className="text-xs">INVALID_KEY_FORMAT</code></td>
                    <td className="p-2">API key must start with zfi_test_ or zfi_live_</td>
                    <td className="p-2">Use the full API key from merchant creation response</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2"><code className="text-xs">INVALID_API_KEY</code></td>
                    <td className="p-2">API key is invalid or revoked</td>
                    <td className="p-2">Regenerate API key or check for typos</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Validation Errors */}
          <div className="mb-6">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <span className="text-yellow-500">⚠️</span> Validation Errors (400)
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2 font-semibold">Error Code</th>
                    <th className="text-left p-2 font-semibold">Message</th>
                    <th className="text-left p-2 font-semibold">Solution</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-2"><code className="text-xs">INVALID_AMOUNT</code></td>
                    <td className="p-2">Amount must be greater than 0</td>
                    <td className="p-2">Provide positive number for <code className="text-xs">amount</code></td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2"><code className="text-xs">INVALID_CURRENCY</code></td>
                    <td className="p-2">Unsupported currency</td>
                    <td className="p-2">Use USD (more currencies coming soon!)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2"><code className="text-xs">INVALID_TOKEN</code></td>
                    <td className="p-2">Unsupported payment token</td>
                    <td className="p-2">Use USDC, SOL, or omit for customer choice</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2"><code className="text-xs">INVALID_WALLET_ADDRESS</code></td>
                    <td className="p-2">Invalid Solana wallet address format</td>
                    <td className="p-2">Provide valid base58-encoded Solana address</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2"><code className="text-xs">INVALID_WEBHOOK_URL</code></td>
                    <td className="p-2">Webhook URL must be valid HTTPS</td>
                    <td className="p-2">Use valid HTTPS URL (HTTP not allowed in production)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2"><code className="text-xs">INVALID_DESCRIPTION</code></td>
                    <td className="p-2">Description too long or contains invalid characters</td>
                    <td className="p-2">Max 500 characters, avoid special characters</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2"><code className="text-xs">INVALID_PWYW_CONFIG</code></td>
                    <td className="p-2">Pay-what-you-want config invalid</td>
                    <td className="p-2">Ensure min ≤ suggested ≤ max, all positive</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Resource Errors */}
          <div className="mb-6">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <span className="text-blue-500">📦</span> Resource Errors (404)
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2 font-semibold">Error Code</th>
                    <th className="text-left p-2 font-semibold">Message</th>
                    <th className="text-left p-2 font-semibold">Solution</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-2"><code className="text-xs">PAYMENT_NOT_FOUND</code></td>
                    <td className="p-2">Payment doesn't exist</td>
                    <td className="p-2">Check payment ID, may have been deleted</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2"><code className="text-xs">MERCHANT_NOT_FOUND</code></td>
                    <td className="p-2">Merchant account doesn't exist</td>
                    <td className="p-2">Verify merchant ID or recreate account</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2"><code className="text-xs">SUBSCRIPTION_NOT_FOUND</code></td>
                    <td className="p-2">Subscription doesn't exist</td>
                    <td className="p-2">Check subscription ID or create new one</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2"><code className="text-xs">ESCROW_NOT_FOUND</code></td>
                    <td className="p-2">Escrow doesn't exist</td>
                    <td className="p-2">Verify escrow ID</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2"><code className="text-xs">INVOICE_NOT_FOUND</code></td>
                    <td className="p-2">Invoice doesn't exist</td>
                    <td className="p-2">Check invoice ID or create new invoice</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* State Errors */}
          <div className="mb-6">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <span className="text-purple-500">⏰</span> State & Timing Errors
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2 font-semibold">Error Code</th>
                    <th className="text-left p-2 font-semibold">HTTP Status</th>
                    <th className="text-left p-2 font-semibold">Message</th>
                    <th className="text-left p-2 font-semibold">Solution</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-2"><code className="text-xs">PAYMENT_EXPIRED</code></td>
                    <td className="p-2">410 Gone</td>
                    <td className="p-2">Payment expired (15-min window passed)</td>
                    <td className="p-2">Create new payment</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2"><code className="text-xs">PAYMENT_ALREADY_CONFIRMED</code></td>
                    <td className="p-2">409 Conflict</td>
                    <td className="p-2">Payment already confirmed, can't modify</td>
                    <td className="p-2">Payment is immutable after confirmation</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2"><code className="text-xs">IDEMPOTENCY_KEY_MISMATCH</code></td>
                    <td className="p-2">409 Conflict</td>
                    <td className="p-2">Same key used with different request body</td>
                    <td className="p-2">Use same request body or new idempotency key</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2"><code className="text-xs">ESCROW_ALREADY_RELEASED</code></td>
                    <td className="p-2">409 Conflict</td>
                    <td className="p-2">Escrow funds already released</td>
                    <td className="p-2">Cannot refund released escrow</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2"><code className="text-xs">SUBSCRIPTION_ALREADY_CANCELLED</code></td>
                    <td className="p-2">409 Conflict</td>
                    <td className="p-2">Subscription already cancelled</td>
                    <td className="p-2">Create new subscription instead</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Card>

        {/* Error Handling Best Practices */}
        <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
          <h3 className="text-lg font-bold mb-4">💡 Error Handling Best Practices</h3>
          <div className="space-y-4">
            <div>
              <p className="font-semibold mb-2">1. Always Check HTTP Status First</p>
              <pre className="bg-slate-900 text-slate-100 p-3 rounded-lg overflow-x-auto text-xs">
                <code className="language-json mt-10">{`if (response.status >= 400) {
  const error = await response.json();
  console.error(\`Error [\${error.code}]: \${error.message}\`);
  
  // Handle specific errors
  switch (error.code) {
    case 'INVALID_API_KEY':
      // Refresh API key
      break;
    case 'PAYMENT_EXPIRED':
      // Create new payment
      break;
    default:
      // Show generic error to user
  }
}`}</code>
              </pre>
            </div>

            <div>
              <p className="font-semibold mb-2">2. Use Error Codes for Logic, Messages for Logging</p>
              <pre className="bg-slate-900 text-slate-100 p-3 rounded-lg overflow-x-auto text-xs">
                <code className="language-json mt-10">{`// ✅ Good - use code for logic
if (error.code === 'PAYMENT_NOT_FOUND') {
  redirectToCreatePayment();
}

// ❌ Bad - don't parse messages
if (error.message.includes('not found')) { // Fragile!
  redirectToCreatePayment();
}`}</code>
              </pre>
            </div>

            <div>
              <p className="font-semibold mb-2">3. Implement Retry Logic for 500 Errors</p>
              <pre className="bg-slate-900 text-slate-100 p-3 rounded-lg overflow-x-auto text-xs">
                <code className="language-json mt-10">{`async function createPaymentWithRetry(data, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch('/api/v1/payments', {
        method: 'POST',
        headers: { 
          'Authorization': \`Bearer \${apiKey}\`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      
      if (response.status === 500) {
        await sleep(1000 * Math.pow(2, i)); // Exponential backoff
        continue;
      }
      
      return await response.json();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
    }
  }
}`}</code>
              </pre>
            </div>

            <div>
              <p className="font-semibold mb-2">4. Show User-Friendly Messages</p>
              <pre className="bg-slate-900 text-slate-100 p-3 rounded-lg overflow-x-auto text-xs">
                <code className="language-json mt-10">{`const friendlyErrors = {
  INVALID_AMOUNT: "Please enter a valid payment amount",
  PAYMENT_EXPIRED: "This payment link expired. We'll create a new one!",
  INVALID_API_KEY: "Authentication failed. Please contact support.",
  PAYMENT_NOT_FOUND: "Payment not found. It may have been cancelled."
};

const userMessage = friendlyErrors[error.code] || "Something went wrong. Please try again.";
showNotification(userMessage);`}</code>
              </pre>
            </div>
          </div>
        </Card>

        {/* Example Error Responses */}
        <div>
          <h3 className="text-lg font-bold mb-4">📋 Example Error Responses</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium mb-2">Missing API Key (401)</p>
              <pre className="bg-slate-900 text-slate-100 p-3 rounded-lg overflow-x-auto text-xs">
                <code className="language-json mt-10">{`{
  "error": "Missing authentication",
  "message": "Authorization header is required",
  "code": "MISSING_AUTH_HEADER"
}`}</code>
              </pre>
            </div>

            <div>
              <p className="text-sm font-medium mb-2">Invalid Amount (400)</p>
              <pre className="bg-slate-900 text-slate-100 p-3 rounded-lg overflow-x-auto text-xs">
                <code className="language-json mt-10">{`{
  "error": "Validation failed",
  "message": "Invalid payment amount: Amount must be greater than 0",
  "code": "INVALID_AMOUNT"
}`}</code>
              </pre>
            </div>

            <div>
              <p className="text-sm font-medium mb-2">Payment Expired (410)</p>
              <pre className="bg-slate-900 text-slate-100 p-3 rounded-lg overflow-x-auto text-xs">
                <code className="language-json mt-10">{`{
  "error": "Resource expired",
  "message": "Payment expired after 15-minute window",
  "code": "PAYMENT_EXPIRED"
}`}</code>
              </pre>
            </div>

            <div>
              <p className="text-sm font-medium mb-2">Idempotency Key Conflict (409)</p>
              <pre className="bg-slate-900 text-slate-100 p-3 rounded-lg overflow-x-auto text-xs">
                <code className="language-json mt-10">{`{
  "error": "Idempotency key mismatch",
  "message": "This idempotency key was used with different request parameters",
  "code": "IDEMPOTENCY_KEY_MISMATCH"
}`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Testing */}
      <div id="testing" className="space-y-4">
        <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2">
          <TestTube className="w-6 h-6 text-primary" />
          Testing (Try Before You Fly!)
        </h2>
        <p className="text-muted-foreground">
          Always test your integration before going live! We make it super easy.
        </p>

        <Card className="p-6 border-primary/50">
          <h3 className="text-lg font-bold mb-3">Test on Devnet (Your Playground!)</h3>
          <ol className="space-y-2 text-muted-foreground list-decimal list-inside">
            <li>Set <code className="bg-slate-100 border rounded-sm font-mono text-gray-600 px-[5px] py-[2px] text-xs">SOLANA_NETWORK=devnet</code> in your <code className="bg-slate-100 border rounded-sm font-mono text-gray-600 px-[5px] py-[2px] text-xs">.env</code></li>
            <li>Use devnet USDC mint: <code className="bg-slate-100 border rounded-sm font-mono text-gray-600 px-[5px] py-[2px] text-xs">4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU</code></li>
            <li>Get free devnet SOL/USDC from Solana Faucet - it's like Monopoly money, but fun!</li>
          </ol>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-bold mb-3">Test Wallet Addresses (Ready to Use!)</h3>
          <p className="text-sm text-muted-foreground mb-3">Use these test wallets for devnet testing - they're all yours!</p>
          <div className="space-y-2">
            <div className="bg-gray-300 p-3 rounded-md">
              <p className="text-xs font-semibold mb-1">Customer Wallet:</p>
              <code className="text-xs break-all">7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU</code>
            </div>
            <div className="bg-gray-300 p-3 rounded-md">
              <p className="text-xs font-semibold mb-1">Merchant Wallet:</p>
              <code className="text-xs break-all">9yJKg3DX98h87TYKSDqcE6jCkhgTrB94UZSmKptgBsV</code>
            </div>
          </div>
        </Card>

        <div className="space-y-4">
          <h3 className="text-lg font-bold">Common Testing Scenarios</h3>

          <Card className="p-6">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              Scenario 1: Successful Payment
            </h4>
            <ol className="space-y-1 text-sm text-muted-foreground list-decimal list-inside">
              <li>Create payment</li>
              <li>Copy QR code or payment URL</li>
              <li>Pay with devnet wallet</li>
              <li>Check status → should show <code className="bg-slate-100 border rounded-sm font-mono text-gray-600 px-[5px] py-[2px] text-xs">Confirmed</code> (usually within 60 seconds!)</li>
            </ol>
          </Card>

          <Card className="p-6">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <Clock className="w-5 h-5 text-orange-500" />
              Scenario 2: Expired Payment
            </h4>
            <ol className="space-y-1 text-sm text-muted-foreground list-decimal list-inside">
              <li>Create payment</li>
              <li>Wait 16+ minutes (grab a coffee! ☕)</li>
              <li>Check status → should show <code className="bg-slate-100 border rounded-sm font-mono text-gray-600 px-[5px] py-[2px] text-xs">Expired</code></li>
            </ol>
          </Card>

          <Card className="p-6">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-blue-500" />
              Scenario 3: Idempotency Magic
            </h4>
            <ol className="space-y-1 text-sm text-muted-foreground list-decimal list-inside">
              <li>Create payment with <code className="bg-slate-100 border rounded-sm font-mono text-gray-600 px-[5px] py-[2px] text-xs">Idempotency-Key: test_123</code></li>
              <li>Retry with same key</li>
              <li>Should receive identical response (no duplicate payment - nice!)</li>
            </ol>
          </Card>
        </div>
      </div>

      {/* Next Steps */}
      <Card className="p-6 bg-primary/5 border-primary/20">
        <h2 className="text-xl md:text-2xl font-bold mb-4">Next Steps (Keep Going!)</h2>
        <p className="text-muted-foreground mb-6">You're crushing it! Here's what to explore next:</p>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <ArrowRight className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
            <div>
              <Link href={"/docs/payment-links"}>
                <p className="font-semibold">Payment Links</p>
              </Link>
              <p className="text-sm text-muted-foreground">Create reusable payment pages - Share one link everywhere!</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <ArrowRight className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
            <div>
              <Link href={"/docs/webhooks"}>
                <p className="font-semibold">Webhooks</p>
              </Link>
              <p className="text-sm text-muted-foreground">Handle payment events in real-time - Never miss a payment!</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <ArrowRight className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
            <div>
              <Link href={"/docs/wallwt-management"}>
                <p className="font-semibold">Wallet Management</p>
              </Link>
              <p className="text-sm text-muted-foreground">Export keys, withdraw funds - Full control of your money!</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <ArrowRight className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
            <div>
              <Link href={"/docs/advanced"}>
                <p className="font-semibold">Advanced Features</p>
              </Link>
              <p className="text-sm text-muted-foreground">Subscriptions, escrows, installments - Level up your game!</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}


