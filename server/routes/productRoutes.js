const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const auth = require('../middleware/authMiddleware');

router.post('/', auth, productController.addProduct); // Зөвхөн нэвтэрсэн хүн бараа нэмнэ
router.get('/', productController.getAllProducts); // Бүх хүн барааг харна
module.exports = router;