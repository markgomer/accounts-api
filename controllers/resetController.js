const fs = require('fs');
const path = require('path');
const httpHelper = require('../helpers/httpHelper');

function reset(req, res) {
    const initialData = { accounts: [] };
    fs.writeFileSync(path.join('data', 'db.json'), JSON.stringify(initialData, null, 2));
    httpHelper.sendResponse(res, 200, `200 OK`);
}

module.exports = { reset };
