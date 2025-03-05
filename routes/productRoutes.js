const express = require('express');
const productController = require('../controller/productController');
const authMiddleware = require('../middleware/authMiddleware');
const checkRole = require('../middleware/checkRole');

const router = express.Router();

// Get all products (accessible to all)
router.get('/', productController.getAllProducts);

// Get a product by ID (accessible to all)
router.get('/:id', productController.getProductById);

// Create a new product (admin only)
router.post('/', authMiddleware, checkRole('admin'), productController.createProduct);

// Update a product (admin only)
router.put('/:id', authMiddleware, checkRole('admin'), productController.updateProduct);

// Delete a product (admin only)
router.delete('/:id', authMiddleware, checkRole('admin'), productController.deleteProduct);

module.exports = router;