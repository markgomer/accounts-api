const fs = require('fs');
const path = require('path');


function reset(req, res) {
    const initialData = { accounts: [] };
    fs.writeFileSync(path.join('data', 'db.json'), JSON.stringify(initialData, null, 2));
    res.status(200).send('200 OK');
}

module.exports = { reset };
