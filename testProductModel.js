const Product = require('./models/Product');

(async () => {
    try {
        // Create a new product
        const productId = await Product.createProduct('Apple', 1.50, 100);
        console.log('Product created with ID:', productId);

        // Get all products
        const products = await Product.getAllProducts();
        console.log('All products:', products);

        // Get the product by ID
        const productById = await Product.getProductById(productId);
        console.log('Product found by ID:', productById);

        // Update the product
        await Product.updateProduct(productId, 'Green Apple', 2.00, 50);
        console.log('Product updated');

        // Delete the product
        await Product.deleteProduct(productId);
        console.log('Product deleted');
    } catch (error) {
        console.error('Error:', error);
    }
})();