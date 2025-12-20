"""
Mock Orders Data for Saree Sansar Bot
"""

from typing import List, Dict, Optional
from datetime import datetime
import random
import string

# Order storage (in-memory)
ORDERS: Dict[str, dict] = {}

# User carts (in-memory)
USER_CARTS: Dict[int, List[dict]] = {}


def generate_order_id() -> str:
    """Generate unique order ID"""
    random_part = ''.join(random.choices(string.digits, k=4))
    return f"ORD-2025-{random_part}"


def generate_tracking_number() -> str:
    """Generate tracking number"""
    return f"SSXP{''.join(random.choices(string.digits, k=10))}"


class Order:
    def __init__(self, data: dict):
        self.id = data.get("id")
        self.user_id = data.get("user_id")
        self.customer_name = data.get("customer_name")
        self.customer_phone = data.get("customer_phone")
        self.items = data.get("items", [])
        self.total_amount = data.get("total_amount", 0)
        self.status = data.get("status", "pending")
        self.payment_method = data.get("payment_method", "cod")
        self.payment_status = data.get("payment_status", "pending")
        self.shipping_address = data.get("shipping_address", {})
        self.tracking_number = data.get("tracking_number")
        self.estimated_delivery = data.get("estimated_delivery")
        self.timeline = data.get("timeline", [])
        self.created_at = data.get("created_at", datetime.now().isoformat())
        self.updated_at = data.get("updated_at", datetime.now().isoformat())
    
    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "user_id": self.user_id,
            "customer_name": self.customer_name,
            "customer_phone": self.customer_phone,
            "items": self.items,
            "total_amount": self.total_amount,
            "status": self.status,
            "payment_method": self.payment_method,
            "payment_status": self.payment_status,
            "shipping_address": self.shipping_address,
            "tracking_number": self.tracking_number,
            "estimated_delivery": self.estimated_delivery,
            "timeline": self.timeline,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }
    
    def get_status_emoji(self) -> str:
        status_emojis = {
            "pending": "⏳",
            "confirmed": "✅",
            "processing": "📦",
            "shipped": "🚚",
            "out_for_delivery": "🏃",
            "delivered": "🎉",
            "cancelled": "❌",
        }
        return status_emojis.get(self.status, "❓")
    
    def to_telegram_message(self) -> str:
        items_text = "\n".join([
            f"  • {item['name']} x{item['quantity']} - ₹{item['price']:,}"
            for item in self.items
        ])
        
        msg = f"""
📦 *Order Details*

🆔 *Order ID:* `{self.id}`
{self.get_status_emoji()} *Status:* {self.status.replace('_', ' ').title()}

*Items:*
{items_text}

💰 *Total:* ₹{self.total_amount:,}
💳 *Payment:* {self.payment_method.upper()} ({self.payment_status.title()})

📍 *Shipping Address:*
{self.shipping_address.get('street', '')}
{self.shipping_address.get('city', '')}, {self.shipping_address.get('state', '')}
PIN: {self.shipping_address.get('pincode', '')}

🚚 *Tracking:* `{self.tracking_number or 'Not assigned yet'}`
📅 *Expected Delivery:* {self.estimated_delivery or 'TBD'}
"""
        return msg.strip()


# Initialize with some mock orders
MOCK_ORDERS = [
    {
        "id": "ORD-2025-1234",
        "user_id": 123456789,
        "customer_name": "Priya Sharma",
        "customer_phone": "+91 9876543210",
        "items": [
            {
                "product_id": "1",
                "name": "Royal Maroon Bridal Silk Saree",
                "quantity": 1,
                "price": 25999,
                "image": "/maroon-bridal-silk-saree-gold-embroidery.jpg",
            },
        ],
        "total_amount": 25999,
        "status": "delivered",
        "payment_method": "upi",
        "payment_status": "paid",
        "shipping_address": {
            "street": "123, Gandhi Nagar",
            "city": "Raipur",
            "state": "Chhattisgarh",
            "pincode": "492001",
        },
        "tracking_number": "SSXP1234567890",
        "estimated_delivery": "2025-01-08",
        "timeline": [
            {"status": "Order Placed", "date": "2025-01-03", "time": "10:30 AM", "completed": True},
            {"status": "Order Confirmed", "date": "2025-01-03", "time": "11:45 AM", "completed": True},
            {"status": "Processing", "date": "2025-01-04", "time": "09:00 AM", "completed": True},
            {"status": "Shipped", "date": "2025-01-05", "time": "02:30 PM", "completed": True},
            {"status": "Out for Delivery", "date": "2025-01-07", "time": "08:00 AM", "completed": True},
            {"status": "Delivered", "date": "2025-01-07", "time": "04:15 PM", "completed": True},
        ],
        "created_at": "2025-01-03T10:30:00Z",
        "updated_at": "2025-01-07T16:15:00Z",
    },
    {
        "id": "ORD-2025-1235",
        "user_id": 987654321,
        "customer_name": "Anjali Verma",
        "customer_phone": "+91 9876543211",
        "items": [
            {
                "product_id": "2",
                "name": "Traditional Kosa Silk Saree",
                "quantity": 1,
                "price": 12999,
                "image": "/green-kosa-silk-saree-traditional.jpg",
            },
        ],
        "total_amount": 12999,
        "status": "shipped",
        "payment_method": "cod",
        "payment_status": "pending",
        "shipping_address": {
            "street": "456, Nehru Chowk",
            "city": "Bilaspur",
            "state": "Chhattisgarh",
            "pincode": "495001",
        },
        "tracking_number": "SSXP1234567891",
        "estimated_delivery": "2025-01-16",
        "timeline": [
            {"status": "Order Placed", "date": "2025-01-10", "time": "02:15 PM", "completed": True},
            {"status": "Order Confirmed", "date": "2025-01-10", "time": "03:00 PM", "completed": True},
            {"status": "Processing", "date": "2025-01-11", "time": "10:00 AM", "completed": True},
            {"status": "Shipped", "date": "2025-01-12", "time": "11:30 AM", "completed": True},
            {"status": "Out for Delivery", "date": "", "time": "", "completed": False},
            {"status": "Delivered", "date": "", "time": "", "completed": False},
        ],
        "created_at": "2025-01-10T14:15:00Z",
        "updated_at": "2025-01-12T11:30:00Z",
    },
]

