"use client"

import React, { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  ChevronRight,
  Book,
  Code,
  Zap,
  Shield,
  Wallet,
  Terminal,
  Package,
  RefreshCw,
  Calendar,
  FileText,
  Users,
  Webhook,

} from "lucide-react"
import { DocsHeader } from "./_components/DocsHeader"
import { DocsSidebar } from "./_components/Chat-sider"
import { docData } from "@/lib/doc-json"

function DocsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [ isSidebarOpen, setIsSidebarOpen] = useState(false)

  const navigationSections = [
    {
      title: "Getting Started",
      id: "getting-started",
      items: [{ label: "Getting Started", href: "/docs", icon: Book }],
    },
    {
      title: "API & Integration",
      id: "api-integration",
      items: [
        { label: "Payments", href: "/docs/api", icon: Code },
        { label: "Payment Splits", href: "/docs/advanced", icon: Users },
        { label: "Subscriptions", href: "/docs/api/subscriptions", icon: RefreshCw },
        { label: "Escrows", href: "/docs/api/escrows", icon: Shield },
        { label: "Installments", href: "/docs/api/installments", icon: Calendar },
        { label: "Invoices", href: "/docs/api/invoices", icon: FileText },
        { label: "Payment Links", href: "/docs/payment-links", icon: Zap },
        { label: "Webhooks", href: "/docs/webhooks", icon: Webhook },
      ],
    },
    {
      title: "Features",
      id: "features",
      items: [{ label: "Wallet Management", href: "/docs/wallet-management", icon: Wallet }],
    },
    {
      title: "Developer Tools",
      id: "developer-tools",
      items: [
        { label: "SDKs & Libraries", href: "/docs/sdks", icon: Package },
        { label: "CLI", href: "/docs/cli", icon: Terminal },
      ],
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="bg-white z-40 border-b">
          <DocsHeader onChatToggle={() => setIsChatOpen(!isChatOpen)} />
      </header>

      <div className="flex flex-1 relative">
        {/* Sidebar */}
        <aside
        className={`
          fixed left-0 top-16 h-[calc(100vh-4rem)] w-68 bg-white border-r border-border
          overflow-y-auto transition-transform duration-300
          ${isSidebarOpen ? "translate-x-0 z-50" : "-translate-x-full"}
          md:translate-x-0 md:z-30
        `}
      >
        <nav className="p-4 space-y-6">
          {navigationSections.map((section) => (
            <div key={section.id}>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-3">
                {section.title}
              </h3>
              <div className="space-y-1">
                {section.items.map((item) => {
                  const isActive = pathname === item.href
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsSidebarOpen(false)}
                      className={`
                        flex items-center gap-2 px-3 py-2 text-sm rounded-lg
                        transition-colors group
                        ${
                          isActive
                            ? "bg-accent text-accent-foreground font-medium"
                            : "text-foreground hover:bg-secondary"
                        }
                      `}
                    >
                      {Icon && (
                        <Icon className={`w-4 h-4 ${isActive ? "text-accent-foreground" : "text-muted-foreground group-hover:text-foreground"}`} />
                      )}
                      <span>{item.label}</span>
                      <ChevronRight className={`w-4 h-4 ml-auto transition-opacity ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`} />
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>
      </aside>
        <main className=" md:ml-64 min-h-screen pt-20 sm:pt-24 md:pt-16">
          <div className="max-w-screen lg:max-w-5xl mx-auto flex-1 p-4 sm:p-6 lg:p-10">
            {children}
          </div>
        </main>

        {/* Chat Sidebar */}
        <DocsSidebar
          docData={docData}
          isOpen={isChatOpen}
          onToggle={() => setIsChatOpen(!isChatOpen)}
        />
      </div>
    </div>
  )
}

export default DocsLayout