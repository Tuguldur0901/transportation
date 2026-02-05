const pool = require('../config/db');

exports.getAllCargo = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM cargo ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createCargo = async (req, res) => {
    const { price, item_name, sender, weight, receiver } = req.body;
    const tracking_id = 'TRK' + Math.floor(Math.random() * 1000000);
    try {
        const result = await pool.query(
            'INSERT INTO cargo (tracking_id, price, item_name, sender, weight, receiver) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [tracking_id, price, item_name, sender, weight, receiver]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};