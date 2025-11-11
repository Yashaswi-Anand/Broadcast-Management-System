const express = require('express');
const router = express.Router();
const broadcastController = require('../controllers/broadcastController');
const authMiddleware = require('../middleware/auth');

router.post('/broadcasts', authMiddleware, broadcastController.createBroadcast);
router.get('/broadcasts', authMiddleware, broadcastController.getAllBroadcasts);

module.exports = router;
