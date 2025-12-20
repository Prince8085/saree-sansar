"""
Telegram Inline Keyboards for Saree Sansar Bot
"""

from telegram import InlineKeyboardButton, InlineKeyboardMarkup, ReplyKeyboardMarkup, KeyboardButton
from typing import List
from ..config import CATEGORIES

# Main Menu Keyboard
def get_main_menu_keyboard() -> ReplyKeyboardMarkup:
    """Get main menu reply keyboard"""
    keyboard = [
        [KeyboardButton("🛍️ Products"), KeyboardButton("🔍 Search")],
        [KeyboardButton("🛒 Cart"), KeyboardButton("📦 My Orders")],
        [KeyboardButton("👗 Virtual Try-On"), KeyboardButton("📞 Contact Us")],
        [KeyboardButton("❓ Help")],
    ]
    return ReplyKeyboardMarkup(keyboard, resize_keyboard=True)


# Categories Inline Keyboard
def get_categories_keyboard() -> InlineKeyboardMarkup:
    """Get categories inline keyboard"""
    buttons = []
    row = []
    
    for i, cat in enumerate(CATEGORIES):
        row.append(InlineKeyboardButton(
            f"{cat['emoji']} {cat['name']}",
            callback_data=f"category_{cat['id']}"
        ))
        
        if len(row) == 2:
            buttons.append(row)
            row = []
    
    if row:
        buttons.append(row)
    
    # Add view all button
    buttons.append([InlineKeyboardButton("📋 View All Products", callback_data="category_all")])
    
    return InlineKeyboardMarkup(buttons)


# Product Actions Keyboard
def get_product_keyboard(product_id: str) -> InlineKeyboardMarkup:
    """Get product action buttons"""
    buttons = [
        [
            InlineKeyboardButton("🛒 Add to Cart", callback_data=f"add_cart_{product_id}"),
            InlineKeyboardButton("💳 Buy Now", callback_data=f"buy_now_{product_id}"),
        ],
        [
            InlineKeyboardButton("👗 Virtual Try-On", callback_data=f"tryon_{product_id}"),
        ],
        [
            InlineKeyboardButton("📱 WhatsApp Inquiry", callback_data=f"whatsapp_{product_id}"),
            InlineKeyboardButton("🔙 Back", callback_data="back_products"),
        ],
    ]
    return InlineKeyboardMarkup(buttons)


# Product List Keyboard (with pagination)
def get_products_list_keyboard(
    products: list,
    page: int = 0,
    per_page: int = 5,
    category: str = None
) -> InlineKeyboardMarkup:
    """Get products list with pagination"""
    start = page * per_page
    end = start + per_page
    current_products = products[start:end]
    total_pages = (len(products) + per_page - 1) // per_page
    
    buttons = []
    
    # Product buttons
    for p in current_products:
        price_text = f"₹{p.price:,}"
        if p.original_price:
            discount = p.get_discount_percent()
            price_text += f" ({discount}% OFF)"
        
        buttons.append([
            InlineKeyboardButton(
                f"{p.name[:30]}... - {price_text}",
                callback_data=f"product_{p.id}"
            )
        ])
    
    # Pagination buttons
    nav_row = []
    if page > 0:
        nav_row.append(InlineKeyboardButton("⬅️ Previous", callback_data=f"page_{page-1}_{category or 'all'}"))
    nav_row.append(InlineKeyboardButton(f"📄 {page+1}/{total_pages}", callback_data="noop"))
    if page < total_pages - 1:
        nav_row.append(InlineKeyboardButton("Next ➡️", callback_data=f"page_{page+1}_{category or 'all'}"))
    
    if nav_row:
        buttons.append(nav_row)
    
    # Back button
    buttons.append([InlineKeyboardButton("🔙 Back to Categories", callback_data="back_categories")])
    
    return InlineKeyboardMarkup(buttons)


# Cart Keyboard
def get_cart_keyboard(cart_items: list) -> InlineKeyboardMarkup:
    """Get cart actions keyboard"""
    if not cart_items:
        return InlineKeyboardMarkup([
            [InlineKeyboardButton("🛍️ Start Shopping", callback_data="back_categories")]
        ])
    
    buttons = []
    
    # Remove item buttons
    for item in cart_items:
        buttons.append([
            InlineKeyboardButton(
                f"❌ Remove {item['name'][:20]}...",
                callback_data=f"remove_cart_{item['product_id']}"
            )
        ])
    
    # Action buttons
    buttons.append([
        InlineKeyboardButton("🗑️ Clear Cart", callback_data="clear_cart"),
    ])
    buttons.append([
        InlineKeyboardButton("💳 Checkout", callback_data="checkout"),
    ])
    buttons.append([
        InlineKeyboardButton("🛍️ Continue Shopping", callback_data="back_categories"),
    ])
    
    return InlineKeyboardMarkup(buttons)


