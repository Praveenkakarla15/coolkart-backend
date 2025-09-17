const { body, validationResult } = require('express-validator');
const CartItem = require('../models/CartItem');
const Product = require('../models/Product');
const logger = require('../middleware/logger');

exports.addToCartValidations = [
  body('productId').isMongoId().withMessage('productId is required and must be a valid id'),
  body('qty').optional().isInt({ min: 1 }).withMessage('qty must be >= 1')
];

exports.addToCart = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const userId = req.user.id;
    const { productId, qty = 1 } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    // If product already in cart for this user, increase qty
    let cartItem = await CartItem.findOne({ product: productId, user: userId });
    if (cartItem) {
      cartItem.qty += qty;
      await cartItem.save();
    } else {
      cartItem = new CartItem({ product: productId, qty, user: userId });
      await cartItem.save();
    }

    logger.info(`User ${userId} added product ${productId} to cart (qty: ${qty})`);
    res.status(201).json({ message: 'Product added to cart', cartItem });
  } catch (err) {
    logger.error('Error adding to cart', err);
    next(err);
  }
};

exports.getCart = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const items = await CartItem.find({ user: userId }).populate('product').lean();
    res.json(items);
  } catch (err) {
    logger.error('Error fetching cart items', err);
    next(err);
  }
};
