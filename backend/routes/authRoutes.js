const express = require('express');
const { registerUser, authUser, forgotPassword } = require('../controllers/authController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', authUser);
router.post('/forgot-password', forgotPassword);

module.exports = router;
