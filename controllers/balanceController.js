const accountModel = require('../models/accountModel');
const httpHelper = require('../helpers/httpHelper');


// Define the balance endpoint
function getBalance(req, res) {
    const accountId = req.query.account_id;
    const balance = accountModel.getBalance(accountId);

    if (balance === null) {
        httpHelper.sendResponse(res, 404, '404 0');
    } else {
        httpHelper.sendResponse(res, 200, `200 ${balance.toString()}`);
    }
}

module.exports = { getBalance };
