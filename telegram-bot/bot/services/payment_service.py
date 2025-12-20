"""
Payment Service for Saree Sansar Bot
Handles UPI QR code display and COD processing
"""

import qrcode
import io
from typing import Tuple, Optional
from PIL import Image
from ..config import UPI_ID, STORE_NAME, WHATSAPP_NUMBER


class PaymentService:
    """Payment processing service"""
    
    def __init__(self):
        self.upi_id = UPI_ID
        self.store_name = STORE_NAME
    
    def generate_upi_qr(self, amount: int, order_id: str) -> bytes:
        """
        Generate UPI QR code for payment
        
        Args:
            amount: Payment amount in INR
            order_id: Order ID for reference
            
        Returns:
            QR code image as bytes
        """
        # UPI payment URL format
        upi_url = f"upi://pay?pa={self.upi_id}&pn={self.store_name.replace(' ', '%20')}&am={amount}&tn=Order%20{order_id}"
        
        # Generate QR code
        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_L,
            box_size=10,
            border=4,
        )
        qr.add_data(upi_url)
        qr.make(fit=True)
        
        # Create image
        img = qr.make_image(fill_color="black", back_color="white")
        
        # Convert to bytes
        img_bytes = io.BytesIO()
        img.save(img_bytes, format='PNG')
        img_bytes.seek(0)
        
        return img_bytes.getvalue()
    
    def get_upi_payment_message(self, amount: int, order_id: str) -> str:
        """Get UPI payment instructions message"""
        return f"""
📱 *UPI Payment*

💰 *Amount:* ₹{amount:,}
🆔 *Order ID:* `{order_id}`

*Payment Steps:*
1️⃣ Scan the QR code using any UPI app
2️⃣ Verify amount: ₹{amount:,}
3️⃣ Complete payment
4️⃣ Screenshot leke neeche share karein

*Or pay directly to:*
📲 UPI ID: `{self.upi_id}`

⚠️ *Note:* Payment confirm hone ke baad order process hoga.
"""
    
    def get_cod_message(self, amount: int, order_id: str) -> str:
        """Get COD confirmation message"""
        return f"""
💵 *Cash on Delivery*

💰 *Amount:* ₹{amount:,}
🆔 *Order ID:* `{order_id}`

✅ *Order confirmed!*

📦 Aapka order 5-7 din mein deliver ho jayega.
💵 Delivery ke time ₹{amount:,} cash ready rakhein.

📱 *Track your order:*
Order ID: `{order_id}`

🙏 Thank you for shopping with Saree Sansar!
"""
    
    def get_payment_confirmation_message(self, order_id: str, payment_method: str) -> str:
        """Get payment confirmation message"""
        if payment_method == "upi":
            return f"""
✅ *Payment Received!*

🆔 Order ID: `{order_id}`
💳 Payment: UPI ✓

📦 Aapka order ab process ho raha hai.
🚚 5-7 din mein delivery ho jayegi.

Thank you for shopping with Saree Sansar! 🙏
"""
        else:
            return f"""
✅ *Order Confirmed!*

🆔 Order ID: `{order_id}`
💵 Payment: Cash on Delivery

📦 Aapka order ab process ho raha hai.
🚚 5-7 din mein delivery ho jayegi.
💵 Delivery ke time cash ready rakhein.

Thank you for shopping with Saree Sansar! 🙏
"""
    
    def validate_payment_screenshot(self, image_bytes: bytes) -> Tuple[bool, str]:
        """
        Validate payment screenshot (basic check)
        In production, this would use OCR/AI to verify
        """
        try:
            # Just check if it's a valid image
            Image.open(io.BytesIO(image_bytes))
            return True, "✅ Payment screenshot received! Order confirm ho raha hai..."
        except Exception:
            return False, "❌ Invalid image. Please send a clear screenshot."
    
    def get_order_summary(self, items: list, total: int, address: dict, payment_method: str) -> str:
        """Get order summary message"""
        items_text = "\n".join([
            f"  • {item['name'][:30]}... x{item['quantity']} = ₹{item['price'] * item['quantity']:,}"
            for item in items
        ])
        
        address_text = f"{address.get('street', '')}\n{address.get('city', '')}, {address.get('state', '')}\nPIN: {address.get('pincode', '')}"
        
        return f"""
📋 *Order Summary*

*Items:*
{items_text}

💰 *Total:* ₹{total:,}

📍 *Delivery Address:*
{address_text}

💳 *Payment:* {payment_method.upper()}

✅ Click 'Confirm Order' to proceed!
"""


# Singleton instance
payment_service = PaymentService()


def generate_payment_qr(amount: int, order_id: str) -> bytes:
    """Generate UPI QR code"""
    return payment_service.generate_upi_qr(amount, order_id)


def get_upi_message(amount: int, order_id: str) -> str:
    """Get UPI payment message"""
    return payment_service.get_upi_payment_message(amount, order_id)


def get_cod_confirmation(amount: int, order_id: str) -> str:
    """Get COD confirmation message"""
    return payment_service.get_cod_message(amount, order_id)


def get_order_summary_message(items: list, total: int, address: dict, payment_method: str) -> str:
    """Get order summary"""
    return payment_service.get_order_summary(items, total, address, payment_method)