# Initialize orders
for order_data in MOCK_ORDERS:
    ORDERS[order_data["id"]] = order_data


# Cart Functions
def get_user_cart(user_id: int) -> List[dict]:
    """Get user's cart"""
    return USER_CARTS.get(user_id, [])


def add_to_cart(user_id: int, product_id: str, product_name: str, price: int, quantity: int = 1) -> bool:
    """Add item to cart"""
    if user_id not in USER_CARTS:
        USER_CARTS[user_id] = []
    
    # Check if product already in cart
    for item in USER_CARTS[user_id]:
        if item["product_id"] == product_id:
            item["quantity"] += quantity
            return True
    
    # Add new item
    USER_CARTS[user_id].append({
        "product_id": product_id,
        "name": product_name,
        "price": price,
        "quantity": quantity,
    })
    return True


def remove_from_cart(user_id: int, product_id: str) -> bool:
    """Remove item from cart"""
    if user_id not in USER_CARTS:
        return False
    
    USER_CARTS[user_id] = [
        item for item in USER_CARTS[user_id]
        if item["product_id"] != product_id
    ]
    return True


def clear_cart(user_id: int) -> bool:
    """Clear user's cart"""
    USER_CARTS[user_id] = []
    return True


def get_cart_total(user_id: int) -> int:
    """Get total cart value"""
    cart = get_user_cart(user_id)
    return sum(item["price"] * item["quantity"] for item in cart)


# Order Functions
def create_order(
    user_id: int,
    customer_name: str,
    customer_phone: str,
    items: List[dict],
    total_amount: int,
    payment_method: str,
    shipping_address: dict
) -> Order:
    """Create new order"""
    order_id = generate_order_id()
    tracking_number = generate_tracking_number()
    
    # Calculate estimated delivery (7 days from now)
    from datetime import timedelta
    estimated_delivery = (datetime.now() + timedelta(days=7)).strftime("%Y-%m-%d")
    
    order_data = {
        "id": order_id,
        "user_id": user_id,
        "customer_name": customer_name,
        "customer_phone": customer_phone,
        "items": items,
        "total_amount": total_amount,
        "status": "pending",
        "payment_method": payment_method,
        "payment_status": "pending" if payment_method == "cod" else "pending",
        "shipping_address": shipping_address,
        "tracking_number": tracking_number,
        "estimated_delivery": estimated_delivery,
        "timeline": [
            {
                "status": "Order Placed",
                "date": datetime.now().strftime("%Y-%m-%d"),
                "time": datetime.now().strftime("%I:%M %p"),
                "completed": True
            },
            {"status": "Order Confirmed", "date": "", "time": "", "completed": False},
            {"status": "Processing", "date": "", "time": "", "completed": False},
            {"status": "Shipped", "date": "", "time": "", "completed": False},
            {"status": "Out for Delivery", "date": "", "time": "", "completed": False},
            {"status": "Delivered", "date": "", "time": "", "completed": False},
        ],
        "created_at": datetime.now().isoformat(),
        "updated_at": datetime.now().isoformat(),
    }
    
    ORDERS[order_id] = order_data
    return Order(order_data)


def get_order_by_id(order_id: str) -> Optional[Order]:
    """Get order by ID"""
    order_data = ORDERS.get(order_id.upper())
    if order_data:
        return Order(order_data)
    return None


def get_orders_by_user(user_id: int) -> List[Order]:
    """Get all orders for a user"""
    user_orders = [
        Order(data) for data in ORDERS.values()
        if data.get("user_id") == user_id
    ]
    return sorted(user_orders, key=lambda x: x.created_at, reverse=True)


def get_all_orders() -> List[Order]:
    """Get all orders (for admin)"""
    return [Order(data) for data in ORDERS.values()]


def update_order_status(order_id: str, new_status: str) -> Optional[Order]:
    """Update order status"""
    if order_id not in ORDERS:
        return None
    
    ORDERS[order_id]["status"] = new_status
    ORDERS[order_id]["updated_at"] = datetime.now().isoformat()
    
    # Update timeline
    status_map = {
        "pending": 0,
        "confirmed": 1,
        "processing": 2,
        "shipped": 3,
        "out_for_delivery": 4,
        "delivered": 5,
    }
    
    if new_status in status_map:
        idx = status_map[new_status]
        ORDERS[order_id]["timeline"][idx]["completed"] = True
        ORDERS[order_id]["timeline"][idx]["date"] = datetime.now().strftime("%Y-%m-%d")
        ORDERS[order_id]["timeline"][idx]["time"] = datetime.now().strftime("%I:%M %p")
        
        # If delivered, mark payment as paid for COD
        if new_status == "delivered" and ORDERS[order_id]["payment_method"] == "cod":
            ORDERS[order_id]["payment_status"] = "paid"
    
    return Order(ORDERS[order_id])


def get_order_by_tracking(tracking_number: str) -> Optional[Order]:
    """Get order by tracking number"""
    for order_data in ORDERS.values():
        if order_data.get("tracking_number", "").upper() == tracking_number.upper():
            return Order(order_data)
    return None
