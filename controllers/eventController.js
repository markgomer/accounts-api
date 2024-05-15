const accountModel = require('../models/accountModel');

function handleEvent(req, res) {
    const { type, destination, origin, amount } = req.body;

    let response;

    switch (type) {
        case 'deposit':
            const newBalance = accountModel.deposit(destination, amount);
            response = { destination: { id: destination, balance: newBalance } };
            res.status(201).send(`201 ${JSON.stringify(response)}`);
            break;

        case 'withdraw':
            const balance = accountModel.withdraw(origin, amount);
            // insufficient funds or non-existing account
            if (balance === null) { 
                res.status(404).send(`404 0`);
                return;
            }
            response = { origin: { id: origin, balance: balance } };
            res.status(201).send(`201 ${JSON.stringify(response)}`);
            break;

        case 'transfer':
            const result = accountModel.transfer(origin, destination, amount);
            // non-existing account
            if (result === null) {
                res.status(404).send(`404 0`);
                return;
            }
            response = {
                origin: { id: origin, balance: result.originBalance },
                destination: { id: destination, balance: result.destinationBalance }
            };
            res.status(201).send(`201 ${JSON.stringify(response)}`);
            break;
    }
}

module.exports = { handleEvent };
