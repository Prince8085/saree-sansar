"use client"

import { Sparkles, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function PromoVideo() {
    return (
        <section className="relative py-12 md:py-16 overflow-hidden">
            {/* Golden Background */}
            <div
                className="absolute inset-0 bg-cover bg-center opacity-30"
                style={{ backgroundImage: "url('/golden-bg.png')" }}
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 via-accent/80 to-secondary/90" />

            {/* Decorative Pattern */}
            <div className="absolute inset-0 mandala-pattern opacity-10" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    {/* Text Content */}
                    <div className="text-white order-2 lg:order-1">
                        <div className="flex items-center gap-2 mb-4">
                            <Sparkles className="h-6 w-6 animate-pulse text-primary" />
                            <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                                FEATURED
                            </span>
                        </div>

                        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance leading-tight">
                            Discover Our Exclusive Collection
                        </h2>

                        <p className="text-lg md:text-xl mb-6 text-white/90 text-balance leading-relaxed">
                            Experience the elegance of traditional Indian sarees with modern designs.
                            Handpicked collection for brides, festivals & special occasions.
                        </p>

                        <ul className="space-y-3 mb-8">
                            <li className="flex items-center gap-3">
                                <div className="bg-white/20 p-1.5 rounded-full">
                                    <Sparkles className="h-4 w-4" />
                                </div>
                                <span>Premium Silk & Kosa Collection</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="bg-white/20 p-1.5 rounded-full">
                                    <Sparkles className="h-4 w-4" />
                                </div>
                                <span>Exclusive Bridal Designs</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="bg-white/20 p-1.5 rounded-full">
                                    <Sparkles className="h-4 w-4" />
                                </div>
                                <span>Pan India Delivery Available</span>
                            </li>
                        </ul>

                        <div className="flex flex-wrap gap-4">
                            <Link href="/products?collection=bridal">
                                <Button
                                    size="lg"
                                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 gap-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                                >
                                    Shop Now
                                </Button>
                            </Link>
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-white text-white hover:bg-white hover:text-secondary font-semibold px-8 gap-2 transition-all duration-300 hover:-translate-y-1"
                                onClick={() => window.open("https://wa.me/919354815144", "_blank")}
                            >
                                Contact Us
                            </Button>
                        </div>
                    </div>

                    {/* Video Container */}
                    <div className="order-1 lg:order-2 flex flex-col">
                        {/* Video Card */}
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 group bg-gradient-to-b from-pink-100 to-pink-50">
                            {/* Promo Video/GIF */}
                            <div className="w-full">
                                <img
                                    src="/promo-video.gif"
                                    alt="Saree Sansar Collection Showcase"
                                    className="w-full h-auto object-contain"
                                />
                            </div>

                            {/* Now Playing Badge */}
                            <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 shadow-lg">
                                <Play className="h-4 w-4 fill-current" />
                                Now Playing
                            </div>
                        </div>

                        {/* Trust Badge - Below Video Card */}
                        <div className="flex justify-end mt-4">
                            <div className="bg-white text-secondary px-6 py-4 rounded-xl shadow-2xl border-2 border-primary/30">
                                <p className="font-bold text-lg text-primary">Since 2000</p>
                                <p className="text-sm text-muted-foreground">Trusted by 10000+ Customers</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
