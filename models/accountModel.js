const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'data', 'db.json');

function readData() {
    return JSON.parse(fs.readFileSync(dataPath));
}


function getAccount(accountId) {
    const data = readData();
    return data.accounts.find(acc => acc.id === accountId);
}


function getBalance(accountId) {
    const account = getAccount(accountId);
    return account ? account.balance : null;
}


module.exports = {
    getBalance
};
