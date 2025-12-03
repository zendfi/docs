import React, { useState, useRef, useEffect } from 'react';
import styles from './styles.module.css';

// Types
interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// Copy Button Component
const CopyButton = ({ code }: { code: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button onClick={handleCopy} className={styles.copyButton}>
      {copied ? '✓ Copied' : '📋 Copy'}
    </button>
  );
};

// Simple markdown renderer for chat messages
const SimpleMarkdown = ({ content }: { content: string }) => {
  // Process code blocks
  const processContent = (text: string) => {
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    
    // Match code blocks ```...```
    const codeBlockRegex = /```(\w*)\n?([\s\S]*?)```/g;
    let match;
    
    while ((match = codeBlockRegex.exec(text)) !== null) {
      // Add text before the code block
      if (match.index > lastIndex) {
        parts.push(
          <span key={`text-${lastIndex}`} dangerouslySetInnerHTML={{ 
            __html: formatInlineText(text.slice(lastIndex, match.index)) 
          }} />
        );
      }
      
      // Add the code block
      const code = match[2].trim();
      parts.push(
        <div key={`code-${match.index}`} className={styles.codeBlock}>
          <pre>
            <code>{code}</code>
          </pre>
          <CopyButton code={code} />
        </div>
      );
      
      lastIndex = match.index + match[0].length;
    }
    
    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(
        <span key={`text-${lastIndex}`} dangerouslySetInnerHTML={{ 
          __html: formatInlineText(text.slice(lastIndex)) 
        }} />
      );
    }
    
    return parts.length > 0 ? parts : <span dangerouslySetInnerHTML={{ __html: formatInlineText(text) }} />;
  };
  
  // Format inline elements
  const formatInlineText = (text: string): string => {
    return text
      // Escape HTML
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      // Bold
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      // Inline code
      .replace(/`([^`]+)`/g, '<code class="' + styles.inlineCode + '">$1</code>')
      // Links
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
      // Line breaks
      .replace(/\n/g, '<br />');
  };
  
  return <div className={styles.markdownContent}>{processContent(content)}</div>;
};

// Main Chat Component
export default function DocsChat({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Default API key (can be overridden by user)
  const DEFAULT_API_KEY = 'AIzaSyCHEBWkdDaOMmOVItlC4PEg2yuJQnwJQFw';

  // Load messages and API key from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('zendfi-chat-history');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const messagesWithDates = parsed.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        }));
        setMessages(messagesWithDates);
      } catch (e) {
        console.error('Failed to parse chat history:', e);
      }
    }

    // Use saved key or default
    const savedKey = localStorage.getItem('zendfi-gemini-key');
    setApiKey(savedKey || DEFAULT_API_KEY);
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('zendfi-chat-history', JSON.stringify(messages));
    }
  }, [messages]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Clear chat history
  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem('zendfi-chat-history');
  };

  // Save API key
  const saveApiKey = () => {
    localStorage.setItem('zendfi-gemini-key', apiKey);
    setShowApiKeyInput(false);
  };

  // ZendFi Documentation Context
  const getDocsContext = (): string => {
    return `
# ZendFi - Comprehensive Documentation

## What is ZendFi?
ZendFi is a modern crypto payment infrastructure built on Solana, enabling businesses to accept stablecoin and crypto payments with the same ease as traditional payment processors like Stripe. We handle the complexity of blockchain transactions so you can focus on your business.

## Why Solana?
- **Speed**: ~400ms transaction finality (vs 10+ minutes for Bitcoin/Ethereum)
- **Cost**: <$0.001 per transaction (vs $5-50 on Ethereum)
- **Throughput**: 65,000+ TPS capacity
- **Ecosystem**: Largest stablecoin liquidity, growing DeFi infrastructure

## Supported Tokens
| Token | Network | Use Case |
|-------|---------|----------|
| USDC | Solana | Primary stablecoin, 1:1 USD peg, Circle-backed |
| USDT | Solana | Alternative stablecoin, Tether-backed |
| SOL | Solana | Native token, price converted at payment time |

## API Base URL
- **Production**: https://api.zendfi.tech
- **All endpoints use**: /api/v1/...

