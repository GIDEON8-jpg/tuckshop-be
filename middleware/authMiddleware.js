const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ message: 'No token provided' });
console.log(token)
    try {
        // Log the JWT_SECRET for debugging
        console.log('JWT_SECRET in Middleware:', process.env.JWT_SECRET);

        // Directly attach the decoded payload to req.user
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded User:', req.user); // Log the decoded user
        next();
    } catch (error) {
        console.error('Token Verification Error:', error); // Log the error
        res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};

module.exports = authMiddleware;






























































































