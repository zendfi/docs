"use client";

import { Card } from "@/components/ui/card";
import { FileText, Zap, Check, AlertCircle, Mail } from "lucide-react";

export default function InvoicesAPIPage() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <FileText className="h-8 w-8 text-primary" />
          <h1 className="text-3xl md:text-4xl font-bold">Invoices API</h1>
        </div>
        <p className="text-lg text-muted-foreground">
          Create and send professional invoices with automatic payment tracking and email delivery. Perfect for B2B services and freelancers.
        </p>
      </div>

      {/* Quick Start Card */}
      <Card className="p-6 mb-8 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950/20 dark:to-blue-950/20 border-indigo-200 dark:border-indigo-800">
        <div className="flex items-start gap-3">
          <Mail className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mt-1 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-semibold mb-2 text-indigo-900 dark:text-indigo-100">How Invoicing Works</h3>
            <ol className="list-decimal pl-5 space-y-2 text-sm text-indigo-800 dark:text-indigo-200">
              <li>Create an invoice with line items, due date, and customer email</li>
              <li>Get auto-generated invoice number (e.g., INV-2025-00042)</li>
              <li>Send invoice → Professional email delivered with payment link</li>
              <li>Customer clicks link and pays instantly</li>
              <li>Invoice automatically marked as <strong>"paid"</strong> - done! 🎉</li>
            </ol>
            <p className="text-sm text-indigo-700 dark:text-indigo-300 mt-3">
              <strong>No more:</strong> Chasing payments, manual tracking, or messy spreadsheets. Just professional invoices that get paid!
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
              <p className="font-semibold">Automatic Invoice Numbering</p>
              <p className="text-sm text-muted-foreground">Sequential numbers (INV-2025-00001, etc.)</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold">Line Items Support</p>
              <p className="text-sm text-muted-foreground">Detailed breakdown with quantity and pricing</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold">Due Dates</p>
              <p className="text-sm text-muted-foreground">Set payment deadlines for your invoices</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold">Email Delivery</p>
              <p className="text-sm text-muted-foreground">Professional emails sent automatically</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold">Payment URLs</p>
              <p className="text-sm text-muted-foreground">One-click payment links for customers</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold">Status Tracking</p>
              <p className="text-sm text-muted-foreground">Draft, sent, or paid - always know where you stand</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Use Cases */}
      <Card className="p-6 mb-8 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-800">
        <h2 className="text-2xl font-bold mb-4">Common Use Cases</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-slate-900 p-4 rounded-lg border border-green-200 dark:border-green-700">
            <h3 className="font-semibold mb-2">💼 Freelancers & Agencies</h3>
            <p className="text-sm text-muted-foreground">Invoice clients for web development, design, consulting services</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-4 rounded-lg border border-green-200 dark:border-green-700">
            <h3 className="font-semibold mb-2">🏢 B2B Services</h3>
            <p className="text-sm text-muted-foreground">Monthly retainers, project milestones, enterprise contracts</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-4 rounded-lg border border-green-200 dark:border-green-700">
            <h3 className="font-semibold mb-2">🎓 Education Providers</h3>
            <p className="text-sm text-muted-foreground">Course fees, tutoring sessions, bootcamp payments</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-4 rounded-lg border border-green-200 dark:border-green-700">
            <h3 className="font-semibold mb-2">🛠️ Service Businesses</h3>
            <p className="text-sm text-muted-foreground">Repair services, maintenance contracts, professional services</p>
          </div>
        </div>
      </Card>

      {/* Create Invoice */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Create Invoice</h2>
        <p className="text-muted-foreground mb-4">
          Create a professional invoice with line items, due dates, and automatic numbering. Perfect for billing your clients!
        </p>

        <h3 className="text-xl font-semibold mb-3">Endpoint</h3>
        <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm mb-6">
          <code>POST /api/v1/invoices</code>
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
              <tr className="bg-yellow-50 dark:bg-yellow-950/20">
                <td className="border border-muted p-3"><code className="text-sm">customer_email</code></td>
                <td className="border border-muted p-3"><code className="text-sm">string</code></td>
                <td className="border border-muted p-3"><span className="text-red-600 font-semibold">Yes</span></td>
                <td className="border border-muted p-3">Customer's email address</td>
              </tr>
              <tr>
                <td className="border border-muted p-3"><code className="text-sm">customer_name</code></td>
                <td className="border border-muted p-3"><code className="text-sm">string</code></td>
                <td className="border border-muted p-3">No</td>
                <td className="border border-muted p-3">Customer's name or company</td>
              </tr>
              <tr className="bg-yellow-50 dark:bg-yellow-950/20">
                <td className="border border-muted p-3"><code className="text-sm">amount</code></td>
                <td className="border border-muted p-3"><code className="text-sm">number</code></td>
                <td className="border border-muted p-3"><span className="text-red-600 font-semibold">Yes</span></td>
                <td className="border border-muted p-3">Total invoice amount in USD (must be &gt; 0)</td>
              </tr>
              <tr>
                <td className="border border-muted p-3"><code className="text-sm">token</code></td>
                <td className="border border-muted p-3"><code className="text-sm">string</code></td>
                <td className="border border-muted p-3">No</td>
                <td className="border border-muted p-3">Payment token ("USDC", "SOL", "USDT")</td>
              </tr>
              <tr className="bg-yellow-50 dark:bg-yellow-950/20">
                <td className="border border-muted p-3"><code className="text-sm">description</code></td>
                <td className="border border-muted p-3"><code className="text-sm">string</code></td>
                <td className="border border-muted p-3"><span className="text-red-600 font-semibold">Yes</span></td>
                <td className="border border-muted p-3">Invoice description/title</td>
              </tr>
              <tr className="bg-green-50 dark:bg-green-950/20">
                <td className="border border-muted p-3"><code className="text-sm">line_items</code></td>
                <td className="border border-muted p-3"><code className="text-sm">array</code></td>
                <td className="border border-muted p-3">No</td>
                <td className="border border-muted p-3">Array of line item objects (detailed breakdown)</td>
              </tr>
              <tr>
                <td className="border border-muted p-3"><code className="text-sm">due_date</code></td>
                <td className="border border-muted p-3"><code className="text-sm">datetime</code></td>
                <td className="border border-muted p-3">No</td>
                <td className="border border-muted p-3">Payment due date</td>
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

        <h3 className="text-xl font-semibold mb-3">Line Item Object</h3>
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full border-collapse border border-muted">
            <thead>
              <tr className="bg-muted/50">
                <th className="border border-muted p-3 text-left font-semibold">Field</th>
                <th className="border border-muted p-3 text-left font-semibold">Type</th>
                <th className="border border-muted p-3 text-left font-semibold">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-muted p-3"><code className="text-sm">description</code></td>
                <td className="border border-muted p-3"><code className="text-sm">string</code></td>
                <td className="border border-muted p-3">Item description/service name</td>
              </tr>
              <tr>
                <td className="border border-muted p-3"><code className="text-sm">quantity</code></td>
                <td className="border border-muted p-3"><code className="text-sm">number</code></td>
                <td className="border border-muted p-3">Quantity of item/hours</td>
              </tr>
              <tr>
                <td className="border border-muted p-3"><code className="text-sm">unit_price</code></td>
                <td className="border border-muted p-3"><code className="text-sm">number</code></td>
                <td className="border border-muted p-3">Price per unit in USD</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-xl font-semibold mb-3">Example: Freelance Service Invoice</h3>
        <h4 className="font-medium mb-2">Request:</h4>
        <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm mb-4">
          <code className="language-bash mt-5">{`curl -X POST https://api.zendfi.tech/api/v1/invoices \\
  -H "Authorization: Bearer zfi_live_abc123..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "customer_email": "client@example.com",
    "customer_name": "Acme Corp",
    "amount": 3500.00,
    "token": "USDC",
    "description": "Web Development Services - Q4 2025",
    "line_items": [
      {
        "description": "Frontend Development (React)",
        "quantity": 40,
        "unit_price": 50.00
      },
      {
        "description": "Backend API Development",
        "quantity": 30,
        "unit_price": 50.00
      },
      {
        "description": "UI/UX Design",
        "quantity": 10,
        "unit_price": 100.00
      }
    ],
    "due_date": "2025-11-15T23:59:59Z",
    "metadata": {
      "project_id": "proj_q4_2025",
      "po_number": "PO-12345"
    }
  }'`}</code>
        </pre>

        <h4 className="font-medium mb-2">Response: 200 OK</h4>
        <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm mb-4">
          <code className="language-json mt-5">{`{
  "id": "invoice_abc123def456",
  "invoice_number": "INV-2025-00042",
  "customer_email": "client@example.com",
  "customer_name": "Acme Corp",
  "amount_usd": 3500.00,
  "token": "USDC",
  "description": "Web Development Services - Q4 2025",
  "status": "draft",
  "payment_url": null,
  "due_date": "2025-11-15T23:59:59Z",
  "created_at": "2025-10-26T12:00:00Z"
}`}</code>
        </pre>

        <Card className="p-4 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-semibold text-blue-900 dark:text-blue-100 mb-1">Invoice Created as Draft</p>
              <p className="text-blue-800 dark:text-blue-200">
                The invoice is created in <code className="text-xs bg-blue-100 dark:bg-blue-900 px-1 py-0.5 rounded">draft</code> status. 
                To send it to your customer, use the <strong>Send Invoice</strong> endpoint below!
              </p>
            </div>
          </div>
        </Card>
      </section>

      {/* Send Invoice */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Send Invoice</h2>
        <p className="text-muted-foreground mb-4">
          Send the invoice to your customer via email with a payment link. The professional email includes all invoice details and a one-click payment button.
        </p>

        <h3 className="text-xl font-semibold mb-3">Endpoint</h3>
        <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm mb-6">
          <code>POST /api/v1/invoices/:id/send</code>
        </pre>

        <h3 className="text-xl font-semibold mb-3">Authentication</h3>
        <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm mb-6">
          <code>Authorization: Bearer YOUR_API_KEY</code>
        </pre>

        <h4 className="font-medium mb-2">Example Request</h4>
        <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm mb-4">
          <code className="language-bash mt-5">{`curl -X POST https://api.zendfi.tech/api/v1/invoices/invoice_abc123def456/send \\
  -H "Authorization: Bearer zfi_live_abc123..."`}</code>
        </pre>

        <h4 className="font-medium mb-2">Response: 200 OK</h4>
        <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm mb-4">
          <code className="language-json mt-5">{`{
  "success": true,
  "invoice_id": "invoice_abc123def456",
  "invoice_number": "INV-2025-00042",
  "sent_to": "client@example.com",
  "payment_url": "https://zendfi.tech/checkout/link_xyz789",
  "status": "sent"
}`}</code>
        </pre>

        <Card className="p-4 bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
          <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">What Happens Next:</h4>
          <ul className="list-disc pl-5 space-y-1 text-sm text-green-800 dark:text-green-200">
            <li>Invoice status changes to <code className="text-xs bg-green-100 dark:bg-green-900 px-1 py-0.5 rounded">sent</code></li>
            <li>Professional email sent to <code className="text-xs bg-green-100 dark:bg-green-900 px-1 py-0.5 rounded">client@example.com</code></li>
            <li>Payment link generated and included in email</li>
            <li>Customer can click link to pay immediately with crypto!</li>
            <li>You receive webhook event <code className="text-xs bg-green-100 dark:bg-green-900 px-1 py-0.5 rounded">invoice.sent</code></li>
          </ul>
        </Card>
      </section>

      {/* Get Invoice */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Get Invoice</h2>
        <p className="text-muted-foreground mb-4">
          Retrieve details of a specific invoice including status, line items, and payment information.
        </p>

        <h3 className="text-xl font-semibold mb-3">Endpoint</h3>
        <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm mb-6">
          <code>GET /api/v1/invoices/:id</code>
        </pre>

        <h3 className="text-xl font-semibold mb-3">Authentication</h3>
        <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm mb-6">
          <code>Authorization: Bearer YOUR_API_KEY</code>
        </pre>

        <h4 className="font-medium mb-2">Example Request</h4>
        <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm mb-4">
          <code className="language-bash mt-5">{`curl -X GET https://api.zendfi.tech/api/v1/invoices/invoice_abc123def456 \\
  -H "Authorization: Bearer zfi_live_abc123..."`}</code>
        </pre>

        <h4 className="font-medium mb-2">Response: 200 OK</h4>
        <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm">
          <code className="language-json mt-5">{`{
  "id": "invoice_abc123def456",
  "invoice_number": "INV-2025-00042",
  "customer_email": "client@example.com",
  "customer_name": "Acme Corp",
  "amount_usd": 3500.00,
  "token": "USDC",
  "description": "Web Development Services - Q4 2025",
  "line_items": [
    {
      "description": "Frontend Development (React)",
      "quantity": 40,
      "unit_price": 50.00,
      "total": 2000.00
    },
    {
      "description": "Backend API Development",
      "quantity": 30,
      "unit_price": 50.00,
      "total": 1500.00
    }
  ],
  "status": "sent",
  "payment_url": "https://zendfi.tech/checkout/link_xyz789",
  "due_date": "2025-11-15T23:59:59Z",
  "created_at": "2025-10-26T12:00:00Z",
  "sent_at": "2025-10-26T12:05:00Z",
  "paid_at": null
}`}</code>
        </pre>
      </section>

      {/* List Invoices */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">List Invoices</h2>
        <p className="text-muted-foreground mb-4">
          Get all invoices for your merchant account, ordered by creation date (newest first).
        </p>

        <h3 className="text-xl font-semibold mb-3">Endpoint</h3>
        <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm mb-6">
          <code>GET /api/v1/invoices</code>
        </pre>

        <h3 className="text-xl font-semibold mb-3">Authentication</h3>
        <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm mb-6">
          <code>Authorization: Bearer YOUR_API_KEY</code>
        </pre>

        <h4 className="font-medium mb-2">Example Request</h4>
        <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm mb-4">
          <code className="language-bash mt-5">{`curl -X GET https://api.zendfi.tech/api/v1/invoices \\
  -H "Authorization: Bearer zfi_live_abc123..."`}</code>
        </pre>

        <h4 className="font-medium mb-2">Response: 200 OK</h4>
        <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm mb-4">
          <code className="language-json mt-5">{`[
  {
    "id": "invoice_abc123def456",
    "invoice_number": "INV-2025-00042",
    "customer_email": "client@example.com",
    "customer_name": "Acme Corp",
    "amount_usd": 3500.00,
    "token": "USDC",
    "description": "Web Development Services - Q4 2025",
    "status": "sent",
    "payment_url": "https://zendfi.tech/checkout/link_xyz789",
    "due_date": "2025-11-15T23:59:59Z",
    "created_at": "2025-10-26T12:00:00Z"
  },
  {
    "id": "invoice_def456ghi789",
    "invoice_number": "INV-2025-00041",
    "customer_email": "another@example.com",
    "customer_name": "Tech Startup Inc",
    "amount_usd": 1200.00,
    "token": "USDC",
    "description": "Consulting Services - October 2025",
    "status": "paid",
    "payment_url": null,
    "due_date": "2025-10-31T23:59:59Z",
    "created_at": "2025-10-20T10:00:00Z"
  }
]`}</code>
        </pre>

        <Card className="p-4 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-semibold text-blue-900 dark:text-blue-100 mb-1">Pagination Note</p>
              <p className="text-blue-800 dark:text-blue-200">
                Results are limited to 100 invoices by default. For larger datasets, use pagination with <code className="text-xs bg-blue-100 dark:bg-blue-900 px-1 py-0.5 rounded">limit</code> and <code className="text-xs bg-blue-100 dark:bg-blue-900 px-1 py-0.5 rounded">offset</code> query parameters.
              </p>
            </div>
          </div>
        </Card>
      </section>

      {/* Invoice Statuses */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Invoice Statuses</h2>
        <p className="text-muted-foreground mb-4">
          Understanding invoice statuses helps you track your billing workflow.
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
                <td className="border border-muted p-3"><code className="text-sm bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">draft</code></td>
                <td className="border border-muted p-3">Invoice created but not sent yet</td>
                <td className="border border-muted p-3">Review details, then send to customer</td>
              </tr>
              <tr>
                <td className="border border-muted p-3"><code className="text-sm bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded">sent</code></td>
                <td className="border border-muted p-3">Invoice emailed with payment link</td>
                <td className="border border-muted p-3">Wait for payment, send reminders if needed</td>
              </tr>
              <tr>
                <td className="border border-muted p-3"><code className="text-sm bg-green-100 dark:bg-green-900 px-2 py-1 rounded">paid</code></td>
                <td className="border border-muted p-3">Invoice paid successfully! 🎉</td>
                <td className="border border-muted p-3">Send receipt, deliver service/product</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Webhook Events */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Webhook Events</h2>
        <p className="text-muted-foreground mb-4">
          Stay informed about invoice lifecycle changes with these webhook events.
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          <Card className="p-4 border-l-4 border-l-blue-500">
            <h3 className="font-semibold mb-2">invoice.created</h3>
            <p className="text-sm text-muted-foreground">New invoice created in draft status</p>
          </Card>

          <Card className="p-4 border-l-4 border-l-purple-500">
            <h3 className="font-semibold mb-2">invoice.sent</h3>
            <p className="text-sm text-muted-foreground">Invoice sent to customer via email - payment link active</p>
          </Card>

          <Card className="p-4 border-l-4 border-l-green-500">
            <h3 className="font-semibold mb-2">invoice.paid</h3>
            <p className="text-sm text-muted-foreground">Customer paid the invoice! 🎉 Deliver your service/product</p>
          </Card>
        </div>

        <h3 className="text-xl font-semibold mt-6 mb-3">Example Webhook Payload</h3>
        <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm">
          <code className="language-json mt-5">{`{
  "event": "invoice.paid",
  "timestamp": "2025-11-10T15:30:05Z",
  "data": {
    "invoice": {
      "id": "invoice_abc123def456",
      "invoice_number": "INV-2025-00042",
      "customer_email": "client@example.com",
      "customer_name": "Acme Corp",
      "amount_usd": 3500.00,
      "status": "paid",
      "paid_at": "2025-11-10T15:30:00Z"
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
                Use webhooks to send payment receipts, update your accounting software, trigger service delivery, and notify your team. Check out our <a href="/docs/webhooks" className="underline font-semibold">Webhooks documentation</a> for setup details.
              </p>
            </div>
          </div>
        </Card>
      </section>

      {/* Email Template Preview */}
      <section className="mb-12">
        <Card className="p-6 bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-900 dark:to-gray-800 border-slate-200 dark:border-slate-700">
          <h2 className="text-3xl font-bold mb-4">Email Template Preview 📧</h2>
          <p className="text-muted-foreground mb-4">
            When you send an invoice, your customer receives a professional email like this:
          </p>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-slate-300 dark:border-slate-600">
            <div className="border-b border-slate-200 dark:border-slate-700 pb-4 mb-4">
              <p className="text-sm text-muted-foreground mb-1"><strong>From:</strong> ZendFi &lt;noreply@zendfi.tech&gt;</p>
              <p className="text-sm text-muted-foreground mb-1"><strong>To:</strong> client@example.com</p>
              <p className="text-sm text-muted-foreground"><strong>Subject:</strong> Invoice #INV-2025-00042 from Your Business Name</p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Invoice #INV-2025-00042</h3>
              <p className="text-muted-foreground">Hi Acme Corp,</p>
              <p className="text-muted-foreground">You have received an invoice for <strong>$3,500.00 USD</strong></p>
              
              <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded border border-slate-200 dark:border-slate-700">
                <p className="font-semibold mb-2">Web Development Services - Q4 2025</p>
                <p className="text-sm text-muted-foreground mb-2">Due Date: November 15, 2025</p>
                <p className="text-sm text-muted-foreground">Amount: $3,500.00 USDC</p>
              </div>

              <div className="flex gap-3">
                <button className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-semibold">
                  Pay Invoice →
                </button>
                <button className="border border-muted px-6 py-2 rounded-lg">
                  View Invoice
                </button>
              </div>

              <p className="text-sm text-muted-foreground pt-4 border-t border-slate-200 dark:border-slate-700">
                Powered by ZendFi - Crypto Payments Made Simple
              </p>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mt-4">
            ✨ The email is automatically customized with your business name, invoice details, and payment link!
          </p>
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
              <p className="text-sm text-muted-foreground">Configure webhooks to receive invoice payment notifications</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
            <div>
              <p className="font-semibold">Create your first invoice</p>
              <p className="text-sm text-muted-foreground">Use line items for detailed billing, set due dates, and send to clients</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
            <div>
              <p className="font-semibold">Get paid faster</p>
              <p className="text-sm text-muted-foreground">Crypto payments settle instantly - no more waiting 30-60 days!</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

