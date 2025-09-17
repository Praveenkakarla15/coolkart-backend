const { body, validationResult } = require('express-validator');
const FavoriteItem = require('../models/FavoriteItem');
const Product = require('../models/Product');
const logger = require('../middleware/logger');

exports.addToFavoritesValidations = [
  body('productId').isMongoId().withMessage('productId is required and must be a valid id')
];

exports.addToFavorites = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const userId = req.user.id;
    const { productId } = req.body;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    // Avoid duplicates
    const exists = await FavoriteItem.findOne({ product: productId, user: userId });
    if (exists) return res.status(200).json({ message: 'Already in favorites' });

    const fav = new FavoriteItem({ product: productId, user: userId });
    await fav.save();

    logger.info(`User ${userId} added product ${productId} to favorites`);
    res.status(201).json({ message: 'Product added to favorites', fav });
  } catch (err) {
    logger.error('Error adding to favorites', err);
    next(err);
  }
};

exports.getFavorites = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const items = await FavoriteItem.find({ user: userId }).populate('product').lean();
    res.json(items);
  } catch (err) {
    logger.error('Error fetching favorites', err);
    next(err);
  }
};
