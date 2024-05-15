const accountModel = require('../models/accountModel');
const httpHelper = require('../helpers/httpHelper');

function handleEvent(req, res) {
    const { type, destination, origin, amount } = req.body;

    let response;

    switch (type) {
        case 'deposit':
            const newBalance = accountModel.deposit(destination, amount);
            response = { destination: { id: destination, balance: newBalance } };
            httpHelper.sendResponse(res, 201, `201 ${JSON.stringify(response)}`);
            break;
            
        case 'withdraw':
            const balance = accountModel.withdraw(origin, amount);
            // insufficient funds or non-existing account
            if (balance === null) {    
                httpHelper.sendResponse(res, 404, `404 0`);
                return;
            }
            response = { origin: { id: origin, balance: balance } };
            httpHelper.sendResponse(res, 201, `201 ${JSON.stringify(response)}`);
            break;
            
        case 'transfer':
            const result = accountModel.transfer(origin, destination, amount);
            // non-existing account
            if (result === null) {
                httpHelper.sendResponse(res, 404, `404 0`);
                return;
            }
            response = {
                origin: { id: origin, balance: result.originBalance },
                destination: { id: destination, balance: result.destinationBalance }
            };
            httpHelper.sendResponse(res, 201, `201 ${JSON.stringify(response)}`);
            break;
    }
}

module.exports = { handleEvent };
