const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analytics.controller');
// Assuming there is an auth middleware to check for admin status
const { isAuthenticated } = require('../middlewares/auth.middleware');

router.post('/track', analyticsController.trackEvent);
router.get('/summary', analyticsController.getAnalyticsSummary); // In production, add isAdmin middleware here

module.exports = router;
