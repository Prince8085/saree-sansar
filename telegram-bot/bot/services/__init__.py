"""
Services module init
"""

from .ai_service import (
    AIService,
    ai_service,
    get_ai_response,
    smart_product_search,
    get_recommendations,
)

from .tryon_service import (
    VirtualTryOnService,
    tryon_service,
    process_virtual_tryon,
    get_style_tips,
    analyze_for_recommendations,
)

from .payment_service import (
    PaymentService,
    payment_service,
    generate_payment_qr,
    get_upi_message,
    get_cod_confirmation,
    get_order_summary_message,
)

__all__ = [
    # AI Service
    "AIService",
    "ai_service",
    "get_ai_response",
    "smart_product_search",
    "get_recommendations",
    # Try-On Service
    "VirtualTryOnService",
    "tryon_service",
    "process_virtual_tryon",
    "get_style_tips",
    "analyze_for_recommendations",
    # Payment Service
    "PaymentService",
    "payment_service",
    "generate_payment_qr",
    "get_upi_message",
    "get_cod_confirmation",
    "get_order_summary_message",
]
