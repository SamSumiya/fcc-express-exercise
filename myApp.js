const express = require('express');
const app = express();

console.log('Hello World');




app.get('/', function(req, res) {
    const path = __dirname + '/views/index.html'
    res.sendFile(path)
}) 

app.get("/", function(req, res) {
    res.send('Hello Express')
    } 
)


module.exports = app;