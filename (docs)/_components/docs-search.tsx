"use client"

import { useEffect, useState } from "react"
import { CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command"
import { Search, BookOpen, Code, Link2, Wallet, Webhook, Zap, CreditCard, Calendar, Shield, FileText } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"

// Types
interface SearchResult {
  id: string
  title: string
  description: string
  category: string
  route: string
  icon?: any
  badge?: string
}

interface DocsSearchProps {
  docsData: any
}

export function DocsSearch({ docsData }: DocsSearchProps) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")

  // Open dialog with Ctrl + K or Cmd + K
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey))) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  // Get icon based on route or content type
  const getIcon = (route: string, title: string) => {
    if (route.includes("getting-started")) return BookOpen
    if (route.includes("/api")) return Code
    if (route.includes("payment-links")) return Link2
    if (route.includes("wallet")) return Wallet
    if (route.includes("webhooks")) return Webhook
    if (route.includes("advanced")) return Zap
    if (title.includes("Subscription")) return Calendar
    if (title.includes("Escrow")) return Shield
    if (title.includes("Invoice")) return FileText
    if (title.includes("Payment")) return CreditCard
    return BookOpen
  }

  // Helper to extract text from nested objects/arrays
  const extractText = (value: any): string => {
    if (typeof value === 'string') return value
    if (typeof value === 'number') return String(value)
    if (Array.isArray(value)) return value.map(extractText).join(' ')
    if (value && typeof value === 'object') {
      return Object.values(value).map(extractText).join(' ')
    }
    return ''
  }

  // Build comprehensive search index
  const buildSearchIndex = (): SearchResult[] => {
    const results: SearchResult[] = []
    let resultId = 0

    // Ensure docsData is an array
    const dataArray = Array.isArray(docsData) ? docsData : []

    dataArray.forEach((doc) => {
      const docIcon = getIcon(doc.route || '', doc.title || '')

      // Add main document
      results.push({
        id: `doc-${resultId++}`,
        title: doc.title,
        description: doc.description || "Documentation page",
        category: "Pages",
        route: doc.route,
        icon: docIcon
      })

      // Handle different content structures
      if (doc.content) {
        const content = doc.content

        // Getting Started specific
        if (content.steps) {
          content.steps.forEach((step: any) => {
            results.push({
              id: `step-${resultId++}`,
              title: `Step ${step.step}: ${step.title}`,
              description: step.endpoint || "Setup step",
              category: `${doc.title} - Steps`,
              route: `${doc.route}#step-${step.step}`,
              icon: docIcon
            })

            // Wallet methods
            if (step.wallet_methods) {
              step.wallet_methods.forEach((method: any) => {
                results.push({
                  id: `wallet-${resultId++}`,
                  title: method.name,
                  description: method.description,
                  category: "Wallet Types",
                  route: `${doc.route}#wallet-methods`,
                  badge: method.type
                })
              })
            }
          })
        }

        // Requirements
        if (content.requirements?.list) {
          content.requirements.list.forEach((req: string) => {
            results.push({
              id: `req-${resultId++}`,
              title: req,
              description: "Required for setup",
              category: "Requirements",
              route: `${doc.route}#requirements`
            })
          })
        }
      }

      // Handle sections array (Payment Links, Webhooks, Advanced Features)
      if (doc.sections) {
        doc.sections.forEach((section: any) => {
          // Section heading
          if (section.heading || section.title || section.name) {
            const sectionTitle = section.heading || section.title || section.name
            results.push({
              id: `section-${resultId++}`,
              title: sectionTitle,
              description: section.content || section.description || "",
              category: `${doc.title} - Sections`,
              route: `${doc.route}#${sectionTitle.toLowerCase().replace(/\s+/g, "-")}`,
              icon: getIcon(doc.route, sectionTitle),
              badge: section.status
            })
          }

          // Endpoints
          if (section.endpoints) {
            section.endpoints.forEach((endpoint: any) => {
              const method = endpoint.method || ""
              const path = endpoint.path || ""
              results.push({
                id: `endpoint-${resultId++}`,
                title: `${method} ${path}`,
                description: endpoint.description || endpoint.name || "",
                category: `${doc.title} - Endpoints`,
                route: `${doc.route}#endpoints`,
                badge: method,
                icon: Code
              })

              // Endpoint examples
              if (endpoint.examples) {
                endpoint.examples.forEach((example: any) => {
                  results.push({
                    id: `example-${resultId++}`,
                    title: example.title,
                    description: `Example for ${method} ${path}`,
                    category: `${doc.title} - Examples`,
                    route: `${doc.route}#examples`
                  })
                })
              }
            })
          }

          // Use cases
          if (section.use_cases) {
            section.use_cases.forEach((useCase: string) => {
              results.push({
                id: `usecase-${resultId++}`,
                title: useCase,
                description: "Use case example",
                category: `${doc.title} - Use Cases`,
                route: `${doc.route}#use-cases`
              })
            })
          }

          // Features
          if (section.features) {
            section.features.forEach((feature: string) => {
              results.push({
                id: `feature-${resultId++}`,
                title: feature,
                description: "Feature",
                category: `${doc.title} - Features`,
                route: `${doc.route}#features`
              })
            })
          }

          // Wallet types (Wallet Management)
          if (section.wallet_types) {
            section.wallet_types.forEach((wallet: any) => {
              results.push({
                id: `wallet-type-${resultId++}`,
                title: wallet.name,
                description: wallet.features ? wallet.features[0] : "",
                category: "Wallet Types",
                route: `${doc.route}#wallet-types`,
                icon: Wallet
              })
            })
          }

          // Webhook events
          if (section.content?.events) {
            section.content.events.forEach((event: any) => {
              results.push({
                id: `event-${resultId++}`,
                title: event.event_type,
                description: event.description,
                category: "Webhook Events",
                route: `${doc.route}#events`,
                icon: Webhook
              })
            })
          }

          // Advanced features - nested endpoints
          if (section.endpoints && Array.isArray(section.endpoints)) {
            section.endpoints.forEach((endpoint: any) => {
              results.push({
                id: `adv-endpoint-${resultId++}`,
                title: `${endpoint.method} ${endpoint.path}`,
                description: endpoint.description || endpoint.name,
                category: `${section.name || section.title} - API`,
                route: `${doc.route}#${(section.name || section.title).toLowerCase().replace(/\s+/g, "-")}`,
                badge: endpoint.method,
                icon: Code
              })
            })
          }
        })
      }
    })

    return results
  }

  const allResults = buildSearchIndex()

  // Filter results based on search query
  const filterResults = (): SearchResult[] => {
    if (!search.trim()) return []

    const query = search.toLowerCase()
    return allResults.filter(result => {
      const title = String(result.title || '').toLowerCase()
      const description = String(result.description || '').toLowerCase()
      const category = String(result.category || '').toLowerCase()
      const badge = String(result.badge || '').toLowerCase()

      return title.includes(query) ||
        description.includes(query) ||
        category.includes(query) ||
        badge.includes(query)
    }).slice(0, 25)
  }

  const filteredResults = filterResults()

  // Group results by category
  const groupedResults = filteredResults.reduce((acc, result) => {
    if (!acc[result.category]) {
      acc[result.category] = []
    }
    acc[result.category].push(result)
    return acc
  }, {} as Record<string, SearchResult[]>)

  const handleSelect = (route: string) => {
    window.location.href = route
    setOpen(false)
    setSearch("")
  }
  const isMobile = useIsMobile()

  return (
    <>
      {/* Search bar trigger */}
      {isMobile ? (
        <>
          <button
          onClick={() => setOpen(true)}
          className="border rounded bg-gray-100 p-2"
          >
            <Search className="w-5 h-5 text-muted-foreground font-bold" />
          </button>
        </>
      ) : (

        <button
          onClick={() => setOpen(true)}
          className="w-2/3 sm:w-72 md:w-92 flex items-center justify-between px-3 py-2 text-sm bg-muted/40 border border-muted-foreground/20 rounded-lg text-muted-foreground hover:bg-muted/60 transition-all duration-200"
        >
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4" />
            <span className="truncate text-left">Search documentation...</span>
          </div>
          <kbd className="hidden sm:flex items-center gap-1 text-[10px] px-1.5 py-0.5 border rounded-md bg-background text-muted-foreground">
            <span className="font-medium">Ctrl + K</span>
          </kbd>
        </button>
      )}

      {/* Command Dialog */}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Search pages, endpoints, features, examples..."
          value={search}
          onValueChange={setSearch}
        />
        <CommandList>
          {search.trim() === "" ? (
            <div className="py-8 text-center text-sm space-y-3">
              <Search className="mx-auto h-12 w-12 text-muted-foreground/50 mb-3" />
              <div>
                <p className="text-muted-foreground font-medium">Start typing to search</p>
                <p className="text-xs text-muted-foreground/70 mt-1">
                  Search across all ZendFi documentation
                </p>
              </div>
              <div className="flex flex-wrap gap-2 justify-center pt-2">
                {["payments", "webhooks", "subscriptions", "escrow", "wallet"].map((term) => (
                  <button
                    key={term}
                    onClick={() => setSearch(term)}
                    className="px-3 py-1 text-xs rounded-full bg-muted hover:bg-muted/80 text-muted-foreground"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : filteredResults.length === 0 ? (
            <CommandEmpty>
              <div className="py-6 text-center">
                <p className="text-sm text-muted-foreground">No results found for "{search}"</p>
                <p className="text-xs text-muted-foreground/70 mt-1">
                  Try searching for "payments", "webhooks", or "subscriptions"
                </p>
              </div>
            </CommandEmpty>
          ) : (
            Object.entries(groupedResults).map(([category, results]) => (
              <CommandGroup key={category} heading={category}>
                {results.map((result) => {
                  const Icon = result.icon || BookOpen
                  return (
                    <CommandItem
                      key={result.id}
                      onSelect={() => handleSelect(result.route)}
                      className="flex items-start gap-3 py-3"
                    >
                      <Icon className="w-4 h-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                      <div className="flex-1 space-y-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-medium truncate">{result.title}</span>
                          {result.badge && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary font-medium whitespace-nowrap">
                              {result.badge}
                            </span>
                          )}
                        </div>
                        {result.description && (
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {result.description}
                          </p>
                        )}
                      </div>
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            ))
          )}
        </CommandList>
      </CommandDialog>
    </>
  )
}
