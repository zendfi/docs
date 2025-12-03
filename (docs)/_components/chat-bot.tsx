"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Markdown from "markdown-to-jsx"
import { Input } from "@/components/ui/input"
import { Send, Bot, Loader2, Copy, Check, Trash2 } from "lucide-react"
import { GoogleGenerativeAI } from "@google/generative-ai" // npm install @google/generative-ai
import { docData } from "@/lib/doc-json"

// Types
interface Message {
    id: string
    role: "user" | "assistant"
    content: string
    timestamp: Date
}

interface DocsChatProps {
    docsData: any[]
}

// Gemini API Key - Replace with your actual key or use env var
const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY

// Initialize Gemini (only if key is provided)
const genAI = GEMINI_API_KEY ? new GoogleGenerativeAI(GEMINI_API_KEY) : null
const model = genAI ? genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" }) : null

// Copy Button Component
const CopyButton = ({ code }: { code: string }) => {
    const [copied, setCopied] = useState(false)
    
    const handleCopy = () => {
        navigator.clipboard.writeText(code)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <button
            onClick={handleCopy}
            className="absolute top-2 right-2 bg-slate-700 hover:bg-slate-600 px-2 py-1 rounded text-xs flex items-center gap-1 transition-colors"
        >
            {copied ? (
                <>
                    <Check className="w-3 h-3" />
                    Copied
                </>
            ) : (
                <>
                    <Copy className="w-3 h-3" />
                    Copy
                </>
            )}
        </button>
    )
}

