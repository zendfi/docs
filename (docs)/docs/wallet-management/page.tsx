import { Card } from "@/components/ui/card"
import { Wallet, DollarSign, Key, Shield, Lock, RefreshCw, AlertCircle, TestTube, ArrowRight, CheckCircle2, Clock, XCircle } from "lucide-react"

export default function WalletManagement() {
  return (
    <div className="space-y-6 md:space-y-8 max-w-5xl">
      <div>
        <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-2">
          Wallet Management - Your Crypto Treasury! 💰
        </h1>
        <p className="text-base md:text-lg text-muted-foreground">
          Welcome to Wallet Management! This is where you manage your merchant wallet, check balances, export keys, and withdraw funds to external addresses. Whether you have an MPC wallet or a regular wallet, we've got you covered. Let's dive in!
        </p>
      </div>

      {/* Table of Contents */}
      <Card className="p-6 bg-primary/5">
        <h2 className="text-xl font-bold mb-4">Table of Contents</h2>
        <ul className="space-y-2 text-muted-foreground">
          <li className="flex items-center gap-2">
            <ArrowRight className="w-4 h-4 text-primary" />
            <a href="#understanding-your-wallet" className="hover:text-primary transition-colors">Understanding Your Wallet</a>
          </li>
          <li className="flex items-center gap-2">
            <ArrowRight className="w-4 h-4 text-primary" />
            <a href="#get-wallet-info--balance" className="hover:text-primary transition-colors">Get Wallet Info & Balance</a>
          </li>
          <li className="flex items-center gap-2">
            <ArrowRight className="w-4 h-4 text-primary" />
            <a href="#export-private-key-mpc-only" className="hover:text-primary transition-colors">Export Private Key (MPC Only)</a>
          </li>
          <li className="flex items-center gap-2">
            <ArrowRight className="w-4 h-4 text-primary" />
            <a href="#withdraw-funds" className="hover:text-primary transition-colors">Withdraw Funds</a>
          </li>
          <li className="flex items-center gap-2">
            <ArrowRight className="w-4 h-4 text-primary" />
            <a href="#passkey-setup-mpc-wallets" className="hover:text-primary transition-colors">Passkey Setup (MPC Wallets)</a>
          </li>
          <li className="flex items-center gap-2">
            <ArrowRight className="w-4 h-4 text-primary" />
            <a href="#security-best-practices" className="hover:text-primary transition-colors">Security Best Practices</a>
          </li>
          <li className="flex items-center gap-2">
            <ArrowRight className="w-4 h-4 text-primary" />
            <a href="#testing" className="hover:text-primary transition-colors">Testing</a>
          </li>
        </ul>
      </Card>

      {/* Understanding Your Wallet */}
      <div id="understanding-your-wallet" className="space-y-4">
        <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2">
          <Wallet className="w-6 h-6 text-primary" />
          Understanding Your Wallet
        </h2>
        <p className="text-muted-foreground">
          ZendFi supports <strong>4 different wallet types</strong> (as covered in <a href="#getting-started" className="hover:text-primary transition-colors">Getting Started</a>):
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          <Card className="p-4">
            <h3 className="text-lg font-bold mb-2">1. MPC Passkey Wallet (Recommended)</h3>
            <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside">
              <li><strong>Non-custodial</strong>: You control your funds via passkey</li>
              <li><strong>No seed phrases</strong>: Uses Face ID/Touch ID instead</li>
              <li><strong>Can export key</strong>: Full control when needed</li>
              <li><strong>Can withdraw</strong>: Transfer funds to any Solana address</li>
              <li><strong>Passkey protected</strong>: All sensitive operations require biometric auth</li>
            </ul>
          </Card>

          {/* <Card className="p-4">
            <h3 className="text-lg font-bold mb-2">2. BIP39 Mnemonic Wallet</h3>
            <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside">
              <li><strong>Custodial</strong>: ZendFi manages the key</li>
              <li><strong>HD wallet</strong>: Derived from mnemonic phrase</li>
              <li><strong>Cannot export</strong>: Key stays secure on server</li>
              <li><strong>Cannot withdraw via API</strong>: Contact support for withdrawals</li>
            </ul>
          </Card> */}

          {/* <Card className="p-4">
            <h3 className="text-lg font-bold mb-2">3. Simple Deterministic Wallet</h3>
            <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside">
              <li><strong>Custodial</strong>: ZendFi manages the key</li>
              <li><strong>Fastest setup</strong>: Generated instantly</li>
              <li><strong>Cannot export</strong>: Key stays secure on server</li>
              <li><strong>Cannot withdraw via API</strong>: Contact support for withdrawals</li>
            </ul>
          </Card> */}

          <Card className="p-4">
            <h3 className="text-lg font-bold mb-2">2. Bring Your Own Wallet</h3>
            <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside">
              <li><strong>Non-custodial</strong>: You manage your own wallet (Phantom, Solflare, Ledger)</li>
              <li><strong>No key management</strong>: Use your existing wallet</li>
              <li><strong>Cannot export</strong>: N/A (you already have the key!)</li>
              <li><strong>Can withdraw</strong>: Just use your own wallet directly</li>
            </ul>
          </Card>
        </div>

        <p className="text-muted-foreground"><strong>In this guide, we'll focus on MPC wallets</strong> since they support the full API for wallet management! ✨</p>
      </div>

      {/* Get Wallet Info & Balance */}
      <div id="get-wallet-info--balance" className="space-y-4">
        <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2">
          <DollarSign className="w-6 h-6 text-primary" />
          Get Wallet Info & Balance
        </h2>
        <p className="text-muted-foreground">
          Check your wallet balance and details - works for <strong>all wallet types</strong>!
        </p>

        <Card className="p-6">
          <h3 className="text-lg font-bold mb-2">Endpoint</h3>
          <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
            <code>GET /api/v1/merchants/me/wallet</code>
          </pre>

          <h3 className="text-lg font-bold mb-2">Authentication</h3>
          <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
            <code>Authorization: Bearer YOUR_API_KEY</code>
          </pre>
          <p className="text-sm text-muted-foreground mb-4">Or use session cookie (if logged into merchant dashboard).</p>

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
                  <td className="p-2"><code>wallet_address</code></td>
                  <td className="p-2">string</td>
                  <td className="p-2">Your Solana wallet address (base58)</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2"><code>wallet_type</code></td>
                  <td className="p-2">string</td>
                  <td className="p-2">Wallet type ("mpc", "custodial", "external", "unknown")</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2"><code>sol_balance</code></td>
                  <td className="p-2">number</td>
                  <td className="p-2">SOL balance (in SOL, not lamports)</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2"><code>usdc_balance</code></td>
                  <td className="p-2">number</td>
                  <td className="p-2">USDC balance (UI amount)</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2"><code>usdc_token_account</code></td>
                  <td className="p-2">string</td>
                  <td className="p-2">Your USDC token account address</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2"><code>has_mpc_wallet</code></td>
                  <td className="p-2">boolean</td>
                  <td className="p-2">Whether you have an active MPC wallet</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>

        <div className="space-y-6">
          <h3 className="text-lg font-bold">Examples</h3>

          {/* Example 1 */}
          <Card className="p-6 border-primary/50">
            <h4 className="text-lg font-bold mb-3">Example 1: Check MPC Wallet Balance</h4>
            <p className="text-muted-foreground mb-4">Perfect for monitoring your funds!</p>
            <h5 className="font-semibold mb-2">Request:</h5>
            <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
              <code className="language-bash mt-5">{`curl https://api.zendfi.tech/api/v1/merchants/me/wallet \\
  -H "Authorization: Bearer zfi_test_abc123..."`}</code>
            </pre>
            <h5 className="font-semibold mb-2">Response:</h5>
            <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
              <code className="language-json mt-5">{`{
  "wallet_address": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
  "wallet_type": "mpc",
  "sol_balance": 0.5,
  "usdc_balance": 1234.56,
  "usdc_token_account": "8zKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsV",
  "has_mpc_wallet": true
}`}</code>
            </pre>
            <p className="text-sm text-muted-foreground">
              <strong>What This Tells You:</strong>
            </p>
            <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside">
              <li>You have an MPC wallet</li>
              <li>Balance: 0.5 SOL + 1,234.56 USDC</li>
              <li>Wallet address ready for payments</li>
              <li>USDC token account exists and active</li>
            </ul>
          </Card>

          {/* Example 2 */}
          <Card className="p-6">
            <h4 className="text-lg font-bold mb-3">Example 2: Check Regular Wallet Balance</h4>
            <p className="text-muted-foreground mb-4">For custodial wallets.</p>
            <h5 className="font-semibold mb-2">Request:</h5>
            <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
              <code className="language-bash mt-5">{`curl https://api.zendfi.tech/api/v1/merchants/me/wallet \\
  -H "Authorization: Bearer zfi_live_xyz789..."`}</code>
            </pre>
            <h5 className="font-semibold mb-2">Response:</h5>
            <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
              <code className="language-json mt-5">{`{
  "wallet_address": "9yKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsW",
  "wallet_type": "custodial",
  "sol_balance": 2.35,
  "usdc_balance": 5678.90,
  "usdc_token_account": "AzKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsX",
  "has_mpc_wallet": false
}`}</code>
            </pre>
            <p className="text-sm text-muted-foreground">
              <strong>What This Tells You:</strong>
            </p>
            <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside">
              <li>You have a custodial wallet (mnemonic or simple)</li>
              <li>Balance: 2.35 SOL + 5,678.90 USDC</li>
              <li>Key is managed by ZendFi (cannot export via API)</li>
              <li>Contact support for withdrawals</li>
            </ul>
          </Card>

          {/* Example 3 */}
          <Card className="p-6">
            <h4 className="text-lg font-bold mb-3">Example 3: Check External Wallet Balance</h4>
            <p className="text-muted-foreground mb-4">For your own wallet like Phantom.</p>
            <h5 className="font-semibold mb-2">Request:</h5>
            <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
              <code className="language-bash mt-5">{`curl https://api.zendfi.tech/api/v1/merchants/me/wallet \\
  -H "Authorization: Bearer zfi_live_def456..."`}</code>
            </pre>
            <h5 className="font-semibold mb-2">Response:</h5>
            <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
              <code className="language-json mt-5">{`{
  "wallet_address": "BxKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsY",
  "wallet_type": "external",
  "sol_balance": 10.5,
  "usdc_balance": 0.0,
  "usdc_token_account": "CzKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsZ",
  "has_mpc_wallet": false
}`}</code>
            </pre>
            <p className="text-sm text-muted-foreground">
              <strong>What This Tells You:</strong>
            </p>
            <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside">
              <li>You're using your own wallet (Phantom, Solflare, etc.)</li>
              <li>Balance: 10.5 SOL + 0 USDC</li>
              <li>Manage funds directly in your wallet app</li>
              <li>No API-based withdrawals needed (you already control the wallet!)</li>
            </ul>
          </Card>
        </div>
      </div>

      {/* Export Private Key (MPC Only) */}
      <div id="export-private-key-mpc-only" className="space-y-4">
        <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2">
          <Key className="w-6 h-6 text-primary" />
          Export Private Key (MPC Only)
        </h2>
        <p className="text-muted-foreground">
          Export your MPC wallet's private key for backup or migration. <strong>This is VERY sensitive</strong> - handle with extreme care! 🔐
        </p>

        <Card className="p-6">
          <h3 className="text-lg font-bold mb-2">Endpoint</h3>
          <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
            <code>POST /api/v1/merchants/me/wallet/export</code>
          </pre>

          <h3 className="text-lg font-bold mb-2">Authentication</h3>
          <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
            <code>Authorization: Bearer YOUR_API_KEY</code>
          </pre>
          <p className="text-sm text-muted-foreground mb-4">Or use session cookie (if logged into merchant dashboard).</p>

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
                  <td className="p-2"><code>passkey_signature</code></td>
                  <td className="p-2">object</td>
                  <td className="p-2"><strong>Yes</strong></td>
                  <td className="p-2">Passkey signature for authentication</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2"><code>passkey_signature.credential_id</code></td>
                  <td className="p-2">string</td>
                  <td className="p-2"><strong>Yes</strong></td>
                  <td className="p-2">Your passkey credential ID</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2"><code>passkey_signature.authenticator_data</code></td>
                  <td className="p-2">array</td>
                  <td className="p-2"><strong>Yes</strong></td>
                  <td className="p-2">Authenticator data bytes</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2"><code>passkey_signature.signature</code></td>
                  <td className="p-2">array</td>
                  <td className="p-2"><strong>Yes</strong></td>
                  <td className="p-2">Signature bytes</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2"><code>passkey_signature.client_data_json</code></td>
                  <td className="p-2">array</td>
                  <td className="p-2"><strong>Yes</strong></td>
                  <td className="p-2">Client data JSON bytes</td>
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
                  <td className="p-2"><code>wallet_address</code></td>
                  <td className="p-2">string</td>
                  <td className="p-2">Your wallet's public address</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2"><code>private_key_base58</code></td>
                  <td className="p-2">string</td>
                  <td className="p-2"><strong>SENSITIVE!</strong> Your private key in base58 format</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2"><code>public_key</code></td>
                  <td className="p-2">string</td>
                  <td className="p-2">Your wallet's public key (base58)</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2"><code>warning</code></td>
                  <td className="p-2">string</td>
                  <td className="p-2">Security warning about key handling</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2"><code>export_timestamp</code></td>
                  <td className="p-2">datetime</td>
                  <td className="p-2">When the key was exported (ISO 8601)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>

        <div className="space-y-6">
          <h3 className="text-lg font-bold">Export Key Examples</h3>

          {/* Example 1 */}
          <Card className="p-6 border-primary/50">
            <h4 className="text-lg font-bold mb-3">Example 1: Export Private Key (with Passkey)</h4>
            <p className="text-muted-foreground mb-4"><strong>Important:</strong> You must complete passkey authentication first to get the signature data. This typically happens in your frontend using the WebAuthn API.</p>
            <h5 className="font-semibold mb-2">Request:</h5>
            <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
              <code className="language-bash mt-5">{`curl -X POST https://api.zendfi.tech/api/v1/merchants/me/wallet/export \\
  -H "Authorization: Bearer zfi_test_abc123..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "passkey_signature": {
      "credential_id": "ABC123...XYZ789",
      "authenticator_data": [73, 150, 13, 229, ...],
      "signature": [48, 69, 2, 33, ...],
      "client_data_json": [123, 34, 116, 121, ...]
    }
  }'`}</code>
            </pre>
            <h5 className="font-semibold mb-2">Response:</h5>
            <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
              <code className="language-json mt-5">{`{
  "wallet_address": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
  "private_key_base58": "5Kz8LWvZh7NYjJvPhHGYnNrB2rKqb2nnU6NJR4zHYQZ3k2PxMhR7vA8sB9cC0dD1eE2fF3gG4hH5iI6jJ7kK8lL9",
  "public_key": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
  "warning": "⚠️ CRITICAL: Store this private key securely. Anyone with access to this key has FULL CONTROL of your wallet and funds. Never share it publicly or commit it to version control.",
  "export_timestamp": "2025-10-27T10:30:45Z"
}`}</code>
            </pre>
            <p className="text-sm text-muted-foreground mb-3"><strong>What To Do With Your Private Key:</strong></p>
            <ol className="space-y-1 text-sm text-muted-foreground list-decimal list-inside">
              <li><strong>Save it securely</strong>: Password manager, encrypted file, or hardware security module</li>
              <li><strong>Never share it</strong>: Not in emails, Slack, or any public place</li>
              <li><strong>Don't commit to Git</strong>: Add to .gitignore if storing locally</li>
              <li><strong>Consider offline storage</strong>: USB drive in a safe, paper backup</li>
              <li><strong>Import to other wallets</strong>: Can use in Phantom, Solflare, Solana CLI, etc.</li>
            </ol>
            <p className="text-sm text-muted-foreground"><strong>Audit Trail:</strong></p>
            <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside">
              <li>Export is logged in <code>audit_logs</code> table</li>
              <li>Includes merchant ID, IP address, timestamp</li>
              <li>Monitor exports via admin dashboard</li>
            </ul>
          </Card>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-bold">Error Responses</h3>

          <Card className="p-4">
            <h4 className="font-semibold mb-2">400 Bad Request - No MPC Wallet</h4>
            <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
              <code className="language-json mt-5">{`{
  "error": "MPC wallet not found",
  "message": "This merchant doesn't have an MPC wallet. Only MPC wallets support key export."
}`}</code>
            </pre>
            <p className="text-sm text-muted-foreground">Solution: Only MPC wallets can export keys. Contact support if you need access to custodial wallet keys.</p>
          </Card>

          <Card className="p-4">
            <h4 className="font-semibold mb-2">401 Unauthorized - Invalid Passkey</h4>
            <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
              <code className="language-json mt-5">{`{
  "error": "Failed to export key: Invalid passkey signature"
}`}</code>
            </pre>
            <p className="text-sm text-muted-foreground">Solution: 
- Ensure you completed passkey authentication correctly
- Check that credential_id matches your registered passkey
- Verify signature data is correct
- Try authenticating again</p>
          </Card>

          <Card className="p-4">
            <h4 className="font-semibold mb-2">500 Internal Server Error</h4>
            <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
              <code className="language-json mt-5">{`{
  "error": "Failed to export key: Failed to combine shards"
}`}</code>
            </pre>
            <p className="text-sm text-muted-foreground">Solution: 
- Internal error combining MPC shards
- Contact support with the timestamp
- This is rare - may indicate network issues with Lit Protocol</p>
          </Card>
        </div>
      </div>

      {/* Withdraw Funds */}
      <div id="withdraw-funds" className="space-y-4">
        <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2">
          Withdraw Funds
        </h2>
        <p className="text-muted-foreground">
          Transfer SOL or USDC from your MPC wallet to any external Solana address! Perfect for moving funds to exchanges, other wallets, or cashing out. 💸
        </p>

        <Card className="p-6">
          <h3 className="text-lg font-bold mb-2">Endpoint</h3>
          <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
            <code>POST /api/v1/merchants/me/wallet/withdraw</code>
          </pre>

          <h3 className="text-lg font-bold mb-2">Authentication</h3>
          <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
            <code>Authorization: Bearer YOUR_API_KEY</code>
          </pre>
          <p className="text-sm text-muted-foreground mb-4">Or use session cookie (if logged into merchant dashboard).</p>

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
                  <td className="p-2"><code>to_address</code></td>
                  <td className="p-2">string</td>
                  <td className="p-2"><strong>Yes</strong></td>
                  <td className="p-2">Destination Solana wallet address (base58)</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2"><code>amount</code></td>
                  <td className="p-2">number</td>
                  <td className="p-2"><strong>Yes</strong></td>
                  <td className="p-2">Amount to withdraw (must be above 0)</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2"><code>token</code></td>
                  <td className="p-2">string</td>
                  <td className="p-2"><strong>Yes</strong></td>
                  <td className="p-2">Token to withdraw ("Sol" or "Usdc")</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2"><code>passkey_signature</code></td>
                  <td className="p-2">object</td>
                  <td className="p-2"><strong>Yes</strong></td>
                  <td className="p-2">Passkey signature for authentication</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2"><code>passkey_signature.credential_id</code></td>
                  <td className="p-2">string</td>
                  <td className="p-2"><strong>Yes</strong></td>
                  <td className="p-2">Your passkey credential ID</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2"><code>passkey_signature.authenticator_data</code></td>
                  <td className="p-2">array</td>
                  <td className="p-2"><strong>Yes</strong></td>
                  <td className="p-2">Authenticator data bytes</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2"><code>passkey_signature.signature</code></td>
                  <td className="p-2">array</td>
                  <td className="p-2"><strong>Yes</strong></td>
                  <td className="p-2">Signature bytes</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2"><code>passkey_signature.client_data_json</code></td>
                  <td className="p-2">array</td>
                  <td className="p-2"><strong>Yes</strong></td>
                  <td className="p-2">Client data JSON bytes</td>
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
                  <td className="p-2"><code>success</code></td>
                  <td className="p-2">boolean</td>
                  <td className="p-2">Whether withdrawal succeeded</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2"><code>transaction_signature</code></td>
                  <td className="p-2">string</td>
                  <td className="p-2">Solana transaction signature (base58)</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2"><code>from_address</code></td>
                  <td className="p-2">string</td>
                  <td className="p-2">Your merchant wallet address</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2"><code>to_address</code></td>
                  <td className="p-2">string</td>
                  <td className="p-2">Destination address</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2"><code>amount</code></td>
                  <td className="p-2">number</td>
                  <td className="p-2">Amount withdrawn</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2"><code>token</code></td>
                  <td className="p-2">string</td>
                  <td className="p-2">Token type ("Sol" or "Usdc")</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2"><code>explorer_url</code></td>
                  <td className="p-2">string</td>
                  <td className="p-2">Solscan URL to view transaction</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>

        <div className="space-y-6">
          <h3 className="text-lg font-bold">Withdrawal Examples</h3>

          {/* Example 1 */}
          <Card className="p-6 border-primary/50">
            <h4 className="text-lg font-bold mb-3">Example 1: Withdraw SOL to Phantom Wallet</h4>
            <h5 className="font-semibold mb-2">Request:</h5>
            <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
              <code className="language-bash mt-5">{`curl -X POST https://api.zendfi.tech/api/v1/merchants/me/wallet/withdraw \\
  -H "Authorization: Bearer zfi_test_abc123..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "to_address": "9yKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsW",
    "amount": 0.5,
    "token": "Sol",
    "passkey_signature": {
      "credential_id": "ABC123...XYZ789",
      "authenticator_data": [73, 150, 13, 229, ...],
      "signature": [48, 69, 2, 33, ...],
      "client_data_json": [123, 34, 116, 121, ...]
    }
  }'`}</code>
            </pre>
            <h5 className="font-semibold mb-2">Response:</h5>
            <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
              <code className="language-json mt-5">{`{
  "success": true,
  "transaction_signature": "5KzZ8LWvZh7NYjJvPhHGYnNrB2rKqb2nnU6NJR4zHYQZ3k2PxMhR7vA8sB9cC0dD1eE2fF3gG4hH5iI6jJ7kK8",
  "from_address": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
  "to_address": "9yKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsW",
  "amount": 0.5,
  "token": "Sol",
  "explorer_url": "https://solscan.io/tx/5KzZ8LWvZh7NYjJvPhHGYnNrB2rKqb2nnU6NJR4zHYQZ..."
}`}</code>
            </pre>
            <p className="text-sm text-muted-foreground">
              <strong>What Happened:</strong>
            </p>
            <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside">
              <li>0.5 SOL withdrawn from your MPC wallet</li>
              <li>Sent to your Phantom wallet</li>
              <li>Transaction confirmed on-chain</li>
              <li>🔍 View on Solscan via <code>explorer_url</code></li>
            </ul>
          </Card>

          {/* Example 2 */}
          <Card className="p-6">
            <h4 className="text-lg font-bold mb-3">Example 2: Withdraw USDC to Exchange</h4>
            <h5 className="font-semibold mb-2">Request:</h5>
            <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
              <code className="language-bash mt-5">{`curl -X POST https://api.zendfi.tech/api/v1/merchants/me/wallet/withdraw \\
  -H "Authorization: Bearer zfi_live_xyz789..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "to_address": "BxKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsY",
    "amount": 1000.00,
    "token": "Usdc",
    "passkey_signature": {
      "credential_id": "DEF456...ABC789",
      "authenticator_data": [73, 150, 13, 229, ...],
      "signature": [48, 69, 2, 33, ...],
      "client_data_json": [123, 34, 116, 121, ...]
    }
  }'`}</code>
            </pre>
            <h5 className="font-semibold mb-2">Response:</h5>
            <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
              <code className="language-json mt-5">{`{
  "success": true,
  "transaction_signature": "6LzZ8LWvZh7NYjJvPhHGYnNrB2rKqb2nnU6NJR4zHYQZ3k2PxMhR7vA8sB9cC0dD1eE2fF3gG4hH5iI6jJ7kK9",
  "from_address": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
  "to_address": "BxKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsY",
  "amount": 1000.00,
  "token": "Usdc",
  "explorer_url": "https://solscan.io/tx/6LzZ8LWvZh7NYjJvPhHGYnNrB2rKqb2nnU6NJR4zHYQZ..."
}`}</code>
            </pre>
            <p className="text-sm text-muted-foreground">
              <strong>What Happened:</strong>
            </p>
            <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside">
              <li>1,000 USDC withdrawn from your MPC wallet</li>
              <li>Sent to your exchange deposit address</li>
              <li>USDC token account created automatically if needed</li>
              <li>Ready to cash out on the exchange!</li>
            </ul>
          </Card>

          {/* Example 3 */}
          <Card className="p-6">
            <h4 className="text-lg font-bold mb-3">Example 3: Withdraw Small Amount for Testing</h4>
            <h5 className="font-semibold mb-2">Request:</h5>
            <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
              <code className="language-bash mt-5">{`curl -X POST https://api.zendfi.tech/api/v1/merchants/me/wallet/withdraw \\
  -H "Authorization: Bearer zfi_test_abc123..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "to_address": "CzKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsZ",
    "amount": 0.01,
    "token": "Usdc",
    "passkey_signature": {
      "credential_id": "GHI789...DEF012",
      "authenticator_data": [73, 150, 13, 229, ...],
      "signature": [48, 69, 2, 33, ...],
      "client_data_json": [123, 34, 116, 121, ...]
    }
  }'`}</code>
            </pre>
            <h5 className="font-semibold mb-2">Response:</h5>
            <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
              <code className="language-json mt-5">{`{
  "success": true,
  "transaction_signature": "7LzZ8LWvZh7NYjJvPhHGYnNrB2rKqb2nnU6NJR4zHYQZ3k2PxMhR7vA8sB9cC0dD1eE2fF3gG4hH5iI6jJ7kL0",
  "from_address": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
  "to_address": "CzKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsZ",
  "amount": 0.01,
  "token": "Usdc",
  "explorer_url": "https://solscan.io/?cluster=devnet/tx/7LzZ8LWvZh7NYjJvPhHGYnNrB2rKqb2nnU6NJR4zHYQZ..."
}`}</code>
            </pre>
            <p className="text-sm text-muted-foreground">
              <strong>What This Shows:</strong>
            </p>
            <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside">
              <li>Test withdrawal of $0.01 USDC</li>
              <li>Perfect for testing before large amounts</li>
              <li>Devnet explorer URL (notice <code>?cluster=devnet</code>)</li>
              <li>Always test first!</li>
            </ul>
          </Card>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-bold">Withdrawal Error Responses</h3>

          <Card className="p-4">
            <h4 className="font-semibold mb-2">400 Bad Request - Invalid Amount</h4>
            <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
              <code className="language-json mt-5">{`{
  "error": "Amount must be greater than 0"
}`}</code>
            </pre>
            <p className="text-sm text-muted-foreground">Solution: Use positive amounts only (no zero or negative).</p>
          </Card>

          <Card className="p-4">
            <h4 className="font-semibold mb-2">400 Bad Request - Invalid Address</h4>
            <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
              <code className="language-json mt-5">{`{
  "error": "Invalid destination address"
}`}</code>
            </pre>
            <p className="text-sm text-muted-foreground">Solution: 
- Check that <code>to_address</code> is a valid Solana address
- Must be base58 format
- Cannot be empty or malformed</p>
          </Card>

          <Card className="p-4">
            <h4 className="font-semibold mb-2">400 Bad Request - No MPC Wallet</h4>
            <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
              <code className="language-json mt-5">{`{
  "error": "MPC wallet not found",
  "message": "This merchant doesn't have an MPC wallet."
}`}</code>
            </pre>
            <p className="text-sm text-muted-foreground">Solution: Only MPC wallets support API withdrawals. Contact support for custodial wallet withdrawals.</p>
          </Card>

          <Card className="p-4">
            <h4 className="font-semibold mb-2">401 Unauthorized - Invalid Passkey</h4>
            <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
              <code className="language-json mt-5">{`{
  "error": "Withdrawal failed: Invalid passkey signature"
}`}</code>
            </pre>
            <p className="text-sm text-muted-foreground">Solution:
- Complete passkey authentication correctly
- Ensure signature data is accurate
- Try authenticating again</p>
          </Card>

          <Card className="p-4">
            <h4 className="font-semibold mb-2">500 Internal Server Error - Insufficient Balance</h4>
            <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
              <code className="language-json mt-5">{`{
  "error": "Withdrawal failed: Insufficient balance"
}`}</code>
            </pre>
            <p className="text-sm text-muted-foreground">Solution:
- Check your balance with GET /api/v1/merchants/me/wallet
- Ensure you have enough for the withdrawal + transaction fee (~0.000005 SOL)
- For USDC: need SOL for transaction fees too</p>
          </Card>
        </div>
      </div>

      {/* Passkey Setup (MPC Wallets) */}
      <div id="passkey-setup-mpc-wallets" className="space-y-4">
        <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2">
          <Lock className="w-6 h-6 text-primary" />
          Passkey Setup (MPC Wallets)
        </h2>
        <p className="text-muted-foreground">
          If you created an MPC wallet, you <strong>must</strong> set up a passkey before you can export keys or withdraw funds. It's quick and easy - just like setting up Face ID!
        </p>

        <Card className="p-6">
          <h3 className="text-lg font-bold mb-3">Why Passkey?</h3>
          <ul className="space-y-2 text-muted-foreground list-disc list-inside">
            <li><strong>Secure</strong>: Uses biometric authentication (Face ID, Touch ID, Windows Hello)</li>
            <li><strong>No passwords</strong>: No passwords to remember or leak</li>
            <li><strong>Fast</strong>: Authenticate in seconds</li>
            <li><strong>Cross-device</strong>: Works on phone, laptop, hardware keys</li>
            <li><strong>Private</strong>: Biometric data never leaves your device</li>
          </ul>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-bold mb-3">Setup Flow</h3>
          <ol className="space-y-2 text-muted-foreground list-decimal list-inside">
            <li>Create merchant account with <code>wallet_generation_method: "mpc_passkey"</code></li>
            <li>API returns <code>passkey_setup_url</code> in response</li>
            <li>Visit the setup URL in a browser</li>
            <li>Click "Register Passkey" button</li>
            <li>Complete Face ID/Touch ID authentication</li>
            <li>MPC wallet is created automatically (5-10 seconds)</li>
            <li>You're ready to use wallet management APIs!</li>
          </ol>
        </Card>

        <div className="space-y-6">
          <h3 className="text-lg font-bold">Passkey Setup Endpoints</h3>

          {/* 1. Get Passkey Setup Page */}
          <Card className="p-6">
            <h4 className="text-lg font-bold mb-3">1. Get Passkey Setup Page</h4>
            <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
              <code className="language-json mt-5">{`GET /merchants/{merchant_id}/setup-passkey`}</code>
            </pre>
            <p className="text-sm text-muted-foreground mb-4"><strong>Authentication:</strong> None (public URL)</p>
            <p className="text-sm text-muted-foreground mb-4"><strong>What It Does:</strong></p>
            <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside">
              <li>Displays a beautiful setup page with instructions</li>
              <li>Guides you through passkey registration</li>
              <li>Shows real-time status updates</li>
              <li>Automatically creates MPC wallet after passkey registration</li>
            </ul>
            <p className="text-sm text-muted-foreground"><strong>How To Use:</strong> When you create an MPC merchant, you'll receive a <code>passkey_setup_url</code> like:</p>
            <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
              <code>https://api.zendfi.tech/merchants/550e8400-e29b-41d4-a716-446655440000/setup-passkey</code>
            </pre>
            <p className="text-sm text-muted-foreground">Just open it in a browser and follow the instructions!</p>
          </Card>

          {/* 2. Check Passkey Status */}
          <Card className="p-6">
            <h4 className="text-lg font-bold mb-3">2. Check Passkey Status</h4>
            <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
              <code className="language-json mt-5">{`GET /api/merchants/{merchant_id}/passkey-status`}</code>
            </pre>
            <p className="text-sm text-muted-foreground mb-4"><strong>Authentication:</strong> None (public endpoint for merchant onboarding)</p>
            <h5 className="font-semibold mb-2">Response:</h5>
            <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
              <code className="language-json mt-5">{`{
  "has_passkey": true,
  "has_mpc_wallet": true,
  "wallet_address": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU"
}`}</code>
            </pre>
            <p className="text-sm text-muted-foreground"><strong>Use Case:</strong> Poll this endpoint to check if passkey setup is complete.</p>
          </Card>

          {/* 3. WebAuthn Registration */}
          <Card className="p-6">
            <h4 className="text-lg font-bold mb-3">3. WebAuthn Registration (Programmatic)</h4>
            <p className="text-sm text-muted-foreground mb-4">For advanced users who want to integrate passkey setup into their own UI:</p>

            <h5 className="font-semibold mb-2">Start Registration</h5>
            <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
              <code>POST /api/v1/webauthn/register/start</code>
            </pre>
            <h5 className="font-semibold mb-2">Request:</h5>
            <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
              <code className="language-json mt-5">{`{
  "merchant_id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "merchant@example.com",
  "display_name": "Awesome Coffee Shop"
}`}</code>
            </pre>
            <h5 className="font-semibold mb-2">Response:</h5>
            <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
              <code className="language-json mt-5">{`{
  "challenge_id": "660e8400-e29b-41d4-a716-446655440001",
  "options": {
    "challenge": "abc123...",
    "rp": {
      "name": "ZendFi",
      "id": "api.zendfi.tech"
    },
    "user": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "merchant@example.com",
      "displayName": "Awesome Coffee Shop"
    },
    "pubKeyCredParams": [...],
    "timeout": 300000,
    "attestation": "none",
    "authenticatorSelection": {
      "residentKey": "required",
      "userVerification": "required"
    }
  }
}`}</code>
            </pre>

            <h5 className="font-semibold mb-2">Finish Registration</h5>
            <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
              <code>POST /api/v1/webauthn/register/finish</code>
            </pre>
            <h5 className="font-semibold mb-2">Request:</h5>
            <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
              <code className="language-json mt-5">{`{
  "challenge_id": "660e8400-e29b-41d4-a716-446655440001",
  "credential": {
    "id": "ABC123...XYZ789",
    "rawId": "ABC123...XYZ789",
    "response": {
      "clientDataJSON": "eyJ0eXBlI...",
      "attestationObject": "o2NmbXRk..."
    },
    "type": "public-key"
  }
}`}</code>
            </pre>
            <h5 className="font-semibold mb-2">Response:</h5>
            <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
              <code className="language-json mt-5">{`{
  "credential_id": "ABC123...XYZ789",
  "success": true
}`}</code>
            </pre>
            <p className="text-sm text-muted-foreground"><strong>What Happens Next:</strong></p>
            <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside">
              <li>Passkey is stored in database</li>
              <li>MPC wallet creation starts automatically (background job)</li>
              <li>Wallet ready in 5-10 seconds</li>
            </ul>
          </Card>

          {/* 4. WebAuthn Authentication */}
          <Card className="p-6">
            <h4 className="text-lg font-bold mb-3">4. WebAuthn Authentication (For Withdrawals/Exports)</h4>
            <p className="text-sm text-muted-foreground mb-4">When withdrawing funds or exporting keys, you'll need to authenticate with your passkey:</p>

            <h5 className="font-semibold mb-2">Start Authentication</h5>
            <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
              <code>POST /api/v1/webauthn/auth/start</code>
            </pre>
            <h5 className="font-semibold mb-2">Request:</h5>
            <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
              <code className="language-json mt-5">{`{
  "merchant_id": "550e8400-e29b-41d4-a716-446655440000"
}`}</code>
            </pre>
            <h5 className="font-semibold mb-2">Response:</h5>
            <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
              <code className="language-json mt-5">{`{
  "challenge_id": "770e8400-e29b-41d4-a716-446655440002",
  "options": {
    "challenge": "def456...",
    "rpId": "api.zendfi.tech",
    "allowCredentials": [
      {
        "type": "public-key",
        "id": "ABC123...XYZ789"
      }
    ],
    "userVerification": "required",
    "timeout": 300000
  }
}`}</code>
            </pre>

            <h5 className="font-semibold mb-2">Finish Authentication</h5>
            <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
              <code>POST /api/v1/webauthn/auth/finish</code>
            </pre>
            <h5 className="font-semibold mb-2">Request:</h5>
            <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
              <code className="language-json mt-5">{`{
  "challenge_id": "770e8400-e29b-41d4-a716-446655440002",
  "credential": {
    "id": "ABC123...XYZ789",
    "rawId": "ABC123...XYZ789",
    "response": {
      "clientDataJSON": "eyJ0eXBlI...",
      "authenticatorData": "SZYN5YgOjGh0NBc...",
      "signature": "MEUCIQCqL...",
      "userHandle": "550e8400..."
    },
    "type": "public-key"
  }
}`}</code>
            </pre>
            <h5 className="font-semibold mb-2">Response:</h5>
            <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
              <code className="language-json mt-5">{`{
  "success": true,
  "credential_id": "ABC123...XYZ789",
  "authenticator_data": [73, 150, 13, 229, ...],
  "signature": [48, 69, 2, 33, ...],
  "client_data_json": [123, 34, 116, 121, ...]
}`}</code>
            </pre>
            <p className="text-sm text-muted-foreground"><strong>Use This Response:</strong> The <code>authenticator_data</code>, <code>signature</code>, and <code>client_data_json</code> fields become your <code>passkey_signature</code> for withdrawal/export requests!</p>
          </Card>
        </div>
      </div>

      {/* Security Best Practices */}
      <div id="security-best-practices" className="space-y-4">
        <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2">
          <Shield className="w-6 h-6 text-primary" />
          Security Best Practices
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-bold mb-3">DO</h3>
            <ul className="space-y-2 text-muted-foreground list-disc list-inside">
              <li><strong>Store API keys securely</strong>: Environment variables, secrets managers</li>
              <li><strong>Use passkey for sensitive ops</strong>: Always require passkey for exports/withdrawals</li>
              <li><strong>Monitor wallet balance</strong>: Check regularly via API</li>
              <li><strong>Test withdrawals first</strong>: Use small amounts on devnet</li>
              <li><strong>Audit export logs</strong>: Monitor who exported keys and when</li>
              <li><strong>Use HTTPS</strong>: Always use HTTPS for API requests</li>
              <li><strong>Backup exported keys</strong>: Store in password manager or encrypted storage</li>
              <li><strong>Verify addresses</strong>: Double-check destination addresses before withdrawals</li>
            </ul>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-bold mb-3">DON'T</h3>
            <ul className="space-y-2 text-muted-foreground list-disc list-inside">
              <li><strong>Don't share private keys</strong>: Never share exported private keys</li>
              <li><strong>Don't commit keys to Git</strong>: Add to .gitignore</li>
              <li><strong>Don't hardcode addresses</strong>: Use environment variables</li>
              <li><strong>Don't skip testing</strong>: Always test on devnet first</li>
              <li><strong>Don't ignore audit logs</strong>: Monitor for suspicious activity</li>
              <li><strong>Don't withdraw all funds</strong>: Keep some SOL for transaction fees</li>
              <li><strong>Don't rush</strong>: Take time to verify amounts and addresses</li>
            </ul>
          </Card>
        </div>
      </div>

      {/* Testing */}
      <div id="testing" className="space-y-4">
        <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2">
          <TestTube className="w-6 h-6 text-primary" />
          Testing
        </h2>

        <Card className="p-6 border-primary/50">
          <h3 className="text-lg font-bold mb-3">Step 1: Create MPC Wallet (Devnet)</h3>
          <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
            <code className="language-bash mt-5">{`curl -X POST https://api.zendfi.tech/api/v1/merchants \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Test Merchant",
    "email": "test@example.com",
    "business_address": "123 Test St",
    "wallet_generation_method": "mpc_passkey",
    "webhook_url": "https://webhook.site/your-unique-url"
  }'`}</code>
          </pre>
          <p className="text-sm text-muted-foreground">Response includes:
- <code>passkey_setup_url</code>: Visit this to set up your passkey
- <code>api_key</code>: Save this for API requests</p>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-bold mb-3">Step 2: Complete Passkey Setup</h3>
          <ol className="space-y-1 text-sm text-muted-foreground list-decimal list-inside">
            <li>Open <code>passkey_setup_url</code> in browser</li>
            <li>Click "Register Passkey"</li>
            <li>Complete Face ID/Touch ID</li>
            <li>Wait 5-10 seconds for MPC wallet creation</li>
            <li>Save your <code>credential_id</code> from the response</li>
          </ol>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-bold mb-3">Step 3: Check Wallet Balance</h3>
          <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
            <code className="language-bash mt-5">{`curl https://api.zendfi.tech/api/v1/merchants/me/wallet \\
  -H "Authorization: Bearer YOUR_API_KEY"`}</code>
          </pre>
          <p className="text-sm text-muted-foreground">You should see:
- <code>has_mpc_wallet: true</code>
- <code>wallet_address</code>: Your new MPC wallet
- <code>sol_balance: 0</code> (get some devnet SOL from faucet!)</p>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-bold mb-3">Step 4: Get Devnet SOL</h3>
          <p className="text-sm text-muted-foreground">Visit https://faucet.solana.com and request devnet SOL to your <code>wallet_address</code>.</p>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-bold mb-3">Step 5: Test Withdrawal</h3>
          <p className="text-sm text-muted-foreground mb-4">Use the WebAuthn authentication flow to get a passkey signature, then:</p>
          <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
            <code className="language-bash mt-5">{`curl -X POST https://api.zendfi.tech/api/v1/merchants/me/wallet/withdraw \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "to_address": "YOUR_PHANTOM_WALLET",
    "amount": 0.01,
    "token": "Sol",
    "passkey_signature": {
      "credential_id": "ABC123...",
      "authenticator_data": [...],
      "signature": [...],
      "client_data_json": [...]
    }
  }'`}</code>
          </pre>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-bold mb-3">Step 6: Verify on Solscan</h3>
          <p className="text-sm text-muted-foreground">Open the <code>explorer_url</code> from the response to see your transaction on-chain! 🎉</p>
        </Card>
      </div>

      {/* Code Examples */}
      <div className="space-y-6">
        <h2 className="text-xl md:text-2xl font-bold">Code Examples</h2>

        {/* Node.js */}
        <Card className="p-6">
          <h3 className="text-lg font-bold mb-3">Node.js: Check Balance and Withdraw</h3>
          <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
            <code className="language-json mt-5">{`const axios = require('axios');

const ZENDFI_API_KEY = process.env.ZENDFI_API_KEY;
const BASE_URL = 'https://api.zendfi.tech';

async function checkWalletBalance() {
  try {
    const response = await axios.get(
      \`\${BASE_URL}/api/v1/merchants/me/wallet\`,
      {
        headers: {
          'Authorization': \`Bearer \${ZENDFI_API_KEY}\`
        }
      }
    );

    const wallet = response.data;
    console.log('💰 Wallet Balance:');
    console.log(\`  Address: \${wallet.wallet_address}\`);
    console.log(\`  SOL: \${wallet.sol_balance} SOL\`);
    console.log(\`  USDC: \${wallet.usdc_balance} USDC\`);
    console.log(\`  Type: \${wallet.wallet_type}\`);
    console.log(\`  MPC: \${wallet.has_mpc_wallet ? 'Yes' : 'No'}\`);

    return wallet;
  } catch (error) {
    console.error('Failed to check balance:', error.response?.data || error.message);
    throw error;
  }
}

async function withdrawFunds(toAddress, amount, token, passkeySignature) {
  try {
    const response = await axios.post(
      \`\${BASE_URL}/api/v1/merchants/me/wallet/withdraw\`,
      {
        to_address: toAddress,
        amount: amount,
        token: token, // 'Sol' or 'Usdc'
        passkey_signature: passkeySignature
      },
      {
        headers: {
          'Authorization': \`Bearer \${ZENDFI_API_KEY}\`,
          'Content-Type': 'application/json'
        }
      }
    );

    const result = response.data;
    console.log(' Withdrawal Successful!');
    console.log(\`  Amount: \${result.amount} \${result.token}\`);
    console.log(\`  From: \${result.from_address}\`);
    console.log(\`  To: \${result.to_address}\`);
    console.log(\`  Signature: \${result.transaction_signature}\`);
    console.log(\`  Explorer: \${result.explorer_url}\`);

    return result;
  } catch (error) {
    console.error('Withdrawal failed:', error.response?.data || error.message);
    throw error;
  }
}

// Example usage
(async () => {
  // Check balance
  const wallet = await checkWalletBalance();

  // Withdraw if MPC wallet
  if (wallet.has_mpc_wallet && wallet.sol_balance > 0.01) {
    // Note: You need to get passkeySignature from WebAuthn authentication
    // This is typically done in the browser frontend
    console.log('\\nℹ️ To withdraw, authenticate with your passkey first!');
  }
})();`}</code>
          </pre>
        </Card>

        {/* Python */}
        <Card className="p-6">
          <h3 className="text-lg font-bold mb-3">Python: Complete Wallet Management</h3>
          <pre className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm">
            <code className="language-java mt-5script">{`import requests
import os

ZENDFI_API_KEY = os.getenv('ZENDFI_API_KEY')
BASE_URL = 'https://api.zendfi.tech'

def check_wallet_balance():
    \"""Check wallet balance and info\"""
    response = requests.get(
        f'{BASE_URL}/api/v1/merchants/me/wallet',
        headers={
            'Authorization': f'Bearer {ZENDFI_API_KEY}'
        }
    )
    
    if response.status_code == 200:
        wallet = response.json()
        print(' Wallet Balance:')
        print(f'  Address: {wallet["wallet_address"]}')
        print(f'  SOL: {wallet["sol_balance"]} SOL')
        print(f'  USDC: {wallet["usdc_balance"]} USDC')
        print(f'  Type: {wallet["wallet_type"]}')
        print(f'  MPC: {"Yes" if wallet["has_mpc_wallet"] else "No"}')
        return wallet
    else:
        print(f'Failed to check balance: {response.json()}')
        return None

def export_private_key(passkey_signature):
    \"""Export private key (MPC wallets only)\"""
    response = requests.post(
        f'{BASE_URL}/api/v1/merchants/me/wallet/export',
        headers={
            'Authorization': f'Bearer {ZENDFI_API_KEY}',
            'Content-Type': 'application/json'
        },
        json={
            'passkey_signature': passkey_signature
        }
    )
    
    if response.status_code == 200:
        key_data = response.json()
        print(' Private Key Exported:')
        print(f'  Wallet: {key_data["wallet_address"]}')
        print(f'  Private Key: {key_data["private_key_base58"]}')
        print(f'   WARNING: {key_data["warning"]}')
        print(f'  Exported: {key_data["export_timestamp"]}')
        return key_data
    else:
        print(f'Export failed: {response.json()}')
        return None

def withdraw_funds(to_address, amount, token, passkey_signature):
    \"""Withdraw SOL or USDC to external address\"""
    response = requests.post(
        f'{BASE_URL}/api/v1/merchants/me/wallet/withdraw',
        headers={
            'Authorization': f'Bearer {ZENDFI_API_KEY}',
            'Content-Type': 'application/json'
        },
        json={
            'to_address': to_address,
            'amount': amount,
            'token': token,  # 'Sol' or 'Usdc'
            'passkey_signature': passkey_signature
        }
    )
    
    if response.status_code == 200:
        result = response.json()
        print(' Withdrawal Successful!')
        print(f'  Amount: {result["amount"]} {result["token"]}')
        print(f'  From: {result["from_address"]}')
        print(f'  To: {result["to_address"]}')
        print(f'  Signature: {result["transaction_signature"]}')
        print(f'  Explorer: {result["explorer_url"]}')
        return result
    else:
        print(f'Withdrawal failed: {response.json()}')
        return None

# Example usage
if __name__ == '__main__':
    # Check balance
    wallet = check_wallet_balance()
    
    # Only MPC wallets can withdraw via API
    if wallet and wallet['has_mpc_wallet']:
        print('\\nℹ️ This is an MPC wallet - you can withdraw funds!')
        print('ℹ️ Authenticate with your passkey first to get the signature.')
    else:
        print('\\nℹ️ This is not an MPC wallet.')
        print('ℹ️ Contact support for custodial wallet withdrawals.')`}</code>
          </pre>
        </Card>
      </div>

      {/* Summary & Next Steps */}
      <Card className="p-6 bg-primary/5 border-primary/20">
        <h2 className="text-xl md:text-2xl font-bold mb-4">Summary & Next Steps</h2>
        <p className="text-muted-foreground mb-6">Congratulations! You now know how to manage your ZendFi wallet like a pro!</p>
        <p className="text-muted-foreground mb-6"><strong>What You Learned:</strong></p>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside">
          <li>Check wallet balance for any wallet type</li>
          <li>Export private keys from MPC wallets (with passkey auth)</li>
          <li>Withdraw SOL and USDC to external addresses</li>
          <li>Set up passkeys for secure authentication</li>
          <li>Use WebAuthn API for programmatic integration</li>
          <li>Follow security best practices</li>
        </ul>
        <h3 className="text-lg font-bold mb-3">Next Steps:</h3>
        <ol className="space-y-2 text-muted-foreground list-decimal list-inside">
          <li>Explore <a href="#advanced-features" className="hover:text-primary transition-colors">Advanced Features</a> for payment splits, subscriptions, and more</li>
          <li>Review <a href="#api-reference" className="hover:text-primary transition-colors">API Reference</a> for complete endpoint documentation</li>
          <li>Check out <a href="#payment-links" className="hover:text-primary transition-colors">Payment Links</a> for reusable payment URLs</li>
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
