const express = require('express');
const orderController = require('../controller/orderController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/orders', authMiddleware, orderController.placeOrder);
router.get('/users/:userId/orders', authMiddleware, orderController.getOrdersByUser);

module.exports = router;