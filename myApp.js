const express = require('express');
const app = express();
require('dotenv').config()

console.log('Hello World');

const mware = function( req, res, next ) {
    console.log(`${req.method} ${req.path} - ${req.ip}`)
    next()
}

app.use(mware)

app.use('/public', express.static(__dirname + '/public'));

app.get('/now', function(req, res, next) {
    req.time = new Date().toString(); 
    next()
}, function(req, res) {
    res.json({
        time: req.time
    })
})

app.get('/name', function(req, res) {
   const firstName = req.query.first
   const lastName = req.query.last

   res.json({ name:`${firstName} ${lastName}`})
})

app.get('/:word/echo', function(req, res) {
    return res.json({
        echo: req.params.word
    })
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