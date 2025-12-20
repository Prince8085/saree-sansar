"""
Configuration for Saree Sansar Telegram Bot
API keys and settings are hardcoded for now (move to env vars in production)
"""
import os

# Telegram Bot Configuration
TELEGRAM_BOT_TOKEN = "8555801948:AAEfjFn6uZRiizgygGhLu3tm2Slk_S-De3g"

# AI API Keys
GROQ_API_KEY = "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"
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")  # To be provided

# Admin Panel Configuration
ADMIN_SECRET_KEY = "saree_sansar_secret_2024"
ADMIN_USERNAME = "admin"
ADMIN_PASSWORD = "SareeSansar@123"
ADMIN_PORT = 5000

# Business Information
STORE_NAME = "Saree Sansar"
STORE_TAGLINE = "सारी संसार - Where Tradition Meets Elegance"
WHATSAPP_NUMBER = "919354815144"
STORE_ADDRESS = "Shree Ram New Cloth Market, Bilaspur, Chhattisgarh"
STORE_SINCE = "2000"

# Payment Configuration
UPI_ID = "sareesansar@upi"
COD_AVAILABLE = True
MIN_ORDER_FREE_DELIVERY = 10000  # Free delivery above ₹10,000

# Bot Messages (Hindlish)
WELCOME_MESSAGE = """
🙏 *Saree Sansar mein aapka swagat hai!*

Hum 2000 se authentic sarees aur ethnic wear provide kar rahe hain.

*Aap yahan kya kar sakte ho:*
🛍️ Products browse karein
🔍 AI se saree search karein
👗 Virtual Try-On karein
🛒 Order place karein
📦 Order track karein

Neeche buttons use karein ya command type karein! 👇
"""

HELP_MESSAGE = """
📚 *Available Commands:*

/start - Main menu
/products - Browse all products
/search <query> - Search products
/cart - View your cart
/orders - Your order history
/track <order_id> - Track order
/tryon - Virtual try-on
/contact - Contact us
/help - Show this help

💡 *Tips:*
• Hindi ya English mein search kar sakte ho
• "Red bridal saree under 20k" jaisa search karein
• Photo upload karke virtual try-on karein
"""

# AI System Prompts
GROQ_SYSTEM_PROMPT = """You are a helpful shopping assistant for Saree Sansar, a premium saree and ethnic wear store from Bilaspur, Chhattisgarh, India.

Key information:
- Store name: Saree Sansar (Since 2000)
- WhatsApp: +91 9354815144
- Location: Shree Ram New Cloth Market, Bilaspur

Your role:
1. Help customers find the perfect saree/ethnic wear
2. Answer questions about products, pricing, delivery
3. Understand Hindi, Hindlish, and English queries
4. Be friendly, helpful, and culturally aware
5. Recommend products based on occasion, budget, color preferences

Response style:
- Use Hindlish (mix of Hindi and English)
- Keep responses concise but helpful
- Use emojis appropriately
- Always be polite and respectful
"""

# Categories
CATEGORIES = [
    {"id": "bridal", "name": "Bridal Sarees", "emoji": "👰"},
    {"id": "kosa", "name": "Kosa Silk", "emoji": "🌿"},
    {"id": "silk", "name": "Banarasi Silk", "emoji": "✨"},
    {"id": "cotton", "name": "Cotton Silk", "emoji": "🌸"},
    {"id": "georgette", "name": "Georgette", "emoji": "🌺"},
    {"id": "ghagra", "name": "Ghagra Chunni", "emoji": "💃"},
    {"id": "kurtis", "name": "Kurtis", "emoji": "👚"},
    {"id": "suits", "name": "Salwar Suits", "emoji": "👗"},
]

# Order Status
ORDER_STATUS = {
    "pending": {"label": "Pending", "emoji": "⏳"},
    "confirmed": {"label": "Confirmed", "emoji": "✅"},
    "processing": {"label": "Processing", "emoji": "📦"},
    "shipped": {"label": "Shipped", "emoji": "🚚"},
    "out_for_delivery": {"label": "Out for Delivery", "emoji": "🏃"},
    "delivered": {"label": "Delivered", "emoji": "🎉"},
    "cancelled": {"label": "Cancelled", "emoji": "❌"},
}
