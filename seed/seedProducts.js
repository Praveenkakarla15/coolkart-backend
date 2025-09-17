require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const logger = require('../middleware/logger');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/coolkart';

const sampleProducts = [
  {
    title: 'Wireless Headphones',
    description: 'High quality wireless headphones',
    price: 59.99,
    category: 'electronics',
    image: '/assets/headphones.jpg',
    rating: { rate: 4.4, count: 124 },
    stock: 50
  },
  {
    title: 'Running Shoes',
    description: 'Comfortable running shoes',
    price: 89.99,
    category: 'footwear',
    image: '/assets/shoes.jpg',
    rating: { rate: 4.6, count: 78 },
    stock: 30
  },
  {
    title: 'Smartphone',
    description: 'Latest smartphone model',
    price: 699.99,
    category: 'electronics',
    image: '/assets/phone.jpg',
    rating: { rate: 4.7, count: 512 },
    stock: 25
  }
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    logger.info('Connected to Mongo for seeding');
    await Product.deleteMany({});
    await Product.insertMany(sampleProducts);
    logger.info('Products seeded');

    // create a sample user for testing
    const email = 'test@coolkart.com';
    const existing = await User.findOne({ email });
    if (!existing) {
      const hash = await bcrypt.hash('password123', 10);
      const user = new User({ name: 'Test User', email, password: hash });
      await user.save();
      logger.info('Test user created: test@coolkart.com / password123');
    } else {
      logger.info('Test user already exists');
    }

    process.exit(0);
  } catch (err) {
    logger.error('Seed error', err);
    process.exit(1);
  }
}
seed();
