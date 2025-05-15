const express = require('express');
const app = express();

console.log('Hello World');



app.use('/public', express.static(__dirname + '/public'));

get('/json', function(req, res) {
    return res.json({"message": "Hello json"})
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