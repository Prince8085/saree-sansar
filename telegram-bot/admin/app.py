"""
Saree Sansar Admin Panel - Flask Web Application
"""

import os
import sys
from functools import wraps
from flask import Flask, render_template, request, redirect, url_for, flash, session, jsonify
from flask_cors import CORS

# Add parent directory to path for imports
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from bot.config import ADMIN_SECRET_KEY, ADMIN_USERNAME, ADMIN_PASSWORD, ADMIN_PORT, STORE_NAME
from bot.data import (
    get_all_products,
    get_product_by_id,
    get_all_orders,
    get_order_by_id,
    update_order_status,
    get_active_users_count,
    get_all_users,
    ORDERS,
)

app = Flask(__name__)
app.secret_key = ADMIN_SECRET_KEY
CORS(app)


def login_required(f):
    """Decorator to require login for routes"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not session.get('logged_in'):
            return redirect(url_for('login'))
        return f(*args, **kwargs)
    return decorated_function


@app.route('/login', methods=['GET', 'POST'])
def login():
    """Login page"""
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        
        if username == ADMIN_USERNAME and password == ADMIN_PASSWORD:
            session['logged_in'] = True
            flash('Welcome back!', 'success')
            return redirect(url_for('dashboard'))
        else:
            flash('Invalid credentials', 'error')
    
    return render_template('login.html')


@app.route('/logout')
def logout():
    """Logout"""
    session.pop('logged_in', None)
    flash('Logged out successfully', 'success')
    return redirect(url_for('login'))


@app.route('/')
@login_required
def dashboard():
    """Main dashboard"""
    orders = get_all_orders()
    products = get_all_products()
    
    # Calculate stats
    total_orders = len(orders)
    total_revenue = sum(o.total_amount for o in orders if o.status != 'cancelled')
    pending_orders = len([o for o in orders if o.status == 'pending'])
    active_users = get_active_users_count()
    
    # Recent orders
    recent_orders = sorted(orders, key=lambda x: x.created_at, reverse=True)[:5]
    
    # Order status breakdown
    status_counts = {}
    for o in orders:
        status_counts[o.status] = status_counts.get(o.status, 0) + 1
    
    return render_template('dashboard.html',
        store_name=STORE_NAME,
        total_orders=total_orders,
        total_revenue=total_revenue,
        pending_orders=pending_orders,
        active_users=active_users,
        recent_orders=recent_orders,
        status_counts=status_counts,
        products_count=len(products),
    )


@app.route('/orders')
@login_required
def orders():
    """Orders management page"""
    status_filter = request.args.get('status', '')
    all_orders = get_all_orders()
    
    if status_filter:
        all_orders = [o for o in all_orders if o.status == status_filter]
    
    all_orders = sorted(all_orders, key=lambda x: x.created_at, reverse=True)
    
    return render_template('orders.html',
        store_name=STORE_NAME,
        orders=all_orders,
        current_status=status_filter,
    )


@app.route('/orders/<order_id>')
@login_required
def order_detail(order_id):
    """Order detail page"""
    order = get_order_by_id(order_id)
    if not order:
        flash('Order not found', 'error')
        return redirect(url_for('orders'))
    
    return render_template('order_detail.html',
        store_name=STORE_NAME,
        order=order,
    )


@app.route('/orders/<order_id>/update', methods=['POST'])
@login_required
def update_order(order_id):
    """Update order status"""
    new_status = request.form.get('status')
    
    order = update_order_status(order_id, new_status)
    if order:
        flash(f'Order {order_id} updated to {new_status}', 'success')
    else:
        flash('Failed to update order', 'error')
    
    return redirect(url_for('order_detail', order_id=order_id))


@app.route('/products')
@login_required
def products():
    """Products page"""
    all_products = get_all_products()
    return render_template('products.html',
        store_name=STORE_NAME,
        products=all_products,
    )


@app.route('/broadcast', methods=['GET', 'POST'])
@login_required
def broadcast():
    """Broadcast messages page"""
    if request.method == 'POST':
        message = request.form.get('message')
        users = get_all_users()
        
        # In production, this would actually send messages via bot
        flash(f'Message queued for {len(users)} users', 'success')
    
    users_count = get_active_users_count()
    return render_template('broadcast.html',
        store_name=STORE_NAME,
        users_count=users_count,
    )


# API Endpoints for AJAX
@app.route('/api/orders')
@login_required
def api_orders():
    """API: Get all orders"""
    orders = get_all_orders()
    return jsonify([o.to_dict() for o in orders])


@app.route('/api/orders/<order_id>/status', methods=['POST'])
@login_required
def api_update_order_status(order_id):
    """API: Update order status"""
    data = request.get_json()
    new_status = data.get('status')
    
    order = update_order_status(order_id, new_status)
    if order:
        return jsonify({'success': True, 'order': order.to_dict()})
    return jsonify({'success': False, 'error': 'Order not found'}), 404


@app.route('/api/stats')
@login_required
def api_stats():
    """API: Get dashboard stats"""
    orders = get_all_orders()
    
    return jsonify({
        'total_orders': len(orders),
        'total_revenue': sum(o.total_amount for o in orders if o.status != 'cancelled'),
        'pending_orders': len([o for o in orders if o.status == 'pending']),
        'active_users': get_active_users_count(),
    })


if __name__ == '__main__':
    print(f"🚀 Starting {STORE_NAME} Admin Panel...")
    print(f"📍 Open: http://localhost:{ADMIN_PORT}")
    print(f"👤 Username: {ADMIN_USERNAME}")
    app.run(debug=True, port=ADMIN_PORT)
