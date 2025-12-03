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

    const savedKey = localStorage.getItem('zendfi-gemini-key');
    if (savedKey) {
      setApiKey(savedKey);
    }
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
ZendFi Documentation Context:

ZendFi is a crypto payment API built on Solana blockchain for merchants to accept USDC, SOL, and USDT payments.

CORE FEATURES:
1. PAYMENTS API - Create one-time payments
   - POST /api/v1/payments - Create payment
   - GET /api/v1/payments/:id - Get payment details
   - POST /api/v1/payments/:id/build-transaction - Build Solana transaction
   - Supports: amount, currency (USD), description, customer_email, metadata, splits, idempotency_key

2. SUBSCRIPTIONS - Recurring billing
   - POST /api/v1/subscription-plans - Create plan
   - POST /api/v1/subscriptions - Subscribe customer
   - Billing intervals: daily, weekly, monthly, yearly
   - Supports trial_days, max_cycles

3. ESCROW - Milestone-based payments
   - POST /api/v1/escrows - Create escrow with milestones
   - POST /api/v1/escrows/:id/fund - Fund escrow
   - POST /api/v1/escrows/:id/milestones/:mid/release - Release milestone
   - POST /api/v1/escrows/:id/dispute - Open dispute

4. INSTALLMENTS - Split payments over time
   - POST /api/v1/installments - Create installment plan
   - Supports: num_installments, installment_interval, down_payment_amount

5. INVOICES - Professional invoicing
   - POST /api/v1/invoices - Create invoice with line items
   - POST /api/v1/invoices/:id/send - Send invoice
   - Supports: customer_name, customer_email, line_items, due_date, tax_rate

6. PAYMENT LINKS - Shareable payment URLs
   - POST /api/v1/payment-links - Create reusable link
   - Supports: allow_custom_amount, suggested_amounts, max_uses, expires_at

7. WEBHOOKS - Real-time notifications
   - POST /api/v1/webhooks - Register webhook URL
   - Events: payment.completed, payment.failed, subscription.renewed, escrow.funded, etc.
   - Verify with X-ZendFi-Signature header using HMAC-SHA256

8. PAYMENT SPLITS - Revenue distribution
   - Add splits array to payments: [{wallet, percentage, name}]
   - Percentages must total <= 100%

WALLET TYPES:
- MPC Passkey Wallet: Multi-party computation, no seed phrase, WebAuthn biometrics
- Own Wallet: Connect existing Solana wallet (Phantom, Solflare, etc.)

AUTHENTICATION:
- API Key in Authorization header: "Bearer zfi_live_xxx" or "Bearer zfi_test_xxx"

SDK & TOOLS:
- TypeScript SDK: npm install @zendfi/sdk
- Python SDK: pip install zendfi
- React SDK: npm install @zendfi/react
- CLI: npm install -g @zendfi/cli

BASE URL: https://api.zendfi.tech
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
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `You are ZendFi's expert documentation assistant. Answer ONLY using the provided documentation context.

RULES:
1. Answer using ONLY the ZendFi documentation below
2. If info isn't in docs, say: "I don't have that info. Try asking about payments, webhooks, subscriptions, escrows, or wallet setup."
3. Provide CODE EXAMPLES when relevant (use markdown code blocks)
4. Include API endpoints with methods
5. Keep responses concise (under 200 words)
6. Be specific with field names and response structures

DOCUMENTATION:
${getDocsContext()}

USER QUESTION: ${questionText}

Respond with a direct answer, code example if applicable, and relevant endpoints.`,
                  },
                ],
              },
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
    'How do I create a payment?',
    'How do webhooks work?',
    'What wallet types are supported?',
    'How do I set up subscriptions?',
    'How do escrow payments work?',
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

        {/* API Key Input */}
        {showApiKeyInput && (
          <div className={styles.apiKeySection}>
            <p className={styles.apiKeyLabel}>Enter your Gemini API Key:</p>
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
            </div>
            <p className={styles.apiKeyHint}>
              Get a free key at{' '}
              <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer">
                Google AI Studio
              </a>
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
