const pool = require('../config/db');

exports.createOrder = async (req, res) => {
    const { product_id, quantity, delivery_address } = req.body;
    const buyer_id = req.user.id;
    const tracking_id = 'TRK' + Date.now(); // Цаг хугацаагаар ID үүсгэх

    try {
        // 1. Барааны үнийг олж нийт үнийг тооцоолох
        const product = await pool.query('SELECT price FROM products WHERE id = $1', [product_id]);
        const total_price = product.rows[0].price * quantity;

        // 2. Захиалга үүсгэх
        const result = await pool.query(
            'INSERT INTO orders (product_id, buyer_id, quantity, total_price, delivery_address, tracking_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [product_id, buyer_id, quantity, total_price, delivery_address, tracking_id]
        );
        
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};