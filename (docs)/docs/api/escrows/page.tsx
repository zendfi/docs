"use client";

import { Card } from "@/components/ui/card";
import { Shield, Zap, Check, AlertCircle, Lock } from "lucide-react";

export default function EscrowsAPIPage() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
            <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="h-8 w-8 text-primary" />
          <h1 className="text-3xl md:text-4xl font-bold">Escrow Payments API</h1>
        </div>
        <p className="text-lg text-muted-foreground">
          Secure transactions with third-party escrow. Funds held safely until conditions are met. Perfect for marketplace and high-value transactions.
        </p>
      </div>

      {/* Quick Start Card */}
      <Card className="p-6 mb-8 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-800">
        <div className="flex items-start gap-3">
          <Lock className="h-6 w-6 text-green-600 dark:text-green-400 mt-1 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-semibold mb-2 text-green-900 dark:text-green-100">How Escrow Works</h3>
            <ol className="list-decimal pl-5 space-y-2 text-sm text-green-800 dark:text-green-200">
              <li>Create escrow with buyer/seller wallets and release conditions</li>
              <li>Buyer sends payment → funds held in secure escrow wallet</li>
              <li>Seller delivers product/service</li>
              <li>Conditions met (manual approval, time-based, milestone, etc.)</li>
              <li>Funds automatically released to seller 🎉</li>
            </ol>
            <p className="text-sm text-green-700 dark:text-green-300 mt-3">
              <strong>Protection for everyone:</strong> Buyers know their money is safe, sellers know they'll get paid once they deliver!
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
              <p className="font-semibold">Secure Escrow Wallet</p>
              <p className="text-sm text-muted-foreground">Funds held in dedicated system wallet</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold">Flexible Release Conditions</p>
              <p className="text-sm text-muted-foreground">Manual, time-based, confirmations, milestones</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold">Approve/Refund Controls</p>
              <p className="text-sm text-muted-foreground">Release to seller or refund to buyer</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold">Dispute Resolution</p>
              <p className="text-sm text-muted-foreground">Built-in dispute workflow with admin review</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold">Automatic Time Releases</p>
              <p className="text-sm text-muted-foreground">Auto-release after specified date</p>
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
      <Card className="p-6 mb-8 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border-blue-200 dark:border-blue-800">
        <h2 className="text-2xl font-bold mb-4">Common Use Cases</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-slate-900 p-4 rounded-lg border border-blue-200 dark:border-blue-700">
            <h3 className="font-semibold mb-2">💼 Freelance Work</h3>
            <p className="text-sm text-muted-foreground">Protect freelancers and clients in development, design, or writing projects</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-4 rounded-lg border border-blue-200 dark:border-blue-700">
            <h3 className="font-semibold mb-2">🏠 Real Estate</h3>
            <p className="text-sm text-muted-foreground">Secure deposits and payments for property transactions</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-4 rounded-lg border border-blue-200 dark:border-blue-700">
            <h3 className="font-semibold mb-2">🛍️ Marketplace Sales</h3>
            <p className="text-sm text-muted-foreground">High-value product sales where buyer wants delivery guarantee</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-4 rounded-lg border border-blue-200 dark:border-blue-700">
            <h3 className="font-semibold mb-2">🎨 NFT Trades</h3>
            <p className="text-sm text-muted-foreground">Escrow for peer-to-peer NFT trading with custom conditions</p>
          </div>
        </div>
      </Card>

      {/* Create Escrow */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Create Escrow</h2>
        <p className="text-muted-foreground mb-4">
          Create an escrow transaction that holds funds until your specified conditions are met.
        </p>

        <h3 className="text-xl font-semibold mb-3">Endpoint</h3>
        <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm mb-6">
          <code>POST /api/v1/escrows</code>
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
                <td className="border border-muted p-3"><code className="text-sm">buyer_wallet</code></td>
                <td className="border border-muted p-3"><code className="text-sm">string</code></td>
                <td className="border border-muted p-3"><span className="text-red-600 font-semibold">Yes</span></td>
                <td className="border border-muted p-3">Buyer's Solana wallet address</td>
              </tr>
              <tr>
                <td className="border border-muted p-3"><code className="text-sm">seller_wallet</code></td>
                <td className="border border-muted p-3"><code className="text-sm">string</code></td>
                <td className="border border-muted p-3"><span className="text-red-600 font-semibold">Yes</span></td>
                <td className="border border-muted p-3">Seller's Solana wallet address</td>
              </tr>
              <tr>
                <td className="border border-muted p-3"><code className="text-sm">amount</code></td>
                <td className="border border-muted p-3"><code className="text-sm">number</code></td>
                <td className="border border-muted p-3"><span className="text-red-600 font-semibold">Yes</span></td>
                <td className="border border-muted p-3">Escrow amount in USD (must be &gt; 0)</td>
              </tr>
              <tr>
                <td className="border border-muted p-3"><code className="text-sm">currency</code></td>
                <td className="border border-muted p-3"><code className="text-sm">string</code></td>
                <td className="border border-muted p-3"><span className="text-red-600 font-semibold">Yes</span></td>
                <td className="border border-muted p-3">Currency code ("USD" only)</td>
              </tr>
              <tr>
                <td className="border border-muted p-3"><code className="text-sm">token</code></td>
                <td className="border border-muted p-3"><code className="text-sm">string</code></td>
                <td className="border border-muted p-3">No</td>
                <td className="border border-muted p-3">Payment token ("USDC", "SOL", "USDT")</td>
              </tr>
              <tr>
                <td className="border border-muted p-3"><code className="text-sm">description</code></td>
                <td className="border border-muted p-3"><code className="text-sm">string</code></td>
                <td className="border border-muted p-3">No</td>
                <td className="border border-muted p-3">Transaction description</td>
              </tr>
              <tr className="bg-yellow-50 dark:bg-yellow-950/20">
                <td className="border border-muted p-3"><code className="text-sm">release_conditions</code></td>
                <td className="border border-muted p-3"><code className="text-sm">object</code></td>
                <td className="border border-muted p-3"><span className="text-red-600 font-semibold">Yes</span></td>
                <td className="border border-muted p-3">Conditions for releasing funds (see below)</td>
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

        <h3 className="text-xl font-semibold mb-3">Release Condition Types</h3>
        
        <div className="space-y-4 mb-6">
          <div className="border border-muted rounded-lg p-4">
            <h4 className="font-semibold mb-2">1. Manual Approval</h4>
            <p className="text-sm text-muted-foreground mb-2">Requires specific wallet to approve release</p>
            <pre className="bg-slate-900 text-slate-100 p-3 rounded-lg overflow-x-auto font-mono text-xs">
              <code className="language-json mt-5">{`{
  "type": "manual_approval",
  "approver": "wallet_address",
  "approved": false
}`}</code>
            </pre>
          </div>

          <div className="border border-muted rounded-lg p-4">
            <h4 className="font-semibold mb-2">2. Time-Based (Auto-release)</h4>
            <p className="text-sm text-muted-foreground mb-2">Automatically releases funds after specified date</p>
            <pre className="bg-slate-900 text-slate-100 p-3 rounded-lg overflow-x-auto font-mono text-xs">
              <code className="language-json mt-5">{`{
  "type": "time_based",
  "release_after": "2025-11-01T00:00:00Z"
}`}</code>
            </pre>
          </div>

          <div className="border border-muted rounded-lg p-4">
            <h4 className="font-semibold mb-2">3. Multi-Signature Confirmation</h4>
            <p className="text-sm text-muted-foreground mb-2">Requires multiple approvals before release</p>
            <pre className="bg-slate-900 text-slate-100 p-3 rounded-lg overflow-x-auto font-mono text-xs">
              <code className="language-json mt-5">{`{
  "type": "confirmation_required",
  "confirmations_needed": 2,
  "confirmed_by": []
}`}</code>
            </pre>
          </div>

          <div className="border border-muted rounded-lg p-4">
            <h4 className="font-semibold mb-2">4. Milestone-Based</h4>
            <p className="text-sm text-muted-foreground mb-2">Release tied to specific project milestone completion</p>
            <pre className="bg-slate-900 text-slate-100 p-3 rounded-lg overflow-x-auto font-mono text-xs">
              <code className="language-json mt-5">{`{
  "type": "milestone",
  "description": "Website delivered and approved",
  "approved": false,
  "approved_by": null
}`}</code>
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-3">Example: Freelance Project Escrow</h3>
        <h4 className="font-medium mb-2">Request:</h4>
        <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm mb-4">
          <code className="language-bash mt-5">{`curl -X POST https://api.zendfi.tech/api/v1/escrows \\
  -H "Authorization: Bearer zfi_live_abc123..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "buyer_wallet": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
    "seller_wallet": "9yJKg3DX98h87TYKSDqcE6jCkhgTrB94UZSmKptgBsV",
    "amount": 2500.00,
    "currency": "USD",
    "token": "USDC",
    "description": "Website Development - Full Stack Project",
    "release_conditions": {
      "type": "milestone",
      "description": "Website delivered and approved by client",
      "approved": false,
      "approved_by": null
    },
    "metadata": {
      "project_id": "proj_12345",
      "contract_url": "https://example.com/contracts/12345"
    }
  }'`}</code>
        </pre>

        <h4 className="font-medium mb-2">Response: 200 OK</h4>
        <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm mb-4">
          <code className="language-json mt-5">{`{
  "id": "escrow_abc123def456",
  "payment_id": "payment_xyz789",
  "buyer_wallet": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
  "seller_wallet": "9yJKg3DX98h87TYKSDqcE6jCkhgTrB94UZSmKptgBsV",
  "escrow_wallet": "EscrowSystemWallet...",
  "amount": 2500.00,
  "status": "pending",
  "release_conditions": {
    "type": "milestone",
    "description": "Website delivered and approved by client",
    "approved": false,
    "approved_by": null
  },
  "payment_url": "https://zendfi.tech/pay/payment_xyz789",
  "qr_code": "solana:...",
  "created_at": "2025-10-26T12:00:00Z"
}`}</code>
        </pre>

        <Card className="p-4 bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
          <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">What Happens Next:</h4>
          <ol className="list-decimal pl-5 space-y-1 text-sm text-green-800 dark:text-green-200">
            <li>Buyer pays $2,500 USDC → Payment link or QR code</li>
            <li>Funds held in secure escrow wallet (not accessible to merchant)</li>
            <li>Seller receives notification and delivers website</li>
            <li>Buyer approves milestone via approve endpoint</li>
            <li>Funds automatically released to seller's wallet! 🎉</li>
          </ol>
        </Card>
      </section>

      {/* Get Escrow */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Get Escrow</h2>
        <p className="text-muted-foreground mb-4">
          Retrieve details of a specific escrow transaction, including status, parties, and release conditions.
        </p>

        <h3 className="text-xl font-semibold mb-3">Endpoint</h3>
        <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm mb-6">
          <code>GET /api/v1/escrows/:escrow_id</code>
        </pre>

        <h3 className="text-xl font-semibold mb-3">Authentication</h3>
        <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm mb-6">
          <code>Authorization: Bearer YOUR_API_KEY</code>
        </pre>

        <h4 className="font-medium mb-2">Example Request</h4>
        <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm mb-4">
          <code className="language-bash mt-5">{`curl -X GET https://api.zendfi.tech/api/v1/escrows/escrow_abc123def456 \\
  -H "Authorization: Bearer zfi_live_abc123..."`}</code>
        </pre>

        <h4 className="font-medium mb-2">Response: 200 OK</h4>
        <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm">
          <code className="language-json mt-5">{`{
  "id": "escrow_abc123def456",
  "payment_id": "payment_xyz789",
  "merchant_id": "merchant_123",
  "buyer_wallet": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
  "seller_wallet": "9yJKg3DX98h87TYKSDqcE6jCkhgTrB94UZSmKptgBsV",
  "escrow_wallet": "EscrowSystemWallet...",
  "release_conditions": {
    "type": "milestone",
    "description": "Website delivered and approved by client",
    "approved": false,
    "approved_by": null
  },
  "status": "funded",
  "funded_at": "2025-10-26T14:30:00Z",
  "released_at": null,
  "refunded_at": null,
  "disputed_at": null,
  "dispute_reason": null,
  "release_transaction_signature": null,
  "refund_transaction_signature": null,
  "metadata": {
    "project_id": "proj_12345"
  },
  "created_at": "2025-10-26T12:00:00Z",
  "updated_at": "2025-10-26T14:30:00Z"
}`}</code>
        </pre>
      </section>

      {/* List Escrows */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">List Escrows</h2>
        <p className="text-muted-foreground mb-4">
          Get all escrow transactions for your merchant account with pagination support.
        </p>

        <h3 className="text-xl font-semibold mb-3">Endpoint</h3>
        <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm mb-6">
          <code>GET /api/v1/escrows</code>
        </pre>

        <h3 className="text-xl font-semibold mb-3">Query Parameters</h3>
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full border-collapse border border-muted">
            <thead>
              <tr className="bg-muted/50">
                <th className="border border-muted p-3 text-left font-semibold">Parameter</th>
                <th className="border border-muted p-3 text-left font-semibold">Type</th>
                <th className="border border-muted p-3 text-left font-semibold">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-muted p-3"><code className="text-sm">limit</code></td>
                <td className="border border-muted p-3"><code className="text-sm">number</code></td>
                <td className="border border-muted p-3">Max results (default: 50, max: 100)</td>
              </tr>
              <tr>
                <td className="border border-muted p-3"><code className="text-sm">offset</code></td>
                <td className="border border-muted p-3"><code className="text-sm">number</code></td>
                <td className="border border-muted p-3">Pagination offset (default: 0)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h4 className="font-medium mb-2">Example Request</h4>
        <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm">
          <code className="language-bash mt-5">{`curl -X GET "https://api.zendfi.tech/api/v1/escrows?limit=20&offset=0" \\
  -H "Authorization: Bearer zfi_live_abc123..."`}</code>
        </pre>
      </section>

      {/* Approve Escrow Release */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Approve Escrow Release</h2>
        <p className="text-muted-foreground mb-4">
          Approve the release of escrowed funds to the seller. Once all approval conditions are met, funds are automatically released.
        </p>

        <h3 className="text-xl font-semibold mb-3">Endpoint</h3>
        <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm mb-6">
          <code>POST /api/v1/escrows/:escrow_id/approve</code>
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
                <td className="border border-muted p-3"><code className="text-sm">approver_wallet</code></td>
                <td className="border border-muted p-3"><code className="text-sm">string</code></td>
                <td className="border border-muted p-3"><span className="text-red-600 font-semibold">Yes</span></td>
                <td className="border border-muted p-3">Wallet address of approver</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h4 className="font-medium mb-2">Example Request</h4>
        <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm mb-4">
          <code className="language-bash mt-5">{`curl -X POST https://api.zendfi.tech/api/v1/escrows/escrow_abc123def456/approve \\
  -H "Authorization: Bearer zfi_live_abc123..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "approver_wallet": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU"
  }'`}</code>
        </pre>

        <h4 className="font-medium mb-2">Response: 200 OK (Fully Released)</h4>
        <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm mb-4">
          <code className="language-json mt-5">{`{
  "status": "released",
  "transaction_signature": "5KzZ8LWvZh7NYjJvPhHGYnNrB2rKqb2...",
  "message": "Escrow funds released to seller"
}`}</code>
        </pre>

        <h4 className="font-medium mb-2">Response: 200 OK (Approval Recorded, Waiting for More)</h4>
        <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm">
          <code className="language-json mt-5">{`{
  "status": "approved",
  "message": "Approval recorded, waiting for additional confirmations"
}`}</code>
        </pre>
      </section>

      {/* Refund Escrow */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Refund Escrow</h2>
        <p className="text-muted-foreground mb-4">
          Refund escrowed funds back to the buyer. Use this when the deal falls through or conditions are not met.
        </p>

        <h3 className="text-xl font-semibold mb-3">Endpoint</h3>
        <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm mb-6">
          <code>POST /api/v1/escrows/:escrow_id/refund</code>
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
                <td className="border border-muted p-3"><code className="text-sm">reason</code></td>
                <td className="border border-muted p-3"><code className="text-sm">string</code></td>
                <td className="border border-muted p-3"><span className="text-red-600 font-semibold">Yes</span></td>
                <td className="border border-muted p-3">Refund reason for your records</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h4 className="font-medium mb-2">Example Request</h4>
        <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm mb-4">
          <code className="language-bash mt-5">{`curl -X POST https://api.zendfi.tech/api/v1/escrows/escrow_abc123def456/refund \\
  -H "Authorization: Bearer zfi_live_abc123..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "reason": "Project cancelled by mutual agreement"
  }'`}</code>
        </pre>

        <h4 className="font-medium mb-2">Response: 200 OK</h4>
        <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm">
          <code className="language-json mt-5">{`{
  "status": "refunded",
  "transaction_signature": "3k8n5TY89VvD2kRfV4iqmLKtSWFjDnMoRcWr4dJYKPcH...",
  "message": "Escrow funds refunded to buyer",
  "reason": "Project cancelled by mutual agreement"
}`}</code>
        </pre>
      </section>

      {/* Dispute Escrow */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Dispute Escrow</h2>
        <p className="text-muted-foreground mb-4">
          Raise a dispute for an escrow transaction when there's disagreement between buyer and seller.
        </p>

        <h3 className="text-xl font-semibold mb-3">Endpoint</h3>
        <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm mb-6">
          <code>POST /api/v1/escrows/:escrow_id/dispute</code>
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
                <td className="border border-muted p-3"><code className="text-sm">reason</code></td>
                <td className="border border-muted p-3"><code className="text-sm">string</code></td>
                <td className="border border-muted p-3"><span className="text-red-600 font-semibold">Yes</span></td>
                <td className="border border-muted p-3">Detailed dispute reason</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h4 className="font-medium mb-2">Example Request</h4>
        <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm mb-4">
          <code className="language-bash mt-5">{`curl -X POST https://api.zendfi.tech/api/v1/escrows/escrow_abc123def456/dispute \\
  -H "Authorization: Bearer zfi_live_abc123..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "reason": "Seller did not deliver agreed upon features. Missing responsive design and payment integration."
  }'`}</code>
        </pre>

        <h4 className="font-medium mb-2">Response: 200 OK</h4>
        <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm mb-4">
          <code className="language-json mt-5">{`{
  "status": "disputed",
  "message": "Dispute raised successfully. ZendFi support will review within 24 hours.",
  "dispute_id": "dispute_abc123",
  "created_at": "2025-10-26T16:00:00Z"
}`}</code>
        </pre>

        <Card className="p-4 bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-800">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-orange-600 dark:text-orange-400 mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-semibold text-orange-900 dark:text-orange-100 mb-1">Dispute Resolution Process</p>
              <p className="text-orange-800 dark:text-orange-200">
                When a dispute is raised, ZendFi support team reviews within 24 hours. We'll contact both parties, review evidence, and make a fair decision to either release funds to seller or refund to buyer. During dispute, funds remain locked.
              </p>
            </div>
          </div>
        </Card>
      </section>

      {/* Escrow Statuses */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Escrow Statuses</h2>
        <p className="text-muted-foreground mb-4">
          Understanding escrow statuses helps you track the lifecycle of each transaction.
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
                <td className="border border-muted p-3"><code className="text-sm bg-yellow-100 dark:bg-yellow-900 px-2 py-1 rounded">pending</code></td>
                <td className="border border-muted p-3">Escrow created, waiting for buyer payment</td>
                <td className="border border-muted p-3">Send payment link to buyer</td>
              </tr>
              <tr>
                <td className="border border-muted p-3"><code className="text-sm bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded">funded</code></td>
                <td className="border border-muted p-3">Payment received, funds held in escrow</td>
                <td className="border border-muted p-3">Notify seller to deliver product/service</td>
              </tr>
              <tr>
                <td className="border border-muted p-3"><code className="text-sm bg-green-100 dark:bg-green-900 px-2 py-1 rounded">released</code></td>
                <td className="border border-muted p-3">Funds released to seller</td>
                <td className="border border-muted p-3">Transaction complete! 🎉</td>
              </tr>
              <tr>
                <td className="border border-muted p-3"><code className="text-sm bg-purple-100 dark:bg-purple-900 px-2 py-1 rounded">refunded</code></td>
                <td className="border border-muted p-3">Funds refunded to buyer</td>
                <td className="border border-muted p-3">Transaction cancelled</td>
              </tr>
              <tr>
                <td className="border border-muted p-3"><code className="text-sm bg-red-100 dark:bg-red-900 px-2 py-1 rounded">disputed</code></td>
                <td className="border border-muted p-3">Dispute raised, under review</td>
                <td className="border border-muted p-3">Wait for ZendFi support resolution</td>
              </tr>
              <tr>
                <td className="border border-muted p-3"><code className="text-sm bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">cancelled</code></td>
                <td className="border border-muted p-3">Escrow cancelled before funding</td>
                <td className="border border-muted p-3">No action needed</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Automatic Monitoring */}
      <section className="mb-12">
        <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border-purple-200 dark:border-purple-800">
          <h2 className="text-3xl font-bold mb-4">Automatic Escrow Monitoring ⏰</h2>
          <p className="text-muted-foreground mb-4">
            ZendFi automatically monitors all escrow transactions! Our background worker runs every hour to:
          </p>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-lg border border-purple-200 dark:border-purple-700">
            <ol className="list-decimal pl-5 space-y-2 text-muted-foreground">
              <li>Check time-based release conditions</li>
              <li>Auto-release funds when time condition is met</li>
              <li>Send email notifications to all parties</li>
              <li>Trigger webhooks for status changes</li>
              <li>Alert admins for disputed transactions</li>
            </ol>
          </div>

          <Card className="p-4 mt-4 bg-white dark:bg-slate-900 border-purple-300 dark:border-purple-700">
            <p className="font-semibold text-purple-900 dark:text-purple-100">
              ⚡ You don't need to manually check escrows - we handle the monitoring and execute releases automatically!
            </p>
          </Card>
        </Card>
      </section>

      {/* Webhook Events */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Webhook Events</h2>
        <p className="text-muted-foreground mb-4">
          Stay informed about escrow lifecycle changes with these webhook events.
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          <Card className="p-4 border-l-4 border-l-green-500">
            <h3 className="font-semibold mb-2">escrow.created</h3>
            <p className="text-sm text-muted-foreground">New escrow created - send payment link to buyer</p>
          </Card>

          <Card className="p-4 border-l-4 border-l-blue-500">
            <h3 className="font-semibold mb-2">escrow.funded</h3>
            <p className="text-sm text-muted-foreground">Buyer paid, funds in escrow - notify seller to deliver</p>
          </Card>

          <Card className="p-4 border-l-4 border-l-purple-500">
            <h3 className="font-semibold mb-2">escrow.released</h3>
            <p className="text-sm text-muted-foreground">Funds released to seller - transaction complete!</p>
          </Card>

          <Card className="p-4 border-l-4 border-l-yellow-500">
            <h3 className="font-semibold mb-2">escrow.refunded</h3>
            <p className="text-sm text-muted-foreground">Funds refunded to buyer - deal cancelled</p>
          </Card>

          <Card className="p-4 border-l-4 border-l-red-500">
            <h3 className="font-semibold mb-2">escrow.disputed</h3>
            <p className="text-sm text-muted-foreground">Dispute raised - review needed</p>
          </Card>
        </div>

        <h3 className="text-xl font-semibold mt-6 mb-3">Example Webhook Payload</h3>
        <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm">
          <code className="language-json mt-5">{`{
  "event": "escrow.funded",
  "timestamp": "2025-10-26T14:30:05Z",
  "data": {
    "escrow": {
      "id": "escrow_abc123def456",
      "buyer_wallet": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
      "seller_wallet": "9yJKg3DX98h87TYKSDqcE6jCkhgTrB94UZSmKptgBsV",
      "amount": 2500.00,
      "currency": "USD",
      "status": "funded",
      "funded_at": "2025-10-26T14:30:00Z"
    },
    "payment_id": "payment_xyz789"
  }
}`}</code>
        </pre>

        <Card className="p-4 mt-4 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
          <div className="flex items-start gap-3">
            <Zap className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-semibold text-blue-900 dark:text-blue-100 mb-1">Pro Tip</p>
              <p className="text-blue-800 dark:text-blue-200">
                Use webhooks to send email notifications to buyers and sellers, update your internal systems, and automate workflows. Check out our <a href="/docs/webhooks" className="underline font-semibold">Webhooks documentation</a> for setup details.
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
              <p className="text-sm text-muted-foreground">Configure webhooks to receive escrow event notifications</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
            <div>
              <p className="font-semibold">Create your first escrow</p>
              <p className="text-sm text-muted-foreground">Choose the right release conditions for your use case</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
            <div>
              <p className="font-semibold">Monitor and manage escrows</p>
              <p className="text-sm text-muted-foreground">Use the API to track status, approve releases, and handle disputes</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

