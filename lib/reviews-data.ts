// Mock reviews data
export interface Review {
    id: string
    productId: string
    userName: string
    userLocation: string
    rating: number
    title: string
    comment: string
    date: string
    verified: boolean
    helpful: number
    images?: string[]
}

// Store for reviews (in-memory, would be database in production)
let reviews: Review[] = [
    {
        id: "r1",
        productId: "1",
        userName: "Priya Sharma",
        userLocation: "Raipur",
        rating: 5,
        title: "Absolutely stunning bridal saree!",
        comment: "This saree exceeded my expectations! The embroidery work is exquisite and the fabric quality is premium. I wore this for my wedding reception and received so many compliments. Sanjay ji helped me choose the perfect design.",
        date: "2024-12-10",
        verified: true,
        helpful: 12,
    },
    {
        id: "r2",
        productId: "1",
        userName: "Anjali Verma",
        userLocation: "Bilaspur",
        rating: 5,
        title: "Worth every penny",
        comment: "Beautiful saree with intricate zari work. The maroon color is exactly as shown. Delivery was on time and packaging was excellent.",
        date: "2024-11-28",
        verified: true,
        helpful: 8,
    },
    {
        id: "r3",
        productId: "1",
        userName: "Kavita Patel",
        userLocation: "Korba",
        rating: 4,
        title: "Good quality but sizing issue",
        comment: "The saree quality is great but the blouse piece was slightly smaller than expected. Otherwise, beautiful design and fast delivery.",
        date: "2024-11-15",
        verified: true,
        helpful: 5,
    },
    {
        id: "r4",
        productId: "2",
        userName: "Sunita Gupta",
        userLocation: "Durg",
        rating: 5,
        title: "Authentic Kosa Silk",
        comment: "This is genuine Kosa silk from Chhattisgarh. The texture and fall of the saree is perfect. Love supporting local artisans through Saree Sansar!",
        date: "2024-12-05",
        verified: true,
        helpful: 15,
    },
    {
        id: "r5",
        productId: "3",
        userName: "Meera Singh",
        userLocation: "Raipur",
        rating: 5,
        title: "Perfect for my daughter's wedding",
        comment: "Bought this Banarasi for my daughter's wedding. The golden border work is magnificent. Everyone at the wedding was asking where we got it from!",
        date: "2024-11-20",
        verified: true,
        helpful: 20,
    },
    {
        id: "r6",
        productId: "4",
        userName: "Neha Agarwal",
        userLocation: "Bilaspur",
        rating: 4,
        title: "Great everyday saree",
        comment: "Perfect for office wear. Comfortable cotton silk blend and the blue color is vibrant. Good value for money.",
        date: "2024-12-01",
        verified: true,
        helpful: 6,
    },
    {
        id: "r7",
        productId: "7",
        userName: "Ritu Jain",
        userLocation: "Bhilai",
        rating: 5,
        title: "Comfortable and stylish",
        comment: "Love this kurti set! The print is beautiful and the cotton fabric is very comfortable. Perfect for daily wear.",
        date: "2024-12-08",
        verified: true,
        helpful: 9,
    },
]

// Get reviews for a product
export function getProductReviews(productId: string): Review[] {
    return reviews.filter((r) => r.productId === productId).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

// Calculate average rating for a product
export function getAverageRating(productId: string): { average: number; count: number } {
    const productReviews = reviews.filter((r) => r.productId === productId)
    if (productReviews.length === 0) return { average: 0, count: 0 }

    const sum = productReviews.reduce((acc, r) => acc + r.rating, 0)
    return {
        average: Math.round((sum / productReviews.length) * 10) / 10,
        count: productReviews.length,
    }
}

// Add a new review
export function addReview(review: Omit<Review, "id" | "date" | "helpful">): Review {
    const newReview: Review = {
        ...review,
        id: `r${Date.now()}`,
        date: new Date().toISOString().split("T")[0],
        helpful: 0,
    }
    reviews = [newReview, ...reviews]
    return newReview
}

// Mark review as helpful
export function markReviewHelpful(reviewId: string): void {
    const review = reviews.find((r) => r.id === reviewId)
    if (review) {
        review.helpful += 1
    }
}

// Get rating distribution
export function getRatingDistribution(productId: string): Record<number, number> {
    const productReviews = reviews.filter((r) => r.productId === productId)
    const distribution: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }

    productReviews.forEach((r) => {
        distribution[r.rating] = (distribution[r.rating] || 0) + 1
    })

    return distribution
}
