const pool = require('../config/db');

class Product {
    // Get all products
    static async getAllProducts() {
        const [rows] = await pool.query('SELECT * FROM products');
        return rows;
    }

    // Get a product by ID
    static async getProductById(id) {
        const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
        return rows[0];
    }

    // Create a new product
    static async createProduct(name, price, quantity) {
        const [result] = await pool.query(
            'INSERT INTO products (name, price, quantity) VALUES (?, ?, ?)',
            [name, price, quantity]
        );
        return result.insertId;
    }

    // Update a product
    static async updateProduct(id, name, price, quantity) {
        await pool.query(
            'UPDATE products SET name = ?, price = ?, quantity = ? WHERE id = ?',
            [name, price, quantity, id]
        );
    }

    // Delete a product
    static async deleteProduct(id) {
        await pool.query('DELETE FROM products WHERE id = ?', [id]);
    }
}

module.exports = Product;