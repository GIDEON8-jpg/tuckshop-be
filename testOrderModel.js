const Order = require('./models/Order');
const User = require('./models/User');
const Product = require('./models/Product');

(async () => {
    try {
        // Check if the test user already exists
        const email = 'order@example.com';
        let user = await User.findUserByEmail(email);

        // If the user doesn't exist, create them
        if (!user) {
            const userId = await User.createUser('order_user', email, 'password123');
            console.log('User created with ID:', userId);
            user = { id: userId }; // Store the user ID for later use
        } else {
            console.log('User already exists with ID:', user.id);
        }

        // Create a product
        const productId = await Product.createProduct('Banana', 0.50, 200);
        console.log('Product created with ID:', productId);

        // Create an order
        const orderId = await Order.createOrder(user.id, productId, 5, 2.50);
        console.log('Order created with ID:', orderId);

        // Get all orders for the user
        const orders = await Order.getOrdersByUserId(user.id);
        console.log('Orders for user:', orders);
    } catch (error) {
        console.error('Error:', error);
    }
})();