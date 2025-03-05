const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const dotenv = require('dotenv');


dotenv.config();

const authController = {
    async register(req, res) {
        try {
            const { username, email, password, role = 'client' } = req.body; // Default role is 'client'
            const hashedPassword = await bcrypt.hash(password, 10);
            const userId = await User.create({ username, email, password: hashedPassword, role });
            res.status(201).json({ message: 'User registered successfully', userId });
        } catch (error) {
            console.error('Registration Error:', error.message); // Log the error
            res.status(500).json({ error: 'Internal server error during registration' });
        }
    },

    async login(req, res) {
        try {
            const { username, password } = req.body;
            console.log({username, password});



            // Find user by username
            const user = await User.findByUsername(username);
            if (!user) {
                console.error('Login Error: User not found'); // Log the error
                return res.status(400).json({ error: 'Invalid credentials' });
            }

            // Compare passwords
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                console.error('Login Error: Password mismatch'); // Log the error
                return res.status(400).json({ error: 'Invalid credentials' });
            }

            // Log the JWT_SECRET for debugging
            console.log('JWT_SECRET:', process.env.JWT_SECRET);

            // Generate JWT token
            const tokenPayload = { id: user.id, role: user.role };
            console.log('Token Payload:', tokenPayload); // Log the payload

            const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '1h' });
            console.log('Generated Token:', token); // Log the generated token

            res.json({ token });
        } catch (error) {
            console.error('Login Error:', error.message); // Log the error
            res.status(500).json({ error: 'Internal server error during login' });
        }
    },
};

module.exports = authController;