const express = require('express');
const router = express.Router();
const favoriteController = require('../controllers/favoriteController');
const { authenticate } = require('../middleware/auth');

// POST /api/favorites -> add to favorites (authenticated)
router.post('/', authenticate, favoriteController.addToFavoritesValidations, favoriteController.addToFavorites);

// GET /favorites -> get all favorites for user (authenticated)
router.get('/', authenticate, favoriteController.getFavorites);

module.exports = router;
