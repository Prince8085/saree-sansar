"use client"

import { useEffect, useState } from "react"

const announcements = [
    "🎉 Free Shipping above ₹10,000",
    "💫 New Arrivals Weekly",
    "🎁 Festival Sale Live - Up to 30% OFF",
    "✨ Authentic Kosa Silk Collection",
    "🚚 Pan India Delivery Available",
    "💝 Special Bridal Discount",
]

export function AnnouncementBar() {
    const [isVisible, setIsVisible] = useState(true)

    // Don't render on scroll down (optional - can remove if always visible needed)
    useEffect(() => {
        let lastScrollY = window.scrollY

        const handleScroll = () => {
            const currentScrollY = window.scrollY
            setIsVisible(currentScrollY < 100 || currentScrollY < lastScrollY)
            lastScrollY = currentScrollY
        }

        window.addEventListener("scroll", handleScroll, { passive: true })
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    if (!isVisible) return null

    return (
        <div className="bg-gradient-to-r from-primary via-secondary to-accent text-white py-2 overflow-hidden">
            <div className="announcement-ticker flex whitespace-nowrap">
                {/* Duplicate content for seamless loop */}
                {[...announcements, ...announcements].map((text, index) => (
                    <span
                        key={index}
                        className="mx-8 text-sm font-medium inline-flex items-center"
                    >
                        {text}
                        <span className="mx-8 text-white/50">|</span>
                    </span>
                ))}
            </div>

            <style jsx>{`
        .announcement-ticker {
          animation: ticker 30s linear infinite;
        }

        @keyframes ticker {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .announcement-ticker:hover {
          animation-play-state: paused;
        }
      `}</style>
        </div>
    )
}
