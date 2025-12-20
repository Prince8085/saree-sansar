"""
Start and Help Command Handlers
"""

from telegram import Update
from telegram.ext import ContextTypes
from ..config import WELCOME_MESSAGE, HELP_MESSAGE, STORE_NAME, WHATSAPP_NUMBER, STORE_ADDRESS
from ..utils import get_main_menu_keyboard, get_contact_keyboard, get_greeting
from ..data import get_user_session, save_user_profile


async def start_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Handle /start command"""
    user = update.effective_user
    user_id = user.id
    
    # Save user info
    save_user_profile(
        user_id,
        name=user.full_name,
    )
    
    # Get greeting
    greeting = get_greeting()
    
    welcome_text = f"""
{greeting}

{WELCOME_MESSAGE}

👤 *{user.first_name}*, aapka swagat hai!
"""
    
    await update.message.reply_text(
        welcome_text,
        parse_mode="Markdown",
        reply_markup=get_main_menu_keyboard()
    )


async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Handle /help command"""
    await update.message.reply_text(
        HELP_MESSAGE,
        parse_mode="Markdown",
        reply_markup=get_main_menu_keyboard()
    )


async def contact_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Handle /contact command"""
    contact_text = f"""
📞 *Contact Saree Sansar*

🏪 *Store:* {STORE_NAME}
📍 *Address:* {STORE_ADDRESS}
📱 *WhatsApp:* +91 {WHATSAPP_NUMBER[-10:]}
⏰ *Timing:* 10:00 AM - 9:00 PM

*Since 2000 - 25+ years of trust!*

Click below to connect with us:
"""
    
    await update.message.reply_text(
        contact_text,
        parse_mode="Markdown",
        reply_markup=get_contact_keyboard()
    )


async def menu_button_handler(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Handle main menu button presses"""
    text = update.message.text
    
    if text == "🛍️ Products":
        from .products import show_categories
        await show_categories(update, context)
    
    elif text == "🔍 Search":
        await update.message.reply_text(
            "🔍 *Product Search*\n\n"
            "Aap kya dhundh rahe ho? Type karein:\n\n"
            "Examples:\n"
            "• `Red bridal saree`\n"
            "• `Kosa silk under 15k`\n"
            "• `Green wedding saree`\n"
            "• `Mujhe pink saree chahiye`",
            parse_mode="Markdown"
        )
        # Set user state to expect search query
        from ..data import set_user_state
        set_user_state(update.effective_user.id, "waiting_search")
    
    elif text == "🛒 Cart":
        from .cart import show_cart
        await show_cart(update, context)
    
    elif text == "📦 My Orders":
        from .orders import show_orders
        await show_orders(update, context)
    
    elif text == "👗 Virtual Try-On":
        from .tryon import start_tryon
        await start_tryon(update, context)
    
    elif text == "📞 Contact Us":
        await contact_command(update, context)
    
    elif text == "❓ Help":
        await help_command(update, context)


async def handle_callback_show_phone(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Handle show phone callback"""
    query = update.callback_query
    await query.answer()
    
    await query.message.reply_text(
        f"📞 *Call Us:*\n+91 {WHATSAPP_NUMBER[-10:]}\n\n"
        "⏰ Available: 10 AM - 9 PM",
        parse_mode="Markdown"
    )


async def handle_callback_show_location(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Handle show location callback"""
    query = update.callback_query
    await query.answer()
    
    await query.message.reply_text(
        f"📍 *Store Location:*\n\n"
        f"{STORE_ADDRESS}\n\n"
        "🗺️ Google Maps pe 'Saree Sansar Bilaspur' search karein!",
        parse_mode="Markdown"
    )
