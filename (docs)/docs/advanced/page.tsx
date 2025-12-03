import { Card } from "@/components/ui/card"
import { Users, RefreshCw, Calendar, Shield, Mail, ArrowRight, CheckCircle2, Clock, Zap } from "lucide-react"
import Link from "next/link"

export default function AdvancedFeatures() {
  return (
    <div className="space-y-6 md:space-y-8 max-w-5xl">
      <div>
        <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-2">
          Payment Splits - Revenue Sharing Made Easy 💸
        </h1>
        <p className="text-base md:text-lg text-muted-foreground">
          Automatically distribute a single payment among multiple recipients. Perfect for marketplaces, affiliate programs, revenue sharing, and multi-vendor platforms! ✨
        </p>
      </div>

      {/* Payment Splits */}
      <section id="payment-splits">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Users className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">Payment Splits</h2>
          </div>
          <p className="text-muted-foreground mb-4">
            <strong>Payment Splits</strong> let you automatically distribute a single payment among multiple recipients - perfect for marketplaces, affiliate programs, revenue sharing, and multi-vendor platforms!
          </p>
          <h3 className="text-lg font-semibold mb-2">How It Works</h3>
          <ol className="list-decimal pl-5 space-y-1 mb-4 text-muted-foreground">
            <li>Customer makes a single payment</li>
            <li>ZendFi receives the full amount</li>
            <li>After confirmation, funds are automatically split</li>
            <li>Each recipient gets their share sent to their wallet</li>
            <li>All splits tracked with unique transaction signatures</li>
          </ol>
          <h3 className="text-lg font-semibold mb-2">Perfect For:</h3>
          <ul className="list-disc pl-5 space-y-1 mb-6 text-muted-foreground">
            <li><strong>Marketplaces</strong>: Split between seller, platform fee, and payment processor</li>
            <li><strong>Affiliates</strong>: Share revenue with referral partners</li>
            <li><strong>Creators</strong>: Split royalties with collaborators</li>
            <li><strong>Agencies</strong>: Distribute payments among team members</li>
            <li><strong>Platforms</strong>: Revenue sharing (e.g., Spotify-style splits)</li>
          </ul>
          <hr className="my-6 border-muted" />
          <h3 className="text-xl font-semibold mb-4">Create Payment with Splits</h3>
          <p className="mb-2">Add <code>split_recipients</code> to any payment creation request!</p>
          <h4 className="font-semibold mb-2">Endpoint</h4>
          <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
            <code>POST /api/v1/payments</code>
          </pre>
          <h4 className="font-semibold mb-2">Authentication</h4>
          <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
            <code>Authorization: Bearer YOUR_API_KEY</code>
          </pre>
          <h4 className="font-semibold mb-2">Request Parameters</h4>
          <div className="overflow-x-auto mb-4">
            <table className="min-w-full border-collapse border border-muted">
              <thead>
                <tr className="bg-muted/50">
                  <th className="border border-muted p-2 text-left">Parameter</th>
                  <th className="border border-muted p-2 text-left">Type</th>
                  <th className="border border-muted p-2 text-left">Required</th>
                  <th className="border border-muted p-2 text-left">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-muted p-2"><code>amount</code></td>
                  <td className="border border-muted p-2">number</td>
                  <td className="border border-muted p-2">Yes</td>
                  <td className="border border-muted p-2">Total payment amount in USD</td>
                </tr>
                <tr>
                  <td className="border border-muted p-2"><code>currency</code></td>
                  <td className="border border-muted p-2">string</td>
                  <td className="border border-muted p-2">Yes</td>
                  <td className="border border-muted p-2">Currency code (USD only)</td>
                </tr>
                <tr>
                  <td className="border border-muted p-2"><code>token</code></td>
                  <td className="border border-muted p-2">string</td>
                  <td className="border border-muted p-2">No</td>
                  <td className="border border-muted p-2">Token to receive (USDC, SOL, USDT)</td>
                </tr>
                <tr>
                  <td className="border border-muted p-2"><code>description</code></td>
                  <td className="border border-muted p-2">string</td>
                  <td className="border border-muted p-2">No</td>
                  <td className="border border-muted p-2">Payment description</td>
                </tr>
                <tr>
                  <td className="border border-muted p-2"><code>metadata</code></td>
                  <td className="border border-muted p-2">object</td>
                  <td className="border border-muted p-2">No</td>
                  <td className="border border-muted p-2">Custom data (max 16KB JSON)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted-foreground mb-4"><strong>Split Fields:</strong></p>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full border-collapse border border-muted">
              <thead>
                <tr className="bg-muted/50">
                  <th className="border border-muted p-2 text-left">Parameter</th>
                  <th className="border border-muted p-2 text-left">Type</th>
                  <th className="border border-muted p-2 text-left">Required</th>
                  <th className="border border-muted p-2 text-left">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-muted p-2"><code>split_recipients</code></td>
                  <td className="border border-muted p-2">array</td>
                  <td className="border border-muted p-2">No</td>
                  <td className="border border-muted p-2">Array of split recipient objects</td>
                </tr>
                <tr>
                  <td className="border border-muted p-2"><code>split_recipients[].recipient_wallet</code></td>
                  <td className="border border-muted p-2">string</td>
                  <td className="border border-muted p-2">Yes</td>
                  <td className="border border-muted p-2">Solana wallet address (base58)</td>
                </tr>
                <tr>
                  <td className="border border-muted p-2"><code>split_recipients[].recipient_name</code></td>
                  <td className="border border-muted p-2">string</td>
                  <td className="border border-muted p-2">No</td>
                  <td className="border border-muted p-2">Recipient name for reference</td>
                </tr>
                <tr>
                  <td className="border border-muted p-2"><code>split_recipients[].percentage</code></td>
                  <td className="border border-muted p-2">number</td>
                  <td className="border border-muted p-2">Yes*</td>
                  <td className="border border-muted p-2">Percentage of payment (0-100)</td>
                </tr>
                <tr>
                  <td className="border border-muted p-2"><code>split_recipients[].fixed_amount_usd</code></td>
                  <td className="border border-muted p-2">number</td>
                  <td className="border border-muted p-2">Yes*</td>
                  <td className="border border-muted p-2">Fixed USD amount</td>
                </tr>
                <tr>
                  <td className="border border-muted p-2"><code>split_recipients[].split_order</code></td>
                  <td className="border border-muted p-2">number</td>
                  <td className="border border-muted p-2">No</td>
                  <td className="border border-muted p-2">Order of execution (default: 0)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted-foreground mb-6"><em>*Note: Use <strong>either</strong> <code>percentage</code> OR <code>fixed_amount_usd</code>, not both.</em></p>
          <h4 className="font-semibold mb-2">Response Fields</h4>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full border-collapse border border-muted">
              <thead>
                <tr className="bg-muted/50">
                  <th className="border border-muted p-2 text-left">Field</th>
                  <th className="border border-muted p-2 text-left">Type</th>
                  <th className="border border-muted p-2 text-left">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-muted p-2"><code>id</code></td>
                  <td className="border border-muted p-2">UUID</td>
                  <td className="border border-muted p-2">Payment ID</td>
                </tr>
                <tr>
                  <td className="border border-muted p-2"><code>amount</code></td>
                  <td className="border border-muted p-2">number</td>
                  <td className="border border-muted p-2">Payment amount in USD</td>
                </tr>
                <tr>
                  <td className="border border-muted p-2"><code>currency</code></td>
                  <td className="border border-muted p-2">string</td>
                  <td className="border border-muted p-2">Currency code</td>
                </tr>
                <tr>
                  <td className="border border-muted p-2"><code>status</code></td>
                  <td className="border border-muted p-2">string</td>
                  <td className="border border-muted p-2">Payment status</td>
                </tr>
                <tr>
                  <td className="border border-muted p-2"><code>qr_code</code></td>
                  <td className="border border-muted p-2">string</td>
                  <td className="border border-muted p-2">Solana Pay URI</td>
                </tr>
                <tr>
                  <td className="border border-muted p-2"><code>payment_url</code></td>
                  <td className="border border-muted p-2">string</td>
                  <td className="border border-muted p-2">Payment URL</td>
                </tr>
                <tr>
                  <td className="border border-muted p-2"><code>expires_at</code></td>
                  <td className="border border-muted p-2">datetime</td>
                  <td className="border border-muted p-2">Expiration timestamp (15 minutes)</td>
                </tr>
                <tr>
                  <td className="border border-muted p-2"><code>split_ids</code></td>
                  <td className="border border-muted p-2">array</td>
                  <td className="border border-muted p-2">Array of split IDs (if splits configured)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <h3 className="text-xl font-semibold mb-4">Payment Split Examples</h3>
          <h4 className="font-semibold mb-2">Example 1: Marketplace with Platform Fee (Percentage)</h4>
          <p className="text-muted-foreground mb-4">Perfect for platforms like Etsy, Gumroad, or any marketplace!</p>
          <h5 className="font-medium mb-2">Request:</h5>
          <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
<code className="language-bash mt-5">{`curl -X POST https://api.zendfi.tech/api/v1/payments \\
  -H "Authorization: Bearer zfi_test_abc123..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "amount": 100.00,
    "currency": "USD",
    "token": "USDC",
    "description": "Handmade Pottery - Order #12345",
    "metadata": {
      "order_id": "12345",
      "product": "Ceramic Vase",
      "seller": "ArtisanPottery"
    },
    "split_recipients": [
      {
        "recipient_wallet": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
        "recipient_name": "Seller - ArtisanPottery",
        "percentage": 85.0,
        "split_order": 1
      },
      {
        "recipient_wallet": "8yKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsV",
        "recipient_name": "Platform Fee",
        "percentage": 10.0,
        "split_order": 2
      },
      {
        "recipient_wallet": "9zKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsW",
        "recipient_name": "Payment Processor",
        "percentage": 5.0,
        "split_order": 3
      }
    ]
  }'`}</code>
          </pre>
          <h5 className="font-medium mb-2">Response:</h5>
          <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
<code className="language-json mt-5">{`{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "amount": 100.00,
  "currency": "USD",
  "status": "Pending",
  "qr_code": "solana:ABC123...?amount=100&spl-token=USDC",
  "payment_url": "https://zendfi.tech/pay/550e8400-e29b-41d4-a716-446655440000",
  "expires_at": "2024-01-15T10:45:00Z",
  "split_ids": [
    "660e8400-e29b-41d4-a716-446655440001",
    "770e8400-e29b-41d4-a716-446655440002",
    "880e8400-e29b-41d4-a716-446655440003"
  ]
}`}</code>
          </pre>
          <h5 className="font-medium mb-4">What Happens:</h5>
          <ol className="list-decimal pl-5 space-y-1 text-muted-foreground mb-6">
            <li>Customer pays $100 USDC</li>
            <li>After confirmation:
              <ul className="list-disc pl-5 mt-1">
                <li>Seller gets $85 (85%)</li>
                <li>Platform gets $10 (10%)</li>
                <li>Payment processor gets $5 (5%)</li>
              </ul>
            </li>
            <li>All splits executed automatically</li>
            <li>Each recipient gets a separate transaction</li>
          </ol>
          <h4 className="font-semibold mb-2">Example 2: Affiliate Program (Fixed + Percentage)</h4>
          <p className="text-muted-foreground mb-4">Great for referral programs and affiliate marketing!</p>
          <h5 className="font-medium mb-2">Request:</h5>
          <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
<code className="language-bash mt-5">{`curl -X POST https://api.zendfi.tech/api/v1/payments \\
  -H "Authorization: Bearer zfi_test_abc123..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "amount": 299.99,
    "currency": "USD",
    "token": "USDC",
    "description": "Premium Course - Web3 Development",
    "metadata": {
      "course_id": "web3-101",
      "affiliate_code": "JOHN2024"
    },
    "split_recipients": [
      {
        "recipient_wallet": "AxKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsX",
        "recipient_name": "Course Creator",
        "percentage": 70.0,
        "split_order": 1
      },
      {
        "recipient_wallet": "BxKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsY",
        "recipient_name": "Affiliate - John",
        "fixed_amount_usd": 50.00,
        "split_order": 2
      },
      {
        "recipient_wallet": "CxKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsZ",
        "recipient_name": "Platform",
        "percentage": 13.33,
        "split_order": 3
      }
    ]
  }'`}</code>
          </pre>
          <h5 className="font-medium mb-2">Response:</h5>
          <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
<code className="language-json mt-5">{`{
  "id": "990e8400-e29b-41d4-a716-446655440004",
  "amount": 299.99,
  "currency": "USD",
  "status": "Pending",
  "qr_code": "solana:DEF456...?amount=299.99&spl-token=USDC",
  "payment_url": "https://zendfi.tech/pay/990e8400-e29b-41d4-a716-446655440004",
  "expires_at": "2024-01-15T11:00:00Z",
  "split_ids": [
    "aa0e8400-e29b-41d4-a716-446655440005",
    "bb0e8400-e29b-41d4-a716-446655440006",
    "cc0e8400-e29b-41d4-a716-446655440007"
  ]
}`}</code>
          </pre>
          <h5 className="font-medium mb-4">What Happens:</h5>
          <ol className="list-decimal pl-5 space-y-1 text-muted-foreground mb-6">
            <li>Customer pays $299.99 USDC</li>
            <li>After confirmation:
              <ul className="list-disc pl-5 mt-1">
                <li>Course creator gets $210.00 (70% = ~$209.99, rounded)</li>
                <li>Affiliate gets $50.00 (fixed amount)</li>
                <li>Platform gets $39.99 (remaining after fixed amounts)</li>
              </ul>
            </li>
            <li>All recipients paid automatically</li>
          </ol>
          <p className="text-sm text-muted-foreground mb-2"><strong>Split Calculation:</strong></p>
          <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
            <li>Course Creator: 70% of $299.99 = $209.99</li>
            <li>Affiliate: Fixed $50.00</li>
            <li>Platform: 13.33% of remaining = ~$40.00</li>
          </ul>
          <h4 className="font-semibold mb-2">Example 3: Multi-Creator Revenue Share</h4>
          <p className="text-muted-foreground mb-4">Perfect for music, podcasts, or collaborative content!</p>
          <h5 className="font-medium mb-2">Request:</h5>
          <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
<code className="language-bash mt-5">{`curl -X POST https://api.zendfi.tech/api/v1/payments \\
  -H "Authorization: Bearer zfi_live_xyz789..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "amount": 9.99,
    "currency": "USD",
    "token": "USDC",
    "description": "Album Purchase - Midnight Dreams",
    "metadata": {
      "album_id": "midnight-dreams",
      "format": "digital"
    },
    "split_recipients": [
      {
        "recipient_wallet": "DxKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsA",
        "recipient_name": "Artist 1 - Vocals",
        "percentage": 40.0,
        "split_order": 1
      },
      {
        "recipient_wallet": "ExKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsB",
        "recipient_name": "Artist 2 - Production",
        "percentage": 40.0,
        "split_order": 2
      },
      {
        "recipient_wallet": "FxKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsC",
        "recipient_name": "Label",
        "percentage": 15.0,
        "split_order": 3
      },
      {
        "recipient_wallet": "GxKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsD",
        "recipient_name": "Distribution Platform",
        "percentage": 5.0,
        "split_order": 4
      }
    ]
  }'`}</code>
          </pre>
          <h5 className="font-medium mb-2">Response:</h5>
          <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
<code className="language-json mt-5">{`{
  "id": "dd0e8400-e29b-41d4-a716-446655440008",
  "amount": 9.99,
  "currency": "USD",
  "status": "Pending",
  "qr_code": "solana:GHI789...?amount=9.99&spl-token=USDC",
  "payment_url": "https://zendfi.tech/pay/dd0e8400-e29b-41d4-a716-446655440008",
  "expires_at": "2024-01-15T11:15:00Z",
  "split_ids": [
    "ee0e8400-e29b-41d4-a716-446655440009",
    "ff0e8400-e29b-41d4-a716-446655440010",
    "000e8400-e29b-41d4-a716-446655440011",
    "110e8400-e29b-41d4-a716-446655440012"
  ]
}`}</code>
          </pre>
          <h5 className="font-medium mb-4">What Happens:</h5>
          <ol className="list-decimal pl-5 space-y-1 text-muted-foreground mb-6">
            <li>Customer pays $9.99 USDC</li>
            <li>After confirmation:
              <ul className="list-disc pl-5 mt-1">
                <li>Vocalist gets $3.996 (40%)</li>
                <li>Producer gets $3.996 (40%)</li>
                <li>Label gets $1.499 (15%)</li>
                <li>Platform gets $0.499 (5%)</li>
              </ul>
            </li>
            <li>Percentages add up to 100%</li>
            <li>Each artist gets paid directly</li>
          </ol>
          <h3 className="text-xl font-semibold mb-4">Split Validation Rules</h3>
          <p className="text-muted-foreground mb-4">ZendFi automatically validates your splits to prevent errors! ✅</p>
          <h4 className="font-semibold mb-2">Percentage-Based Splits</h4>
          <ul className="list-disc pl-5 space-y-1 text-muted-foreground mb-4">
            <li>Total percentages must equal exactly 100%</li>
            <li>Each percentage: 0.01% to 99.99%</li>
            <li>At least 1 recipient required</li>
            <li>Maximum 10 recipients per payment</li>
          </ul>
          <h4 className="font-semibold mb-2">Fixed Amount Splits</h4>
          <ul className="list-disc pl-5 space-y-1 text-muted-foreground mb-4">
            <li>Total fixed amounts must be less than payment amount</li>
            <li>Remaining balance distributed via percentages</li>
            <li>Minimum $0.01 per recipient</li>
            <li>Each wallet address must be valid Solana address</li>
          </ul>
          <h4 className="font-semibold mb-2">General Rules</h4>
          <ul className="list-disc pl-5 space-y-1 text-muted-foreground mb-6">
            <li>No duplicate wallet addresses</li>
            <li>Cannot split to the merchant&apos;s own wallet</li>
            <li>All wallet addresses must be base58 format</li>
            <li><code>split_order</code> determines execution sequence</li>
            <li>Each split gets unique ID for tracking</li>
          </ul>
          <h3 className="text-xl font-semibold mb-4">Error Responses</h3>
          <h4 className="font-semibold mb-2">400 Bad Request - Invalid Split Configuration</h4>
          <p className="text-muted-foreground mb-2"><strong>Total percentages don&apos;t equal 100%:</strong></p>
          <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
<code className="language-json mt-5">{`{
  "error": "Invalid split configuration",
  "details": "Total percentages must equal 100%, got 95%",
  "field": "split_recipients"
}`}</code>
          </pre>
          <p className="text-sm text-muted-foreground mb-4"><strong>Solution:</strong> Ensure all percentages add up to exactly 100.</p>
          <p className="text-muted-foreground mb-2"><strong>Fixed amounts exceed payment total:</strong></p>
          <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
<code className="language-json mt-5">{`{
  "error": "Invalid split configuration",
  "details": "Total fixed amounts ($120.00) exceed payment amount ($100.00)",
  "field": "split_recipients"
}`}</code>
          </pre>
          <p className="text-sm text-muted-foreground mb-4"><strong>Solution:</strong> Fixed amounts must leave room for percentage-based splits.</p>
          <p className="text-muted-foreground mb-2"><strong>Invalid wallet address:</strong></p>
          <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
<code className="language-json mt-5">{`{
  "error": "Invalid split configuration",
  "details": "Invalid Solana wallet address: invalid_address",
  "field": "split_recipients[0].recipient_wallet"
}`}</code>
          </pre>
          <p className="text-sm text-muted-foreground mb-4"><strong>Solution:</strong> All recipient wallets must be valid base58 Solana addresses.</p>
          <p className="text-muted-foreground mb-2"><strong>Duplicate wallets:</strong></p>
          <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
<code className="language-json mt-5">{`{
  "error": "Invalid split configuration",
  "details": "Duplicate wallet address: 7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
  "field": "split_recipients"
}`}</code>
          </pre>
          <p className="text-sm text-muted-foreground mb-4"><strong>Solution:</strong> Each recipient must have a unique wallet address.</p>
          <p className="text-muted-foreground mb-2"><strong>Too many recipients:</strong></p>
          <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
<code className="language-json mt-5">{`{
  "error": "Invalid split configuration",
  "details": "Maximum 10 split recipients allowed, got 15",
  "field": "split_recipients"
}`}</code>
          </pre>
          <p className="text-sm text-muted-foreground mb-4"><strong>Solution:</strong> Limit splits to 10 recipients per payment.</p>
          <p className="text-muted-foreground mb-2"><strong>Missing required field:</strong></p>
          <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
<code className="language-json mt-5">{`{
  "error": "Invalid split configuration",
  "details": "Either percentage or fixed_amount_usd is required",
  "field": "split_recipients[1]"
}`}</code>
          </pre>
          <p className="text-sm text-muted-foreground mb-4"><strong>Solution:</strong> Each recipient needs either <code>percentage</code> or <code>fixed_amount_usd</code>.</p>
          <h3 className="text-xl font-semibold mb-4">Split Status & Tracking</h3>
          <p className="text-muted-foreground mb-4">Each split has its own lifecycle and can be tracked independently!</p>
          <h4 className="font-semibold mb-2">Split Statuses</h4>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full border-collapse border border-muted">
              <thead>
                <tr className="bg-muted/50">
                  <th className="border border-muted p-2 text-left">Status</th>
                  <th className="border border-muted p-2 text-left">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-muted p-2"><code>pending</code></td>
                  <td className="border border-muted p-2">Payment confirmed, split queued for processing</td>
                </tr>
                <tr>
                  <td className="border border-muted p-2"><code>processing</code></td>
                  <td className="border border-muted p-2">Split transaction being sent on-chain</td>
                </tr>
                <tr>
                  <td className="border border-muted p-2"><code>completed</code></td>
                  <td className="border border-muted p-2">Split successfully sent to recipient</td>
                </tr>
                <tr>
                  <td className="border border-muted p-2"><code>failed</code></td>
                  <td className="border border-muted p-2">Split failed (will retry automatically)</td>
                </tr>
                <tr>
                  <td className="border border-muted p-2"><code>refunded</code></td>
                  <td className="border border-muted p-2">Split was refunded due to payment refund</td>
                </tr>
              </tbody>
            </table>
          </div>
          <h4 className="font-semibold mb-2">Automatic Retry</h4>
          <p className="text-muted-foreground mb-4">If a split fails (network issues, insufficient fees, etc.), ZendFi automatically retries:</p>
          <ul className="list-disc pl-5 space-y-1 text-muted-foreground mb-6">
            <li><strong>1st retry:</strong> After 1 minute</li>
            <li><strong>2nd retry:</strong> After 5 minutes</li>
            <li><strong>3rd retry:</strong> After 15 minutes</li>
            <li><strong>4th retry:</strong> After 1 hour</li>
            <li><strong>5th retry:</strong> After 24 hours</li>
          </ul>
          <p className="text-sm text-muted-foreground">After 5 failed attempts, the split is moved to manual review.</p>
          <h3 className="text-xl font-semibold mb-4">Webhooks for Splits</h3>
          <p className="text-muted-foreground mb-4">ZendFi sends separate webhook events for split completions!</p>
          <h4 className="font-semibold mb-2">Split Webhook Events</h4>
          <h5 className="font-medium mb-2">Split Completed:</h5>
          <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
<code className="language-json mt-5">{`{
  "event": "SplitCompleted",
  "split": {
    "id": "660e8400-e29b-41d4-a716-446655440001",
    "payment_id": "550e8400-e29b-41d4-a716-446655440000",
    "recipient_wallet": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
    "recipient_name": "Seller - ArtisanPottery",
    "amount_usd": 85.00,
    "amount_crypto": 85.00,
    "currency": "USDC",
    "status": "completed",
    "transaction_signature": "5KzZ8LWvZh7NYjJvPhHGYnNrB2rKqb2...",
    "settled_at": "2024-01-15T10:35:00Z"
  },
  "timestamp": "2024-01-15T10:35:00Z"
}`}</code>
          </pre>
          <h5 className="font-medium mb-2">Split Failed:</h5>
          <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
<code className="language-json mt-5">{`{
  "event": "SplitFailed",
  "split": {
    "id": "770e8400-e29b-41d4-a716-446655440002",
    "payment_id": "550e8400-e29b-41d4-a716-446655440000",
    "recipient_wallet": "8yKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsV",
    "failure_reason": "Insufficient SOL for transaction fees",
    "retry_count": 3,
    "next_retry_at": "2024-01-15T11:35:00Z"
  },
  "timestamp": "2024-01-15T10:36:00Z"
}`}</code>
          </pre>
          <h3 className="text-xl font-semibold mb-4">Code Examples</h3>
          <h4 className="font-semibold mb-2">Node.js: Create Payment with Splits</h4>
          <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
<code className="language-json mt-5">{`const axios = require('axios');

const ZENDFI_API_KEY = process.env.ZENDFI_API_KEY;

async function createMarketplacePayment(orderData) {
  const { 
    totalAmount, 
    sellerWallet, 
    sellerPercentage,
    platformWallet,
    platformPercentage 
  } = orderData;

  try {
    const response = await axios.post(
      'https://api.zendfi.tech/api/v1/payments',
      {
        amount: totalAmount,
        currency: 'USD',
        token: 'USDC',
        description: \`Order \${orderData.orderId} - \${orderData.productName}\`,
        metadata: {
          order_id: orderData.orderId,
          seller_id: orderData.sellerId,
          product_id: orderData.productId
        },
        split_recipients: [
          {
            recipient_wallet: sellerWallet,
            recipient_name: \`Seller - \${orderData.sellerName}\`,
            percentage: sellerPercentage,
            split_order: 1
          },
          {
            recipient_wallet: platformWallet,
            recipient_name: 'Platform Fee',
            percentage: platformPercentage,
            split_order: 2
          }
        ]
      },
      {
        headers: {
          'Authorization': \`Bearer \${ZENDFI_API_KEY}\`,
          'Content-Type': 'application/json'
        }
      }
    );

    const payment = response.data;
    console.log('zendfi.techPayment created with splits:');
    console.log(\`  Payment ID: \${payment.id}\`);
    console.log(\`  Amount: \$\${payment.amount} \${payment.currency}\`);
    console.log(\`  Splits: \${payment.split_ids.length} recipients\`);
    console.log(\`  QR Code: \${payment.qr_code}\`);
    console.log(\`  Expires: \${payment.expires_at}\`);

    return payment;
  } catch (error) {
    console.error('❌ Failed to create payment:', error.response?.data || error.message);
    throw error;
  }
}

// Example usage
(async () => {
  const payment = await createMarketplacePayment({
    orderId: 'ORD-12345',
    productName: 'Handmade Ceramic Vase',
    productId: 'PROD-999',
    totalAmount: 100.00,
    sellerId: 'SELLER-123',
    sellerName: 'ArtisanPottery',
    sellerWallet: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
    sellerPercentage: 85.0,
    platformWallet: '8yKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsV',
    platformPercentage: 15.0
  });

  console.log('\\n💡 Next steps:');
  console.log('1. Show QR code to customer');
  console.log('2. Monitor payment status via webhooks');
  console.log('3. Splits will process automatically after confirmation');
})();`}</code>
          </pre>
          <h4 className="font-semibold mb-2">Python: Affiliate Payment with Fixed Commission</h4>
          <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
<code className="language-java mt-5script">{`import requests
import os

ZENDFI_API_KEY = os.getenv('ZENDFI_API_KEY')
BASE_URL = 'https://api.zendfi.tech'

def create_affiliate_payment(sale_data):
    """Create payment with affiliate commission"""
    
    # Calculate splits
    affiliate_fixed = 50.00  # Fixed $50 commission
    creator_percentage = 70.0
    platform_percentage = 100.0 - creator_percentage  # Remaining after fixed amount
    
    response = requests.post(
        f'{BASE_URL}/api/v1/payments',
        headers={
            'Authorization': f'Bearer {ZENDFI_API_KEY}',
            'Content-Type': 'application/json'
        },
        json={
            'amount': sale_data['total_amount'],
            'currency': 'USD',
            'token': 'USDC',
            'description': f"{sale_data['product_name']} - Affiliate Sale",
            'metadata': {
                'product_id': sale_data['product_id'],
                'affiliate_code': sale_data['affiliate_code'],
                'customer_email': sale_data['customer_email']
            },
            'split_recipients': [
                {
                    'recipient_wallet': sale_data['creator_wallet'],
                    'recipient_name': f"Creator - {sale_data['creator_name']}",
                    'percentage': creator_percentage,
                    'split_order': 1
                },
                {
                    'recipient_wallet': sale_data['affiliate_wallet'],
                    'recipient_name': f"Affiliate - {sale_data['affiliate_name']}",
                    'fixed_amount_usd': affiliate_fixed,
                    'split_order': 2
                },
                {
                    'recipient_wallet': sale_data['platform_wallet'],
                    'recipient_name': 'Platform',
                    'percentage': platform_percentage,
                    'split_order': 3
                }
            ]
        }
    )
    
    if response.status_code == 200:
        payment = response.json()
        print('zendfi.techAffiliate payment created:')
        print(f'  Payment ID: {payment["id"]}')
        print(f'  Total: {payment["amount"]} {payment["currency"]}')
        print(f'  Splits: {len(payment["split_ids"])} recipients')
        print(f'  Creator gets: {creator_percentage}%')
        print(f'  Affiliate gets: {affiliate_fixed} (fixed)')
        print(f'  Platform gets: {platform_percentage}% of remainder')
        return payment
    else:
        print(f'❌ Payment creation failed: {response.json()}')
        return None

# Example usage
if __name__ == '__main__':
    payment = create_affiliate_payment({
        'product_id': 'course-web3-101',
        'product_name': 'Web3 Development Course',
        'total_amount': 299.99,
        'creator_name': 'TechGuru',
        'creator_wallet': 'AxKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsX',
        'affiliate_code': 'JOHN2024',
        'affiliate_name': 'John',
        'affiliate_wallet': 'BxKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsY',
        'platform_wallet': 'CxKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsZ',
        'customer_email': 'customer@example.com'
    })
    
    if payment:
        print('\\n💡 Payment created successfully!')
        print('Splits will be processed automatically after payment confirmation.')`}</code>
          </pre>
          <h3 className="text-xl font-semibold mb-4">Best Practices for Splits</h3>
          <h4 className="font-semibold mb-2">✅ DO</h4>
          <ul className="list-disc pl-5 space-y-1 text-muted-foreground mb-4">
            <li><strong>Validate splits on your backend</strong>: Double-check percentages add to 100%</li>
            <li><strong>Use recipient names</strong>: Helps with tracking and debugging</li>
            <li><strong>Set split_order</strong>: Control execution sequence</li>
            <li><strong>Store split_ids</strong>: Track each split independently</li>
            <li><strong>Listen for split webhooks</strong>: Know when each recipient gets paid</li>
            <li><strong>Test on devnet first</strong>: Verify split logic before production</li>
            <li><strong>Keep metadata detailed</strong>: Include order/transaction context</li>
            <li><strong>Handle split failures gracefully</strong>: Automatic retries handle most cases</li>
          </ul>
          <h4 className="font-semibold mb-2">❌ DON&apos;T</h4>
          <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
            <li>❌ <strong>Don&apos;t hardcode percentages</strong>: Make them configurable</li>
            <li>❌ <strong>Don&apos;t ignore validation</strong>: ZendFi validates, but you should too</li>
            <li>❌ <strong>Don&apos;t exceed 10 recipients</strong>: Keep it simple</li>
            <li>❌ <strong>Don&apos;t mix percentage and fixed randomly</strong>: Be consistent in your model</li>
            <li>❌ <strong>Don&apos;t forget transaction fees</strong>: Recipients need SOL for USDC</li>
            <li>❌ <strong>Don&apos;t skip testing</strong>: Test all split scenarios</li>
            <li>❌ <strong>Don&apos;t assume instant</strong>: Splits process after payment confirms (~30-60s)</li>
          </ul>
        </Card>
      </section>

      {/* See Also Section */}
      <section className="mt-12">
        <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Zap className="h-6 w-6 text-primary" />
            Explore More Advanced Features
          </h2>
          <p className="text-muted-foreground mb-6">
            ZendFi offers even more powerful payment features! Check out these APIs to supercharge your platform:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/docs/api/subscriptions" className="block group">
              <Card className="p-4 hover:shadow-lg transition-all duration-200 hover:border-primary">
                <div className="flex items-center gap-3 mb-2">
                  <RefreshCw className="h-5 w-5 text-purple-600" />
                  <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">Subscriptions API</h3>
                </div>
                <p className="text-sm text-muted-foreground">Recurring billing made easy - daily, weekly, monthly, or yearly plans with automatic processing.</p>
                <p className="text-xs text-primary mt-2 flex items-center gap-1">
                  Learn more <ArrowRight className="h-3 w-3" />
                </p>
              </Card>
            </Link>

            <Link href="/docs/api/escrows" className="block group">
              <Card className="p-4 hover:shadow-lg transition-all duration-200 hover:border-primary">
                <div className="flex items-center gap-3 mb-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">Escrows API</h3>
                </div>
                <p className="text-sm text-muted-foreground">Secure payments protecting buyers and sellers - perfect for freelance work, real estate, and marketplace sales.</p>
                <p className="text-xs text-primary mt-2 flex items-center gap-1">
                  Learn more <ArrowRight className="h-3 w-3" />
                </p>
              </Card>
            </Link>

            <Link href="/docs/api/installments" className="block group">
              <Card className="p-4 hover:shadow-lg transition-all duration-200 hover:border-primary">
                <div className="flex items-center gap-3 mb-2">
                  <Calendar className="h-5 w-5 text-orange-600" />
                  <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">Installments API</h3>
                </div>
                <p className="text-sm text-muted-foreground">Buy now, pay later - flexible payment plans with automatic late fee management and tracking.</p>
                <p className="text-xs text-primary mt-2 flex items-center gap-1">
                  Learn more <ArrowRight className="h-3 w-3" />
                </p>
              </Card>
            </Link>

            <Link href="/docs/api/invoices" className="block group">
              <Card className="p-4 hover:shadow-lg transition-all duration-200 hover:border-primary">
                <div className="flex items-center gap-3 mb-2">
                  <Mail className="h-5 w-5 text-indigo-600" />
                  <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">Invoices API</h3>
                </div>
                <p className="text-sm text-muted-foreground">Professional B2B invoicing with automatic numbering, email delivery, and payment tracking.</p>
                <p className="text-xs text-primary mt-2 flex items-center gap-1">
                  Learn more <ArrowRight className="h-3 w-3" />
                </p>
              </Card>
            </Link>
          </div>
        </Card>
      </section>
    </div>
  )
}

