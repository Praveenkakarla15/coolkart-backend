const mongoose = require('mongoose');
const logger = require('../middleware/logger');

const connectDB = async (uri) => {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    logger.info('MongoDB connected');
  } catch (err) {
    logger.error('MongoDB connection error', err);
    throw err;
  }
};

module.exports = connectDB;
