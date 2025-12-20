"""
AI Service Integration for Saree Sansar Bot
Uses Groq for fast chat responses and Gemini for vision/advanced tasks
"""

import asyncio
from typing import Optional, List, Dict
from ..config import GROQ_API_KEY, GEMINI_API_KEY, GROQ_SYSTEM_PROMPT
from ..data import search_products, filter_products, get_all_products


class AIService:
    """AI Service using Groq and Gemini APIs"""
    
    def __init__(self):
        self._groq_client = None
        self._gemini_model = None
        self._gemini_vision = None
        self._groq_available = True
        self._gemini_available = bool(GEMINI_API_KEY)
        
        # Conversation history per user
        self.conversations: Dict[int, List[dict]] = {}
    
    @property
    def groq_client(self):
        """Lazy initialize Groq client"""
        if self._groq_client is None and self._groq_available:
            try:
                from groq import Groq
                self._groq_client = Groq(api_key=GROQ_API_KEY)
            except Exception as e:
                print(f"Groq init error: {e}")
                self._groq_available = False
        return self._groq_client
    
    @property
    def gemini_model(self):
        """Lazy initialize Gemini model"""
        if self._gemini_model is None and self._gemini_available:
            try:
                import google.generativeai as genai
                genai.configure(api_key=GEMINI_API_KEY)
                self._gemini_model = genai.GenerativeModel('gemini-pro')
            except Exception as e:
                print(f"Gemini init error: {e}")
                self._gemini_available = False
        return self._gemini_model
    
    def _get_conversation(self, user_id: int) -> List[dict]:
        """Get conversation history for user"""
        if user_id not in self.conversations:
            self.conversations[user_id] = []
        return self.conversations[user_id]
    
    def _add_to_conversation(self, user_id: int, role: str, content: str):
        """Add message to conversation history"""
        history = self._get_conversation(user_id)
        history.append({"role": role, "content": content})
        
        # Keep only last 10 messages
        if len(history) > 10:
            history = history[-10:]
        self.conversations[user_id] = history
    
    async def chat(self, user_id: int, message: str) -> str:
        """
        Process chat message with AI
        Uses Groq for fast responses
        """
        try:
            # Add user message to history
            self._add_to_conversation(user_id, "user", message)
            
            if not self.groq_client:
                return self._get_fallback_response(message)
            
            # Build messages for API
            messages = [
                {"role": "system", "content": GROQ_SYSTEM_PROMPT}
            ] + self._get_conversation(user_id)
            
            # Get product context if query seems product-related
            product_context = self._get_product_context(message)
            if product_context:
                messages.append({
                    "role": "system",
                    "content": f"Available products matching user query:\n{product_context}"
                })
            
            # Call Groq API
            response = self.groq_client.chat.completions.create(
                model="llama-3.1-8b-instant",  # Fast model
                messages=messages,
                temperature=0.7,
                max_tokens=500,
            )
            
            assistant_message = response.choices[0].message.content
            
            # Add to conversation history
            self._add_to_conversation(user_id, "assistant", assistant_message)
            
            return assistant_message
            
        except Exception as e:
            print(f"AI Chat Error: {e}")
            return self._get_fallback_response(message)
    
    def _get_product_context(self, query: str) -> str:
        """Get relevant product info for AI context"""
        # Check if query is product-related
        product_keywords = ['saree', 'sarees', 'show', 'find', 'search', 'want', 
                          'chahiye', 'dikhao', 'price', 'cost', 'kosa', 'silk',
                          'bridal', 'wedding', 'party', 'color']
        
        query_lower = query.lower()
        is_product_query = any(keyword in query_lower for keyword in product_keywords)
        
        if not is_product_query:
            return ""
        
        # Search for matching products
        results = search_products(query)
        
        if not results:
            # Try with individual words
            for word in query.split():
                if len(word) > 3:
                    results = search_products(word)
                    if results:
                        break
        
        if not results:
            results = get_all_products()[:5]
        
        # Format product info
        context_lines = []
        for p in results[:5]:
            discount = f" ({p.get_discount_percent()}% OFF)" if p.original_price else ""
            context_lines.append(
                f"- {p.name}: ₹{p.price:,}{discount} | {p.fabric} | {p.color.title()} | Stock: {p.stock}"
            )
        
        return "\n".join(context_lines)
    
    def _get_fallback_response(self, message: str) -> str:
        """Get fallback response when AI fails"""
        message_lower = message.lower()
        
        if any(w in message_lower for w in ['hi', 'hello', 'hey', 'namaste']):
            return "🙏 Namaste! Main Saree Sansar ka assistant hoon. Aapki kya help kar sakta hoon?"
        
        if any(w in message_lower for w in ['price', 'cost', 'kitna', 'kitne']):
            return "💰 Hamare sarees ₹2,999 se ₹35,999 tak available hain. Kaunsi category mein dekhna chahenge?"
        
        if any(w in message_lower for w in ['delivery', 'shipping', 'kab']):
            return "🚚 Pan-India delivery 5-7 din mein ho jaati hai. ₹10,000+ orders pe free shipping!"
        
        if any(w in message_lower for w in ['saree', 'sarees', 'product']):
            return "🛍️ Hamare paas bridal, kosa silk, banarasi aur bahut saari categories hain. /products type karein!"
        
        return "🙏 Main aapki madad karna chahunga! /help type karein ya WhatsApp pe baat karein: +91 9354815144"
    
    async def smart_search(self, query: str) -> dict:
        """
        Smart search using AI to understand user intent
        Returns structured search parameters
        """
        if not self.groq_client:
            return {}
            
        try:
            prompt = f"""
You are a search query parser for an Indian saree e-commerce store.
Parse the following customer query and extract search parameters.

Query: "{query}"

Return a JSON object with these fields (only include fields that are clearly mentioned):
- category: one of [bridal, kosa, silk, cotton, georgette, ghagra, kurtis, suits]
- color: one of [red, green, blue, purple, pink, gold, white, black, maroon, multicolor]
- occasion: one of [wedding, party, casual]
- min_price: number (in INR)
- max_price: number (in INR)
- fabric: string like "silk", "cotton", etc.

Important:
- Convert "k" to thousands (20k = 20000)
- Convert Hindi words: laal=red, hara=green, neela=blue, shaadi=wedding
- If budget mentioned like "under 20k", set max_price=20000
- Only include fields you're confident about

Return ONLY the JSON, no explanation.
"""
            
            response = self.groq_client.chat.completions.create(
                model="llama-3.1-8b-instant",
                messages=[{"role": "user", "content": prompt}],
                temperature=0.1,
                max_tokens=200,
            )
            
            result_text = response.choices[0].message.content.strip()
            
            # Parse JSON from response
            import json
            # Clean up the response
            result_text = result_text.replace("```json", "").replace("```", "").strip()
            
            return json.loads(result_text)
            
        except Exception as e:
            print(f"Smart Search Error: {e}")
            return {}
    
    async def get_product_recommendation(self, user_id: int, preferences: dict = None) -> str:
        """
        Get AI-powered product recommendations
        """
        try:
            products = get_all_products()
            
            # Apply preferences if any
            if preferences:
                products = filter_products(
                    min_price=preferences.get('min_price', 0),
                    max_price=preferences.get('max_price', 100000),
                    colors=preferences.get('colors', []),
                    categories=preferences.get('categories', []),
                    occasions=preferences.get('occasions', []),
                )
            
            if not products:
                products = get_all_products()[:5]
            
            if not self.groq_client:
                return "🌟 Aaj ke top picks: Bridal collection mein Royal Maroon Silk Saree aur Kosa Silk collection mein Forest Green Saree bahut popular hai!"
            
            # Format products for recommendation
            product_list = "\n".join([
                f"- {p.name} (₹{p.price:,}) - {p.fabric}, {p.color.title()}, Rating: {p.rating}/5"
                for p in products[:8]
            ])
            
            prompt = f"""
Based on these available products, give a friendly recommendation in Hindlish:

{product_list}

Give a short, engaging recommendation (2-3 lines) highlighting the best options.
Use emojis and be enthusiastic!
"""
            
            response = self.groq_client.chat.completions.create(
                model="llama-3.1-8b-instant",
                messages=[{"role": "user", "content": prompt}],
                temperature=0.8,
                max_tokens=200,
            )
            
            return response.choices[0].message.content
            
        except Exception as e:
            print(f"Recommendation Error: {e}")
            return "🌟 Aaj ke top picks: Bridal collection mein Royal Maroon Silk Saree aur Kosa Silk collection mein Forest Green Saree bahut popular hai!"
    
    def clear_conversation(self, user_id: int):
        """Clear conversation history for user"""
        if user_id in self.conversations:
            del self.conversations[user_id]


# Singleton instance (lazy initialized)
ai_service = AIService()


async def get_ai_response(user_id: int, message: str) -> str:
    """Get AI response for user message"""
    return await ai_service.chat(user_id, message)


async def smart_product_search(query: str) -> dict:
    """Parse search query with AI"""
    return await ai_service.smart_search(query)


async def get_recommendations(user_id: int, preferences: dict = None) -> str:
    """Get AI product recommendations"""
    return await ai_service.get_product_recommendation(user_id, preferences)

