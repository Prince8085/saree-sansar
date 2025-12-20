"""
Helper utilities for Saree Sansar Bot
"""

import re
from typing import Tuple, Optional
from ..config import STORE_NAME, WHATSAPP_NUMBER


def format_price(price: int) -> str:
    """Format price in Indian style"""
    return f"₹{price:,}"


def parse_price_query(query: str) -> Tuple[int, int]:
    """Parse price range from user query"""
    # Patterns: "under 20k", "below 20000", "above 10k", "10k to 20k"
    query = query.lower()
    
    # Convert k to 000
    query = re.sub(r'(\d+)k', lambda m: str(int(m.group(1)) * 1000), query)
    
    min_price = 0
    max_price = 100000
    
    # Under/below pattern
    under_match = re.search(r'(under|below|less than)\s*(\d+)', query)
    if under_match:
        max_price = int(under_match.group(2))
    
    # Above pattern
    above_match = re.search(r'(above|over|more than)\s*(\d+)', query)
    if above_match:
        min_price = int(above_match.group(2))
    
    # Range pattern (x to y)
    range_match = re.search(r'(\d+)\s*(to|-)\s*(\d+)', query)
    if range_match:
        min_price = int(range_match.group(1))
        max_price = int(range_match.group(3))
    
    return min_price, max_price


def parse_color_query(query: str) -> Optional[str]:
    """Extract color from query"""
    colors = ['red', 'green', 'blue', 'purple', 'pink', 'gold', 'white', 'black', 
              'maroon', 'orange', 'yellow', 'multicolor']
    
    # Hindi color names
    hindi_colors = {
        'laal': 'red', 'hara': 'green', 'neela': 'blue', 'gulabi': 'pink',
        'safed': 'white', 'kaala': 'black', 'peela': 'yellow', 'narangi': 'orange'
    }
    
    query_lower = query.lower()
    
    for hindi, english in hindi_colors.items():
        if hindi in query_lower:
            return english
    
    for color in colors:
        if color in query_lower:
            return color
    
    return None


def parse_occasion_query(query: str) -> Optional[str]:
    """Extract occasion from query"""
    occasions = {
        'wedding': ['wedding', 'shaadi', 'shadi', 'bridal', 'dulhan'],
        'party': ['party', 'celebration', 'festive', 'function'],
        'casual': ['casual', 'daily', 'office', 'regular'],
    }
    
    query_lower = query.lower()
    
    for occasion, keywords in occasions.items():
        for keyword in keywords:
            if keyword in query_lower:
                return occasion
    
    return None


def parse_category_query(query: str) -> Optional[str]:
    """Extract category from query"""
    categories = {
        'bridal': ['bridal', 'bride', 'dulhan', 'wedding saree'],
        'kosa': ['kosa', 'kossa', 'tussar'],
        'silk': ['banarasi', 'silk', 'silky'],
        'cotton': ['cotton', 'suti'],
        'georgette': ['georgette', 'chiffon'],
        'ghagra': ['ghagra', 'lehenga', 'chaniya choli'],
        'kurtis': ['kurti', 'kurta'],
        'suits': ['suit', 'salwar', 'churidar'],
    }
    
    query_lower = query.lower()
    
    for category, keywords in categories.items():
        for keyword in keywords:
            if keyword in query_lower:
                return category
    
    return None


def get_whatsapp_link(message: str = "", product_name: str = None) -> str:
    """Generate WhatsApp link with pre-filled message"""
    if product_name:
        message = f"Hi! I'm interested in: {product_name}. Please provide more details."
    elif not message:
        message = "Hi! I'm interested in your sarees. Please help me."
    
    encoded_message = message.replace(" ", "%20").replace("\n", "%0A")
    return f"https://wa.me/{WHATSAPP_NUMBER}?text={encoded_message}"


def truncate_text(text: str, max_length: int = 50) -> str:
    """Truncate text with ellipsis"""
    if len(text) <= max_length:
        return text
    return text[:max_length-3] + "..."


def escape_markdown(text: str) -> str:
    """Escape special markdown characters"""
    special_chars = ['_', '*', '[', ']', '(', ')', '~', '`', '>', '#', '+', '-', '=', '|', '{', '}', '.', '!']
    for char in special_chars:
        text = text.replace(char, f'\\{char}')
    return text


def validate_phone(phone: str) -> Tuple[bool, str]:
    """Validate Indian phone number"""
    # Remove spaces, +91, 0
    clean_phone = re.sub(r'[\s\-\+]', '', phone)
    clean_phone = re.sub(r'^(91|0)', '', clean_phone)
    
    if len(clean_phone) == 10 and clean_phone.isdigit():
        return True, f"+91 {clean_phone}"
    
    return False, ""


def validate_pincode(pincode: str) -> bool:
    """Validate Indian pincode"""
    clean_pincode = pincode.strip()
    return len(clean_pincode) == 6 and clean_pincode.isdigit()


def format_order_timeline(timeline: list) -> str:
    """Format order timeline for display"""
    result = []
    
    for step in timeline:
        status = step.get('status', '')
        date = step.get('date', '')
        time = step.get('time', '')
        completed = step.get('completed', False)
        
        if completed:
            emoji = "✅"
            date_str = f" ({date} {time})" if date else ""
        else:
            emoji = "⏳"
            date_str = " (Pending)"
        
        result.append(f"{emoji} {status}{date_str}")
    
    return "\n".join(result)


def get_greeting() -> str:
    """Get time-based greeting in Hindlish"""
    from datetime import datetime
    hour = datetime.now().hour
    
    if 5 <= hour < 12:
        return "🌅 Good Morning! Suprabhat!"
    elif 12 <= hour < 17:
        return "☀️ Good Afternoon! Namaskar!"
    elif 17 <= hour < 21:
        return "🌆 Good Evening! Shubh Sandhya!"
    else:
        return "🌙 Good Night! Shubh Ratri!"


def format_address(address: dict) -> str:
    """Format address for display"""
    parts = []
    if address.get('street'):
        parts.append(address['street'])
    if address.get('city'):
        parts.append(address['city'])
    if address.get('state'):
        parts.append(address['state'])
    if address.get('pincode'):
        parts.append(f"PIN: {address['pincode']}")
    
    return "\n".join(parts)
