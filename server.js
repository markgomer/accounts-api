const express = require('express'); // importing express framework
const routes = require('./routes');
const PORT = 8080;

const app = express();
app.use(express.json()); // JSON parser

// define routes
app.use('/', routes);

// fire up API on the server
app.listen(
    PORT, () => console.log(`It's alive on http://localhost:${PORT}`)
); 

