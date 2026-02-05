const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// БҮРТГҮҮЛЭХ
exports.signup = async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query(
            'INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING id, username',
            [username, hashedPassword]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(400).json({ error: "Хэрэглэгчийн нэр аль хэдийн бүртгэгдсэн байна." });
    }
};

// НЭВТРЭХ
exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Хэрэглэгч олдсонгүй." });
        }

        const user = result.rows[0];
        const isMatch = await bcrypt.compare(password, user.password_hash);

        if (!isMatch) {
            return res.status(401).json({ error: "Нууц үг буруу байна." });
        }

        // Token үүсгэх
        const token = jwt.sign(
            { id: user.id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({ token, username: user.username });
    } catch (err) {
        res.status(500).json({ error: "Серверийн алдаа." });
    }
};