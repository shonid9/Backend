const express = require('express');
const { enterShift, exitShift, getWorkedHours, updateAvailability } = require('../controllers/shift.controller');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/enter', authMiddleware, enterShift);
router.post('/exit', authMiddleware, exitShift);
router.get('/worked-hours', authMiddleware, getWorkedHours);
router.put('/availability', authMiddleware, updateAvailability);

module.exports = router;
