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


// Define a route for HTTP GET requests to the root URL '/'
app.get('/', (req, res) => {
    res.send('GET WORKED!');
});


// fire up API on the server
app.listen(
    PORT, () => console.log(`It's alive on http://localhost:${PORT}`)
); 

