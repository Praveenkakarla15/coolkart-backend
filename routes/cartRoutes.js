const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { authenticate } = require('../middleware/auth');

// POST /api/cart  -> add to cart (authenticated)
router.post('/', authenticate, cartController.addToCartValidations, cartController.addToCart);

// GET /cart -> get all cart items for user (authenticated)
router.get('/', authenticate, cartController.getCart);

module.exports = router;
