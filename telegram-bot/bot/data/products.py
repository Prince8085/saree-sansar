"""
Mock Products Data for Saree Sansar Bot
Synced with website data
"""

from typing import List, Dict, Optional

# Product Interface
class Product:
    def __init__(self, data: dict):
        self.id = data.get("id")
        self.name = data.get("name")
        self.price = data.get("price")
        self.original_price = data.get("original_price")
        self.fabric = data.get("fabric")
        self.category = data.get("category")
        self.color = data.get("color")
        self.occasion = data.get("occasion")
        self.images = data.get("images", [])
        self.slug = data.get("slug")
        self.description = data.get("description", "")
        self.stock = data.get("stock", 0)
        self.rating = data.get("rating", 0)
        self.review_count = data.get("review_count", 0)
        self.details = data.get("details", {})
    
    def get_discount_percent(self) -> int:
        if self.original_price and self.original_price > self.price:
            return int(((self.original_price - self.price) / self.original_price) * 100)
        return 0
    
    def get_stock_status(self) -> str:
        if self.stock == 0:
            return "❌ Out of Stock"
        elif self.stock <= 5:
            return f"⚠️ Only {self.stock} left!"
        else:
            return "✅ In Stock"
    
    def to_telegram_message(self) -> str:
        discount = self.get_discount_percent()
        discount_text = f" ({discount}% OFF!)" if discount > 0 else ""
        
        msg = f"""
🛍️ *{self.name}*

💰 *₹{self.price:,}*{discount_text}
{"~~₹" + str(self.original_price) + "~~" if self.original_price else ""}

🧵 *Fabric:* {self.fabric}
🎨 *Color:* {self.color.title()}
🎉 *Occasion:* {self.occasion.title()}
⭐ *Rating:* {self.rating}/5 ({self.review_count} reviews)
📦 *Stock:* {self.get_stock_status()}

{self.description}
"""
        return msg.strip()


# Mock Products Data
PRODUCTS_DATA = [
    {
        "id": "1",
        "name": "Royal Maroon Bridal Silk Saree with Heavy Embroidery",
        "price": 25999,
        "original_price": 32999,
        "fabric": "Pure Silk with Zari Work",
        "category": "bridal",
        "color": "red",
        "occasion": "wedding",
        "images": ["/maroon-bridal-silk-saree-gold-embroidery.jpg", "/maroon-saree-back-view-embroidery.jpg"],
        "slug": "royal-maroon-bridal-silk-saree",
        "description": "Experience luxury with this exquisite royal maroon bridal silk saree, featuring intricate gold embroidery and traditional zari work.",
        "stock": 5,
        "rating": 4.8,
        "review_count": 24,
        "details": {
            "fabric": "Pure Silk",
            "work": "Zari Embroidery",
            "length": "6.3 meters with blouse piece",
            "blouse": "Unstitched blouse piece included",
            "care": "Dry clean only",
            "color": "Maroon with Gold",
            "occasion": "Wedding, Reception, Special Events",
            "weight": "850 grams",
        },
    },
    {
        "id": "2",
        "name": "Traditional Kosa Silk Saree in Forest Green",
        "price": 12999,
        "original_price": 15999,
        "fabric": "Authentic Kosa Silk",
        "category": "kosa",
        "color": "green",
        "occasion": "party",
        "images": ["/green-kosa-silk-saree-traditional.jpg", "/green-kosa-silk-saree-drape.jpg"],
        "slug": "traditional-kosa-silk-green",
        "description": "Authentic Chhattisgarh Kosa silk saree with traditional craftsmanship.",
        "stock": 12,
        "rating": 4.6,
        "review_count": 18,
    },
    {
        "id": "3",
        "name": "Designer Banarasi Saree with Golden Border",
        "price": 18999,
        "original_price": 22999,
        "fabric": "Banarasi Silk",
        "category": "silk",
        "color": "purple",
        "occasion": "wedding",
        "images": ["/banarasi-saree-purple-golden-border.jpg", "/banarasi-saree-purple-close-up.jpg"],
        "slug": "designer-banarasi-golden-border",
        "description": "Stunning Banarasi silk saree with intricate golden border work.",
        "stock": 8,
        "rating": 4.9,
        "review_count": 32,
    },
    {
        "id": "4",
        "name": "Elegant Cotton Silk Saree in Royal Blue",
        "price": 8999,
        "original_price": 10999,
        "fabric": "Cotton Silk Blend",
        "category": "cotton",
        "color": "blue",
        "occasion": "party",
        "images": ["/royal-blue-cotton-silk-saree.jpg", "/blue-cotton-silk-saree-pattern.jpg"],
        "slug": "elegant-cotton-silk-royal-blue",
        "description": "Comfortable and elegant cotton silk blend perfect for parties.",
        "stock": 15,
        "rating": 4.5,
        "review_count": 45,
    },
    {
        "id": "5",
        "name": "Festive Red Georgette Saree",
        "price": 6999,
        "original_price": 8999,
        "fabric": "Georgette",
        "category": "georgette",
        "color": "red",
        "occasion": "party",
        "images": ["/luxurious-indian-bridal-wedding-saree-red-gold.jpg", "/elegant-indian-bride-in-red-bridal-saree-with-gold.jpg"],
        "slug": "festive-red-georgette-saree",
        "description": "Light and flowy georgette saree perfect for festive occasions.",
        "stock": 20,
        "rating": 4.3,
        "review_count": 28,
    },
    {
        "id": "6",
        "name": "Ivory Wedding Silk Saree",
        "price": 22999,
        "original_price": 28999,
        "fabric": "Pure Silk",
        "category": "bridal",
        "color": "white",
        "occasion": "wedding",
        "images": ["/traditional-kosa-silk-saree-elegant-woman.jpg", "/traditional-kosa-silk-saree-green-elegant.jpg"],
        "slug": "ivory-wedding-silk-saree",
        "description": "Elegant ivory silk saree for the modern bride.",
        "stock": 3,
        "rating": 4.7,
        "review_count": 15,
    },
    {
        "id": "7",
        "name": "Printed Cotton Kurti Set",
        "price": 2999,
        "original_price": 3999,
        "fabric": "Cotton",
        "category": "kurtis",
        "color": "multicolor",
        "occasion": "casual",
        "images": ["/modern-indian-kurti-ethnic-wear.jpg", "/colorful-indian-ghagra-choli-lehenga.jpg"],
        "slug": "printed-cotton-kurti-set",
        "description": "Comfortable printed cotton kurti set for daily wear.",
        "stock": 35,
        "rating": 4.4,
        "review_count": 67,
    },
    {
        "id": "8",
        "name": "Embroidered Salwar Suit",
        "price": 5999,
        "original_price": 7999,
        "fabric": "Chanderi",
        "category": "suits",
        "color": "pink",
        "occasion": "party",
        "images": ["/pink-floral-silk-saree-elegant.jpg", "/navy-blue-designer-saree-contemporary.jpg"],
        "slug": "embroidered-salwar-suit",
        "description": "Beautiful embroidered Chanderi salwar suit for special occasions.",
        "stock": 10,
        "rating": 4.6,
        "review_count": 23,
    },
    {
        "id": "9",
        "name": "Golden Banarasi Heavy Bridal Lehenga",
        "price": 35999,
        "original_price": 45999,
        "fabric": "Banarasi Brocade",
        "category": "ghagra",
        "color": "gold",
        "occasion": "wedding",
        "images": ["/golden-banarasi-silk-saree.jpg", "/luxurious-silk-sarees-display-traditional-indian.jpg"],
        "slug": "golden-banarasi-heavy-bridal-lehenga",
        "description": "Stunning golden Banarasi brocade lehenga for the bride.",
        "stock": 2,
        "rating": 5.0,
        "review_count": 8,
    },
    {
        "id": "10",
        "name": "Navy Blue Designer Indo-Western",
        "price": 9999,
        "original_price": 12999,
        "fabric": "Georgette with Net",
        "category": "indo-western",
        "color": "blue",
        "occasion": "party",
        "images": ["/navy-blue-designer-saree-contemporary.jpg", "/royal-blue-cotton-silk-saree.jpg"],
        "slug": "navy-blue-designer-indo-western",
        "description": "Modern indo-western outfit for the contemporary woman.",
        "stock": 7,
        "rating": 4.5,
        "review_count": 19,
    },
]

