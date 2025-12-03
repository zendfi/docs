"use client";

import { Card } from "@/components/ui/card";
import { Terminal, Zap, Code2, Rocket, Settings, Webhook, Key, FileCode } from "lucide-react";

export default function CLIDocumentation() {
  return (
    <div className="max-w-5xl mx-auto py-8 px-4 space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <Terminal className="h-8 w-8 text-primary" />
          <h1 className="text-3xl md:text-4xl font-bold">ZendFi CLI & Scaffolding</h1>
        </div>
        <p className="text-lg text-muted-foreground">
          Two powerful tools: <code className="bg-muted px-2 py-1 rounded text-sm">create-zendfi-app</code> for scaffolding projects and <code className="bg-muted px-2 py-1 rounded text-sm">zendfi</code> CLI for development utilities
        </p>
      </div>

      {/* Quick Start */}
      <Card className="p-6 bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/20 border-violet-200 dark:border-violet-800">
        <div className="flex items-start gap-3">
          <Zap className="h-6 w-6 text-violet-600 dark:text-violet-400 mt-1 flex-shrink-0" />
          <div className="w-full">
            <h3 className="text-lg font-semibold mb-2 text-violet-900 dark:text-violet-100">Quick Start</h3>
            <p className="text-sm text-violet-800 dark:text-violet-200 mb-4">
              Get started in seconds with our scaffolding tool or add ZendFi to an existing project!
            </p>
            <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm">
              <code className="language-json mt-5">{`# Scaffold a new project with template
npx create-zendfi-app my-payment-app

# Install CLI globally for development utilities
npm install -g create-zendfi-app

# Use CLI commands
zendfi init                    # Add ZendFi to existing project
zendfi test payment --amount 50
zendfi webhooks listen`}</code>
            </pre>
          </div>
        </div>
      </Card>

      {/* Part 1: create-zendfi-app (Scaffolding) */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Rocket className="h-6 w-6 text-primary" />
          <h2 className="text-3xl font-bold">Part 1: create-zendfi-app</h2>
        </div>
        <p className="text-muted-foreground mb-6">
          Scaffold a new ZendFi-powered application with pre-built templates. No global installation required - use with <code className="bg-muted px-1 py-0.5 rounded text-sm">npx</code>.
        </p>

        <Card className="p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <FileCode className="h-5 w-5 text-primary" />
            Create New Project
          </h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Interactive Mode (Recommended)</h4>
              <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm">
                <code className="language-json mt-5">{`npx create-zendfi-app my-app`}</code>
              </pre>
              <p className="text-sm text-muted-foreground mt-2">
                Prompts you to choose a template and configure your project interactively.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">With Template Flag</h4>
              <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm">
                <code className="language-json mt-5">{`npx create-zendfi-app my-app --template nextjs-ecommerce`}</code>
              </pre>
              <p className="text-sm text-muted-foreground mt-2">
                Directly specify a template to skip the selection prompt.
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4">Available Templates</h3>
          
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-semibold text-blue-600 dark:text-blue-400">nextjs-ecommerce</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Full-featured e-commerce store with product catalog, shopping cart, and checkout flow. Uses Next.js 14, TypeScript, and Tailwind CSS.
              </p>
            </div>

            <div className="border-l-4 border-purple-500 pl-4">
              <h4 className="font-semibold text-purple-600 dark:text-purple-400">nextjs-saas</h4>
              <p className="text-sm text-muted-foreground mt-1">
                SaaS starter with subscription billing, user authentication, and dashboard. Includes recurring payments and usage tracking.
              </p>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <h4 className="font-semibold text-green-600 dark:text-green-400">express-api</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Minimal Express.js API server with payment endpoints, webhook handling, and TypeScript support. Perfect for backend-only integrations.
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">Command Options</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-semibold">Option</th>
                  <th className="text-left p-3 font-semibold">Description</th>
                  <th className="text-left p-3 font-semibold">Default</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-3"><code className="bg-muted px-2 py-1 rounded">-t, --template</code></td>
                  <td className="p-3">Template to use (nextjs-ecommerce, nextjs-saas, express-api)</td>
                  <td className="p-3 text-muted-foreground">Interactive prompt</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3"><code className="bg-muted px-2 py-1 rounded">--env</code></td>
                  <td className="p-3">Environment (development, production)</td>
                  <td className="p-3 text-muted-foreground">development</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3"><code className="bg-muted px-2 py-1 rounded">-y, --yes</code></td>
                  <td className="p-3">Skip confirmation prompts</td>
                  <td className="p-3 text-muted-foreground">false</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3"><code className="bg-muted px-2 py-1 rounded">--skip-install</code></td>
                  <td className="p-3">Skip dependency installation</td>
                  <td className="p-3 text-muted-foreground">false</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3"><code className="bg-muted px-2 py-1 rounded">--skip-git</code></td>
                  <td className="p-3">Skip git initialization</td>
                  <td className="p-3 text-muted-foreground">false</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </section>

      {/* Part 2: zendfi CLI (Development Utilities) */}
      <section className="mt-12">
        <div className="flex items-center gap-2 mb-4">
          <Code2 className="h-6 w-6 text-primary" />
          <h2 className="text-3xl font-bold">Part 2: zendfi CLI</h2>
        </div>
        <p className="text-muted-foreground mb-6">
          Development utilities for testing payments, managing webhooks, and API keys. Install globally to access <code className="bg-muted px-1 py-0.5 rounded text-sm">zendfi</code> command.
        </p>

        <Card className="p-6 mb-6 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
          <h3 className="text-lg font-semibold mb-3 text-blue-900 dark:text-blue-100">Installation</h3>
          <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm">
            <code className="language-json mt-5">{`npm install -g create-zendfi-app

# Now you have access to 'zendfi' command
zendfi --help`}</code>
          </pre>
        </Card>

        {/* zendfi init */}
        <Card className="p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Settings className="h-5 w-5 text-primary" />
            <h3 className="text-xl font-semibold">zendfi init</h3>
          </div>
          <p className="text-muted-foreground mb-4">
            Add ZendFi to an existing project. Detects your framework and adds the necessary configuration.
          </p>

          <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm mb-4">
            <code className="language-json mt-5">{`# Navigate to your project
cd my-existing-app

# Add ZendFi
zendfi init

# With options
zendfi init --framework nextjs --skip-install -y`}</code>
          </pre>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-semibold">Option</th>
                  <th className="text-left p-3 font-semibold">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-3"><code className="bg-muted px-2 py-1 rounded">--framework</code></td>
                  <td className="p-3">Framework (nextjs, express, react)</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3"><code className="bg-muted px-2 py-1 rounded">--skip-install</code></td>
                  <td className="p-3">Skip installing dependencies</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3"><code className="bg-muted px-2 py-1 rounded">-y, --yes</code></td>
                  <td className="p-3">Skip confirmation prompts</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>

        {/* zendfi test payment */}
        <Card className="p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="h-5 w-5 text-primary" />
            <h3 className="text-xl font-semibold">zendfi test payment</h3>
          </div>
          <p className="text-muted-foreground mb-4">
            Create test payments quickly from the command line. Generates a checkout URL and optionally watches the payment status.
          </p>

          <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm mb-4">
            <code className="language-json mt-5">{`# Simple test payment
zendfi test payment

# With amount
zendfi test payment --amount 50

# Open in browser and watch status
zendfi test payment --amount 100 --open --watch

# Full example
zendfi test payment \\
  --amount 99.99 \\
  --description "Test Product" \\
  --email customer@example.com \\
  --open \\
  --watch`}</code>
          </pre>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-semibold">Option</th>
                  <th className="text-left p-3 font-semibold">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-3"><code className="bg-muted px-2 py-1 rounded">--amount</code></td>
                  <td className="p-3">Payment amount in USD (e.g., 50, 99.99)</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3"><code className="bg-muted px-2 py-1 rounded">--description</code></td>
                  <td className="p-3">Payment description/purpose</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3"><code className="bg-muted px-2 py-1 rounded">--email</code></td>
                  <td className="p-3">Customer email address</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3"><code className="bg-muted px-2 py-1 rounded">--open</code></td>
                  <td className="p-3">Open checkout URL in browser automatically</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3"><code className="bg-muted px-2 py-1 rounded">--watch</code></td>
                  <td className="p-3">Watch payment status in real-time</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>

        {/* zendfi status */}
        <Card className="p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Terminal className="h-5 w-5 text-primary" />
            <h3 className="text-xl font-semibold">zendfi status</h3>
          </div>
          <p className="text-muted-foreground mb-4">
            Check the status of any payment by ID.
          </p>

          <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm">
            <code className="language-json mt-5">{`zendfi status pay_test_abc123xyz`}</code>
          </pre>
        </Card>

        {/* zendfi webhooks listen */}
        <Card className="p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Webhook className="h-5 w-5 text-primary" />
            <h3 className="text-xl font-semibold">zendfi webhooks listen</h3>
          </div>
          <p className="text-muted-foreground mb-4">
            Listen for webhooks locally during development. Creates a local server and shows incoming webhook events in real-time.
          </p>

          <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm mb-4">
            <code className="language-json mt-5">{`# Listen on default port (3000)
zendfi webhooks listen

# Custom port
zendfi webhooks listen --port 4000

# Forward to your app
zendfi webhooks listen --forward-to http://localhost:3000/api/webhooks`}</code>
          </pre>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-semibold">Option</th>
                  <th className="text-left p-3 font-semibold">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-3"><code className="bg-muted px-2 py-1 rounded">--port</code></td>
                  <td className="p-3">Local port to listen on (default: 3000)</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3"><code className="bg-muted px-2 py-1 rounded">--forward-to</code></td>
                  <td className="p-3">Forward webhooks to this URL</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>

        {/* zendfi keys */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Key className="h-5 w-5 text-primary" />
            <h3 className="text-xl font-semibold">zendfi keys</h3>
          </div>
          <p className="text-muted-foreground mb-4">
            Manage your API keys from the command line.
          </p>

          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">List all keys</h4>
              <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm">
                <code className="language-json mt-5">{`zendfi keys list`}</code>
              </pre>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Create a new key</h4>
              <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm">
                <code className="language-json mt-5">{`zendfi keys create --name "Production API" --mode live`}</code>
              </pre>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Rotate a key</h4>
              <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm">
                <code className="language-json mt-5">{`zendfi keys rotate key_live_abc123xyz`}</code>
              </pre>
            </div>
          </div>
        </Card>
      </section>

      {/* Summary */}
      <Card className="p-6 bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-900/50 dark:to-gray-900/50">
        <h3 className="text-xl font-semibold mb-4">Quick Reference</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Rocket className="h-4 w-4 text-blue-600" />
              Scaffolding (npx)
            </h4>
            <div className="space-y-2 text-sm">
              <div><code className="bg-muted px-2 py-1 rounded">npx create-zendfi-app my-app</code></div>
              <p className="text-muted-foreground">Create new project with template</p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Code2 className="h-4 w-4 text-purple-600" />
              CLI Utilities (global)
            </h4>
            <div className="space-y-2 text-sm">
              <div><code className="bg-muted px-2 py-1 rounded">npm install -g create-zendfi-app</code></div>
              <p className="text-muted-foreground">Then use <code className="bg-muted px-1 rounded">zendfi</code> commands</p>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t">
          <p className="text-sm text-muted-foreground">
            📚 For more examples and advanced usage, check out our{" "}
            <a href="https://github.com/zendfi/zendfi-toolkit" className="text-primary hover:underline">
              GitHub repository
            </a>
          </p>
        </div>
      </Card>
    </div>
  );
}

