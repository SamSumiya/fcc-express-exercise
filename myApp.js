const express = require('express');
const app = express();

console.log('Hello World');


app.get("/", function(req, res) {
    res.send('Hello Express')
    } 
)



module.exports = app;