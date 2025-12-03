"use client";

import { Card } from "@/components/ui/card";
import { Terminal, Zap, CheckCircle2, Code, Shield, Package } from "lucide-react";

export default function CLIDocumentation() {
  return (
    <div className="max-w-5xl mx-auto py-8 px-4 space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <Terminal className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold">ZendFi CLI</h1>
        </div>
        <p className="text-xl text-muted-foreground">
          Command-line interface for managing ZendFi payments, merchants, and integrations directly from your terminal.
        </p>
      </div>

      {/* Quick Start */}
      <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-800">
        <div className="flex items-start gap-3">
          <Zap className="h-6 w-6 text-green-600 dark:text-green-400 mt-1 flex-shrink-0" />
          <div className="w-full">
            <h3 className="text-lg font-semibold mb-2 text-green-900 dark:text-green-100">Quick Start</h3>
            <p className="text-sm text-green-800 dark:text-green-200 mb-4">
              Install globally and authenticate in seconds!
            </p>
            <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm">
              <code>{`# Install globally
npm install -g @zendfi/cli

# Authenticate
zendfi login

# Create your first payment
zendfi payment create --amount 100 --description "Test payment"`}</code>
            </pre>
          </div>
        </div>
      </Card>

      {/* Installation */}
      <section>
        <h2 className="text-3xl font-bold mb-4">Installation</h2>
        
        <Card className="p-6 mb-4">
          <h3 className="text-xl font-semibold mb-3">Global Installation</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium mb-2">npm</p>
              <pre className="bg-slate-900 text-slate-100 p-3 rounded-lg overflow-x-auto font-mono text-sm">
                <code>npm install -g @zendfi/cli</code>
              </pre>
            </div>
            <div>
              <p className="text-sm font-medium mb-2">Yarn</p>
              <pre className="bg-slate-900 text-slate-100 p-3 rounded-lg overflow-x-auto font-mono text-sm">
                <code>yarn global add @zendfi/cli</code>
              </pre>
            </div>
            <div>
              <p className="text-sm font-medium mb-2">pnpm</p>
              <pre className="bg-slate-900 text-slate-100 p-3 rounded-lg overflow-x-auto font-mono text-sm">
                <code>pnpm add -g @zendfi/cli</code>
              </pre>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-3">Verify Installation</h3>
          <pre className="bg-slate-900 text-slate-100 p-3 rounded-lg overflow-x-auto font-mono text-sm mb-2">
            <code>zendfi --version</code>
          </pre>
          <pre className="bg-slate-900 text-slate-100 p-3 rounded-lg overflow-x-auto font-mono text-sm">
            <code># Output: @zendfi/cli 1.0.0</code>
          </pre>
        </Card>
      </section>

      {/* Authentication */}
      <section>
        <h2 className="text-3xl font-bold mb-4">Authentication</h2>
        
        <Card className="p-6 mb-4">
          <h3 className="text-xl font-semibold mb-3">Login with API Key</h3>
          <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm mb-4">
            <code>{`zendfi login

# You'll be prompted for:
# - API Key (test or live)
# - Network (mainnet or devnet)`}</code>
          </pre>

          <h3 className="text-xl font-semibold mb-3 mt-6">Environment-Specific Login</h3>
          <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm">
            <code>{`# Login to test environment
zendfi login --test

# Login to production
zendfi login --live`}</code>
          </pre>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-3">Configuration File</h3>
          <p className="text-muted-foreground mb-3">
            Your credentials are stored in <code className="bg-muted px-2 py-1 rounded text-sm">~/.zendfi/config.json</code>
          </p>
          <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm">
            <code>{`{
  "test": {
    "apiKey": "zfi_test_...",
    "network": "devnet"
  },
  "live": {
    "apiKey": "zfi_live_...",
    "network": "mainnet"
  },
  "defaultMode": "test"
}`}</code>
          </pre>
        </Card>
      </section>

      {/* Commands */}
      <section>
        <h2 className="text-3xl font-bold mb-4">Commands</h2>

        {/* Init */}
        <Card className="p-6 mb-4">
          <h3 className="text-xl font-semibold mb-3">
            <code className="text-lg">zendfi init</code>
          </h3>
          <p className="text-muted-foreground mb-3">Initialize ZendFi in your project</p>
          <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm">
            <code>{`zendfi init

# Creates:
# - .env file with ZENDFI_API_KEY
# - zendfi.config.js with project settings
# - Example webhook endpoint`}</code>
          </pre>
        </Card>

        {/* Merchant Commands */}
        <Card className="p-6 mb-4">
          <h3 className="text-xl font-semibold mb-3">Merchant Commands</h3>
          
          <div className="space-y-4">
            <div>
              <p className="font-semibold mb-2">Create Merchant</p>
              <pre className="bg-slate-900 text-slate-100 p-3 rounded-lg overflow-x-auto font-mono text-sm">
                <code>{`zendfi merchant create \\
  --name "My Store" \\
  --email "hello@mystore.com" \\
  --address "123 Main St, SF, CA" \\
  --wallet mpc_passkey`}</code>
              </pre>
            </div>

            <div>
              <p className="font-semibold mb-2">Get Merchant Info</p>
              <pre className="bg-slate-900 text-slate-100 p-3 rounded-lg overflow-x-auto font-mono text-sm">
                <code>zendfi merchant get</code>
              </pre>
            </div>

            <div>
              <p className="font-semibold mb-2">Update Merchant</p>
              <pre className="bg-slate-900 text-slate-100 p-3 rounded-lg overflow-x-auto font-mono text-sm">
                <code>zendfi merchant update --webhook-url https://mystore.com/webhooks</code>
              </pre>
            </div>
          </div>
        </Card>

        {/* Payment Commands */}
        <Card className="p-6 mb-4">
          <h3 className="text-xl font-semibold mb-3">Payment Commands</h3>
          
          <div className="space-y-4">
            <div>
              <p className="font-semibold mb-2">Create Payment</p>
              <pre className="bg-slate-900 text-slate-100 p-3 rounded-lg overflow-x-auto font-mono text-sm">
                <code>{`zendfi payment create \\
  --amount 100 \\
  --currency USD \\
  --token USDC \\
  --description "Premium subscription" \\
  --email customer@example.com

# Returns payment ID and checkout URL`}</code>
              </pre>
            </div>

            <div>
              <p className="font-semibold mb-2">Get Payment Status</p>
              <pre className="bg-slate-900 text-slate-100 p-3 rounded-lg overflow-x-auto font-mono text-sm">
                <code>zendfi payment get payment_abc123</code>
              </pre>
            </div>

            <div>
              <p className="font-semibold mb-2">List Payments</p>
              <pre className="bg-slate-900 text-slate-100 p-3 rounded-lg overflow-x-auto font-mono text-sm">
                <code>{`zendfi payment list

# With filters
zendfi payment list --status confirmed --limit 50`}</code>
              </pre>
            </div>
          </div>
        </Card>

        {/* Subscription Commands */}
        <Card className="p-6 mb-4">
          <h3 className="text-xl font-semibold mb-3">Subscription Commands</h3>
          
          <div className="space-y-4">
            <div>
              <p className="font-semibold mb-2">Create Subscription Plan</p>
              <pre className="bg-slate-900 text-slate-100 p-3 rounded-lg overflow-x-auto font-mono text-sm">
                <code>{`zendfi subscription create-plan \\
  --name "Premium Monthly" \\
  --amount 29.99 \\
  --interval monthly \\
  --trial-days 14`}</code>
              </pre>
            </div>

            <div>
              <p className="font-semibold mb-2">List Plans</p>
              <pre className="bg-slate-900 text-slate-100 p-3 rounded-lg overflow-x-auto font-mono text-sm">
                <code>zendfi subscription list-plans</code>
              </pre>
            </div>

            <div>
              <p className="font-semibold mb-2">Subscribe Customer</p>
              <pre className="bg-slate-900 text-slate-100 p-3 rounded-lg overflow-x-auto font-mono text-sm">
                <code>{`zendfi subscription subscribe \\
  --plan plan_abc123 \\
  --wallet 7xKBN4tF2vxUqLrXpE3mDwY7zQsN8rW6vH5jC4kM1pT2 \\
  --email customer@example.com`}</code>
              </pre>
            </div>

            <div>
              <p className="font-semibold mb-2">Cancel Subscription</p>
              <pre className="bg-slate-900 text-slate-100 p-3 rounded-lg overflow-x-auto font-mono text-sm">
                <code>zendfi subscription cancel subscription_abc123 --at-period-end</code>
              </pre>
            </div>
          </div>
        </Card>

        {/* Escrow Commands */}
        <Card className="p-6 mb-4">
          <h3 className="text-xl font-semibold mb-3">Escrow Commands</h3>
          
          <div className="space-y-4">
            <div>
              <p className="font-semibold mb-2">Create Escrow</p>
              <pre className="bg-slate-900 text-slate-100 p-3 rounded-lg overflow-x-auto font-mono text-sm">
                <code>{`zendfi escrow create \\
  --buyer 7xKBN4tF2vxUqLrXpE3mDwY7zQsN8rW6vH5jC4kM1pT2 \\
  --seller 9yMCD5uG3wyVsMLxRpF4nEzY8aRtP9xS7wK6oJ5lN2qU \\
  --amount 2500 \\
  --description "Freelance project"`}</code>
              </pre>
            </div>

            <div>
              <p className="font-semibold mb-2">List Escrows</p>
              <pre className="bg-slate-900 text-slate-100 p-3 rounded-lg overflow-x-auto font-mono text-sm">
                <code>zendfi escrow list --status pending</code>
              </pre>
            </div>

            <div>
              <p className="font-semibold mb-2">Approve/Refund</p>
              <pre className="bg-slate-900 text-slate-100 p-3 rounded-lg overflow-x-auto font-mono text-sm">
                <code>{`# Approve release to seller
zendfi escrow approve escrow_abc123

# Refund to buyer
zendfi escrow refund escrow_abc123 --reason "Project cancelled"`}</code>
              </pre>
            </div>
          </div>
        </Card>

        {/* Invoice Commands */}
        <Card className="p-6 mb-4">
          <h3 className="text-xl font-semibold mb-3">Invoice Commands</h3>
          
          <div className="space-y-4">
            <div>
              <p className="font-semibold mb-2">Create Invoice</p>
              <pre className="bg-slate-900 text-slate-100 p-3 rounded-lg overflow-x-auto font-mono text-sm">
                <code>{`zendfi invoice create \\
  --customer-email client@example.com \\
  --customer-name "Acme Corp" \\
  --amount 3500 \\
  --description "Web Development Q4 2025" \\
  --due-date 2025-11-15`}</code>
              </pre>
            </div>

            <div>
              <p className="font-semibold mb-2">Send Invoice</p>
              <pre className="bg-slate-900 text-slate-100 p-3 rounded-lg overflow-x-auto font-mono text-sm">
                <code>zendfi invoice send invoice_abc123</code>
              </pre>
            </div>

            <div>
              <p className="font-semibold mb-2">List Invoices</p>
              <pre className="bg-slate-900 text-slate-100 p-3 rounded-lg overflow-x-auto font-mono text-sm">
                <code>zendfi invoice list --status sent</code>
              </pre>
            </div>
          </div>
        </Card>

        {/* Webhook Commands */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-3">Webhook Commands</h3>
          
          <div className="space-y-4">
            <div>
              <p className="font-semibold mb-2">Setup Webhook</p>
              <pre className="bg-slate-900 text-slate-100 p-3 rounded-lg overflow-x-auto font-mono text-sm">
                <code>{`zendfi webhook setup \\
  --url https://mystore.com/webhooks/zendfi \\
  --events payment.confirmed,subscription.renewed`}</code>
              </pre>
            </div>

            <div>
              <p className="font-semibold mb-2">Test Webhook</p>
              <pre className="bg-slate-900 text-slate-100 p-3 rounded-lg overflow-x-auto font-mono text-sm">
                <code>{`# Send test webhook event
zendfi webhook test payment.confirmed`}</code>
              </pre>
            </div>

            <div>
              <p className="font-semibold mb-2">Listen Locally (Development)</p>
              <pre className="bg-slate-900 text-slate-100 p-3 rounded-lg overflow-x-auto font-mono text-sm">
                <code>{`# Forward webhooks to local server
zendfi webhook listen --port 3000`}</code>
              </pre>
            </div>
          </div>
        </Card>
      </section>

      {/* Global Flags */}
      <section>
        <h2 className="text-3xl font-bold mb-4">Global Flags</h2>
        
        <Card className="p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-muted text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="border border-muted p-3 text-left font-semibold">Flag</th>
                  <th className="border border-muted p-3 text-left font-semibold">Short</th>
                  <th className="border border-muted p-3 text-left font-semibold">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-muted p-3"><code>--test</code></td>
                  <td className="border border-muted p-3"><code>-t</code></td>
                  <td className="border border-muted p-3">Use test environment (devnet)</td>
                </tr>
                <tr>
                  <td className="border border-muted p-3"><code>--live</code></td>
                  <td className="border border-muted p-3"><code>-l</code></td>
                  <td className="border border-muted p-3">Use live environment (mainnet)</td>
                </tr>
                <tr>
                  <td className="border border-muted p-3"><code>--json</code></td>
                  <td className="border border-muted p-3"><code>-j</code></td>
                  <td className="border border-muted p-3">Output as JSON</td>
                </tr>
                <tr>
                  <td className="border border-muted p-3"><code>--table</code></td>
                  <td className="border border-muted p-3"><code></code></td>
                  <td className="border border-muted p-3">Output as formatted table (default)</td>
                </tr>
                <tr>
                  <td className="border border-muted p-3"><code>--verbose</code></td>
                  <td className="border border-muted p-3"><code>-v</code></td>
                  <td className="border border-muted p-3">Show detailed output</td>
                </tr>
                <tr>
                  <td className="border border-muted p-3"><code>--help</code></td>
                  <td className="border border-muted p-3"><code>-h</code></td>
                  <td className="border border-muted p-3">Show help for command</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-semibold mb-3 mt-6">Examples</h3>
          <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm">
            <code>{`# Create payment in test mode with JSON output
zendfi payment create --test --json --amount 100 --description "Test"

# List live payments verbosely
zendfi payment list --live --verbose

# Get help for specific command
zendfi subscription --help`}</code>
          </pre>
        </Card>
      </section>

      {/* Output Formats */}
      <section>
        <h2 className="text-3xl font-bold mb-4">Output Formats</h2>
        
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-3">Table Format (Default)</h3>
          <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm mb-6">
            <code>{`$ zendfi payment list

┌──────────────┬────────────┬────────┬───────────┬──────────────────────┐
│ ID           │ Amount     │ Token  │ Status    │ Created              │
├──────────────┼────────────┼────────┼───────────┼──────────────────────┤
│ payment_abc1 │ $100.00    │ USDC   │ confirmed │ 2025-11-10 14:30:00  │
│ payment_def2 │ $50.00     │ SOL    │ pending   │ 2025-11-10 13:15:00  │
│ payment_ghi3 │ $200.00    │ USDC   │ confirmed │ 2025-11-10 12:00:00  │
└──────────────┴────────────┴────────┴───────────┴──────────────────────┘`}</code>
          </pre>

          <h3 className="text-xl font-semibold mb-3">JSON Format</h3>
          <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm">
            <code>{`$ zendfi payment get payment_abc123 --json

{
  "id": "payment_abc123",
  "amount_usd": 100.00,
  "payment_token": "USDC",
  "status": "confirmed",
  "created_at": "2025-11-10T14:30:00Z",
  "checkout_url": "https://zendfi.tech/pay/payment_abc123"
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
              <p className="font-semibold">Install the CLI</p>
              <p className="text-sm text-muted-foreground">Run <code className="bg-muted px-2 py-1 rounded text-xs">npm install -g @zendfi/cli</code> to get started</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
            <div>
              <p className="font-semibold">Authenticate</p>
              <p className="text-sm text-muted-foreground">Use <code className="bg-muted px-2 py-1 rounded text-xs">zendfi login</code> with your API key</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
            <div>
              <p className="font-semibold">Explore commands</p>
              <p className="text-sm text-muted-foreground">Try <code className="bg-muted px-2 py-1 rounded text-xs">zendfi --help</code> to see all available commands</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
