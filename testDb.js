const db = require('./config/db');

const testConnection = async () => {
    try {
        const [rows] = await db.execute('SELECT 1 + 1 AS result');
        console.log('Database connection test successful:', rows);
    } catch (err) {
        console.error('Database connection test failed:', err);
    }
};

testConnection();