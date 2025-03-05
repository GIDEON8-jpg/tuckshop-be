const pool = require('../config/db');

class Order {
    static async create({ userId, totalAmount, status = 'pending', paymentMethod, paymentDeadline }) {
        const [result] = await pool.query(
            'INSERT INTO orders (user_id, total_amount, status, payment_method, payment_deadline) VALUES (?, ?, ?, ?, ?)',
            [userId, totalAmount, status, paymentMethod, paymentDeadline]
        );
        return result.insertId;
    }

    static async addOrderItem({ orderId, productId, quantity, price }) {
        await pool.query(
            'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
            [orderId, productId, quantity, price]
        );
    }

    static async findByUserId(userId) {
        const [rows] = await pool.query('SELECT * FROM orders WHERE user_id = ?', [userId]);
        return rows;
    }
}

module.exports = Order;