const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const favoriteRoutes = require('./routes/favoriteRoutes');
const authRoutes = require('./routes/authRoutes');
const { errorHandler } = require('./middleware/errorHandler');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swaggerDef');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev')); // request logging to console

// Routes
app.use('/products', productRoutes);               // GET /products and /products/:category
app.use('/api/cart', cartRoutes);                  // POST /api/cart  (add)
app.use('/cart', cartRoutes);                      // GET /cart       (get)  -> same controller
app.use('/api/favorites', favoriteRoutes);         // POST /api/favorites (add)
app.use('/favorites', favoriteRoutes);             // GET /favorites       (get)
app.use('/api/auth', authRoutes);                  // Auth routes: register/login

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Global error handler
app.use(errorHandler);

module.exports = app;
