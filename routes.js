const express = require('express');
const balanceController = require('./controllers/balanceController');
const eventController = require('./controllers/eventController');
const resetController = require('./controllers/resetController');

const router = express.Router();

router.post('/reset', resetController.reset);
router.get('/balance', balanceController.getBalance);
router.post('/event', eventController.handleEvent);

module.exports = router;
