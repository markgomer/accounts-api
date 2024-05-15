const app = require('express')(); // importing express framework
const PORT = 8080;

// fire up API on the server
app.listen(
    PORT, () => console.log(`It's alive on http://localhost:${PORT}`)
); 

