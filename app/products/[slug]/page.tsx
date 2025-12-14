"use client"
import { Suspense, use } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductDetailClient } from "@/components/product-detail-client"
import { getProductBySlug, products } from "@/lib/products-data"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

// Default product data as fallback
const defaultProductData = {
  id: "1",
  name: "Royal Maroon Bridal Silk Saree with Heavy Embroidery",
  price: 25999,
  originalPrice: 32999,
  fabric: "Pure Silk with Zari Work",
  description:
    "Experience luxury with this exquisite royal maroon bridal silk saree, featuring intricate gold embroidery and traditional zari work. Perfect for your special day.",
  images: [
    "/royal-maroon-bridal-silk-saree-with-gold-embroider.jpg",
    "/maroon-silk-saree-with-embroidery-back-view-drape.jpg",
    "/maroon-saree-gold-zari-work-close-up-detail.jpg",
    "/maroon-bridal-saree-blouse-piece-embroidery.jpg",
    "/maroon-silk-saree-pallu-intricate-design.jpg",
  ],
  stock: 5,
  rating: 4.8,
  reviewCount: 24,
  details: {
    fabric: "Pure Silk",
    work: "Zari Embroidery",
    length: "6.3 meters with blouse piece",
    blouse: "Unstitched blouse piece included",
    care: "Dry clean only",
    color: "Maroon with Gold",
    occasion: "Wedding, Reception, Special Events",
    weight: "850 grams",
  },
  shipping: {
    delivery: "5-7 business days",
    returns: "7 days easy return policy",
    authenticity: "100% authentic product guarantee",
  },
}

function ProductNotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-serif font-bold mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-6">
            Sorry, the product you're looking for doesn't exist.
          </p>
          <Link href="/products">
            <Button className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Browse All Products
            </Button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  )
}

function ProductContent({ slug }: { slug: string }) {
  // Try to find product by slug
  const product = getProductBySlug(slug)

  if (!product) {
    // If not found by exact slug, show default product or 404
    // For demo purposes, we'll show the default product
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <Suspense fallback={<div className="flex-1 flex items-center justify-center">Loading...</div>}>
          <ProductDetailClient product={defaultProductData} slug={slug} />
        </Suspense>
        <Footer />
      </div>
    )
  }

  // Transform product data to match component expectations
  const productData = {
    id: product.id,
    name: product.name,
    price: product.price,
    originalPrice: product.originalPrice,
    fabric: product.fabric,
    description: product.description || `Beautiful ${product.name} from Saree Sansar. Premium quality ${product.fabric} perfect for ${product.occasion}.`,
    images: product.images.length >= 2
      ? [...product.images, product.images[0], product.images[1], product.images[0]]
      : [product.images[0], product.images[0], product.images[0], product.images[0], product.images[0]],
    stock: product.stock,
    rating: product.rating,
    reviewCount: product.reviewCount,
    details: product.details || {
      fabric: product.fabric,
      work: "Traditional handwork",
      length: "6.3 meters with blouse piece",
      blouse: "Unstitched blouse piece included",
      care: "Dry clean recommended",
      color: product.color.charAt(0).toUpperCase() + product.color.slice(1),
      occasion: product.occasion.charAt(0).toUpperCase() + product.occasion.slice(1),
      weight: "Approx 600-800 grams",
    },
    shipping: {
      delivery: "5-7 business days",
      returns: "7 days easy return policy",
      authenticity: "100% authentic product guarantee",
    },
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Suspense fallback={<div className="flex-1 flex items-center justify-center">Loading...</div>}>
        <ProductDetailClient product={productData} slug={slug} />
      </Suspense>
      <Footer />
    </div>
  )
}

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)

  return <ProductContent slug={slug} />
}
