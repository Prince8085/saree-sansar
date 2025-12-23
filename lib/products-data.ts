// Product data module - static import for client compatibility
// For dynamic data, components should fetch from /api/products

export interface Product {
    id: string
    name: string
    price: number
    originalPrice?: number
    fabric: string
    category: string
    color: string
    occasion: string
    images: [string, string] | string[]
    slug: string
    description?: string
    stock: number
    rating: number
    reviewCount: number
    details?: {
        fabric: string
        work: string
        length: string
        blouse: string
        care: string
        color: string
        occasion: string
        weight: string
    }
}

// Import JSON directly - webpack handles this
import productsData from "@/data/products.json"

// Export products array
export const products: Product[] = productsData as Product[]

// Helper functions
export function getProductBySlug(slug: string): Product | undefined {
    return products.find((p) => p.slug === slug)
}

export function getProductById(id: string): Product | undefined {
    return products.find((p) => p.id === id)
}

export function getProductsByCategory(category: string): Product[] {
    return products.filter((p) => p.category.toLowerCase() === category.toLowerCase())
}

export function getStockStatus(stock: number): { label: string; variant: "success" | "warning" | "destructive" } {
    if (stock === 0) {
        return { label: "Out of Stock", variant: "destructive" }
    } else if (stock <= 5) {
        return { label: `Only ${stock} left!`, variant: "warning" }
    } else {
        return { label: "In Stock", variant: "success" }
    }
}

export function searchProducts(query: string): Product[] {
    const lowerQuery = query.toLowerCase()
    return products.filter(
        (p) =>
            p.name.toLowerCase().includes(lowerQuery) ||
            p.fabric.toLowerCase().includes(lowerQuery) ||
            p.category.toLowerCase().includes(lowerQuery) ||
            p.color.toLowerCase().includes(lowerQuery) ||
            p.occasion.toLowerCase().includes(lowerQuery)
    )
}

export function filterProducts(
    priceRange: [number, number],
    fabrics: string[],
    colors: string[],
    occasions: string[],
    category?: string
): Product[] {
    return products.filter((p) => {
        // Price filter
        if (p.price < priceRange[0] || p.price > priceRange[1]) return false

        // Category filter
        if (category && p.category.toLowerCase() !== category.toLowerCase()) return false

        // Fabric filter
        if (fabrics.length > 0) {
            const productFabric = p.fabric.toLowerCase()
            const matchesFabric = fabrics.some((f) => productFabric.includes(f.toLowerCase()))
            if (!matchesFabric) return false
        }

        // Color filter
        if (colors.length > 0) {
            const matchesColor = colors.some((c) => p.color.toLowerCase() === c.toLowerCase())
            if (!matchesColor) return false
        }

        // Occasion filter
        if (occasions.length > 0) {
            const matchesOccasion = occasions.some((o) => p.occasion.toLowerCase() === o.toLowerCase())
            if (!matchesOccasion) return false
        }

        return true
    })
}

// Get all products
export function getAllProducts(): Product[] {
    return products
}
