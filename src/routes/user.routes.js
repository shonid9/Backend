//user routes



const express = require('express');
const { getUserProfile, updateUserProfile } = require('../controllers/user.controller');
const authMiddleware = require('../middleware/auth');
const { registerUser, loginUser } = require('../controllers/authcontroller');
const router = express.Router();
const roleMiddleware = require('../middleware/role');
const { getAllUsersWithWorkHistory } = require('../controllers/user.controller');

router.get('/profile', authMiddleware, getUserProfile);
router.put('/profile', authMiddleware, updateUserProfile);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/all', authMiddleware, roleMiddleware(['restaurant_manager']), getAllUsersWithWorkHistory);
module.exports = router;
