const Product = require('../models/Product');
const logger = require('../middleware/logger');

exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find().lean();
    res.json(products);
  } catch (err) {
    logger.error('Error fetching all products', err);
    next(err);
  }
};

exports.getProductsByCategory = async (req, res, next) => {
  try {
    const category = req.params.category;
    const products = await Product.find({ category: category }).lean();
    res.json(products);
  } catch (err) {
    logger.error(`Error fetching products for category ${req.params.category}`, err);
    next(err);
  }
};
