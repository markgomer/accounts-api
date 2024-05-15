const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'data', 'db.json');


function readData() {
    return JSON.parse(fs.readFileSync(dataPath));
}


function writeData(data) {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}


function getAccount(accountId) {
    const data = readData();
    return data.accounts.find(acc => acc.id === accountId);
}


function createOrUpdateAccount(accountId, balance) {
    const data = readData();
    let account = data.accounts.find(acc => acc.id === accountId);
    if (account) {
        account.balance = balance;
    } else {
        account = { id: accountId, balance: balance };
        data.accounts.push(account);
    }
    writeData(data);
    return account;
}


function getBalance(accountId) {
    const account = getAccount(accountId);
    return account ? account.balance : null;
}


function deposit(destination, amount) {
    let account = getAccount(destination);
    if (!account) {
        account = createOrUpdateAccount(destination, 0);
    }
    account.balance += amount;
    createOrUpdateAccount(destination, account.balance);
    return account.balance;
}


function withdraw(origin, amount) {
    const account = getAccount(origin);
    if (!account || account.balance < amount) {
        return null;
    }
    account.balance -= amount;
    createOrUpdateAccount(origin, account.balance);
    return account.balance;
}


function transfer(origin, destination, amount) {
    const originAccount = getAccount(origin);
    let destinationAccount = getAccount(destination);

    if (!originAccount || originAccount.balance < amount) {
        return null;
    }
    if (!destinationAccount) {
        destinationAccount = createOrUpdateAccount(destination, 0);
    }

    originAccount.balance -= amount;
    createOrUpdateAccount(origin, originAccount.balance);

    destinationAccount.balance += amount;
    createOrUpdateAccount(destination, destinationAccount.balance);
    
    return { originBalance: originAccount.balance, destinationBalance: destinationAccount.balance };
}


module.exports = {
    getBalance,
    deposit,
    withdraw,
    transfer
};