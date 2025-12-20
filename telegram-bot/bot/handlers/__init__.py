"""
Handlers module init
"""

from .start import (
    start_command,
    help_command,
    contact_command,
    menu_button_handler,
    handle_callback_show_phone,
    handle_callback_show_location,
)

from .products import (
    show_categories,
    show_products_list,
    show_product_detail,
    handle_category_callback,
    handle_product_callback,
    handle_page_callback,
    handle_back_callback,
    products_command,
)

from .search import (
    search_command,
    perform_search,
    handle_search_message,
    handle_filter_callback,
)

from .cart import (
    show_cart,
    handle_add_to_cart,
    handle_remove_from_cart,
    handle_clear_cart,
    cart_command,
)

from .orders import (
    show_orders,
    show_order_detail,
    track_order,
    track_command,
    handle_checkout,
    handle_payment_selection,
    handle_confirm_order,
    handle_cancel_order,
    orders_command,
    handle_checkout_input,
)

from .tryon import (
    start_tryon,
    handle_tryon_callback,
    handle_tryon_photo,
    tryon_command,
)

from .payment import (
    handle_payment_photo,
    handle_whatsapp_callback,
)

__all__ = [
    # Start
    "start_command",
    "help_command",
    "contact_command",
    "menu_button_handler",
    "handle_callback_show_phone",
    "handle_callback_show_location",
    # Products
    "show_categories",
    "show_products_list",
    "show_product_detail",
    "handle_category_callback",
    "handle_product_callback",
    "handle_page_callback",
    "handle_back_callback",
    "products_command",
    # Search
    "search_command",
    "perform_search",
    "handle_search_message",
    "handle_filter_callback",
    # Cart
    "show_cart",
    "handle_add_to_cart",
    "handle_remove_from_cart",
    "handle_clear_cart",
    "cart_command",
    # Orders
    "show_orders",
    "show_order_detail",
    "track_order",
    "track_command",
    "handle_checkout",
    "handle_payment_selection",
    "handle_confirm_order",
    "handle_cancel_order",
    "orders_command",
    "handle_checkout_input",
    # Try-On
    "start_tryon",
    "handle_tryon_callback",
    "handle_tryon_photo",
    "tryon_command",
    # Payment
    "handle_payment_photo",
    "handle_whatsapp_callback",
]
