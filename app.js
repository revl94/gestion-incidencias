'use strict';
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Initializations
const app = express();
const trello = require('./src/routes/trello');
const tickets = require('./src/routes/tickets');

// Express middlewares
app.use(cors());
//Set up body-parser with JSON
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Express Routes
// Vista por defecto para la ruta raiz

app.use('/trello', trello);
app.use('/tickets', tickets);

// Start server
// Catch 404 errors and forward to error handler. This is called if no match is found in the preceding route functions.
app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
    console.log(`Server running on ${process.env.DB_HOSTNAME} on port: ${PORT}`);
});
