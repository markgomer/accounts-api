const express = require('express');
const fs = require('fs');
const path = require('path');
const balanceController = require('./controllers/balanceController');
const eventController = require('./controllers/eventController');

const router = express.Router();

router.post('/reset', (req, res) => {
    const initialData = { accounts: [] };
    fs.writeFileSync(path.join(__dirname, 'data', 'db.json'), JSON.stringify(initialData, null, 2));
    res.status(200).send('200 OK');
});

router.get('/balance', balanceController.getBalance);
router.post('/event', eventController.handleEvent);

module.exports = router;
