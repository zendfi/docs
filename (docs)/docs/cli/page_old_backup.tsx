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
          <h1 className="text-3xl md:text-4xl font-bold">ZendFi CLI</h1>
        </div>
        <p className="text-lg text-muted-foreground">
          Scaffold new projects and test payments directly from your terminal. Package name: <code className="bg-muted px-2 py-1 rounded text-sm">create-zendfi-app</code>
        </p>
      </div>

      {/* Quick Start */}
      <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-800">
        <div className="flex items-start gap-3">
          <Zap className="h-6 w-6 text-green-600 dark:text-green-400 mt-1 flex-shrink-0" />
          <div className="w-full">
            <h3 className="text-lg font-semibold mb-2 text-green-900 dark:text-green-100">Quick Start</h3>
            <p className="text-sm text-green-800 dark:text-green-200 mb-4">
              Create a new ZendFi project or add to existing one!
            </p>
            <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm">
              <code>{`# Create a new project
npx create-zendfi-app my-payment-app

# Or add to existing project
cd my-existing-app
npx create-zendfi-app init

# Test a payment
npx create-zendfi-app test payment --amount 100`}</code>
            </pre>
          </div>
        </div>
      </Card>

      {/* Installation */}
      <section>
        <h2 className="text-3xl font-bold mb-4">Usage</h2>
        
        <Card className="p-6 mb-4">
          <h3 className="text-xl font-semibold mb-3">Using npx (Recommended)</h3>
          <p className="text-muted-foreground mb-3">No installation needed! Run directly with npx:</p>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium mb-2">Create New Project</p>
              <pre className="bg-slate-900 text-slate-100 p-3 rounded-lg overflow-x-auto font-mono text-sm">
                <code>npx create-zendfi-app my-payment-app</code>
              </pre>
            </div>
            <div>
              <p className="text-sm font-medium mb-2">Add to Existing Project</p>
              <pre className="bg-slate-900 text-slate-100 p-3 rounded-lg overflow-x-auto font-mono text-sm">
                <code>npx create-zendfi-app init</code>
              </pre>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-3">Global Installation (Optional)</h3>
          <p className="text-muted-foreground mb-3">Install globally to use the <code className="bg-muted px-2 py-1 rounded text-sm">zendfi</code> command:</p>
          <pre className="bg-slate-900 text-slate-100 p-3 rounded-lg overflow-x-auto font-mono text-sm mb-3">
            <code>npm install -g create-zendfi-app</code>
          </pre>
          <p className="text-sm text-muted-foreground">Then use shorter commands:</p>
          <pre className="bg-slate-900 text-slate-100 p-3 rounded-lg overflow-x-auto font-mono text-sm">
            <code>{`zendfi init
zendfi test payment --amount 100
zendfi status pay_test_abc123`}</code>
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
          <p className="text-muted-foreground mb-3">Add ZendFi to an existing project</p>
          <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm mb-4">
            <code>{`# Interactive setup
zendfi init

# Skip prompts with defaults
zendfi init --yes

# Specify framework
zendfi init --framework nextjs

# Skip dependency installation
zendfi init --skip-install`}</code>
          </pre>
          <p className="text-sm text-muted-foreground">Creates .env file, config, and example webhook endpoint based on your framework.</p>
        </Card>

        {/* Test Payment */}
        <Card className="p-6 mb-4">
          <h3 className="text-xl font-semibold mb-3">Test Commands</h3>
          
          <div className="space-y-4">
            <div>
              <p className="font-semibold mb-2">Create Test Payment</p>
              <pre className="bg-slate-900 text-slate-100 p-3 rounded-lg overflow-x-auto font-mono text-sm">
                <code>{`zendfi test payment \\
  --amount 100 \\
  --description "Test payment" \\
  --email customer@example.com

# Options:
# --open         Open checkout URL in browser
# --watch        Watch payment status until completed`}</code>
              </pre>
            </div>
          </div>
        </Card>

        {/* Status */}
        <Card className="p-6 mb-4">
          <h3 className="text-xl font-semibold mb-3">
            <code className="text-lg">zendfi status</code>
          </h3>
          <p className="text-muted-foreground mb-3">Check payment status</p>
          <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm">
            <code>zendfi status pay_test_abc123</code>
          </pre>
        </Card>

        {/* Webhooks */}
        <Card className="p-6 mb-4">
          <h3 className="text-xl font-semibold mb-3">Webhook Commands</h3>
          
          <div className="space-y-4">
            <div>
              <p className="font-semibold mb-2">Listen for Webhooks Locally</p>
              <pre className="bg-slate-900 text-slate-100 p-3 rounded-lg overflow-x-auto font-mono text-sm">
                <code>{`# Start local webhook listener
zendfi webhooks listen

# Specify port
zendfi webhooks listen --port 3000

# Forward to another URL
zendfi webhooks listen --forward-to http://localhost:4000/webhooks`}</code>
              </pre>
              <p className="text-sm text-muted-foreground mt-2">Perfect for local development - receives webhooks and displays them in terminal</p>
            </div>
          </div>
        </Card>

        {/* Keys */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-3">API Key Management</h3>
          
          <div className="space-y-4">
            <div>
              <p className="font-semibold mb-2">List API Keys</p>
              <pre className="bg-slate-900 text-slate-100 p-3 rounded-lg overflow-x-auto font-mono text-sm">
                <code>zendfi keys list</code>
              </pre>
            </div>

            <div>
              <p className="font-semibold mb-2">Create API Key</p>
              <pre className="bg-slate-900 text-slate-100 p-3 rounded-lg overflow-x-auto font-mono text-sm">
                <code>{`zendfi keys create \\
  --name "Production Key" \\
  --mode live`}</code>
              </pre>
            </div>

            <div>
              <p className="font-semibold mb-2">Rotate API Key</p>
              <pre className="bg-slate-900 text-slate-100 p-3 rounded-lg overflow-x-auto font-mono text-sm">
                <code>zendfi keys rotate key_abc123</code>
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
