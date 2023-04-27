const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/:username', userController.handleGetUserDataByUsername);

router.get('/search/:keyword', userController.handleGetUserDataByKeyword);

module.exports = router;