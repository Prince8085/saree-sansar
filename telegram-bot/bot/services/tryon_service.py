"""
Virtual Try-On Service using Gemini Vision
"""

import io
import base64
from typing import Optional, Tuple
import google.generativeai as genai
from PIL import Image
from ..config import GEMINI_API_KEY
from ..data import get_product_by_id


class VirtualTryOnService:
    """
    Virtual Try-On using Gemini Vision API
    Creates AI-generated preview of user wearing saree
    """
    
    def __init__(self):
        if GEMINI_API_KEY:
            genai.configure(api_key=GEMINI_API_KEY)
            self.model = genai.GenerativeModel('gemini-1.5-flash')
        else:
            self.model = None
    
    async def process_tryon(
        self,
        user_photo_bytes: bytes,
        product_id: str
    ) -> Tuple[bool, str, Optional[bytes]]:
        """
        Process virtual try-on request
        
        Args:
            user_photo_bytes: User's photo as bytes
            product_id: Product ID to try on
            
        Returns:
            Tuple of (success, message, result_image_bytes)
        """
        if not self.model:
            return False, "⚠️ Virtual Try-On service abhi available nahi hai. Gemini API key configure karein.", None
        
        try:
            # Get product details
            product = get_product_by_id(product_id)
            if not product:
                return False, "❌ Product nahi mila. Please valid product select karein.", None
            
            # Load user image
            user_image = Image.open(io.BytesIO(user_photo_bytes))
            
            # Create prompt for Gemini
            prompt = f"""
You are a virtual fashion assistant. Analyze this photo and describe how the person would look wearing:

Product: {product.name}
Description: {product.description}
Color: {product.color}
Fabric: {product.fabric}

Please provide:
1. A vivid description of how the saree would look on this person
2. Style tips for accessorizing with this saree
3. Occasions where this look would be perfect
4. Any suggestions for the perfect look

Be enthusiastic, use emojis, and respond in Hindlish (mix of Hindi and English)!
"""
            
            # Call Gemini Vision API
            response = self.model.generate_content([prompt, user_image])
            
            result_text = response.text
            
            # Format the response
            formatted_response = f"""
👗 *Virtual Try-On Result*

🛍️ *Product:* {product.name}
💰 *Price:* ₹{product.price:,}

✨ *AI Fashion Analysis:*
{result_text}

🛒 *Ready to buy?* Use the buttons below!
"""
            
            return True, formatted_response, None
            
        except Exception as e:
            print(f"Virtual Try-On Error: {e}")
            return False, f"⚠️ Try-on process mein error aaya: {str(e)[:100]}. Please try again!", None
    
    async def get_style_suggestions(self, product_id: str) -> str:
        """
        Get AI-powered style suggestions for a product
        """
        if not self.model:
            return "Style suggestions ke liye Gemini API configure karein."
        
        try:
            product = get_product_by_id(product_id)
            if not product:
                return "Product not found"
            
            prompt = f"""
Give style and accessory suggestions for this saree in Hindlish:

Saree: {product.name}
Color: {product.color}
Fabric: {product.fabric}
Occasion: {product.occasion}

Include:
- Jewelry suggestions (earrings, necklace, bangles)
- Hairstyle ideas
- Makeup tips
- Blouse design suggestions

Be brief (5-6 bullet points), use emojis, be enthusiastic!
"""
            
            response = self.model.generate_content(prompt)
            return response.text
            
        except Exception as e:
            print(f"Style Suggestions Error: {e}")
            return """
💎 *Style Tips:*
• Gold jewelry perfect rahega is saree ke saath
• Bun ya loose curls mein hair karein
• Matching blouse with contrast border
• Subtle makeup with bold lips
"""
    
    async def analyze_photo_for_recommendations(self, photo_bytes: bytes) -> str:
        """
        Analyze user photo to recommend suitable sarees
        """
        if not self.model:
            return "Photo analysis ke liye Gemini API configure karein."
        
        try:
            image = Image.open(io.BytesIO(photo_bytes))
            
            prompt = """
Analyze this photo and suggest what types of Indian sarees would suit this person.
Consider:
- Skin tone and suitable colors
- Body type and draping styles
- Occasion suitability

Give 3-4 specific saree recommendations in Hindlish.
Be respectful, positive and helpful. Use emojis!
"""
            
            response = self.model.generate_content([prompt, image])
            return response.text
            
        except Exception as e:
            print(f"Photo Analysis Error: {e}")
            return "📸 Photo analysis mein issue aaya. Please try again!"


# Singleton instance
tryon_service = VirtualTryOnService()


async def process_virtual_tryon(user_photo: bytes, product_id: str) -> Tuple[bool, str, Optional[bytes]]:
    """Process virtual try-on request"""
    return await tryon_service.process_tryon(user_photo, product_id)


async def get_style_tips(product_id: str) -> str:
    """Get style suggestions for product"""
    return await tryon_service.get_style_suggestions(product_id)


async def analyze_for_recommendations(photo: bytes) -> str:
    """Analyze photo for saree recommendations"""
    return await tryon_service.analyze_photo_for_recommendations(photo)
