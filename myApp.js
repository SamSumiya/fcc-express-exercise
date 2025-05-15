// Load required packages
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// -------------------------------------
// ✅ MIDDLEWARE CONFIGURATION
// -------------------------------------

// Parse URL-encoded form data from POST requests
app.use(bodyParser.urlencoded({ extended: false }));

// Simple request logger middleware for all routes
app.use(function(req, res, next) {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

// Serve static assets from the /public folder
app.use('/public', express.static(__dirname + '/public'));

// -------------------------------------
// ✅ ROUTES
// -------------------------------------

// Root route: serves HTML file
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// /json: Respond with a message based on environment variable
app.get('/json', function(req, res) {
  const msgStyle = process.env.MESSAGE_STYLE;
  const message = msgStyle === 'uppercase' ? 'HELLO JSON' : 'Hello json';
  res.json({ message });
});

// /now: Adds current time to the request object
app.get('/now', function(req, res, next) {
  req.time = new Date().toString();
  next();
}, function(req, res) {
  res.json({ time: req.time });
});

// /:word/echo: Echoes back the word provided in the URL
app.get('/:word/echo', function(req, res) {
  res.json({ echo: req.params.word });
});

// /name (GET): Extracts first and last name from query parameters
// Example: /name?first=John&last=Doe
app.get('/name', function(req, res) {
  const { first, last } = req.query;
  res.json({ name: `${first} ${last}` });
});

// /name (POST): Extracts first and last name from POST body
app.post('/name', function(req, res) {
  const { first, last } = req.body;
  res.json({ name: `${first} ${last}` });
});

// -------------------------------------
// ✅ EXPORT APP
// -------------------------------------

module.exports = app;
