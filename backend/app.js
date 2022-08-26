const express = require('express');
const app = express();

const errorMiddleware = require("./middleware/error")

app.use(express.json());

// Route Import
const productRoute = require('./routes/productRoute');
app.use('/api/v1', productRoute);

// Middleware for Errors 
app.use(errorMiddleware);

module.exports = app;
