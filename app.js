const express = require('express');
const routes = require('./routes');

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

// Use the routes defined in routes.js
app.use('/', routes);

module.exports = app;
