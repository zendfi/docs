import { Card } from "@/components/ui/card"
import { DollarSign, Link2, Users, Calendar, Zap, Mail, RefreshCw, Gift, ExternalLink, TestTube, ArrowRight, AlertCircle } from "lucide-react"

export default function PaymentLinks() {
  return (
    <div className="space-y-6 md:space-y-8 max-w-5xl">
      <div>
        <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-2">
          Payment Links - Your Reusable Payment Superpower!
        </h1>
        <p className="text-base md:text-lg text-muted-foreground">
          Welcome to Payment Links - one of the coolest features in ZendFi! Think of payment links as your personal payment URLs that you can share anywhere and use multiple times. Perfect for social media, invoices, or anywhere you need a quick way to accept crypto payments. Let's dive in!
        </p>
      </div>

      {/* Table of Contents */}
      <Card className="p-6 bg-primary/5">
        <h2 className="text-xl font-bold mb-4">Table of Contents</h2>
        <ul className="space-y-2 text-muted-foreground">
          <li className="flex items-center gap-2">
            <ArrowRight className="w-4 h-4 text-primary" />
            <a href="#what-are-payment-links" className="hover:text-primary transition-colors">What Are Payment Links?</a>
          </li>
          <li className="flex items-center gap-2">
            <ArrowRight className="w-4 h-4 text-primary" />
            <a href="#create-a-payment-link" className="hover:text-primary transition-colors">Create a Payment Link</a>
          </li>
          <li className="flex items-center gap-2">
            <ArrowRight className="w-4 h-4 text-primary" />
            <a href="#get-payment-link-details" className="hover:text-primary transition-colors">Get Payment Link Details</a>
          </li>
          <li className="flex items-center gap-2">
            <ArrowRight className="w-4 h-4 text-primary" />
            <a href="#create-payment-from-link" className="hover:text-primary transition-colors">Create Payment from Link</a>
          </li>
          <li className="flex items-center gap-2">
            <ArrowRight className="w-4 h-4 text-primary" />
            <a href="#hosted-checkout-pages" className="hover:text-primary transition-colors">Hosted Checkout Pages</a>
          </li>
          <li className="flex items-center gap-2">
            <ArrowRight className="w-4 h-4 text-primary" />
            <a href="#use-cases--best-practices" className="hover:text-primary transition-colors">Use Cases & Best Practices</a>
          </li>
          <li className="flex items-center gap-2">
            <ArrowRight className="w-4 h-4 text-primary" />
            <a href="#testing-payment-links" className="hover:text-primary transition-colors">Testing Payment Links</a>
          </li>
        </ul>
      </Card>

      {/* What Are Payment Links? */}
      <div id="what-are-payment-links" className="space-y-4">
        <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2">
          <Link2 className="w-6 h-6 text-primary" />
          What Are Payment Links?
        </h2>
        <p className="text-muted-foreground">
          Payment links are <strong>reusable payment URLs</strong> that you can share with your customers. Unlike regular payments (which are one-time use), payment links can be used multiple times, making them perfect for:
        </p>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside">
          <li><strong>E-commerce</strong>: Product checkout pages</li>
          <li><strong>Social Media</strong>: Instagram/Twitter bio links</li>
          <li><strong>Email Campaigns</strong>: One link for all customers</li>
          <li><strong>Invoicing</strong>: Professional payment requests</li>
          <li><strong>Events</strong>: Ticket sales with QR codes</li>
          <li><strong>Donations</strong>: Ongoing fundraising campaigns</li>
        </ul>
        <Card className="p-6">
          <h3 className="text-lg font-bold mb-3">Key Features</h3>
          <ul className="space-y-2 text-muted-foreground list-disc list-inside">
            <li>Reusable (use limits optional)</li>
            <li>Hosted checkout pages included</li>
            <li>QR code generation automatic</li>
            <li>Expiration dates supported</li>
            <li>Track usage counts</li>
            <li>Custom metadata support</li>
          </ul>
        </Card>
      </div>

      {/* Create a Payment Link */}
      <div id="create-a-payment-link" className="space-y-4">
        <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2">
          Create a Payment Link
        </h2>
        <p className="text-muted-foreground">
          Generate a shareable payment link that can be used multiple times!
        </p>

        <Card className="p-6">
          <h3 className="text-lg font-bold mb-2">Endpoint</h3>
          <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
            <code>POST /api/v1/payment-links</code>
          </pre>

          <h3 className="text-lg font-bold mb-2">Authentication</h3>
          <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
            <code>Authorization: Bearer YOUR_API_KEY</code>
          </pre>

          <h3 className="text-lg font-bold mb-3">Request Parameters</h3>
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
                  <td className="p-2"><code>amount</code></td>
                  <td className="p-2">number</td>
                  <td className="p-2"><strong>Yes</strong></td>
                  <td className="p-2">Payment amount in USD (min: 0.01, max: 10,000)</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2"><code>currency</code></td>
                  <td className="p-2">string</td>
                  <td className="p-2"><strong>Yes</strong></td>
                  <td className="p-2">Currency code (currently only "USD" supported)</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2"><code>token</code></td>
                  <td className="p-2">string</td>
                  <td className="p-2">No</td>
                  <td className="p-2">Token to receive ("USDC", "SOL", "USDT"). Default: "USDC"</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2"><code>description</code></td>
                  <td className="p-2">string</td>
                  <td className="p-2">No</td>
                  <td className="p-2">Description shown on checkout page</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2"><code>max_uses</code></td>
                  <td className="p-2">integer</td>
                  <td className="p-2">No</td>
                  <td className="p-2">Maximum number of uses (unlimited if not set)</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2"><code>expires_at</code></td>
                  <td className="p-2">datetime</td>
                  <td className="p-2">No</td>
                  <td className="p-2">ISO 8601 expiration date (e.g., "2025-12-31T23:59:59Z")</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2"><code>metadata</code></td>
                  <td className="p-2">object</td>
                  <td className="p-2">No</td>
                  <td className="p-2">Custom data to attach (max 16KB JSON)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-bold mb-3">Response Fields</h3>
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
                  <td className="p-2">UUID</td>
                  <td className="p-2">Unique payment link ID</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2"><code>link_code</code></td>
                  <td className="p-2">string</td>
                  <td className="p-2">Short code for the link (e.g., "abc123xyz")</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2"><code>payment_url</code></td>
                  <td className="p-2">string</td>
                  <td className="p-2">Direct Solana Pay URL for wallet apps</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2"><code>hosted_page_url</code></td>
                  <td className="p-2">string</td>
                  <td className="p-2">Beautiful hosted checkout page URL</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2"><code>amount</code></td>
                  <td className="p-2">number</td>
                  <td className="p-2">Payment amount in USD</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2"><code>currency</code></td>
                  <td className="p-2">string</td>
                  <td className="p-2">Currency code</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2"><code>token</code></td>
                  <td className="p-2">string</td>
                  <td className="p-2">Token type (USDC/SOL/USDT)</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2"><code>max_uses</code></td>
                  <td className="p-2">integer</td>
                  <td className="p-2">Maximum uses allowed (null = unlimited)</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2"><code>uses_count</code></td>
                  <td className="p-2">integer</td>
                  <td className="p-2">Current number of uses</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2"><code>expires_at</code></td>
                  <td className="p-2">datetime</td>
                  <td className="p-2">Expiration date (null = never expires)</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2"><code>is_active</code></td>
                  <td className="p-2">boolean</td>
                  <td className="p-2">Whether the link is active</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2"><code>created_at</code></td>
                  <td className="p-2">datetime</td>
                  <td className="p-2">Link creation timestamp</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>

        <div className="space-y-6">
          <h3 className="text-lg font-bold">Examples</h3>

          {/* Example 1 */}
          <Card className="p-6 border-primary/50">
            <h4 className="text-lg font-bold mb-3">Example 1: Simple Product Payment Link (USDC)</h4>
            <p className="text-muted-foreground mb-4">Perfect for selling a product or service!</p>
            <h5 className="font-semibold mb-2">Request:</h5>
            <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
              <code className="language-bash mt-5">{`curl -X POST https://api.zendfi.tech/api/v1/payment-links \\
  -H "Authorization: Bearer zfi_test_abc123..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "amount": 49.99,
    "currency": "USD",
    "token": "USDC",
    "description": "Premium Subscription - Annual Plan",
    "metadata": {
      "product_id": "premium_annual",
      "plan": "yearly",
      "tier": "premium"
    }
  }'`}</code>
            </pre>
            <h5 className="font-semibold mb-2">Response:</h5>
            <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
              <code className="language-json mt-5">{`{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "link_code": "pyl_hk3n7x9m2q",
  "payment_url": "https://zendfi.tech/pay/link/pyl_hk3n7x9m2q",
  "hosted_page_url": "https://zendfi.tech/checkout/pyl_hk3n7x9m2q",
  "amount": 49.99,
  "currency": "USD",
  "token": "USDC",
  "max_uses": null,
  "uses_count": 0,
  "expires_at": null,
  "is_active": true,
  "created_at": "2025-10-27T10:30:00Z"
}`}</code>
            </pre>
            <p className="text-sm text-muted-foreground">
              <strong>What You Get:</strong>
            </p>
            <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside">
              <li><strong>payment_url</strong>: Direct link for Solana wallets (Phantom, Solflare)</li>
              <li><strong>hosted_page_url</strong>: Beautiful checkout page with QR code</li>
              <li><strong>Unlimited uses</strong>: Perfect for a product listing</li>
              <li><strong>Metadata</strong>: Track which product was purchased</li>
            </ul>
          </Card>

          {/* Example 2 */}
          <Card className="p-6">
            <h4 className="text-lg font-bold mb-3">Example 2: Limited-Use Event Ticket Link</h4>
            <p className="text-muted-foreground mb-4">Great for events with limited capacity!</p>
            <h5 className="font-semibold mb-2">Request:</h5>
            <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
              <code className="language-bash mt-5">{`curl -X POST https://api.zendfi.tech/api/v1/payment-links \\
  -H "Authorization: Bearer zfi_test_abc123..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "amount": 99.00,
    "currency": "USD",
    "token": "USDC",
    "description": "Web3 Conference 2025 - General Admission",
    "max_uses": 100,
    "expires_at": "2025-12-01T00:00:00Z",
    "metadata": {
      "event_name": "Web3 Conference 2025",
      "ticket_type": "general_admission",
      "venue": "Convention Center"
    }
  }'`}</code>
            </pre>
            <h5 className="font-semibold mb-2">Response:</h5>
            <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
              <code className="language-json mt-5">{`{
  "id": "660e8400-e29b-41d4-a716-446655440001",
  "link_code": "pyl_event_conf2025",
  "payment_url": "https://zendfi.tech/pay/link/pyl_event_conf2025",
  "hosted_page_url": "https://zendfi.tech/checkout/pyl_event_conf2025",
  "amount": 99.00,
  "currency": "USD",
  "token": "USDC",
  "max_uses": 100,
  "uses_count": 0,
  "expires_at": "2025-12-01T00:00:00Z",
  "is_active": true,
  "created_at": "2025-10-27T10:30:00Z"
}`}</code>
            </pre>
            <p className="text-sm text-muted-foreground">
              <strong>What Makes This Special:</strong>
            </p>
            <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside">
              <li><strong>Limited to 100 tickets</strong>: Automatic capacity management</li>
              <li><strong>Expires on event date</strong>: No late purchases</li>
              <li><strong>Usage tracking</strong>: Monitor ticket sales in real-time</li>
              <li><strong>Perfect for events</strong>: Conferences, concerts, workshops</li>
            </ul>
          </Card>

          {/* Example 3 */}
          <Card className="p-6">
            <h4 className="text-lg font-bold mb-3">Example 3: SOL Payment Link with Expiration</h4>
            <p className="text-muted-foreground mb-4">Accept SOL instead of stablecoins!</p>
            <h5 className="font-semibold mb-2">Request:</h5>
            <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
              <code className="language-bash mt-5">{`curl -X POST https://api.zendfi.tech/api/v1/payment-links \\
  -H "Authorization: Bearer zfi_test_abc123..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "amount": 25.00,
    "currency": "USD",
    "token": "SOL",
    "description": "Monthly Membership - November 2025",
    "max_uses": 500,
    "expires_at": "2025-11-30T23:59:59Z",
    "metadata": {
      "membership_month": "2025-11",
      "type": "monthly"
    }
  }'`}</code>
            </pre>
            <h5 className="font-semibold mb-2">Response:</h5>
            <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
              <code className="language-json mt-5">{`{
  "id": "770e8400-e29b-41d4-a716-446655440002",
  "link_code": "pyl_membership_nov2025",
  "payment_url": "https://zendfi.tech/pay/link/pyl_membership_nov2025",
  "hosted_page_url": "https://zendfi.tech/checkout/pyl_membership_nov2025",
  "amount": 25.00,
  "currency": "USD",
  "token": "SOL",
  "max_uses": 500,
  "uses_count": 0,
  "expires_at": "2025-11-30T23:59:59Z",
  "is_active": true,
  "created_at": "2025-10-27T10:30:00Z"
}`}</code>
            </pre>
            <p className="text-sm text-muted-foreground">
              <strong>Why SOL?</strong>
            </p>
            <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside">
              <li><strong>Lightning-fast</strong>: SOL transfers are instant</li>
              <li><strong>Crypto-native</strong>: Great for crypto-savvy audiences</li>
              <li><strong>Auto-conversion</strong>: Automatically converts to USDC on settlement (if <code>auto_usdc</code> is enabled)</li>
              <li><strong>Price locked</strong>: Amount in USD, converted to SOL at payment time</li>
            </ul>
          </Card>

          {/* Example 4 */}
          <Card className="p-6">
            <h4 className="text-lg font-bold mb-3">Example 4: Social Media Bio Link</h4>
            <p className="text-muted-foreground mb-4">Perfect for creators and influencers!</p>
            <h5 className="font-semibold mb-2">Request:</h5>
            <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
              <code className="language-bash mt-5">{`curl -X POST https://api.zendfi.tech/api/v1/payment-links \\
  -H "Authorization: Bearer zfi_test_abc123..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "amount": 5.00,
    "currency": "USD",
    "token": "USDC",
    "description": "☕ Buy Me a Coffee - Thanks for your support!",
    "metadata": {
      "creator": "awesome_creator",
      "platform": "instagram",
      "link_location": "bio"
    }
  }'`}</code>
            </pre>
            <h5 className="font-semibold mb-2">Response:</h5>
            <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
              <code className="language-json mt-5">{`{
  "id": "880e8400-e29b-41d4-a716-446655440003",
  "link_code": "pyl_coffee_tip",
  "payment_url": "https://zendfi.tech/pay/link/pyl_coffee_tip",
  "hosted_page_url": "https://zendfi.tech/checkout/pyl_coffee_tip",
  "amount": 5.00,
  "currency": "USD",
  "token": "USDC",
  "max_uses": null,
  "uses_count": 0,
  "expires_at": null,
  "is_active": true,
  "created_at": "2025-10-27T10:30:00Z"
}`}</code>
            </pre>
            <p className="text-sm text-muted-foreground">
              <strong>How to Use:</strong>
            </p>
            <ol className="space-y-1 text-sm text-muted-foreground list-decimal list-inside">
              <li>Copy the <code>hosted_page_url</code></li>
              <li>Add to Instagram/Twitter/TikTok bio</li>
              <li>Share in posts and stories</li>
              <li>Track tips with the <code>uses_count</code> field!</li>
            </ol>
          </Card>
        </div>
      </div>

      {/* Get Payment Link Details */}
      <div id="get-payment-link-details" className="space-y-4">
        <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2">
          <RefreshCw className="w-6 h-6 text-primary" />
          Get Payment Link Details
        </h2>
        <p className="text-muted-foreground">
          Retrieve information about an existing payment link.
        </p>

        <Card className="p-6">
          <h3 className="text-lg font-bold mb-2">Endpoint</h3>
          <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
            <code className="language-json mt-5">{`GET /api/v1/payment-links/{link_code}`}</code>
          </pre>

          <h3 className="text-lg font-bold mb-2">Authentication</h3>
          <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
            <code>No authentication required! Payment links are publicly accessible (but can only be used by the merchant).</code>
          </pre>

          <h3 className="text-lg font-bold mb-3">URL Parameters</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2 font-semibold">Parameter</th>
                  <th className="text-left p-2 font-semibold">Type</th>
                  <th className="text-left p-2 font-semibold">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2"><code>link_code</code></td>
                  <td className="p-2">string</td>
                  <td className="p-2">The unique link code (e.g., "pyl_hk3n7x9m2q")</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-bold mb-3">Example Request</h3>
          <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
            <code className="language-bash mt-5">{`curl https://api.zendfi.tech/api/v1/payment-links/pyl_hk3n7x9m2q`}</code>
          </pre>

          <h3 className="text-lg font-bold mb-3">Example Response</h3>
          <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
            <code className="language-json mt-5">{`{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "link_code": "pyl_hk3n7x9m2q",
  "payment_url": "https://zendfi.tech/pay/link/pyl_hk3n7x9m2q",
  "hosted_page_url": "https://zendfi.tech/checkout/pyl_hk3n7x9m2q",
  "amount": 49.99,
  "currency": "USD",
  "token": "USDC",
  "max_uses": null,
  "uses_count": 47,
  "expires_at": null,
  "is_active": true,
  "created_at": "2025-10-27T10:30:00Z"
}`}</code>
          </pre>
        </Card>

        <p className="text-sm text-muted-foreground">
          <strong>Pro Tip:</strong> Check the <code>uses_count</code> field to monitor how many times your link has been used! Great for tracking sales.
        </p>
      </div>

      {/* Create Payment from Link */}
      <div id="create-payment-from-link" className="space-y-4">
        <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2">
          <Zap className="w-6 h-6 text-primary" />
          Create Payment from Link
        </h2>
        <p className="text-muted-foreground">
          When a customer clicks your payment link, ZendFi automatically creates a new payment session with a 15-minute expiration window.
        </p>

        <Card className="p-6">
          <h3 className="text-lg font-bold mb-2">Endpoint</h3>
          <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
            <code className="language-json mt-5">{`POST /api/v1/payment-links/{link_code}/pay`}</code>
          </pre>

          <h3 className="text-lg font-bold mb-2">Authentication</h3>
          <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
            <code>No authentication required! This endpoint is meant to be called by your hosted checkout page or your frontend.</code>
          </pre>

          <h3 className="text-lg font-bold mb-3">URL Parameters</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2 font-semibold">Parameter</th>
                  <th className="text-left p-2 font-semibold">Type</th>
                  <th className="text-left p-2 font-semibold">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2"><code>link_code</code></td>
                  <td className="p-2">string</td>
                  <td className="p-2">The unique link code (e.g., "pyl_hk3n7x9m2q")</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-bold mb-3">Response Fields</h3>
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
                  <td className="p-2"><code>payment_id</code></td>
                  <td className="p-2">UUID</td>
                  <td className="p-2">Unique payment ID for this session</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2"><code>merchant_name</code></td>
                  <td className="p-2">string</td>
                  <td className="p-2">Your business name</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2"><code>amount_usd</code></td>
                  <td className="p-2">number</td>
                  <td className="p-2">Payment amount in USD</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2"><code>currency</code></td>
                  <td className="p-2">string</td>
                  <td className="p-2">Currency code</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2"><code>token</code></td>
                  <td className="p-2">string</td>
                  <td className="p-2">Token type (USDC/SOL/USDT)</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2"><code>description</code></td>
                  <td className="p-2">string</td>
                  <td className="p-2">Payment description</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2"><code>qr_code</code></td>
                  <td className="p-2">string</td>
                  <td className="p-2">Solana Pay URI for QR code</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2"><code>payment_url</code></td>
                  <td className="p-2">string</td>
                  <td className="p-2">Full Solana Pay URL</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2"><code>wallet_address</code></td>
                  <td className="p-2">string</td>
                  <td className="p-2">Your merchant wallet address</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2"><code>expires_at</code></td>
                  <td className="p-2">datetime</td>
                  <td className="p-2">Payment expiration (15 minutes from creation)</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2"><code>status</code></td>
                  <td className="p-2">string</td>
                  <td className="p-2">Payment status ("pending")</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2"><code>solana_network</code></td>
                  <td className="p-2">string</td>
                  <td className="p-2">Network ("mainnet-beta" or "devnet")</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2"><code>allow_custom_amount</code></td>
                  <td className="p-2">boolean</td>
                  <td className="p-2">Whether PWYW is enabled (false for payment links)</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2"><code>minimum_amount</code></td>
                  <td className="p-2">number</td>
                  <td className="p-2">Minimum amount (null for payment links)</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2"><code>maximum_amount</code></td>
                  <td className="p-2">number</td>
                  <td className="p-2">Maximum amount (null for payment links)</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2"><code>suggested_amount</code></td>
                  <td className="p-2">number</td>
                  <td className="p-2">Suggested amount (null for payment links)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-bold mb-3">Example Request</h3>
          <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
            <code className="language-bash mt-5">{`curl -X POST https://api.zendfi.tech/api/v1/payment-links/pyl_hk3n7x9m2q/pay`}</code>
          </pre>

          <h3 className="text-lg font-bold mb-3">Example Response</h3>
          <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
            <code className="language-json mt-5">{`{
  "payment_id": "990e8400-e29b-41d4-a716-446655440004",
  "merchant_name": "Awesome Coffee Shop",
  "amount_usd": 49.99,
  "currency": "USD",
  "token": "USDC",
  "description": "Premium Subscription - Annual Plan",
  "qr_code": "solana:ABC123...XYZ789?amount=49.99&spl-token=EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
  "payment_url": "solana:ABC123...XYZ789?amount=49.99&spl-token=EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
  "wallet_address": "ABC123...XYZ789",
  "expires_at": "2025-10-27T10:45:00Z",
  "status": "pending",
  "solana_network": "mainnet-beta",
  "allow_custom_amount": false,
  "minimum_amount": null,
  "maximum_amount": null,
  "suggested_amount": null
}`}</code>
          </pre>
        </Card>

        <ol className="space-y-2 text-muted-foreground list-decimal list-inside">
          <li>A new payment record is created in the database</li>
          <li>The payment link <code>uses_count</code> is incremented</li>
          <li>QR code is generated for mobile wallets</li>
          <li>15-minute timer starts</li>
          <li>Customer can complete payment via Phantom, Solflare, etc.</li>
        </ol>
      </div>

      {/* Error Responses */}
      <div className="space-y-4">
        <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2">
          <AlertCircle className="w-6 h-6 text-primary" />
          Error Responses
        </h2>

        <Card className="p-4">
          <h4 className="font-semibold mb-2">400 Bad Request</h4>
          <p className="text-muted-foreground mb-3">Link is invalid or inactive.</p>
          <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
            <code className="language-json mt-5">{`{
  "error": "Invalid payment link parameters",
  "details": "Amount must be greater than 0"
}`}</code>
          </pre>
        </Card>

        <Card className="p-4">
          <h4 className="font-semibold mb-2">404 Not Found</h4>
          <p className="text-muted-foreground mb-3">Payment link doesn't exist.</p>
          <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
            <code className="language-json mt-5">{`{
  "error": "Payment link not found",
  "details": "No payment link found with code: pyl_invalid123"
}`}</code>
          </pre>
        </Card>

        <Card className="p-4">
          <h4 className="font-semibold mb-2">410 Gone</h4>
          <p className="text-muted-foreground mb-3">Payment link has expired or reached max uses.</p>
          <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
            <code className="language-json mt-5">{`{
  "error": "Payment link no longer available",
  "details": "This payment link has expired or reached its usage limit"
}`}</code>
          </pre>
        </Card>

        <Card className="p-4">
          <h4 className="font-semibold mb-2">Expired Link:</h4>
          <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
            <code className="language-json mt-5">{`{
  "error": "Payment link expired",
  "details": "This link expired on 2025-11-30T23:59:59Z"
}`}</code>
          </pre>
        </Card>

        <Card className="p-4">
          <h4 className="font-semibold mb-2">Max Uses Reached:</h4>
          <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
            <code className="language-json mt-5">{`{
  "error": "Payment link capacity reached",
  "details": "This link has been used 100 times (maximum allowed)"
}`}</code>
          </pre>
        </Card>

        <Card className="p-4">
          <h4 className="font-semibold mb-2">500 Internal Server Error</h4>
          <p className="text-muted-foreground mb-3">Something went wrong on our end.</p>
          <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
            <code className="language-json mt-5">{`{
  "error": "Internal server error",
  "details": "Failed to create payment from link. Please try again."
}`}</code>
          </pre>
        </Card>
      </div>

      {/* Hosted Checkout Pages */}
      <div id="hosted-checkout-pages" className="space-y-4">
        <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2">
          <ExternalLink className="w-6 h-6 text-primary" />
          Hosted Checkout Pages
        </h2>
        <p className="text-muted-foreground">
          Every payment link comes with a <strong>beautiful, mobile-optimized checkout page</strong> automatically! No frontend development needed. 🎨
        </p>

        <Card className="p-6">
          <h3 className="text-lg font-bold mb-3">Accessing Hosted Pages</h3>
          <p className="text-muted-foreground mb-4">
            Use the <code>hosted_page_url</code> from your payment link response:
          </p>
          <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
            <code>https://zendfi.tech/checkout/pyl_hk3n7x9m2q</code>
          </pre>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-bold mb-3">What's Included?</h3>
          <ul className="space-y-2 text-muted-foreground list-disc list-inside">
            <li><strong>Mobile-optimized design</strong>: Perfect on all devices</li>
            <li><strong>Professional UI</strong>: Beautiful, trustworthy checkout experience</li>
            <li><strong>QR code display</strong>: Scan with Phantom, Solflare, or any Solana wallet</li>
            <li><strong>Live countdown timer</strong>: Shows 15-minute expiration</li>
            <li><strong>Payment instructions</strong>: Clear steps for customers</li>
            <li><strong>Real-time status updates</strong>: Automatically updates when payment confirms</li>
            <li><strong>Multi-network support</strong>: Works on mainnet and devnet</li>
            <li><strong>Secure</strong>: All transactions on Solana blockchain</li>
          </ul>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-bold mb-3">Sharing Options</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <ExternalLink className="w-4 h-4" />
                Direct Link
              </h4>
              <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
                <code>Share the hosted_page_url directly:
https://zendfi.tech/checkout/pyl_hk3n7x9m2q</code>
              </pre>
            </div>
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Zap className="w-4 h-4" />
                QR Code
              </h4>
              <p className="text-sm text-muted-foreground">Generate a QR code pointing to your hosted page for:</p>
              <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside">
                <li>Physical products (print on packaging)</li>
                <li>Marketing materials (flyers, posters)</li>
                <li>Event tickets (print on entrance)</li>
                <li>Restaurant menus (table tents)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Embed in Email
              </h4>
              <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
                <code className="language-json mt-5">{`<a href="https://zendfi.tech/checkout/pyl_hk3n7x9m2q">
  Click here to complete your payment
</a>`}</code>
              </pre>
            </div>
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Users className="w-4 h-4" />
                Social Media
              </h4>
              <p className="text-sm text-muted-foreground">Perfect for Instagram/Twitter bio links, TikTok profiles, YouTube descriptions!</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Use Cases & Best Practices */}
      <div id="use-cases--best-practices" className="space-y-4">
        <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2">
          <Users className="w-6 h-6 text-primary" />
          Use Cases & Best Practices
        </h2>

        {/* E-Commerce Store */}
        <Card className="p-6">
          <h3 className="text-lg font-bold mb-3">E-Commerce Store</h3>
          <p className="text-muted-foreground mb-4"><strong>Scenario:</strong> You sell digital products and want one link per product.</p>
          <h4 className="font-semibold mb-2">Implementation:</h4>
          <ol className="space-y-1 text-sm text-muted-foreground list-decimal list-inside">
            <li>Create a payment link for each product</li>
            <li>Store the <code>link_code</code> in your database</li>
            <li>Share the <code>hosted_page_url</code> on your product page</li>
            <li>Listen for <code>payment.confirmed</code> webhooks</li>
            <li>Deliver digital product automatically</li>
          </ol>
          <h4 className="font-semibold mb-3 mt-4">Best Practice:</h4>
          <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside">
            <li>Use unlimited <code>max_uses</code> for digital products</li>
            <li>Include product details in <code>metadata</code></li>
            <li>Set <code>description</code> to product name</li>
            <li>Use USDC for price stability</li>
          </ul>
        </Card>

        {/* Social Media Creator */}
        <Card className="p-6">
          <h3 className="text-lg font-bold mb-3">Social Media Creator</h3>
          <p className="text-muted-foreground mb-4"><strong>Scenario:</strong> You want fans to support you via tips.</p>
          <h4 className="font-semibold mb-2">Implementation:</h4>
          <ol className="space-y-1 text-sm text-muted-foreground list-decimal list-inside">
            <li>Create payment link with small amount (e.g., $5)</li>
            <li>Add <code>hosted_page_url</code> to Instagram/Twitter bio</li>
            <li>Monitor <code>uses_count</code> to track support</li>
            <li>Thank supporters via webhook data</li>
          </ol>
          <h4 className="font-semibold mb-3 mt-4">Best Practice:</h4>
          <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside">
            <li>Keep amount low ($1-$10) for accessibility</li>
            <li>Use friendly <code>description</code> like "☕ Buy me a coffee!"</li>
            <li>No <code>max_uses</code> or <code>expires_at</code> limits</li>
            <li>Consider USDC for stability, SOL for crypto fans</li>
          </ul>
        </Card>

        {/* Event Tickets */}
        <Card className="p-6">
          <h3 className="text-lg font-bold mb-3">Event Tickets</h3>
          <p className="text-muted-foreground mb-4"><strong>Scenario:</strong> Sell tickets for a conference with limited capacity.</p>
          <h4 className="font-semibold mb-2">Implementation:</h4>
          <ol className="space-y-1 text-sm text-muted-foreground list-decimal list-inside">
            <li>Create payment link with <code>max_uses</code> = ticket capacity</li>
            <li>Set <code>expires_at</code> to day before event</li>
            <li>Share hosted page on event website</li>
            <li>Monitor <code>uses_count</code> for capacity tracking</li>
            <li>Send ticket confirmation via webhook</li>
          </ol>
          <h4 className="font-semibold mb-3 mt-4">Best Practice:</h4>
          <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside">
            <li>Always set <code>max_uses</code> to prevent overselling</li>
            <li>Set <code>expires_at</code> to prevent late purchases</li>
            <li>Include event details in <code>metadata</code></li>
            <li>Use descriptive <code>description</code> with date/time</li>
          </ul>
        </Card>

        {/* Professional Invoicing */}
        <Card className="p-6">
          <h3 className="text-lg font-bold mb-3">Professional Invoicing</h3>
          <p className="text-muted-foreground mb-4"><strong>Scenario:</strong> Send payment requests to clients.</p>
          <h4 className="font-semibold mb-2">Implementation:</h4>
          <ol className="space-y-1 text-sm text-muted-foreground list-decimal list-inside">
            <li>Create payment link with <code>max_uses: 1</code> (one-time use)</li>
            <li>Include client details in <code>metadata</code></li>
            <li>Email the <code>hosted_page_url</code> to client</li>
            <li>Set <code>expires_at</code> to payment due date</li>
            <li>Track payment via webhook</li>
          </ol>
          <h4 className="font-semibold mb-3 mt-4">Best Practice:</h4>
          <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside">
            <li>Use <code>max_uses: 1</code> for single invoices</li>
            <li>Set <code>expires_at</code> to payment deadline</li>
            <li>Include invoice number in <code>metadata</code></li>
            <li>Use USDC for business payments</li>
          </ul>
        </Card>

        {/* Donations & Fundraising */}
        <Card className="p-6">
          <h3 className="text-lg font-bold mb-3">Donations & Fundraising</h3>
          <p className="text-muted-foreground mb-4"><strong>Scenario:</strong> Accept ongoing donations for a cause.</p>
          <h4 className="font-semibold mb-2">Implementation:</h4>
          <ol className="space-y-1 text-sm text-muted-foreground list-decimal list-inside">
            <li>Create payment link with suggested donation amount</li>
            <li>No <code>max_uses</code> or <code>expires_at</code> limits</li>
            <li>Share everywhere: website, social media, email</li>
            <li>Track total donations via <code>uses_count</code></li>
            <li>Thank donors via webhook data</li>
          </ol>
          <h4 className="font-semibold mb-3 mt-4">Best Practice:</h4>
          <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside">
            <li>Keep amount flexible (consider PWYW in future)</li>
            <li>Use inspiring <code>description</code></li>
            <li>No limits on uses or expiration</li>
            <li>USDC recommended for donor simplicity</li>
          </ul>
        </Card>
      </div>

      {/* Testing Payment Links */}
      <div id="testing-payment-links" className="space-y-4">
        <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2">
          <TestTube className="w-6 h-6 text-primary" />
          Testing Payment Links
        </h2>

        <Card className="p-6 border-primary/50">
          <h3 className="text-lg font-bold mb-3">Step 1: Create Test Link on Devnet</h3>
          <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
            <code className="language-bash mt-5">{`curl -X POST https://api.zendfi.tech/api/v1/payment-links \\
  -H "Authorization: Bearer zfi_test_abc123..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "amount": 0.01,
    "currency": "USD",
    "token": "USDC",
    "description": "Test Payment Link",
    "max_uses": 5
  }'`}</code>
          </pre>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-bold mb-3">Step 2: Visit Hosted Page</h3>
          <p className="text-sm text-muted-foreground mb-3">Open the <code>hosted_page_url</code> in your browser. You should see:</p>
          <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside">
            <li>Payment amount and description</li>
            <li>QR code for mobile wallets</li>
            <li>Your merchant name</li>
            <li>15-minute countdown timer</li>
          </ul>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-bold mb-3">Step 3: Create Payment Session</h3>
          <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
            <code className="language-bash mt-5">{`curl -X POST https://api.zendfi.tech/api/v1/payment-links/YOUR_LINK_CODE/pay`}</code>
          </pre>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-bold mb-3">Step 4: Complete Payment</h3>
          <p className="text-sm text-muted-foreground">Use a Solana devnet wallet (Phantom with devnet mode enabled) to scan the QR code or click the payment URL.</p>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-bold mb-3">Step 5: Monitor Webhook</h3>
          <p className="text-sm text-muted-foreground">Watch for <code>payment.created</code> and <code>payment.confirmed</code> webhooks to your configured URL!</p>
        </Card>
      </div>

      {/* Code Examples */}
      <div className="space-y-6">
        <h2 className="text-xl md:text-2xl font-bold">Code Examples</h2>

        {/* Node.js */}
        <Card className="p-6">
          <h3 className="text-lg font-bold mb-3">Node.js/Express: Create & Share Payment Link</h3>
          <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
            <code className="language-json mt-5">{`const express = require('express');
const axios = require('axios');

const app = express();
const ZENDFI_API_KEY = process.env.ZENDFI_API_KEY;

// Create payment link for a product
app.post('/products/:id/payment-link', async (req, res) => {
  const { id } = req.params;
  const product = await getProductById(id); // Your DB function

  try {
    const response = await axios.post(
      'https://api.zendfi.tech/api/v1/payment-links',
      {
        amount: product.price,
        currency: 'USD',
        token: 'USDC',
        description: \`\${product.name} - \${product.description}\`,
        metadata: {
          product_id: product.id,
          sku: product.sku,
          category: product.category
        }
      },
      {
        headers: {
          'Authorization': \`Bearer \${ZENDFI_API_KEY}\`,
          'Content-Type': 'application/json'
        }
      }
    );

    const link = response.data;

    // Save link_code to database for future reference
    await savePaymentLink(product.id, link.link_code);

    res.json({
      success: true,
      payment_link: link.hosted_page_url,
      link_code: link.link_code,
      message: 'Share this link with your customers!'
    });
  } catch (error) {
    console.error('Payment link creation failed:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to create payment link' });
  }
});

// Get payment link stats
app.get('/payment-links/:code/stats', async (req, res) => {
  const { code } = req.params;

  try {
    const response = await axios.get(
      \`https://api.zendfi.tech/api/v1/payment-links/\${code}\`
    );

    const link = response.data;

    res.json({
      link_code: code,
      uses_count: link.uses_count,
      max_uses: link.max_uses,
      remaining_uses: link.max_uses ? link.max_uses - link.uses_count : 'unlimited',
      is_active: link.is_active,
      expires_at: link.expires_at,
      created_at: link.created_at
    });
  } catch (error) {
    console.error('Failed to get link stats:', error.response?.data || error.message);
    res.status(404).json({ error: 'Payment link not found' });
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});`}</code>
          </pre>
        </Card>

        {/* Python */}
        <Card className="p-6">
          <h3 className="text-lg font-bold mb-3">Python/Flask: Event Ticketing with Payment Links</h3>
          <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
            <code className="language-json mt-5">{`from flask import Flask, request, jsonify
import requests
import os
from datetime import datetime, timedelta

app = Flask(__name__)
ZENDFI_API_KEY = os.getenv('ZENDFI_API_KEY')

@app.route('/events/<event_id>/create-ticket-link', methods=['POST'])
def create_ticket_link(event_id):
    """Create a payment link for event tickets"""
    event = get_event_by_id(event_id)  # Your DB function
    
    # Calculate expiration (day before event)
    event_date = datetime.fromisoformat(event['date'])
    expires_at = event_date - timedelta(days=1)
    
    response = requests.post(
        'https://api.zendfi.tech/api/v1/payment-links',
        headers={
            'Authorization': f'Bearer {ZENDFI_API_KEY}',
            'Content-Type': 'application/json'
        },
        json={
            'amount': event['ticket_price'],
            'currency': 'USD',
            'token': 'USDC',
            'description': f"{event['name']} - General Admission",
            'max_uses': event['capacity'],
            'expires_at': expires_at.isoformat() + 'Z',
            'metadata': {
                'event_id': event['id'],
                'event_name': event['name'],
                'event_date': event['date'],
                'ticket_type': 'general_admission',
                'venue': event['venue']
            }
        }
    )
    
    if response.status_code == 200:
        link = response.json()
        
        # Save to database
        save_ticket_link(event_id, link['link_code'], link['id'])
        
        return jsonify({
            'success': True,
            'hosted_page': link['hosted_page_url'],
            'link_code': link['link_code'],
            'capacity': link['max_uses'],
            'expires_at': link['expires_at'],
            'message': f"Ticket link created! Share this link to sell {link['max_uses']} tickets."
        }), 200
    else:
        return jsonify({
            'error': 'Failed to create ticket link',
            'details': response.json()
        }), 500

@app.route('/events/<event_id>/ticket-sales', methods=['GET'])
def get_ticket_sales(event_id):
    """Check how many tickets have been sold"""
    link_code = get_ticket_link_code(event_id)  # Your DB function
    
    response = requests.get(
        f'https://api.zendfi.tech/api/v1/payment-links/{link_code}'
    )
    
    if response.status_code == 200:
        link = response.json()
        sold = link['uses_count']
        capacity = link['max_uses']
        remaining = capacity - sold if capacity else 'unlimited'
        
        return jsonify({
            'event_id': event_id,
            'tickets_sold': sold,
            'total_capacity': capacity,
            'tickets_remaining': remaining,
            'is_sold_out': sold >= capacity if capacity else False,
            'link_active': link['is_active'],
            'expires_at': link['expires_at']
        }), 200
    else:
        return jsonify({'error': 'Ticket link not found'}), 404

if __name__ == '__main__':
    app.run(debug=True, port=5000)`}</code>
          </pre>
        </Card>
      </div>

      {/* Summary & Next Steps */}
      <Card className="p-6 bg-primary/5 border-primary/20">
        <h2 className="text-xl md:text-2xl font-bold mb-4">Summary & Next Steps</h2>
        <p className="text-muted-foreground mb-6">Congratulations! 🎉 You now know how to create and use payment links like a pro!</p>
        <p className="text-muted-foreground mb-6"><strong>What You Learned:</strong></p>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside">
          <li>Create reusable payment links with optional limits and expiration</li>
          <li>Accept USDC, SOL, or USDT payments</li>
          <li>Get beautiful hosted checkout pages automatically</li>
          <li>Track usage counts and monitor capacity</li>
          <li>Implement various use cases (e-commerce, events, donations, etc.)</li>
        </ul>
        <h3 className="text-lg font-bold mb-3">Next Steps:</h3>
        <ol className="space-y-2 text-muted-foreground list-decimal list-inside">
          <li>Read <a href="#webhooks" className="hover:text-primary transition-colors">Webhooks Guide</a> to handle payment notifications</li>
          <li>Explore <a href="#wallet-management" className="hover:text-primary transition-colors">Wallet Management</a> to check balances</li>
          <li>Check out <a href="#advanced-features" className="hover:text-primary transition-colors">Advanced Features</a> for payment splits</li>
        </ol>
        <h3 className="text-lg font-bold mb-3 mt-6">Need Help?</h3>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside">
          <li>Email: support@zendfi.tech</li>
          <li>Discord: discord.gg/zendfi</li>
          <li>Docs: https://docs.zendfi.tech</li>
        </ul>
        <p className="mt-4 font-semibold text-primary">Happy building!</p>
      </Card>
    </div>
  )
}
