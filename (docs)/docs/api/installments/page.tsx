"use client";

import { Card } from "@/components/ui/card";
import { Calendar, Zap, Check, AlertCircle, CreditCard } from "lucide-react";

export default function InstallmentsAPIPage() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Calendar className="h-8 w-8 text-primary" />
          <h1 className="text-3xl md:text-4xl font-bold">Installment Plans API</h1>
        </div>
        <p className="text-lg text-muted-foreground">
          Break large payments into smaller, manageable installments. Perfect for high-ticket items, courses, and flexible payment options.
        </p>
      </div>      {/* Quick Start Card */}
      <Card className="p-6 mb-8 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border-purple-200 dark:border-purple-800">
        <div className="flex items-start gap-3">
          <CreditCard className="h-6 w-6 text-purple-600 dark:text-purple-400 mt-1 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-semibold mb-2 text-purple-900 dark:text-purple-100">How Installments Work</h3>
            <ol className="list-decimal pl-5 space-y-2 text-sm text-purple-800 dark:text-purple-200">
              <li>Customer purchases a $900 product</li>
              <li>Create 3-month installment plan: $300/month</li>
              <li>Customer pays first installment ($300)</li>
              <li>ZendFi automatically reminds customer for next payments</li>
              <li>Late fees applied after grace period if payment missed</li>
            </ol>
            <p className="text-sm text-purple-700 dark:text-purple-300 mt-3">
              <strong>Perfect for:</strong> High-ticket items, B2B purchases, education, electronics, furniture - anything where spreading cost helps close deals!
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
              <p className="font-semibold">Flexible Payment Schedules</p>
              <p className="text-sm text-muted-foreground">Custom frequency in days (weekly, bi-weekly, monthly)</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold">Automatic Payment Tracking</p>
              <p className="text-sm text-muted-foreground">Monitor which installments are paid/pending</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold">Late Payment Detection</p>
              <p className="text-sm text-muted-foreground">Grace periods and late fee support</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold">Default Tracking</p>
              <p className="text-sm text-muted-foreground">Automatic defaulted status for missed payments</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold">Plan Cancellation</p>
              <p className="text-sm text-muted-foreground">Cancel plans anytime via API</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold">Webhook Events</p>
              <p className="text-sm text-muted-foreground">Real-time notifications for payment events</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Use Cases */}
      <Card className="p-6 mb-8 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 border-orange-200 dark:border-orange-800">
        <h2 className="text-2xl font-bold mb-4">Common Use Cases</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-slate-900 p-4 rounded-lg border border-orange-200 dark:border-orange-700">
            <h3 className="font-semibold mb-2">💻 Electronics & Tech</h3>
            <p className="text-sm text-muted-foreground">Let customers buy laptops, phones, gaming PCs with monthly payments</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-4 rounded-lg border border-orange-200 dark:border-orange-700">
            <h3 className="font-semibold mb-2">🏢 B2B Services</h3>
            <p className="text-sm text-muted-foreground">Enterprise contracts paid quarterly or annually in installments</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-4 rounded-lg border border-orange-200 dark:border-orange-700">
            <h3 className="font-semibold mb-2">🎓 Education & Courses</h3>
            <p className="text-sm text-muted-foreground">Bootcamps, certifications, training programs with payment plans</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-4 rounded-lg border border-orange-200 dark:border-orange-700">
            <h3 className="font-semibold mb-2">🛋️ Furniture & Home</h3>
            <p className="text-sm text-muted-foreground">High-value furniture purchases split into manageable payments</p>
          </div>
        </div>
      </Card>

      {/* Create Installment Plan */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Create Installment Plan</h2>
        <p className="text-muted-foreground mb-4">
          Create a payment plan that splits a purchase into multiple scheduled payments. Perfect for increasing conversions on big-ticket items!
        </p>

        <h3 className="text-xl font-semibold mb-3">Endpoint</h3>
        <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm mb-6">
          <code>POST /api/v1/installment-plans</code>
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
                <td className="border border-muted p-3"><code className="text-sm">customer_wallet</code></td>
                <td className="border border-muted p-3"><code className="text-sm">string</code></td>
                <td className="border border-muted p-3"><span className="text-red-600 font-semibold">Yes</span></td>
                <td className="border border-muted p-3">Customer's Solana wallet address</td>
              </tr>
              <tr>
                <td className="border border-muted p-3"><code className="text-sm">customer_email</code></td>
                <td className="border border-muted p-3"><code className="text-sm">string</code></td>
                <td className="border border-muted p-3">No</td>
                <td className="border border-muted p-3">Customer's email for payment reminders</td>
              </tr>
              <tr className="bg-yellow-50 dark:bg-yellow-950/20">
                <td className="border border-muted p-3"><code className="text-sm">total_amount</code></td>
                <td className="border border-muted p-3"><code className="text-sm">number</code></td>
                <td className="border border-muted p-3"><span className="text-red-600 font-semibold">Yes</span></td>
                <td className="border border-muted p-3">Total purchase amount in USD (must be &gt; 0)</td>
              </tr>
              <tr className="bg-yellow-50 dark:bg-yellow-950/20">
                <td className="border border-muted p-3"><code className="text-sm">installment_count</code></td>
                <td className="border border-muted p-3"><code className="text-sm">number</code></td>
                <td className="border border-muted p-3"><span className="text-red-600 font-semibold">Yes</span></td>
                <td className="border border-muted p-3">Number of payments (must be &gt; 0)</td>
              </tr>
              <tr>
                <td className="border border-muted p-3"><code className="text-sm">first_payment_date</code></td>
                <td className="border border-muted p-3"><code className="text-sm">datetime</code></td>
                <td className="border border-muted p-3">No</td>
                <td className="border border-muted p-3">First payment due date (default: tomorrow)</td>
              </tr>
              <tr className="bg-yellow-50 dark:bg-yellow-950/20">
                <td className="border border-muted p-3"><code className="text-sm">payment_frequency_days</code></td>
                <td className="border border-muted p-3"><code className="text-sm">number</code></td>
                <td className="border border-muted p-3"><span className="text-red-600 font-semibold">Yes</span></td>
                <td className="border border-muted p-3">Days between payments (e.g., 30 for monthly)</td>
              </tr>
              <tr>
                <td className="border border-muted p-3"><code className="text-sm">description</code></td>
                <td className="border border-muted p-3"><code className="text-sm">string</code></td>
                <td className="border border-muted p-3">No</td>
                <td className="border border-muted p-3">Plan description</td>
              </tr>
              <tr className="bg-green-50 dark:bg-green-950/20">
                <td className="border border-muted p-3"><code className="text-sm">late_fee_amount</code></td>
                <td className="border border-muted p-3"><code className="text-sm">number</code></td>
                <td className="border border-muted p-3">No</td>
                <td className="border border-muted p-3">Late fee in USD (applied after grace period)</td>
              </tr>
              <tr className="bg-green-50 dark:bg-green-950/20">
                <td className="border border-muted p-3"><code className="text-sm">grace_period_days</code></td>
                <td className="border border-muted p-3"><code className="text-sm">number</code></td>
                <td className="border border-muted p-3">No</td>
                <td className="border border-muted p-3">Grace period after due date (default: 7 days)</td>
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

        <h3 className="text-xl font-semibold mb-3">Example: 3-Month Payment Plan for MacBook</h3>
        <h4 className="font-medium mb-2">Request:</h4>
        <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm mb-4">
          <code className="language-bash mt-5">{`curl -X POST https://api.zendfi.tech/api/v1/installment-plans \\
  -H "Authorization: Bearer zfi_live_abc123..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "customer_wallet": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
    "customer_email": "customer@example.com",
    "total_amount": 900.00,
    "installment_count": 3,
    "payment_frequency_days": 30,
    "description": "MacBook Pro - 3 Monthly Payments",
    "late_fee_amount": 25.00,
    "grace_period_days": 5,
    "metadata": {
      "product_id": "macbook_pro_16",
      "order_id": "ORD-12345"
    }
  }'`}</code>
        </pre>

        <h4 className="font-medium mb-2">Response: 200 OK</h4>
        <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm mb-4">
          <code className="language-json mt-5">{`{
  "plan_id": "install_abc123def456",
  "status": "active"
}`}</code>
        </pre>

        <Card className="p-4 bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800">
          <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">What Happens:</h4>
          <ul className="list-disc pl-5 space-y-1 text-sm text-purple-800 dark:text-purple-200">
            <li>Customer pays <strong>$300</strong> now (1st installment)</li>
            <li>Customer pays <strong>$300</strong> in 30 days (2nd installment)</li>
            <li>Customer pays <strong>$300</strong> in 60 days (3rd installment)</li>
            <li><strong>5-day grace period</strong> after each due date</li>
            <li><strong>$25 late fee</strong> applied if payment is late</li>
            <li>Automatic email reminders sent to customer</li>
          </ul>
        </Card>
      </section>

      {/* Get Installment Plan */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Get Installment Plan</h2>
        <p className="text-muted-foreground mb-4">
          Retrieve details of a specific installment plan including the complete payment schedule and status.
        </p>

        <h3 className="text-xl font-semibold mb-3">Endpoint</h3>
        <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm mb-6">
          <code>GET /api/v1/installment-plans/:plan_id</code>
        </pre>

        <h3 className="text-xl font-semibold mb-3">Authentication</h3>
        <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm mb-6">
          <code>Authorization: Bearer YOUR_API_KEY</code>
        </pre>

        <h4 className="font-medium mb-2">Example Request</h4>
        <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm mb-4">
          <code className="language-bash mt-5">{`curl -X GET https://api.zendfi.tech/api/v1/installment-plans/install_abc123def456 \\
  -H "Authorization: Bearer zfi_live_abc123..."`}</code>
        </pre>

        <h4 className="font-medium mb-2">Response: 200 OK</h4>
        <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm">
          <code className="language-json mt-5">{`{
  "id": "install_abc123def456",
  "merchant_id": "merchant_xyz789",
  "customer_wallet": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
  "customer_email": "customer@example.com",
  "total_amount": "900.00",
  "installment_count": 3,
  "amount_per_installment": "300.00",
  "payment_schedule": [
    {
      "installment_number": 1,
      "due_date": "2025-10-27T12:00:00Z",
      "amount": "300.00",
      "status": "paid",
      "payment_id": "payment_1_abc",
      "paid_at": "2025-10-27T10:30:00Z"
    },
    {
      "installment_number": 2,
      "due_date": "2025-11-26T12:00:00Z",
      "amount": "300.00",
      "status": "pending",
      "payment_id": null,
      "paid_at": null
    },
    {
      "installment_number": 3,
      "due_date": "2025-12-26T12:00:00Z",
      "amount": "300.00",
      "status": "pending",
      "payment_id": null,
      "paid_at": null
    }
  ],
  "paid_count": 1,
  "status": "active",
  "description": "MacBook Pro - 3 Monthly Payments",
  "late_fee_amount": "25.00",
  "grace_period_days": 5,
  "metadata": {
    "product_id": "macbook_pro_16",
    "order_id": "ORD-12345"
  },
  "created_at": "2025-10-26T12:00:00Z",
  "updated_at": "2025-10-27T10:30:00Z",
  "completed_at": null,
  "defaulted_at": null
}`}</code>
        </pre>
      </section>

      {/* List Merchant's Plans */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">List Merchant's Installment Plans</h2>
        <p className="text-muted-foreground mb-4">
          Get all installment plans for your merchant account with pagination support.
        </p>

        <h3 className="text-xl font-semibold mb-3">Endpoint</h3>
        <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm mb-6">
          <code>GET /api/v1/installment-plans</code>
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
          <code className="language-bash mt-5">{`curl -X GET "https://api.zendfi.tech/api/v1/installment-plans?limit=20&offset=0" \\
  -H "Authorization: Bearer zfi_live_abc123..."`}</code>
        </pre>
      </section>

      {/* List Customer's Plans */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">List Customer's Installment Plans</h2>
        <p className="text-muted-foreground mb-4">
          Get all installment plans for a specific customer. This is a <strong>public endpoint</strong> - perfect for customer portals!
        </p>

        <h3 className="text-xl font-semibold mb-3">Endpoint</h3>
        <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm mb-6">
          <code>GET /api/v1/customers/:customer_wallet/installment-plans</code>
        </pre>

        <h4 className="font-medium mb-2">Example Request</h4>
        <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm">
          <code className="language-bash mt-5">{`curl -X GET https://api.zendfi.tech/api/v1/customers/7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU/installment-plans`}</code>
        </pre>
      </section>

      {/* Cancel Plan */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Cancel Installment Plan</h2>
        <p className="text-muted-foreground mb-4">
          Cancel an active installment plan. Use this when refunding an order or if the customer requests cancellation.
        </p>

        <h3 className="text-xl font-semibold mb-3">Endpoint</h3>
        <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm mb-6">
          <code>POST /api/v1/installment-plans/:plan_id/cancel</code>
        </pre>

        <h3 className="text-xl font-semibold mb-3">Authentication</h3>
        <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm mb-6">
          <code>Authorization: Bearer YOUR_API_KEY</code>
        </pre>

        <h4 className="font-medium mb-2">Example Request</h4>
        <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm mb-4">
          <code className="language-bash mt-5">{`curl -X POST https://api.zendfi.tech/api/v1/installment-plans/install_abc123def456/cancel \\
  -H "Authorization: Bearer zfi_live_abc123..."`}</code>
        </pre>

        <h4 className="font-medium mb-2">Response: 200 OK</h4>
        <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm">
          <code className="language-json mt-5">{`{
  "message": "Installment plan cancelled successfully",
  "plan_id": "install_abc123def456"
}`}</code>
        </pre>
      </section>

      {/* Installment Statuses */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Installment Plan Statuses</h2>
        <p className="text-muted-foreground mb-4">
          Understanding plan statuses helps you manage customer payment plans effectively.
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
                <td className="border border-muted p-3"><code className="text-sm bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded">active</code></td>
                <td className="border border-muted p-3">Plan is active, customer making payments</td>
                <td className="border border-muted p-3">Monitor payment schedule, send reminders</td>
              </tr>
              <tr>
                <td className="border border-muted p-3"><code className="text-sm bg-green-100 dark:bg-green-900 px-2 py-1 rounded">completed</code></td>
                <td className="border border-muted p-3">All installments paid successfully! 🎉</td>
                <td className="border border-muted p-3">Mark order as fully paid, celebrate!</td>
              </tr>
              <tr>
                <td className="border border-muted p-3"><code className="text-sm bg-red-100 dark:bg-red-900 px-2 py-1 rounded">defaulted</code></td>
                <td className="border border-muted p-3">Customer missed payment beyond grace period</td>
                <td className="border border-muted p-3">Contact customer, consider collections</td>
              </tr>
              <tr>
                <td className="border border-muted p-3"><code className="text-sm bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">cancelled</code></td>
                <td className="border border-muted p-3">Plan cancelled by merchant</td>
                <td className="border border-muted p-3">Process refund if needed</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Automatic Monitoring */}
      <section className="mb-12">
        <Card className="p-6 bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-950/20 dark:to-yellow-950/20 border-orange-200 dark:border-orange-800">
          <h2 className="text-3xl font-bold mb-4">Automatic Payment Monitoring 🤖</h2>
          <p className="text-muted-foreground mb-4">
            ZendFi automatically monitors all installment plans! Our background worker runs every hour to:
          </p>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-lg border border-orange-200 dark:border-orange-700">
            <ol className="list-decimal pl-5 space-y-2 text-muted-foreground">
              <li>Check for overdue installments</li>
              <li>Send late payment reminders to customers</li>
              <li>Apply late fees after grace period expires</li>
              <li>Mark plans as <code className="text-xs bg-red-100 dark:bg-red-900 px-1 py-0.5 rounded">defaulted</code> if payment missed too long</li>
              <li>Send email notifications to customers and merchants</li>
              <li>Trigger webhooks for all payment events</li>
            </ol>
          </div>

          <Card className="p-4 mt-4 bg-white dark:bg-slate-900 border-orange-300 dark:border-orange-700">
            <p className="font-semibold text-orange-900 dark:text-orange-100">
              💰 You don't need to chase payments - we handle reminders, late fees, and notifications automatically!
            </p>
          </Card>
        </Card>
      </section>

      {/* Webhook Events */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Webhook Events</h2>
        <p className="text-muted-foreground mb-4">
          Stay informed about installment payment events with these webhook notifications.
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          <Card className="p-4 border-l-4 border-l-green-500">
            <h3 className="font-semibold mb-2">installment.paid</h3>
            <p className="text-sm text-muted-foreground">Customer paid an installment - mark as received!</p>
          </Card>

          <Card className="p-4 border-l-4 border-l-yellow-500">
            <h3 className="font-semibold mb-2">installment.late</h3>
            <p className="text-sm text-muted-foreground">Payment is late but within grace period - send reminder</p>
          </Card>

          <Card className="p-4 border-l-4 border-l-red-500">
            <h3 className="font-semibold mb-2">installment.defaulted</h3>
            <p className="text-sm text-muted-foreground">Grace period expired, payment still missing - take action</p>
          </Card>

          <Card className="p-4 border-l-4 border-l-purple-500">
            <h3 className="font-semibold mb-2">installment.plan_completed</h3>
            <p className="text-sm text-muted-foreground">All installments paid! 🎉 Customer journey complete</p>
          </Card>
        </div>

        <h3 className="text-xl font-semibold mt-6 mb-3">Example Webhook Payload</h3>
        <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm">
          <code className="language-json mt-5">{`{
  "event": "installment.paid",
  "timestamp": "2025-10-27T10:30:05Z",
  "data": {
    "plan": {
      "id": "install_abc123def456",
      "customer_wallet": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
      "total_amount": "900.00",
      "installment_count": 3,
      "paid_count": 1,
      "status": "active"
    },
    "installment": {
      "number": 1,
      "amount": "300.00",
      "due_date": "2025-10-27T12:00:00Z",
      "paid_at": "2025-10-27T10:30:00Z"
    },
    "payment_id": "payment_1_abc"
  }
}`}</code>
        </pre>

        <Card className="p-4 mt-4 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
          <div className="flex items-start gap-3">
            <Zap className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-semibold text-blue-900 dark:text-blue-100 mb-1">Pro Tip</p>
              <p className="text-blue-800 dark:text-blue-200">
                Use webhooks to send payment receipts, update inventory, trigger fulfillment for the first payment, and send congratulations emails when plans complete. Check out our <a href="/docs/webhooks" className="underline font-semibold">Webhooks documentation</a> for setup details.
              </p>
            </div>
          </div>
        </Card>
      </section>

      {/* Late Fee Logic */}
      <section className="mb-12">
        <Card className="p-6 bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-950/20 dark:to-amber-950/20 border-yellow-200 dark:border-yellow-800">
          <h2 className="text-3xl font-bold mb-4">Late Fee Logic 📅</h2>
          
          <div className="bg-white dark:bg-slate-900 p-5 rounded-lg border border-yellow-200 dark:border-yellow-700 mb-4">
            <h3 className="text-lg font-semibold mb-3">How Late Fees Work:</h3>
            <ol className="list-decimal pl-5 space-y-2 text-muted-foreground">
              <li><strong>Due Date Arrives:</strong> Installment #2 due on Nov 26</li>
              <li><strong>Grace Period:</strong> 5 days to pay without penalty (until Dec 1)</li>
              <li><strong>Payment Made:</strong>
                <ul className="list-disc pl-5 mt-1">
                  <li>✅ <strong>Within grace period:</strong> No late fee, status stays <code className="text-xs bg-blue-100 dark:bg-blue-900 px-1 py-0.5 rounded">active</code></li>
                  <li>⚠️ <strong>After grace period:</strong> $25 late fee added, status becomes <code className="text-xs bg-yellow-100 dark:bg-yellow-900 px-1 py-0.5 rounded">late</code></li>
                </ul>
              </li>
              <li><strong>Still Not Paid:</strong> After 30 days total, plan marked <code className="text-xs bg-red-100 dark:bg-red-900 px-1 py-0.5 rounded">defaulted</code></li>
            </ol>
          </div>

          <Card className="p-4 bg-white dark:bg-slate-900 border-yellow-300 dark:border-yellow-700">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-semibold text-yellow-900 dark:text-yellow-100 mb-1">Best Practice</p>
                <p className="text-yellow-800 dark:text-yellow-200">
                  Set a reasonable grace period (5-7 days) and moderate late fee ($15-25) to encourage on-time payments without being too harsh. Customers appreciate the flexibility!
                </p>
              </div>
            </div>
          </Card>
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
              <p className="text-sm text-muted-foreground">Configure webhooks to receive installment payment events</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
            <div>
              <p className="font-semibold">Create your first installment plan</p>
              <p className="text-sm text-muted-foreground">Choose payment frequency and late fee policy for your business</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
            <div>
              <p className="font-semibold">Let automation handle the rest</p>
              <p className="text-sm text-muted-foreground">ZendFi monitors payments, sends reminders, and manages late fees automatically!</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

