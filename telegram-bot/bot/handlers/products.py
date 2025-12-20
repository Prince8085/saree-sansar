"""
Product Browsing and Display Handlers
"""

from telegram import Update, InputMediaPhoto
from telegram.ext import ContextTypes
from ..data import (
    get_all_products, 
    get_product_by_id, 
    get_products_by_category,
    search_products,
    filter_products,
    get_featured_products,
)
from ..utils import (
    get_categories_keyboard,
    get_product_keyboard,
    get_products_list_keyboard,
    format_price,
)
from ..config import CATEGORIES


async def show_categories(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Show product categories"""
    text = """
🛍️ *Shop by Category*

Apni pasand ki category select karein:
"""
    
    # Handle both message and callback
    if update.callback_query:
        await update.callback_query.answer()
        await update.callback_query.message.edit_text(
            text,
            parse_mode="Markdown",
            reply_markup=get_categories_keyboard()
        )
    else:
        await update.message.reply_text(
            text,
            parse_mode="Markdown",
            reply_markup=get_categories_keyboard()
        )


async def show_products_list(
    update: Update, 
    context: ContextTypes.DEFAULT_TYPE,
    category: str = None,
    page: int = 0
) -> None:
    """Show list of products"""
    query = update.callback_query
    
    if category and category != "all":
        products = get_products_by_category(category)
        cat_info = next((c for c in CATEGORIES if c['id'] == category), None)
        cat_name = cat_info['name'] if cat_info else category.title()
        title = f"📂 *{cat_name}*\n\n"
    else:
        products = get_all_products()
        title = "📋 *All Products*\n\n"
    
    if not products:
        await query.answer("No products found!")
        return
    
    text = title + f"Total {len(products)} products available:\n"
    
    await query.answer()
    await query.message.edit_text(
        text,
        parse_mode="Markdown",
        reply_markup=get_products_list_keyboard(products, page, category=category)
    )


async def show_product_detail(update: Update, context: ContextTypes.DEFAULT_TYPE, product_id: str) -> None:
    """Show detailed product view"""
    query = update.callback_query
    product = get_product_by_id(product_id)
    
    if not product:
        await query.answer("Product not found!")
        return
    
    await query.answer()
    
    # Format product message
    message = product.to_telegram_message()
    
    # Try to send with image
    try:
        # For demo, we'll just send text
        # In production, you'd fetch actual images
        await query.message.edit_text(
            message,
            parse_mode="Markdown",
            reply_markup=get_product_keyboard(product_id)
        )
    except Exception as e:
        await query.message.reply_text(
            message,
            parse_mode="Markdown",
            reply_markup=get_product_keyboard(product_id)
        )


async def handle_category_callback(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Handle category selection callback"""
    query = update.callback_query
    data = query.data
    
    if data.startswith("category_"):
        category = data.replace("category_", "")
        await show_products_list(update, context, category=category)


async def handle_product_callback(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Handle product selection callback"""
    query = update.callback_query
    data = query.data
    
    if data.startswith("product_"):
        product_id = data.replace("product_", "")
        await show_product_detail(update, context, product_id)


async def handle_page_callback(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Handle pagination callback"""
    query = update.callback_query
    data = query.data
    
    if data.startswith("page_"):
        parts = data.split("_")
        page = int(parts[1])
        category = parts[2] if len(parts) > 2 else None
        await show_products_list(update, context, category=category, page=page)


async def handle_back_callback(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Handle back button callbacks"""
    query = update.callback_query
    data = query.data
    
    if data == "back_categories":
        await show_categories(update, context)
    elif data == "back_products":
        await show_products_list(update, context)


async def products_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Handle /products command"""
    await show_categories(update, context)
