const Product = require('../models/Product');

const productController = {
    // Get all products
    async getAllProducts(req, res) {
        try {
            const products = await Product.getAllProducts();
            res.json(products);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Get a product by ID
    async getProductById(req, res) {
        try {
            const product = await Product.getProductById(req.params.id);
            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }
            res.json(product);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Create a new product
    async createProduct(req, res) {
        try {
            const { name, price, quantity } = req.body;
            const productId = await Product.createProduct(name, price, quantity);
            res.status(201).json({ message: 'Product created successfully', productId });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Update a product
    async updateProduct(req, res) {
        try {
            const { name, price, quantity } = req.body;
            await Product.updateProduct(req.params.id, name, price, quantity);
            res.json({ message: 'Product updated successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Delete a product
    async deleteProduct(req, res) {
        try {
            await Product.deleteProduct(req.params.id);
            res.json({ message: 'Product deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

module.exports = productController;