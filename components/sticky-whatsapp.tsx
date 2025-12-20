"use client"

import { useState, useEffect } from "react"
import { MessageCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function StickyWhatsApp() {
    const [isExpanded, setIsExpanded] = useState(false)
    const [showPulse, setShowPulse] = useState(true)

    // Stop pulse animation after a while
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowPulse(false)
        }, 10000) // Stop after 10 seconds
        return () => clearTimeout(timer)
    }, [])

    const handleWhatsAppClick = () => {
        window.open(
            "https://wa.me/919354815144?text=Hi! I'm interested in your saree collection. Please share more details.",
            "_blank"
        )
    }

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
            {/* Expanded Message Box */}
            <div
                className={cn(
                    "bg-white rounded-2xl shadow-2xl border border-border p-4 transition-all duration-300 origin-bottom-right",
                    isExpanded
                        ? "opacity-100 scale-100 translate-y-0"
                        : "opacity-0 scale-90 translate-y-4 pointer-events-none"
                )}
            >
                <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center flex-shrink-0">
                        <MessageCircle className="h-5 w-5 text-white" />
                    </div>
                    <div>
                        <p className="font-semibold text-foreground text-sm">Saree Sansar</p>
                        <p className="text-xs text-muted-foreground">Typically replies within minutes</p>
                    </div>
                    <button
                        onClick={() => setIsExpanded(false)}
                        className="text-muted-foreground hover:text-foreground transition-colors ml-2"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>

                <div className="bg-muted rounded-lg p-3 mb-3">
                    <p className="text-sm text-foreground">
                        👋 Namaste! Saree ke baare mein kuch jaanna hai? Hum yahan help karne ke liye hain!
                    </p>
                </div>

                <Button
                    onClick={handleWhatsAppClick}
                    className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white gap-2"
                >
                    <MessageCircle className="h-4 w-4" />
                    Chat on WhatsApp
                </Button>
            </div>

            {/* Main WhatsApp Button */}
            <button
                onClick={() => (isExpanded ? handleWhatsAppClick() : setIsExpanded(true))}
                className={cn(
                    "relative h-14 w-14 rounded-full bg-[#25D366] text-white shadow-lg",
                    "flex items-center justify-center",
                    "transition-all duration-300 hover:scale-110 hover:shadow-xl",
                    "focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
                )}
                aria-label="Chat on WhatsApp"
            >
                {/* Pulse Animation */}
                {showPulse && (
                    <>
                        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-75" />
                        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-pulse" />
                    </>
                )}

                <MessageCircle className="h-7 w-7 relative z-10" />

                {/* Notification Badge */}
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full flex items-center justify-center text-[10px] font-bold animate-bounce">
                    1
                </span>
            </button>
        </div>
    )
}
