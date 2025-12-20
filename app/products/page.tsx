"use client"

import type React from "react"

import { useState, useMemo, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { SlidersHorizontal, Search, X } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { products, filterProducts, searchProducts, type Product } from "@/lib/products-data"

function ProductListingContent() {
  const searchParams = useSearchParams()
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 40000])
  const [selectedFabrics, setSelectedFabrics] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [selectedOccasions, setSelectedOccasions] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("featured")

  const categoryParam = searchParams.get("category")
  const collectionParam = searchParams.get("collection")

  const fabrics = ["Silk", "Cotton", "Georgette", "Kosa", "Banarasi", "Chanderi"]
  const colors = ["Red", "Blue", "Green", "Pink", "White", "Gold", "Purple", "Multicolor"]
  const occasions = ["Wedding", "Party", "Casual", "Festival"]

  const toggleFilter = (value: string, setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]))
  }

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result: Product[]

    // First apply search if there's a query
    if (searchQuery.trim()) {
      result = searchProducts(searchQuery)
    } else {
      result = [...products]
    }

    // Apply category filter from URL
    if (categoryParam) {
      result = result.filter((p) => p.category.toLowerCase() === categoryParam.toLowerCase())
    }

    // Apply collection filter (bridal collection = bridal category)
    if (collectionParam === "bridal") {
      result = result.filter((p) => p.category === "bridal")
    }

    // Apply price filter
    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1])

    // Apply fabric filter
    if (selectedFabrics.length > 0) {
      result = result.filter((p) => {
        const productFabric = p.fabric.toLowerCase()
        return selectedFabrics.some((f) => productFabric.includes(f.toLowerCase()))
      })
    }

    // Apply color filter
    if (selectedColors.length > 0) {
      result = result.filter((p) => selectedColors.some((c) => p.color.toLowerCase() === c.toLowerCase()))
    }

    // Apply occasion filter
    if (selectedOccasions.length > 0) {
      result = result.filter((p) => selectedOccasions.some((o) => p.occasion.toLowerCase() === o.toLowerCase()))
    }

    // Sort products
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        result.sort((a, b) => b.price - a.price)
        break
      case "rating":
        result.sort((a, b) => b.rating - a.rating)
        break
      case "newest":
        result.sort((a, b) => parseInt(b.id) - parseInt(a.id))
        break
      default:
        // featured - keep original order
        break
    }

    return result
  }, [searchQuery, categoryParam, collectionParam, priceRange, selectedFabrics, selectedColors, selectedOccasions, sortBy])

  const clearAllFilters = () => {
    setPriceRange([0, 40000])
    setSelectedFabrics([])
    setSelectedColors([])
    setSelectedOccasions([])
    setSearchQuery("")
  }

  const hasActiveFilters =
    priceRange[0] > 0 ||
    priceRange[1] < 40000 ||
    selectedFabrics.length > 0 ||
    selectedColors.length > 0 ||
    selectedOccasions.length > 0 ||
    searchQuery.trim() !== ""

  const FilterSection = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">Filters</h3>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-primary h-8">
            Clear All
          </Button>
        )}
      </div>

      <Accordion type="multiple" defaultValue={["price", "fabric", "color", "occasion"]} className="w-full">
        <AccordionItem value="price">
          <AccordionTrigger>Price Range</AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            <Slider
              value={priceRange}
              onValueChange={(value) => setPriceRange(value as [number, number])}
              max={40000}
              min={0}
              step={1000}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>₹{priceRange[0].toLocaleString("en-IN")}</span>
              <span>₹{priceRange[1].toLocaleString("en-IN")}</span>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="fabric">
          <AccordionTrigger>Fabric</AccordionTrigger>
          <AccordionContent className="space-y-3 pt-4">
            {fabrics.map((fabric) => (
              <div key={fabric} className="flex items-center space-x-2">
                <Checkbox
                  id={`fabric-${fabric}`}
                  checked={selectedFabrics.includes(fabric)}
                  onCheckedChange={() => toggleFilter(fabric, setSelectedFabrics)}
                />
                <Label htmlFor={`fabric-${fabric}`} className="cursor-pointer">
                  {fabric}
                </Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="color">
          <AccordionTrigger>Color</AccordionTrigger>
          <AccordionContent className="space-y-3 pt-4">
            {colors.map((color) => (
              <div key={color} className="flex items-center space-x-2">
                <Checkbox
                  id={`color-${color}`}
                  checked={selectedColors.includes(color)}
                  onCheckedChange={() => toggleFilter(color, setSelectedColors)}
                />
                <Label htmlFor={`color-${color}`} className="cursor-pointer flex items-center gap-2">
                  <span
                    className="w-4 h-4 rounded-full border border-border"
                    style={{
                      backgroundColor:
                        color === "Multicolor"
                          ? "linear-gradient(45deg, red, blue, green)"
                          : color.toLowerCase(),
                    }}
                  />
                  {color}
                </Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="occasion">
          <AccordionTrigger>Occasion</AccordionTrigger>
          <AccordionContent className="space-y-3 pt-4">
            {occasions.map((occasion) => (
              <div key={occasion} className="flex items-center space-x-2">
                <Checkbox
                  id={`occasion-${occasion}`}
                  checked={selectedOccasions.includes(occasion)}
                  onCheckedChange={() => toggleFilter(occasion, setSelectedOccasions)}
                />
                <Label htmlFor={`occasion-${occasion}`} className="cursor-pointer">
                  {occasion}
                </Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )

  const getPageTitle = () => {
    if (searchQuery.trim()) return `Search: "${searchQuery}"`
    if (collectionParam === "bridal") return "Bridal Collection"
    if (categoryParam) return `${categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1)} Collection`
    return "All Products"
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Breadcrumb & Title */}
          <div className="mb-8">
            <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">{getPageTitle()}</h1>
            <p className="text-muted-foreground">
              Showing {filteredProducts.length} of {products.length} products
            </p>
          </div>

          {/* Search and Sort Bar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search sarees, fabrics, colors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-10"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Active Filters Tags */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2 mb-6">
              {searchQuery && (
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm flex items-center gap-2">
                  Search: {searchQuery}
                  <button onClick={() => setSearchQuery("")}>
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              {selectedFabrics.map((f) => (
                <span key={f} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm flex items-center gap-2">
                  {f}
                  <button onClick={() => toggleFilter(f, setSelectedFabrics)}>
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
              {selectedColors.map((c) => (
                <span key={c} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm flex items-center gap-2">
                  {c}
                  <button onClick={() => toggleFilter(c, setSelectedColors)}>
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
              {selectedOccasions.map((o) => (
                <span key={o} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm flex items-center gap-2">
                  {o}
                  <button onClick={() => toggleFilter(o, setSelectedOccasions)}>
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          )}

          <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
            {/* Desktop Sidebar Filters */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-24">
                <FilterSection />
              </div>
            </aside>

            {/* Mobile Filter Button */}
            <div className="lg:hidden fixed bottom-20 right-4 z-40">
              <Sheet>
                <SheetTrigger asChild>
                  <Button size="lg" className="rounded-full shadow-lg gap-2">
                    <SlidersHorizontal className="h-5 w-5" />
                    Filters
                    {hasActiveFilters && (
                      <span className="bg-white text-primary w-5 h-5 rounded-full text-xs flex items-center justify-center">
                        !
                      </span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                    <SheetDescription>Refine your search to find the perfect saree</SheetDescription>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterSection />
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Product Grid */}
            <div className="flex-1">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-2xl font-semibold mb-2">No products found</p>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your filters or search query
                  </p>
                  <Button onClick={clearAllFilters} variant="outline" className="bg-transparent">
                    Clear All Filters
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} {...product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default function ProductListingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ProductListingContent />
    </Suspense>
  )
}
