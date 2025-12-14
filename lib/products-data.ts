// Mock product data with inventory, ratings, and full details
export interface Product {
    id: string
    name: string
    price: number
    originalPrice?: number
    fabric: string
    category: string
    color: string
    occasion: string
    images: [string, string]
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

export const products: Product[] = [
    {
        id: "1",
        name: "Royal Maroon Bridal Silk Saree with Heavy Embroidery",
        price: 25999,
        originalPrice: 32999,
        fabric: "Pure Silk with Zari Work",
        category: "bridal",
        color: "red",
        occasion: "wedding",
        images: ["/maroon-bridal-silk-saree-gold-embroidery.jpg", "/maroon-saree-back-view-embroidery.jpg"],
        slug: "royal-maroon-bridal-silk-saree",
        description: "Experience luxury with this exquisite royal maroon bridal silk saree, featuring intricate gold embroidery and traditional zari work.",
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
    },
    {
        id: "2",
        name: "Traditional Kosa Silk Saree in Forest Green",
        price: 12999,
        originalPrice: 15999,
        fabric: "Authentic Kosa Silk",
        category: "kosa",
        color: "green",
        occasion: "party",
        images: ["/green-kosa-silk-saree-traditional.jpg", "/green-kosa-silk-saree-drape.jpg"],
        slug: "traditional-kosa-silk-green",
        description: "Authentic Chhattisgarh Kosa silk saree with traditional craftsmanship.",
        stock: 12,
        rating: 4.6,
        reviewCount: 18,
    },
    {
        id: "3",
        name: "Designer Banarasi Saree with Golden Border",
        price: 18999,
        originalPrice: 22999,
        fabric: "Banarasi Silk",
        category: "silk",
        color: "purple",
        occasion: "wedding",
        images: ["/banarasi-saree-purple-golden-border.jpg", "/banarasi-saree-purple-close-up.jpg"],
        slug: "designer-banarasi-golden-border",
        description: "Stunning Banarasi silk saree with intricate golden border work.",
        stock: 8,
        rating: 4.9,
        reviewCount: 32,
    },
    {
        id: "4",
        name: "Elegant Cotton Silk Saree in Royal Blue",
        price: 8999,
        originalPrice: 10999,
        fabric: "Cotton Silk Blend",
        category: "cotton",
        color: "blue",
        occasion: "party",
        images: ["/royal-blue-cotton-silk-saree.jpg", "/blue-cotton-silk-saree-pattern.jpg"],
        slug: "elegant-cotton-silk-royal-blue",
        description: "Comfortable and elegant cotton silk blend perfect for parties.",
        stock: 15,
        rating: 4.5,
        reviewCount: 45,
    },
    {
        id: "5",
        name: "Festive Red Georgette Saree",
        price: 6999,
        originalPrice: 8999,
        fabric: "Georgette",
        category: "georgette",
        color: "red",
        occasion: "party",
        images: ["/luxurious-indian-bridal-wedding-saree-red-gold.jpg", "/elegant-indian-bride-in-red-bridal-saree-with-gold.jpg"],
        slug: "festive-red-georgette-saree",
        description: "Light and flowy georgette saree perfect for festive occasions.",
        stock: 20,
        rating: 4.3,
        reviewCount: 28,
    },
    {
        id: "6",
        name: "Ivory Wedding Silk Saree",
        price: 22999,
        originalPrice: 28999,
        fabric: "Pure Silk",
        category: "bridal",
        color: "white",
        occasion: "wedding",
        images: ["/traditional-kosa-silk-saree-elegant-woman.jpg", "/traditional-kosa-silk-saree-green-elegant.jpg"],
        slug: "ivory-wedding-silk-saree",
        description: "Elegant ivory silk saree for the modern bride.",
        stock: 3,
        rating: 4.7,
        reviewCount: 15,
    },
    {
        id: "7",
        name: "Printed Cotton Kurti Set",
        price: 2999,
        originalPrice: 3999,
        fabric: "Cotton",
        category: "kurtis",
        color: "multicolor",
        occasion: "casual",
        images: ["/modern-indian-kurti-ethnic-wear.jpg", "/colorful-indian-ghagra-choli-lehenga.jpg"],
        slug: "printed-cotton-kurti-set",
        description: "Comfortable printed cotton kurti set for daily wear.",
        stock: 35,
        rating: 4.4,
        reviewCount: 67,
    },
    {
        id: "8",
        name: "Embroidered Salwar Suit",
        price: 5999,
        originalPrice: 7999,
        fabric: "Chanderi",
        category: "suits",
        color: "pink",
        occasion: "party",
        images: ["/pink-floral-silk-saree-elegant.jpg", "/navy-blue-designer-saree-contemporary.jpg"],
        slug: "embroidered-salwar-suit",
        description: "Beautiful embroidered Chanderi salwar suit for special occasions.",
        stock: 10,
        rating: 4.6,
        reviewCount: 23,
    },
    {
        id: "9",
        name: "Golden Banarasi Heavy Bridal Lehenga",
        price: 35999,
        originalPrice: 45999,
        fabric: "Banarasi Brocade",
        category: "ghagra",
        color: "gold",
        occasion: "wedding",
        images: ["/golden-banarasi-silk-saree.jpg", "/luxurious-silk-sarees-display-traditional-indian.jpg"],
        slug: "golden-banarasi-heavy-bridal-lehenga",
        description: "Stunning golden Banarasi brocade lehenga for the bride.",
        stock: 2,
        rating: 5.0,
        reviewCount: 8,
    },
    {
        id: "10",
        name: "Navy Blue Designer Indo-Western",
        price: 9999,
        originalPrice: 12999,
        fabric: "Georgette with Net",
        category: "indo-western",
        color: "blue",
        occasion: "party",
        images: ["/navy-blue-designer-saree-contemporary.jpg", "/royal-blue-cotton-silk-saree.jpg"],
        slug: "navy-blue-designer-indo-western",
        description: "Modern indo-western outfit for the contemporary woman.",
        stock: 7,
        rating: 4.5,
        reviewCount: 19,
    },
]

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
