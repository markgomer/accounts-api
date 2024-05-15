const express = require('express');
const balanceController = require('./controllers/balanceController');

const router = express.Router();

router.post('/reset', (req, res) => {
    const initialData = { accounts: [] };
    fs.writeFileSync(path.join(__dirname, 'data', 'db.json'), JSON.stringify(initialData, null, 2));
    res.status(200).send('OK');
});

router.get('/balance', balanceController.getBalance);

module.exports = router;
