// Require Libraries
const express = require('express');

// App Setup
const app = express();

// Middleware

// Routes
app.get('/', (req, res) => {
    res.send('Hello Squirrel');
});

// Start Server

