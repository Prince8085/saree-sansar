"""
Order Management Handlers
"""

from telegram import Update
from telegram.ext import ContextTypes
from ..data import (
    get_user_cart,
    get_cart_total,
    clear_cart,
    create_order,
    get_order_by_id,
    get_orders_by_user,
    get_order_by_tracking,
    get_user_state,
    set_user_state,
    clear_user_state,
    get_user_profile,
    save_user_profile,
)
from ..utils import (
    get_payment_keyboard,
    get_confirm_order_keyboard,
    get_order_keyboard,
    format_order_timeline,
    validate_phone,
    validate_pincode,
    format_address,
)
from ..services import (
    generate_payment_qr,
    get_upi_message,
    get_cod_confirmation,
    get_order_summary_message,
)


async def show_orders(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Show user's orders"""
    user_id = update.effective_user.id
    orders = get_orders_by_user(user_id)
    
    if not orders:
        text = """
📦 *Your Orders*

Abhi tak koi order nahi hai.

🛍️ Shop now aur apni first order place karein!
"""
        if update.callback_query:
            await update.callback_query.answer()
            await update.callback_query.message.edit_text(text, parse_mode="Markdown")
        else:
            await update.message.reply_text(text, parse_mode="Markdown")
        return
    
    text = "📦 *Your Orders*\n\n"
    
    for order in orders[:5]:  # Show last 5 orders
        text += f"{order.get_status_emoji()} `{order.id}`\n"
        text += f"   ₹{order.total_amount:,} | {order.status.replace('_', ' ').title()}\n\n"
    
    text += "Click on an order to view details:"
    
    # Create buttons for each order
    from telegram import InlineKeyboardButton, InlineKeyboardMarkup
    buttons = [[
        InlineKeyboardButton(
            f"{o.get_status_emoji()} {o.id}",
            callback_data=f"order_{o.id}"
        )
    ] for o in orders[:5]]
    
    if update.callback_query:
        await update.callback_query.answer()
        await update.callback_query.message.edit_text(
            text,
            parse_mode="Markdown",
            reply_markup=InlineKeyboardMarkup(buttons)
        )
    else:
        await update.message.reply_text(
            text,
            parse_mode="Markdown",
            reply_markup=InlineKeyboardMarkup(buttons)
        )


async def show_order_detail(update: Update, context: ContextTypes.DEFAULT_TYPE, order_id: str) -> None:
    """Show detailed order view"""
    query = update.callback_query
    order = get_order_by_id(order_id)
    
    if not order:
        await query.answer("Order not found!", show_alert=True)
        return
    
    await query.answer()
    
    await query.message.edit_text(
        order.to_telegram_message(),
        parse_mode="Markdown",
        reply_markup=get_order_keyboard(order_id)
    )


async def track_order(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Track order by ID or tracking number"""
    query = update.callback_query
    order_id = query.data.replace("track_", "")
    
    order = get_order_by_id(order_id)
    if not order:
        order = get_order_by_tracking(order_id)
    
    if not order:
        await query.answer("Order not found!", show_alert=True)
        return
    
    await query.answer()
    
    timeline_text = format_order_timeline(order.timeline)
    
    text = f"""
📍 *Order Tracking*

🆔 Order: `{order.id}`
🚚 Tracking: `{order.tracking_number or 'Not assigned'}`

*Timeline:*
{timeline_text}

📅 Expected Delivery: {order.estimated_delivery or 'TBD'}
"""
    
    await query.message.edit_text(
        text,
        parse_mode="Markdown",
        reply_markup=get_order_keyboard(order.id)
    )


async def track_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Handle /track command"""
    if context.args:
        order_id = context.args[0]
        order = get_order_by_id(order_id)
        if not order:
            order = get_order_by_tracking(order_id)
        
        if order:
            timeline_text = format_order_timeline(order.timeline)
            await update.message.reply_text(
                f"📍 *Order Tracking*\n\n"
                f"🆔 Order: `{order.id}`\n"
                f"🚚 Tracking: `{order.tracking_number or 'Pending'}`\n\n"
                f"*Timeline:*\n{timeline_text}",
                parse_mode="Markdown"
            )
        else:
            await update.message.reply_text(
                "❌ Order not found. Please check the order ID.",
                parse_mode="Markdown"
            )
    else:
        await update.message.reply_text(
            "📦 *Track Your Order*\n\n"
            "Enter order ID:\n"
            "`/track ORD-2025-1234`\n\n"
            "Ya apna order ID ya tracking number send karein.",
            parse_mode="Markdown"
        )
        set_user_state(update.effective_user.id, "waiting_track_id")


async def handle_checkout(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Handle checkout callback - start order process"""
    query = update.callback_query
    user_id = update.effective_user.id
    
    cart = get_user_cart(user_id)
    if not cart:
        await query.answer("Cart is empty!", show_alert=True)
        return
    
    await query.answer()
    
    # Check if we have user details
    profile = get_user_profile(user_id)
    
    if not profile.get('phone'):
        await query.message.reply_text(
            "📞 *Please enter your phone number:*\n\n"
            "Example: `9876543210`",
            parse_mode="Markdown"
        )
        set_user_state(user_id, "waiting_phone")
        return
    
    if not profile.get('address'):
        await query.message.reply_text(
            "📍 *Please enter your delivery address:*\n\n"
            "Format:\n"
            "`Street Address`\n"
            "`City`\n"
            "`State`\n"
            "`Pincode`\n\n"
            "Example:\n"
            "`123 Gandhi Nagar`\n"
            "`Bilaspur`\n"
            "`Chhattisgarh`\n"
            "`495001`",
            parse_mode="Markdown"
        )
        set_user_state(user_id, "waiting_address")
        return
    
    # Show payment options
    total = get_cart_total(user_id)
    await query.message.reply_text(
        f"💳 *Select Payment Method*\n\n"
        f"🛒 Cart Total: ₹{total:,}\n\n"
        "Choose your preferred payment:",
        parse_mode="Markdown",
        reply_markup=get_payment_keyboard()
    )


async def handle_payment_selection(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Handle payment method selection"""
    query = update.callback_query
    user_id = update.effective_user.id
    
    payment_method = query.data.replace("payment_", "")
    
    cart = get_user_cart(user_id)
    total = get_cart_total(user_id)
    profile = get_user_profile(user_id)
    
    await query.answer()
    
    # Store payment method in session
    from ..data import get_user_session
    session = get_user_session(user_id)
    session.set("payment_method", payment_method)
    
    # Show order summary
    summary = get_order_summary_message(cart, total, profile.get('address', {}), payment_method)
    
    await query.message.edit_text(
        summary,
        parse_mode="Markdown",
        reply_markup=get_confirm_order_keyboard()
    )


async def handle_confirm_order(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Handle order confirmation"""
    query = update.callback_query
    user_id = update.effective_user.id
    
    cart = get_user_cart(user_id)
    total = get_cart_total(user_id)
    profile = get_user_profile(user_id)
    
    from ..data import get_user_session
    session = get_user_session(user_id)
    payment_method = session.get("payment_method", "cod")
    
    await query.answer("✅ Processing order...")
    
    # Create order
    order = create_order(
        user_id=user_id,
        customer_name=profile.get('name', 'Customer'),
        customer_phone=profile.get('phone', ''),
        items=cart,
        total_amount=total,
        payment_method=payment_method,
        shipping_address=profile.get('address', {})
    )
    
    # Clear cart
    clear_cart(user_id)
    
    if payment_method == "upi":
        # Generate QR code
        qr_bytes = generate_payment_qr(total, order.id)
        upi_message = get_upi_message(total, order.id)
        
        await query.message.reply_photo(
            photo=qr_bytes,
            caption=upi_message,
            parse_mode="Markdown"
        )
        
        await query.message.reply_text(
            "📸 *Payment complete hone ke baad screenshot share karein.*\n\n"
            "Ya 'Payment Done' button press karein:",
            parse_mode="Markdown",
            reply_markup=get_confirm_order_keyboard()
        )
        set_user_state(user_id, "waiting_payment_confirmation", {"order_id": order.id})
    
    else:  # COD
        cod_message = get_cod_confirmation(total, order.id)
        
        await query.message.edit_text(
            cod_message,
            parse_mode="Markdown",
            reply_markup=get_order_keyboard(order.id)
        )


async def handle_cancel_order(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Handle order cancellation"""
    query = update.callback_query
    user_id = update.effective_user.id
    
    clear_user_state(user_id)
    
    await query.answer("❌ Order cancelled")
    await query.message.edit_text(
        "❌ *Order Cancelled*\n\n"
        "Aapka order cancel ho gaya. Cart items safe hain.\n"
        "🛍️ Jab chahein order place kar sakte ho!",
        parse_mode="Markdown"
    )


async def orders_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Handle /orders command"""
    await show_orders(update, context)


async def handle_checkout_input(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Handle checkout form inputs"""
    user_id = update.effective_user.id
    state = get_user_state(user_id)
    text = update.message.text
    
    if state == "waiting_phone":
        valid, formatted_phone = validate_phone(text)
        if valid:
            save_user_profile(user_id, phone=formatted_phone)
            await update.message.reply_text(
                f"✅ Phone saved: {formatted_phone}\n\n"
                "📍 *Now enter your delivery address:*\n\n"
                "Format:\n"
                "`Street, City, State, Pincode`",
                parse_mode="Markdown"
            )
            set_user_state(user_id, "waiting_address")
        else:
            await update.message.reply_text(
                "❌ Invalid phone number. Please enter 10 digit number:",
                parse_mode="Markdown"
            )
    
    elif state == "waiting_address":
        # Parse address
        lines = text.strip().split("\n")
        if len(lines) >= 4:
            address = {
                "street": lines[0].strip(),
                "city": lines[1].strip(),
                "state": lines[2].strip(),
                "pincode": lines[3].strip(),
            }
        else:
            # Try comma separation
            parts = text.split(",")
            if len(parts) >= 4:
                address = {
                    "street": parts[0].strip(),
                    "city": parts[1].strip(),
                    "state": parts[2].strip(),
                    "pincode": parts[3].strip(),
                }
            else:
                await update.message.reply_text(
                    "❌ Please provide complete address with:\n"
                    "Street, City, State, Pincode",
                    parse_mode="Markdown"
                )
                return
        
        save_user_profile(user_id, address=address)
        clear_user_state(user_id)
        
        await update.message.reply_text(
            f"✅ Address saved!\n\n"
            f"📍 {format_address(address)}\n\n"
            "💳 *Select Payment Method:*",
            parse_mode="Markdown",
            reply_markup=get_payment_keyboard()
        )
    
    elif state == "waiting_track_id":
        order = get_order_by_id(text.strip())
        if not order:
            order = get_order_by_tracking(text.strip())
        
        clear_user_state(user_id)
        
        if order:
            timeline_text = format_order_timeline(order.timeline)
            await update.message.reply_text(
                f"📍 *Order Tracking*\n\n"
                f"🆔 Order: `{order.id}`\n"
                f"🚚 Tracking: `{order.tracking_number or 'Pending'}`\n"
                f"{order.get_status_emoji()} Status: {order.status.replace('_', ' ').title()}\n\n"
                f"*Timeline:*\n{timeline_text}",
                parse_mode="Markdown",
                reply_markup=get_order_keyboard(order.id)
            )
        else:
            await update.message.reply_text(
                "❌ Order not found. Please check the ID.",
                parse_mode="Markdown"
            )
