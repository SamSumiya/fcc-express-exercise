const express = require('express');
const app = express();
require('dotenv').config()

console.log('Hello World');



app.use('/public', express.static(__dirname + '/public'));

app.get('/json', function( req, res, next ) {
    console.log(`${req.method} ${req.path} ${req.ip}`)
    next()
})

app.get('/json', function( req, res, next ) {
    console.log(`${req.method} ${req.path} ${req.ip}`)
    next()
}, function(req, res) {
    const ms = process.env.MESSAGE_STYLE

    if ( ms === 'uppercase') {
        return res.json({"message": "HELLO JSON"})
    }  else{
        return res.json({"message": "Hello json"})
    }  
})

app.get('/', function(req, res) {
    const path = __dirname + '/views/index.html'
    res.sendFile(path)
}) 

app.get("/", function(req, res) {
    res.send('Hello Express')
    } 
)


module.exports = app;