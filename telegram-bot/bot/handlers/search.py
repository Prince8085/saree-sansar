"""
AI-Powered Search Handler
"""

from telegram import Update
from telegram.ext import ContextTypes
from ..data import (
    search_products,
    filter_products,
    get_user_state,
    set_user_state,
    clear_user_state,
)
from ..services import get_ai_response, smart_product_search
from ..utils import (
    get_products_list_keyboard,
    get_search_filters_keyboard,
    parse_price_query,
    parse_color_query,
    parse_occasion_query,
    parse_category_query,
)


async def search_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Handle /search command"""
    # Check if search query provided
    if context.args:
        query = " ".join(context.args)
        await perform_search(update, context, query)
    else:
        await update.message.reply_text(
            "🔍 *Smart Product Search*\n\n"
            "Type your search query. Examples:\n"
            "• `Red bridal saree under 20k`\n"
            "• `Kosa silk green color`\n"
            "• `Mujhe wedding saree chahiye`\n"
            "• `Party wear saree pink`\n\n"
            "Ya filters use karein:",
            parse_mode="Markdown",
            reply_markup=get_search_filters_keyboard()
        )
        set_user_state(update.effective_user.id, "waiting_search")


async def perform_search(update: Update, context: ContextTypes.DEFAULT_TYPE, query: str) -> None:
    """Perform product search with AI understanding"""
    user_id = update.effective_user.id
    
    # Send searching message
    searching_msg = await update.message.reply_text("🔍 Searching...")
    
    try:
        # Use AI to parse the query
        parsed = await smart_product_search(query)
        
        # Extract search parameters
        min_price, max_price = parse_price_query(query)
        color = parsed.get('color') or parse_color_query(query)
        occasion = parsed.get('occasion') or parse_occasion_query(query)
        category = parsed.get('category') or parse_category_query(query)
        
        # Apply AI-parsed prices if available
        if parsed.get('min_price'):
            min_price = parsed['min_price']
        if parsed.get('max_price'):
            max_price = parsed['max_price']
        
        # Search with filters
        results = filter_products(
            min_price=min_price,
            max_price=max_price,
            colors=[color] if color else [],
            categories=[category] if category else [],
            occasions=[occasion] if occasion else [],
        )
        
        # If no results, try basic search
        if not results:
            results = search_products(query)
        
        # Clear user state
        clear_user_state(user_id)
        
        if results:
            # Show results with AI summary
            filters_text = []
            if color:
                filters_text.append(f"Color: {color.title()}")
            if occasion:
                filters_text.append(f"Occasion: {occasion.title()}")
            if min_price > 0 or max_price < 100000:
                filters_text.append(f"Price: ₹{min_price:,} - ₹{max_price:,}")
            
            filter_str = " | ".join(filters_text) if filters_text else "All products"
            
            text = f"""
🔍 *Search Results*

📝 Query: `{query}`
🎯 Filters: {filter_str}
📦 Found: {len(results)} products

Select a product to view details:
"""
            
            await searching_msg.edit_text(
                text,
                parse_mode="Markdown",
                reply_markup=get_products_list_keyboard(results)
            )
        else:
            # Get AI suggestion
            ai_response = await get_ai_response(
                user_id,
                f"User searched for '{query}' but no products found. Give a helpful suggestion in Hindlish."
            )
            
            await searching_msg.edit_text(
                f"😔 *No products found for:* `{query}`\n\n"
                f"{ai_response}\n\n"
                "🔍 Try different search terms or browse categories!",
                parse_mode="Markdown"
            )
    
    except Exception as e:
        print(f"Search Error: {e}")
        await searching_msg.edit_text(
            f"😔 Search mein error aaya. Please try again!\n\n"
            "Basic search kar rahe hain...",
            parse_mode="Markdown"
        )
        
        # Fallback to basic search
        results = search_products(query)
        if results:
            await update.message.reply_text(
                f"📦 Found {len(results)} products:",
                reply_markup=get_products_list_keyboard(results)
            )


async def handle_search_message(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Handle search query from user message"""
    user_id = update.effective_user.id
    state = get_user_state(user_id)
    
    if state == "waiting_search":
        query = update.message.text
        await perform_search(update, context, query)


async def handle_filter_callback(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Handle search filter callbacks"""
    query = update.callback_query
    data = query.data
    
    await query.answer()
    
    if data.startswith("filter_price_"):
        parts = data.replace("filter_price_", "").split("_")
        min_price, max_price = int(parts[0]), int(parts[1])
        
        results = filter_products(min_price=min_price, max_price=max_price)
        
        await query.message.edit_text(
            f"💰 *Price Range: ₹{min_price:,} - ₹{max_price:,}*\n\n"
            f"Found {len(results)} products:",
            parse_mode="Markdown",
            reply_markup=get_products_list_keyboard(results)
        )
    
    elif data.startswith("filter_color_"):
        color = data.replace("filter_color_", "")
        results = filter_products(colors=[color])
        
        await query.message.edit_text(
            f"🎨 *Color: {color.title()}*\n\n"
            f"Found {len(results)} products:",
            parse_mode="Markdown",
            reply_markup=get_products_list_keyboard(results)
        )
    
    elif data.startswith("filter_occasion_"):
        occasion = data.replace("filter_occasion_", "")
        results = filter_products(occasions=[occasion])
        
        await query.message.edit_text(
            f"🎉 *Occasion: {occasion.title()}*\n\n"
            f"Found {len(results)} products:",
            parse_mode="Markdown",
            reply_markup=get_products_list_keyboard(results)
        )
    
    elif data == "clear_filters":
        await query.message.edit_text(
            "🔍 *Smart Product Search*\n\n"
            "Type your search query or use filters:",
            parse_mode="Markdown",
            reply_markup=get_search_filters_keyboard()
        )
