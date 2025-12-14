"use client"

import { useState } from "react"
import { Star, ThumbsUp, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import {
    getProductReviews,
    getAverageRating,
    getRatingDistribution,
    addReview,
    markReviewHelpful,
    type Review,
} from "@/lib/reviews-data"
import { toast } from "sonner"

interface ProductReviewsProps {
    productId: string
}

export function ProductReviews({ productId }: ProductReviewsProps) {
    const [reviews, setReviews] = useState<Review[]>(getProductReviews(productId))
    const [showReviewForm, setShowReviewForm] = useState(false)
    const [newReview, setNewReview] = useState({
        userName: "",
        userLocation: "",
        rating: 5,
        title: "",
        comment: "",
    })
    const [helpfulClicked, setHelpfulClicked] = useState<Set<string>>(new Set())

    const { average, count } = getAverageRating(productId)
    const distribution = getRatingDistribution(productId)

    const handleSubmitReview = (e: React.FormEvent) => {
        e.preventDefault()

        if (!newReview.userName || !newReview.comment) {
            toast.error("Please fill in your name and review")
            return
        }

        const review = addReview({
            productId,
            userName: newReview.userName,
            userLocation: newReview.userLocation || "India",
            rating: newReview.rating,
            title: newReview.title || "Great product!",
            comment: newReview.comment,
            verified: false,
        })

        setReviews([review, ...reviews])
        setNewReview({ userName: "", userLocation: "", rating: 5, title: "", comment: "" })
        setShowReviewForm(false)
        toast.success("Thank you for your review!")
    }

    const handleHelpful = (reviewId: string) => {
        if (helpfulClicked.has(reviewId)) return

        markReviewHelpful(reviewId)
        setReviews(reviews.map((r) => (r.id === reviewId ? { ...r, helpful: r.helpful + 1 } : r)))
        setHelpfulClicked(new Set([...helpfulClicked, reviewId]))
    }

    const StarRating = ({
        rating,
        onSelect,
        interactive = false,
    }: {
        rating: number
        onSelect?: (r: number) => void
        interactive?: boolean
    }) => (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    onClick={() => interactive && onSelect?.(star)}
                    className={cn("transition-colors", interactive && "cursor-pointer hover:scale-110")}
                    disabled={!interactive}
                >
                    <Star
                        className={cn(
                            "h-5 w-5",
                            star <= rating ? "fill-primary text-primary" : "fill-muted text-muted-foreground"
                        )}
                    />
                </button>
            ))}
        </div>
    )

    return (
        <div className="space-y-6">
            {/* Rating Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-4">
                        <span className="text-5xl font-bold">{average || "N/A"}</span>
                        <div>
                            <StarRating rating={Math.round(average)} />
                            <p className="text-sm text-muted-foreground mt-1">{count} reviews</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((star) => (
                        <div key={star} className="flex items-center gap-2">
                            <span className="text-sm w-8">{star} ★</span>
                            <Progress value={count > 0 ? (distribution[star] / count) * 100 : 0} className="flex-1 h-2" />
                            <span className="text-sm text-muted-foreground w-8">{distribution[star]}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Write Review Button */}
            <div className="border-t border-border pt-6">
                {!showReviewForm ? (
                    <Button onClick={() => setShowReviewForm(true)} variant="outline" className="bg-transparent">
                        Write a Review
                    </Button>
                ) : (
                    <Card className="p-6">
                        <h3 className="font-semibold text-lg mb-4">Write Your Review</h3>
                        <form onSubmit={handleSubmitReview} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="userName">Your Name *</Label>
                                    <Input
                                        id="userName"
                                        value={newReview.userName}
                                        onChange={(e) => setNewReview({ ...newReview, userName: e.target.value })}
                                        placeholder="Enter your name"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="userLocation">City</Label>
                                    <Input
                                        id="userLocation"
                                        value={newReview.userLocation}
                                        onChange={(e) => setNewReview({ ...newReview, userLocation: e.target.value })}
                                        placeholder="e.g., Bilaspur"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Rating *</Label>
                                <StarRating
                                    rating={newReview.rating}
                                    onSelect={(r) => setNewReview({ ...newReview, rating: r })}
                                    interactive
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="title">Review Title</Label>
                                <Input
                                    id="title"
                                    value={newReview.title}
                                    onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                                    placeholder="Summarize your review"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="comment">Your Review *</Label>
                                <Textarea
                                    id="comment"
                                    value={newReview.comment}
                                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                                    placeholder="Share your experience with this product..."
                                    rows={4}
                                    required
                                />
                            </div>

                            <div className="flex gap-2">
                                <Button type="submit">Submit Review</Button>
                                <Button type="button" variant="outline" onClick={() => setShowReviewForm(false)} className="bg-transparent">
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </Card>
                )}
            </div>

            {/* Reviews List */}
            <div className="space-y-4">
                {reviews.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                        <p>No reviews yet. Be the first to review this product!</p>
                    </div>
                ) : (
                    reviews.map((review) => (
                        <Card key={review.id} className="p-4">
                            <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                        <User className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-semibold">{review.userName}</span>
                                            {review.verified && (
                                                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                                                    Verified Purchase
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-xs text-muted-foreground">
                                            {review.userLocation} • {new Date(review.date).toLocaleDateString("en-IN", {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                            })}
                                        </p>
                                    </div>
                                </div>
                                <StarRating rating={review.rating} />
                            </div>

                            {review.title && <h4 className="font-semibold mt-3">{review.title}</h4>}
                            <p className="text-sm text-foreground mt-2 leading-relaxed">{review.comment}</p>

                            <div className="flex items-center gap-4 mt-4 pt-3 border-t border-border">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className={cn("gap-2 h-8", helpfulClicked.has(review.id) && "text-primary")}
                                    onClick={() => handleHelpful(review.id)}
                                    disabled={helpfulClicked.has(review.id)}
                                >
                                    <ThumbsUp className="h-4 w-4" />
                                    Helpful ({review.helpful})
                                </Button>
                            </div>
                        </Card>
                    ))
                )}
            </div>
        </div>
    )
}
