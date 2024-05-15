const express = require('express'); // importing express framework
const fs = require('fs');
const path = require('path');
const PORT = 8080;

const app = express();

app.use(express.json()); // JSON parser


// define reset endpoint
app.post('/reset', (req, res) => {
    const initialData = {
        accounts: []
    };

    fs.writeFileSync(path.join(__dirname, 'data', 'db.json'), JSON.stringify(initialData, null, 2));
    res.status(200).send('200 OK');
});


// Define the balance endpoint
app.get('/balance', (req, res) => {
    const accountId = req.query.account_id;
    const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'db.json')));
    const account = data.accounts.find(acc => acc.id === accountId);

    if (!account) {
        res.status(404).send('404 0');
    } else {
        res.status(200).send(`200 ${account.balance.toString()}`);
    }
});


// Define a route for HTTP GET requests to the root URL '/'
app.get('/', (req, res) => {
    res.send('GET WORKED!');
});


// fire up API on the server
app.listen(
    PORT, () => console.log(`It's alive on http://localhost:${PORT}`)
); 

