// Mock orders data with tracking
export interface OrderItem {
    productId: string
    productName: string
    quantity: number
    price: number
    image: string
}

export interface OrderTimeline {
    status: string
    date: string
    time: string
    description: string
    completed: boolean
}

export interface Order {
    id: string
    customerId: string
    customerName: string
    customerPhone: string
    customerEmail?: string
    items: OrderItem[]
    totalAmount: number
    status: "pending" | "confirmed" | "processing" | "shipped" | "out_for_delivery" | "delivered" | "cancelled"
    paymentMethod: "cod" | "upi" | "card" | "whatsapp"
    paymentStatus: "pending" | "paid" | "refunded"
    shippingAddress: {
        street: string
        city: string
        state: string
        pincode: string
    }
    trackingNumber?: string
    estimatedDelivery?: string
    timeline: OrderTimeline[]
    createdAt: string
    updatedAt: string
}

// Mock orders data
let orders: Order[] = [
    {
        id: "ORD-2025-1234",
        customerId: "cust1",
        customerName: "Priya Sharma",
        customerPhone: "+91 9876543210",
        customerEmail: "priya@email.com",
        items: [
            {
                productId: "1",
                productName: "Royal Maroon Bridal Silk Saree",
                quantity: 1,
                price: 25999,
                image: "/maroon-bridal-silk-saree-gold-embroidery.jpg",
            },
        ],
        totalAmount: 25999,
        status: "delivered",
        paymentMethod: "upi",
        paymentStatus: "paid",
        shippingAddress: {
            street: "123, Gandhi Nagar",
            city: "Raipur",
            state: "Chhattisgarh",
            pincode: "492001",
        },
        trackingNumber: "SSXP1234567890",
        estimatedDelivery: "2025-01-08",
        timeline: [
            { status: "Order Placed", date: "2025-01-03", time: "10:30 AM", description: "Your order has been placed successfully", completed: true },
            { status: "Order Confirmed", date: "2025-01-03", time: "11:45 AM", description: "Order confirmed by Saree Sansar", completed: true },
            { status: "Processing", date: "2025-01-04", time: "09:00 AM", description: "Your saree is being carefully packed", completed: true },
            { status: "Shipped", date: "2025-01-05", time: "02:30 PM", description: "Package handed to courier partner", completed: true },
            { status: "Out for Delivery", date: "2025-01-07", time: "08:00 AM", description: "Your package is out for delivery", completed: true },
            { status: "Delivered", date: "2025-01-07", time: "04:15 PM", description: "Package delivered successfully", completed: true },
        ],
        createdAt: "2025-01-03T10:30:00Z",
        updatedAt: "2025-01-07T16:15:00Z",
    },
    {
        id: "ORD-2025-1235",
        customerId: "cust2",
        customerName: "Anjali Verma",
        customerPhone: "+91 9876543211",
        items: [
            {
                productId: "2",
                productName: "Traditional Kosa Silk Saree",
                quantity: 1,
                price: 12999,
                image: "/green-kosa-silk-saree-traditional.jpg",
            },
        ],
        totalAmount: 12999,
        status: "shipped",
        paymentMethod: "cod",
        paymentStatus: "pending",
        shippingAddress: {
            street: "456, Nehru Chowk",
            city: "Bilaspur",
            state: "Chhattisgarh",
            pincode: "495001",
        },
        trackingNumber: "SSXP1234567891",
        estimatedDelivery: "2025-01-16",
        timeline: [
            { status: "Order Placed", date: "2025-01-10", time: "02:15 PM", description: "Your order has been placed successfully", completed: true },
            { status: "Order Confirmed", date: "2025-01-10", time: "03:00 PM", description: "Order confirmed by Saree Sansar", completed: true },
            { status: "Processing", date: "2025-01-11", time: "10:00 AM", description: "Your saree is being carefully packed", completed: true },
            { status: "Shipped", date: "2025-01-12", time: "11:30 AM", description: "Package handed to courier partner", completed: true },
            { status: "Out for Delivery", date: "", time: "", description: "Your package will be out for delivery soon", completed: false },
            { status: "Delivered", date: "", time: "", description: "Package will be delivered", completed: false },
        ],
        createdAt: "2025-01-10T14:15:00Z",
        updatedAt: "2025-01-12T11:30:00Z",
    },
    {
        id: "ORD-2025-1236",
        customerId: "cust3",
        customerName: "Kavita Patel",
        customerPhone: "+91 9876543212",
        items: [
            {
                productId: "3",
                productName: "Designer Banarasi Saree",
                quantity: 1,
                price: 18999,
                image: "/banarasi-saree-purple-golden-border.jpg",
            },
        ],
        totalAmount: 18999,
        status: "processing",
        paymentMethod: "upi",
        paymentStatus: "paid",
        shippingAddress: {
            street: "789, Station Road",
            city: "Korba",
            state: "Chhattisgarh",
            pincode: "495677",
        },
        estimatedDelivery: "2025-01-18",
        timeline: [
            { status: "Order Placed", date: "2025-01-13", time: "11:00 AM", description: "Your order has been placed successfully", completed: true },
            { status: "Order Confirmed", date: "2025-01-13", time: "11:30 AM", description: "Order confirmed by Saree Sansar", completed: true },
            { status: "Processing", date: "2025-01-14", time: "09:30 AM", description: "Your saree is being carefully packed", completed: true },
            { status: "Shipped", date: "", time: "", description: "Package will be handed to courier", completed: false },
            { status: "Out for Delivery", date: "", time: "", description: "Your package will be out for delivery", completed: false },
            { status: "Delivered", date: "", time: "", description: "Package will be delivered", completed: false },
        ],
        createdAt: "2025-01-13T11:00:00Z",
        updatedAt: "2025-01-14T09:30:00Z",
    },
    {
        id: "ORD-2025-1237",
        customerId: "cust4",
        customerName: "Sunita Gupta",
        customerPhone: "+91 9876543213",
        items: [
            {
                productId: "4",
                productName: "Elegant Cotton Silk Saree",
                quantity: 2,
                price: 8999,
                image: "/royal-blue-cotton-silk-saree.jpg",
            },
        ],
        totalAmount: 17998,
        status: "pending",
        paymentMethod: "whatsapp",
        paymentStatus: "pending",
        shippingAddress: {
            street: "101, Civil Lines",
            city: "Durg",
            state: "Chhattisgarh",
            pincode: "491001",
        },
        estimatedDelivery: "2025-01-20",
        timeline: [
            { status: "Order Placed", date: "2025-01-14", time: "04:00 PM", description: "Your order has been placed via WhatsApp", completed: true },
            { status: "Order Confirmed", date: "", time: "", description: "Awaiting confirmation", completed: false },
            { status: "Processing", date: "", time: "", description: "Your saree will be packed soon", completed: false },
            { status: "Shipped", date: "", time: "", description: "Package will be shipped", completed: false },
            { status: "Out for Delivery", date: "", time: "", description: "Your package will be out for delivery", completed: false },
            { status: "Delivered", date: "", time: "", description: "Package will be delivered", completed: false },
        ],
        createdAt: "2025-01-14T16:00:00Z",
        updatedAt: "2025-01-14T16:00:00Z",
    },
]