## Authentication
All API requests require authentication via Bearer token:
\`\`\`
Authorization: Bearer YOUR_API_KEY
\`\`\`

**API Key Types:**
- \`zfi_live_...\` - Mainnet (real money, real transactions)
- \`zfi_test_...\` - Devnet (testing, no real funds)

The API automatically routes to the correct Solana network based on your key prefix.

---

## PAYMENTS API

### Create Payment
\`POST /api/v1/payments\`

Creates a one-time payment that customers can pay via QR code or payment link.

**Request:**
\`\`\`json
{
  "amount": 49.99,
  "currency": "USD",
  "token": "USDC",
  "description": "Pro Plan - Monthly",
  "customer_email": "customer@example.com",
  "metadata": { "order_id": "12345" },
  "redirect_url": "https://yoursite.com/success",
  "idempotency_key": "unique_key_123"
}
\`\`\`

**Response:**
\`\`\`json
{
  "payment_id": "pay_abc123",
  "amount_usd": 49.99,
  "amount_token": 49.99,
  "token": "USDC",
  "status": "pending",
  "payment_url": "https://zendfi.tech/pay/pay_abc123",
  "qr_code": "solana:...",
  "wallet_address": "7xKXtg...",
  "expires_at": "2025-10-26T12:15:00Z"
}
\`\`\`

**Payment Statuses:** pending → confirming → confirmed | failed | expired

### Get Payment
\`GET /api/v1/payments/:payment_id\`

### Payment Splits (Revenue Sharing)
Add \`splits\` array to distribute payments:
\`\`\`json
{
  "amount": 100,
  "currency": "USD",
  "splits": [
    { "recipient_wallet": "Seller123...", "percentage": 80 },
    { "recipient_wallet": "Platform456...", "percentage": 20 }
  ]
}
\`\`\`
Percentages must total exactly 100%.

---

## SUBSCRIPTIONS API

### Create Plan
\`POST /api/v1/subscription-plans\`

\`\`\`json
{
  "name": "Pro Monthly",
  "amount": 29.99,
  "currency": "USD",
  "billing_interval": "monthly",
  "trial_days": 14,
  "max_cycles": null
}
\`\`\`

**Billing Intervals:** daily, weekly, monthly, yearly

### Subscribe Customer
\`POST /api/v1/subscriptions\`

\`\`\`json
{
  "plan_id": "plan_abc123",
  "customer_wallet": "7xKXtg...",
  "customer_email": "customer@example.com"
}
\`\`\`

### Cancel Subscription
\`POST /api/v1/subscriptions/:id/cancel\`

\`\`\`json
{ "cancel_at_period_end": true }
\`\`\`

**Subscription Statuses:** trialing → active | past_due | cancelled | expired

---

## ESCROW API

For milestone-based payments (freelance, contracts, services).

### Create Escrow
\`POST /api/v1/escrows\`

\`\`\`json
{
  "title": "Website Redesign",
  "total_amount": 5000,
  "currency": "USD",
  "payer_email": "client@example.com",
  "payee_wallet": "Freelancer123...",
  "milestones": [
    { "title": "Design Mockups", "amount": 1500 },
    { "title": "Development", "amount": 2500 },
    { "title": "Launch", "amount": 1000 }
  ]
}
\`\`\`

### Fund Escrow
\`POST /api/v1/escrows/:id/fund\`

### Release Milestone
\`POST /api/v1/escrows/:id/milestones/:mid/release\`

### Open Dispute
\`POST /api/v1/escrows/:id/dispute\`

---

## INSTALLMENTS API

Split large payments over time (buy-now-pay-later).

### Create Installment Plan
\`POST /api/v1/installments\`

\`\`\`json
{
  "total_amount": 1200,
  "currency": "USD",
  "num_installments": 4,
  "installment_interval": "monthly",
  "down_payment_amount": 300,
  "customer_email": "customer@example.com"
}
\`\`\`

---

## INVOICES API

Professional invoicing with line items.

### Create Invoice
\`POST /api/v1/invoices\`

\`\`\`json
{
  "customer_name": "Acme Corp",
  "customer_email": "billing@acme.com",
  "line_items": [
    { "description": "Consulting - October", "quantity": 40, "unit_price": 150 }
  ],
  "currency": "USD",
  "due_date": "2025-11-15T23:59:59Z",
  "tax_rate": 8.5
}
\`\`\`

### Send Invoice
\`POST /api/v1/invoices/:id/send\`

### Record Payment
\`POST /api/v1/invoices/:id/payments\`

---

## PAYMENT LINKS API

Reusable, shareable payment URLs.

### Create Payment Link
\`POST /api/v1/payment-links\`

\`\`\`json
{
  "name": "Donation",
  "amount": 10,
  "currency": "USD",
  "allow_custom_amount": true,
  "suggested_amounts": [5, 10, 25, 50],
  "max_uses": 100,
  "expires_at": "2025-12-31T23:59:59Z"
}
\`\`\`

---

## WEBHOOKS

Real-time event notifications to your server.

### Register Webhook
\`POST /api/v1/webhooks\`

\`\`\`json
{
  "url": "https://yoursite.com/webhooks/zendfi",
  "events": ["payment.completed", "subscription.renewed"]
}
\`\`\`

### Webhook Events
| Event | Description |
|-------|-------------|
| payment.created | Payment initiated |
| payment.completed | Payment successful |
| payment.failed | Payment failed |
| subscription.created | New subscription |
| subscription.renewed | Billing cycle completed |
| subscription.cancelled | Subscription cancelled |
| escrow.funded | Escrow fully funded |
| escrow.milestone_released | Milestone released |
| invoice.paid | Invoice fully paid |

### Signature Verification
Verify webhooks using \`X-ZendFi-Signature\` header:
\`\`\`typescript
import crypto from 'crypto';

function verifyWebhook(payload: string, signature: string, secret: string): boolean {
  const expected = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
}
\`\`\`

---

## WALLET SETUP

### Option 1: MPC Passkey Wallet (Recommended)
- No seed phrase to manage
- Secured by device biometrics (Face ID, fingerprint, etc.)
- Multi-party computation ensures no single point of failure
- Best for non-crypto-native users

### Option 2: Own Wallet
- Connect existing Solana wallet (Phantom, Solflare, Backpack, etc.)
- Full custody of your funds
- Best for crypto-native users

---

## SDKs & TOOLS

### TypeScript SDK
\`\`\`bash
npm install @zendfi/sdk
\`\`\`

\`\`\`typescript
import { ZendFi } from '@zendfi/sdk';

const zendfi = new ZendFi({ apiKey: 'zfi_live_...' });

const payment = await zendfi.payments.create({
  amount: 49.99,
  currency: 'USD',
  token: 'USDC'
});
\`\`\`

### React SDK
\`\`\`bash
npm install @zendfi/react
\`\`\`

\`\`\`tsx
import { ZendFiProvider, PayButton } from '@zendfi/react';

<ZendFiProvider apiKey="zfi_live_...">
  <PayButton amount={49.99} onSuccess={(payment) => console.log(payment)} />
</ZendFiProvider>
\`\`\`

### Python SDK
\`\`\`bash
pip install zendfi
\`\`\`

\`\`\`python
from zendfi import ZendFi

client = ZendFi(api_key="zfi_live_...")
payment = client.payments.create(amount=49.99, currency="USD")
\`\`\`

### CLI
\`\`\`bash
npm install -g @zendfi/cli
zendfi login
zendfi payments create --amount 49.99 --currency USD
\`\`\`

---

## COMMON INTEGRATION PATTERNS

### E-commerce Checkout
1. Create payment when customer checks out
2. Redirect to payment_url or show QR code
3. Listen for payment.completed webhook
4. Fulfill order

### SaaS Subscriptions
1. Create subscription plan for each tier
2. Subscribe customer on signup
3. Listen for subscription.renewed webhook
4. Grant/maintain access

### Marketplace Splits
1. Create payment with splits array
2. Platform fee goes to your wallet
3. Seller receives their share automatically

### Freelance Escrow
1. Create escrow with milestones
2. Client funds escrow
3. Release milestones as work completes
4. Dispute mechanism if issues arise
`;
  };

  // Handle chat submission
  const handleSubmit = async (customInput?: string) => {
    const questionText = customInput || input;
    if (!questionText.trim() || isLoading) return;

    if (!apiKey) {
      setShowApiKeyInput(true);
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: questionText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Build conversation history for context
      const conversationHistory = messages.slice(-6).map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      }));

      const systemPrompt = `You are **ZendFi Assistant**, an expert AI helper for ZendFi's crypto payment platform. You're knowledgeable, friendly, and genuinely helpful.

## Your Personality
- Be conversational and approachable, not robotic
- Show enthusiasm for helping developers succeed
- Use code examples liberally - developers love seeing actual code
- Anticipate follow-up questions and address them proactively
- If something is complex, break it down step-by-step

## Your Knowledge Base
You have deep knowledge of ZendFi's platform from the documentation below. Use this as your primary source of truth, but you can also:
- **Reason and infer**: Connect concepts logically even if not explicitly stated
- **Suggest best practices**: Recommend architectural patterns and approaches
- **Compare options**: Help users choose between features (e.g., Payment Links vs Payments API)
- **Troubleshoot**: Help debug common issues based on error patterns
- **Adapt examples**: Modify code examples for the user's specific use case

## Guidelines
1. **Be accurate**: Don't make up endpoints, field names, or features that don't exist
2. **Be practical**: Give actionable advice with real code examples
3. **Be concise**: Get to the point, but don't sacrifice clarity
4. **Use markdown**: Format responses with headers, code blocks, and lists
5. **Show the endpoint**: Always include the HTTP method and path for API questions
6. **Include full examples**: Show complete request/response JSON when relevant

## What You Can Help With
- API integration (all endpoints, request/response formats)
- SDK usage (TypeScript, Python, React)
- Webhook implementation and signature verification
- Choosing the right payment method for a use case
- Architectural decisions (when to use escrow vs payments, etc.)
- Debugging integration issues
- Best practices for production deployments

## What You Should Avoid
- Making up features or endpoints that aren't in the docs
- Giving advice about non-ZendFi topics (redirect to the docs or support)
- Overly long responses - be helpful but concise
- Being overly formal - be friendly and conversational

## ZendFi Documentation
${getDocsContext()}

---

Now, help this developer with their question. Be specific, provide code when helpful, and anticipate what they might need next.`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [{ text: systemPrompt }]
              },
              ...conversationHistory,
              {
                role: 'user',
                parts: [{ text: questionText }]
              }
            ],
            generationConfig: {
              temperature: 0.7,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 2048,
            },
            safetySettings: [
              { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
              { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
              { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
              { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
            ],
          }),
        }
      );

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.message);
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated.',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error: any) {
      console.error('API error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Error: ${error.message || 'Failed to get response. Check your API key.'}`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Enter key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  // Suggested questions
  const suggestedQuestions = [
    'How do I accept USDC payments?',
    'What\'s the best way to set up recurring billing?',
    'How do I split payments between sellers?',
    'Help me set up webhooks',
    'Compare escrow vs regular payments',
  ];

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.chatContainer} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerTitle}>
            <span className={styles.botIcon}>🤖</span>
            <span>ZendFi Docs Assistant</span>
          </div>
          <div className={styles.headerActions}>
            <button
              onClick={() => setShowApiKeyInput(!showApiKeyInput)}
              className={styles.settingsButton}
              title="API Key Settings"
            >
              ⚙️
            </button>
            <button onClick={onClose} className={styles.closeButton}>
              ✕
            </button>
          </div>
        </div>

        {/* API Key Input - Hidden by default since we have a built-in key */}
        {showApiKeyInput && (
          <div className={styles.apiKeySection}>
            <p className={styles.apiKeyLabel}>Custom Gemini API Key (optional):</p>
            <div className={styles.apiKeyInputRow}>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="AIza..."
                className={styles.apiKeyInput}
              />
              <button onClick={saveApiKey} className={styles.saveButton}>
                Save
              </button>
              <button 
                onClick={() => {
                  setApiKey(DEFAULT_API_KEY);
                  localStorage.removeItem('zendfi-gemini-key');
                  setShowApiKeyInput(false);
                }} 
                className={styles.saveButton}
                style={{ background: '#64748b' }}
              >
                Reset
              </button>
            </div>
            <p className={styles.apiKeyHint}>
              Using built-in API key. Add your own from{' '}
              <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer">
                Google AI Studio
              </a>{' '}
              for higher limits.
            </p>
          </div>
        )}

        {/* Messages */}
        <div className={styles.messagesContainer}>
          {messages.length === 0 ? (
            <div className={styles.emptyState}>
              <span className={styles.emptyIcon}>💬</span>
              <p>Ask me anything about ZendFi!</p>
              <div className={styles.suggestions}>
                <p className={styles.suggestionsLabel}>Try asking:</p>
                {suggestedQuestions.map((q, i) => (
                  <button key={i} onClick={() => handleSubmit(q)} className={styles.suggestionButton}>
                    💡 {q}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`${styles.message} ${message.role === 'user' ? styles.userMessage : styles.assistantMessage}`}
              >
                <SimpleMarkdown content={message.content} />
                <span className={styles.timestamp}>{message.timestamp.toLocaleTimeString()}</span>
              </div>
            ))
          )}
          {isLoading && (
            <div className={`${styles.message} ${styles.assistantMessage}`}>
              <div className={styles.loadingDots}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className={styles.inputContainer}>
          {messages.length > 0 && (
            <button onClick={clearChat} className={styles.clearButton}>
              🗑️ Clear chat
            </button>
          )}
          <div className={styles.inputRow}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about payments, webhooks, subscriptions..."
              className={styles.input}
              disabled={isLoading}
            />
            <button onClick={() => handleSubmit()} disabled={!input.trim() || isLoading} className={styles.sendButton}>
              ➤
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
