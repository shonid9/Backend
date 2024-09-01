
const express = require('express');
const { sendMessage, getAllMessages } = require('../controllers/chat.controller');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/send', authMiddleware, sendMessage);
router.get('/messages', authMiddleware, getAllMessages);

module.exports = router;
