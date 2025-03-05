const User = require('./models/User');

(async () => {
    try {
        // Create a new user
        const userId = await User.createUser('gideon zimano', 'h230222m@hit.ac.zw', '@C@p@lot_7');
        console.log('User created with ID:', userId);



        // Find the user by email
        const userByEmail = await User.findUserByEmail('test@example.com');
        console.log('User found by email:', userByEmail);

        // Find the user by ID
        const userById = await User.findUserById(userId);
        console.log('User found by ID:', userById);
    } catch (error) {
        console.error('Error:', error);
    }
})();