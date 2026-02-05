const pool = require('../config/db');

exports.addProduct = async (req, res) => {
    const { name, price, stock } = req.body;
    const seller_id = req.user.id; // JWT-ээс ирсэн ID

    try {
        const result = await pool.query(
            'INSERT INTO products (name, price, stock, seller_id) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, price, stock, seller_id]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};