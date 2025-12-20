"""
Saree Sansar Telegram Bot - Main Entry Point
"""

import logging
from telegram import Update
from telegram.ext import (
    Application,
    CommandHandler,
    MessageHandler,
    CallbackQueryHandler,
    filters,
)

from .config import TELEGRAM_BOT_TOKEN
from .handlers import (
    # Start handlers
    start_command,
    help_command,
    contact_command,
    menu_button_handler,
    handle_callback_show_phone,
    handle_callback_show_location,
    # Product handlers
    products_command,
    handle_category_callback,
    handle_product_callback,
    handle_page_callback,
    handle_back_callback,
    # Search handlers
    search_command,
    handle_search_message,
    handle_filter_callback,
    # Cart handlers
    cart_command,
    handle_add_to_cart,
    handle_remove_from_cart,
    handle_clear_cart,
    # Order handlers
    orders_command,
    track_command,
    handle_checkout,
    handle_payment_selection,
    handle_confirm_order,
    handle_cancel_order,
    handle_checkout_input,
    show_order_detail,
    track_order,
    # Try-on handlers
    tryon_command,
    handle_tryon_callback,
    handle_tryon_photo,
    # Payment handlers
    handle_payment_photo,
    handle_whatsapp_callback,
)
from .data import get_user_state
from .services import get_ai_response

# Configure logging
logging.basicConfig(
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    level=logging.INFO
)
logger = logging.getLogger(__name__)


async def handle_message(update: Update, context) -> None:
    """Handle all text messages"""
    user_id = update.effective_user.id
    text = update.message.text
    state = get_user_state(user_id)
    
    # Check for menu buttons first
    menu_buttons = ["🛍️ Products", "🔍 Search", "🛒 Cart", "📦 My Orders", 
                   "👗 Virtual Try-On", "📞 Contact Us", "❓ Help"]
    
    if text in menu_buttons:
        await menu_button_handler(update, context)
        return
    
    # Handle based on user state
    if state == "waiting_search":
        await handle_search_message(update, context)
    elif state in ["waiting_phone", "waiting_address", "waiting_track_id"]:
        await handle_checkout_input(update, context)
    else:
        # Default: Use AI to respond
        response = await get_ai_response(user_id, text)
        await update.message.reply_text(response, parse_mode="Markdown")


async def handle_photo(update: Update, context) -> None:
    """Handle photo uploads"""
    user_id = update.effective_user.id
    state = get_user_state(user_id)
    
    if state == "waiting_tryon_photo":
        await handle_tryon_photo(update, context)
    elif state == "waiting_payment_confirmation":
        await handle_payment_photo(update, context)
    else:
        # Unexpected photo - maybe recommendation
        await update.message.reply_text(
            "📸 Nice photo! Virtual Try-On ke liye /tryon command use karein.",
            parse_mode="Markdown"
        )


async def handle_callback(update: Update, context) -> None:
    """Handle all callback queries"""
    query = update.callback_query
    data = query.data
    
    # Route to appropriate handler based on callback data prefix
    if data == "noop":
        await query.answer()
    elif data.startswith("category_"):
        await handle_category_callback(update, context)
    elif data.startswith("product_"):
        await handle_product_callback(update, context)
    elif data.startswith("page_"):
        await handle_page_callback(update, context)
    elif data.startswith("back_"):
        await handle_back_callback(update, context)
    elif data.startswith("add_cart_"):
        await handle_add_to_cart(update, context)
    elif data.startswith("remove_cart_"):
        await handle_remove_from_cart(update, context)
    elif data == "clear_cart":
        await handle_clear_cart(update, context)
    elif data == "checkout":
        await handle_checkout(update, context)
    elif data.startswith("payment_"):
        await handle_payment_selection(update, context)
    elif data == "confirm_order":
        await handle_confirm_order(update, context)
    elif data == "cancel_order":
        await handle_cancel_order(update, context)
    elif data.startswith("order_"):
        order_id = data.replace("order_", "")
        await show_order_detail(update, context, order_id)
    elif data.startswith("track_"):
        await track_order(update, context)
    elif data.startswith("tryon_") or data.startswith("upload_photo_"):
        await handle_tryon_callback(update, context)
    elif data.startswith("whatsapp_") or data.startswith("order_whatsapp_"):
        await handle_whatsapp_callback(update, context)
    elif data.startswith("filter_") or data == "clear_filters":
        await handle_filter_callback(update, context)
    elif data == "show_phone":
        await handle_callback_show_phone(update, context)
    elif data == "show_location":
        await handle_callback_show_location(update, context)
    elif data.startswith("buy_now_"):
        product_id = data.replace("buy_now_", "")
        await handle_add_to_cart(update, context)
        await handle_checkout(update, context)
    else:
        await query.answer("Unknown action")


def main() -> None:
    """Main function to run the bot"""
    logger.info("Starting Saree Sansar Bot...")
    
    # Create application
    application = Application.builder().token(TELEGRAM_BOT_TOKEN).build()
    
    # Add command handlers
    application.add_handler(CommandHandler("start", start_command))
    application.add_handler(CommandHandler("help", help_command))
    application.add_handler(CommandHandler("products", products_command))
    application.add_handler(CommandHandler("search", search_command))
    application.add_handler(CommandHandler("cart", cart_command))
    application.add_handler(CommandHandler("orders", orders_command))
    application.add_handler(CommandHandler("track", track_command))
    application.add_handler(CommandHandler("tryon", tryon_command))
    application.add_handler(CommandHandler("contact", contact_command))
    
    # Add callback query handler
    application.add_handler(CallbackQueryHandler(handle_callback))
    
    # Add message handlers
    application.add_handler(MessageHandler(filters.PHOTO, handle_photo))
    application.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_message))
    
    # Start the bot
    logger.info("Bot is running! Press Ctrl+C to stop.")
    application.run_polling(allowed_updates=Update.ALL_TYPES)


if __name__ == "__main__":
    main()