# Payment Method Keyboard
def get_payment_keyboard() -> InlineKeyboardMarkup:
    """Get payment method selection"""
    buttons = [
        [InlineKeyboardButton("📱 UPI Payment", callback_data="payment_upi")],
        [InlineKeyboardButton("💵 Cash on Delivery (COD)", callback_data="payment_cod")],
        [InlineKeyboardButton("🔙 Back", callback_data="back_cart")],
    ]
    return InlineKeyboardMarkup(buttons)


# Confirm Order Keyboard
def get_confirm_order_keyboard() -> InlineKeyboardMarkup:
    """Get order confirmation buttons"""
    buttons = [
        [InlineKeyboardButton("✅ Confirm Order", callback_data="confirm_order")],
        [InlineKeyboardButton("❌ Cancel", callback_data="cancel_order")],
    ]
    return InlineKeyboardMarkup(buttons)


# Order Actions Keyboard
def get_order_keyboard(order_id: str) -> InlineKeyboardMarkup:
    """Get order action buttons"""
    buttons = [
        [InlineKeyboardButton("📍 Track Order", callback_data=f"track_{order_id}")],
        [InlineKeyboardButton("📱 WhatsApp Support", callback_data=f"order_whatsapp_{order_id}")],
        [InlineKeyboardButton("🔙 Back to Orders", callback_data="back_orders")],
    ]
    return InlineKeyboardMarkup(buttons)


# Virtual Try-On Keyboard
def get_tryon_keyboard(product_id: str = None) -> InlineKeyboardMarkup:
    """Get virtual try-on buttons"""
    buttons = []
    
    if product_id:
        buttons.append([
            InlineKeyboardButton("📸 Upload Your Photo", callback_data=f"upload_photo_{product_id}")
        ])
        buttons.append([
            InlineKeyboardButton("🔙 Back to Product", callback_data=f"product_{product_id}")
        ])
    else:
        buttons.append([
            InlineKeyboardButton("🛍️ Choose a Saree First", callback_data="back_categories")
        ])
    
    return InlineKeyboardMarkup(buttons)


# Contact Keyboard
def get_contact_keyboard() -> InlineKeyboardMarkup:
    """Get contact options keyboard"""
    buttons = [
        [InlineKeyboardButton("📱 WhatsApp", url="https://wa.me/919354815144")],
        [InlineKeyboardButton("📞 Call Us", callback_data="show_phone")],
        [InlineKeyboardButton("📍 Store Location", callback_data="show_location")],
    ]
    return InlineKeyboardMarkup(buttons)


# Yes/No Confirmation
def get_yes_no_keyboard(action: str) -> InlineKeyboardMarkup:
    """Generic yes/no confirmation"""
    buttons = [
        [
            InlineKeyboardButton("✅ Yes", callback_data=f"yes_{action}"),
            InlineKeyboardButton("❌ No", callback_data=f"no_{action}"),
        ]
    ]
    return InlineKeyboardMarkup(buttons)


# Quick Search Filters
def get_search_filters_keyboard() -> InlineKeyboardMarkup:
    """Get quick search filter buttons"""
    buttons = [
        [
            InlineKeyboardButton("💰 Under ₹10K", callback_data="filter_price_0_10000"),
            InlineKeyboardButton("💰 ₹10K-₹20K", callback_data="filter_price_10000_20000"),
        ],
        [
            InlineKeyboardButton("💰 ₹20K-₹30K", callback_data="filter_price_20000_30000"),
            InlineKeyboardButton("💰 Above ₹30K", callback_data="filter_price_30000_100000"),
        ],
        [
            InlineKeyboardButton("🎨 Red", callback_data="filter_color_red"),
            InlineKeyboardButton("🎨 Green", callback_data="filter_color_green"),
            InlineKeyboardButton("🎨 Blue", callback_data="filter_color_blue"),
        ],
        [
            InlineKeyboardButton("💒 Wedding", callback_data="filter_occasion_wedding"),
            InlineKeyboardButton("🎉 Party", callback_data="filter_occasion_party"),
        ],
        [InlineKeyboardButton("🔙 Clear Filters", callback_data="clear_filters")],
    ]
    return InlineKeyboardMarkup(buttons)
