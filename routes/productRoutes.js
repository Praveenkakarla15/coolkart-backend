const express = require('express');
const router = express.Router();
const { getAllProducts, getProductsByCategory } = require('../controllers/productController');

/**
 * GET /products
 * GET /products/:category
 */
router.get('/', getAllProducts);
router.get('/:category', getProductsByCategory);

module.exports = router;
