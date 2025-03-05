const Order = require('../models/Order');

const orderController = {
    async placeOrder(req, res) {
        try {
            const { userId, totalAmount, paymentMethod, paymentDeadline, items } = req.body;
            const orderId = await Order.create({ userId, totalAmount, paymentMethod, paymentDeadline });

            for (const item of items) {
                await Order.addOrderItem({ orderId, productId: item.productId, quantity: item.quantity, price: item.price });
            }

            res.status(201).json({ message: 'Order placed successfully', orderId });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    async getOrdersByUser(req, res) {
        try {
            const { userId } = req.params;
            const orders = await Order.findByUserId(userId);
            res.json(orders);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    },
};

module.exports = orderController;