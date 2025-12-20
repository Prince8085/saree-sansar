"""
Data module init
"""

from .products import (
    Product,
    PRODUCTS,
    get_all_products,
    get_product_by_id,
    get_products_by_category,
    search_products,
    filter_products,
    get_featured_products,
    get_products_on_sale,
)

from .orders import (
    Order,
    ORDERS,
    get_user_cart,
    add_to_cart,
    remove_from_cart,
    clear_cart,
    get_cart_total,
    create_order,
    get_order_by_id,
    get_orders_by_user,
    get_all_orders,
    update_order_status,
    get_order_by_tracking,
)

from .users import (
    UserSession,
    get_user_session,
    get_user_state,
    set_user_state,
    clear_user_state,
    get_user_language,
    set_user_language,
    get_all_users,
    get_active_users_count,
    save_user_profile,
    get_user_profile,
)

__all__ = [
    # Products
    "Product",
    "PRODUCTS",
    "get_all_products",
    "get_product_by_id",
    "get_products_by_category",
    "search_products",
    "filter_products",
    "get_featured_products",
    "get_products_on_sale",
    # Orders
    "Order",
    "ORDERS",
    "get_user_cart",
    "add_to_cart",
    "remove_from_cart",
    "clear_cart",
    "get_cart_total",
    "create_order",
    "get_order_by_id",
    "get_orders_by_user",
    "get_all_orders",
    "update_order_status",
    "get_order_by_tracking",
    # Users
    "UserSession",
    "get_user_session",
    "get_user_state",
    "set_user_state",
    "clear_user_state",
    "get_user_language",
    "set_user_language",
    "get_all_users",
    "get_active_users_count",
    "save_user_profile",
    "get_user_profile",
]
