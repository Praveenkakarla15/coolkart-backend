const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// POST /api/auth/register
router.post('/register', authController.registerValidations, authController.register);

// POST /api/auth/login
router.post('/login', authController.loginValidations, authController.login);

module.exports = router;
