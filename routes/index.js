const express = require('express');
const router = express.Router();

// Root route
router.get('/', (req, res) => {
    res.send('Welcome to the Tuckshop Backend!');
});

module.exports = router;