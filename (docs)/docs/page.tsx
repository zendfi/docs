"use client"
import { Card } from "@/components/ui/card"
import { CheckCircle2, Zap, Shield, Clock, Rocket, Heart, Code, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function GettingStarted() {
  const [selectedWallet, setSelectedWallet] = useState("mpc_passkey")

  const walletOptions = [
    {
      id: "mpc_passkey",
      name: "Passkey Wallet",
      icon: Shield,
      badge: "Most Secure",
      tagline: "Face ID security, no passwords",
      description: "Your customers use Face ID or fingerprint to approve transactions. No seed phrases, no crypto knowledge needed.",
      perfect: "Teams who want maximum security with zero crypto complexity",
      setupTime: "5 seconds",
      custody: "Non-custodial",
      color: "primary"
    },
    {
      id: "own",
      name: "Your Own Wallet",
      icon: CheckCircle2,
      badge: "Full Control",
      tagline: "Use your existing wallet",
      description: "Already have a Solana wallet? Perfect! Just connect it and you're ready to go.",
      perfect: "Crypto-native teams with existing wallets",
      setupTime: "Instant",
      custody: "Non-custodial",
      color: "green-500"
    }
  ]

  const selectedOption = walletOptions.find(w => w.id === selectedWallet)

  return (
    <div className="space-y-12 max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="text- space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold">Getting Started</h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Learn how to create your first payment and integrate with the ZendFi API.
        </p>
        <p className="text-base text-muted-foreground max-w-2xl">
          This guide will walk you through creating your first payment order and integrating with the ZendFi API.
        </p>
      </div>

      {/* What You'll Need */}
      <div className="">
        <div className=" space-y-6">
          <div className="inline-flex items-center gap-3 text-lg text-muted-foreground">
            <span>Ready to launch? Here's what you'll need:</span>
          </div>
          <ul className="max-w-lg space-y-3 text-left">
            <li className="flex items-center gap-3 p-3 bg-white/60 dark:bg-slate-800/60 rounded-lg shadow-sm">
              <div className="w-8 h-8 bg-accent/10 dark:bg-accent/90 rounded-full flex items-center justify-center flex-shrink-0">
                1
              </div>
              <span className="text-sm font-medium">A valid business email address</span>
            </li>
            <li className="flex items-center gap-3 p-3 bg-white/60 dark:bg-slate-800/60 rounded-lg shadow-sm">
              <div className="w-8 h-8 bg-accent/10 dark:bg-accent/90 rounded-full flex items-center justify-center flex-shrink-0">
                2
              </div>
              <span className="text-sm font-medium">Your business/organization name</span>
            </li>
            <li className="flex items-center gap-3 p-3 bg-white/60 dark:bg-slate-800/60 rounded-lg shadow-sm">
              <div className="w-8 h-8 bg-accent/10 dark:bg-accent/90 rounded-full flex items-center justify-center flex-shrink-0">
                3
              </div>
              <span className="text-sm font-medium">Webhook URL (optional—for instant notifications)</span>
            </li>
            <li className="flex items-center gap-3 p-3 bg-white/60 dark:bg-slate-800/60 rounded-lg shadow-sm">
              <div className="w-8 h-8 bg-accent/10 dark:bg-accent/90 rounded-full flex items-center justify-center flex-shrink-0">
                4
              </div>
              <span className="text-sm font-medium">A Solana wallet (or use our 5-second Face ID setup!)</span>
            </li>
          </ul>
          <p className="text-base text-muted-foreground">
            That's literally it! No complex setups or crypto expertise needed. Let's make payments magical. ✨
          </p>
        </div>
      </div>

      {/* Quick Overview */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="p-6 text-center  transition-shadow">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-6 h-6 text-primary" />
          </div>
          <h3 className="font-semibold mb-2">1. Choose Your Wallet</h3>
          <p className="text-sm text-muted-foreground">Pick the wallet type that fits your needs</p>
        </Card>

        <Card className="p-6 text-center  transition-shadow">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Code className="w-6 h-6 text-primary" />
          </div>
          <h3 className="font-semibold mb-2">2. Get Your API Key</h3>
          <p className="text-sm text-muted-foreground">One API call creates your merchant account</p>
        </Card>

        <Card className="p-6 text-center  transition-shadow">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Rocket className="w-6 h-6 text-primary" />
          </div>
          <h3 className="font-semibold mb-2">3. Accept Payments</h3>
          <p className="text-sm text-muted-foreground">Start receiving crypto payments instantly</p>
        </Card>
      </div>

      {/* Step 1: Choose Your Wallet */}
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold mb-2">Choose Your Wallet Type</h2>
          <p className="text-lg text-muted-foreground">
            Each wallet type has different benefits. Don't worry, you can't pick wrong!
          </p>
        </div>

        {/* Wallet Selection Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {walletOptions.map((option) => {
            const Icon = option.icon
            const isSelected = selectedWallet === option.id
            return (
              <Card
                key={option.id}
                className={`p-6 cursor-pointer transition-all  ${isSelected ? 'border-accent border-2' : ''
                  }`}
                onClick={() => setSelectedWallet(option.id)}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${isSelected ? 'bg-accent text-white' : 'bg-muted'
                    }`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-lg">{option.name}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${isSelected ? 'bg-accent text-white' : 'bg-muted'
                        }`}>
                        {option.badge}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{option.tagline}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {option.setupTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <Shield className="w-3 h-3" />
                        {option.custody}
                      </span>
                    </div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${isSelected ? 'border-accent bg-accent' : 'border-muted'
                    }`}>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-white" />}
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Selected Wallet Details */}
        {selectedOption && (
          <Card className="p-8  border-accent/20">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-2">About {selectedOption.name}</h3>
                <p className="text-muted-foreground text-lg">{selectedOption.description}</p>
              </div>

              <div className="bg-white/50 dark:bg-slate-900/50 rounded-lg p-4">
                <p className="text-sm font-semibold mb-1">Perfect for:</p>
                <p className="text-muted-foreground">{selectedOption.perfect}</p>
              </div>

              {/* Code Example */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold">Create your account with this wallet type:</h4>
                  <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full">
                    Copy & paste this
                  </span>
                </div>
                <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-xs">
                  <code className="language-bash mt-10">{getCodeExample(selectedWallet)}</code>
                </pre>
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Step 2: API Key */}
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold mb-2">Get Your API Key</h2>
          <p className="text-lg text-muted-foreground">
            Make one API call to create your account. You'll get your API key instantly.
          </p>
        </div>

        <Card className="p-8">
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">What you need:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Business email address</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Business name</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Business address</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Webhook URL (optional)</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-3">What you get back:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Your unique API key</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Merchant ID</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Wallet address (for receiving funds)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Setup instructions (if needed)</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Complete Response Schema */}
            <div className="border-t pt-6">
              <h4 className="font-semibold mb-4">📋 Complete Response Schema</h4>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-3">Field</th>
                      <th className="text-left py-2 px-3">Type</th>
                      <th className="text-left py-2 px-3">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr>
                      <td className="py-2 px-3 font-mono text-xs">merchant_id</td>
                      <td className="py-2 px-3 text-muted-foreground">string</td>
                      <td className="py-2 px-3">Your unique merchant identifier</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-mono text-xs">api_key</td>
                      <td className="py-2 px-3 text-muted-foreground">string</td>
                      <td className="py-2 px-3">🔑 Your API authentication key (shown only once!)</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-mono text-xs">name</td>
                      <td className="py-2 px-3 text-muted-foreground">string</td>
                      <td className="py-2 px-3">Your business name</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-mono text-xs">email</td>
                      <td className="py-2 px-3 text-muted-foreground">string</td>
                      <td className="py-2 px-3">Your business email</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-mono text-xs">wallet_address</td>
                      <td className="py-2 px-3 text-muted-foreground">string</td>
                      <td className="py-2 px-3">Solana wallet address for receiving settlements</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-mono text-xs">wallet_type</td>
                      <td className="py-2 px-3 text-muted-foreground">string</td>
                      <td className="py-2 px-3">"mpc_passkey" or "own" - type of wallet used</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-mono text-xs">settlement_preference</td>
                      <td className="py-2 px-3 text-muted-foreground">string</td>
                      <td className="py-2 px-3">"auto_usdc" or "direct_token" - how you receive payments</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-mono text-xs">webhook_url</td>
                      <td className="py-2 px-3 text-muted-foreground">string | null</td>
                      <td className="py-2 px-3">Your webhook endpoint (if provided)</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-mono text-xs">webhook_secret</td>
                      <td className="py-2 px-3 text-muted-foreground">string | null</td>
                      <td className="py-2 px-3">Secret for verifying webhook signatures</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-mono text-xs">created_at</td>
                      <td className="py-2 px-3 text-muted-foreground">string</td>
                      <td className="py-2 px-3">ISO 8601 timestamp of account creation</td>
                    </tr>
                    <tr className="bg-purple-50 dark:bg-purple-950/20">
                      <td className="py-2 px-3 font-mono text-xs">next_steps</td>
                      <td className="py-2 px-3 text-muted-foreground">object | null</td>
                      <td className="py-2 px-3">🔐 For MPC Passkey: Setup instructions and URLs</td>
                    </tr>
                    <tr className="bg-purple-50 dark:bg-purple-950/20">
                      <td className="py-2 px-3 font-mono text-xs">message</td>
                      <td className="py-2 px-3 text-muted-foreground">string</td>
                      <td className="py-2 px-3">Success message with setup instructions</td>
                    </tr>
                    <tr className="bg-purple-50 dark:bg-purple-950/20">
                      <td className="py-2 px-3 font-mono text-xs">security_note</td>
                      <td className="py-2 px-3 text-muted-foreground">string</td>
                      <td className="py-2 px-3">Security information about your wallet type</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-4 bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
                <p className="text-sm font-semibold text-purple-900 dark:text-purple-100 mb-2">
                  💡 MPC Passkey Wallets
                </p>
                <p className="text-sm text-purple-800 dark:text-purple-200 mb-3">
                  If you chose <code className="bg-purple-100 dark:bg-purple-900 px-1 rounded">wallet_generation_method: "mpc_passkey"</code>, 
                  you'll receive a <code className="bg-purple-100 dark:bg-purple-900 px-1 rounded">next_steps</code> object with the passkey setup URL and API endpoints.
                </p>
                <p className="text-sm text-purple-800 dark:text-purple-200">
                  ⚡ <strong>Next Step:</strong> Visit the passkey_setup_url or call the WebAuthn API endpoints to activate your wallet (see below).
                </p>
              </div>
            </div>

            {/* Response Examples */}
            <div className="border-t pt-6">
              <h4 className="font-semibold mb-4">📦 Example Responses</h4>
              
              <div className="space-y-4">
                {/* MPC Passkey Response */}
                <div>
                  <p className="text-sm font-medium mb-2">MPC Passkey Wallet (Requires WebAuthn Setup)</p>
                  <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-xs">
                    <code className="language-json mt-10">{`{
  "merchant": {
    "id": "44ced244-50d6-46b8-ad81-804ad1f30a76",
    "name": "My Store",
    "wallet_address": "",
    "wallet_type": "mpc",
    "settlement_preference": "autousdc",
    "wallet_generation_method": "mpc_passkey"
  },
  "api_keys": {
    "test": "zfi_test_6394b3b506faed70b833f0507cfa4a887d1cb1dcdafb703a8edfd00578e8864d",
    "live": "zfi_live_e7c1db5a84a980807a0fe2f65040d78c1ec18cc301745fa15de61d0fc2e041dc"
  },
  "message": "Merchant created with non-custodial MPC wallet! Complete passkey setup to activate auto-settlements. Use test API key for devnet, live API key for mainnet.",
  "security_note": "Non-custodial MPC wallet secured by your device biometrics (Face ID/Touch ID). We never hold your keys!",
  "next_steps": {
    "passkey_setup_url": "https://api.zendfi.tech/merchants/44ced244-50d6-46b8-ad81-804ad1f30a76/setup-passkey",
    "setup_required": true,
    "estimated_time": "5 seconds with Face ID/Touch ID",
    "api_endpoints": {
      "register_start": "/api/v1/webauthn/register/start",
      "register_finish": "/api/v1/webauthn/register/finish"
    }
  },
  "warning": "Store this API key securely. It will not be shown again."
}`}</code>
                  </pre>
                </div>

                {/* Own Wallet Response */}
                <div>
                  <p className="text-sm font-medium mb-2">Own Wallet (Ready to Use Immediately)</p>
                  <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-xs">
                    <code className="language-json mt-10">{`{
  "merchant": {
    "id": "def456ghi789",
    "name": "My Store",
    "wallet_address": "9xKBN4tF2vxUqLrXpE3mDwY7zQsN8rW6vH5jC4kM1pT2",
    "wallet_type": "external",
    "settlement_preference": "autousdc",
    "wallet_generation_method": "provided"
  },
  "api_keys": {
    "test": "zfi_test_abcd1234...",
    "live": "zfi_live_efgh5678..."
  },
  "message": "Merchant created with your provided wallet address.",
  "security_note": "You control your wallet private keys directly.",
  "next_steps": {
    "setup_required": false
  },
  "warning": "Store this API key securely. It will not be shown again."
}`}</code>
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
              <p className="text-sm font-semibold text-amber-900 dark:text-amber-100 mb-1">
                🔐 Important: Save your API key!
              </p>
              <p className="text-sm text-amber-800 dark:text-amber-200">
                Your API key is shown only once. Store it securely in your environment variables immediately.
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold mb-3">API Endpoint:</p>
              <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg text-sm">
                <code className="language-bash mt-5">POST https://api.zendfi.tech/api/v1/merchants</code>
              </pre>
            </div>
          </div>
        </Card>
      </div>

      {/* WebAuthn Flow for MPC Passkey Wallets */}
{/* 
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold mb-2">🔐 Complete MPC Passkey Setup</h2>
          <p className="text-lg text-muted-foreground">
            If you chose MPC Passkey wallet, complete this one-time setup to activate your wallet. 
            This uses your device's biometric security (Face ID, Touch ID, Windows Hello).
          </p>
        </div>

        <Card className="p-8">
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-4">How WebAuthn Wallet Setup Works</h3>
              <div className="grid md:grid-cols-5 gap-3">
                <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 text-center">
                  <div className="text-2xl mb-2">1️⃣</div>
                  <p className="text-sm font-semibold mb-1">Call API</p>
                  <p className="text-xs text-muted-foreground">Create merchant with mpc_passkey</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 text-center">
                  <div className="text-2xl mb-2">2️⃣</div>
                  <p className="text-sm font-semibold mb-1">Receive Challenge</p>
                  <p className="text-xs text-muted-foreground">Get webauthn_options from response</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 text-center">
                  <div className="text-2xl mb-2">3️⃣</div>
                  <p className="text-sm font-semibold mb-1">Create Credential</p>
                  <p className="text-xs text-muted-foreground">Use navigator.credentials.create()</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 text-center">
                  <div className="text-2xl mb-2">4️⃣</div>
                  <p className="text-sm font-semibold mb-1">Approve</p>
                  <p className="text-xs text-muted-foreground">Face ID / Touch ID / PIN</p>
                </div>
                <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4 text-center">
                  <div className="text-2xl mb-2">✅</div>
                  <p className="text-sm font-semibold mb-1">Wallet Active</p>
                  <p className="text-xs text-muted-foreground">Ready to accept payments!</p>
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="font-semibold mb-4">💻 Complete Browser Integration</h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-2">Step 1: Create Merchant and Get WebAuthn Options</p>
                  <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-xs">
                    <code className="language-json">{`const response = await fetch('https://api.zendfi.tech/api/v1/merchants', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'My Store',
    email: 'hello@mystore.com',
    business_address: '123 Main St, SF, CA',
    wallet_generation_method: 'mpc_passkey'
  })
});

const data = await response.json();
console.log('Merchant ID:', data.merchant_id);
console.log('API Key:', data.api_key); // Save this!

// You'll get webauthn_options to complete setup
const webauthnOptions = data.webauthn_options;`}</code>
                  </pre>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Step 2: Complete WebAuthn Challenge</p>
                  <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-xs">
                    <code className="language-json">{`// Convert base64 challenge to Uint8Array
function base64ToUint8Array(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

// Prepare options for browser API
const credentialOptions = {
  publicKey: {
    ...webauthnOptions.publicKey,
    challenge: base64ToUint8Array(webauthnOptions.publicKey.challenge),
    user: {
      ...webauthnOptions.publicKey.user,
      id: base64ToUint8Array(webauthnOptions.publicKey.user.id)
    }
  }
};

// Create the credential (triggers Face ID/Touch ID/PIN)
try {
  const credential = await navigator.credentials.create(credentialOptions);
  
  if (!credential) {
    throw new Error('WebAuthn credential creation was cancelled');
  }

  console.log('✅ Wallet credential created successfully!');
  console.log('Your wallet is now active and ready to receive payments');
  
  // The wallet address is automatically generated on ZendFi's side
  // You can start accepting payments immediately
  
} catch (error) {
  console.error('Failed to create wallet credential:', error);
  // Handle errors (user cancelled, device not supported, etc.)
}`}</code>
                  </pre>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Step 3: Verify Wallet is Active (Optional)</p>
                  <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-xs">
                    <code className="language-json">{`// Check your merchant status
const merchantResponse = await fetch(
  \`https://api.zendfi.tech/api/v1/merchants/\${data.merchant_id}\`,
  {
    headers: {
      'Authorization': \`Bearer \${data.api_key}\`
    }
  }
);

const merchantData = await merchantResponse.json();
console.log('Wallet Address:', merchantData.wallet_address);
console.log('Wallet Status:', merchantData.wallet_status); // "active"

// Now you can start creating payments!`}</code>
                  </pre>
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6">
                <h4 className="font-semibold mb-3">🛡️ Why WebAuthn MPC Wallets Are Superior</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-semibold text-green-700 dark:text-green-400 mb-2">✅ With MPC Passkey (WebAuthn)</p>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>✓ No seed phrases to lose or write down</li>
                      <li>✓ Biometric security (Face ID, Touch ID)</li>
                      <li>✓ Non-custodial (you own the keys)</li>
                      <li>✓ Works across all your devices</li>
                      <li>✓ Phishing resistant</li>
                      <li>✓ Recovery through device backup</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-red-700 dark:text-red-400 mb-2">❌ Traditional Wallets</p>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>✗ Must store 12-24 word seed phrases</li>
                      <li>✗ Easy to lose or steal seed phrase</li>
                      <li>✗ No recovery if seed is lost</li>
                      <li>✗ Complex for non-crypto users</li>
                      <li>✗ Vulnerable to phishing attacks</li>
                      <li>✗ Manual backup required</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <p className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-3">
                  💡 Pro Tips for WebAuthn Integration
                </p>
                <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-2">
                  <li>
                    <strong>1. Check Browser Support:</strong> Use <code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">if (!window.PublicKeyCredential)</code> to verify WebAuthn is available
                  </li>
                  <li>
                    <strong>2. Handle User Cancellation:</strong> Users can cancel the biometric prompt - provide clear error messages
                  </li>
                  <li>
                    <strong>3. Test on Multiple Devices:</strong> Face ID (iOS), Touch ID (Mac), Windows Hello all work differently
                  </li>
                  <li>
                    <strong>4. Save API Key First:</strong> Always save the API key before completing WebAuthn (in case user cancels)
                  </li>
                  <li>
                    <strong>5. Show Clear Instructions:</strong> Tell users they'll see a biometric prompt (reduces confusion)
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t pt-6">
              <h4 className="font-semibold mb-3">🌐 Browser & Device Support</h4>
              <div className="grid md:grid-cols-3 gap-3">
                <div className="bg-white dark:bg-slate-900 border rounded-lg p-3">
                  <p className="font-semibold text-sm mb-2">✅ Desktop</p>
                  <p className="text-xs text-muted-foreground">Chrome, Safari, Edge, Firefox<br/>Windows Hello, Touch ID</p>
                </div>
                <div className="bg-white dark:bg-slate-900 border rounded-lg p-3">
                  <p className="font-semibold text-sm mb-2">✅ Mobile</p>
                  <p className="text-xs text-muted-foreground">iOS Safari, Android Chrome<br/>Face ID, Touch ID, Fingerprint</p>
                </div>
                <div className="bg-white dark:bg-slate-900 border rounded-lg p-3">
                  <p className="font-semibold text-sm mb-2">✅ Hardware Keys</p>
                  <p className="text-xs text-muted-foreground">YubiKey, Titan Security Key<br/>USB, NFC, Bluetooth</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div> */}


      {/* Step 3: Accept Payments */}
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold mb-2">Start Accepting Payments</h2>
          <p className="text-lg text-muted-foreground">
            Create your first payment in seconds. Your customers can pay with any Solana wallet.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="font-bold text-lg mb-4">Create a Payment</h3>
            <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-xs mb-4">
              <code className="language-json mt-10">{`POST /api/v1/payments

{
  "amount": 50.00,
  "currency": "USD",
  "description": "Premium Plan",
  "token": "USDC"
}`}</code>
            </pre>
            <p className="text-sm text-muted-foreground">
              You'll get back a payment URL and QR code to show your customer
            </p>
          </Card>

          <Card className="p-6">
            <h3 className="font-bold text-lg mb-4">Customer Experience</h3>
            <ol className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold">
                  1
                </span>
                <span className="text-sm">Opens the payment link or scans QR code</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold">
                  2
                </span>
                <span className="text-sm">Connects their wallet (Phantom, Solflare, etc.)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold">
                  3
                </span>
                <span className="text-sm">Approves the transaction</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold">
                  4
                </span>
                <span className="text-sm">Payment confirmed instantly!</span>
              </li>
            </ol>
          </Card>
        </div>
      </div>

      {/* How Settlements Work */}
      <Card className="p-8 ">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">How You Get Paid</h2>
            <p className="text-muted-foreground">
              Choose how you want to receive your funds. You can change this anytime.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-900 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-3">

                <h3 className="font-bold">Auto USDC (Recommended)</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Customers pay in SOL or USDC, you always receive stable USDC. No volatility risk.
              </p>
              <div className="bg-muted/50 rounded p-3 text-xs">
                <span className="font-semibold">Fee:</span> 0.6% + minimal swap fees
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-3">

                <h3 className="font-bold">Direct Token</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Receive payments in the exact token your customer pays with. Perfect for crypto enthusiasts.
              </p>
              <div className="bg-muted/50 rounded p-3 text-xs">
                <span className="font-semibold">Fee:</span> 0.6% flat
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Real-time Notifications */}
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold mb-2">Get Real-Time Notifications</h2>
          <p className="text-lg text-muted-foreground">
            Set up webhooks to receive instant notifications when payments are completed.
          </p>
        </div>

        <Card className="p-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Events we send:</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-mono text-sm">payment.confirmed</p>
                    <p className="text-xs text-muted-foreground">Payment received and verified</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-mono text-sm">settlement.completed</p>
                    <p className="text-xs text-muted-foreground">Funds settled to your wallet</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-mono text-sm">payment.failed</p>
                    <p className="text-xs text-muted-foreground">Transaction didn't complete</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Your webhook must:</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Use HTTPS</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Respond within 30 seconds</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Return 200 OK status</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Verify webhook signatures</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>
      </div>

      {/* Next Steps */}
      <Card className="p-8">
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 text-2xl font-bold">
            <Heart className="w-6 h-6 text-primary" />
            You're All Set!
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            You now have everything you need to accept crypto payments. Here's what to explore next:
          </p>

          <div className="grid md:grid-cols-3 gap-4 mt-8">
            <div className="bg-white dark:bg-slate-900 rounded-lg p-6 text-left  transition-shadow cursor-pointer">
              <h3 className="font-bold mb-2">API Reference</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Explore all available endpoints and parameters
              </p>
              <Link href={"/docs/api"}>
                <span className="text-sm text-primary font-semibold flex items-center gap-1">
                  View docs <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-lg p-6 text-left  transition-shadow cursor-pointer">
              <h3 className="font-bold mb-2">SDK and Toolkit</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Node.js, Python, PHP, and more
              </p>
              <Link href={"/docs/sdk"}>
                <span className="text-sm text-primary font-semibold flex items-center gap-1">
                  See examples <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-lg p-6 text-left  transition-shadow cursor-pointer">
              <h3 className="font-bold mb-2">Get Help</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Join our Discord or email support
              </p>
              <Link href={"mailto:support@zendfi.tech"}>
                <span className="text-sm text-primary font-semibold flex items-center gap-1">
                  Contact us <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

function getCodeExample(walletType: string) {
  const examples = {
    mpc_passkey: `curl -X POST https://api.zendfi.tech/api/v1/merchants \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "My Store",
    "email": "hello@mystore.com",
    "business_address": "123 Main St, SF, CA",
    "wallet_generation_method": "mpc_passkey"
  }'`,
    own: `curl -X POST https://api.zendfi.tech/api/v1/merchants \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "My Store",
    "email": "hello@mystore.com",
    "business_address": "123 Main St, SF, CA",
    "wallet_address": "YOUR_SOLANA_WALLET_ADDRESS"
  }'`
  }
  return examples[walletType as keyof typeof examples]
}
