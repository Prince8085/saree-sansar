# 🛍️ Saree Sansar Telegram Bot

An advanced AI-powered Telegram bot for Saree Sansar e-commerce store with virtual try-on, smart search, and admin panel.

## ✨ Features

### 🤖 Bot Features
- **AI-Powered Chat** - Hindlish conversational AI using Groq
- **Smart Product Search** - NLP-based search understanding queries like "red bridal saree under 20k"
- **Virtual Try-On** - AI-powered fashion analysis using Gemini Vision
- **Product Catalog** - Browse by categories with pagination
- **Shopping Cart** - Add, remove, and checkout
- **Order Tracking** - Real-time order status updates
- **UPI Payment** - QR code generation for payments
- **COD Support** - Cash on delivery option

### 🖥️ Admin Panel
- **Dashboard** - Overview of orders, revenue, users
- **Order Management** - View, update status, track
- **Product Inventory** - View all products
- **Broadcast Messages** - Send notifications to users

## 🚀 Quick Start

### Prerequisites
- Python 3.10+
- Telegram Bot Token
- Groq API Key
- Gemini API Key (optional, for virtual try-on)

### Installation

1. **Navigate to bot directory:**
```bash
cd telegram-bot
```

2. **Create virtual environment:**
```bash
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Linux/Mac
```

3. **Install dependencies:**
```bash
pip install -r requirements.txt
```

4. **Configure API keys in `bot/config.py`:**
```python
TELEGRAM_BOT_TOKEN = "your_bot_token"
GROQ_API_KEY = "your_groq_key"
GEMINI_API_KEY = "your_gemini_key"  # Optional
```

### Running the Bot

```bash
python run_bot.py
```

### Running Admin Panel

```bash
python admin/app.py
```
Open http://localhost:5000 in browser.

**Login Credentials:**
- Username: `admin`
- Password: `SareeSansar@123`

## 📱 Bot Commands

| Command | Description |
|---------|-------------|
| `/start` | Start bot & show menu |
| `/help` | Show all commands |
| `/products` | Browse products |
| `/search <query>` | Search products |
| `/cart` | View shopping cart |
| `/orders` | View your orders |
| `/track <id>` | Track order |
| `/tryon` | Virtual try-on |
| `/contact` | Contact support |

## 🔍 Smart Search Examples

The AI understands various query formats:
- `"Red bridal saree under 20k"`
- `"Mujhe green kosa silk chahiye"`
- `"Wedding ke liye saree dikhao"`
- `"Party wear pink saree"`

## 📁 Project Structure

```
telegram-bot/
├── bot/
│   ├── main.py          # Bot entry point
│   ├── config.py        # Configuration
│   ├── handlers/        # Command handlers
│   │   ├── start.py
│   │   ├── products.py
│   │   ├── search.py
│   │   ├── cart.py
│   │   ├── orders.py
│   │   ├── tryon.py
│   │   └── payment.py
│   ├── services/        # AI services
│   │   ├── ai_service.py
│   │   ├── tryon_service.py
│   │   └── payment_service.py
│   ├── data/           # Mock data
│   │   ├── products.py
│   │   ├── orders.py
│   │   └── users.py
│   └── utils/          # Utilities
│       ├── keyboards.py
│       └── helpers.py
├── admin/
│   ├── app.py          # Flask admin
│   └── templates/      # HTML templates
├── requirements.txt
└── run_bot.py
```

## 🔧 Configuration

All configuration is in `bot/config.py`:

```python
# Telegram
TELEGRAM_BOT_TOKEN = "..."

# AI APIs
GROQ_API_KEY = "..."
GEMINI_API_KEY = "..."

# Admin Panel
ADMIN_USERNAME = "admin"
ADMIN_PASSWORD = "SareeSansar@123"
ADMIN_PORT = 5000

# Business
STORE_NAME = "Saree Sansar"
WHATSAPP_NUMBER = "919354815144"
UPI_ID = "sareesansar@upi"
```

## 🤖 AI Integration

### Groq API (Fast Chat)
- Used for conversational responses
- Smart product search parsing
- Product recommendations
- Model: `llama-3.1-8b-instant`

### Gemini API (Vision)
- Virtual try-on analysis
- Style recommendations
- Photo-based saree suggestions
- Model: `gemini-1.5-flash`

## 💳 Payment Flow

### UPI Payment
1. User selects UPI payment
2. Bot generates QR code with amount
3. User scans and pays
4. User sends payment screenshot
5. Order confirmed

### Cash on Delivery
1. User selects COD
2. Order placed immediately
3. Payment collected on delivery

## 📊 Admin Panel Features

- **Dashboard**: Total orders, revenue, pending orders, active users
- **Orders**: Filter by status, update order status, view timeline
- **Products**: View inventory, stock levels
- **Broadcast**: Send messages to all users

## 🌐 Deployment

### For Bot
Deploy to Railway, Render, or any VPS with Python support.

### For Admin Panel
Deploy as separate Flask application or combine with bot.

## 📞 Support

- **WhatsApp**: +91 9354815144
- **Store**: Shree Ram New Cloth Market, Bilaspur, Chhattisgarh

## 📄 License

© 2025 Saree Sansar. All rights reserved.
