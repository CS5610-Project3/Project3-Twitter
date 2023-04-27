const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login', authController.handleLogin);

router.post('/signup', authController.handleSignup);

router.get('/isLoggedIn', authController.handleIsLoggedIn);

router.post('/logout', authController.handleLogout);

module.exports = router;