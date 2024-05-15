const accountModel = require('../models/accountModel');


// Define the balance endpoint
function getBalance(req, res) {
    const accountId = req.query.account_id;
    const balance = accountModel.getBalance(accountId);

    if (balance === null) {
        res.status(404).send(`404 0`);
    } else {
        res.status(200).send(`200 ${balance.toString()}`);
    }
}

module.exports = { getBalance };
