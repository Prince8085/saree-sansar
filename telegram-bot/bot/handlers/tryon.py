"""
Virtual Try-On Handler
"""

from telegram import Update
from telegram.ext import ContextTypes
from ..data import (
    get_product_by_id,
    get_all_products,
    set_user_state,
    get_user_state,
    clear_user_state,
    get_user_session,
)
from ..utils import get_tryon_keyboard, get_product_keyboard
from ..services import process_virtual_tryon, get_style_tips, analyze_for_recommendations


async def start_tryon(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Start virtual try-on process"""
    user_id = update.effective_user.id
    
    # Check if user came from a product
    session = get_user_session(user_id)
    product_id = session.get("tryon_product_id")
    
    if product_id:
        product = get_product_by_id(product_id)
        if product:
            await update.message.reply_text(
                f"👗 *Virtual Try-On*\n\n"
                f"Selected: *{product.name}*\n\n"
                f"📸 *Apni photo upload karein:*\n"
                f"• Clear face photo\n"
                f"• Full or half body preferred\n"
                f"• Good lighting\n\n"
                f"AI aapko is saree mein imagine karke batayega!",
                parse_mode="Markdown",
                reply_markup=get_tryon_keyboard(product_id)
            )
            set_user_state(user_id, "waiting_tryon_photo", {"product_id": product_id})
            return
    
    # Show products to select
    text = """
👗 *Virtual Try-On*

AI-powered virtual try-on se dekho aap saree mein kaise lagoge!

*Steps:*
1️⃣ Pehle ek saree select karein
2️⃣ Apni photo upload karein
3️⃣ AI analysis dekho

📸 Ya directly photo upload karein - AI recommend karega ki kaunsi saree suit karegi!
"""
    
    await update.message.reply_text(
        text,
        parse_mode="Markdown",
        reply_markup=get_tryon_keyboard()
    )
    set_user_state(user_id, "waiting_tryon_choice")


async def handle_tryon_callback(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Handle try-on related callbacks"""
    query = update.callback_query
    user_id = update.effective_user.id
    data = query.data
    
    await query.answer()
    
    if data.startswith("tryon_"):
        product_id = data.replace("tryon_", "")
        product = get_product_by_id(product_id)
        
        if product:
            # Store product for try-on
            session = get_user_session(user_id)
            session.set("tryon_product_id", product_id)
            
            await query.message.reply_text(
                f"👗 *Virtual Try-On*\n\n"
                f"Selected: *{product.name}*\n"
                f"Color: {product.color.title()}\n"
                f"Fabric: {product.fabric}\n\n"
                f"📸 *Now upload your photo:*\n"
                f"• Clear, well-lit photo\n"
                f"• Face should be visible\n"
                f"• Full/half body works best",
                parse_mode="Markdown"
            )
            set_user_state(user_id, "waiting_tryon_photo", {"product_id": product_id})
    
    elif data.startswith("upload_photo_"):
        product_id = data.replace("upload_photo_", "")
        session = get_user_session(user_id)
        session.set("tryon_product_id", product_id)
        
        await query.message.reply_text(
            "📸 *Upload your photo now:*",
            parse_mode="Markdown"
        )
        set_user_state(user_id, "waiting_tryon_photo", {"product_id": product_id})


async def handle_tryon_photo(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Handle photo upload for try-on"""
    user_id = update.effective_user.id
    state = get_user_state(user_id)
    
    if state != "waiting_tryon_photo":
        return
    
    # Get the largest photo
    photo = update.message.photo[-1]
    
    # Download photo
    photo_file = await photo.get_file()
    photo_bytes = await photo_file.download_as_bytearray()
    
    # Get product ID
    session = get_user_session(user_id)
    product_id = session.get("tryon_product_id")
    
    if not product_id:
        # No product selected - do recommendation
        await update.message.reply_text(
            "🔄 *Analyzing your photo for recommendations...*",
            parse_mode="Markdown"
        )
        
        recommendation = await analyze_for_recommendations(bytes(photo_bytes))
        
        await update.message.reply_text(
            f"✨ *AI Saree Recommendations:*\n\n{recommendation}",
            parse_mode="Markdown"
        )
        clear_user_state(user_id)
        return
    
    product = get_product_by_id(product_id)
    if not product:
        await update.message.reply_text("❌ Product not found. Please try again.")
        clear_user_state(user_id)
        return
    
    # Process try-on
    processing_msg = await update.message.reply_text(
        f"🔄 *Processing Virtual Try-On...*\n\n"
        f"Saree: {product.name}\n"
        f"Please wait...",
        parse_mode="Markdown"
    )
    
    success, result_message, result_image = await process_virtual_tryon(
        bytes(photo_bytes),
        product_id
    )
    
    if success:
        # Get style tips too
        style_tips = await get_style_tips(product_id)
        
        full_message = f"{result_message}\n\n💎 *Style Tips:*\n{style_tips}"
        
        await processing_msg.edit_text(
            full_message,
            parse_mode="Markdown",
            reply_markup=get_product_keyboard(product_id)
        )
    else:
        await processing_msg.edit_text(
            result_message,
            parse_mode="Markdown"
        )
    
    # Clear state
    clear_user_state(user_id)
    session.clear("tryon_product_id")


async def tryon_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Handle /tryon command"""
    await start_tryon(update, context)
