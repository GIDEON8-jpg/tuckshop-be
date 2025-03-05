const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Verify that JWT_SECRET is set
if (!process.env.JWT_SECRET) {
    console.error('FATAL ERROR: JWT_SECRET is not defined in the .env file.');
    process.exit(1); // Exit the application if the secret is missing
}

module.exports = {
    jwtSecret: process.env.JWT_SECRET,
};