const express = require('express');
const router = express.Router();
const { register, login, getMe, updateProfile } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// ❌ WRONG: router.post('/api/auth/register', register);
// ✅ RIGHT: Just use '/' or '/register' because the prefix is in server.js

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);

module.exports = router;