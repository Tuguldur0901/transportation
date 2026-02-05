const express = require('express');
const router = express.Router();
const cargoController = require('../controllers/cargoController');
const auth = require('../middleware/authMiddleware'); // Middleware-ээ дуудна

// 'auth' middleware-ийг дунд нь оруулснаар энэ зам хамгаалагдана
router.get('/', auth, cargoController.getAllCargo);
router.post('/', auth, cargoController.createCargo);

module.exports = router;