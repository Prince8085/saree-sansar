"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { MessageCircle, Heart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { getStockStatus } from "@/lib/products-data"

interface ProductCardProps {
  id: string
  name: string
  price: number
  originalPrice?: number
  fabric: string
  images: [string, string]
  slug: string
  stock?: number
  rating?: number
  reviewCount?: number
  isNew?: boolean
  isBestseller?: boolean
  colorVariants?: string[]
}

export function ProductCard({
  id,
  name,
  price,
  originalPrice,
  fabric,
  images,
  slug,
  stock = 10,
  rating = 0,
  reviewCount = 0,
  isNew = false,
  isBestseller = false,
  colorVariants = [],
}: ProductCardProps) {
  const [currentImage, setCurrentImage] = useState(0)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const stockStatus = getStockStatus(stock)
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0

  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-border">
      <Link href={`/products/${slug}`}>
        <div className="relative aspect-[3/4] overflow-hidden bg-muted">
          {/* Images */}
          <Image
            src={images[currentImage] || "/placeholder.svg"}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Top Left Badges */}
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex flex-col gap-1 sm:gap-1.5 z-10">
            {isNew && (
              <div className="bg-green-500 text-white px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold">
                ✨ NEW
              </div>
            )}
            {isBestseller && (
              <div className="bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-xs font-semibold">
                🔥 Bestseller
              </div>
            )}
            {discount > 0 && (
              <div className="bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-semibold">
                {discount}% OFF
              </div>
            )}
          </div>

          {/* Stock Status Badge */}
          {stock <= 5 && stock > 0 && (
            <div className="absolute bottom-3 left-3 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold z-10 animate-pulse">
              Only {stock} left!
            </div>
          )}

          {stock === 0 && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10">
              <span className="bg-destructive text-destructive-foreground px-4 py-2 rounded-full font-semibold">
                Out of Stock
              </span>
            </div>
          )}

          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.preventDefault()
              setIsWishlisted(!isWishlisted)
            }}
            className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:-translate-y-1 hover:shadow-lg z-10"
          >
            <Heart
              className={cn("h-5 w-5 transition-colors", isWishlisted ? "fill-accent text-accent" : "text-foreground")}
            />
          </button>

          {/* Quick View Overlay */}
          <div
            className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
            onMouseEnter={() => setCurrentImage(1)}
            onMouseLeave={() => setCurrentImage(0)}
          >
            <span className="text-white font-medium text-sm bg-primary px-4 py-2 rounded-full">Quick View</span>
          </div>
        </div>
      </Link>

      <CardContent className="p-2 sm:p-4">
        <Link href={`/products/${slug}`}>
          <h3 className="font-semibold text-foreground mb-1 line-clamp-2 hover:text-primary transition-colors text-xs sm:text-sm md:text-base">
            {name}
          </h3>
          <p className="text-sm text-muted-foreground mb-2">{fabric}</p>

          {/* Rating */}
          {rating > 0 && (
            <div className="flex items-center gap-1 mb-2">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={cn(
                      "h-3.5 w-3.5",
                      star <= Math.round(rating) ? "fill-primary text-primary" : "fill-muted text-muted-foreground"
                    )}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">({reviewCount})</span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-baseline gap-1 sm:gap-2 flex-wrap">
            <p className="text-sm sm:text-lg md:text-xl font-bold text-foreground">₹{price.toLocaleString("en-IN")}</p>
            {originalPrice && originalPrice > price && (
              <p className="text-xs sm:text-sm text-muted-foreground line-through">₹{originalPrice.toLocaleString("en-IN")}</p>
            )}
          </div>

          {/* Color Variants */}
          {colorVariants.length > 0 && (
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs text-muted-foreground">Colors:</span>
              <div className="flex gap-1">
                {colorVariants.slice(0, 5).map((color, index) => (
                  <div
                    key={index}
                    className="w-4 h-4 rounded-full border border-border shadow-sm"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
                {colorVariants.length > 5 && (
                  <span className="text-xs text-muted-foreground">+{colorVariants.length - 5}</span>
                )}
              </div>
            </div>
          )}
        </Link>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white gap-2 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg"
          onClick={() => {
            window.open(`https://wa.me/919354815144?text=Hi! I'm interested in ${name} (₹${price})`, "_blank")
          }}
          disabled={stock === 0}
        >
          <MessageCircle className="h-4 w-4" />
          {stock === 0 ? "Out of Stock" : "Inquire via WhatsApp"}
        </Button>
      </CardFooter>
    </Card>
  )
}
