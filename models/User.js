const pool = require('../config/db');

class User {
    static async create({ username, email, password, role = 'client' }) {
        const [result] = await pool.query(
            'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
            [username, email, password, role]
        );
        return result.insertId;
    }

    static async findByUsername(username) {
        const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
        return rows[0];
    }

    static async findById(id) {
        const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
        return rows[0];
    }
}

module.exports = User;