// Get order by ID
export function getOrderById(orderId: string): Order | undefined {
    return orders.find((o) => o.id.toLowerCase() === orderId.toLowerCase())
}

// Get order by tracking number
export function getOrderByTracking(trackingNumber: string): Order | undefined {
    return orders.find((o) => o.trackingNumber?.toLowerCase() === trackingNumber.toLowerCase())
}

// Get orders by customer phone
export function getOrdersByPhone(phone: string): Order[] {
    const cleanPhone = phone.replace(/\s+/g, "").replace("+91", "")
    return orders.filter((o) => o.customerPhone.replace(/\s+/g, "").replace("+91", "").includes(cleanPhone))
}

// Get all orders
export function getAllOrders(): Order[] {
    return orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

// Get orders by status
export function getOrdersByStatus(status: Order["status"]): Order[] {
    return orders.filter((o) => o.status === status)
}

// Update order status
export function updateOrderStatus(orderId: string, status: Order["status"]): Order | undefined {
    const order = orders.find((o) => o.id === orderId)
    if (order) {
        order.status = status
        order.updatedAt = new Date().toISOString()

        // Update timeline
        const statusMap: Record<string, number> = {
            pending: 0,
            confirmed: 1,
            processing: 2,
            shipped: 3,
            out_for_delivery: 4,
            delivered: 5,
        }

        const statusIndex = statusMap[status]
        if (statusIndex !== undefined) {
            const now = new Date()
            order.timeline[statusIndex].completed = true
            order.timeline[statusIndex].date = now.toLocaleDateString("en-IN")
            order.timeline[statusIndex].time = now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })
        }
    }
    return order
}

// Get status display info
export function getOrderStatusInfo(status: Order["status"]): { label: string; color: string; bgColor: string } {
    const statusInfo: Record<Order["status"], { label: string; color: string; bgColor: string }> = {
        pending: { label: "Pending", color: "text-yellow-700", bgColor: "bg-yellow-100" },
        confirmed: { label: "Confirmed", color: "text-blue-700", bgColor: "bg-blue-100" },
        processing: { label: "Processing", color: "text-purple-700", bgColor: "bg-purple-100" },
        shipped: { label: "Shipped", color: "text-indigo-700", bgColor: "bg-indigo-100" },
        out_for_delivery: { label: "Out for Delivery", color: "text-orange-700", bgColor: "bg-orange-100" },
        delivered: { label: "Delivered", color: "text-green-700", bgColor: "bg-green-100" },
        cancelled: { label: "Cancelled", color: "text-red-700", bgColor: "bg-red-100" },
    }
    return statusInfo[status]
}
