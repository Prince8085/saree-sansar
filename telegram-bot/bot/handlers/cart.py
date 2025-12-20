"""
Cart Management Handlers
"""

from telegram import Update
from telegram.ext import ContextTypes
from ..data import (
    get_user_cart,
    add_to_cart,
    remove_from_cart,
    clear_cart,
    get_cart_total,
    get_product_by_id,
    set_user_state,
)
from ..utils import get_cart_keyboard, format_price
from ..config import MIN_ORDER_FREE_DELIVERY


async def show_cart(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Display user's cart"""
    user_id = update.effective_user.id
    cart = get_user_cart(user_id)
    total = get_cart_total(user_id)
    
    if not cart:
        text = """
🛒 *Your Cart is Empty!*

Abhi tak kuch add nahi kiya.

🛍️ Browse products aur apni pasand ki saree cart mein add karein!
"""
    else:
        items_text = "\n".join([
            f"  {i+1}. {item['name'][:30]}...\n"
            f"     Qty: {item['quantity']} × ₹{item['price']:,} = ₹{item['price'] * item['quantity']:,}"
            for i, item in enumerate(cart)
        ])
        
        delivery_msg = ""
        if total >= MIN_ORDER_FREE_DELIVERY:
            delivery_msg = "🎉 *FREE Delivery!*"
        else:
            remaining = MIN_ORDER_FREE_DELIVERY - total
            delivery_msg = f"💡 ₹{remaining:,} aur add karo for FREE Delivery!"
        
        text = f"""
🛒 *Your Cart*

{items_text}

━━━━━━━━━━━━━━━
💰 *Total:* ₹{total:,}
{delivery_msg}
"""
    
    # Handle both message and callback
    if update.callback_query:
        await update.callback_query.answer()
        await update.callback_query.message.edit_text(
            text,
            parse_mode="Markdown",
            reply_markup=get_cart_keyboard(cart)
        )
    else:
        await update.message.reply_text(
            text,
            parse_mode="Markdown",
            reply_markup=get_cart_keyboard(cart)
        )


async def handle_add_to_cart(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Handle add to cart callback"""
    query = update.callback_query
    user_id = update.effective_user.id
    
    product_id = query.data.replace("add_cart_", "")
    product = get_product_by_id(product_id)
    
    if not product:
        await query.answer("Product not found!", show_alert=True)
        return
    
    if product.stock <= 0:
        await query.answer("❌ Sorry, this product is out of stock!", show_alert=True)
        return
    
    # Add to cart
    add_to_cart(user_id, product.id, product.name, product.price)
    
    await query.answer(f"✅ {product.name[:20]}... added to cart!")
    
    # Update message with cart info
    cart = get_user_cart(user_id)
    total = get_cart_total(user_id)
    
    await query.message.reply_text(
        f"✅ *Added to Cart!*\n\n"
        f"📦 {product.name}\n"
        f"💰 ₹{product.price:,}\n\n"
        f"🛒 Cart Total: ₹{total:,} ({len(cart)} items)",
        parse_mode="Markdown"
    )


async def handle_remove_from_cart(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Handle remove from cart callback"""
    query = update.callback_query
    user_id = update.effective_user.id
    
    product_id = query.data.replace("remove_cart_", "")
    
    remove_from_cart(user_id, product_id)
    
    await query.answer("❌ Item removed from cart!")
    
    # Refresh cart view
    await show_cart(update, context)


async def handle_clear_cart(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Handle clear cart callback"""
    query = update.callback_query
    user_id = update.effective_user.id
    
    clear_cart(user_id)
    
    await query.answer("🗑️ Cart cleared!")
    
    await query.message.edit_text(
        "🛒 *Cart Cleared!*\n\n"
        "Aapka cart ab empty hai.\n"
        "🛍️ Shopping continue karein!",
        parse_mode="Markdown",
        reply_markup=get_cart_keyboard([])
    )


async def cart_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Handle /cart command"""
    await show_cart(update, context)