# Create Product objects
PRODUCTS: List[Product] = [Product(p) for p in PRODUCTS_DATA]


# Helper functions
def get_all_products() -> List[Product]:
    """Get all products"""
    return PRODUCTS


def get_product_by_id(product_id: str) -> Optional[Product]:
    """Get product by ID"""
    for p in PRODUCTS:
        if p.id == product_id:
            return p
    return None


def get_products_by_category(category: str) -> List[Product]:
    """Get products by category"""
    return [p for p in PRODUCTS if p.category.lower() == category.lower()]


def search_products(query: str) -> List[Product]:
    """Search products by name, fabric, color, occasion"""
    query = query.lower()
    results = []
    
    for p in PRODUCTS:
        if (query in p.name.lower() or
            query in p.fabric.lower() or
            query in p.color.lower() or
            query in p.occasion.lower() or
            query in p.category.lower()):
            results.append(p)
    
    return results


def filter_products(
    min_price: int = 0,
    max_price: int = 100000,
    colors: List[str] = None,
    categories: List[str] = None,
    occasions: List[str] = None
) -> List[Product]:
    """Filter products based on criteria"""
    results = []
    
    for p in PRODUCTS:
        # Price filter
        if not (min_price <= p.price <= max_price):
            continue
        
        # Color filter
        if colors and p.color.lower() not in [c.lower() for c in colors]:
            continue
        
        # Category filter
        if categories and p.category.lower() not in [c.lower() for c in categories]:
            continue
        
        # Occasion filter
        if occasions and p.occasion.lower() not in [o.lower() for o in occasions]:
            continue
        
        results.append(p)
    
    return results


def get_featured_products(limit: int = 4) -> List[Product]:
    """Get featured/top rated products"""
    sorted_products = sorted(PRODUCTS, key=lambda x: x.rating, reverse=True)
    return sorted_products[:limit]


def get_products_on_sale() -> List[Product]:
    """Get products with discounts"""
    return [p for p in PRODUCTS if p.original_price and p.original_price > p.price]
