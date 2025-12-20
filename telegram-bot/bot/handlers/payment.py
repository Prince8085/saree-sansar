"""
Payment Handler
"""

from telegram import Update
from telegram.ext import ContextTypes
from ..data import get_user_state, clear_user_state, get_order_by_id, update_order_status
from ..services import payment_service
from ..utils import get_order_keyboard


async def handle_payment_photo(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Handle payment screenshot upload"""
    user_id = update.effective_user.id
    state = get_user_state(user_id)
    
    if state != "waiting_payment_confirmation":
        return
    
    # Get order ID from session
    from ..data import get_user_session
    session = get_user_session(user_id)
    state_data = session.get("state_data", {})
    order_id = state_data.get("order_id")
    
    if not order_id:
        await update.message.reply_text(
            "❌ Order not found. Please contact support.",
            parse_mode="Markdown"
        )
        return
    
    # Get photo
    photo = update.message.photo[-1]
    photo_file = await photo.get_file()
    photo_bytes = await photo_file.download_as_bytearray()
    
    # Validate screenshot (basic check)
    valid, message = payment_service.validate_payment_screenshot(bytes(photo_bytes))
    
    if valid:
        # Update order status
        order = update_order_status(order_id, "confirmed")
        
        await update.message.reply_text(
            f"✅ *Payment Received!*\n\n"
            f"🆔 Order: `{order_id}`\n"
            f"💳 Status: Confirmed\n\n"
            f"📦 Aapka order process ho raha hai.\n"
            f"🚚 5-7 din mein delivery ho jayegi.\n\n"
            f"Thank you for shopping with Saree Sansar! 🙏",
            parse_mode="Markdown",
            reply_markup=get_order_keyboard(order_id)
        )
        
        clear_user_state(user_id)
    else:
        await update.message.reply_text(
            message,
            parse_mode="Markdown"
        )


async def handle_whatsapp_callback(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Handle WhatsApp inquiry callbacks"""
    query = update.callback_query
    data = query.data
    
    await query.answer()
    
    from ..utils import get_whatsapp_link
    from ..data import get_product_by_id
    
    if data.startswith("whatsapp_"):
        product_id = data.replace("whatsapp_", "")
        product = get_product_by_id(product_id)
        
        if product:
            link = get_whatsapp_link(product_name=product.name)
            await query.message.reply_text(
                f"📱 *WhatsApp Inquiry*\n\n"
                f"Product: {product.name}\n\n"
                f"[Click here to chat on WhatsApp]({link})",
                parse_mode="Markdown"
            )
    
    elif data.startswith("order_whatsapp_"):
        order_id = data.replace("order_whatsapp_", "")
        link = get_whatsapp_link(f"Hi! I need help with my order: {order_id}")
        
        await query.message.reply_text(
            f"📱 *WhatsApp Support*\n\n"
            f"Order: `{order_id}`\n\n"
            f"[Click here to chat]({link})",
            parse_mode="Markdown"
        )
