"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Package,
    Search,
    CheckCircle,
    Circle,
    Truck,
    Clock,
    MapPin,
    Phone,
    MessageCircle,
    AlertCircle,
} from "lucide-react"
import { getOrderById, getOrderByTracking, getOrdersByPhone, getOrderStatusInfo, type Order } from "@/lib/orders-data"
import { cn } from "@/lib/utils"
import Image from "next/image"

export default function TrackOrderPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [searchType, setSearchType] = useState<"order" | "tracking" | "phone">("order")
    const [order, setOrder] = useState<Order | null>(null)
    const [orders, setOrders] = useState<Order[]>([])
    const [error, setError] = useState<string | null>(null)
    const [searched, setSearched] = useState(false)

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        setOrder(null)
        setOrders([])
        setSearched(true)

        if (!searchQuery.trim()) {
            setError("Please enter a search value")
            return
        }

        if (searchType === "order") {
            const found = getOrderById(searchQuery.trim())
            if (found) {
                setOrder(found)
            } else {
                setError("Order not found. Please check the order ID and try again.")
            }
        } else if (searchType === "tracking") {
            const found = getOrderByTracking(searchQuery.trim())
            if (found) {
                setOrder(found)
            } else {
                setError("No order found with this tracking number.")
            }
        } else {
            const found = getOrdersByPhone(searchQuery.trim())
            if (found.length > 0) {
                setOrders(found)
            } else {
                setError("No orders found for this phone number.")
            }
        }
    }

    const statusInfo = order ? getOrderStatusInfo(order.status) : null

    const TimelineItem = ({
        status,
        date,
        time,
        description,
        completed,
        isLast,
    }: {
        status: string
        date: string
        time: string
        description: string
        completed: boolean
        isLast: boolean
    }) => (
        <div className="flex gap-4">
            <div className="flex flex-col items-center">
                {completed ? (
                    <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0" />
                ) : (
                    <Circle className="h-6 w-6 text-muted-foreground flex-shrink-0" />
                )}
                {!isLast && (
                    <div className={cn("w-0.5 h-full min-h-12", completed ? "bg-green-600" : "bg-muted-foreground/30")} />
                )}
            </div>
            <div className="pb-6">
                <p className={cn("font-semibold", completed ? "text-foreground" : "text-muted-foreground")}>{status}</p>
                {date && time ? (
                    <p className="text-sm text-muted-foreground">
                        {date} at {time}
                    </p>
                ) : (
                    <p className="text-sm text-muted-foreground">Pending</p>
                )}
                <p className="text-sm text-muted-foreground mt-1">{description}</p>
            </div>
        </div>
    )

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 py-8 bg-gradient-to-b from-background to-muted/30">
                <div className="container mx-auto px-4">
                    {/* Hero Section */}
                    <div className="text-center mb-12">
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <Package className="h-8 w-8 text-primary" />
                            <h1 className="font-serif text-4xl md:text-5xl font-bold">Track Your Order</h1>
                        </div>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Enter your order ID, tracking number, or phone number to track your package
                        </p>
                    </div>

                    {/* Search Form */}
                    <Card className="max-w-2xl mx-auto p-6 mb-8">
                        <form onSubmit={handleSearch} className="space-y-4">
                            <div className="flex gap-2 mb-4">
                                <Button
                                    type="button"
                                    variant={searchType === "order" ? "default" : "outline"}
                                    onClick={() => setSearchType("order")}
                                    className={searchType !== "order" ? "bg-transparent" : ""}
                                    size="sm"
                                >
                                    Order ID
                                </Button>
                                <Button
                                    type="button"
                                    variant={searchType === "tracking" ? "default" : "outline"}
                                    onClick={() => setSearchType("tracking")}
                                    className={searchType !== "tracking" ? "bg-transparent" : ""}
                                    size="sm"
                                >
                                    Tracking Number
                                </Button>
                                <Button
                                    type="button"
                                    variant={searchType === "phone" ? "default" : "outline"}
                                    onClick={() => setSearchType("phone")}
                                    className={searchType !== "phone" ? "bg-transparent" : ""}
                                    size="sm"
                                >
                                    Phone Number
                                </Button>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="searchQuery">
                                    {searchType === "order"
                                        ? "Order ID"
                                        : searchType === "tracking"
                                            ? "Tracking Number"
                                            : "Phone Number"}
                                </Label>
                                <div className="flex gap-2">
                                    <Input
                                        id="searchQuery"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder={
                                            searchType === "order"
                                                ? "e.g., ORD-2025-1234"
                                                : searchType === "tracking"
                                                    ? "e.g., SSXP1234567890"
                                                    : "e.g., 9876543210"
                                        }
                                        className="flex-1"
                                    />
                                    <Button type="submit" className="gap-2">
                                        <Search className="h-4 w-4" />
                                        Track
                                    </Button>
                                </div>
                            </div>
                        </form>

                        {/* Sample Order IDs */}
                        <div className="mt-4 pt-4 border-t border-border">
                            <p className="text-xs text-muted-foreground mb-2">Try these sample orders:</p>
                            <div className="flex flex-wrap gap-2">
                                {["ORD-2025-1234", "ORD-2025-1235", "ORD-2025-1236"].map((orderId) => (
                                    <button
                                        key={orderId}
                                        type="button"
                                        onClick={() => {
                                            setSearchQuery(orderId)
                                            setSearchType("order")
                                        }}
                                        className="text-xs bg-muted px-2 py-1 rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
                                    >
                                        {orderId}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </Card>

                    {/* Error Message */}
                    {error && (
                        <Card className="max-w-2xl mx-auto p-6 mb-8 border-destructive/50 bg-destructive/5">
                            <div className="flex items-center gap-3">
                                <AlertCircle className="h-5 w-5 text-destructive" />
                                <div>
                                    <p className="font-semibold text-destructive">Order Not Found</p>
                                    <p className="text-sm text-muted-foreground">{error}</p>
                                </div>
                            </div>
                        </Card>
                    )}

                    {/* Multiple Orders List (for phone search) */}
                    {orders.length > 0 && (
                        <div className="max-w-2xl mx-auto space-y-4">
                            <h2 className="font-semibold text-lg">Found {orders.length} order(s)</h2>
                            {orders.map((o) => {
                                const info = getOrderStatusInfo(o.status)
                                return (
                                    <Card
                                        key={o.id}
                                        className="p-4 cursor-pointer hover:border-primary transition-colors"
                                        onClick={() => {
                                            setOrder(o)
                                            setOrders([])
                                        }}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-semibold">{o.id}</p>
                                                <p className="text-sm text-muted-foreground">
                                                    {o.items.length} item(s) • ₹{o.totalAmount.toLocaleString("en-IN")}
                                                </p>
                                            </div>
                                            <span className={cn("px-3 py-1 rounded-full text-sm font-medium", info.bgColor, info.color)}>
                                                {info.label}
                                            </span>
                                        </div>
                                    </Card>
                                )
                            })}
                        </div>
                    )}

                    {/* Order Details */}
                    {order && (
                        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Order Status */}
                            <Card className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <p className="font-semibold text-lg">{order.id}</p>
                                        <p className="text-sm text-muted-foreground">
                                            Placed on {new Date(order.createdAt).toLocaleDateString("en-IN")}
                                        </p>
                                    </div>
                                    {statusInfo && (
                                        <span
                                            className={cn(
                                                "px-4 py-2 rounded-full text-sm font-semibold",
                                                statusInfo.bgColor,
                                                statusInfo.color
                                            )}
                                        >
                                            {statusInfo.label}
                                        </span>
                                    )}
                                </div>

                                {/* Order Items */}
                                <div className="border-t border-border pt-4 mb-6">
                                    <p className="font-semibold mb-3">Order Items</p>
                                    {order.items.map((item, index) => (
                                        <div key={index} className="flex items-center gap-4 mb-3">
                                            <div className="relative w-16 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                                                <Image src={item.image || "/placeholder.svg"} alt={item.productName} fill className="object-cover" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-medium line-clamp-2">{item.productName}</p>
                                                <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                                                <p className="font-semibold">₹{item.price.toLocaleString("en-IN")}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Total */}
                                <div className="border-t border-border pt-4 flex justify-between items-center">
                                    <span className="font-semibold">Total Amount</span>
                                    <span className="text-xl font-bold">₹{order.totalAmount.toLocaleString("en-IN")}</span>
                                </div>

                                {/* Tracking Number */}
                                {order.trackingNumber && (
                                    <div className="border-t border-border pt-4 mt-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-muted-foreground">Tracking Number</p>
                                                <p className="font-mono font-semibold">{order.trackingNumber}</p>
                                            </div>
                                            <Truck className="h-5 w-5 text-primary" />
                                        </div>
                                    </div>
                                )}

                                {order.estimatedDelivery && (
                                    <div className="border-t border-border pt-4 mt-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-muted-foreground">Estimated Delivery</p>
                                                <p className="font-semibold">
                                                    {new Date(order.estimatedDelivery).toLocaleDateString("en-IN", {
                                                        weekday: "short",
                                                        year: "numeric",
                                                        month: "short",
                                                        day: "numeric",
                                                    })}
                                                </p>
                                            </div>
                                            <Clock className="h-5 w-5 text-primary" />
                                        </div>
                                    </div>
                                )}
                            </Card>

                            {/* Timeline */}
                            <Card className="p-6">
                                <h3 className="font-semibold text-lg mb-6 flex items-center gap-2">
                                    <Package className="h-5 w-5 text-primary" />
                                    Tracking Timeline
                                </h3>

                                <div className="space-y-0">
                                    {order.timeline.map((step, index) => (
                                        <TimelineItem
                                            key={index}
                                            status={step.status}
                                            date={step.date}
                                            time={step.time}
                                            description={step.description}
                                            completed={step.completed}
                                            isLast={index === order.timeline.length - 1}
                                        />
                                    ))}
                                </div>

                                {/* Shipping Address */}
                                <div className="border-t border-border pt-4 mt-4">
                                    <p className="font-semibold mb-2 flex items-center gap-2">
                                        <MapPin className="h-4 w-4 text-primary" />
                                        Shipping Address
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {order.customerName}
                                        <br />
                                        {order.shippingAddress.street}
                                        <br />
                                        {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
                                    </p>
                                </div>

                                {/* Contact */}
                                <div className="border-t border-border pt-4 mt-4 flex items-center gap-2">
                                    <Phone className="h-4 w-4 text-primary" />
                                    <span className="text-sm">{order.customerPhone}</span>
                                </div>

                                {/* Need Help */}
                                <div className="border-t border-border pt-4 mt-4">
                                    <p className="text-sm text-muted-foreground mb-2">Need help with this order?</p>
                                    <Button
                                        className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white gap-2"
                                        onClick={() =>
                                            window.open(
                                                `https://wa.me/919354815144?text=Hi! I need help with my order ${order.id}`,
                                                "_blank"
                                            )
                                        }
                                    >
                                        <MessageCircle className="h-4 w-4" />
                                        Contact Support on WhatsApp
                                    </Button>
                                </div>
                            </Card>
                        </div>
                    )}

                    {/* Empty State */}
                    {searched && !order && orders.length === 0 && !error && (
                        <div className="text-center py-12">
                            <Package className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                            <p className="text-lg font-semibold mb-2">No Results</p>
                            <p className="text-muted-foreground">Try searching with a different ID or phone number</p>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    )
}
