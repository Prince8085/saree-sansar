"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageCircle, Heart, Share2, Truck, RotateCcw, Shield, ChevronLeft, ChevronRight, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { ProductReviews } from "@/components/product-reviews"
import { getStockStatus } from "@/lib/products-data"
import { getAverageRating } from "@/lib/reviews-data"
import { toast } from "sonner"

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  fabric: string
  description: string
  images: string[]
  stock?: number
  rating?: number
  reviewCount?: number
  details: Record<string, string>
  shipping: Record<string, string>
}

export function ProductDetailClient({ product, slug }: { product: Product; slug: string }) {
  const [currentImage, setCurrentImage] = useState(0)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const stock = product.stock ?? 10
  const stockStatus = getStockStatus(stock)
  const { average: avgRating, count: reviewCount } = getAverageRating(product.id)
  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % product.images.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + product.images.length) % product.images.length)
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: `Check out this beautiful ${product.name} at Saree Sansar!`,
          url: window.location.href,
        })
      } catch (err) {
        // User cancelled or error
        copyToClipboard()
      }
    } else {
      copyToClipboard()
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href)
    toast.success("Link copied to clipboard!")
  }

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted)
    toast.success(isWishlisted ? "Removed from wishlist" : "Added to wishlist!")
  }

  return (
    <main className="flex-1 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery with Slider */}
          <div className="space-y-4">
            {/* Main Image with Navigation */}
            <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-muted group">
              <Image
                src={product.images[currentImage] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover transition-opacity duration-300"
                priority
              />

              {/* Navigation Arrows */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-all opacity-0 group-hover:opacity-100"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6 text-foreground" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-all opacity-0 group-hover:opacity-100"
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6 text-foreground" />
              </button>

              {/* Discount Badge */}
              {discount > 0 && (
                <div className="absolute top-4 left-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-semibold">
                  {discount}% OFF
                </div>
              )}

              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                {currentImage + 1} / {product.images.length}
              </div>

              {/* Wishlist Button */}
              <button
                onClick={handleWishlist}
                className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-3 hover:bg-white transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg"
              >
                <Heart
                  className={cn(
                    "h-6 w-6 transition-colors",
                    isWishlisted ? "fill-accent text-accent" : "text-foreground"
                  )}
                />
              </button>
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-5 gap-3">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={cn(
                    "relative aspect-[3/4] overflow-hidden rounded-lg border-2 transition-all",
                    currentImage === index
                      ? "border-primary ring-2 ring-primary ring-offset-2"
                      : "border-transparent hover:border-border"
                  )}
                >
                  <Image src={image || "/placeholder.svg"} alt={`View ${index + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="font-serif text-3xl md:text-4xl font-bold mb-3 text-balance leading-tight">
                {product.name}
              </h1>
              <p className="text-muted-foreground text-lg">{product.fabric}</p>

              {/* Rating */}
              {avgRating > 0 && (
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={cn(
                          "h-5 w-5",
                          star <= Math.round(avgRating) ? "fill-primary text-primary" : "fill-muted text-muted-foreground"
                        )}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {avgRating} ({reviewCount} reviews)
                  </span>
                </div>
              )}
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-4">
              <span className="text-4xl font-bold text-foreground">₹{product.price.toLocaleString("en-IN")}</span>
              {product.originalPrice && (
                <span className="text-2xl text-muted-foreground line-through">
                  ₹{product.originalPrice.toLocaleString("en-IN")}
                </span>
              )}
              {discount > 0 && (
                <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-semibold">
                  {discount}% OFF
                </span>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "px-3 py-1 rounded-full text-sm font-medium",
                  stockStatus.variant === "success" && "bg-green-100 text-green-700",
                  stockStatus.variant === "warning" && "bg-orange-100 text-orange-700 animate-pulse",
                  stockStatus.variant === "destructive" && "bg-red-100 text-red-700"
                )}
              >
                {stockStatus.label}
              </span>
            </div>

            {/* Description */}
            <p className="text-foreground leading-relaxed">{product.description}</p>

            {/* CTA Buttons */}
            <div className="space-y-3 pt-4">
              <Button
                size="lg"
                className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white gap-2 text-lg py-6 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg"
                onClick={() => {
                  window.open(
                    `https://wa.me/919354815144?text=Hi! I'm interested in ${product.name} (₹${product.price})`,
                    "_blank"
                  )
                }}
                disabled={stock === 0}
              >
                <MessageCircle className="h-5 w-5" />
                {stock === 0 ? "Out of Stock - Contact for Availability" : "Chat on WhatsApp to Order / Customize"}
              </Button>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 gap-2 bg-transparent" size="lg" onClick={handleShare}>
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="gap-2 bg-transparent"
                  onClick={handleWishlist}
                >
                  <Heart className={cn("h-4 w-4", isWishlisted && "fill-current")} />
                  {isWishlisted ? "Saved" : "Save"}
                </Button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
              <div className="text-center">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Truck className="h-6 w-6 text-primary" />
                </div>
                <p className="text-sm font-medium">Fast Delivery</p>
              </div>
              <div className="text-center">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                  <RotateCcw className="h-6 w-6 text-primary" />
                </div>
                <p className="text-sm font-medium">Easy Returns</p>
              </div>
              <div className="text-center">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <p className="text-sm font-medium">100% Authentic</p>
              </div>
            </div>

            {/* Product Details Tabs */}
            <Tabs defaultValue="details" className="w-full pt-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="shipping">Shipping</TabsTrigger>
                <TabsTrigger value="reviews">Reviews ({reviewCount})</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="space-y-3 pt-4">
                {Object.entries(product.details).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-border last:border-0">
                    <span className="text-muted-foreground capitalize">{key}:</span>
                    <span className="font-medium text-right">{value}</span>
                  </div>
                ))}
              </TabsContent>
              <TabsContent value="shipping" className="space-y-4 pt-4">
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <Truck className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Delivery Time</p>
                      <p className="text-sm text-muted-foreground">{product.shipping.delivery}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <RotateCcw className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Return Policy</p>
                      <p className="text-sm text-muted-foreground">{product.shipping.returns}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Shield className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Authenticity</p>
                      <p className="text-sm text-muted-foreground">{product.shipping.authenticity}</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="reviews" className="pt-4">
                <ProductReviews productId={product.id} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Sticky Mobile CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 z-40 shadow-lg">
        <Button
          size="lg"
          className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white gap-2"
          onClick={() => {
            window.open(
              `https://wa.me/919354815144?text=Hi! I'm interested in ${product.name} (₹${product.price})`,
              "_blank"
            )
          }}
          disabled={stock === 0}
        >
          <MessageCircle className="h-5 w-5" />
          {stock === 0 ? "Out of Stock" : "Chat on WhatsApp"}
        </Button>
      </div>
    </main>
  )
}