export function DocsChat({ docsData }: DocsChatProps) {
    const [messages, setMessages] = useState<Message[]>([])
    const [input, setInput] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    // Load messages from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem('zendfi-chat-history')
        if (saved) {
            try {
                const parsed = JSON.parse(saved)
                // Convert timestamp strings back to Date objects
                const messagesWithDates = parsed.map((msg: any) => ({
                    ...msg,
                    timestamp: new Date(msg.timestamp)
                }))
                setMessages(messagesWithDates)
            } catch (e) {
                console.error('Failed to parse chat history:', e)
            }
        }
    }, [])

    // Save messages to localStorage whenever they change
    useEffect(() => {
        if (messages.length > 0) {
            localStorage.setItem('zendfi-chat-history', JSON.stringify(messages))
        }
    }, [messages])

    // Scroll to bottom
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    // Clear chat history
    const clearChat = () => {
        setMessages([])
        localStorage.removeItem('zendfi-chat-history')
    }

    // Handle suggested question click
    const handleSuggestedQuestion = (question: string) => {
        setInput(question)
        // Auto-submit after a brief delay for better UX
        setTimeout(() => {
            handleSubmit(question)
        }, 100)
    }

    // Extract full docs text for context (no Fuse)
    const getFullDocsContext = (): string => {
        let fullText = "ZendFi Documentation Full Context:\n\n"
        const extractText = (obj: any): string => {
            let text = ""
            if (typeof obj === "string") return obj + "\n"
            if (Array.isArray(obj)) return obj.map(extractText).join("\n")
            if (typeof obj === "object" && obj !== null) {
                Object.entries(obj).forEach(([key, val]) => {
                    text += `${key.toUpperCase()}:\n${extractText(val)}\n\n`
                })
            }
            return text.trim()
        }

        docsData.forEach((doc, index) => {
            fullText += `DOCUMENT ${index + 1}: ${doc.title}\n`
            fullText += extractText(doc) + "\n\n"
        })

        return fullText
    }

    // Handle chat submission
    const handleSubmit = async (customInput?: string) => {
        const questionText = customInput || input
        if (!questionText.trim() || isLoading || !model) return

        const userMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: questionText,
            timestamp: new Date()
        }

        setMessages(prev => [...prev, userMessage])
        setInput("")
        setIsLoading(true)

        try {
            const fullContext = getFullDocsContext()

            // Enhanced prompt with better structure
            const prompt = `
You are ZendFi's expert documentation assistant. Your goal is to help developers integrate crypto payments quickly and accurately.

RULES:
1. Answer ONLY using the provided ZendFi documentation context below
2. If the answer isn't in the docs, say: "I don't have specific information on that in the current docs. Try asking about payments, webhooks, subscriptions, escrows, installments, invoices, or wallet setup."
3. Provide CODE EXAMPLES when relevant (use proper markdown code blocks with language tags)
4. Include relevant API endpoints with full URLs
5. Use bullet points for step-by-step instructions
6. Keep responses under 250 words
7. Be specific - reference exact field names, response structures, and status codes

DOCUMENTATION CONTEXT:
${fullContext}

USER QUESTION: ${questionText}

RESPONSE FORMAT:
- Start with a direct answer
- Provide code example if applicable (use \`\`\`bash, \`\`\`json, or \`\`\`javascript)
- List any relevant endpoints
- Mention related documentation sections if helpful
`

            const result = await model.generateContent(prompt)
            const response = await result.response
            const botMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: response.text(),
                timestamp: new Date()
            }

            setMessages(prev => [...prev, botMessage])
        } catch (error) {
            console.error("Gemini API error:", error)
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: "Sorry, I encountered an error processing your question. Please check your API key and try again!",
                timestamp: new Date()
            }
            setMessages(prev => [...prev, errorMessage])
        } finally {
            setIsLoading(false)
        }
    }

    // Handle Enter key in input (Enter to submit)
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault()
            handleSubmit()
        }
    }

    // Handle Send button click
    const handleSendClick = (e: React.MouseEvent) => {
        e.preventDefault()
        handleSubmit()
    }

    // Suggested questions
    const suggestedQuestions = [
        "How do I create a payment?",
        "How do webhooks work?",
        "What's the difference between MPC and own wallet?",
        "How do I set up subscriptions?",
        "How do escrow payments work?",
        "How do I create an invoice?",
    ]

    return (
        <div className="flex flex-col h-full">
            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {messages.length === 0 ? (
                    <div className="text-center py-8 px-4">
                        <Bot className="mx-auto h-12 w-12 mb-4 opacity-50 text-primary" />
                        <p className="text-muted-foreground mb-6">Ask me anything about ZendFi docs!</p>
                        
                        {/* Suggested Questions */}
                        <div className="space-y-2 max-w-sm mx-auto">
                            <p className="text-xs font-semibold uppercase text-muted-foreground mb-3">Try asking:</p>
                            {suggestedQuestions.map((question, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleSuggestedQuestion(question)}
                                    className="block w-full text-left text-sm bg-muted hover:bg-muted/80 p-3 rounded-lg transition-colors"
                                >
                                    <span className="mr-2">💡</span>
                                    {question}
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    messages.map((message) => (
                        <div
                            key={message.id}
                            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                        >
                            <div
                                className={`max-w-[80%] p-3 rounded-lg ${message.role === "user"
                                    ? "bg-accent/70 text-primary-foreground"
                                    : "bg-muted text-foreground"
                                    }`}
                            >
                                <Markdown
                                    options={{
                                        forceBlock: true,
                                        overrides: {
                                            strong: {
                                                component: (props) => (
                                                    <strong className="font-semibold text-primary">{props.children}</strong>
                                                ),
                                            },
                                            code: {
                                                component: ({ className, children }) => {
                                                    const language = className?.replace("lang-", "") || ""
                                                    const isInline = !/\n/.test(children)
                                                    return isInline ? (
                                                        <code className="bg-muted px-1 py-0.5 rounded text-primary font-mono text-xs">
                                                            {children}
                                                        </code>
                                                    ) : (
                                                        <div className="relative my-3">
                                                            <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm shadow-sm">
                                                                <code className={`language-${language}`}>{children}</code>
                                                            </pre>
                                                            <CopyButton code={children} />
                                                        </div>
                                                    )
                                                },
                                            },
                                            li: {
                                                component: (props) => (
                                                    <li className="ml-4 list-disc leading-relaxed">{props.children}</li>
                                                ),
                                            },
                                            a: {
                                                component: (props) => (
                                                    <a
                                                        {...props}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-500 hover:underline"
                                                    >
                                                        {props.children}
                                                    </a>
                                                ),
                                            },
                                            p: {
                                                component: (props) => (
                                                    <p className="mb-3 leading-relaxed">{props.children}</p>
                                                ),
                                            },
                                        },
                                    }}
                                    className="text-sm prose prose-sm dark:prose-invert max-w-none"
                                >
                                    {message.content}
                                </Markdown>


                                <span className={`text-xs block mt-1 ${message.role === "user"
                                    ? "text-white"
                                    : "text-muted-foreground"
                                    }`}>
                                    {message.timestamp.toLocaleTimeString()}
                                </span>
                            </div>
                        </div>
                    ))
                )}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-muted text-foreground p-3 rounded-lg max-w-[80%]">
                            <div className="flex items-center gap-2">
                                <div className="flex gap-1">
                                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0ms'}} />
                                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '150ms'}} />
                                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '300ms'}} />
                                </div>
                                <p className="text-sm text-muted-foreground">Thinking...</p>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t bg-background">
                {/* Clear Chat Button */}
                {messages.length > 0 && (
                    <div className="flex justify-end mb-2">
                        <button
                            onClick={clearChat}
                            className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                        >
                            <Trash2 className="w-3 h-3" />
                            Clear chat
                        </button>
                    </div>
                )}
                
                <div className="flex gap-2">
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Ask about payments, webhooks, subscriptions..."
                        className="flex-1"
                        disabled={isLoading}
                    />
                    <Button
                        onClick={handleSendClick}
                        disabled={!input.trim() || isLoading}
                        variant="outline"
                    >
                        <Send className="w-4 h-4" />
                    </Button>
                </div>
                
                {/* Hint */}
                <p className="text-xs text-muted-foreground mt-2 text-center">
                    Tip: Ask specific questions about API endpoints, webhooks, or wallet setup
                </p>
            </div>
        </div>
    )
}