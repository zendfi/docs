"use client"

import { Button } from "@/components/ui/button"
import { Bot } from "lucide-react"
import { DocsChat } from "./chat-bot"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

export function DocsSidebar({ 
  docData, 
  isOpen, 
  onToggle 
}: { 
  docData: any[], 
  isOpen: boolean, 
  onToggle: () => void 
}) {
  return (
    <Sheet open={isOpen} onOpenChange={onToggle}>
      <SheetContent 
        side="right" 
        className="w-full sm:w-[30rem] p-0 flex flex-col"
      >
        {/* Header */}
        <SheetHeader className="p-4 border-b bg-muted/50 space-y-0">
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-primary" />
            <SheetTitle className="text-base">ZendFi Docs Assistant</SheetTitle>
          </div>
          <SheetDescription className="sr-only">
            Chat with our documentation assistant to get help and answers
          </SheetDescription>
        </SheetHeader>

        {/* Chatbot Content - Full Height */}
        <div className="flex-1 overflow-hidden">
          <DocsChat docsData={docData} />
        </div>
      </SheetContent>
    </Sheet>
  )
}